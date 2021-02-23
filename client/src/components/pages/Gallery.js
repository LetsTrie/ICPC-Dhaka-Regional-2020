import React from 'react';
import '../../assests/css/gallery.css';
import gImg from '../../assests/images/gallery1.jpg';
import Header from '../ui/Header';

const numberOfImages = 36
function Gallery() {
  const _20Image = () => {
    return [...Array(numberOfImages )].map((e, i) => (
      <div
        key={`${Math.ceil(i * 10000 * Math.random())}`}
        className='gallery_img_wrapper'
      >
        <img src={require(`../../assests/gallery/gallery-${i+1}.jpg`)} alt='Gallery' />
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
            <h2>ICPC Preliminary Contest 2019</h2>
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
