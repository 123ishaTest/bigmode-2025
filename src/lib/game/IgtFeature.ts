import type { Saveable } from '$lib/game/tools/saving/Saveable';
import type { IgtFeatures } from '$lib/game/IgtFeatures';
import type { SaveData } from '$lib/game/tools/saving/SaveData';

/**
 * An abstract class that all features should extend from.
 */
export abstract class IgtFeature implements Saveable {
    /**
     * Initialize all feature attributes.
     * Note that you should not assume other features exist already here
     * @param saveKey
     */
    protected constructor(saveKey: string) {
        this.saveKey = saveKey;
    }

    /**
     * Called after all features are created.
     * This is where your main configuration takes place.
     */
    abstract initialize(features: IgtFeatures): void;

    /**
     * Gets called every Game.TICK_DURATION
     * @param delta time since last update
     */
    abstract update(delta: number): void;

    // Saving logic
    saveKey: string;

    abstract load(data: SaveData): void;

    abstract save(): SaveData;
}
