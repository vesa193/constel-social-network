import { BaseColors } from '@/themes/colors';
import { formatDate } from '@/utils/utils';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Box, Typography } from '@mui/material';

export type IComment = {
    comment_id: string;
    created_at: string;
    full_name: string;
    picture: string;
    text: string;
    username: string;
};
export type CommentCardProps = IComment;

const CommentCard = ({
    full_name: fullName,
    created_at: createdAt,
    picture,
    text,
    username,
}: CommentCardProps) => {
    return (
        <Box sx={{ display: 'grid', gap: '15px' }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
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
                        {createdAt ? formatDate(createdAt) : ''}
                    </Typography>
                </Box>
            </Box>
            <Typography variant="p2">{text ? text : ''}</Typography>
        </Box>
    );
};

CommentCard.displayName = 'CommentCard';
export default CommentCard;
