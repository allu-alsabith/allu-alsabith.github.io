document.getElementById('year').textContent = new Date().getFullYear();

const swatchesEl = document.getElementById('swatches');
const generateBtn = document.getElementById('generate-btn');

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = x => Math.round(255 * x).toString(16).padStart(2, '0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`.toUpperCase();
}

function generatePalette() {
  const baseHue = Math.floor(Math.random() * 360);
  const scheme = Math.random() > 0.5 ? 'analogous' : 'complementary';

  const hues = scheme === 'analogous'
    ? [baseHue, (baseHue + 20) % 360, (baseHue + 40) % 360, (baseHue + 60) % 360, (baseHue + 80) % 360]
    : [baseHue, (baseHue + 15) % 360, (baseHue + 180) % 360, (baseHue + 195) % 360, (baseHue + 30) % 360];

  return hues.map((h, i) => {
    const s = 55 + Math.random() * 30;
    const l = 30 + i * 12;
    return hslToHex(h, s, Math.min(l, 82));
  });
}

function renderPalette(colors) {
  swatchesEl.innerHTML = '';
  colors.forEach(hex => {
    const btn = document.createElement('button');
    btn.className = 'swatch';
    btn.style.background = hex;
    btn.setAttribute('aria-label', `Copy color ${hex}`);

    const label = document.createElement('span');
    label.className = 'hex-label';
    label.textContent = hex;
    btn.appendChild(label);

    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(hex).catch(() => {});
      btn.classList.add('copied');
      label.textContent = 'Copied!';
      setTimeout(() => {
        btn.classList.remove('copied');
        label.textContent = hex;
      }, 1000);
    });

    swatchesEl.appendChild(btn);
  });
}

generateBtn.addEventListener('click', () => renderPalette(generatePalette()));

document.addEventListener('keydown', e => {
  if (e.code === 'Space' && document.activeElement.tagName !== 'BUTTON' && document.activeElement.tagName !== 'A') {
    e.preventDefault();
    renderPalette(generatePalette());
  }
});

renderPalette(generatePalette());