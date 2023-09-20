import { Backdrop, CircularProgress } from '@mui/material';

type SpinnerProps = {
    isLoading: boolean;
};

const Spinner = ({ isLoading }: SpinnerProps) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

Spinner.displayName = 'Spinner';
export default Spinner;
