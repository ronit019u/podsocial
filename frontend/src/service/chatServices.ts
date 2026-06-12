import api from "@/api/axios";

export const createChat = async (otherUserId: string) => {
    const res = await api.post('/api/chat', {otherUserId});
    return res.data.data
}

export const getChat = async () => {
    const res = await api.get('/api/chat')
    return res.data.data
}

export const sendMessage = async({chatId, text }: { chatId: string; text: string}) => {
    const res = await api.post(`/api/chat/${chatId}/message`, {text})
    return res.data.data
}

export const getMessage = async(chatId: string) => {
    const res = await api.get(`/api/chat/${chatId}/messages`);
    return res.data.data
}