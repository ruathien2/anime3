import { useContext } from 'react';
import { SearchContext } from '../../../../context/search';
import AnimeCardManga from '../../../../components/AnimeCardManga/AnimeCardManga';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { HomeWrapper } from './style';

function SliderShownManga() {
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
        {search.manga &&
          search.manga.map((anime) => (
            <AnimeCardManga key={anime.mal_id} anime={anime} />
          ))}
      </Slider>
    </HomeWrapper>
  );
}

export default SliderShownManga;
