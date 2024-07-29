import { Icons } from '@/components/icons';

// export const users = [
//   {
//     id: 1,
//     name: 'Candice Schiner',
//     company: 'Dell',
//     role: 'Frontend Developer',
//     verified: false,
//     status: 'Active',
//   },
//   {
//     id: 2,
//     name: 'John Doe',
//     company: 'TechCorp',
//     role: 'Backend Developer',
//     verified: true,
//     status: 'Active',
//   },
//   {
//     id: 3,
//     name: 'Alice Johnson',
//     company: 'WebTech',
//     role: 'UI Designer',
//     verified: true,
//     status: 'Active',
//   },
//   {
//     id: 4,
//     name: 'David Smith',
//     company: 'Innovate Inc.',
//     role: 'Fullstack Developer',
//     verified: false,
//     status: 'Inactive',
//   },
//   {
//     id: 5,
//     name: 'Emma Wilson',
//     company: 'TechGuru',
//     role: 'Product Manager',
//     verified: true,
//     status: 'Active',
//   },
//   {
//     id: 6,
//     name: 'James Brown',
//     company: 'CodeGenius',
//     role: 'QA Engineer',
//     verified: false,
//     status: 'Active',
//   },
//   {
//     id: 7,
//     name: 'Laura White',
//     company: 'SoftWorks',
//     role: 'UX Designer',
//     verified: true,
//     status: 'Active',
//   },
//   {
//     id: 8,
//     name: 'Michael Lee',
//     company: 'DevCraft',
//     role: 'DevOps Engineer',
//     verified: false,
//     status: 'Active',
//   },
//   {
//     id: 9,
//     name: 'Olivia Green',
//     company: 'WebSolutions',
//     role: 'Frontend Developer',
//     verified: true,
//     status: 'Active',
//   },
//   {
//     id: 10,
//     name: 'Robert Taylor',
//     company: 'DataTech',
//     role: 'Data Analyst',
//     verified: false,
//     status: 'Active',
//   },
// ];

export const navItems = [
  {
    title: 'Panelis',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
  },
  {
    title: 'Punktu tabula',
    href: '/dashboard/pointstable',
    icon: 'sheet',
    label: 'pointstable',
  },
  // {
  //   title: 'Employee',
  //   href: '/dashboard/employee',
  //   icon: 'employee',
  //   label: 'employee',
  // },
  // {
  //   title: 'Profile',
  //   href: '/dashboard/profile',
  //   icon: 'profile',
  //   label: 'profile',
  // },
  // {
  //   title: 'Kanban',
  //   href: '/dashboard/kanban',
  //   icon: 'kanban',
  //   label: 'kanban',
  // },
  // {
  //   title: 'Izlogoties',
  //   href: '/',
  //   icon: 'login',
  //   label: 'login',
  // },
];

