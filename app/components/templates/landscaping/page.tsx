import TemplatePage from "@/app/components/templates/TemplatePage";

export default function LandscapingTemplate() {
	return (
		<TemplatePage
			title="Landscaping & Yard Maintenance Agreement"
			description="Defines lawn care duties, schedule, and responsibilities for recurring yard maintenance services."
			fields={[
				{ id: "client_name", label: "Client Name", required: true },
				{ id: "provider_name", label: "Landscaping Company", required: true },
				{ id: "address", label: "Property Address", required: true },
				{
					id: "schedule",
					label: "Service Schedule",
					placeholder: "Weekly / Bi-Weekly",
					required: true,
				},
				{
					id: "services",
					label: "Services Provided",
					placeholder: "Mowing, edging, trimming, weed control",
				},
				{
					id: "rate",
					label: "Pricing / Rate",
					placeholder: "$85 per visit",
					required: true,
				},
			]}
			template={`
LANDSCAPING & YARD MAINTENANCE AGREEMENT

Between **{{provider_name}}** (“Provider”) and **{{client_name}}** (“Client”).

### 1. PROPERTY
{{address}}

### 2. SCHEDULE
Services performed: **{{schedule}}**

### 3. SERVICES INCLUDED
{{services}}

### 4. PAYMENT
Rate: {{rate}}

### SIGNATURES
Provider: ____________________
Client: ____________________
`}
		/>
	);
}
