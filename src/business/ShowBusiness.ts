import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { show, WeekDay } from "../model/Show";
import { ShowDatabase } from "../data/ShowDatabase";
import { CustomError, InvalidHour, InvalidWeekday, ShowNotFound } from "../error/BaseError";
import { ShowInputDTO } from "../model/Show";
import { BandDatabase } from "../data/BandDatabase";

const idGenerator = new IdGenerator();
const showDatabase = new ShowDatabase();
const authenticator = new Authenticator();
const bandDatabase = new BandDatabase();

export class ShowBusiness {

    async createShow(input:ShowInputDTO) {
            
    try {
        const { weekDay, startTime, endTime, bandId  } = input;
                
        const id = idGenerator.generate();

        if (weekDay.toUpperCase() != WeekDay.SEXTA && 
            weekDay.toUpperCase() != WeekDay.SABADO && 
            weekDay.toUpperCase() != WeekDay.DOMINGO) {
            throw new InvalidWeekday();
        }

        if (startTime < 8 || endTime > 23) {
            throw new InvalidHour();
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

  public getShow = async (date: string) => {

        try {
            
            if (!date) {
                throw new CustomError(400, 'Data deve ser informada');
            }
    
            const dateSelected:any = await showDatabase.getShow(date)

              
            if (!dateSelected[0]) {
                throw new ShowNotFound
            }
    
            const result = {
                name: dateSelected
            
            }
            return dateSelected;
    
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
    
        }
    }
};