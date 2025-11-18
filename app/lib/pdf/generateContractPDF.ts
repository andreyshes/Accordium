import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

function normalizeMarkdown(text: string) {
	return text
		.replace(/\*\*(.*?)\*\*/g, (_, inner) => inner.toUpperCase())
		.replace(/#+\s?/g, "");
}

export async function generateContractPDF(title: string, body: string) {
	const pdfDoc = await PDFDocument.create();
	let page = pdfDoc.addPage();

	const margin = 50;
	const fontSize = 12;
	const headingSize = 20;

	const { width, height } = page.getSize();

	const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
	const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

	let cursorY = height - margin;

	// Draw header branding
	page.drawText("ACCORDIUM CONTRACT", {
		x: margin,
		y: cursorY,
		size: 10,
		font: boldFont,
		color: rgb(0.45, 0.45, 0.45),
	});
	cursorY -= 25;

	// Draw main title
	page.drawText(title, {
		x: margin,
		y: cursorY,
		size: headingSize,
		font: boldFont,
		color: rgb(0, 0, 0),
	});
	cursorY -= 35;

	// Normalize the body markdown
	const cleaned = normalizeMarkdown(body);
	const lines = cleaned.split("\n");

	for (const line of lines) {
		if (cursorY < 80) {
			page = pdfDoc.addPage();
			cursorY = height - margin;
		}

		const trimmed = line.trim();

		if (/^\d+\./.test(trimmed)) {
			page.drawText(trimmed, {
				x: margin,
				y: cursorY,
				size: 14,
				font: boldFont,
			});
			cursorY -= 20;
			continue;
		}

		// Normal text
		page.drawText(trimmed, {
			x: margin,
			y: cursorY,
			size: fontSize,
			font,
			maxWidth: width - margin * 2,
		});

		cursorY -= 16;
	}

	// Signatures Area
	cursorY -= 30;

	page.drawText("SIGNATURES", {
		x: margin,
		y: cursorY,
		size: 14,
		font: boldFont,
	});
	cursorY -= 25;

	page.drawText("Client Signature: _______________________________", {
		x: margin,
		y: cursorY,
		size: fontSize,
		font,
	});
	cursorY -= 25;

	page.drawText("Provider Signature: ______________________________", {
		x: margin,
		y: cursorY,
		size: fontSize,
		font,
	});
	cursorY -= 25;

	page.drawText("Date: _______________________________", {
		x: margin,
		y: cursorY,
		size: fontSize,
		font,
	});

	return Buffer.from(await pdfDoc.save());
}
