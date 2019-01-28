import { IItem, IUser } from "./interfaces";

export const apiUrl = "https://hacker-news.firebaseio.com";
export const apiVersion = "v0";
export const apiEndpoint = `${apiUrl}/${apiVersion}`;

const cache: { [id: number]: IItem } = {};

export enum EListTypes {
	topstories = "topstories",
	newstories = "newstories",
	beststories = "beststories",
	askstories = "askstories",
	showstories = "showstories",
	jobstories = "jobstories"
}

export class HNAPI {

	static getList(type: EListTypes): Promise<number[]> {
		return apiRequest(type);
	}

	static async getItem(id: number): Promise<IItem> {
		if (cache[id]) {
			return Promise.resolve(cache[id]);
		}

		const res = await apiRequest(`item/${id}`);
		cache[id] = res;
		return res;
	}

	static getUser(id: string): Promise<IUser> {
		return apiRequest(`user/${id}`)
	}

	static getMaxItem(): Promise<number> {
		return apiRequest("maxitem");
	}
}

async function apiRequest(request: string): Promise<any> {
	return fetch(`${apiEndpoint}/${request}.json`).then(res => res.json());
}