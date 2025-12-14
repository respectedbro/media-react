import {useState} from 'react';

interface CommentFormProps {
    onSubmit: (text:string) => void
}

const CommentForm = ({onSubmit}:CommentFormProps ) => {
    const [text, setText] =useState('')

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                if (!text.trim()) return;
                onSubmit(text);
                setText('');
            }}
        >

            <input
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Написать комментарий"
            />
            <button type="submit">Отправить</button>

        </form>
    );
};

export default CommentForm;