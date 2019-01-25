import { IItem } from "./interfaces";

export const apiUrl = "https://hacker-news.firebaseio.com";
export const apiVersion = "v0";
export const apiEndpoint = `${apiUrl}/${apiVersion}`;

const cache: { [id: number]: IItem } = {};

export class HNAPI {
	static getTopStories(): Promise<number[]> {
		return apiRequest("topstories");
	}

	static getNewStories(): Promise<number[]> {
		return apiRequest("newstories");
	}

	static getBestStories(): Promise<number[]> {
		return apiRequest("beststories");
	}

	static async getItem(id: number): Promise<IItem> {
		if (cache[id]) {
			return Promise.resolve(cache[id]);
		}

		const res = await apiRequest(`item/${id}`);
		cache[id] = res;
		return res;
	}

	static getMaxItem(): Promise<number> {
		return apiRequest("maxitem");
	}
}

async function apiRequest(request: string): Promise<any> {
	return fetch(`${apiEndpoint}/${request}.json`).then(res => res.json());
}