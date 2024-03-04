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
    console.log(date.toISOString());
    
    const res = await fetch(import.meta.env.VITE_URL + `/api/week/${date.toISOString()}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Accept',
        },
    });
    const data = await res.json();
    return data.cases;
}