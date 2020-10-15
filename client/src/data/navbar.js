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
    link: '/registration',
    submenu: [
      {
        name: 'Online Registration',
        link: '/registration/online',
      },
      {
        name: 'Onsite Registration',
        link: '/registration/onsite',
      },
    ],
  },
  {
    name: 'Contest Info',
    link: '/contest-info',
    submenu: [
      {
        name: '2017 Report',
        link: '/contest-info/2017-report',
        pdfRedirect: true,
      },
      {
        name: '2017 Onsite Contest Standings',
        link: '/contest-info/2017-onsite-contest-standings',
        urlRedirect:
          'https://icpc.global/regionals/finder/dhaka-2017/standings',
      },
      {
        name: 'Date and Venue',
        link: '/contest-info/date-and-venue',
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
    ],
  },
  {
    name: 'Contact Us',
    link: '/contact',
  },
];
