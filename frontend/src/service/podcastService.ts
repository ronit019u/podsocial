import api from "@/api/axios";
import type { TaddyPodcast } from "@/types";


export const searchPodcasts = async(query: string): Promise<TaddyPodcast[]> => {
    const res = await api.get(`/api/podcast/search?q=${query}`);
    return res.data.data
}

export const createPost = async(podCastId: string) => {
    const res = await api.post("/api/posts", { podCastId })
    return res.data
}

export const getPosts = async() => {
    const res = await api.get("/api/posts");
    return res.data.data
}

export const likePost = async(postId: string) => {
    const res = await api.post(`/api/posts/${postId}/like`)
    return res.data
}

export const unlikePost = async(postId: string) => {
    const res = await api.delete(`/api/posts/${postId}/like`)
    return res.data.data
}

export const createComment = async({postId, content}: {postId: string, content: string}) => {
    const res = await api.post(`/api/posts/${postId}/comment`, {content})
    return res.data.data
}

export const getComments = async(postId: string) => {
    const res = await api.get(`/api/posts/${postId}/comments`)
    return res.data.data
}

export const deleteComment = async(commentId: string) => {
    const res = await api.delete(`/api/posts/comment/${commentId}`)
    return res.data
}