import { render, screen } from '@testing-library/react'
import {ProfileInfo} from "./ProfileInfo";
import type {UserData} from "@/types/types";

describe('Счётчики профиля', () => {
    const user: UserData = {
        uid:'3',
        email: 'test@test.com',
        fullName: 'Alex'
    }

    it('Отображает кол-во постов', () => {
        render(
            <ProfileInfo userData={user} postsCount={5} friendsCount={0}/>
        )

        expect(screen.getByTestId('posts-count')).toHaveTextContent('5')
    });

    it('Отображает кол-во друзей ', () => {
        const user: UserData = {
            uid:'3',
            email: 'test@test.com',
            fullName: 'Alex'
        }

        render(
            <ProfileInfo userData={user} postsCount={0} friendsCount={3}/>
        )

        expect(screen.getByTestId('friends-count')).toHaveTextContent('3')
    });

    it('Показывает 0 друзей', () => {
        const user: UserData = {
            uid:'3',
            email: 'test@test.com',
            fullName: 'Alex'
        }

        render(
            <ProfileInfo userData={user} postsCount={10} friendsCount={0}/>
        )

        expect(screen.getByTestId('friends-count')).toHaveTextContent('0')
    });
});