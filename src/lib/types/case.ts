export type Case = {
    id: string;
    date: Date;
    description: string;
    color: Color;
    place: string | null;
    photo: string[]
    people: string[]
    tag: string[]
    userId: string
}

export enum Color {
    waitng = "FADBCD",
    gray = "F0F0F0",
    red = "FF9B9B",
    green = "BEF388",
    blue = "B4F6FF",
    orange = "FFC37C",
    pruple = "CF93FF",
    darkblue = "AEB9FF",
    pink = "FF8CFA"
}