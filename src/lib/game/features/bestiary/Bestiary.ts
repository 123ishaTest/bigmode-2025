import { IgtFeature } from '$lib/game/IgtFeature';
import type { IgtFeatures } from '$lib/game/IgtFeatures';
import type { SaveData } from '$lib/game/tools/saving/SaveData';
import { Monster } from '$lib/game/features/bestiary/Monster';
import { type MonsterId } from '$lib/game/features/bestiary/MonsterId';
import type { BestiarySaveData } from '$lib/game/features/bestiary/BestiarySaveData';

export class Bestiary extends IgtFeature {
    monsters: Monster[];
    kills: Partial<Record<MonsterId, number>> = {};

    constructor(monsters: Monster[]) {
        super('bestiary');
        this.monsters = monsters;
    }

    public getKills(id: MonsterId): number {
        return this.kills[id] ?? 0;
    }

    public incrementKill(id: MonsterId): void {
        if (!this.kills[id]) {
            this.kills[id] = 1;
        } else {
            this.kills[id]++;
        }
    }

    initialize(features: IgtFeatures): void {
        features.character.onEnemyDefeated.subscribe((enemy) => {
            this.incrementKill(enemy.monster.id);
        });
    }

    update(): void {
        // Empty
    }

    load(data: BestiarySaveData): void {
        Object.keys(data.kills).map((key: string) => {
            this.kills[key as MonsterId] = data.kills[key as MonsterId];
        });
    }

    save(): SaveData {
        return this.kills;
    }

    getMonster(id: MonsterId): Monster {
        const monster = this.monsters.find((monster) => monster.id === id)!;
        if (!monster) {
            throw new Error(`Unknown monster '${id}'`);
        }
        return monster;
    }
}
