import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styles from './Navigation.module.css';

const Navigation = () => {
    const theme = useTheme();
    return (
        <Box
            className={styles.navigation}
            component="nav"
            sx={{
                position: 'sticky' || '-webkit-sticky',
                top: 0,
                borderInline: `1px solid ${theme.palette.divider}`,
                borderBottom: `1px solid ${theme.palette.divider}`,
                padding: '24px 0 10px 20px',
            }}
        >
            <Typography variant="h1">Home</Typography>
        </Box>
    );
};

Navigation.displayName = 'Navigation';
export default Navigation;
