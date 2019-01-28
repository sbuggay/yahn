import { IItem, IUser } from "./interfaces";
import { getMaxListeners } from "cluster";

export const apiUrl = "https://hacker-news.firebaseio.com";
export const apiVersion = "v0";
export const apiEndpoint = `${apiUrl}/${apiVersion}`;

const listCache: { [list: string]: number[] } = {}
const itemCache: { [id: number]: IItem } = {};

export enum EListTypes {
	topstories = "topstories",
	newstories = "newstories",
	beststories = "beststories",
	askstories = "askstories",
	showstories = "showstories",
	jobstories = "jobstories"
}

const listTypes = [
	EListTypes.topstories,
	EListTypes.newstories,
	EListTypes.beststories,
	EListTypes.askstories,
	EListTypes.showstories,
	EListTypes.jobstories
];

export class HNAPI {

	static async getList(type: EListTypes): Promise<number[]> {

		if (listCache[type]) {
			return Promise.resolve(listCache[type]);
		}

		const res = await apiRequest(type);

		// If this is our first list, resolve it then go ahead and pre-cache everything else.
		if (Object.keys(listCache).length === 0) {
			listTypes.forEach(list => {
				if (list === type) return; // already getting this
				HNAPI.getList(list);
			});
		}

		listCache[type] = res;
		return res;
	}

	static async getItem(id: number): Promise<IItem> {
		if (itemCache[id]) {
			return Promise.resolve(itemCache[id]);
		}

		const res = await apiRequest(`item/${id}`);
		itemCache[id] = res;
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