export const scoreTable = {
  Lielais: {
    'Uzvar ar 61-90 acīm': {
      3: {
        Lielajam: +2,
        '1.mazajam': -1,
        '2.mazajam': -1,
      },
      4: {
        Lielajam: +3,
        '1.mazajam': -1,
        '2.mazajam': -1,
        '3.mazajam': -1,
      },
    },
    'Uzvar ar 91 vai vairāk acīm': {
      3: {
        Lielajam: +4,
        '1.mazajam': -2,
        '2.mazajam': -2,
      },
      4: {
        Lielajam: +6,
        '1.mazajam': -2,
        '2.mazajam': -2,
        '3.mazajam': -2,
      },
    },
    'Uzvar iegūstot visus stiķus': {
      3: {
        Lielajam: +6,
        '1.mazajam': -3,
        '2.mazajam': -3,
      },
      4: {
        Lielajam: +9,
        '1.mazajam': -3,
        '2.mazajam': -3,
        '3.mazajam': -3,
      },
    },
    'Zaudē ar 31-60 acīm': {
      3: {
        Lielajam: -4,
        '1.mazajam': +2,
        '2.mazajam': +2,
      },
      4: {
        Lielajam: -6,
        '1.mazajam': +2,
        '2.mazajam': +2,
        '3.mazajam': +2,
      },
    },
    'Zaudē ar 30 un mazāk acīm': {
      3: {
        Lielajam: -6,
        '1.mazajam': +3,
        '2.mazajam': +3,
      },
      4: {
        Lielajam: -9,
        '1.mazajam': +3,
        '2.mazajam': +3,
        '3.mazajam': +3,
      },
    },
    'Zaudē neiegūstot nevienu stiķi': {
      3: {
        Lielajam: -8,
        '1.mazajam': +4,
        '2.mazajam': +4,
      },
      4: {
        Lielajam: -12,
        '1.mazajam': +4,
        '2.mazajam': +4,
        '3.mazajam': +4,
      },
    },
  },
  Zole: {
    'Uzvar ar 61-90 acīm': {
      3: {
        Lielajam: +10,
        '1.mazajam': -5,
        '2.mazajam': -5,
      },
      4: {
        Lielajam: +15,
        '1.mazajam': -5,
        '2.mazajam': -5,
        '3.mazajam': -5,
      },
    },
    'Uzvar ar 91 vai vairāk acīm': {
      3: {
        Lielajam: +12,
        '1.mazajam': -6,
        '2.mazajam': -6,
      },
      4: {
        Lielajam: +18,
        '1.mazajam': -6,
        '2.mazajam': -6,
        '3.mazajam': -6,
      },
    },
    'Uzvar iegūstot visus stiķus': {
      3: {
        Lielajam: +14,
        '1.mazajam': -7,
        '2.mazajam': -7,
      },
      4: {
        Lielajam: +21,
        '1.mazajam': -7,
        '2.mazajam': -7,
        '3.mazajam': -7,
      },
    },
    'Zaudē ar 31-60 acīm': {
      3: {
        Lielajam: -12,
        '1.mazajam': +6,
        '2.mazajam': +6,
      },
      4: {
        Lielajam: -18,
        '1.mazajam': +6,
        '2.mazajam': +6,
        '3.mazajam': +6,
      },
    },
    'Zaudē ar 30 un mazāk acīm': {
      3: {
        Lielajam: -14,
        '1.mazajam': +7,
        '2.mazajam': +7,
      },
      4: {
        Lielajam: -21,
        '1.mazajam': +7,
        '2.mazajam': +7,
        '3.mazajam': +7,
      },
    },
    'Zaudē neiegūstot nevienu stiķi': {
      3: {
        Lielajam: -16,
        '1.mazajam': +8,
        '2.mazajam': +8,
      },
      4: {
        Lielajam: -24,
        '1.mazajam': +8,
        '2.mazajam': +8,
        '3.mazajam': +8,
      },
    },
  },
  'Mazā zole': {
    'Lielais uzvar': {
      3: {
        Lielajam: +12,
        '1.mazajam': -6,
        '2.mazajam': -6,
      },
      4: {
        Lielajam: +18,
        '1.mazajam': -6,
        '2.mazajam': -6,
        '3.mazajam': -6,
      },
    },
    'Lielais zaudē': {
      3: {
        Lielajam: -14,
        '1.mazajam': +7,
        '2.mazajam': +7,
      },
      4: {
        Lielajam: -21,
        '1.mazajam': +7,
        '2.mazajam': +7,
        '3.mazajam': +7,
      },
    },
  },
  Galdiņš: {
    'Spēlētājs, kurš zaudē': {
      3: {
        Lielajam: -4,
        '1.mazajam': +2,
        '2.mazajam': +2,
      },
      4: {
        Lielajam: -6,
        '1.mazajam': +2,
        '2.mazajam': +2,
        '3.mazajam': +2,
      },
    },
  },
};

export const avatarsArray = [
  { value: '/avatars/avatar_1.jpg' },
  { value: '/avatars/avatar_2.jpg' },
  { value: '/avatars/avatar_3.jpg' },
  { value: '/avatars/avatar_4.jpg' },
];
