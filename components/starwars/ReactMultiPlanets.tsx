import 'react-multi-carousel/lib/styles.css';
import Planet from './Planet';
import Carousel from 'react-multi-carousel';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const ReactMultiPlanets = ({ data }: { data: any }) => {
  console.log('ReactMulti', data);
  return (
    <div>
      <h2>React</h2>
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={1000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['desktop', 'tablet', 'mobile']}
        itemClass="carousel-item-padding-40-px"
      >
        {data.map((planet: {}, index: number) => (
          <Planet planet={planet} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default ReactMultiPlanets;
