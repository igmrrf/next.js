import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Anime } from "../../types";

interface IProps {
  anime: Anime;
}

const AnimeCard: FC<IProps> = ({
  anime: {
    url,
    title,
    images: {
      jpg: { small_image_url },
    },
  },
}) => {
  return (
    <article className="anime-card">
      <Link href={url} target="_blank" rel="noreferrer noopener">
        <figure>
          <Image src={small_image_url} alt={title} height={144} width={144} />
        </figure>
        <h3>{title}</h3>
      </Link>
    </article>
  );
};

export default AnimeCard;
