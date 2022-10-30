import { FC } from "react";

interface IProps {
  topAnime: {
    end_date: string;
    episodes: number;
    image_url: string;
    mal_id: number;
    members: number;
    rank: number;
    score: number;
    start_date: string;
    title: string;
    type: string;
    url: string;
  }[];
  title: string;
}

const Sidebar: FC<IProps> = ({ topAnime, title }) => {
  return (
    <aside>
      <nav>
        <h3>Top {title}</h3>
        {topAnime.map((anime, index) => (
          <a href={anime.url} target='_blank' rel='noreferrer noopener' key={index}>
            {anime.title}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
