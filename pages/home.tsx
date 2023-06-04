import { useEffect, useState } from "react";
import Header from "../components/home/Header";
import Sidebar from "../components/home/Sidebar";

import MainContent from "../components/home/MainContent";

interface IState {
  animes: {
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

  search: string;
}

const Home = () => {
  const [animeList, setAnimeList] = useState<IState["animes"]>([]);
  const [topAnime, setTopAnime] = useState<IState["animes"]>([]);
  const [search, setSearch] = useState<string>("");
  const [cheme, setcheme] = useState("anime");

  const getTopAnime = async () => {
    const temp = await fetch("https://api.jikan.moe/v4/top/anime").then((res) =>
      res.json()
    );

    console.log({ temp, data: temp.data });
    setTopAnime(temp.data.slice(0, 5));
    setAnimeList(temp.data.slice(6));
  };

  const fetchAnime = async (query = "sword") => {
    // title, sort and limit can be parameters

    const temp = await fetch(
      `https://api.jikan.moe/v4/anime?q=${query}&order_by=title&sort=asc&limit=12`
    ).then((res) => res.json());

    setAnimeList(temp.data);
  };

  const handleSearch = (event: any) => {
    event.preventDefault();
    fetchAnime(search);
  };

  useEffect(() => {
    getTopAnime();
    fetchAnime();
  }, []);

  return (
    <div className="App">
      <Header title={"Anime"} />
      <input
        type="checkbox"
        onChange={() => setcheme("anime")}
        checked={cheme === "anime"}
        name="anime"
        id="anime"
      />
      <label htmlFor="anime">Anime</label>
      <br />
      <input
        type="checkbox"
        onChange={() => setcheme("manga")}
        checked={cheme === "manga"}
        name="manga"
        id="manga"
      />
      <label htmlFor="manga">Manga</label>
      <div className="content-wrap">
        <Sidebar topAnime={topAnime} title={cheme} />

        <MainContent
          setSearch={setSearch}
          search={search}
          handleSearch={handleSearch}
          animeList={animeList}
        />
      </div>
    </div>
  );
};

export default Home;
