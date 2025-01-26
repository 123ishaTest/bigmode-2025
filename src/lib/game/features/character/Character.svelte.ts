import { IgtFeature } from '$lib/game/IgtFeature';
import type { IgtFeatures } from '$lib/game/IgtFeatures';
import type { SaveData } from '$lib/game/tools/saving/SaveData';
import type { Road } from '$lib/game/features/world/Road';
import { type ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';
import type { WorldLocationId } from '$lib/content/WorldLocationId';
import type { RoadId } from '$lib/content/RoadId';
import type { World } from '$lib/game/features/world/World.svelte';
import { Combat } from '$lib/game/tools/combat/Combat';
import type { RoadObstacle } from '$lib/game/features/world/RoadObstacle';
import { Enemy } from '$lib/game/features/bestiary/Enemy.svelte';
import type { Bestiary } from '$lib/game/features/bestiary/Bestiary';
import { Attack } from '$lib/game/tools/combat/Attack';
import { WeaponType } from '$lib/game/tools/combat/WeaponType';
import type { Fightable } from '$lib/game/tools/combat/Fightable';

export interface TravelAction {
    roadId: RoadId;
    reverse: boolean;
}

export class Character extends IgtFeature implements Fightable {
    private _bestiary!: Bestiary;
    private _worldMap!: World;

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
    isAlive: boolean = $state(false);

    public constructor() {
        super('character');
        // TODO(@Isha): Get stats from somewhere
        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.meleeAttack = 3;
        this.meleeDefense = 3;
    }

    initialize(features: IgtFeatures): void {
        this._worldMap = features.world;
        this._bestiary = features.bestiary;
        // throw new Error('Method not implemented.');
    }

    update(delta: number): void {
        if (this.actionQueue.length === 0) {
            return;
        }

        if (this.currentObstacle != null) {
            this.currentObstacle.tick(delta);

            if (!this.currentObstacle.isActive) {
                // TODO(@Isha): Obstacle completed
                console.log('obstacle completed');
                this.currentObstacle = null;
                this.roadObstaclesCompleted += 1;
            }
            return;
        }

        this.roadProgress += delta;

        const roadId = this.actionQueue[0].roadId;
        const road = this._worldMap.getRoad(roadId);
        // TODO(@Isha): Fix by "spawning" obstacles one by one

        if (
            this.roadObstaclesCompleted < road.obstacles.length &&
            this.roadProgress >= road.obstacles[this.roadObstaclesCompleted].distance
        ) {
            this.startObstacle(road.obstacles[this.roadObstaclesCompleted]);
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
        const attack = new Attack('Punch', WeaponType.Melee, 2, 2, 4);
        this.maxCooldown = attack.cooldown;
        this.cooldown = this.maxCooldown;
        return attack;
    }

    takeDamage(damage: number): void {
        this.health -= Math.floor(damage);
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

    die(): void {
        this.isAlive = false;
    }

    completeAction(): void {
        // TODO(@Isha): Reward

        this.currentObstacle = null;
        this.roadObstaclesCompleted = 0;
        this.roadProgress = 0;
        const action = this.actionQueue[0];
        const road = this._worldMap.getRoad(action.roadId);
        const destination = action.reverse ? road.from : road.to;
        this._worldMap.setCurrentLocation(destination);
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
        // TODO(@Isha): Check if correct
        this.actionQueue.push({
            roadId: roadId,
            reverse: reverse,
        });
    }

    removeFirstAction() {
        this.actionQueue.shift();
    }

    load(data: SaveData): void {
        // throw new Error('Method not implemented.');
    }

    save(): SaveData {
        // throw new Error('Method not implemented.');
    }

    private _onRoadCompletion = new SimpleEventDispatcher<Road>();

    public get onRoadCompletion(): ISimpleEvent<Road> {
        return this._onRoadCompletion.asEvent();
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
