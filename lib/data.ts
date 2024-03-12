import { type Song, type Playlist } from './types.d'

export const playlists: Playlist[] = [
  {
    id: 1,
    title: 'Chill Lo-Fi Music',
    color: '#b45309',
    cover:
      'https://vinyl.lofirecords.com/cdn/shop/products/VINYL_MORNING_COFFEE_4-min.png?v=1680526353',
    artists: ['NoSpirit', 'Casiio']
  },
  {
    id: 2,
    title: 'Lo-Fi Chill Session',
    color: '#4f46e5',
    cover:
      'https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187',
    artists: ['Kupla', 'Blue Fox']
  },
  {
    id: 3,
    title: 'Study Session',
    color: '#db2777',
    cover: 'https://f4.bcbits.com/img/a1435058381_65.jpg',
    artists: ['Tenno', 'xander', 'Team Astro']
  },
  {
    id: 4,
    title: 'Blue Note Study Time',
    color: '#38bdf8',
    cover: 'https://f4.bcbits.com/img/a1962013209_16.jpg',
    artists: ['Raimu', 'Yasumu']
  },
  {
    id: 5,
    title: 'Chau Saura Session',
    color: '#6b21a8',
    cover: 'https://f4.bcbits.com/img/a2793859494_16.jpg',
    artists: ['Chau Saura', 'amies', 'kyu']
  },
  {
    id: 6,
    title: 'Like a Necessity',
    color: '#eab308',
    cover: 'https://f4.bcbits.com/img/a0363730459_16.jpg',
    artists: ['WFS', 'Nadav Cohen']
  }
]

