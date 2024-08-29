import { FastifyInstance } from 'fastify'

import { profile } from './profile'
import { register } from './register'
import { authenticate } from './authenticate'

import { verifyJwt } from '../../../middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
    app.get('/me', { onRequest: [verifyJwt] }, profile)
    app.post('/users', register)
    app.post('/sessions', authenticate)
}