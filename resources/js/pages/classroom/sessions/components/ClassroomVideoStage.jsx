import { cn } from '@/lib/utils';
import CustomControlBar from './CustomControlBar';
import FocusModeOverlay from './FocusModeOverlay';
import MainVideoArea from './MainVideoArea';

export default function ClassroomVideoStage({
    isDesktop,
    isFocusMode,
    session,
    currentParticipant,
    currentUser,
    participants,
    isJoined,
    permissions,
    canJoin,
    isJoining,
    onJoin,
    isParticipantUpdating,
    isLeaving,
    areFocusControlsVisible,
    isJoinedHostWithNativeRecordingControl,
    onUpdateParticipant,
    onToggleFocusMode,
    revealFocusControls,
    onLeave,
    activeFocusOverlay,
    setActiveFocusOverlay,
    messages,
    isSendingMessage,
    onSendMessage,
    chatFilterParticipant,
    setChatFilterParticipant,
    onEditMessage,
    onDeleteMessage,
    isModeratingParticipant,
    onModerateParticipant,
}) {
    return (
        <div
            className={cn(
                'relative w-full flex-none',
                !isFocusMode &&
                    (isDesktop ? 'h-[620px] flex-none' : 'aspect-video'),
                isFocusMode &&
                    'fixed inset-0 z-50 min-h-0 bg-neutral-950 p-2 md:p-3',
            )}
        >
            <MainVideoArea
                session={session}
                currentParticipant={currentParticipant}
                currentUser={currentUser}
                participants={participants}
                isJoined={isJoined}
                isFocusMode={isFocusMode}
                canJoin={canJoin}
                isJoining={isJoining}
                onJoin={onJoin}
            />

            <CustomControlBar
                currentParticipant={currentParticipant}
                permissions={permissions}
                isJoined={isJoined}
                isLoading={isParticipantUpdating}
                isLeaving={isLeaving}
                isFocusMode={isFocusMode}
                isVisible={!isFocusMode || areFocusControlsVisible}
                splitForNativeRecordingControl={
                    isJoinedHostWithNativeRecordingControl
                }
                onUpdateParticipant={onUpdateParticipant}
                onToggleFocusMode={onToggleFocusMode}
                onInteraction={() => revealFocusControls()}
                onHoldVisibility={() =>
                    revealFocusControls({ keepVisible: true })
                }
                onLeave={onLeave}
               className= {('bg-amber-700')}
                   
                
            />

            {isFocusMode && (
                <FocusModeOverlay
                    activeFocusOverlay={activeFocusOverlay}
                    setActiveFocusOverlay={setActiveFocusOverlay}
                    areFocusControlsVisible={areFocusControlsVisible}
                    revealFocusControls={revealFocusControls}
                    messages={messages}
                    currentUser={currentUser}
                    permissions={permissions}
                    isSending={isSendingMessage}
                    onSendMessage={onSendMessage}
                    participants={participants}
                    chatFilterParticipant={chatFilterParticipant}
                    setChatFilterParticipant={setChatFilterParticipant}
                    onEditMessage={onEditMessage}
                    onDeleteMessage={onDeleteMessage}
                    isModerating={isModeratingParticipant}
                    onModerateParticipant={onModerateParticipant}
                />
            )}
        </div>
    );
}
