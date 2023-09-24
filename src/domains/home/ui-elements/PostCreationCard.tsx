import AudioRecorder from '@/components/audio/AudioPlayer';
import useAudio from '@/hooks/useAudio';
import { BaseColors, baseBackground, baseColors } from '@/themes/colors';
import BaseButton from '@components/button/BaseButton';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Box } from '@mui/material';
import { useRef, useState } from 'react';
import styles from './PostCreationCard.module.css';
import PostCreationInput from './PostCreationInput';

type Fields = {
    text: '';
};

type IPostCardCreation = {
    permission: boolean;
    recording: boolean;
    getMicrophonePermission: () => void;
    onStartRecord: () => void;
    onStopRecord: () => void;
    handleCreatePost: () => void;
    handleDeleteAudioRecorder: () => void;
    audio?: string | any;
    pictureSrc: string;
    audioPlayerRef: any;
    fields: Fields;
};

const PostCreationCard = ({
    pictureSrc,
    onStartRecord,
    onStopRecord,
    getMicrophonePermission,
    permission,
    audio: audioSrc,
    handleCreatePost,
    handleDeleteAudioRecorder,
    fields,
}: IPostCardCreation) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { isPlayAudio, duration, currentTime, handlePlayAudio } = useAudio(
        audioSrc || '',
        audioRef
    );
    const [isStartRecording, setIsStartRecording] = useState<boolean>(false);

    console.log('AUDIO SRC ---', audioSrc);

    return (
        <Box
            className={styles.postCreationCard}
            display="flex"
            sx={{
                borderRadius: '10px',
                backgroundColor: baseBackground.postBgd,
                gap: '2rem',
                padding: '20px',
            }}
        >
            <Box sx={{ flexBasis: '40px' }}>
                <Avatar
                    src={pictureSrc ? pictureSrc : ''}
                    sx={{
                        '.MuiAvatar-fallback': {
                            fill: 'transparent',
                        },
                    }}
                />
            </Box>
            <Box
                flex={1}
                display="flex"
                flexDirection="column"
                sx={{ gap: '20px' }}
            >
                <PostCreationInput />

                {permission && !audioSrc && (
                    <Box
                        sx={{
                            padding: '12px',
                            background: baseColors.greyLight,
                            borderRadius: '10px',
                        }}
                    >
                        {!isStartRecording ? (
                            <Box
                                data-clickable="start-record"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: '50%',
                                    backgroundColor: baseColors.tertiary,
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    setIsStartRecording(true);
                                    onStartRecord();
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faMicrophone}
                                    color={BaseColors.WHITE}
                                    fontSize={14}
                                />
                            </Box>
                        ) : (
                            <Box
                                data-clickable="stop-record"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: '50%',
                                    backgroundColor: baseColors.error,
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    setIsStartRecording(false);
                                    onStopRecord();
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faStop}
                                    color={BaseColors.WHITE}
                                    fontSize={14}
                                />
                            </Box>
                        )}
                    </Box>
                )}
                {audioSrc ? (
                    <AudioRecorder
                        ref={audioRef}
                        isPlayAudio={isPlayAudio}
                        currentTime={currentTime}
                        duration={duration}
                        handlePlayAudio={handlePlayAudio}
                    />
                ) : null}
                <Box
                    display="flex"
                    justifyContent={permission ? 'flex-end' : 'space-between'}
                    alignItems="center"
                >
                    {!permission && (
                        <Box sx={{ cursor: 'pointer' }}>
                            <FontAwesomeIcon
                                onClick={getMicrophonePermission}
                                icon={faMicrophone}
                                color={BaseColors.BLUE}
                                fontSize={24}
                            />
                        </Box>
                    )}
                    <Box
                        display="flex"
                        alignItems="center"
                        sx={{ gap: '20px', cursor: 'pointer' }}
                    >
                        {permission ? (
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                fontSize={24}
                                color={BaseColors.RED}
                                onClick={handleDeleteAudioRecorder}
                                style={{ cursor: 'pointer' }}
                            />
                        ) : null}
                        <BaseButton
                            color="tertiary"
                            isDisabled={!fields?.text}
                            onClick={handleCreatePost}
                        >
                            New Post
                        </BaseButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

PostCreationCard.displayName = 'PostCreationCard';
export default PostCreationCard;
