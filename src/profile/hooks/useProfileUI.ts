import {useCallback, useState} from 'react';

interface UseProfileUI {
    creatingPost: boolean;

    openCreatePost: () => void;
    closeCreatePost: () => void;
    toggleCreatePost: () => void;
}

export function useProfileUI(): UseProfileUI {
    const [creatingPost, setCreatingPost] = useState(false);

    const openCreatePost = useCallback(() => {
        setCreatingPost(true);
    }, []);

    const closeCreatePost = useCallback(() => {
        setCreatingPost(false);
    }, []);

    const toggleCreatePost = useCallback(() => {
        setCreatingPost(prev => !prev);
    }, []);

    return {
        creatingPost,
        openCreatePost,
        closeCreatePost,
        toggleCreatePost
    };
}
