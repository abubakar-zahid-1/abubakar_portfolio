const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'assets', 'img');

function writeSvg(filename, content) {
  fs.writeFileSync(path.join(imgDir, filename), content.trim());
}

// 1. Project 1: SEO & Growth
writeSvg('project-seo.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="seoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141824"/>
      <stop offset="100%" stop-color="#0b0e14"/>
    </linearGradient>
    <linearGradient id="accentOrange" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff5722"/>
      <stop offset="100%" stop-color="#e64a19"/>
    </linearGradient>
    <linearGradient id="chartGreen" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="rgba(0, 230, 118, 0.1)"/>
      <stop offset="100%" stop-color="rgba(0, 230, 118, 0.6)"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#seoGrad)"/>
  
  <!-- Grid lines -->
  <g stroke="#ffffff" stroke-opacity="0.05" stroke-width="1">
    <line x1="100" y1="150" x2="700" y2="150"/>
    <line x1="100" y1="250" x2="700" y2="250"/>
    <line x1="100" y1="350" x2="700" y2="350"/>
    <line x1="100" y1="450" x2="700" y2="450"/>
    <line x1="200" y1="100" x2="200" y2="500"/>
    <line x1="400" y1="100" x2="400" y2="500"/>
    <line x1="600" y1="100" x2="600" y2="500"/>
  </g>

  <!-- Growth Curve Area -->
  <path d="M 120 450 Q 250 420, 360 340 T 560 220 T 700 130 L 700 480 L 120 480 Z" fill="url(#chartGreen)"/>
  <path d="M 120 450 Q 250 420, 360 340 T 560 220 T 700 130" fill="none" stroke="#00e676" stroke-width="5" stroke-linecap="round"/>

  <!-- Glow Points -->
  <circle cx="360" cy="340" r="7" fill="#00e676"/>
  <circle cx="560" cy="220" r="7" fill="#00e676"/>
  <circle cx="700" cy="130" r="9" fill="#ff5722"/>

  <!-- Badge Card -->
  <rect x="480" y="70" width="230" height="75" rx="8" fill="#1e2330" stroke="#ff5722" stroke-width="1.5"/>
  <text x="500" y="102" fill="#8892b0" font-family="'Roboto', sans-serif" font-size="13" font-weight="500">ORGANIC TRAFFIC</text>
  <text x="500" y="132" fill="#00e676" font-family="'Roboto', sans-serif" font-size="24" font-weight="700">+40% SURGE</text>

  <!-- Metrics HUD -->
  <rect x="100" y="470" width="180" height="50" rx="6" fill="#1a1e2b" stroke="#ffffff" stroke-opacity="0.1"/>
  <text x="120" y="500" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="14" font-weight="600">Top 3 SERP Ranks</text>

  <text x="100" y="110" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="28" font-weight="700">Cert Empire &amp; Cert Mage</text>
  <text x="100" y="138" fill="#ff5722" font-family="'Roboto', sans-serif" font-size="15" font-weight="500">Technical SEO &amp; Organic Dominance</text>
</svg>`);

// 2. Project 2: B2B Lead Generation
writeSvg('project-leadgen.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="leadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#111520"/>
      <stop offset="100%" stop-color="#0a0c12"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#leadGrad)"/>
  
  <!-- Funnel visualization -->
  <polygon points="180,180 620,180 520,300 280,300" fill="#1e2638" stroke="#ff5722" stroke-width="2"/>
  <text x="400" y="245" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="16" font-weight="600" text-anchor="middle">10,000+ Qualified Prospects (Apollo / SalesQL)</text>
  
  <polygon points="280,320 520,320 460,420 340,420" fill="#242e44" stroke="#ff7043" stroke-width="2"/>
  <text x="400" y="375" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="15" font-weight="600" text-anchor="middle">A/B Tested Outreach (60-70% Bounce Drop)</text>

  <polygon points="340,440 460,440 420,520 380,520" fill="#ff5722"/>
  <text x="400" y="488" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="14" font-weight="700" text-anchor="middle">30-40% Pipeline Lift</text>

  <text x="100" y="90" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="28" font-weight="700">IT &amp; Staffing Outreach System</text>
  <text x="100" y="120" fill="#ff5722" font-family="'Roboto', sans-serif" font-size="15" font-weight="500">B2B Prospecting &amp; Cold Email Optimization</text>
</svg>`);

