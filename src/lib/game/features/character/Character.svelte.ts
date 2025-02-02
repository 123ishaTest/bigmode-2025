import { IgtFeature } from '$lib/game/IgtFeature';
import type { IgtFeatures } from '$lib/game/IgtFeatures';
import { type ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';
import type { WorldLocationId } from '$lib/content/WorldLocationId';
import type { RoadId } from '$lib/content/RoadId';
import type { World } from '$lib/game/features/world/World.svelte';
import { Combat } from '$lib/game/tools/combat/Combat';
import { Enemy } from '$lib/game/features/bestiary/Enemy.svelte';
import type { Bestiary } from '$lib/game/features/bestiary/Bestiary.svelte';
import { Attack } from '$lib/game/tools/combat/Attack';
import { WeaponType } from '$lib/game/tools/combat/WeaponType';
import type { Fightable } from '$lib/game/tools/combat/Fightable';
import type { RunStats } from '$lib/game/features/powers/RunStats';
import type { Powers } from '$lib/game/features/powers/Powers.svelte';
import { PowerType } from '$lib/game/features/powers/PowerType';
import type { RoadObstacle } from '$lib/game/features/world/RoadObstacle';
import type { KeyItems } from '$lib/game/features/keyitems/KeyItems.svelte';
import type { CharacterSaveData } from '$lib/game/features/character/CharacterSaveData';

export interface TravelAction {
    roadId: RoadId;
    reverse: boolean;
}

export class Character extends IgtFeature implements Fightable {
    private _bestiary!: Bestiary;
    private _worldMap!: World;
    private _powers!: Powers;
    private _keyItems!: KeyItems;

    public runCount = 0;
    public gameStart = 0;

    runStats: Omit<RunStats, 'killer'> = $state({
        damageDealt: 0,
        damageTaken: 0,
        monstersDefeated: 0,
        locationsVisited: [],
    });

    roadProgress: number = $state(0);
    roadObstaclesCompleted: number = $state(0);
    currentObstacle: Combat | null = $state(null);
    actionQueue: TravelAction[] = $state([]);

    // Combat
    level: number = 0;
    maxHealth: number = $state(0);
    health: number = $state(0);
    maxCooldown: number = $state(0);
    cooldown: number = $state(0);
    meleeAttack: number = $state(0);
    meleeDefense: number = $state(0);
    travelSpeed: number = $state(0);
    combatSpeed: number = $state(0);

    public constructor() {
        super('character');
    }

    initialize(features: IgtFeatures): void {
        this._worldMap = features.world;
        this._bestiary = features.bestiary;
        this._powers = features.powers;
        this._keyItems = features.keyItems;
    }

    public startRun(): void {
        this.runStats = {
            damageDealt: 0,
            damageTaken: 0,
            monstersDefeated: 0,
            locationsVisited: [],
        };
        this.meleeAttack = 2 * this._powers.getMultiplier(PowerType.Attack);
        if (this._keyItems.hasKeyItem('torch')) {
            this.meleeAttack *= 2;
        }
        if (this._keyItems.hasKeyItem('pickaxe')) {
            this.meleeAttack *= 3;
        }
        this.meleeDefense = 2 * this._powers.getMultiplier(PowerType.Defense);
        if (this._keyItems.hasKeyItem('wooden-shield')) {
            this.meleeDefense *= 2;
        }
        this.maxHealth = 10 * this._powers.getMultiplier(PowerType.Health);
        if (this._keyItems.hasKeyItem('eternal-water')) {
            this.health *= 2;
        }
        if (this._keyItems.hasKeyItem('ruby-necklace')) {
            this.health *= 2;
        }
        this.travelSpeed = this._powers.getMultiplier(PowerType.TravelSpeed);
        if (this._keyItems.hasKeyItem('boots-of-lightness')) {
            this.travelSpeed *= 1.5;
        }
        this.combatSpeed = this._powers.getMultiplier(PowerType.CombatSpeed);
        if (this._keyItems.hasKeyItem('silver-tiara')) {
            this.combatSpeed *= 1.5;
        }
        if (this._keyItems.hasKeyItem('lantern')) {
            this.combatSpeed *= 1.75;
        }
        this.health = this.maxHealth;
    }

    public endRun(): void {
        this.actionQueue = [];
        this.currentObstacle = null;
        this.roadObstaclesCompleted = 0;
        this.roadProgress = 0;
        this._worldMap.setCurrentLocation('/home');
        this.runCount++;
        // TODO(@Isha): Do this here or wait on user input?
        this.startRun();
    }

    update(delta: number): void {
        if (this.actionQueue.length === 0) {
            return;
        }

        if (this.currentObstacle != null) {
            const report = this.currentObstacle.tick(delta * this.combatSpeed);

            if (report != null) {
                this.currentObstacle = null;
                this.roadObstaclesCompleted += 1;
                this.runStats.damageTaken += report.damageTaken;
                this.runStats.damageDealt += report.damageDealt;

                if (report.playerWon) {
                    this.runStats.monstersDefeated++;
                    this._onEnemyDefeated.dispatch(report.enemy);
                } else {
                    this.die(report.enemy);
                }
            }
            return;
        }

        this.roadProgress += delta * this.travelSpeed;

        const roadId = this.actionQueue[0].roadId;
        const road = this._worldMap.getRoad(roadId);

        // What even is logic anymore?
        const reverse = this.actionQueue[0].reverse;

        let obstacles = road.obstacles.map((o) => {
            return {
                obstacle: o.obstacle,
                distance: reverse ? road.duration - o.distance - 1 : o.distance,
            };
        });

        if (reverse) {
            obstacles = obstacles.toReversed();
        }

        if (
            this.roadObstaclesCompleted < obstacles.length &&
            this.roadProgress >= obstacles[this.roadObstaclesCompleted].distance
        ) {
            this.roadProgress = obstacles[this.roadObstaclesCompleted].distance;
            this.startObstacle(obstacles[this.roadObstaclesCompleted]);
        }

        if (this.roadProgress >= road.duration) {
            this.completeAction();
        }
    }

    public startObstacle(obstacle: RoadObstacle): void {
        const monster = this._bestiary.getMonster(obstacle.obstacle.monster);
        const enemy = new Enemy(obstacle.obstacle.level, monster);

        this.currentObstacle = new Combat(this, enemy);
    }

    attack(): Attack {
        const attack = new Attack('Punch', WeaponType.Melee, 2.5);
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

    die(killer: Enemy | undefined = undefined): void {
        this._onDeath.dispatch({
            ...this.runStats,
            killer: killer,
        });
        this.endRun();
    }

    private _onDeath = new SimpleEventDispatcher<RunStats>();

    public get onDeath(): ISimpleEvent<RunStats> {
        return this._onDeath.asEvent();
    }

    private _onEnemyDefeated = new SimpleEventDispatcher<Enemy>();

    public get onEnemyDefeated(): ISimpleEvent<Enemy> {
        return this._onEnemyDefeated.asEvent();
    }

    completeAction(): void {
        this.currentObstacle = null;
        this.roadObstaclesCompleted = 0;
        this.roadProgress = 0;

        const action = this.actionQueue[0];
        const road = this._worldMap.getRoad(action.roadId);
        const destination = action.reverse ? road.from : road.to;
        this._worldMap.setCurrentLocation(destination);

        this.runStats.locationsVisited.push(destination);

        this.removeFirstAction();
    }

    public getLocationAtEndOfQueue(): WorldLocationId {
        if (this.actionQueue.length > 0) {
            const action = this.actionQueue[this.actionQueue.length - 1];
            const road = this._worldMap.getRoad(action.roadId);
            return action.reverse ? road.from : road.to;
        }
        return this._worldMap.playerLocation;
    }

    public cancelAction(index: number) {
        const action = this.actionQueue[index];

        if (action == null) {
            console.error(`Could not find and cancel action at index ${index}`);
            return;
        }
        this.actionQueue.length = index;
    }

    public addRoad(roadId: RoadId, reverse: boolean): void {
        this.actionQueue.push({
            roadId: roadId,
            reverse: reverse,
        });
    }

    removeFirstAction() {
        this.actionQueue.shift();
    }

    load(data: CharacterSaveData): void {
        this.runCount = data?.runCount ?? 0;
        this.gameStart = data?.gameStart ?? Date.now();
    }

    save(): CharacterSaveData {
        return {
            runCount: this.runCount,
            gameStart: this.gameStart,
        };
    }

    isOnRoad() {
        return this.actionQueue.length > 0;
    }

    isAtObstacle(): boolean {
        return this.currentObstacle != null;
    }

    getCurrentRoadAction() {
        if (!this.isOnRoad()) {
            return null;
        }
        return this.actionQueue[0];
    }
}
