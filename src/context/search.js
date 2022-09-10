import { createContext } from 'react';

export const SearchContext = createContext({
  animeData: [],
  topAnime: [],
  characters: [],
  singleData: {},
  search: () => {},
  setData: () => {},
  setTop: () => {},
  setSingle: () => {},
  setCha: () => {},
});
