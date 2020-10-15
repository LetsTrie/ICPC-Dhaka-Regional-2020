import React from 'react';
import axios from 'axios';
import NavBarData from '../../data/navbar';

const MENU = 'Contest Info';

function ContestInfo(props) {
  const urlParams = props.match.params.subMenu;

  let subMenu = NavBarData.find((m) => m.name === MENU).submenu;
  subMenu = subMenu.find((m) => m.link.includes(urlParams));

  // Redirect to URL
  if (subMenu.urlRedirect) {
    let { urlRedirect } = subMenu;
    window.location.replace(urlRedirect);
    return null;
  } 
  
  // Redirect to PDF
  else if (subMenu.pdfRedirect) {
    axios(`/api/v1/contest-info/file/${urlParams}.pdf`, {
      method: 'GET',
      responseType: 'blob',
    })
      .then((response) => {
        const file = new Blob([response.data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.location.replace(fileURL);
      })
      .catch((error) => {
        console.log(error);
      });
    return null;
  } 
  
  // Pages
  else {
    return <h1> Contest Info </h1>;
  }
}

export default ContestInfo;