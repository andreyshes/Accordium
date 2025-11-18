"use client";

import TemplatePage from "@/app/components/templates/TemplatePage";

export default function ServiceAgreementTemplate() {
	return (
		<TemplatePage
			title="Service Agreement Template"
			description="A professional contract for freelancers, consultants, agencies, and service providers working with clients."
			fields={[
				{
					id: "clientName",
					label: "Client Name",
					required: true,
					placeholder: "e.g. John Smith",
				},
				{
					id: "providerName",
					label: "Service Provider Name",
					required: true,
					placeholder: "e.g. Apex Consulting LLC",
				},
				{
					id: "services",
					label: "Services Description",
					required: true,
					placeholder: "e.g. Website design, monthly maintenance",
				},
				{
					id: "rate",
					label: "Compensation / Rate",
					required: true,
					placeholder: "e.g. $2,500 fixed or $85/hr",
				},
				{
					id: "timeline",
					label: "Project Timeline",
					placeholder: "e.g. Project begins Jan 10 and ends Feb 20",
				},
				{
					id: "deliverables",
					label: "Deliverables",
					placeholder: "e.g. 3-page website, logo redesign, monthly reports",
				},
				{
					id: "paymentTerms",
					label: "Payment Terms",
					placeholder: "e.g. 50% upfront, 50% on completion (NET 15)",
				},
				{
					id: "confidentiality",
					label: "Confidentiality Terms",
					placeholder:
						"e.g. Work must remain confidential unless agreed otherwise",
				},
			]}
			template={`
SERVICE AGREEMENT

This Service Agreement (“Agreement”) is made between:

**Client:** {{clientName}}
**Service Provider:** {{providerName}}

---

### 1. SERVICES PROVIDED
The Service Provider agrees to perform the following services for the Client:
{{services}}

---

### 2. DELIVERABLES
The Service Provider will deliver:
{{deliverables}}

---

### 3. TIMELINE
The expected schedule for the project is:
{{timeline}}

---

### 4. COMPENSATION
The Client agrees to compensate the Service Provider as follows:
{{rate}}

---

### 5. PAYMENT TERMS
{{paymentTerms}}

---

### 6. CONFIDENTIALITY
{{confidentiality}}

---

### 7. INDEPENDENT CONTRACTOR
The Service Provider is an independent contractor and not an employee of the Client.

---

### 8. TERMINATION
Either party may terminate this Agreement with written notice.

---

### 9. GOVERNING LAW
This Agreement will be governed by the laws of the applicable jurisdiction.

---

### SIGNATURES

_____________________________
Client — **{{clientName}}**

_____________________________
Service Provider — **{{providerName}}**

Date: ______________________
`}
		/>
	);
}
