const urlSlug = (url) => url.toLowerCase().split(' ').join('-');
const committee = [
  'Steering committee',
  'Executive committee',
  'Judging panel',
  'Sub-committees',
];

const contestInfo = [
  'Rules of ICPC Dhaka Regional',
  'Information for Participants',
  'Accommodation',
  'Payment',
  'Program schedule',
  'Qualification Criteria',
  'Online Preliminary Contest Rules',
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
    submenu: contestInfo.map((c) =>
      c != 'Online Preliminary Contest Rules'
        ? {
            name: c,
            link: `/contest-info/${urlSlug(c)}`,
            notPage: true,
            external: `/${urlSlug(c)}.pdf`,
          }
        : {
            name: c,
            link: `/contest-info/Rules`,
            notPage: false,
          }
    ),
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
