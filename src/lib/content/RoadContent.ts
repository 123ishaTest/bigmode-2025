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
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
        ],
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
            { monster: 'snake', level: 15 },
            { monster: 'snake', level: 15 },
            { monster: 'crocodile', level: 20 },
        ],
    },
    {
        from: '/desert/oasis',
        to: '/desert/remains',
        obstacles: [
            { monster: 'snake', level: 20 },
            { monster: 'crocodile', level: 25 },
            { monster: 'scorpion', level: 50 },
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
            { monster: 'crocodile', level: 30 },
            { monster: 'crocodile', level: 35 },
            { monster: 'scorpion', level: 45 },
        ],
    },
    {
        from: '/desert/monolith',
        to: '/desert/pyramid',
        obstacles: [
            { monster: 'scorpion', level: 50 },
            { monster: 'scorpion', level: 75 },
            { monster: 'mummy', level: 100 },
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
            { monster: 'spider', level: 15 },
            { monster: 'hauntedTree', level: 20 },
            { monster: 'hauntedTree', level: 20 },
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
            { monster: 'hauntedTree', level: 25 },
            { monster: 'hauntedTree', level: 30 },
            { monster: 'witch', level: 35 },
        ],
    },
    {
        from: '/forest/spider-den',
        to: '/forest/crystals',
        obstacles: [
            { monster: 'giantSpider', level: 100 },
            { monster: 'spider', level: 75 },
            { monster: 'spider', level: 50 },
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
            { monster: 'slime', level: 30 },
            { monster: 'hauntedTree', level: 40 },
            { monster: 'witch', level: 50 },
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
            { monster: 'troll', level: 30 },
            { monster: 'goblin', level: 25 },
            { monster: 'goblin', level: 20 },
        ],
    },
    {
        from: '/riverlands/fountain',
        to: '/riverlands/maze',
        obstacles: [
            { monster: 'dragon', level: 50 },
            { monster: 'troll', level: 40 },
            { monster: 'goblin', level: 30 },
        ],
    },
    {
        from: '/riverlands/castle',
        to: '/riverlands/fisherman',
        obstacles: [
            { monster: 'goblin', level: 30 },
            { monster: 'goblin', level: 35 },
            { monster: 'troll', level: 40 },
        ],
    },
    {
        from: '/riverlands/castle',
        to: '/riverlands/docks',
        obstacles: [
            { monster: 'troll', level: 50 },
            { monster: 'troll', level: 75 },
            { monster: 'riverSpirit', level: 100 },
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
            { monster: 'giant', level: 100 },
            { monster: 'skeleton', level: 75 },
            { monster: 'skeleton', level: 50 },
        ],
    },
    {
        from: '/mountains/crystals',
        to: '/mountains/spring',
        obstacles: [
            { monster: 'skeleton', level: 40 },
            { monster: 'wolf', level: 35 },
            { monster: 'wolf', level: 30 },
        ],
    },
    {
        from: '/mountains/spring',
        to: '/mountains/outpost',
        obstacles: [
            { monster: 'wolf', level: 30 },
            { monster: 'rockCrab', level: 25 },
            { monster: 'rockCrab', level: 25 },
        ],
    },
    {
        from: '/mountains/outpost',
        to: '/mountains/cabin',
        obstacles: [
            { monster: 'rockCrab', level: 20 },
            { monster: 'goat', level: 10 },
            { monster: 'goat', level: 10 },
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
            { monster: 'camel', level: 10 },
            { monster: 'snake', level: 20 },
            { monster: 'crocodile', level: 25 },
        ],
    },
];
