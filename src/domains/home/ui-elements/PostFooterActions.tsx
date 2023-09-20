import { BaseColors, baseColors } from '@/themes/colors';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Typography } from '@mui/material';

type PostFooterActionsProps = {
    liked: boolean;
    likes: number;
    comments: number;
    handlePostLike: () => void;
    handleDeleteLike: () => void;
    handleOpenModal?: () => void;
};

const PostFooterActions = ({
    liked,
    likes,
    comments,
    handlePostLike,
    handleDeleteLike,
    handleOpenModal,
}: PostFooterActionsProps) => {
    return (
        <Box display="flex" sx={{ gap: '20px' }}>
            <Button
                variant="contained"
                color={liked ? 'tertiary' : 'quatinary'}
                sx={{ width: 90, display: 'flex', gap: 3 }}
                onClick={() => {
                    if (liked) {
                        handleDeleteLike();
                        return;
                    }
                    handlePostLike();
                }}
            >
                <FontAwesomeIcon
                    fontSize={19}
                    color={liked ? BaseColors.WHITE : BaseColors.GREY4}
                    icon={faHeart}
                />
                <Typography
                    variant="p2"
                    sx={{
                        color: liked ? baseColors.white : baseColors.secondary,
                        pointerEvents: liked ? 'auto' : 'auto',
                    }}
                >
                    {likes ? likes : 0}
                </Typography>
            </Button>
            <Button
                variant="contained"
                color="quatinary"
                sx={{ width: 90, display: 'flex', gap: 3 }}
                onClick={handleOpenModal}
            >
                <FontAwesomeIcon
                    fontSize={19}
                    color={BaseColors.GREY4}
                    icon={faComment}
                />
                <Typography variant="p2" color="secondary">
                    {comments ? comments : 0}
                </Typography>
            </Button>
        </Box>
    );
};

PostFooterActions.displayName = 'PostFooterActions';
export default PostFooterActions;
