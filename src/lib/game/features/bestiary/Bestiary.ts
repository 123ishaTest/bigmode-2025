import { IgtFeature } from '$lib/game/IgtFeature';
import type { IgtFeatures } from '$lib/game/IgtFeatures';
import type { SaveData } from '$lib/game/tools/saving/SaveData';
import { Monster } from '$lib/game/features/bestiary/Monster';
import { MonsterId } from '$lib/game/features/bestiary/MonsterId';
import { Attack } from '$lib/game/tools/combat/Attack';
import { WeaponType } from '$lib/game/tools/combat/WeaponType';

export class Bestiary extends IgtFeature {
    monsters: Monster[] = [
        new Monster(
            MonsterId.Chicken,
            'Chicken',
            'Cluck cluck',
            { health: 10, meleeAttack: 1, meleeDefense: 1 },
            [new Attack('Peck', WeaponType.Melee, 2, 0, 3)],
            1,
        ),
    ];

    // TODO(@Isha): Make dynamic
    kills: Record<MonsterId, number> = {
        [MonsterId.Chicken]: 0,
    };

    constructor() {
        super('bestiary');
    }

    initialize(features: IgtFeatures): void {}

    update(): void {
        // Empty
    }

    load(data: SaveData): void {}

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
