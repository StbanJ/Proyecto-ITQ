export interface conversation {
    uid: string;
    timestamp: number;
    text: object;
    receiver: string;
    sender?: string;
}