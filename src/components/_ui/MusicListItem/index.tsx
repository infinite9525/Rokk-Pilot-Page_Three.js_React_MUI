import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

import { UserContext } from '../../../providers/UserProvider';

type Props = {
  musicData: MusicListType;
};

const MusicListItem: React.FC<Props> = ({ musicData }) => {
  const { setCurrentMusicData } = useContext(UserContext);

  const onPlayMusic = (data: MusicListType) => {
    localStorage.setItem('toPilot', 'yes');
    setCurrentMusicData(data);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#404040',
        borderRadius: '6px',
        width: '100%',
        pl: '20px',
        py: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '&:hover': {
          backgroundColor: '#303030',
        },
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '25px',
              py: '10px',
              color: 'white',
            }}
          >
            {musicData.title}
          </Typography>
          <Typography
            sx={{
              color: 'white',
              fontSize: '15px',
            }}
          >{`(${musicData.fontType})`}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <Typography
            sx={{
              color: 'white',
            }}
          >
            artist :
          </Typography>
          <Typography
            sx={{
              color: 'white',
            }}
          >
            {musicData.artist}
          </Typography>
        </Box>
      </Box>
      <Link to='/pilot'>
        <Box
          sx={{
            px: '30px',
            py: '20px',
            '&:hover': {
              cursor: 'pointer',
              scale: '1.5',
              transition: '0.3s',
              color: 'grey',
            },
          }}
          onClick={() => {
            onPlayMusic(musicData);
          }}
        >
          <PlayCircleFilledWhiteIcon fontSize='large' />
        </Box>
      </Link>
    </Box>
  );
};

export default MusicListItem;
