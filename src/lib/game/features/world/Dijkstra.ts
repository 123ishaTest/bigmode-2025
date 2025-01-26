import type { Road } from '$lib/game/features/world/Road';
import type { WorldLocationId } from '$lib/content/WorldLocationId';

export class Dijkstra {
    vertices: WorldLocationId[];
    roads: Road[];

    constructor(roads: Road[]) {
        this.roads = roads;
        this.vertices = [];
        this.roads.forEach((road) => {
            if (!this.vertices.includes(road.from)) {
                this.vertices.push(road.from);
            }
            if (!this.vertices.includes(road.to)) {
                this.vertices.push(road.to);
            }
        });
    }

    solve(source: WorldLocationId, target: WorldLocationId, withRequirements: boolean): Road[] | null {
        let Q: WorldLocationId[] = [];
        const distance: Record<WorldLocationId, number> = {} as Record<WorldLocationId, number>;
        const previous: Record<WorldLocationId, Road | null> = {} as Record<WorldLocationId, Road | null>;

        this.vertices.forEach((vertex) => {
            distance[vertex] = Infinity;
            previous[vertex] = null;
            Q.push(vertex);
        });

        distance[source] = 0;

        while (Q.length > 0) {
            let minDist = Infinity;
            let u: WorldLocationId = Q[0];
            Q.forEach((vertex) => {
                if (distance[vertex] < minDist) {
                    minDist = distance[vertex];
                    u = vertex;
                }
            });
            if (u == null) {
                console.log('wrong');
                return null;
            }

            Q = Q.filter((identifier) => {
                return !(identifier === u);
            });

            const neighbourRoads = this.getNeighbourRoads(u, withRequirements);

            neighbourRoads.forEach((road) => {
                const v = road.from === u ? road.to : road.from;
                const newLength = distance[u] + road.duration;
                if (newLength < distance[v]) {
                    distance[v] = newLength;
                    previous[v] = road;
                }
            });
        }
        if (distance[target] === Infinity) {
            return null;
        }

        const path = [];
        let end = target;
        while (end) {
            const road = previous[end];
            if (!road) {
                break;
            }

            path.push(road);
            end = road.from === end ? road.to : road.from;
        }
        return path.reverse();
    }

    getNeighbourRoads(location: WorldLocationId, withRequirements: boolean): Road[] {
        const res: Road[] = [];
        this.roads
            .filter((_road) => {
                // TODO(@Isha): Requirements?
                // return withRequirements ? road.requirement.isCompleted : true;
                return true;
            })
            .forEach((road) => {
                if (road.from === location || (road.to === location && !res.includes(road))) {
                    res.push(road);
                }
            });
        return res;
    }
}
