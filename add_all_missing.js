const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

const decks = [
{
    id: "deck-strategy",
    title: "STRATEGY & TECH",
    header: "Technical Feasibility",
    desc: "Designing a monolithic IPU with 1M tokens/sec throughput requires overcoming historical memory wall constraints. We achieve this through advanced TSMC packaging techniques, a proprietary wafer-scale interconnect, and a completely deterministic software stack built from the ground up for static neural networks.",
    f1_label: "ADVANCED PACKAGING", f1_title: "CoWoS 2.5D/3D", f1_desc: "Utilizing TSMC's latest Chip-on-Wafer-on-Substrate (CoWoS) process, we bypass the standard reticle limit. This allows us to integrate expansive logic chiplets and HBM3e stacks closer than ever before on a single silicon interposer, achieving over 100 TB/s of internal memory bandwidth. We handle the extreme thermal density via a custom direct-to-chip liquid cooling apparatus.",
    f2_label: "SOFTWARE STACK", f2_title: "Deterministic Compile", f2_desc: "Unlike generalized GPUs running dynamic CUDA kernels, Monolith operates on a static graph paradigm. Our compiler ingests PyTorch and JAX models and statically schedules all tensor operations ahead of time. By eliminating dynamic branching overhead and kernel launch latency, we guarantee predictable, bare-metal execution bounds with zero runtime bloat.",
    diag_title: "Manufacturing<br>Process", diag_text: "Precision TSMC 3nm node combined with advanced CoWoS packaging for maximal logic-to-memory proximity and thermal efficiency.", diag_footer: "Self-Diagnostic<br>Failsafes"
},
{
    id: "deck-market-overview",
    title: "MARKET OVERVIEW",
    header: "The AI Compute Bottleneck",
    desc: "Current LLM deployments rely on legacy GPU architectures initially designed for graphics rendering. This results in massive inefficiencies, poor interconnect bandwidth scaling, and exorbitant power costs. With the global market projected to spend $100B+ on inference compute by 2028, a dedicated ASIC solution is the only mathematically viable path forward.",
    f1_label: "HYPERSCALER DEMAND", f1_title: "Cost per 1K Tokens", f1_desc: "$0.0001 (10X REDUCTION) - A critical metric for scaling B2C generative AI.",
    f2_label: "ENTERPRISE AI", f2_title: "Rack Density & ROI", f2_desc: "16 MODULES PER 1U NODE. CAPEX ROI < 3 MONTHS AT FULL LOAD.",
    diag_title: "Monolith<br>Value Prop", diag_text: "Targeting the specific bottlenecks in the AI hardware value chain.", diag_footer: "Go-to-Market"
},
{
    id: "deck-financials",
    title: "FINANCIALS & SCALE",
    header: "Capital & Goal",
    desc: "Bootstrapping a custom TSMC 3nm tapeout and developing the deterministic compiler stack requires an initial capital injection of $250M - $500M. This covers EDA licensing, advanced packaging R&D, and the initial massive silicon run. Our goal: Shatter the current GPU monopoly and establish Monolith as the de facto standard for enterprise LLM deployment by offering 10x cheaper, universally accessible inference compute.",
    f1_label: "TOTAL ADDRESSABLE MARKET (TAM)", f1_title: "$150B", f1_desc: "The projected global spend on AI datacenters, hardware architectures, and overarching compute infrastructure expected by 2028 as AI permeates all software vectors.",
    f2_label: "SERVICEABLE MARKET (SAM)", f2_title: "$40B", f2_desc: "The specific, highly lucrative slice of the market dedicated strictly to LLM and Multi-Modal inference compute operations, where generalized GPUs are currently bottlenecking progress.",
    diag_title: "Demand<br>Curve", diag_text: "Global Inference Compute Deficit. Legacy supply caps out at 2026 levels while Monolith architecture scales to bridge the 2027-2028 deficit.", diag_footer: "The Monopoly<br>Ends Here."
},
{
    id: "deck-penetration",
    title: "MARKET PENETRATION",
    header: "Target Clients",
    desc: "Monolith is engineered for organizations constrained by the severe cap-ex and power limits of traditional GPU scaling. Our target customer base spans from massive cloud infrastructure providers to highly secure, air-gapped enterprise environments.",
    f1_label: "TIER 1 CLOUD", f1_title: "Hyperscalers", f1_desc: "Major cloud providers looking to drastically slash their inference operational expenditures. Monolith allows them to serve 10x more API requests per rack unit, driving unprecedented margin expansion for consumer-facing LLMs.",
    f2_label: "ON-PREM SECURITY", f2_title: "Enterprise AI", f2_desc: "Fortune 500 finance, healthcare, and defense sectors require private, air-gapped LLM deployments. A single Monolith rack replaces a $50M legacy GPU cluster, bringing 1T-parameter reasoning locally behind corporate firewalls.",
    diag_title: "Customer<br>Base", diag_text: "Sector Breakdown:<br>CLOUD PROVIDERS (50%)<br>ENTERPRISE / GOV (30%)<br>AUTONOMOUS EDGE (20%)", diag_footer: "Ready to Deploy."
},
{
    id: "deck-miniaturization",
    title: "MINIATURIZATION",
    header: "Volumetric Breakthrough",
    desc: "Delivering 1M tokens/sec throughput from a 1-Trillion parameter model requires entirely rethinking physical constraints. Rather than sprawling logic across massive 2D PCB farms, Monolith compresses extreme computational density into the Z-axis, drastically shortening the electrical path lengths required for data traversal.",
    f1_label: "SPATIAL INTEGRATION", f1_title: "3D Stacking", f1_desc: "By stacking active logic dies directly underneath High-Bandwidth Memory arrays, we bypass the traditional 2D reticle limit. This dense spatial integration allows signals to travel mere micrometers vertically rather than millimeters horizontally across a substrate, virtually eliminating latency.",
    f2_label: "THERMAL LIMITS", f2_title: "Micro-Fluidic Core", f2_desc: "Extracting 400W of heat from an 800mm² surface area presents an extreme thermal density challenge. We route microscopic liquid cooling channels directly through the silicon interposer (direct-to-chip), maintaining a steady-state junction temperature under absolute max continuous load.",
    diag_title: "Isometric<br>Breakdown", diag_text: "Dimensional Breakdown Schematic.<br>ACTIVE SILICON AREA: 800mm²<br>Z-HEIGHT (PACKAGE): 4.0mm<br>VOLUMETRIC DENSITY: ~1.000E+06 mm³", diag_footer: "Defying Physics."
},
{
    id: "deck-capital-deployment",
    title: "CAPITAL DEPLOYMENT",
    header: "Manufacturing at Scale",
    desc: "While initial R&D prototyping requires $500M, transitioning Monolith to hyperscale volume demands a monumental shift in capital structure. Deploying millions of units requires securing advanced-node wafer allocations and 3D packaging capacity, necessitating multi-billion dollar upfront commitments.",
    f1_label: "WAFER ALLOCATION", f1_title: "Silicon Capacity", f1_desc: "Tier-1 foundries demand irrevocable capital commitments 18-24 months in advance for leading-edge nodes. To capture the global inference deficit and guarantee continuous wafer starts, securing a $2B - $5B immediate working capital float is mandatory.",
    f2_label: "PACKAGING BOTTLENECK", f2_title: "CoWoS Lines", f2_desc: "Raw silicon is useless without advanced 3D packaging. The integration of logic dies with HBM3e stacks is the most expensive and scarce phase of manufacturing. Scaling this process safely requires co-investing heavily in dedicated, automated packaging lines.",
    diag_title: "Cost<br>Structure", diag_text: "Per-Unit Scale Economics:<br>100K UNITS: $1.2B<br>1M UNITS: $8.5B<br>10M UNITS: $50B+", diag_footer: "The Scale Race."
},
{
    id: "deck-inference-os",
    title: "INFERENCE OS",
    header: "A Generational Computer",
    desc: "Monolith is not an accelerator card; it is a first-of-its-kind Inference Computer. It runs a proprietary Inference OS natively on a fundamentally new silicon substrate, replacing traditional binary instruction sets with continuous multi-modal reasoning.",
    f1_label: "THE NEW OPERATING SYSTEM", f1_title: "Inference OS", f1_desc: "In this paradigm, the operating system is the neural network itself. API calls are natural language intents. Files are dynamic semantic embeddings. Processes are autonomous agentic loops reasoning continuously without interruption.",
    f2_label: "A NOVEL PARADIGM", f2_title: "New Substrate", f2_desc: "By abandoning legacy x86 and ARM architectures, Monolith operates entirely on static tensor matrices. This substrate allows continuous cognitive execution at 1M tokens/sec, enabling applications that were previously impossible under the von Neumann model.",
    diag_title: "Native<br>Applications", diag_text: "SWARM AGENTS<br>SYNTHETIC WORLDS<br>CONTINUOUS COGNITION", diag_footer: "The Substrate<br>of Intelligence."
},
{
    id: "deck-physics",
    title: "SILICON PHYSICS",
    header: "Powering Zero Latency",
    desc: "Software optimization alone cannot break the von Neumann bottleneck. To achieve 1M tokens/sec throughput, Monolith attacks the problem at the atomic level, utilizing experimental sub-ns wafers and exotic photonics to drive inference into the picosecond domain.",
    f1_label: "MATERIAL SCIENCE", f1_title: "Sub-ns Wafers", f1_desc: "Monolith is fabricated on highly specialized, custom-doped silicon substrates designed for extreme electron mobility. By altering the physical lattice structure of the wafer, gate transition times are compressed well below one nanosecond, allowing near-instantaneous tensor activations.",
    f2_label: "INTERCONNECT FABRIC", f2_title: "Silicon Photonics", f2_desc: "Copper traces are physically too slow and resistive for this scale of throughput. We integrate optical TSVs (Through-Silicon Vias) directly into the logic die. Data moves between the memory banks and compute cores literally at the speed of light.",
    diag_title: "Physics<br>Profile", diag_text: "GATE DELAY: 0.8 Picoseconds<br>CLOCK: Fully Asynchronous<br>SIGNAL PROPAGATION: 299,792 km/s", diag_footer: "The Speed<br>of Light."
}
];

