import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../context/search';
import { SingleCharacters } from '../../components';
import { SliderShownCharacters } from '../../access/Layout/DefaultLayout';
import classNames from 'classnames/bind';
import Styles from './SingleViewCharacters.module.scss';

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
    if (search.characters === undefined || search.characters.length === 0) {
      try {
        search.setCha(JSON.parse(localStorage.getItem('charaters')));
        setDataExits(true);
      } catch (error) {
        console.log(error);
        setDataExits(false);
      }
    }
  }, [search]);

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Characters Info</h1>
      {(dataExits && <SingleCharacters info={search.singleData} />) || (
        <div>No data exits</div>
      )}
      <div>
        <h1 className={cx('title')}>Other Characters</h1>
        <SliderShownCharacters />
      </div>
    </div>
  );
}

export default SingleView;
