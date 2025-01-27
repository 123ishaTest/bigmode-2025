import type { SaveData } from '$lib/game/tools/saving/SaveData';
import type { MonsterId } from '$lib/game/features/bestiary/MonsterId';

export interface BestiarySaveData extends SaveData {
    kills: Partial<Record<MonsterId, number>>;
}
