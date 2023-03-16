export class Show{
    constructor(
    private id: string,
    private week_day: string,
    private start_time : number,
    private end_time: number,
    private band_id: string    
    ){}

    getId(){
        return this.id;
    }

    getWeek_day(){
        return this.week_day
    }

    getStart_time(){
        return this.start_time;
    }

    getEnd_time(){
        return this.end_time;
    }

    getBand_id(){
        return this.band_id;
    }

    setId(id: string){
        this.id = id;
    }

    setName(week_day: string){
        this.week_day = week_day;
    }

    setStarTime(start_time: number){
        this.start_time = start_time;
    }
    
    setEndTime(end_time: number){
        this.end_time = end_time;
    }

}

export interface ShowInputDTO{
    weekDay: string,
    startTime : number,
    endTime: number,
    bandId: string    
}

// export interface InputTokenDTO {
//    token: string
// }

export type show = {
    id: string,
    weekDay: string,
    startTime : number,
    endTime: number,
    bandId: string     
}

export enum WeekDay {
    SEXTA = "SEXTA",
    SABADO = "SABADO",
    DOMINGO = "DOMINGO"
 }