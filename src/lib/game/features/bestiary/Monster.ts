import type { Stats } from '$lib/game/tools/combat/Stats';
import type { MonsterId } from '$lib/game/features/bestiary/MonsterId';
import type { Attack } from '$lib/game/tools/combat/Attack';

export class Monster {
    id: MonsterId;
    name: string;
    description: string;
    stats: Stats;
    attacks: Attack[];

    constructor(id: MonsterId, name: string, description: string, stats: Stats, attacks: Attack[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.stats = stats;
        this.attacks = attacks;
    }
}
