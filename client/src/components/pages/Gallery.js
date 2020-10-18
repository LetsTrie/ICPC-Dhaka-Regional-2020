import React, { useState } from 'react';
import Header from '../ui/Header';
import gImg from '../../assests/images/gallery1.jpg';

import '../../assests/css/gallery.css';

function Gallery() {
  const _20Image = () => {
    return [...Array(12)].map((e, i) => (
      <div
        key={`${Math.ceil(i * 10000 * Math.random())}`}
        className='gallery_img_wrapper'
      >
        <img src={gImg} alt='Gallery' />
      </div>
    ));
  };
  return (
    <div>
      <div className='gallery'>
        <div className='gallery__header'>
          <Header />
        </div>
        <div className='each_gallery'>
          <div className='each_gallery__header'>
            <h2>ICPC Preliminary Contest 2020</h2>
          </div>
          <div className='each_gallery__photos'>
            <_20Image />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
