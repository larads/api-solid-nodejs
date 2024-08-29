import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'

export async function appRoutes(app: FastifyInstance) {
    app.get('/me', profile)
    app.post('/users', register)
    app.post('/sessions', authenticate)
}