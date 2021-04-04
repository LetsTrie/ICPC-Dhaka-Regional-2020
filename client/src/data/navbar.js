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
  'Online Preliminary Contest Rules'
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
    submenu: contestInfo.map((c, i) => (

      i == 5 ? {
        name: c,
        link: `/contest-info/rules-of-preli`,
        notPage: false,
        // external: `/${urlSlug(c)}.pdf`,
      } : {
        name: c,
        link: `/contest-info/${urlSlug(c)}`,
        notPage: true,
        external: `/${urlSlug(c)}.pdf`,
      }

    )),
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
