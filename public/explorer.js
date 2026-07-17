// 3D Explorer Logic for Deck Explorer
let isExploded = true;
let currentRotation = { x: 60, z: -45 };

window.toggleExplode = function() {
    const scene = document.getElementById('scene3d');
    const btn = document.getElementById('explodeBtn');
    
    if (scene && btn) {
        if (isExploded) {
            scene.classList.remove('exploded');
            btn.innerText = '[ ASSEMBLE VIEW ]';
        } else {
            scene.classList.add('exploded');
            btn.innerText = '[ EXPLODE VIEW ]';
        }
        isExploded = !isExploded;
    }
};

window.updateRotation = function() {
    const scene = document.getElementById('scene3d');
    const rotX = document.getElementById('rotX').value;
    const rotZ = document.getElementById('rotZ').value;
    
    if (scene) {
        currentRotation.x = parseFloat(rotX);
        currentRotation.z = parseFloat(rotZ);
        scene.style.transform = `translateY(50px) rotateX(${currentRotation.x}deg) rotateZ(${currentRotation.z}deg)`;
    }
};

window.showInfo = function(title, desc) {
    const infoBox = document.getElementById('explorerInfo');
    if (infoBox) {
        infoBox.innerHTML = `
            <div class="info-title">${title}</div>
            <div class="info-desc">${desc}</div>
        `;
    }
};

const scene3d = document.getElementById('scene3d');
const explorerContainer = document.querySelector('.explorer-container');

if (scene3d && explorerContainer) {
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const startDrag = (e) => {
        // Only drag if not interacting with a slider or button
        if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'button') return;
        
        isDragging = true;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        previousMousePosition = { x: clientX, y: clientY };
        scene3d.style.transition = 'none'; 
    };

    const doDrag = (e) => {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const deltaMove = {
            x: clientX - previousMousePosition.x,
            y: clientY - previousMousePosition.y
        };

        currentRotation.z -= deltaMove.x * 0.5;
        currentRotation.x -= deltaMove.y * 0.5;
        currentRotation.x = Math.max(0, Math.min(90, currentRotation.x));

        // Update UI Sliders
        const rxSlider = document.getElementById('rotX');
        const rzSlider = document.getElementById('rotZ');
        if (rxSlider) rxSlider.value = currentRotation.x;
        if (rzSlider) rzSlider.value = currentRotation.z;

        scene3d.style.transform = `translateY(50px) rotateX(${currentRotation.x}deg) rotateZ(${currentRotation.z}deg)`;
        previousMousePosition = { x: clientX, y: clientY };
    };

    const stopDrag = () => {
        if (isDragging) {
            isDragging = false;
            scene3d.style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    };

    explorerContainer.addEventListener('mousedown', startDrag);
    explorerContainer.addEventListener('touchstart', startDrag, {passive: true});

    window.addEventListener('mousemove', doDrag);
    window.addEventListener('touchmove', doDrag, {passive: true});
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);
}
