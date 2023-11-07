import express, { ErrorRequestHandler, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import { mongoConnection } from './instances/mongo'
import userRouter from './routes/api'

const initSever = async () => {
    try {
        dotenv.config()

        await mongoConnection()

        const server = express()

        server.use(cors({}))

        server.use(express.json())

        server.use(express.urlencoded({extended: true}));

        server.use(passport.initialize())

        server.use(userRouter)

        server.use((req: Request, res: Response) => {
            res.status(404),
            res.json({ error: 'Endpoint não encontrado!' })
        })

        const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
            if(err.status) {
                res.status(err.status)
            } else {
                res.status(400) // Bad request
            }
            if(err.message) {
                res.json({ error: err.message })
            } else {
                res.json({ error: 'Ocorreu algum erro!' })
            }
        }
        server.use(errorHandler)

        server.listen(process.env.PORT, () => {
            console.log('Server rodando')
        })

    } catch (error) {
        console.log({ error })
    }
}

initSever()


