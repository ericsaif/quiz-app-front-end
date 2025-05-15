import React from 'react';

export const getModalStyle = (isModalOpen: boolean): React.CSSProperties => ({
    display: isModalOpen ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh', // Consider '100%' if vh is causing issues on mobile with address bars
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10000,
    overflow: 'hidden',
});