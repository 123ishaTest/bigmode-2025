import type { Fightable } from '$lib/game/tools/combat/Fightable';
import type { Attack } from '$lib/game/tools/combat/Attack';
import { intBetween } from '$lib/game/tools/random/Random';
import type { Enemy } from '$lib/game/features/bestiary/Enemy.svelte';

export class Combat {
    character: Fightable;
    enemy: Enemy;

    isActive: boolean = true;

    characterScheduledAttack: Attack | null = null;
    enemyScheduledAttack: Attack | null = null;

    constructor(fighter1: Fightable, fighter2: Enemy) {
        this.character = fighter1;
        this.enemy = fighter2;

        this.characterScheduledAttack = this.character.attack();
        this.enemyScheduledAttack = this.enemy.attack();
    }

    tick(delta: number) {
        this.character.idle(delta);
        this.enemy.idle(delta);

        if (this.character.cooldown <= 0 && this.characterScheduledAttack) {
            const damage = this.calculateDamage(this.character, this.characterScheduledAttack, this.enemy);
            this.characterScheduledAttack = null;
            console.log(`Player attacking monster for ${damage} damage`);
            this.enemy.takeDamage(damage);
            if (this.enemy.health <= 0) {
                this.end();
                return;
            }
        }
        if (this.enemy.cooldown <= 0 && this.enemyScheduledAttack) {
            const damage = this.calculateDamage(this.enemy, this.enemyScheduledAttack, this.character);
            this.enemyScheduledAttack = null;
            console.log(`Monster attacking player for ${damage} damage`);

            this.character.takeDamage(damage);

            if (this.character.health <= 0) {
                this.end();
                return;
            }
        }

        if (this.characterScheduledAttack == null) {
            this.characterScheduledAttack = this.character.attack();
        }
        if (this.enemyScheduledAttack == null) {
            this.enemyScheduledAttack = this.enemy.attack();
        }
    }

    calculateDamage(attacker: Fightable, attack: Attack, defender: Fightable): number {
        // const isDodged = booleanWithProbability(defender.dodgeChance)
        // if (isDodged) {
        //     return 0;
        // }
        // const isCritical = booleanWithProbability(attacker.criticalChance);
        const attackType = attack.weaponType;
        const attackStat = attacker.getAttackValue(attackType) + intBetween(attack.minAttack, attack.maxAttack);
        const defenseStat = defender.getDefenseValue(attackType);

        const baseDamage = (attackStat * 100) / (100 + defenseStat);
        return baseDamage;
        // return Math.ceil(baseDamage * (isCritical ? 2 : 1));
    }

    end(): void {
        console.log('ending combat');
        this.isActive = false;
    }
}
