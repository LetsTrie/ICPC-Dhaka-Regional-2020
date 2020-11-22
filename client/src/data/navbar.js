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
    unAuthenticated: true
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
        pdfRedirect: true
      },
      {
        name: 'Accomodation',
        link: '/contest-info/accomodation',
        pdfRedirect: true
      },
      {
        name: 'Payment',
        link: '/contest-info/program-schedule',
        pdfRedirect: true
      },
      {
        name: 'Program Schedule',
        link: '/contest-info/program-schedule',
        pdfRedirect: true
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
        pdfRedirect: true,
      },
      {
        name: 'Executive Committee',
        link: '/committee/executive-committee',
        pdfRedirect: true,
      },
      {
        name: 'Judging Panel',
        link: '/committee/judging-panel',
        pdfRedirect: true,
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
    authenticated: true
  },
];
