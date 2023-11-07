import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
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

        server.use(userRouter)

        server.use((req: Request, res: Response) => {
            res.status(404),
            res.json({ error: 'Endpoint não encontrado!' })
        })

        server.listen(process.env.PORT, () => {
            console.log('Server rodando')
        })
    } catch (error) {
        console.log({ error })
    }
}

initSever()


