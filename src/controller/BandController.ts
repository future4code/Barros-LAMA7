import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandInputDTO, InputTokenDTO} from "../model/Band";
import { BandBusiness } from "../business/BandBusiness";
import { Authenticator } from "../services/Authenticator";

const authenticator = new Authenticator();
const bandBusiness = new BandBusiness();

export class BandController {
    async createBand(req: Request, res: Response) {
        
        try {

            const { name, music_genre, responsible } = req.body;

            const idUser: InputTokenDTO = {
                token: req.headers.authorization as string
            }

            const input: BandInputDTO = {
                name,
                music_genre,
                responsible
            };

            await bandBusiness.createBand(input,idUser);
         
            res.status(201).send(`Banda cadastrada: ${(input.name)} - ${(input.music_genre)} - Responsável: ${(input.responsible)}`);

        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }
}