import type { AreaId } from '$lib/game/features/world/AreaId';

export interface Soundtrack {
    name: string;
    // TODO(@Isha): More conditions to check for?
    area: AreaId;

    track: string;
    volume: number;
    fadeInDuration: number;
    fadeOutDuration: number;
}
