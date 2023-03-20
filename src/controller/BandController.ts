import { Request, Response } from "express";
import { BandInputDTO, InputTokenDTO } from "../model/Band";
import { BandBusiness } from "../business/BandBusiness";

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

            await bandBusiness.createBand(input, idUser);

            res.status(201).send(`Banda cadastrada: ${(input.name)} - ${(input.music_genre)} - Responsável: ${(input.responsible)}`);

        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }

    }

    public getBand = async (req: Request, res: Response): Promise<void> => {

        try {
            const id = req.params.id
            const input: InputTokenDTO = {
                token: req.headers.authorization as string
            }

            const band = await bandBusiness.getBand(id, input)

            res.status(201).send(band)
        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

}