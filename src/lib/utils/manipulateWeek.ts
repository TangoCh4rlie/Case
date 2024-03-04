import type { Case } from "$lib/types/case";
import moment from "moment";

export function remplirDatesManquantesSemaineActuelle(cases: Case[]): Case[] {
    // Récupère numéro du jour dans la semaine
    const nbCases = new Date().getDay();
    // Crée un tableau de nbCases cases avec des valeurs null
    const finalData = new Array(nbCases === 0 ? 7 : nbCases).fill(null);

    // place les cases dans le tableau finalData au bon index
    cases.forEach((c) => {
        if (c.date.getDay() === 0)
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

    return finalData;
}

export function remplirDatesManquantesSemainePrecedente(cases: Case[], dateParam: Date): Case[] {
    const finalData = new Array(7).fill(null);
    const date = moment(dateParam)
    
    cases.forEach((c) => {
        if (c.date.getDay() === 0)
            finalData[6] = c;
        else
            finalData[c.date.getDay() - 1] = c;
    });


    let i = 0;
    finalData.forEach((c) => {
        if (c === null) {
            console.log("date", date);
            finalData[finalData.indexOf(c)] = {
                id: '',
                date: date.weekday(i).toDate(),
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

    console.log("finalData", finalData);

    return finalData;
    
}