import TemplatePage from "@/app/components/templates/TemplatePage";

export default function CleaningServiceTemplate() {
	return (
		<TemplatePage
			title="Cleaning Service Agreement"
			description="Contract between a cleaning service provider and client for recurring or one-time cleaning services."
			fields={[
				{ id: "client_name", label: "Client Name", required: true },
				{
					id: "provider_name",
					label: "Cleaning Provider Name",
					required: true,
				},
				{ id: "property_address", label: "Property Address", required: true },
				{
					id: "service_frequency",
					label: "Service Frequency",
					placeholder: "Weekly / Bi-Weekly / Monthly",
					required: true,
				},
				{
					id: "service_details",
					label: "Cleaning Tasks",
					placeholder: "Kitchen, bathrooms, flooring, dusting...",
				},
				{
					id: "rate",
					label: "Rate / Pricing",
					placeholder: "$120 per visit",
					required: true,
				},
			]}
			template={`
CLEANING SERVICE AGREEMENT

This Agreement is between **{{provider_name}}** (“Provider”) and **{{client_name}}** (“Client”).

### 1. LOCATION
Services will be performed at:
**{{property_address}}**

### 2. FREQUENCY
Cleaning will occur: **{{service_frequency}}**

### 3. SERVICES INCLUDED
{{service_details}}

### 4. PAYMENT
Rate: **{{rate}}**

### SIGNATURES
Provider: ____________________
Client: ____________________
`}
		/>
	);
}
