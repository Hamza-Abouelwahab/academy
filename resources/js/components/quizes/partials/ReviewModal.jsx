import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { CheckCircle2, CircleCheck, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import DeleteModal from '@/components/DeleteModal';
import { review as reviewQuiz } from '@/routes/quizes';

const formatLabel = (value) =>
    String(value || '')
        .replaceAll('_', ' ')
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

const getQuizStatusLabel = (source, status) => {
    if (source === 'manual' && status === 'approved') return 'Published';
    if (['ai', 'pdf'].includes(source) && status === 'approved') {
        return 'Reviewed';
    }

    return formatLabel(status);
};

export default function ReviewModal({ open, onOpenChange, onReviewed, quiz }) {
    const [reviewStatuses, setReviewStatuses] = useState({});
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    useEffect(() => {
        if (!open || !quiz) return;

        setReviewStatuses(
            Object.fromEntries(
                (quiz.questions || []).map((question) => [
                    question.id,
                    ['approved', 'rejected'].includes(question.status)
                        ? question.status
                        : null,
                ]),
            ),
        );
        setError('');
        setSaving(false);
        setConfirmationOpen(false);
    }, [open, quiz]);

    const setReviewStatus = (questionId, reviewStatus) => {
        setReviewStatuses((statuses) => ({
            ...statuses,
            [questionId]: reviewStatus,
        }));
        setError('');
    };

    const questions = quiz?.questions || [];
    const canReview =
        ['ai', 'pdf'].includes(String(quiz?.source || '').toLowerCase()) &&
        String(quiz?.status || '').toLowerCase() === 'pending_review';
    const statusLabel = getQuizStatusLabel(
        String(quiz?.source || '').toLowerCase(),
        String(quiz?.status || '').toLowerCase(),
    );
    const hasQuestionsToDelete = questions.some(
        (question) => reviewStatuses[question.id] !== 'approved',
    );

    const submitReview = () => {
        if (!quiz || saving) return Promise.resolve();

        return new Promise((resolve, reject) => {
            setSaving(true);
            setError('');

            router.put(
                reviewQuiz.url(quiz.id),
                {
                    questions: questions.map((question) => ({
                        id: question.id,
                        status: reviewStatuses[question.id] || null,
                    })),
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        const approvedQuestionIds = questions
                            .filter(
                                (question) =>
                                    reviewStatuses[question.id] === 'approved',
                            )
                            .map((question) => question.id);
                        onReviewed?.(quiz.id, approvedQuestionIds);
                        onOpenChange(false);
                        resolve();
                    },
                    onError: (errors) => {
                        setError(
                            errors.questions ||
                                errors.message ||
                                'Unable to save the quiz review.',
                        );
                        reject(new Error('Quiz review failed.'));
                    },
                    onFinish: () => setSaving(false),
                },
            );
        });
    };

    const saveReview = () => {
        if (saving) return;

        if (hasQuestionsToDelete) {
            setConfirmationOpen(true);
            return;
        }

        submitReview();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex max-h-[92vh] flex-col gap-0 overflow-hidden border-border bg-card p-0 sm:max-w-3xl">
                <DialogHeader className="border-b border-border px-6 py-5">
                    <div className="flex items-start gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-alpha/30 bg-alpha/10 text-alpha">
                            <Eye className="size-5" />
                        </span>
                        <div className="min-w-0">
                            <DialogTitle className="truncate text-foreground">
                                {quiz?.title || 'Untitled Quiz'}
                            </DialogTitle>
                            <DialogDescription className="mt-1">
                                {canReview
                                    ? 'Preview every question, verify its correct answer, and choose a review status.'
                                    : 'Preview every question and its correct answer.'}
                            </DialogDescription>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-3">
                        <Badge variant="outline">
                            Source: {formatLabel(quiz?.source)}
                        </Badge>
                        <Badge variant="outline">Status: {statusLabel}</Badge>
                        <Badge variant="outline">
                            {questions.length}{' '}
                            {questions.length === 1 ? 'Question' : 'Questions'}
                        </Badge>
                    </div>
                </DialogHeader>

                <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto px-6 py-5">
                    {questions.map((question, questionIndex) => (
                        <article
                            key={question.id}
                            className="rounded-xl border border-border bg-background/40 p-4"
                        >
                            <div className="flex items-start gap-3">
                                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-alpha/10 text-xs font-bold text-alpha">
                                    {questionIndex + 1}
                                </span>
                                <p className="pt-1 text-sm font-medium text-foreground">
                                    {question.text}
                                </p>
                            </div>

                            <div className="mt-4 space-y-2 pl-10">
                                {(question.answers || []).map(
                                    (answer, answerIndex) => (
                                        <div
                                            key={answer.id}
                                            className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm ${
                                                answer.is_correct
                                                    ? 'border-good/40 bg-good/10 text-good'
                                                    : 'border-border bg-card text-muted-foreground'
                                            }`}
                                        >
                                            <span className="w-4 shrink-0 text-xs font-semibold">
                                                {String.fromCharCode(
                                                    65 + answerIndex,
                                                )}
                                            </span>
                                            <span className="flex-1">
                                                {answer.text}
                                            </span>
                                            {answer.is_correct && (
                                                <span className="flex items-center gap-1 text-xs font-semibold">
                                                    <CheckCircle2 className="size-4" />
                                                    Correct answer
                                                </span>
                                            )}
                                        </div>
                                    ),
                                )}
                            </div>

                            {canReview && (
                                <fieldset className="mt-4 flex flex-wrap gap-4 border-t border-border pt-4 pl-10">
                                    <legend className="sr-only">
                                        Review question {questionIndex + 1}
                                    </legend>
                                    {['approved', 'rejected'].map((status) => (
                                        <label
                                            key={status}
                                            className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
                                        >
                                            <input
                                                type="radio"
                                                name={`question-review-${question.id}`}
                                                value={status}
                                                checked={
                                                    reviewStatuses[
                                                        question.id
                                                    ] === status
                                                }
                                                onChange={() =>
                                                    setReviewStatus(
                                                        question.id,
                                                        status,
                                                    )
                                                }
                                                className="size-4 accent-alpha"
                                            />
                                            {formatLabel(status)}
                                        </label>
                                    ))}
                                </fieldset>
                            )}
                        </article>
                    ))}
                </div>

                <DialogFooter className="border-t border-border px-6 py-4">
                    {error && (
                        <p className="mr-auto text-sm text-error">{error}</p>
                    )}
                    <Button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        variant="outline"
                        disabled={saving}
                    >
                        Close Preview
                    </Button>
                    {canReview && (
                        <Button
                            type="button"
                            onClick={saveReview}
                            disabled={saving}
                            className="bg-alpha font-semibold hover:bg-alpha/85"
                        >
                            {saving ? 'Saving Review…' : 'Save Review'}
                        </Button>
                    )}
                </DialogFooter>

                {canReview && (
                    <DeleteModal
                        open={confirmationOpen}
                        onOpenChange={setConfirmationOpen}
                        title="Save Quiz Review?"
                        description="Only approved questions will be kept. Rejected and unreviewed questions will be permanently deleted."
                        cancelLabel="Cancel"
                        confirmLabel="Save Review"
                        loading={saving}
                        onConfirm={submitReview}
                        icon={CircleCheck}
                        iconClassName="bg-alpha/10 text-alpha"
                        confirmButtonClassName="bg-alpha font-semibold text-beta hover:bg-alpha/85"
                    >
                        {error && (
                            <p className="rounded-lg border border-error/30 bg-error/10 px-3 py-2 text-sm text-error">
                                {error}
                            </p>
                        )}
                    </DeleteModal>
                )}
            </DialogContent>
        </Dialog>
    );
}
