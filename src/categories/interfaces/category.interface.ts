import { Player } from "src/players/interfaces/player.interface";

export interface Category {
    readonly category: string;
    description: string;
    event: Array<Event>;
    players: Array<Player>;
}

export interface Event {
    name: string;
    operation: string;
    value: number;
}


