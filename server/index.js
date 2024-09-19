import express from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express();

app.use(express.json());
app.use(cors('http://localhost:3001'));

app.get("/users", async (req, res) => {
    let users = [];
    if(req.query){
        users = await prisma.user.findMany({
            where: {
                email: req.query.email,
                name: req.query.name
            }
        });
    }
    else{
        users = await prisma.user.findMany();
    }
    res.status(200).json(users);
});

app.post("/users", async (req, res) => {
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name
        }
    });
    res.status(201).json(req.body);
});

app.put("/users/:id", async (req, res) => {
    await prisma.user.update({
        where:{
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name
        }
    });
    res.status(201).json(req.body);
});

app.delete("/users/:id", async (req, res) => {
    await prisma.user.delete({
        where:{
            id: req.params.id
        }
    });
    res.status(201).json({message: "Usuário deletado!"});
});

app.listen(3000);

//ItsBqyG1oopomTAK