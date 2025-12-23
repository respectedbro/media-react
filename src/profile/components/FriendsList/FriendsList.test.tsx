import { render, screen } from '@testing-library/react'
import { FriendsList } from './FriendsList'


describe('FriendsList', () => {
    it('показываем тексть если нет друзей', () => {
        const mockOnRemoveFriend = jest.fn();

        render(<FriendsList friends={[]} onRemoveFriend={mockOnRemoveFriend}/>
        )
        
        expect(
            screen.getByText('Друзей пока нет')
        ).toBeInTheDocument()
    });

    it('В списке есть друзья', () => {
        const friend = {
            uid: '1',
            fullName: 'Вася',
            email: '12@as.com',
        }
        render(<FriendsList friends={[friend]} onRemoveFriend={jest.fn()} />);

        expect(screen.getByText('Вася')).toBeInTheDocument()
        expect(screen.queryByText('Друзей пока нет')).not.toBeInTheDocument()
    });
})