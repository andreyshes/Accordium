"use server";
import TemplatePage from "../TemplatePage";

export default async function IndependentContractorTemplate() {
	return (
		<TemplatePage
			title="Independent Contractor Agreement"
			description="Defines the working relationship, pay structure, and responsibilities between a business and an independent contractor."
			fields={[
				{ id: "client_name", label: "Client / Company Name", required: true },
				{ id: "contractor_name", label: "Contractor Name", required: true },
				{
					id: "project_description",
					label: "Project Description",
					required: true,
				},
				{
					id: "start_date",
					label: "Start Date",
					placeholder: "2025-03-01",
					required: true,
				},
				{ id: "end_date", label: "End Date", placeholder: "2025-06-01" },
				{
					id: "payment_terms",
					label: "Payment Terms",
					placeholder: "$50/hr, paid weekly",
				},
				{
					id: "deliverables",
					label: "Deliverables",
					placeholder: "Design mockups, website build, etc.",
				},
				{
					id: "confidentiality",
					label: "Confidentiality Terms",
					placeholder: "Protect client data...",
				},
			]}
			template={`
INDEPENDENT CONTRACTOR AGREEMENT

This Agreement is made between **{{client_name}}** (“Client”)
and **{{contractor_name}}** (“Contractor”).

### 1. PROJECT SCOPE
Contractor agrees to perform the following work:
{{project_description}}.

### 2. TERM
Start Date: {{start_date}}
End Date: {{end_date}}

### 3. PAYMENT
Payment Terms: {{payment_terms}}

### 4. DELIVERABLES
{{deliverables}}

### 5. CONFIDENTIALITY
{{confidentiality}}

### 6. INDEPENDENT STATUS
Contractor is an independent entity, not an employee.

### SIGNATURES
Client: _____________________
Contractor: _____________________
`}
		/>
	);
}
