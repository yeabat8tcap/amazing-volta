const fs = require('fs');

const cos30 = Math.cos(Math.PI / 6);
const sin30 = Math.sin(Math.PI / 6);

// Isometric projection helper
function iso(x, y, z) {
    const ix = (x - y) * cos30;
    const iy = (x + y) * sin30 - z;
    return `${ix.toFixed(2)},${iy.toFixed(2)}`;
}

// Draw a 3D box (plate)
function drawPlate(cx, cy, z, w, d, h, fillTop, fillSide1, fillSide2, stroke, strokeW) {
    const hw = w / 2;
    const hd = d / 2;
    
    // Top face corners
    const t1 = iso(cx - hw, cy - hd, z + h);
    const t2 = iso(cx + hw, cy - hd, z + h);
    const t3 = iso(cx + hw, cy + hd, z + h);
    const t4 = iso(cx - hw, cy + hd, z + h);
    
    // Bottom face corners
    const b1 = iso(cx - hw, cy - hd, z);
    const b2 = iso(cx + hw, cy - hd, z);
    const b3 = iso(cx + hw, cy + hd, z);
    const b4 = iso(cx - hw, cy + hd, z);

    let svg = '';
    // Left side face (visible if we are looking from front-left)
    svg += `<polygon points="${t4} ${t3} ${b3} ${b4}" fill="${fillSide1}" stroke="${stroke}" stroke-width="${strokeW}" stroke-linejoin="round"/>\n`;
    // Right side face
    svg += `<polygon points="${t3} ${t2} ${b2} ${b3}" fill="${fillSide2}" stroke="${stroke}" stroke-width="${strokeW}" stroke-linejoin="round"/>\n`;
    // Top face
    svg += `<polygon points="${t1} ${t2} ${t3} ${t4}" fill="${fillTop}" stroke="${stroke}" stroke-width="${strokeW}" stroke-linejoin="round"/>\n`;
    
    return svg;
}

// Draw a hollow frame
function drawFrame(cx, cy, z, w, d, h, thickness, fillTop, fillSide, stroke, strokeW) {
    const hw = w / 2;
    const hd = d / 2;
    const it = thickness; // inner thickness
    
    const outerT1 = iso(cx - hw, cy - hd, z + h);
    const outerT2 = iso(cx + hw, cy - hd, z + h);
    const outerT3 = iso(cx + hw, cy + hd, z + h);
    const outerT4 = iso(cx - hw, cy + hd, z + h);
    
    const innerT1 = iso(cx - hw + it, cy - hd + it, z + h);
    const innerT2 = iso(cx + hw - it, cy - hd + it, z + h);
    const innerT3 = iso(cx + hw - it, cy + hd - it, z + h);
    const innerT4 = iso(cx - hw + it, cy + hd - it, z + h);
    
    const outerB3 = iso(cx + hw, cy + hd, z);
    const outerB4 = iso(cx - hw, cy + hd, z);
    const outerB2 = iso(cx + hw, cy - hd, z);

    let svg = '';
    // Outer sides
    svg += `<polygon points="${outerT4} ${outerT3} ${outerB3} ${outerB4}" fill="${fillSide}" stroke="${stroke}" stroke-width="${strokeW}" stroke-linejoin="round"/>\n`;
    svg += `<polygon points="${outerT3} ${outerT2} ${outerB2} ${outerB3}" fill="${fillSide}" stroke="${stroke}" stroke-width="${strokeW}" stroke-linejoin="round"/>\n`;
    
    // Top face (hollow)
    svg += `<path d="M ${outerT1} L ${outerT2} L ${outerT3} L ${outerT4} Z M ${innerT1} L ${innerT4} L ${innerT3} L ${innerT2} Z" fill="${fillTop}" stroke="${stroke}" stroke-width="${strokeW}" fill-rule="evenodd" stroke-linejoin="round"/>\n`;
    
    // Inner sides (visible from front)
    const innerB1 = iso(cx - hw + it, cy - hd + it, z);
    const innerB2 = iso(cx + hw - it, cy - hd + it, z);
    const innerB4 = iso(cx - hw + it, cy + hd - it, z);
    svg += `<polygon points="${innerT1} ${innerT4} ${innerB4} ${innerB1}" fill="${fillSide}" stroke="${stroke}" stroke-width="${strokeW}" stroke-linejoin="round"/>\n`;
    svg += `<polygon points="${innerT1} ${innerT2} ${innerB2} ${innerB1}" fill="${fillSide}" stroke="${stroke}" stroke-width="${strokeW}" stroke-linejoin="round"/>\n`;

    return svg;
}

let svgCode = `<svg viewBox="-600 -400 1200 1000" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background: var(--bg-color);">
    <defs>
        <filter id="glow-iso" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="var(--accent-color)" stop-opacity="1"/>
            <stop offset="100%" stop-color="var(--accent-color)" stop-opacity="0"/>
        </linearGradient>
    </defs>
    
    <g transform="translate(0, 300)">
`;

