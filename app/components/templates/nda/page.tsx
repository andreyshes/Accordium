import TemplatePage from "@/app/components/templates/TemplatePage";

export default function NDATemplate() {
	return (
		<TemplatePage
			title="Mutual Non-Disclosure Agreement"
			description="A professional confidentiality agreement used to protect sensitive information between two parties. Fully customizable for business, freelance, startup, and partnership use cases."
			fields={[
				{
					id: "party_a",
					label: "Party A (Your Company or Name)",
					placeholder: "Example: Accordium LLC",
					required: true,
				},
				{
					id: "party_b",
					label: "Party B (Other Company or Person)",
					placeholder: "Example: John Doe Consulting",
					required: true,
				},
				{
					id: "effective_date",
					label: "Effective Date",
					placeholder: "2025-02-14",
					required: true,
				},
				{
					id: "purpose",
					label: "Purpose of Disclosure",
					placeholder:
						"Example: evaluating a business partnership, sharing technical information, etc.",
					required: true,
				},
				{
					id: "governing_law",
					label: "Governing Law",
					placeholder: "Example: Washington State",
				},
				{
					id: "term_months",
					label: "Term (Months)",
					placeholder: "24",
				},
				{
					id: "additional_terms",
					label: "Additional Clauses",
					placeholder: "Any special terms or exceptions",
				},
			]}
			template={`
MUTUAL NON-DISCLOSURE AGREEMENT (NDA)

This Mutual Non-Disclosure Agreement (“Agreement”) is entered into and effective as of **{{effective_date}}**, by and between **{{party_a}}** (“Party A”) and **{{party_b}}** (“Party B”). Party A and Party B may collectively be referred to as the “Parties.”

---

### 1. PURPOSE
The Parties wish to exchange confidential information for the purpose of **{{purpose}}** (“Purpose”).

---

### 2. DEFINITION OF CONFIDENTIAL INFORMATION
“Confidential Information” includes all non-public information disclosed by either Party, whether oral, written, electronic, or visual, including business plans, customer lists, financials, intellectual property, product designs, prototypes, software code, and trade secrets.

Confidential Information does **not** include information that:
(a) becomes publicly available through no fault of the receiving Party;
(b) is already known before disclosure;
(c) is independently developed without reference to the other Party’s information;
(d) is rightfully obtained from a third party without confidentiality obligations.

---

### 3. OBLIGATIONS OF THE PARTIES
Each Party agrees to:
• keep Confidential Information strictly confidential;
• not disclose it to third parties without written permission;
• use it solely for the Purpose;
• restrict access on a need-to-know basis;
• maintain commercially reasonable safeguards.

---

### 4. TERM & SURVIVAL
The obligations of confidentiality will continue for **{{term_months}} months** from the Effective Date unless otherwise specified.

Certain obligations, including protection of trade secrets, may survive indefinitely under applicable law.

---

### 5. RETURN OR DESTRUCTION OF MATERIALS
Upon request, each Party shall promptly return or securely destroy all Confidential Information, including copies, notes, and digital backups.

---

### 6. GOVERNING LAW
This Agreement is governed by the laws of **{{governing_law}}**.

---

### 7. NO LICENSE
No intellectual property rights or licenses are granted under this Agreement except for the limited right to use Confidential Information for the Purpose.

---

### 8. ADDITIONAL TERMS
{{additional_terms}}

---

### 9. SIGNATURES
IN WITNESS WHEREOF, the Parties have executed this Mutual Non-Disclosure Agreement as of the date first written above.

___________________________
**{{party_a}}**

___________________________
**{{party_b}}**

Date: ______________________
`}
		/>
	);
}
