import type { KeyItem } from '$lib/game/features/keyitems/KeyItem';

export const keyItems: KeyItem[] = [
    {
        id: 'ruby-necklace',
        name: 'Ruby Necklace',
        description: 'Boosts your health by 10%',
        icon: '/powers/weapon-small.png',
        unlockHint: 'Maybe I can find this in my dreams...',
        unlockLocation: '/desert/bed',
    },
];
