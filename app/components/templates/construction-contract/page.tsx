import TemplatePage from "@/app/components/templates/TemplatePage";

export default function ConstructionTemplate() {
	return (
		<TemplatePage
			title="Construction Contract"
			description="A customizable construction agreement for contractors, builders, handymen, and clients. Includes project scope, timelines, payments, and warranty details."
			fields={[
				{
					id: "client_name",
					label: "Client Name",
					placeholder: "John Doe",
					required: true,
				},
				{
					id: "contractor_name",
					label: "Contractor/Company Name",
					placeholder: "XYZ Construction LLC",
					required: true,
				},
				{
					id: "project_location",
					label: "Project Location",
					placeholder: "1234 Main St, Vancouver, WA",
					required: true,
				},
				{
					id: "project_scope",
					label: "Project Scope",
					placeholder:
						"Kitchen remodel, bathroom renovation, flooring installation…",
					required: true,
				},
				{
					id: "start_date",
					label: "Estimated Start Date",
					placeholder: "2025-02-01",
				},
				{
					id: "end_date",
					label: "Estimated Completion Date",
					placeholder: "2025-03-15",
				},
				{
					id: "total_cost",
					label: "Total Project Cost",
					placeholder: "$25,000",
					required: true,
				},
				{
					id: "payment_schedule",
					label: "Payment Schedule",
					placeholder: "50% upfront, 50% upon completion",
				},
				{
					id: "materials",
					label: "Included Materials",
					placeholder:
						"Cabinets, countertops, tile, lighting, plumbing fixtures…",
				},
				{
					id: "warranty",
					label: "Warranty Details",
					placeholder: "1-year labor warranty, manufacturer warranties apply",
				},
				{
					id: "additional_terms",
					label: "Additional Terms",
					placeholder: "Cleanup responsibilities, insurance, permits, etc.",
				},
			]}
			template={`
CONSTRUCTION AGREEMENT

This Construction Agreement ("Agreement") is made between **{{contractor_name}}** and **{{client_name}}** for the project located at **{{project_location}}**.

---

### 1. PROJECT SCOPE
The Contractor agrees to perform the following work:
{{project_scope}}

The Contractor will supply all labor, tools, and materials necessary unless otherwise noted.

---

### 2. PROJECT TIMELINE
- **Start Date:** {{start_date}}
- **Estimated Completion Date:** {{end_date}}

Dates are estimates and may adjust due to weather, supply delays, safety concerns, or change orders.

---

### 3. TOTAL COST & PAYMENT TERMS
- **Total Project Cost:** {{total_cost}}
- **Payment Schedule:** {{payment_schedule}}

Payments must be made according to schedule. Late or missed payments may pause work.

---

### 4. MATERIALS
Included materials:
{{materials}}

Any upgrades, special materials, or unforeseen supply adjustments will be billed separately with prior approval.

---

### 5. WARRANTIES
Warranty terms:
{{warranty}}

Contractor warranty covers workmanship only unless otherwise stated.

---

### 6. ADDITIONAL TERMS
{{additional_terms}}

---

### SIGNATURES
Both parties agree to the terms of this Construction Agreement.

___________________________
Client

___________________________
Contractor

Date: ______________________
`}
		/>
	);
}
