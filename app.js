import mongoose from "mongoose"
import express, { request, response } from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import 'dotenv/config'

import User from "./src/models/User.js";

const app = express();

const uri = process.env.mongo

mongoose.connect(uri)
    .then(() => {
        console.log("Conectado ao Mongo DB")
    })
    .catch((error) => {
        console.log("Erro ao conectar no Banco.", error)
    })

app.use(cors())
app.use(express.json())

//POST
app.post("/users", async (request, response) => {

    const user = await User.create({
        name: request.body.title, 
        email: request.body.price, 
        password: request.body.description,
    })
    return response.json(user)
})

//GET
//Função de pesquisa
app.get("/users", async (request, response) => {

    try {
        const result = await Imovel.find();

        response.json(result);
    } catch (error) {

        response.status(500).json({ error: error });
    }
});

//Delete
//Queryparams :nomeparametro
app.delete("/users/:id", async (request, response) => {
    
    const result = await User.findOneAndDelete({id: request.params.id})
    return response.json(result)
})

//Editar
app.put("/users/:id", async(request, response) => {

    const result = await User.findOneAndUpdate(
        {id: request.params.id},
        request.body,
        {new: true}
    )
    return result
})

app.post("/login", async(request, response) => {
    try {
        const user = await User.findOne({ email });

        if (!user)
            return res
                .status(401)
                .json({ error: 'E-mail e/ou Senha incorretos.' });

        if (!(await bcrypt.compare(password, user.password)))
            return res.status(401).json({ error: 'E-mail e/ou Senha incorretos.' });

        // Dados do Usuário
        const { _id: id, name, username } = user;

        return response.json({
            id,
            email,
            name,
            username,
            token: jwt.sign({ id, email }, process.env.JWT_SECRET, {
                expiresIn: '7d',
            }),
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
})

app.listen(3333, () => console.log("Executando aplicação"))