import styles from './SingleCharacters.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SingleCharacters(props) {
  const name = props.info.name;

  console.log(props.info);

  // useEffect(() => {
  //   console.log(name, images);
  // }, [name, images]);
  return (
    <div className={cx('singleanime__container')}>
      <div>
        <img
          className={cx('img__anime')}
          src=""
          alt={name}
          style={{ maxHeight: 300 }}
        />
      </div>
      <div>
        <h1>Name: {name}</h1>
      </div>
    </div>
  );
}

export default SingleCharacters;
