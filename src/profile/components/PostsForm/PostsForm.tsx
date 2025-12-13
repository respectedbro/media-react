import React, {useState} from 'react';
import styles from './Posts.Form.module.scss';

interface PostsFormProps {
    onCreate: (data: {title:string, content:string}) => void
    onCancel: () => void;
}

export const PostsForm: React.FC<PostsFormProps> = ({onCreate, onCancel }:PostsFormProps) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleSubmit = () => {
        if (!title.trim() || !content.trim()) return

        onCreate({title, content})

        setTitle('')
        setContent('')
    }
    return (
        <form className={styles.newPostForm} onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                className={styles.postTitleInput}
                placeholder="Заголовок"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                className={styles.postContentInput}
                placeholder="Что у вас нового?"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <div className={styles.postActions}>
                <button type="button" className={styles.cancelButton} onClick={onCancel}>
                    Отмена
                </button>
                <button type="button" className={styles.publishButton} onClick={handleSubmit} disabled={!title.trim() || !content.trim()}>
                    Опубликовать
                </button>
            </div>
        </form>
    );
};