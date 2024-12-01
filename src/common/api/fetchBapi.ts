import { notFound } from "next/navigation";
type FetchClientOptions = {
    revalidate: number
}
export async function fetchBapi <P = unknown> (
    url: string,
    options: FetchClientOptions = {revalidate: 10}
    ) {
        const {revalidate} = options;
        const resp = await fetch(url, {next: {revalidate}});

    if(!resp.ok && resp.status === 404) {
        throw notFound();
    }
    if(!resp.ok) {
        throw new Error('Problem z wykonaniem geta do bapi');
    }

    const post: P = await resp.json();
    return post;
}