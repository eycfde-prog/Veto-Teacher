/* ════════════════════════════════════════════
   EYCSB.js — VETO Smart Board Logic
   ════════════════════════════════════════════ */

'use strict';

// ════════════════════════════════════════════
// GAS API ENDPOINT
// ════════════════════════════════════════════
const GAS_API = 'https://script.google.com/macros/s/AKfycbzRHoIIbrET1d2Oa9YFfl8SPUc7mJwI_SgNy-ATJHb4ulWSuHyUidbJ3qNYeGc8gy0p6w/exec';

// ════════════════════════════════════════════


// ════════════════════════════════════════════
// SESSION DATA
// ════════════════════════════════════════════
const sessionData = {
  "1-1":["Grammar"],
  "1-2":["Listening","Grammar"],
  "1-3":["Listening","Vocab","Grammar"],
  "1-4":["Listening","Vocab","Grammar"],
  "2-1":["Listening","Grammar"],
  "2-2":["Listening","Reading","One Shot"],
  "2-3":["Listening","Vocab","Reading"],
  "2-4":["Listening","Vocab","Grammar","Reading","Tongue Twister","One Shot"],
  "3-1":["Listening","Grammar","Reading","Tongue Twister"],
  "3-2":["Listening","Reading","Tongue Twister","One Shot"],
  "3-3":["Listening","Vocab","Reading","Tongue Twister"],
  "3-4":["Listening","Vocab","Grammar","Reading","Tongue Twister","One Shot"],
  "4-1":["Listening","Grammar","Reading","Tongue Twister","Squeezer"],
  "4-2":["Listening","Reading","Tongue Twister","One Shot"],
  "4-3":["Listening","Vocab","Reading","Tongue Twister"],
  "4-4":["Listening","Vocab","Grammar","Reading","Tongue Twister","One Shot"],
  "5-1":["Listening","Grammar","Reading","Tongue Twister","Squeezer"],
  "5-2":["Listening","Reading","Tongue Twister","One Shot"],
  "5-3":["Listening","Vocab","Reading","Tongue Twister","DMT"],
  "5-4":["Listening","Vocab","Grammar","Reading","Tongue Twister","One Shot"],
  "6-1":["Listening","Grammar","Reading","Tongue Twister","Squeezer"],
  "6-2":["Listening","Reading","Tongue Twister","One Shot"],
  "6-3":["Listening","Vocab","Reading","Tongue Twister","Wish"],
  "6-4":["Listening","Vocab","Grammar","Reading","Tongue Twister","One Shot"],
  "7-1":["Listening","Grammar","Reading","Tongue Twister","Squeezer"],
  "7-2":["Listening","Reading","Tongue Twister","One Shot"],
  "7-3":["Listening","Vocab","Reading","Tongue Twister","DMT"],
  "7-4":["Listening","Vocab","Grammar","Reading","Tongue Twister","One Shot"],
  "8-1":["Listening","Grammar","Reading","Tongue Twister","Squeezer"],
  "8-2":["Listening","Reading","Tongue Twister","One Shot"],
  "8-3":["Listening","Vocab","Reading","Tongue Twister"],
  "8-4":["Listening","Vocab","Grammar","Reading","Tongue Twister","One Shot","Project"],
  "9-1":["Listening","Reading","Tongue Twister","Squeezer"],
  "9-2":["Listening","Reading","Tongue Twister","One Shot"],
  "9-3":["Listening","Vocab","Reading","Tongue Twister","Wish"],
  "9-4":["Listening","Vocab","Grammar","Reading","Tongue Twister","One Shot"],
  "10-1":["Listening","Reading","Tongue Twister","Squeezer"],
  "10-2":["Listening","Reading","Tongue Twister","One Shot"],
  "10-3":["Listening","Vocab","Reading","Tongue Twister","DMT"],
  "10-4":["Listening","Vocab","Reading","Tongue Twister","One Shot","Project"],
  "11-1":["Listening","Reading","Tongue Twister","Graduation Project"],
  "11-2":["Listening","Reading","Tongue Twister","One Shot","Graduation Project"],
  "11-3":["Listening","Reading","Tongue Twister","DMT","Graduation Project"],
  "11-4":["Listening","Reading","Tongue Twister","One Shot","Graduation Project"],
  "12-1":["Listening","Reading","Tongue Twister","Graduation Project"],
  "12-2":["Listening","Reading","Tongue Twister","Graduation Project"],
  "12-3":["Listening","Reading","Tongue Twister","DMT","Graduation Project"],
  "12-4":["Listening","Reading","Tongue Twister","Graduation Project"],
};

