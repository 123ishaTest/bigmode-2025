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
        to: '/forest/cabin',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
        ],
    },
    {
        from: '/forest/cabin',
        to: '/desert/village',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'mosquito', level: 1 },
            {
                monster: 'camel',
                level: 1,
            },
        ],
    },
    {
        from: '/desert/village',
        to: '/desert/camp',
        obstacles: [
            { monster: 'mosquito', level: 2 },
            { monster: 'camel', level: 1 },
            {
                monster: 'camel',
                level: 2,
            },
        ],
    },
    {
        from: '/desert/camp',
        to: '/desert/mirror',
        obstacles: [
            { monster: 'snake', level: 15 },
            { monster: 'snake', level: 15 },
            {
                monster: 'crocodile',
                level: 20,
            },
        ],
    },
    {
        from: '/desert/oasis',
        to: '/desert/remains',
        obstacles: [
            { monster: 'snake', level: 20 },
            { monster: 'crocodile', level: 25 },
            {
                monster: 'scorpion',
                level: 50,
            },
        ],
    },
    {
        from: '/desert/camp',
        to: '/desert/statue',
        obstacles: [
            { monster: 'mosquito', level: 3 },
            { monster: 'camel', level: 4 },
            {
                monster: 'snake',
                level: 5,
            },
        ],
    },
    {
        from: '/desert/cactii',
        to: '/desert/statue',
        obstacles: [
            { monster: 'mosquito', level: 1 },
            { monster: 'camel', level: 3 },
            {
                monster: 'snake',
                level: 5,
            },
        ],
    },
    {
        from: '/desert/village',
        to: '/desert/cactii',
        obstacles: [
            { monster: 'mosquito', level: 2 },
            { monster: 'camel', level: 1 },
            {
                monster: 'camel',
                level: 2,
            },
        ],
    },
    {
        from: '/desert/cactii',
        to: '/desert/monolith',
        obstacles: [
            { monster: 'crocodile', level: 30 },
            { monster: 'crocodile', level: 35 },
            {
                monster: 'scorpion',
                level: 45,
            },
        ],
    },
    {
        from: '/desert/monolith',
        to: '/desert/pyramid',
        obstacles: [
            { monster: 'scorpion', level: 50 },
            { monster: 'scorpion', level: 75 },
            {
                monster: 'mummy',
                level: 100,
            },
        ],
    },
    {
        from: '/desert/village',
        to: '/desert/camp-lost',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/forest/cabin',
        to: '/forest/clearing',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/forest/giant-tree',
        to: '/forest/spring',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/forest/tower',
        to: '/forest/bushes',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/forest/campfire',
        to: '/forest/crystals',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/forest/spider-den',
        to: '/forest/crystals',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/forest/campfire',
        to: '/forest/bushes',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/forest/spring',
        to: '/forest/bushes',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/forest/spring',
        to: '/forest/witch',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/forest/clearing',
        to: '/forest/giant-tree',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/forest/cabin',
        to: '/riverlands/guard',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/riverlands/guard',
        to: '/riverlands/crossroads',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/riverlands/crossroads',
        to: '/riverlands/castle',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/riverlands/maze',
        to: '/riverlands/crossroads',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/riverlands/fountain',
        to: '/riverlands/maze',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/riverlands/castle',
        to: '/riverlands/fisherman',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/riverlands/castle',
        to: '/riverlands/docks',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/forest/clearing',
        to: '/forest/campfire',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/mountains/summit',
        to: '/mountains/crystals',
        obstacles: [
            { monster: 'giant', level: 100 },
            { monster: 'skeleton', level: 75 },
            {
                monster: 'skeleton',
                level: 50,
            },
        ],
    },
    {
        from: '/mountains/crystals',
        to: '/mountains/spring',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/mountains/spring',
        to: '/mountains/outpost',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/mountains/outpost',
        to: '/mountains/cabin',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/mountains/mine',
        to: '/mountains/dungeon',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/mountains/mine',
        to: '/mountains/treasure?',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/mountains/treasure?',
        to: '/mountains/dungeon',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/mountains/dungeon',
        to: '/mountains/cabin',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/mountains/cabin',
        to: '/desert/camp-lost',
        obstacles: [
            { monster: 'chicken', level: 1 },
            { monster: 'chicken', level: 1 },
            {
                monster: 'chicken',
                level: 1,
            },
        ],
    },
    {
        from: '/desert/mirror',
        to: '/desert/oasis',
        obstacles: [
            { monster: 'camel', level: 10 },
            { monster: 'snake', level: 20 },
            {
                monster: 'crocodile',
                level: 25,
            },
        ],
    },
];
