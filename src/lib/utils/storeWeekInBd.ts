import type { PageData } from "../../routes/profile/$types";

export const storeDataInBd = async (data: PageData, url: string) => {
    const res = await fetch(url + '/api/week', {
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
    const json = await res.json();
    console.log(json);
};