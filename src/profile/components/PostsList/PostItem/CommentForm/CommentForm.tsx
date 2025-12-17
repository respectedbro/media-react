import {useState} from 'react';

import styles from '../PostItem.module.scss'

interface CommentFormProps {
    onSubmit: (text:string) => Promise<void>
}

const CommentForm = ({onSubmit}:CommentFormProps ) => {
    const [text, setText] =useState('')

    return (
        <form
            className={styles.commentForm}
            onSubmit={async e => {
                e.preventDefault();
                if (!text.trim()) return;
                await onSubmit(text);
                setText('');
            }}
        >

            <input
                className={styles.commentInput}
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Написать комментарий"
            />
            <button className={styles.commentBtn} type="submit">Отправить</button>

        </form>
    );
};

export default CommentForm;