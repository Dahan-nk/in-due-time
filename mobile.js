// ===== file rieng cho dien thoai + huong dan =====
// file nay chay sau code chinh, khong sua gi trong index.html / style.css cu

// man hinh nhac xoay ngang (chi hien khi dien thoai / ipad cam doc)
const rotateNote = document.createElement("div");
rotateNote.className = "rotate-note";
rotateNote.innerHTML = '<img src="images/icons/beetle.svg" alt=""><p>Please turn your phone sideways<span>This story is made to be seen in landscape.</span></p>';
document.body.appendChild(rotateNote);

// ===== huong dan tuong tac =====
// may tinh co chuot thi hien chu "Click", dien thoai / ipad cam ung thi hien chu "Tap"
const isTouch = window.matchMedia("(hover: none)").matches;

const hints = [
  [".scene", "Scroll down to begin", "Swipe up to begin"],
  [".scene2", "Click the moon, a star, then the clock · Drag the clock hands", "Tap the moon, a star, then the clock · Drag the clock hands"],
  [".scene3", "Move your mouse to light up the dark", "Touch and slide your finger to light up the dark"],
  [".scene4", "Keep scrolling · Move your mouse over the pictures", "Keep scrolling · Touch the pictures"],
  [".scene5", "Click the star in the crack · Then move around inside the frame", "Tap the star in the crack · Then touch inside the frame"],
  [".scene6", "Click the glowing star", "Tap the glowing star"],
  [".scene7", "Keep scrolling", "Keep swiping up"],
  [".scene8", "Click the star in her hand · Click the beetle to start again", "Tap the star in her hand · Tap the beetle to start again"]
];

hints.forEach(function (item) {
  const hint = document.createElement("p");
  hint.className = "hint";
  hint.textContent = isTouch ? item[2] : item[1];
  document.querySelector(item[0]).appendChild(hint);
});


// ===== dien thoai: cham tay thay cho re chuot =====
// scene 3: ngon tay cham toi dau thi den roi toi do
const s3 = document.querySelector(".scene3");

function lightAt(touch) {
  const box = s3.getBoundingClientRect();
  const x = (touch.clientX - box.left) / box.width * 100;
  const y = (touch.clientY - box.top) / box.height * 100;
  s3.style.setProperty("--x", x + "%");
  s3.style.setProperty("--y", y + "%");
  s3.classList.add("touch-light");
  // vung cau tho (giong cac o poem-zone)
  if (x > 31 && x < 88 && y > 25 && y < 42) {
    s3.classList.add("touch-poem");
  }
}

s3.addEventListener("touchstart", function (event) {
  lightAt(event.touches[0]);
}, { passive: true });

s3.addEventListener("touchmove", function (event) {
  lightAt(event.touches[0]);
}, { passive: true });

s3.addEventListener("touchend", function () {
  s3.classList.remove("touch-light");
});

// scene 4, 5, 7: keo ngon tay tren khung -> gui "pointermove" giong nhu re chuot
let lastTouched = null;

document.addEventListener("touchmove", function (event) {
  const t = event.touches[0];
  const under = document.elementFromPoint(t.clientX, t.clientY);
  const target = under && under.closest(".eyes-closed, .eyes-open, .orb, .wing-panel, .gold-frame");
  if (target) {
    target.dispatchEvent(new PointerEvent("pointermove", { clientX: t.clientX, clientY: t.clientY }));
    lastTouched = target;
  }
}, { passive: true });

document.addEventListener("touchend", function () {
  if (lastTouched) {
    lastTouched.dispatchEvent(new PointerEvent("pointerleave"));
    lastTouched = null;
  }
});
