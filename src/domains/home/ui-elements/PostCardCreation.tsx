import { BaseColors, baseBackground } from '@/themes/colors';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Box, TextField } from '@mui/material';
import BaseButton from '@components/button/BaseButton';

type IPostCardCreation = {
    onRecord: () => void;
};

const PostCardCreation = ({ onRecord }: IPostCardCreation) => {
    return (
        <Box
            display="flex"
            sx={{
                borderRadius: '10px',
                backgroundColor: baseBackground.postBgd,
                gap: '2rem',
                padding: '20px',
            }}
        >
            <Box sx={{ flexBasis: '40px' }}>
                <Avatar
                    src=""
                    sx={{
                        '.MuiAvatar-fallback': {
                            fill: 'transparent',
                        },
                    }}
                />
            </Box>
            <Box
                flex={1}
                display="flex"
                flexDirection="column"
                sx={{ gap: '20px' }}
            >
                <TextField variant="standard" placeholder="What's happening" />
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <FontAwesomeIcon
                        icon={faMicrophone}
                        color={BaseColors.BLUE}
                        fontSize={24}
                        onClick={onRecord}
                    />
                    <BaseButton color="tertiary">New Post</BaseButton>
                </Box>
            </Box>
        </Box>
    );
};

PostCardCreation.displayName = 'PostCardCreation';
export default PostCardCreation;
