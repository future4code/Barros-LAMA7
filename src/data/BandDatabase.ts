import { CustomError } from "../error/BaseError";
import { band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {

  private static TABLE_NAME = "Lama_Bands";

  public async createBand(
    id: string,
    name: string,
    music_genre: string,
    responsible: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          music_genre,
          responsible
        })
        .into(BandDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public getBand = async (idBand: string): Promise<band[]> => {
    try {
      const band = await this.getConnection()
        .select("id", "name", "music_genre", "responsible")
        .from("Lama_Bands")
        .where({ name: idBand })

      return band;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

};