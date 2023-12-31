import Spinner from '@/components/spinner/Spinner';
import { useForm } from '@/hooks/useForm';
import Drawer from '@components/drawer/Drawer';
import Navigation from '@components/navigation/Navigation';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeScreen.module.css';
import useLikeCreation from './hooks/useLikeCreation';
import useLikeDeletion from './hooks/useLikeDeletion';
import useMyAccount from './hooks/useMyAccount';
import usePostCreation from './hooks/usePostCreation';
import usePosts from './hooks/usePosts';
import PostCard, { IPostCard } from './ui-elements/PostCard';
import PostCreationCard from './ui-elements/PostCreationCard';

const HomePage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const {
        data: postData,
        isLoading: isPostDataLoading,
        isFetching: isPostDataFetching,
    } = usePosts();
    const { mutate: addLikeToPost, isLoading: isAddLikeCreationLoading } =
        useLikeCreation();
    const { mutate: removeLikeByPost, isLoading: isLikeDelitionLoading } =
        useLikeDeletion();
    const { data: meData } = useMyAccount();
    const { mutate: createPost } = usePostCreation();
    const { fields, onChange, onReset } = useForm({ text: '' });
    const [recording, setRecording] = useState(false);
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState<null | any>(null);
    const mediaRecorder = useRef<null | any>(null);
    const [recordingStatus, setRecordingStatus] = useState('inactive');
    const [audioChunks, setAudioChunks] = useState<any[]>([]);
    const [binaryAudio, setBinaryAudio] = useState<Blob | null>(null);
    const [audio, setAudio] = useState(null);
    const mimeType = 'audio/webm';
    const audioPlayerRef = useRef();

    const formProp = { fields, onChange };

    const getMicrophonePermission = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                // Success callback
                const streamData = await navigator.mediaDevices.getUserMedia(
                    // constraints - only audio needed for this app
                    {
                        audio: true,
                    }
                );
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                // Error callback
                console.error(
                    `The following getUserMedia error occurred: ${err}`
                );
            }
        } else {
        }
    };

    const onStopRecord = () => {
        setRecordingStatus('inactive');
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            setBinaryAudio(audioBlob);
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl as any);
            setAudioChunks([]);
        };
    };

    const onStartRecord = async () => {
        setRecordingStatus('recording');
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream);
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        let localAudioChunks: any[] = [];
        mediaRecorder.current.ondataavailable = (event: any) => {
            if (typeof event.data === 'undefined') return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks as any[]);
    };

    const handleAddLikeToPost = (postId: string) => {
        addLikeToPost(postId);
    };

    const handleRemoveLikeByPost = (postId: string) => {
        removeLikeByPost(postId);
    };

    const handleDeleteAudioRecorder = () => {
        setAudio(null);
        setPermission(false);
    };

    const handleCreatePost = () => {
        const formData = new FormData();
        binaryAudio && formData.append('audio', binaryAudio);
        fields?.text && formData.append('text', fields?.text);
        createPost(formData);
        onReset();
        handleDeleteAudioRecorder();
    };

    return (
        <Box className={styles.home}>
            <Spinner
                isLoading={
                    isPostDataLoading ||
                    isPostDataFetching ||
                    isAddLikeCreationLoading ||
                    isLikeDelitionLoading
                }
            />
            <Drawer />
            <Box
                display="flex"
                flexDirection="column"
                sx={{ overflowY: 'auto', overflowX: 'hidden' }}
            >
                <Navigation />
                <Box
                    className={styles.content}
                    component="section"
                    sx={{
                        flex: 1,
                        borderInline: `1px solid ${theme.palette.divider}`,
                        padding: '16px',
                        overflowY: 'auto',
                    }}
                >
                    <PostCreationCard
                        audioPlayerRef={audioPlayerRef}
                        pictureSrc={meData?.account?.picture}
                        audio={audio}
                        permission={permission}
                        recording={recording}
                        getMicrophonePermission={getMicrophonePermission}
                        onStartRecord={onStartRecord}
                        onStopRecord={onStopRecord}
                        handleCreatePost={handleCreatePost}
                        handleDeleteAudioRecorder={handleDeleteAudioRecorder}
                        {...formProp}
                    />
                    {(postData?.posts || [])?.map((post: IPostCard) => {
                        return (
                            <PostCard
                                key={post.post_id}
                                {...post}
                                handlePostLike={handleAddLikeToPost}
                                handleDeleteLike={handleRemoveLikeByPost}
                                handleOpenModal={(postId: string) => {
                                    navigate({
                                        search: `?modalId=${postId}`,
                                    });
                                }}
                            />
                        );
                    })}
                </Box>
            </Box>
            <Box sx={{ flexBasis: '200px' }} component="section"></Box>
        </Box>
    );
};

export default HomePage;