// ════════════════════════════════════════════
// IMAGE / BADGE MAPS
// ════════════════════════════════════════════
const IMG_MAP = [
    { match:/grammar/i,      img:'Grammar'            },
    { match:/listening/i,    img:'Listening'          },
    { match:/reading/i,      img:'Reading'            },
    { match:/vocab/i,        img:'Vocabulary'         },
    { match:/tongue/i,       img:'Tongue-twister'     },
    { match:/one.?shot/i,    img:'One-shot'           },
    { match:/squeezer/i,     img:'Squeezer'           },
    { match:/dmt/i,          img:'DMT'                },
    { match:/wish/i,         img:'Wish'               },
    { match:/graduation/i,   img:'Graduation-project' },
    { match:/project/i,      img:'Project'            },
    { match:/oral/i,         img:'Interview'          },
    { match:/presentation/i, img:'Graduation-project' },
];
const BADGE_MAP = [
    { match:/grammar/i,      label:'Grammar'        },
    { match:/listening/i,    label:'Listening'      },
    { match:/reading/i,      label:'Reading'        },
    { match:/vocab/i,        label:'Vocabulary'     },
    { match:/tongue/i,       label:'Tongue Twister' },
    { match:/one.?shot/i,    label:'One Shot'       },
    { match:/squeezer/i,     label:'Squeezer'       },
    { match:/dmt/i,          label:'DMT'            },
    { match:/wish/i,         label:'Wish'           },
    { match:/project/i,      label:'Project'        },
    { match:/graduation/i,   label:'Graduation'     },
    { match:/oral/i,         label:'Oral Exam'      },
];
function getImgSrc(n)  { for (const m of IMG_MAP)   if (m.match.test(n)) return `data/Actirobo/${m.img}.png`;  return 'data/Actirobo/Grammar.png'; }
function getBadge(n)   { for (const m of BADGE_MAP) if (m.match.test(n)) return m.label; return 'Activity'; }

// ════════════════════════════════════════════
// SESSION INIT
// ════════════════════════════════════════════
const params  = new URLSearchParams(window.location.search);
const SESSION = params.get('session') || '';

function init() {
    if (SESSION) {
        const [lvl, sess] = SESSION.split('-');
        document.getElementById('title-text').innerHTML = `LEVEL <span>${lvl}</span> &nbsp;·&nbsp; CLASS <span>${sess}</span>`;
    }
    if (!SESSION || !sessionData[SESSION]) {
        document.getElementById('grid').innerHTML = `<p style="color:var(--text-dim);padding:40px;grid-column:1/-1;text-align:center;font-size:.9rem;font-family:'Orbitron',sans-serif;letter-spacing:3px;">SESSION NOT FOUND: <strong style="color:var(--cyan)">${SESSION || '?'}</strong></p>`;
        return;
    }
    const grid = document.getElementById('grid');
    sessionData[SESSION].forEach(item => {
        const imgSrc = getImgSrc(item), badge = getBadge(item), scene = document.createElement('div');
        scene.className = 'card-scene';
        scene.onclick = () => openActivity(item);
        scene.innerHTML = `<div class="card"><div class="card-face"><div class="card-img-wrap"><img src="${imgSrc}" alt="${badge}" onerror="this.style.opacity='0'"></div><div class="card-label"><span class="card-type">${badge}</span><span class="card-name">${item}</span></div></div><div class="card-shine"></div><div class="card-edge"></div><div class="cc tl"></div><div class="cc tr"></div><div class="cc bl"></div><div class="cc br"></div></div>`;
        grid.appendChild(scene);
        setupTilt(scene);
    });
    const cv = document.getElementById('draw-canvas');
    cv.width = window.innerWidth; cv.height = window.innerHeight;
    window.addEventListener('resize', () => { cv.width = window.innerWidth; cv.height = window.innerHeight; });
    setupFreeze(); setupLaser();
    // Init wheel speed display
    const spd = document.getElementById('wn-speed');
    if (spd) {
        spd.addEventListener('input', () => {
            document.getElementById('wn-speed-val').textContent = spd.value + ' second' + (spd.value > 1 ? 's' : '');
        });
    }
}

