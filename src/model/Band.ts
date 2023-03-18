export class Band{
    constructor(
    private id: string,
    private name: string,
    private music_genre: string,
    private responsible: string    
    ){}

}

export interface BandInputDTO{
    name: string;
    music_genre: string;
    responsible: string;

}

export interface InputTokenDTO {
   token: string
}

export interface band {
    id: string,
    name: string,
    music_genre: string,
    responsible: string  
}
