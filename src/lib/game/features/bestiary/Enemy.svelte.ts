import type { Monster } from '$lib/game/features/bestiary/Monster';
import type { Fightable } from '$lib/game/tools/combat/Fightable';
import type { Attack } from '$lib/game/tools/combat/Attack';
import { fromArray } from '$lib/game/tools/random/Random';

export class Enemy implements Fightable {
    level: number;
    monster: Monster;

    attacks: Attack[];

    maxHealth: number = $state(0);
    health: number = $state(0);
    cooldown: number = $state(0);
    maxCooldown: number = $state(0);
    meleeAttack: number = $state(0);
    meleeDefense: number = $state(0);

    constructor(level: number, monster: Monster) {
        this.level = level;
        this.monster = monster;
        this.maxHealth = monster.stats.health * Math.pow(1.1, level);
        this.health = this.maxHealth;

        this.meleeAttack = monster.stats.meleeAttack * Math.pow(1.1, level);
        this.meleeDefense = monster.stats.meleeDefense * Math.pow(1.1, level);

        this.attacks = monster.attacks;
    }

    attack(): Attack {
        const attack = fromArray(this.attacks);
        this.maxCooldown = attack.cooldown;
        this.cooldown = this.maxCooldown;
        return attack;
    }

    takeDamage(damage: number): void {
        this.health -= damage;
    }

    idle(delta: number): void {
        this.cooldown -= delta;
    }

    getAttackValue(): number {
        return this.meleeAttack;
    }

    getDefenseValue(): number {
        return this.meleeDefense;
    }
}
