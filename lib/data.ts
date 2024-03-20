import { type Song, type Playlist } from './types.d'

export const playlists: Playlist[] = [
  {
    id: 'chill_lofi',
    title: 'Chill Lo-Fi Music',
    color: '#b45309',
    cover: '/music/chill_lofi/cover.webp',
    artists: ['NoSpirit', 'Casiio'],
    genre: 'lowfi'
  },
  {
    id: 'lofi_chill_session',
    title: 'Lo-Fi Chill Session',
    color: '#4f46e5',
    cover: '/music/lofi_chill_session/cover.webp',
    artists: ['Kupla', 'Blue Fox'],
    genre: 'lowfi'
  },
  {
    id: 'study_time',
    title: 'Study Session',
    color: '#db2777',
    cover: '/music/study_time/cover.webp',
    artists: ['Tenno', 'xander', 'Team Astro'],
    genre: 'lowfi'
  },
  {
    id: 'blue_note_study_time',
    title: 'Blue Note Study Time',
    color: '#38bdf8',
    cover: '/music/blue_note_study_time/cover.webp',
    artists: ['Raimu', 'Yasumu'],
    genre: 'lowfi'
  },
  {
    id: 'chau_saura_session',
    title: 'Chau Saura Session',
    color: '#6b21a8',
    cover: '/music/chau_saura_session/cover.webp',
    artists: ['Chau Saura', 'amies', 'kyu'],
    genre: 'lowfi'
  }
]

export const songs: Song[] = [
  // Album 1
  {
    id: 1,
    albumId: 'chill_lofi',
    title: 'Moonlit Walk',
    image: '/music/chill_lofi/cover.webp',
    artists: ['LoFi Dreamer'],
    duration: '3:12'
  },
  {
    id: 2,
    albumId: 'chill_lofi',
    title: 'Coffee Daze',
    image: '/music/chill_lofi/cover.webp',
    artists: ['LoFi Dreamer'],
    duration: '4:07'
  },
  {
    id: 3,
    albumId: 'chill_lofi',
    title: 'Skyline Serenade',
    image: '/music/chill_lofi/cover.webp',
    artists: ['LoFi Dreamer'],
    duration: '3:50'
  },
  {
    id: 4,
    albumId: 'chill_lofi',
    title: 'Urban Echoes',
    image: '/music/chill_lofi/cover.webp',
    artists: ['LoFi Dreamer'],
    duration: '3:30'
  },
  {
    id: 5,
    albumId: 'chill_lofi',
    title: "Night's End",
    image: '/music/chill_lofi/cover.webp',
    artists: ['LoFi Dreamer'],
    duration: '4:20'
  },
  // Album 2
  {
    id: 1,
    albumId: 'lofi_chill_session',
    title: 'Silent Rain',
    image: '/music/lofi_chill_session/cover.webp',
    artists: ['Urban Nocturne'],
    duration: '3:40'
  },
  {
    id: 2,
    albumId: 'lofi_chill_session',
    title: 'Lost Pages',
    image: '/music/lofi_chill_session/cover.webp',
    artists: ['Urban Nocturne'],
    duration: '3:20'
  },
  {
    id: 3,
    albumId: 'lofi_chill_session',
    title: 'Midnight Tales',
    image: '/music/lofi_chill_session/cover.webp',
    artists: ['Urban Nocturne'],
    duration: '3:50'
  },
  {
    id: 4,
    albumId: 'lofi_chill_session',
    title: 'City Lights',
    image: '/music/lofi_chill_session/cover.webp',
    artists: ['Urban Nocturne'],
    duration: '3:30'
  },
  {
    id: 5,
    albumId: 'lofi_chill_session',
    title: 'Night Drive',
    image: '/music/lofi_chill_session/cover.webp',
    artists: ['Urban Nocturne'],
    duration: '4:20'
  },
  // Album 3
  {
    id: 1,
    albumId: 'study_time',
    title: 'Lunar',
    image: '/music/study_time/cover.webp',
    artists: ['Tenno'],
    duration: '3:40'
  },
  {
    id: 2,
    albumId: 'study_time',
    title: 'Go go go!',
    image: '/music/study_time/cover.webp',
    artists: ['Tenno'],
    duration: '3:20'
  },
  {
    id: 3,
    albumId: 'study_time',
    title: 'Keep focus!',
    image: '/music/study_time/cover.webp',
    artists: ['Tenno'],
    duration: '2:40'
  },
  {
    id: 4,
    albumId: 'study_time',
    title: 'JavaScript is the way',
    image: '/music/study_time/cover.webp',
    artists: ['Tenno'],
    duration: '3:10'
  },
  {
    id: 5,
    albumId: 'study_time',
    title: 'No more TypeScript for me',
    image: '/music/study_time/cover.webp',
    artists: ['Tenno'],
    duration: '2:10'
  },
  // Album 4
  {
    id: 1,
    albumId: 'blue_note_study_time',
    title: 'Lunar',
    image: '/music/blue_note_study_time/cover.webp',
    artists: ['Tenno'],
    duration: '3:40'
  },
  {
    id: 2,
    albumId: 'blue_note_study_time',
    title: 'Go go go!',
    image: '/music/blue_note_study_time/cover.webp',
    artists: ['Tenno'],
    duration: '3:20'
  },
  {
    id: 3,
    albumId: 'blue_note_study_time',
    title: 'Keep focus!',
    image: '/music/blue_note_study_time/cover.webp',
    artists: ['Tenno'],
    duration: '2:40'
  },
  {
    id: 4,
    albumId: 'blue_note_study_time',
    title: 'JavaScript is the way',
    image: '/music/blue_note_study_time/cover.webp',
    artists: ['Tenno'],
    duration: '3:10'
  },
  {
    id: 5,
    albumId: 'blue_note_study_time',
    title: 'No more TypeScript for me',
    image: '/music/blue_note_study_time/cover.webp',
    artists: ['Tenno'],
    duration: '2:10'
  },
  // Album 5
  {
    id: 1,
    albumId: 'chau_saura_session',
    title: 'Moonlit Walk',
    image: '/music/chau_saura_session/cover.webp',
    artists: ['LoFi Dreamer'],
    duration: '3:12'
  },
  {
    id: 2,
    albumId: 'chau_saura_session',
    title: 'Coffee Daze',
    image: '/music/chau_saura_session/cover.webp',
    artists: ['LoFi Dreamer'],
    duration: '4:07'
  },
  {
    id: 3,
    albumId: 'chau_saura_session',
    title: 'Skyline Serenade',
    image: '/music/chau_saura_session/cover.webp',
    artists: ['LoFi Dreamer'],
    duration: '3:50'
  },
  {
    id: 4,
    albumId: 'chau_saura_session',
    title: 'Urban Echoes',
    image: '/music/chau_saura_session/cover.webp',
    artists: ['LoFi Dreamer'],
    duration: '3:30'
  },
  {
    id: 5,
    albumId: 'chau_saura_session',
    title: "Night's End",
    image: '/music/chau_saura_session/cover.webp',
    artists: ['LoFi Dreamer'],
    duration: '4:20'
  }
]
