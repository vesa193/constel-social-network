import Drawer from '@/components/drawer/Drawer';
import Navigation from '@/components/navigation/Navigation';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styles from './HomeScreen.module.css';

const HomePage = () => {
    const theme = useTheme();

    return (
        <Box display="flex" className={styles.home}>
            <Drawer />
            <Box display="flex" flexDirection="column" flex={1}>
                <Navigation />
                <Box
                    sx={{
                        flex: 1,
                        borderInline: `1px solid ${theme.palette.divider}`,
                        padding: '16px',
                    }}
                    component="main"
                >
                    MAIN
                </Box>
            </Box>
            <Box sx={{ flexBasis: '200px' }} component="section"></Box>
        </Box>
    );
};

export default HomePage;
