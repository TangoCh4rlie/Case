import type { Case } from "$lib/types/case";

export function remplirDatesManquantesSemaine(cases: Case[]): Case[] {
    const nbCases = new Date().getDay();
    const finalData = new Array(nbCases === 0 ? 7 : nbCases).fill(null);

    console.log({cases});
    

    cases.forEach((c) => {
        if (c.date.getDay() === undefined || c.date.getDay() === 0)
            finalData[6] = c;
        else
            finalData[c.date.getDay() - 1] = c;
    });

    let i = 0;
    finalData.forEach((c) => {
        if (c === null) {
            const date = new Date();
            const diff: number = (date.getDay() + 6) % 7 - i;
            date.setDate(date.getDate() - diff)
            finalData[i] = {
                id: '',
                date: date,
                description: ``,
                color: "default",
                place: null,
                photo: [],
                people: [],
                tag: [],
                userId: ''
            };
        }
        i++;
    });

    console.log({finalData});
    
    return finalData;
    
}