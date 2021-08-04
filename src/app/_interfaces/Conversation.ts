export interface conversation {
    uid: string;
    timestamp: number;
    text: string;
    receiver: string;
    sender?: string;
}