import { RequirementType } from '$lib/game/tools/requirements/RequirementType';
import type { RunStats } from '$lib/game/features/powers/RunStats';
import { AreaId } from '$lib/game/features/world/AreaId';
import type { WorldLocationId } from '$lib/content/WorldLocationId';

export type Requirement =
    | DamageDealtRequirement
    | DamageTakenRequirement
    | LocationsVisitedRequirement
    | MonstersDefeatedRequirement
    | RegionsVisitedRequirement
    | AllRegionsVisitedRequirement;

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

export interface RegionsVisitedRequirement {
    type: RequirementType.RegionVisited;
    amount: number;
    region: AreaId;
}

export interface MonstersDefeatedRequirement {
    type: RequirementType.MonstersDefeated;
    amount: number;
}

export interface AllRegionsVisitedRequirement {
    type: RequirementType.AllRegionsVisited;
}

const getArea = (l: WorldLocationId): AreaId => {
    if (l.startsWith('/desert')) {
        return AreaId.Desert;
    }
    if (l.startsWith('/mountains')) {
        return AreaId.Mountains;
    }
    if (l.startsWith('/riverlands')) {
        return AreaId.Riverlands;
    }
    if (l.startsWith('/forest')) {
        return AreaId.Forest;
    }
    return AreaId.Home;
};

export const hasRequirement = (requirement: Requirement, stats: RunStats): boolean => {
    switch (requirement.type) {
        case RequirementType.DamageDealt:
            return stats.damageDealt >= requirement.amount;
        case RequirementType.DamageTaken:
            return stats.damageTaken >= requirement.amount;
        case RequirementType.MonstersDefeated:
            return stats.monstersDefeated >= requirement.amount;
        case RequirementType.LocationsVisited:
            return stats.locationsVisited.length >= requirement.amount;
        case RequirementType.RegionVisited:
            return stats.locationsVisited.filter((l) => getArea(l) === requirement.region).length > requirement.amount;
        case RequirementType.AllRegionsVisited:
            return new Set(stats.locationsVisited.map((l) => getArea(l))).size === 4;
        default:
            console.error(`Cannot handle requirement`, requirement);
            return false;
    }
};
