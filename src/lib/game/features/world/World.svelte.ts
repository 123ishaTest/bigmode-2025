import { IgtFeature } from '$lib/game/IgtFeature';
import type { SaveData } from '$lib/game/tools/saving/SaveData';
import type { WorldLocation } from '$lib/game/features/world/WorldLocation';
import { WorldLocationId } from '$lib/content/WorldLocationId';
import type { Road } from '$lib/game/features/world/Road';
import { RoadId } from '$lib/content/RoadId';
import { MonsterId } from '$lib/game/features/bestiary/MonsterId';
import type { IgtFeatures } from '$lib/game/IgtFeatures';
import type { Character } from '$lib/game/features/character/Character.svelte';
import { Dijkstra } from '$lib/game/features/world/Dijkstra';

export class World extends IgtFeature {
    locations: WorldLocation[] = [
        {
            id: WorldLocationId.House,
            name: 'House',
            description: 'A nice house',
            position: { x: 328 / 16, y: 168 / 16 },
        },
        { id: WorldLocationId.Pigs, name: 'Pigs', description: 'Oink oink', position: { x: 152 / 16, y: 56 / 16 } },
    ];

    roads: Road[] = [
        {
            id: RoadId.HouseToPigs,
            from: WorldLocationId.House,
            to: WorldLocationId.Pigs,
            obstacles: [
                { distance: 5, obstacle: { monster: MonsterId.Chicken, level: 1 } },
                { distance: 10, obstacle: { monster: MonsterId.Chicken, level: 1 } },
                { distance: 15, obstacle: { monster: MonsterId.Chicken, level: 2 } },
            ],
            duration: 20,
            position: {
                x: 328,
                y: 168,
            },
            path: [
                { x: 0, y: 16 },
                { x: -16, y: 16 },
                { x: -32, y: 16 },
                { x: -32, y: 32 },
                { x: -48, y: 32 },
                { x: -64, y: 32 },
                { x: -80, y: 32 },
                { x: -96, y: 32 },
                { x: -112, y: 32 },
                { x: -128, y: 32 },
                { x: -144, y: 32 },
                { x: -144, y: 16 },
                { x: -160, y: 16 },
                { x: -160, y: 0 },
                { x: -176, y: 0 },
                { x: -176, y: -16 },
                { x: -176, y: -32 },
                { x: -176, y: -48 },
            ],
        },
    ];

    playerLocation: WorldLocationId = $state(WorldLocationId.House);
    private _character!: Character;

    constructor() {
        super('world');
    }

    public getCurrentLocation(): WorldLocation {
        return this.getLocation(this.playerLocation);
    }

    setCurrentLocation(target: WorldLocationId) {
        this.playerLocation = target;
    }

    public getRoad(id: RoadId): Road {
        const road = this.roads.find((road) => road.id === id);
        if (!road) {
            throw new Error(`Road with id '${id}' not found.`);
        }
        return road;
    }

    public getLocation(id: WorldLocationId): WorldLocation {
        const location = this.locations.find((location) => location.id === id);
        if (!location) {
            throw new Error(`Location with id '${id}' not found.`);
        }
        return location;
    }

    public getPath(from: WorldLocationId, to: WorldLocationId, withRequirements: boolean = true): Road[] | null {
        const dijkstra = new Dijkstra(this.roads);
        return dijkstra.solve(from, to, withRequirements);
    }

    /**
     * Try to move from the player location to the target, returns true if possible
     * @param target to move to
     */
    moveToLocation(target: WorldLocationId): boolean {
        const startingLocation = this._character.getLocationAtEndOfQueue();

        if (startingLocation === target) {
            console.log(`You're already at ${target}`);
            return false;
        }

        const path = this.getPath(startingLocation, target, true);
        if (path == null) {
            console.log(`There is no road from ${startingLocation} to ${target}`);
            return false;
        }

        let lastSource = startingLocation;

        for (let i = 0; i < path.length; i++) {
            const road = path[i];
            const reverse = road.to === lastSource;
            this._character.addRoad(road.id, reverse);
            // TODO(@Isha): Potential bug
            lastSource = reverse ? road.to : road.from;
        }
        return true;
    }

    initialize(features: IgtFeatures) {
        this._character = features.character;
    }

    update(): void {
        // TODO(@Isha): Move the character here?
    }

    load(data: SaveData): void {}

    save(): SaveData {}
}
