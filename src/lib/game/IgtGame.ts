import type { IgtFeatures } from '$lib/game/IgtFeatures';
import { LocalStorage } from '$lib/game/tools/saving/LocalStorage';
import type { IgtFeature } from '$lib/game/IgtFeature';
import { type ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';
import type { IgtSaveEncoder } from '$lib/game/tools/saving/IgtSaveEncoder';
import { DefaultSaveEncoder } from '$lib/game/tools/saving/DefaultSaveEncoder';

export class IgtGame {
    protected _tickInterval: NodeJS.Timeout | null = null;

    /**
     * Object with registered features. If you want them as a list use this.featureList
     */
    public features: IgtFeatures;

    /**
     * The time between game ticks
     * 0.05 is usually good enough at 20 ticks/s
     */
    protected readonly TICK_DURATION: number = 0.1;

    protected _onTick = new SimpleEventDispatcher<number>();

    /**
     * How often the game should be saved
     */
    protected readonly SAVE_INTERVAL: number = 30;
    protected _nextSave: number;
    protected saveEncoder: IgtSaveEncoder;

    protected gameSpeed: number = 1;
    protected _lastUpdate: number = 0;

    /**
     * Make sure this key is unique to your game.
     * Otherwise, you might run into loading conflicts when multiple games are hosted on the same domain (such as <username.github.io/game)
     */
    protected readonly SAVE_KEY: string = '123ishatest/road-less-travelled';

    public constructor(features: IgtFeatures) {
        this._nextSave = this.SAVE_INTERVAL;
        this.saveEncoder = new DefaultSaveEncoder();

        this.features = features;
    }

    /**
     * For testing purposes:
     * Force updates all features
     * Sends the onTick event
     */
    public fakeTick(delta: number): void {
        for (const feature of this.featureList) {
            feature.update(delta);
        }
        this._onTick.dispatch(delta);
    }

    /**
     * Update all features
     */
    public update(now: number, delta: number): void {
        for (const feature of this.featureList) {
            feature.update(delta);
        }

        this._lastUpdate = now;
        this._nextSave -= delta;
        if (this._nextSave <= 0) {
            this.save();
            this._nextSave = this.SAVE_INTERVAL;
        }
    }

    /**
     * Initialize all features
     */
    public initialize(): void {
        for (const feature of this.featureList) {
            feature.initialize(this.features);
        }
    }

    /**
     * Is called every TICK_DURATION seconds
     * Manages the game loop, calling update() and sends the tick event
     */
    public tick(): void {
        const now = new Date().getTime() / 1000;
        const timeDifference = Math.max(0, now - this._lastUpdate);
        const delta = timeDifference * this.gameSpeed;

        this.update(now, delta);
        this._onTick.dispatch(delta);
    }

    /**
     * Emitted whenever the game ticks
     * @returns the onTick event
     */
    public get onTick(): ISimpleEvent<number> {
        return this._onTick.asEvent();
    }

    /**
     * Start the main update loop by calling tick() every TICK_DURATION seconds
     */
    public startTickInterval(): void {
        if (this._tickInterval) {
            clearInterval(this._tickInterval);
        }
        this._tickInterval = setInterval(() => this.tick(), this.TICK_DURATION * 1000);
    }

    /**
     * Start the main update loop
     */
    public start(): void {
        this._nextSave = this.SAVE_INTERVAL;
        this._lastUpdate = new Date().getTime() / 1000;
        this.startTickInterval();

        console.debug('Game Started');
    }

    /**
     * Recursively save all registered features
     */
    public save(): void {
        const res: Record<string, unknown> = {};
        for (const feature of this.featureList) {
            res[feature.saveKey] = feature.save();
        }
        LocalStorage.store(this.SAVE_KEY, res, this.saveEncoder);
    }

    /**
     * Delete the locally stored save
     */
    public deleteSave(): void {
        LocalStorage.delete(this.SAVE_KEY);
    }

    /**
     * Recursively load all registered features
     */
    public load(): void {
        const saveData = LocalStorage.get(this.SAVE_KEY, this.saveEncoder);
        if (saveData == null) {
            return;
        }
        for (const feature of this.featureList) {
            const featureSaveData: Record<string, unknown> = saveData[feature.saveKey] as Record<string, unknown>;
            if (featureSaveData == null) {
                console.warn('Skipping feature', feature.saveKey);
                continue;
            }
            feature.load(featureSaveData);
        }
    }

    protected get featureList(): IgtFeature[] {
        return Object.values(this.features) as IgtFeature[];
    }
}
