
export interface ClockedTime{
    id?: number;
    hours: number;
    minutes: number;
    clock_type: string; // IN || OUT
    created_on?: Date;
}