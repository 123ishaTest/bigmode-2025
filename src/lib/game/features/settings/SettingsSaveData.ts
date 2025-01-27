import type { SaveData } from '$lib/game/tools/saving/SaveData';

export interface SettingsSaveData extends SaveData {
    isMuted: boolean;
}
