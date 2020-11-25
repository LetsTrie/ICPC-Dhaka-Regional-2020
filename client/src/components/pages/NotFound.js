import React from 'react';
import '../../assests/css/pageNotFound.css'
import Header from '../ui/Header';

export default () => {
  return (
    <div className='pageNotFound'>
      <Header />
      <div className='pageNotFound__header'> 
        <h1> PAGE NOT FOUND </h1>
      </div>
    </div>
  );
};
