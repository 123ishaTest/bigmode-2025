import { type ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';
import { type WalletSaveData } from '$lib/game/features/wallet/WalletSaveData';
import { CurrencyType } from '$lib/game/features/wallet/CurrencyType';
import { Currency } from '$lib/game/features/wallet/Currency';
import { IgtFeature } from '$lib/game/IgtFeature';

export class IgtWallet extends IgtFeature {
    protected _currencies: Record<CurrencyType, number> = {} as Record<CurrencyType, number>;

    protected _onCurrencyGain = new SimpleEventDispatcher<Currency>();

    protected readonly _supportedCurrencies: CurrencyType[];

    constructor(supportedCurrencies: CurrencyType[], saveKey: string = 'wallet') {
        super(saveKey);

        this._supportedCurrencies = supportedCurrencies;

        // Initialize currencies and multipliers
        for (const type of this._supportedCurrencies) {
            this._currencies[type] = 0;
        }
    }

    initialize(): void {
        // Empty
    }

    update(delta: number) {
        this.gainCurrency(new Currency(delta * 3, CurrencyType.Gold));
    }

    public getAmount(type: CurrencyType): number {
        if (!this.supportsCurrencyType(type)) {
            return 0;
        }
        return this._currencies[type];
    }

    /**
     * Gain the specified currency and apply the global multiplier
     */
    public gainCurrency(currency: Currency): void {
        if (!currency.isValid() || !this.supportsCurrencyType(currency.type)) {
            console.warn(`Could not add currency ${currency.toString()}`);
            return;
        }

        this._onCurrencyGain.dispatch(currency);
        this._currencies[currency.type] += currency.amount;
    }

    /**
     * Gain the currency amount from the specified currencies.
     */
    public gainMultipleCurrencies(currencies: Currency[]): void {
        for (const currency of currencies) {
            this.gainCurrency(currency);
        }
    }

    /**
     * Return true if all currencies are valid and the player has the specified amount.
     */
    public hasCurrencies(costs: Currency[]): boolean {
        for (const cost of costs) {
            if (!this.hasCurrency(cost)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Return true if the currency is valid and the player has the specified amount.
     */
    public hasCurrency(currency: Currency): boolean {
        if (!this.supportsCurrencyType(currency.type)) {
            return false;
        }
        return this._currencies[currency.type] >= currency.amount;
    }

    /**
     * Remove the currency amount from the specified currency.
     * IMPORTANT: This method does not care if amounts go negative
     * @param currency
     */
    public loseCurrency(currency: Currency): void {
        if (!currency.isValid() || !this.supportsCurrencyType(currency.type)) {
            console.warn(`Could not lose currency ${currency.toString()}`);
            return;
        }
        this._currencies[currency.type] -= currency.amount;
    }

    /**
     * Remove the currencies amounts from the specified currency.
     * IMPORTANT: This method does not care if amounts go negative
     */
    public loseMultipleCurrencies(currencies: Currency[]): void {
        for (const currency of currencies) {
            this.loseCurrency(currency);
        }
    }

    /**
     * Subtracts the specified currencies and returns true if the wallet has enough.
     * Otherwise return false and don't subtract anything
     */
    public payMultipleIfPossible(currencies: Currency[]): boolean {
        if (this.hasCurrencies(currencies)) {
            this.loseMultipleCurrencies(currencies);
            return true;
        }
        return false;
    }

    /**
     * Subtracts the specified currency and returns true if the wallet has enough.
     * Otherwise return false and don't subtract anything
     * @param currency
     * @constructor
     */
    public payIfPossible(currency: Currency): boolean {
        if (this.hasCurrency(currency)) {
            this.loseCurrency(currency);
            return true;
        }
        return false;
    }

    public supportsCurrencyType(type: CurrencyType): boolean {
        return this._supportedCurrencies.includes(type);
    }

    public canAccess(): boolean {
        return true;
    }

    public save(): WalletSaveData {
        const currencies = [];
        for (const key in this._currencies) {
            currencies.push({
                type: key,
                amount: this._currencies[key],
            });
        }
        return {
            currencies: currencies,
        };
    }

    public load(data: WalletSaveData): void {
        data.currencies?.forEach((currencyData) => {
            this._currencies[currencyData.type] = currencyData.amount ?? this._currencies[currencyData.type];
        });
    }

    /**
     * Emitted whenever a currency is gained
     */
    public get onCurrencyGain(): ISimpleEvent<Currency> {
        return this._onCurrencyGain.asEvent();
    }
}
