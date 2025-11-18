import {
	FileText,
	Hammer,
	Home,
	Briefcase,
	Shield,
	ScanText,
	ScrollText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface TemplateInfo {
	slug: string;
	title: string;
	description: string;
	category: string;
	icon: LucideIcon;
}

export const templates: TemplateInfo[] = [
	{
		slug: "service-agreement",
		title: "Service Agreement",
		description: "Professional contract for freelance or B2B service work.",
		category: "Business",
		icon: Briefcase,
	},
	{
		slug: "construction-contract",
		title: "Construction Contract",
		description:
			"Full construction scope, materials, warranties, and payment terms.",
		category: "Construction",
		icon: Hammer,
	},
	{
		slug: "nda",
		title: "NDA (Mutual)",
		description: "Two-way confidentiality agreement for sharing information.",
		category: "Legal",
		icon: Shield,
	},
	{
		slug: "residential-lease",
		title: "Residential Lease Agreement",
		description: "Landlord–tenant rental contract for residential properties.",
		category: "Real Estate",
		icon: Home,
	},
	{
		slug: "commercial-lease",
		title: "Commercial Lease Agreement",
		description:
			"Lease agreement for businesses renting commercial real estate.",
		category: "Real Estate",
		icon: Home,
	},
	{
		slug: "employment-offer",
		title: "Employment Offer Letter",
		description:
			"Professional job offer letter including salary, role, and start date.",
		category: "Business",
		icon: Briefcase,
	},
	{
		slug: "independent-contractor",
		title: "Independent Contractor Agreement",
		description: "Engagement terms, payment schedule, and contractor duties.",
		category: "Business",
		icon: Briefcase,
	},
	{
		slug: "cleaning-service",
		title: "Cleaning Service Contract",
		description: "Recurring cleaning duties, schedules, and expectations.",
		category: "Home Services",
		icon: ScrollText,
	},
	{
		slug: "landscaping",
		title: "Landscaping / Yard Maintenance Agreement",
		description: "Lawn care schedules, duties, pricing, and conditions.",
		category: "Home Services",
		icon: ScanText,
	},
	{
		slug: "rental-application",
		title: "Rental Application",
		description:
			"Tenant info, employment, background details, and consent for screening.",
		category: "Real Estate",
		icon: FileText,
	},
	{
		slug: "website-development",
		title: "Website Development Agreement",
		description:
			"Terms for website design, development, deliverables, and payment.",
		category: "Business",
		icon: Briefcase,
	},
];
