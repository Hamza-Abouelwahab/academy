<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class QuizAiService
{
    public function generate(string $topic): array
    {
        $prompt = <<<PROMPT
You are a JSON API.

Generate 1 quiz about: {$topic}

Return ONLY valid raw JSON.

JSON schema:

{
  "title": "",
  "questions": [
    {
      "level": "easy",
      "type": "mcq",
      "question": "",
      "options": ["", "", "", ""],
      "correct_answer": [""]
    }
  ]
}

Generate exactly 21 questions:
- 7 easy
- 7 intermediate
- 7 hard

Question types must include:
- mcq
- true_false
- fill_blank
- multiple_select

Rules:
- correct_answer must ALWAYS be an array.
- mcq correct_answer example: ["answer"]
- true_false correct_answer example: [true]
- fill_blank correct_answer example: ["answer"]
- multiple_select correct_answer example: ["answer1", "answer2"]
- options is required only for mcq and multiple_select.
- mcq must have exactly 4 options.
- multiple_select must have exactly 4 options and at least 2 correct answers.
- Use double quotes only.
- Do not write markdown.
- Do not write explanations.
- Response must start with { and end with }.
PROMPT;

        $response = Http::withoutVerifying()
            ->withHeaders([
                'Authorization' => 'Bearer ' . env('AI_API_KEY'),
                'Content-Type' => 'application/json',
            ])
            ->post('https://api.groq.com/openai/v1/chat/completions', [
                'model' => 'llama-3.3-70b-versatile',
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => $prompt,
                    ],
                ],
                'temperature' => 0.7,
            ]);

        $json = $response->json();

        if (isset($json['error'])) {
            throw new \Exception($json['error']['message'] ?? 'AI generation failed.');
        }

        if (! isset($json['choices'][0]['message']['content'])) {
            throw new \Exception('Invalid AI response.');
        }

        $content = $json['choices'][0]['message']['content'];

        $content = str_replace(['```json', '```'], '', $content);
        $content = trim($content);

        $data = json_decode($content, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception('AI returned invalid JSON.');
        }

        return $data;
    }
}
