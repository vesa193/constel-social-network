import { useEffect, useState } from 'react';

const useAudio = (audioSrc: string) => {
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
    return {
        audio,
        duration,
        currentTime,
        isPlayAudio,
        handlePlayAudio,
    };
};

export default useAudio;
