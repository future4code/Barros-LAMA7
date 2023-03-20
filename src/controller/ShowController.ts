import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { ShowInputDTO } from "../model/Show";
import { ShowBusiness } from "../business/ShowBusiness";
import { Authenticator } from "../services/Authenticator";

const showBusiness = new ShowBusiness();

export class ShowController {
    async createShow(req: Request, res: Response) {

        try {
            const { weekDay, startTime, endTime, bandId } = req.body;

            const input: ShowInputDTO = {
                weekDay,
                startTime,
                endTime,
                bandId
            };

            await showBusiness.createShow(input);

            res.status(201).send(`Horário do Show: ${(input.weekDay)} - ${(input.startTime)}H até ${(input.endTime)}H`);

        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    //    await BaseDatabase.destroyConnection();
    }

    public getShow = async (req: Request, res: Response): Promise<void> => {

        try {
            const date = req.params.date

            const show = await showBusiness.getShow(date)

            res.status(201).send(show)
        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

};