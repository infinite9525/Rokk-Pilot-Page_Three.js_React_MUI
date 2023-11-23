import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import LyricText from '../../components/_ui/LyricText';
import MusicTitle from '../../components/_ui/MusicTitle';
import CoverImage from '../../components/_ui/CoverImage';
import SmokeEffect from '../../components/_three/SmokeEffect';
import { UserContext } from '../../providers/UserProvider';

import PlayIcon from '../../assets/icons/play.svg';
import loadingIcon from '../../assets/icons/loading.gif';
import background from '../../assets/images/infinite.png';
import music from '../../assets/song/MP3 Freedom Of The Press.mp3';
import lyricsData from '../../jsons/Freedom Of The Press.json';
import MusicInfo from '../../components/_ui/MusicInfo';

const musicInfo = [
  'Founded in 2018',
  'Mentalist still active',
  'From Saarbrücken, Germany / Stocklholm, Schweden',
  'Plays Melodic Power Metal and Heavy Metal',
  'Current Members:',
  'Florian Hertel (Bass)',
  'Thomen Stauch (Drums)',
  'Kai Stringer (Guitar)',
  'Peter Moog (Guitar)',
  'Rob Lundgren (Vocals)',
];

const Pilot: React.FC = () => {
  const musicPlayerRef: any = useRef();
  const discoRef: any = useRef();
  const requestRef: any = useRef(null);
  const [isPlay, setIsPlay] = useState(false);
  const [isPlayReady, setIsPlayReady] = useState(false);
  const { currentMusicData } = useContext(UserContext);
  const navigate = useNavigate();
  let frequencyArray: Uint8Array;
  let analyser: any;

  const onAudioLoad = () => {
    const player = new Audio(music);
    musicPlayerRef.current = player;

    player.addEventListener('canplay', () => {
      setIsPlayReady(true);
    });

    player.addEventListener('ended', onEnded);
  };

  const onPlay = () => {
    setIsPlay((prev) => !prev);
    getAudioSpectrum();
    requestRef.current = requestAnimationFrame(calculateOpacity);
  };

  const onStop = () => {
    if (musicPlayerRef.current) {
      musicPlayerRef.current.pause();
      musicPlayerRef.current.currentTime = 0;
      musicPlayerRef.current = undefined;
    }
  };

  const onEnded = () => {
    setIsPlay(false);
    navigate('/');
  };

  const getAudioSpectrum = () => {
    if (musicPlayerRef.current) {
      const context = new window.AudioContext();
      analyser = context.createAnalyser();
      const source = context.createMediaElementSource(musicPlayerRef.current);

      source.connect(analyser);
      analyser.connect(context.destination);

      frequencyArray = new Uint8Array(analyser.frequencyBinCount);
      musicPlayerRef.current.play();
    }
  };

  const calculateOpacity = () => {
    analyser.getByteFrequencyData(frequencyArray);
    const total = frequencyArray.reduce((acc, prev) => acc + prev, 0);
    const length = frequencyArray.length;
    const modelValue = total / length / 255;
    const alpha = modelValue < 0.15 ? 0 : modelValue;
    discoRef.current.style.backgroundColor = `rgba(255, 255, 255, ${alpha})`;
    discoRef.current.style.filter = `brightness(${
      alpha === 0 ? 1 : Math.pow(alpha * 6, 2)
    })`;
    requestRef.current = requestAnimationFrame(calculateOpacity);
  };

  useEffect(() => {
    onAudioLoad();

    const toPilotPage = localStorage.getItem('toPilot');
    if (toPilotPage === 'no' || toPilotPage === null) {
      navigate('/');
    }
    setTimeout(() => {
      localStorage.setItem('toPilot', 'no');
    }, 1000);

    return () => {
      onStop();
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        height: 1,
        overflow: 'hidden',
      }}
    >
      {/* <Box
          sx={{
            width: '100%',
            height: '100vh',
            opacity: '0.1',
            position: 'absolute',
            backgroundImage: `url(${currentMusicData.image})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        /> */}
      {isPlay && (
        <>
          <SmokeEffect />
          <CoverImage discoRef={discoRef} image={currentMusicData.image} />
        </>
      )}
      <Box
        component='div'
        sx={{
          position: 'absolute',
          bottom: '20px',
          right: '10px',
          paddingX: '4px',
        }}
      >
        <MusicInfo info={musicInfo} />
      </Box>
      <Box
        component='div'
        sx={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          width: 1,
          height: 1,
          display: isPlay ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 50,
        }}
      >
        <Button onClick={onPlay} disabled={!isPlayReady}>
          <Box
            component={'img'}
            src={isPlayReady ? PlayIcon : loadingIcon}
            sx={{
              width: '70px',
              height: '70px',
              ':hover': {
                width: '80px',
                height: '80px',
              },
            }}
          />
        </Button>
      </Box>
      <Box
        component='div'
        sx={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          width: 1,
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0)',
          zIndex: 40,
        }}
      >
        {isPlay && (
          <>
            <MusicTitle
              title={lyricsData.title}
              delay={lyricsData.lyric[0].start}
              fontType={currentMusicData.fontType}
            />
            {lyricsData.lyric.map((item, index: number) => (
              <LyricText
                key={index}
                lyric={item}
                fontStyle={currentMusicData.fontType}
                animationIndex={Math.floor(index / 10) % 2}
              />
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Pilot;
