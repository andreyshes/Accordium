import { ContractStatus } from "@/app/contracts/ContractStatusBadge";

export interface Contract {
	id: string;
	title: string;
	status: ContractStatus;
	created_at: string;
	updated_at: string;
	category?: string | null;
	tags?: string[];
	pdf_url?: string | null;
	pdf_path?: string | null;
	owner_id: string;
	signer_id?: string | null;
	metadata?: Record<string, any> | null;
}
