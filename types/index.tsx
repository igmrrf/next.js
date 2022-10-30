interface Anime {
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
  images: { jpg: { small_image_url: string } };
}

export type { Anime };
