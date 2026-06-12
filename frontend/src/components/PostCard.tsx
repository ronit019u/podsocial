import { likePost, unlikePost } from "@/service/podcastService";
import type { PostResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { CommentSection } from "./CommentSection";
import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";

interface Props {
  post: PostResponse;
}

export const PostCard = ({ post }: Props) => {
  const [showComments, setShowComments] = useState(false);

  const { user } = useAuth();
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: () => likePost(post.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const unlikeMutation = useMutation({
    mutationFn: () => unlikePost(post.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const isLiked = post.likes?.some((like) => like.userId === user?.id);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl mb-4 overflow-hidden">
      <img className="w-full h-64 object-cover" src={post.coverImage} />
      <div className="p-4">
        <p className="text-gray-500 text-xs mb-2">
            shared by {" "}
            <span className="text-blue-400 font-medium">{post.user.name}</span>
        </p>
        <p className="text-white font-semibold text-lg mb-1">{post.title}</p>
        <p className="text-gray-400 text-sm line-clamp-2 mb-1">{post.description}</p>
        <p className="text-gray-500 text-xs mb-4">{post.totalEpisodes}</p>
       {/* <p>{post.likes?.length ?? 0} likes</p>*/}
        
        {isLiked ? (
          <Button variant="ghost" className="text-red-600 hover:text-red-600 px-3 py-1" onClick={() => unlikeMutation.mutate()}>
            <Heart className="w-4 h-4 mr-1  fill-red-600" />
            {post.likes?.length ?? 0} 
          </Button>
        ) : (
          <Button variant="ghost" className="text-red-600 hover:text-red-600 px-3 py-1" onClick={() => likeMutation.mutate()}>
            <Heart />
            {post.likes?.length ?? 0}
          </Button>
        )}
        <Button variant="ghost" className="text-gray-200" onClick={() => setShowComments(!showComments)}>
            <MessageCircle />
          {showComments ? "Hide Comments" : "Show Comments"}
        </Button>
      {showComments && (
        <CommentSection postId={post.id} />
        )}
      </div>
    </div>
  );
};
