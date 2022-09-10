import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  Home,
  Results,
  SingleView,
  Rank,
  Characters,
  SingleViewCharacters,
  Manga,
  Profile,
  PostNews,
  News,
} from '../pages';

import { Header } from '../access/Layout/DefaultLayout';
import { SearchContext } from '../context/search';
import { ButtonTop } from '../components';
import styles from './Link.module.scss';
import classNames from 'classnames/bind';
import { Register, Login, AddArticle, Article, Articles } from '../article';

const cx = classNames.bind(styles);

function Link() {
  const [animeData, setAnimeData] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [bypopularity, setBypopularity] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [manga, setManga] = useState([]);
  const [singleData, setSingleData] = useState({});

  //===========================================================================================

  const setData = (data) => {
    setAnimeData(data);
  };

  const setSingle = (data) => {
    setSingleData(data);
  };

  const setTop = (data) => {
    setTopAnime(data);
  };
  const setBypo = (data) => {
    setBypopularity(data);
  };

  const setCha = (data) => {
    setCharacters(data);
  };

  const setMan = (data) => {
    setManga(data);
  };

  //===========================================================================================

  const search = (searchTerm) => {
    return fetch(
      `https://api.jikan.moe/v3/search/anime?q=${searchTerm}&limit=20`,
    ).then((res) => res.json());
  };

  //===========================================================================================

  useEffect(() => {
    const getTopAnime = async () => {
      await fetch('https://api.jikan.moe/v3/top/anime')
        .then((res) => res.json())
        .then((data) => setTopAnime(data.top));
    };
    getTopAnime();
  }, []);

  // const getTopAnime = async () => {
  //   const data = await fetch(`https://api.jikan.moe/v3/top/anime`).then((res) =>
  //     res.json(),
  //   );
  //   setTopAnime(data.top);
  // };

  // useEffect(() => {
  //   getTopAnime();
  // }, []);

  //===========================================================================================

  useEffect(() => {
    const getBypopularity = async () => {
      await fetch('https://api.jikan.moe/v3/top/anime/1/bypopularity')
        .then((res) => res.json())
        .then((data) => setBypopularity(data.top));
    };
    getBypopularity();
  }, []);

  // const getBypopularity = async () => {
  //   const data = await fetch(
  //     `https://api.jikan.moe/v3/top/anime/1/bypopularity`,
  //   ).then((res) => res.json());

  //   setBypopularity(data.top);
  // };

  // useEffect(() => {
  //   getBypopularity();
  // }, []);

  //===========================================================================================

  useEffect(() => {
    const getCharacters = async () => {
      await fetch('https://api.jikan.moe/v4/characters')
        .then((res) => res.json())
        .then((data) => setCharacters(data.data));
    };
    getCharacters();
  }, []);

  // const getCharacters = async () => {
  //   const data = await fetch(`https://api.jikan.moe/v4/characters`).then(
  //     (res) => res.json(),
  //   );
  //   setCharacters(data.data);
  // };

  // useEffect(() => {
  //   getCharacters();
  // }, []);

  //===========================================================================================

  // useEffect(() => {
  //   const getManga = async () => {
  //     await fetch('https://api.jikan.moe/v4/manga')
  //       .then((res) => res.json())
  //       .then((data) => setManga(data.data));
  //   };
  //   getManga();
  // }, []);

  // const getManga = async () => {
  //   const data = await fetch(`https://api.jikan.moe/v4/manga`).then((res) =>
  //     res.json(),
  //   );
  //   setManga(data.data);
  // };

  // useEffect(() => {
  //   getManga();
  // }, []);

  //===========================================================================================

  return (
    <div>
      <SearchContext.Provider
        value={{
          search,
          animeData,
          setData,
          singleData,
          setSingle,
          topAnime,
          setTop,
          bypopularity,
          setBypo,
          characters,
          setCha,
          manga,
          setMan,
        }}
      >
        <Router>
          <Header style={{ with: '100%' }} />
          <main className={cx('wrapper')}>
            <Routes>
              <Route path="/anime3">
                <Route index element={<Home />} exact />
                <Route path="results" element={<Results />} exact />
                <Route path="single-view" element={<SingleView />} exact />
                <Route
                  path="single-view-characters"
                  element={<SingleViewCharacters />}
                  exact
                />
                <Route path="profile-user" element={<Profile />} exact />
                <Route path="post-news" element={<PostNews />} exact />
                <Route path="news" element={<News />} exact />
                {/* <Route
                path="/single-view-manga"
                element={<SingleViewManga />}
                exact
              /> */}
                <Route path="rank-anime" element={<Rank />} exact />
                <Route path="characters" element={<Characters />} exact />
                <Route path="manga" element={<Manga />} exact />

                <Route path="register" element={<Register />} />
                <Route path="signin" element={<Login />} />
                <Route path="articles/article/:id" element={<Article />} />
                <Route path="articles" element={<Articles />} />
              </Route>
            </Routes>
          </main>
        </Router>
      </SearchContext.Provider>
      <ButtonTop />
    </div>
  );
}

export default Link;
