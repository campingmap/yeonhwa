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
const shareDialog = document.querySelector('#share-dialog');
document.querySelector('#share-exhibition').addEventListener('click', () => shareDialog.showModal());
document.querySelector('#close-share').addEventListener('click', () => shareDialog.close());
shareDialog.addEventListener('click', event => {
 if (event.target !== shareDialog) return;
 const bounds = shareDialog.getBoundingClientRect();
 if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) shareDialog.close();
});
document.querySelector('#share-copy-link').addEventListener('click', async () => {
 shareDialog.close();
 try {
  await navigator.clipboard.writeText(EXHIBITION_URL);
  toast('전시 홈페이지 링크를 복사했습니다.');
 } catch {
  window.prompt('아래 전시 링크를 복사해 주세요.', EXHIBITION_URL);
 }
});
document.querySelector('#share-kakaotalk').addEventListener('click', () => {
 shareDialog.close();
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

const bgm = document.querySelector('#exhibition-bgm');
const bgmToggle = document.querySelector('#bgm-toggle');
function updateBgmButton() {
 const playing = !bgm.paused && !bgm.ended;
 bgmToggle.setAttribute('aria-pressed', String(playing));
 bgmToggle.setAttribute('aria-label', playing ? '배경음악 끄기' : '배경음악 켜기');
 document.querySelector('#bgm-label').textContent = playing ? 'BGM ON' : 'BGM OFF';
}
bgm.volume = 0.28;
bgmToggle.addEventListener('click', async () => {
 if (!bgm.paused) { bgm.pause(); return; }
 try { await bgm.play(); }
 catch (error) {
  if (error.name !== 'AbortError') toast('음악을 재생하지 못했습니다. 다시 눌러 주세요.');
  updateBgmButton();
 }
});
bgm.addEventListener('playing', updateBgmButton);
bgm.addEventListener('pause', updateBgmButton);
bgm.addEventListener('ended', updateBgmButton);
bgm.addEventListener('error', () => { updateBgmButton(); toast('음악을 불러오지 못했습니다. 연결 상태를 확인해 주세요.'); });
window.addEventListener('pagehide', () => bgm.pause());
