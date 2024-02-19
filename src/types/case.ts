type Case = {
    id: string;
    date: string;
    description: string;
    color: Color;
    place: string;
    photo: string[]
    people: string[]
    tag: string[]
    userId: string
}

enum Color {
    gray = "F0F0F0",
    red = "FF9B9B",
    green = "BEF388",
    blue = "B4F6FF",
    orange = "FFC37C",
    pruple = "CF93FF",
    darkblue = "AEB9FF",
    pink = "FF8CFA"
}