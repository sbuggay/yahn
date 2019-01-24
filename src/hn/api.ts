export const apiUrl = "https://hacker-news.firebaseio.com";
export const apiVersion = "v0";
export const apiEndpoint = `${apiUrl}/${apiVersion}`;

export async function getTopStories(): Promise<number[]> {
    return fetch(`${apiEndpoint}/topstories.json`).then(res => res.json());
}

export async function getItem(id: number) {
    return fetch(`${apiEndpoint}/item/${id}.json`).then(res => res.json());
}