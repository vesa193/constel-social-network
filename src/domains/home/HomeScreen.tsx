import PostCard, { IPostCard } from './ui-elements/PostCard';
import PostCardCreation from './ui-elements/PostCardCreation';
import Drawer from '@/components/drawer/Drawer';
import Navigation from '@/components/navigation/Navigation';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styles from './HomeScreen.module.css';
import useGetPosts from './hooks/useGetPosts';

const HomePage = () => {
    const theme = useTheme();
    const { data: postData, isLoading, isFetching } = useGetPosts();

    console.log('posts', postData);

    if (isLoading || isFetching) {
        return <Typography>Loading...</Typography>;
    }

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
                        overflowY: 'auto',
                    }}
                    component="main"
                >
                    <PostCardCreation onRecord={() => console.log('ssss')} />
                    {(postData?.posts || [])?.map((post: IPostCard) => {
                        return <PostCard key={post.post_id} {...post} />;
                    })}
                </Box>
            </Box>
            <Box sx={{ flexBasis: '200px' }} component="section"></Box>
        </Box>
    );
};

export default HomePage;
