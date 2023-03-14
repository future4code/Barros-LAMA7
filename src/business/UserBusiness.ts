import { UserInputDTO, LoginInputDTO, UserRole } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { CustomError, InvalidEmail, InvalidName, InvalidPassword, InvaliRole } from "../error/BaseError";

export class UserBusiness {

    async createUser(user: UserInputDTO) {

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(user.password);

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id, role: user.role });

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

        if (user.role.toUpperCase() != UserRole.ADMIN && user.role.toUpperCase() != UserRole.NORMAL) {
            throw new InvaliRole();
        }

        return accessToken;
    }

    async getUserByEmail(user: LoginInputDTO) {

        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getUserByEmail(user.email);

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }

        return accessToken;
    }
}