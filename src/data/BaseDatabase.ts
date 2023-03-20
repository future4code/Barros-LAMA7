import dotenv from "dotenv"
import knex, { Knex } from "knex";

dotenv.config()

export abstract class BaseDatabase {

    private static connection: Knex | null = null;

    protected getConnection(): Knex{
        if(!BaseDatabase.connection){
            BaseDatabase.connection = knex({
                client: "mysql",
                connection: {
                  host: process.env.DB_HOST,
                  port: 3306,
                  user: process.env.DB_USER,
                  password: process.env.DB_PASSWORD,
                  database: process.env.DB_DATABASE_NAME,
                  multipleStatements:true
                },
                pool:{min: 0, max:7}
            });        
        }

        return BaseDatabase.connection;
    }

};