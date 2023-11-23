import React, { useEffect, useRef, useState } from 'react';
import { Stack } from '@mui/material';
import { gsap } from 'gsap';
import MiniText from '../MiniText';

type Props = {
  lyric: LyricType;
  animationIndex: number;
  fontStyle: string;
};

const LyricText: React.FC<Props> = ({ lyric, animationIndex, fontStyle }) => {
  const textRef: any = useRef();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    gsap.to(textRef.current, {
      delay: lyric.start - 2.7,
      duration: 0.0,
      ease: 'none',
      display: 'flex',
      onComplete: () => {
        gsap.to(textRef.current, {
          delay: lyric.length - 0.2,
          duration: 0.1,
          ease: 'none',
          display: 'none',
        });
      },
    });

    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  useEffect(() => {
    console.log('windowWidth: ', windowWidth);
    gsap.to(textRef.current, {
      delay: 0,
      duration: 0.1,
      ease: 'none',
      scale: windowWidth < 600 ? 3 : windowWidth < 1200 ? 5 : 6,
    });
  }, [windowWidth]);

  return (
    <Stack
      ref={textRef}
      direction='row'
      alignItems='center'
      justifyContent='center'
      spacing={0.5}
      sx={{
        flexWrap: 'wrap',
        maxWidth: {
          xs: '90px',
          sm: '120px',
          md: '135px',
          lg: '150px',
          xl: '185px',
        },
      }}
    >
      {lyric.text.split(' ').map((item, index: number) => (
        <MiniText
          key={index}
          text={item}
          delay={lyric.start - 2.7 + index * 0.2}
          textDelay={lyric.start - 2.8}
          duration={lyric.start - 2.7 + lyric.length - 0.4}
          animationIndex={animationIndex}
          fontStyle={fontStyle}
        />
      ))}
    </Stack>
  );
};

export default LyricText;
