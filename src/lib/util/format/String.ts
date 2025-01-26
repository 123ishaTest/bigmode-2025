export const toCapitalizedWords = (name: string) => {
    const words = name.match(/[A-Za-z][a-z]*/g) || [];

    return words.map(capitalize).join(' ');
};

export const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.substring(1);
};
