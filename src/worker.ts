const html = String.raw`<!doctype html>
<html lang="th">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Claude Channel Setup Guide</title>
  <style>
    :root {
      color-scheme: dark;
      --bg: #111318;
      --ink: #f5f7fb;
      --muted: #aeb7c8;
      --line: rgba(255,255,255,.14);
      --panel: rgba(255,255,255,.075);
      --accent: #3dd6a3;
      --accent2: #72a7ff;
      --warn: #ffcc66;
      --bad: #ff7a90;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      background:
        radial-gradient(circle at 18% 12%, rgba(61,214,163,.22), transparent 30rem),
        radial-gradient(circle at 82% 22%, rgba(114,167,255,.20), transparent 28rem),
        linear-gradient(135deg, #111318 0%, #1b1e27 48%, #10151d 100%);
      color: var(--ink);
      overflow: hidden;
    }
    .deck {
      min-height: 100vh;
      display: grid;
      grid-template-rows: auto 1fr auto;
    }
    header, footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 18px clamp(18px, 4vw, 44px);
      color: var(--muted);
      font-size: 14px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      color: var(--ink);
    }
    .mark {
      width: 28px;
      height: 28px;
      display: grid;
      place-items: center;
      border: 1px solid var(--line);
      background: var(--panel);
      border-radius: 7px;
      color: var(--accent);
    }
    .progress {
      height: 4px;
      background: rgba(255,255,255,.10);
      border-radius: 99px;
      overflow: hidden;
      flex: 1;
      max-width: 360px;
    }
    .bar {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, var(--accent), var(--accent2));
      transition: width .24s ease;
    }
    main {
      position: relative;
      overflow: hidden;
    }
    .slide {
      position: absolute;
      inset: 0;
      display: grid;
      align-content: center;
      gap: 22px;
      padding: clamp(26px, 5vw, 64px);
      opacity: 0;
      transform: translateX(48px);
      pointer-events: none;
      transition: opacity .22s ease, transform .22s ease;
    }
    .slide.active {
      opacity: 1;
      transform: translateX(0);
      pointer-events: auto;
    }
    .kicker {
      color: var(--accent);
      font-weight: 800;
      letter-spacing: 0;
      text-transform: uppercase;
      font-size: 13px;
    }
    h1, h2 {
      margin: 0;
      line-height: 1.08;
      letter-spacing: 0;
    }
    h1 {
      font-size: clamp(42px, 8vw, 92px);
      max-width: 980px;
    }
    h2 {
      font-size: clamp(32px, 5vw, 62px);
      max-width: 960px;
    }
    p {
      margin: 0;
      max-width: 980px;
      color: var(--muted);
      font-size: clamp(18px, 2.4vw, 28px);
      line-height: 1.55;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
      max-width: 1100px;
    }
    .two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .card {
      border: 1px solid var(--line);
      background: var(--panel);
      border-radius: 8px;
      padding: 18px;
      min-height: 132px;
    }
    .card b {
      display: block;
      font-size: 19px;
      margin-bottom: 8px;
    }
    .card span, li {
      color: var(--muted);
      font-size: 16px;
      line-height: 1.55;
    }
    code, pre {
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }
    pre {
      margin: 0;
      white-space: pre-wrap;
      max-width: 1050px;
      border: 1px solid var(--line);
      background: rgba(0,0,0,.26);
      border-radius: 8px;
      padding: 18px;
      color: #e9edf7;
      font-size: clamp(13px, 1.7vw, 17px);
      line-height: 1.5;
    }
    ul {
      margin: 0;
      padding-left: 22px;
      max-width: 1000px;
    }
    li { margin: 8px 0; }
    .flow {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      align-items: stretch;
      gap: 10px;
      max-width: 1120px;
    }
    .node {
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 16px;
      background: rgba(255,255,255,.08);
      min-height: 110px;
    }
    .node strong {
      display: block;
      font-size: 18px;
      margin-bottom: 6px;
    }
    .node small {
      color: var(--muted);
      line-height: 1.45;
    }
    .warn { color: var(--warn); }
    .bad { color: var(--bad); }
    .controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    button {
      width: 40px;
      height: 40px;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--panel);
      color: var(--ink);
      font-size: 20px;
      cursor: pointer;
    }
    button:hover { border-color: rgba(255,255,255,.36); }
    .counter { min-width: 64px; text-align: center; }
    @media (max-width: 820px) {
      body { overflow: hidden; }
      header, footer { padding: 14px 16px; }
      .grid, .grid.two, .flow { grid-template-columns: 1fr; }
      .slide {
        align-content: start;
        overflow-y: auto;
        padding: 24px 18px 96px;
      }
      h1 { font-size: 42px; }
      h2 { font-size: 34px; }
      p { font-size: 18px; }
      .progress { max-width: 160px; }
    }
  </style>
</head>
<body>
  <div class="deck">
    <header>
      <div class="brand"><div class="mark">⌘</div> Claude Channel</div>
      <div class="progress" aria-hidden="true"><div class="bar" id="bar"></div></div>
      <div class="counter" id="counter">1 / 12</div>
    </header>

    <main id="slides">
      <section class="slide active">
        <div class="kicker">Setup Guide</div>
        <h1>ตั้งค่า Discord Bot ให้เป็นช่องทางคุยกับ Claude Code Oracle</h1>
        <p>คู่มือแบบ generic สำหรับสร้าง bot, ผูก channel directory, เปิด access control และ launch Claude พร้อม Discord plugin</p>
      </section>

      <section class="slide">
        <div class="kicker">ภาพรวม</div>
        <h2>Claude Channel คืออะไร</h2>
        <div class="flow">
          <div class="node"><strong>Discord</strong><small>ผู้ใช้คุยผ่าน channel หรือ DM</small></div>
          <div class="node"><strong>Bot Token</strong><small>ตัวตนของ bot ใน server</small></div>
          <div class="node"><strong>Channel Dir</strong><small>เก็บ .env, access.json, inbox</small></div>
          <div class="node"><strong>Plugin</strong><small>plugin:discord เชื่อม Claude กับ Discord</small></div>
          <div class="node"><strong>Oracle</strong><small>Claude Code session ที่มี context ของ repo</small></div>
        </div>
      </section>

      <section class="slide">
        <div class="kicker">Prerequisites</div>
        <h2>สิ่งที่ต้องมีก่อนเริ่ม</h2>
        <div class="grid">
          <div class="card"><b>Claude Code</b><span>บัญชี Pro, Max หรือ Enterprise และ login เรียบร้อย</span></div>
          <div class="card"><b>Discord</b><span>บัญชีที่มีสิทธิ์ Manage Server หรือให้ admin ช่วย invite</span></div>
          <div class="card"><b>Discord Plugin</b><span>ติดตั้ง <code>discord@claude-plugins-official</code> แล้ว</span></div>
        </div>
        <pre>claude plugin install discord@claude-plugins-official
claude plugin list</pre>
      </section>

      <section class="slide">
        <div class="kicker">Step 1</div>
        <h2>สร้าง Application และ Bot ใน Discord Developer Portal</h2>
        <ul>
          <li>ไปที่ Discord Developer Portal แล้วกด New Application</li>
          <li>ตั้งชื่อ bot ด้วยชื่อ generic ของ oracle เช่น <code>&lt;oracle-name&gt;</code></li>
          <li>เปิดแท็บ Bot แล้ว Reset Token เพื่อ copy token</li>
          <li>จด Application ID จากหน้า General Information</li>
        </ul>
      </section>

      <section class="slide">
        <div class="kicker">Step 2</div>
        <h2>เปิด Privileged Gateway Intents</h2>
        <div class="grid">
          <div class="card"><b>Presence Intent</b><span>จำเป็นสำหรับ plugin ที่ใช้ intents ครบ</span></div>
          <div class="card"><b>Server Members Intent</b><span>ให้ bot เห็น member context</span></div>
          <div class="card"><b>Message Content Intent</b><span>ให้ bot อ่านข้อความใน channel ได้</span></div>
        </div>
        <p><span class="warn">ถ้าไม่เปิด intents จะเจอ</span> <code>Used disallowed intents</code> <span class="warn">และ bot online ไม่ได้</span></p>
      </section>

      <section class="slide">
        <div class="kicker">Step 3</div>
        <h2>Invite Bot เข้า Server</h2>
        <p>แทน <code>&lt;CLIENT_ID&gt;</code> ด้วย Application ID แล้วเปิด URL เพื่อ authorize bot เข้า server</p>
        <pre>https://discord.com/oauth2/authorize?client_id=&lt;CLIENT_ID&gt;&scope=bot&permissions=68608</pre>
        <p>permissions 68608 คือ View Channels, Send Messages และ Read Message History</p>
      </section>

      <section class="slide">
        <div class="kicker">Step 4</div>
        <h2>สร้าง Channel Directory แยกต่อ Oracle</h2>
        <pre>mkdir -p ~/.claude/channels/&lt;oracle-name&gt;/inbox
echo "DISCORD_BOT_TOKEN=&lt;token&gt;" &gt; ~/.claude/channels/&lt;oracle-name&gt;/.env
chmod 600 ~/.claude/channels/&lt;oracle-name&gt;/.env</pre>
        <p>หนึ่ง oracle ควรมีหนึ่ง bot token และหนึ่ง channel directory แยกกัน</p>
      </section>

      <section class="slide">
        <div class="kicker">Step 5</div>
        <h2>กำหนด access.json</h2>
        <pre>cat &gt; ~/.claude/channels/&lt;oracle-name&gt;/access.json &lt;&lt; 'EOF'
{
  "dmPolicy": "pairing",
  "allowFrom": [],
  "groups": {
    "&lt;CHANNEL_ID&gt;": { "requireMention": true }
  },
  "pending": {},
  "mentionPatterns": []
}
EOF</pre>
        <p>เปิด Developer Mode ใน Discord แล้ว Copy Channel ID จาก channel ที่อนุญาต</p>
      </section>

      <section class="slide">
        <div class="kicker">Step 6</div>
        <h2>ตั้ง Project settings และ export env</h2>
        <p>settings.json ช่วยบันทึกค่า project แต่ subprocess ของ plugin อาจไม่ได้รับ env เสมอ จึงต้อง export ที่ shell level ด้วย</p>
        <pre>export DISCORD_STATE_DIR=~/.claude/channels/&lt;oracle-name&gt;

claude --dangerously-skip-permissions \
  --channels plugin:discord@claude-plugins-official</pre>
      </section>

      <section class="slide">
        <div class="kicker">Verify</div>
        <h2>ตรวจว่า plugin และ bot ทำงานจริง</h2>
        <div class="grid two">
          <div class="card"><b>/plugins</b><span>ควรเห็น discord Plugin enabled และ discord MCP connected</span></div>
          <div class="card"><b>Discord</b><span>bot ต้อง online และตอบใน channel ที่อยู่ใน access.json</span></div>
        </div>
        <pre>ps eww -p &lt;PID&gt; | tr ' ' '\n' | grep DISCORD</pre>
      </section>

      <section class="slide">
        <div class="kicker">Troubleshooting</div>
        <h2>ปัญหาที่เจอบ่อย</h2>
        <div class="grid two">
          <div class="card"><b class="bad">plugin not installed</b><span>ติดตั้ง plugin ด้วย <code>claude plugin install discord@claude-plugins-official</code></span></div>
          <div class="card"><b class="bad">discord MCP failed</b><span>ตรวจ <code>DISCORD_STATE_DIR</code> ต้อง export และชี้ channel dir ถูก</span></div>
          <div class="card"><b class="bad">Bot offline</b><span>ตรวจ token และเปิด Gateway Intents ครบ</span></div>
          <div class="card"><b class="bad">Bot online แต่ไม่ตอบ</b><span>ตรวจ channel ID ใน access.json และ mention policy</span></div>
        </div>
      </section>

      <section class="slide">
        <div class="kicker">Token Test</div>
        <h2>ทดสอบ Token ด้วย Discord API</h2>
        <pre>curl -s -H "Authorization: Bot &lt;TOKEN&gt;" \
  https://discord.com/api/v10/users/@me | python3 -m json.tool</pre>
        <p>ถ้าเห็น id, username และ bot=true แปลว่า token ใช้ได้</p>
      </section>

      <section class="slide">
        <div class="kicker">Multi-Oracle</div>
        <h2>หลาย Oracle หลาย Server</h2>
        <p>หลักคือแยก bot token และ channel directory ต่อ oracle แต่ใช้ Discord plugin code ชุดเดียวกัน</p>
        <pre>~/.claude/channels/
├── &lt;oracle-a&gt;/
│   ├── .env
│   ├── access.json
│   └── inbox/
└── &lt;oracle-b&gt;/
    ├── .env
    ├── access.json
    └── inbox/</pre>
      </section>

      <section class="slide">
        <div class="kicker">Checklist</div>
        <h2>ก่อนถือว่าเสร็จ</h2>
        <ul>
          <li>Discord plugin installed และ enabled</li>
          <li>Bot token อยู่ใน channel dir และ chmod 600</li>
          <li>Privileged Gateway Intents เปิดครบ</li>
          <li>Bot ถูก invite เข้า server แล้ว</li>
          <li>access.json มี channel ID ที่ bot เห็นจริง</li>
          <li>shell export <code>DISCORD_STATE_DIR</code> ก่อน launch Claude</li>
        </ul>
      </section>
    </main>

    <footer>
      <div>← → หรือ swipe เพื่อเปลี่ยน slide</div>
      <div class="controls">
        <button id="prev" aria-label="Previous slide">‹</button>
        <button id="next" aria-label="Next slide">›</button>
      </div>
    </footer>
  </div>

  <script>
    const slides = [...document.querySelectorAll(".slide")];
    const bar = document.getElementById("bar");
    const counter = document.getElementById("counter");
    let index = 0;
    let touchStart = null;

    function show(next) {
      index = Math.max(0, Math.min(slides.length - 1, next));
      slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
      bar.style.width = ((index + 1) / slides.length * 100) + "%";
      counter.textContent = (index + 1) + " / " + slides.length;
      location.hash = "slide-" + (index + 1);
    }

    function step(delta) { show(index + delta); }

    document.getElementById("prev").addEventListener("click", () => step(-1));
    document.getElementById("next").addEventListener("click", () => step(1));

    addEventListener("keydown", (event) => {
      if (["ArrowRight", "PageDown", " "].includes(event.key)) step(1);
      if (["ArrowLeft", "PageUp"].includes(event.key)) step(-1);
      if (event.key === "Home") show(0);
      if (event.key === "End") show(slides.length - 1);
    });

    addEventListener("touchstart", (event) => {
      touchStart = event.changedTouches[0].clientX;
    }, { passive: true });
    addEventListener("touchend", (event) => {
      if (touchStart === null) return;
      const dx = event.changedTouches[0].clientX - touchStart;
      if (Math.abs(dx) > 42) step(dx < 0 ? 1 : -1);
      touchStart = null;
    }, { passive: true });

    const match = location.hash.match(/slide-(\d+)/);
    show(match ? Number(match[1]) - 1 : 0);
  </script>
</body>
</html>`;

export default {
  fetch(): Response {
    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=300",
      },
    });
  },
};
