import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Navigation = () => {
    const theme = useTheme();
    return (
        <Box
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
