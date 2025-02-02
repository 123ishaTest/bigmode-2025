import type { WeaponType } from '$lib/game/tools/combat/WeaponType';

export class Attack {
    description: string;
    weaponType: WeaponType;
    cooldown: number;

    constructor(description: string, weaponType: WeaponType, cooldown: number) {
        this.description = description;
        this.weaponType = weaponType;
        this.cooldown = cooldown;
    }
}
