import { Request, Response } from "express";
import { User } from '../models/UserSchema';
import { Types } from "mongoose";
import JWT from 'jsonwebtoken'

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

        res.status(202)
        res.json({ user: newUser, token })
    } catch (error) {
        console.log({ error })
        res.json({ error: 'Não conseguimos cadastrar o usuário ao BLOG!' })
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