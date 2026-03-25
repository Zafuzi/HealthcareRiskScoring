import { Pagination, Patient } from "./lib";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
	throw new Error("Cannot proceed without setting API_KEY");
}

export const API_HEADERS = new Headers();
API_HEADERS.append("x-api-key", API_KEY);

export type API_RESPONSE = {
	data: Patient[];
	pagination: Pagination;
	metadata: {
		timestamp: string;
		version: string;
		requestId: string;
	};
};
