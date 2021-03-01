import React from 'react';
import '../../assests/css/pageNotFound.css';
import data from '../../data/navbar';
import Header from '../ui/Header';

export default (props) => {
  return (
    <div className="pageNotFound">
      <Header />
      <div className="pageNotFound__header">
        <h1> Payment will start from March 5th, 2021 </h1>
      </div>
    </div>
  );
};
