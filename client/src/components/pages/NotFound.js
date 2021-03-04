import React from 'react';
import '../../assests/css/pageNotFound.css';
import data from '../../data/navbar';
import Header from '../ui/Header';

export default (props) => {
  const { pathname } = props.location;

  /* Searching URL is already in Navbar. */
  let found = false;
  const matched = (a, b) => a === b;

  for (let menu of data) {
    found = found || matched(menu.link, pathname);
    if (found) break;

    if (menu.submenu) {
      for (let submenu of menu.submenu) {
        found = found || matched(submenu.external, pathname);
        if (found) break;
      }
    }
  }

  if (found) {
    return (
      <div className="pageNotFound">
        <Header />
        <div className="pageNotFound__header">
          <h1> Coming Soon </h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className="pageNotFound">
        <Header />
        <div className="pageNotFound__header">
          <h1> PAGE NOT FOUND </h1>
        </div>
      </div>
    );
  }
};