// ════════════════════════════════════════════
// 3D TILT
// ════════════════════════════════════════════
function setupTilt(scene) {
    const card = scene.querySelector('.card'), MAX = 15;
    const apply = (rx, ry) => { card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`; };
    scene.addEventListener('mousemove', e => {
        const r = scene.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        apply(-y * MAX, x * MAX);
        scene.querySelector('.card-shine').style.background = `radial-gradient(circle at ${(x+.5)*100}% ${(y+.5)*100}%,rgba(0,212,255,0.08) 0%,transparent 60%)`;
    });
    scene.addEventListener('mouseleave', () => { card.style.transform = 'rotateX(0)rotateY(0)translateZ(0)'; card.style.transition = 'transform .6s cubic-bezier(.23,1,.32,1)'; });
    scene.addEventListener('mouseenter', () => { card.style.transition = 'transform .12s ease-out'; });
    scene.addEventListener('touchmove', e => {
        const t = e.touches[0], r = scene.getBoundingClientRect();
        apply(-((t.clientY - r.top) / r.height - .5) * MAX * .6, ((t.clientX - r.left) / r.width - .5) * MAX * .6);
    }, { passive: true });
    scene.addEventListener('touchend', () => { card.style.transform = 'rotateX(0)rotateY(0)translateZ(0)'; });
}

// ════════════════════════════════════════════
// ACTIVITY REGISTRY
// لإضافة نشاط جديد: أضف سطر واحد هنا بس
// ════════════════════════════════════════════
const ACTIVITY_REGISTRY = {
    listening: {
        engine: () => ListeningEngine,
        getData: (lvl, sess) => {
            const sessNum   = parseInt(sess);
            const levelData = LISTENING_DATA[`level_${lvl}`];
            if (!levelData) throw new Error(`No listening data for Level ${lvl}`);
            const targetClass = sessNum === 1 ? 1 : sessNum - 1;
            const classData   = levelData[`class_${targetClass}`];
            if (!classData) throw new Error(`No listening data for session ${lvl}-${sess}`);
            const audioBase = `data/Listening/wav/Level-${lvl}/Session ${targetClass}/`;
            return [{ ...classData, audioBaseUrl: audioBase }];
        }
    },
    grammar: {
        engine: () => GrammarEngine,
        getData: (lvl, sess) => {
            const key  = `${lvl}-${sess}`;
            const data = GRAMMAR_DATA.lessons[key];
            if (!data) throw new Error(`No grammar data for session ${key}`);
            return data;
        }
    },
    vocab: {
        engine: () => VocabEngine,
        getData: (lvl, sess) => {
            const key  = lvl + "-" + sess;
            const data = VOCABULARY_DATA.lessons[key];
            if (!data) throw new Error("No vocabulary data for session " + key);
            return data;
        }
    },
    reading: {
        engine: () => ReadingEngine,
        getData: (lvl, sess) => {
            const key  = lvl + "-" + sess;
            const data = READING_DATA.lessons[key];
            if (!data) throw new Error("No reading data for session " + key);
            return data;
        }
    },
    "one shot": {
        engine: () => OneShotEngine,
        getData: (lvl, sess) => {
            const key  = lvl + "-" + sess;
            const data = ONE_SHOT_DATA.lessons[key];
            if (!data) throw new Error("No one shot data for session " + key);
            return data;
        }
    },
    "tongue twister": {
        engine: () => TongueTwisterEngine,
        getData: (lvl, sess) => {
            const key  = lvl + "-" + sess;
            const data = TONGUE_TWISTER_DATA.lessons[key];
            if (!data) throw new Error("No tongue twister data for session " + key);
            return data;
        }
    },
    squeezer: {
        engine: () => SqueezerEngine,
        getData: (lvl, sess) => {
            const key  = lvl + "-" + sess;
            const data = SQUEEZER_DATA.lessons[key];
            if (!data) throw new Error("No squeezer data for session " + key);
            return data;
        }
    },
    project: {
        engine: () => ProjectEngine,
        getData: (lvl, sess) => {
            const key  = lvl + "-" + sess;
            const data = PROJECT_DATA.lessons[key];
            if (!data) throw new Error("No project data for session " + key);
            return data;
        }
    },
    wish: {
        engine: () => WishEngine,
        getData: (lvl, sess) => {
            const key  = lvl + "-" + sess;
            const data = WISH_DATA.lessons[key];
            if (!data) throw new Error("No wish data for session " + key);
            return data;
        }
    },
    dmt: {
        engine: () => DMTEngine,
        getData: (lvl, sess) => {
            const key  = lvl + "-" + sess;
            const data = DMT_DATA.lessons[key];
            if (!data) throw new Error("No DMT data for session " + key);
            return data;
        }
    },
};

// ════════════════════════════════════════════
// ACTIVITY DISPATCHER
// ════════════════════════════════════════════
function openActivity(name) {
    if (!SESSION) return;
    const [lvl, sess] = SESSION.split('-');
    const stage  = document.getElementById('stage');
    const loader = document.getElementById('stage-loader');
    const content= document.getElementById('stage-content');
    stage.style.display = 'block'; loader.style.display = 'flex'; content.innerHTML = '';

    try {
        // normalise: "Tongue Twister" → "tongue twister", "One Shot" → "one shot"
        const key      = name.toLowerCase().trim().replace(/\s+/g, ' ');
        const activity = ACTIVITY_REGISTRY[key];

        if (!activity) {
            // نشاط مش عنده engine بعد
            loader.style.display = 'none';
            content.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:16px;color:#c5a059;font-family:'Orbitron',sans-serif;">
                    <span style="font-size:2.5rem;">🔧</span>
                    <span style="font-size:1rem;letter-spacing:4px;">${name.toUpperCase()}</span>
                    <span style="font-size:.7rem;color:rgba(255,255,255,0.4);letter-spacing:2px;">ENGINE COMING SOON</span>
                </div>`;
            return;
        }

        const data   = activity.getData(lvl, sess);
        const engine = activity.engine();
        loader.style.display = 'none';
        engine.init(data);

    } catch (err) {
        console.error('WOLF System Error:', err);
        loader.style.display = 'none';
        content.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:16px;color:#ff4757;font-family:'Orbitron',sans-serif;">
                <span style="font-size:2.5rem;">⚠</span>
                <span style="font-size:1.2rem;letter-spacing:4px;">ACTIVITY ERROR</span>
                <span style="font-size:.75rem;color:rgba(255,255,255,0.5);letter-spacing:2px;">${err.message}</span>
            </div>`;
    }
}

function closeStage() {
    document.getElementById('stage').style.display = 'none';
    document.getElementById('stage-content').innerHTML = '';
    document.getElementById('stage-loader').style.display = 'none';
    // أوقف أي صوت وامسح keyboard handler
    document.onkeydown = null;
    if (typeof ListeningEngine !== 'undefined' && ListeningEngine.audioPlayer) {
        ListeningEngine.audioPlayer.pause();
    }
    if (typeof VocabEngine !== 'undefined' && VocabEngine.audio) {
        VocabEngine.audio.pause();
        VocabEngine.audio = null;
    }
    if (typeof GrammarEngine !== 'undefined') {
        GrammarEngine.currentSlide = 0;
        GrammarEngine.subStep = 0;
    }
}


// ════════════════════════════════════════════
// WHEEL OF NAMES ENGINE
// ════════════════════════════════════════════
const WheelEngine = {
    names: [],
    spinning: false,
    rotation: 0,
    ctx: null,
    canvas: null,
    RAF: null,

    // Alphabet without z, x, q
    ALPHABET: 'ABCDEFGHIJKLMNOPRSTUVWY'.split(''),

    COLORS: [
        '#1a3a5c','#2d1b4e','#1a4a2e','#4a2d1b',
        '#1b3a4a','#3a1b2d','#2a3a1a','#1a2d4a',
        '#3d1a1a','#1a3d3a','#3a3d1a','#2a1a3d',
    ],

    init() {
        this.canvas = document.getElementById('wheel-canvas');
        this.ctx    = this.canvas.getContext('2d');
        this._resize();
        window.addEventListener('resize', () => this._resize());
    },

    _resize() {
        const wrap = document.querySelector('.wheel-canvas-wrap');
        if (!wrap) return;
        const size = Math.min(wrap.clientWidth - 60, wrap.clientHeight - 60, 600);
        this.canvas.width  = size;
        this.canvas.height = size;
        this._draw();
    },

    _draw() {
        const { ctx, canvas, names, rotation } = this;
        const cx = canvas.width / 2, cy = canvas.height / 2, r = cx - 4;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (names.length === 0) {
            ctx.fillStyle = 'rgba(197,160,89,0.08)';
            ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = 'rgba(197,160,89,0.3)'; ctx.lineWidth = 3;
            ctx.stroke();
            ctx.fillStyle = 'rgba(197,160,89,0.4)';
            ctx.font = `bold ${r * 0.12}px Orbitron, sans-serif`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText('ADD NAMES', cx, cy);
            return;
        }

        const sliceAngle = (Math.PI * 2) / names.length;

        names.forEach((name, i) => {
            const startAngle = rotation + i * sliceAngle;
            const endAngle   = startAngle + sliceAngle;
            const color      = this.COLORS[i % this.COLORS.length];

            // Slice fill
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, r, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();

            // Slice border
            ctx.strokeStyle = 'rgba(255,255,255,0.12)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Text
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(startAngle + sliceAngle / 2);
            const maxW   = r * 0.55;
            const fontSize = Math.max(10, Math.min(20, r * 0.07));
            ctx.font = `bold ${fontSize}px Arial, sans-serif`;
            ctx.fillStyle = 'yellow';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Shadow color
            ctx.shadowBlur = 2; // Blur radius
            ctx.shadowOffsetX = 1; // Horizontal offset
            ctx.shadowOffsetY = 1; // Vertical offset
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            // Truncate if needed
            let label = name;
            while (ctx.measureText(label).width > maxW && label.length > 3) label = label.slice(0, -1);
            if (label !== name) label = label.slice(0, -1) + '…';
            ctx.fillText(label, r - 12, 0);
            ctx.restore();
        });

        // Center circle
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.12);
        grad.addColorStop(0, '#1a1f3a'); grad.addColorStop(1, '#0c0f1e');
        ctx.beginPath(); ctx.arc(cx, cy, r * 0.12, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();
        ctx.strokeStyle = 'rgba(197,160,89,0.6)'; ctx.lineWidth = 2; ctx.stroke();

        // 3D bevel ring
        const bevel = ctx.createRadialGradient(cx, cy, r - 8, cx, cy, r + 2);
        bevel.addColorStop(0, 'rgba(255,255,255,0.15)');
        bevel.addColorStop(1, 'rgba(0,0,0,0.4)');
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = bevel; ctx.lineWidth = 8; ctx.stroke();
    },

    addName(forceName) {
        const input = document.getElementById('wn-add-input');
        const name  = (forceName || input.value).trim();
        if (!name) return;
        if (!this.names.includes(name)) {
            this.names.push(name);
            this._updateList();
            this._draw();
        }
        if (!forceName) input.value = '';
    },

    removeName(idx) {
        this.names.splice(idx, 1);
        this._updateList();
        this._draw();
    },

    _updateList() {
        const list = document.getElementById('wn-name-list');
        const count= document.getElementById('wn-count');
        count.textContent = this.names.length;
        list.innerHTML = this.names.map((n, i) =>
            `<div class="wn-name-item">
                <span>${n}</span>
                <button class="wn-name-remove" onclick="WheelEngine.removeName(${i})">✕</button>
             </div>`
        ).join('');
        document.getElementById('wn-spin-btn').disabled = this.names.length < 2;
    },

    loadAlphabet() {
        this.names = [...this.ALPHABET];
        this._updateList();
        this._draw();
    },

    async assembleFromGas() {
        const day  = document.getElementById('wn-day').value;
        const time = document.getElementById('wn-time').value;
        const st   = document.getElementById('wn-status');
        if (!day || !time) { this._setStatus('SELECT DAY AND TIME FIRST', 'error'); return; }
        this._setStatus('SCANNING AGENTS...', 'loading');
        try {
            const query = encodeURIComponent(`${day} ${time}`);
            const res   = await fetch(`${GAS_API}?action=getStudentsByGroup&group=${query}`);
            const data  = await res.json();
            if (data.status !== 'success' || !data.names || data.names.length === 0) {
                this._setStatus('NO AGENTS FOUND', 'error'); return;
            }
            this.names = data.names;
            this._updateList();
            this._draw();
            this._setStatus(`✓ ${data.names.length} AGENTS LOADED`, 'success');
        } catch (e) {
            this._setStatus('CONNECTION ERROR', 'error');
        }
    },

    _setStatus(msg, type) {
        const el = document.getElementById('wn-status');
        el.textContent = msg; el.className = 'wn-status ' + type;
        if (type === 'success') setTimeout(() => { el.className = 'wn-status'; }, 3000);
    },

    spin() {
        if (this.spinning || this.names.length < 2) return;
        this.spinning = true;
        document.getElementById('wn-spin-btn').disabled = true;

        const duration    = parseInt(document.getElementById('wn-speed').value) * 1000;
        const extraSpins  = (Math.random() * 4 + 6) * Math.PI * 2;  // 6–10 full turns
        const sliceAngle  = (Math.PI * 2) / this.names.length;
        const winnerIdx   = Math.floor(Math.random() * this.names.length);
        // Calculate final rotation so pointer (top = -π/2) lands on winner
        const targetAngle = -Math.PI / 2 - (winnerIdx * sliceAngle + sliceAngle / 2);
        const finalRot    = this.rotation + extraSpins + (targetAngle - ((this.rotation + extraSpins) % (Math.PI * 2)));

        const startTime = performance.now();
        const startRot  = this.rotation;
        const ease = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2; // ease in-out cubic

        const animate = (now) => {
            const elapsed  = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            this.rotation  = startRot + (finalRot - startRot) * ease(progress);
            this._draw();
            if (progress < 1) {
                this.RAF = requestAnimationFrame(animate);
            } else {
                this.spinning = false;
                this._showWinner(this.names[winnerIdx]);
            }
        };
        this.RAF = requestAnimationFrame(animate);
    },

    _showWinner(name) {
        document.getElementById('wheel-winner-name').textContent = name;
        const overlay = document.getElementById('wheel-winner');
        overlay.classList.add('active');
        this._spawnConfetti();
    },

    dismissWinner() {
        document.getElementById('wheel-winner').classList.remove('active');
        document.getElementById('wn-spin-btn').disabled = this.names.length < 2;
    },

    _spawnConfetti() {
        const wrap   = document.getElementById('wheel-confetti');
        wrap.innerHTML = '';
        const colors = ['#c5a059','#00d4ff','#ff4757','#00ff88','#fff','#ffb347'];
        for (let i = 0; i < 80; i++) {
            const el = document.createElement('div');
            el.className = 'confetti-piece';
            el.style.cssText = `
                left:${Math.random()*100}%;
                top:${-10 - Math.random()*20}px;
                background:${colors[Math.floor(Math.random()*colors.length)]};
                width:${6+Math.random()*8}px;
                height:${6+Math.random()*8}px;
                border-radius:${Math.random()>0.5?'50%':'2px'};
                animation-duration:${1.5+Math.random()*2}s;
                animation-delay:${Math.random()*0.5}s;
            `;
            wrap.appendChild(el);
        }
    }
};

// ════════════════════════════════════════════
// TIMER ENGINE
// ════════════════════════════════════════════
const TimerEngine = {
    totalSeconds: 300,
    remaining:    300,
    running:      false,
    interval:     null,
    tickAudio:    new Audio('data/Tick.wav'),
    endAudio:     new Audio('data/Timer.wav'),

    setTime(minutes) {
        this.reset();
        this.totalSeconds = minutes * 60;
        this.remaining    = this.totalSeconds;
        this._render();
        // Highlight preset btn
        document.querySelectorAll('.timer-preset-btn').forEach(b => b.classList.remove('active'));
        event.target.classList.add('active');
    },

    setCustomTime() {
        const val = parseInt(document.getElementById('timer-custom-input').value);
        if (!val || val < 1) return;
        this.reset();
        this.totalSeconds = val * 60;
        this.remaining    = this.totalSeconds;
        this._render();
        document.querySelectorAll('.timer-preset-btn').forEach(b => b.classList.remove('active'));
    },

    toggle() {
        if (this.running) this.pause(); else this.start();
    },

    start() {
        if (this.remaining <= 0) return;
        this.running = true;
        document.getElementById('timer-start-btn').textContent = '⏸ PAUSE';
        document.getElementById('timer-start-btn').classList.add('running');
        this.interval = setInterval(() => {
            this.remaining--;
            // Tick on last 5 seconds
            if (this.remaining <= 5 && this.remaining > 0) {
                this.tickAudio.currentTime = 0;
                this.tickAudio.play().catch(() => {});
            }
            if (this.remaining <= 0) {
                this.remaining = 0;
                this._render();
                this.pause();
                this.endAudio.currentTime = 0;
                this.endAudio.play().catch(() => {});
                return;
            }
            this._render();
        }, 1000);
    },

    pause() {
        this.running = false;
        clearInterval(this.interval);
        document.getElementById('timer-start-btn').textContent = '▶ START';
        document.getElementById('timer-start-btn').classList.remove('running');
    },

    reset() {
        this.pause();
        this.remaining = this.totalSeconds;
        this._render();
    },

    _render() {
        const m   = Math.floor(this.remaining / 60).toString().padStart(2, '0');
        const s   = (this.remaining % 60).toString().padStart(2, '0');
        const disp= document.getElementById('timer-display');
        const bar = document.getElementById('timer-bar');
        const danger = this.remaining <= 5 && this.remaining > 0;

        disp.textContent = `${m}:${s}`;
        disp.classList.toggle('danger', danger);

        const pct = this.totalSeconds > 0 ? (this.remaining / this.totalSeconds) * 100 : 100;
        bar.style.width = pct + '%';
        bar.classList.toggle('danger', this.remaining <= 10);
    }
};

// ════════════════════════════════════════════
// TOOL OVERLAYS — open/close
// ════════════════════════════════════════════
function openWheel() {
    document.getElementById('toolbox').classList.remove('open');
    document.getElementById('wheel-overlay').classList.add('active');
    // Init canvas after visible
    setTimeout(() => WheelEngine.init(), 50);
}
function closeWheel() {
    document.getElementById('wheel-overlay').classList.remove('active');
    if (WheelEngine.RAF) cancelAnimationFrame(WheelEngine.RAF);
}

function openTimer() {
    document.getElementById('toolbox').classList.remove('open');
    document.getElementById('timer-overlay').classList.add('active');
    TimerEngine._render();
}
function closeTimer() {
    document.getElementById('timer-overlay').classList.remove('active');
    TimerEngine.pause();
}

// ════════════════════════════════════════════
// TOOLBOX
// ════════════════════════════════════════════
function toggleToolbox() { document.getElementById('toolbox').classList.toggle('open'); }

// ════════════════════════════════════════════
// LASER
// ════════════════════════════════════════════
let laserOn = false;
const laser  = document.getElementById('laser');
const canvas = document.getElementById('draw-canvas');
const ctx    = canvas.getContext('2d');

function toggleLaser() {
    laserOn = !laserOn;
    document.getElementById('btn-laser').classList.toggle('on', laserOn);
    canvas.style.pointerEvents = laserOn ? 'auto' : 'none';
    if (!laserOn) { laser.style.display = 'none'; ctx.clearRect(0, 0, canvas.width, canvas.height); }
}
function setupLaser() {
    canvas.addEventListener('mousedown', e => {
        if (!laserOn) return;
        laser.style.display = 'block';
        ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.beginPath();
        ctx.strokeStyle = '#ff2020'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.moveTo(e.clientX, e.clientY);
        const draw = m => { ctx.lineTo(m.clientX, m.clientY); ctx.stroke(); laser.style.left = (m.clientX-9)+'px'; laser.style.top = (m.clientY-9)+'px'; };
        const stop = () => { laser.style.display='none'; ctx.clearRect(0,0,canvas.width,canvas.height); canvas.removeEventListener('mousemove',draw); canvas.removeEventListener('mouseup',stop); };
        canvas.addEventListener('mousemove', draw); canvas.addEventListener('mouseup', stop);
    });
}

// ════════════════════════════════════════════
// FREEZE
// ════════════════════════════════════════════
let freezeOn=false, fscale=1, fpx=0, fpy=0, fdrag=false, fsx=0, fsy=0;
function toggleFreeze() {
    const ly=document.getElementById('freeze-layer'), fc=document.getElementById('freeze-content'), btn=document.getElementById('btn-freeze');
    if (!freezeOn) {
        const tgt = document.getElementById('stage').style.display==='block' ? document.getElementById('stage') : document.body;
        html2canvas(tgt, { useCORS:true, allowTaint:true }).then(snap => {
            fc.innerHTML=''; fc.appendChild(snap); fscale=1; fpx=0; fpy=0; applyFT();
            ly.style.display='block'; freezeOn=true; btn.classList.add('on');
        });
    } else { ly.style.display='none'; freezeOn=false; btn.classList.remove('on'); }
}
function applyFT() { document.getElementById('freeze-content').style.transform=`translate(${fpx}px,${fpy}px)scale(${fscale})`; }
function setupFreeze() {
    const ly = document.getElementById('freeze-layer');
    ly.addEventListener('wheel', e => { if(!freezeOn)return; e.preventDefault(); fscale=Math.min(5,Math.max(.4,fscale*(e.deltaY>0?.9:1.1))); applyFT(); }, {passive:false});
    const sd = e => { if(!freezeOn)return; fdrag=true; const t=e.touches?e.touches[0]:e; fsx=t.clientX-fpx; fsy=t.clientY-fpy; };
    const md = e => { if(!fdrag||!freezeOn)return; const t=e.touches?e.touches[0]:e; fpx=t.clientX-fsx; fpy=t.clientY-fsy; applyFT(); };
    ly.addEventListener('mousedown',sd); ly.addEventListener('touchstart',sd,{passive:true});
    window.addEventListener('mousemove',md); window.addEventListener('touchmove',md,{passive:true});
    window.addEventListener('mouseup',()=>{fdrag=false;}); window.addEventListener('touchend',()=>{fdrag=false;});
}

// ════════════════════════════════════════════
// NOTE
// ════════════════════════════════════════════
function toggleNote() {
    const ov = document.getElementById('note-overlay'), open = ov.style.display==='flex';
    ov.style.display = open ? 'none' : 'flex';
    if (!open) setTimeout(() => document.getElementById('note-textarea').focus(), 80);
}

// ════════════════════════════════════════════
// VETO PORTAL
// ════════════════════════════════════════════
let currentEmail = null;
const PORTAL_ACTIVITIES = [
    {label:'Attendance',col:'Attendence'},{label:'ICA',col:'ICA'},
    {label:'Listening',col:'Listening'},{label:'Grammar',col:'Grammar'},
    {label:'Reading',col:'Reading'},{label:'Tongue Twister',col:'Tongue Twister'},
    {label:'One Shot',col:'One Shot'},{label:'Games',col:'Games'},
    {label:'Squeezer',col:'Squeezer'},{label:'DMT',col:'DMT'},
    {label:'Wish',col:'Wish'},{label:'Project',col:'Project'},
    {label:'Graduation Project',col:'Graduation Project'},
];

function setGradesLocked(locked) {
    document.querySelectorAll('.grade-input').forEach(inp => { inp.disabled = locked; });
    document.getElementById('portal-submit-btn').disabled = locked;
    document.querySelectorAll('.grade-cell').forEach(c => c.classList.toggle('locked-cell', locked));
}
function openPortal() {
    document.getElementById('portal-overlay').classList.add('active');
    document.getElementById('toolbox').classList.remove('open');
    buildGradesGrid(); setGradesLocked(true);
    document.getElementById('portal-lock-msg').classList.add('visible');
    document.getElementById('portal-student-card').style.display = 'none';
    setTimeout(() => document.getElementById('portal-code-input').focus(), 200);
}
function closePortal() { document.getElementById('portal-overlay').classList.remove('active'); resetPortal(); }
function resetPortal() {
    currentEmail = null;
    document.getElementById('portal-code-input').value = '';
    document.getElementById('portal-student-card').style.display = 'none';
    document.getElementById('portal-lock-msg').classList.add('visible');
    setStatus('', ''); buildGradesGrid(); setGradesLocked(true);
}
function buildGradesGrid() {
    const grid = document.getElementById('portal-grades-grid'); grid.innerHTML = '';
    PORTAL_ACTIVITIES.forEach(act => {
        const cell = document.createElement('div'); cell.className = 'grade-cell';
        cell.innerHTML = `<div class="grade-label">${act.label.toUpperCase()}</div><input class="grade-input" type="number" min="0" max="100" step="0.5" placeholder="—" data-col="${act.col}" disabled>`;
        grid.appendChild(cell);
    });
    const bc = document.createElement('div'); bc.className = 'grade-cell bonus-cell';
    bc.innerHTML = `<div class="grade-label bonus-lbl">BONUS</div><input class="grade-input bonus-inp" type="number" min="0" max="9999" step="1" placeholder="—" data-col="Bonus" disabled>`;
    grid.appendChild(bc);
}
function setStatus(msg, type) {
    const el = document.getElementById('portal-status');
    if (!msg) { el.style.display='none'; return; }
    el.textContent = msg; el.className = type; el.style.display = 'block';
}
function renderStars(n) {
    let h=''; for(let i=0;i<10;i++) h+=`<span class="psc-star ${i<n?'':'empty'}">★</span>`; return h;
}
async function fetchStudent() {
    const code = document.getElementById('portal-code-input').value.trim().toUpperCase();
    if (!code) { setStatus('ENTER AGENT CODE','error'); return; }
    setStatus('SCANNING AGENT...','loading');
    document.getElementById('portal-student-card').style.display='none';
    document.getElementById('portal-lock-msg').classList.add('visible');
    currentEmail=null; setGradesLocked(true);
    try {
        const cleanCode = code.replace(/^V-/i,'');
        const res  = await fetch(`${GAS_API}?action=getStudentByOfflineCode&offlineCode=${encodeURIComponent(cleanCode)}`);
        const data = await res.json();
        if (data.status !== 'success') { setStatus('AGENT NOT FOUND — CHECK CODE','error'); return; }
        const s = data.data; currentEmail = s.email;
        document.getElementById('portal-name').textContent    = s.name   || '—';
        document.getElementById('portal-group').textContent   = s.group  || '—';
        document.getElementById('portal-tokens').textContent  = (s.tokens||0).toLocaleString();
        document.getElementById('portal-stars-count').textContent = s.stars||0;
        document.getElementById('portal-stars-row').innerHTML = renderStars(s.stars||0);
        document.getElementById('portal-rank-full').textContent = '#'+(s.globalRank||'—');
        const av = document.getElementById('portal-avatar');
        av.src = s.avatar||''; av.style.opacity='1'; av.onerror=()=>{av.style.opacity='0';};
        document.getElementById('portal-student-card').style.display='block';
        document.getElementById('portal-lock-msg').classList.remove('visible');
        setStatus('',''); buildGradesGrid(); setGradesLocked(false);
        const first = document.querySelector('.grade-input'); if(first) setTimeout(()=>first.focus(),100);
    } catch(err) { setStatus('CONNECTION ERROR','error'); }
}
async function submitGrades() {
    if (!currentEmail) { setStatus('SCAN AGENT FIRST','error'); return; }
    const inputs  = [...document.querySelectorAll('.grade-input')];
    const payload = inputs.filter(inp=>inp.value.trim()!==''&&!isNaN(parseFloat(inp.value))).map(inp=>({col:inp.getAttribute('data-col'),grade:parseFloat(inp.value)}));
    if (payload.length===0) { setStatus('NO SCORES ENTERED','error'); return; }
    const btn = document.getElementById('portal-submit-btn'); btn.disabled=true; setStatus('SENDING...','loading');
    try {
        await fetch(`${GAS_API}?action=updateGrades&email=${encodeURIComponent(currentEmail)}&grades=${encodeURIComponent(JSON.stringify(payload))}`);
        setStatus('✓ SCORES UPLOADED — READY FOR NEXT AGENT','success');
        btn.disabled=false;
        setTimeout(()=>{ resetPortal(); document.getElementById('portal-code-input').focus(); },2200);
    } catch(err) { setStatus('CONNECTION ERROR','error'); btn.disabled=false; }
}

// ════════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ════════════════════════════════════════════
window.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (document.getElementById('portal-overlay').classList.contains('active'))   { closePortal();  return; }
    if (document.getElementById('wheel-overlay').classList.contains('active'))    { closeWheel();   return; }
    if (document.getElementById('timer-overlay').classList.contains('active'))    { closeTimer();   return; }
    if (document.getElementById('note-overlay').style.display==='flex')           { document.getElementById('note-overlay').style.display='none'; return; }
    if (freezeOn)                                                                  { toggleFreeze(); return; }
    if (document.getElementById('stage').style.display==='block')                 { closeStage();   }
});

// ════════════════════════════════════════════
// BOOT
// ════════════════════════════════════════════
window.addEventListener('load', () => init());
