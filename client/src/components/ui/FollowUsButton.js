import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import '../../assests/css/followUsButton.css';

const FollowUsButton = ({ platform, link }) => {
  let Icon;
  if (platform === 'facebook') Icon = FacebookIcon;
  let handleClick = () => window.open(link);
  return (
    <div className="button_container" onClick={handleClick}>
      <div className="icon_container">
        <Icon className="icon" />
      </div>
      <div className="follow_us_container">
        <span>follow us on</span>
        <span>{platform}</span>
      </div>
    </div>
  );
};

export default FollowUsButton;
