import { API_URL } from '$env/static/public';
import { type Item } from '$lib/entities/Item';
import type { ItemFormFields } from '$lib/entities/ItemFormFields';
import getAccessToken from './getAccessToken';

export type RepoItem = Omit<Item, 'boughtAt' | 'openedAt' | 'expiresAt'> & {
	boughtAt: string;
	openedAt: null | string;
	expiresAt: null | string;
};

class ItemsRepo {
	static toItem(i: RepoItem): Item {
		return {
			...i,
			boughtAt: new Date(i.boughtAt),
			openedAt: i.openedAt ? new Date(i.openedAt) : null,
			expiresAt: i.expiresAt ? new Date(i.expiresAt) : null
		};
	}

	static async create(fields: ItemFormFields): Promise<void> {
		const accessToken = await getAccessToken();
		const res = await fetch(`${API_URL}/items`, {
			method: 'POST',
			headers: { Authorization: `Bearer ${accessToken}` },
			body: JSON.stringify(fields)
		});
		if (!res.ok) throw new Error(res.statusText);
	}

	static async update(id: string, fields: ItemFormFields): Promise<void> {
		const accessToken = await getAccessToken();
		const res = await fetch(`${API_URL}/items/${id}`, {
			method: 'PUT',
			headers: { Authorization: `Bearer ${accessToken}` },
			body: JSON.stringify(fields)
		});
		if (!res.ok) throw new Error(res.statusText);
	}

	static async move(id: string, locationId: string | null): Promise<void> {
		const accessToken = await getAccessToken();
		const res = await fetch(`${API_URL}/items/${id}/location`, {
			method: 'PATCH',
			headers: { Authorization: `Bearer ${accessToken}` },
			body: JSON.stringify({ locationId })
		});
		if (!res.ok) throw new Error(res.statusText);
	}

	static async remove(id: string): Promise<void> {
		const accessToken = await getAccessToken();
		const res = await fetch(`${API_URL}/items/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${accessToken}` }
		});
		if (!res.ok) throw new Error(res.statusText);
	}
}

export default ItemsRepo;
