import type { TaddyPodcast } from "@/types";
import { Button } from "./ui/button";
import { Radio } from "lucide-react";

/*props is like that describes the data UI component receives
from its parent and type describes the structure or type of the
raw data from db something like that*/
interface Props {
    podcast: TaddyPodcast
    onShare: (uuid: string) => void;
    isSharing: boolean;
}

export const PodCast = ({podcast, onShare, isSharing}: Props) => {
    
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl mb-4 p-4">
            
            <div className="flex gap-4">
                <img className=" w-40 h-40 object-cover shrink-0" src={podcast.imageUrl} alt={podcast.name} />
            
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                <p className=" text-white">{podcast.name}</p>
                <p className="text-gray-300 line-clamp-2">{podcast.description}</p>
                <p className="text-gray-400">{podcast.totalEpisodesCount}</p>
            </div>
            <div className="flex justify-end mt-3">
            <Button variant="ghost" className="text-white hover:text-black" 
             onClick={() => onShare(podcast.uuid)}
             disabled={isSharing}
            >
                <Radio />
                {isSharing ? "Sharing..." : "Share"}
            </Button>
            </div>
        </div>
        </div>
        </div>
    )

}