export const songs: Song[] = [
  {
    id: 1,
    albumId: 1,
    title: 'Moonlit Walk',
    image:
      'https://vinyl.lofirecords.com/cdn/shop/products/VINYL_MORNING_COFFEE_4-min.png?v=1680526353',
    artists: ['LoFi Dreamer'],
    album: 'Chill Lo-Fi Music',
    duration: '3:12'
  },
  {
    id: 2,
    albumId: 1,
    title: 'Coffee Daze',
    image:
      'https://vinyl.lofirecords.com/cdn/shop/products/VINYL_MORNING_COFFEE_4-min.png?v=1680526353',
    artists: ['LoFi Dreamer'],
    album: 'Chill Lo-Fi Music',
    duration: '4:07'
  },
  {
    id: 3,
    albumId: 1,
    title: 'Skyline Serenade',
    image:
      'https://vinyl.lofirecords.com/cdn/shop/products/VINYL_MORNING_COFFEE_4-min.png?v=1680526353',
    artists: ['LoFi Dreamer'],
    album: 'Chill Lo-Fi Music',
    duration: '3:50'
  },
  {
    id: 4,
    albumId: 1,
    title: 'Urban Echoes',
    image:
      'https://vinyl.lofirecords.com/cdn/shop/products/VINYL_MORNING_COFFEE_4-min.png?v=1680526353',
    artists: ['LoFi Dreamer'],
    album: 'Chill Lo-Fi Music',
    duration: '3:30'
  },
  {
    id: 5,
    albumId: 1,
    title: "Night's End",
    image:
      'https://vinyl.lofirecords.com/cdn/shop/products/VINYL_MORNING_COFFEE_4-min.png?v=1680526353',
    artists: ['LoFi Dreamer'],
    album: 'Chill Lo-Fi Music',
    duration: '4:20'
  },
  {
    id: 1,
    albumId: 2,
    title: 'Silent Rain',
    image:
      'https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187',
    artists: ['Urban Nocturne'],
    album: 'Midnight Tales',
    duration: '3:40'
  },
  {
    id: 2,
    albumId: 2,
    title: 'Lost Pages',
    image:
      'https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187',
    artists: ['Urban Nocturne'],
    album: 'Midnight Tales',
    duration: '3:20'
  },
  {
    id: 3,
    albumId: 2,
    title: 'Midnight Tales',
    image:
      'https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187',
    artists: ['Urban Nocturne'],
    album: 'Midnight Tales',
    duration: '3:50'
  },
  {
    id: 4,
    albumId: 2,
    title: 'City Lights',
    image:
      'https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187',
    artists: ['Urban Nocturne'],
    album: 'Midnight Tales',
    duration: '3:30'
  },
  {
    id: 5,
    albumId: 2,
    title: 'Night Drive',
    image:
      'https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187',
    artists: ['Urban Nocturne'],
    album: 'Midnight Tales',
    duration: '4:20'
  },
  {
    id: 1,
    albumId: 3,
    title: 'Lunar',
    image: 'https://f4.bcbits.com/img/a1435058381_65.jpg',
    artists: ['Tenno'],
    album: 'Study Session',
    duration: '3:40'
  },
  {
    id: 2,
    albumId: 3,
    title: 'Go go go!',
    image: 'https://f4.bcbits.com/img/a1435058381_65.jpg',
    artists: ['Tenno'],
    album: 'Study Session',
    duration: '3:20'
  },
  {
    id: 3,
    albumId: 3,
    title: 'Keep focus!',
    image: 'https://f4.bcbits.com/img/a1435058381_65.jpg',
    artists: ['Tenno'],
    album: 'Study Session',
    duration: '2:40'
  },
  {
    id: 4,
    albumId: 3,
    title: 'JavaScript is the way',
    image: 'https://f4.bcbits.com/img/a1435058381_65.jpg',
    artists: ['Tenno'],
    album: 'Study Session',
    duration: '3:10'
  },
  {
    id: 5,
    albumId: 3,
    title: 'No more TypeScript for me',
    image: 'https://f4.bcbits.com/img/a1435058381_65.jpg',
    artists: ['Tenno'],
    album: 'Study Session',
    duration: '2:10'
  },
  {
    id: 1,
    albumId: 4,
    title: 'Lunar',
    image: 'https://f4.bcbits.com/img/a1962013209_16.jpg',
    artists: ['Tenno'],
    album: 'Study Session',
    duration: '3:40'
  },
  {
    id: 2,
    albumId: 4,
    title: 'Go go go!',
    image: 'https://f4.bcbits.com/img/a1962013209_16.jpg',
    artists: ['Tenno'],
    album: 'Study Session',
    duration: '3:20'
  },
  {
    id: 3,
    albumId: 4,
    title: 'Keep focus!',
    image: 'https://f4.bcbits.com/img/a1962013209_16.jpg',
    artists: ['Tenno'],
    album: 'Study Session',
    duration: '2:40'
  },
  {
    id: 4,
    albumId: 4,
    title: 'JavaScript is the way',
    image: 'https://f4.bcbits.com/img/a1962013209_16.jpg',
    artists: ['Tenno'],
    album: 'Study Session',
    duration: '3:10'
  },
  {
    id: 5,
    albumId: 4,
    title: 'No more TypeScript for me',
    image: 'https://f4.bcbits.com/img/a1962013209_16.jpg',
    artists: ['Tenno'],
    album: 'Study Session',
    duration: '2:10'
  },
  {
    id: 1,
    albumId: 5,
    title: 'Moonlit Walk',
    image: 'https://f4.bcbits.com/img/a2793859494_16.jpg',
    artists: ['LoFi Dreamer'],
    album: 'Chill Lo-Fi Music',
    duration: '3:12'
  },
  {
    id: 2,
    albumId: 5,
    title: 'Coffee Daze',
    image: 'https://f4.bcbits.com/img/a2793859494_16.jpg',
    artists: ['LoFi Dreamer'],
    album: 'Chill Lo-Fi Music',
    duration: '4:07'
  },
  {
    id: 3,
    albumId: 5,
    title: 'Skyline Serenade',
    image: 'https://f4.bcbits.com/img/a2793859494_16.jpg',
    artists: ['LoFi Dreamer'],
    album: 'Chill Lo-Fi Music',
    duration: '3:50'
  },
  {
    id: 4,
    albumId: 5,
    title: 'Urban Echoes',
    image: 'https://f4.bcbits.com/img/a2793859494_16.jpg',
    artists: ['LoFi Dreamer'],
    album: 'Chill Lo-Fi Music',
    duration: '3:30'
  },
  {
    id: 5,
    albumId: 5,
    title: "Night's End",
    image: 'https://f4.bcbits.com/img/a2793859494_16.jpg',
    artists: ['LoFi Dreamer'],
    album: 'Chill Lo-Fi Music',
    duration: '4:20'
  }
]
