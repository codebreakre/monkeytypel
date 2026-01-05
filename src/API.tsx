

export async function fetchWords() {
    const res = await fetch("https://random-word-api.vercel.app/api?words=100");
    if(!res.ok) {
        throw new Error("failed to fetch the data");
    }
    return await res.json();
}