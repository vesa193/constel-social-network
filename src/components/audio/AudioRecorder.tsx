import { BaseColors, baseColors } from '@/themes/colors';
import { formatTime } from '@/utils/utils';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Divider, Typography } from '@mui/material';

type AudioRecorderProps = {
    isPlayAudio: boolean;
    currentTime: number;
    duration: number;
    handlePlayAudio: (isPlayin: boolean) => void;
};

const AudioRecorder = ({
    isPlayAudio,
    currentTime,
    duration,
    handlePlayAudio,
}: AudioRecorderProps) => {
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
            <audio preload="auto"></audio>
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
                    onClick={() => handlePlayAudio(true)}
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
                    onClick={() => handlePlayAudio(false)}
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
                    {(!!currentTime &&
                        !isNaN(currentTime) &&
                        formatTime(currentTime)) ||
                        `00:00`}
                </Typography>
                <Typography variant="p3" color="secondary">
                    /
                </Typography>
                <Typography variant="p3" color="secondary">
                    {(!!duration && !isNaN(duration) && formatTime(duration)) ||
                        `00:00`}
                </Typography>
            </Box>
        </Box>
    );
};

AudioRecorder.displayName = 'AudioRecorder';
export default AudioRecorder;
