import Spinner from '@/components/spinner/Spinner';
import { useForm } from '@/hooks/useForm';
import { BaseColors, baseColors } from '@/themes/colors';
import { formatDate } from '@/utils/utils';
import { faCalendar, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, InputAdornment, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { useLocation, useSearchParams } from 'react-router-dom';
import useCommentCreation from '../hooks/useCommentCreation';
import useCommentDeletion from '../hooks/useCommentDeletion';
import useCommentsByPostId from '../hooks/useCommentsByPostId';
import useLikeCreation from '../hooks/useLikeCreation';
import useLikeDeletion from '../hooks/useLikeDeletion';
import usePost from '../hooks/usePost';
import CommentCard, { IComment } from '../ui-elements/CommentCard';
import PostFooterActions from '../ui-elements/PostFooterActions';
import styles from './PostDetailsModal.module.css';
import useAudio from '@/hooks/useAudio';
import AudioPlayer from '@/components/audio/AudioPlayer';
import { useRef } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        backgroundColor: theme.palette.tertiary,
    },
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
}));

const PostDetailsModal = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const theme = useTheme();
    const modalId = searchParams.get('modalId') as string;
    const { fields, onChange, onReset } = useForm({ text: '' });
    const {
        data: postData,
        isFetching: isPostFetching,
        isLoading: isPostLoading,
    } = usePost(modalId);
    const {
        data: commentsList,
        isFetching: isCommentsFetching,
        isLoading: isCommentsLoading,
    } = useCommentsByPostId(modalId);
    const post = postData?.post;
    const comments = commentsList?.comments;
    const { mutate: addLikeToPost } = useLikeCreation();
    const { mutate: removeLikeByPost } = useLikeDeletion();
    const { mutate: createComment } = useCommentCreation();
    const { mutate: deleteComment } = useCommentDeletion();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { isPlayAudio, handlePlayAudio, currentTime, duration } = useAudio(
        post?.audio || '',
        audioRef
    );

    const handleClose = () => {
        if (modalId) {
            location.search = '';
            setSearchParams(location.search);
        }
    };

    const handlePostLike = (postId: string) => {
        addLikeToPost(postId);
    };

    const handleDeleteLike = (postId: string) => {
        removeLikeByPost(postId);
    };

    return (
        <div>
            <Spinner
                isLoading={
                    isPostFetching ||
                    isCommentsFetching ||
                    isPostLoading ||
                    isCommentsLoading
                }
            />
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={!!modalId}
                sx={{
                    '.MuiDialog-paper': {
                        background: BaseColors.GREY1,
                        [theme.breakpoints.down('sm')]: {
                            margin: 0,
                            maxWidth: 'none',
                            minWidth: 240,
                            width: '100%',
                            maxHeight: '100vh',
                            borderRadius: 0,
                        },
                    },
                }}
            >
                <DialogTitle sx={{ m: 0 }} id="customized-dialog-title">
                    <Box
                        display="flex"
                        alignItems="center"
                        sx={{ gap: '10px' }}
                    >
                        <Avatar
                            sx={{
                                '.MuiAvatar-fallback': { fill: 'transparent' },
                            }}
                            src={post?.user?.picture ? post?.user?.picture : ''}
                        />
                        <Box display="flex" flexDirection="column">
                            <Typography variant="p3" color="secondary">
                                {post?.user?.username
                                    ? `@${post.user.username}`
                                    : ''}
                            </Typography>
                            <Typography variant="h3Bold">
                                {post?.user?.full_name
                                    ? post.user.full_name
                                    : ''}
                            </Typography>
                        </Box>
                    </Box>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent
                    dividers
                    sx={{ border: 0, display: 'grid', gap: '15px' }}
                >
                    {post?.image ? (
                        <img
                            className={styles.postImage}
                            src={post?.image ? post.image : ''}
                            alt={
                                post?.user?.username
                                    ? `@${post.user.username}`
                                    : ''
                            }
                            width="100%"
                            height={280}
                        />
                    ) : null}
                    <Typography gutterBottom>
                        {post?.text ? post.text : ''}
                    </Typography>
                    {post?.audio ? (
                        <AudioPlayer
                            ref={audioRef}
                            audioSrc={post?.audio || ''}
                            handlePlayAudio={handlePlayAudio}
                            currentTime={currentTime}
                            duration={duration}
                            isPlayAudio={isPlayAudio}
                        />
                    ) : null}
                    <Box display="flex" sx={{ gap: '5px' }}>
                        <FontAwesomeIcon
                            icon={faCalendar}
                            color={BaseColors.GREY3}
                        />
                        <Typography variant="p3" color="secondary">
                            {post?.created_at
                                ? formatDate(post.created_at)
                                : ''}
                        </Typography>
                    </Box>
                    <TextField
                        sx={{
                            '.MuiInput-root': {
                                display: 'flex',
                                fontSize: '14px',
                            },
                            '.MuiInputBase-root.MuiInput-root::after': {
                                borderColor: baseColors.tertiary,
                            },
                            '& .MuiInputBase-root.MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before':
                                {
                                    borderColor: baseColors.tertiary,
                                },
                        }}
                        name="text"
                        value={fields?.text}
                        onChange={onChange}
                        fullWidth
                        variant="standard"
                        placeholder="Write a comment"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    sx={{
                                        cursor: 'pointer',
                                        color: fields.text
                                            ? BaseColors.BLUE
                                            : BaseColors.GREY2,
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faPaperPlane}
                                        onClick={() => {
                                            if (!fields?.text) return;

                                            createComment({
                                                postId: post?.post_id,
                                                text: fields?.text,
                                            });
                                            onReset();
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <PostFooterActions
                        liked={post?.liked}
                        likes={post?.likes}
                        comments={comments?.length ? comments.length : 0}
                        handlePostLike={() => handlePostLike(post?.post_id)}
                        handleDeleteLike={() => handleDeleteLike(post?.post_id)}
                    />

                    <Typography variant="h2">
                        {post?.comments ? post.comments : 0} Comments
                    </Typography>

                    {comments?.map((comment: IComment) => {
                        return (
                            <CommentCard
                                key={comment.comment_id}
                                deleteComment={(commentData) =>
                                    deleteComment({
                                        postId: post?._id,
                                        commentId: commentData?.commentId,
                                    })
                                }
                                {...comment}
                            />
                        );
                    })}
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
};

PostDetailsModal.displayName = 'PostDetailsModal';
export default PostDetailsModal;
