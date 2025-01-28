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
    {
        id: 'mosquito',
        name: 'Mosquito',
        icon: '/monsters/mosquito.png',
        tier: MonsterTier.Critter,
        area: AreaId.Desert,
        attacks: [new Attack('Bite', WeaponType.Melee, 2, 0, 3)],
    },
    {
        id: 'camel',
        name: 'Camel',
        icon: '/monsters/camel.png',
        tier: MonsterTier.Passive,
        area: AreaId.Desert,
        attacks: [new Attack('Stomp', WeaponType.Melee, 3, 10, 15)],
    },
    {
        id: 'snake',
        name: 'Snake',
        icon: '/monsters/snake.png',
        tier: MonsterTier.Neutral,
        area: AreaId.Desert,
        attacks: [new Attack('Snare', WeaponType.Melee, 1.0, 10, 15)],
    },
    {
        id: 'crocodile',
        name: 'Crocodile',
        icon: '/monsters/crocodile.png',
        tier: MonsterTier.Aggressive,
        area: AreaId.Desert,
        attacks: [new Attack('Chomp', WeaponType.Melee, 2.3, 30, 35)],
    },
    {
        id: 'scorpion',
        name: 'Scorpion',
        icon: '/monsters/scorpion.png',
        tier: MonsterTier.MiniBoss,
        area: AreaId.Desert,
        attacks: [new Attack('Sting', WeaponType.Melee, 4, 60, 66)],
    },
    {
        id: 'mummy',
        name: 'Mummy',
        icon: '/monsters/mummy.png',
        tier: MonsterTier.Boss,
        area: AreaId.Desert,
        attacks: [new Attack('Fire Breath', WeaponType.Melee, 2.1, 100, 120)],
    },
    // Mountains
    {
        id: 'bat',
        name: 'Bat',
        icon: '/monsters/bat.png',
        tier: MonsterTier.Critter,
        area: AreaId.Mountains,
        attacks: [new Attack('Sonic', WeaponType.Melee, 2, 0, 3)],
    },
    {
        id: 'goat',
        name: 'Goat',
        icon: '/monsters/goat.png',
        tier: MonsterTier.Passive,
        area: AreaId.Mountains,
        attacks: [new Attack('Horn Ram', WeaponType.Melee, 3, 10, 15)],
    },
    {
        id: 'rockCrab',
        name: 'Rock Crab',
        icon: '/monsters/rock-crab.png',
        tier: MonsterTier.Neutral,
        area: AreaId.Mountains,
        attacks: [new Attack('Pinch', WeaponType.Melee, 1.0, 10, 15)],
    },
    {
        id: 'wolf',
        name: 'Wolf',
        icon: '/monsters/wolf.png',
        tier: MonsterTier.Aggressive,
        area: AreaId.Mountains,
        attacks: [new Attack('Howl', WeaponType.Melee, 2.3, 30, 35)],
    },
    {
        id: 'skeleton',
        name: 'Skeleton',
        icon: '/monsters/skeleton.png',
        tier: MonsterTier.MiniBoss,
        area: AreaId.Mountains,
        attacks: [new Attack('Rattling Bones', WeaponType.Melee, 4, 60, 66)],
    },
    {
        id: 'giant',
        name: 'Giant',
        icon: '/monsters/giant.png',
        tier: MonsterTier.Boss,
        area: AreaId.Mountains,
        attacks: [new Attack('Club Swing', WeaponType.Melee, 2.1, 100, 120)],
    },
    // Riverlands
    {
        id: 'chicken',
        name: 'Chicken',
        icon: '/monsters/chicken.png',
        tier: MonsterTier.Critter,
        area: AreaId.Riverlands,
        attacks: [new Attack('Peck', WeaponType.Melee, 2, 0, 3)],
    },
    {
        id: 'cow',
        name: 'Cow',
        icon: '/monsters/cow.png',
        tier: MonsterTier.Passive,
        area: AreaId.Riverlands,
        attacks: [new Attack('Bull Rush', WeaponType.Melee, 3, 10, 15)],
    },
    {
        id: 'goblin',
        name: 'Goblin',
        icon: '/monsters/goblin.png',
        tier: MonsterTier.Neutral,
        area: AreaId.Riverlands,
        attacks: [new Attack('Quick Attack', WeaponType.Melee, 1.0, 10, 15)],
    },
    {
        id: 'riverSpirit',
        name: 'River Spirit',
        icon: '/monsters/river-spirit.png',
        tier: MonsterTier.Aggressive,
        area: AreaId.Riverlands,
        attacks: [new Attack('Splash', WeaponType.Melee, 2.3, 30, 35)],
    },
    {
        id: 'troll',
        name: 'Troll',
        icon: '/monsters/troll.png',
        tier: MonsterTier.MiniBoss,
        area: AreaId.Riverlands,
        attacks: [new Attack('Club Swing', WeaponType.Melee, 4, 60, 66)],
    },
    {
        id: 'dragon',
        name: 'Dragon',
        icon: '/monsters/dragon.png',
        tier: MonsterTier.Boss,
        area: AreaId.Riverlands,
        attacks: [new Attack('Fire Breath', WeaponType.Melee, 2.1, 100, 120)],
    },

    // Forest
    {
        id: 'owl',
        name: 'owl',
        icon: '/monsters/owl.png',
        tier: MonsterTier.Critter,
        area: AreaId.Forest,
        attacks: [new Attack('Peck', WeaponType.Melee, 2, 0, 3)],
    },
    {
        id: 'spider',
        name: 'Spider',
        icon: '/monsters/spider.png',
        tier: MonsterTier.Passive,
        area: AreaId.Forest,
        attacks: [new Attack('Bite', WeaponType.Melee, 3, 10, 15)],
    },
    {
        id: 'slime',
        name: 'Slime',
        icon: '/monsters/slime.png',
        tier: MonsterTier.Neutral,
        area: AreaId.Forest,
        attacks: [new Attack('Splish Splash', WeaponType.Melee, 1.0, 10, 15)],
    },
    {
        id: 'haunted-tree',
        name: 'Haunted Tree',
        icon: '/monsters/haunted-tree.png',
        tier: MonsterTier.Aggressive,
        area: AreaId.Forest,
        attacks: [new Attack('Sweep', WeaponType.Melee, 2.3, 30, 35)],
    },
    {
        id: 'witch',
        name: 'witch',
        icon: '/monsters/witch.png',
        tier: MonsterTier.MiniBoss,
        area: AreaId.Forest,
        attacks: [new Attack('Hex', WeaponType.Melee, 4, 60, 66)],
    },
    {
        id: 'giant-spider',
        name: 'Giant Spider',
        icon: '/monsters/giantSpider.png',
        tier: MonsterTier.Boss,
        area: AreaId.Forest,
        attacks: [new Attack('Giant Spider', WeaponType.Melee, 2.1, 100, 120)],
    },
].map((m) => {
    return {
        ...m,
        id: m.id as MonsterId,
        stats: tierStats[m.tier],
    };
});
