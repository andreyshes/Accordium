import TemplatePage from "@/app/components/templates/TemplatePage";

export default function EmploymentOfferTemplate() {
	return (
		<TemplatePage
			title="Employment Offer Letter"
			description="Professional job offer letter including salary, position, start date, and employment terms."
			fields={[
				{ id: "candidate_name", label: "Candidate Name", required: true },
				{ id: "company_name", label: "Company Name", required: true },
				{ id: "position", label: "Position Title", required: true },
				{ id: "start_date", label: "Start Date", required: true },
				{ id: "salary", label: "Salary / Compensation", required: true },
				{
					id: "benefits",
					label: "Benefits",
					placeholder: "Health, 401k, PTO...",
				},
			]}
			template={`
EMPLOYMENT OFFER LETTER

Dear **{{candidate_name}}**,

{{company_name}} is pleased to offer you the position of **{{position}}**.

### START DATE
Your employment begins on **{{start_date}}**.

### COMPENSATION
Salary: **{{salary}}**

### BENEFITS
{{benefits}}

We look forward to working with you!

Sincerely,
**{{company_name}}**
`}
		/>
	);
}
