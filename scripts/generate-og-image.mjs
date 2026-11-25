import sharp from 'sharp';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="#ffffff" opacity="0.06" />
    </pattern>
    <linearGradient id="headline" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e5e5e5" />
      <stop offset="1" stop-color="#a3a3a3" />
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="#0a0a0a" />
  <rect width="1200" height="630" fill="url(#dots)" />
  <rect x="64" y="64" width="1072" height="502" rx="12" fill="#111111" stroke="#262626" />

  <text x="104" y="124" fill="#737373" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" letter-spacing="2.4">WESLEY COUTINHO</text>
  <text x="1096" y="124" text-anchor="end" fill="#3b82f6" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" letter-spacing="2.4">AI ENGINEER</text>

  <line x1="104" y1="158" x2="1096" y2="158" stroke="#262626" />

  <text x="104" y="246" fill="url(#headline)" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="700" letter-spacing="-1.6">
    <tspan x="104" dy="0">I build AI systems you can</tspan>
    <tspan x="104" dy="68">measure, test and trust.</tspan>
  </text>

  <text x="104" y="404" fill="#a3a3a3" font-family="Arial, Helvetica, sans-serif" font-size="24">
    LLMs · RAG · AI Agents · Machine Learning · Python · FastAPI
  </text>

  <rect x="104" y="454" width="342" height="48" rx="6" fill="#e5e5e5" />
  <text x="275" y="485" text-anchor="middle" fill="#0a0a0a" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700">AI ENGINEERING</text>

  <text x="1096" y="485" text-anchor="end" fill="#737373" font-family="Arial, Helvetica, sans-serif" font-size="17">Software Engineering → LLMs → Evaluation</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile('public/og-image.png');

console.log('Generated public/og-image.png (1200x630).');
