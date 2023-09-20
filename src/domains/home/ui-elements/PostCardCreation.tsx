import { BaseColors, baseBackground, baseColors } from '@/themes/colors';
import {
    faMicrophone,
    faPause,
    faPlay,
    faStop,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Box, Divider, TextField, Typography } from '@mui/material';
import BaseButton from '@components/button/BaseButton';
import { useRef, useState } from 'react';

type IPostCardCreation = {
    permission: boolean;
    recording: boolean;
    getMicrophonePermission: () => void;
    onStartRecord: () => void;
    onStopRecord: () => void;
    audio?: string | any;
    pictureSrc: string;
};

const PostCardCreation = ({
    pictureSrc,
    onStartRecord,
    onStopRecord,
    getMicrophonePermission,
    permission,
    recording,
    audio: audioSrc,
}: IPostCardCreation) => {
    const [isStartRecording, setIsStartRecording] = useState<boolean>(false);
    const [isPlayAudio, setIsPlayAudio] = useState<boolean>(false);
    const currentTime = useRef(0);
    let intervalId: any;

    const onPlayAudio = () => {
        const audio = new Audio(audioSrc);
        audio.play();
        setIsPlayAudio(true);

        audio.onloadedmetadata = function () {
            // console.log('INF^^^', audio.duration);
        };

        // console.log('INFOo2122', currentTime.current, audio.duration);

        intervalId = setInterval(() => {
            currentTime.current = audio.currentTime;
            // console.log('CURRENT time', audio.currentTime);
        }, 1000);

        if (currentTime.current === audio.duration) {
            clearInterval(intervalId);
        }
    };

    const onStopAudio = () => {
        const audio = new Audio(audioSrc);
        audio.pause();
        setIsPlayAudio(false);
        clearInterval(intervalId);
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
                    <Box
                        className="audio-player"
                        display="flex"
                        alignItems="center"
                        sx={{
                            padding: '12px',
                            background: baseColors.greyLight,
                            borderRadius: '10px',
                            gap: '10px',
                        }}
                    >
                        <audio src={audioSrc}></audio>
                        {!isPlayAudio ? (
                            <Box
                                data-clickable="play-audio"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: '50%',
                                    backgroundColor: baseColors.tertiary,
                                }}
                                onClick={onPlayAudio}
                            >
                                <FontAwesomeIcon
                                    icon={faPlay}
                                    color={BaseColors.WHITE}
                                    fontSize={14}
                                />
                            </Box>
                        ) : (
                            <Box
                                data-clickable="stop-audio"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: '50%',
                                    backgroundColor: baseColors.tertiary,
                                }}
                                onClick={onStopAudio}
                            >
                                <FontAwesomeIcon
                                    icon={faPause}
                                    color={BaseColors.WHITE}
                                    fontSize={14}
                                />
                            </Box>
                        )}
                        <Divider
                            className="timeline"
                            sx={{
                                borderColor: BaseColors.GREY4,
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        />
                        <Box display="flex">
                            <Typography variant="p3" color="secondary">
                                00:00
                            </Typography>
                            <Typography variant="p3" color="secondary">
                                /
                            </Typography>
                            <Typography variant="p3" color="secondary">
                                00:04
                            </Typography>
                        </Box>
                    </Box>
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
