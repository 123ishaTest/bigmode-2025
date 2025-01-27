import type { KeyItemId } from '$lib/game/features/keyitems/KeyItemId';
import type { WorldLocationId } from '$lib/content/WorldLocationId';

export interface KeyItem {
    id: KeyItemId;
    name: string;
    description: string;
    unlockHint: string;
    unlockLocation: WorldLocationId;
    // TODO(@Isha): Add stats here?
    icon: string;
}
