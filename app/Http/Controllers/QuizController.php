<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\QuizOption;
use App\Models\QuizQuestion;
use App\Models\Topic;
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
            'topic_id' => ['required', 'exists:topics,id'],
        ]);

        $topic = Topic::findOrFail($validated['topic_id']);


        DB::transaction(function () use ($validated, $topic) {
            $quiz = Quiz::create([
                'topic_id' => $topic->id,
                'title' => $validated['title'],
                'description' => null,
                'passing_score' => 70,
                'xp_reward' => 0,
                'order_index' => ((int) Quiz::where('topic_id', $topic->id)->max('order_index')) + 1,
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

    public function generateWithAi(Request $request)
    {
        $request->validate([
            'topic' => ['required', 'string', 'max:2000'],
        ]);

        return back()->withErrors([
            'topic' => 'AI quiz generation endpoint is not implemented yet.',
        ]);
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
