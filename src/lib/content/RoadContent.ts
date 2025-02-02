import type { WorldLocationId } from '$lib/content/WorldLocationId';
import type { EnemyDetail } from '$lib/game/features/bestiary/EnemyDetail';

interface RoadInput {
    from: WorldLocationId;
    to: WorldLocationId;
    obstacles: EnemyDetail[];
}

export const roadContent: RoadInput[] = [
    {
        from: '/home',
        to: '/home/cabin',
        obstacles: [{ monster: 'chicken', level: 1 }],
    },
    {
        from: '/home/cabin',
        to: '/desert/village',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'mosquito', level: 1 },
            { monster: 'camel', level: 1 },
        ],
    },
    {
        from: '/desert/village',
        to: '/desert/camp',
        obstacles: [
            { monster: 'mosquito', level: 2 },
            { monster: 'camel', level: 1 },
            { monster: 'camel', level: 2 },
        ],
    },
    {
        from: '/desert/camp',
        to: '/desert/mirror',
        obstacles: [
            { monster: 'snake', level: 10 },
            { monster: 'snake', level: 12 },
            { monster: 'crocodile', level: 15 },
        ],
    },
    {
        from: '/desert/oasis',
        to: '/desert/remains',
        obstacles: [
            { monster: 'snake', level: 20 },
            { monster: 'crocodile', level: 20 },
            { monster: 'scorpion', level: 25 },
        ],
    },
    {
        from: '/desert/camp',
        to: '/desert/statue',
        obstacles: [
            { monster: 'mosquito', level: 3 },
            { monster: 'camel', level: 4 },
            { monster: 'snake', level: 5 },
        ],
    },
    {
        from: '/desert/cactii',
        to: '/desert/statue',
        obstacles: [
            { monster: 'mosquito', level: 1 },
            { monster: 'camel', level: 3 },
            { monster: 'snake', level: 5 },
        ],
    },
    {
        from: '/desert/village',
        to: '/desert/cactii',
        obstacles: [
            { monster: 'mosquito', level: 2 },
            { monster: 'camel', level: 1 },
            { monster: 'camel', level: 2 },
        ],
    },
    {
        from: '/desert/cactii',
        to: '/desert/monolith',
        obstacles: [
            { monster: 'crocodile', level: 20 },
            { monster: 'crocodile', level: 22 },
            { monster: 'scorpion', level: 25 },
        ],
    },
    {
        from: '/desert/monolith',
        to: '/desert/pyramid',
        obstacles: [
            { monster: 'scorpion', level: 30 },
            { monster: 'scorpion', level: 35 },
            { monster: 'mummy', level: 40 },
        ],
    },
    {
        from: '/desert/village',
        to: '/desert/camp-lost',
        obstacles: [
            { monster: 'mosquito', level: 2 },
            { monster: 'camel', level: 3 },
            { monster: 'camel', level: 4 },
        ],
    },
    {
        from: '/home/cabin',
        to: '/forest/clearing',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'owl', level: 2 },
            { monster: 'owl', level: 3 },
        ],
    },
    {
        from: '/forest/giant-tree',
        to: '/forest/spring',
        obstacles: [
            { monster: 'spider', level: 10 },
            { monster: 'hauntedTree', level: 12 },
            { monster: 'hauntedTree', level: 15 },
        ],
    },
    {
        from: '/forest/tower',
        to: '/forest/bushes',
        obstacles: [
            { monster: 'slime', level: 20 },
            { monster: 'spider', level: 15 },
            { monster: 'spider', level: 10 },
        ],
    },
    {
        from: '/forest/campfire',
        to: '/forest/crystals',
        obstacles: [
            { monster: 'hauntedTree', level: 20 },
            { monster: 'hauntedTree', level: 25 },
            { monster: 'witch', level: 30 },
        ],
    },
    {
        from: '/forest/spider-den',
        to: '/forest/crystals',
        obstacles: [
            { monster: 'giantSpider', level: 50 },
            { monster: 'spider', level: 45 },
            { monster: 'spider', level: 40 },
        ],
    },
    {
        from: '/forest/campfire',
        to: '/forest/bushes',
        obstacles: [
            { monster: 'owl', level: 6 },
            { monster: 'spider', level: 8 },
            { monster: 'spider', level: 10 },
        ],
    },
    {
        from: '/forest/spring',
        to: '/forest/bushes',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
        ],
    },
    {
        from: '/forest/spring',
        to: '/forest/witch',
        obstacles: [
            { monster: 'slime', level: 15 },
            { monster: 'hauntedTree', level: 17 },
            { monster: 'witch', level: 20 },
        ],
    },
    {
        from: '/forest/clearing',
        to: '/forest/giant-tree',
        obstacles: [
            { monster: 'owl', level: 5 },
            { monster: 'spider', level: 7 },
            { monster: 'spider', level: 10 },
        ],
    },
    {
        from: '/home/cabin',
        to: '/home/guard',
        obstacles: [
            { monster: 'chicken', level: 2 },
            { monster: 'cow', level: 3 },
            { monster: 'cow', level: 5 },
        ],
    },
    {
        from: '/home/guard',
        to: '/riverlands/crossroads',
        obstacles: [
            { monster: 'cow', level: 5 },
            { monster: 'goblin', level: 7 },
            { monster: 'goblin', level: 10 },
        ],
    },
    {
        from: '/riverlands/crossroads',
        to: '/riverlands/castle',
        obstacles: [
            { monster: 'goblin', level: 20 },
            { monster: 'goblin', level: 25 },
            { monster: 'goblin', level: 30 },
        ],
    },
    {
        from: '/riverlands/maze',
        to: '/riverlands/crossroads',
        obstacles: [
            { monster: 'troll', level: 22 },
            { monster: 'goblin', level: 20 },
            { monster: 'goblin', level: 17 },
        ],
    },
    {
        from: '/riverlands/fountain',
        to: '/riverlands/maze',
        obstacles: [
            { monster: 'dragon', level: 30 },
            { monster: 'troll', level: 25 },
            { monster: 'goblin', level: 25 },
        ],
    },
    {
        from: '/riverlands/castle',
        to: '/riverlands/fisherman',
        obstacles: [
            { monster: 'goblin', level: 20 },
            { monster: 'goblin', level: 25 },
            { monster: 'troll', level: 30 },
        ],
    },
    {
        from: '/riverlands/castle',
        to: '/riverlands/docks',
        obstacles: [
            { monster: 'troll', level: 50 },
            { monster: 'troll', level: 55 },
            { monster: 'riverSpirit', level: 60 },
        ],
    },
    {
        from: '/forest/clearing',
        to: '/forest/campfire',
        obstacles: [
            { monster: 'owl', level: 5 },
            { monster: 'spider', level: 7 },
            { monster: 'spider', level: 10 },
        ],
    },
    {
        from: '/mountains/summit',
        to: '/mountains/crystals',
        obstacles: [
            { monster: 'giant', level: 85 },
            { monster: 'skeleton', level: 70 },
            { monster: 'skeleton', level: 65 },
        ],
    },
    {
        from: '/mountains/crystals',
        to: '/mountains/spring',
        obstacles: [
            { monster: 'skeleton', level: 60 },
            { monster: 'wolf', level: 55 },
            { monster: 'wolf', level: 50 },
        ],
    },
    {
        from: '/mountains/spring',
        to: '/mountains/outpost',
        obstacles: [
            { monster: 'wolf', level: 50 },
            { monster: 'rockCrab', level: 45 },
            { monster: 'rockCrab', level: 40 },
        ],
    },
    {
        from: '/mountains/outpost',
        to: '/mountains/cabin',
        obstacles: [
            { monster: 'rockCrab', level: 35 },
            { monster: 'goat', level: 30 },
            { monster: 'goat', level: 25 },
        ],
    },
    {
        from: '/mountains/mine',
        to: '/mountains/treasure?',
        obstacles: [
            { monster: 'rockCrab', level: 20 },
            { monster: 'goat', level: 15 },
            { monster: 'goat', level: 10 },
        ],
    },
    {
        from: '/mountains/treasure?',
        to: '/mountains/dungeon',
        obstacles: [
            { monster: 'goat', level: 10 },
            { monster: 'bat', level: 7 },
            { monster: 'bat', level: 5 },
        ],
    },
    {
        from: '/mountains/dungeon',
        to: '/mountains/cabin',
        obstacles: [
            { monster: 'goat', level: 7 },
            { monster: 'bat', level: 6 },
            { monster: 'bat', level: 5 },
        ],
    },
    {
        from: '/mountains/cabin',
        to: '/desert/camp-lost',
        obstacles: [
            { monster: 'goat', level: 5 },
            { monster: 'bat', level: 3 },
            { monster: 'bat', level: 2 },
        ],
    },
    {
        from: '/desert/mirror',
        to: '/desert/oasis',
        obstacles: [
            { monster: 'camel', level: 15 },
            { monster: 'snake', level: 16 },
            { monster: 'crocodile', level: 18 },
        ],
    },
];
