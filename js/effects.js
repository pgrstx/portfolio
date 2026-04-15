/* ============================================================
   effects.js — cursor glow, magnetic buttons, grain, terminal
   ============================================================ */

/* ── Custom Cursor (dot + ring + glow) ───────────────────── */
(function initCursor() {
  // Skip on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  const glow = document.getElementById('cursorGlow');
  if (!dot || !ring || !glow) return;

  // Mouse position (raw — dot snaps here immediately)
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  // Lagged position for ring and glow
  let rx = mx, ry = my;
  let gx = mx, gy = my;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    // Dot: instant
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animate() {
    // Ring lags behind mouse slightly
    rx = lerp(rx, mx, 0.18);
    ry = lerp(ry, my, 0.18);
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';

    // Glow lags behind a lot (soft ambient)
    gx = lerp(gx, mx, 0.06);
    gy = lerp(gy, my, 0.06);
    glow.style.left = gx + 'px';
    glow.style.top  = gy + 'px';

    requestAnimationFrame(animate);
  }
  animate();

  // Expand ring on interactive elements
  const hoverTargets = 'a, button, [data-magnetic], .skill-tag, .filter-btn, .project-card, .achievement-card, .nav__link';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.remove('cursor-hover');
    }
  });

  // Hide when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
})();

/* ── Magnetic Buttons ────────────────────────────────────── */
(function initMagnetic() {
  function applyMagnetic(el) {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.35;
      const dy = (e.clientY - cy) * 0.35;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  }

  document.querySelectorAll('[data-magnetic]').forEach(applyMagnetic);
})();

/* ── Project card radial glow on hover ───────────────────── */
document.addEventListener('mousemove', (e) => {
  document.querySelectorAll('.project-card').forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  });
});

/* ── Terminal Typewriter ─────────────────────────────────── */
(function initTerminal() {
  const cmdEl = document.getElementById('terminalCmd');
  const bodyEl = document.getElementById('terminalBody');
  if (!cmdEl || !bodyEl) return;

  const commands = [
    { cmd: 'pip install langchain langgraph openai', outputs: ['Successfully installed langchain', 'Successfully installed langgraph', 'Successfully installed openai'] },
    { cmd: 'pip install opencv-python mediapipe',    outputs: ['Successfully installed opencv-python', 'Successfully installed mediapipe'] },
    { cmd: 'python sar_pipeline.py --input sentinel1', outputs: ['[INFO] Loading SAR dataset...', '[INFO] Preprocessing complete.', '[INFO] Visualization saved.'] },
    { cmd: 'python inboxwhisper.py --mode agent',    outputs: ['[AGENT] LangGraph initialized.', '[AGENT] Inbox loaded: 42 emails.', '[AGENT] 7 tasks queued.'] },
  ];

  let cmdIdx = 0;
  let charIdx = 0;
  let phase = 'typing'; // typing | showing-output | deleting | pause
  let outputIdx = 0;
  let outputLines = [];

  const cursor = bodyEl.querySelector('.terminal__tcursor');

  function addOutputLine(text) {
    const line = document.createElement('div');
    line.className = 'terminal__line terminal__output';
    line.textContent = text;
    bodyEl.insertBefore(line, cursor.parentElement);
    if (bodyEl.children.length > 14) bodyEl.removeChild(bodyEl.children[0]);
  }

  function tick() {
    const current = commands[cmdIdx];

    if (phase === 'typing') {
      if (charIdx <= current.cmd.length) {
        cmdEl.textContent = current.cmd.slice(0, charIdx);
        charIdx++;
        setTimeout(tick, 60 + Math.random() * 40);
      } else {
        phase = 'pause-before-output';
        outputIdx = 0;
        outputLines = current.outputs;
        setTimeout(tick, 400);
      }
    } else if (phase === 'pause-before-output') {
      addOutputLine('$ ' + current.cmd);
      cmdEl.textContent = '';
      phase = 'showing-output';
      setTimeout(tick, 100);
    } else if (phase === 'showing-output') {
      if (outputIdx < outputLines.length) {
        addOutputLine(outputLines[outputIdx]);
        outputIdx++;
        setTimeout(tick, 180);
      } else {
        phase = 'pause-end';
        setTimeout(tick, 1800);
      }
    } else if (phase === 'pause-end') {
      cmdIdx = (cmdIdx + 1) % commands.length;
      charIdx = 0;
      phase = 'typing';
      setTimeout(tick, 300);
    }
  }

  // Only start when terminal enters view
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      observer.disconnect();
      setTimeout(tick, 600);
    }
  }, { threshold: 0.3 });

  const terminalEl = document.querySelector('.terminal');
  if (terminalEl) observer.observe(terminalEl);
})();
