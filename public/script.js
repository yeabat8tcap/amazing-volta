console.log("Monolith IPU Interface Initialized.");

const tokenContainer = document.getElementById('tokenContainer');
if (tokenContainer) {
    const vocab = [
        "0x0F", "TENSOR", "ACTIVATE", "ATTN", "HEAD_0", "MATMUL", "0xAA", "EMIT", 
        "TOKEN", "CTX_V", "W_9", "1.58b", "CIM_HIT", "0x3B", "QKV", "FFN_GELU",
        "SYNC", "OPTICAL", "TSV_RD", "SRAM", "0x99", "LAT_1ms", "OP_ADD", "NORM"
    ];

    setInterval(() => {
        // Append 5-10 tokens per tick to simulate extreme speed
        const chunkCount = Math.floor(Math.random() * 5) + 5;
        
        for (let i = 0; i < chunkCount; i++) {
            const span = document.createElement('span');
            span.innerText = vocab[Math.floor(Math.random() * vocab.length)] + " ";
            
            // Randomly highlight some tokens in white for a Matrix-like effect
            if (Math.random() > 0.85) {
                span.style.color = "#fff";
                span.style.fontWeight = "700";
            } else {
                // Occasional dim tokens
                if (Math.random() > 0.7) {
                    span.style.opacity = "0.5";
                }
            }
            
            tokenContainer.appendChild(span);
        }
        
        // Keep DOM light by removing oldest nodes if it gets too large
        while (tokenContainer.childNodes.length > 250) {
            tokenContainer.removeChild(tokenContainer.firstChild);
        }
        
        // Auto-scroll to bottom
        tokenContainer.scrollTop = tokenContainer.scrollHeight;
    }, 20); // 50 updates per second
}

// Terminal Walkthrough Animation for Deck 10
const walkContainer = document.getElementById('terminalWalkthrough');
if (walkContainer) {
    const connProgress = document.getElementById('connectionProgress');
    const connStatus = document.getElementById('connectionStatus');
    const stepTrans = document.getElementById('stepTranslation');
    const transData = document.getElementById('translationData');
    const stepTerm = document.getElementById('stepTerminal');
    const shellInput = document.getElementById('shellInput');
    const shellOutput = document.getElementById('shellOutput');
    
    // Add blink keyframes dynamically if not exists
    if (!document.getElementById('blinkStyle')) {
        const style = document.createElement('style');
        style.id = 'blinkStyle';
        style.innerHTML = `@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } } #cursor { animation: blink 1s step-end infinite; }`;
        document.head.appendChild(style);
    }

    async function runWalkthrough() {
        // Reset states
        connProgress.style.left = '-100%';
        connProgress.style.transition = 'none';
        connStatus.innerText = 'WAITING FOR LINK...';
        connStatus.style.color = '#666';
        stepTrans.style.opacity = '0.3';
        transData.innerText = '01010010 01100101 01110011 01110100 01000001 01010000 01001001 01110011 01110001 01101100...';
        transData.style.color = '#888';
        stepTerm.style.opacity = '0.3';
        shellInput.innerText = '';
        shellOutput.innerHTML = '';

        await new Promise(r => setTimeout(r, 1000));

        // Step 1: Connect
        connProgress.style.transition = 'left 1s cubic-bezier(0.4, 0, 0.2, 1)';
        connProgress.style.left = '0%';
        await new Promise(r => setTimeout(r, 1000));
        connStatus.innerText = 'LINK ESTABLISHED: 800 GB/s OPTICAL';
        connStatus.style.color = 'var(--accent-color)';
        
        await new Promise(r => setTimeout(r, 800));

        // Step 2: Translate
        stepTrans.style.opacity = '1';
        let translated = 'INGESTING LEGACY DATA... ';
        for(let i=0; i<15; i++) {
            transData.innerText = translated + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
            await new Promise(r => setTimeout(r, 60));
        }
        transData.innerText = 'SEMANTIC MAPPING COMPLETE. [LATENT_SPACE_LOCKED]';
        transData.style.color = 'var(--accent-color)';

        await new Promise(r => setTimeout(r, 800));

        // Step 3: Terminal
        stepTerm.style.opacity = '1';
        shellOutput.innerHTML = '<div style="color:#666">Monolith Inference Shell v1.0.0</div><div style="color:#666; margin-bottom: 8px;">Awaiting cognitive input...</div>';
        
        const typeText = "query_legacy_db({intent: 'fetch Q3 global revenue projections'})";
        for(let i=0; i<typeText.length; i++) {
            shellInput.innerText += typeText[i];
            await new Promise(r => setTimeout(r, Math.random() * 50 + 20));
        }

        await new Promise(r => setTimeout(r, 400));
        shellOutput.innerHTML += `<div><span style="color:var(--accent-color)">$</span> <span style="color:#fff">${typeText}</span></div>`;
        shellInput.innerText = '';
        
        await new Promise(r => setTimeout(r, 300));
        shellOutput.innerHTML += `<div style="color:var(--accent-color); font-weight:600;">> [INFERENCE_HIT] Compiling SQL to Latent Intent...</div>`;
        
        await new Promise(r => setTimeout(r, 600));
        shellOutput.innerHTML += `<div style="color:#0f0;">> Q3 Revenue Projected: $14.2B. Confidence: 99.8%.<br><span style="color:#666; font-size:10px;">(Inference complete in 0.42ms)</span></div>`;

        await new Promise(r => setTimeout(r, 5000));
        
        // Loop continuously
        runWalkthrough();
    }

    runWalkthrough();
}

