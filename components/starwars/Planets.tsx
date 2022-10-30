import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Planet from './Planet';
import FlickPlanets from './FlickityPlanets';
import ReactMultiPlanets from './ReactMultiPlanets';
import ReactResponsivePlanets from './ReactResponsivePlanets';

const fetchPlanets = async (key: any) => {
  console.log(key);
  const param = key?.queryKey[2];
  const res = await fetch(`http://swapi.dev/api/planets/?page=${param}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(
    ['planets', 'Hello, Onichan', page],
    fetchPlanets,
    {
      staleTime: 2000,
      cacheTime: 500000,
    }
  );

  return (
    <div>
      <h2>Planet</h2>
      <p>Page: {page}</p>
      {status === 'success' && <p>Page Limit: {data.count / 10}</p>}
      <button
        onClick={() => {
          setPage((prevPage) => Math.min(prevPage + 1, 6));
        }}
      >
        Next Page
      </button>
      <button
        onClick={() => {
          setPage((prevPage) => Math.max(prevPage - 1, 1));
        }}
      >
        Previous Page
      </button>
      {status === 'loading' && <div>Loading data</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <CarouselProvider
          naturalSlideHeight={125}
          totalSlides={10}
          naturalSlideWidth={100}
          infinite={true}
          interval={5000}
          isPlaying={true}
        >
          <Slider>
            {data.results.map((planet: {}, index: number) => (
              <Slide key={index} index={index}>
                <Planet planet={planet} />
              </Slide>
            ))}
          </Slider>
          <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
        </CarouselProvider>
      )}
      {status === 'success' && (
        <div>
          <FlickPlanets data={data.results} />
          <ReactMultiPlanets data={data.results} />
          <ReactResponsivePlanets data={data.results} />
        </div>
      )}
    </div>
  );
};

export default Planets;
