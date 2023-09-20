import { BaseColors } from '@/themes/colors';
import { faHouse, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Box, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import constelLogo from '@assets/img/constel_logo.svg';
import styles from './Drawer.module.css';
import { routePaths } from '@/router/routePaths';

const Drawer = () => {
    const location = useLocation();
    const { pathname } = location;

    return (
        <Box
            className={styles.drawer}
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
                <Box
                    component="nav"
                    mt={10}
                    sx={{ display: 'grid', gap: '16px' }}
                >
                    <Link
                        to={routePaths.HOME}
                        className={`${styles.link} ${
                            pathname.startsWith(routePaths.HOME)
                                ? styles.active
                                : ''
                        }`}
                    >
                        <FontAwesomeIcon
                            icon={faHouse}
                            color={
                                pathname.startsWith(routePaths.HOME)
                                    ? BaseColors.BLUE
                                    : BaseColors.BLACK
                            }
                        />
                        <Typography variant="h1">Home</Typography>
                    </Link>
                    <Link
                        to={routePaths.LOGIN}
                        replace
                        className={`${styles.link} ${
                            pathname.startsWith(routePaths.LOGIN)
                                ? styles.active
                                : ''
                        }`}
                        onClick={() => {
                            localStorage.removeItem('token');
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faPowerOff}
                            color={
                                pathname.startsWith(routePaths.LOGIN)
                                    ? BaseColors.BLUE
                                    : BaseColors.BLACK
                            }
                        />
                        <Typography variant="h1">Logout</Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

Drawer.displayName = 'Drawer';
export default Drawer;
