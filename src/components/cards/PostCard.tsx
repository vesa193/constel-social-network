import { BaseColors, baseBackground } from '@/themes/colors';
import { faCalendar, faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Box, Button, Typography } from '@mui/material';
import testImg from '@assets/img/test-photo.jpeg';
import styles from './PostCard.module.css';

const PostCard = () => {
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
                        />
                        <Box display="flex" flexDirection="column">
                            <Typography variant="p3" color="secondary">
                                @levraimcfly
                            </Typography>
                            <Typography variant="h3Bold">
                                Jorge Mckinney
                            </Typography>
                        </Box>
                    </Box>
                    <Box display="flex" sx={{ gap: '5px' }}>
                        <FontAwesomeIcon
                            icon={faCalendar}
                            color={BaseColors.GREY3}
                        />
                        <Typography variant="p2" color="secondary">
                            12.08.2023.
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <img
                className={styles.postCardImage}
                src={testImg}
                alt="test image"
            />
            <Box>
                <Typography variant="p2">
                    Pizza ipsum dolor meat lovers buffalo. Pepperoni sausage
                    banana bell ranch and white. Tossed bbq platter sauce
                    platter. Broccoli Hawaiian pineapple style Aussie
                    mozzarella. Pepperoni tomato thin.
                </Typography>
            </Box>
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
                        120
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
                        20
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
};

PostCard.displayName = 'PostCard';
export default PostCard;
