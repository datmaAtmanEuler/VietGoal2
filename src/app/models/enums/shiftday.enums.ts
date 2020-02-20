export enum ShiftDay {
    'MORNING' = 1,
    'AFTERNOON' = 2,
    'EVENING' = 3
}

export function ShiftDayToList(): ShiftDay[] {
    return [ShiftDay.MORNING, ShiftDay.AFTERNOON, ShiftDay.EVENING];
}

export function ShiftDayToListName(): string[] {
    return ['MORNING', 'AFTERNOON', 'EVENING'];
}