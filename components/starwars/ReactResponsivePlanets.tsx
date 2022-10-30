import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Planet from './Planet';

const Planets = ({ data }: { data: any }) => {
  console.log('ReactResponsive', data);
  return (
    <div>
      <h2>React Responsive Planets</h2>

      <Carousel
        showStatus={false}
        showIndicators={false}
        autoPlay
        interval={5000}
        infiniteLoop
        showArrows={false}
      >
        {data.map((planet: {}, index: number) => (
          <Planet planet={planet} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default Planets;
