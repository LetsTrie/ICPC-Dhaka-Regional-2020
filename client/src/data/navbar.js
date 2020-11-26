export default [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Gallery',
    link: '/gallery',
  },
  {
    name: 'Registration',
    link: '/registration/online',
    unAuthenticated: true,
  },
  {
    name: 'Contest Info',
    link: '/contest-info',
    submenu: [
      {
        name: 'Date and Venue',
        link: '/contest-info/date-and-venue',
      },
      {
        name: 'Rules of ICPC Dhaka Regional',
        link: '/contest-info/rules-of-icpc-dhaka-regional',
      },
      {
        name: 'Accomodation',
        link: '/contest-info/accomodation',
      },
      {
        name: 'Payment',
        link: '/contest-info/payment',
      },
      {
        name: 'Program Schedule',
        link: '/contest-info/program-schedule',
      },
    ],
  },
  {
    name: 'Committee',
    link: '/committee',
    submenu: [
      {
        name: 'Steering Committee',
        link: '/committee/steering-committee',
      },
      {
        name: 'Executive Committee',
        link: '/committee/executive-committee',
      },
      {
        name: 'Judging Panel',
        link: '/committee/judging-panel',
      },
      {
        name: 'Sub-Committee',
        link: '/committee/sub-committees',
      },
    ],
  },
  {
    name: 'Contact Us',
    link: '/contact',
  },
  {
    name: 'My Profile',
    link: '/profile',
    teamAllowed: true,
  },
];

/*
link ba image thakle evabe notPage true kore dile ebong, external server pdf link othoba
bairer kono link diye dilei hobe.. 

{
    name: 'Sub-Committee',
    link: '/committee/sub-committees',
    notPage: true,
    external: 'http://localhost:5000/1.jpg',
  },
*/
