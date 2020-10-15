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
        name: '2017 Photos',
        link: '/contest-info/2017-photos',
        urlRedirect: 'https://drive.google.com/drive/folders/12_zdQ3Q_cdEuHNgMClKZW52OCNHx1Rgx'
      },
      {
        name: '2017 Onsite Contest Standings',
        link: '/contest-info/2017-onsite-contest-standings',
        urlRedirect:
          'https://icpc.global/regionals/finder/dhaka-2017/standings',
      },
      {
        name: '2017 Onsite Contest Detailed Standings',
        link: '/contest-info/2017-onsite-contest-detailed-standings',
        pdfRedirect: true
      },
      {
        name: 'Online Contest Detailed Ranklist',
        link: '/contest-info/online-contest-detailed-ranklist',
        pdfRedirect: true
      },
      {
        name: 'Onsite Contest Problem Set',
        link: '/contest-info/onsite-contest-problem-set',
        pdfRedirect: true
      },
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
        name: 'Foreign Team',
        link: '/contest-info/foreign-team',
      },
      {
        name: 'Online Preliminary Contest Rules',
        link: '/contest-info/online-preliminary-contest-rules',
        urlRedirect: 'http://www.uap-bd.edu/cse/acm-icpc/DhakaRegional2017PreliminaryRules.pdf'
      },
      {
        name: 'Online Preliminary Registration',
        link: '/contest-info/online-preliminary-registration',
        urlRedirect: 'https://icpc.baylor.edu/regionals/finder/dhaka-preliminary-2017'
      },
      {
        name: 'Preliminary Problem Set',
        link: '/contest-info/preliminary-problem-set',
        pdfRedirect: true
      },
      {
        name: 'Preliminary Standings',
        link: '/contest-info/preliminary-standings',
        pdfRedirect: true
      },
      {
        name: 'Onsite Contest Registration',
        link: '/contest-info/onsite-contest-registration',
        urlRedirect: 'https://icpc.baylor.edu/regionals/finder/dhaka-2017'
      },
      {
        name: 'Program Schedule',
        link: '/contest-info/program-schedule',
        pdfRedirect: true
      },
      {
        name: 'System Configuration',
        link: '/contest-info/system-configuration',
      },
      {
        name: 'ICPC Regional Rules for 2017',
        link: '/contest-info/icpc-regional-rules-for-2017',
        urlRedirect: 'https://icpc.baylor.edu/regionals/rules'
      },
      {
        name: 'ACM Student Membership',
        link: '/contest-info/acm-student-membership',
        urlRedirect: 'https://icpc.baylor.edu/regionals/acm-student-membership'
      },
      {
        name: 'ACM ICPC Blog',
        link: '/contest-info/acm-icpc-blog',
        urlRedirect: 'http://blog.sina.com.cn/cjhwang'
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
];
