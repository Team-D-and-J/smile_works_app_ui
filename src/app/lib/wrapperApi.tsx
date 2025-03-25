
/* eslint-disable @typescript-eslint/no-explicit-any */

const BACKEND = process.env.PORT || "http://localhost:4000/api";
console.log(BACKEND);
interface GetOptions {
	sort?: any;
	select?: string;
	page?: number;
	limit?: number;
	filter?: any;
	params?: Record<string, string>;
}

function convertQueryToParams(query: GetOptions): string {
	const urlParams = new URLSearchParams();
	if (!query) {
		query = {};
	}
	if (query.page) {
		urlParams.set('page', query.page.toString());
	}
	if (query.limit) {
		urlParams.set('limit', query.limit.toString());
	}
	if (query.select) {
		urlParams.set('select', query.select);
	}
	if (query.sort) {
		urlParams.set('sort', JSON.stringify(query.sort));
	}
	if (query.filter) {
		urlParams.set('filter', JSON.stringify(query.filter));
	}
	if (query.params) {
		Object.entries(query.params).forEach(([key, value]) => {
			urlParams.set(key, value);
		});
	return urlParams.toString();
}
}

function getHeader(){
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	const token = localStorage.getItem("token");
	if (token) {
        headers.append("Authorization", `Bearer ${token}`);
    } else {
        console.warn("No authentication token found.");
    }
	return headers;
}

export async function postAPI(api: string, data: any): Promise<any> {
	const response = await fetch(`${BACKEND}${api}`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: getHeader()
	});
	return response.json();
}

export async function getAPI(api: string, query: GetOptions): Promise<any> {
	const endpoint = `${BACKEND}${api}?${convertQueryToParams(query)}`;
	const response = await fetch(endpoint, {
		method: "GET",
		headers: getHeader()
	});
	return response.json();
}

export async function putAPI(api: string, data: any): Promise<any> {
	const response = await fetch(`${BACKEND}${api}`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: getHeader()
	});
	return response.json();
}

export async function deleteAPI(api: string): Promise<any> {
	const response = await fetch(`${BACKEND}${api}`, {
		method: 'DELETE',
		headers: getHeader()
	});
	return response;
}

export async function getAppointmentsCountByWeek(date: string): Promise<any> {
	return getAPI("/appointment/utils/appointments-count-by-week", { params: { date } });
}

export async function getAppointmentsToday(date: string): Promise<any> {
	return getAPI("/appointment/utils/appointments-count-today", { params: { date } });
}