import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { ShowInputDTO } from "../model/Show";
import { ShowBusiness } from "../business/ShowBusiness";
import { Authenticator } from "../services/Authenticator";

const authenticator = new Authenticator();
const showBusiness = new ShowBusiness();

export class ShowController {
    async createShow(req: Request, res: Response) {
        
        try {
            const { weekDay, startTime, endTime } = req.body;

            const bandId = req.params.id as string

            const input: ShowInputDTO = {
                weekDay, 
                startTime, 
                endTime, 
                bandId
            };

            await showBusiness.createShow(input);
         
            res.status(201).send(`Horário do Show: ${(input.weekDay)} - ${(input.startTime)} até ${(input.startTime)}`);

        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    }
};