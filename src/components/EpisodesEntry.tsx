export interface Image {
  medium: string;
  original: string;
}

export interface IEpisode {
  id?: number;
  url?: string;
  name: string;
  image: {
    medium: string;
    original?: string;
  };
  summary: string;
}

export const EpisodesEntry = (episode: IEpisode): JSX.Element => {
  return (
    <div className="episode-entry">
      <section>
        <div className="container">
          {episode.image != null && <img src={episode.image.medium} alt="" />}
        </div>
        <div className="episode-title">
          <p>{episode.name}</p>
        </div>
        <br />
        <a href={episode.url}>Link to the episode</a>
        {episode.summary != null && (
          <p className="summary">
            {episode.summary.replaceAll(/<\/?[^>]+(>|$)/gi, "")}
          </p>
        )}
      </section>
    </div>
  );
};
