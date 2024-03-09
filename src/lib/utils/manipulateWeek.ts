import type { Case } from "$lib/types/case";
import moment from "moment";

export function remplirDatesManquantesSemainePrecedente(cases: Case[], dateParam: Date): Case[] {
    const finalData = new Array(7).fill(null);
    const date = moment(dateParam).startOf('week').add(1, 'day')

    cases.forEach((c) => {
        if (c.date.getDay() === 0)
            finalData[6] = c;
        else
            finalData[c.date.getDay() - 1] = c;
    });


    finalData.forEach((c) => {
        if (c === null) {
            finalData[finalData.indexOf(c)] = {
                id: '',
                date: date.toDate(),
                description: ``,
                color: "default",
                place: null,
                photo: [],
                people: [],
                tag: [],
                userId: ''
            };
        }
        date.add(1, 'day');
    });

    return finalData;
}