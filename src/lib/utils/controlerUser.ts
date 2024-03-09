export const changeUserInfo = async (name: string, email: string) => {
    await fetch(import.meta.env.VITE_URL + '/api/user', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Accept'
        },
        body: JSON.stringify({
            name,
            email
        })
    });
}