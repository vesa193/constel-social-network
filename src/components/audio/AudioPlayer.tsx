import { BaseColors, baseColors } from '@/themes/colors';
import { formatTime } from '@/utils/utils';
import { Box, Divider, Typography } from '@mui/material';
import { forwardRef, memo, useEffect } from 'react';
import AudioControls from './AudioControls';

type AudioPlayerProps = {
    audioSrc?: string;
    audioRef?: any;
    isPlayAudio: boolean;
    currentTime: number;
    duration: number;
    handlePlayAudio: (isPlayin: boolean) => void;
};

type Ref = HTMLAudioElement | null;

const AudioPlayer = forwardRef<Ref, AudioPlayerProps>(
    (
        {
            isPlayAudio,
            currentTime,
            duration,
            handlePlayAudio,
            audioRef: audioReference,
            audioSrc,
        },
        ref
    ) => {
        const audioRef = ref;

        const updateTimelineIndicator = () => {
            // Calculate the percentage of progress
            const progressPercentage = (currentTime / duration) * 100;
            const timelineIndicator =
                audioRef?.current?.nextSibling?.nextSibling?.querySelector(
                    '.timeline-indicator'
                )!;

            if (isPlayAudio && !audioReference?.current?.ended) {
                if (!timelineIndicator) return;
                timelineIndicator.style.visibility = 'visible';
                timelineIndicator.style.left = `${
                    progressPercentage !== Infinity ? progressPercentage : 0
                }%`;
                return;
            }

            if (!timelineIndicator) return;
            timelineIndicator.style.visibility = 'hidden';
            timelineIndicator.style.left = 0;
        };

        useEffect(() => {
            updateTimelineIndicator();
        }, [currentTime, duration]);

        return (
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
                <audio ref={ref} src={audioSrc} preload="auto"></audio>
                <AudioControls
                    isPlayAudio={isPlayAudio}
                    handlePlayAudio={handlePlayAudio}
                />

                <Box flex={1} position="relative">
                    <Divider
                        className="timeline"
                        sx={{
                            borderColor: BaseColors.GREY4,
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    />
                    <Box
                        className="timeline-indicator"
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '0%',
                            border: `1px solid ${BaseColors.RED}`,
                            height: 50,
                            transform: 'translateY(-50%)',
                            visibility: 'hidden',
                        }}
                    ></Box>
                </Box>
                <Box display="flex">
                    <Typography variant="p3" color="secondary">
                        {(!!currentTime &&
                            !isNaN(currentTime) &&
                            formatTime(currentTime)) ||
                            `00:00`}
                    </Typography>
                    <Typography variant="p3" color="secondary">
                        /
                    </Typography>
                    <Typography variant="p3" color="secondary">
                        {(!!duration &&
                            !isNaN(duration) &&
                            formatTime(duration)) ||
                            `00:00`}
                    </Typography>
                </Box>
            </Box>
        );
    }
);

AudioPlayer.displayName = 'AudioPlayer';
export default memo(AudioPlayer);
