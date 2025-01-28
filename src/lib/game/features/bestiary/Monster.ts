import type { MonsterId } from '$lib/game/features/bestiary/MonsterId';
import type { Attack } from '$lib/game/tools/combat/Attack';
import type { Stats } from '$lib/game/tools/combat/Stats';
import { AreaId } from '$lib/game/features/world/AreaId';

export interface Monster {
    id: MonsterId;
    name: string;
    icon: string;
    area: AreaId;
    stats: Stats;
    attacks: Attack[];
}
