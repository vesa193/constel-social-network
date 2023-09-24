import { useEffect, useState } from 'react';

const useAudio = (audioSrc: string, audioRef: any) => {
    const [isPlayAudio, setIsPlayAudio] = useState<boolean>(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audio = new Audio(audioSrc);
    let interval: any;

    useEffect(() => {
        if (audioRef?.current) {
            console.log('audioRef?.current', audioRef?.current);
            audioRef.current.src = audioSrc;
        }
    }, []);

    useEffect(() => {
        if (audioRef?.current) {
            audioRef?.current?.pause && audioRef?.current?.pause();
            const currentTimeSeconds = Math.round(
                audioRef?.current?.currentTime
            );
            setCurrentTime(currentTimeSeconds);
        }

        if (isPlayAudio) {
            audioRef?.current &&
                audioRef?.current?.play &&
                audioRef?.current?.play();
            audioRef?.current?.addEventListener(
                'durationchange',
                (_e: Event) => {
                    if (audioRef?.current?.duration !== Infinity) {
                        const seconds = Math.round(audioRef?.current?.duration);
                        setDuration(seconds);
                    }
                }
            );

            audioRef?.current?.addEventListener('ended', (_e: Event) => {
                setIsPlayAudio(false);
                audioRef.current.currentTime = 0;
                setCurrentTime(audioRef.current.currentTime);
            });
            return;
        }

        stopTime();
    }, [isPlayAudio]);

    useEffect(() => {
        startTime();
        return () => clearInterval(interval);
    }, [isPlayAudio, setCurrentTime]);

    const stopTime = () => {
        if (!isPlayAudio) {
            audioRef?.current?.pause && audioRef?.current?.pause();
            const currentTimeSeconds = Math.round(
                audioRef?.current?.currentTime
            );
            setCurrentTime(currentTimeSeconds);
        }
    };

    const startTime = () => {
        interval = setInterval(() => {
            // if (audioRef?.current?.ended) {
            //     setIsPlayAudio(false);
            //     audioRef.current.currentTime = 0;
            //     setCurrentTime(audioRef.current.currentTime);
            // }

            if (isPlayAudio) {
                const currentTimeSeconds = Math.round(
                    audioRef?.current?.currentTime
                );
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
        audioRef,
        duration,
        currentTime,
        isPlayAudio,
        handlePlayAudio,
    };
};

export default useAudio;
