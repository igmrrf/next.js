import { Anime } from "../../types";
import AnimeCard from "./AnimeCard";

type IProps = {
  setSearch: (text: string) => void;
  handleSearch: (e: any) => void;
  search: string;
  animeList: Anime[];
};

const MainContent = ({
  handleSearch,
  search,
  animeList,
  setSearch,
}: IProps) => {
  return (
    <main>
      <div className="main-head">
        <form className="search-box" onSubmit={(e) => handleSearch(e)}>
          <input
            type="search"
            placeholder="search for an anime.."
            required
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      <div className="anime-list">
        {animeList &&
          animeList.map((anime) => (
            <AnimeCard anime={anime} key={anime.mal_id} />
          ))}
      </div>
    </main>
  );
};

export default MainContent;
