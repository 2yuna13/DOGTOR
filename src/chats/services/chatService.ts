import { logger } from "../../utils/winston";
import {
  ChatListDto,
  ChatRatingDto,
  ChatRequestDto,
  ChatSelectDto,
  ChatStatusDto,
  VetRegionDto,
} from "../dtos/chatDto";
import { ChatRepository } from "../repositories/chatRepository";

class ChatService {
  static async addRequest(chatRequestDto: ChatRequestDto, userEmail: string) {
    try {
      const duplicateCheck = await ChatRepository.findChatByUserAndVetEmail(
        userEmail,
        chatRequestDto.vetEmail
      );
      if (
        duplicateCheck?.status === "pending" ||
        duplicateCheck?.status === "accepted"
      ) {
        return "이미 상담(대기)중인 상태입니다.";
      }
      const createRequest = await ChatRepository.createChatByUserAndVetEamil(
        userEmail,
        chatRequestDto.vetEmail
      );
      if (createRequest) {
        ChatRepository.createChatContents(
          createRequest?.id,
          true,
          userEmail,
          chatRequestDto.message
        );
      }
    } catch (Error) {
      throw Error;
    }
  }

  static async getChatList(email: string, chatListDto: ChatListDto) {
    try {
      return await ChatRepository.findChatByStatus(email, chatListDto.status);
    } catch (error) {
      throw error;
    }
  }

  static async selectChat(id: number, email: string) {
    try {
      let writable: boolean = false,
        editable: boolean = false;
      const ChatContents = await ChatRepository.findChatContentsByIdAndEmail(
        id,
        email
      );
      const checkStatus = await ChatRepository.findUniqueChatRoomById(id);
      if (checkStatus?.status == "accepted") {
        writable = true;
      } else {
        if (
          email == checkStatus?.users_chat_rooms_user_vet_emailTousers?.email
        ) {
          editable = true;
        }
      }

      return { ChatContents, checkStatus, writable, editable };
    } catch (error) {
      throw error;
    }
  }

  static async chatStatus(chatStatusDto: ChatStatusDto, vetEmail: string) {
    try {
      return await ChatRepository.updateChatRoomStatus(
        chatStatusDto.id,
        chatStatusDto.status,
        vetEmail
      );
    } catch (error) {
      throw error;
    }
  }

  static async addChat(email: string, chatId: number, message: string) {
    try {
      const checkUser = await ChatRepository.findChatByIdAndStatus(
        chatId,
        "accepted"
      );
      if (checkUser?.user_email == email) {
        await ChatRepository.createChatContents(chatId, true, email, message);
      } else {
        await ChatRepository.createChatContents(chatId, false, email, message);
      }
      await ChatRepository.updateChatRoomUpdated(chatId);
      return await ChatRepository.findUserByEmail(email);
    } catch (error) {
      throw error;
    }
  }

  static async getTotalVetCnt(vetRegionDto: VetRegionDto) {
    try {
      if (!vetRegionDto.region && !vetRegionDto.search) {
        return await ChatRepository.countVets();
      } else if (vetRegionDto.region && !vetRegionDto.search) {
        return await ChatRepository.countVetsByRegion(vetRegionDto.region);
      } else if (vetRegionDto.search && !vetRegionDto.region) {
        return await ChatRepository.countVetsByNameOrHospitalName(
          vetRegionDto.search
        );
      } else {
        return await ChatRepository.countVetsByRegionAndName(
          vetRegionDto.search,
          vetRegionDto.region
        );
      }
    } catch (error) {
      throw error;
    }
  }

  static async getVetList(
    vetRegionDto: VetRegionDto,
    startIndex: number,
    rowPerPage: number
  ) {
    try {
      if (!vetRegionDto.region && !vetRegionDto.search) {
        return await ChatRepository.findVetsByPage(startIndex, rowPerPage);
      } else if (vetRegionDto.region && !vetRegionDto.search) {
        return await ChatRepository.findVetsByRegionAndPage(
          vetRegionDto.region,
          startIndex,
          rowPerPage
        );
      } else if (vetRegionDto.search && !vetRegionDto.region) {
        return await ChatRepository.findVetsByNameAndPage(
          vetRegionDto.search,
          startIndex,
          rowPerPage
        );
      } else {
        return await ChatRepository.findVetsByRegionAndNameAndPage(
          vetRegionDto.region,
          vetRegionDto.search,
          startIndex,
          rowPerPage
        );
      }
    } catch (error) {
      throw error;
    }
  }

  static async rateChat(chatRatingDto: ChatRatingDto) {
    try {
      const chatRoom = await ChatRepository.gradeChatRoomById(
        chatRatingDto.id,
        chatRatingDto.grade
      );
      const chatRoomsWithGrade = await ChatRepository.findChatsByVetEmail(
        chatRoom.user_vet_email
      );
      let sumOfGrades = 0;
      let numOfGrades = 0;
      for (const chatRoom of chatRoomsWithGrade) {
        if (chatRoom.grade !== null) {
          sumOfGrades += chatRoom.grade;
          numOfGrades++;
        }
      }
      const averageGrade = sumOfGrades / numOfGrades;
      await ChatRepository.updateVetGrade(
        chatRoom.user_vet_email,
        averageGrade
      );
    } catch (error) {
      throw error;
    }
  }

  static async exitChat(id: number, userId: string) {
    try {
      const chatRoom = await ChatRepository.findUniqueChatRoomById(id);
      if (chatRoom?.users_chat_rooms_user_emailTousers.email == userId) {
        await ChatRepository.updateUserChatExit(id);
      } else if (
        chatRoom?.users_chat_rooms_user_vet_emailTousers.email == userId
      ) {
        await ChatRepository.updateVetChatExit(id);
      }
    } catch (error) {
      throw error;
    }
  }
}

export { ChatService };
