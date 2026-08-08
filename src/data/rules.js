export const rulesGroups = [
  {
    id: 'eligibility',
    title: 'Eligibility',
    icon: 'UserCheck',
    rules: [
      'Students only',
      'ID card mandatory',
      'Registration before deadline',
      'Multiple events allowed if schedules do not clash',
      'Maximum: 3 individual + 2 group events',
    ],
  },
  {
    id: 'reporting',
    title: 'Reporting Time',
    icon: 'Clock',
    rules: [
      'Report 15–30 minutes before the event',
      'Late reporting may lead to disqualification',
    ],
  },
  {
    id: 'conduct',
    title: 'Code of Conduct',
    icon: 'Shield',
    rules: [
      'Discipline and sportsmanship required',
      'Respect judges, coordinators, and volunteers',
      'Misconduct, cheating, or violence causes immediate disqualification',
    ],
  },
  {
    id: 'organizer',
    title: 'Organizer Rights',
    icon: 'Settings',
    rules: [
      'Rules, timings, venues, or formats may be modified if necessary',
      'Events may be cancelled due to insufficient participation or unforeseen circumstances',
    ],
  },
];

export const pointsSystem = {
  individual: [
    { position: '1st', points: 10 },
    { position: '2nd', points: 7 },
    { position: '3rd', points: 5 },
  ],
  pair: [
    { position: '1st', points: 15 },
    { position: '2nd', points: 10 },
    { position: '3rd', points: 7 },
  ],
  group: [
    { position: '1st', points: 20 },
    { position: '2nd', points: 15 },
  ],
  note: 'Group events do not have a third prize category.',
};