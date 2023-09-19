import { BaseColors, baseColors } from '@/themes/colors';
import { formatDate } from '@/utils/utils';
import testPhoto from '@assets/img/test-photo.jpeg';
import {
    faCalendar,
    faComment,
    faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, InputAdornment, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useLocation, useSearchParams } from 'react-router-dom';
import useCommentsByPostId from '../hooks/useCommentsByPostId';
import usePost from '../hooks/usePost';
import CommentCard, { IComment } from '../ui-elements/CommentCard';
import styles from './PostDetailsModal.module.css';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        backgroundColor: theme.palette.tertiary,
    },
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const PostDetailsModal = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const modalId = searchParams.get('modalId') as string;
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

    const handleClose = () => {
        if (modalId) {
            location.search = '';
            setSearchParams(location.search);
        }
    };

    if (
        isPostFetching ||
        isPostLoading ||
        isCommentsFetching ||
        isCommentsLoading
    ) {
        return null;
    }

    console.log('postData', postData);

    if (!postData || !commentsList) {
        return null;
    }

    const { post } = postData;
    const { comments } = commentsList;

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={!!modalId}
                sx={{
                    '.MuiDialog-paper': {
                        background: BaseColors.GREY1,
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
                                flexDirection: 'row-reverse',
                                fontSize: '14px',
                            },
                        }}
                        fullWidth
                        variant="standard"
                        placeholder="Write a comment"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="end">
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box display="flex" sx={{ gap: '20px' }}>
                        <Button
                            variant="contained"
                            color="quatinary"
                            sx={{ width: 90, display: 'flex', gap: 3 }}
                        >
                            <FontAwesomeIcon
                                fontSize={19}
                                color={BaseColors.GREY4}
                                icon={faHeart}
                            />
                            <Typography variant="p2" color="secondary">
                                {post?.likes ? post.likes : 0}
                            </Typography>
                        </Button>
                        <Button
                            variant="contained"
                            color="quatinary"
                            sx={{ width: 90, display: 'flex', gap: 3 }}
                        >
                            <FontAwesomeIcon
                                fontSize={19}
                                color={BaseColors.GREY4}
                                icon={faComment}
                            />
                            <Typography variant="p2" color="secondary">
                                {post?.comments ? post.comments : 0}
                            </Typography>
                        </Button>
                    </Box>
                    {post?.comments ? (
                        <Typography variant="h2">
                            {post.comments} Comments
                        </Typography>
                    ) : null}

                    {comments?.map((comment: IComment) => {
                        return (
                            <CommentCard
                                key={comment.comment_id}
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
