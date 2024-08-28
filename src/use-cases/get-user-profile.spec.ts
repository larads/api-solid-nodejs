import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetUserProfileUseCase } from '../use-cases/get-user-profile'
import { ResourceNotFoundError } from '../use-cases/errors/resource-not-found-error'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })

    it('should be able to get user profile', async () => {
        const createdUser = await usersRepository.create({
            name: 'Mariana Lara',
            email: 'mariana@gmail.com',
            password_hash: await hash('123456', 6),
        })

        const { user } = await sut.execute({
            userId: createdUser.id,
        })

        expect(user.name).toEqual('Mariana Lara')
    })

    it('should not be able to get user profile with wrong id', async () => {
        await expect(() =>
            sut.execute({
                userId: 'non-existing-id',
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})