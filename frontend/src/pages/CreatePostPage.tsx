import { PodCast } from "@/components/Podcast";
import { useDebounce } from "@/hooks/useDebounce";
import { createPost, searchPodcasts } from "@/service/podcastService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PodcastPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, SetSearch] = useState("");
  //tracks uuid of the podcast make sure only the one is being tracked that user clicked share button
  const [sharingId, setSharingId] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search, 600);

  /*for searching podcast useQuery ia for getting */
  const { data: results, isLoading } = useQuery({
    queryKey: ["podcasts", debouncedSearch],
    queryFn: () => searchPodcasts(debouncedSearch),
    enabled: debouncedSearch.length > 2,
  });

  console.log("results:", results); // ← add this
  console.log("isLoading:", isLoading);

  /*for saving inside the db use Mutation is for updating creating and deleting*/
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setSharingId(null)
      navigate("/");
    },
    onError: () => setSharingId(null)
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-white font-bold text-2xl mb-6">Share podcast</h1>

      <div className="relative mb-6">
        <Search className=" absolute text-white top-2 left-3" />
      </div>
      <input
        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        type="text"
        placeholder="Search for a podcast"
        value={search}
        onChange={(e) => SetSearch(e.target.value)}
      />
      {/* {results?.map((podcast) => () not {} because it is returning so if u used {} u telling i am gonna code 
            and wait i will tell u when to return that is why arror function  => {} and return () 
             */}
      {isLoading && (
        <p className="text-gray-400 text-center py-4">Searching...</p>
      )}
      {!search && (
        <p className="text-gray-500 text-center py-4">
          Type to search for podcasts
        </p>
      )}
      <div className="mt-4">
      {results?.map((podcast) => (
        <PodCast
          key={podcast.uuid}
          podcast={podcast}
          onShare={(uuid) => {
            setSharingId(uuid)
            mutation.mutate(uuid);
          }}
          isSharing={sharingId === podcast.uuid}
        />
      ))}
      </div>
    </div>
  );
};
