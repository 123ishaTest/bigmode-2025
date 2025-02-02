import { IgtFeature } from '$lib/game/IgtFeature';
import type { IgtFeatures } from '$lib/game/IgtFeatures';
import type { SaveData } from '$lib/game/tools/saving/SaveData';
import type { TravelAction } from '$lib/game/features/character/Character.svelte';
import type { Soundtrack } from '$lib/game/features/soundtracks/Soundtrack';
import { type ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';
import type { WorldLocationId } from '$lib/content/WorldLocationId';

export class Soundtracks extends IgtFeature {
    soundtracks: Soundtrack[];

    currentSoundtrack: string = '';

    constructor(soundtracks: Soundtrack[]) {
        super('soundtracks');
        this.soundtracks = soundtracks;
    }

    private _onPlaySoundtrack = new SimpleEventDispatcher<Soundtrack>();

    public get onPlaySoundtrack(): ISimpleEvent<Soundtrack> {
        return this._onPlaySoundtrack.asEvent();
    }

    initialize(features: IgtFeatures): void {
        features.world.onLocationChanged.subscribe((newLocation: WorldLocationId) => {
            const area = features.world.getAreaForLocation(newLocation);
            const track = this.soundtracks.find((s) => s.area === area);

            if (track) {
                this.playSound(track.name);
            }
        });
    }

    getSoundtrack(name: string): Soundtrack {
        const track = this.soundtracks.find((s) => s.name === name);
        if (!track) {
            throw Error(`Could not find soundtrack with name '${name}'`);
        }
        return track;
    }

    playSound(name: string) {
        if (name === this.currentSoundtrack) {
            return;
        }
        this.currentSoundtrack = name;
        const newTrack = this.getSoundtrack(name);
        this._onPlaySoundtrack.dispatch(newTrack);
    }

    update(): void {
        // Empty
    }

    load(): void {
        // TODO(@Isha): Store found tracks
        // Empty
    }

    save(): SaveData {
        return {};
    }
}