// Layer parameters
const baseW = 500;
const baseD = 500;
const strokeColor = '#444';
const strokeThick = '1.5';
const coreColor = 'rgba(255, 60, 0, 0.15)'; // Accent tint
const coreStroke = 'var(--accent-color)';

// 1. BGA Substrate
svgCode += drawPlate(0, 0, 0, baseW, baseD, 15, '#111', '#080808', '#0a0a0a', strokeColor, strokeThick);

// Draw some pins under it (just a representation on the visible edges)
for(let i=0; i<20; i++) {
    const x = -baseW/2 + (i+0.5) * (baseW/20);
    const y = baseD/2;
    const p1 = iso(x, y, 0);
    const p2 = iso(x, y, -10);
    svgCode += `<line x1="${p1.split(',')[0]}" y1="${p1.split(',')[1]}" x2="${p2.split(',')[0]}" y2="${p2.split(',')[1]}" stroke="#b87333" stroke-width="2"/>\n`;
}
for(let i=0; i<20; i++) {
    const x = baseW/2;
    const y = -baseD/2 + (i+0.5) * (baseD/20);
    const p1 = iso(x, y, 0);
    const p2 = iso(x, y, -10);
    svgCode += `<line x1="${p1.split(',')[0]}" y1="${p1.split(',')[1]}" x2="${p2.split(',')[0]}" y2="${p2.split(',')[1]}" stroke="#b87333" stroke-width="2"/>\n`;
}

// 2. Stiffener Ring 1 & 2
svgCode += drawFrame(0, 0, 30, baseW-20, baseD-20, 15, 30, '#151515', '#0a0a0a', strokeColor, strokeThick);
svgCode += drawFrame(0, 0, 60, baseW-40, baseD-40, 15, 20, '#1a1a1a', '#0f0f0f', strokeColor, strokeThick);

// 3. Silicon Substrate
svgCode += drawPlate(0, 0, 100, baseW-60, baseD-60, 10, '#222', '#111', '#151515', strokeColor, strokeThick);

// 4. Logic Die
svgCode += drawPlate(0, 0, 120, baseW-80, baseD-80, 12, '#181818', '#0f0f0f', '#121212', strokeColor, strokeThick);

// 5. HBM3e Memory Stacks (Left and Right)
// Left Stacks (x = -baseW/2 + 80, y varies)
for(let j=0; j<3; j++) {
    const my = -100 + j*100;
    for(let k=0; k<4; k++) {
        svgCode += drawPlate(-150, my, 140 + k*15, 60, 80, 10, '#2a2a2a', '#1a1a1a', '#222', strokeColor, 1);
    }
}
// Right Stacks (x = baseW/2 - 80, y varies)
for(let j=0; j<3; j++) {
    const my = -100 + j*100;
    for(let k=0; k<4; k++) {
        svgCode += drawPlate(150, my, 140 + k*15, 60, 80, 10, '#2a2a2a', '#1a1a1a', '#222', strokeColor, 1);
    }
}

// 6. TSV Interconnects (Copper lines from memory to logic die)
// Draw lines from the sides of the HBM stacks down to the logic die
for(let j=0; j<3; j++) {
    const my = -100 + j*100;
    for(let p=0; p<4; p++) {
        const lx = -120;
        const ly = my - 30 + p*20;
        const p1 = iso(lx, ly, 140);
        const p2 = iso(lx, ly, 132); // logic die surface
        svgCode += `<line x1="${p1.split(',')[0]}" y1="${p1.split(',')[1]}" x2="${p2.split(',')[0]}" y2="${p2.split(',')[1]}" stroke="#b87333" stroke-width="2"/>\n`;
        
        const rx = 120;
        const p3 = iso(rx, ly, 140);
        const p4 = iso(rx, ly, 132);
        svgCode += `<line x1="${p3.split(',')[0]}" y1="${p3.split(',')[1]}" x2="${p4.split(',')[0]}" y2="${p4.split(',')[1]}" stroke="#b87333" stroke-width="2"/>\n`;
    }
}

// 7. Inference Engine Cores (Grid on Logic Die)
const coreZ = 132;
for(let i=0; i<4; i++) {
    for(let j=0; j<4; j++) {
        const cx = -75 + i*50;
        const cy = -75 + j*50;
        svgCode += drawPlate(cx, cy, coreZ, 40, 40, 8, '#0a0a0a', '#050505', '#080808', coreStroke, 1.5);
        // Core Label
        const tp = iso(cx, cy, coreZ+8);
        svgCode += `<text x="${tp.split(',')[0]}" y="${tp.split(',')[1]}" fill="${coreStroke}" font-family="Space Mono" font-size="8" text-anchor="middle" dominant-baseline="middle" transform="rotate(-30, ${tp.split(',')[0]}, ${tp.split(',')[1]}) skewX(30)">CORE</text>\n`;
    }
}

// 8. Fast Cache L1/L2
svgCode += drawPlate(0, 0, 220, baseW-100, baseD-100, 6, 'rgba(30, 30, 30, 0.8)', '#111', '#111', strokeColor, strokeThick);

