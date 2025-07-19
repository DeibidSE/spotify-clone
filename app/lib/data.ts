import type { Song, Playlist } from './types.d'

export const playlists: Playlist[] = [
	{ id: 'link_in_park', title: 'Link In Park', color: '#fe9ca7', cover: '/music/link_in_park/cover.webp', genre: 'Nu-Metal', type: 'artist', isAlbum: false, saved: true },
	{ id: 'rock_hits', title: 'Rock Hits', color: '#9D1B1D', cover: '/music/rock_hits/cover.webp', genre: 'Rock', type: 'music', isAlbum: true, saved: true },
	{ id: 'trance', title: 'Trance', color: '#1F740A', cover: '/music/trance/cover.webp', genre: 'Electronic', type: 'music', isAlbum: true, saved: false },
	{ id: 'trap_vibes', title: 'Trap Vibes', color: '#0B0201', cover: '/music/trap_vibes/cover.webp', genre: 'Electronic', type: 'music', isAlbum: true, saved: false },
	{ id: 'electronic_dance', title: 'Electronic Dance', color: '#4F021D', cover: '/music/electronic_dance/cover.webp', genre: 'Electronic', type: 'music', isAlbum: true, saved: true },
	{ id: 'late_night_vibes', title: 'Late Night Vibes', color: '#91FE06', cover: '/music/late_night_vibes/cover.webp', genre: 'Chill', type: 'music', isAlbum: true, saved: false },
	{ id: 'summer_party', title: 'Summer Party', color: '#4DB8F4', cover: '/music/summer_party/cover.webp', genre: 'Pop', type: 'music', isAlbum: true, saved: true },
	{ id: 'epic_journeys', title: 'Epic Journeys', color: '#5A8785', cover: '/music/epic_journeys/cover.webp', genre: 'Rock', type: 'music', isAlbum: true, saved: false },
	{ id: 'the_knowledge_hub', title: 'The Knowledge Hub', color: '#F5F5F3', cover: '/music/the_knowledge_hub/cover.webp', genre: 'Podcast', type: 'podcast', isAlbum: true, saved: false },
	{ id: 'funky_grooves', title: 'Funky Grooves', color: '#E0C7AE', cover: '/music/funky_grooves/cover.webp', genre: 'Funk', type: 'music', isAlbum: true, saved: false },
]

