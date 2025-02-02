import type { Soundtrack } from '$lib/game/features/soundtracks/Soundtrack';
import { AreaId } from '$lib/game/features/world/AreaId';

export const soundtracks: Soundtrack[] = [
    {
        name: 'Home',
        area: AreaId.Home,
        track: '/soundtracks/home.mp3',
        fadeInDuration: 5000,
        fadeOutDuration: 2000,
        volume: 1,
    },
    {
        name: 'Riverlands',
        area: AreaId.Riverlands,
        track: '/soundtracks/riverlands.mp3',
        fadeInDuration: 6000,
        fadeOutDuration: 4000,
        volume: 1,
    },
    {
        name: 'Mountains',
        area: AreaId.Mountains,
        track: '/soundtracks/mountains.mp3',
        fadeInDuration: 6000,
        fadeOutDuration: 4000,
        volume: 1,
    },
    {
        name: 'Forest',
        area: AreaId.Forest,
        track: '/soundtracks/forest.mp3',
        fadeInDuration: 6000,
        fadeOutDuration: 4000,
        volume: 1,
    },
];
