const audio = document.getElementById('player');
const select = document.getElementById('audioSelect');
let aPoint = null, bPoint = null, loopOn = false;

select.addEventListener('change', () => {
  audio.src = select.value;
  // iOSでの自動再生対策：ユーザー操作後に再生
  audio.pause();
});

document.getElementById('setA').onclick = () => {
  aPoint = audio.currentTime;
  alert(`A点設定: ${aPoint.toFixed(2)}秒`);
};

document.getElementById('setB').onclick = () => {
  bPoint = audio.currentTime;
  alert(`B点設定: ${bPoint.toFixed(2)}秒`);
};

document.getElementById('loopToggle').onclick = (e) => {
  loopOn = !loopOn;
  e.target.textContent = loopOn ? 'Loop On' : 'Loop Off';
};

audio.addEventListener('timeupdate', () => {
  if(loopOn && aPoint !== null && bPoint !== null && audio.currentTime >= bPoint) {
    audio.currentTime = aPoint;
    audio.play();
  }
});

const speedInput = document.getElementById('speed');
const speedVal = document.getElementById('speedVal');
speedInput.oninput = (e) => {
  audio.playbackRate = parseFloat(e.target.value);
  speedVal.textContent = audio.playbackRate.toFixed(1) + 'x';
};

// 初期音声（デフォルト選択）
audio.src = select.value;
audio.playbackRate = parseFloat(speedInput.value);
speedVal.textContent = audio.playbackRate.toFixed(1) + 'x';
