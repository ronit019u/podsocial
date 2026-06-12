import { createComment, deleteComment, getComments } from "@/service/podcastService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "./ui/button"
import { useAuth } from "@/context/AuthContext"
import type { CommentResponse } from "@/types"
import { createChat } from "@/service/chatServices"
import { useNavigate } from "react-router-dom"
import {  MessageCircle, Send, Trash2 } from "lucide-react"

interface Props {
    postId: string
}


export const CommentSection = ({postId}: Props) => {

    const { user } =useAuth()
    const [content, setContent ] = useState("");

    const queryClient = useQueryClient();
    const navigate = useNavigate()

    /* mutationFn cannot take argument directly so we use mutation inside the return*/
    const addMutation = useMutation({
        mutationFn: createComment,
        /* "comments", postId] with postId it only refresh that post it would not refresh whole posts comments so save time*/
        onSuccess: () =>  { 
        queryClient.invalidateQueries({queryKey: ["comments", postId]});
        setContent("")
      }
    })

    /* queryKey defines wht will be query key is comments so every invalidateQueries must use comments*/
    const {data: comments, isLoading} = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => getComments(postId),
        //refetchInterval: 5000,
    })

    const deleteMutation = useMutation({
        mutationFn: deleteComment,
        onSuccess:() => queryClient.invalidateQueries({queryKey: ["comments", postId]})
    })

     const ChatMutation = useMutation({
        mutationFn: createChat,
        onSuccess: 
            (data) => { 
            queryClient.invalidateQueries({queryKey: ["chats"]});
            navigate(`/chat/${data.id}`)
        }
    })

    return (
        <div className=" bg-gray-300 border border-gray-800 rounded-xl mb-4 overflow-hidden space-y-3 ">
            <div className="flex gap-2 border border-gray-700  px-3 py-2 placeholder: text-gray-400">
            <input
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder:text-gray-500 outline-none focus:border-blue-500 text-sm" 
             type="text"
             placeholder="comment on this post"
             value={content}
             onChange={(e) => setContent(e.target.value)}

            />
            <Button variant="ghost" className="bg-blue-500 hover:bg-blue-600 text-white px-3"
            onClick={() => addMutation.mutate({postId, content })}
            disabled={addMutation.isPending || content.trim().length === 0}    
                >
                    <Send />
                    Comment
                    </Button>
                    </div>
            {isLoading && <p>Loading commenting...</p>}
            <div className="space-y-2 px-2 pb-2">
            {comments?.map((comment: CommentResponse) => (
                <div className="flex justify-between items-start w-full p-2 bg-gray-800 rounded-lg">
                    <div>
                    <p className="text-blue-400 text-xs font-medium mb-1 ">{comment.user.name}</p>
                    <p className="text-white text-sm">{comment.content}</p>
                    </div>
                    <div>
                    {comment.user.id === user?.id && (
                        <Button variant="ghost" className="text-red-500 hover:text-red-500 p-1" onClick={() => deleteMutation.mutate(comment.id)}>
                            <Trash2 />
                        </Button>
                    )}
                    {comment.user.id !== user?.id && (
                        <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-gray-700 p-1" onClick={() => ChatMutation.mutate(comment.user.id)}>
                            <MessageCircle />
                        </Button>
                    )}
                    </div>
                </div>
            ))}
        </div>
        </div>
    )



}