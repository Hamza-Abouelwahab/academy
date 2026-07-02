<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\QuizController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome/index')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('quizes', [QuizController::class, 'index'])->name('quizes.index');
    Route::post('quizes/manual', [QuizController::class, 'storeManual'])->name('quizes.manual.store');
    Route::post('quizes/ai', [QuizController::class, 'generateWithAi'])->name('quizes.ai.generate');
    Route::post('quizes/file', [QuizController::class, 'generateFromFile'])->name('quizes.file.generate');
});




require __DIR__."/admin/management.php";
require __DIR__."/admin/classes.php";
require __DIR__."/admin/courses.php";
require __DIR__."/auth.php";
require __DIR__.'/settings.php';
