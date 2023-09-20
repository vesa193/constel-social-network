import { BaseColors } from '@/themes/colors';
import { formatDate } from '@/utils/utils';
import { faCalendar, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Typography } from '@mui/material';

type DeleteCommentParam = {
    postId: string;
    commentId: string;
};

export type IComment = {
    postId: string;
    comment_id: string;
    created_at: string;
    full_name: string;
    picture: string;
    text: string;
    username: string;
    deleteComment?: ({ postId, commentId }: DeleteCommentParam) => void;
};
export type CommentCardProps = IComment;

const CommentCard = ({
    postId,
    full_name: fullName,
    created_at: createdAt,
    comment_id: commentId,
    picture,
    text,
    username,
    deleteComment,
}: CommentCardProps) => {
    const theme = useTheme();
    return (
        <Box sx={{ display: 'grid', gap: '15px' }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box
                    display="flex"
                    sx={{
                        gap: '10px',
                    }}
                >
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
                <Box
                    display="flex"
                    sx={{
                        gap: '15px',
                        '& .MuiBox-root': {
                            [theme.breakpoints.down('sm')]: {
                                flexDirection: 'column',
                            },
                        },
                    }}
                >
                    <Box display="flex" sx={{ gap: '5px' }}>
                        <FontAwesomeIcon
                            icon={faCalendar}
                            color={BaseColors.GREY3}
                        />
                        <Typography variant="p3" color="secondary">
                            {createdAt ? formatDate(createdAt) : ''}
                        </Typography>
                    </Box>
                    <Box
                        display="flex"
                        sx={{ gap: '5px', cursor: 'pointer' }}
                        onClick={() => {
                            deleteComment &&
                                deleteComment({ postId, commentId });
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            color={BaseColors.RED}
                        />
                        <Typography
                            variant="p3"
                            color="error"
                            sx={{
                                '.MuiTypography-root': {
                                    [theme.breakpoints.down('xs')]: {
                                        display: 'none',
                                    },
                                },
                            }}
                        >
                            Delete
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Typography variant="p2">{text ? text : ''}</Typography>
        </Box>
    );
};

CommentCard.displayName = 'CommentCard';
export default CommentCard;
