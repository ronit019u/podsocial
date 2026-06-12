import { getMessage, sendMessage } from "@/service/chatServices";
import type { Message } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { Button } from "../components/ui/button";
import  { io } from "socket.io-client"
import { useParams } from "react-router-dom";
import { Send } from "lucide-react";
import { formatDate } from "@/utility/dateHelper";
import { useAuth } from "@/context/AuthContext";


const socket = io(import.meta.env.VITE_API_URL, {withCredentials: true})

export const MessagePage = () => {

    const { user } = useAuth()

    const { chatId } = useParams<{chatId: string }>()

    const [text, setText] = useState("")
    const queryClient = useQueryClient()


    const messageMutation = useMutation({
        mutationFn: sendMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["messages", chatId]})
            setText("");
        }
    })

    const {data: messages, isLoading} = useQuery({
        queryKey: ["messages", chatId],
        queryFn:  () => getMessage(chatId!),
    })

    useEffect(() => {
        /*telling backend socket wht chat is user inside */
        socket.emit("joinChat", chatId);

        const handleNewText = (newMessage: Message) => {
            queryClient.invalidateQueries({queryKey: ["messages", chatId]})
        }

        socket.on("newText", handleNewText);

        return () => {
            /* for performance removes old listeners like if u check chat with user1 then to another chat with user2
             if user1 sends u message it will also refetch from db for the user2 fixed this issue*/
            socket.off("newText", handleNewText)

            /* telling backend to remove the client from the old room */
            socket.emit("leaveChat", chatId)
        }

    }, [chatId, queryClient])

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 bg-gray-900 mt-8 rounded-xl border ">

            {isLoading && <p>Loading messages</p>}
            
            {messages?.map((message:Message) => {
                const isMine = message.user.id === user?.id;
                return (
                    <div key={message.id}
                    className={`flex flex-col py-2 max-w-[70%] ${
                        isMine ? "ml-auto items-end" : "mr-auto items-start"
                    }`}
                    >
                        <div
                         className={`px-3 py-2 rounded-2xl ${
                            isMine ? "bg-blue-600 text-white"
                            : "bg-gray-800 text-gray-200"
                         }`}
                        >{message.text}</div>
                        <div className="text-xs text-gray-400 mt-l">
                            {message.user.name} {formatDate(message.createdAt)}
                        </div>
                        </div>
                )
            })}
            <div className="flex items-center gap-2 justify-end mt-4">
            <input 
              className="w-60 border pl-2 pr-2 py-1 rounded-xl text-white focus:outline-none focus:border-blue-500"
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <div className="flex items-center justify- ">
            <Button variant="ghost" className="text-white hover:text-blue-400"
              onClick={() => messageMutation.mutate({chatId, text})}
              disabled={messageMutation.isPending || text.trim().length === 0}
            >
                Send <Send />
            </Button>
            </div>
        </div>
        </div>
    )


    
}


/*{messages?.map((message: Message) => (
                <div className="flex items-center gap-3 py-4" 
                key={message.id}>
                    <p className="text-gray-300">{message.text}</p>
                    <p className="text-blue-400 ">- {message.user.name}</p> 
                    <p className="text-gray-400 ml-1 text-xs">{formatDate(message.createdAt)}</p>
                </div>
            ))}*/