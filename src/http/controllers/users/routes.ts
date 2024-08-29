import { FastifyInstance } from 'fastify'

import { profile } from './profile'
import { refresh } from './refresh'
import { register } from './register'
import { authenticate } from './authenticate'

import { verifyJwt } from '../../../middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
    app.get('/me', { onRequest: [verifyJwt] }, profile)
    app.post('/users', register)
    app.post('/sessions', authenticate)
    app.patch('/token/refresh', refresh)
}