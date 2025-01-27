import type { SaveData } from '$lib/game/tools/saving/SaveData';
import type { PowerId } from '$lib/game/features/powers/PowerId';

export interface PowersSaveData extends SaveData {
    powerLevels: Partial<Record<PowerId, number>>;
}
