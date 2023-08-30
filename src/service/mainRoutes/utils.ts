export const formatData = (url: string, method: string, params: any, env?: string) => {
	const data = {
		url: import.meta.env[env || 'VITE_NODE_URL'] + url,
		type: "json",
		method,
	} as any
	if (method === 'get') {
		data.params = params;
	} else {
		data.data = params;
	}
	return data;
};