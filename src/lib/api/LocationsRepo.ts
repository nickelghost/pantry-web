import { API_URL } from '$env/static/public';
import { type Item } from '$lib/entities/Item';
import { type Location } from '$lib/entities/Location';
import ItemsRepo, { type RepoItem } from './ItemsRepo';
import getAccessToken from './getAccessToken';

type RepoLocation = Omit<Location, 'items'> & { items: RepoItem[] };

export default class LocationsRepo {
	static toLocation(l: RepoLocation): Location {
		return {
			...l,
			items: l.items && l.items.map((i) => ItemsRepo.toItem(i))
		};
	}

	static async index(): Promise<{ locations: Location[]; remainingItems: Item[] }> {
		const accessToken = await getAccessToken();

		const res = await fetch(`${API_URL}/locations`, {
			headers: { Authorization: `Bearer ${accessToken}` }
		});
		if (!res.ok) throw new Error(res.statusText);

		const json: { locations: RepoLocation[]; remainingItems: RepoItem[] } = await res.json();

		return {
			locations: json.locations.map((l: RepoLocation) => LocationsRepo.toLocation(l)),
			remainingItems: json.remainingItems.map((i: RepoItem) => ItemsRepo.toItem(i))
		};
	}

	static async create(name: string): Promise<void> {
		const accessToken = await getAccessToken();

		const res = await fetch(`${API_URL}/locations`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify({ name })
		});
		if (!res.ok) throw new Error(res.statusText);
	}

	static async update(id: string, name: string): Promise<void> {
		const accessToken = await getAccessToken();

		const res = await fetch(`${API_URL}/locations/${id}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify({ name })
		});
		if (!res.ok) throw new Error(res.statusText);
	}

	static async remove(id: string): Promise<void> {
		const accessToken = await getAccessToken();

		const res = await fetch(`${API_URL}/locations/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${accessToken}` }
		});
		if (!res.ok) throw new Error(res.statusText);
	}
}
