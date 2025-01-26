import type { CurrencySaveData } from '$lib/game/features/wallet/CurrencySaveData';
import type { SaveData } from '$lib/game/tools/saving/SaveData';

export interface WalletSaveData extends SaveData {
    currencies: CurrencySaveData[];
}
