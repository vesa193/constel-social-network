import React from 'react';
/*
 * Modal configuration
 */

export type IModal = {
    id: string;
    component:
        | React.FunctionComponent<{ key: string; hideBackdrop: boolean }>
        | any;
    hideBackdrop: boolean;
    isOpen?: boolean;
    handleCloseModal?: () => void;
};

const renderModals = (modals: IModal[]) =>
    modals.map(({ component, id, hideBackdrop }: IModal) =>
        React.createElement(component, {
            key: id,
            hideBackdrop,
        })
    );

export default renderModals;
