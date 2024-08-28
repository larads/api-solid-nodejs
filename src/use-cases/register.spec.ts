import { compare } from 'bcryptjs'
import { RegisterUseCase } from './register'
import { expect, describe, it, beforeEach } from 'vitest'
import { UserAlreadyExistsError } from '../use-cases/errors/user-already-exists-error'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)
    })

    it('should to register', async () => {
        const { user } = await sut.execute({
            name: 'Mariana lara',
            email: 'mariana@gmail.com',
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const { user } = await sut.execute({
            name: 'Mariana lara',
            email: 'mariana@gmail.com',
            password: '123456',
        })
        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const email = 'mariana@gmail.com'

        await sut.execute({
            name: 'Mariana Lara',
            email,
            password: '123456',
        })

        await expect(() =>
            sut.execute({
                name: 'Mariana Lara',
                email,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})