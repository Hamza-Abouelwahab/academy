<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\QuizOption;
use App\Models\QuizQuestion;
use App\Models\Concept;
use App\Models\Topic;
use App\Services\QuizAiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function index()
    {
        return Inertia::render('quizes/index', [
            'topics' => Topic::query()
                ->select('id', 'title')
                ->orderBy('title')
                ->get(),

            'quizzes' => Quiz::query()
                ->withCount('questions')
                ->latest()
                ->get([
                    'id',
                    'topic_id',
                    'concept_id',
                    'title',
                    'description',
                    'passing_score',
                    'xp_reward',
                    'order_index',
                    'created_at',
                ]),
        ]);
    }

    public function storeManual(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'questions' => ['required', 'array', 'min:1'],
            'questions.*.text' => ['required', 'string'],
            'questions.*.answers' => ['required', 'array', 'min:2'],
            'questions.*.answers.*.text' => ['required', 'string'],
            'questions.*.correct_index' => ['required', 'integer', 'min:0'],
            'topic_id' => ['nullable', 'exists:topics,id', 'required_without:concept_id'],
            'concept_id' => ['nullable' , 'exists:concepts,id', 'required_without:topic_id'],
        ]);

        $topic = isset($validated['topic_id']) ? Topic::findOrFail($validated['topic_id']) : null;
        $concept = isset($validated['concept_id']) ? Concept::findOrFail($validated['concept_id']) : null;
        $orderIndex = $topic
            ? ((int) Quiz::where('topic_id', $topic->id)->max('order_index')) + 1
            : ((int) Quiz::where('concept_id', $concept->id)->max('order_index')) + 1;


        DB::transaction(function () use ($validated, $topic, $concept, $orderIndex) {
            $quiz = Quiz::create([
                'topic_id' => $topic?->id,
                'concept_id' => $concept?->id,
                'title' => $validated['title'],
                'description' => null,
                'passing_score' => 70,
                'xp_reward' => 0,
                'order_index' => $orderIndex,
            ]);

            foreach ($validated['questions'] as $questionIndex => $questionData) {
                $question = new QuizQuestion([
                    'quiz_id' => $quiz->id,
                    'question_text' => $questionData['text'],
                    'order_index' => $questionIndex + 1,
                ]);

                if (Schema::hasColumn('quiz_questions', 'status')) {
                    $question->forceFill(['status' => 'pending']);
                }

                $question->save();

                foreach ($questionData['answers'] as $answerIndex => $answerData) {
                    QuizOption::create([
                        'question_id' => $question->id,
                        'option_text' => $answerData['text'],
                        'is_correct' => $answerIndex === $questionData['correct_index'],
                        'order_index' => $answerIndex + 1,
                    ]);
                }
            }
        });

        return back();
    }

    public function generateWithAi(Request $request, QuizAiService $quizAiService)
    {
        $validated = $request->validate([
            'topic_id' => ['nullable', 'exists:topics,id', 'required_without:concept_id'],
            'concept_id' => ['nullable', 'exists:concepts,id', 'required_without:topic_id'],
            'topic' => ['required', 'string', 'min:3', 'max:2000'],
        ]);

        $topic = isset($validated['topic_id']) ? Topic::findOrFail($validated['topic_id']) : null;
        $concept = isset($validated['concept_id']) ? Concept::findOrFail($validated['concept_id']) : null;
        $orderIndex = $topic
            ? ((int) Quiz::where('topic_id', $topic->id)->max('order_index')) + 1
            : ((int) Quiz::where('concept_id', $concept->id)->max('order_index')) + 1;

        try {
            $data = $quizAiService->generate($validated['topic']);
        } catch (\Throwable $e) {
            return back()->withErrors([
                'topic' => $e->getMessage(),
            ]);
        }

        DB::transaction(function () use ($data, $topic, $concept, $orderIndex) {
            $quiz = Quiz::create([
                'topic_id' => $topic?->id,
                'concept_id' => $concept?->id,
                'title' => $data['title'] ?? 'AI Generated Quiz',
                'description' => null,
                'passing_score' => 70,
                'xp_reward' => 0,
                'order_index' => $orderIndex,
            ]);

            foreach ($data['questions'] as $questionIndex => $questionData) {
                $question = new QuizQuestion([
                    'quiz_id' => $quiz->id,
                    'question_text' => $questionData['question'],
                    'order_index' => $questionIndex + 1,
                ]);

                if (Schema::hasColumn('quiz_questions', 'status')) {
                    $question->forceFill([
                        'status' => 'pending',
                    ]);
                }
                if (Schema::hasColumn('quiz_questions', 'level')) {
                    $question->forceFill([
                        'level' => $questionData['level'] ?? 'easy',
                    ]);
                }
                if (Schema::hasColumn('quiz_questions', 'type')) {
                    $question->forceFill([
                        'type' => $questionData['type'] ?? 'mcq',
                    ]);
                }

                $question->save();

                $correctAnswers = $questionData['correct_answer'] ?? [] ;
                if (! is_array($correctAnswers)) {
                    $correctAnswers = [$correctAnswers] ;
                }
                $options = $questionData['options'] ?? [] ;

                if (($questionData['type'] ?? '') === 'true_false') {
                    $options = ['True' , 'False'] ;
                }
                if (($questionData['type'] ?? '') === 'fill_blank' && empty($options)) {
                    $options = $correctAnswers ;
                }

                foreach ($options as $optionIndex => $optionText) {
                    QuizOption::create([
                        'question_id' => $question->id ,
                        'option_text' => is_bool($optionText)
                        ? ($optionText ? 'True' : 'False')
                        : (string) $optionText ,
                        'is_correct' => in_array($optionText , $correctAnswers, true)
                        || in_array((string) $optionText , array_map('strval' , $correctAnswers) , true),
                        'order_index' => $optionIndex + 1,
                    ]);
                }
            }

        });

        return back()->with('success', 'AI quiz generated successfully.');
    }

    public function generateFromFile(Request $request)
    {
        $request->validate([
            'file' => ['required', 'file', 'max:20480'],
        ]);

        return back()->withErrors([
            'file' => 'File quiz generation is not implemented yet.',
        ]);
    }
}
