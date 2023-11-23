import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { getRandomNumber } from '../../../utils/getRandomNumber';
import { gsap } from 'gsap';

const animationPosition = [
  { x: 125, y: 55 },
  { x: 20, y: 10 },
  { x: -130, y: 55 },
  { x: 20, y: 105 },
];

type Props = {
  image: any;
  discoRef: any;
};

const CoverImage: React.FC<Props> = ({ image, discoRef }) => {
  const coverRef: any = useRef();

  // const mainAnimation = (
  //   x: number,
  //   y: number,
  //   scale: number,
  //   rotation: number
  // ) => {
  //   gsap.to(coverRef.current, {
  //     delay: 0,
  //     duration: 0.2,
  //     top: `${100 * x}%`,
  //     left: `${100 * y}%`,
  //     scale: 150 * scale,
  //     rotation: rotation * 360,
  //     display: 'block',
  //   });
  // };

  const mainAnimation = (x: number, y: number) => {
    gsap.to(coverRef.current, {
      delay: 0,
      duration: 0.2,
      top: `${x}%`,
      left: `${y}%`,
      display: 'block',
    });
  };

  const shakeAnimation = (x: number, y: number, z: number) => {
    gsap.to(coverRef.current, {
      delay: 0,
      duration: 0.3,
      ease: 'none',
      x: `+=${10 * x}`,
      y: `+=${10 * y}`,
      z: `+=${10 * z}`,
      onComplete: () => {
        gsap.to(coverRef.current, {
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
    gsap.to(discoRef.current, {
      delay: 0,
      duration: 0.0,
      ease: 'none',
      bgcolor: 'rgba(255, 255, 255, 1)',
    });

    gsap.to(coverRef.current, {
      delay: 0.5,
      duration: 1,
      ease: 'none',
      opacity: 1,
      scale: 500,
    });

    const shakeInterval = setInterval(() => {
      shakeAnimation(
        getRandomNumber(-1, 1),
        getRandomNumber(-1, 1),
        getRandomNumber(-1, 1)
      );
    }, 600);

    // const mainInterval = setTimeout(() => {
    //   setInterval(() => {
    //     mainAnimation(
    //       getRandomNumber(0, 1),
    //       getRandomNumber(0, 1),
    //       getRandomNumber(0.5, 1),
    //       getRandomNumber(0, 0.2)
    //     );
    //   }, 10000);
    // }, (delay - 4.5) * 1000);

    mainAnimation(animationPosition[0].x, animationPosition[0].y);
    const mainInterval = setTimeout(() => {
      let index = 1;
      setInterval(() => {
        mainAnimation(animationPosition[index].x, animationPosition[index].y);
        if (index < 3) {
          index++;
        } else {
          index = 0;
        }
      }, 10000);
    }, 0.5 * 1000);

    return () => {
      clearInterval(shakeInterval);
      clearInterval(mainInterval);
    };
  }, []);

  return (
    <Box
      ref={discoRef}
      sx={{
        position: 'fixed',
        width: 1,
        height: 1,
        display: 'flex',
        filter: 'brightness(1)',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 1,
          height: 1,
          bgcolor: 'rgba(0, 0, 0, 0)',
        }}
      >
        <Box
          ref={coverRef}
          component={'img'}
          src={image}
          sx={{
            position: 'absolute',
            top: 'calc(50% - 10px)',
            left: 'calc(50% - 10px)',
            width: '10px',
            height: '10px',
            zIndex: 0,
            opacity: 0,
          }}
        />
      </Box>
    </Box>
  );
};

export default CoverImage;
