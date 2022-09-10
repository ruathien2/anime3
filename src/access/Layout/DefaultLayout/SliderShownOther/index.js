import { useContext } from 'react';
import { SearchContext } from '../../../../context/search';
import { AnimeCard } from '../../../../components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { HomeWrapper } from './style';

function SliderShown() {
  const search = useContext(SearchContext);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  return (
    <HomeWrapper>
      <Slider {...settings}>
        {search.bypopularity &&
          search.bypopularity.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
      </Slider>
    </HomeWrapper>
  );
}

export default SliderShown;
