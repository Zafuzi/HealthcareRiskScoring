import { Suspense } from "react";
import { Patient } from "../lib";
import { API_HEADERS, API_RESPONSE } from "../server";
import PatientList from "../components/patientList";

const getPatients = async (): Promise<Patient[]> => {
	return await fetch("https://assessment.ksensetech.com/api/patients", {
		method: "GET",
		headers: API_HEADERS,
	})
		.then(async (result) => {
			if (!result.ok) {
				throw new Error("Failed to reach API: " + result.statusText);
			}

			let json: API_RESPONSE;

			json = await result.json();

			if (!json?.metadata?.version) {
				throw new Error("Failed to validate API version");
			}

			if (!json?.data?.length) {
				throw new Error("No response from API");
			}

			return json?.data;
		})
		.catch((e) => {
			console.error(e);
			return [];
		});
};

export default async function Page() {
	const patients = getPatients();

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<PatientList patients={patients} />
		</Suspense>
	);
}
