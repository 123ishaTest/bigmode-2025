import { IgtFeature } from '$lib/game/IgtFeature';
import type { KeyItemId } from '$lib/game/features/keyitems/KeyItemId';
import type { KeyItem } from '$lib/game/features/keyitems/KeyItem';
import { SimpleEventDispatcher, type ISimpleEvent } from 'strongly-typed-events';
import type { KeyItemsSaveData } from '$lib/game/features/keyitems/KeyItemsSaveData';
import type { IgtFeatures } from '$lib/game/IgtFeatures';
import { keyItems } from '$lib/content/KeyItemContent';

export class KeyItems extends IgtFeature {
    keyItems: KeyItem[];
    unlockedKeyItems: KeyItemId[] = $state([]);

    protected _onKeyItemGain = new SimpleEventDispatcher<KeyItem>();

    public get onKeyItemGain(): ISimpleEvent<KeyItem> {
        return this._onKeyItemGain.asEvent();
    }

    constructor(keyItems: KeyItem[]) {
        super('key-items');
        this.keyItems = keyItems;
    }

    public getKeyItem(id: KeyItemId): KeyItem {
        const keyItem = this.keyItems.find((k) => k.id === id);
        if (!keyItem) {
            throw Error(`Could not find keyItem with id '${id}'`);
        }
        return keyItem;
    }

    hasKeyItem(id: KeyItemId): boolean {
        return this.unlockedKeyItems.includes(id);
    }

    gainKeyItem(id: KeyItemId): void {
        if (this.hasKeyItem(id)) {
            return;
        }
        const item = this.getKeyItem(id);
        console.log('gained keyitem', item);
        this.unlockedKeyItems.push(id);
        this._onKeyItemGain.dispatch(item);
    }

    initialize(features: IgtFeatures): void {
        features.world.onLocationChanged.subscribe((location) => {
            // Gain the keyitem that unlocks at this location
            const keyItem = this.keyItems.find((k) => k.unlockLocation === location);
            if (keyItem) {
                this.gainKeyItem(keyItem.id);
            }
        });
    }

    update(): void {
        // Empty
    }

    load(data: KeyItemsSaveData): void {
        data.unlockedKeyItems.forEach((id) => {
            this.unlockedKeyItems.push(id);
        });
    }

    save(): KeyItemsSaveData {
        return {
            unlockedKeyItems: this.unlockedKeyItems,
        };
    }
}
