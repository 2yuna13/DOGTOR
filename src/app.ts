import express, { Request, Response } from "express";
import mysql from "mysql2";
import "dotenv/config";
import { logger } from "./utils/winston";
import cors from "cors";
import { userRouter } from "./users/routers/userRouter";
import { AdminRouter } from "./admins/routers/adminRouter";
import { ChatRouter } from "./chats/routers/chatRouter";
import passport from "./utils/passport";
import { Server } from "socket.io";
import { chatSocket } from "./chats/sockets/chatSocket";
// import swaggerUi from "swagger-ui-express";
// import swaggerJson from "../swagger-output.json";
const port: number = 5000;

const app = express();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    logger.error("MySQL 연결 에러:", err);
    return;
  }
  logger.info("MySQL 서버에 연결되었습니다.");
});

process.on("SIGINT", () => {
  connection.end();
  process.exit();
});

app.use(
  cors({
    origin: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("/api-json", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use(passport.initialize());

app.get("/", (request: Request, response: Response) => {
  response.send("hello");
});

const server = app.listen(port, () => {
  logger.info(`${port} 포트에서 서버 시작`);
});

const io = new Server(server, { path: "/chat" });
chatSocket(io);

app.use(userRouter);
app.use(AdminRouter);
app.use(ChatRouter);
export { connection, app, io };
