import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { show, WeekDay } from "../model/Show";
import { ShowDatabase } from "../data/ShowDatabase";
import { CustomError, InvaliWeekday } from "../error/BaseError";
import { ShowInputDTO } from "../model/Show";

const idGenerator = new IdGenerator();
const showDatabase = new ShowDatabase();
const authenticator = new Authenticator();

export class ShowBusiness {

    async createShow(input:ShowInputDTO) {
            
    try {
        const { weekDay, startTime, endTime, bandId  } = input;
                   
        const id = idGenerator.generate();

        if (weekDay.toUpperCase() != WeekDay.SEXTA && 
            weekDay.toUpperCase() != WeekDay.SABADO && 
            weekDay.toUpperCase() != WeekDay.DOMINGO) {
            throw new InvaliWeekday();
        }


        const show: show = {
            id,
            weekDay,
            startTime,
            endTime,
            bandId
        }
    
        await showDatabase.createShow(show);
    } catch (error: any) {
        throw new CustomError(error.statusCode, error.message)
    }
 }

};