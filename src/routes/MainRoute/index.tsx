import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
import Pilot from '../../pages/Pilot';
import SelectMusic from '../../pages/SelectMusic';

const MainRoute: React.FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<SelectMusic />} />
        <Route path='/pilot' element={<Pilot />} />
        <Route path='/*' element={<Navigate replace to='/' />} />
      </Routes>
    </MainLayout>
  );
};

export default MainRoute;
