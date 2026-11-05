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

// Kakao JavaScript keys are public browser identifiers, restricted by SDK domains.
const KAKAO_JAVASCRIPT_KEY = 'b0d8d93e30161d4966c224df80323774';
const KAKAO_TEMPLATE_ID = 138624;
const EXHIBITION_URL = 'https://campingmap.github.io/yeonhwa/';

function initializeKakaoShare() {
 const kakao = window.Kakao;
 if (!kakao || typeof kakao.init !== 'function') return false;
 if (!kakao.isInitialized()) kakao.init(KAKAO_JAVASCRIPT_KEY);
 return !!kakao.Share;
}

initializeKakaoShare();
document.querySelector('#share-exhibition').addEventListener('click', () => {
 try {
  if (!initializeKakaoShare()) {
   toast('카카오톡 공유를 불러오지 못했습니다. 연결 상태를 확인하고 다시 눌러 주세요.');
   return;
  }
  // Run directly in the click event so the browser can open the share window.
  window.Kakao.Share.sendCustom({ templateId: KAKAO_TEMPLATE_ID });
 } catch (error) {
  toast('카카오톡 공유를 열지 못했습니다. 잠시 후 다시 시도해 주세요.');
 }
});
