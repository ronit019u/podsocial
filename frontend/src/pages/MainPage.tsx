import { Posts } from "@/components/Posts"

export const MainPage = () => {

    return (
        <div className="min-h-screen bg-gray-950 py-8">
            <div className="max-w-3xl px-4 mx-auto">
            <Posts />
            </div>
        </div>
    )
}