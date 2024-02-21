
export interface StartTime{
    id?: number;
    timestamp: Date;
}

export interface EndTime{
    id?: number;
    timestamp: Date;
}

export interface BreakTime{
    id?: number;
    in_stamp: Date;
    out_stamp?: Date;
}

export interface DailyTime{
    id?: number;
    startTime: StartTime,
    endTime: EndTime,
    breaks?: BreakTime[]
}