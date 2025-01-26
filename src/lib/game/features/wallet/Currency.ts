import type { CurrencyType } from '$lib/game/features/wallet/CurrencyType';

/**
 * A class to store currency amounts
 */
export class Currency {
    amount: number;
    type: CurrencyType;

    constructor(amount: number, type: CurrencyType) {
        this.amount = amount;
        this.type = type;
    }

    /**
     * Whether this currency is valid. Your game can have different rules
     */
    public isValid(): boolean {
        if (isNaN(this.amount)) {
            return false;
        }
        return this.amount > 0;
    }

    public toString(): string {
        return `Currency(${this.amount}, ${this.type})`;
    }
}
