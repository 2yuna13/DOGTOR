import express, { Request, Response } from "express";
import mysql from "mysql2";
import "dotenv/config";
import { logger } from "./utils/winston";
import cors from "cors";
import { userRouter } from "./users/routers/userRouter";
import { AdminRouter } from "./admins/routers/adminRouter";
import { ChatRouter } from "./chats/routers/chatRouter";
import passport from "./middlewares/passport";
import { Server } from "socket.io";
import { chatSocket } from "./chats/sockets/chatSocket";
import session from "express-session";
import path from "path";
import https from "https";
import fs from "fs";
import { updateBlockedAt } from "./utils/scheduledTask";

import { PostRouter } from "./communities/routers/postRouter";
import { DiseaseRouter } from "./diseases/routers/diseaseRouter";
import { commentRouter } from "./communities/routers/commentRouter";
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

updateBlockedAt();

process.on("SIGINT", () => {
  connection.end();
  process.exit();
});

app.use(
  cors({
    origin: true,
  })
);

app.get("/imgs", (req: Request, res: Response) => {
  const filename = req.query.filename as string;
  const modifiedFilename = filename.replace(/\s/g, "");
  const filePath = `${modifiedFilename}`;

  const options = {
    root: path.join("../4team_project_back"),
  };
  res.sendFile(filePath, options);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("/api-json", swaggerUi.serve, swaggerUi.setup(swaggerJson));

const secretKey = process.env.SESSION_SECRET_KEY || "default_secret_key";

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (request: Request, response: Response) => {
  response.redirect("https://kdt-ai7-team04.elicecoding.com/");
});

const keyoptions = {
  ca: fs.readFileSync(process.env.HTTPS_CA as string),
  key: fs.readFileSync(process.env.HTTPS_KEY as string),
  cert: fs.readFileSync(process.env.HTTPS_CERT as string),
};

const httpsAccess = https.createServer(keyoptions, app);

const server = httpsAccess.listen(port, () => {
  logger.info(`${port} 포트에서 서버 시작`);
});

const io = new Server(server);
chatSocket(io);

app.use(userRouter);
app.use(AdminRouter);
app.use(ChatRouter);
app.use(PostRouter);
app.use(DiseaseRouter);
app.use(commentRouter);

export { connection, app, io };
