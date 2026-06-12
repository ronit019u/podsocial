import { useAuth } from "@/context/AuthContext";
import { getChat } from "@/service/chatServices";
import type { Chat } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

 
 export const ChatPage = () => {

    const { user } = useAuth()
    const navigate = useNavigate()
 
    const {data: chats, isLoading} = useQuery({
        queryKey: ["chats"],
        queryFn: () => getChat()
    })

   

    return (
        <div className="max-w-2xl mx-auto">
            <h1>Messages</h1>
           {isLoading ? (
            <p className="text-gray-400 text-center py-8">Loading chats...</p>
           ): chats?.length === 0 ? (
            <div className="text-gray-400 flex items-center justify-center mt-8 gap-2 hover:text-gray-300">
                <MessageCircle />
            <p>No messages yet. Message someone from the comments!</p>
            </div>
           ): (
            <div className="flex flex-col gap-4 py-3">
             {chats?.map((chat: Chat) => {
                const otherUser = chat.userOneId === user?.id ? chat.userTwo : chat.userOne;
                return (
                    <div 
                    className="flex items-center gap-3 bg-gray-900 border p-4 cursor-pointer hover:border-blue-500 transition:colors"
                    key={chat.id} 
                    onClick={() => navigate(`/chat/${chat.id}`)}>
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                    <span className=" text-white font-bold text-sm">{otherUser.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <p className="text-white font-semibold">{otherUser.name}</p>
                    </div>
                )
            })}
            </div>
           )}
        </div>
    )

 }