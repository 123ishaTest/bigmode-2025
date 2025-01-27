import { IgtFeature } from '$lib/game/IgtFeature';
import type { IgtFeatures } from '$lib/game/IgtFeatures';
import type { Power } from '$lib/game/features/powers/Power';
import type { PowerType } from '$lib/game/features/powers/PowerType';
import type { PowerId } from '$lib/game/features/powers/PowerId';
import type { RunStats } from '$lib/game/features/powers/RunStats';
import { hasRequirement } from '$lib/game/tools/requirements/Requirements';
import { EventDispatcher, type IEvent } from 'strongly-typed-events';
import type { PowersSaveData } from '$lib/game/features/powers/PowersSaveData';

export class Powers extends IgtFeature {
    powers: Power[];

    powerLevels: Partial<Record<PowerId, number>> = $state({});

    private _onPowersGained = new EventDispatcher<RunStats, Power[]>();

    public get onPowersGained(): IEvent<RunStats, Power[]> {
        return this._onPowersGained.asEvent();
    }

    constructor(powers: Power[]) {
        super('powers');
        this.powers = powers;
    }

    initialize(features: IgtFeatures): void {
        features.character.onDeath.subscribe((stats: RunStats) => {
            this.endRun(stats);
        });
    }

    public endRun(stats: RunStats): void {
        const increasedPowers: Power[] = [];
        this.powers.forEach((power) => {
            if (hasRequirement(power.requirement, stats)) {
                this.incrementPowerLevel(power.id);
                increasedPowers.push(power);
            }
        });
        this._onPowersGained.dispatch(stats, increasedPowers);
    }

    public getMultiplier(type: PowerType) {
        return this.getPowers(type).reduce((acc, cur) => {
            return acc * this.getPowerMultiplier(cur.id);
        }, 1);
    }

    public getPowers(type: PowerType): Power[] {
        return this.powers.filter((p) => p.type === type);
    }

    public getPowerMultiplier(id: PowerId): number {
        const power = this.getPower(id);
        const level = this.getPowerLevel(id);

        if (level == 0) {
            return 1;
        }
        const incrementCount = Math.min(Math.max(0, level - 1), power.maxCount);
        return 1 + power.baseBonus + power.incrementBonus * incrementCount;
    }

    public getPowerLevel(id: PowerId): number {
        return this.powerLevels[id] ?? 0;
    }

    public incrementPowerLevel(id: PowerId): void {
        if (!this.powerLevels[id]) {
            this.powerLevels[id] = 1;
        } else {
            this.powerLevels[id]++;
        }
    }

    public getPower(id: PowerId): Power {
        const power = this.powers.find((p) => p.id === id);
        if (power == null) {
            throw new Error(`Power with '${id}' not found`);
        }
        return power;
    }

    update(): void {
        // Empty
    }

    load(data: PowersSaveData): void {
        Object.keys(data.powerLevels).map((key: string) => {
            this.powerLevels[key as PowerId] = data.powerLevels[key as PowerId];
        });
    }

    save(): PowersSaveData {
        return {
            powerLevels: this.powerLevels,
        };
    }
}
