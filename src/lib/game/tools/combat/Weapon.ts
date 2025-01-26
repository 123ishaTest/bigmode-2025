import { type Attack } from './Attack';
import { type WeaponId } from '$lib/game/tools/combat/WeaponId';

export class Weapon {
    id: WeaponId;
    name: string;
    attacks: Attack[];

    constructor(id: WeaponId, name: string, attacks: Attack[]) {
        this.id = id;
        this.name = name;
        this.attacks = attacks;
    }
}
