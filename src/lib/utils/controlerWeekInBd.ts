import type { Case } from "$lib/types/case";
import type { PageData } from "../../routes/profile/$types";
// import { url } from "../server/url";

export const storeDataInBd = async (data: PageData) => {
    await fetch(import.meta.env.VITE_URL + '/api/week', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Accept'
        },
        body: JSON.stringify({
            cases: data.cases,
            userId: data.user?.id
        })
    });
};

export const getWeek = async (date: Date): Promise<Case[]> => {

    const day: string = date.getDate().toString();
    const month: string = (date.getMonth() + 1) - 9 <= 0 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1).toString();
    const year: string = date.getFullYear().toString();
    const dateToString: string = `${year}-${month}-${day}`;

    const res = await fetch(import.meta.env.VITE_URL + `/api/week/${dateToString}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Accept',
        },
    });
    const data = await res.json();
    console.log(data);
    
    return data.cases;
}