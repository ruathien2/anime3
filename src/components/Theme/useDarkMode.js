import { useEffect, useState } from 'react';

export default function useDarkMode() {
  const [lightMode, setLightMode] = useState('light' ? true : false);

  useEffect(() => {
    if (lightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [lightMode]);

  const toggleDarkMode = () => {
    setLightMode(!lightMode);
  };

  return [lightMode, toggleDarkMode];
}
