import type { Soundtrack } from '$lib/game/features/soundtracks/Soundtrack';
import { AreaId } from '$lib/game/features/world/AreaId';

export const soundtracks: Soundtrack[] = [
    {
        name: 'Guitar Theme',
        area: AreaId.Home,
        track: '/soundtracks/guitar-theme.mp3',
        fadeInDuration: 5000,
        fadeOutDuration: 2000,
        volume: 0.3,
    },
    {
        name: 'Desert Theme',
        area: AreaId.Desert,
        track: '/soundtracks/desert.mp3',
        fadeInDuration: 6000,
        fadeOutDuration: 4000,
        volume: 1,
    },
];
