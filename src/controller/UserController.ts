import { Request, Response } from "express";
import { User } from '../models/UserSchema';
import { Types, isValidObjectId } from "mongoose";
import JWT from 'jsonwebtoken'
import { generateToken } from "../config/passport";

export const all = async (req: Request, res: Response) => {
    const users = await User.find()

    let list: string[] = []

    for (let i in users) {
        list.push(users[i].email)
    }

    res.json({ list })
}

export const addUser = async (req: Request, res: Response) => {
    try {
        const { email, age, interests, name, tasks, password } = req.body

        if (!email) return res.json({ error: 'Email não enviado!' })
        if (!password) return res.json({ error: 'Senha não enviada!' })

        const hasUser = await User.findOne({ email })

        if (hasUser) return res.json({ error: 'E-mail já existe.' });

        const newUser = await User.create({
            name,
            email,
            age: parseInt(age),
            interests,
            tasks,
            password
        })

        const token = JWT.sign(
            { id: newUser.id, email: newUser.email },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: '2h' }
        )

        res.status(200)
        res.json({ user: newUser, token })
    } catch (error) {

        res.json({ error: 'Não conseguimos cadastrar o usuário ao BLOG!' })
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if(email && password) {
        let email: string = req.body.email
        let password: string = req.body.password

        let user = await User.findOne({
            email,
            password
        })

        if(user) {
            const token = generateToken({ id: user.id })
            console.log({ token, user })
            return res.json({ status: true, token })
        }

        res.json({ error: true })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!Types.ObjectId.isValid(id)) return res.json({ error: 'Id do usuário inválido!' })

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true
    })

    if (!updateUser) return res.json({ error: 'User não encontrado!' })

    res.json({ updatedUser })
}

export const removeUser = async (req: Request, res: Response) => {
    const { id } = req.params

    const deleted = await User.deleteOne({ _id: id })

    console.log(deleted)

    res.json({ deleted: 'Usuario removido com sucesso' })
}