import { getPosts } from "@/service/podcastService"
import { useQuery } from "@tanstack/react-query"
import { PostCard } from "./PostCard"

export const Posts = () => {

     const {data: posts, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: getPosts
     })
    
     if(isLoading) return <p>Loading...</p>
    
    
    return (
        <div>
             {posts?.map((post) => (
                <PostCard key={post.id} post={post} />
             ))}
        </div>
    )
}