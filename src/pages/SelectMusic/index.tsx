import React from 'react';
import { Stack, Typography, Box, List, ListItem } from '@mui/material';
import { musicList } from '../../utils/musicData';
import MusicListItem from '../../components/_ui/MusicListItem';

const SelectMusic: React.FC = () => {
  return (
    <Stack
      component='div'
      sx={{
        height: 1,
      }}
    >
      <Box
        component='div'
        sx={{ width: 1, height: '70px', minHeight: '70px', bgcolor: '#262626' }}
      ></Box>
      <Stack
        component='div'
        sx={{
          px: '30px',
          overflowY: 'auto',
          height: 1,
        }}
      >
        <Typography
          variant='h6'
          sx={{
            color: '#e6e6e6',
            mt: '20px',
            py: '20px',
            pl: '20px',
            fontWeight: 'bold',
          }}
        >
          Select Music
        </Typography>
        <List sx={{ pt: '0px' }}>
          {musicList.map((item, index: number) => (
            <ListItem key={index} sx={{ px: '0px' }}>
              <MusicListItem musicData={item} />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Stack>
  );
};

export default SelectMusic;
