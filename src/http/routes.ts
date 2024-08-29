import { FastifyInstance } from 'fastify'
import { profile } from './controllers/profile'
import { register } from './controllers/register'
import { verifyJwt } from '../middlewares/verify-jwt'
import { authenticate } from './controllers/authenticate'

export async function appRoutes(app: FastifyInstance) {
    app.get('/me', { onRequest: [verifyJwt] }, profile)
    app.post('/users', register)
    app.post('/sessions', authenticate)
}