export const songs: Song[] = [
	// Link In Park
	{ id: 1, albumId: 'link_in_park', title: 'In the Bed', image: '/music/link_in_park/cover.webp', artists: ['Linkin Park'], duration: '3:37', type: 'music' },
	{ id: 2, albumId: 'link_in_park', title: 'Thumb', image: '/music/link_in_park/cover.webp', artists: ['Linkin Park'], duration: '3:08', type: 'music' },
	{ id: 3, albumId: 'link_in_park', title: 'The Impotence Machine', image: '/music/link_in_park/cover.webp', artists: ['Linkin Park'], duration: '3:10', type: 'music' },
	{ id: 4, albumId: 'link_in_park', title: 'Paint', image: '/music/link_in_park/cover.webp', artists: ['Linkin Park'], duration: '2:42', type: 'music' },
	{ id: 5, albumId: 'link_in_park', title: 'From the Outside', image: '/music/link_in_park/cover.webp', artists: ['Linkin Park'], duration: '2:56', type: 'music' },
	{ id: 6, albumId: 'link_in_park', title: 'Crawling Back to Bed', image: '/music/link_in_park/cover.webp', artists: ['Linkin Park'], duration: '3:28', type: 'music' },
	{ id: 7, albumId: 'link_in_park', title: 'Nobody Can Pay Me', image: '/music/link_in_park/cover.webp', artists: ['Linkin Park'], duration: '3:46', type: 'music' },

	// Rock Hits
	{ id: 8, albumId: 'rock_hits', title: 'Bohemian Rhapsody', image: '/music/rock_hits/cover.webp', artists: ['Queen'], duration: '5:55', type: 'music' },
	{ id: 9, albumId: 'rock_hits', title: 'Stairway to Heaven', image: '/music/rock_hits/cover.webp', artists: ['Led Zeppelin'], duration: '8:02', type: 'music' },
	{ id: 10, albumId: 'rock_hits', title: 'Livin\' on a Prayer', image: '/music/rock_hits/cover.webp', artists: ['Bon Jovi'], duration: '4:09', type: 'music' },
	{ id: 11, albumId: 'rock_hits', title: 'Sweet Child O\' Mine', image: '/music/rock_hits/cover.webp', artists: ['Guns N\' Roses'], duration: '5:56', type: 'music' },
	{ id: 12, albumId: 'rock_hits', title: 'Paint It Black', image: '/music/rock_hits/cover.webp', artists: ['The Rolling Stones'], duration: '3:45', type: 'music' },
	{ id: 13, albumId: 'rock_hits', title: 'Smoke on the Water', image: '/music/rock_hits/cover.webp', artists: ['Deep Purple'], duration: '5:40', type: 'music' },

	// Summer Party
	{ id: 14, albumId: 'summer_party', title: 'Shape of You', image: '/music/summer_party/cover.webp', artists: ['Ed Sheeran'], duration: '3:53', type: 'music' },
	{ id: 15, albumId: 'summer_party', title: 'Uptown Funk', image: '/music/summer_party/cover.webp', artists: ['Mark Ronson', 'Bruno Mars'], duration: '4:30', type: 'music' },
	{ id: 16, albumId: 'summer_party', title: 'Sicko Mode', image: '/music/summer_party/cover.webp', artists: ['Travis Scott'], duration: '5:13', type: 'music' },
	{ id: 17, albumId: 'summer_party', title: 'Blinding Lights', image: '/music/summer_party/cover.webp', artists: ['The Weeknd'], duration: '3:22', type: 'music' },
	{ id: 18, albumId: 'summer_party', title: 'Rockstar', image: '/music/summer_party/cover.webp', artists: ['Post Malone', '21 Savage'], duration: '3:38', type: 'music' },
	{ id: 19, albumId: 'summer_party', title: 'Don\'t Start Now', image: '/music/summer_party/cover.webp', artists: ['Dua Lipa'], duration: '3:03', type: 'music' },

	// Late Night Vibes
	{ id: 20, albumId: 'late_night_vibes', title: 'Blinding Lights', image: '/music/late_night_vibes/cover.webp', artists: ['The Weeknd'], duration: '3:22', type: 'music' },
	{ id: 21, albumId: 'late_night_vibes', title: 'Sunflower', image: '/music/late_night_vibes/cover.webp', artists: ['Post Malone', 'Swae Lee'], duration: '2:38', type: 'music' },
	{ id: 22, albumId: 'late_night_vibes', title: 'Peaches', image: '/music/late_night_vibes/cover.webp', artists: ['Justin Bieber', 'Daniel Caesar', 'Giveon'], duration: '3:18', type: 'music' },
	{ id: 23, albumId: 'late_night_vibes', title: 'Adore You', image: '/music/late_night_vibes/cover.webp', artists: ['Harry Styles'], duration: '3:27', type: 'music' },

	// First Podcast
	{ id: 24, albumId: 'the_knowledge_hub', title: 'The Future of Artificial Intelligence', image: '/music/the_knowledge_hub/cover.webp', artists: ['Sofía Martínez', 'Carlos Gómez'], duration: '3:37', type: 'podcast' },
	{ id: 25, albumId: 'the_knowledge_hub', title: 'Demystifying Climate Change', image: '/music/the_knowledge_hub/cover.webp', artists: ['Laura Pérez'], duration: '3:14', type: 'podcast' },
	{ id: 26, albumId: 'the_knowledge_hub', title: 'The Secrets of Digital Marketing', image: '/music/the_knowledge_hub/cover.webp', artists: ['Juan Pérez', 'Ana Ruiz'], duration: '4:30', type: 'podcast' },
	{ id: 27, albumId: 'the_knowledge_hub', title: 'Exploring Space and Time', image: '/music/the_knowledge_hub/cover.webp', artists: ['Ricardo Gómez'], duration: '3:53', type: 'podcast' },
	{ id: 28, albumId: 'the_knowledge_hub', title: 'How Music Impacts Our Emotions', image: '/music/the_knowledge_hub/cover.webp', artists: ['Patricia López'], duration: '2:43', type: 'podcast' },
	{ id: 29, albumId: 'the_knowledge_hub', title: 'The Power of Human Resilience', image: '/music/the_knowledge_hub/cover.webp', artists: ['Marcos Díaz'], duration: '3:20', type: 'podcast' },
	{ id: 30, albumId: 'the_knowledge_hub', title: 'Stories that Define the World', image: '/music/the_knowledge_hub/cover.webp', artists: ['Valeria Mendoza', 'Eduardo Jiménez', 'Isabel Rodríguez'], duration: '3:18', type: 'podcast' },

	// Trap Vibes
	{ id: 31, albumId: 'trap_vibes', title: 'Sicko Mode', image: '/music/trap_vibes/cover.webp', artists: ['Travis Scott'], duration: '5:13', type: 'music' },
	{ id: 32, albumId: 'trap_vibes', title: 'Goosebumps', image: '/music/trap_vibes/cover.webp', artists: ['Travis Scott'], duration: '3:00', type: 'music' },
	{ id: 33, albumId: 'trap_vibes', title: 'Money Longer', image: '/music/trap_vibes/cover.webp', artists: ['Lil Uzi Vert'], duration: '2:45', type: 'music' },
	{ id: 34, albumId: 'trap_vibes', title: 'Bad and Boujee', image: '/music/trap_vibes/cover.webp', artists: ['Migos'], duration: '5:34', type: 'music' },
	{ id: 35, albumId: 'trap_vibes', title: 'XO Tour Llif3', image: '/music/trap_vibes/cover.webp', artists: ['Lil Uzi Vert'], duration: '3:00', type: 'music' },
	{ id: 36, albumId: 'trap_vibes', title: 'Panda', image: '/music/trap_vibes/cover.webp', artists: ['Desiigner'], duration: '3:25', type: 'music' },
	{ id: 37, albumId: 'trap_vibes', title: 'rockstar', image: '/music/trap_vibes/cover.webp', artists: ['Post Malone', '21 Savage'], duration: '3:38', type: 'music' },

	// Trance
	{ id: 38, albumId: 'trance', title: 'Euphoria', image: '/music/trance/cover.webp', artists: ['Armin Van Buuren'], duration: '4:05', type: 'music' },
	{ id: 39, albumId: 'trance', title: 'Adagio for Strings', image: '/music/trance/cover.webp', artists: ['Tiesto'], duration: '6:12', type: 'music' },
	{ id: 40, albumId: 'trance', title: 'Starlight', image: '/music/trance/cover.webp', artists: ['Armin Van Buuren'], duration: '4:30', type: 'music' },
	{ id: 41, albumId: 'trance', title: 'Zero 76', image: '/music/trance/cover.webp', artists: ['Hardwell'], duration: '4:00', type: 'music' },

	// Electronic Dance
	{ id: 42, albumId: 'electronic_dance', title: 'Wake Me Up', image: '/music/electronic_dance/cover.webp', artists: ['Avicii'], duration: '4:07', type: 'music' },
	{ id: 43, albumId: 'electronic_dance', title: 'Summer', image: '/music/electronic_dance/cover.webp', artists: ['Calvin Harris'], duration: '3:44', type: 'music' },
	{ id: 44, albumId: 'electronic_dance', title: 'Titanium', image: '/music/electronic_dance/cover.webp', artists: ['David Guetta', 'Sia'], duration: '4:05', type: 'music' },
	{ id: 45, albumId: 'electronic_dance', title: 'Scared to Be Lonely', image: '/music/electronic_dance/cover.webp', artists: ['Martin Garrix', 'Dua Lipa'], duration: '3:40', type: 'music' },
	{ id: 46, albumId: 'electronic_dance', title: 'Levels', image: '/music/electronic_dance/cover.webp', artists: ['Avicii'], duration: '5:39', type: 'music' },
	{ id: 47, albumId: 'electronic_dance', title: 'Happier', image: '/music/electronic_dance/cover.webp', artists: ['Marshmello', 'Bastille'], duration: '3:34', type: 'music' },
	{ id: 48, albumId: 'electronic_dance', title: 'Animals', image: '/music/electronic_dance/cover.webp', artists: ['Martin Garrix'], duration: '5:00', type: 'music' },
	{ id: 49, albumId: 'electronic_dance', title: 'On My Way', image: '/music/electronic_dance/cover.webp', artists: ['Alok', 'Bebe Rexha'], duration: '3:03', type: 'music' },

	// Epic Journeys
	{ id: 50, albumId: 'epic_journeys', title: 'Time', image: '/music/epic_journeys/cover.webp', artists: ['Hans Zimmer'], duration: '4:35', type: 'music' },
	{ id: 51, albumId: 'epic_journeys', title: 'Arrival of the Birds', image: '/music/epic_journeys/cover.webp', artists: ['The Cinematic Orchestra'], duration: '5:15', type: 'music' },
	{ id: 52, albumId: 'epic_journeys', title: 'Now We Are Free', image: '/music/epic_journeys/cover.webp', artists: ['Hans Zimmer', 'Lisa Gerrard'], duration: '4:09', type: 'music' },
	{ id: 53, albumId: 'epic_journeys', title: 'Viva La Vida', image: '/music/epic_journeys/cover.webp', artists: ['Coldplay'], duration: '4:02', type: 'music' },
	{ id: 54, albumId: 'epic_journeys', title: 'Fix You', image: '/music/epic_journeys/cover.webp', artists: ['Coldplay'], duration: '4:55', type: 'music' },

	// Funky Grooves
	{ id: 55, albumId: 'funky_grooves', title: 'Get Lucky', image: '/music/funky_grooves/cover.webp', artists: ['Daft Punk', 'Pharrell Williams'], duration: '4:08', type: 'music' },
	{ id: 56, albumId: 'funky_grooves', title: 'Uptown Funk', image: '/music/funky_grooves/cover.webp', artists: ['Mark Ronson', 'Bruno Mars'], duration: '4:30', type: 'music' },
	{ id: 57, albumId: 'funky_grooves', title: 'Happy', image: '/music/funky_grooves/cover.webp', artists: ['Pharrell Williams'], duration: '3:53', type: 'music' },
	{ id: 58, albumId: 'funky_grooves', title: 'Superstition', image: '/music/funky_grooves/cover.webp', artists: ['Stevie Wonder'], duration: '4:26', type: 'music' },
	{ id: 59, albumId: 'funky_grooves', title: 'Treasure', image: '/music/funky_grooves/cover.webp', artists: ['Bruno Mars'], duration: '3:00', type: 'music' },
]
