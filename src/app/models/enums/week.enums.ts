export enum Week {
    'SUNDAY' = 0,
    'MONDAY' = 1,
    'TUESDAY' = 2,
    'WEDNESDAY' = 3,
    'THURSDAY' = 4,
    'FRIDAY' = 5,
    'SATURDAY' = 6
}

export function WeekToList(): Week[] {
    return [Week.SUNDAY, Week.MONDAY, Week.TUESDAY, Week.WEDNESDAY, Week.THURSDAY, Week.FRIDAY, Week.SATURDAY];
}

export function WeekToListName(): string[] {
    return ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
}