// 9. Interconnect & I/O (Top Plate)
svgCode += drawPlate(0, 0, 260, baseW-100, baseD-100, 15, '#222', '#111', '#181818', strokeColor, strokeThick);

// Cutouts/modules on Top Plate
for(let i=0; i<3; i++) {
    svgCode += drawPlate(-140 + i*40, -160, 275, 30, 30, 5, '#333', '#111', '#222', strokeColor, 1);
}
// Edge connectors (Inputs)
for(let i=0; i<4; i++) {
    svgCode += drawPlate(180, -150 + i*50, 260, 40, 20, 10, '#333', '#111', '#222', strokeColor, 1);
    // Data stream lines entering
    const enterP1 = iso(250, -150 + i*50, 265);
    const enterP2 = iso(200, -150 + i*50, 265);
    svgCode += `<line x1="${enterP1.split(',')[0]}" y1="${enterP1.split(',')[1]}" x2="${enterP2.split(',')[0]}" y2="${enterP2.split(',')[1]}" stroke="var(--accent-color)" stroke-width="3" opacity="0.6"/>\n`;
}

// Add some animated data flow paths (Arrows)
// Flow from Top IO to Cores (symbolic)
const flow1_start = iso(0, -150, 275);
const flow1_mid = iso(0, 0, 275);
const flow1_end = iso(0, 0, 150);
svgCode += `<path d="M ${flow1_start.split(',')[0]} ${flow1_start.split(',')[1]} L ${flow1_mid.split(',')[0]} ${flow1_mid.split(',')[1]} L ${flow1_end.split(',')[0]} ${flow1_end.split(',')[1]}" fill="none" stroke="var(--accent-color)" stroke-width="4" stroke-dasharray="8 8" opacity="0.8">
    <animate attributeName="stroke-dashoffset" from="16" to="0" dur="0.5s" repeatCount="indefinite" />
</path>\n`;

// Let's add some glowing accents
svgCode += `<circle cx="${flow1_end.split(',')[0]}" cy="${flow1_end.split(',')[1]}" r="6" fill="var(--accent-color)" filter="url(#glow-iso)">
    <animate attributeName="r" values="4;8;4" dur="1.5s" repeatCount="indefinite" />
</circle>\n`;

// Add Floating Labels
function drawLabel(x, y, z, text, align, offsetX, offsetY) {
    const pt = iso(x, y, z);
    const px = parseFloat(pt.split(',')[0]);
    const py = parseFloat(pt.split(',')[1]);
    const lineX = px + offsetX;
    const lineY = py + offsetY;
    let s = `<line x1="${px}" y1="${py}" x2="${lineX}" y2="${lineY}" stroke="#666" stroke-width="1"/>\n`;
    s += `<text x="${lineX + (align==='left' ? -10 : 10)}" y="${lineY}" fill="#fff" font-family="Space Mono" font-size="14" font-weight="bold" text-anchor="${align==='left' ? 'end' : 'start'}" dominant-baseline="middle">${text}</text>\n`;
    return s;
}

svgCode += drawLabel(-250, 0, 0, "BGA SUBSTRATE", 'left', -100, 30);
svgCode += drawLabel(-250, 0, 60, "STIFFENER RING", 'left', -150, 0);
svgCode += drawLabel(-220, 0, 120, "LOGIC DIE", 'left', -180, 0);
svgCode += drawLabel(-150, -100, 180, "HBM3e STACKS", 'left', -180, -20);
svgCode += drawLabel(-75, -75, 132, "INFERENCE CORES", 'left', -250, -50);
svgCode += drawLabel(0, 0, 220, "FAST CACHE (L1/L2)", 'left', -300, -80);
svgCode += drawLabel(0, 0, 260, "INTERCONNECT & I/O", 'left', -320, -120);

svgCode += drawLabel(150, -100, 180, "DRAM DIE STACK", 'right', 200, 0);
svgCode += drawLabel(120, -100, 140, "TSV INTERCONNECTS", 'right', 250, 30);
svgCode += drawLabel(180, 0, 260, "MULTI-MODAL HUB", 'right', 200, -50);

svgCode += `
    </g>
</svg>
`;

let html = fs.readFileSync('public/index.html', 'utf8');
const heroImageRegex = /<div class="diagram-image-container"[^>]*>[\s\S]*?<img src="monolith_hero_schematic\.jpg"[\s\S]*?<\/div>/;

const newContainer = `<div class="diagram-image-container" style="padding: 0; position: relative; overflow: hidden; background: #0a0a0a; border-bottom: 1px solid var(--border-color); width: 100%; aspect-ratio: 1/1; min-height: 500px;">
    ${svgCode}
</div>`;

if (html.match(heroImageRegex)) {
    html = html.replace(heroImageRegex, newContainer);
    fs.writeFileSync('public/index.html', html);
    console.log("Isometric SVG generated and injected!");
} else {
    console.log("Could not find the hero image to replace.");
}

