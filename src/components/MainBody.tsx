import { EpisodesEntry } from "./EpisodesEntry";
import defEpisodes from "../episodes.json";
import { useState, useEffect } from "react";

export interface Shows {
  score: number;
  show: Show;
}

export interface Show {
  id: number;
  url: string;
  name: string;
  summary: null | string;
}

export function MainBody(): JSX.Element {
  const [searchInput, setSearchInput] = useState("");
  const [episodes, setEpisodes] = useState(defEpisodes);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    async function searchShows(name: string) {
      const shows = await fetch(
        `https://api.tvmaze.com/search/shows?q=${name}`
      );
      const data = await shows.json();
      const allShows = data.map((entry: Shows) => entry.show);
      if (allShows.length !== 0) {
        setEpisodes(allShows);
      }
    }
    searchShows(searchInput);
  }, [searchInput]);

  const searchEpisodeData = episodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      (episode.summary != null &&
        episode.summary.toLowerCase().includes(searchInput.toLowerCase()))
  );

  const listEpisodes = searchEpisodeData.map((episode) => (
    <div key={episode.id}>
      <EpisodesEntry
        name={episode.name}
        image={episode.image}
        url={episode.url}
        summary={episode.summary}
      />
    </div>
  ));

  return (
    <>
      <input
        className="search-box"
        type="text"
        placeholder="Search..."
        value={searchInput}
        onChange={handleChange}
      />
      <div className="episode-container">{listEpisodes}</div>
    </>
  );
}
