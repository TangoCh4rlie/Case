import type { PageData } from "../../routes/dashboard/$types";

export const storeDataInBd = async (data: PageData) => {
    const response = await fetch(import.meta.env.VITE_URL + '/api/week', {
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
    console.log(response);
    
};