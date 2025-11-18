import TemplatePage from "@/app/components/templates/TemplatePage";

export default function CommercialLeaseTemplate() {
	return (
		<TemplatePage
			title="Commercial Lease Agreement"
			description="Lease contract for businesses renting commercial real estate space."
			fields={[
				{ id: "landlord", label: "Landlord Name", required: true },
				{ id: "tenant", label: "Tenant / Business Name", required: true },
				{ id: "property_address", label: "Property Address", required: true },
				{
					id: "square_feet",
					label: "Square Footage",
					placeholder: "1,500 sq ft",
				},
				{
					id: "rent",
					label: "Monthly Rent",
					placeholder: "$3,200",
					required: true,
				},
				{ id: "lease_term", label: "Lease Term", placeholder: "3 Years" },
			]}
			template={`
COMMERCIAL LEASE AGREEMENT

Landlord: **{{landlord}}**
Tenant: **{{tenant}}**

### PROPERTY
{{property_address}}
Size: {{square_feet}}

### RENT
Monthly Rent: {{rent}}
Lease Term: {{lease_term}}

### SIGNATURES
Landlord: ____________________
Tenant: ____________________
`}
		/>
	);
}