// 3. Project 3: Quora Community Growth
writeSvg('project-quora.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="qGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#181315"/>
      <stop offset="100%" stop-color="#0d0a0b"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#qGrad)"/>
  
  <!-- Quora Q Icon Stylized -->
  <circle cx="620" cy="300" r="140" fill="none" stroke="#b92b27" stroke-width="28" stroke-dasharray="700 80"/>
  <path d="M 640 370 L 710 440" stroke="#b92b27" stroke-width="28" stroke-linecap="round"/>

  <!-- Content cards -->
  <rect x="80" y="170" width="380" height="90" rx="10" fill="#20181b" stroke="#ffffff" stroke-opacity="0.1"/>
  <text x="110" y="210" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="16" font-weight="600">High-Intent Topic Mining</text>
  <text x="110" y="235" fill="#ff7a59" font-family="'Roboto', sans-serif" font-size="13">80% Boost in Brand Engagement</text>

  <rect x="80" y="280" width="380" height="90" rx="10" fill="#20181b" stroke="#ffffff" stroke-opacity="0.1"/>
  <text x="110" y="320" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="16" font-weight="600">Thought Leadership Answers</text>
  <text x="110" y="345" fill="#00e676" font-family="'Roboto', sans-serif" font-size="13">Top Ranked in Google SERP Overviews</text>

  <rect x="80" y="390" width="380" height="90" rx="10" fill="#20181b" stroke="#ffffff" stroke-opacity="0.1"/>
  <text x="110" y="430" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="16" font-weight="600">Referral Traffic Conversion</text>
  <text x="110" y="455" fill="#ff5722" font-family="'Roboto', sans-serif" font-size="13">Qualified B2B &amp; E-commerce Inbound</text>

  <text x="80" y="90" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="28" font-weight="700">Quora Community Marketing</text>
  <text x="80" y="120" fill="#ff5722" font-family="'Roboto', sans-serif" font-size="15" font-weight="500">Authority Building &amp; Referral Acquisition</text>
</svg>`);

// 4. Project 4: Cloudflare-Bypassing Automation Bot
writeSvg('project-bot.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="botGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f1923"/>
      <stop offset="100%" stop-color="#080c10"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#botGrad)"/>
  
  <!-- Terminal Window Mockup -->
  <rect x="80" y="150" width="640" height="370" rx="12" fill="#141e2b" stroke="#ff5722" stroke-width="1.5"/>
  <rect x="80" y="150" width="640" height="40" rx="12" fill="#1b283a"/>
  <circle cx="110" cy="170" r="6" fill="#ff5252"/>
  <circle cx="130" cy="170" r="6" fill="#ffb142"/>
  <circle cx="150" cy="170" r="6" fill="#2ed573"/>
  <text x="175" y="175" fill="#8892b0" font-family="monospace" font-size="13">quora_automation_engine.py</text>

  <!-- Terminal text -->
  <text x="110" y="230" fill="#2ed573" font-family="monospace" font-size="15">$ python3 bot_core.py --profiles=multi --bypass=cf-v2</text>
  <text x="110" y="265" fill="#70a1ff" font-family="monospace" font-size="14">[INFO] Initializing headless stealth browser pool...</text>
  <text x="110" y="295" fill="#70a1ff" font-family="monospace" font-size="14">[INFO] Handshake with Cloudflare Turnstile: BYPASSED (Status 200 OK)</text>
  <text x="110" y="325" fill="#ffa502" font-family="monospace" font-size="14">[EXEC] Rotating 12 proxy profiles with randomized human timing...</text>
  <text x="110" y="355" fill="#2ed573" font-family="monospace" font-size="14">[SUCCESS] Automated upvote/downvote action simulated cleanly.</text>
  <text x="110" y="390" fill="#ffffff" font-family="monospace" font-size="14">[METRIC] Total API / Service Cost: $0.00 (Zero Overhead)</text>

  <!-- Zero cost badge -->
  <rect x="470" y="420" width="220" height="60" rx="8" fill="#ff5722"/>
  <text x="580" y="458" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="18" font-weight="700" text-anchor="middle">$0 API COST • ZERO EXPENSE</text>

  <text x="80" y="90" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="28" font-weight="700">Cloudflare-Bypass Quora Bot</text>
  <text x="80" y="120" fill="#ff5722" font-family="'Roboto', sans-serif" font-size="15" font-weight="500">Autonomous Python Scripting &amp; Anti-Bot Stealth</text>
</svg>`);

