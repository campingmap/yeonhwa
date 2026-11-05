const artworkButtons = [...document.querySelectorAll('[data-image]')];
const dialog = document.querySelector('#lightbox');
let current = 0;
function renderImage(index) {
 current = (index + artworkButtons.length) % artworkButtons.length;
 const button = artworkButtons[current];
 const image = document.querySelector('#lightbox-image');
 image.src = `assets/image-${button.dataset.image}.jpg`;
 image.alt = button.querySelector('img').alt;
 document.querySelector('#image-caption').textContent = button.dataset.caption;
 document.querySelector('#image-counter').textContent = `${current + 1} / ${artworkButtons.length}`;
}
artworkButtons.forEach((button,index) => button.addEventListener('click', () => { renderImage(index); dialog.showModal(); }));
document.querySelector('#close-lightbox').addEventListener('click', () => dialog.close());
document.querySelector('#prev-art').addEventListener('click', () => renderImage(current - 1));
document.querySelector('#next-art').addEventListener('click', () => renderImage(current + 1));
dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if(event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
dialog.addEventListener('keydown', event => { if(event.key === 'ArrowRight') renderImage(current + 1); if(event.key === 'ArrowLeft') renderImage(current - 1); });
let toastTimer;
function toast(message) { const el = document.querySelector('#toast'); el.textContent = message; el.classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('visible'), 3000); }
document.querySelector('#copy-address').addEventListener('click', async () => {
 const address = '충청남도 논산시 가야곡면 탑정로 836 물빛복합문화센터';
 try { await navigator.clipboard.writeText(address); toast('전시장 주소를 복사했습니다.'); }
 catch { toast(address); }
});
