import { RequirementType } from '$lib/game/tools/requirements/RequirementType';
import type { RunStats } from '$lib/game/features/powers/RunStats';

export type Requirement =
    | DamageDealtRequirement
    | DamageTakenRequirement
    | LocationsVisitedRequirement
    | MonstersDefeatedRequirement;

export interface DamageDealtRequirement {
    type: RequirementType.DamageDealt;
    amount: number;
}

export interface DamageTakenRequirement {
    type: RequirementType.DamageTaken;
    amount: number;
}

export interface LocationsVisitedRequirement {
    type: RequirementType.LocationsVisited;
    amount: number;
}

export interface MonstersDefeatedRequirement {
    type: RequirementType.MonstersDefeated;
    amount: number;
}

export const hasRequirement = (requirement: Requirement, stats: RunStats): boolean => {
    switch (requirement.type) {
        case RequirementType.DamageDealt:
            return stats.damageDealt >= requirement.amount;
        case RequirementType.DamageTaken:
            return stats.damageTaken >= requirement.amount;
        case RequirementType.MonstersDefeated:
            return stats.monstersDefeated >= requirement.amount;
        case RequirementType.LocationsVisited:
            return stats.locationsVisited >= requirement.amount;
        default:
            console.error(`Cannot handle requirement`, requirement);
            return false;
    }
};
