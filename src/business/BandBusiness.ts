import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { CustomError, Unauthorized } from "../error/BaseError";
import { BandInputDTO, InputTokenDTO} from "../model/Band";
import { BandDatabase } from "../data/BandDatabase";
import { BandController } from "../controller/BandController";


const idGenerator = new IdGenerator();
const bandDatabase = new BandDatabase();
const authenticator = new Authenticator();


export class BandBusiness {

    async createBand(band:BandInputDTO, input: InputTokenDTO) {
            
    try {
        const { name, music_genre, responsible } = band

        const { token } = input
        
        const data = authenticator.getData(token)

        if (!token) {
            throw new CustomError(400, 'Informe o token');
        }

        if (!data.id) {
            throw new Unauthorized()
        }
        
        if (!band.name || !band.music_genre || !band.responsible) {
            throw new CustomError(400, '"nome", "gênero" e "responsável" devem ser informados')
        }
             
        const id = idGenerator.generate();
                        
        await bandDatabase.createBand (id, band.name, band.music_genre, band.responsible);
         
    } catch (error: any) {
        throw new CustomError(error.statusCode, error.message)

    }
}

}