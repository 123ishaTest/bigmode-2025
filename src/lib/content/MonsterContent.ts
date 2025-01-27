import { MonsterTier } from '$lib/game/features/bestiary/MonsterTier';
import type { Stats } from '$lib/game/tools/combat/Stats';
import { type Monster } from '$lib/game/features/bestiary/Monster';
import { Attack } from '$lib/game/tools/combat/Attack';
import { WeaponType } from '$lib/game/tools/combat/WeaponType';
import type { MonsterId } from '$lib/game/features/bestiary/MonsterId';
import { AreaId } from '$lib/game/features/world/AreaId';

const tierStats: Record<MonsterTier, Stats> = {
    [MonsterTier.Critter]: { health: 10, meleeAttack: 1, meleeDefense: 1 },
    [MonsterTier.Passive]: { health: 50, meleeAttack: 5, meleeDefense: 5 },
    [MonsterTier.Neutral]: { health: 100, meleeAttack: 10, meleeDefense: 10 },
    [MonsterTier.Aggressive]: { health: 250, meleeAttack: 25, meleeDefense: 25 },
    [MonsterTier.MiniBoss]: { health: 500, meleeAttack: 50, meleeDefense: 50 },
    [MonsterTier.Boss]: { health: 1000, meleeAttack: 100, meleeDefense: 100 },
};

export const monsters: Monster[] = [
    // Desert
    // Mountains
    // Riverlands
    {
        id: 'chicken',
        name: 'Chicken',
        tier: MonsterTier.Critter,
        area: AreaId.Riverlands,
        attacks: [new Attack('Peck', WeaponType.Melee, 2, 0, 3)],
    },
    {
        id: 'cow',
        name: 'Cow',
        tier: MonsterTier.Passive,
        area: AreaId.Riverlands,
        attacks: [new Attack('Bull Rush', WeaponType.Melee, 3, 10, 15)],
    },
    {
        id: 'goblin',
        name: 'Goblin',
        tier: MonsterTier.Neutral,
        area: AreaId.Riverlands,
        attacks: [new Attack('Quick Attack', WeaponType.Melee, 1.0, 10, 15)],
    },
    {
        id: 'riverSpirit',
        name: 'River Spirit',
        tier: MonsterTier.Aggressive,
        area: AreaId.Riverlands,
        attacks: [new Attack('Splash', WeaponType.Melee, 2.3, 30, 35)],
    },
    {
        id: 'troll',
        name: 'Troll',
        tier: MonsterTier.MiniBoss,
        area: AreaId.Riverlands,
        attacks: [new Attack('Club Swing', WeaponType.Melee, 4, 60, 66)],
    },
    {
        id: 'dragon',
        name: 'Dragon',
        tier: MonsterTier.Boss,
        area: AreaId.Riverlands,
        attacks: [new Attack('Fire Breath', WeaponType.Melee, 2.1, 100, 120)],
    },

    // Forest
].map((m) => {
    return {
        ...m,
        id: m.id as MonsterId,
        stats: tierStats[m.tier],
    };
});
