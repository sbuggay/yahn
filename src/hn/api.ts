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

		// on any list, just try and restore from cache
		// const cachedList = localStorage.getItem("listCache");
		// if (cachedList) {
		// 	const parsedCachedList = JSON.parse(cachedList);
		// 	if (Date.now() < parsedCachedList.expiry && parsedCachedList[type]) {
		// 		return Promise.resolve(parsedCachedList[type]);
		// 	}
		// }

		const res = await apiRequest(type);

		// If this is our first list, resolve it then go ahead and pre-cache everything else.
		if (Object.keys(listCache).length === 0) {
			listTypes.forEach(list => {
				if (list === type) return; // already getting this
				HNAPI.getList(list);
			});
		}

		listCache[type] = res;

		// localStorage.setItem("listCache", JSON.stringify({
		// 	listCache,
		// 	expiry: Date.now() + 300000 // 5 min in future
		// }));

		return res;
	}

	static async getItem(id: number): Promise<IItem> {
		if (itemCache[id]) {
			return Promise.resolve(itemCache[id]);
		}

		// const cachedItem = localStorage.getItem(id.toString());
		// if (cachedItem) {
		// 	const parsedItem = JSON.parse(cachedItem);
		// 	if (Date.now() < parsedItem.expiry && parsedItem.item) {
		// 		return Promise.resolve(parsedItem.item);
		// 	}
		// }

		const res = await apiRequest(`item/${id}`);

		itemCache[id] = res;

		// localStorage.setItem(id.toString(), JSON.stringify({
		// 	item: res,
		// 	expiry: Date.now() + 300000 // 5 min in future
		// }));

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