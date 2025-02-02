import type { SaveData } from '$lib/game/tools/saving/SaveData';

export interface CharacterSaveData extends SaveData {
    runCount: number;
}
