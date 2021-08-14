import React from 'react';
import '../../assests/css/gallery.css';
import Header from '../ui/Header';
import { SRLWrapper } from 'simple-react-lightbox';

const numberOfImages = 36;
const numberOfICPCimages = 1;
function Gallery() {
  const NewImage = () => {
    return [...Array(numberOfICPCimages)].map((e, i) => (
      <div key={i * i} className="gallery_img_wrapper">
        <img
          src={require(`../../assests/icpc2020/img_${i + 1}.jpg`)}
          alt="Gallery"
        />
      </div>
    ));
  };

  const _20Image = () => {
    return [...Array(numberOfImages)].map((e, i) => (
      <div key={i * i + i * i + 10} className="gallery_img_wrapper">
        <img
          src={require(`../../assests/gallery/gallery-${i + 1}.jpg`)}
          alt="Gallery"
        />
      </div>
    ));
  };
  return (
    <div>
      <div className="gallery">
        <div className="gallery__header">
          <Header />
        </div>
        <SRLWrapper>
          <div className="each_gallery">
            <div className="each_gallery__header">
              <h2>ICPC Preliminary Contest 2020</h2>
            </div>
            <div className="each_gallery__photos" style={{ marginBottom: 20 }}>
              <NewImage />
            </div>

            <div className="each_gallery__header">
              <h2>ICPC Preliminary Contest 2019</h2>
            </div>
            <div className="each_gallery__photos">
              <_20Image />
            </div>
          </div>
        </SRLWrapper>
      </div>
    </div>
  );
}

export default Gallery;