// Token Stream Path Animation for Deck 13 (The Moat)
const streamContainer = document.getElementById('dataStreamContainer');
if (streamContainer) {
    if (!document.getElementById('streamStyle')) {
        const style = document.createElement('style');
        style.id = 'streamStyle';
        style.innerHTML = `
            .stream-particle {
                position: absolute;
                width: 6px;
                height: 6px;
                background: var(--accent-color);
                box-shadow: 0 0 10px var(--accent-color), 0 0 20px #fff;
                border-radius: 50%;
                opacity: 0;
            }
            /* From Left HBM to Center */
            @keyframes flowLeftToCenter {
                0% { left: 20%; top: 58%; opacity: 0; transform: scale(0.5); }
                20% { opacity: 1; transform: scale(1.2); }
                80% { left: 45%; top: 43%; opacity: 1; }
                100% { left: 50%; top: 40%; opacity: 0; transform: scale(0.5); }
            }
            /* From Right HBM to Center */
            @keyframes flowRightToCenter {
                0% { left: 75%; top: 38%; opacity: 0; transform: scale(0.5); }
                20% { opacity: 1; transform: scale(1.2); }
                80% { left: 55%; top: 41%; opacity: 1; }
                100% { left: 50%; top: 40%; opacity: 0; transform: scale(0.5); }
            }
            /* Vertical Emission (Token Output) */
            @keyframes emitUpward {
                0% { left: 50%; top: 38%; opacity: 0; transform: scale(1); }
                20% { opacity: 1; box-shadow: 0 0 15px #fff, 0 0 30px var(--accent-color); background: #fff; }
                100% { left: 50%; top: 15%; opacity: 0; transform: scale(0.2); }
            }
        `;
        document.head.appendChild(style);
    }

    function createParticle(animName, duration) {
        const p = document.createElement('div');
        p.className = 'stream-particle';
        p.style.animation = `${animName} ${duration}s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
        streamContainer.appendChild(p);
        
        // Cleanup
        setTimeout(() => { 
            if(streamContainer.contains(p)) streamContainer.removeChild(p); 
        }, duration * 1000);
    }

    // Fire Memory Fetches
    setInterval(() => {
        createParticle('flowLeftToCenter', 1.1);
    }, 450);

    setInterval(() => {
        createParticle('flowRightToCenter', 1.3);
    }, 550);

    // Fire Token Emission (Faster rate)
    setInterval(() => {
        createParticle('emitUpward', 0.7);
    }, 180);
}

