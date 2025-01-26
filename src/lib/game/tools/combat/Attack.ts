import type { WeaponType } from '$lib/game/tools/combat/WeaponType';

export class Attack {
    description: string;
    weaponType: WeaponType;
    cooldown: number;
    minAttack: number;
    maxAttack: number;

    constructor(description: string, weaponType: WeaponType, cooldown: number, minAttack: number, maxAttack: number) {
        this.description = description;
        this.weaponType = weaponType;
        this.cooldown = cooldown;
        this.minAttack = minAttack;
        this.maxAttack = maxAttack;
    }
}
