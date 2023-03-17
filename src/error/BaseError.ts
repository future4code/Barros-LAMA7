export abstract class BaseError extends Error {
    constructor(message: string, public code: number) {
      super(message);
    }
  }
  
export class CustomError extends Error {
    constructor(statusCode: number, message: string){
        super(message)
    }
}

export class InvalidName extends CustomError{ 
    constructor(){
        super(400, "Nome inválido")
    }
}

export class InvalidEmail extends CustomError{ 
    constructor(){
        super(400, "Email inválido")
    }
}

export class InvalidPassword extends CustomError{ 
    constructor(){
        super(400, "Senha inválida")
    }
}

export class UserNotFound extends CustomError{ 
    constructor(){
        super(404, "Usuário não encontrado")
    }
}


export class Unauthorized extends CustomError{
    constructor(){ 
        super(404, "Usuário não autorizado")
    }
}

export class InvalidRole extends CustomError{ 
    constructor(){
        super(400, "Tipo de usuario invalido")
    }
}


export class BandNotFound extends CustomError{ 
    constructor(){
        super(404, "Banda não encontrada")
    }
}

export class InvalidWeekday extends CustomError{ 
    constructor(){
        super(400, "Tipo de usuario invalido")
    }
}

export class InvalidHour extends CustomError{ 
    constructor(){
        super(400, "Fora do horário permitido")
    }
}

export class ShowNotFound extends CustomError{ 
    constructor(){
        super(404, "Nenhum show nesta data")
    }
}

