"use client";

import { use, useState } from "react";
import { Patient } from "../lib";
import { useRouter } from "next/navigation";

export default function PatientList({
	patients,
}: {
	patients: Promise<Patient[]>;
}) {
	const MAX_RETRIES = 5;
	const RETRY_DELAY = 500;

	const [retrying, setRetrying] = useState<any>(null);
	const [retries, setRetries] = useState(0);

	const router = useRouter();

	const allPatients = use(patients);

	// TODO verify data;
	const patientList = allPatients.map((patient: Patient) => (
		<tr key={patient.patient_id}>
			<td>{patient.patient_id}</td>
			<td>{patient.name}</td>
			<td>{patient.age}</td>
			<td>{patient.gender}</td>
			<td>{patient.blood_pressure}</td>
			<td>{patient.diagnosis}</td>
			<td>{patient.medications}</td>
			<td>{patient.temperature}</td>
			<td>{patient.visit_date}</td>
		</tr>
	));

	if (!patientList.length) {
		if (retries >= MAX_RETRIES) {
			return <div>Servers are busy, try again later.</div>;
		}

		if (!retrying) {
			setRetries(retries + 1);
			setRetrying(
				setTimeout(() => {
					router.refresh();
					setRetrying(null);
				}, RETRY_DELAY),
			);
		}

		return <div>Loading...</div>;
	}

	return (
		<>
			<button
				onClick={() => {
					router.refresh();
				}}
			>
				Refresh
			</button>
			<table>
				<caption>Patients</caption>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Age</th>
						<th>Gender</th>
						<th>Blood Pressure</th>
						<th>Diagnosis</th>
						<th>Medications</th>
						<th>Temperature</th>
						<th>Visit Date</th>
					</tr>
				</thead>
				<tbody>{patientList}</tbody>
			</table>
		</>
	);
}
