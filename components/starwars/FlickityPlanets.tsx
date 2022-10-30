import "flickity/css/flickity.css";
import Flickity from "react-flickity-component";
import Planet from "./Planet";

import "flickity/css/flickity.css";

function Carousel() {
  return (
    <Flickity>
      <img src="https://placeimg.com/640/480/animals" />
      <img src="https://placeimg.com/640/480/animals" />
    </Flickity>
  );
}

const Flick = ({ data }: { data: any }) => {
  console.log("Flick", data);
  return (
    <div>
      <h2>Flick Planets</h2>
      <Flickity
        className="carousel"
        elementType="div"
        options={{ initialIndex: 2 }}
        reloadOnUpdate
        static
      >
        {data.map((planet: {}, index: number) => (
          <Planet planet={planet} key={index} />
        ))}
      </Flickity>
    </div>
  );
};

export default Flick;
