const urlSlug = (url) => url.toLowerCase().split(' ').join('-');
const committee = [
  'Steering Committee',
  'Executive Committee',
  'Judging Panel',
  'Sub-Committee',
];

const contestInfo = [
  'Rules of ICPC Dhaka Regional',
  'Informations For Participants',
  'Accomodation',
  'Payment',
  'Program Schedule',
];

export default [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Committee',
    link: '/committee',
    submenu: committee.map((c) => ({
      name: c,
      link: `/committee/${urlSlug(c)}`,
      notPage: true,
      external: `/${urlSlug(c)}.pdf`,
    })),
  },
  {
    name: 'Contest Info',
    link: '/contest-info',
    submenu: contestInfo.map((c) => ({
      name: c,
      link: `/contest-info/${urlSlug(c)}`,
      notPage: true,
      external: `/${urlSlug(c)}.pdf`,
    })),
  },
  {
    name: 'Teams',
    link: '/teams',
  },
  {
    name: 'Gallery',
    link: '/gallery',
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