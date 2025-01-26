import type { Attack } from '$lib/game/tools/combat/Attack';
import type { WeaponType } from '$lib/game/tools/combat/WeaponType';
import type { Stats } from '$lib/game/tools/combat/Stats';

/**
 * Anything that can engage in combat.
 * Usually the player or enemies
 */
export interface Fightable extends Stats {
    level: number;
    maxHealth: number;
    health: number;
    cooldown: number;
    maxCooldown: number;

    meleeAttack: number;
    meleeDefense: number;

    // rangeAttack: number;
    // rangeDefense: number;
    //
    // mageDefense: number;
    // mageAttack: number;
    //
    // criticalChance: number;
    // dodgeChance: number;

    attack(): Attack;

    takeDamage(damage: number): void;

    idle(delta: number): void;

    getAttackValue(type: WeaponType): number;

    getDefenseValue(type: WeaponType): number;
}
