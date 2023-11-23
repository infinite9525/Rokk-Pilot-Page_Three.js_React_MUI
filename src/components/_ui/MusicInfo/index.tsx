import React from 'react';
import { Stack, Typography } from '@mui/material';
type Props = {
  info: string[];
};

const MusicInfo: React.FC<Props> = ({ info }) => {
  return (
    <Stack spacing={1}>
      {info.map((item, index: number) => (
        <Typography
          key={index}
          sx={{
            color: 'black',
            fontWeight: 'bold',
            WebkitTextStroke: '0.2px #ffffff',
          }}
        >
          {item}
        </Typography>
      ))}
    </Stack>
  );
};

export default MusicInfo;
