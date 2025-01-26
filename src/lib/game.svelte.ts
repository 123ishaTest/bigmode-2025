import { IgtGame } from '$lib/game/IgtGame';
import { CurrencyType } from '$lib/game/features/wallet/CurrencyType';
import { IgtWallet } from '$lib/game/features/wallet/IgtWallet';
import { World } from '$lib/game/features/world/World.svelte';
import { Character } from '$lib/game/features/character/Character.svelte';
import { Bestiary } from '$lib/game/features/bestiary/Bestiary';

export const game = new IgtGame({
    character: new Character(),
    world: new World(),
    bestiary: new Bestiary(),
    wallet: new IgtWallet([CurrencyType.Gold, CurrencyType.Ore, CurrencyType.Bark]),
});

game.initialize();
game.start();
