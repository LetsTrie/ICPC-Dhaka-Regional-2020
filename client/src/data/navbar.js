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
    name: 'Teams',
    link: '/teams',
    unAuthenticated: true,
  },
  {
    name: 'Contest Info',
    link: '/contest-info',
    submenu: [
      {
        name: 'Rules of ICPC Dhaka Regional',
        link: '/contest-info/rules-of-icpc-dhaka-regional',
        notPage: true,
        external: '/NavigationFiles/rules-of-icpc-dhaka-regional.pdf',
      },
      {
        name: 'Contest Outline',
        link: '/contest-info/asia-west-dhaka-regional-participation-eligibility.pdf',
        notPage: true,
        external: '/NavigationFiles/asia-west-dhaka-regional-participation-eligibility.pdf',
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
  external: '/NavigationFiles/rules-of-icpc-dhaka-regional.pdf',
},
*/
