export const transpose = <T>(array: T[][]): T[][] => {
    const maxLength = Math.max(...array.map((a) => a.length));
    return new Array(maxLength).fill(0).map((_, colIndex) => array.map((row) => row[colIndex]));
};
