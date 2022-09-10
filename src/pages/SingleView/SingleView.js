import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../context/search';
import { SingleAnime } from '../../components';
import { SliderShownOther } from '../../access/Layout/DefaultLayout';
import classNames from 'classnames/bind';
import Styles from './SingleView.module.scss';

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
    if (search.topAnime === undefined || search.topAnime.length === 0) {
      try {
        search.setData(JSON.parse(localStorage.getItem('topAnime')));
        setDataExits(true);
      } catch (error) {
        console.log(error);
        setDataExits(false);
      }
    }
  }, [search]);

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Anime Info</h1>
      {(dataExits && <SingleAnime info={search.singleData} />) || (
        <div>No data exits</div>
      )}
      <div>
        <h1 className={cx('title')}>Other Anime</h1>
        <SliderShownOther div />
      </div>
    </div>
  );
}

export default SingleView;
