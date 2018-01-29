export type Logger = (...args: any[]) => void

export function logger(prefix: string): Logger {
    return (...args: any[]): void => console.log(prefix, ...args);
}


export type TicketId = string;

export interface ITicket {
    id: TicketId;
}

export interface IError {
    type: string;
    title: string;
    status?: number;
    details?: string;
}

export interface IGameConfig {
    endpoint: string;
    headers: { [key: string]: string; };

    // for testing only. Enables xhr.withCredentials if set.
    withCredentials?: boolean
}

export interface IGameSettings {
    index: string;
    aspect: number;
    legacyGame: boolean;
}
