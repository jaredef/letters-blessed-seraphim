import { html, styled, OG_SIZE, FONTS } from 'og-images-generator';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sinaNova = readFileSync(join(__dirname, 'src/fonts/SinaNovaW01Regular.ttf'));

export const paths = {
	base: './dist',
	out: './dist/og',
	json: './dist/og/index.json',
};

const container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	background: #13151A;
`;

const topBar = styled.div`
	width: 100%;
	height: 12px;
	background: #234ad5;
	display: flex;
`;

const content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding: 80px;
	padding-bottom: 60px;
`;

const title = styled.div`
	font-family: 'Sina Nova', serif;
	font-size: 72px;
	line-height: 1.1;
	color: white;
`;

const description = styled.div`
	font-family: 'Sina Nova', serif;
	font-size: 32px;
	line-height: 1.4;
	color: #8D8FA7;
`;

const siteName = styled.div`
	font-family: 'Sina Nova', serif;
	font-size: 28px;
	color: #64666B;
	padding: 0 80px 40px;
`;

const letterNumber = styled.div`
	font-family: monospace;
	font-size: 24px;
	color: #234ad5;
	margin-bottom: 16px;
`;

export const template = ({ page }) => {
	// Extract letter number from the URL if it's a letter page
	const letterMatch = page.url?.match(/\/letter\/(\d+)/);
	const letterNo = letterMatch ? letterMatch[1] : null;

	return html`
		<div style=${container}>
			<div style=${topBar}></div>
			<div style=${content}>
				${letterNo ? html`<div style=${letterNumber}>Letter ${letterNo}</div>` : ''}
				<div style=${title}>${page.meta?.tags?.['og:title'] ?? page.title ?? 'Letters from Blessed Seraphim'}</div>
				<div style=${description}>${page.meta?.tags?.['og:description'] ?? page.description ?? 'The corpus of known letters from Blessed Seraphim of Platina to contemporary correspondents.'}</div>
			</div>
			<div style=${siteName}>letters.blessedseraphim.com</div>
		</div>
	`;
};

export const renderOptions = {
	satori: {
		fonts: [
			{
				name: 'Sina Nova',
				data: sinaNova,
				weight: 400,
				style: 'normal',
			},
			await FONTS.sourceSans(),
		],
		...OG_SIZE
	},
};