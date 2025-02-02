import { IgtFeature } from '$lib/game/IgtFeature';
import type { SettingsSaveData } from '$lib/game/features/settings/SettingsSaveData';
import { type ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';

export class Settings extends IgtFeature {
    isMuted: boolean = $state(false);

    private _onIsMutedChanged = new SimpleEventDispatcher<boolean>();

    public get onIsMutedChanged(): ISimpleEvent<boolean> {
        return this._onIsMutedChanged.asEvent();
    }

    public toggleMute(): void {
        this.isMuted = !this.isMuted;
        this._onIsMutedChanged.dispatch(this.isMuted);
    }

    constructor() {
        super('settings');
    }

    initialize(): void {}

    update(): void {
        // Empty
    }

    load(data: SettingsSaveData): void {
        this.isMuted = data.isMuted ?? false;
    }

    save(): SettingsSaveData {
        return {
            isMuted: this.isMuted,
        };
    }
}
