import { IgtFeature } from '$lib/game/IgtFeature';
import type { SaveData } from '$lib/game/tools/saving/SaveData';
import type { WorldLocation } from '$lib/game/features/world/WorldLocation';
import type { Road } from '$lib/game/features/world/Road';
import { type RoadId } from '$lib/content/RoadId';
import type { IgtFeatures } from '$lib/game/IgtFeatures';
import type { Character } from '$lib/game/features/character/Character.svelte';
import { Dijkstra } from '$lib/game/features/world/Dijkstra';
import type { WorldLocationId } from '$lib/content/WorldLocationId';

export class World extends IgtFeature {
    locations: WorldLocation[];
    roads: Road[];

    playerLocation: WorldLocationId = $state('/home');
    private _character!: Character;

    constructor(locations: WorldLocation[], roads: Road[]) {
        super('world');
        this.locations = locations;
        this.roads = roads;
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
        if (path == null || path.length === 0) {
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
