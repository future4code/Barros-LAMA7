import { IdGenerator } from "../services/IdGenerator";
import { show, ShowInputDTO, WeekDay } from "../model/Show";
import { ShowDatabase } from "../data/ShowDatabase";
import { CustomError, InvalidHour, InvalidWeekday, ShowNotFound } from "../error/BaseError";

const idGenerator = new IdGenerator();
const showDatabase = new ShowDatabase();

export class ShowBusiness {

async createShow (input: ShowInputDTO) {

        try {
            const { weekDay, startTime, endTime, bandId } = input;

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
    getConnection() {
        throw new Error("Method not implemented.");
    }

    async getShow (date: string) {

        try {

            if (!date) {
                throw new CustomError(400, 'Data deve ser informada');
            }

            const dateSelected: any = await showDatabase.getShow(date)

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