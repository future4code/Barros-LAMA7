import { CustomError } from "../error/BaseError";
import { show } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {

// CRIA SHOW

  private static TABLE_NAME = "Lama_Shows";

  public async createShow( show: show): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: show.id,
          week_day: show.weekDay,
          start_time: show.startTime,
          end_time: show.endTime,
          band_id: show.bandId
        })
        .into(ShowDatabase.TABLE_NAME);
    } catch (error:any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
  
  public getShow = async (date: string): Promise<show[]> => {
    try {
        // const shows = await this.getConnection()
        //     .select("band_id")
        //     .from("Lama_Shows")
        //     .where ({week_day:date});

        // const bands = await this.getConnection()
        //     .select("name","music_genre")
        //     .from("Lama_Bands")
        //     .where ({id:});
        
         //   return shows;

         const shows = await this.getConnection()
         .select("name","music_genre")
         .from("Lama_Bands")
         .innerJoin("Lama_Shows", "Lama_Bands.id" ,"band_id")
         .where("week_day", date)
         ;

         return shows;
          
    } catch (error: any) {
        throw new CustomError(error.statusCode, error.message);
    }
}

}
