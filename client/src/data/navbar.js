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

const teamInfo = ['Preliminary Teams', 'Selected Teams for Dhaka Regional'];

export default [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Committee',
    link: '/committee',
    submenu: committee.map((c, i) => (
      i%2 == 0 ? {
        name: c,
        link: `/committee/${urlSlug(c)}`,
        notPage: false,
      } : {
        name: c,
        link: `/committee/${urlSlug(c)}`,
        notPage: true,
        external: `/${urlSlug(c)}.pdf`
      }
    )),
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
    submenu: [
      {
        name: teamInfo[0],
        link: `/teams`,
        notPage: false,
      },
      {
        name: teamInfo[1],
        link: `/teams/${urlSlug(teamInfo[1])}.pdf`,
        notPage: true,
        external: `/${urlSlug(teamInfo[1])}.pdf`,
      },
    ],
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
