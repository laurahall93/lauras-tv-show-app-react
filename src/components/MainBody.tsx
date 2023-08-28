import { EpisodesEntry } from "./EpisodesEntry";
import episodes from "../episodes.json";
import { useState } from "react";

export function MainBody(): JSX.Element {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };
  const searchEpisodeData = episodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(searchInput) ||
      episode.summary.toLowerCase().includes(searchInput)
  );

  const listEpisodes = searchEpisodeData.map((episode) => (
    <div key={episode.id}>
      <EpisodesEntry
        name={episode.name}
        season={episode.season}
        number={episode.number}
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
