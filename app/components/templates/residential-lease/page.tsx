import TemplatePage from "@/app/components/templates/TemplatePage";

export default function ResidentialLeaseTemplate() {
	return (
		<TemplatePage
			title="Residential Lease Agreement"
			description="A legally structured residential lease agreement for landlords, tenants, property managers, and rental businesses. Includes full terms such as rent, deposits, utilities, rules, and more."
			fields={[
				{
					id: "landlord_name",
					label: "Landlord Name",
					placeholder: "Example: Sarah Johnson",
					required: true,
				},
				{
					id: "tenant_name",
					label: "Tenant Name",
					placeholder: "Example: John Doe",
					required: true,
				},
				{
					id: "property_address",
					label: "Property Address",
					placeholder: "1234 Pine St, Vancouver, WA 98682",
					required: true,
				},
				{
					id: "lease_start",
					label: "Lease Start Date",
					placeholder: "2025-03-01",
					required: true,
				},
				{
					id: "lease_end",
					label: "Lease End Date",
					placeholder: "2026-03-01",
					required: true,
				},
				{
					id: "monthly_rent",
					label: "Monthly Rent Amount",
					placeholder: "$1,850",
					required: true,
				},
				{
					id: "security_deposit",
					label: "Security Deposit Amount",
					placeholder: "$1,500",
				},
				{
					id: "late_fee",
					label: "Late Payment Fee",
					placeholder: "$75 after 5 days",
				},
				{
					id: "utilities",
					label: "Utilities Included",
					placeholder: "Water, sewer, garbage. Tenant pays electricity.",
				},
				{
					id: "occupancy_limit",
					label: "Occupancy Limit",
					placeholder: "No more than 2 adults + 2 minors",
				},
				{
					id: "pets_policy",
					label: "Pet Policy",
					placeholder: "No pets allowed, or pets allowed with approval",
				},
				{
					id: "maintenance",
					label: "Maintenance Responsibilities",
					placeholder:
						"Landlord handles major repairs; tenant handles minor upkeep",
				},
				{
					id: "additional_terms",
					label: "Additional Terms",
					placeholder: "Laundry rules, parking, HOA rules, etc.",
				},
			]}
			template={`
RESIDENTIAL LEASE AGREEMENT

This Residential Lease Agreement (“Agreement”) is made between **{{landlord_name}}** (“Landlord”) and **{{tenant_name}}** (“Tenant”).

The Landlord hereby leases the property located at **{{property_address}}** (“Premises”) to the Tenant under the following terms:

---

### 1. LEASE TERM
The lease term begins on **{{lease_start}}** and ends on **{{lease_end}}**.

After the end date, the lease may convert to month-to-month unless otherwise agreed in writing.

---

### 2. RENT
Tenant agrees to pay **{{monthly_rent}}** per month.
Rent is due on the **1st day of each month**.

Late fee (if applicable): **{{late_fee}}**

---

### 3. SECURITY DEPOSIT
Tenant shall pay a security deposit of **{{security_deposit}}**.
The deposit may be used for damages beyond normal wear and tear.

---

### 4. UTILITIES
Utilities included in rent:
{{utilities}}

All other utilities are the responsibility of the Tenant.

---

### 5. OCCUPANCY LIMIT
Occupancy shall be limited to:
{{occupancy_limit}}

Guests staying more than 14 days require written permission.

---

### 6. PET POLICY
{{pets_policy}}

Unauthorized pets may result in fines or eviction.

---

### 7. MAINTENANCE & REPAIRS
{{maintenance}}

Tenant must promptly report any issues to the Landlord.

---

### 8. ADDITIONAL TERMS
{{additional_terms}}

---

### 9. GOVERNING LAW
This Agreement is governed by the laws of the state where the Premises is located.

---

### SIGNATURES

___________________________
Landlord — **{{landlord_name}}**

___________________________
Tenant — **{{tenant_name}}**

Date: ______________________
`}
		/>
	);
}
