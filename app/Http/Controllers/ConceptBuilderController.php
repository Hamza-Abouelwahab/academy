<?php

namespace App\Http\Controllers;

use App\Models\Concept;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConceptBuilderController extends Controller
{
    public function create()
    {
        return Inertia::render('Concepts/index', [
            'concept' => null,
            'topics' => [],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => ['required', 'exists:courses,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'topics' => ['nullable', 'array'],
        ]);

        $concept = Concept::create([
            'course_id' => $validated['course_id'],
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'order_index' => (Concept::where('course_id', $validated['course_id'])->max('order_index') ?? 0) + 1,
        ]);

        return redirect()->route('concept.edit', $concept);
    }

    public function edit(Concept $concept)
    {
        $concept->load('topics.lessons');
        $topicIds = $concept->topics->pluck('id');

        return Inertia::render('Concepts/index', [
            'concept' => $concept,
            'topics' => $concept->topics,
            'quizzes' => Quiz::query()
                ->whereIn('topic_id', $topicIds)
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
}
