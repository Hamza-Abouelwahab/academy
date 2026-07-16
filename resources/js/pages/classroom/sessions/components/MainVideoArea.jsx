import { MicOff, MonitorPlay, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';

function initials(name) {
    return name
        ?.split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
}

function VideoTile({ label, participant, isMain = false }) {
    const isMuted = Boolean(participant?.is_muted);
    const isOnline = participant?.is_online ?? true;

    return (
        <div
            className={cn(
                'relative overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10',
                isMain ? 'min-h-[70px] flex-1' : 'aspect-video w-full',
            )}
        >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-4 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-white/10">
                    {participant?.user?.name ? (
                        <span className="text-lg font-semibold text-white/80">
                            {initials(participant.user.name)}
                        </span>
                    ) : (
                        <UserRound className="size-7 text-white/50" />
                    )}
                </div>
                {!isOnline && (
                    <span className="text-xs text-white/40">Offline</span>
                )}
            </div>

            <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white">
                    {label}
                </span>
                {isMuted && (
                    <span className="rounded-md bg-black/60 p-1 text-white">
                        <MicOff className="size-3.5" />
                    </span>
                )}
            </div>
        </div>
    );
}

export default function MainVideoArea({
    session,
    currentParticipant,
    currentUser,
    participants = [],
    isFocusMode = false,
    isJoined = false,
    canJoin = false,
    isJoining = false,
    onJoin,
}) {
    const subject = session?.title ?? 'Classroom session';
    const displayName =
        currentParticipant?.user?.name ?? currentUser?.name ?? 'Guest';
    const hostParticipant =
        participants.find((item) => item.role === 'host') ?? participants[0];
    const showJoinButton = !isJoined && canJoin;

    const sidebarParticipants = participants
        .filter((item) => item.id !== hostParticipant?.id)
        .slice(0, 3);

    while (sidebarParticipants.length < 3) {
        sidebarParticipants.push(null);
    }

    return (
        <section
            className={cn(
                'flex h-full min-h-[420px] flex-col overflow-hidden bg-neutral-950 text-white shadow-sm',
                isFocusMode
                    ? 'min-h-0 rounded-none border-0'
                    : 'rounded-2xl border',
            )}
        >
            {!isFocusMode && (
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                    <div className="min-w-0">
                        <h2 className="truncate text-sm font-medium">
                            {subject}
                        </h2>
                        <p className="truncate text-xs text-white/60">
                            Backend connection pending - {displayName}
                        </p>
                    </div>
                </div>
            )}

            <div
                className={cn(
                    'relative flex min-h-0 flex-1 flex-col gap-3 lg:flex-row',
                    isFocusMode ? 'p-0' : 'p-3',
                )}
            >
                <div className="flex min-h-0 flex-1 flex-col">
                    <VideoTile
                        label={
                            hostParticipant?.user?.name
                                ? `${hostParticipant.user.name} - Teacher`
                                : 'Teacher'
                        }
                        participant={hostParticipant}
                        isMain
                    />
                </div>

                <div className="flex w-full shrink-0 flex-row gap-3 lg:w-[220px] lg:flex-col">
                    {sidebarParticipants.map((participant, index) => (
                        <VideoTile
                            key={participant?.id ?? `placeholder-${index}`}
                            label={
                                participant?.user?.name ??
                                `Participant ${index + 1}`
                            }
                            participant={participant}
                        />
                    ))}
                </div>

                <div
                    className={cn(
                        'absolute overflow-hidden bg-black/80 shadow-2xl backdrop-blur-[1px]',
                        isFocusMode
                            ? 'inset-0 rounded-none border-0'
                            : 'inset-3 rounded-xl border border-white/10',
                    )}
                    aria-label="Pending classroom video"
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="mx-auto max-w-md px-6 text-center">
                            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-white/10 [@media(max-width:639px)_and_(orientation:portrait)]:hidden">
                                <MonitorPlay className="size-8 text-white/70" />
                            </div>
                            <p className="text-base font-semibold text-white">
                                {showJoinButton
                                    ? 'Ready to join'
                                    : 'Backend connection pending'}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-white/60">
                                Live video will open here after the classroom
                                backend is connected.
                            </p>
                            {showJoinButton && (
                                <button
                                    type="button"
                                    onClick={onJoin}
                                    disabled={isJoining}
                                    className="m-10 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-amber-950 shadow-lg shadow-amber-950/20 transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60 [@media(max-width:639px)_and_(orientation:portrait)]:m-7"
                                >
                                    {isJoining
                                        ? 'Joining...'
                                        : 'Join session'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
