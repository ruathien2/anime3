import { useEffect, useState } from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';

function ButtonTop() {
  const [goToTop, setGoToTop] = useState(false);

  useEffect(() => {
    const handleGoToTop = () => {
      if (window.scrollY >= 200) {
        setGoToTop(true);
      } else {
        setGoToTop(false);
      }
    };

    window.addEventListener('scroll', handleGoToTop);

    return () => {
      window.removeEventListener('scroll', handleGoToTop);
    };
  });
  return (
    <div>
      {goToTop && (
        <button
          style={{
            position: 'fixed',
            right: 20,
            bottom: 20,
            background: 'red',
            border: 'none',
            padding: 10,
            borderRadius: 100,
            color: '#fff',
            cursor: 'pointer',
            zIndex: 1,
          }}
          onClick={() =>
            setGoToTop(
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              }),
            )
          }
        >
          <ArrowUpOutlined />
        </button>
      )}
    </div>
  );
}

export default ButtonTop;
