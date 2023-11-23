import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { getRandomNumber } from '../../../utils/getRandomNumber';
import 'animate.css';

type Props = {
  text: string;
  textDelay: number;
  delay: number;
  duration: number;
  animationIndex: number;
  fontStyle: string;
};

const MiniText: React.FC<Props> = ({
  text,
  delay,
  duration,
  textDelay,
  animationIndex,
  fontStyle,
}) => {
  const textRef: any = useRef();
  const miniRef: any = useRef();

  const shakeAnimation = (x: number, y: number, z: number) => {
    gsap.to(textRef.current, {
      delay: 0,
      duration: 0.3,
      ease: 'none',
      x: `+=${2 * x}`,
      y: `+=${2 * y}`,
      z: `+=${2 * z}`,
      onComplete: () => {
        gsap.to(textRef.current, {
          delay: 0,
          duration: 0.3,
          ease: 'none',
          x: `-=${2 * x}`,
          y: `-=${2 * y}`,
          z: `-=${2 * z}`,
        });
      },
    });
  };

  useEffect(() => {
    if (animationIndex === 0) {
      gsap.to(textRef.current, {
        delay: textDelay,
        duration: 0.0,
        ease: 'none',
        display: 'block',
      });
      gsap.to(textRef.current, {
        delay: delay,
        duration: 0.3,
        ease: 'none',
        // fontSize: '50px',
        opacity: 1,
      });
    }
    if (animationIndex === 1) {
      gsap.to(textRef.current, {
        delay: delay - 0.1,
        duration: 0.0,
        ease: 'none',
        scale: 1 / 6,
        opacity: 1,
        display: 'none',
      });
      gsap.to(textRef.current, {
        delay: delay,
        duration: 0.3,
        ease: 'none',
        scale: 1,
        opacity: 1,
        display: 'block',
      });
    }
    if (animationIndex === 2) {
      gsap.to(miniRef.current, {
        delay: delay - 0.1,
        duration: 0,
        ease: 'none',
        y: '-=50',
        opacity: 1,
      });
      // gsap.to(miniRef.current, {
      //   delay: delay,
      //   duration: 1.0,
      //   ease: 'none',
      //   y: '+=100',
      // });
    }

    gsap.to(textRef.current, {
      delay: duration,
      duration: 1,
      ease: 'none',
      scale: 100,
    });
    gsap.to(textRef.current, {
      delay: duration,
      duration: 0.1,
      ease: 'none',
      opacity: 0,
    });

    shakeAnimation(
      getRandomNumber(-1, 1),
      getRandomNumber(-1, 1),
      getRandomNumber(-1, 1)
    );
    const interval = setInterval(() => {
      shakeAnimation(
        getRandomNumber(-1, 1),
        getRandomNumber(-1, 1),
        getRandomNumber(-1, 1)
      );
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      component='div'
      ref={textRef}
      sx={{
        position: 'relative',
        display: 'none',
        opacity: 0,
      }}
    >
      <Typography
        component='span'
        ref={miniRef}
        sx={{
          fontFamily: fontStyle,
          fontSize: '10px',
          color: '#ffffff',
          WebkitTextStroke: '0.1px #0086b3',
          textShadow: '0px 2px 2px #000000',
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default MiniText;
