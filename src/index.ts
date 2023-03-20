import dotenv from "dotenv";
import {AddressInfo} from "net";
import express from "express";
import { userRouter } from "./routes/userRouter";
import { bandRouter } from "./routes/bandRouter";
import { showRouter } from "./routes/showRouter";
dotenv.config();
const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.use("/band", bandRouter);

app.use("/show", showRouter);

const server = app.listen(process.env.port ||3306, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em https://lama-00ju.onrender.com:${address.port}`);
    } else {
      console.error(`Falha ao rodar o servidor.`);
    }
  }
);