function generateDeckHtml(deck) {
    return `
    <!-- ${deck.title} Deck -->
    <div class="${deck.id} grid-container" style="border-top: 1px solid var(--border-color);">
        
        <!-- Left Sidebar -->
        <div class="sidebar">
            <div class="sidebar-title" style="font-size: 28px;">${deck.title}</div>
        </div>

        <!-- Main Content Area -->
        <div class="main-content">
            <header class="header-main" style="padding-bottom: 30px;">
                <h1>${deck.header}</h1>
                <p class="description">${deck.desc}</p>
            </header>

            <div class="feature-grid">
                <div class="feature-box">
                    <div class="feature-label">${deck.f1_label}</div>
                    <h2>${deck.f1_title}</h2>
                    <p class="mono-text-small">${deck.f1_desc}</p>
                </div>
                <div class="feature-box">
                    <div class="feature-label">${deck.f2_label}</div>
                    <h2>${deck.f2_title}</h2>
                    <p class="mono-text-small">${deck.f2_desc}</p>
                </div>
            </div>
        </div>

        <!-- Right Column / Stylized Data -->
        <div class="diagram-column">
            <div class="diagram-header">
                <h3>${deck.diag_title}</h3>
            </div>
            
            <div class="diagram-image-container" style="padding: 40px 20px; background: #0a0a0a; border-bottom: 1px solid var(--border-color); font-family: 'Space Mono', monospace; font-size: 14px; color: var(--accent-color); height: 320px; display: flex; align-items: center; justify-content: center; text-align: center; line-height: 1.6;">
                ${deck.diag_text}
            </div>

            <div class="diagram-footer" style="border-top: 1px solid var(--border-color);">
                <div class="footer-title" style="width: 100%; text-align: left;">
                    <h2 style="font-size: 32px;">${deck.diag_footer}</h2>
                </div>
            </div>
        </div>
    </div>
`;
}

