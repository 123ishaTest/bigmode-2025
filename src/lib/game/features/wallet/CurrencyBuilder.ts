import type { CurrencyType } from '$lib/game/features/wallet/CurrencyType';
import { Currency } from '$lib/game/features/wallet/Currency';

export abstract class CurrencyBuilder {
    static createArray(amounts: number[], type: CurrencyType): Currency[] {
        return amounts.map((amount) => new Currency(amount, type));
    }
}
