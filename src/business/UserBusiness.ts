import { UserInputDTO, LoginInputDTO, UserRole } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { CustomError, InvalidEmail, InvalidName, InvalidPassword, InvalidRole, UserNotFound } from "../error/BaseError";

const idGenerator = new IdGenerator();
const hashManager = new HashManager();
const userDatabase = new UserDatabase();
const authenticator = new Authenticator();

export class UserBusiness {

    async createUser(user: UserInputDTO) {

        try {

            if (!user.name || !user.email || !user.password || !user.role) {
                throw new CustomError(400, '"name", "email", "password" e "role" devem ser informados')
            }
            if (user.name.length < 4) {
                throw new InvalidName();
            }

            if (!user.email.includes("@")) {
                throw new InvalidEmail();
            }

            if (user.password.length < 6) {
                throw new InvalidPassword();
            }

            const id = idGenerator.generate();
            const hashPassword = await hashManager.hash(user.password);

            if (user.role.toUpperCase() != UserRole.ADMIN && user.role.toUpperCase() != UserRole.NORMAL) {
                throw new InvalidRole();
            }

            await userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

            const accessToken = authenticator.generateToken({ id, role: user.role });

            return accessToken;

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)

        }
    }

    async getUserByEmail(user: LoginInputDTO) {

        try {

            if (!user.email || !user.password) {
                throw new CustomError(400, 'Preencha os campos "email" e "password"');
            }

            if (!user.email.includes("@")) {
                throw new InvalidEmail();
            }

            const userFromDB = await userDatabase.getUserByEmail(user.email);

            if (!userFromDB) {
                throw new UserNotFound()
            }

            const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

            if (!hashCompare) {
                throw new Error("Invalid Password!");
            }

            const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

            return accessToken;

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }

    }

};