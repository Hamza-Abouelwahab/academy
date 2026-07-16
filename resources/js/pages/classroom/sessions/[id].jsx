import { Head } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import ClassroomHeader from './components/ClassroomHeader';
import ClassroomVideoStage from './components/ClassroomVideoStage';
import DesktopClassroomLayout from './components/DesktopClassroomLayout';
import StackedClassroomLayout from './components/StackedClassroomLayout';
import {
    buildPendingClassroomState,
    classroomBreakpoint,
} from './classroomHelpers';

function readBreakpoint() {
    if (typeof window === 'undefined') {
        return classroomBreakpoint.desktop;
    }

    if (window.matchMedia('(min-width: 1280px)').matches) {
        return classroomBreakpoint.desktop;
    }

    if (window.matchMedia('(min-width: 768px)').matches) {
        return classroomBreakpoint.tablet;
    }

    return classroomBreakpoint.mobile;
}

export default function ClassroomSession({ data = {}, classroom = {} }) {
    const mappedClassroom = useMemo(
        () => buildPendingClassroomState(data, classroom),
        [data, classroom],
    );

    const [breakpoint, setBreakpoint] = useState(readBreakpoint);
    const [isJoined, setIsJoined] = useState(false);
    const [currentParticipant, setCurrentParticipant] = useState(
        mappedClassroom.currentParticipant,
    );
    const [participants, setParticipants] = useState(
        mappedClassroom.participants,
    );
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const [chatFilterParticipant, setChatFilterParticipant] = useState(null);
    const [activeMobilePanel, setActiveMobilePanel] = useState('chat');
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [activeFocusOverlay, setActiveFocusOverlay] = useState(null);

    useEffect(() => {
        setCurrentParticipant(mappedClassroom.currentParticipant);
        setParticipants(mappedClassroom.participants);
    }, [mappedClassroom.currentParticipant, mappedClassroom.participants]);

    useEffect(() => {
        const handleResize = () => setBreakpoint(readBreakpoint());

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isDesktop = breakpoint === classroomBreakpoint.desktop;
    const isTablet = breakpoint === classroomBreakpoint.tablet;
    const isMobile = breakpoint === classroomBreakpoint.mobile;

    const attendanceStatus = {
        is_joined: isJoined,
        joined_at: isJoined ? new Date().toISOString() : null,
    };

    const handleJoin = () => {
        setIsJoined(true);
    };

    const handleLeave = () => {
        setIsJoined(false);
        setIsFocusMode(false);
        setActiveFocusOverlay(null);
    };

    const handleUpdateParticipant = (payload) => {
        setCurrentParticipant((current) =>
            current ? { ...current, ...payload } : current,
        );
        setParticipants((items) =>
            items.map((participant) =>
                participant.id === currentParticipant?.id
                    ? { ...participant, ...payload }
                    : participant,
            ),
        );
    };

    const handleToggleMobilePanel = (panel) => {
        setActiveMobilePanel((value) => (value === panel ? null : panel));
    };

    const revealFocusControls = () => undefined;
    const disabledAction = () => null;

    const videoStage = (
        <ClassroomVideoStage
            isDesktop={isDesktop}
            isFocusMode={isFocusMode}
            session={mappedClassroom.session}
            currentParticipant={currentParticipant}
            currentUser={mappedClassroom.currentUser}
            participants={participants}
            isJoined={isJoined}
            permissions={mappedClassroom.permissions}
            canJoin={mappedClassroom.permissions.can_join}
            isJoining={false}
            onJoin={handleJoin}
            isParticipantUpdating={false}
            isLeaving={false}
            areFocusControlsVisible
            isJoinedHostWithNativeRecordingControl={false}
            onUpdateParticipant={handleUpdateParticipant}
            onToggleFocusMode={() => setIsFocusMode((value) => !value)}
            revealFocusControls={revealFocusControls}
            onLeave={handleLeave}
            activeFocusOverlay={activeFocusOverlay}
            setActiveFocusOverlay={setActiveFocusOverlay}
            messages={mappedClassroom.messages}
            isSendingMessage={false}
            onSendMessage={disabledAction}
            chatFilterParticipant={chatFilterParticipant}
            setChatFilterParticipant={setChatFilterParticipant}
            onEditMessage={disabledAction}
            onDeleteMessage={disabledAction}
            isModeratingParticipant={false}
            onModerateParticipant={disabledAction}
        />
    );

    return (
        <>
            <Head title={mappedClassroom.session.title} />

            <div className="min-h-screen bg-background text-foreground">
                {!isFocusMode && (
                    <ClassroomHeader
                        session={mappedClassroom.session}
                        currentUser={mappedClassroom.currentUser}
                        attendanceStatus={attendanceStatus}
                    />
                )}

                <div className="mx-4 mt-4 rounded-xl border border-amber-300/70 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200 md:mx-6">
                    {mappedClassroom.pendingMessage}
                </div>

                <div
                    className={cn(
                        'flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto',
                        isFocusMode
                            ? 'p-3 md:p-4'
                            : cn(
                                  'p-4 md:p-6',
                                  isMobile && 'pb-24',
                                  isDesktop &&
                                      'grid grid-cols-[minmax(0,1fr)_320px] grid-rows-[minmax(0,1fr)] overflow-hidden',
                              ),
                    )}
                >
                    {!isFocusMode && isDesktop ? (
                        <DesktopClassroomLayout
                            videoStage={videoStage}
                            resources={mappedClassroom.resources}
                            messages={mappedClassroom.messages}
                            currentUser={mappedClassroom.currentUser}
                            permissions={mappedClassroom.permissions}
                            participants={participants}
                            selectedParticipant={selectedParticipant}
                            onSelectParticipant={setSelectedParticipant}
                            isUploadingResource={false}
                            isDeletingResource={false}
                            onUploadResource={disabledAction}
                            onDeleteResource={disabledAction}
                            isSendingMessage={false}
                            onSendMessage={disabledAction}
                            isModeratingParticipant={false}
                            onModerateParticipant={disabledAction}
                        />
                    ) : !isFocusMode ? (
                        <StackedClassroomLayout
                            videoStage={videoStage}
                            isTablet={isTablet}
                            isMobile={isMobile}
                            activeMobilePanel={activeMobilePanel}
                            onToggleMobilePanel={handleToggleMobilePanel}
                            resources={mappedClassroom.resources}
                            messages={mappedClassroom.messages}
                            currentUser={mappedClassroom.currentUser}
                            permissions={mappedClassroom.permissions}
                            participants={participants}
                            isUploadingResource={false}
                            isDeletingResource={false}
                            onUploadResource={disabledAction}
                            onDeleteResource={disabledAction}
                            isSendingMessage={false}
                            onSendMessage={disabledAction}
                            isModeratingParticipant={false}
                            onModerateParticipant={disabledAction}
                        />
                    ) : (
                        <div
                            className={cn(
                                'flex min-w-0 flex-1 flex-col gap-4',
                                isDesktop && 'h-full min-h-0',
                            )}
                        >
                            {videoStage}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
