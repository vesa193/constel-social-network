import { useEffect, useState } from 'react';

const useAudio = (audioSrc: string, audioRef: any) => {
    const [isPlayAudio, setIsPlayAudio] = useState<boolean>(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audio = new Audio(audioSrc);
    let interval: any;

    useEffect(() => {
        if (audioRef?.current) {
            audioRef.current.src = audioSrc;
            console.log('IIII', audioRef?.current?.duration);
            audioRef?.current.addEventListener('loadedmetadata', (e: Event) => {
                console.log('ooooo', audioRef?.current?.duration, e);
            });
        }
    }, []);

    useEffect(() => {
        if (audioRef?.current) {
            audioRef?.current?.pause();
            console.log(
                'audioRef.current.currentTime',
                audioRef.current.currentTime,
                currentTime
            );
            const currentTimeSeconds = Math.round(
                audioRef?.current?.currentTime
            );
            setCurrentTime(currentTimeSeconds);
            // audioRef.current.currentTime = 0;
        }

        if (isPlayAudio) {
            // audio.play();
            audioRef?.current?.play();
            audioRef?.current?.addEventListener(
                'durationchange',
                (_e: Event) => {
                    if (audioRef?.current?.duration !== Infinity) {
                        console.log('DURATION', audioRef?.current?.duration);
                        const seconds = Math.round(audioRef?.current?.duration);
                        setDuration(seconds);
                    }
                }
            );
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
            audioRef?.current?.pause();
            const currentTimeSeconds = Math.round(
                audioRef?.current?.currentTime
            );
            console.log('Paused time', audioRef?.current?.currentTime);
            setCurrentTime(currentTimeSeconds);
        }
    };

    const startTime = () => {
        interval = setInterval(() => {
            if (audioRef?.current?.ended) {
                setIsPlayAudio(false);
                audioRef.current.currentTime = 0;
                setCurrentTime(audioRef.current.currentTime);
            }

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
