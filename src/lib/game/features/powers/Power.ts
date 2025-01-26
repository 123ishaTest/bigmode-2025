import type { PowerType } from '$lib/game/features/powers/PowerType';
import type { PowerId } from '$lib/game/features/powers/PowerId';
import type { Requirement } from '$lib/game/tools/requirements/Requirements';

export interface Power {
    id: PowerId;
    name: string;
    type: PowerType;

    icon: string;

    requirement: Requirement;

    baseBonus: number;
    incrementBonus: number;
    maxCount: number;
}
