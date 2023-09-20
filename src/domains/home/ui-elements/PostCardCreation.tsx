import AudioRecorder from '@/components/audio/AudioRecorder';
import { BaseColors, baseBackground, baseColors } from '@/themes/colors';
import BaseButton from '@components/button/BaseButton';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

type IPostCardCreation = {
    permission: boolean;
    recording: boolean;
    getMicrophonePermission: () => void;
    onStartRecord: () => void;
    onStopRecord: () => void;
    audio?: string | any;
    pictureSrc: string;
    audioPlayerRef: any;
};

const PostCardCreation = ({
    pictureSrc,
    onStartRecord,
    onStopRecord,
    getMicrophonePermission,
    permission,
    audio: audioSrc,
}: IPostCardCreation) => {
    const [isStartRecording, setIsStartRecording] = useState<boolean>(false);
    const [isPlayAudio, setIsPlayAudio] = useState<boolean>(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audio = new Audio(audioSrc);
    let interval: any;

    useEffect(() => {
        if (isPlayAudio) {
            audio.play();
            audio.addEventListener('durationchange', (_e: Event) => {
                if (audio?.duration !== Infinity) {
                    const seconds = Math.round(audio.duration);
                    setDuration(seconds);
                }
            });
            return;
        }

        audio.pause();
    }, [isPlayAudio]);

    useEffect(() => {
        startTime();
        return () => clearInterval(interval);
    }, [isPlayAudio, setCurrentTime]);

    const startTime = () => {
        interval = setInterval(() => {
            if (audio?.ended) {
                setIsPlayAudio(false);
            }

            if (isPlayAudio) {
                const currentTimeSeconds = Math.round(audio?.currentTime);
                setCurrentTime(currentTimeSeconds);
            }
        }, 1000);
    };

    const handlePlayAudio = (isPlaying: boolean) => {
        if (isPlaying) {
            setIsPlayAudio(isPlaying);
            return;
        }

        setIsPlayAudio(isPlaying);
    };

    return (
        <Box
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
                <TextField variant="standard" placeholder="What's happening" />
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
                        <Box>
                            <FontAwesomeIcon
                                onClick={getMicrophonePermission}
                                icon={faMicrophone}
                                color={BaseColors.BLUE}
                                fontSize={24}
                            />
                        </Box>
                    )}
                    <BaseButton color="tertiary">New Post</BaseButton>
                </Box>
            </Box>
        </Box>
    );
};

PostCardCreation.displayName = 'PostCardCreation';
export default PostCardCreation;