// Map where to insert each deck.
// Strategy & Tech -> Insert right after Hero (before deck-primitives)
const strPrimitives = '    <!-- Compute Primitives Deck -->';
if (html.includes(strPrimitives)) {
    html = html.replace(strPrimitives, generateDeckHtml(decks[0]) + '\n' + strPrimitives);
}

// Market Overview -> Insert right after Strategy & Tech
// Financials & Scale -> After deck-memory
const strMoat = '    <!-- Competitive Moat Deck -->';
// Wait, deck-thirteen is Competitive Moat. Let's insert Market Overview and Financials after deck-memory.
const strThirteen = '    <div class="deck-thirteen'; // Competitive moat
if (html.includes(strThirteen)) {
    html = html.replace(strThirteen, generateDeckHtml(decks[1]) + '\n' + generateDeckHtml(decks[2]) + '\n' + generateDeckHtml(decks[3]) + '\n' + strThirteen);
}

// Miniaturization -> After Breakthrough
const strProtocols = '    <!-- Experimental Protocols Deck -->';
if (html.includes(strProtocols)) {
    html = html.replace(strProtocols, generateDeckHtml(decks[4]) + '\n' + strProtocols);
}

// Capital Deployment -> After Miniaturization
// Inference OS -> After Capital Deployment
const strTerminal = '    <div class="deck-terminal';
if (html.includes(strTerminal)) {
    html = html.replace(strTerminal, generateDeckHtml(decks[5]) + '\n' + generateDeckHtml(decks[6]) + '\n' + strTerminal);
}

// Silicon Physics -> Before Competitive Moat (wait, Competitive Moat is deck-thirteen which is high up now).
// Let's insert Silicon Physics before deck-circuit
const strCircuit = '    <div class="deck-circuit';
if (html.includes(strCircuit)) {
    html = html.replace(strCircuit, generateDeckHtml(decks[7]) + '\n' + strCircuit);
}

fs.writeFileSync('public/index.html', html);
console.log("All missing decks injected!");

