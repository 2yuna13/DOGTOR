import { Server, Socket } from "socket.io";
import { logger } from "../../utils/winston";
import { ChatService } from "../services/chatService";
import passport from "passport";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

// # socket.io 객체의 이벤트 리스너 설정
export const chatSocket = (io: Server) => {
  io.on("connect", (socket: Socket) => {
    //let userId = socket.request.session.passport.user;
    const token = socket.handshake.headers["token"] as string;
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "jwt-secret-key"
    ) as JwtPayload;

    logger.info(
      `소켓 연결 - 소켓ID: ${socket.id}, 연결된 소켓 개수 : ${io.engine.clientsCount}`
    );

    socket.on("join", (chatId) => {
      socket.join(chatId);
    });

    // 2) 연결 종료 이벤트: "매개변수로 들어온 socket"으로 처리해야 함 주의!
    socket.on("disconnect", (reason) => {
      logger.info(`채팅 연결 종료 - 소켓ID: ${socket.id}`);
    });

    // 3) 에러 발생 이벤트: "매개변수로 들어온 socket"으로 처리해야 함 주의!
    socket.on("error", (error) => {
      logger.error(`에러 발생: ${error}`);
    });

    // 4) 클라이언트에서 보낸 이벤트 처리: 클라이언트에서 "msgSend" 이름으로 보낸 데이터 수신
    socket.on("msgSend", ({ chatId, content }) => {
      const email: string = decoded.email;
      ChatService.addChat(email, chatId, content);
      socket.broadcast.to(chatId).emit("msgReceive", {
        email,
        content,
      });
    });
  });
};
