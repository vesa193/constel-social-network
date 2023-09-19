import PostDetailsModal from './domains/home/modals/PostDetailsModal';
import { ModalIds } from './modalIds';
/*
 * Modal configuration
 */
export const modals = [
    {
        id: ModalIds.POST_DETAILS,
        component: PostDetailsModal,
        hideBackdrop: false,
    },
];
