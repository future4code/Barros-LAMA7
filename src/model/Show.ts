export class Show{
    constructor(
    private id: string,
    private week_day: string,
    private start_time : number,
    private end_time: number,
    private band_id: string    
    ){}

    getStart(){
        return this.start_time;
    }

    getEnd(){
        return this.end_time;
    }

}

export interface ShowInputDTO{
    weekDay: string,
    startTime : number,
    endTime: number,
    bandId: string    
}

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

 export type GetShow = {
    id: string,
    weekDay: string,
    startTime : number,
    endTime: number,
 
}