import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { BandNotFound, CustomError, Unauthorized } from "../error/BaseError";
import { BandInputDTO, InputTokenDTO } from "../model/Band";
import { BandDatabase } from "../data/BandDatabase";

const idGenerator = new IdGenerator();
const bandDatabase = new BandDatabase();
const authenticator = new Authenticator();


export class BandBusiness {

    async createBand(band: BandInputDTO, input: InputTokenDTO) {

        try {
            const { name, music_genre, responsible } = band

            const { token } = input

            const data = authenticator.getData(token)

            if (!token) {
                throw new CustomError(400, 'Informe o token');
            }

            if (!data.id || data.role != "ADMIN") {
                throw new Unauthorized()
            }

            if (!band.name || !band.music_genre || !band.responsible) {
                throw new CustomError(400, '"nome", "gênero" e "responsável" devem ser informados')
            }

            const id = idGenerator.generate();

            await bandDatabase.createBand(id, band.name, band.music_genre, band.responsible);

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)

        }
    }

    async getBand (id: string, input: InputTokenDTO)  {

        try {

            if (!id) {
                throw new CustomError(400, 'id da banda deve ser informado');
            }

            const bandSelected = await bandDatabase.getBand(id)

            if (!bandSelected[0]) {
                throw new BandNotFound
            }

            const result = {
                id: bandSelected[0].id,
                name: bandSelected[0].name,
                music_genre: bandSelected[0].music_genre,
                responsible: bandSelected[0].responsible
            }
            return bandSelected;

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)

        }
    }

};