
export type PlatformType = "Corepoint" | "Envisirad" | "Ssms"

export interface Reminder{
    id?: number;
    title: string;
    description: string;
    platform: PlatformType;
    created_on?: Date;
    severity: number;
}