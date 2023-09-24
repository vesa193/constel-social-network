import { BaseColors, baseColors } from '@/themes/colors';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box } from '@mui/material';
import { memo } from 'react';

type AudioControlsProps = {
    isPlayAudio: boolean;
    handlePlayAudio: (isPlayin: boolean) => void;
};

const AudioControls = ({
    isPlayAudio,
    handlePlayAudio,
}: AudioControlsProps) => {
    return (
        <>
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
                        cursor: 'pointer',
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
                        cursor: 'pointer',
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
        </>
    );
};

AudioControls.displayName = 'AudioControls';
export default memo(AudioControls);
