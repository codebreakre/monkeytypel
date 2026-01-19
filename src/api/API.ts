export async function fetchWords(wordNumber:number): Promise<string[]> {
  const res = await fetch(`https://random-word-api.vercel.app/api?words=${wordNumber}`);
  if (!res.ok) {
    throw new Error("failed to fetch the data");
  }
  return await res.json();
}
