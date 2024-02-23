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

export const getWeek = async (date: Date) => {
    const res = await fetch(import.meta.env.VITE_URL + `/api/week?date=${date}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Accept',
            'Date': date.toLocaleDateString(),
        },
    });

    const json = await res.json();
    console.log(json);
}