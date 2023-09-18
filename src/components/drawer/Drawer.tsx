import { BaseColors } from '@/themes/colors';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import constelLogo from '@assets/img/constel_logo.svg';
import styles from './Drawer.module.css';

const Drawer = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            sx={{ flexBasis: '200px', paddingTop: '20px' }}
            component="aside"
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '100px',
                }}
            >
                <Avatar
                    src={constelLogo}
                    sx={{ width: 30, height: 30, justifySelf: 'center' }}
                />
                <Box component="nav" mt={10}>
                    <Link to="/home" className={styles.link}>
                        <FontAwesomeIcon
                            icon={faHouse}
                            color={BaseColors.BLUE}
                        />
                        <Typography variant="h1">Home</Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

Drawer.displayName = 'Drawer';
export default Drawer;
