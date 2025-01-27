import type { SaveData } from '$lib/game/tools/saving/SaveData';
import type { KeyItemId } from '$lib/game/features/keyitems/KeyItemId';

export interface KeyItemsSaveData extends SaveData {
    unlockedKeyItems: KeyItemId[];
}
