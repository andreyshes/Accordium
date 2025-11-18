import dynamic from "next/dynamic";

export default async function TemplateLoader({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const TemplateComponent = dynamic(
		() => import(`@/app/components/templates/${slug}/page`),
		{
			loading: () => <div className="p-8">Loading template…</div>,
		}
	);

	return <TemplateComponent />;
}
