/**
 * Return a random integer between min (inclusive) and max (exclusive)
 * @param min inclusive
 * @param max exclusive
 */
export function intBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export function booleanWithProbability(percentage: number): boolean {
    return Math.random() < percentage;
}

/**
 * Return a random float between min (inclusive) and max (exclusive)
 * @param min inclusive
 * @param max exclusive
 */
export function floatBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function arrayIndex<T>(array: T[]): number {
    return intBetween(0, array.length);
}

export function fromArray<T>(array: T[]): T {
    return array[arrayIndex(array)];
}
