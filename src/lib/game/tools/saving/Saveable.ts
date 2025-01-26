import type { SaveData } from '$lib/game/tools/saving/SaveData';

export interface Saveable {
    saveKey: string;

    save(): SaveData;

    load(data: SaveData): void;
}
