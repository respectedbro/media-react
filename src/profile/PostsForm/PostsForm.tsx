// src/profile/PostsForm/PostsForm.tsx
import React from 'react';
import styles from './Posts.Form.module.scss';

interface PostsFormProps {
    newPost: { title: string; content: string };
    setNewPost: React.Dispatch<React.SetStateAction<{ title: string; content: string }>>;
    onCreate: () => void | Promise<void>;
    onCancel: () => void;
}

export const PostsForm: React.FC<PostsFormProps> = ({ newPost, setNewPost, onCreate, onCancel }) => {
    return (
        <form className={styles.newPostForm} onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                className={styles.postTitleInput}
                placeholder="Заголовок"
                value={newPost.title}
                onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
            />

            <textarea
                className={styles.postContentInput}
                placeholder="Что у вас нового?"
                rows={4}
                value={newPost.content}
                onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
            />

            <div className={styles.postActions}>
                <button type="button" className={styles.cancelButton} onClick={onCancel}>
                    Отмена
                </button>
                <button type="button" className={styles.publishButton} onClick={onCreate}>
                    Опубликовать
                </button>
            </div>
        </form>
    );
};