// 5. Project 5: WordPress Catalogue Ops
writeSvg('project-wordpress.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="wpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#121820"/>
      <stop offset="100%" stop-color="#0a0e13"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#wpGrad)"/>
  
  <!-- CMS Layout Mockup -->
  <rect x="80" y="160" width="200" height="350" rx="10" fill="#192230" stroke="#ffffff" stroke-opacity="0.1"/>
  <text x="100" y="200" fill="#8892b0" font-family="'Roboto', sans-serif" font-size="14" font-weight="600">TAXONOMY</text>
  <rect x="100" y="220" width="160" height="30" rx="4" fill="#243044"/>
  <text x="110" y="240" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="12">Product Categories</text>
  <rect x="100" y="260" width="160" height="30" rx="4" fill="#243044"/>
  <text x="110" y="280" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="12">Tag Architecture</text>
  <rect x="100" y="300" width="160" height="30" rx="4" fill="#243044"/>
  <text x="110" y="320" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="12">FAQ Schema Silo</text>
  <rect x="100" y="340" width="160" height="30" rx="4" fill="#243044"/>
  <text x="110" y="360" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="12">Custom Meta Fields</text>

  <!-- Right side Content Preview -->
  <rect x="310" y="160" width="410" height="350" rx="10" fill="#192230" stroke="#ffffff" stroke-opacity="0.1"/>
  <rect x="340" y="200" width="350" height="45" rx="6" fill="#212c3d"/>
  <text x="360" y="228" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="14" font-weight="600">Product Page Structured Optimization</text>
  
  <rect x="340" y="260" width="165" height="100" rx="6" fill="#212c3d"/>
  <text x="355" y="295" fill="#ff5722" font-family="'Roboto', sans-serif" font-size="20" font-weight="700">100%</text>
  <text x="355" y="325" fill="#8892b0" font-family="'Roboto', sans-serif" font-size="12">Schema Validated</text>

  <rect x="525" y="260" width="165" height="100" rx="6" fill="#212c3d"/>
  <text x="540" y="295" fill="#00e676" font-family="'Roboto', sans-serif" font-size="20" font-weight="700">+45%</text>
  <text x="540" y="325" fill="#8892b0" font-family="'Roboto', sans-serif" font-size="12">Indexing Speed</text>

  <text x="80" y="90" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="28" font-weight="700">WordPress Catalogue Operations</text>
  <text x="80" y="120" fill="#ff5722" font-family="'Roboto', sans-serif" font-size="15" font-weight="500">Scalable E-Commerce &amp; Product Information Architecture</text>
</svg>`);

// 6. Project 6: AI Marketing Workflows
writeSvg('project-ai.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14101e"/>
      <stop offset="100%" stop-color="#0a0810"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#aiGrad)"/>
  
  <!-- Neural / LLM Nodes -->
  <circle cx="200" cy="300" r="45" fill="#251b3d" stroke="#ff5722" stroke-width="2"/>
  <text x="200" y="306" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="13" font-weight="600" text-anchor="middle">Input Data</text>

  <circle cx="400" cy="220" r="50" fill="#2f1a4a" stroke="#d05ce3" stroke-width="2"/>
  <text x="400" y="226" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="13" font-weight="600" text-anchor="middle">Claude 3.7</text>

  <circle cx="400" cy="380" r="50" fill="#1b2a4a" stroke="#00d2d3" stroke-width="2"/>
  <text x="400" y="386" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="13" font-weight="600" text-anchor="middle">GPT-4 / Gemini</text>

  <circle cx="620" cy="300" r="55" fill="#1f382a" stroke="#00e676" stroke-width="2"/>
  <text x="620" y="300" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="13" font-weight="700" text-anchor="middle">High-Converting</text>
  <text x="620" y="320" fill="#00e676" font-family="'Roboto', sans-serif" font-size="12" font-weight="600" text-anchor="middle">Campaign Brief</text>

  <!-- Connecting lines -->
  <line x1="245" y1="300" x2="350" y2="235" stroke="#ff5722" stroke-width="2" stroke-dasharray="6"/>
  <line x1="245" y1="300" x2="350" y2="365" stroke="#ff5722" stroke-width="2" stroke-dasharray="6"/>
  <line x1="450" y1="235" x2="565" y2="300" stroke="#d05ce3" stroke-width="2" stroke-dasharray="6"/>
  <line x1="450" y1="365" x2="565" y2="300" stroke="#00d2d3" stroke-width="2" stroke-dasharray="6"/>

  <text x="80" y="90" fill="#ffffff" font-family="'Roboto', sans-serif" font-size="28" font-weight="700">AI-Powered Marketing Workflows</text>
  <text x="80" y="120" fill="#ff5722" font-family="'Roboto', sans-serif" font-size="15" font-weight="500">Autonomous Prompt Engineering &amp; High-Velocity Briefs</text>
</svg>`);

// 7. Background texture & pattern
writeSvg('bg-pattern.svg', `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <defs>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="#ffffff" fill-opacity="0.08"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#grid)"/>
</svg>`);

console.log('Successfully created all project & asset SVGs!');
