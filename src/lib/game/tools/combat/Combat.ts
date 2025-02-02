import type { Fightable } from '$lib/game/tools/combat/Fightable';
import type { Attack } from '$lib/game/tools/combat/Attack';
import type { Enemy } from '$lib/game/features/bestiary/Enemy.svelte';
import type { CombatReport } from '$lib/game/tools/combat/CombatReport';

export class Combat {
    character: Fightable;
    enemy: Enemy;

    characterScheduledAttack: Attack | null = null;
    enemyScheduledAttack: Attack | null = null;

    damageDealt: number = 0;
    damageTaken: number = 0;

    constructor(fighter1: Fightable, fighter2: Enemy) {
        this.character = fighter1;
        this.enemy = fighter2;

        this.characterScheduledAttack = this.character.attack();
        this.enemyScheduledAttack = this.enemy.attack();
    }

    tick(delta: number): CombatReport | null {
        this.character.idle(delta);
        this.enemy.idle(delta);

        if (this.character.cooldown <= 0 && this.characterScheduledAttack) {
            const damage = Math.min(
                this.enemy.health,
                this.calculateDamage(this.character, this.characterScheduledAttack, this.enemy),
            );
            this.characterScheduledAttack = null;
            this.enemy.takeDamage(damage);

            this.damageDealt += damage;

            if (this.enemy.health <= 0) {
                return this.createCombatReport(true);
            }
        }

        if (this.enemy.cooldown <= 0 && this.enemyScheduledAttack) {
            const damage = Math.min(
                this.character.health,
                Math.max(1, this.calculateDamage(this.enemy, this.enemyScheduledAttack, this.character)),
            );
            this.enemyScheduledAttack = null;

            this.character.takeDamage(damage);
            this.damageTaken += damage;

            if (this.character.health <= 0) {
                return this.createCombatReport(false);
            }
        }

        if (this.characterScheduledAttack == null) {
            this.characterScheduledAttack = this.character.attack();
        }
        if (this.enemyScheduledAttack == null) {
            this.enemyScheduledAttack = this.enemy.attack();
        }

        return null;
    }

    calculateDamage(attacker: Fightable, attack: Attack, defender: Fightable): number {
        // const isDodged = booleanWithProbability(defender.dodgeChance)
        // if (isDodged) {
        //     return 0;
        // }
        // const isCritical = booleanWithProbability(attacker.criticalChance);
        const attackType = attack.weaponType;
        const attackStat = attacker.getAttackValue(attackType);
        const defenseStat = defender.getDefenseValue(attackType);

        const baseDamage = (attackStat * 100) / (100 + defenseStat);
        return Math.floor(baseDamage);
        // return Math.ceil(baseDamage * (isCritical ? 2 : 1));
    }

    private createCombatReport(playerWon: boolean): CombatReport {
        return {
            playerWon: playerWon,
            enemy: this.enemy,
            damageDealt: this.damageDealt,
            damageTaken: this.damageTaken,
        };
    }
}
