export enum Team {
  KOREA = 'KOREA',
  YONSEI = 'YONSEI',
  KAIST = 'KAIST',
  SEOUL = 'SEOUL',
}

export const TEAM_INFO: Record<Team, { name: string; image: string; character: string }> = {
  [Team.SEOUL]: {
    name: '서울대',
    image: '/images/seoul.png',
    character: '/images/character-seoul.png',
  },
  [Team.YONSEI]: {
    name: '연세대',
    image: '/images/yonsei.svg',
    character: '/images/character-yonsei.png',
  },
  [Team.KOREA]: {
    name: '고려대',
    image: '/images/korea.png',
    character: '/images/character-korea.gif',
  },
  [Team.KAIST]: {
    name: '카이스트',
    image: '/images/kaist.png',
    character: '/images/character-kaist.png',
  },
};
