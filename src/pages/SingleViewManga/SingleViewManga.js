import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../context/search';
import SingleAnime from '../../components/SingleAnime/SingleAnime';
import SliderShownManga from '../../access/Layout/DefaultLayout/SliderShownManga';
import classNames from 'classnames/bind';
import Styles from './SingleViewManga.module.scss';

const cx = classNames.bind(Styles);

function SingleView() {
  const search = useContext(SearchContext);
  const [dataExits, setDataExits] = useState(true);

  useEffect(() => {
    if (
      search.singleData === undefined ||
      Object.keys(search.singleData).length === 0
    ) {
      try {
        search.setSingle(JSON.parse(localStorage.getItem('singleData')));
        setDataExits(true);
      } catch (error) {
        console.log(error);
        setDataExits(false);
      }
    }
    console.log(search.singleData);
  }, [search]);

  useEffect(() => {
    if (search.manga === undefined || search.manga.length === 0) {
      try {
        search.setMan(JSON.parse(localStorage.getItem('Manga')));
        setDataExits(true);
      } catch (error) {
        console.log(error);
        setDataExits(false);
      }
    }
  }, [search]);

  return (
    <div className={cx('wrapper')}>
      <h1>Manga Info</h1>
      {(dataExits && <SingleAnime info={search.singleData} />) || (
        <div>No data exits</div>
      )}
      <div>
        <h1>Other Manga</h1>
        <SliderShownManga />
      </div>
    </div>
  );
}

export default SingleView;
