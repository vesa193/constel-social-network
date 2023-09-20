import { BaseColors, baseBackground, baseColors } from '@/themes/colors';
import { faCalendar, faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Box, Button, Typography } from '@mui/material';
import testImg from '@assets/img/test-photo.jpeg';
import styles from './PostCard.module.css';
import { formatDate } from '@/utils/utils';
import PostFooterActions from './PostFooterActions';

export type IUser = {
    full_name: string;
    picture: string;
    username: string;
};

export type IPostCard = {
    audio: null | string;
    comments: number;
    created_at: string;
    image: string;
    liked: boolean;
    likes: number;
    post_id: string;
    text: string;
    user: IUser;
    user_id: string;
    handleOpenModal?: (postId: string) => void;
    handlePostLike: (postId: string) => void;
    handleDeleteLike: (postId: string) => void;
};

const PostCard = ({
    user: { full_name: fullName, username, picture },
    image,
    text,
    created_at: createdAt,
    comments,
    likes,
    post_id: postId,
    liked,
    handleOpenModal,
    handlePostLike,
    handleDeleteLike,
}: IPostCard) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            sx={{
                marginTop: 5,
                padding: '20px',
                borderRadius: '10px',
                background: baseBackground.postBgd,
                gap: '10px',
            }}
        >
            <Box>
                <Box display="flex" justifyContent="space-between">
                    <Box display="flex" sx={{ gap: '10px' }}>
                        <Avatar
                            sx={{
                                width: 40,
                                height: 40,
                                '.MuiAvatar-fallback': {
                                    fill: 'transparent',
                                },
                            }}
                            srcSet={picture ? picture : ''}
                        />
                        <Box display="flex" flexDirection="column">
                            <Typography variant="p3" color="secondary">
                                {username ? `@${username}` : ''}
                            </Typography>
                            <Typography variant="h3Bold">
                                {fullName ? fullName : ''}
                            </Typography>
                        </Box>
                    </Box>
                    <Box display="flex" sx={{ gap: '5px' }}>
                        <FontAwesomeIcon
                            icon={faCalendar}
                            color={BaseColors.GREY3}
                        />
                        <Typography variant="p3" color="secondary">
                            {formatDate(createdAt)}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            {image ? (
                <img
                    className={styles.postCardImage}
                    src={image}
                    alt={username}
                />
            ) : null}
            {text ? (
                <Box>
                    <Typography variant="p2">{text ? text : ''}</Typography>
                </Box>
            ) : null}
            <PostFooterActions
                liked={liked}
                likes={likes}
                comments={comments}
                handlePostLike={() => handlePostLike(postId)}
                handleDeleteLike={() => handleDeleteLike(postId)}
                handleOpenModal={() =>
                    handleOpenModal && handleOpenModal(postId)
                }
            />
        </Box>
    );
};

PostCard.displayName = 'PostCard';
export default PostCard;
