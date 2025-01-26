import { CurrencyType } from '$lib/game/features/wallet/CurrencyType';
import type { SaveData } from '$lib/game/tools/saving/SaveData';

export interface CurrencySaveData extends SaveData {
    type: CurrencyType;
    amount: number;
}
