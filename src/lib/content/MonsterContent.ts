import { MonsterTier } from '$lib/game/features/bestiary/MonsterTier';
import type { Stats } from '$lib/game/tools/combat/Stats';
import { type Monster } from '$lib/game/features/bestiary/Monster';
import { Attack } from '$lib/game/tools/combat/Attack';
import { WeaponType } from '$lib/game/tools/combat/WeaponType';
import type { MonsterId } from '$lib/game/features/bestiary/MonsterId';
import { AreaId } from '$lib/game/features/world/AreaId';

const tierStats: Record<MonsterTier, Stats> = {
    [MonsterTier.Critter]: { health: 5, meleeAttack: 1, meleeDefense: 1 },
    [MonsterTier.Passive]: { health: 10, meleeAttack: 2, meleeDefense: 2 },
    [MonsterTier.Neutral]: { health: 15, meleeAttack: 3, meleeDefense: 3 },
    [MonsterTier.Aggressive]: { health: 20, meleeAttack: 4, meleeDefense: 4 },
    [MonsterTier.MiniBoss]: { health: 25, meleeAttack: 5, meleeDefense: 5 },
    [MonsterTier.Boss]: { health: 30, meleeAttack: 6, meleeDefense: 6 },
};

export const monsters: Monster[] = [
    // Desert
    {
        id: 'mosquito',
        name: 'Mosquito',
        icon: '/monsters/mosquito.png',
        tier: MonsterTier.Critter,
        area: AreaId.Desert,
        attacks: [new Attack('Bite', WeaponType.Melee, 2)],
    },
    {
        id: 'camel',
        name: 'Camel',
        icon: '/monsters/camel.png',
        tier: MonsterTier.Passive,
        area: AreaId.Desert,
        attacks: [new Attack('Stomp', WeaponType.Melee, 3)],
    },
    {
        id: 'snake',
        name: 'Snake',
        icon: '/monsters/snake.png',
        tier: MonsterTier.Neutral,
        area: AreaId.Desert,
        attacks: [new Attack('Snare', WeaponType.Melee, 1.0)],
    },
    {
        id: 'crocodile',
        name: 'Crocodile',
        icon: '/monsters/crocodile.png',
        tier: MonsterTier.Aggressive,
        area: AreaId.Desert,
        attacks: [new Attack('Chomp', WeaponType.Melee, 2.3)],
    },
    {
        id: 'scorpion',
        name: 'Scorpion',
        icon: '/monsters/scorpion.png',
        tier: MonsterTier.MiniBoss,
        area: AreaId.Desert,
        attacks: [new Attack('Sting', WeaponType.Melee, 4)],
    },
    {
        id: 'mummy',
        name: 'Mummy',
        icon: '/monsters/mummy.png',
        tier: MonsterTier.Boss,
        area: AreaId.Desert,
        attacks: [new Attack('Fire Breath', WeaponType.Melee, 2.1)],
    },
    // Mountains
    {
        id: 'bat',
        name: 'Bat',
        icon: '/monsters/bat.png',
        tier: MonsterTier.Critter,
        area: AreaId.Mountains,
        attacks: [new Attack('Sonic', WeaponType.Melee, 2)],
    },
    {
        id: 'goat',
        name: 'Goat',
        icon: '/monsters/goat.png',
        tier: MonsterTier.Passive,
        area: AreaId.Mountains,
        attacks: [new Attack('Horn Ram', WeaponType.Melee, 3)],
    },
    {
        id: 'rockCrab',
        name: 'Rock Crab',
        icon: '/monsters/rock-crab.png',
        tier: MonsterTier.Neutral,
        area: AreaId.Mountains,
        attacks: [new Attack('Pinch', WeaponType.Melee, 1.0)],
    },
    {
        id: 'wolf',
        name: 'Wolf',
        icon: '/monsters/wolf.png',
        tier: MonsterTier.Aggressive,
        area: AreaId.Mountains,
        attacks: [new Attack('Howl', WeaponType.Melee, 2.3)],
    },
    {
        id: 'skeleton',
        name: 'Skeleton',
        icon: '/monsters/skeleton.png',
        tier: MonsterTier.MiniBoss,
        area: AreaId.Mountains,
        attacks: [new Attack('Rattling Bones', WeaponType.Melee, 4)],
    },
    {
        id: 'giant',
        name: 'Giant',
        icon: '/monsters/giant.png',
        tier: MonsterTier.Boss,
        area: AreaId.Mountains,
        attacks: [new Attack('Club Swing', WeaponType.Melee, 2.1)],
    },
    // Riverlands
    {
        id: 'chicken',
        name: 'Chicken',
        icon: '/monsters/chicken.png',
        tier: MonsterTier.Critter,
        area: AreaId.Riverlands,
        attacks: [new Attack('Peck', WeaponType.Melee, 2)],
    },
    {
        id: 'cow',
        name: 'Cow',
        icon: '/monsters/cow.png',
        tier: MonsterTier.Passive,
        area: AreaId.Riverlands,
        attacks: [new Attack('Bull Rush', WeaponType.Melee, 3)],
    },
    {
        id: 'goblin',
        name: 'Goblin',
        icon: '/monsters/goblin.png',
        tier: MonsterTier.Neutral,
        area: AreaId.Riverlands,
        attacks: [new Attack('Quick Attack', WeaponType.Melee, 1.0)],
    },
    {
        id: 'troll',
        name: 'Troll',
        icon: '/monsters/troll.png',
        tier: MonsterTier.Aggressive,
        area: AreaId.Riverlands,
        attacks: [new Attack('Club Swing', WeaponType.Melee, 4)],
    },
    {
        id: 'dragon',
        name: 'Dragon',
        icon: '/monsters/dragon.png',
        tier: MonsterTier.MiniBoss,
        area: AreaId.Riverlands,
        attacks: [new Attack('Fire Breath', WeaponType.Melee, 2.1)],
    },
    {
        id: 'riverSpirit',
        name: 'River Spirit',
        icon: '/monsters/river-spirit.png',
        tier: MonsterTier.Boss,
        area: AreaId.Riverlands,
        attacks: [new Attack('Splash', WeaponType.Melee, 2.3)],
    },

    // Forest
    {
        id: 'owl',
        name: 'owl',
        icon: '/monsters/owl.png',
        tier: MonsterTier.Critter,
        area: AreaId.Forest,
        attacks: [new Attack('Peck', WeaponType.Melee, 2)],
    },
    {
        id: 'spider',
        name: 'Spider',
        icon: '/monsters/spider.png',
        tier: MonsterTier.Passive,
        area: AreaId.Forest,
        attacks: [new Attack('Bite', WeaponType.Melee, 3)],
    },
    {
        id: 'slime',
        name: 'Slime',
        icon: '/monsters/slime.png',
        tier: MonsterTier.Neutral,
        area: AreaId.Forest,
        attacks: [new Attack('Splish Splash', WeaponType.Melee, 1.0)],
    },
    {
        id: 'hauntedTree',
        name: 'Haunted Tree',
        icon: '/monsters/hauntedTree.png',
        tier: MonsterTier.Aggressive,
        area: AreaId.Forest,
        attacks: [new Attack('Sweep', WeaponType.Melee, 2.3)],
    },
    {
        id: 'witch',
        name: 'witch',
        icon: '/monsters/witch.png',
        tier: MonsterTier.MiniBoss,
        area: AreaId.Forest,
        attacks: [new Attack('Hex', WeaponType.Melee, 4)],
    },
    {
        id: 'giantSpider',
        name: 'Giant Spider',
        icon: '/monsters/giantSpider.png',
        tier: MonsterTier.Boss,
        area: AreaId.Forest,
        attacks: [new Attack('Giant Spider', WeaponType.Melee, 2.1)],
    },
].map((m) => {
    return {
        ...m,
        id: m.id as MonsterId,
        stats: tierStats[m.tier],
    };
});
