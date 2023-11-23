import React, { useEffect, useRef, useState } from 'react';
import { Typography } from '@mui/material';
import { gsap } from 'gsap';
import { getRandomNumber } from '../../../utils/getRandomNumber';

type Props = {
  title: string;
  delay: number;
  fontType: string;
};

const MusicTitle: React.FC<Props> = ({ title, delay, fontType }) => {
  const titleRef: any = useRef();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [firstLoad, setFirstLoad] = useState(false);

  const shakeAnimation = (x: number, y: number, z: number) => {
    gsap.to(titleRef.current, {
      delay: 0,
      duration: 0.3,
      ease: 'none',
      x: `+=${10 * x}`,
      y: `+=${10 * y}`,
      z: `+=${10 * z}`,
      onComplete: () => {
        gsap.to(titleRef.current, {
          delay: 0,
          duration: 0.3,
          ease: 'none',
          x: `-=${10 * x}`,
          y: `-=${10 * y}`,
          z: `-=${10 * z}`,
        });
      },
    });
  };

  useEffect(() => {
    gsap.to(titleRef.current, {
      delay: 0.1,
      duration: 0.1,
      ease: 'none',
      display: 'block',
      onComplete: () => {
        gsap.to(titleRef.current, {
          delay: delay - 4,
          duration: 0.1,
          ease: 'none',
          display: 'none',
        });
      },
    });
    gsap.to(titleRef.current, {
      delay: 0,
      duration: 5,
      ease: 'power1.out',
      scale:
        windowWidth < 600
          ? 3
          : windowWidth < 900
          ? 5
          : windowWidth < 900
          ? 6
          : 8,
      // fontSize: `${fontSize}px`,
      opacity: 1,
    });
    gsap.to(titleRef.current, {
      delay: delay - 8.5,
      duration: 4,
      ease: 'none',
      opacity: 0,
    });

    const interval = setInterval(() => {
      shakeAnimation(
        getRandomNumber(-1, 1),
        getRandomNumber(-1, 1),
        getRandomNumber(-1, 1)
      );
    }, 600);

    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log('windowWidth: ', windowWidth);
    if (firstLoad) {
      gsap.to(titleRef.current, {
        delay: 0,
        duration: 1,
        ease: 'power1.out',
        scale: windowWidth < 600 ? 3 : windowWidth < 1200 ? 5 : 8,
      });
    }
    setFirstLoad(true);
  }, [windowWidth]);

  return (
    <Typography
      ref={titleRef}
      sx={{
        maxWidth: {
          xs: '90px',
          sm: '120px',
          md: '135px',
          lg: '150px',
          xl: '185px',
        },
        fontSize: '10px',
        color: '#ffffff',
        display: 'none',
        opacity: 0.2,
        textAlign: 'center',
        wordBreak: 'break-word',
        fontFamily: fontType,
        WebkitTextStroke: '0.1px #009900',
        textShadow: '0px 2px 4px #000000',
        filter: 'brightness(2)',
      }}
    >
      {title}
    </Typography>
  );
};

export default MusicTitle;
