
import { Request, Response } from "express";
import UserDA from "../database/UserDA";
import UserModel from "../models/UserModel";

type UserLogin = {
    email: string;
    password: string;
}
export class UserBL {
    public getUser(req: Request, res: Response): UserModel | any {
        let userDA = new UserDA();
        try {
            userDA.getUser(Number(req.params.id)).then((user) => {
                res.status(200).json(user);
            }).catch(() => {
                res.status(404).send("Usuário não encontrado");
            });
        } catch (error) {
            res.status(400).send("Id inválido");
        }
    }

    public getUsers(req: Request, res: Response):UserModel[] | any {
        let userDA = new UserDA();
        try {
            userDA.getUsers().then((rows) => {
                res.status(200).json(rows);
            }).catch((err) => {
                res.status(404).send("Usuários não encontrados");
            });
        } catch (error) {
            res.status(400).send("Algo deu errado ao buscar os usuários");
        }
        
    }

    public insertUser(req: Request, res: Response): UserModel | any {
        let userDA = new UserDA();
        let userModel = req.body as UserModel;
        console.log(req.body);
        try {
            userDA.insertUser(userModel).then((rows) => {
                res.status(200).json(rows);
            }).catch((err) => {
                res.status(404).send("Usuário não inserido");
            });
        } catch (error) {
            res.status(400).send("Algo deu errado ao inserir o usuário");
        }
        
    }

    public updateUser(req: Request, res: Response): UserModel | any {
        let userDA = new UserDA();
        try {
            userDA.updateUser(req.body as UserModel, Number(req.params.id)).then((user) => {
                res.status(200).json(user);
            }).catch(() => {
                res.status(404).send("Usuário não encontrado");
            });
        } catch (error) {
            res.status(400).send("Id inválido");
        }
        
    }

    public deleteUser(req: Request, res: Response): boolean | any {
        let userDA = new UserDA();
        try {
            userDA.deleteUser(Number(req.params.id)).then(() => {
                res.status(200).send("Usuário deletado");
            }).catch(() => {
                res.status(404).send("Usuário não encontrado");
            });
        } catch (error) {
            res.status(400).send("Id inválido");
        }
        
    }

    public getUserLogin(req: Request, res: Response): UserModel | any {
        let userDA = new UserDA();
        let userLogin = req.body as UserLogin;
        try {
            userDA.getUserLogin(userLogin.email, userLogin.password).then((user:UserModel) => {
                if(user != null){
                    res.status(200).json(user);
                }
                else
                    res.status(404).send("Usuário não encontrado");
            }).catch((err) => {
                res.status(404).send("Usuário não encontrado");
            });
        } catch (error) {
            res.status(400).send("Id inválido");
        }
        
    }
}