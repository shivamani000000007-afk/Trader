var PAGE_HTML = "<title>Backtest Bench</title>\n<meta name=\"claude:viewport-fit-sides\" content=\"cover\">\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700&family=IBM+Plex+Mono:wght@500&family=IBM+Plex+Sans:wght@400;500;600&display=swap\" rel=\"stylesheet\">\n<style>\n/* Layout: one narrow column, phone first. Data card on top, sticky tabs, then setup fields and live results.\n   Palette: blue-tinged paper neutrals, one ultramarine accent, separate green/red/amber for good/bad/warn. */\n:root {\n  --bg: #EDF0F6; --surface: #FAFBFD; --ink: #111A2E; --muted: #58637A; --line: #D3DAE8;\n  --accent: #2D4ACB; --accent-ink: #FFFFFF; --accent-soft: #E0E6FA;\n  --good: #17724A; --bad: #B03A33; --warn: #8F5E08;\n  --good-soft: #DDF1E6; --bad-soft: #F7E0DE; --warn-soft: #F6EBD3;\n  --c1: var(--accent); --c2: #7F8AA3; --c3: #BF7410;\n  --f-display: 'Bricolage Grotesque', 'Segoe UI', system-ui, sans-serif;\n  --f-body: 'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif;\n  --f-mono: 'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace;\n}\n@media (prefers-color-scheme: dark) {\n  :root:not([data-theme=\"light\"]) {\n    --bg: #0D1222; --surface: #141B30; --ink: #E8ECF7; --muted: #9AA5BE; --line: #27304D;\n    --accent: #8FA6FF; --accent-ink: #0D1222; --accent-soft: #1F2A57;\n    --good: #55C78C; --bad: #F18A84; --warn: #E3B25A;\n    --good-soft: #17332A; --bad-soft: #3A1E22; --warn-soft: #3B2E14;\n    --c2: #7C87A1; --c3: #E3A23C;\n    color-scheme: dark;\n  }\n}\n:root[data-theme=\"dark\"] {\n  --bg: #0D1222; --surface: #141B30; --ink: #E8ECF7; --muted: #9AA5BE; --line: #27304D;\n  --accent: #8FA6FF; --accent-ink: #0D1222; --accent-soft: #1F2A57;\n  --good: #55C78C; --bad: #F18A84; --warn: #E3B25A;\n  --good-soft: #17332A; --bad-soft: #3A1E22; --warn-soft: #3B2E14;\n  --c2: #7C87A1; --c3: #E3A23C;\n  color-scheme: dark;\n}\n* { box-sizing: border-box; }\n[hidden] { display: none !important; }\nbody { background: var(--bg); color: var(--ink); font-family: var(--f-body); font-size: 15px; line-height: 1.5; -webkit-text-size-adjust: 100%; }\n.wrap { max-width: 760px; margin: 0 auto; padding-block: 20px 40px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); display: flex; flex-direction: column; gap: 16px; }\nh1, h2, h3 { font-family: var(--f-display); font-weight: 700; margin: 0; text-wrap: balance; letter-spacing: -0.01em; }\nh1 { font-size: 30px; line-height: 1.1; }\nh2 { font-size: 19px; }\nh3 { font-size: 16px; }\np { margin: 0; }\n.lede { color: var(--muted); max-width: 52ch; margin-top: 6px; }\n.muted { color: var(--muted); }\n.good { color: var(--good); } .bad { color: var(--bad); } .warn { color: var(--warn); }\n:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }\n\n.card { background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 12px; min-width: 0; }\n.sec-head { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; margin-top: 8px; }\n.card > .sec-head { margin-top: 0; }\n.sec-head h3, .sec-head h2 { flex: 1 1 auto; min-width: 0; }\n.help { flex-basis: 100%; background: var(--accent-soft); color: var(--ink); border-radius: 8px; padding: 10px 12px; font-size: 14px; line-height: 1.5; font-weight: 400; }\n.q { flex: none; width: 24px; height: 24px; border-radius: 50%; border: 1.5px solid var(--accent); background: transparent; color: var(--accent); font: 600 13px/1 var(--f-body); cursor: pointer; padding: 0; display: inline-grid; place-items: center; }\n.q[aria-expanded=\"true\"] { background: var(--accent); color: var(--accent-ink); }\n\n.status { display: flex; gap: 10px; align-items: flex-start; }\n.chip { flex: none; font: 600 12px/1 var(--f-body); letter-spacing: 0.04em; text-transform: uppercase; padding: 5px 8px; border-radius: 6px; margin-top: 2px; }\n.chip.warn { background: var(--warn-soft); color: var(--warn); }\n.chip.good { background: var(--good-soft); color: var(--good); }\n.row { display: flex; flex-wrap: wrap; gap: 8px; }\n.btn { appearance: none; font: 600 14px/1 var(--f-body); border-radius: 8px; padding: 12px 14px; min-height: 44px; display: inline-flex; align-items: center; cursor: pointer; border: 1.5px solid var(--accent); background: var(--accent); color: var(--accent-ink); }\n.btn.ghost { background: transparent; color: var(--accent); }\n.err { color: var(--bad); background: var(--bad-soft); border-radius: 8px; padding: 10px 12px; font-size: 14px; }\ntextarea { width: 100%; font: 13px/1.4 var(--f-mono); background: var(--bg); color: var(--ink); border: 1px solid var(--line); border-radius: 8px; padding: 10px; margin-bottom: 8px; }\n#paste-box { display: block; }\n#paste-box[hidden] { display: none; }\n\n.fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; align-items: start; }\n.field { display: flex; flex-direction: column; gap: 6px; min-width: 0; }\n.field.full { grid-column: 1 / -1; }\n.field .help { margin-top: 2px; }\n.lab { display: flex; align-items: center; justify-content: space-between; gap: 6px; }\n.lab label.check { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; color: var(--ink); min-height: 44px; }\n.lab label.check input { width: 20px; min-height: 0; height: 20px; accent-color: var(--accent); }\n.lab label { font-size: 13px; font-weight: 500; color: var(--muted); line-height: 1.25; }\ninput, select { width: 100%; min-height: 44px; font: 500 16px var(--f-mono); color: var(--ink); background: var(--bg); border: 1px solid var(--line); border-radius: 8px; padding: 8px 10px; }\nselect { font-family: var(--f-body); font-weight: 500; }\ninput:focus, select:focus { border-color: var(--accent); }\n\n.tabs { position: sticky; top: env(safe-area-inset-top, 0px); z-index: 5; background: var(--bg); padding-block: 4px; }\n.tabs .seg { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; background: var(--line); border-radius: 10px; padding: 4px; }\n.tabbtn { appearance: none; border: 0; background: transparent; color: var(--muted); font: 600 15px var(--f-body); min-height: 44px; border-radius: 7px; cursor: pointer; }\n.tabbtn[aria-selected=\"true\"] { background: var(--surface); color: var(--ink); box-shadow: 0 1px 2px rgba(10, 20, 50, 0.18); }\n.tab { display: flex; flex-direction: column; gap: 14px; min-width: 0; }\n.tab[hidden] { display: none; }\n.out { display: flex; flex-direction: column; gap: 12px; min-width: 0; }\n\n.headline { font-family: var(--f-display); font-size: 20px; line-height: 1.3; font-weight: 600; text-wrap: balance; }\n.headline b { font-weight: 700; }\n.tiles { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }\n@media (min-width: 560px) { .tiles { grid-template-columns: repeat(3, minmax(0, 1fr)); } }\n.tile { appearance: none; text-align: left; font: inherit; color: var(--ink); background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: 12px; cursor: pointer; display: flex; flex-direction: column; gap: 2px; min-width: 0; }\n.tile[aria-expanded=\"true\"] { border-color: var(--accent); grid-column: 1 / -1; }\n.tl { font-size: 12.5px; color: var(--muted); line-height: 1.3; }\n.tv { font: 500 22px/1.2 var(--f-mono); font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }\n.ts { font-size: 12px; color: var(--muted); }\n.tile.good .tv { color: var(--good); } .tile.bad .tv { color: var(--bad); } .tile.warn .tv { color: var(--warn); }\n.tile .help { margin-top: 8px; display: block; }\n\n.scroll { overflow-x: auto; border: 1px solid var(--line); border-radius: 10px; background: var(--surface); }\n.tbl { width: 100%; border-collapse: collapse; font-size: 13px; font-variant-numeric: tabular-nums; }\n.tbl th, .tbl td { padding: 9px 10px; text-align: right; white-space: nowrap; border-bottom: 1px solid var(--line); }\n.tbl tr:last-child th, .tbl tr:last-child td { border-bottom: 0; }\n.tbl td { font-family: var(--f-mono); font-weight: 500; }\n.tbl thead th { font-size: 11px; letter-spacing: 0.05em; text-transform: uppercase; color: var(--muted); font-weight: 600; }\n.tbl tbody th { text-align: left; font-weight: 600; }\n.tbl thead th:first-child, .tbl thead th.wrap { text-align: left; }\n.tbl td.good { color: var(--good); } .tbl td.bad { color: var(--bad); }\n.pick { cursor: pointer; }\n.pick.on { background: var(--accent-soft); }\n\n.checks { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }\n.chk { display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: 10px; align-items: start; background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; font-size: 14px; }\n.chk .muted { font-size: 13px; }\n.pill { font: 600 11px/1 var(--f-body); letter-spacing: 0.05em; text-transform: uppercase; text-align: center; padding: 6px 0; border-radius: 6px; }\n.chk.pass .pill { background: var(--good-soft); color: var(--good); }\n.chk.fail .pill { background: var(--bad-soft); color: var(--bad); }\n.chk.warn .pill { background: var(--warn-soft); color: var(--warn); }\n\n.chart { width: 100%; height: auto; display: block; background: var(--surface); border: 1px solid var(--line); border-radius: 10px; }\n.chart text { fill: var(--muted); font: 500 9.5px var(--f-mono); }\n.chart .gl { stroke: var(--line); stroke-width: 1; }\n.chart .vl { stroke: var(--muted); stroke-width: 1; stroke-dasharray: 2 3; }\n.chart .vt { font-size: 9px; }\n.chart .ln { fill: none; stroke-width: 2; stroke-linejoin: round; stroke-linecap: round; }\n.chart .ln.c1, .chart .dot.c1 { stroke: var(--c1); } .chart .ln.c2 { stroke: var(--c2); } .chart .ln.c3 { stroke: var(--c3); }\n.chart .dash { stroke-dasharray: 5 4; }\n.chart .dot { fill: var(--surface); stroke-width: 2; }\n.legend { display: flex; flex-wrap: wrap; gap: 4px 14px; font-size: 12.5px; color: var(--muted); margin-top: -4px; }\n.sw { display: inline-block; width: 14px; height: 3px; border-radius: 2px; margin-right: 6px; vertical-align: middle; background: var(--c1); }\n.sw.c2 { background: var(--c2); } .sw.c3 { background: var(--c3); }\n.note { font-size: 13px; color: var(--muted); }\n.links a { color: var(--accent); font-weight: 500; }\n.warnbox { background: var(--warn-soft); color: var(--warn); padding: 10px 12px; border-radius: 8px; font-size: 14px; }\n.chips { display: flex; flex-wrap: wrap; gap: 6px; }\n.tag { font: 500 12px var(--f-mono); background: var(--bg); border: 1px solid var(--line); border-radius: 6px; padding: 4px 7px; }\n.tag.stale { color: var(--warn); border-color: var(--warn); }\n.cpill { display: inline-block; font: 600 12px/1 var(--f-body); letter-spacing: 0.03em; padding: 5px 8px; border-radius: 6px; margin-right: 6px; }\n.cpill.good { background: var(--good-soft); color: var(--good); } .cpill.warn { background: var(--warn-soft); color: var(--warn); } .cpill.bad { background: var(--bad-soft); color: var(--bad); }\n.tbl th, .tbl td { vertical-align: middle; }\n.tbl td.wrap { white-space: normal; text-align: left; min-width: 130px; font-family: var(--f-body); font-weight: 400; }\n.tbl tr.on { background: var(--accent-soft); }\n.tbl td.warn { color: var(--warn); }\n.cloud { gap: 10px; font-size: 14px; }\n.steps { margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 6px; }\n.foot { font-size: 12.5px; color: var(--muted); border-top: 1px solid var(--line); padding-top: 12px; }\n.tg { flex: none; appearance: none; font: 600 12px/1 var(--f-body); color: var(--accent); background: transparent; border: 1.5px solid var(--accent); border-radius: 999px; padding: 6px 12px; min-height: 30px; cursor: pointer; }\n.sec-body { display: flex; flex-direction: column; gap: 12px; min-width: 0; }\n.sec-body[hidden] { display: none !important; }\n.xchip { appearance: none; font: 600 12px/1 var(--f-body); border: 1px solid var(--line); background: var(--surface); color: inherit; border-radius: 999px; padding: 6px 10px; min-height: 30px; cursor: pointer; }\n.xbtn { appearance: none; border: 1px solid var(--line); background: transparent; color: inherit; border-radius: 6px; font: 600 12px/1 var(--f-body); padding: 4px 7px; margin-left: 6px; cursor: pointer; }\n.px-in { width: 92px; min-height: 36px; padding: 4px 6px; font: inherit; }\n.plan-in { display: flex; flex-wrap: wrap; gap: 10px; align-items: end; }\n.plan-in label { display: flex; flex-direction: column; gap: 4px; font-size: 13px; }\n.plan-in input { min-height: 40px; padding: 4px 8px; width: 130px; font: inherit; }\n</style>\n\n<div class=\"wrap\">\n  <p class=\"err\" id=\"fatal\" role=\"alert\" hidden></p>\n  <header>\n    <h1>Backtest Bench</h1>\n    <p class=\"lede\">Replay a SIP, an SWP or a trading rule on price history before you risk real money. Tap any <b>?</b> or any number for a plain explanation.</p>\n  </header>\n\n  <section class=\"card\" id=\"range\" aria-labelledby=\"h-data\">\n    <div class=\"sec-head\" data-host><h2 id=\"h-data\">Price data</h2><button type=\"button\" class=\"q\" data-help=\"data.how\" aria-expanded=\"false\" aria-label=\"Explain price data\">?</button></div>\n    <div class=\"status\" id=\"data-status\"></div>\n    <div class=\"row\">\n      <label class=\"btn\" for=\"file\">Upload CSV</label>\n      <input id=\"file\" type=\"file\" accept=\".csv,.txt,text/csv,text/plain\" hidden>\n      <button type=\"button\" class=\"btn ghost\" id=\"btn-paste\">Paste data</button>\n      <button type=\"button\" class=\"btn ghost\" id=\"btn-example\">Use example</button>\n    </div>\n    <div id=\"paste-box\" hidden>\n      <textarea id=\"paste\" rows=\"5\" placeholder=\"Date,Close&#10;2024-01-01,21500&#10;2024-01-02,21610\"></textarea>\n      <button type=\"button\" class=\"btn\" id=\"btn-load\">Load pasted data</button>\n    </div>\n    <p class=\"err\" id=\"data-err\" role=\"alert\" hidden></p>\n    <p class=\"note links\">Free price history: <a href=\"https://finance.yahoo.com/quote/%5ENSEI/history/\" target=\"_blank\" rel=\"noopener\">Nifty 50 (Yahoo)</a> · <a href=\"https://finance.yahoo.com/quote/NIFTYBEES.NS/history/\" target=\"_blank\" rel=\"noopener\">NIFTYBEES (Yahoo)</a> · <a href=\"https://finance.yahoo.com/quote/%5EBSESN/history/\" target=\"_blank\" rel=\"noopener\">Sensex (Yahoo)</a> · <a href=\"https://www.niftyindices.com/reports/historical-data\" target=\"_blank\" rel=\"noopener\">NSE Indices</a></p>\n    <div class=\"sec-head\" data-host id=\"example-note\"><p class=\"note\" style=\"flex:1 1 0\">The example prices are made up, so results here only show how the tool works.</p><button type=\"button\" class=\"q\" data-help=\"data.example\" aria-expanded=\"false\" aria-label=\"Explain example data\">?</button></div>\n    <div class=\"fields\">\n      <div class=\"field\" data-host><div class=\"lab\"><label for=\"from\">Test from</label><button type=\"button\" class=\"q\" data-help=\"data.range\" aria-expanded=\"false\" aria-label=\"Explain test range\">?</button></div><input id=\"from\" type=\"date\"></div>\n      <div class=\"field\"><div class=\"lab\"><label for=\"to\">Test to</label></div><input id=\"to\" type=\"date\"></div>\n    </div>\n  </section>\n\n  <nav class=\"tabs\" aria-label=\"Test type\">\n    <div class=\"seg\" role=\"tablist\">\n      <button type=\"button\" class=\"tabbtn\" role=\"tab\" data-tab=\"pk\" aria-selected=\"true\">Picks</button>\n      <button type=\"button\" class=\"tabbtn\" role=\"tab\" data-tab=\"sip\" aria-selected=\"false\">SIP</button>\n      <button type=\"button\" class=\"tabbtn\" role=\"tab\" data-tab=\"swp\" aria-selected=\"false\">SWP</button>\n      <button type=\"button\" class=\"tabbtn\" role=\"tab\" data-tab=\"tr\" aria-selected=\"false\">Trading</button>\n    </div>\n  </nav>\n\n  <section class=\"tab\" id=\"tab-pk\">\n    <div class=\"card\" id=\"pk-data\">\n      <div class=\"sec-head\" data-host><h2>Your stock list</h2><button type=\"button\" class=\"q\" data-help=\"pk.data\" aria-expanded=\"false\" aria-label=\"Explain stock list\">?</button></div>\n      <div class=\"status\" id=\"pk-status\"></div>\n      <div class=\"row\">\n        <label class=\"btn ghost\" for=\"pk-file\">Add CSV files</label>\n        <input id=\"pk-file\" type=\"file\" multiple accept=\".csv,.txt,text/csv,text/plain\" hidden>\n        <button type=\"button\" class=\"btn ghost\" id=\"pk-example\">Use example list</button>\n        <button type=\"button\" class=\"btn ghost\" id=\"pk-clear\">Clear list</button>\n      </div>\n      <div class=\"field full\" data-host>\n        <div class=\"lab\"><label for=\"pk-index\">Load a whole NSE index</label><button type=\"button\" class=\"q\" data-help=\"pk.index\" aria-expanded=\"false\" aria-label=\"Explain index lists\">?</button></div>\n        <select id=\"pk-index\">\n          <option value=\"nifty500\">Nifty 500 (large, mid and small caps)</option>\n          <option value=\"etf\">ETFs only (popular NSE ETFs)</option>\n          <option value=\"nifty50\">Nifty 50</option>\n          <option value=\"niftynext50\">Nifty Next 50</option>\n          <option value=\"nifty100\">Nifty 100 (large caps)</option>\n          <option value=\"nifty200\">Nifty 200</option>\n          <option value=\"largemidcap250\">Largemidcap 250</option>\n          <option value=\"midcap100\">Midcap 100</option>\n          <option value=\"midcap150\">Midcap 150</option>\n          <option value=\"smallcap100\">Smallcap 100</option>\n          <option value=\"smallcap250\">Smallcap 250</option>\n          <option value=\"midsmall400\">Midsmallcap 400</option>\n        </select>\n      </div>\n      <div class=\"field full\" data-host>\n        <div class=\"lab\"><label for=\"pk-src\">Price source</label><button type=\"button\" class=\"q\" data-help=\"pk.src\" aria-expanded=\"false\" aria-label=\"Explain price sources\">?</button></div>\n        <select id=\"pk-src\"><option value=\"auto\">Auto (try every ready source)</option></select>\n        <p class=\"note\" id=\"pk-src-note\"></p>\n      </div>\n      <div class=\"field full\" data-host>\n        <div class=\"lab\"><label class=\"check\" for=\"pk-etf\"><input type=\"checkbox\" id=\"pk-etf\"> Also add popular ETFs</label><button type=\"button\" class=\"q\" data-help=\"pk.etf\" aria-expanded=\"false\" aria-label=\"Explain ETFs\">?</button></div>\n      </div>\n      <div class=\"row\"><button type=\"button\" class=\"btn\" id=\"pk-index-btn\">Load this list</button></div>\n      <div class=\"field full\" data-host>\n        <div class=\"lab\"><label for=\"pk-symbols\">Or choose your own symbols to watch</label><button type=\"button\" class=\"q\" data-help=\"pk.live\" aria-expanded=\"false\" aria-label=\"Explain live prices\">?</button></div>\n        <textarea id=\"pk-symbols\" rows=\"3\" spellcheck=\"false\" autocapitalize=\"characters\"></textarea>\n      </div>\n      <div class=\"row\"><button type=\"button\" class=\"btn ghost\" id=\"pk-live\">Load live prices</button></div>\n      <p class=\"note\" id=\"pk-live-note\" role=\"status\"></p>\n      <p class=\"err\" id=\"pk-err\" role=\"alert\" hidden></p>\n      <p class=\"note links\">Free price history for each stock: <a href=\"https://finance.yahoo.com/lookup\" target=\"_blank\" rel=\"noopener\">Yahoo Finance</a> (open a stock, then Historical Data) · <a href=\"https://www.nseindia.com/report-detail/eq_security\" target=\"_blank\" rel=\"noopener\">NSE</a></p>\n      <div class=\"chips\" id=\"pk-chips\"></div>\n    </div>\n    <div class=\"card\">\n      <div class=\"sec-head\" data-host><h2>Monthly picker</h2><button type=\"button\" class=\"q\" data-help=\"pk.method\" aria-expanded=\"false\" aria-label=\"Explain the methods\">?</button></div>\n      <div class=\"fields\" id=\"fields-pk\"></div>\n    </div>\n    <div class=\"out\" id=\"out-pk\"></div>\n  </section>\n\n  <section class=\"tab\" id=\"tab-sip\" hidden>\n    <div class=\"card\">\n      <div class=\"sec-head\" data-host><h2>SIP test</h2><button type=\"button\" class=\"q\" data-help=\"sip.how\" aria-expanded=\"false\" aria-label=\"Explain SIP test\">?</button></div>\n      <div class=\"fields\" id=\"fields-sip\"></div>\n    </div>\n    <div class=\"out\" id=\"out-sip\"></div>\n  </section>\n\n  <section class=\"tab\" id=\"tab-swp\" hidden>\n    <div class=\"card\">\n      <div class=\"sec-head\" data-host><h2>SWP test</h2><button type=\"button\" class=\"q\" data-help=\"swp.how\" aria-expanded=\"false\" aria-label=\"Explain SWP test\">?</button></div>\n      <div class=\"fields\" id=\"fields-swp\"></div>\n    </div>\n    <div class=\"out\" id=\"out-swp\"></div>\n  </section>\n\n  <section class=\"tab\" id=\"tab-tr\" hidden>\n    <div class=\"card\">\n      <div class=\"sec-head\" data-host><h2>Trading test</h2><button type=\"button\" class=\"q\" data-help=\"tr.how\" aria-expanded=\"false\" aria-label=\"Explain trading test\">?</button></div>\n      <div class=\"fields\" id=\"fields-tr\"></div>\n    </div>\n    <div class=\"out\" id=\"out-tr\"></div>\n  </section>\n\n  <p class=\"foot\">Past results do not promise future results. Taxes are not included, and the test uses closing prices only. This is a learning tool and not investment advice.</p>\n</div>\n\n<script>\nwindow.addEventListener(\"error\", function (e) {\n  /* Browsers report errors from other sites' scripts (extensions, ad blockers) as \"Script error.\" with no line. They are not from this page. */\n  if (!e.lineno && (!e.message || /^Script error/i.test(e.message))) return;\n  /* Wallet and other browser extensions (for example Brave's window.ethereum) inject code into every page. Their errors are not ours. */\n  if (/ethereum|selectedAddress|solana|web3|extension/i.test(String(e.message) + \" \" + String(e.filename || \"\"))) return;\n  var f = document.getElementById(\"fatal\");\n  if (f) { f.textContent = \"Something broke: \" + (e.message || \"unknown error\") + (e.lineno ? \" (line \" + e.lineno + \")\" : \"\") + \". Please send this message to Claude.\"; f.hidden = false; }\n});\n/* ===== Engine: pure functions, no DOM ===== */\nvar MS_DAY = 86400000, MS_YEAR = 31557600000;\n\nfunction mulberry32(a) {\n  return function () {\n    a |= 0; a = (a + 0x6D2B79F5) | 0;\n    var t = Math.imul(a ^ (a >>> 15), 1 | a);\n    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;\n    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;\n  };\n}\nfunction gauss(r) {\n  var u = 0, v = 0;\n  while (!u) u = r();\n  while (!v) v = r();\n  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);\n}\n\n/* ---------- data ---------- */\nfunction buildData(t, c, name, demo) {\n  var m = [], last = -1;\n  for (var i = 0; i < t.length; i++) {\n    var d = new Date(t[i]);\n    var key = d.getUTCFullYear() * 12 + d.getUTCMonth();\n    if (key !== last) { m.push(i); last = key; }\n  }\n  return { t: t, c: c, m: m, name: name, demo: !!demo };\n}\n\nfunction demoData() {\n  var r = mulberry32(20260101);\n  var t = [], c = [], p = 5000, turb = false;\n  var end = Date.UTC(2026, 8, 30);\n  var crashStart = Date.UTC(2020, 1, 20), crashEnd = Date.UTC(2020, 2, 23), reboundEnd = Date.UTC(2020, 5, 30);\n  for (var d = Date.UTC(2011, 0, 3); d <= end; d += MS_DAY) {\n    var wd = new Date(d).getUTCDay();\n    if (wd === 0 || wd === 6) continue;\n    if (turb) { if (r() < 0.04) turb = false; } else { if (r() < 0.008) turb = true; }\n    var mu = turb ? -0.0004 : 0.00040, sg = turb ? 0.015 : 0.0072;\n    var ret = mu + sg * gauss(r);\n    if (d >= crashStart && d <= crashEnd) ret = -0.019 + 0.012 * gauss(r);\n    else if (d > crashEnd && d <= reboundEnd) ret = 0.0035 + 0.011 * gauss(r);\n    p *= Math.exp(ret);\n    t.push(d); c.push(Math.round(p * 100) / 100);\n  }\n  return buildData(t, c, 'Example data (made up)', true);\n}\n\nvar MON = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };\nfunction parseDate(s) {\n  s = String(s == null ? '' : s).trim().replace(/^\"|\"$/g, '');\n  var m, y, mo, d;\n  if ((m = /^(\\d{4})[-\\/](\\d{1,2})[-\\/](\\d{1,2})/.exec(s))) { y = +m[1]; mo = +m[2] - 1; d = +m[3]; }\n  else if ((m = /^(\\d{1,2})[-\\/.](\\d{1,2})[-\\/.](\\d{4})/.exec(s))) {\n    d = +m[1]; mo = +m[2] - 1; y = +m[3];\n    if (mo > 11 && d <= 12) { var tmp = d; d = mo + 1; mo = tmp - 1; }\n  }\n  else if ((m = /^(\\d{1,2})[-\\/ ]([A-Za-z]{3})[a-z]*[-\\/ ,]+(\\d{4})/.exec(s))) { d = +m[1]; mo = MON[m[2].toLowerCase()]; y = +m[3]; }\n  else if ((m = /^([A-Za-z]{3})[a-z]* (\\d{1,2}),? (\\d{4})/.exec(s))) { mo = MON[m[1].toLowerCase()]; d = +m[2]; y = +m[3]; }\n  else return NaN;\n  if (mo === undefined || mo < 0 || mo > 11 || d < 1 || d > 31 || y < 1950 || y > 2100) return NaN;\n  return Date.UTC(y, mo, d);\n}\nfunction parseNum(s) {\n  if (s == null) return NaN;\n  var x = String(s).replace(/[\",₹\\s]/g, '');\n  return x === '' ? NaN : parseFloat(x);\n}\nfunction parseData(text, name, minRows) {\n  var lines = String(text).split(/\\r?\\n/).map(function (l) { return l.trim(); }).filter(Boolean);\n  if (lines.length < 2) throw new Error('No rows found. Paste a Date column and a Close column.');\n  var l0 = lines[0];\n  var delim = l0.indexOf('\\t') >= 0 ? '\\t' : (l0.split(';').length > l0.split(',').length ? ';' : ',');\n  var split = function (l) { return l.split(delim).map(function (s) { return s.trim().replace(/^\"|\"$/g, ''); }); };\n  var first = split(l0), di = 0, ci = 1, start = 0, oi = -1, hi = -1, li = -1, rci = -1;\n  if (isNaN(parseDate(first[0]))) {\n    var h = first.map(function (x) { return x.toLowerCase().replace(/[^a-z. ]/g, '').trim(); });\n    start = 1;\n    di = h.findIndex(function (x) { return x.indexOf('date') >= 0; });\n    if (di < 0) di = 0;\n    var pick = ['adj close', 'adj. close', 'close', 'close price', 'closing price', 'price', 'nav', 'last'];\n    ci = -1;\n    for (var k = 0; k < pick.length && ci < 0; k++) {\n      ci = h.findIndex(function (x, idx) { return idx !== di && x === pick[k]; });\n    }\n    if (ci < 0) ci = h.findIndex(function (x, idx) { return idx !== di && (x.indexOf('close') >= 0 || x.indexOf('price') >= 0); });\n    if (ci < 0) ci = di === 0 ? 1 : 0;\n    var findCol = function (nm) { return h.findIndex(function (x, idx) { return idx !== di && x === nm; }); };\n    oi = findCol('open'); hi = findCol('high'); li = findCol('low'); rci = findCol('close');\n  } else {\n    ci = first.length >= 5 ? 4 : Math.min(1, first.length - 1);\n    if (first.length >= 5) { oi = 1; hi = 2; li = 3; rci = 4; }\n  }\n  var rows = [];\n  for (var i = start; i < lines.length; i++) {\n    var p = split(lines[i]);\n    var t = parseDate(p[di]), c = parseNum(p[ci]);\n    if (!isNaN(t) && isFinite(c) && c > 0) {\n      var o = NaN, hh = NaN, ll = NaN;\n      if (oi >= 0 && hi >= 0 && li >= 0) {\n        var raw = rci >= 0 && rci !== ci ? parseNum(p[rci]) : c;\n        var f = isFinite(raw) && raw > 0 ? c / raw : 1;\n        o = parseNum(p[oi]) * f; hh = parseNum(p[hi]) * f; ll = parseNum(p[li]) * f;\n        if (!(o > 0 && hh > 0 && ll > 0 && hh >= ll)) { o = NaN; hh = NaN; ll = NaN; }\n      }\n      rows.push([t, c, o, hh, ll]);\n    }\n  }\n  rows.sort(function (a, b) { return a[0] - b[0]; });\n  var T = [], C = [], O = [], H = [], L = [];\n  for (var j = 0; j < rows.length; j++) {\n    if (T.length && rows[j][0] === T[T.length - 1]) { C[C.length - 1] = rows[j][1]; O[O.length - 1] = rows[j][2]; H[H.length - 1] = rows[j][3]; L[L.length - 1] = rows[j][4]; continue; }\n    T.push(rows[j][0]); C.push(rows[j][1]); O.push(rows[j][2]); H.push(rows[j][3]); L.push(rows[j][4]);\n  }\n  var need = minRows || 250;\n  if (T.length < need) throw new Error('Found only ' + T.length + ' usable rows. Need at least ' + need + ' rows with a Date and a Close.');\n  var D = buildData(T, C, name || 'Your data', false);\n  var okN = 0; for (var q = 0; q < O.length; q++) if (isFinite(O[q])) okN++;\n  if (okN >= O.length * 0.5) { D.o = O; D.h = H; D.l = L; }\n  return D;\n}\n\n/* ---------- small maths ---------- */\nfunction median(a) { return percentile(a.slice().sort(function (x, y) { return x - y; }), 0.5); }\nfunction percentile(sorted, q) {\n  if (!sorted.length) return NaN;\n  var pos = (sorted.length - 1) * q, lo = Math.floor(pos), hi = Math.ceil(pos);\n  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);\n}\nfunction maxDrawdown(arr) {\n  var peak = -Infinity, dd = 0;\n  for (var i = 0; i < arr.length; i++) {\n    if (arr[i] > peak) peak = arr[i];\n    var d = arr[i] / peak - 1;\n    if (d < dd) dd = d;\n  }\n  return dd;\n}\nfunction xirr(cfs) {\n  var t0 = cfs[0].t;\n  var f = function (r) {\n    var s = 0;\n    for (var i = 0; i < cfs.length; i++) s += cfs[i].a / Math.pow(1 + r, (cfs[i].t - t0) / MS_YEAR);\n    return s;\n  };\n  var lo = -0.99, hi = 10, flo = f(lo), fhi = f(hi);\n  if (!isFinite(flo) || !isFinite(fhi) || flo * fhi > 0) return NaN;\n  for (var i = 0; i < 120; i++) {\n    var m = (lo + hi) / 2, fm = f(m);\n    if (flo * fm <= 0) { hi = m; fhi = fm; } else { lo = m; flo = fm; }\n  }\n  return (lo + hi) / 2;\n}\nfunction addYears(t, y) { var d = new Date(t); d.setUTCFullYear(d.getUTCFullYear() + y); return d.getTime(); }\nfunction lastIdxLE(D, t) {\n  var lo = 0, hi = D.t.length - 1, ans = -1;\n  while (lo <= hi) { var mid = (lo + hi) >> 1; if (D.t[mid] <= t) { ans = mid; lo = mid + 1; } else hi = mid - 1; }\n  return ans;\n}\nfunction firstIdxGE(D, t) {\n  var lo = 0, hi = D.t.length - 1, ans = D.t.length;\n  while (lo <= hi) { var mid = (lo + hi) >> 1; if (D.t[mid] >= t) { ans = mid; hi = mid - 1; } else lo = mid + 1; }\n  return ans;\n}\n\n/* ---------- SIP ---------- */\nfunction simSIP(D, i0, i1, amount, mode, dipPct, dipMult) {\n  var units = 0, invested = 0, cfs = [], curve = [], worst = 0;\n  for (var q = 0; q < D.m.length; q++) {\n    var k = D.m[q];\n    if (k < i0) continue;\n    if (k > i1) break;\n    var amt = amount;\n    if (mode === 'dip') {\n      var lo = Math.max(0, k - 252), hi = -Infinity;\n      for (var j = lo; j <= k; j++) if (D.c[j] > hi) hi = D.c[j];\n      if (D.c[k] <= hi * (1 - dipPct / 100)) amt = amount * dipMult;\n    }\n    units += amt / D.c[k]; invested += amt;\n    cfs.push({ t: D.t[k], a: -amt });\n    var v = units * D.c[k];\n    curve.push({ t: D.t[k], v: v, inv: invested });\n    var rel = v / invested - 1;\n    if (rel < worst) worst = rel;\n  }\n  var final = units * D.c[i1];\n  var relEnd = final / invested - 1; if (relEnd < worst) worst = relEnd;\n  cfs.push({ t: D.t[i1], a: final });\n  curve.push({ t: D.t[i1], v: final, inv: invested });\n  return { invested: invested, final: final, gain: final / invested - 1, xirr: xirr(cfs), curve: curve, worst: worst };\n}\nfunction simLump(D, i0, i1, total) {\n  var units = total / D.c[i0], arr = [];\n  for (var i = i0; i <= i1; i++) arr.push(units * D.c[i]);\n  var final = arr[arr.length - 1];\n  var yrs = (D.t[i1] - D.t[i0]) / MS_YEAR;\n  var worst = 0;\n  for (var k = 0; k < arr.length; k++) { var rel = arr[k] / total - 1; if (rel < worst) worst = rel; }\n  return { invested: total, final: final, gain: final / total - 1, xirr: Math.pow(final / total, 1 / yrs) - 1, worst: worst };\n}\nfunction rollingSIP(D, i0, i1, amount, years, dipPct, dipMult) {\n  var plain = [], dip = [];\n  for (var q = 0; q < D.m.length; q++) {\n    var s = D.m[q];\n    if (s < i0) continue;\n    if (s > i1) break;\n    var tEnd = addYears(D.t[s], years);\n    if (tEnd > D.t[i1]) break;\n    var e = lastIdxLE(D, tEnd);\n    if (e <= s) continue;\n    plain.push(simSIP(D, s, e, amount, 'plain'));\n    dip.push(simSIP(D, s, e, amount, 'dip', dipPct, dipMult));\n  }\n  return { plain: summarizeWindows(plain), dip: summarizeWindows(dip) };\n}\nfunction summarizeWindows(w) {\n  var n = w.length;\n  if (!n) return { n: 0 };\n  var xs = w.map(function (x) { return x.xirr; }).filter(isFinite);\n  var sorted = xs.slice().sort(function (a, b) { return a - b; });\n  return {\n    n: n,\n    xs: xs,\n    pctPositive: w.filter(function (x) { return x.final > x.invested; }).length / n,\n    median: percentile(sorted, 0.5),\n    worst: sorted[0],\n    best: sorted[sorted.length - 1]\n  };\n}\nfunction pctAbove(xs, hurdle) {\n  if (!xs || !xs.length) return NaN;\n  return xs.filter(function (x) { return x > hurdle; }).length / xs.length;\n}\n\n/* ---------- SWP ---------- */\nfunction monthlyReturns(D, i0, i1) {\n  var idx = D.m.filter(function (k) { return k >= i0 && k <= i1; }), r = [];\n  for (var k = 1; k < idx.length; k++) r.push(D.c[idx[k]] / D.c[idx[k - 1]] - 1);\n  return r;\n}\nfunction simSWP(rets, startK, months, p) {\n  var P = p.corpus, w = p.w;\n  for (var k = 0; k < months; k++) {\n    if (k > 0 && k % 12 === 0) w *= 1 + p.step;\n    P -= w;\n    if (P <= 0) return { end: 0, failedAt: k };\n    P *= 1 + p.eq * rets[startK + k] + (1 - p.eq) * p.debtM;\n  }\n  return { end: P, failedAt: -1 };\n}\nfunction swpHistory(rets, months, p) {\n  var ends = [], ok = 0, n = rets.length - months + 1;\n  for (var s = 0; s < n; s++) {\n    var r = simSWP(rets, s, months, p);\n    ends.push(r.end);\n    if (r.failedAt < 0) ok++;\n  }\n  return { n: Math.max(n, 0), survival: n > 0 ? ok / n : NaN, worstEnd: n > 0 ? Math.min.apply(null, ends) : NaN, medEnd: n > 0 ? median(ends) : NaN };\n}\nfunction genPaths(rets, runs, months, seed) {\n  var r = mulberry32(seed), n = rets.length, B = Math.min(12, n);\n  var out = new Float64Array(runs * months);\n  for (var i = 0; i < runs; i++) {\n    var k = 0;\n    while (k < months) {\n      var st = Math.floor(r() * (n - B + 1));\n      for (var b = 0; b < B && k < months; b++, k++) out[i * months + k] = rets[st + b];\n    }\n  }\n  return out;\n}\nfunction mcSurvival(paths, runs, months, p) {\n  var ok = 0;\n  for (var i = 0; i < runs; i++) {\n    var P = p.corpus, w = p.w, dead = false, base = i * months;\n    for (var k = 0; k < months; k++) {\n      if (k > 0 && k % 12 === 0) w *= 1 + p.step;\n      P -= w;\n      if (P <= 0) { dead = true; break; }\n      P *= 1 + p.eq * paths[base + k] + (1 - p.eq) * p.debtM;\n    }\n    if (!dead) ok++;\n  }\n  return ok / runs;\n}\nfunction mcBands(paths, runs, months, p) {\n  var years = Math.floor(months / 12), vals = [];\n  for (var y = 0; y <= years; y++) vals.push(new Float64Array(runs));\n  var ends = new Float64Array(runs), ok = 0;\n  for (var i = 0; i < runs; i++) {\n    var P = p.corpus, w = p.w, base = i * months, dead = false;\n    vals[0][i] = P;\n    for (var k = 0; k < months; k++) {\n      if (!dead) {\n        if (k > 0 && k % 12 === 0) w *= 1 + p.step;\n        P -= w;\n        if (P <= 0) { dead = true; P = 0; } else P *= 1 + p.eq * paths[base + k] + (1 - p.eq) * p.debtM;\n      }\n      if ((k + 1) % 12 === 0) vals[(k + 1) / 12][i] = dead ? 0 : P;\n    }\n    ends[i] = dead ? 0 : P;\n    if (!dead) ok++;\n  }\n  var bands = [];\n  for (var y2 = 0; y2 <= years; y2++) {\n    var s = Array.prototype.slice.call(vals[y2]).sort(function (a, b) { return a - b; });\n    bands.push({ y: y2, p10: percentile(s, 0.1), p50: percentile(s, 0.5), p90: percentile(s, 0.9) });\n  }\n  var es = Array.prototype.slice.call(ends).sort(function (a, b) { return a - b; });\n  return { bands: bands, survival: ok / runs, medEnd: percentile(es, 0.5), p10End: percentile(es, 0.1) };\n}\nfunction safeWithdrawal(paths, runs, months, p, target) {\n  var lo = 0, hi = p.corpus * 0.25 / 12;\n  for (var i = 0; i < 14; i++) {\n    var mid = (lo + hi) / 2;\n    var q = { corpus: p.corpus, w: mid, step: p.step, eq: p.eq, debtM: p.debtM };\n    if (mcSurvival(paths, runs, months, q) >= target) lo = mid; else hi = mid;\n  }\n  return Math.floor(lo / 100) * 100;\n}\n\n/* ---------- Trading ---------- */\nfunction sma(c, n) {\n  var out = new Array(c.length).fill(NaN), s = 0;\n  for (var i = 0; i < c.length; i++) {\n    s += c[i];\n    if (i >= n) s -= c[i - n];\n    if (i >= n - 1) out[i] = s / n;\n  }\n  return out;\n}\nfunction rsi(c, n) {\n  var out = new Array(c.length).fill(NaN);\n  if (c.length <= n) return out;\n  var g = 0, l = 0, i, d;\n  for (i = 1; i <= n; i++) { d = c[i] - c[i - 1]; if (d >= 0) g += d; else l -= d; }\n  g /= n; l /= n;\n  out[n] = l === 0 ? 100 : 100 - 100 / (1 + g / l);\n  for (i = n + 1; i < c.length; i++) {\n    d = c[i] - c[i - 1];\n    g = (g * (n - 1) + Math.max(d, 0)) / n;\n    l = (l * (n - 1) + Math.max(-d, 0)) / n;\n    out[i] = l === 0 ? 100 : 100 - 100 / (1 + g / l);\n  }\n  return out;\n}\nfunction rollExt(c, n, isMax) {\n  var out = new Array(c.length).fill(NaN);\n  for (var i = n; i < c.length; i++) {\n    var v = isMax ? -Infinity : Infinity;\n    for (var j = i - n; j < i; j++) { if (isMax ? c[j] > v : c[j] < v) v = c[j]; }\n    out[i] = v;\n  }\n  return out;\n}\nfunction makeStrategy(D, key, p) {\n  var c = D.c;\n  if (key === 'rsi2') {\n    var r = rsi(c, 2), s200 = sma(c, 200), s5 = sma(c, 5);\n    return {\n      enter: function (i) { return r[i] < p.rsiIn && c[i] > s200[i]; },\n      exit: function (i) { return c[i] > s5[i] || r[i] > p.rsiOut; }\n    };\n  }\n  if (key === 'trend') {\n    var f = sma(c, p.fast), s = sma(c, p.slow);\n    return { enter: function (i) { return f[i] > s[i]; }, exit: function (i) { return f[i] < s[i]; } };\n  }\n  var hi = rollExt(c, p.nIn, true), lo = rollExt(c, p.nOut, false);\n  return { enter: function (i) { return c[i] > hi[i]; }, exit: function (i) { return c[i] < lo[i]; } };\n}\nfunction runTrades(D, i0, i1, strat, slPct, costPct) {\n  var cost = costPct / 100, cash = 1, pos = null, wantIn = false, wantOut = false;\n  var trades = [], eq = [];\n  var closeAt = function (i, reason) {\n    var net = pos.cap * (D.c[i] / pos.price) * (1 - cost);\n    trades.push({ ei: pos.ei, xi: i, ret: net / pos.cap0 - 1, reason: reason });\n    cash = net; pos = null;\n  };\n  for (var i = i0; i <= i1; i++) {\n    var stopped = false;\n    if (pos && wantOut) closeAt(i, 'rule');\n    else if (!pos && wantIn) pos = { ei: i, price: D.c[i], cap0: cash, cap: cash * (1 - cost) };\n    wantIn = false; wantOut = false;\n    if (pos && slPct > 0 && pos.ei < i && D.c[i] <= pos.price * (1 - slPct / 100)) { closeAt(i, 'stop'); stopped = true; }\n    eq.push(pos ? pos.cap * D.c[i] / pos.price : cash);\n    if (stopped) continue;\n    if (pos) { if (strat.exit(i)) wantOut = true; }\n    else if (strat.enter(i)) wantIn = true;\n  }\n  if (pos) { closeAt(i1, 'end of test'); eq[eq.length - 1] = cash; }\n  return { trades: trades, eq: eq };\n}\nfunction tradeStats(res, days, span) {\n  var tr = res.trades, n = tr.length, eq = res.eq;\n  var w = tr.filter(function (t) { return t.ret > 0; }), l = tr.filter(function (t) { return t.ret <= 0; });\n  var sum = function (a) { return a.reduce(function (s, t) { return s + t.ret; }, 0); };\n  var avgWin = w.length ? sum(w) / w.length : NaN, avgLoss = l.length ? sum(l) / l.length : NaN;\n  var winRate = n ? w.length / n : NaN;\n  var expectancy = n ? sum(tr) / n : NaN;\n  var gl = Math.abs(sum(l));\n  var inMkt = tr.reduce(function (s, t) { return s + (t.xi - t.ei); }, 0) / Math.max(1, span);\n  var total = eq[eq.length - 1] / eq[0];\n  return {\n    n: n, winRate: winRate, avgWin: avgWin, avgLoss: avgLoss,\n    payoff: (w.length && l.length) ? avgWin / Math.abs(avgLoss) : NaN,\n    expectancy: expectancy,\n    profitFactor: gl > 0 ? sum(w) / gl : (w.length ? Infinity : NaN),\n    cagr: Math.pow(total, MS_YEAR / days) - 1,\n    maxDD: maxDrawdown(eq), inMarket: inMkt, total: total - 1\n  };\n}\nfunction buyHold(D, i0, i1) {\n  var eq = [];\n  for (var i = i0; i <= i1; i++) eq.push(D.c[i] / D.c[i0]);\n  var days = D.t[i1] - D.t[i0];\n  return { eq: eq, cagr: Math.pow(eq[eq.length - 1], MS_YEAR / days) - 1, maxDD: maxDrawdown(eq) };\n}\nfunction testStrategy(D, i0, i1, key, p, sl, cost) {\n  var strat = makeStrategy(D, key, p);\n  var full = runTrades(D, i0, i1, strat, sl, cost);\n  var split = i0 + Math.floor((i1 - i0) * 0.7);\n  var a = runTrades(D, i0, split, strat, sl, cost), b = runTrades(D, split, i1, strat, sl, cost);\n  return {\n    split: split, full: full,\n    stats: tradeStats(full, D.t[i1] - D.t[i0], i1 - i0),\n    inS: tradeStats(a, D.t[split] - D.t[i0], split - i0),\n    outS: tradeStats(b, D.t[i1] - D.t[split], i1 - split)\n  };\n}\n\nif (typeof module !== 'undefined') {\n  module.exports = {\n    demoData: demoData, parseData: parseData, parseDate: parseDate, simSIP: simSIP, simLump: simLump, rollingSIP: rollingSIP,\n    pctAbove: pctAbove, monthlyReturns: monthlyReturns, simSWP: simSWP, swpHistory: swpHistory, genPaths: genPaths,\n    mcSurvival: mcSurvival, mcBands: mcBands, safeWithdrawal: safeWithdrawal, testStrategy: testStrategy,\n    buyHold: buyHold, xirr: xirr, rsi: rsi, sma: sma, firstIdxGE: firstIdxGE, lastIdxLE: lastIdxLE, MS_YEAR: MS_YEAR\n  };\n}\n\n/* ===== Picker engine: monthly stock ranking with walk-forward tests. Pure functions, no DOM. ===== */\nfunction pkRng(a) {\n  return function () {\n    a |= 0; a = (a + 0x6D2B79F5) | 0;\n    var t = Math.imul(a ^ (a >>> 15), 1 | a);\n    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;\n    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;\n  };\n}\nfunction pkGauss(r) {\n  var u = 0, v = 0;\n  while (!u) u = r();\n  while (!v) v = r();\n  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);\n}\nfunction mean(a) { var s = 0; for (var i = 0; i < a.length; i++) s += a[i]; return a.length ? s / a.length : NaN; }\nfunction sdev(a) {\n  if (a.length < 2) return NaN;\n  var m = mean(a), s = 0;\n  for (var i = 0; i < a.length; i++) s += (a[i] - m) * (a[i] - m);\n  return Math.sqrt(s / (a.length - 1));\n}\n\nvar PK_MODE = 'mom';\nvar MOMKEYS = { dip: 1, momf: 1, mixm: 1, mixv: 1, mixlv: 1, custom: 1, v12: 1, v6: 1, v3: 1, mom1: 1, mom12: 1, mom6: 1, mom3: 1 };\nfunction isMom(k) { return !!MOMKEYS[k]; }\nvar PK_FORCE = '', PK_FILTOV = '', PK_EXCL = {}, PK_MINCONF = 'any', PK_BREADTH = 0.4;\nfunction scKey(key, k) { return key + '|' + k + (key === 'custom' ? '|' + wSig() : '') + (PK_FILTOV ? '|' + PK_FILTOV : '') + '|b' + PK_BREADTH; }\nfunction medVol(P, S, k) {\n  P._vm = P._vm || {};\n  if (P._vm[k] !== undefined) return P._vm[k];\n  var vols = [], n = P.syms.length, i;\n  for (i = 0; i < n; i++) { var vv = -S.lowvol[i][k]; if (isFinite(vv)) vols.push(vv); }\n  vols.sort(function (a, b) { return a - b; });\n  return (P._vm[k] = vols.length ? vols[Math.floor((vols.length - 1) / 2)] : NaN);\n}\nfunction confOk(level) { return PK_MINCONF === 'any' || (PK_MINCONF === 'med' && level !== 'Low') || (PK_MINCONF === 'high' && level === 'High'); }\nfunction selFilter(P, S, key, k, order, N) {\n  var kk = key === 'smart' ? 'combo' : key, out = [], i;\n  for (i = 0; i < order.length && out.length < N; i++) if (confOk(stockConf(P, S, kk, order[i], k, i + 1).level)) out.push(order[i]);\n  return out;\n}\nfunction pickIdx(P, S, key, k, sc, N) {\n  if (PK_MINCONF === 'any') return topIdx(sc, N);\n  var ord = topIdx(sc, Math.min(sc.length, N * 5 + 30));\n  return selFilter(P, S, key, k, ord, N);\n}\nvar PK_WM = 'equal', PK_WLIST = '25,20,10,10,10,5,5,5,5,5';\nvar WSCHEMES = [['equal', 'Equal money in each'], ['linear', 'More in higher ranks (steady slope)'], ['heavy', 'Much more in the top ranks'], ['custom', 'My own amounts by rank']];\nfunction normW(a) {\n  var t = a.reduce(function (x, y) { return x + y; }, 0);\n  return t > 0 ? a.map(function (x) { return x / t; }) : null;\n}\nfunction weightsFor(mode, N) {\n  var i, a = [];\n  if (mode === 'linear') { for (i = 0; i < N; i++) a.push(N - i); return normW(a); }\n  if (mode === 'heavy') {\n    if (N === 10) return normW([25, 20, 10, 10, 10, 5, 5, 5, 5, 5]);\n    for (i = 0; i < N; i++) a.push(Math.pow(N - i, 2));\n    return normW(a);\n  }\n  if (mode === 'harm') { for (i = 0; i < N; i++) a.push(1 / (i + 1)); return normW(a); }\n  if (mode === 'sqrt') { for (i = 0; i < N; i++) a.push(1 / Math.sqrt(i + 1)); return normW(a); }\n  if (mode === 'custom') {\n    a = String(PK_WLIST || '').split(/[\\s,;]+/).map(parseFloat).filter(function (x) { return isFinite(x) && x >= 0; });\n    while (a.length < N) a.push(0);\n    return normW(a.slice(0, N));\n  }\n  return null;\n}\nvar PK_W = { m12: 60, m6: 0, m3: 0, m1: -100, lv: 0, filt: 0, v12: 0, v6: 0, v3: 0 };\nfunction wSig() { return [PK_W.m12, PK_W.m6, PK_W.m3, PK_W.m1, PK_W.lv, PK_W.filt, PK_W.v12 || 0, PK_W.v6 || 0, PK_W.v3 || 0].join('_'); }\nfunction elig(E) { return PK_MODE === 'mom' ? E.sigs.filter(function (g) { return isMom(g.key); }) : E.sigs; }\nfunction defKey() { return PK_MODE === 'mom' ? 'momf' : 'combo'; }\nvar PK_OPT = { exit: 0, rg: 'none', rgL: 10, hc: 'all', cm: 15, sl: 0 };\nfunction rankAt(P, S, key, k, s) {\n  var kk = key === 'smart' ? 'combo' : key, sc = scoresAt(P, S, kk, k), id = scKey(kk, k);\n  P._rkc = P._rkc || {};\n  var rk = P._rkc[id];\n  if (!rk) {\n    var idx = [], i;\n    for (i = 0; i < sc.length; i++) if (isFinite(sc[i])) idx.push(i);\n    idx.sort(function (x, y) { return sc[y] - sc[x]; });\n    rk = new Array(sc.length).fill(Infinity);\n    idx.forEach(function (q, j) { rk[q] = (j > 0 && sc[q] === sc[idx[j - 1]]) ? rk[idx[j - 1]] : j + 1; });\n    P._rkc[id] = rk;\n  }\n  return rk[s];\n}\nfunction stockConf(P, S, key, s, k, rank) {\n  var info = stockInfo(P, S, s, k), c = P.closes[s], pass = [], fail = [], n = P.syms.length, i;\n  var thr = Math.max(10, Math.ceil(n * 0.2)), med = medVol(P, S, k);\n  var hi = -Infinity; for (i = k - 11; i <= k; i++) if (c[i] > hi) hi = c[i];\n  var cur = k === P.kSig, chk = function (ok, y, no) { (ok ? pass : fail).push(ok ? y : no); };\n  chk(info.trend > 0, 'above its 10-month average', 'below its 10-month average');\n  chk(info.mom12 > 0 && info.mom6 > 0 && info.mom3 > 0, 'rising over 12, 6 and 3 months', 'not rising over all of 12, 6 and 3 months');\n  chk(rank <= thr && rankAt(P, S, key, k - 1, s) <= thr && rankAt(P, S, key, k - 2, s) <= thr, 'in the top ' + thr + ' for 3 months running', 'not in the top ' + thr + ' in each of the last 3 months');\n  chk(isFinite(med) && info.vol <= med, 'price swings below the list median', 'price swings above the list median');\n  chk(!(info.r1 > 0.2), 'no sudden jump last month', 'jumped ' + (info.r1 * 100).toFixed(0) + '% last month, so it may be chasing');\n  chk(isFinite(hi) && c[k] / hi - 1 >= -0.1, 'within 10% of its 12-month high', 'more than 10% below its 12-month high');\n  chk(!(cur && info.stale), 'has recent prices', 'no recent prices');\n  chk(!(cur && isFinite(info.since) && info.since < -0.05), 'holding up this month', 'down ' + (Math.abs(info.since) * 100).toFixed(0) + '% since month-end');\n  return { level: (pass.length >= 7 && info.trend > 0 && !(cur && info.stale)) ? 'High' : (pass.length >= 5 ? 'Medium' : 'Low'), pass: pass, fail: fail };\n}\nfunction confGroups(P, S, key, k, h, cost) {\n  var kk = key === 'smart' ? 'combo' : key, order = topIdx(scoresAt(P, S, kk, k), PK_OPT.cm), g = { High: [], Medium: [], Low: [] }, o = {};\n  order.forEach(function (s, i) { var f = fwd(P, s, k, h); if (isFinite(f)) g[stockConf(P, S, kk, s, k, i + 1).level].push(f - cost / 100); });\n  ['High', 'Medium', 'Low'].forEach(function (L) { var a = g[L]; o[L] = { n: a.length, r: a.length ? a.reduce(function (x, y) { return x + y; }, 0) / a.length : NaN }; });\n  return o;\n}\nfunction portSim(P, S, key, N, exitRank, cost, rg, rgL, startKey, endKey, sl, wts) {\n  var K = P.K, n = P.syms.length, idx = new Array(K).fill(NaN), k, s, i, kk = key === 'smart' ? 'combo' : key;\n  sl = sl || 0;\n  idx[0] = 100;\n  for (k = 1; k < K; k++) { var sm = 0, ct = 0; for (s = 0; s < n; s++) { var a = P.closes[s][k], b = P.closes[s][k - 1]; if (isFinite(a) && isFinite(b) && b > 0) { sm += a / b - 1; ct++; } } idx[k] = idx[k - 1] * (1 + (ct ? sm / ct : 0)); }\n  var kf = 12; while (kf < P.kSig && breadthAt(P, S, kf) < minBreadth(P)) kf++;\n  var kFrom = Math.max(isFinite(startKey) ? startKey - 1 - P.lo : kf, kf), held = [], expo = 1, rows = [], buys = 0, sells = 0, badM = 0, stops = 0, ent = {}, prevW = {};\n  P._ord = P._ord || {};\n  for (k = kFrom; k <= P.kSig - 1; k++) {\n    if (isFinite(endKey) && P.lo + k + 1 > endKey) break;\n    var oid = kk + '|' + k + (kk === 'custom' ? '|' + wSig() : '') + (PK_FILTOV ? '|' + PK_FILTOV : ''), order = P._ord[oid] || (P._ord[oid] = topIdx(scoresAt(P, S, kk, k), n)), rankOf = {};\n    if (PK_MINCONF !== 'any') order = selFilter(P, S, kk, k, order.slice(0, Math.max(exitRank, N) * 3 + 20), Infinity);\n    for (i = 0; i < order.length; i++) rankOf[order[i]] = i + 1;\n    var bad = false;\n    if (rg !== 'none' && k >= rgL - 1) { var av = 0; for (i = k - rgL + 1; i <= k; i++) av += idx[i]; bad = idx[k] < av / rgL; }\n    var tgt = exitRank > 0 ? held.filter(function (x) { return rankOf[x] && rankOf[x] <= exitRank; }).slice(0, N) : [];\n    for (i = 0; i < order.length && tgt.length < N; i++) if (tgt.indexOf(order[i]) < 0) tgt.push(order[i]);\n    var cur = held, nb = tgt.filter(function (x) { return cur.indexOf(x) < 0; }).length, ns = cur.filter(function (x) { return tgt.indexOf(x) < 0; }).length;\n    var ex = bad ? (rg === 'cash' ? 0 : 0.5) : 1; if (bad) badM++;\n    var nent = {}, g = 0, stopped = 0, keep = [], newW = {}, turn = 0, wStop = 0;\n    if (wts) tgt.sort(function (x, y) { return (rankOf[x] || 1e9) - (rankOf[y] || 1e9); });\n    tgt.forEach(function (x, pos) {\n      var wi = wts ? (wts[pos] || 0) : 1 / N, c0 = P.closes[x][k], e0 = (cur.indexOf(x) >= 0 && ent[x]) ? ent[x] : c0, f = fwd(P, x, k, 1), ret = f;\n      if (!isFinite(f)) { keep.push(x); nent[x] = e0; newW[x] = wi; return; }\n      if (sl > 0) {\n        var lw = P.lows[x][k + 1], lo2 = isFinite(lw) ? lw : P.closes[x][k + 1], lvl = e0 * (1 - sl / 100);\n        if (isFinite(lo2) && lo2 <= lvl) { g += wi * (lvl / c0 - 1); stopped++; wStop += wi; return; }\n      }\n      g += wi * ret; keep.push(x); nent[x] = e0; newW[x] = wi * (1 + ret);\n    });\n    var denom = 1 + g;\n    keep.forEach(function (x) { newW[x] = wts ? newW[x] / denom : 1 / N; });\n    var tw = {};\n    tgt.forEach(function (x, pos) { tw[x] = wts ? (wts[pos] || 0) : 1 / N; });\n    Object.keys(tw).forEach(function (x) { turn += Math.abs(tw[x] - (prevW[x] || 0)); });\n    Object.keys(prevW).forEach(function (x) { if (tw[x] === undefined) turn += prevW[x]; });\n    var bm = benchAt(P, k, 1).m;\n    rows.push({ k: k, ret: ex * g - cost / 100 * 0.5 * turn * ex - cost / 100 * 0.5 * wStop * ex - cost / 100 * Math.abs(ex - expo) * (tgt.length / N), bench: isFinite(bm) ? bm : 0 });\n    prevW = newW;\n    held = keep; ent = nent; expo = ex;\n    buys += nb; sells += ns + stopped; stops += stopped;\n  }\n  var nR = rows.length;\n  if (nR < 1) return { err: 'No months to test between those dates. Move the start date earlier or the end date later.' };\n  var eq = 1, be = 1, pk = 1, bpk = 1, dd = 0, bdd = 0, pts = [[monthTime(P, kFrom), 100]], bpts = [[monthTime(P, kFrom), 100]], rets = [];\n  rows.forEach(function (r) { eq *= 1 + r.ret; be *= 1 + r.bench; rets.push(r.ret); pk = Math.max(pk, eq); bpk = Math.max(bpk, be); dd = Math.min(dd, eq / pk - 1); bdd = Math.min(bdd, be / bpk - 1); pts.push([monthTime(P, r.k + 1), eq * 100]); bpts.push([monthTime(P, r.k + 1), be * 100]); });\n  var sd = sdev(rets), cagr = Math.pow(eq, 12 / nR) - 1;\n  return { n: nR, cagr: cagr, bcagr: Math.pow(be, 12 / nR) - 1, dd: dd, bdd: bdd, trades: buys + sells, badM: badM, stops: stops, calmar: dd < 0 ? cagr / Math.abs(dd) : NaN, sharpe: sd > 0 ? mean(rets) / sd * Math.sqrt(12) : NaN, pts: pts, bpts: bpts, rows: rows };\n}\nvar SIGS = [\n  { key: 'momf', name: 'Momentum + downtrend filter', short: 'Momentum + filter', about: 'Ranks stocks by 12, 6 and 3-month momentum. Only stocks with a positive 6-month return and a price above their 10-month average qualify. If fewer than 40% of your stocks are above their 10-month average, it holds cash.' },\n  { key: 'combo', name: 'Combined score', short: 'Combined', about: 'Averages the rank of 12-month momentum, 6-month momentum, return per risk and trend, and drops stocks below their 10-month average.' },\n  { key: 'smart', name: 'Smart-weighted', short: 'Smart-weighted', about: 'Each month, weights every ingredient by how well it worked on earlier months only, then ranks stocks on the weighted mix.' },\n  { key: 'mixm', name: 'Momentum mix: 12m + 6m + 3m + 1m', short: 'Mix 12/6/3/1', about: 'Averages the rank of 12, 6, 3 and 1-month momentum, with the downtrend filter.' },\n  { key: 'dip', name: 'Strong 12m/6m, dipped last month', short: 'Strong then dipped', about: 'Buys stocks that rose over 12 and 6 months but fell most in the last month: a long-term winner on a short pause. Uses the downtrend filter.' },\n  { key: 'mixv', name: 'Momentum mix, risk-adjusted', short: 'Mix risk-adj', about: 'Averages the rank of 12, 6 and 3-month momentum each divided by the stock’s monthly price swings, so steady climbers beat wild ones.' },\n  { key: 'mixlv', name: 'Momentum mix + low volatility', short: 'Mix + low vol', about: 'Averages the rank of 12, 6 and 3-month momentum and adds the calmest-stocks rank as a fourth ingredient.' },\n  { key: 'custom', name: 'My own blend (weights below)', short: 'My blend', about: 'Your own mix of 12m, 6m, 3m and 1m momentum and low volatility, using the weights you set. Weights of 0 switch an ingredient off.' },\n  { key: 'v12', name: '12-month momentum per risk', short: '12m per risk', about: '12-month gain (skipping last month) divided by monthly price swings.' },\n  { key: 'v6', name: '6-month momentum per risk', short: '6m per risk', about: '6-month gain (skipping last month) divided by monthly price swings.' },\n  { key: 'v3', name: '3-month momentum per risk', short: '3m per risk', about: '3-month gain divided by monthly price swings.' },\n  { key: 'mom1', name: '1-month momentum', short: '1m momentum', about: 'Buys what rose most in the last month. Short-term winners often give some back, so check how this one does.' },\n  { key: 'mom12', name: '12-month momentum', short: '12m momentum', about: 'Buys what rose most over the last year, skipping the most recent month.' },\n  { key: 'mom6', name: '6-month momentum', short: '6m momentum', about: 'Buys what rose most over the last six months, skipping the most recent month.' },\n  { key: 'mom3', name: '3-month momentum', short: '3m momentum', about: 'Buys what rose most over the last three months.' },\n  { key: 'trend', name: 'Above its 10-month average', short: 'Trend', about: 'Buys the stocks sitting furthest above their 10-month average price.' },\n  { key: 'riskadj', name: 'Return per risk', short: 'Return per risk', about: 'Buys the best six-month gain compared with how much the price swings.' },\n  { key: 'lowvol', name: 'Low swings', short: 'Low swings', about: 'Buys the steadiest stocks, the ones whose monthly price swings are smallest.' },\n  { key: 'rev', name: 'Last month’s losers', short: 'Bounce back', about: 'Buys the stocks that fell most last month, betting on a bounce.' },\n  { key: 'clv', name: 'Closing strength (candles)', short: 'Close strength', candle: true, about: 'Buys the stocks that closed near the top of their monthly price range over the last three months.' },\n  { key: 'candle', name: 'Candlestick patterns', short: 'Candle patterns', candle: true, about: 'Scores bullish patterns (engulfing, hammer, strong close) up and bearish patterns down on the latest monthly candle.' },\n  { key: 'combo_c', name: 'Combined + candles', short: 'Combined + candles', candle: true, about: 'The combined score with closing strength added as a fifth ingredient.' }\n];\nfunction sigsFor(P) { return SIGS.filter(function (g) { return !g.candle || P.hasOHLC; }); }\nvar PATTERNS = [\n  { key: 'bull_engulf', name: 'Bullish engulfing', bull: true },\n  { key: 'hammer', name: 'Hammer after a fall', bull: true },\n  { key: 'strong_up', name: 'Strong up month (closes in top fifth)', bull: true },\n  { key: 'bear_engulf', name: 'Bearish engulfing', bull: false },\n  { key: 'shoot', name: 'Shooting star after a rise', bull: false },\n  { key: 'strong_down', name: 'Strong down month (closes in bottom fifth)', bull: false }\n];\nvar MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];\n\n/* ---------- monthly store ---------- */\nfunction monthKeyOf(t) { var d = new Date(t); return d.getUTCFullYear() * 12 + d.getUTCMonth(); }\nfunction toMonthMap(t, c, o, h, l) {\n  var m = {};\n  for (var i = 0; i < t.length; i++) {\n    var k = monthKeyOf(t[i]);\n    var has = o && isFinite(o[i]) && isFinite(h[i]) && isFinite(l[i]);\n    var e = m[k];\n    if (!e) { m[k] = [c[i], t[i], has ? o[i] : NaN, has ? h[i] : NaN, has ? l[i] : NaN]; continue; }\n    if (has && isFinite(e[2])) { if (h[i] > e[3]) e[3] = h[i]; if (l[i] < e[4]) e[4] = l[i]; }\n    else if (has && !isFinite(e[2])) { e[2] = o[i]; e[3] = h[i]; e[4] = l[i]; }\n    if (t[i] >= e[1]) { e[0] = c[i]; e[1] = t[i]; }\n  }\n  return m;\n}\nvar PK_VER = 0, PK_CACHE = { stocks: null, ver: -1, P: null, S: null };\nfunction mergeInto(stocks, sym, map) {\n  PK_VER++;\n  var s = stocks[sym] || (stocks[sym] = { m: {} });\n  for (var k in map) {\n    var o = s.m[k];\n    if (!o || map[k][1] >= o[1]) s.m[k] = map[k];\n  }\n}\n\nfunction buildPanel(stocks) {\n  var syms = Object.keys(stocks).filter(function (s) { return Object.keys(stocks[s].m).length >= 2; }).sort();\n  if (!syms.length) return null;\n  var lo = Infinity, hi = -Infinity, last = 0;\n  syms.forEach(function (s) {\n    for (var k in stocks[s].m) {\n      var key = +k; if (key < lo) lo = key; if (key > hi) hi = key;\n      var d = stocks[s].m[k][1]; if (d > last) last = d;\n    }\n  });\n  var K = hi - lo + 1;\n  var closes = syms.map(function (s) {\n    var a = new Array(K).fill(NaN);\n    for (var k in stocks[s].m) a[+k - lo] = stocks[s].m[k][0];\n    return a;\n  });\n  var opens = [], highs = [], lows = [], withOHLC = 0;\n  syms.forEach(function (s) {\n    var o = new Array(K).fill(NaN), hi = new Array(K).fill(NaN), lw = new Array(K).fill(NaN), good = 0, tot = 0;\n    for (var k in stocks[s].m) {\n      var r = stocks[s].m[k]; tot++;\n      if (isFinite(r[2]) && isFinite(r[3]) && isFinite(r[4])) { o[+k - lo] = r[2]; hi[+k - lo] = r[3]; lw[+k - lo] = r[4]; good++; }\n    }\n    if (good >= tot * 0.8) withOHLC++;\n    opens.push(o); highs.push(hi); lows.push(lw);\n  });\n  var lastDates = syms.map(function (s) {\n    var d = 0; for (var k in stocks[s].m) if (stocks[s].m[k][1] > d) d = stocks[s].m[k][1];\n    return d;\n  });\n  var partial = new Date(last).getUTCDate() < 26;\n  return {\n    syms: syms, closes: closes, opens: opens, highs: highs, lows: lows, hasOHLC: withOHLC >= Math.ceil(syms.length * 0.6),\n    K: K, lo: lo, last: last, lastDates: lastDates,\n    partial: partial, kSig: partial ? K - 2 : K - 1, _sc: {}, _bn: {}\n  };\n}\nfunction monthLabel(P, k) { var key = P.lo + k; return MONTH_NAMES[key % 12] + ' ' + Math.floor(key / 12); }\nfunction monthTime(P, k) { var key = P.lo + k; return Date.UTC(Math.floor(key / 12), key % 12, 1); }\n\n/* ---------- candlestick patterns ---------- */\nfunction candleAt(P, s, k) {\n  var out = {};\n  if (!P.hasOHLC || k < 4) return out;\n  var o = P.opens[s][k], h = P.highs[s][k], l = P.lows[s][k], c = P.closes[s][k];\n  var po = P.opens[s][k - 1], pc = P.closes[s][k - 1];\n  if (!(isFinite(o) && isFinite(h) && isFinite(l) && isFinite(c) && h > l)) return out;\n  var range = h - l, body = Math.abs(c - o), upper = h - Math.max(o, c), lower = Math.min(o, c) - l, pos = (c - l) / range;\n  var prior = P.closes[s][k - 1] / P.closes[s][k - 4] - 1;\n  var core = Math.max(body, 0.1 * range);\n  if (isFinite(po) && isFinite(pc)) {\n    if (pc < po && c > o && o <= pc && c >= po) out.bull_engulf = true;\n    if (pc > po && c < o && o >= pc && c <= po) out.bear_engulf = true;\n  }\n  if (lower >= 2 * core && upper <= 0.3 * range && prior < 0) out.hammer = true;\n  if (upper >= 2 * core && lower <= 0.3 * range && prior > 0) out.shoot = true;\n  if (c > o && pos >= 0.8) out.strong_up = true;\n  if (c < o && pos <= 0.2) out.strong_down = true;\n  out.pos = pos;\n  return out;\n}\nfunction candleLabel(P, s, k) {\n  var c = candleAt(P, s, k);\n  for (var i = 0; i < PATTERNS.length; i++) if (c[PATTERNS[i].key]) return PATTERNS[i].name.replace(/ \\(.*\\)$/, '');\n  return '';\n}\nvar PATTERN_WEIGHT = { bull_engulf: 1, hammer: 1, strong_up: 0.5, bear_engulf: -1, shoot: -1, strong_down: -0.5 };\nfunction patternStudy(P) {\n  var thr = minBreadth(P), res = {};\n  PATTERNS.forEach(function (g) { res[g.key] = { 1: [], 3: [] }; });\n  var kMax = P.kSig;\n  for (var k = 4; k < kMax; k++) {\n    var br = 0, s;\n    for (s = 0; s < P.syms.length; s++) if (isFinite(P.closes[s][k]) && isFinite(P.closes[s][k - 4])) br++;\n    if (br < thr) continue;\n    var b1 = k + 1 <= kMax ? benchAt(P, k, 1).m : NaN, b3 = k + 3 <= kMax ? benchAt(P, k, 3).m : NaN;\n    for (s = 0; s < P.syms.length; s++) {\n      var c = candleAt(P, s, k);\n      PATTERNS.forEach(function (g) {\n        if (!c[g.key]) return;\n        if (k + 1 <= kMax) { var f1 = fwd(P, s, k, 1); if (isFinite(f1) && isFinite(b1)) res[g.key][1].push(f1 - b1); }\n        if (k + 3 <= kMax) { var f3 = fwd(P, s, k, 3); if (isFinite(f3) && isFinite(b3)) res[g.key][3].push(f3 - b3); }\n      });\n    }\n  }\n  return PATTERNS.map(function (g) {\n    var row = { key: g.key, name: g.name, bull: g.bull };\n    [1, 3].forEach(function (h) {\n      var a = res[g.key][h], n = a.length, m = mean(a), sd = sdev(a);\n      row['n' + h] = n; row['m' + h] = n ? m : NaN;\n      row['t' + h] = n > 5 && sd > 0 ? (m / (sd / Math.sqrt(n))) / Math.sqrt(h) : NaN;\n      row['hit' + h] = n ? a.filter(function (x) { return x > 0; }).length / n : NaN;\n    });\n    var good = function (h) { return row['n' + h] >= 30 && Math.abs(row['t' + h]) >= 2.5 && ((row['t' + h] > 0) === !!g.bull); };\n    var back = function (h) { return row['n' + h] >= 30 && Math.abs(row['t' + h]) >= 2.5 && ((row['t' + h] > 0) !== !!g.bull); };\n    row.verdict = (good(1) || good(3)) ? 'Worked' : ((back(1) || back(3)) ? 'Worked backwards' : (row.n1 < 30 ? 'Too few cases' : 'No clear effect'));\n    return row;\n  });\n}\n\n/* ---------- signals ---------- */\nvar MIXK = { dip: 1, momf: 1, mixm: 1, mixv: 1, mixlv: 1, custom: 1 };\nfunction computeSignals(P) {\n  var S = {}, K = P.K;\n  sigsFor(P).forEach(function (g) {\n    if (g.key !== 'combo' && g.key !== 'combo_c' && g.key !== 'smart' && !MIXK[g.key]) S[g.key] = P.closes.map(function () { return new Float64Array(K).fill(NaN); });\n  });\n  P.closes.forEach(function (c, s) {\n    var r = new Array(K).fill(NaN), k, j;\n    for (k = 1; k < K; k++) r[k] = c[k] / c[k - 1] - 1;\n    for (k = 0; k < K; k++) {\n      if (k >= 12) S.mom12[s][k] = c[k - 1] / c[k - 12] - 1;\n      if (k >= 6) S.mom6[s][k] = c[k - 1] / c[k - 6] - 1;\n      if (k >= 3) S.mom3[s][k] = c[k] / c[k - 3] - 1;\n      if (k >= 1) S.mom1[s][k] = c[k] / c[k - 1] - 1;\n      if (k >= 9) { var sm = 0; for (j = k - 9; j <= k; j++) sm += c[j]; S.trend[s][k] = c[k] / (sm / 10) - 1; }\n      if (k >= 12) {\n        var m1 = 0, m2 = 0;\n        for (j = k - 11; j <= k; j++) { m1 += r[j]; m2 += r[j] * r[j]; }\n        var mu = m1 / 12, vol = Math.sqrt(Math.max(m2 / 12 - mu * mu, 0));\n        S.lowvol[s][k] = -vol;\n        S.riskadj[s][k] = vol > 0 ? (c[k] / c[k - 6] - 1) / vol : NaN;\n        S.v12[s][k] = vol > 0 ? (c[k - 1] / c[k - 12] - 1) / vol : NaN;\n        S.v6[s][k] = vol > 0 ? (c[k - 1] / c[k - 6] - 1) / vol : NaN;\n        S.v3[s][k] = vol > 0 ? (c[k] / c[k - 3] - 1) / vol : NaN;\n      }\n      if (k >= 1) S.rev[s][k] = -r[k];\n    }\n    if (P.hasOHLC) {\n      var pos = new Array(K).fill(NaN), sc;\n      for (k = 0; k < K; k++) {\n        var rg = P.highs[s][k] - P.lows[s][k];\n        if (rg > 0) pos[k] = (c[k] - P.lows[s][k]) / rg;\n      }\n      for (k = 2; k < K; k++) {\n        var a1 = pos[k], a2 = pos[k - 1], a3 = pos[k - 2];\n        if (isFinite(a1) && isFinite(a2) && isFinite(a3)) S.clv[s][k] = (a1 + a2 + a3) / 3;\n        var cd = candleAt(P, s, k);\n        sc = 0;\n        for (var key in PATTERN_WEIGHT) if (cd[key]) sc += PATTERN_WEIGHT[key];\n        if (isFinite(pos[k])) S.candle[s][k] = sc + 0.01 * pos[k];\n      }\n    }\n  });\n  return S;\n}\nfunction pctRanks(v) {\n  var idx = [], i;\n  for (i = 0; i < v.length; i++) if (isFinite(v[i])) idx.push(i);\n  idx.sort(function (a, b) { return v[a] - v[b]; });\n  var out = new Array(v.length).fill(NaN), n = idx.length;\n  for (var j = 0; j < n; j++) out[idx[j]] = n > 1 ? j / (n - 1) : 0.5;\n  return out;\n}\nfunction mixSpec(key) {\n  if (key === 'momf') return { c: ['mom12', 'mom6', 'mom3'], w: [1, 1, 1], filt: 'full' };\n  if (key === 'mixm') return { c: ['mom12', 'mom6', 'mom3', 'mom1'], w: [1, 1, 1, 1], filt: 'full' };\n  if (key === 'dip') return { c: ['mom12', 'mom6', 'mom1'], w: [1, 1, -1], filt: 'full' };\n  if (key === 'mixv') return { c: ['v12', 'v6', 'v3'], w: [1, 1, 1], filt: 'full' };\n  if (key === 'mixlv') return { c: ['mom12', 'mom6', 'mom3', 'lowvol'], w: [1, 1, 1, 1], filt: 'full' };\n  var c = [], w = [];\n  [['mom12', PK_W.m12], ['mom6', PK_W.m6], ['mom3', PK_W.m3], ['mom1', PK_W.m1], ['lowvol', PK_W.lv], ['v12', PK_W.v12 || 0], ['v6', PK_W.v6 || 0], ['v3', PK_W.v3 || 0]].forEach(function (x) { if (x[1] !== 0) { c.push(x[0]); w.push(x[1]); } });\n  return { c: c, w: w, filt: PK_W.filt ? 'full' : 'none' };\n}\nfunction scoresAt(P, S, key, k) {\n  var id = scKey(key, k);\n  if (P._sc[id]) return P._sc[id];\n  if (MIXK[key]) {\n    var sp = mixSpec(key); if (PK_FILTOV) sp.filt = PK_FILTOV; var nn = P.syms.length, o2 = new Array(nn).fill(NaN), upN = 0, totN = 0, q2;\n    if (!sp.c.length) { P._sc[id] = o2; return o2; }\n    for (q2 = 0; q2 < nn; q2++) { var tq = S.trend[q2][k]; if (isFinite(tq)) { totN++; if (tq > 0) upN++; } }\n    if (sp.filt === 'none' || PK_BREADTH <= 0 || (totN && upN / totN >= PK_BREADTH)) {\n      var cs = sp.c.map(function (c) { var v = []; for (var z = 0; z < nn; z++) v.push(S[c][z][k]); return pctRanks(v); });\n      for (q2 = 0; q2 < nn; q2++) {\n        if (sp.filt !== 'none' && !(S.mom6[q2][k] > 0 && S.trend[q2][k] > 0)) continue;\n        var sm2 = 0, ct2 = 0, wt = 0;\n        for (var y2 = 0; y2 < sp.c.length; y2++) if (isFinite(cs[y2][q2])) { var aw = Math.abs(sp.w[y2]); sm2 += (sp.w[y2] > 0 ? cs[y2][q2] : 1 - cs[y2][q2]) * aw; wt += aw; ct2++; }\n        if (ct2 >= Math.max(1, sp.c.length - 1) && wt > 0) o2[q2] = sm2 / wt;\n      }\n    }\n    P._sc[id] = o2; return o2;\n  }\n  var n = P.syms.length, out = new Array(n), s;\n  if (key !== 'combo' && key !== 'combo_c') {\n    for (s = 0; s < n; s++) out[s] = S[key][s][k];\n  } else {\n    var comps = key === 'combo' ? ['mom12', 'mom6', 'riskadj', 'trend'] : ['mom12', 'mom6', 'riskadj', 'trend', 'clv'];\n    var prs = comps.map(function (c) { var v = []; for (var q = 0; q < n; q++) v.push(S[c][q][k]); return pctRanks(v); });\n    for (s = 0; s < n; s++) {\n      var sum = 0, cnt = 0;\n      for (var q = 0; q < comps.length; q++) if (isFinite(prs[q][s])) { sum += prs[q][s]; cnt++; }\n      out[s] = cnt >= comps.length - 1 ? sum / cnt : NaN;\n    }\n    var ok = 0;\n    for (s = 0; s < n; s++) if (isFinite(out[s]) && S.trend[s][k] > 0) ok++;\n    if (ok >= 3) for (s = 0; s < n; s++) if (!(S.trend[s][k] > 0)) out[s] = NaN;\n  }\n  P._sc[id] = out;\n  return out;\n}\nfunction topIdx(sc, N) {\n  var ids = [], n = sc.length, i;\n  for (i = 0; i < n; i++) if (isFinite(sc[i])) ids.push(i);\n  ids.sort(function (a, b) { return (sc[b] - sc[a]) || (a - b); });\n  return ids.slice(0, N);\n}\nfunction fwd(P, s, k, h) {\n  var a = P.closes[s][k], b = P.closes[s][k + h];\n  return (isFinite(a) && isFinite(b) && a > 0) ? b / a - 1 : NaN;\n}\nfunction benchAt(P, k, h) {\n  var id = h + '|' + k;\n  if (P._bn[id]) return P._bn[id];\n  var sum = 0, n = 0;\n  for (var s = 0; s < P.syms.length; s++) { var f = fwd(P, s, k, h); if (isFinite(f)) { sum += f; n++; } }\n  return (P._bn[id] = { m: n ? sum / n : NaN, n: n });\n}\nfunction breadthAt(P, S, k) {\n  var n = 0;\n  for (var s = 0; s < P.syms.length; s++) if (isFinite(S.mom6[s][k])) n++;\n  return n;\n}\nfunction minBreadth(P) { return Math.max(5, Math.ceil(P.syms.length * 0.5)); }\nfunction monthRow(P, S, key, k, h, N, cost, scIn) {\n  var sc = scIn || scoresAt(P, S, key, k), valid = 0, i;\n  for (i = 0; i < sc.length; i++) if (isFinite(sc[i])) valid++;\n  if (breadthAt(P, S, k) < minBreadth(P)) return null;\n  if (valid < 1) {\n    if (!MIXK[key]) return null;\n    var b0 = benchAt(P, k, h);\n    if (b0.n < 5) return null;\n    return { k: k, picks: [], cash: true, ret: 0, bench: b0.m, ex: -b0.m, hits: 0, np: 0 };\n  }\n  var picks = pickIdx(P, S, key, k, sc, N), rs = [];\n  if (!picks.length) { var b1 = benchAt(P, k, h); if (b1.n < 5) return null; return { k: k, picks: [], cash: true, ret: 0, bench: b1.m, ex: -b1.m, hits: 0, np: 0 }; }\n  picks.forEach(function (s) { var f = fwd(P, s, k, h); if (isFinite(f)) rs.push(f); });\n  var b = benchAt(P, k, h);\n  if (!rs.length || b.n < 5) return null;\n  var ret = MIXK[key] ? (rs.reduce(function (a, x) { return a + x; }, 0) / N) - cost / 100 * (rs.length / N) : mean(rs) - cost / 100;\n  var hits = rs.filter(function (x) { return x > b.m; }).length;\n  return { k: k, picks: picks, ret: ret, bench: b.m, ex: ret - b.m, hits: hits, np: rs.length };\n}\nfunction evalAll(P, S, h, N, cost) {\n  var kLast = P.kSig - h, rows = {}, kFirst = 12;\n  while (kFirst <= kLast && breadthAt(P, S, kFirst) < minBreadth(P)) kFirst++;\n  var sigs = sigsFor(P);\n  sigs.forEach(function (g) {\n    if (g.key === 'smart') return;\n    var a = [];\n    for (var k = kFirst; k <= kLast; k++) a.push(monthRow(P, S, g.key, k, h, N, cost));\n    rows[g.key] = a;\n  });\n  var span = kLast - kFirst + 1;\n  var E = { sigs: sigs, h: h, N: N, cost: cost, kFirst: kFirst, kLast: kLast, kSplit: kFirst + Math.floor(span * 0.6), rows: rows };\n  var sm = [];\n  for (var ks = kFirst; ks <= kLast; ks++) sm.push(monthRow(P, S, 'smart', ks, h, N, cost, wScores(P, S, wWeights(E, ks), ks)));\n  rows.smart = sm;\n  P._sw = P._sw || {}; P._sw[h] = wWeights(E, P.kSig);\n  return E;\n}\nfunction rowsIn(E, key, a, b) {\n  var out = [], arr = E.rows[key];\n  for (var k = Math.max(a, E.kFirst); k <= b && k <= E.kLast; k++) { var r = arr[k - E.kFirst]; if (r) out.push(r); }\n  return out;\n}\nfunction summarize(rows, h) {\n  var n = rows.length;\n  if (n < 3) return { n: n, t: NaN, hit: NaN, meanEx: NaN, meanRet: NaN, worst: NaN, pos: NaN, pickAcc: NaN };\n  var ex = rows.map(function (r) { return r.ex; }), rt = rows.map(function (r) { return r.ret; });\n  var m = mean(ex), sd = sdev(ex), ph = 0, pn = 0;\n  rows.forEach(function (r) { ph += r.hits || 0; pn += r.np || 0; });\n  return {\n    n: n, pickAcc: pn ? ph / pn : NaN, meanEx: m, meanRet: mean(rt), meanBench: mean(rows.map(function (r) { return r.bench; })),\n    hit: ex.filter(function (x) { return x > 0; }).length / n,\n    pos: rt.filter(function (x) { return x > 0; }).length / n,\n    worst: Math.min.apply(null, rt),\n    t: sd > 0 ? (m / (sd / Math.sqrt(n))) / Math.sqrt(h) : NaN\n  };\n}\nfunction permP(P, h, N, cost, kFrom, kTo, actualMean, seed, sims) {\n  var r = pkRng(seed), months = [], k, s;\n  for (k = kFrom; k <= kTo; k++) {\n    var vals = [];\n    for (s = 0; s < P.syms.length; s++) { var f = fwd(P, s, k, h); if (isFinite(f)) vals.push(f); }\n    if (vals.length >= Math.max(5, N + 2)) months.push({ v: vals, b: mean(vals) });\n  }\n  if (months.length < 6 || !isFinite(actualMean)) return NaN;\n  var ge = 0;\n  for (var q = 0; q < sims; q++) {\n    var tot = 0;\n    for (var m = 0; m < months.length; m++) {\n      var arr = months[m].v, sum = 0;\n      for (var j = 0; j < N; j++) sum += arr[Math.floor(r() * arr.length)];\n      tot += sum / N - cost / 100 - months[m].b;\n    }\n    if (tot / months.length >= actualMean) ge++;\n  }\n  return (ge + 1) / (sims + 1);\n}\nfunction pairedDiff(E, keyA, keyB, a, b) {\n  var d = [];\n  for (var k = Math.max(a, E.kFirst); k <= b && k <= E.kLast; k++) {\n    var x = E.rows[keyA][k - E.kFirst], y = E.rows[keyB][k - E.kFirst];\n    if (x && y) d.push(x.ex - y.ex);\n  }\n  var n = d.length, m = mean(d), sd = sdev(d);\n  return { n: n, mean: n ? m : NaN, t: n > 5 && sd > 0 ? (m / (sd / Math.sqrt(n))) / Math.sqrt(E.h) : NaN };\n}\nfunction adaptiveStats(E) {\n  var res = [];\n  for (var k = E.kSplit; k <= E.kLast; k++) {\n    var best = null, bt = -Infinity;\n    var EL = elig(E);\n    for (var g = 0; g < EL.length; g++) {\n      var rows = rowsIn(E, EL[g].key, E.kFirst, k - E.h);\n      if (rows.length >= 12) { var st = summarize(rows, E.h); if (st.t > bt) { bt = st.t; best = EL[g].key; } }\n    }\n    var row = E.rows[best || defKey()][k - E.kFirst];\n    if (row) res.push(row);\n  }\n  return summarize(res, E.h);\n}\n\n/* ---------- smart-weighted method ---------- */\nvar WC = ['mom12', 'mom6', 'mom3', 'riskadj', 'trend', 'rev', 'lowvol'];\nvar WN = { mom12: '12m momentum', mom6: '6m momentum', mom3: '3m momentum', riskadj: 'return per risk', trend: 'trend', rev: 'bounce back', lowvol: 'low swings' };\nfunction wWeights(E, k) {\n  var w = {}, tot = 0;\n  WC.forEach(function (key) {\n    var st = summarize(rowsIn(E, key, E.kFirst, k - E.h), E.h);\n    var t = (st.n >= 12 && isFinite(st.t)) ? Math.max(0, st.t) : 0;\n    w[key] = t; tot += t;\n  });\n  WC.forEach(function (key) { w[key] = tot ? w[key] / tot : 1 / WC.length; });\n  return w;\n}\nfunction wScores(P, S, w, k) {\n  var n = P.syms.length, out = new Array(n).fill(0), seen = new Array(n).fill(0), s, i;\n  WC.forEach(function (key) {\n    if (!w[key]) return;\n    var v = []; for (s = 0; s < n; s++) v.push(S[key][s][k]);\n    var pr = pctRanks(v);\n    for (var s2 = 0; s2 < n; s2++) if (isFinite(pr[s2])) { out[s2] += w[key] * pr[s2]; seen[s2] += w[key]; }\n  });\n  for (i = 0; i < n; i++) out[i] = seen[i] > 0.5 ? out[i] / seen[i] : NaN;\n  var ok = 0; for (i = 0; i < n; i++) if (isFinite(out[i]) && S.trend[i][k] > 0) ok++;\n  if (ok >= 3) for (i = 0; i < n; i++) if (!(S.trend[i][k] > 0)) out[i] = NaN;\n  return out;\n}\nfunction smartInfo(P, E, h) {\n  var w = P._sw[h];\n  var parts = WC.filter(function (k) { return w[k] >= 0.005; }).sort(function (a, b) { return w[b] - w[a]; })\n    .map(function (k) { return WN[k] + ' ' + Math.round(w[k] * 100) + '%'; });\n  var pd = pairedDiff(E, 'smart', 'combo', E.kSplit, E.kLast), verdict;\n  if (pd.n < 24) verdict = 'Too few unseen months to compare it with plain Combined.';\n  else if (pd.t >= 2 && pd.mean > 0) verdict = 'On unseen months it beat plain Combined by more than luck would explain.';\n  else if (pd.t <= -2 && pd.mean < 0) verdict = 'On unseen months it did clearly worse than plain Combined.';\n  else verdict = 'On unseen months it made no clear difference to plain Combined (average gap ' + (isFinite(pd.mean) ? (pd.mean * 100).toFixed(2) + '%' : 'n/a') + ' a pick).';\n  return { text: parts.join(', '), verdict: verdict, diff: pd };\n}\n\n/* ---------- month-by-month replay ---------- */\nfunction replayRun(P, E, startKey, endKey, S) {\n  var kBuy = startKey - 1 - P.lo, kFrom = Math.max(kBuy, E.kFirst), clamped = kBuy < E.kFirst, rows = [], k, g;\n  if (kFrom > E.kLast) return { err: 'No finished months to test from that date. The latest month with a known result is ' + monthLabel(P, P.kSig) + ', so pick an earlier start. The picks table above is the open prediction.' };\n  for (k = kFrom; k <= E.kLast; k++) {\n    if (isFinite(endKey) && P.lo + k + 1 > endKey) break;\n    var best = null, bt = -Infinity;\n    var EL2 = elig(E);\n    for (g = 0; g < EL2.length; g++) {\n      var past = rowsIn(E, EL2[g].key, E.kFirst, k - E.h);\n      if (past.length >= 12) { var st = summarize(past, E.h); if (st.t > bt) { bt = st.t; best = EL2[g].key; } }\n    }\n    var key = (PK_FORCE && E.rows[PK_FORCE]) ? PK_FORCE : (best || defKey()), r = E.rows[key][k - E.kFirst];\n    if (!r) continue;\n    var sg = SIGS.filter(function (x) { return x.key === key; })[0];\n    rows.push({\n      k: k, label: monthLabel(P, k + 1) + (E.h > 1 ? ' to ' + monthLabel(P, k + E.h) : ''), year: Math.floor((P.lo + k + 1) / 12),\n      method: sg.short, early: !best && !PK_FORCE, picks: r.picks.map(function (s) { return P.syms[s]; }), det: r.picks.map(function (s) { return { sym: P.syms[s], r: fwd(P, s, k, E.h) }; }),\n      mon: (P.lo + k + 1) % 12, cash: !!r.cash, grp: confGroups(P, S, key, k, E.h, E.cost), ret: r.ret, bench: r.bench, ex: r.ex\n    });\n  }\n  var n = rows.length;\n  if (!n) return { err: 'No finished months fall between those two dates. Move the start earlier or the end later.' };\n  var comp = 1, compB = 1, by = {};\n  rows.forEach(function (r) {\n    comp *= 1 + r.ret; compB *= 1 + r.bench;\n    var y = by[r.year] || (by[r.year] = { year: r.year, n: 0, beats: 0, sum: 0 });\n    y.n++; if (r.ex > 0) y.beats++; y.sum += r.ex;\n  });\n  var sorted = rows.slice().sort(function (a, b) { return a.ex - b.ex; }), beats = rows.filter(function (r) { return r.ex > 0; }).length;\n  var gs = {};\n  ['High', 'Medium', 'Low'].forEach(function (L) {\n    var m = rows.filter(function (r) { return r.grp[L].n > 0; }), tn = 0, tr = 0, tb = 0, bt = 0;\n    m.forEach(function (r) { tn += r.grp[L].n; tr += r.grp[L].r; tb += r.bench; if (r.grp[L].r > r.bench) bt++; });\n    gs[L] = { months: m.length, avgN: m.length ? tn / m.length : 0, avg: m.length ? tr / m.length : NaN, bench: m.length ? tb / m.length : NaN, beats: bt };\n  });\n  var qe = 1, qb = 1, qp = 1, qbp = 1, qd = 0, qbd = 0;\n  rows.forEach(function (r) { qe *= 1 + r.ret; qb *= 1 + r.bench; qp = Math.max(qp, qe); qbp = Math.max(qbp, qb); qd = Math.min(qd, qe / qp - 1); qbd = Math.min(qbd, qb / qbp - 1); });\n  var cal = [], ci;\n  for (ci = 0; ci < 12; ci++) cal.push({ m: ci, n: 0, beats: 0, sum: 0 });\n  rows.forEach(function (r) { var c = cal[r.mon]; c.n++; if (r.ex > 0) c.beats++; c.sum += r.ex; });\n  return {\n    grp: gs,\n    cagr: E.h === 1 ? Math.pow(qe, 12 / n) - 1 : NaN, bcagr: E.h === 1 ? Math.pow(qb, 12 / n) - 1 : NaN, dd: qd, bdd: qbd,\n    ranked: sorted.slice().reverse(), cal: cal.filter(function (c) { return c.n > 0; }), up: rows.filter(function (r) { return r.ret > 0; }).length,\n    rows: rows, n: n, beats: beats, hit: beats / n, meanEx: mean(rows.map(function (r) { return r.ex; })), meanRet: mean(rows.map(function (r) { return r.ret; })),\n    comp: E.h === 1 ? comp - 1 : NaN, compB: E.h === 1 ? compB - 1 : NaN,\n    best: sorted.slice(-3).reverse(), worst: sorted.slice(0, 3),\n    years: Object.keys(by).sort().map(function (y) { return by[y]; }), clamped: clamped, firstLabel: rows[0].label\n  };\n}\n\n/* ---------- reports ---------- */\nfunction checksFor(unseen, all, p) {\n  var list = [];\n  list.push({ st: unseen.n >= 24 ? 'pass' : (unseen.n >= 12 ? 'warn' : 'fail'), title: 'Enough unseen months to judge', detail: unseen.n + ' unseen months. At least 24 is a safer base.' });\n  list.push({ st: unseen.meanEx > 0 ? 'pass' : 'fail', title: 'Beat the average of your list on unseen months', detail: 'Average extra return per pick: ' + (isFinite(unseen.meanEx) ? (unseen.meanEx * 100).toFixed(2) + '%' : 'n/a') + '. Strength on unseen months: ' + (isFinite(unseen.t) ? unseen.t.toFixed(2) : 'n/a') + '.' });\n  list.push({ st: unseen.hit >= 0.55 ? 'pass' : 'fail', title: 'Wins on at least 55% of unseen months', detail: isFinite(unseen.hit) ? Math.round(unseen.hit * 100) + '% of unseen months beat the list.' : 'Not enough months.' });\n  list.push({ st: all.t >= 1.65 ? 'pass' : 'fail', title: 'Strong enough over all months', detail: 'Strength score ' + (isFinite(all.t) ? all.t.toFixed(2) : 'n/a') + '. At least 1.65 is the usual bar.' });\n  list.push({ st: p <= 0.10 ? 'pass' : 'fail', title: 'Better than random picks', detail: isFinite(p) ? 'Random picks did as well in ' + Math.round(p * 100) + '% of 400 trials.' : 'Not enough months.' });\n  var passes = list.filter(function (c) { return c.st === 'pass'; }).length;\n  var uT = unseen.t;\n  var conf = (passes >= 4 && uT >= 1.65) ? 'High' : ((passes >= 3 && unseen.meanEx > 0 && uT >= 0.8) ? 'Medium' : 'Low');\n  return { list: list, passes: passes, conf: conf };\n}\nfunction stockInfo(P, S, s, k) {\n  var c = P.closes[s];\n  var since = P.partial && isFinite(c[P.K - 1]) ? c[P.K - 1] / c[k] - 1 : NaN;\n  var stale = P.lastDates[s] < P.last - 12 * 86400000;\n  return {\n    s: s, sym: P.syms[s], mom12: S.mom12[s][k], mom6: S.mom6[s][k], mom3: S.mom3[s][k], trend: S.trend[s][k],\n    price: isFinite(c[P.K - 1]) ? c[P.K - 1] : c[k], vol: -S.lowvol[s][k], r1: c[k] / c[k - 1] - 1, since: since, stale: stale,\n    candle: P.hasOHLC ? candleLabel(P, s, k) : ''\n  };\n}\nfunction currentPicks(P, S, key, count, h) {\n  var k = P.kSig, sc = key === 'smart' ? wScores(P, S, P._sw[h], k) : scoresAt(P, S, key, k);\n  var sx = sc.slice();\n  for (var q = 0; q < sx.length; q++) if (PK_EXCL[P.syms[q]]) sx[q] = NaN;\n  sc = sx;\n  var full = topIdx(sc, sc.length);\n  var sel = PK_MINCONF === 'any' ? full.slice(0, count) : selFilter(P, S, key, k, full.slice(0, count * 5 + 30), count);\n  return sel.map(function (s, i) { var o = stockInfo(P, S, s, k); o.rank = i + 1; o.origRank = full.indexOf(s) + 1; o.score = sc[s]; return o; });\n}\nfunction weakList(P, S, k) {\n  var n = P.syms.length, m6 = [], m3 = [], s;\n  for (s = 0; s < n; s++) { if (isFinite(S.mom6[s][k])) m6.push(S.mom6[s][k]); if (isFinite(S.mom3[s][k])) m3.push(S.mom3[s][k]); }\n  m6.sort(function (a, b) { return a - b; }); m3.sort(function (a, b) { return a - b; });\n  var q25 = m6.length ? m6[Math.floor((m6.length - 1) * 0.25)] : NaN, med3 = m3.length ? m3[Math.floor((m3.length - 1) / 2)] : NaN;\n  var out = [];\n  for (s = 0; s < n; s++) {\n    var info = stockInfo(P, S, s, k), flags = [], c = P.closes[s];\n    if (!isFinite(info.trend)) continue;\n    if (info.trend < 0) flags.push('Below its 10-month average');\n    if (info.mom12 < 0) flags.push('Down ' + Math.abs(info.mom12 * 100).toFixed(0) + '% over 12 months');\n    if (info.mom6 <= q25 && info.mom6 < 0) flags.push('One of the weakest 6-month runs in your list');\n    if (info.mom3 < 0 && info.mom3 - med3 < -0.08) flags.push('Lagging the list by ' + Math.abs((info.mom3 - med3) * 100).toFixed(0) + ' points over 3 months');\n    var hi = -Infinity; for (var j = k - 11; j <= k; j++) if (c[j] > hi) hi = c[j];\n    if (isFinite(hi) && c[k] / hi - 1 < -0.2) flags.push((Math.abs(c[k] / hi - 1) * 100).toFixed(0) + '% below its 12-month high');\n    if (isFinite(info.since) && info.since < -0.08) flags.push('Down ' + Math.abs(info.since * 100).toFixed(0) + '% since month-end');\n    info.flags = flags;\n    if (flags.length >= 3) out.push(info);\n  }\n  out.sort(function (a, b) { return (b.flags.length - a.flags.length) || (a.mom6 - b.mom6); });\n  return out.slice(0, 8);\n}\nfunction horizonReport(P, S, h, N, cost) {\n  var E = evalAll(P, S, h, N, cost);\n  var best = null, bt = -Infinity, g;\n  var EL3 = elig(E);\n  for (g = 0; g < EL3.length; g++) {\n    var tr = summarize(rowsIn(E, EL3[g].key, E.kFirst, E.kSplit - h), h);\n    if (tr.n >= 12 && tr.t > bt) { bt = tr.t; best = EL3[g].key; }\n  }\n  if (!best) best = defKey();\n  if (PK_FORCE && E.rows[PK_FORCE]) best = PK_FORCE;\n  var all = summarize(rowsIn(E, best, E.kFirst, E.kLast), h);\n  var unseen = summarize(rowsIn(E, best, E.kSplit, E.kLast), h);\n  var p = permP(P, h, N, cost, E.kFirst, E.kLast, all.meanEx, 7 + h, 400);\n  var chk = checksFor(unseen, all, p);\n  return { h: h, N: N, E: E, key: best, all: all, unseen: unseen, p: p, chk: chk };\n}\nfunction growthSeries(P, E, key) {\n  var eq = 100, bn = 100, pts = [[monthTime(P, E.kFirst), 100]], bpts = [[monthTime(P, E.kFirst), 100]];\n  for (var k = E.kFirst; k <= E.kLast; k += E.h) {\n    var r = E.rows[key][k - E.kFirst];\n    if (!r) continue;\n    eq *= 1 + r.ret; bn *= 1 + r.bench;\n    pts.push([monthTime(P, k + E.h), eq]); bpts.push([monthTime(P, k + E.h), bn]);\n  }\n  return { strat: pts, bench: bpts, split: monthTime(P, E.kSplit) };\n}\nvar GRID_N = [5, 10, 15, 20];\nvar SL_LEVELS = [0, 5, 10, 15, 20, 25, 30];\nfunction methodGrid(P, S, E, h, cost) {\n  var out = [], EL = E.sigs.filter(function (g) { return g.key !== 'smart' && (PK_MODE !== 'mom' || isMom(g.key)); });\n  EL.forEach(function (g) {\n    var row = { key: g.key, short: g.short, cells: {} };\n    GRID_N.forEach(function (N) {\n      if (N > P.syms.length) return;\n      var rs = [];\n      for (var k = E.kFirst; k <= E.kLast; k++) rs.push(monthRow(P, S, g.key, k, h, N, cost));\n      rs = rs.filter(Boolean);\n      var all = summarize(rs, h), uns = summarize(rs.filter(function (r) { return r.k >= E.kSplit; }), h);\n      row.cells[N] = { all: all, unseen: uns };\n    });\n    out.push(row);\n  });\n  return out;\n}\nfunction stopGrid(P, S, key, N, cost, startKey, endKey, rg, rgL, wts) {\n  var exits = [0, Math.ceil(N * 1.5), N * 2, Math.ceil(N * 2.5), N * 3].filter(function (x, i, a) { return a.indexOf(x) === i && (x === 0 || x < P.syms.length); });\n  var cells = [], best = null, bestC = null;\n  SL_LEVELS.forEach(function (sl) {\n    var row = { sl: sl, cells: [] };\n    exits.forEach(function (ex) {\n      var q = portSim(P, S, key, N, ex > 0 ? Math.max(ex, N + 1) : 0, cost, rg, rgL, startKey, endKey, sl, wts);\n      row.cells.push({ ex: ex, q: q });\n      if (!q.err) {\n        if (!best || q.cagr > best.q.cagr) best = { sl: sl, ex: ex, q: q };\n        if (isFinite(q.calmar) && (!bestC || q.calmar > bestC.q.calmar)) bestC = { sl: sl, ex: ex, q: q };\n      }\n    });\n    cells.push(row);\n  });\n  return { exits: exits, rows: cells, best: best, bestCalmar: bestC };\n}\nfunction weightGrid(P, S, key, N, cost, startKey, endKey) {\n  var out = [];\n  WSCHEMES.forEach(function (sc) {\n    if (sc[0] === 'custom' && PK_WM !== 'custom') return;\n    var w = weightsFor(sc[0], N);\n    if (sc[0] !== 'equal' && !w) return;\n    var q = portSim(P, S, key, N, PK_OPT.exit > 0 ? Math.max(PK_OPT.exit, N + 1) : 0, cost, PK_OPT.rg, PK_OPT.rgL, startKey, endKey, PK_OPT.sl, w);\n    out.push({ id: sc[0], name: sc[1], w: w, q: q });\n  });\n  return out;\n}\nfunction cmpPicks(P, S, key, N, h) {\n  if (!MIXK[key]) return null;\n  var sv = PK_FILTOV, on, off;\n  PK_FILTOV = 'full'; on = currentPicks(P, S, key, N, h).map(function (p) { return p.sym; });\n  PK_FILTOV = 'none'; off = currentPicks(P, S, key, N, h).map(function (p) { return p.sym; });\n  PK_FILTOV = sv;\n  return { on: on, off: off };\n}\nfunction medianOf(a) {\n  var v = a.filter(isFinite).sort(function (x, y) { return x - y; });\n  if (!v.length) return NaN;\n  var m = Math.floor(v.length / 2);\n  return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2;\n}\nfunction winStats(rows, a, L) {\n  var eq = 1, be = 1, pk = 1, bpk = 1, dd = 0, bdd = 0, wins = 0, ex = 0, i, r;\n  for (i = a; i < a + L; i++) {\n    r = rows[i]; eq *= 1 + r.ret; be *= 1 + r.bench; pk = Math.max(pk, eq); bpk = Math.max(bpk, be);\n    dd = Math.min(dd, eq / pk - 1); bdd = Math.min(bdd, be / bpk - 1);\n    if (r.ret > r.bench) wins++; ex += r.ret - r.bench;\n  }\n  var cagr = Math.pow(eq, 12 / L) - 1;\n  return { a: a, L: L, k0: rows[a].k, k1: rows[a + L - 1].k, cagr: cagr, bcagr: Math.pow(be, 12 / L) - 1, dd: dd, bdd: bdd, win: wins / L, ex: ex / L, calmar: dd < 0 ? cagr / Math.abs(dd) : NaN };\n}\nfunction scanAgg(rows, L) {\n  var W = [], a, n = rows.length;\n  for (a = 0; a + L <= n; a++) W.push(winStats(rows, a, L));\n  if (!W.length) return null;\n  var best = function (f) { var b = W[0]; W.forEach(function (w) { if (f(w) > f(b)) b = w; }); return b; };\n  var rk = function (f) { var idx = W.map(function (w, i) { return i; }).sort(function (x, y) { return f(W[y]) - f(W[x]); }), o = new Array(W.length); idx.forEach(function (i, r) { o[i] = r; }); return o; };\n  var r1 = rk(function (w) { return w.cagr; }), r2 = rk(function (w) { return w.win; }), r3 = rk(function (w) { return w.dd; }), r4 = rk(function (w) { return w.ex; }), bo = 0, bs = Infinity;\n  W.forEach(function (w, i) { var sc = r1[i] + r2[i] + r3[i] + r4[i]; if (sc < bs) { bs = sc; bo = i; } });\n  return {\n    n: W.length,\n    beat: W.filter(function (w) { return w.cagr > w.bcagr; }).length / W.length,\n    medCagr: medianOf(W.map(function (w) { return w.cagr; })), medB: medianOf(W.map(function (w) { return w.bcagr; })),\n    medDD: medianOf(W.map(function (w) { return w.dd; })), medBDD: medianOf(W.map(function (w) { return w.bdd; })),\n    medWin: medianOf(W.map(function (w) { return w.win; })), medEx: medianOf(W.map(function (w) { return w.ex; })),\n    medCalmar: medianOf(W.map(function (w) { return w.calmar; })),\n    best: { cagr: best(function (w) { return w.cagr; }), win: best(function (w) { return w.win + w.cagr * 1e-6; }), fall: best(function (w) { return w.dd + w.cagr * 1e-6; }), ex: best(function (w) { return w.ex; }), all: W[bo] }\n  };\n}\nfunction autoScan(P, S, key, N, cost, sA, sB, L) {\n  if (!isFinite(sA) || !isFinite(sB) || sB <= sA) return { err: 'Set a scan start date that is before the scan end date.' };\n  var states = MIXK[key] ? [['on', 'Filter ON', 'full'], ['off', 'Filter OFF', 'none']] : [['one', 'No filter for this method', '']];\n  var ex = PK_OPT.exit > 0 ? Math.max(PK_OPT.exit, N + 1) : 0, sv = PK_FILTOV, out = { L: L, N: N, states: [], byLen: [], key: key }, i, st;\n  var lens = [12, 24, 36, 48, 60];\n  var runState = function (ov, wts) { PK_FILTOV = ov; var q = portSim(P, S, key, N, ex, cost, PK_OPT.rg, PK_OPT.rgL, sA, sB, PK_OPT.sl, wts); PK_FILTOV = sv; return q; };\n  var sims = {};\n  for (i = 0; i < states.length; i++) {\n    st = states[i];\n    var q = runState(st[2], weightsFor(PK_WM, N));\n    if (q.err) return { err: q.err };\n    sims[st[0]] = q;\n    var agg = scanAgg(q.rows, L);\n    if (!agg) return { err: 'The scan range has only ' + q.rows.length + ' months of results, which is shorter than the ' + L + '-month holding length. Move the scan start earlier or choose a shorter holding length.' };\n    out.states.push({ id: st[0], label: st[1], agg: agg, months: q.rows.length, first: P.lo + q.rows[0].k, last: P.lo + q.rows[q.rows.length - 1].k + 1 });\n  }\n  lens.forEach(function (l) {\n    var row = { L: l, st: {} };\n    states.forEach(function (s2) { var g = scanAgg(sims[s2[0]].rows, l); if (g) row.st[s2[0]] = { n: g.n, beat: g.beat, medCagr: g.medCagr, medB: g.medB, medDD: g.medDD }; });\n    if (Object.keys(row.st).length) out.byLen.push(row);\n  });\n  if (out.states.length === 2) {\n    var A = out.states[0].agg, B = out.states[1].agg, v = [\n      ['Windows that beat the list', A.beat, B.beat],\n      ['Median yearly growth', A.medCagr, B.medCagr],\n      ['Median worst fall', A.medDD, B.medDD],\n      ['Median months beating the list', A.medWin, B.medWin],\n      ['Median extra a month', A.medEx, B.medEx]\n    ], von = 0, voff = 0;\n    v.forEach(function (x) { if (x[1] > x[2] + 1e-9) von++; else if (x[2] > x[1] + 1e-9) voff++; });\n    out.votes = { on: von, off: voff, total: v.length };\n    out.winner = von > voff ? 'on' : (voff > von ? 'off' : 'tie');\n  } else out.winner = out.states[0].id;\n  var use = out.winner === 'tie' ? 'off' : out.winner, useSt = out.states.filter(function (x) { return x.id === use; })[0] || out.states[0], ovUse = (states.filter(function (x) { return x[0] === useSt.id; })[0] || states[0])[2];\n  out.useId = useSt.id; out.useLabel = useSt.label;\n  out.schemes = [];\n  [['equal', 'Equal'], ['linear', 'Steady slope'], ['sqrt', 'Gentle tilt'], ['harm', 'Strong tilt (1/rank)'], ['heavy', 'Heavy top ranks']].forEach(function (sc) {\n    var w = weightsFor(sc[0], N), q2 = runState(ovUse, w);\n    if (q2.err) return;\n    var g = scanAgg(q2.rows, L);\n    if (!g) return;\n    out.schemes.push({ id: sc[0], name: sc[1], w: w || new Array(N).fill(1 / N), medCalmar: g.medCalmar, medCagr: g.medCagr, medDD: g.medDD, fullCagr: q2.cagr, fullDD: q2.dd });\n  });\n  var bs2 = null;\n  out.schemes.forEach(function (x) { if (isFinite(x.medCalmar) && (!bs2 || x.medCalmar > bs2.medCalmar)) bs2 = x; });\n  out.bestScheme = bs2 ? bs2.id : 'equal';\n  out.picks = cmpPicks(P, S, key, N, 1);\n  return out;\n}\nfunction rebalanceLog(P, S, key, N, startKey, endKey) {\n  var kk = key === 'smart' ? 'combo' : key, n = P.syms.length, ex = PK_OPT.exit > 0 ? Math.max(PK_OPT.exit, N + 1) : 0;\n  var kf = 12; while (kf < P.kSig && breadthAt(P, S, kf) < minBreadth(P)) kf++;\n  var kFrom = Math.max(isFinite(startKey) ? startKey - 1 - P.lo : kf, kf), kLast = isFinite(endKey) ? Math.min(P.kSig, endKey - P.lo - 1) : P.kSig;\n  var held = [], rows = [], k, i, buys = 0, mo = 0;\n  for (k = kFrom; k <= kLast; k++) {\n    var order = topIdx(scoresAt(P, S, kk, k), n), rankOf = {};\n    if (PK_MINCONF !== 'any') order = selFilter(P, S, kk, k, order.slice(0, Math.max(ex, N) * 3 + 20), Infinity);\n    for (i = 0; i < order.length; i++) rankOf[order[i]] = i + 1;\n    var tgt = ex > 0 ? held.filter(function (x) { return rankOf[x] && rankOf[x] <= ex; }).slice(0, N) : [];\n    for (i = 0; i < order.length && tgt.length < N; i++) if (tgt.indexOf(order[i]) < 0) tgt.push(order[i]);\n    tgt.sort(function (x, y) { return (rankOf[x] || 1e9) - (rankOf[y] || 1e9); });\n    var nm = function (x) { return P.syms[x]; };\n    var buy = tgt.filter(function (x) { return held.indexOf(x) < 0; }), sell = held.filter(function (x) { return tgt.indexOf(x) < 0; }), keep = tgt.filter(function (x) { return held.indexOf(x) >= 0; });\n    var rs = [];\n    if (k < P.kSig) tgt.forEach(function (x) { var f = fwd(P, x, k, 1); if (isFinite(f)) rs.push(f); });\n    rows.push({ k: k, label: monthLabel(P, k), now: k === P.kSig, picks: tgt.map(nm), buy: buy.map(nm), sell: sell.map(nm), keep: keep.map(nm), ret: rs.length ? rs.reduce(function (a, b) { return a + b; }, 0) / rs.length : NaN, cash: !tgt.length });\n    if (rows.length > 1) { buys += buy.length; mo++; }\n    held = tgt;\n  }\n  return { rows: rows, N: N, avgBuy: mo ? buys / mo : NaN };\n}\nfunction planRun(P, S, key, N, cost, startKey, endKey) {\n  var ex = PK_OPT.exit > 0 ? Math.max(PK_OPT.exit, N + 1) : 0;\n  var q = portSim(P, S, key, N, ex, cost, PK_OPT.rg, PK_OPT.rgL, startKey, endKey, PK_OPT.sl, weightsFor(PK_WM, N));\n  if (q.err) return { err: q.err };\n  var yrs = {}, wins = 0;\n  q.rows.forEach(function (r) {\n    var y = Math.floor((P.lo + r.k + 1) / 12), o = yrs[y] || (yrs[y] = { y: y, eq: 1, be: 1, n: 0 });\n    o.eq *= 1 + r.ret; o.be *= 1 + r.bench; o.n++;\n    if (r.ret > r.bench) wins++;\n  });\n  var years = Object.keys(yrs).sort().map(function (y) { var o = yrs[y]; return { y: o.y, ret: o.eq - 1, bench: o.be - 1, n: o.n }; });\n  return { q: q, years: years, wins: wins, n: q.rows.length, startAbs: P.lo + q.rows[0].k + 1, startLabel: monthLabel(P, q.rows[0].k + 1), endLabel: monthLabel(P, q.rows[q.rows.length - 1].k + 1), perMonthTrades: q.trades / q.rows.length };\n}\nvar FCOMPS = ['m12', 'm6', 'm3', 'm1', 'v12', 'v6', 'v3', 'lv'];\nfunction genCands() {\n  var out = [], seen = {}, i, j, k;\n  var add = function (o) {\n    var w = { m12: 0, m6: 0, m3: 0, m1: 0, lv: 0, v12: 0, v6: 0, v3: 0 };\n    Object.keys(o).forEach(function (x) { w[x] = o[x]; });\n    var sig = FCOMPS.map(function (c) { return w[c]; }).join(',');\n    if (!seen[sig]) { seen[sig] = 1; out.push(w); }\n  };\n  for (i = 0; i < FCOMPS.length; i++) [100, -100].forEach(function (sg) { var o = {}; o[FCOMPS[i]] = sg; add(o); });\n  for (i = 0; i < FCOMPS.length; i++) for (j = i + 1; j < FCOMPS.length; j++) [[100, 100], [100, -100], [-100, 100], [-100, -100]].forEach(function (p) { var o = {}; o[FCOMPS[i]] = p[0]; o[FCOMPS[j]] = p[1]; add(o); });\n  var five = ['m12', 'm6', 'm3', 'm1', 'lv'];\n  for (i = 0; i < 5; i++) for (j = i + 1; j < 5; j++) for (k = j + 1; k < 5; k++)\n    for (var m = 0; m < 8; m++) { var o = {}; o[five[i]] = (m & 1) ? -100 : 100; o[five[j]] = (m & 2) ? -100 : 100; o[five[k]] = (m & 4) ? -100 : 100; add(o); }\n  [30, 60].forEach(function (a) { [-100, -50].forEach(function (b) { [0, 40].forEach(function (c) { add({ m12: a, m1: b, lv: c }); }); }); });\n  return out;\n}\nfunction stratName(w) {\n  var nm = [['m12', '12m'], ['m6', '6m'], ['m3', '3m'], ['m1', '1m'], ['v12', '12m per risk'], ['v6', '6m per risk'], ['v3', '3m per risk'], ['lv', 'calm']];\n  var parts = nm.filter(function (x) { return w[x[0]]; }).map(function (x) { return x[1] + ' ' + (w[x[0]] > 0 ? '+' : '−') + Math.abs(w[x[0]]); });\n  return parts.join(' · ') || 'none';\n}\nfunction dropCustom(P) {\n  ['_sc', '_ord', '_rkc'].forEach(function (c) { var o = P[c]; if (!o) return; Object.keys(o).forEach(function (k) { if (k.indexOf('custom|') === 0) delete o[k]; }); });\n}\nfunction findStrategy(P, S, N, cost, sA, sB, goal) {\n  if (!isFinite(sA) || !isFinite(sB) || sB <= sA) return { err: 'Set a finder start date before the finder end date.' };\n  var ex = PK_OPT.exit > 0 ? Math.max(PK_OPT.exit, N + 1) : 0, wts = weightsFor(PK_WM, N), saveW = PK_W, saveF = PK_FILTOV, cands = genCands(), res = [], tested = 0;\n  PK_FILTOV = '';\n  try {\n    for (var ci = 0; ci < cands.length; ci++) {\n      for (var f = 0; f < 2; f++) {\n        PK_W = Object.assign({}, cands[ci], { filt: f });\n        var q = portSim(P, S, 'custom', N, ex, cost, PK_OPT.rg, PK_OPT.rgL, sA, sB, PK_OPT.sl, wts);\n        dropCustom(P);\n        if (q.err) { if (!tested && ci > 5) return { err: q.err }; continue; }\n        tested++;\n        var wins = 0; q.rows.forEach(function (r) { if (r.ret > r.bench) wins++; });\n        res.push({ w: cands[ci], filt: f, name: stratName(cands[ci]), cagr: q.cagr, bcagr: q.bcagr, dd: q.dd, bdd: q.bdd, win: wins / q.rows.length, n: q.rows.length, calmar: q.calmar, ok: q.cagr > q.bcagr && q.dd > q.bdd });\n      }\n    }\n  } finally { PK_W = saveW; PK_FILTOV = saveF; }\n  if (!res.length) return { err: 'The finder range has too few months of results. Choose a longer period or an earlier start.' };\n  var score = function (r) { return goal === 'calmar' ? (isFinite(r.calmar) ? r.calmar : -1e9) : (goal === 'fall' ? r.dd : r.cagr); };\n  var okList = res.filter(function (r) { return r.ok; }).sort(function (a, b) { return score(b) - score(a); });\n  var all = res.slice().sort(function (a, b) { return score(b) - score(a); });\n  var top = (okList.length ? okList : all).slice(0, 10);\n  top.forEach(function (r) {\n    PK_W = Object.assign({}, r.w, { filt: r.filt });\n    var q2 = portSim(P, S, 'custom', N, ex, cost, PK_OPT.rg, PK_OPT.rgL, sB, NaN, PK_OPT.sl, wts);\n    dropCustom(P);\n    if (!q2.err) r.after = { cagr: q2.cagr, bcagr: q2.bcagr, dd: q2.dd, bdd: q2.bdd, n: q2.n };\n  });\n  var grid = null;\n  if (top.length) {\n    PK_W = Object.assign({}, top[0].w, { filt: top[0].filt });\n    grid = { name: top[0].name, filt: top[0].filt, g: stopGrid(P, S, 'custom', N, cost, sA, sB, PK_OPT.rg, PK_OPT.rgL, wts) };\n    dropCustom(P);\n  }\n  PK_W = saveW;\n  var cnt = function (f) { var a = res.filter(function (r) { return r.filt === f; }); return { n: a.length, ok: a.filter(function (r) { return r.ok; }).length }; };\n  var bestOf = function (f) { var a = okList.filter(function (r) { return r.filt === f; }); return a[0] || null; };\n  return { grid: grid, top: top, haveOk: okList.length > 0, tested: tested, goal: goal, off: cnt(0), on: cnt(1), bestOff: bestOf(0), bestOn: bestOf(1), sA: sA, sB: sB, months: all[0].n, list: { cagr: all[0].bcagr, dd: all[0].bdd } };\n}\nfunction analyse(stocks, h, N, cost, startKey, endKey) {\n  var P;\n  if (PK_CACHE.stocks === stocks && PK_CACHE.ver === PK_VER && PK_CACHE.P) P = PK_CACHE.P;\n  else { P = buildPanel(stocks); PK_CACHE = { stocks: stocks, ver: PK_VER, P: P, S: null }; }\n  if (!P) return { err: 'No stocks loaded yet.' };\n  if (P.syms.length < 6) return { err: 'Add at least 6 stocks. Ranking needs a list to pick from.' };\n  if (P.kSig < 30) return { err: 'Need at least 30 months of prices. Your files cover ' + (P.kSig + 1) + ' complete months.' };\n  var S = PK_CACHE.P === P && PK_CACHE.S ? PK_CACHE.S : computeSignals(P);\n  if (PK_CACHE.P === P) PK_CACHE.S = S;\n  var kf = 12;\n  while (kf <= P.kSig - 3 && breadthAt(P, S, kf) < minBreadth(P)) kf++;\n  if (P.kSig - 3 - kf < 24) return { err: 'Not enough history where at least half of your stocks have prices. Add stocks with longer history, or remove very new ones.' };\n  var hz = {};\n  [1, 2, 3].forEach(function (x) { hz[x] = horizonReport(P, S, x, N, cost); });\n  var main = hz[h];\n  var E = main.E;\n  var table = sigsFor(P).filter(function (g) { return PK_MODE !== 'mom' || isMom(g.key); }).map(function (g) {\n    return {\n      key: g.key, name: g.name, short: g.short, about: g.about,\n      all: summarize(rowsIn(E, g.key, E.kFirst, E.kLast), h),\n      train: summarize(rowsIn(E, g.key, E.kFirst, E.kSplit - h), h),\n      unseen: summarize(rowsIn(E, g.key, E.kSplit, E.kLast), h)\n    };\n  });\n  var candles = null;\n  if (P.hasOHLC && PK_MODE !== 'mom') {\n    var rowOf = function (key) { return table.filter(function (r) { return r.key === key; })[0]; };\n    var b = rowOf('combo'), c2 = rowOf('combo_c'), verdict;\n    var pd = pairedDiff(main.E, 'combo_c', 'combo', main.E.kSplit, main.E.kLast);\n    if (pd.n < 24) verdict = 'Too few unseen months to say.';\n    else if (pd.t >= 2 && pd.mean > 0) verdict = 'Adding candles improved the unseen months by more than luck would explain.';\n    else if (pd.t <= -2 && pd.mean < 0) verdict = 'Adding candles made the unseen months clearly worse.';\n    else verdict = 'Adding candles made no clear difference. Any gap is within what luck produces.';\n    candles = { base: b, plus: c2, diff: pd, verdict: verdict, patterns: patternStudy(P) };\n  }\n  var showN = Math.min(20, Math.max(N, 20)), picks = currentPicks(P, S, main.key, showN, h);\n  picks.forEach(function (p) { p.conf = stockConf(P, S, main.key, p.s, P.kSig, p.origRank || p.rank); });\n  var log = [];\n  for (var k = Math.max(E.kFirst, E.kLast - 11); k <= E.kLast; k++) {\n    var r = E.rows[main.key][k - E.kFirst];\n    if (r) log.push({ label: monthLabel(P, k), picks: r.picks.map(function (s) { return P.syms[s]; }), ret: r.ret, bench: r.bench, ex: r.ex });\n  }\n  var horizons = [1, 2, 3].map(function (x) {\n    var rep = hz[x];\n    return {\n      h: x, key: rep.key, name: SIGS.filter(function (g) { return g.key === rep.key; })[0].name,\n      conf: rep.chk.conf, unseen: rep.unseen, all: rep.all,\n      picks: currentPicks(P, S, rep.key, 3, x)\n    };\n  });\n  return {\n    P: P, h: h, N: N, cost: cost, main: main, table: table, candles: candles, picks: picks, log: log, horizons: horizons,\n    replay: (isFinite(startKey) ? replayRun(P, E, startKey, endKey, S) : null), smart: PK_MODE === 'mom' ? null : smartInfo(P, E, h), adaptive: adaptiveStats(E), weak: weakList(P, S, P.kSig),\n    growth: growthSeries(P, E, main.key),\n    cands: (function () { var c = currentPicks(P, S, main.key, Math.min(20, Math.max(N, 10)), h); c.forEach(function (p) { p.conf = stockConf(P, S, main.key, p.s, P.kSig, p.origRank || p.rank); }); return c; })(),\n    sim: (PK_OPT.exit > 0 || PK_OPT.rg !== 'none' || PK_OPT.sl > 0 || PK_WM !== 'equal') ? portSim(P, S, main.key, N, PK_OPT.exit > 0 ? Math.max(PK_OPT.exit, N + 1) : 0, cost, PK_OPT.rg, PK_OPT.rgL, startKey, endKey, PK_OPT.sl, weightsFor(PK_WM, N)) : null,\n    cmp: cmpPicks(P, S, main.key, N, h),\n    plan: planRun(P, S, main.key, N, cost, startKey, endKey),\n    find: PK_OPT.find ? findStrategy(P, S, N, cost, PK_OPT.find.a, PK_OPT.find.b, PK_OPT.find.goal) : null,\n    changes: rebalanceLog(P, S, main.key, N, startKey, endKey),\n    scan: PK_OPT.scan ? autoScan(P, S, main.key, N, cost, PK_OPT.scan.a, PK_OPT.scan.b, PK_OPT.scan.L) : null,\n    wgrid: (PK_OPT.explore || PK_WM !== 'equal') ? weightGrid(P, S, main.key, N, cost, startKey, endKey) : null,\n    mgrid: PK_OPT.explore ? methodGrid(P, S, E, h, cost) : null,\n    sgrid: PK_OPT.explore ? stopGrid(P, S, main.key, N, cost, startKey, endKey, PK_OPT.rg, PK_OPT.rgL) : null,\n    asOf: monthLabel(P, P.kSig), nStocks: P.syms.length, months: P.kSig + 1, S: S\n  };\n}\n\n/* ---------- reading files ---------- */\nfunction splitCSVLine(l, delim) { return l.split(delim).map(function (s) { return s.trim().replace(/^\"|\"$/g, ''); }); }\nfunction normHeader(x) { return x.toLowerCase().replace(/[^a-z. ]/g, '').trim(); }\nfunction parseMulti(text, fileName) {\n  var lines = String(text).split(/\\r?\\n/).map(function (l) { return l.trim(); }).filter(Boolean);\n  if (lines.length < 3) throw new Error('That file has too few rows.');\n  var l0 = lines[0];\n  var delim = l0.indexOf('\\t') >= 0 ? '\\t' : (l0.split(';').length > l0.split(',').length ? ';' : ',');\n  var head = splitCSVLine(l0, delim).map(normHeader);\n  var di = head.findIndex(function (x) { return x.indexOf('date') >= 0; });\n  var symI = head.findIndex(function (x) { return /^(symbol|ticker|name|stock|scrip|company|instrument|security)/.test(x); });\n  var closeNames = ['adj close', 'adj. close', 'close', 'close price', 'closing price', 'price', 'nav', 'last'];\n  var ci = -1;\n  for (var q = 0; q < closeNames.length && ci < 0; q++) ci = head.findIndex(function (x, i) { return i !== di && x === closeNames[q]; });\n  var out = [], i, p;\n  if (di >= 0 && symI >= 0 && ci >= 0) {\n    var by = {};\n    for (i = 1; i < lines.length; i++) {\n      p = splitCSVLine(lines[i], delim);\n      var t = parseDate(p[di]), c = parseNum(p[ci]), sy = (p[symI] || '').trim();\n      if (!sy || isNaN(t) || !isFinite(c) || c <= 0) continue;\n      (by[sy] || (by[sy] = { t: [], c: [] })).t.push(t); by[sy].c.push(c);\n    }\n    Object.keys(by).forEach(function (sy) { out.push({ sym: sy, t: by[sy].t, c: by[sy].c }); });\n  } else if (di >= 0 && ci < 0 && head.length >= 3) {\n    var cols = head.map(function () { return { t: [], c: [] }; });\n    for (i = 1; i < lines.length; i++) {\n      p = splitCSVLine(lines[i], delim);\n      var td = parseDate(p[di]);\n      if (isNaN(td)) continue;\n      for (var j = 0; j < head.length; j++) {\n        if (j === di) continue;\n        var v = parseNum(p[j]);\n        if (isFinite(v) && v > 0) { cols[j].t.push(td); cols[j].c.push(v); }\n      }\n    }\n    var orig = splitCSVLine(l0, delim);\n    for (var j2 = 0; j2 < head.length; j2++) if (j2 !== di && cols[j2].t.length) out.push({ sym: orig[j2], t: cols[j2].t, c: cols[j2].c });\n  } else {\n    var D = parseData(text, fileName, 2);\n    out.push({ sym: fileName, t: D.t, c: D.c, o: D.o, h: D.h, l: D.l });\n  }\n  if (!out.length) throw new Error('Could not find a Date column and prices in that file.');\n  return out;\n}\nfunction cleanSymbol(name) {\n  return String(name).replace(/\\.[^.]+$/, '').replace(/[\\s_-]*(historical|history|data|prices?)$/i, '').trim().toUpperCase().slice(0, 24);\n}\n\n/* ---------- example list (made up) ---------- */\nfunction demoUniverse(count) {\n  var names = ['ALFA', 'BRAVO', 'CEDAR', 'DELTA', 'EMBER', 'FALCON', 'GRANITE', 'HARBOR', 'IRIS', 'JASPER', 'KESTREL', 'LOTUS', 'MARBLE', 'NOVA', 'ORCHID', 'PRISM', 'QUARTZ', 'RIVER', 'SABLE', 'TUNDRA', 'UMBER', 'VERTEX', 'WILLOW', 'ZENITH'];\n  var r = pkRng(424242), stocks = {};\n  var nM = 12 * 14 + 10; // Jan 2012 .. Oct 2026\n  var mkt = [], i, k;\n  for (k = 0; k < nM; k++) mkt.push(0.008 + 0.04 * pkGauss(r));\n  var list = names.slice();\n  for (var z = names.length; z < (count || 0); z++) list.push('S' + z);\n  list.forEach(function (nm, idx) {\n    var alpha = (0.0 + 0.1 * r()) / 12, beta = 0.7 + 0.8 * r(), idio = 0.05 + 0.04 * r(), phi = 0.06 * r(), price = 100 + 400 * r(), prev = 0, map = {}, prevClose = price;\n    for (k = 0; k < nM; k++) {\n      var ret = alpha + beta * mkt[k] + idio * pkGauss(r) + phi * prev;\n      if (ret < -0.6) ret = -0.6;\n      prev = ret; price *= 1 + ret;\n      var y = 2012 + Math.floor(k / 12), m = k % 12;\n      var d = Date.UTC(y, m + 1, 0);\n      while (new Date(d).getUTCDay() === 0 || new Date(d).getUTCDay() === 6) d -= 86400000;\n      if (k === nM - 1) d = Date.UTC(2026, 9, 8);\n      var cl = Math.round(price * 100) / 100, op = Math.round(prevClose * (1 + 0.01 * pkGauss(r)) * 100) / 100;\n      var hi = Math.round(Math.max(op, cl) * (1 + Math.abs(0.02 * pkGauss(r))) * 100) / 100, lw = Math.round(Math.min(op, cl) * (1 - Math.abs(0.02 * pkGauss(r))) * 100) / 100;\n      prevClose = cl;\n      map[y * 12 + m] = [cl, d, op, hi, lw];\n    }\n    stocks[nm] = { m: map };\n  });\n  return stocks;\n}\n\nif (typeof module !== 'undefined') {\n  module.exports = { patternStudy: patternStudy, candleAt: candleAt, analyse: analyse, buildPanel: buildPanel, computeSignals: computeSignals, demoUniverse: demoUniverse, toMonthMap: toMonthMap, mergeInto: mergeInto, parseMulti: parseMulti, SIGS: SIGS, horizonReport: horizonReport, currentPicks: currentPicks, weakList: weakList };\n}\n\n</script>\n<script>\n/* ===== App: UI, guides, charts ===== */\nvar $ = function (s) { return document.querySelector(s); };\nvar $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };\nfunction esc(s) { return String(s).replace(/[&<>\"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;' }[c]; }); }\nfunction inr(n) { return isFinite(n) ? '₹' + Math.round(n).toLocaleString('en-IN') : '–'; }\nfunction inrC(n) {\n  if (!isFinite(n)) return '–';\n  var a = Math.abs(n), s = n < 0 ? '-' : '';\n  if (a >= 1e7) return s + '₹' + (a / 1e7).toFixed(2) + ' Cr';\n  if (a >= 1e5) return s + '₹' + (a / 1e5).toFixed(2) + ' L';\n  if (a >= 1e3) return s + '₹' + (a / 1e3).toFixed(1) + 'K';\n  return s + '₹' + Math.round(a);\n}\nfunction pc(x, d, sign) {\n  if (d === undefined) d = 1;\n  if (x === Infinity) return '∞';\n  if (!isFinite(x)) return '–';\n  return (sign && x > 0 ? '+' : '') + (x * 100).toFixed(d) + '%';\n}\nfunction num(x, d) { return x === Infinity ? '∞' : (isFinite(x) ? x.toFixed(d === undefined ? 2 : d) : '–'); }\nvar MONN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];\nfunction fd(t) { var d = new Date(t); return d.getUTCDate() + ' ' + MONN[d.getUTCMonth()] + ' ' + String(d.getUTCFullYear()).slice(2); }\nfunction fdl(t) { var d = new Date(t); return d.getUTCDate() + ' ' + MONN[d.getUTCMonth()] + ' ' + d.getUTCFullYear(); }\nfunction tone(x) { return !isFinite(x) ? '' : (x > 0 ? 'good' : (x < 0 ? 'bad' : '')); }\n\n/* ---------- guides ---------- */\nvar HELP = {\n  'data.how': 'The tool needs daily closing prices, and it cannot fetch them by itself. For real results, get free history for an index or ETF (Nifty 50, Sensex, NIFTYBEES) from the links below. On Yahoo Finance, set the period to Max and frequency to Daily. If the Download button is locked, select the table, copy it, tap Paste data here and load it. NSE Indices gives a free download for Nifty indices. TradingView only exports chart data on paid plans, as far as I know. Any file with a Date column and a Close column works.',\n  'data.example': 'The example prices are made up by a computer. They look like an Indian index, with calm years and one sharp crash, but they are not real. Do not use them to judge a real strategy.',\n  'data.range': 'Pick which part of the data to test. Leave it on the full range for the longest and fairest test.',\n\n  'sip.how': 'A SIP puts in the same amount every month. This replays that on your price history. Dip-boost puts in extra when the market is down. Lump sum puts all the money in on day one, for comparison. Then the test repeats the SIP from every possible start month, to show how often it worked.',\n  'sip.amount': 'How much you invest each month, in rupees.',\n  'sip.years': 'How long each SIP runs in the \"every start month\" test. Five years or more is a fair test for shares.',\n  'sip.dipPct': 'A dip means the price is this many percent below its highest price of the last year. In a dip month, the dip-boost SIP invests extra.',\n  'sip.dipMult': 'In a dip month, invest this many times your normal amount. 2 means double.',\n  'sip.hurdle': 'The yearly return you want to beat. 7 is close to what a fixed deposit pays. A SIP that cannot beat it was not worth the risk.',\n  'sip.invested': 'Total money you put in over the whole test.',\n  'sip.final': 'What all your units would be worth on the last day.',\n  'sip.gain': 'Value now minus money put in, shown as a percent of the money put in.',\n  'sip.xirr': 'Your true yearly return. It allows for money going in at different times. Higher is better. This is the standard way to judge a SIP.',\n  'sip.dd': 'The worst moment, when your total value sat furthest below the money you had put in. It shows how much a SIP can hurt on paper before it recovers.',\n  'sip.cmp': 'Compares the three ways of investing the same plan. Dip-boost puts in more money in total, so compare the yearly return, not the rupee gain. Lump sum puts everything in on day one, which needs the full amount ready.',\n  'sip.roll': 'Every month in your data is tried as a start month. Each one runs a full SIP for the years you picked. Profitable windows is the SIP success rate. Windows overlap, so treat the results as a guide and not as proof.',\n  'sip.win': 'Out of all start months, the share where you ended with more money than you put in. This is the SIP success rate.',\n  'sip.beat': 'The share of start months where the yearly return was higher than your target.',\n  'sip.median': 'The middle result across all start months. Half did better and half did worse.',\n  'sip.worst': 'The weakest start month. This is the bad-luck case.',\n  'sip.chart': 'The blue line is what your SIP is worth. The dashed line is the money you put in. When blue is above dashed you are in profit.',\n\n  'swp.how': 'An SWP takes out a fixed amount every month. The danger is a market fall early on, because you sell units while prices are low. This page tests two ways: your real history from every start month, and 1,000 made-up futures built by shuffling real years of returns.',\n  'swp.corpus': 'The money you start with, in rupees.',\n  'swp.w': 'Rupees you take out each month at the start.',\n  'swp.step': 'Each year your withdrawal goes up by this percent to keep up with rising prices. 5 is a common choice.',\n  'swp.eq': 'Share of the money kept in shares or equity funds. The rest earns the safe return below. The mix is kept steady each month.',\n  'swp.debt': 'Yearly return of the safe part, such as a debt fund or FD. 6.5 is a fair guess.',\n  'swp.years': 'How many years the money has to last.',\n  'swp.rate': 'Your first-year withdrawal as a percent of the starting money. Around 4 percent or less has usually lasted a long time. Above 6 percent is risky.',\n  'swp.hist': 'In how many real start months the money lasted the full time. Windows overlap, so this is a rough guide.',\n  'swp.mc': 'Share of the 1,000 made-up futures where the money lasted. Aim for 90 percent or more.',\n  'swp.med': 'The middle ending value across the made-up futures.',\n  'swp.bad': 'The 10th percentile. Nine out of ten futures ended with at least this much.',\n  'swp.safe': 'The highest monthly withdrawal that still lasted in 90 percent of the made-up futures, with your other settings kept the same.',\n  'swp.chart': 'Each line shows the money left after each year. The middle line is a typical future. The top line is a good future and the bottom line is a bad one. If the bottom line reaches zero, the money ran out.',\n\n  'tr.how': 'A trading strategy is a fixed set of buy and sell rules. This replays the rules on your price history and counts every trade. Success is not only the win rate. The wins must be big enough, or frequent enough, to beat the losses. The last 30 percent of the data is held back, to check the rules still work on prices they were not tuned on.',\n  'tr.strategy': 'Dip buying (RSI-2) buys a sharp short drop while the market is in a long uptrend, and sells on a bounce. It wins often with small gains. Trend following holds while the 50-day average is above the 200-day average. It wins less often but rides big moves. Breakout buys a new high and sells a fall below a recent low.',\n  'tr.rsiIn': 'Buy when the 2-day RSI falls below this number. Lower means fewer but deeper dips. 10 is common.',\n  'tr.rsiOut': 'Sell when RSI rises above this number, or when the price closes above its 5-day average.',\n  'tr.fast': 'Number of days for the fast average. Smaller reacts sooner.',\n  'tr.slow': 'Number of days for the slow average. It shows the long trend. It must be larger than the fast one.',\n  'tr.nIn': 'Buy when the price closes above the highest close of this many past days.',\n  'tr.nOut': 'Sell when the price closes below the lowest close of this many past days.',\n  'tr.sl': 'Sell if the price closes this percent below your buy price. 0 turns it off. Stops use closing prices, so a big gap down can cost more than the stop.',\n  'tr.cost': 'Brokerage, taxes and slippage on each buy and each sell, as a percent. 0.10 is a fair start for ETFs.',\n  'tr.checks': 'Five quick checks. A strategy you can trust passes most of them. A pass on the first check alone means little.',\n  'tr.cmp': 'All three strategies on the same data, using the settings you have chosen. Tap a row to open that strategy.',\n  'tr.split': 'The strategy is run again on the first 70 percent of the data and on the last 30 percent. If the last 30 percent looks much worse, the rules may have been a lucky fit to the past.',\n  'tr.trades': 'The most recent trades. Result is the profit or loss on that trade after costs.',\n  'tr.win': 'Share of trades that made money. Above 50 percent means wins outnumber losses.',\n  'tr.avgw': 'The average profit of the winning trades.',\n  'tr.avgl': 'The average loss of the losing trades.',\n  'tr.payoff': 'Average win divided by average loss. Above 1 means a typical win is bigger than a typical loss.',\n  'tr.exp': 'Average profit per trade after costs. This matters most. Below zero means the strategy loses money over time, whatever the win rate.',\n  'tr.pf': 'Total profit from winners divided by total loss from losers. Above 1.5 is decent. Below 1 is losing.',\n  'tr.cagr': 'Yearly growth of the strategy with all profits reinvested.',\n  'tr.bh': 'Yearly growth if you had bought on the first day and just held. The strategy has to justify its effort against this.',\n  'tr.dd': 'The biggest fall from a high point to a low point in the strategy value. Smaller is easier to live with.',\n  'tr.n': 'Number of finished trades. Fewer than 30 is too few to trust.',\n  'tr.tim': 'Share of days the money was invested. A low number means the money sat idle in cash.',\n  'tr.chart': 'Blue is the strategy and grey is buy and hold, both starting at 100. The dotted line marks where the unseen last 30 percent begins.'\n};\nvar OPEN = {};\n\n/* ---------- state ---------- */\nvar S = { D: null, tab: 'pk' };\nvar RES = {};\nvar STRATS = {\n  rsi2: { name: 'Dip buying (RSI-2)' },\n  trend: { name: 'Trend (50/200 average)' },\n  break: { name: 'Breakout' }\n};\n\n/* ---------- field definitions ---------- */\nvar FIELDS = {\n  sip: [\n    { id: 'sip-amount', label: 'Monthly SIP (₹)', help: 'sip.amount', value: 10000, step: 500, min: 100 },\n    { id: 'sip-years', label: 'Test length (years)', help: 'sip.years', type: 'select', options: [3, 5, 7, 10], value: 5 },\n    { id: 'sip-dipPct', label: 'Dip size (%)', help: 'sip.dipPct', value: 10, step: 1, min: 1 },\n    { id: 'sip-dipMult', label: 'Dip-month multiple (×)', help: 'sip.dipMult', value: 2, step: 0.5, min: 1 },\n    { id: 'sip-hurdle', label: 'Target return (% a year)', help: 'sip.hurdle', value: 7, step: 0.5, min: 0, full: true }\n  ],\n  swp: [\n    { id: 'swp-corpus', label: 'Starting money (₹)', help: 'swp.corpus', value: 10000000, step: 100000, min: 100000 },\n    { id: 'swp-w', label: 'Withdraw each month (₹)', help: 'swp.w', value: 40000, step: 1000, min: 0 },\n    { id: 'swp-step', label: 'Yearly increase (%)', help: 'swp.step', value: 5, step: 0.5, min: 0 },\n    { id: 'swp-eq', label: 'In equity (%)', help: 'swp.eq', value: 60, step: 5, min: 0, max: 100 },\n    { id: 'swp-debt', label: 'Safe part earns (% a year)', help: 'swp.debt', value: 6.5, step: 0.5, min: 0 },\n    { id: 'swp-years', label: 'Must last (years)', help: 'swp.years', type: 'select', options: [5, 10, 15, 20, 25, 30], value: 10 }\n  ],\n  tr: [\n    { id: 'tr-key', label: 'Strategy', help: 'tr.strategy', type: 'select', options: [['rsi2', STRATS.rsi2.name], ['trend', STRATS.trend.name], ['break', STRATS.break.name]], value: 'rsi2', full: true },\n    { id: 'tr-rsiIn', label: 'Buy when RSI-2 below', help: 'tr.rsiIn', value: 10, step: 1, min: 1, max: 50, strat: 'rsi2' },\n    { id: 'tr-rsiOut', label: 'Sell when RSI-2 above', help: 'tr.rsiOut', value: 70, step: 1, min: 20, max: 99, strat: 'rsi2' },\n    { id: 'tr-fast', label: 'Fast average (days)', help: 'tr.fast', value: 50, step: 5, min: 2, strat: 'trend' },\n    { id: 'tr-slow', label: 'Slow average (days)', help: 'tr.slow', value: 200, step: 10, min: 5, strat: 'trend' },\n    { id: 'tr-nIn', label: 'Buy on new high of (days)', help: 'tr.nIn', value: 50, step: 5, min: 5, strat: 'break' },\n    { id: 'tr-nOut', label: 'Sell on new low of (days)', help: 'tr.nOut', value: 20, step: 5, min: 3, strat: 'break' },\n    { id: 'tr-sl', label: 'Stop-loss (%, 0 = off)', help: 'tr.sl', value: 0, step: 1, min: 0 },\n    { id: 'tr-cost', label: 'Cost per buy or sell (%)', help: 'tr.cost', value: 0.1, step: 0.05, min: 0 }\n  ]\n};\nfunction qbtn(key, open) {\n  return '<button type=\"button\" class=\"q\" data-help=\"' + key + '\" aria-expanded=\"' + (open ? 'true' : 'false') + '\" aria-label=\"Explain this\">?</button>';\n}\nfunction fieldHTML(f) {\n  var inp;\n  if (f.type === 'date') {\n    inp = '<input id=\"' + f.id + '\" type=\"date\" value=\"' + f.value + '\">';\n  } else if (f.type === 'text') {\n    inp = '<input id=\"' + f.id + '\" type=\"text\" inputmode=\"text\" value=\"' + esc(f.value) + '\">';\n  } else if (f.type === 'select') {\n    inp = '<select id=\"' + f.id + '\">' + f.options.map(function (o) {\n      var v = Array.isArray(o) ? o[0] : o, l = Array.isArray(o) ? o[1] : o + ' years';\n      return '<option value=\"' + v + '\"' + (String(v) === String(f.value) ? ' selected' : '') + '>' + esc(l) + '</option>';\n    }).join('') + '</select>';\n  } else {\n    inp = '<input id=\"' + f.id + '\" type=\"number\" inputmode=\"decimal\" value=\"' + f.value + '\" step=\"' + (f.step || 1) + '\"' +\n      (f.min !== undefined ? ' min=\"' + f.min + '\"' : '') + (f.max !== undefined ? ' max=\"' + f.max + '\"' : '') + '>';\n  }\n  return '<div class=\"field' + (f.full ? ' full' : '') + '\"' + (f.strat ? ' data-strat=\"' + f.strat + '\"' : '') + ' data-host>' +\n    '<div class=\"lab\"><label for=\"' + f.id + '\">' + esc(f.label) + '</label>' + qbtn(f.help, false) + '</div>' + inp + '</div>';\n}\nfunction mountFields() {\n  ['sip', 'swp', 'tr', 'pk'].forEach(function (k) {\n    $('#fields-' + k).innerHTML = FIELDS[k].map(fieldHTML).join('');\n  });\n  /* Go button: the start and end dates only take effect when you tap Go */\n  var pm = $('#pk-money'), pf = pm && pm.closest('.field');\n  if (pf) {\n    pf.insertAdjacentHTML('afterend', '<div class=\"field full\"><div class=\"row\"><button type=\"button\" class=\"btn\" id=\"pk-go\">Go: show results for these dates</button></div><p class=\"note\">Pick a start and an end month (end blank = latest), then tap Go. The results below change only when you tap Go.</p></div>');\n    $('#pk-go').addEventListener('click', function () { schedule(); });\n  }\n}\n\n/* ---------- reading inputs ---------- */\nfunction val(id, def, lo, hi) {\n  var el = $('#' + id);\n  var v = el ? parseFloat(el.value) : NaN;\n  if (!isFinite(v)) v = def;\n  if (lo !== undefined && v < lo) v = lo;\n  if (hi !== undefined && v > hi) v = hi;\n  return v;\n}\nfunction range() {\n  var D = S.D;\n  var f = Date.parse(($('#from').value || '') + 'T00:00:00Z'), t = Date.parse(($('#to').value || '') + 'T00:00:00Z');\n  var i0 = isFinite(f) ? firstIdxGE(D, f) : 0;\n  var i1 = isFinite(t) ? lastIdxLE(D, t) : D.t.length - 1;\n  if (i1 - i0 < 250) { i0 = 0; i1 = D.t.length - 1; }\n  return { D: D, i0: i0, i1: i1 };\n}\n\n/* ---------- charts ---------- */\nfunction niceStep(raw) {\n  var e = Math.pow(10, Math.floor(Math.log10(raw))), f = raw / e;\n  return (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * e;\n}\nfunction chart(o) {\n  var W = 360, H = 200, L = 46, R = 12, T = 12, B = 24;\n  var xs = [], ys = [];\n  o.series.forEach(function (s) { s.pts.forEach(function (p) { xs.push(p[0]); ys.push(p[1]); }); });\n  var xmin = o.xmin !== undefined ? o.xmin : Math.min.apply(null, xs), xmax = o.xmax !== undefined ? o.xmax : Math.max.apply(null, xs);\n  var ymin = o.ymin !== undefined ? o.ymin : Math.min.apply(null, ys), ymax = Math.max.apply(null, ys);\n  if (ymax <= ymin) ymax = ymin + 1;\n  var step = niceStep((ymax - ymin) / 4);\n  ymin = Math.floor(ymin / step) * step; ymax = Math.ceil(ymax / step) * step;\n  var X = function (v) { return L + (v - xmin) / (xmax - xmin || 1) * (W - L - R); };\n  var Y = function (v) { return T + (1 - (v - ymin) / (ymax - ymin || 1)) * (H - T - B); };\n  var g = '';\n  for (var v = ymin; v <= ymax + step / 2; v += step) {\n    g += '<line x1=\"' + L + '\" x2=\"' + (W - R) + '\" y1=\"' + Y(v).toFixed(1) + '\" y2=\"' + Y(v).toFixed(1) + '\" class=\"gl\"/>' +\n      '<text x=\"' + (L - 6) + '\" y=\"' + (Y(v) + 3).toFixed(1) + '\" text-anchor=\"end\">' + esc(o.yfmt(v)) + '</text>';\n  }\n  o.xticks.forEach(function (t) {\n    g += '<text x=\"' + X(t.v).toFixed(1) + '\" y=\"' + (H - 7) + '\" text-anchor=\"middle\">' + esc(t.label) + '</text>';\n  });\n  var paths = '', endDot = '';\n  o.series.forEach(function (s, si) {\n    var pts = s.pts, stride = Math.max(1, Math.ceil(pts.length / 260)), d = '';\n    for (var i = 0; i < pts.length; i += stride) d += (d ? 'L' : 'M') + X(pts[i][0]).toFixed(1) + ' ' + Y(pts[i][1]).toFixed(1);\n    var last = pts[pts.length - 1];\n    d += 'L' + X(last[0]).toFixed(1) + ' ' + Y(last[1]).toFixed(1);\n    paths += '<path d=\"' + d + '\" class=\"ln ' + s.cls + '\"/>';\n    if (si === 0) endDot = '<circle cx=\"' + X(last[0]).toFixed(1) + '\" cy=\"' + Y(last[1]).toFixed(1) + '\" r=\"3.5\" class=\"dot ' + s.cls + '\"/>';\n  });\n  var vl = '';\n  (o.vlines || []).forEach(function (m) {\n    vl += '<line x1=\"' + X(m.x).toFixed(1) + '\" x2=\"' + X(m.x).toFixed(1) + '\" y1=\"' + T + '\" y2=\"' + (H - B) + '\" class=\"vl\"/>' +\n      '<text x=\"' + (X(m.x) + 4).toFixed(1) + '\" y=\"' + (T + 9) + '\" class=\"vt\">' + esc(m.label) + '</text>';\n  });\n  var legend = '<div class=\"legend\">' + o.series.map(function (s) {\n    return '<span><i class=\"sw ' + s.cls + '\"></i>' + esc(s.name) + '</span>';\n  }).join('') + '</div>';\n  return '<svg class=\"chart\" viewBox=\"0 0 ' + W + ' ' + H + '\" role=\"img\" aria-label=\"' + esc(o.label) + '\">' + g + vl + paths + endDot + '</svg>' + legend;\n}\nfunction timeTicks(t0, t1) {\n  var y0 = new Date(t0).getUTCFullYear(), y1 = new Date(t1).getUTCFullYear();\n  var step = Math.max(1, Math.ceil((y1 - y0) / 6)), out = [];\n  for (var y = y0 + 1; y <= y1; y += step) {\n    var t = Date.UTC(y, 0, 1);\n    if (t >= t0 && t <= t1) out.push({ v: t, label: String(y) });\n  }\n  return out;\n}\n\n/* ---------- result helpers ---------- */\nfunction tile(key, label, value, cls, sub) {\n  var open = !!OPEN[key];\n  return '<button type=\"button\" class=\"tile ' + (cls || '') + '\" data-help=\"' + key + '\" aria-expanded=\"' + open + '\">' +\n    '<span class=\"tl\">' + esc(label) + '</span><span class=\"tv\">' + value + '</span>' +\n    (sub ? '<span class=\"ts\">' + esc(sub) + '</span>' : '') +\n    (open ? '<span class=\"help\">' + esc(HELP[key]) + '</span>' : '') + '</button>';\n}\nfunction secHead(key, title) {\n  var open = !!OPEN[key];\n  return '<div class=\"sec-head\"><h3>' + esc(title) + '</h3>' + qbtn(key, open) +\n    (open ? '<p class=\"help\">' + esc(HELP[key]) + '</p>' : '') + '</div>';\n}\nfunction note(txt) { return '<p class=\"note\">' + txt + '</p>'; }\nfunction errBox(t) { return '<p class=\"note warnbox\">' + esc(t) + '</p>'; }\n\n/* ---------- SIP ---------- */\nfunction computeSIP() {\n  var r = range(), D = r.D, i0 = r.i0, i1 = r.i1;\n  var p = {\n    amount: val('sip-amount', 10000, 100), years: val('sip-years', 5), dipPct: val('sip-dipPct', 10, 1), dipMult: val('sip-dipMult', 2, 1),\n    hurdle: val('sip-hurdle', 7, 0)\n  };\n  var ms = D.m.filter(function (k) { return k >= i0 && k <= i1; });\n  if (ms.length < 12) return { err: 'The test range needs at least 12 months of prices.' };\n  var s0 = ms[0];\n  var plain = simSIP(D, s0, i1, p.amount, 'plain'), dip = simSIP(D, s0, i1, p.amount, 'dip', p.dipPct, p.dipMult);\n  var lump = simLump(D, s0, i1, plain.invested);\n  var roll = rollingSIP(D, i0, i1, p.amount, p.years, p.dipPct, p.dipMult);\n  return { p: p, D: D, s0: s0, i1: i1, plain: plain, dip: dip, lump: lump, roll: roll };\n}\nfunction renderSIP(R) {\n  if (R.err) return errBox(R.err);\n  var p = R.p, rp = R.roll.plain, rd = R.roll.dip, D = R.D;\n  var h = '';\n  h += secHead('sip.roll', 'How often did it work?');\n  if (!rp.n) {\n    h += errBox('Not enough history for ' + p.years + '-year windows. Pick a shorter test length or a wider date range.');\n  } else {\n    var beat = pctAbove(rp.xs, p.hurdle / 100);\n    h += '<p class=\"headline\">In <b class=\"' + (rp.pctPositive >= 0.5 ? 'good' : 'bad') + '\">' + Math.round(rp.pctPositive * rp.n) + ' of ' + rp.n + '</b> start months (' + pc(rp.pctPositive, 0) +\n      ') a ' + p.years + '-year SIP ended in profit.</p>';\n    h += '<div class=\"tiles\">' +\n      tile('sip.win', 'Profitable windows', pc(rp.pctPositive, 0), rp.pctPositive >= 0.5 ? 'good' : 'bad') +\n      tile('sip.beat', 'Beat ' + p.hurdle + '% a year', pc(beat, 0), beat >= 0.5 ? 'good' : 'bad') +\n      tile('sip.median', 'Typical return a year', pc(rp.median, 1, true), tone(rp.median)) +\n      tile('sip.worst', 'Worst start month', pc(rp.worst, 1, true), tone(rp.worst)) + '</div>';\n    h += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Plan</th><th>Profitable</th><th>Beat target</th><th>Typical</th><th>Worst</th><th>Best</th></tr></thead><tbody>' +\n      [['Plain SIP', rp], ['Dip-boost SIP', rd]].map(function (x) {\n        var w = x[1];\n        return '<tr><th>' + x[0] + '</th><td>' + pc(w.pctPositive, 0) + '</td><td>' + pc(pctAbove(w.xs, p.hurdle / 100), 0) + '</td><td>' + pc(w.median, 1, true) + '</td><td>' + pc(w.worst, 1, true) + '</td><td>' + pc(w.best, 1, true) + '</td></tr>';\n      }).join('') + '</tbody></table></div>';\n  }\n  h += secHead('sip.cmp', 'Your full run, ' + fd(D.t[R.s0]) + ' to ' + fd(D.t[R.i1]));\n  h += '<div class=\"tiles\">' +\n    tile('sip.invested', 'Money put in', inrC(R.plain.invested)) +\n    tile('sip.final', 'Worth at the end', inrC(R.plain.final)) +\n    tile('sip.gain', 'Total gain', pc(R.plain.gain, 0, true), tone(R.plain.gain)) +\n    tile('sip.xirr', 'Return a year (XIRR)', pc(R.plain.xirr, 1, true), tone(R.plain.xirr)) +\n    tile('sip.dd', 'Deepest dip below cost', pc(R.plain.worst, 1), 'bad') + '</div>';\n  h += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Way to invest</th><th>Put in</th><th>Worth</th><th>Per year</th><th>Deepest dip</th></tr></thead><tbody>' +\n    [['Plain SIP', R.plain], ['Dip-boost SIP', R.dip], ['Lump sum', R.lump]].map(function (x) {\n      var v = x[1];\n      return '<tr><th>' + x[0] + '</th><td>' + inrC(v.invested) + '</td><td>' + inrC(v.final) + '</td><td>' + pc(v.xirr, 1) + '</td><td>' + pc(v.worst, 1) + '</td></tr>';\n    }).join('') + '</tbody></table></div>';\n  h += secHead('sip.chart', 'Value of your SIP');\n  var pl = R.plain.curve, dp = R.dip.curve;\n  h += chart({\n    label: 'SIP value compared with money put in',\n    series: [\n      { name: 'Plain SIP value', cls: 'c1', pts: pl.map(function (c) { return [c.t, c.v]; }) },\n      { name: 'Money put in', cls: 'c2 dash', pts: pl.map(function (c) { return [c.t, c.inv]; }) },\n      { name: 'Dip-boost value', cls: 'c3', pts: dp.map(function (c) { return [c.t, c.v]; }) }\n    ],\n    ymin: 0, yfmt: inrC, xticks: timeTicks(pl[0].t, pl[pl.length - 1].t)\n  });\n  return h;\n}\n\n/* ---------- SWP ---------- */\nfunction computeSWP() {\n  var r = range(), D = r.D;\n  var years = val('swp-years', 10), months = years * 12;\n  var p = {\n    corpus: val('swp-corpus', 1e7, 1e5), w: val('swp-w', 40000, 0), step: val('swp-step', 5, 0) / 100,\n    eq: val('swp-eq', 60, 0, 100) / 100, debtM: Math.pow(1 + val('swp-debt', 6.5, 0) / 100, 1 / 12) - 1\n  };\n  var rets = monthlyReturns(D, r.i0, r.i1);\n  if (rets.length < 24) return { err: 'The test range needs at least 2 years of prices for SWP tests.' };\n  var hist = swpHistory(rets, months, p);\n  var runs = 1000, paths = genPaths(rets, runs, months, 20260101);\n  var mb = mcBands(paths, runs, months, p);\n  var safe = safeWithdrawal(paths, runs, months, p, 0.9);\n  return { p: p, years: years, rets: rets.length, hist: hist, mb: mb, safe: safe };\n}\nfunction renderSWP(R) {\n  if (R.err) return errBox(R.err);\n  var p = R.p, h = '';\n  var rate = p.w * 12 / p.corpus;\n  h += secHead('swp.how', 'Will the money last ' + R.years + ' years?');\n  var s = R.mb.survival;\n  h += '<p class=\"headline\">The money lasted in <b class=\"' + (s >= 0.9 ? 'good' : (s >= 0.75 ? 'warn' : 'bad')) + '\">' + pc(s, 0) + '</b> of 1,000 simulated futures.</p>';\n  h += '<div class=\"tiles\">' +\n    tile('swp.rate', 'First-year withdrawal', pc(rate, 1), rate <= 0.04 ? 'good' : (rate <= 0.06 ? 'warn' : 'bad'), pc(rate, 1) + ' of the start money') +\n    tile('swp.mc', 'Lasted in simulations', pc(s, 0), s >= 0.9 ? 'good' : (s >= 0.75 ? 'warn' : 'bad')) +\n    tile('swp.hist', 'Lasted in real history', R.hist.n ? pc(R.hist.survival, 0) : 'n/a', R.hist.n ? (R.hist.survival >= 0.9 ? 'good' : 'bad') : '', R.hist.n ? R.hist.n + ' start months' : 'Not enough history') +\n    tile('swp.med', 'Typical money left', inrC(R.mb.medEnd)) +\n    tile('swp.bad', 'Bad-case money left', inrC(R.mb.p10End), R.mb.p10End <= 0 ? 'bad' : '') +\n    tile('swp.safe', 'Most you could take (90% safe)', inr(R.safe), R.safe >= p.w ? 'good' : 'warn', pc(R.safe * 12 / p.corpus, 1) + ' a year') + '</div>';\n  if (R.safe < p.w) h += note('To last in 90 of 100 futures with these settings, the first withdrawal would be about ' + inr(R.safe) + ' a month.');\n  h += secHead('swp.chart', 'Money left, year by year');\n  h += chart({\n    label: 'Simulated money left in an SWP',\n    series: [\n      { name: 'Typical', cls: 'c1', pts: R.mb.bands.map(function (b) { return [b.y, b.p50]; }) },\n      { name: 'Good future', cls: 'c3', pts: R.mb.bands.map(function (b) { return [b.y, b.p90]; }) },\n      { name: 'Bad future', cls: 'c2', pts: R.mb.bands.map(function (b) { return [b.y, b.p10]; }) }\n    ],\n    ymin: 0, xmin: 0, xmax: R.years, yfmt: inrC,\n    xticks: (function () { var o = [], st = Math.max(1, Math.ceil(R.years / 6)); for (var y = 0; y <= R.years; y += st) o.push({ v: y, label: y + 'y' }); return o; })()\n  });\n  h += note('Built from ' + R.rets + ' months of real returns, shuffled in 12-month blocks. A short data set gives a narrow picture, so add more history for a stronger test. Taxes are not included.');\n  return h;\n}\n\n/* ---------- Trading ---------- */\nfunction trParams() {\n  var fast = val('tr-fast', 50, 2), slow = val('tr-slow', 200, 5);\n  if (fast >= slow) fast = Math.max(2, slow - 1);\n  return {\n    rsi2: { rsiIn: val('tr-rsiIn', 10, 1, 50), rsiOut: val('tr-rsiOut', 70, 20, 99) },\n    trend: { fast: Math.round(fast), slow: Math.round(slow) },\n    break: { nIn: Math.round(val('tr-nIn', 50, 5)), nOut: Math.round(val('tr-nOut', 20, 3)) }\n  };\n}\nfunction computeTR() {\n  var r = range(), D = r.D, i0 = r.i0, i1 = r.i1;\n  var key = $('#tr-key').value, P = trParams(), sl = val('tr-sl', 0, 0), cost = val('tr-cost', 0.1, 0);\n  var out = { key: key, D: D, i0: i0, i1: i1, sl: sl, cost: cost, all: {} };\n  Object.keys(STRATS).forEach(function (k) { out.all[k] = testStrategy(D, i0, i1, k, P[k], sl, cost); });\n  out.cur = out.all[key];\n  out.bh = buyHold(D, i0, i1);\n  return out;\n}\nfunction check(status, title, detail) {\n  var lab = status === 'pass' ? 'Pass' : (status === 'fail' ? 'Fail' : 'Unclear');\n  return '<li class=\"chk ' + status + '\"><span class=\"pill\">' + lab + '</span><span><b>' + esc(title) + '</b><br><span class=\"muted\">' + esc(detail) + '</span></span></li>';\n}\nfunction renderTR(R) {\n  var c = R.cur, s = c.stats, bh = R.bh, D = R.D, h = '';\n  if (!s.n) return errBox('This strategy made no trades in the chosen range. Loosen the rules or widen the date range.');\n  h += secHead('tr.checks', STRATS[R.key].name + ': five checks');\n  var passed = 0, items = '';\n  var a = s.winRate > 0.5; if (a) passed++;\n  items += check(a ? 'pass' : 'fail', 'Wins outnumber losses', pc(s.winRate, 0) + ' of ' + s.n + ' trades made money.');\n  var bS = s.expectancy > 0.002 ? 'pass' : (s.expectancy > 0 ? 'warn' : 'fail'); if (bS === 'pass') passed++;\n  items += check(bS, 'The average trade makes money after costs', 'Average trade: ' + pc(s.expectancy, 2, true) + '. Average win ' + pc(s.avgWin, 1, true) + ', average loss ' + pc(s.avgLoss, 1, true) + '.');\n  var cc = s.cagr > bh.cagr; if (cc) passed++;\n  items += check(cc ? 'pass' : 'fail', 'Beats buy and hold', 'Strategy ' + pc(s.cagr, 1) + ' a year against ' + pc(bh.cagr, 1) + (s.maxDD > bh.maxDD ? '. Falls were smaller (' + pc(s.maxDD, 0) + ' against ' + pc(bh.maxDD, 0) + ').' : '.'));\n  var o = c.outS, dStatus = o.n < 5 ? 'warn' : (o.expectancy > 0 ? 'pass' : 'fail'); if (dStatus === 'pass') passed++;\n  items += check(dStatus, 'Still works on the unseen last 30%', o.n < 5 ? 'Only ' + o.n + ' trades there, too few to tell.' : 'Average trade there: ' + pc(o.expectancy, 2, true) + ' over ' + o.n + ' trades.');\n  var e = s.n >= 30; if (e) passed++;\n  items += check(e ? 'pass' : 'warn', 'Enough trades to trust', s.n + ' trades. At least 30 is a safer base.');\n  h += '<p class=\"headline\"><b class=\"' + (passed >= 4 ? 'good' : (passed >= 3 ? 'warn' : 'bad')) + '\">' + passed + ' of 5</b> checks passed.</p><ul class=\"checks\">' + items + '</ul>';\n\n  h += secHead('tr.cmp', 'All three strategies');\n  h += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Strategy</th><th>Trades</th><th>Win rate</th><th>Avg trade</th><th>Per year</th></tr></thead><tbody>' +\n    Object.keys(STRATS).map(function (k) {\n      var st = R.all[k].stats;\n      return '<tr class=\"pick' + (k === R.key ? ' on' : '') + '\" tabindex=\"0\" data-strat=\"' + k + '\"><th>' + esc(STRATS[k].name) + '</th><td>' + st.n + '</td><td>' + pc(st.winRate, 0) + '</td><td class=\"' + tone(st.expectancy) + '\">' + pc(st.expectancy, 2, true) + '</td><td>' + pc(st.cagr, 1) + '</td></tr>';\n    }).join('') +\n    '<tr><th>Buy and hold</th><td>1</td><td>–</td><td>–</td><td>' + pc(bh.cagr, 1) + '</td></tr></tbody></table></div>';\n\n  h += secHead('tr.how', 'Numbers for ' + STRATS[R.key].name);\n  h += '<div class=\"tiles\">' +\n    tile('tr.win', 'Win rate', pc(s.winRate, 0), s.winRate > 0.5 ? 'good' : 'bad') +\n    tile('tr.exp', 'Average trade', pc(s.expectancy, 2, true), tone(s.expectancy)) +\n    tile('tr.avgw', 'Average win', pc(s.avgWin, 1, true), 'good') +\n    tile('tr.avgl', 'Average loss', pc(s.avgLoss, 1, true), 'bad') +\n    tile('tr.payoff', 'Win to loss ratio', num(s.payoff), s.payoff >= 1 ? 'good' : 'bad') +\n    tile('tr.pf', 'Profit factor', num(s.profitFactor), s.profitFactor >= 1 ? 'good' : 'bad') +\n    tile('tr.cagr', 'Strategy a year', pc(s.cagr, 1, true), tone(s.cagr)) +\n    tile('tr.bh', 'Buy and hold a year', pc(bh.cagr, 1, true), tone(bh.cagr)) +\n    tile('tr.dd', 'Worst fall', pc(s.maxDD, 0), 'bad') +\n    tile('tr.n', 'Trades', String(s.n), s.n >= 30 ? '' : 'warn') +\n    tile('tr.tim', 'Days invested', pc(s.inMarket, 0)) + '</div>';\n\n  h += secHead('tr.chart', 'Growth of 100');\n  var strat = c.full.eq, N = strat.length, ts = D.t.slice(R.i0, R.i1 + 1);\n  h += chart({\n    label: 'Strategy growth compared with buy and hold',\n    series: [\n      { name: STRATS[R.key].name, cls: 'c1', pts: strat.map(function (v, i) { return [ts[i], v * 100]; }) },\n      { name: 'Buy and hold', cls: 'c2', pts: bh.eq.map(function (v, i) { return [ts[i], v * 100]; }) }\n    ],\n    ymin: 0, yfmt: function (v) { return String(Math.round(v)); }, xticks: timeTicks(ts[0], ts[N - 1]),\n    vlines: [{ x: D.t[c.split], label: 'unseen 30%' }]\n  });\n\n  h += secHead('tr.split', 'First 70% against last 30%');\n  h += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Part</th><th>Trades</th><th>Win rate</th><th>Avg trade</th><th>Per year</th></tr></thead><tbody>' +\n    [['First 70%', c.inS], ['Last 30% (unseen)', c.outS]].map(function (x) {\n      var st = x[1];\n      return '<tr><th>' + x[0] + '</th><td>' + st.n + '</td><td>' + pc(st.winRate, 0) + '</td><td class=\"' + tone(st.expectancy) + '\">' + pc(st.expectancy, 2, true) + '</td><td>' + pc(st.cagr, 1) + '</td></tr>';\n    }).join('') + '</tbody></table></div>';\n\n  h += secHead('tr.trades', 'Latest trades');\n  var last = c.full.trades.slice(-10).reverse();\n  h += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Bought</th><th>Sold</th><th>Result</th><th>Exit</th></tr></thead><tbody>' +\n    last.map(function (t) {\n      return '<tr><th>' + fd(D.t[t.ei]) + '</th><td>' + fd(D.t[t.xi]) + '</td><td class=\"' + tone(t.ret) + '\">' + pc(t.ret, 1, true) + '</td><td>' + esc(t.reason) + '</td></tr>';\n    }).join('') + '</tbody></table></div>';\n  h += note('Rules act on a closing price and trade at the next day’s close, so the test never uses prices it could not have known. Only closing prices are used, so stops are checked once a day.');\n  return h;\n}\n\n/* ---------- rendering ---------- */\nvar COMPUTE = { sip: computeSIP, swp: computeSWP, tr: computeTR };\nvar RENDER = { sip: renderSIP, swp: renderSWP, tr: renderTR };\nfunction show(tab, recompute) {\n  if (!S.D) return;\n  var run = function () {\n    if (recompute || !RES[tab]) {\n      try { RES[tab] = COMPUTE[tab](); } catch (e) { RES[tab] = { err: 'Something went wrong: ' + e.message }; }\n    }\n    $('#out-' + tab).innerHTML = RENDER[tab](RES[tab]);\n    try { collapsify($('#out-' + tab), tab === 'pk'); planCalc(); } catch (e) { }\n  };\n  if (tab === 'pk' && (recompute || !RES.pk)) {\n    var out = $('#out-pk');\n    if (!out.firstChild || FINDREQ) out.innerHTML = '<p class=\"note\">' + (FINDREQ ? 'Testing hundreds of strategies. This can take 10 to 60 seconds, please wait...' : 'Analysing your stocks...') + '</p>';\n    clearTimeout(show._t);\n    show._t = setTimeout(run, 30);\n    return;\n  }\n  run();\n}\nvar timer = null;\nfunction schedule() {\n  clearTimeout(timer);\n  timer = setTimeout(function () { RES = {}; show(S.tab, true); }, 160);\n}\nfunction setTab(tab) {\n  S.tab = tab;\n  $$('.tabbtn').forEach(function (b) {\n    var on = b.dataset.tab === tab;\n    b.setAttribute('aria-selected', on ? 'true' : 'false');\n  });\n  $$('.tab').forEach(function (s) { s.hidden = s.id !== 'tab-' + tab; });\n  $('#range').hidden = tab === 'pk';\n  show(tab, false);\n}\nfunction syncStratFields() {\n  var key = $('#tr-key').value;\n  $$('#fields-tr [data-strat]').forEach(function (el) { el.hidden = el.dataset.strat !== key; });\n}\n\n/* ---------- data panel ---------- */\nfunction setData(D) {\n  S.D = D; RES = {};\n  var first = new Date(D.t[0]).toISOString().slice(0, 10), last = new Date(D.t[D.t.length - 1]).toISOString().slice(0, 10);\n  ['from', 'to'].forEach(function (id) { var el = $('#' + id); el.min = first; el.max = last; });\n  $('#from').value = first; $('#to').value = last;\n  var yrs = (D.t[D.t.length - 1] - D.t[0]) / MS_YEAR;\n  $('#data-status').innerHTML = '<span class=\"chip ' + (D.demo ? 'warn' : 'good') + '\">' + (D.demo ? 'Example' : 'Loaded') + '</span> ' +\n    '<span><b>' + esc(D.name) + '</b><br><span class=\"muted\">' + D.c.length.toLocaleString('en-IN') + ' days, ' + fdl(D.t[0]) + ' to ' + fdl(D.t[D.t.length - 1]) + ' (' + yrs.toFixed(1) + ' years)</span></span>';\n  $('#example-note').hidden = !D.demo;\n  $('#data-err').hidden = true;\n  show(S.tab, true);\n}\nfunction dataError(msg) { var e = $('#data-err'); e.textContent = msg; e.hidden = false; }\nfunction loadText(text, name) {\n  try { setData(parseData(text, name)); } catch (e) { dataError(e.message); }\n}\n\n/* ---------- events ---------- */\nfunction toggleStaticHelp(btn) {\n  var host = btn.closest('[data-host]') || btn.parentNode, key = btn.dataset.help;\n  var ex = host.querySelector(':scope > .help');\n  if (ex) { ex.remove(); btn.setAttribute('aria-expanded', 'false'); return; }\n  var p = document.createElement('p');\n  p.className = 'help'; p.textContent = HELP[key];\n  host.appendChild(p);\n  btn.setAttribute('aria-expanded', 'true');\n}\ndocument.addEventListener('click', function (e) {\n  var hb = e.target.closest('[data-help]');\n  if (hb) {\n    var inOut = hb.closest('.out');\n    if (inOut) {\n      var key = hb.dataset.help;\n      OPEN[key] = !OPEN[key];\n      var tab = inOut.id.replace('out-', '');\n      var y = window.scrollY;\n      show(tab, false);\n      window.scrollTo(0, y);\n    } else toggleStaticHelp(hb);\n    return;\n  }\n  var tb = e.target.closest('.tabbtn');\n  if (tb) { setTab(tb.dataset.tab); return; }\n  var row = e.target.closest('tr.pick');\n  if (row && row.dataset.strat) { $('#tr-key').value = row.dataset.strat; syncStratFields(); schedule(); }\n});\ndocument.addEventListener('keydown', function (e) {\n  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('tr.pick')) { e.preventDefault(); e.target.click(); }\n});\ndocument.addEventListener('input', function (e) {\n  if (e.target.id === 'paste' || e.target.id === 'pk-from' || e.target.id === 'pk-to') return;\n  if (e.target.closest('.tab') || e.target.closest('#range')) schedule();\n});\ndocument.addEventListener('change', function (e) {\n  if (e.target.id === 'pk-from' || e.target.id === 'pk-to') return;\n  if (e.target.id === 'tr-key') syncStratFields();\n  if (e.target.closest('.tab') || e.target.closest('#range')) schedule();\n});\n\nfunction init() {\n  mountFields();\n  syncStratFields();\n  pkInit();\n  $('#file').addEventListener('change', function (e) {\n    var f = e.target.files && e.target.files[0];\n    if (!f) return;\n    var rd = new FileReader();\n    rd.onload = function () { loadText(String(rd.result), f.name.replace(/\\.[^.]+$/, '')); e.target.value = ''; };\n    rd.onerror = function () { dataError('Could not read that file.'); };\n    rd.readAsText(f);\n  });\n  $('#btn-paste').addEventListener('click', function () { var b = $('#paste-box'); b.hidden = !b.hidden; });\n  $('#btn-load').addEventListener('click', function () { loadText($('#paste').value, 'Pasted data'); });\n  $('#btn-example').addEventListener('click', function () { setData(demoData()); });\n  setData(demoData());\n  setTab('pk');\n}\n\n\n/* ===== Picks tab: monthly stock ranking ===== */\nObject.assign(HELP, {\n  'pk.wm': 'Decides how your money is split among the stocks you buy each month. Equal puts the same amount in each. The other options put more in higher-ranked stocks. With My own amounts, type percentages in rank order, for example 25,20,10,10,10,5,5,5,5,5 for 10 stocks (they are scaled to add up to 100). Each month the stocks are re-ranked and the money is moved to match, so a stock that drops out is replaced and the new stock takes the matching share. It applies to the portfolio test, which includes costs on the money that moves.',\n  'pk.live': 'On your own Cloudflare site, the page fetches free monthly prices for these symbols by itself, so you do not need CSV files. Use Yahoo symbols: add .NS for NSE stocks (TCS.NS) or .BO for BSE. Up to 40 symbols. Tap Load live prices after you change the list. On this preview page live prices are not available, so use CSV files here.',\n  'pk.etf': 'Adds a built-in list of about 60 widely traded NSE ETFs (Nifty, Sensex, bank, IT, gold, silver, international and others) to your list. I could not check this list against NSE live, so a few symbols may show as no data. For the full list, open NSE\\u2019s ETF page, download the CSV, and add it with Add CSV files. Debt and liquid ETFs are left out because they do not suit a ranking by price momentum. Many ETFs are young, so the test only starts when at least half of your list has prices. Some ETFs trade in very small volumes, so check the volume before you buy.',\n  'pk.index': 'Pick an NSE index and the page loads every stock in it. Nifty 500 already contains Nifty 100, Midcap 150 and Smallcap 250, so it covers large, mid and small caps together. The stock list comes from NSE and prices from Yahoo. Loading 500 stocks takes about half a minute the first time, and the result is kept on this device for 6 hours. Index lists show today\\u2019s members only, so stocks that dropped out are missing and old results look better than they really were.',\n  'pk.candle': 'A monthly candle shows where a stock opened, how high and low it went, and where it closed. Patterns like a hammer or an engulfing candle are thought to hint at the next move. This section tests that on your stocks. The table shows what happened after each pattern, compared with the average stock. A pattern counts as Worked only with at least 30 cases and a strength of 2.5 or more in the expected direction, because with six patterns tested some will look good by luck. The top rows say whether adding candle information to the combined method helped on the unseen months.',\n  'pk.data': 'Add one CSV file per stock (Date and Close columns). The file name becomes the stock name, so RELIANCE.csv shows as RELIANCE. You can also add one file with a Symbol column, or one file with a column for each stock. Daily or monthly prices both work. Each month, add the newest files. New months are added to your saved list and older months stay.',\n  'pk.h': 'How long you plan to keep each pick. The test measures what happened over that many months after each month-end.',\n  'pk.n': 'How many stocks you buy each month. 1 means only the single top pick. Results for 1 stock jump around more than for 3 or 5.',\n  'pk.cost': 'Brokerage, taxes and slippage for buying and selling one pick, as a percent of the amount. 0.25 is a fair start.',\n  'pk.picks': 'Stocks ranked by the method that looked best on past months. The first row is the top pick. 12m, 6m and 3m are past price changes. Trend says whether the price is above its 10-month average. These are statistical leanings. They are not forecasts, and any stock can fall.',\n  'pk.horizon': 'The best method and top picks for holding 1, 2 and 3 months. A stock that shows up in the 2 or 3 month rows has a record of doing better when held longer. Look at the confidence before you rely on a row.',\n  'pk.checks': 'Five checks on the method. Two use the last 40 percent of the months, which the method was not chosen on. The chance test asks how often random picks would do as well. High needs 4 or 5 passes, Medium needs 3, and Low means the method has not proved itself.',\n  'pk.score': 'Every method, tested the same way. Wins is the share of months the picks beat the average stock in your list. Avg extra is the average gain over that average, after costs. Unseen columns use only the last 40 percent of months. Strength above 1.65 is the usual bar for a real edge. The row marked with a dot was chosen using the first 60 percent of months only.',\n  'pk.chart': 'Growth of 100 if each month you had bought the method’s picks, held for your chosen months, and repeated. The grey line is the average stock in your list. The dotted line is where the unseen months begin.',\n  'pk.log': 'What the chosen method would have picked in each of the last 12 months, and how it turned out. This is the month-by-month report card.',\n  'pk.weak': 'Stocks showing three or more warning signs, such as trading below their 10-month average, falling over 12 months, or lagging the rest of your list. These are the ones to review or avoid adding to.',\n  'pk.cloud': 'To get this analysis as a notification every day, a small program can run on Cloudflare and send a message to your phone. It reads free monthly prices and runs the same tests as this page.',\n  'pk.method': 'Each method is a simple rule for ranking stocks. Momentum means recent winners tend to keep winning for a while. Trend means price above its long average. Return per risk prefers steady gains. Low swings prefers calm stocks. Bounce back bets on last month’s losers. Combined mixes several of them.'\n});\n\nFIELDS.pk = [\n  { id: 'pk-h', label: 'Hold each pick for', help: 'pk.h', type: 'select', options: [[1, '1 month'], [2, '2 months'], [3, '3 months']], value: 1 },\n  { id: 'pk-n', label: 'Stocks to buy', help: 'pk.n', type: 'select', options: [[1, '1 stock'], [3, '3 stocks'], [5, '5 stocks'], [10, '10 stocks'], [12, '12 stocks'], [15, '15 stocks'], [20, '20 stocks']], value: 10 },\n  { id: 'pk-mode', label: 'Methods', help: 'pk.mode', type: 'select', options: [['mom', 'Momentum only, with downtrend filter'], ['all', 'All methods']], value: 'mom', full: true },\n  { id: 'pk-meth', label: 'Method to use', help: 'pk.meth', type: 'select', options: [['', 'Auto: best on past months']].concat(SIGS.map(function (g) { return [g.key, g.name]; })), value: 'custom', full: true },\n  { id: 'pk-w12', label: 'My blend: 12m weight', help: 'pk.w', value: 60, step: 5, min: -100, max: 100 },\n  { id: 'pk-w6', label: 'My blend: 6m weight', help: 'pk.w', value: 0, step: 5, min: -100, max: 100 },\n  { id: 'pk-w3', label: 'My blend: 3m weight', help: 'pk.w', value: 0, step: 5, min: -100, max: 100 },\n  { id: 'pk-w1', label: 'My blend: 1m weight (negative buys last month’s losers)', help: 'pk.w', value: -100, step: 5, min: -100, max: 100 },\n  { id: 'pk-wv', label: 'My blend: low-volatility weight', help: 'pk.w', value: 0, step: 5, min: -100, max: 100 },\n  { id: 'pk-wx12', label: 'My blend: 12m per risk weight', help: 'pk.w', value: 0, step: 5, min: -100, max: 100 },\n  { id: 'pk-wx6', label: 'My blend: 6m per risk weight', help: 'pk.w', value: 0, step: 5, min: -100, max: 100 },\n  { id: 'pk-wx3', label: 'My blend: 3m per risk weight', help: 'pk.w', value: 0, step: 5, min: -100, max: 100 },\n  { id: 'pk-wf', label: 'My blend: downtrend filter', help: 'pk.w', type: 'select', options: [[1, 'On'], [0, 'Off']], value: 0 },\n  { id: 'pk-conf', label: 'Stocks allowed', help: 'pk.conf', type: 'select', options: [['med', 'Medium and high confidence only'], ['high', 'High confidence only'], ['any', 'Any (includes low)']], value: 'med', full: true },\n  { id: 'pk-fbr', label: 'Filter: go to cash when fewer than this share of stocks are above their 10-month average', help: 'pk.fbr', type: 'select', options: [[0.4, '40% (strict)'], [0.3, '30%'], [0.2, '20%'], [0.1, '10%'], [0, 'Never (stock-by-stock filter only)']], value: 0.4, full: true },\n  { id: 'pk-hc', label: 'Show', help: 'pk.hc', type: 'select', options: [['all', 'All top picks'], ['hc', 'Only high-confidence stocks']], value: 'all', full: true },\n  { id: 'pk-cm', label: 'Stocks rated each month', help: 'pk.cg', value: 15, step: 5, min: 10 },\n  { id: 'pk-exit', label: 'Exit rank (0 = off)', help: 'pk.exit', value: 25, step: 5, min: 0 },\n  { id: 'pk-wm', label: 'Money in each stock', help: 'pk.wm', type: 'select', options: WSCHEMES.map(function (x) { return [x[0], x[1]]; }), value: 'equal', full: true },\n  { id: 'pk-wlist', label: 'My amounts by rank (percent, rank 1 first)', help: 'pk.wm', type: 'text', value: '25,20,10,10,10,5,5,5,5,5', full: true },\n  { id: 'pk-sl', label: 'Stop-loss % (0 = off)', help: 'pk.sl', value: 25, step: 1, min: 0, max: 60 },\n  { id: 'pk-explore', label: 'Explorer (all methods and stop-losses)', help: 'pk.explore', type: 'select', options: [['off', 'Off (faster)'], ['on', 'On']], value: 'off', full: true },\n  { id: 'pk-rg', label: 'Regime filter', help: 'pk.rg', type: 'select', options: [['none', 'Off'], ['half', 'Half portfolio'], ['cash', 'Go to cash']], value: 'none' },\n  { id: 'pk-rgl', label: 'Index average (months)', help: 'pk.rg', type: 'select', options: [[5, '5 months'], [7, '7 months'], [10, '10 months']], value: 10 },\n  { id: 'pk-from', label: 'Start date: week you first buy', help: 'pl.start', type: 'date', value: '2010-11-01', full: true },\n  { id: 'pk-to', label: 'End date: last month of the test (blank = latest)', help: 'pl.start', type: 'date', value: '', full: true },\n  { id: 'pk-money', label: 'Money to invest', help: 'pl.money', value: 100000, step: 10000, min: 0, full: true },\n  { id: 'pk-ffrom', label: 'Strategy finder: from (date)', help: 'pk.find', type: 'date', value: '2015-01-01' },\n  { id: 'pk-fto', label: 'Strategy finder: to (date)', help: 'pk.find', type: 'date', value: '2016-12-31' },\n  { id: 'pk-fgoal', label: 'Finder goal', help: 'pk.find', type: 'select', options: [['cagr', 'Most growth (beating list with smaller fall)'], ['calmar', 'Most growth per unit of fall'], ['fall', 'Smallest fall (still beating list)']], value: 'cagr', full: true },\n  { id: 'pk-cost', label: 'Cost per pick (%)', help: 'pk.cost', value: 0.25, step: 0.05, min: 0, full: true }\n];\n\nvar PKS = { store: { demo: true, stocks: {} } };\nvar PK_KEY = 'bb-picks-v1';\nvar PK_SYM_KEY = 'bb-picks-symbols';\nvar PK_DEFAULT_SYMBOLS = 'RELIANCE.NS,TCS.NS,HDFCBANK.NS,INFY.NS,ICICIBANK.NS,ITC.NS,LT.NS,SBIN.NS,BHARTIARTL.NS,KOTAKBANK.NS,HINDUNILVR.NS,AXISBANK.NS,ASIANPAINT.NS,MARUTI.NS,SUNPHARMA.NS,TITAN.NS,BAJFINANCE.NS,NTPC.NS,ULTRACEMCO.NS,M&M.NS';\n\nfunction pkSave() {\n  if (PKS.store.demo || PKS.store.live) return;\n  try {\n    var o = {};\n    Object.keys(PKS.store.stocks).forEach(function (s) {\n      var m = PKS.store.stocks[s].m;\n      o[s] = Object.keys(m).map(function (k) { var e = m[k]; return [+k, e[0], e[1], isFinite(e[2]) ? e[2] : null, isFinite(e[3]) ? e[3] : null, isFinite(e[4]) ? e[4] : null]; });\n    });\n    localStorage.setItem(PK_KEY, JSON.stringify(o));\n  } catch (e) { }\n}\nfunction pkLoad() {\n  try {\n    var raw = localStorage.getItem(PK_KEY);\n    if (!raw) return false;\n    var o = JSON.parse(raw), st = {}, n = 0;\n    Object.keys(o).forEach(function (s) {\n      var m = {};\n      o[s].forEach(function (r) { var nz = function (x) { return x == null ? NaN : x; }; m[r[0]] = [r[1], r[2], nz(r[3]), nz(r[4]), nz(r[5])]; });\n      st[s] = { m: m }; n++;\n    });\n    if (!n) return false;\n    PKS.store = { demo: false, stocks: st };\n    return true;\n  } catch (e) { return false; }\n}\nfunction pkError(msg) { var e = $('#pk-err'); e.textContent = msg; e.hidden = !msg; }\nfunction readFileText(f) {\n  return new Promise(function (res, rej) {\n    var rd = new FileReader();\n    rd.onload = function () { res({ name: f.name, text: String(rd.result) }); };\n    rd.onerror = function () { rej(new Error('Could not read ' + f.name)); };\n    rd.readAsText(f);\n  });\n}\nfunction pkAddFiles(files) {\n  pkError('');\n  Promise.all(files.map(readFileText)).then(function (docs) {\n    var parsed = [], errs = [];\n    docs.forEach(function (d) {\n      try {\n        var first = d.text.split(/\\r?\\n/)[0].toLowerCase();\n        if (/symbol/.test(first) && !/date/.test(first)) {\n          var cons = [], lines = d.text.split(/\\r?\\n/).filter(function (l) { return l.trim(); }), hd = lines[0].split(',').map(function (x) { return x.trim().replace(/^\"|\"$/g, '').toLowerCase(); }), si = hd.indexOf('symbol');\n          for (var li = 1; li < lines.length && si >= 0; li++) { var sy = (lines[li].split(',')[si] || '').trim().replace(/^\"|\"$/g, '').toUpperCase(); if (/^[A-Z0-9&-]{1,20}$/.test(sy)) cons.push(sy + '.NS'); }\n          if (cons.length) { $('#pk-symbols').value = cons.join(', '); errs.push(d.name + ' is a stock list, so ' + cons.length + ' symbols were added to the symbols box. Tap Load live prices.'); return; }\n        }\n        parseMulti(d.text, cleanSymbol(d.name)).forEach(function (s) {\n          var sym = cleanSymbol(s.sym) || cleanSymbol(d.name);\n          parsed.push({ sym: sym, map: toMonthMap(s.t, s.c, s.o, s.h, s.l) });\n        });\n      } catch (e) { errs.push(d.name + ': ' + e.message); }\n    });\n    if (parsed.length) {\n      if (PKS.store.demo) PKS.store = { demo: false, stocks: {} };\n      parsed.forEach(function (p) { mergeInto(PKS.store.stocks, p.sym, p.map); });\n      pkSave();\n    }\n    if (errs.length) pkError(errs.join(' '));\n    RES.pk = null; show('pk', true);\n  }, function (e) { pkError(e.message); });\n}\nfunction pkUpdateStatus(R) {\n  var P = R && R.P ? R.P : buildPanel(PKS.store.stocks);\n  var st = $('#pk-status'), chips = $('#pk-chips');\n  if (!P) { st.innerHTML = '<span class=\"chip warn\">Empty</span><span>No stocks yet. Add CSV files or use the example list.</span>'; chips.innerHTML = ''; return; }\n  var demo = PKS.store.demo, live = PKS.store.live;\n  st.innerHTML = '<span class=\"chip ' + (demo ? 'warn' : 'good') + '\">' + (demo ? 'Example' : (live ? 'Live' : 'Loaded')) + '</span><span><b>' + (demo ? 'Example list (made up)' : (live ? 'Live prices' : 'Your list')) + '</b><br><span class=\"muted\">' +\n    P.syms.length + ' stocks, ' + Math.floor(P.K / 12) + ' years of months, latest price ' + fdl(P.last) + (P.partial ? '. This month is not finished, so signals use the end of ' + monthLabel(P, P.kSig) + '.' : '.') + '</span></span>';\n  var shown = P.syms.length > 60 ? 40 : P.syms.length;\n  chips.innerHTML = P.syms.slice(0, shown).map(function (s, i) {\n    var stale = P.lastDates[i] < P.last - 12 * 86400000;\n    return '<span class=\"tag' + (stale ? ' stale' : '') + '\" title=\"' + (stale ? 'No recent prices' : '') + '\">' + esc(s) + (stale ? ' (old)' : '') + '</span>';\n  }).join('') + (P.syms.length > shown ? '<span class=\"tag\">+' + (P.syms.length - shown) + ' more</span>' : '');\n}\n\nfunction computePK() {\n  var h = val('pk-h', 1, 1, 3), N = val('pk-n', 10, 1, 20), cost = val('pk-cost', 0.25, 0, 5);\n  PK_FORCE = ($('#pk-meth') || {}).value || '';\n  PK_WM = ($('#pk-wm') || {}).value || 'equal';\n  PK_MINCONF = ($('#pk-conf') || {}).value || 'med';\n  var fb = parseFloat(($('#pk-fbr') || {}).value); PK_BREADTH = isFinite(fb) ? fb : 0.4;\n  PK_WLIST = ($('#pk-wlist') || {}).value || '';\n  PK_W = { m12: val('pk-w12', 30, -100, 100), m6: val('pk-w6', 30, -100, 100), m3: val('pk-w3', 20, -100, 100), m1: val('pk-w1', 0, -100, 100), lv: val('pk-wv', 20, -100, 100), filt: val('pk-wf', 0) ? 1 : 0, v12: val('pk-wx12', 0, -100, 100), v6: val('pk-wx6', 0, -100, 100), v3: val('pk-wx3', 0, -100, 100) };\n  PK_OPT = { sl: val('pk-sl', 0, 0, 60), explore: ($('#pk-explore') || {}).value === 'on', exit: Math.round(val('pk-exit', 0, 0)), rg: ($('#pk-rg') || {}).value || 'none', rgL: Math.round(val('pk-rgl', 10, 3)), hc: ($('#pk-hc') || {}).value || 'all', cm: Math.min(30, Math.max(10, Math.round(val('pk-cm', 15, 10, 30)))) };\n  PK_MODE = ($('#pk-mode') || {}).value === 'all' ? 'all' : 'mom';\n  var ym = function (id) { var el = $('#' + id), mm = /^(\\d{4})-(\\d{2})/.exec(el && el.value || ''); return mm ? (+mm[1]) * 12 + (+mm[2]) - 1 : NaN; };\n  PK_OPT.scan = false;\n  PK_OPT.find = FINDREQ ? { a: ym('pk-ffrom'), b: ym('pk-fto'), goal: ($('#pk-fgoal') || {}).value || 'cagr' } : false;\n  FINDREQ = false;\n  var R = analyse(PKS.store.stocks, Math.round(h), Math.round(N), cost, ym('pk-from'), ym('pk-to'));\n  if (R.scan) LASTSCAN = { s: R.scan, P: R.P };\n  if (R.find) LASTFIND = R.find;\n  pkUpdateStatus(R);\n  return R;\n}\nfunction confPill(c) { return '<span class=\"cpill ' + (c === 'High' ? 'good' : (c === 'Medium' ? 'warn' : 'bad')) + '\">' + c + ' confidence</span>'; }\nfunction pickNote(p) {\n  var n = [];\n  n.push(p.trend > 0 ? 'Above trend' : 'Below trend');\n  if (p.r1 > 0.2) n.push('Up ' + (p.r1 * 100).toFixed(0) + '% last month, chasing risk');\n  if (isFinite(p.since) && p.since < -0.05) n.push('Weak start to the month');\n  if (p.candle) n.push('Latest candle: ' + p.candle);\n  if (p.stale) n.push('No recent prices');\n  return n.join('. ');\n}\nfunction renderPK(R) {\n  if (R.err) return errBox(R.err);\n  var M = R.main, P = R.P, h = R.h, N = R.N, html = '';\n  var rec = SIGS.filter(function (g) { return g.key === M.key; })[0];\n  html += '<div class=\"row\"><button type=\"button\" class=\"btn\" id=\"pk-run-find\">Find best strategy</button><button type=\"button\" class=\"btn ghost\" data-tgall=\"1\">Hide all sections</button><button type=\"button\" class=\"btn ghost\" data-tgall=\"0\">Show all sections</button></div>';\n  html += renderFinder(R) + renderPlanTop(R);\n  var shownP = PK_OPT.hc === 'hc' ? R.cands.filter(function (c) { return c.conf.level === 'High'; }) : R.picks;\n  var top = shownP.slice(0, N).map(function (p) { return esc(p.sym); }).join(' + ');\n  html += secHead('pk.picks', 'Picks for the next ' + (h === 1 ? 'month' : h + ' months'));\n  html += '<p class=\"headline\">Top ' + (N === 1 ? 'pick' : N + ' picks') + ': <b>' + (top || 'none, stay in cash') + '</b></p>';\n  html += '<p class=\"note\">' + confPill(M.chk.conf) + ' Method: ' + esc(rec.name) + '. Signals use prices to the end of ' + R.asOf + '.</p>';\n  if (M.chk.conf === 'Low') html += '<p class=\"note warnbox\">No method clearly beat the average of your list on months it had not seen. Treat these picks as low confidence.</p>';\n  html += renderExcl();\n  html += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Stock</th><th>12m</th><th>6m</th><th>3m</th><th>Swings</th><th>Last month</th>' + (P.partial ? '<th>This month</th>' : '') + '<th>Confidence</th><th class=\"wrap\">Notes</th></tr></thead><tbody>' +\n    shownP.map(function (p) {\n      return '<tr class=\"' + (p.rank <= N ? 'on' : '') + '\"><th>' + p.rank + '. ' + esc(p.sym) + (p.rank <= N ? ' ✔' : '') + '<button type=\"button\" class=\"xbtn\" data-ex=\"' + esc(p.sym) + '\" aria-label=\"Remove ' + esc(p.sym) + '\">✕</button></th><td class=\"' + tone(p.mom12) + '\">' + pc(p.mom12, 0, true) + '</td><td class=\"' + tone(p.mom6) + '\">' + pc(p.mom6, 0, true) + '</td><td class=\"' + tone(p.mom3) + '\">' + pc(p.mom3, 0, true) + '</td><td>' + pc(p.vol, 1) + '</td><td class=\"' + tone(p.r1) + '\">' + pc(p.r1, 0, true) + '</td>' +\n        (P.partial ? '<td class=\"' + tone(p.since) + '\">' + pc(p.since, 1, true) + '</td>' : '') + '<td class=\"' + (p.conf ? (p.conf.level === 'High' ? 'good' : (p.conf.level === 'Medium' ? 'warn' : 'bad')) : '') + '\">' + (p.conf ? p.conf.level : '–') + '</td><td class=\"wrap\">' + esc(pickNote(p)) + '</td></tr>';\n    }).join('') + '</tbody></table></div>';\n\n  html += renderCompare(R);\n  html += secHead('pk.hc', 'High-confidence stocks and why');\n  if (M.chk.conf === 'Low') html += '<p class=\"note warnbox\">The method itself has not beaten your list on unseen months. These checks screen each stock, but they are not proof it will rise.</p>';\n  html += '<ul class=\"checks\">' + R.cands.slice(0, Math.max(N, 8)).map(function (c) {\n    var L = c.conf.level;\n    return '<li class=\"chk ' + (L === 'High' ? 'pass' : (L === 'Medium' ? 'warn' : 'fail')) + '\"><span class=\"pill\">' + L + '</span><span><b>' + esc(c.sym) + '</b> (' + c.conf.pass.length + ' of 8 checks)<br><span class=\"muted\">Why: ' + esc(c.conf.pass.join('; ') || 'nothing stands out') + '.' + (c.conf.fail.length ? ' Concerns: ' + esc(c.conf.fail.join('; ')) + '.' : '') + '</span></span></li>';\n  }).join('') + '</ul>';\n  if (!R.cands.length) html += note('The downtrend filter says stay in cash this month, so no stock qualifies.');\n  else if (!R.cands.some(function (c) { return c.conf.level === 'High'; })) html += note('No stock is high-confidence this month. Waiting in cash is a valid choice.');\n  html += renderReplay(R) + renderSim(R) + renderWeights(R) + renderExplore(R);\n  html += secHead('pk.horizon', 'Which holding time looks best');\n  html += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Hold</th><th class=\"wrap\">Method</th><th class=\"wrap\">Top 3</th><th>Confidence</th><th>Unseen extra</th><th>Unseen wins</th></tr></thead><tbody>' +\n    R.horizons.map(function (x) {\n      return '<tr class=\"' + (x.h === h ? 'on' : '') + '\"><th>' + x.h + (x.h === 1 ? ' month' : ' months') + '</th><td class=\"wrap\">' + esc(x.name) + '</td><td class=\"wrap\">' + (x.picks.length ? x.picks.map(function (p) { return esc(p.sym); }).join(', ') : 'Cash') + '</td><td class=\"' + (x.conf === 'High' ? 'good' : (x.conf === 'Medium' ? 'warn' : 'bad')) + '\">' + x.conf + '</td><td class=\"' + tone(x.unseen.meanEx) + '\">' + pc(x.unseen.meanEx, 2, true) + '</td><td>' + pc(x.unseen.hit, 0) + '</td></tr>';\n    }).join('') + '</tbody></table></div>';\n  html += note('Extra means the gain over the average stock in your list, per pick, after costs. A stock that appears in a 2 or 3 month row has a record of doing better when held that long. It is a statistical tilt and not a promise.');\n\n  html += secHead('pk.checks', 'Can you trust this method? ' + M.chk.passes + ' of 5 checks passed');\n  html += '<ul class=\"checks\">' + M.chk.list.map(function (c) { return check(c.st, c.title, c.detail); }).join('') + '</ul>';\n\n  html += secHead('pk.score', 'All methods, same test (hold ' + h + ', buy ' + N + ')');\n  html += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Method</th><th>Wins</th><th>Avg extra</th><th>Unseen extra</th><th>Unseen wins</th><th>Picks that beat list</th><th>Strength</th></tr></thead><tbody>' +\n    R.table.map(function (r) {\n      return '<tr class=\"pick ' + (r.key === M.key ? 'on' : '') + '\" tabindex=\"0\" data-method=\"' + r.key + '\"><th>' + (r.key === M.key ? '● ' : '') + esc(r.short) + '</th><td>' + pc(r.all.hit, 0) + '</td><td class=\"' + tone(r.all.meanEx) + '\">' + pc(r.all.meanEx, 2, true) + '</td><td class=\"' + tone(r.unseen.meanEx) + '\">' + pc(r.unseen.meanEx, 2, true) + '</td><td>' + pc(r.unseen.hit, 0) + '</td><td>' + pc(r.all.pickAcc, 0) + '</td><td>' + num(r.all.t, 2) + '</td></tr>';\n    }).join('') +\n    '<tr><th>Auto-switch method</th><td>–</td><td>–</td><td class=\"' + tone(R.adaptive.meanEx) + '\">' + pc(R.adaptive.meanEx, 2, true) + '</td><td>' + pc(R.adaptive.hit, 0) + '</td><td>–</td><td>' + num(R.adaptive.t, 2) + '</td></tr>' +\n    '</tbody></table></div>';\n  html += note('Auto-switch picks, each month, whichever method had the best record up to that month. It shows what you would have got by choosing a method in real time.');\n  if (R.smart) html += '<p class=\"note\"><b>Smart-weighted now:</b> ' + esc(R.smart.text) + '. ' + esc(R.smart.verdict) + '</p>';\n\n  if (R.candles) {\n    var C = R.candles;\n    html += secHead('pk.candle', 'Do candlestick patterns help?');\n    html += '<p class=\"headline\">' + esc(C.verdict) + '</p>';\n    html += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Method</th><th>Unseen extra</th><th>Unseen wins</th><th>Strength</th></tr></thead><tbody>' +\n      [['Combined', C.base], ['Combined + candles', C.plus]].map(function (x) {\n        return '<tr><th>' + x[0] + '</th><td class=\"' + tone(x[1].unseen.meanEx) + '\">' + pc(x[1].unseen.meanEx, 2, true) + '</td><td>' + pc(x[1].unseen.hit, 0) + '</td><td>' + num(x[1].unseen.t, 2) + '</td></tr>';\n      }).join('') + '</tbody></table></div>';\n    html += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th class=\"wrap\">Pattern</th><th>Cases</th><th>Next month</th><th>Next 3 months</th><th class=\"wrap\">Verdict</th></tr></thead><tbody>' +\n      C.patterns.map(function (q) {\n        return '<tr><th class=\"wrap\">' + esc(q.name) + '</th><td>' + q.n1.toLocaleString('en-IN') + '</td><td class=\"' + tone(q.m1) + '\">' + pc(q.m1, 2, true) + '</td><td class=\"' + tone(q.m3) + '\">' + pc(q.m3, 2, true) + '</td><td class=\"wrap ' + (q.verdict === 'Worked' ? 'good' : (q.verdict === 'Worked backwards' ? 'bad' : '')) + '\">' + esc(q.verdict) + '</td></tr>';\n      }).join('') + '</tbody></table></div>';\n    html += note('Next month and Next 3 months show the average gain over the average stock in your list after each pattern. Bullish patterns should be positive and bearish ones negative to count as working.');\n  } else if (!R.P.hasOHLC && PK_MODE !== 'mom') {\n    html += note('Candlestick tests need Open, High and Low prices. Live prices include them. For CSV files, use files with Open, High, Low and Close columns, such as Yahoo Finance downloads.');\n  }\n\n  html += secHead('pk.chart', 'Growth of 100');\n  html += chart({\n    label: 'Growth of the chosen method compared with the average stock in the list',\n    series: [\n      { name: rec.short, cls: 'c1', pts: R.growth.strat },\n      { name: 'Average stock in your list', cls: 'c2', pts: R.growth.bench }\n    ],\n    ymin: 0, yfmt: function (v) { return v >= 1000 ? (v / 1000).toFixed(v >= 10000 ? 0 : 1) + 'k' : String(Math.round(v)); },\n    xticks: timeTicks(R.growth.strat[0][0], R.growth.strat[R.growth.strat.length - 1][0]),\n    vlines: [{ x: R.growth.split, label: 'unseen' }]\n  });\n  html += note('Do not read this curve as a likely future return. Your list holds today\\u2019s survivors, and compounding over many years makes small edges look huge. Judge the method by the unseen-months numbers and the checks above.');\n\n  html += secHead('pk.log', 'Last 12 months: what it would have picked');\n  html += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Month</th><th class=\"wrap\">Picked</th><th>Result</th><th>List avg</th><th>Beat?</th></tr></thead><tbody>' +\n    R.log.map(function (r) {\n      return '<tr><th>' + r.label + '</th><td class=\"wrap\">' + esc(r.picks.length ? r.picks.join(', ') : 'Cash') + '</td><td class=\"' + tone(r.ret) + '\">' + pc(r.ret, 1, true) + '</td><td>' + pc(r.bench, 1, true) + '</td><td class=\"' + (r.ex > 0 ? 'good' : 'bad') + '\">' + (r.ex > 0 ? 'Yes' : 'No') + '</td></tr>';\n    }).join('') + '</tbody></table></div>';\n\n  html += secHead('pk.weak', 'Weak stocks to review');\n  if (!R.weak.length) html += note('No stock in your list has three or more warning signs right now.');\n  else html += '<ul class=\"checks\">' + R.weak.map(function (w) {\n    return '<li class=\"chk fail\"><span class=\"pill\">Weak</span><span><b>' + esc(w.sym) + '</b><br><span class=\"muted\">' + esc(w.flags.join('. ')) + '.</span></span></li>';\n  }).join('') + '</ul>';\n\n  html += secHead('pk.cloud', 'Daily alerts on your phone (optional)');\n  if (PKS.liveOK) {\n    html += '<div class=\"card cloud\"><p>You are on your own Cloudflare site, so prices load by themselves. For daily phone alerts, add two settings in Cloudflare.</p>' +\n      '<ol class=\"steps\"><li>Open your Worker, then <b>Settings</b>, <b>Variables</b>. Add <b>NTFY_TOPIC</b> with a secret word only you know. Optional: add <b>SITE_URL</b> with this site’s address, so tapping the alert opens it.</li>' +\n      '<li>In <b>Settings</b>, <b>Triggers</b>, add a Cron Trigger: <b>30 10 * * 1-5</b>. That is about 4 pm India time on weekdays.</li>' +\n      '<li>On your phone, install the free <b>ntfy</b> app and subscribe to the same secret word.</li></ol>' +\n      '<p class=\"note\">Alerts use the list in the <b>WATCHLIST</b> variable. If you do not set it, the built-in list of 20 large NSE stocks is used. To alert on a whole index, set <b>INDEX</b> to <i>nifty500</i> and <b>MAX_STOCKS</b> to <i>500</i>. A big list needs the $5 a month Workers plan, because the free plan limits how many prices one run can fetch and how much computing it can do.</p></div>';\n  } else {\n    html += '<div class=\"card cloud\"><p>This preview cannot fetch prices by itself. If you put the worker file I sent on Cloudflare, that site shows this same page and loads live prices on its own, with no CSV files. It can also send a daily alert to your phone.</p>' +\n      '<ol class=\"steps\"><li>Make a free Cloudflare account. Open <b>Workers &amp; Pages</b>, choose <b>Create</b>, then <b>Hello World</b>, then <b>Deploy</b>.</li>' +\n      '<li>Tap <b>Edit code</b>, delete what is there, paste the whole worker file I sent, then <b>Deploy</b>.</li>' +\n      '<li>Open the address Cloudflare gives your Worker. The page loads with live prices.</li>' +\n      '<li>For alerts: in <b>Settings</b>, <b>Variables</b>, add <b>NTFY_TOPIC</b> with a secret word. In <b>Settings</b>, <b>Triggers</b>, add a Cron Trigger <b>30 10 * * 1-5</b>. Install the free <b>ntfy</b> app and subscribe to the same word.</li></ol>' +\n      '<p class=\"note\">Two limits. The free Yahoo price feed can refuse requests from servers, and if so the page says it could not load and you can still use CSV files. The free Cloudflare plan allows very little computing time per run, which only matters for the alert and may need the $5 a month plan.</p></div>';\n  }\n\n  html += '<p class=\"note\">Your list only contains stocks you chose today, so stocks that fell out of favour or stopped trading are missing. That makes past results look better than real-time results would have been. The best of eight methods also looks good by luck some of the time, which is why the unseen months and the random-picks test are shown. This is a screening aid and not investment advice.</p>';\n  return html;\n}\n\nHELP['pk.rfrom'] = 'Pick a start and end date. Picks are made at month-end, so any date inside a month counts from that month. Replay from 1 Sep 2026 tests Sep 2026 using prices up to end of Aug. The current unfinished month cannot be judged yet. The first month you want to replay. For each month from here, the tool picks using only prices up to the month before, then shows what really happened. Replay from Sep 2026 gives just the finished months since then. Replay from Jan 2024 gives every month since. Your price files must reach back that far.';\nHELP['pk.mode'] = 'Momentum only ranks stocks by how much they rose over 12, 6 and 3 months and picks the winners. The downtrend filter keeps out any stock that fell over 6 months or sits below its 10-month average, and holds cash for the month if fewer than 40 percent of your stocks are above their 10-month average. All methods turns the other methods back on.';\nHELP['pk.hc'] = 'Each top stock gets 8 yes or no checks: above its 10-month average, rising over 12, 6 and 3 months, in the top group for 3 months running, calmer than the list median, no sudden jump last month, near its 12-month high, recent prices, and holding up this month. High means 7 or 8 passed, Medium 5 or 6, Low fewer. Only high-confidence mode lists just the High ones, so you may get fewer stocks than you asked for, or none.';\nHELP['pk.exit'] = 'A stock you hold is kept while its rank stays inside this number, and sold only when it falls outside. A higher number means fewer trades. It is raised to at least one more than your stock count. 0 turns it off and swaps picks every month.';\nHELP['pk.rg'] = 'Looks at an equal-weight index of your list. If it closes the month below its average over the chosen months, the portfolio cuts to half or goes to cash for the next month. Off disables it.';\nHELP['pk.sim'] = 'A month-by-month test that keeps your stocks using the exit rank and applies the regime filter, with trading costs on every change. The list average is the grey line.';\nHELP['pk.s.cagr'] = 'Yearly growth if profits were reinvested each month.';\nHELP['pk.s.dd'] = 'The biggest drop from a high point to a later low point.';\nHELP['pk.s.tr'] = 'Total buys and sells. Fewer trades means lower costs.';\nHELP['pk.s.bad'] = 'Months the regime filter said the market was in a downtrend.';\nHELP['pk.r.cagr'] = 'Yearly growth if you bought the picks every month and reinvested everything. Small edges look large when compounded.';\nHELP['pk.r.dd'] = 'The biggest drop from a high point to a later low point, buying the picks each month.';\nHELP['pk.cg'] = 'For every past month the tool rates the top stocks of the chosen method as High, Medium or Low confidence, using the same 8 checks as the current picks, and shows what each group really did that month. If High does not beat Low and the list average over many months, the confidence checks are not adding value.';\nHELP['pk.acc'] = 'Every replayed month, best first. Accurate means the picks beat the average stock in your list that month. Missed means they did worse. The calendar-month table adds up the same months across years, for example every January.';\nHELP['pk.replay'] = 'Each row is one month. The method is chosen using only months that had already finished by then, so nothing peeks ahead. Picked is what the tool would have bought, Result is what those stocks really did over your holding time after costs, List avg is the average stock in your list, and Beat? says whether the picks did better than that average. Accurate here means beat the list average.';\nHELP['pk.r.hit'] = 'Share of replayed months where the picks did better than the average stock in your list. 50 percent is what a coin flip gives.';\nHELP['pk.r.ex'] = 'Average gain over the list average per month, after costs. Positive means the picks beat the list on average.';\nHELP['pk.r.ret'] = 'Average result of the picks per month, after costs, before comparing with anything.';\nHELP['pk.r.cmp'] = 'What 100 rupees would have become by buying the picks each month and reinvesting everything, against the list average done the same way. Only shown for a 1 month hold. Small edges look large when compounded, so do not read it as a forecast.';\nfunction renderSim(R) {\n  var q = R.sim, h = '';\n  if (!q) return '';\n  h += secHead('pk.sim', 'Portfolio test: split, exit rank, stop-loss and regime filter');\n  if (q.err) return h + errBox(q.err);\n  h += '<div class=\"tiles\">' + tile('pk.s.cagr', 'Yearly growth (CAGR)', pc(q.cagr, 1, true), tone(q.cagr), 'List ' + pc(q.bcagr, 1, true)) +\n    tile('pk.s.dd', 'Worst fall', pc(q.dd, 0), 'bad', 'List ' + pc(q.bdd, 0)) + tile('pk.s.tr', 'Trades (buys and sells)', String(q.trades), '', q.n + ' months') +\n    tile('pk.s.bad', 'Months in downtrend mode', String(q.badM), 'warn') +\n    tile('pk.s.stops', 'Stop-loss exits', String(q.stops || 0), '', PK_OPT.sl > 0 ? 'at ' + PK_OPT.sl + '% below buy price' : 'stop-loss off') +\n    tile('pk.s.calmar', 'Growth per unit of fall', num(q.calmar, 2), q.calmar >= 1 ? 'good' : '', 'Yearly growth / worst fall') +\n    tile('pk.s.sharpe', 'Return per risk (Sharpe)', num(q.sharpe, 2), q.sharpe >= 1 ? 'good' : '') + '</div>';\n  h += chart({ label: 'Portfolio test growth compared with the list average', series: [{ name: 'Portfolio test', cls: 'c1', pts: q.pts }, { name: 'Average stock in your list', cls: 'c2', pts: q.bpts }],\n    ymin: 0, yfmt: function (v) { return v >= 1000 ? (v / 1000).toFixed(1) + 'k' : String(Math.round(v)); }, xticks: timeTicks(q.pts[0][0], q.pts[q.pts.length - 1][0]) });\n  return h + note('Holds your chosen number of stocks and keeps each until its rank passes the exit rank. The downtrend check uses an equal-weight index of your list, tested monthly, not the real Nifty index or daily prices.');\n}\nfunction renderReplay(R) {\n  var q = R.replay, h = '';\n  if (!q) return '';\n  h += secHead('pk.replay', 'Month by month: what it picked and what happened');\n  if (q.err) return h + errBox(q.err);\n  var hc = q.hit >= 0.55 ? 'good' : (q.hit >= 0.45 ? 'warn' : 'bad');\n  h += '<p class=\"headline\">Beat the average of your list in <b class=\"' + hc + '\">' + q.beats + ' of ' + q.n + '</b> months (' + pc(q.hit, 0) + '). The picks went up in ' + q.up + ' of ' + q.n + '.</p>';\n  if (q.clamped) h += note('Your prices only allow a fair test from ' + esc(q.firstLabel) + ', so the table starts there.');\n  h += '<div class=\"tiles\">' +\n    tile('pk.r.hit', 'Months it beat the list', pc(q.hit, 0), hc, q.beats + ' of ' + q.n) +\n    (isFinite(q.cagr) ? tile('pk.r.cagr', 'Yearly growth (CAGR)', pc(q.cagr, 1, true), tone(q.cagr), 'List ' + pc(q.bcagr, 1, true)) + tile('pk.r.dd', 'Worst fall', pc(q.dd, 0), 'bad', 'List ' + pc(q.bdd, 0)) : '') +\n    tile('pk.r.ex', 'Average extra a month', pc(q.meanEx, 2, true), tone(q.meanEx)) +\n    tile('pk.r.ret', 'Average pick result', pc(q.meanRet, 2, true), tone(q.meanRet), 'Up in ' + q.up + ' of ' + q.n + ' months') +\n    (isFinite(q.comp) ? tile('pk.r.cmp', 'Reinvested monthly', pc(q.comp, 0, true), tone(q.comp - q.compB), 'List average ' + pc(q.compB, 0, true)) : '') + '</div>';\n  h += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Held</th><th class=\"wrap\">Method</th><th class=\"wrap\">Picked, and what each really did</th><th>Result</th><th>List avg</th><th>Beat?</th></tr></thead><tbody>' +\n    q.rows.map(function (r) {\n      var det = r.det.map(function (d) { return esc(d.sym) + ' <span class=\"' + tone(d.r) + '\">' + pc(d.r, 1, true) + '</span>'; }).join(', ');\n      return '<tr><th>' + esc(r.label) + '</th><td class=\"wrap\">' + esc(r.method) + (r.early ? ' (default)' : '') + '</td><td class=\"wrap\">' + (r.cash ? 'Cash (downtrend, stayed out)' : det) + '</td><td class=\"' + tone(r.ret) + '\">' + pc(r.ret, 1, true) + '</td><td>' + pc(r.bench, 1, true) + '</td><td class=\"' + (r.ex > 0 ? 'good' : 'bad') + '\">' + (r.ex > 0 ? 'Yes ' : 'No ') + pc(r.ex, 1, true) + '</td></tr>';\n    }).join('') + '</tbody></table></div>';\n  if (q.grp) {\n    var G = q.grp, cell = function (c) { return c.n ? '<span class=\"' + tone(c.r) + '\">' + pc(c.r, 1, true) + '</span> (' + c.n + ')' : '-'; };\n    h += secHead('pk.cg', 'High, Medium and Low confidence stocks vs the list average');\n    h += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Group</th><th>Months</th><th>Stocks a month</th><th>Avg result</th><th>List avg</th><th>Beat list</th></tr></thead><tbody>' +\n      ['High', 'Medium', 'Low'].map(function (L) { var g = G[L]; return '<tr><th>' + L + '</th><td>' + g.months + '</td><td>' + g.avgN.toFixed(1) + '</td><td class=\"' + tone(g.avg) + '\">' + (g.months ? pc(g.avg, 2, true) : '-') + '</td><td>' + (g.months ? pc(g.bench, 2, true) : '-') + '</td><td>' + (g.months ? g.beats + ' of ' + g.months : '-') + '</td></tr>'; }).join('') + '</tbody></table></div>';\n    h += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Held</th><th>High</th><th>Medium</th><th>Low</th><th>List avg</th></tr></thead><tbody>' +\n      q.rows.map(function (r) { return '<tr><th>' + esc(r.label) + '</th><td>' + cell(r.grp.High) + '</td><td>' + cell(r.grp.Medium) + '</td><td>' + cell(r.grp.Low) + '</td><td>' + pc(r.bench, 1, true) + '</td></tr>'; }).join('') + '</tbody></table></div>';\n    var H = G.High, Lw = G.Low;\n    if (H.months < 6) h += note('High-confidence stocks appeared in only ' + H.months + ' months, too few to judge.');\n    else if (H.avg > H.bench && H.avg > (isFinite(Lw.avg) ? Lw.avg : -9)) h += note('<b>High-confidence stocks did better:</b> they beat the list in ' + H.beats + ' of ' + H.months + ' months and did better than the Low group. Test other dates before trusting this.');\n    else h += note('<b>High-confidence stocks did not clearly do better</b> than the list or the Low group on these dates, so the checks have not proven useful here.');\n    h += note('Each month it rates the top ' + PK_OPT.cm + ' stocks of the chosen method using only prices up to that month-end, then shows what each group really did next. The number in brackets is how many stocks fell in the group. Results are after costs.');\n  }\n  h += secHead('pk.acc', 'Which months it got right');\n  h += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Month (best first)</th><th>Picks</th><th>List avg</th><th>Extra</th><th>Verdict</th></tr></thead><tbody>' +\n    q.ranked.map(function (r) {\n      return '<tr><th>' + esc(r.label) + '</th><td class=\"' + tone(r.ret) + '\">' + pc(r.ret, 1, true) + '</td><td>' + pc(r.bench, 1, true) + '</td><td class=\"' + tone(r.ex) + '\">' + pc(r.ex, 1, true) + '</td><td class=\"' + (r.ex > 0 ? 'good' : 'bad') + '\">' + (r.ex > 0 ? 'Accurate' : 'Missed') + '</td></tr>';\n    }).join('') + '</tbody></table></div>';\n  if (q.n >= 12 && q.cal.length > 1) {\n    var top = q.cal.filter(function (c) { return c.n >= 2; }).sort(function (x, y) { return (y.sum / y.n) - (x.sum / x.n); })[0];\n    h += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Calendar month</th><th>Times tested</th><th>Beat list</th><th>Avg extra</th></tr></thead><tbody>' +\n      q.cal.map(function (c) { return '<tr><th>' + MONN[c.m] + '</th><td>' + c.n + '</td><td>' + c.beats + ' (' + pc(c.beats / c.n, 0) + ')</td><td class=\"' + tone(c.sum / c.n) + '\">' + pc(c.sum / c.n, 2, true) + '</td></tr>'; }).join('') + '</tbody></table></div>';\n    if (top) h += note('<b>Strongest calendar month:</b> ' + MONN[top.m] + ' (beat the list ' + top.beats + ' of ' + top.n + ' times). With only a few years per month this can easily be luck.');\n  }\n  if (q.years.length > 1) {\n    h += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Year</th><th>Months</th><th>Beat list</th><th>Avg extra</th></tr></thead><tbody>' +\n      q.years.map(function (y) { return '<tr><th>' + y.year + '</th><td>' + y.n + '</td><td>' + y.beats + ' (' + pc(y.beats / y.n, 0) + ')</td><td class=\"' + tone(y.sum / y.n) + '\">' + pc(y.sum / y.n, 2, true) + '</td></tr>'; }).join('') + '</tbody></table></div>';\n  }\n  h += note('Picks are made at the end of the month before, using only earlier prices. Accurate means the picks beat the average stock of your list that month. Each stock\\u2019s own result is before costs; Result is after costs. With a hold of more than 1 month, rows overlap. Your list holds today\\u2019s stocks, so past results look better than real time would have.');\n  return h;\n}\nCOMPUTE.pk = computePK;\nRENDER.pk = renderPK;\n\nfunction pkSymbols() {\n  return $('#pk-symbols').value.split(/[\\s,]+/).map(function (s) { return s.trim().toUpperCase(); }).filter(Boolean);\n}\nfunction pkLiveNote(msg, bad) { var n = $('#pk-live-note'); n.textContent = msg; n.className = 'note' + (bad ? ' bad' : ''); }\nfunction idbOpen() {\n  return new Promise(function (res, rej) {\n    try {\n      var rq = indexedDB.open('bb-picks', 1);\n      rq.onupgradeneeded = function () { rq.result.createObjectStore('kv'); };\n      rq.onsuccess = function () { res(rq.result); };\n      rq.onerror = function () { rej(rq.error); };\n    } catch (e) { rej(e); }\n  });\n}\nfunction idbGet(k) {\n  return idbOpen().then(function (db) {\n    return new Promise(function (res) {\n      var r = db.transaction('kv').objectStore('kv').get(k);\n      r.onsuccess = function () { res(r.result || null); };\n      r.onerror = function () { res(null); };\n    });\n  }).catch(function () { return null; });\n}\nfunction idbSet(k, v) {\n  return idbOpen().then(function (db) {\n    return new Promise(function (res) {\n      var tx = db.transaction('kv', 'readwrite');\n      tx.objectStore('kv').put(v, k);\n      tx.oncomplete = function () { res(); }; tx.onerror = function () { res(); };\n    });\n  }).catch(function () { });\n}\nfunction rowsToStore(stocksObj) {\n  var st = {}, n = 0;\n  Object.keys(stocksObj || {}).forEach(function (sym) {\n    var m = {}, nz = function (x) { return x == null ? NaN : x; };\n    stocksObj[sym].forEach(function (r) { m[r[0]] = [r[1], r[2], nz(r[3]), nz(r[4]), nz(r[5])]; });\n    var nm = sym.replace(/\\.NS$/, ''); if (st[nm]) nm = sym;\n    st[nm] = { m: m }; n++;\n  });\n  return { st: st, n: n };\n}\nfunction pkChunks(a, n) { var o = []; for (var i = 0; i < a.length; i += n) o.push(a.slice(i, i + n)); return o; }\nfunction pkFetchChunk(chunk, tries) {\n  return fetch('/api/prices?src=' + encodeURIComponent(($('#pk-src') || {}).value || 'auto') + '&s=' + encodeURIComponent(chunk.join(','))).then(function (r) {\n    if (!r.ok) { var er = new Error(r.status === 502 ? 'the price source refused the request' : 'HTTP ' + r.status); er.status = r.status; throw er; }\n    return r.json();\n  }).catch(function (e) {\n    if (tries > 0 && e.status !== 404) return new Promise(function (res) { setTimeout(res, 1500); }).then(function () { return pkFetchChunk(chunk, tries - 1); });\n    throw e;\n  });\n}\nfunction pkApplyLive(stocksObj, failed, note) {\n  var r = rowsToStore(stocksObj);\n  if (!r.n) throw new Error('no prices came back');\n  PKS.store = { demo: false, live: true, stocks: r.st };\n  PKS.liveOK = true;\n  pkLiveNote(note.replace('%N', r.n) + (failed && failed.length ? ' No data for ' + failed.length + ' symbols' + (failed.length <= 8 ? ': ' + failed.join(', ') : '') + '.' : ''));\n  pkError(''); RES.pk = null; show('pk', true);\n}\nfunction pkLoadLive(auto, force) {\n  var seen = {}, syms = pkSymbols().filter(function (s) { if (seen[s]) return false; seen[s] = 1; return true; });\n  if (!syms.length) { pkLiveNote('Add at least one symbol first.', true); return Promise.resolve(); }\n  var srcSel = ($('#pk-src') || {}).value || 'auto', key = syms.join(',') + '|' + srcSel, via = {};\n  try { localStorage.setItem(PK_SYM_KEY, syms.join(',')); } catch (e) { }\n  var go = function () {\n    var chunks = pkChunks(syms, 30), idx = 0, done = 0, got = {}, failed = [], firstErr = null;\n    var progress = function () { pkLiveNote('Loading live prices: ' + done + ' of ' + syms.length + ' stocks. Please keep this page open.'); };\n    progress();\n    var next = function () {\n      if (idx >= chunks.length) return Promise.resolve();\n      var c = chunks[idx++];\n      return pkFetchChunk(c, 2).then(function (j) {\n        Object.keys(j.stocks || {}).forEach(function (s) { got[s] = j.stocks[s]; });\n        failed = failed.concat(j.failed || []);\n        Object.keys(j.via || {}).forEach(function (s) { via[s] = j.via[s]; });\n      }, function (e) { if (!firstErr) firstErr = e; failed = failed.concat(c); }).then(function () { done += c.length; progress(); return next(); });\n    };\n    return Promise.all([next(), next(), next()]).then(function () {\n      if (!Object.keys(got).length) throw firstErr || new Error('no prices came back');\n      pkApplyLive(got, failed, 'Live prices loaded for %N stocks.');\n      var vc = {}; Object.keys(via).forEach(function (s) { vc[via[s]] = (vc[via[s]] || 0) + 1; });\n      if (Object.keys(vc).length) pkLiveNote($('#pk-live-note').textContent + ' Source: ' + Object.keys(vc).map(function (k) { return k + ' (' + vc[k] + ')'; }).join(', ') + '.');\n      idbSet('live', { at: Date.now(), key: key, stocks: got, failed: failed });\n    });\n  };\n  var fail = function (e) {\n    return idbGet('live').then(function (rec) {\n      if (rec && rec.stocks && Object.keys(rec.stocks).length) {\n        var days = Math.max(1, Math.round((Date.now() - rec.at) / 86400000));\n        try { pkApplyLive(rec.stocks, rec.failed, 'Live sources are not answering, so the last saved prices for %N stocks are shown (about ' + days + ' day' + (days > 1 ? 's' : '') + ' old). Tap Load live prices to try again.'); return; } catch (x) { }\n      }\n      if (auto && !(e && e.status === 502)) pkLiveNote('Live prices work on your own Cloudflare site. Here, add CSV files or use the example list.');\n      else pkLiveNote('Could not load live prices: ' + (e && e.message ? e.message : 'unknown error') + '. You can still add CSV files, they always work.', true);\n    });\n  };\n  if (auto && !force) {\n    return idbGet('live').then(function (rec) {\n      if (rec && rec.key === key && Date.now() - rec.at < 6 * 3600 * 1000) {\n        var mins = Math.round((Date.now() - rec.at) / 60000);\n        try { pkApplyLive(rec.stocks, rec.failed, 'Prices for %N stocks, saved ' + (mins < 60 ? mins + ' minutes' : Math.round(mins / 60) + ' hours') + ' ago. Tap Load live prices to refresh.'); return; } catch (e) { }\n      }\n      return go().catch(fail);\n    });\n  }\n  return go().catch(fail);\n}\nfunction pkGetList(name) {\n  return fetch('/api/index?name=' + encodeURIComponent(name)).then(function (r) {\n    return r.json().then(function (j) { if (!r.ok || !j.symbols) throw new Error(j && j.error ? j.error : 'HTTP ' + r.status); if (!j.fallback) { try { localStorage.setItem('bb-idx-' + name, JSON.stringify(j)); } catch (e) { } } return j; });\n  }).catch(function (e) {\n    var s = null; try { s = JSON.parse(localStorage.getItem('bb-idx-' + name)); } catch (x) { }\n    if (s && s.symbols && s.symbols.length) { s.fallback = true; return s; }\n    throw e;\n  });\n}\nfunction pkLoadIndex() {\n  var name = $('#pk-index').value, withEtf = $('#pk-etf').checked && name !== 'etf';\n  pkLiveNote('Reading the stock list...');\n  var jobs = [pkGetList(name)];\n  if (withEtf) jobs.push(pkGetList('etf'));\n  Promise.all(jobs).then(function (res) {\n    var seen = {}, all = [];\n    res.forEach(function (j) { j.symbols.forEach(function (s) { if (!seen[s]) { seen[s] = 1; all.push(s); } }); });\n    var fb = res.some(function (j) { return j.fallback; });\n    $('#pk-symbols').value = all.join(', ');\n    pkLiveNote('Found ' + all.length + ' symbols. Loading prices...');\n    return pkLoadLive(false, true).then(function () {\n      if (fb) pkLiveNote($('#pk-live-note').textContent + ' NSE blocked this site\\u2019s server (HTTP 403), so a saved or built-in list of about ' + all.length + ' large NSE stocks was used instead of the full ' + name + '. For the full list, download the constituents CSV from niftyindices.com and add it with Add CSV files.');\n    });\n  }).catch(function (e) {\n    pkLiveNote('Could not get that list: ' + (e && e.message ? e.message : 'unknown error') + '. NSE sometimes blocks the servers this site runs on. Try again in a minute, or pick another index. If it keeps failing, open niftyindices.com, go to Indices, then the index you want, download the constituents CSV, and add it with Add CSV files.', true);\n  });\n}\n\nfunction pkInit() {\n  $('#pk-file').addEventListener('change', function (e) {\n    var fs = Array.prototype.slice.call(e.target.files || []);\n    if (!fs.length) return;\n    pkAddFiles(fs);\n    e.target.value = '';\n  });\n  $('#pk-example').addEventListener('click', function () { PKS.store = { demo: true, stocks: demoUniverse() }; pkError(''); RES.pk = null; show('pk', true); });\n  $('#pk-clear').addEventListener('click', function () {\n    try { localStorage.removeItem(PK_KEY); } catch (e) { }\n    PKS.store = { demo: true, stocks: demoUniverse() }; pkError(''); RES.pk = null; show('pk', true);\n  });\n  var saved = ''; try { saved = localStorage.getItem(PK_SYM_KEY) || ''; } catch (e) { }\n  $('#pk-symbols').value = (saved || PK_DEFAULT_SYMBOLS).split(',').join(', ');\n  $('#pk-live').addEventListener('click', function () { pkLoadLive(false, true); });\n  $('#pk-index-btn').addEventListener('click', pkLoadIndex);\n  if (!pkLoad()) PKS.store = { demo: true, stocks: demoUniverse() };\n  if (/^https?:/.test(location.protocol)) pkLoadLive(true, false);\n  else pkLiveNote('Live prices work on your own Cloudflare site. Here, add CSV files or use the example list.');\n}\n\n/* ===== Explorer: compare methods, stock counts, stop-losses ===== */\nObject.assign(HELP, {\n  'pk.meth': 'Auto picks, for each month, the method with the best record on earlier months. Choose a method yourself to see its picks, month-by-month replay and portfolio test. The methods table below shows how every method did, and tapping a row there selects it too. Pick accuracy is the share of individual picks that beat the average stock in your list.',\n  'pk.w': 'Build your own momentum mix. Each weight says how much that ingredient counts: 12, 6, 3 and 1-month momentum, and low volatility (stocks with smaller monthly price swings). A weight of 0 switches the ingredient off. A negative weight flips it: for example -30 on 1m favors stocks that fell last month, so 30 on 12m and 6m plus -30 on 1m buys long-term winners that just dipped. Choose My own blend in Method to use to see it. The blend also appears in the methods table, so you can compare it with the others.',\n  'pk.sl': 'Sell a stock if its price falls this many percent below your buy price during the month. With monthly data the test uses each month’s lowest price and assumes you sold exactly at the stop. Real sales can be worse when a stock gaps down. It applies to the portfolio test, with a 1 month hold. 0 turns it off.',\n  'pk.explore': 'Turns on two comparison tables. One compares every method for 5, 10, 15 and 20 stocks. The other compares stop-loss levels and exit ranks for the method you chose. Tap any cell to apply it. With 500 stocks this takes several seconds.',\n  'pk.mg': 'Each cell is the average gain over the average stock in your list, per month after costs. The top number uses all months and the bottom number uses only the unseen last 40 percent. Tap a cell to use that method and stock count. Be careful: with so many cells, some look good by luck. Prefer cells that are positive in both numbers.',\n  'pk.sg': 'Each cell shows yearly growth, and below it the worst fall. Rows are stop-loss levels and columns are exit ranks (how long a stock is kept while its rank slips). Green marks best growth and the star marks best growth per unit of fall. Tap a cell to apply it. The best cell here was chosen after seeing the results, so it is an optimistic guide.',\n  'pk.s.stops': 'How many times the stop-loss sold a stock during the test.',\n  'pk.s.calmar': 'Yearly growth divided by the worst fall. Higher means more growth for each bit of pain.',\n  'pk.s.sharpe': 'Average monthly return divided by how much it jumps around, scaled to a year. Above 1 is good.',\n  'pk.src': 'Where live prices come from. Auto tries Yahoo first and then any other source you have added a key for, and also tries the BSE listing if the NSE one is missing. Sources marked key need a free API key saved as a Cloudflare variable. You can always add CSV files from any other source too.'\n});\nfunction renderWeights(R) {\n  var g = R.wgrid;\n  if (!g || !g.length) return '';\n  var N = R.N, best = null, bestC = null;\n  g.forEach(function (x) { if (x.q.err) return; if (!best || x.q.cagr > best.q.cagr) best = x; if (isFinite(x.q.calmar) && (!bestC || x.q.calmar > bestC.q.calmar)) bestC = x; });\n  var o = secHead('pk.wm', 'How the split of money changes the result (' + N + ' stocks)');\n  o += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Split</th><th>Yearly growth</th><th>Worst fall</th><th>Growth per fall</th><th>If you invest 1,00,000</th></tr></thead><tbody>' +\n    g.map(function (x) {\n      if (x.q.err) return '<tr><th>' + esc(x.name) + '</th><td colspan=\"4\">' + esc(x.q.err) + '</td></tr>';\n      var fin = 100000 * Math.pow(1 + x.q.cagr, x.q.n / 12);\n      return '<tr class=\"pick ' + (x.id === PK_WM ? 'on' : '') + '\" tabindex=\"0\" data-wm=\"' + x.id + '\"><th class=\"wrap\">' + (x === best ? '● ' : '') + (x === bestC ? '★ ' : '') + esc(x.name) + '</th><td class=\"' + tone(x.q.cagr) + '\">' + pc(x.q.cagr, 1, true) + '</td><td class=\"bad\">' + pc(x.q.dd, 0) + '</td><td>' + num(x.q.calmar, 2) + '</td><td>' + Math.round(fin).toLocaleString('en-IN') + '</td></tr>';\n    }).join('') + '</tbody></table></div>';\n  var cw = g.filter(function (x) { return x.w; });\n  var wl = (g.filter(function (x) { return x.id === PK_WM && x.w; })[0] || cw[0]);\n  if (wl) o += note('Split used by \"' + esc(wl.name) + '\": ' + wl.w.map(function (v, i) { return (i + 1) + ': ' + Math.round(v * 1000) / 10 + '%'; }).join(', ') + '. ● best growth, ★ best growth per fall. Tap a row to use it. Each month the money is moved to match the new ranking, and costs are charged on the money that moves. One test period only, so small differences may be luck.');\n  return o;\n}\nfunction renderExplore(R) {\n  var h = secHead('pk.explore', 'Explorer: compare methods and stop-losses');\n  if (!R.mgrid) {\n    return h + '<p class=\"note\">Compare every method for 5, 10, 15 and 20 stocks, and test stop-loss and exit levels. Tap a cell to apply it.</p><div class=\"row\"><button type=\"button\" class=\"btn\" id=\"pk-run-explore\">Run the explorer</button></div>';\n  }\n  var N = R.N, o = h + secHead('pk.mg', 'Methods and number of stocks (avg extra a month)');\n  var cands = [];\n  R.mgrid.forEach(function (r) { GRID_N.forEach(function (n) { var c = r.cells[n]; if (c && c.unseen.n >= 12 && c.all.n >= 24) cands.push({ r: r, n: n, c: c }); }); });\n  cands.sort(function (a, b) { return b.c.unseen.meanEx - a.c.unseen.meanEx; });\n  o += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Method</th>' + GRID_N.map(function (n) { return '<th>' + n + ' stocks</th>'; }).join('') + '</tr></thead><tbody>' +\n    R.mgrid.map(function (r) {\n      return '<tr><th>' + esc(r.short) + '</th>' + GRID_N.map(function (n) {\n        var c = r.cells[n];\n        if (!c) return '<td>–</td>';\n        var on = r.key === R.main.key && n === N;\n        return '<td class=\"pick ' + (on ? 'on' : '') + '\" tabindex=\"0\" data-gm=\"' + r.key + '\" data-gn=\"' + n + '\"><span class=\"' + tone(c.all.meanEx) + '\">' + pc(c.all.meanEx, 2, true) + '</span><br><span class=\"' + tone(c.unseen.meanEx) + '\">' + pc(c.unseen.meanEx, 2, true) + '</span></td>';\n      }).join('') + '</tr>';\n    }).join('') + '</tbody></table></div>';\n  if (cands.length) {\n    o += note('<b>Top by unseen months:</b> ' + cands.slice(0, 3).map(function (x) { return esc(x.r.short) + ' with ' + x.n + ' stocks (' + pc(x.c.unseen.meanEx, 2, true) + ' unseen, ' + pc(x.c.all.pickAcc, 0) + ' of picks beat the list)'; }).join('; ') + '. Top number in each cell is all months, bottom is unseen months. Many cells were tried, so some look good by luck.');\n  }\n  var G = R.sgrid;\n  if (G) {\n    o += secHead('pk.sg', 'Stop-loss and exit rank for ' + N + ' stocks (yearly growth, worst fall)');\n    o += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Stop-loss</th>' + G.exits.map(function (e) { return '<th>' + (e ? 'Exit rank ' + Math.max(e, N + 1) : 'No exit rank') + '</th>'; }).join('') + '</tr></thead><tbody>' +\n      G.rows.map(function (r) {\n        return '<tr><th>' + (r.sl ? r.sl + '%' : 'Off') + '</th>' + r.cells.map(function (c) {\n          if (c.q.err) return '<td>–</td>';\n          var isB = G.best && G.best.sl === r.sl && G.best.ex === c.ex, isC = G.bestCalmar && G.bestCalmar.sl === r.sl && G.bestCalmar.ex === c.ex;\n          var on = r.sl === PK_OPT.sl && c.ex === (PK_OPT.exit > 0 ? Math.max(PK_OPT.exit, N + 1) : 0);\n          return '<td class=\"pick ' + (on ? 'on' : '') + '\" tabindex=\"0\" data-gsl=\"' + r.sl + '\" data-gex=\"' + c.ex + '\"><span class=\"' + (isB ? 'good' : tone(c.q.cagr)) + '\">' + (isB ? '● ' : '') + (isC ? '★ ' : '') + pc(c.q.cagr, 1, true) + '</span><br><span class=\"bad\">' + pc(c.q.dd, 0) + '</span> <span class=\"muted\">' + (c.q.stops || 0) + ' stops</span></td>';\n        }).join('') + '</tr>';\n      }).join('') + '</tbody></table></div>';\n    if (G.best) o += note('<b>Best growth:</b> stop-loss ' + (G.best.sl ? G.best.sl + '%' : 'off') + ' with ' + (G.best.ex ? 'exit rank ' + Math.max(G.best.ex, N + 1) : 'no exit rank') + ' (' + pc(G.best.q.cagr, 1, true) + ' a year, worst fall ' + pc(G.best.q.dd, 0) + (G.bestCalmar ? '). <b>Best growth per fall:</b> stop-loss ' + (G.bestCalmar.sl ? G.bestCalmar.sl + '%' : 'off') + ' with ' + (G.bestCalmar.ex ? 'exit rank ' + Math.max(G.bestCalmar.ex, N + 1) : 'no exit rank') + ' (' + pc(G.bestCalmar.q.cagr, 1, true) + ', fall ' + pc(G.bestCalmar.q.dd, 0) + ')' : ')') + '. ● best growth, ★ best growth per fall. Monthly data: stops use each month’s low and assume you sell exactly at the stop, so real results will be a bit worse.');\n  }\n  return o;\n}\ndocument.addEventListener('click', function (e) {\n  var set = function (id, v) { var el = $('#' + id); if (el) el.value = v; };\n  var b = e.target.closest('#pk-run-explore');\n  if (b) { set('pk-explore', 'on'); schedule(); return; }\n  var wmr = e.target.closest('tr[data-wm]');\n  if (wmr) { set('pk-wm', wmr.dataset.wm); schedule(); return; }\n  var m = e.target.closest('tr[data-method]');\n  if (m) { set('pk-meth', m.dataset.method); schedule(); return; }\n  var g = e.target.closest('td[data-gm]');\n  if (g) { set('pk-meth', g.dataset.gm); set('pk-n', g.dataset.gn); schedule(); return; }\n  var t = e.target.closest('td[data-gsl]');\n  if (t) { set('pk-sl', t.dataset.gsl); set('pk-exit', t.dataset.gex); schedule(); }\n});\ndocument.addEventListener('keydown', function (e) {\n  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('td.pick')) { e.preventDefault(); e.target.click(); }\n});\nvar PK_SRC_NAMES = { auto: 'Auto (try every ready source)', yahoo: 'Yahoo Finance', twelvedata: 'Twelve Data', eodhd: 'EODHD', fmp: 'Financial Modeling Prep', alphavantage: 'Alpha Vantage' };\nfunction pkSourcesInit() {\n  var sel = $('#pk-src'), note = $('#pk-src-note');\n  if (!sel) return;\n  var fill = function (st) {\n    sel.innerHTML = Object.keys(PK_SRC_NAMES).map(function (k) {\n      var s = st && st[k], label = PK_SRC_NAMES[k] + (k !== 'auto' && s && !s.ready ? ' (needs key)' : '');\n      return '<option value=\"' + k + '\">' + esc(label) + '</option>';\n    }).join('');\n    if (st) {\n      var ready = Object.keys(st).filter(function (k) { return st[k].ready; }).map(function (k) { return st[k].label; });\n      note.textContent = 'Ready: ' + ready.join(', ') + '. To add more, save a free key as a Cloudflare variable: ' + Object.keys(st).filter(function (k) { return st[k].env; }).map(function (k) { return st[k].env; }).join(', ') + '.';\n    } else note.textContent = 'Source choice works on your own Cloudflare site. Here, add CSV files from any source.';\n  };\n  fill(null);\n  if (/^https?:/.test(location.protocol)) fetch('/api/sources').then(function (r) { return r.ok ? r.json() : null; }).then(function (j) { if (j) fill(j); }, function () { });\n}\npkSourcesInit();\n\n\n/* ===== Hide/show sections, remove stocks, filter on/off compare, buy plan ===== */\nvar COLL = {}, PX = {}, SCANREQ = false, LASTSCAN = null, FINDREQ = false, LASTFIND = null;\ntry { COLL = JSON.parse(localStorage.getItem('pk-coll') || '{}') || {}; PX = JSON.parse(localStorage.getItem('pk-px') || '{}') || {}; var ex0 = JSON.parse(localStorage.getItem('pk-excl') || '[]') || []; ex0.forEach(function (x) { PK_EXCL[x] = 1; }); } catch (e) { }\nfunction saveLS(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }\nfunction collapsify(el, defHide) {\n  if (!el || !el.children) return;\n  var kids = Array.prototype.slice.call(el.children), cur = null, i;\n  for (i = 0; i < kids.length; i++) {\n    var c = kids[i];\n    if (c.classList && c.classList.contains('sec-head')) {\n      var body = document.createElement('div'); body.className = 'sec-body';\n      el.insertBefore(body, c.nextSibling); cur = body;\n      var hd = c.querySelector('h2,h3'), t = hd ? hd.textContent : '';\n      var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'tg'; btn.setAttribute('data-tg', t);\n      c.appendChild(btn);\n      var hid = COLL[t] !== undefined ? !!COLL[t] : (defHide ? !/^(Your plan|Strategy finder|Growth of your money|Year by year|This month|Month by month: what to sell|Buy plan)/.test(t) : false); body.hidden = hid; btn.textContent = hid ? 'Show' : 'Hide'; btn.setAttribute('aria-expanded', hid ? 'false' : 'true');\n    } else if (cur) { cur.appendChild(c); }\n  }\n}\nfunction collapseCards() {\n  $$('.card').forEach(function (c) { if (c.firstElementChild && c.firstElementChild.classList.contains('sec-head') && !c.dataset.cz) { c.dataset.cz = '1'; collapsify(c); } });\n}\nfunction setTg(tg, hide) {\n  var head = tg.closest('.sec-head'), body = head && head.nextElementSibling;\n  if (!body || !body.classList.contains('sec-body')) return;\n  body.hidden = hide; tg.textContent = hide ? 'Show' : 'Hide'; tg.setAttribute('aria-expanded', hide ? 'false' : 'true');\n  COLL[tg.getAttribute('data-tg')] = hide ? 1 : 0;\n}\nfunction renderExcl() {\n  var ks = Object.keys(PK_EXCL);\n  if (!ks.length) return '<p class=\"note\">Tap ✕ next to a stock to remove it. The next-ranked stock takes its place.</p>';\n  return '<div class=\"chips\">' + ks.map(function (k) { return '<button type=\"button\" class=\"xchip\" data-unex=\"' + esc(k) + '\">' + esc(k) + ' removed · tap to bring back</button>'; }).join('') + '</div>';\n}\nfunction renderCompare(R) {\n  var h = secHead('pk.cmp', 'Top ' + R.N + ': downtrend filter ON and OFF');\n  var c = R.cmp;\n  if (!c) return h + note('This method has no downtrend filter. Choose a Momentum mix or My own blend under Method to use to compare.');\n  var N = R.N, both = c.on.filter(function (x) { return c.off.indexOf(x) >= 0; }), onlyOn = c.on.filter(function (x) { return c.off.indexOf(x) < 0; }), onlyOff = c.off.filter(function (x) { return c.on.indexOf(x) < 0; }), rows = [], i;\n  for (i = 0; i < N; i++) {\n    var a = c.on[i], b = c.off[i];\n    rows.push('<tr><th>' + (i + 1) + '</th><td class=\"' + (a && both.indexOf(a) >= 0 ? 'good' : '') + '\">' + (a ? esc(a) : (i === 0 ? 'Cash (filter says stay out)' : '–')) + '</td><td class=\"' + (b && both.indexOf(b) >= 0 ? 'good' : '') + '\">' + (b ? esc(b) : '–') + '</td></tr>');\n  }\n  return h + '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Rank</th><th>Filter ON</th><th>Filter OFF</th></tr></thead><tbody>' + rows.join('') + '</tbody></table></div>' +\n    note('<b>In both (' + both.length + '):</b> ' + (both.map(esc).join(', ') || 'none') + '.<br><b>Only with filter ON:</b> ' + (onlyOn.map(esc).join(', ') || 'none') + '.<br><b>Only with filter OFF:</b> ' + (onlyOff.map(esc).join(', ') || 'none') + '. Green stocks are in both lists, so they are the safest to buy whichever way you decide. The filter ON list is empty when too few stocks are above their 10-month average.');\n}\nfunction renderPlan(R) {\n  var h = secHead('pk.plan', 'Buy plan: fill prices and see the possibilities');\n  var N = R.N, ps = R.picks.slice(0, N);\n  if (!ps.length) return h + note('No stocks to buy this month, so there is no plan.');\n  var w = weightsFor(PK_WM, N) || ps.map(function () { return 1 / N; });\n  var amt = val('pk-money', 100000, 0), sl = PX._sl === undefined ? 10 : PX._sl;\n  var o = h + '<div class=\"plan-in\"><label>Money to invest<input id=\"plan-amt\" type=\"number\" inputmode=\"decimal\" value=\"' + amt + '\" min=\"0\"></label><label>Stop-loss %<input id=\"plan-sl\" type=\"number\" inputmode=\"decimal\" value=\"' + sl + '\" min=\"0\" max=\"90\"></label><button type=\"button\" class=\"btn ghost\" id=\"plan-reset\">Reset prices</button></div>';\n  o += '<div class=\"scroll\"><table class=\"tbl\" id=\"plan-tbl\"><thead><tr><th>Stock</th><th>Share</th><th>Buy price</th><th>Shares</th><th>Cost</th><th>Stop price</th><th>Loss at stop</th><th>Gain at +10%</th><th>Gain at +20%</th></tr></thead><tbody>' +\n    ps.map(function (p, i) {\n      var px = PX[p.sym] !== undefined ? PX[p.sym] : (isFinite(p.price) ? Math.round(p.price * 100) / 100 : '');\n      return '<tr data-plan=\"' + esc(p.sym) + '\" data-w=\"' + (w[i] || 0) + '\" data-last=\"' + (isFinite(p.price) ? Math.round(p.price * 100) / 100 : '') + '\"><th>' + (i + 1) + '. ' + esc(p.sym) + '<button type=\"button\" class=\"xbtn\" data-ex=\"' + esc(p.sym) + '\" aria-label=\"Remove ' + esc(p.sym) + '\">✕</button></th><td>' + Math.round((w[i] || 0) * 1000) / 10 + '%</td><td><input class=\"px-in\" type=\"number\" inputmode=\"decimal\" step=\"any\" value=\"' + px + '\" aria-label=\"Buy price for ' + esc(p.sym) + '\"></td><td class=\"c-sh\">–</td><td class=\"c-cost\">–</td><td class=\"c-stop\">–</td><td class=\"c-loss bad\">–</td><td class=\"c-g10 good\">–</td><td class=\"c-g20 good\">–</td></tr>';\n    }).join('') + '<tr><th>Total</th><td>100%</td><td>–</td><td>–</td><td id=\"t-cost\">–</td><td>–</td><td id=\"t-loss\" class=\"bad\">–</td><td id=\"t-g10\" class=\"good\">–</td><td id=\"t-g20\" class=\"good\">–</td></tr></tbody></table></div>';\n  o += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>If every stock moves</th><th>-20%</th><th>-10%</th><th>-5%</th><th>+5%</th><th>+10%</th><th>+20%</th><th>+30%</th></tr></thead><tbody><tr><th>Portfolio value</th>' + [-20, -10, -5, 5, 10, 20, 30].map(function (x) { return '<td class=\"sc\" data-x=\"' + x + '\">–</td>'; }).join('') + '</tr></tbody></table></div>';\n  o += note('Prices start at the latest price in your data. Type the price you can really buy at and everything updates. Shares are rounded down to whole shares, and money left over stays as cash. The stop price is a percent below your buy price. Removing a stock (✕) makes the next-ranked stock take its place. The split of money follows the \"Money in each stock\" setting.');\n  return o;\n}\nfunction planCalc() {\n  var tb = $('#plan-tbl'); if (!tb) return;\n  var amt = parseFloat(($('#plan-amt') || {}).value), sl = parseFloat(($('#plan-sl') || {}).value);\n  if (!isFinite(amt) || amt < 0) amt = 0; if (!isFinite(sl) || sl < 0) sl = 0;\n  PX._amt = amt; PX._sl = sl;\n  var f = function (v) { return Math.round(v).toLocaleString('en-IN'); }, tc = 0, tl = 0, t10 = 0, t20 = 0;\n  $$('#plan-tbl tr[data-plan]').forEach(function (tr) {\n    var px = parseFloat(tr.querySelector('.px-in').value), w = parseFloat(tr.dataset.w) || 0, money = amt * w;\n    var set = function (c, v) { var e = tr.querySelector(c); if (e) e.textContent = v; };\n    if (!(px > 0)) { ['.c-sh', '.c-cost', '.c-stop', '.c-loss', '.c-g10', '.c-g20'].forEach(function (c) { set(c, '–'); }); return; }\n    PX[tr.dataset.plan] = px;\n    var sh = Math.floor(money / px), cost = sh * px, stop = px * (1 - sl / 100), loss = sh * (stop - px);\n    tc += cost; tl += loss; t10 += cost * 0.1; t20 += cost * 0.2;\n    set('.c-sh', String(sh)); set('.c-cost', f(cost)); set('.c-stop', (Math.round(stop * 100) / 100).toLocaleString('en-IN')); set('.c-loss', sl > 0 ? '-' + f(Math.abs(loss)) : '–'); set('.c-g10', '+' + f(cost * 0.1)); set('.c-g20', '+' + f(cost * 0.2));\n  });\n  var st = function (id, v) { var e = $('#' + id); if (e) e.textContent = v; };\n  st('t-cost', f(tc)); st('t-loss', sl > 0 ? '-' + f(Math.abs(tl)) : '–'); st('t-g10', '+' + f(t10)); st('t-g20', '+' + f(t20));\n  var cash = amt - tc;\n  $$('#out-pk td.sc').forEach(function (td) { var x = parseFloat(td.dataset.x); td.textContent = f(cash + tc * (1 + x / 100)); td.className = 'sc ' + (x < 0 ? 'bad' : 'good'); });\n  saveLS('pk-px', PX);\n}\nObject.assign(HELP, {\n  'pk.chg': 'Shows what you would do at each month-end: which stocks left the top ranks (sell), which entered (buy) and which stay. It uses your replay dates, so changing the dates changes this table. With Exit rank set above 0, a stock is kept until its rank falls below that number, which means fewer trades. With 0, you hold exactly the current top stocks.',\n  'pk.conf': 'Every stock gets 8 quick checks (above its 10-month average, rising over 12, 6 and 3 months, steady top ranking, calm price swings and so on). Medium means 5 or more passed, High means 7 or more including above-average trend. With Medium and high only, low-confidence stocks are skipped and the next-ranked stock that passes takes the spot. The month-by-month replay, portfolio test and methods table follow the same rule. If fewer than your chosen number of stocks pass, the rest of the money stays in cash.',\n  'pk.fbr': 'The downtrend filter has two parts. First, each stock must be rising over 6 months and above its own 10-month average. Second, if fewer than this share of all stocks in your list are above their 10-month average, the whole market is treated as weak and nothing is bought (cash). In weak markets this is why the filter often shows no stocks. Lower the share, or choose Never, to keep buying the best stocks that still pass the first part.',\n  'pk.cmp': 'Shows the top picks twice: with the downtrend filter ON (only stocks above their trend, and cash when the market is weak) and OFF (no filter). Stocks that appear in both lists are marked green. They are the ones both views agree on. It works for the Momentum mixes and My own blend.',\n  'pk.plan': 'Type the price you can buy each stock at, and your total money. It shows how many shares you can buy, what you would lose if the stop-loss hits, what you gain at +10% and +20%, and what the whole portfolio is worth if every stock moves by a given percent. It is a what-if calculator. It is not a forecast.'\n});\ndocument.addEventListener('click', function (e) {\n  var tg = e.target.closest('.tg');\n  if (tg) { setTg(tg, !(tg.textContent === 'Show')); saveLS('pk-coll', COLL); return; }\n  var all = e.target.closest('[data-tgall]');\n  if (all) { $$('#out-pk .tg').forEach(function (b) { setTg(b, all.dataset.tgall === '1'); }); saveLS('pk-coll', COLL); return; }\n  var ex = e.target.closest('[data-ex]');\n  if (ex) { PK_EXCL[ex.dataset.ex] = 1; saveLS('pk-excl', Object.keys(PK_EXCL)); schedule(); return; }\n  var un = e.target.closest('[data-unex]');\n  if (un) { delete PK_EXCL[un.dataset.unex]; saveLS('pk-excl', Object.keys(PK_EXCL)); schedule(); return; }\n  if (e.target.closest('#plan-reset')) { Object.keys(PX).forEach(function (k) { if (k[0] !== '_') delete PX[k]; }); saveLS('pk-px', PX); $$('#plan-tbl tr[data-plan]').forEach(function (tr) { tr.querySelector('.px-in').value = tr.dataset.last; }); planCalc(); }\n});\ndocument.addEventListener('input', function (e) {\n  if (e.target.closest && (e.target.closest('.px-in') || e.target.id === 'plan-amt' || e.target.id === 'plan-sl')) planCalc();\n});\n\nfunction renderChanges(R) {\n  var C = R.changes, h = secHead('pk.chg', 'Month by month: what to sell and what to buy');\n  if (!C || !C.rows.length) return h + note('No months to show in your replay dates.');\n  var N = C.N, P = R.P, rows = C.rows.slice().reverse();\n  var o = h + '<p class=\"headline\">On average ' + (isFinite(C.avgBuy) ? num(C.avgBuy, 1) : '–') + ' of your ' + N + ' stocks changed each month.</p>';\n  o += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Decide at end of</th><th class=\"wrap\">Sell (dropped out)</th><th class=\"wrap\">Buy (new in top ' + N + ')</th><th class=\"wrap\">Top ' + N + ' to hold</th><th>Next month</th></tr></thead><tbody>' +\n    rows.map(function (r) {\n      return '<tr class=\"' + (r.now ? 'on' : '') + '\"><th>' + esc(r.label) + (r.now ? '<br><span class=\"muted\">latest: your next action</span>' : '') + '</th><td class=\"wrap bad\">' + (r.sell.length ? r.sell.map(esc).join(', ') : '–') + '</td><td class=\"wrap good\">' + (r.buy.length ? r.buy.map(esc).join(', ') : '–') + '</td><td class=\"wrap\">' + (r.cash ? 'Cash' : r.picks.map(esc).join(', ')) + '</td><td class=\"' + tone(r.ret) + '\">' + (isFinite(r.ret) ? pc(r.ret, 1, true) : '–') + '</td></tr>';\n    }).join('') + '</tbody></table></div>';\n  o += note('Each row is one month-end. Sell the stocks listed in red, buy the ones in green, and keep the rest. The first row of your range buys the whole list. Next month is the average gain of that top ' + N + ' (before costs) over the following month. The top picks section above always shows the latest month in your data, so it does not change when you change the replay dates. This table shows how the list changes through your dates. It follows your settings for stocks allowed, filter, and exit rank.');\n  return o;\n}\nfunction scanWin(P, w) { return monthLabel(P, w.k0) + ' to ' + monthLabel(P, w.k1 + 1); }\nfunction renderScan(R) {\n  var h = secHead('pk.scan', 'Auto-scan: best dates, filter ON or OFF, and split of money');\n  var sc = R.scan, stale = false, P = R.P;\n  if (!sc && LASTSCAN) { sc = LASTSCAN.s; P = LASTSCAN.P; stale = true; }\n  var btn = '<div class=\"row\"><button type=\"button\" class=\"btn\" id=\"pk-run-scan\">Run auto-scan</button></div>';\n  if (!sc) return h + note('Set the scan dates and holding length in the settings above (Auto-scan from, to, and Holding length), then tap Run auto-scan. It tests every holding window of that length between your dates, once with the downtrend filter ON and once OFF.') + btn;\n  if (sc.err) return h + errBox(sc.err) + btn;\n  var N = sc.N, o = h + btn;\n  if (stale) o += note('This is the result of your last scan. Settings may have changed since, so tap Run auto-scan to refresh.');\n  var A = sc.states[0], B = sc.states[1], two = !!B, L = sc.L, yrs = L / 12;\n  var vt = two ? (sc.winner === 'tie' ? 'It is a tie: ON and OFF each won about the same number of measures.' : 'Filter ' + sc.winner.toUpperCase() + ' did better on ' + sc.votes[sc.winner] + ' of ' + sc.votes.total + ' measures.') : 'This method has no downtrend filter, so there is only one result. Choose a Momentum mix or My own blend to compare ON and OFF.';\n  o += '<p class=\"headline\">' + esc(vt) + '</p>';\n  o += note('Tested ' + A.agg.n + ' windows of ' + yrs + (yrs === 1 ? ' year' : ' years') + ' each, starting every month from ' + monthLabel(P, 0 + (A.first - P.lo)) + ' to ' + monthLabel(P, A.last - P.lo) + '. Medians are the typical window, so they are more reliable than the single best one.');\n  var cols = sc.states.map(function (s) { return '<th>' + esc(s.label) + '</th>'; }).join('');\n  var row = function (name, f) { return '<tr><th class=\"wrap\">' + name + '</th>' + sc.states.map(function (s) { return '<td>' + f(s.agg) + '</td>'; }).join('') + '</tr>'; };\n  o += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Typical window</th>' + cols + '</tr></thead><tbody>' +\n    row('Windows that beat the list', function (g) { return pc(g.beat, 0); }) +\n    row('Yearly growth (list)', function (g) { return '<span class=\"' + tone(g.medCagr) + '\">' + pc(g.medCagr, 1, true) + '</span> (' + pc(g.medB, 1, true) + ')'; }) +\n    row('Worst fall (list)', function (g) { return '<span class=\"bad\">' + pc(g.medDD, 0) + '</span> (' + pc(g.medBDD, 0) + ')'; }) +\n    row('Months beating the list', function (g) { return pc(g.medWin, 0); }) +\n    row('Average extra a month', function (g) { return '<span class=\"' + tone(g.medEx) + '\">' + pc(g.medEx, 2, true) + '</span>'; }) +\n    '</tbody></table></div>';\n  var bestRow = function (name, k, f) { return '<tr><th class=\"wrap\">' + name + '</th>' + sc.states.map(function (s) { var w = s.agg.best[k]; return '<td class=\"wrap\">' + esc(scanWin(P, w)) + '<br>' + f(w) + '</td>'; }).join('') + '</tr>'; };\n  o += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Best dates (looking back)</th>' + cols + '</tr></thead><tbody>' +\n    bestRow('Best yearly growth', 'cagr', function (w) { return '<span class=\"good\">' + pc(w.cagr, 1, true) + '</span> (list ' + pc(w.bcagr, 1, true) + ')'; }) +\n    bestRow('Most months beating the list', 'win', function (w) { return pc(w.win, 0) + ' of months'; }) +\n    bestRow('Smallest worst fall', 'fall', function (w) { return '<span class=\"bad\">' + pc(w.dd, 0) + '</span> (list ' + pc(w.bdd, 0) + ')'; }) +\n    bestRow('Best average extra a month', 'ex', function (w) { return pc(w.ex, 2, true); }) +\n    bestRow('Best all-round', 'all', function (w) { return pc(w.cagr, 1, true) + ' a year, fall ' + pc(w.dd, 0) + ', ' + pc(w.win, 0) + ' months won'; }) +\n    '</tbody></table></div>';\n  o += note('Best all-round ranks every window on growth, months won, worst fall and extra a month, and takes the best combined rank. The best windows are only known looking back, so use them to see what was possible, not as a promise.');\n  o += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Holding length</th>' + sc.states.map(function (s) { return '<th>' + esc(s.label) + '<br><span class=\"muted\">beat list · median growth</span></th>'; }).join('') + '</tr></thead><tbody>' +\n    sc.byLen.map(function (r) {\n      return '<tr class=\"' + (r.L === L ? 'on' : '') + '\"><th>' + (r.L / 12) + (r.L === 12 ? ' year' : ' years') + '</th>' + sc.states.map(function (s) { var x = r.st[s.id]; return '<td>' + (x ? pc(x.beat, 0) + ' · <span class=\"' + tone(x.medCagr) + '\">' + pc(x.medCagr, 1, true) + '</span>' : '–') + '</td>'; }).join('') + '</tr>';\n    }).join('') + '</tbody></table></div>';\n  /* suggested split */\n  var amt = PX._amt || 100000, best = sc.schemes.filter(function (x) { return x.id === sc.bestScheme; })[0];\n  var syms = sc.picks ? (sc.useId === 'on' ? sc.picks.on : sc.picks.off) : R.picks.slice(0, N).map(function (p) { return p.sym; });\n  o += secHead('pk.scanw', 'Suggested split of your money (' + sc.useLabel + ')');\n  if (best) {\n    o += '<p class=\"headline\">Best split: <b>' + esc(best.name) + '</b></p>';\n    o += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Rank</th><th>Stock</th><th>Share</th><th>Of ₹' + Math.round(amt).toLocaleString('en-IN') + '</th></tr></thead><tbody>' +\n      best.w.map(function (w, i) { return '<tr><th>' + (i + 1) + '</th><td>' + (syms[i] ? esc(syms[i]) : '–') + '</td><td>' + Math.round(w * 1000) / 10 + '%</td><td>' + Math.round(amt * w).toLocaleString('en-IN') + '</td></tr>'; }).join('') + '</tbody></table></div>';\n    if (!syms.length) o += note('With the ' + esc(sc.useLabel) + ' setting there are no stocks to buy this month, so keep the money in cash.');\n    o += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Split</th><th>Median growth per fall</th><th>Median growth</th><th>Median worst fall</th></tr></thead><tbody>' +\n      sc.schemes.map(function (x) { return '<tr class=\"' + (x.id === sc.bestScheme ? 'on' : '') + '\"><th>' + (x.id === sc.bestScheme ? '● ' : '') + esc(x.name) + '</th><td>' + num(x.medCalmar, 2) + '</td><td class=\"' + tone(x.medCagr) + '\">' + pc(x.medCagr, 1, true) + '</td><td class=\"bad\">' + pc(x.medDD, 0) + '</td></tr>'; }).join('') + '</tbody></table></div>';\n    o += note('The best split is the one with the most growth for each bit of fall in the typical window. Differences between splits are usually small, so if they are close, equal money is a safe choice. This uses the same settings as above (exit rank, stop-loss, regime filter) and one past period, so it is a guide and not a promise.');\n  }\n  return o;\n}\nObject.assign(HELP, {\n  'pk.scan': 'Tests every holding window of the length you choose between the two scan dates (for example every 3-year stretch), once with the downtrend filter ON and once OFF. The typical (median) window shows which setting is better in general. The best-dates table shows the best stretch for growth, months won, smallest fall and extra a month. It uses your chosen method, stock count, costs and settings. Tap Run auto-scan to start.',\n  'pk.scanw': 'Tries five ways of splitting your money across the top ranks (equal, and four tilts toward the top ranks) in every window, and shows the one with the most growth per unit of fall. Use it for the filter setting that did better.'\n});\ndocument.addEventListener('click', function (e) {\n  if (e.target.closest('#pk-run-scan')) { SCANREQ = true; schedule(); }\n});\n\nfunction renderPlanTop(R) {\n  var Pl = R.plan, P = R.P, N = R.N, M = R.main, o = '';\n  var rec = SIGS.filter(function (g) { return g.key === M.key; })[0];\n  o += secHead('pl.sum', 'Your plan: result if you had followed it');\n  if (!Pl || Pl.err) return o + errBox(Pl ? Pl.err : 'Not enough data for the plan.') + renderChanges(R) + renderPlan(R);\n  var q = Pl.q, money = val('pk-money', 100000, 0), mult = q.pts[q.pts.length - 1][1] / 100, bmult = q.bpts[q.bpts.length - 1][1] / 100, yrs = Pl.n / 12;\n  var asked = ($('#pk-from') || {}).value || '';\n  o += '<p class=\"headline\">' + inr(money) + ' from <b>' + esc(Pl.startLabel) + '</b> to <b>' + esc(Pl.endLabel) + '</b> (' + num(yrs, 1) + ' years) would have become <b class=\"' + tone(mult - 1) + '\">' + inr(money * mult) + '</b>. Holding your whole list equally would have given ' + inr(money * bmult) + '.</p>';\n  o += '<div class=\"tiles\">' + tile('pl.cagr', 'Yearly growth (CAGR)', pc(q.cagr, 1, true), tone(q.cagr), 'List ' + pc(q.bcagr, 1, true)) +\n    tile('pl.fall', 'Worst fall', pc(q.dd, 0), 'bad', 'List ' + pc(q.bdd, 0)) +\n    tile('pl.win', 'Months it beat the list', pc(Pl.wins / Pl.n, 0), Pl.wins / Pl.n >= 0.5 ? 'good' : 'warn', Pl.wins + ' of ' + Pl.n) +\n    tile('pl.trades', 'Stocks changed per month', num(q.trades / Pl.n / 2, 1), '', 'about, of ' + N + ' held') + '</div>';\n  o += note('Method: ' + esc(rec.name) + '. Each month-end the stocks are re-ranked. Stocks that stay in the top ' + N + ' are kept, stocks that drop out are sold and replaced by the ones that moved in. Your start date uses that month. Prices are monthly, so buying is taken at the start of the month and selling at its end. Costs are included at ' + num(val('pk-cost', 0.25, 0, 5), 2) + '% a trade. Taxes are not included.');\n  var mm = /^(\\d{4})-(\\d{2})/.exec(asked);\n  if (mm && (+mm[1]) * 12 + (+mm[2]) - 1 < Pl.startAbs) o += note('Your start date is earlier than the first month the tool can use (your price data or the 12 months of history it needs start later), so the plan starts in ' + esc(Pl.startLabel) + '.');\n  o += secHead('pl.chart', 'Growth of your money');\n  var sc = function (pts) { return pts.map(function (x) { return [x[0], x[1] * money / 100]; }); };\n  o += chart({ label: 'Your money with the plan compared with the average stock in your list', series: [{ name: 'Your plan', cls: 'c1', pts: sc(q.pts) }, { name: 'Average stock in your list', cls: 'c2', pts: sc(q.bpts) }], ymin: 0,\n    yfmt: function (v) { return v >= 10000000 ? (v / 10000000).toFixed(1) + 'Cr' : (v >= 100000 ? (v / 100000).toFixed(1) + 'L' : (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : String(Math.round(v)))); }, xticks: timeTicks(q.pts[0][0], q.pts[q.pts.length - 1][0]) });\n  o += secHead('pl.years', 'Year by year');\n  o += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Year</th><th>Your plan</th><th>List</th><th>Extra</th></tr></thead><tbody>' +\n    Pl.years.map(function (y) { return '<tr><th>' + y.y + (y.n < 12 ? ' <span class=\"muted\">(' + y.n + ' months)</span>' : '') + '</th><td class=\"' + tone(y.ret) + '\">' + pc(y.ret, 1, true) + '</td><td class=\"' + tone(y.bench) + '\">' + pc(y.bench, 1, true) + '</td><td class=\"' + tone(y.ret - y.bench) + '\">' + pc(y.ret - y.bench, 1, true) + '</td></tr>'; }).join('') + '</tbody></table></div>';\n  o += note(Pl.years.filter(function (y) { return y.n >= 12 && y.ret >= 0.3; }).length + ' of ' + Pl.years.filter(function (y) { return y.n >= 12; }).length + ' full years reached +30% or more, and ' + Pl.years.filter(function (y) { return y.n >= 12 && y.ret < 0; }).length + ' were negative. Years with fewer than 12 months are partial.');\n  var last = R.changes && R.changes.rows[R.changes.rows.length - 1];\n  o += secHead('pl.now', 'This month: what to sell and buy now');\n  if (last) {\n    o += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Action</th><th class=\"wrap\">Stocks</th></tr></thead><tbody><tr><th>Sell</th><td class=\"wrap bad\">' + (last.sell.length ? last.sell.map(esc).join(', ') : 'nothing') + '</td></tr><tr><th>Buy</th><td class=\"wrap good\">' + (last.buy.length ? last.buy.map(esc).join(', ') : 'nothing') + '</td></tr><tr><th>Keep</th><td class=\"wrap\">' + (last.keep.length ? last.keep.map(esc).join(', ') : 'nothing') + '</td></tr></tbody></table></div>' +\n      note('Do this at the end of the month (the last trading day, for example Friday), and hold the new list until the end of next month. This assumes you followed the plan from your start date. If you are starting fresh now, buy all of: ' + (last.picks.length ? last.picks.map(esc).join(', ') : 'no stocks, stay in cash') + '.');\n  }\n  return o + renderPlan(R) + renderChanges(R);\n}\nObject.assign(HELP, {\n  'pl.start': 'Pick the date you would first buy, for example the first week of a month. The tool uses that month: it ranks the stocks with prices up to the end of the month before, buys the top stocks at the start of the month, and swaps stocks at each month-end. If your price data starts later than your date, or there is not enough history for the 12-month signal, it starts at the earliest possible month and says so.',\n  'pl.money': 'Your starting amount, only used to show results in rupees and to size the buy plan.',\n  'pl.sum': 'The result of following the monthly plan from your start date to the latest month in your data, after trading costs and before taxes.',\n  'pl.cagr': 'Average yearly growth, with profits reinvested. The list figure is what equal money in every stock in your list would have given.',\n  'pl.fall': 'The biggest drop from a peak to a later low, using month-end values. Falls within a month can be larger.',\n  'pl.win': 'Months where your plan earned more than the average stock in your list.',\n  'pl.trades': 'Roughly how many of your stocks are swapped each month.',\n  'pl.chart': 'Your starting money growing month by month, compared with equal money in every stock in your list.',\n  'pl.years': 'Calendar-year results for your plan and for the list. Years with fewer than 12 months are partial.',\n  'pl.now': 'What to do at the latest month-end, if you have followed the plan so far.'\n});\n\nfunction renderFinder(R) {\n  var h = secHead('pk.find', 'Strategy finder: best strategy for your period');\n  var F = R.find, stale = false;\n  if (!F && LASTFIND) { F = LASTFIND; stale = true; }\n  var btn = '<div class=\"row\"><button type=\"button\" class=\"btn\" id=\"pk-run-find2\">Find best strategy</button></div>';\n  if (!F) return h + note('Set the finder dates (from and to) and goal in the settings, then tap Find best strategy. It tries hundreds of formulas on that period (12, 6, 3 and 1-month momentum with plus and minus, momentum per unit of price swings, calm stocks, with the downtrend filter on and off) and shows which beat your list with a smaller fall.') + btn;\n  if (F.err) return h + errBox(F.err) + btn;\n  var P = R.P, N = R.N, o = h + btn;\n  if (stale) o += note('This is the result of your last search. Tap Find best strategy again if you changed settings.');\n  var lbl = function (ab) { return MONTH_NAMES[ab % 12] + ' ' + Math.floor(ab / 12); };\n  o += '<p class=\"headline\">' + (F.haveOk ? 'Best: <b>' + esc(F.top[0].name) + '</b>, filter ' + (F.top[0].filt ? 'ON' : 'OFF') + '. It grew ' + pc(F.top[0].cagr, 1, true) + ' a year against the list\\'s ' + pc(F.top[0].bcagr, 1, true) + ', with a worst fall of ' + pc(F.top[0].dd, 0) + ' against ' + pc(F.top[0].bdd, 0) + '.' : 'No strategy beat the list with a smaller fall in this period. The closest ones are shown below.') + '</p>';\n  o += note('Tested ' + F.tested + ' strategies (' + F.months + ' months, ' + lbl(F.sA) + ' to ' + lbl(F.sB) + ', ' + N + ' stocks). Beat the list with a smaller fall: <b>' + F.off.ok + ' of ' + F.off.n + '</b> with the filter OFF and <b>' + F.on.ok + ' of ' + F.on.n + '</b> with it ON. ' + (F.on.ok === F.off.ok ? 'The filter made no difference in how many qualified.' : (F.on.ok > F.off.ok ? 'More strategies qualified with the filter ON.' : 'More strategies qualified with the filter OFF.')));\n  o += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th class=\"wrap\">Strategy</th><th>Filter</th><th>Growth (list)</th><th>Worst fall (list)</th><th>Months won</th><th class=\"wrap\">Afterwards, to latest data</th></tr></thead><tbody>' +\n    F.top.map(function (r) {\n      var fw = [r.w.m12, r.w.m6, r.w.m3, r.w.m1, r.w.lv, r.w.v12, r.w.v6, r.w.v3, r.filt].join(',');\n      var af = r.after ? '<span class=\"' + (r.after.cagr > r.after.bcagr ? 'good' : 'bad') + '\">' + pc(r.after.cagr, 1, true) + '</span> (list ' + pc(r.after.bcagr, 1, true) + ')<br><span class=\"muted\">fall ' + pc(r.after.dd, 0) + ' (list ' + pc(r.after.bdd, 0) + ')</span>' : '–';\n      return '<tr class=\"pick\" tabindex=\"0\" data-fw=\"' + fw + '\"><th class=\"wrap\">' + esc(r.name) + '</th><td>' + (r.filt ? 'ON' : 'OFF') + '</td><td><span class=\"' + tone(r.cagr) + '\">' + pc(r.cagr, 1, true) + '</span> (' + pc(r.bcagr, 1, true) + ')</td><td><span class=\"bad\">' + pc(r.dd, 0) + '</span> (' + pc(r.bdd, 0) + ')</td><td>' + pc(r.win, 0) + '</td><td class=\"wrap\">' + af + '</td></tr>';\n    }).join('') + '</tbody></table></div>';\n  if (F.grid && F.grid.g) {\n    var G = F.grid.g, curEx = PK_OPT.exit > 0 ? Math.max(PK_OPT.exit, N + 1) : 0;\n    o += '<p class=\"headline\">Stop-loss and exit rank for the best strategy (' + esc(F.grid.name) + ', filter ' + (F.grid.filt ? 'ON' : 'OFF') + ')</p>';\n    o += '<div class=\"scroll\"><table class=\"tbl\"><thead><tr><th>Stop-loss</th>' + G.exits.map(function (e) { return '<th>' + (e ? 'Exit rank ' + Math.max(e, N + 1) : 'No exit rank') + '</th>'; }).join('') + '</tr></thead><tbody>' +\n      G.rows.map(function (r) {\n        return '<tr><th>' + (r.sl ? r.sl + '%' : 'Off') + '</th>' + r.cells.map(function (c) {\n          if (c.q.err) return '<td>–</td>';\n          var isB = G.best && G.best.sl === r.sl && G.best.ex === c.ex, isC = G.bestCalmar && G.bestCalmar.sl === r.sl && G.bestCalmar.ex === c.ex, on = r.sl === PK_OPT.sl && c.ex === curEx;\n          return '<td class=\"pick ' + (on ? 'on' : '') + '\" tabindex=\"0\" data-gsl=\"' + r.sl + '\" data-gex=\"' + c.ex + '\"><span class=\"' + (isB ? 'good' : tone(c.q.cagr)) + '\">' + (isB ? '● ' : '') + (isC ? '★ ' : '') + pc(c.q.cagr, 1, true) + '</span><br><span class=\"bad\">' + pc(c.q.dd, 0) + '</span> <span class=\"muted\">list ' + pc(c.q.bdd, 0) + '</span></td>';\n        }).join('') + '</tr>';\n      }).join('') + '</tbody></table></div>';\n    o += note('Each cell: yearly growth, then worst fall (list fall beside it). ● best growth, ★ best growth per fall. The highlighted cell is your current setting. Tap a cell to use it. Stops use each month\\'s lowest price and measure from your buy price, so real stops can be a bit worse.');\n  }\n  var good = F.top.filter(function (r) { return r.after && r.after.cagr > r.after.bcagr; }).length, withAf = F.top.filter(function (r) { return r.after; }).length;\n  if (withAf) o += note('<b>Afterwards</b> shows how each top strategy did from the end of your period to the latest data, which the search never saw. ' + good + ' of ' + withAf + ' still beat the list. When the Afterwards column is worse than the list, the strategy was probably just lucky in your period.');\n  o += note('Tap a row to put that strategy into My own blend and see its full plan. Hundreds of strategies were tried, so the best one in any period is partly luck. Trust a strategy more if it also works in the Afterwards column and in other periods you try. Weights shown with + favor stocks that rose over that period, and − favor stocks that fell. Per risk means the gain divided by the stock\\'s monthly price swings.');\n  return o;\n}\nObject.assign(HELP, {\n  'pk.find': 'Tries hundreds of ways to rank stocks on the period you choose: 12, 6, 3 and 1-month gains (favoring risers with + or fallers with −), the same gains divided by price swings, calm stocks, and mixes of two or three of them, each with the downtrend filter ON and OFF. It keeps the ones that beat your list with a smaller worst fall and ranks them by your goal. It uses your stock count, cost, exit rank, stop-loss and money split settings. Taking up to a minute is normal.'\n});\ndocument.addEventListener('click', function (e) {\n  if (e.target.closest('#pk-run-find') || e.target.closest('#pk-run-find2')) { FINDREQ = true; schedule(); return; }\n  var r = e.target.closest('tr[data-fw]');\n  if (r) {\n    var v = r.dataset.fw.split(',').map(parseFloat), ids = ['pk-w12', 'pk-w6', 'pk-w3', 'pk-w1', 'pk-wv', 'pk-wx12', 'pk-wx6', 'pk-wx3', 'pk-wf'];\n    ids.forEach(function (id, i) { var el = $('#' + id); if (el) el.value = v[i]; });\n    var m = $('#pk-meth'); if (m) m.value = 'custom';\n    schedule();\n  }\n});\n\ninit();\ntry { collapseCards(); } catch (e) { }\n\n\n</script>\n";
/* ===== Picker engine: monthly stock ranking with walk-forward tests. Pure functions, no DOM. ===== */
function pkRng(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    var t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function pkGauss(r) {
  var u = 0, v = 0;
  while (!u) u = r();
  while (!v) v = r();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
function mean(a) { var s = 0; for (var i = 0; i < a.length; i++) s += a[i]; return a.length ? s / a.length : NaN; }
function sdev(a) {
  if (a.length < 2) return NaN;
  var m = mean(a), s = 0;
  for (var i = 0; i < a.length; i++) s += (a[i] - m) * (a[i] - m);
  return Math.sqrt(s / (a.length - 1));
}

var PK_MODE = 'mom';
var MOMKEYS = { dip: 1, momf: 1, mixm: 1, mixv: 1, mixlv: 1, custom: 1, v12: 1, v6: 1, v3: 1, mom1: 1, mom12: 1, mom6: 1, mom3: 1 };
function isMom(k) { return !!MOMKEYS[k]; }
var PK_FORCE = '', PK_FILTOV = '', PK_EXCL = {}, PK_MINCONF = 'any', PK_BREADTH = 0.4;
function scKey(key, k) { return key + '|' + k + (key === 'custom' ? '|' + wSig() : '') + (PK_FILTOV ? '|' + PK_FILTOV : '') + '|b' + PK_BREADTH; }
function medVol(P, S, k) {
  P._vm = P._vm || {};
  if (P._vm[k] !== undefined) return P._vm[k];
  var vols = [], n = P.syms.length, i;
  for (i = 0; i < n; i++) { var vv = -S.lowvol[i][k]; if (isFinite(vv)) vols.push(vv); }
  vols.sort(function (a, b) { return a - b; });
  return (P._vm[k] = vols.length ? vols[Math.floor((vols.length - 1) / 2)] : NaN);
}
function confOk(level) { return PK_MINCONF === 'any' || (PK_MINCONF === 'med' && level !== 'Low') || (PK_MINCONF === 'high' && level === 'High'); }
function selFilter(P, S, key, k, order, N) {
  var kk = key === 'smart' ? 'combo' : key, out = [], i;
  for (i = 0; i < order.length && out.length < N; i++) if (confOk(stockConf(P, S, kk, order[i], k, i + 1).level)) out.push(order[i]);
  return out;
}
function pickIdx(P, S, key, k, sc, N) {
  if (PK_MINCONF === 'any') return topIdx(sc, N);
  var ord = topIdx(sc, Math.min(sc.length, N * 5 + 30));
  return selFilter(P, S, key, k, ord, N);
}
var PK_WM = 'equal', PK_WLIST = '25,20,10,10,10,5,5,5,5,5';
var WSCHEMES = [['equal', 'Equal money in each'], ['linear', 'More in higher ranks (steady slope)'], ['heavy', 'Much more in the top ranks'], ['custom', 'My own amounts by rank']];
function normW(a) {
  var t = a.reduce(function (x, y) { return x + y; }, 0);
  return t > 0 ? a.map(function (x) { return x / t; }) : null;
}
function weightsFor(mode, N) {
  var i, a = [];
  if (mode === 'linear') { for (i = 0; i < N; i++) a.push(N - i); return normW(a); }
  if (mode === 'heavy') {
    if (N === 10) return normW([25, 20, 10, 10, 10, 5, 5, 5, 5, 5]);
    for (i = 0; i < N; i++) a.push(Math.pow(N - i, 2));
    return normW(a);
  }
  if (mode === 'harm') { for (i = 0; i < N; i++) a.push(1 / (i + 1)); return normW(a); }
  if (mode === 'sqrt') { for (i = 0; i < N; i++) a.push(1 / Math.sqrt(i + 1)); return normW(a); }
  if (mode === 'custom') {
    a = String(PK_WLIST || '').split(/[\s,;]+/).map(parseFloat).filter(function (x) { return isFinite(x) && x >= 0; });
    while (a.length < N) a.push(0);
    return normW(a.slice(0, N));
  }
  return null;
}
var PK_W = { m12: 60, m6: 0, m3: 0, m1: -100, lv: 0, filt: 0, v12: 0, v6: 0, v3: 0 };
function wSig() { return [PK_W.m12, PK_W.m6, PK_W.m3, PK_W.m1, PK_W.lv, PK_W.filt, PK_W.v12 || 0, PK_W.v6 || 0, PK_W.v3 || 0].join('_'); }
function elig(E) { return PK_MODE === 'mom' ? E.sigs.filter(function (g) { return isMom(g.key); }) : E.sigs; }
function defKey() { return PK_MODE === 'mom' ? 'momf' : 'combo'; }
var PK_OPT = { exit: 0, rg: 'none', rgL: 10, hc: 'all', cm: 15, sl: 0 };
function rankAt(P, S, key, k, s) {
  var kk = key === 'smart' ? 'combo' : key, sc = scoresAt(P, S, kk, k), id = scKey(kk, k);
  P._rkc = P._rkc || {};
  var rk = P._rkc[id];
  if (!rk) {
    var idx = [], i;
    for (i = 0; i < sc.length; i++) if (isFinite(sc[i])) idx.push(i);
    idx.sort(function (x, y) { return sc[y] - sc[x]; });
    rk = new Array(sc.length).fill(Infinity);
    idx.forEach(function (q, j) { rk[q] = (j > 0 && sc[q] === sc[idx[j - 1]]) ? rk[idx[j - 1]] : j + 1; });
    P._rkc[id] = rk;
  }
  return rk[s];
}
function stockConf(P, S, key, s, k, rank) {
  var info = stockInfo(P, S, s, k), c = P.closes[s], pass = [], fail = [], n = P.syms.length, i;
  var thr = Math.max(10, Math.ceil(n * 0.2)), med = medVol(P, S, k);
  var hi = -Infinity; for (i = k - 11; i <= k; i++) if (c[i] > hi) hi = c[i];
  var cur = k === P.kSig, chk = function (ok, y, no) { (ok ? pass : fail).push(ok ? y : no); };
  chk(info.trend > 0, 'above its 10-month average', 'below its 10-month average');
  chk(info.mom12 > 0 && info.mom6 > 0 && info.mom3 > 0, 'rising over 12, 6 and 3 months', 'not rising over all of 12, 6 and 3 months');
  chk(rank <= thr && rankAt(P, S, key, k - 1, s) <= thr && rankAt(P, S, key, k - 2, s) <= thr, 'in the top ' + thr + ' for 3 months running', 'not in the top ' + thr + ' in each of the last 3 months');
  chk(isFinite(med) && info.vol <= med, 'price swings below the list median', 'price swings above the list median');
  chk(!(info.r1 > 0.2), 'no sudden jump last month', 'jumped ' + (info.r1 * 100).toFixed(0) + '% last month, so it may be chasing');
  chk(isFinite(hi) && c[k] / hi - 1 >= -0.1, 'within 10% of its 12-month high', 'more than 10% below its 12-month high');
  chk(!(cur && info.stale), 'has recent prices', 'no recent prices');
  chk(!(cur && isFinite(info.since) && info.since < -0.05), 'holding up this month', 'down ' + (Math.abs(info.since) * 100).toFixed(0) + '% since month-end');
  return { level: (pass.length >= 7 && info.trend > 0 && !(cur && info.stale)) ? 'High' : (pass.length >= 5 ? 'Medium' : 'Low'), pass: pass, fail: fail };
}
function confGroups(P, S, key, k, h, cost) {
  var kk = key === 'smart' ? 'combo' : key, order = topIdx(scoresAt(P, S, kk, k), PK_OPT.cm), g = { High: [], Medium: [], Low: [] }, o = {};
  order.forEach(function (s, i) { var f = fwd(P, s, k, h); if (isFinite(f)) g[stockConf(P, S, kk, s, k, i + 1).level].push(f - cost / 100); });
  ['High', 'Medium', 'Low'].forEach(function (L) { var a = g[L]; o[L] = { n: a.length, r: a.length ? a.reduce(function (x, y) { return x + y; }, 0) / a.length : NaN }; });
  return o;
}
function portSim(P, S, key, N, exitRank, cost, rg, rgL, startKey, endKey, sl, wts) {
  var K = P.K, n = P.syms.length, idx = new Array(K).fill(NaN), k, s, i, kk = key === 'smart' ? 'combo' : key;
  sl = sl || 0;
  idx[0] = 100;
  for (k = 1; k < K; k++) { var sm = 0, ct = 0; for (s = 0; s < n; s++) { var a = P.closes[s][k], b = P.closes[s][k - 1]; if (isFinite(a) && isFinite(b) && b > 0) { sm += a / b - 1; ct++; } } idx[k] = idx[k - 1] * (1 + (ct ? sm / ct : 0)); }
  var kf = 12; while (kf < P.kSig && breadthAt(P, S, kf) < minBreadth(P)) kf++;
  var kFrom = Math.max(isFinite(startKey) ? startKey - 1 - P.lo : kf, kf), held = [], expo = 1, rows = [], buys = 0, sells = 0, badM = 0, stops = 0, ent = {}, prevW = {};
  P._ord = P._ord || {};
  for (k = kFrom; k <= P.kSig - 1; k++) {
    if (isFinite(endKey) && P.lo + k + 1 > endKey) break;
    var oid = kk + '|' + k + (kk === 'custom' ? '|' + wSig() : '') + (PK_FILTOV ? '|' + PK_FILTOV : ''), order = P._ord[oid] || (P._ord[oid] = topIdx(scoresAt(P, S, kk, k), n)), rankOf = {};
    if (PK_MINCONF !== 'any') order = selFilter(P, S, kk, k, order.slice(0, Math.max(exitRank, N) * 3 + 20), Infinity);
    for (i = 0; i < order.length; i++) rankOf[order[i]] = i + 1;
    var bad = false;
    if (rg !== 'none' && k >= rgL - 1) { var av = 0; for (i = k - rgL + 1; i <= k; i++) av += idx[i]; bad = idx[k] < av / rgL; }
    var tgt = exitRank > 0 ? held.filter(function (x) { return rankOf[x] && rankOf[x] <= exitRank; }).slice(0, N) : [];
    for (i = 0; i < order.length && tgt.length < N; i++) if (tgt.indexOf(order[i]) < 0) tgt.push(order[i]);
    var cur = held, nb = tgt.filter(function (x) { return cur.indexOf(x) < 0; }).length, ns = cur.filter(function (x) { return tgt.indexOf(x) < 0; }).length;
    var ex = bad ? (rg === 'cash' ? 0 : 0.5) : 1; if (bad) badM++;
    var nent = {}, g = 0, stopped = 0, keep = [], newW = {}, turn = 0, wStop = 0;
    if (wts) tgt.sort(function (x, y) { return (rankOf[x] || 1e9) - (rankOf[y] || 1e9); });
    tgt.forEach(function (x, pos) {
      var wi = wts ? (wts[pos] || 0) : 1 / N, c0 = P.closes[x][k], e0 = (cur.indexOf(x) >= 0 && ent[x]) ? ent[x] : c0, f = fwd(P, x, k, 1), ret = f;
      if (!isFinite(f)) { keep.push(x); nent[x] = e0; newW[x] = wi; return; }
      if (sl > 0) {
        var lw = P.lows[x][k + 1], lo2 = isFinite(lw) ? lw : P.closes[x][k + 1], lvl = e0 * (1 - sl / 100);
        if (isFinite(lo2) && lo2 <= lvl) { g += wi * (lvl / c0 - 1); stopped++; wStop += wi; return; }
      }
      g += wi * ret; keep.push(x); nent[x] = e0; newW[x] = wi * (1 + ret);
    });
    var denom = 1 + g;
    keep.forEach(function (x) { newW[x] = wts ? newW[x] / denom : 1 / N; });
    var tw = {};
    tgt.forEach(function (x, pos) { tw[x] = wts ? (wts[pos] || 0) : 1 / N; });
    Object.keys(tw).forEach(function (x) { turn += Math.abs(tw[x] - (prevW[x] || 0)); });
    Object.keys(prevW).forEach(function (x) { if (tw[x] === undefined) turn += prevW[x]; });
    var bm = benchAt(P, k, 1).m;
    rows.push({ k: k, ret: ex * g - cost / 100 * 0.5 * turn * ex - cost / 100 * 0.5 * wStop * ex - cost / 100 * Math.abs(ex - expo) * (tgt.length / N), bench: isFinite(bm) ? bm : 0 });
    prevW = newW;
    held = keep; ent = nent; expo = ex;
    buys += nb; sells += ns + stopped; stops += stopped;
  }
  var nR = rows.length;
  if (nR < 3) return { err: 'Too few months for the portfolio test. Move the start date earlier.' };
  var eq = 1, be = 1, pk = 1, bpk = 1, dd = 0, bdd = 0, pts = [[monthTime(P, kFrom), 100]], bpts = [[monthTime(P, kFrom), 100]], rets = [];
  rows.forEach(function (r) { eq *= 1 + r.ret; be *= 1 + r.bench; rets.push(r.ret); pk = Math.max(pk, eq); bpk = Math.max(bpk, be); dd = Math.min(dd, eq / pk - 1); bdd = Math.min(bdd, be / bpk - 1); pts.push([monthTime(P, r.k + 1), eq * 100]); bpts.push([monthTime(P, r.k + 1), be * 100]); });
  var sd = sdev(rets), cagr = Math.pow(eq, 12 / nR) - 1;
  return { n: nR, cagr: cagr, bcagr: Math.pow(be, 12 / nR) - 1, dd: dd, bdd: bdd, trades: buys + sells, badM: badM, stops: stops, calmar: dd < 0 ? cagr / Math.abs(dd) : NaN, sharpe: sd > 0 ? mean(rets) / sd * Math.sqrt(12) : NaN, pts: pts, bpts: bpts, rows: rows };
}
var SIGS = [
  { key: 'momf', name: 'Momentum + downtrend filter', short: 'Momentum + filter', about: 'Ranks stocks by 12, 6 and 3-month momentum. Only stocks with a positive 6-month return and a price above their 10-month average qualify. If fewer than 40% of your stocks are above their 10-month average, it holds cash.' },
  { key: 'combo', name: 'Combined score', short: 'Combined', about: 'Averages the rank of 12-month momentum, 6-month momentum, return per risk and trend, and drops stocks below their 10-month average.' },
  { key: 'smart', name: 'Smart-weighted', short: 'Smart-weighted', about: 'Each month, weights every ingredient by how well it worked on earlier months only, then ranks stocks on the weighted mix.' },
  { key: 'mixm', name: 'Momentum mix: 12m + 6m + 3m + 1m', short: 'Mix 12/6/3/1', about: 'Averages the rank of 12, 6, 3 and 1-month momentum, with the downtrend filter.' },
  { key: 'dip', name: 'Strong 12m/6m, dipped last month', short: 'Strong then dipped', about: 'Buys stocks that rose over 12 and 6 months but fell most in the last month: a long-term winner on a short pause. Uses the downtrend filter.' },
  { key: 'mixv', name: 'Momentum mix, risk-adjusted', short: 'Mix risk-adj', about: 'Averages the rank of 12, 6 and 3-month momentum each divided by the stock’s monthly price swings, so steady climbers beat wild ones.' },
  { key: 'mixlv', name: 'Momentum mix + low volatility', short: 'Mix + low vol', about: 'Averages the rank of 12, 6 and 3-month momentum and adds the calmest-stocks rank as a fourth ingredient.' },
  { key: 'custom', name: 'My own blend (weights below)', short: 'My blend', about: 'Your own mix of 12m, 6m, 3m and 1m momentum and low volatility, using the weights you set. Weights of 0 switch an ingredient off.' },
  { key: 'v12', name: '12-month momentum per risk', short: '12m per risk', about: '12-month gain (skipping last month) divided by monthly price swings.' },
  { key: 'v6', name: '6-month momentum per risk', short: '6m per risk', about: '6-month gain (skipping last month) divided by monthly price swings.' },
  { key: 'v3', name: '3-month momentum per risk', short: '3m per risk', about: '3-month gain divided by monthly price swings.' },
  { key: 'mom1', name: '1-month momentum', short: '1m momentum', about: 'Buys what rose most in the last month. Short-term winners often give some back, so check how this one does.' },
  { key: 'mom12', name: '12-month momentum', short: '12m momentum', about: 'Buys what rose most over the last year, skipping the most recent month.' },
  { key: 'mom6', name: '6-month momentum', short: '6m momentum', about: 'Buys what rose most over the last six months, skipping the most recent month.' },
  { key: 'mom3', name: '3-month momentum', short: '3m momentum', about: 'Buys what rose most over the last three months.' },
  { key: 'trend', name: 'Above its 10-month average', short: 'Trend', about: 'Buys the stocks sitting furthest above their 10-month average price.' },
  { key: 'riskadj', name: 'Return per risk', short: 'Return per risk', about: 'Buys the best six-month gain compared with how much the price swings.' },
  { key: 'lowvol', name: 'Low swings', short: 'Low swings', about: 'Buys the steadiest stocks, the ones whose monthly price swings are smallest.' },
  { key: 'rev', name: 'Last month’s losers', short: 'Bounce back', about: 'Buys the stocks that fell most last month, betting on a bounce.' },
  { key: 'clv', name: 'Closing strength (candles)', short: 'Close strength', candle: true, about: 'Buys the stocks that closed near the top of their monthly price range over the last three months.' },
  { key: 'candle', name: 'Candlestick patterns', short: 'Candle patterns', candle: true, about: 'Scores bullish patterns (engulfing, hammer, strong close) up and bearish patterns down on the latest monthly candle.' },
  { key: 'combo_c', name: 'Combined + candles', short: 'Combined + candles', candle: true, about: 'The combined score with closing strength added as a fifth ingredient.' }
];
function sigsFor(P) { return SIGS.filter(function (g) { return !g.candle || P.hasOHLC; }); }
var PATTERNS = [
  { key: 'bull_engulf', name: 'Bullish engulfing', bull: true },
  { key: 'hammer', name: 'Hammer after a fall', bull: true },
  { key: 'strong_up', name: 'Strong up month (closes in top fifth)', bull: true },
  { key: 'bear_engulf', name: 'Bearish engulfing', bull: false },
  { key: 'shoot', name: 'Shooting star after a rise', bull: false },
  { key: 'strong_down', name: 'Strong down month (closes in bottom fifth)', bull: false }
];
var MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/* ---------- monthly store ---------- */
function monthKeyOf(t) { var d = new Date(t); return d.getUTCFullYear() * 12 + d.getUTCMonth(); }
function toMonthMap(t, c, o, h, l) {
  var m = {};
  for (var i = 0; i < t.length; i++) {
    var k = monthKeyOf(t[i]);
    var has = o && isFinite(o[i]) && isFinite(h[i]) && isFinite(l[i]);
    var e = m[k];
    if (!e) { m[k] = [c[i], t[i], has ? o[i] : NaN, has ? h[i] : NaN, has ? l[i] : NaN]; continue; }
    if (has && isFinite(e[2])) { if (h[i] > e[3]) e[3] = h[i]; if (l[i] < e[4]) e[4] = l[i]; }
    else if (has && !isFinite(e[2])) { e[2] = o[i]; e[3] = h[i]; e[4] = l[i]; }
    if (t[i] >= e[1]) { e[0] = c[i]; e[1] = t[i]; }
  }
  return m;
}
var PK_VER = 0, PK_CACHE = { stocks: null, ver: -1, P: null, S: null };
function mergeInto(stocks, sym, map) {
  PK_VER++;
  var s = stocks[sym] || (stocks[sym] = { m: {} });
  for (var k in map) {
    var o = s.m[k];
    if (!o || map[k][1] >= o[1]) s.m[k] = map[k];
  }
}

function buildPanel(stocks) {
  var syms = Object.keys(stocks).filter(function (s) { return Object.keys(stocks[s].m).length >= 2; }).sort();
  if (!syms.length) return null;
  var lo = Infinity, hi = -Infinity, last = 0;
  syms.forEach(function (s) {
    for (var k in stocks[s].m) {
      var key = +k; if (key < lo) lo = key; if (key > hi) hi = key;
      var d = stocks[s].m[k][1]; if (d > last) last = d;
    }
  });
  var K = hi - lo + 1;
  var closes = syms.map(function (s) {
    var a = new Array(K).fill(NaN);
    for (var k in stocks[s].m) a[+k - lo] = stocks[s].m[k][0];
    return a;
  });
  var opens = [], highs = [], lows = [], withOHLC = 0;
  syms.forEach(function (s) {
    var o = new Array(K).fill(NaN), hi = new Array(K).fill(NaN), lw = new Array(K).fill(NaN), good = 0, tot = 0;
    for (var k in stocks[s].m) {
      var r = stocks[s].m[k]; tot++;
      if (isFinite(r[2]) && isFinite(r[3]) && isFinite(r[4])) { o[+k - lo] = r[2]; hi[+k - lo] = r[3]; lw[+k - lo] = r[4]; good++; }
    }
    if (good >= tot * 0.8) withOHLC++;
    opens.push(o); highs.push(hi); lows.push(lw);
  });
  var lastDates = syms.map(function (s) {
    var d = 0; for (var k in stocks[s].m) if (stocks[s].m[k][1] > d) d = stocks[s].m[k][1];
    return d;
  });
  var partial = new Date(last).getUTCDate() < 26;
  return {
    syms: syms, closes: closes, opens: opens, highs: highs, lows: lows, hasOHLC: withOHLC >= Math.ceil(syms.length * 0.6),
    K: K, lo: lo, last: last, lastDates: lastDates,
    partial: partial, kSig: partial ? K - 2 : K - 1, _sc: {}, _bn: {}
  };
}
function monthLabel(P, k) { var key = P.lo + k; return MONTH_NAMES[key % 12] + ' ' + Math.floor(key / 12); }
function monthTime(P, k) { var key = P.lo + k; return Date.UTC(Math.floor(key / 12), key % 12, 1); }

/* ---------- candlestick patterns ---------- */
function candleAt(P, s, k) {
  var out = {};
  if (!P.hasOHLC || k < 4) return out;
  var o = P.opens[s][k], h = P.highs[s][k], l = P.lows[s][k], c = P.closes[s][k];
  var po = P.opens[s][k - 1], pc = P.closes[s][k - 1];
  if (!(isFinite(o) && isFinite(h) && isFinite(l) && isFinite(c) && h > l)) return out;
  var range = h - l, body = Math.abs(c - o), upper = h - Math.max(o, c), lower = Math.min(o, c) - l, pos = (c - l) / range;
  var prior = P.closes[s][k - 1] / P.closes[s][k - 4] - 1;
  var core = Math.max(body, 0.1 * range);
  if (isFinite(po) && isFinite(pc)) {
    if (pc < po && c > o && o <= pc && c >= po) out.bull_engulf = true;
    if (pc > po && c < o && o >= pc && c <= po) out.bear_engulf = true;
  }
  if (lower >= 2 * core && upper <= 0.3 * range && prior < 0) out.hammer = true;
  if (upper >= 2 * core && lower <= 0.3 * range && prior > 0) out.shoot = true;
  if (c > o && pos >= 0.8) out.strong_up = true;
  if (c < o && pos <= 0.2) out.strong_down = true;
  out.pos = pos;
  return out;
}
function candleLabel(P, s, k) {
  var c = candleAt(P, s, k);
  for (var i = 0; i < PATTERNS.length; i++) if (c[PATTERNS[i].key]) return PATTERNS[i].name.replace(/ \(.*\)$/, '');
  return '';
}
var PATTERN_WEIGHT = { bull_engulf: 1, hammer: 1, strong_up: 0.5, bear_engulf: -1, shoot: -1, strong_down: -0.5 };
function patternStudy(P) {
  var thr = minBreadth(P), res = {};
  PATTERNS.forEach(function (g) { res[g.key] = { 1: [], 3: [] }; });
  var kMax = P.kSig;
  for (var k = 4; k < kMax; k++) {
    var br = 0, s;
    for (s = 0; s < P.syms.length; s++) if (isFinite(P.closes[s][k]) && isFinite(P.closes[s][k - 4])) br++;
    if (br < thr) continue;
    var b1 = k + 1 <= kMax ? benchAt(P, k, 1).m : NaN, b3 = k + 3 <= kMax ? benchAt(P, k, 3).m : NaN;
    for (s = 0; s < P.syms.length; s++) {
      var c = candleAt(P, s, k);
      PATTERNS.forEach(function (g) {
        if (!c[g.key]) return;
        if (k + 1 <= kMax) { var f1 = fwd(P, s, k, 1); if (isFinite(f1) && isFinite(b1)) res[g.key][1].push(f1 - b1); }
        if (k + 3 <= kMax) { var f3 = fwd(P, s, k, 3); if (isFinite(f3) && isFinite(b3)) res[g.key][3].push(f3 - b3); }
      });
    }
  }
  return PATTERNS.map(function (g) {
    var row = { key: g.key, name: g.name, bull: g.bull };
    [1, 3].forEach(function (h) {
      var a = res[g.key][h], n = a.length, m = mean(a), sd = sdev(a);
      row['n' + h] = n; row['m' + h] = n ? m : NaN;
      row['t' + h] = n > 5 && sd > 0 ? (m / (sd / Math.sqrt(n))) / Math.sqrt(h) : NaN;
      row['hit' + h] = n ? a.filter(function (x) { return x > 0; }).length / n : NaN;
    });
    var good = function (h) { return row['n' + h] >= 30 && Math.abs(row['t' + h]) >= 2.5 && ((row['t' + h] > 0) === !!g.bull); };
    var back = function (h) { return row['n' + h] >= 30 && Math.abs(row['t' + h]) >= 2.5 && ((row['t' + h] > 0) !== !!g.bull); };
    row.verdict = (good(1) || good(3)) ? 'Worked' : ((back(1) || back(3)) ? 'Worked backwards' : (row.n1 < 30 ? 'Too few cases' : 'No clear effect'));
    return row;
  });
}

/* ---------- signals ---------- */
var MIXK = { dip: 1, momf: 1, mixm: 1, mixv: 1, mixlv: 1, custom: 1 };
function computeSignals(P) {
  var S = {}, K = P.K;
  sigsFor(P).forEach(function (g) {
    if (g.key !== 'combo' && g.key !== 'combo_c' && g.key !== 'smart' && !MIXK[g.key]) S[g.key] = P.closes.map(function () { return new Float64Array(K).fill(NaN); });
  });
  P.closes.forEach(function (c, s) {
    var r = new Array(K).fill(NaN), k, j;
    for (k = 1; k < K; k++) r[k] = c[k] / c[k - 1] - 1;
    for (k = 0; k < K; k++) {
      if (k >= 12) S.mom12[s][k] = c[k - 1] / c[k - 12] - 1;
      if (k >= 6) S.mom6[s][k] = c[k - 1] / c[k - 6] - 1;
      if (k >= 3) S.mom3[s][k] = c[k] / c[k - 3] - 1;
      if (k >= 1) S.mom1[s][k] = c[k] / c[k - 1] - 1;
      if (k >= 9) { var sm = 0; for (j = k - 9; j <= k; j++) sm += c[j]; S.trend[s][k] = c[k] / (sm / 10) - 1; }
      if (k >= 12) {
        var m1 = 0, m2 = 0;
        for (j = k - 11; j <= k; j++) { m1 += r[j]; m2 += r[j] * r[j]; }
        var mu = m1 / 12, vol = Math.sqrt(Math.max(m2 / 12 - mu * mu, 0));
        S.lowvol[s][k] = -vol;
        S.riskadj[s][k] = vol > 0 ? (c[k] / c[k - 6] - 1) / vol : NaN;
        S.v12[s][k] = vol > 0 ? (c[k - 1] / c[k - 12] - 1) / vol : NaN;
        S.v6[s][k] = vol > 0 ? (c[k - 1] / c[k - 6] - 1) / vol : NaN;
        S.v3[s][k] = vol > 0 ? (c[k] / c[k - 3] - 1) / vol : NaN;
      }
      if (k >= 1) S.rev[s][k] = -r[k];
    }
    if (P.hasOHLC) {
      var pos = new Array(K).fill(NaN), sc;
      for (k = 0; k < K; k++) {
        var rg = P.highs[s][k] - P.lows[s][k];
        if (rg > 0) pos[k] = (c[k] - P.lows[s][k]) / rg;
      }
      for (k = 2; k < K; k++) {
        var a1 = pos[k], a2 = pos[k - 1], a3 = pos[k - 2];
        if (isFinite(a1) && isFinite(a2) && isFinite(a3)) S.clv[s][k] = (a1 + a2 + a3) / 3;
        var cd = candleAt(P, s, k);
        sc = 0;
        for (var key in PATTERN_WEIGHT) if (cd[key]) sc += PATTERN_WEIGHT[key];
        if (isFinite(pos[k])) S.candle[s][k] = sc + 0.01 * pos[k];
      }
    }
  });
  return S;
}
function pctRanks(v) {
  var idx = [], i;
  for (i = 0; i < v.length; i++) if (isFinite(v[i])) idx.push(i);
  idx.sort(function (a, b) { return v[a] - v[b]; });
  var out = new Array(v.length).fill(NaN), n = idx.length;
  for (var j = 0; j < n; j++) out[idx[j]] = n > 1 ? j / (n - 1) : 0.5;
  return out;
}
function mixSpec(key) {
  if (key === 'momf') return { c: ['mom12', 'mom6', 'mom3'], w: [1, 1, 1], filt: 'full' };
  if (key === 'mixm') return { c: ['mom12', 'mom6', 'mom3', 'mom1'], w: [1, 1, 1, 1], filt: 'full' };
  if (key === 'dip') return { c: ['mom12', 'mom6', 'mom1'], w: [1, 1, -1], filt: 'full' };
  if (key === 'mixv') return { c: ['v12', 'v6', 'v3'], w: [1, 1, 1], filt: 'full' };
  if (key === 'mixlv') return { c: ['mom12', 'mom6', 'mom3', 'lowvol'], w: [1, 1, 1, 1], filt: 'full' };
  var c = [], w = [];
  [['mom12', PK_W.m12], ['mom6', PK_W.m6], ['mom3', PK_W.m3], ['mom1', PK_W.m1], ['lowvol', PK_W.lv], ['v12', PK_W.v12 || 0], ['v6', PK_W.v6 || 0], ['v3', PK_W.v3 || 0]].forEach(function (x) { if (x[1] !== 0) { c.push(x[0]); w.push(x[1]); } });
  return { c: c, w: w, filt: PK_W.filt ? 'full' : 'none' };
}
function scoresAt(P, S, key, k) {
  var id = scKey(key, k);
  if (P._sc[id]) return P._sc[id];
  if (MIXK[key]) {
    var sp = mixSpec(key); if (PK_FILTOV) sp.filt = PK_FILTOV; var nn = P.syms.length, o2 = new Array(nn).fill(NaN), upN = 0, totN = 0, q2;
    if (!sp.c.length) { P._sc[id] = o2; return o2; }
    for (q2 = 0; q2 < nn; q2++) { var tq = S.trend[q2][k]; if (isFinite(tq)) { totN++; if (tq > 0) upN++; } }
    if (sp.filt === 'none' || PK_BREADTH <= 0 || (totN && upN / totN >= PK_BREADTH)) {
      var cs = sp.c.map(function (c) { var v = []; for (var z = 0; z < nn; z++) v.push(S[c][z][k]); return pctRanks(v); });
      for (q2 = 0; q2 < nn; q2++) {
        if (sp.filt !== 'none' && !(S.mom6[q2][k] > 0 && S.trend[q2][k] > 0)) continue;
        var sm2 = 0, ct2 = 0, wt = 0;
        for (var y2 = 0; y2 < sp.c.length; y2++) if (isFinite(cs[y2][q2])) { var aw = Math.abs(sp.w[y2]); sm2 += (sp.w[y2] > 0 ? cs[y2][q2] : 1 - cs[y2][q2]) * aw; wt += aw; ct2++; }
        if (ct2 >= Math.max(1, sp.c.length - 1) && wt > 0) o2[q2] = sm2 / wt;
      }
    }
    P._sc[id] = o2; return o2;
  }
  var n = P.syms.length, out = new Array(n), s;
  if (key !== 'combo' && key !== 'combo_c') {
    for (s = 0; s < n; s++) out[s] = S[key][s][k];
  } else {
    var comps = key === 'combo' ? ['mom12', 'mom6', 'riskadj', 'trend'] : ['mom12', 'mom6', 'riskadj', 'trend', 'clv'];
    var prs = comps.map(function (c) { var v = []; for (var q = 0; q < n; q++) v.push(S[c][q][k]); return pctRanks(v); });
    for (s = 0; s < n; s++) {
      var sum = 0, cnt = 0;
      for (var q = 0; q < comps.length; q++) if (isFinite(prs[q][s])) { sum += prs[q][s]; cnt++; }
      out[s] = cnt >= comps.length - 1 ? sum / cnt : NaN;
    }
    var ok = 0;
    for (s = 0; s < n; s++) if (isFinite(out[s]) && S.trend[s][k] > 0) ok++;
    if (ok >= 3) for (s = 0; s < n; s++) if (!(S.trend[s][k] > 0)) out[s] = NaN;
  }
  P._sc[id] = out;
  return out;
}
function topIdx(sc, N) {
  var ids = [], n = sc.length, i;
  for (i = 0; i < n; i++) if (isFinite(sc[i])) ids.push(i);
  ids.sort(function (a, b) { return (sc[b] - sc[a]) || (a - b); });
  return ids.slice(0, N);
}
function fwd(P, s, k, h) {
  var a = P.closes[s][k], b = P.closes[s][k + h];
  return (isFinite(a) && isFinite(b) && a > 0) ? b / a - 1 : NaN;
}
function benchAt(P, k, h) {
  var id = h + '|' + k;
  if (P._bn[id]) return P._bn[id];
  var sum = 0, n = 0;
  for (var s = 0; s < P.syms.length; s++) { var f = fwd(P, s, k, h); if (isFinite(f)) { sum += f; n++; } }
  return (P._bn[id] = { m: n ? sum / n : NaN, n: n });
}
function breadthAt(P, S, k) {
  var n = 0;
  for (var s = 0; s < P.syms.length; s++) if (isFinite(S.mom6[s][k])) n++;
  return n;
}
function minBreadth(P) { return Math.max(5, Math.ceil(P.syms.length * 0.5)); }
function monthRow(P, S, key, k, h, N, cost, scIn) {
  var sc = scIn || scoresAt(P, S, key, k), valid = 0, i;
  for (i = 0; i < sc.length; i++) if (isFinite(sc[i])) valid++;
  if (breadthAt(P, S, k) < minBreadth(P)) return null;
  if (valid < 1) {
    if (!MIXK[key]) return null;
    var b0 = benchAt(P, k, h);
    if (b0.n < 5) return null;
    return { k: k, picks: [], cash: true, ret: 0, bench: b0.m, ex: -b0.m, hits: 0, np: 0 };
  }
  var picks = pickIdx(P, S, key, k, sc, N), rs = [];
  if (!picks.length) { var b1 = benchAt(P, k, h); if (b1.n < 5) return null; return { k: k, picks: [], cash: true, ret: 0, bench: b1.m, ex: -b1.m, hits: 0, np: 0 }; }
  picks.forEach(function (s) { var f = fwd(P, s, k, h); if (isFinite(f)) rs.push(f); });
  var b = benchAt(P, k, h);
  if (!rs.length || b.n < 5) return null;
  var ret = MIXK[key] ? (rs.reduce(function (a, x) { return a + x; }, 0) / N) - cost / 100 * (rs.length / N) : mean(rs) - cost / 100;
  var hits = rs.filter(function (x) { return x > b.m; }).length;
  return { k: k, picks: picks, ret: ret, bench: b.m, ex: ret - b.m, hits: hits, np: rs.length };
}
function evalAll(P, S, h, N, cost) {
  var kLast = P.kSig - h, rows = {}, kFirst = 12;
  while (kFirst <= kLast && breadthAt(P, S, kFirst) < minBreadth(P)) kFirst++;
  var sigs = sigsFor(P);
  sigs.forEach(function (g) {
    if (g.key === 'smart') return;
    var a = [];
    for (var k = kFirst; k <= kLast; k++) a.push(monthRow(P, S, g.key, k, h, N, cost));
    rows[g.key] = a;
  });
  var span = kLast - kFirst + 1;
  var E = { sigs: sigs, h: h, N: N, cost: cost, kFirst: kFirst, kLast: kLast, kSplit: kFirst + Math.floor(span * 0.6), rows: rows };
  var sm = [];
  for (var ks = kFirst; ks <= kLast; ks++) sm.push(monthRow(P, S, 'smart', ks, h, N, cost, wScores(P, S, wWeights(E, ks), ks)));
  rows.smart = sm;
  P._sw = P._sw || {}; P._sw[h] = wWeights(E, P.kSig);
  return E;
}
function rowsIn(E, key, a, b) {
  var out = [], arr = E.rows[key];
  for (var k = Math.max(a, E.kFirst); k <= b && k <= E.kLast; k++) { var r = arr[k - E.kFirst]; if (r) out.push(r); }
  return out;
}
function summarize(rows, h) {
  var n = rows.length;
  if (n < 3) return { n: n, t: NaN, hit: NaN, meanEx: NaN, meanRet: NaN, worst: NaN, pos: NaN, pickAcc: NaN };
  var ex = rows.map(function (r) { return r.ex; }), rt = rows.map(function (r) { return r.ret; });
  var m = mean(ex), sd = sdev(ex), ph = 0, pn = 0;
  rows.forEach(function (r) { ph += r.hits || 0; pn += r.np || 0; });
  return {
    n: n, pickAcc: pn ? ph / pn : NaN, meanEx: m, meanRet: mean(rt), meanBench: mean(rows.map(function (r) { return r.bench; })),
    hit: ex.filter(function (x) { return x > 0; }).length / n,
    pos: rt.filter(function (x) { return x > 0; }).length / n,
    worst: Math.min.apply(null, rt),
    t: sd > 0 ? (m / (sd / Math.sqrt(n))) / Math.sqrt(h) : NaN
  };
}
function permP(P, h, N, cost, kFrom, kTo, actualMean, seed, sims) {
  var r = pkRng(seed), months = [], k, s;
  for (k = kFrom; k <= kTo; k++) {
    var vals = [];
    for (s = 0; s < P.syms.length; s++) { var f = fwd(P, s, k, h); if (isFinite(f)) vals.push(f); }
    if (vals.length >= Math.max(5, N + 2)) months.push({ v: vals, b: mean(vals) });
  }
  if (months.length < 6 || !isFinite(actualMean)) return NaN;
  var ge = 0;
  for (var q = 0; q < sims; q++) {
    var tot = 0;
    for (var m = 0; m < months.length; m++) {
      var arr = months[m].v, sum = 0;
      for (var j = 0; j < N; j++) sum += arr[Math.floor(r() * arr.length)];
      tot += sum / N - cost / 100 - months[m].b;
    }
    if (tot / months.length >= actualMean) ge++;
  }
  return (ge + 1) / (sims + 1);
}
function pairedDiff(E, keyA, keyB, a, b) {
  var d = [];
  for (var k = Math.max(a, E.kFirst); k <= b && k <= E.kLast; k++) {
    var x = E.rows[keyA][k - E.kFirst], y = E.rows[keyB][k - E.kFirst];
    if (x && y) d.push(x.ex - y.ex);
  }
  var n = d.length, m = mean(d), sd = sdev(d);
  return { n: n, mean: n ? m : NaN, t: n > 5 && sd > 0 ? (m / (sd / Math.sqrt(n))) / Math.sqrt(E.h) : NaN };
}
function adaptiveStats(E) {
  var res = [];
  for (var k = E.kSplit; k <= E.kLast; k++) {
    var best = null, bt = -Infinity;
    var EL = elig(E);
    for (var g = 0; g < EL.length; g++) {
      var rows = rowsIn(E, EL[g].key, E.kFirst, k - E.h);
      if (rows.length >= 12) { var st = summarize(rows, E.h); if (st.t > bt) { bt = st.t; best = EL[g].key; } }
    }
    var row = E.rows[best || defKey()][k - E.kFirst];
    if (row) res.push(row);
  }
  return summarize(res, E.h);
}

/* ---------- smart-weighted method ---------- */
var WC = ['mom12', 'mom6', 'mom3', 'riskadj', 'trend', 'rev', 'lowvol'];
var WN = { mom12: '12m momentum', mom6: '6m momentum', mom3: '3m momentum', riskadj: 'return per risk', trend: 'trend', rev: 'bounce back', lowvol: 'low swings' };
function wWeights(E, k) {
  var w = {}, tot = 0;
  WC.forEach(function (key) {
    var st = summarize(rowsIn(E, key, E.kFirst, k - E.h), E.h);
    var t = (st.n >= 12 && isFinite(st.t)) ? Math.max(0, st.t) : 0;
    w[key] = t; tot += t;
  });
  WC.forEach(function (key) { w[key] = tot ? w[key] / tot : 1 / WC.length; });
  return w;
}
function wScores(P, S, w, k) {
  var n = P.syms.length, out = new Array(n).fill(0), seen = new Array(n).fill(0), s, i;
  WC.forEach(function (key) {
    if (!w[key]) return;
    var v = []; for (s = 0; s < n; s++) v.push(S[key][s][k]);
    var pr = pctRanks(v);
    for (var s2 = 0; s2 < n; s2++) if (isFinite(pr[s2])) { out[s2] += w[key] * pr[s2]; seen[s2] += w[key]; }
  });
  for (i = 0; i < n; i++) out[i] = seen[i] > 0.5 ? out[i] / seen[i] : NaN;
  var ok = 0; for (i = 0; i < n; i++) if (isFinite(out[i]) && S.trend[i][k] > 0) ok++;
  if (ok >= 3) for (i = 0; i < n; i++) if (!(S.trend[i][k] > 0)) out[i] = NaN;
  return out;
}
function smartInfo(P, E, h) {
  var w = P._sw[h];
  var parts = WC.filter(function (k) { return w[k] >= 0.005; }).sort(function (a, b) { return w[b] - w[a]; })
    .map(function (k) { return WN[k] + ' ' + Math.round(w[k] * 100) + '%'; });
  var pd = pairedDiff(E, 'smart', 'combo', E.kSplit, E.kLast), verdict;
  if (pd.n < 24) verdict = 'Too few unseen months to compare it with plain Combined.';
  else if (pd.t >= 2 && pd.mean > 0) verdict = 'On unseen months it beat plain Combined by more than luck would explain.';
  else if (pd.t <= -2 && pd.mean < 0) verdict = 'On unseen months it did clearly worse than plain Combined.';
  else verdict = 'On unseen months it made no clear difference to plain Combined (average gap ' + (isFinite(pd.mean) ? (pd.mean * 100).toFixed(2) + '%' : 'n/a') + ' a pick).';
  return { text: parts.join(', '), verdict: verdict, diff: pd };
}

/* ---------- month-by-month replay ---------- */
function replayRun(P, E, startKey, endKey, S) {
  var kBuy = startKey - 1 - P.lo, kFrom = Math.max(kBuy, E.kFirst), clamped = kBuy < E.kFirst, rows = [], k, g;
  if (kFrom > E.kLast) return { err: 'No finished months to test from that date. The latest month with a known result is ' + monthLabel(P, P.kSig) + ', so pick an earlier start. The picks table above is the open prediction.' };
  for (k = kFrom; k <= E.kLast; k++) {
    if (isFinite(endKey) && P.lo + k + 1 > endKey) break;
    var best = null, bt = -Infinity;
    var EL2 = elig(E);
    for (g = 0; g < EL2.length; g++) {
      var past = rowsIn(E, EL2[g].key, E.kFirst, k - E.h);
      if (past.length >= 12) { var st = summarize(past, E.h); if (st.t > bt) { bt = st.t; best = EL2[g].key; } }
    }
    var key = (PK_FORCE && E.rows[PK_FORCE]) ? PK_FORCE : (best || defKey()), r = E.rows[key][k - E.kFirst];
    if (!r) continue;
    var sg = SIGS.filter(function (x) { return x.key === key; })[0];
    rows.push({
      k: k, label: monthLabel(P, k + 1) + (E.h > 1 ? ' to ' + monthLabel(P, k + E.h) : ''), year: Math.floor((P.lo + k + 1) / 12),
      method: sg.short, early: !best && !PK_FORCE, picks: r.picks.map(function (s) { return P.syms[s]; }), det: r.picks.map(function (s) { return { sym: P.syms[s], r: fwd(P, s, k, E.h) }; }),
      mon: (P.lo + k + 1) % 12, cash: !!r.cash, grp: confGroups(P, S, key, k, E.h, E.cost), ret: r.ret, bench: r.bench, ex: r.ex
    });
  }
  var n = rows.length;
  if (!n) return { err: 'No finished months fall between those two dates. Move the start earlier or the end later.' };
  var comp = 1, compB = 1, by = {};
  rows.forEach(function (r) {
    comp *= 1 + r.ret; compB *= 1 + r.bench;
    var y = by[r.year] || (by[r.year] = { year: r.year, n: 0, beats: 0, sum: 0 });
    y.n++; if (r.ex > 0) y.beats++; y.sum += r.ex;
  });
  var sorted = rows.slice().sort(function (a, b) { return a.ex - b.ex; }), beats = rows.filter(function (r) { return r.ex > 0; }).length;
  var gs = {};
  ['High', 'Medium', 'Low'].forEach(function (L) {
    var m = rows.filter(function (r) { return r.grp[L].n > 0; }), tn = 0, tr = 0, tb = 0, bt = 0;
    m.forEach(function (r) { tn += r.grp[L].n; tr += r.grp[L].r; tb += r.bench; if (r.grp[L].r > r.bench) bt++; });
    gs[L] = { months: m.length, avgN: m.length ? tn / m.length : 0, avg: m.length ? tr / m.length : NaN, bench: m.length ? tb / m.length : NaN, beats: bt };
  });
  var qe = 1, qb = 1, qp = 1, qbp = 1, qd = 0, qbd = 0;
  rows.forEach(function (r) { qe *= 1 + r.ret; qb *= 1 + r.bench; qp = Math.max(qp, qe); qbp = Math.max(qbp, qb); qd = Math.min(qd, qe / qp - 1); qbd = Math.min(qbd, qb / qbp - 1); });
  var cal = [], ci;
  for (ci = 0; ci < 12; ci++) cal.push({ m: ci, n: 0, beats: 0, sum: 0 });
  rows.forEach(function (r) { var c = cal[r.mon]; c.n++; if (r.ex > 0) c.beats++; c.sum += r.ex; });
  return {
    grp: gs,
    cagr: E.h === 1 ? Math.pow(qe, 12 / n) - 1 : NaN, bcagr: E.h === 1 ? Math.pow(qb, 12 / n) - 1 : NaN, dd: qd, bdd: qbd,
    ranked: sorted.slice().reverse(), cal: cal.filter(function (c) { return c.n > 0; }), up: rows.filter(function (r) { return r.ret > 0; }).length,
    rows: rows, n: n, beats: beats, hit: beats / n, meanEx: mean(rows.map(function (r) { return r.ex; })), meanRet: mean(rows.map(function (r) { return r.ret; })),
    comp: E.h === 1 ? comp - 1 : NaN, compB: E.h === 1 ? compB - 1 : NaN,
    best: sorted.slice(-3).reverse(), worst: sorted.slice(0, 3),
    years: Object.keys(by).sort().map(function (y) { return by[y]; }), clamped: clamped, firstLabel: rows[0].label
  };
}

/* ---------- reports ---------- */
function checksFor(unseen, all, p) {
  var list = [];
  list.push({ st: unseen.n >= 24 ? 'pass' : (unseen.n >= 12 ? 'warn' : 'fail'), title: 'Enough unseen months to judge', detail: unseen.n + ' unseen months. At least 24 is a safer base.' });
  list.push({ st: unseen.meanEx > 0 ? 'pass' : 'fail', title: 'Beat the average of your list on unseen months', detail: 'Average extra return per pick: ' + (isFinite(unseen.meanEx) ? (unseen.meanEx * 100).toFixed(2) + '%' : 'n/a') + '. Strength on unseen months: ' + (isFinite(unseen.t) ? unseen.t.toFixed(2) : 'n/a') + '.' });
  list.push({ st: unseen.hit >= 0.55 ? 'pass' : 'fail', title: 'Wins on at least 55% of unseen months', detail: isFinite(unseen.hit) ? Math.round(unseen.hit * 100) + '% of unseen months beat the list.' : 'Not enough months.' });
  list.push({ st: all.t >= 1.65 ? 'pass' : 'fail', title: 'Strong enough over all months', detail: 'Strength score ' + (isFinite(all.t) ? all.t.toFixed(2) : 'n/a') + '. At least 1.65 is the usual bar.' });
  list.push({ st: p <= 0.10 ? 'pass' : 'fail', title: 'Better than random picks', detail: isFinite(p) ? 'Random picks did as well in ' + Math.round(p * 100) + '% of 400 trials.' : 'Not enough months.' });
  var passes = list.filter(function (c) { return c.st === 'pass'; }).length;
  var uT = unseen.t;
  var conf = (passes >= 4 && uT >= 1.65) ? 'High' : ((passes >= 3 && unseen.meanEx > 0 && uT >= 0.8) ? 'Medium' : 'Low');
  return { list: list, passes: passes, conf: conf };
}
function stockInfo(P, S, s, k) {
  var c = P.closes[s];
  var since = P.partial && isFinite(c[P.K - 1]) ? c[P.K - 1] / c[k] - 1 : NaN;
  var stale = P.lastDates[s] < P.last - 12 * 86400000;
  return {
    s: s, sym: P.syms[s], mom12: S.mom12[s][k], mom6: S.mom6[s][k], mom3: S.mom3[s][k], trend: S.trend[s][k],
    price: isFinite(c[P.K - 1]) ? c[P.K - 1] : c[k], vol: -S.lowvol[s][k], r1: c[k] / c[k - 1] - 1, since: since, stale: stale,
    candle: P.hasOHLC ? candleLabel(P, s, k) : ''
  };
}
function currentPicks(P, S, key, count, h) {
  var k = P.kSig, sc = key === 'smart' ? wScores(P, S, P._sw[h], k) : scoresAt(P, S, key, k);
  var sx = sc.slice();
  for (var q = 0; q < sx.length; q++) if (PK_EXCL[P.syms[q]]) sx[q] = NaN;
  sc = sx;
  var full = topIdx(sc, sc.length);
  var sel = PK_MINCONF === 'any' ? full.slice(0, count) : selFilter(P, S, key, k, full.slice(0, count * 5 + 30), count);
  return sel.map(function (s, i) { var o = stockInfo(P, S, s, k); o.rank = i + 1; o.origRank = full.indexOf(s) + 1; o.score = sc[s]; return o; });
}
function weakList(P, S, k) {
  var n = P.syms.length, m6 = [], m3 = [], s;
  for (s = 0; s < n; s++) { if (isFinite(S.mom6[s][k])) m6.push(S.mom6[s][k]); if (isFinite(S.mom3[s][k])) m3.push(S.mom3[s][k]); }
  m6.sort(function (a, b) { return a - b; }); m3.sort(function (a, b) { return a - b; });
  var q25 = m6.length ? m6[Math.floor((m6.length - 1) * 0.25)] : NaN, med3 = m3.length ? m3[Math.floor((m3.length - 1) / 2)] : NaN;
  var out = [];
  for (s = 0; s < n; s++) {
    var info = stockInfo(P, S, s, k), flags = [], c = P.closes[s];
    if (!isFinite(info.trend)) continue;
    if (info.trend < 0) flags.push('Below its 10-month average');
    if (info.mom12 < 0) flags.push('Down ' + Math.abs(info.mom12 * 100).toFixed(0) + '% over 12 months');
    if (info.mom6 <= q25 && info.mom6 < 0) flags.push('One of the weakest 6-month runs in your list');
    if (info.mom3 < 0 && info.mom3 - med3 < -0.08) flags.push('Lagging the list by ' + Math.abs((info.mom3 - med3) * 100).toFixed(0) + ' points over 3 months');
    var hi = -Infinity; for (var j = k - 11; j <= k; j++) if (c[j] > hi) hi = c[j];
    if (isFinite(hi) && c[k] / hi - 1 < -0.2) flags.push((Math.abs(c[k] / hi - 1) * 100).toFixed(0) + '% below its 12-month high');
    if (isFinite(info.since) && info.since < -0.08) flags.push('Down ' + Math.abs(info.since * 100).toFixed(0) + '% since month-end');
    info.flags = flags;
    if (flags.length >= 3) out.push(info);
  }
  out.sort(function (a, b) { return (b.flags.length - a.flags.length) || (a.mom6 - b.mom6); });
  return out.slice(0, 8);
}
function horizonReport(P, S, h, N, cost) {
  var E = evalAll(P, S, h, N, cost);
  var best = null, bt = -Infinity, g;
  var EL3 = elig(E);
  for (g = 0; g < EL3.length; g++) {
    var tr = summarize(rowsIn(E, EL3[g].key, E.kFirst, E.kSplit - h), h);
    if (tr.n >= 12 && tr.t > bt) { bt = tr.t; best = EL3[g].key; }
  }
  if (!best) best = defKey();
  if (PK_FORCE && E.rows[PK_FORCE]) best = PK_FORCE;
  var all = summarize(rowsIn(E, best, E.kFirst, E.kLast), h);
  var unseen = summarize(rowsIn(E, best, E.kSplit, E.kLast), h);
  var p = permP(P, h, N, cost, E.kFirst, E.kLast, all.meanEx, 7 + h, 400);
  var chk = checksFor(unseen, all, p);
  return { h: h, N: N, E: E, key: best, all: all, unseen: unseen, p: p, chk: chk };
}
function growthSeries(P, E, key) {
  var eq = 100, bn = 100, pts = [[monthTime(P, E.kFirst), 100]], bpts = [[monthTime(P, E.kFirst), 100]];
  for (var k = E.kFirst; k <= E.kLast; k += E.h) {
    var r = E.rows[key][k - E.kFirst];
    if (!r) continue;
    eq *= 1 + r.ret; bn *= 1 + r.bench;
    pts.push([monthTime(P, k + E.h), eq]); bpts.push([monthTime(P, k + E.h), bn]);
  }
  return { strat: pts, bench: bpts, split: monthTime(P, E.kSplit) };
}
var GRID_N = [5, 10, 15, 20];
var SL_LEVELS = [0, 5, 10, 15, 20, 25, 30];
function methodGrid(P, S, E, h, cost) {
  var out = [], EL = E.sigs.filter(function (g) { return g.key !== 'smart' && (PK_MODE !== 'mom' || isMom(g.key)); });
  EL.forEach(function (g) {
    var row = { key: g.key, short: g.short, cells: {} };
    GRID_N.forEach(function (N) {
      if (N > P.syms.length) return;
      var rs = [];
      for (var k = E.kFirst; k <= E.kLast; k++) rs.push(monthRow(P, S, g.key, k, h, N, cost));
      rs = rs.filter(Boolean);
      var all = summarize(rs, h), uns = summarize(rs.filter(function (r) { return r.k >= E.kSplit; }), h);
      row.cells[N] = { all: all, unseen: uns };
    });
    out.push(row);
  });
  return out;
}
function stopGrid(P, S, key, N, cost, startKey, endKey, rg, rgL, wts) {
  var exits = [0, Math.ceil(N * 1.5), N * 2, Math.ceil(N * 2.5), N * 3].filter(function (x, i, a) { return a.indexOf(x) === i && (x === 0 || x < P.syms.length); });
  var cells = [], best = null, bestC = null;
  SL_LEVELS.forEach(function (sl) {
    var row = { sl: sl, cells: [] };
    exits.forEach(function (ex) {
      var q = portSim(P, S, key, N, ex > 0 ? Math.max(ex, N + 1) : 0, cost, rg, rgL, startKey, endKey, sl, wts);
      row.cells.push({ ex: ex, q: q });
      if (!q.err) {
        if (!best || q.cagr > best.q.cagr) best = { sl: sl, ex: ex, q: q };
        if (isFinite(q.calmar) && (!bestC || q.calmar > bestC.q.calmar)) bestC = { sl: sl, ex: ex, q: q };
      }
    });
    cells.push(row);
  });
  return { exits: exits, rows: cells, best: best, bestCalmar: bestC };
}
function weightGrid(P, S, key, N, cost, startKey, endKey) {
  var out = [];
  WSCHEMES.forEach(function (sc) {
    if (sc[0] === 'custom' && PK_WM !== 'custom') return;
    var w = weightsFor(sc[0], N);
    if (sc[0] !== 'equal' && !w) return;
    var q = portSim(P, S, key, N, PK_OPT.exit > 0 ? Math.max(PK_OPT.exit, N + 1) : 0, cost, PK_OPT.rg, PK_OPT.rgL, startKey, endKey, PK_OPT.sl, w);
    out.push({ id: sc[0], name: sc[1], w: w, q: q });
  });
  return out;
}
function cmpPicks(P, S, key, N, h) {
  if (!MIXK[key]) return null;
  var sv = PK_FILTOV, on, off;
  PK_FILTOV = 'full'; on = currentPicks(P, S, key, N, h).map(function (p) { return p.sym; });
  PK_FILTOV = 'none'; off = currentPicks(P, S, key, N, h).map(function (p) { return p.sym; });
  PK_FILTOV = sv;
  return { on: on, off: off };
}
function medianOf(a) {
  var v = a.filter(isFinite).sort(function (x, y) { return x - y; });
  if (!v.length) return NaN;
  var m = Math.floor(v.length / 2);
  return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2;
}
function winStats(rows, a, L) {
  var eq = 1, be = 1, pk = 1, bpk = 1, dd = 0, bdd = 0, wins = 0, ex = 0, i, r;
  for (i = a; i < a + L; i++) {
    r = rows[i]; eq *= 1 + r.ret; be *= 1 + r.bench; pk = Math.max(pk, eq); bpk = Math.max(bpk, be);
    dd = Math.min(dd, eq / pk - 1); bdd = Math.min(bdd, be / bpk - 1);
    if (r.ret > r.bench) wins++; ex += r.ret - r.bench;
  }
  var cagr = Math.pow(eq, 12 / L) - 1;
  return { a: a, L: L, k0: rows[a].k, k1: rows[a + L - 1].k, cagr: cagr, bcagr: Math.pow(be, 12 / L) - 1, dd: dd, bdd: bdd, win: wins / L, ex: ex / L, calmar: dd < 0 ? cagr / Math.abs(dd) : NaN };
}
function scanAgg(rows, L) {
  var W = [], a, n = rows.length;
  for (a = 0; a + L <= n; a++) W.push(winStats(rows, a, L));
  if (!W.length) return null;
  var best = function (f) { var b = W[0]; W.forEach(function (w) { if (f(w) > f(b)) b = w; }); return b; };
  var rk = function (f) { var idx = W.map(function (w, i) { return i; }).sort(function (x, y) { return f(W[y]) - f(W[x]); }), o = new Array(W.length); idx.forEach(function (i, r) { o[i] = r; }); return o; };
  var r1 = rk(function (w) { return w.cagr; }), r2 = rk(function (w) { return w.win; }), r3 = rk(function (w) { return w.dd; }), r4 = rk(function (w) { return w.ex; }), bo = 0, bs = Infinity;
  W.forEach(function (w, i) { var sc = r1[i] + r2[i] + r3[i] + r4[i]; if (sc < bs) { bs = sc; bo = i; } });
  return {
    n: W.length,
    beat: W.filter(function (w) { return w.cagr > w.bcagr; }).length / W.length,
    medCagr: medianOf(W.map(function (w) { return w.cagr; })), medB: medianOf(W.map(function (w) { return w.bcagr; })),
    medDD: medianOf(W.map(function (w) { return w.dd; })), medBDD: medianOf(W.map(function (w) { return w.bdd; })),
    medWin: medianOf(W.map(function (w) { return w.win; })), medEx: medianOf(W.map(function (w) { return w.ex; })),
    medCalmar: medianOf(W.map(function (w) { return w.calmar; })),
    best: { cagr: best(function (w) { return w.cagr; }), win: best(function (w) { return w.win + w.cagr * 1e-6; }), fall: best(function (w) { return w.dd + w.cagr * 1e-6; }), ex: best(function (w) { return w.ex; }), all: W[bo] }
  };
}
function autoScan(P, S, key, N, cost, sA, sB, L) {
  if (!isFinite(sA) || !isFinite(sB) || sB <= sA) return { err: 'Set a scan start date that is before the scan end date.' };
  var states = MIXK[key] ? [['on', 'Filter ON', 'full'], ['off', 'Filter OFF', 'none']] : [['one', 'No filter for this method', '']];
  var ex = PK_OPT.exit > 0 ? Math.max(PK_OPT.exit, N + 1) : 0, sv = PK_FILTOV, out = { L: L, N: N, states: [], byLen: [], key: key }, i, st;
  var lens = [12, 24, 36, 48, 60];
  var runState = function (ov, wts) { PK_FILTOV = ov; var q = portSim(P, S, key, N, ex, cost, PK_OPT.rg, PK_OPT.rgL, sA, sB, PK_OPT.sl, wts); PK_FILTOV = sv; return q; };
  var sims = {};
  for (i = 0; i < states.length; i++) {
    st = states[i];
    var q = runState(st[2], weightsFor(PK_WM, N));
    if (q.err) return { err: q.err };
    sims[st[0]] = q;
    var agg = scanAgg(q.rows, L);
    if (!agg) return { err: 'The scan range has only ' + q.rows.length + ' months of results, which is shorter than the ' + L + '-month holding length. Move the scan start earlier or choose a shorter holding length.' };
    out.states.push({ id: st[0], label: st[1], agg: agg, months: q.rows.length, first: P.lo + q.rows[0].k, last: P.lo + q.rows[q.rows.length - 1].k + 1 });
  }
  lens.forEach(function (l) {
    var row = { L: l, st: {} };
    states.forEach(function (s2) { var g = scanAgg(sims[s2[0]].rows, l); if (g) row.st[s2[0]] = { n: g.n, beat: g.beat, medCagr: g.medCagr, medB: g.medB, medDD: g.medDD }; });
    if (Object.keys(row.st).length) out.byLen.push(row);
  });
  if (out.states.length === 2) {
    var A = out.states[0].agg, B = out.states[1].agg, v = [
      ['Windows that beat the list', A.beat, B.beat],
      ['Median yearly growth', A.medCagr, B.medCagr],
      ['Median worst fall', A.medDD, B.medDD],
      ['Median months beating the list', A.medWin, B.medWin],
      ['Median extra a month', A.medEx, B.medEx]
    ], von = 0, voff = 0;
    v.forEach(function (x) { if (x[1] > x[2] + 1e-9) von++; else if (x[2] > x[1] + 1e-9) voff++; });
    out.votes = { on: von, off: voff, total: v.length };
    out.winner = von > voff ? 'on' : (voff > von ? 'off' : 'tie');
  } else out.winner = out.states[0].id;
  var use = out.winner === 'tie' ? 'off' : out.winner, useSt = out.states.filter(function (x) { return x.id === use; })[0] || out.states[0], ovUse = (states.filter(function (x) { return x[0] === useSt.id; })[0] || states[0])[2];
  out.useId = useSt.id; out.useLabel = useSt.label;
  out.schemes = [];
  [['equal', 'Equal'], ['linear', 'Steady slope'], ['sqrt', 'Gentle tilt'], ['harm', 'Strong tilt (1/rank)'], ['heavy', 'Heavy top ranks']].forEach(function (sc) {
    var w = weightsFor(sc[0], N), q2 = runState(ovUse, w);
    if (q2.err) return;
    var g = scanAgg(q2.rows, L);
    if (!g) return;
    out.schemes.push({ id: sc[0], name: sc[1], w: w || new Array(N).fill(1 / N), medCalmar: g.medCalmar, medCagr: g.medCagr, medDD: g.medDD, fullCagr: q2.cagr, fullDD: q2.dd });
  });
  var bs2 = null;
  out.schemes.forEach(function (x) { if (isFinite(x.medCalmar) && (!bs2 || x.medCalmar > bs2.medCalmar)) bs2 = x; });
  out.bestScheme = bs2 ? bs2.id : 'equal';
  out.picks = cmpPicks(P, S, key, N, 1);
  return out;
}
function rebalanceLog(P, S, key, N, startKey, endKey) {
  var kk = key === 'smart' ? 'combo' : key, n = P.syms.length, ex = PK_OPT.exit > 0 ? Math.max(PK_OPT.exit, N + 1) : 0;
  var kf = 12; while (kf < P.kSig && breadthAt(P, S, kf) < minBreadth(P)) kf++;
  var kFrom = Math.max(isFinite(startKey) ? startKey - 1 - P.lo : kf, kf), kLast = isFinite(endKey) ? Math.min(P.kSig, endKey - P.lo - 1) : P.kSig;
  var held = [], rows = [], k, i, buys = 0, mo = 0;
  for (k = kFrom; k <= kLast; k++) {
    var order = topIdx(scoresAt(P, S, kk, k), n), rankOf = {};
    if (PK_MINCONF !== 'any') order = selFilter(P, S, kk, k, order.slice(0, Math.max(ex, N) * 3 + 20), Infinity);
    for (i = 0; i < order.length; i++) rankOf[order[i]] = i + 1;
    var tgt = ex > 0 ? held.filter(function (x) { return rankOf[x] && rankOf[x] <= ex; }).slice(0, N) : [];
    for (i = 0; i < order.length && tgt.length < N; i++) if (tgt.indexOf(order[i]) < 0) tgt.push(order[i]);
    tgt.sort(function (x, y) { return (rankOf[x] || 1e9) - (rankOf[y] || 1e9); });
    var nm = function (x) { return P.syms[x]; };
    var buy = tgt.filter(function (x) { return held.indexOf(x) < 0; }), sell = held.filter(function (x) { return tgt.indexOf(x) < 0; }), keep = tgt.filter(function (x) { return held.indexOf(x) >= 0; });
    var rs = [];
    if (k < P.kSig) tgt.forEach(function (x) { var f = fwd(P, x, k, 1); if (isFinite(f)) rs.push(f); });
    rows.push({ k: k, label: monthLabel(P, k), now: k === P.kSig, picks: tgt.map(nm), buy: buy.map(nm), sell: sell.map(nm), keep: keep.map(nm), ret: rs.length ? rs.reduce(function (a, b) { return a + b; }, 0) / rs.length : NaN, cash: !tgt.length });
    if (rows.length > 1) { buys += buy.length; mo++; }
    held = tgt;
  }
  return { rows: rows, N: N, avgBuy: mo ? buys / mo : NaN };
}
function planRun(P, S, key, N, cost, startKey) {
  var ex = PK_OPT.exit > 0 ? Math.max(PK_OPT.exit, N + 1) : 0;
  var q = portSim(P, S, key, N, ex, cost, PK_OPT.rg, PK_OPT.rgL, startKey, NaN, PK_OPT.sl, weightsFor(PK_WM, N));
  if (q.err) return { err: q.err };
  var yrs = {}, wins = 0;
  q.rows.forEach(function (r) {
    var y = Math.floor((P.lo + r.k + 1) / 12), o = yrs[y] || (yrs[y] = { y: y, eq: 1, be: 1, n: 0 });
    o.eq *= 1 + r.ret; o.be *= 1 + r.bench; o.n++;
    if (r.ret > r.bench) wins++;
  });
  var years = Object.keys(yrs).sort().map(function (y) { var o = yrs[y]; return { y: o.y, ret: o.eq - 1, bench: o.be - 1, n: o.n }; });
  return { q: q, years: years, wins: wins, n: q.rows.length, startAbs: P.lo + q.rows[0].k + 1, startLabel: monthLabel(P, q.rows[0].k + 1), endLabel: monthLabel(P, q.rows[q.rows.length - 1].k + 1), perMonthTrades: q.trades / q.rows.length };
}
var FCOMPS = ['m12', 'm6', 'm3', 'm1', 'v12', 'v6', 'v3', 'lv'];
function genCands() {
  var out = [], seen = {}, i, j, k;
  var add = function (o) {
    var w = { m12: 0, m6: 0, m3: 0, m1: 0, lv: 0, v12: 0, v6: 0, v3: 0 };
    Object.keys(o).forEach(function (x) { w[x] = o[x]; });
    var sig = FCOMPS.map(function (c) { return w[c]; }).join(',');
    if (!seen[sig]) { seen[sig] = 1; out.push(w); }
  };
  for (i = 0; i < FCOMPS.length; i++) [100, -100].forEach(function (sg) { var o = {}; o[FCOMPS[i]] = sg; add(o); });
  for (i = 0; i < FCOMPS.length; i++) for (j = i + 1; j < FCOMPS.length; j++) [[100, 100], [100, -100], [-100, 100], [-100, -100]].forEach(function (p) { var o = {}; o[FCOMPS[i]] = p[0]; o[FCOMPS[j]] = p[1]; add(o); });
  var five = ['m12', 'm6', 'm3', 'm1', 'lv'];
  for (i = 0; i < 5; i++) for (j = i + 1; j < 5; j++) for (k = j + 1; k < 5; k++)
    for (var m = 0; m < 8; m++) { var o = {}; o[five[i]] = (m & 1) ? -100 : 100; o[five[j]] = (m & 2) ? -100 : 100; o[five[k]] = (m & 4) ? -100 : 100; add(o); }
  [30, 60].forEach(function (a) { [-100, -50].forEach(function (b) { [0, 40].forEach(function (c) { add({ m12: a, m1: b, lv: c }); }); }); });
  return out;
}
function stratName(w) {
  var nm = [['m12', '12m'], ['m6', '6m'], ['m3', '3m'], ['m1', '1m'], ['v12', '12m per risk'], ['v6', '6m per risk'], ['v3', '3m per risk'], ['lv', 'calm']];
  var parts = nm.filter(function (x) { return w[x[0]]; }).map(function (x) { return x[1] + ' ' + (w[x[0]] > 0 ? '+' : '−') + Math.abs(w[x[0]]); });
  return parts.join(' · ') || 'none';
}
function dropCustom(P) {
  ['_sc', '_ord', '_rkc'].forEach(function (c) { var o = P[c]; if (!o) return; Object.keys(o).forEach(function (k) { if (k.indexOf('custom|') === 0) delete o[k]; }); });
}
function findStrategy(P, S, N, cost, sA, sB, goal) {
  if (!isFinite(sA) || !isFinite(sB) || sB <= sA) return { err: 'Set a finder start date before the finder end date.' };
  var ex = PK_OPT.exit > 0 ? Math.max(PK_OPT.exit, N + 1) : 0, wts = weightsFor(PK_WM, N), saveW = PK_W, saveF = PK_FILTOV, cands = genCands(), res = [], tested = 0;
  PK_FILTOV = '';
  try {
    for (var ci = 0; ci < cands.length; ci++) {
      for (var f = 0; f < 2; f++) {
        PK_W = Object.assign({}, cands[ci], { filt: f });
        var q = portSim(P, S, 'custom', N, ex, cost, PK_OPT.rg, PK_OPT.rgL, sA, sB, PK_OPT.sl, wts);
        dropCustom(P);
        if (q.err) { if (!tested && ci > 5) return { err: q.err }; continue; }
        tested++;
        var wins = 0; q.rows.forEach(function (r) { if (r.ret > r.bench) wins++; });
        res.push({ w: cands[ci], filt: f, name: stratName(cands[ci]), cagr: q.cagr, bcagr: q.bcagr, dd: q.dd, bdd: q.bdd, win: wins / q.rows.length, n: q.rows.length, calmar: q.calmar, ok: q.cagr > q.bcagr && q.dd > q.bdd });
      }
    }
  } finally { PK_W = saveW; PK_FILTOV = saveF; }
  if (!res.length) return { err: 'The finder range has too few months of results. Choose a longer period or an earlier start.' };
  var score = function (r) { return goal === 'calmar' ? (isFinite(r.calmar) ? r.calmar : -1e9) : (goal === 'fall' ? r.dd : r.cagr); };
  var okList = res.filter(function (r) { return r.ok; }).sort(function (a, b) { return score(b) - score(a); });
  var all = res.slice().sort(function (a, b) { return score(b) - score(a); });
  var top = (okList.length ? okList : all).slice(0, 10);
  top.forEach(function (r) {
    PK_W = Object.assign({}, r.w, { filt: r.filt });
    var q2 = portSim(P, S, 'custom', N, ex, cost, PK_OPT.rg, PK_OPT.rgL, sB, NaN, PK_OPT.sl, wts);
    dropCustom(P);
    if (!q2.err) r.after = { cagr: q2.cagr, bcagr: q2.bcagr, dd: q2.dd, bdd: q2.bdd, n: q2.n };
  });
  var grid = null;
  if (top.length) {
    PK_W = Object.assign({}, top[0].w, { filt: top[0].filt });
    grid = { name: top[0].name, filt: top[0].filt, g: stopGrid(P, S, 'custom', N, cost, sA, sB, PK_OPT.rg, PK_OPT.rgL, wts) };
    dropCustom(P);
  }
  PK_W = saveW;
  var cnt = function (f) { var a = res.filter(function (r) { return r.filt === f; }); return { n: a.length, ok: a.filter(function (r) { return r.ok; }).length }; };
  var bestOf = function (f) { var a = okList.filter(function (r) { return r.filt === f; }); return a[0] || null; };
  return { grid: grid, top: top, haveOk: okList.length > 0, tested: tested, goal: goal, off: cnt(0), on: cnt(1), bestOff: bestOf(0), bestOn: bestOf(1), sA: sA, sB: sB, months: all[0].n, list: { cagr: all[0].bcagr, dd: all[0].bdd } };
}
function analyse(stocks, h, N, cost, startKey, endKey) {
  var P;
  if (PK_CACHE.stocks === stocks && PK_CACHE.ver === PK_VER && PK_CACHE.P) P = PK_CACHE.P;
  else { P = buildPanel(stocks); PK_CACHE = { stocks: stocks, ver: PK_VER, P: P, S: null }; }
  if (!P) return { err: 'No stocks loaded yet.' };
  if (P.syms.length < 6) return { err: 'Add at least 6 stocks. Ranking needs a list to pick from.' };
  if (P.kSig < 30) return { err: 'Need at least 30 months of prices. Your files cover ' + (P.kSig + 1) + ' complete months.' };
  var S = PK_CACHE.P === P && PK_CACHE.S ? PK_CACHE.S : computeSignals(P);
  if (PK_CACHE.P === P) PK_CACHE.S = S;
  var kf = 12;
  while (kf <= P.kSig - 3 && breadthAt(P, S, kf) < minBreadth(P)) kf++;
  if (P.kSig - 3 - kf < 24) return { err: 'Not enough history where at least half of your stocks have prices. Add stocks with longer history, or remove very new ones.' };
  var hz = {};
  [1, 2, 3].forEach(function (x) { hz[x] = horizonReport(P, S, x, N, cost); });
  var main = hz[h];
  var E = main.E;
  var table = sigsFor(P).filter(function (g) { return PK_MODE !== 'mom' || isMom(g.key); }).map(function (g) {
    return {
      key: g.key, name: g.name, short: g.short, about: g.about,
      all: summarize(rowsIn(E, g.key, E.kFirst, E.kLast), h),
      train: summarize(rowsIn(E, g.key, E.kFirst, E.kSplit - h), h),
      unseen: summarize(rowsIn(E, g.key, E.kSplit, E.kLast), h)
    };
  });
  var candles = null;
  if (P.hasOHLC && PK_MODE !== 'mom') {
    var rowOf = function (key) { return table.filter(function (r) { return r.key === key; })[0]; };
    var b = rowOf('combo'), c2 = rowOf('combo_c'), verdict;
    var pd = pairedDiff(main.E, 'combo_c', 'combo', main.E.kSplit, main.E.kLast);
    if (pd.n < 24) verdict = 'Too few unseen months to say.';
    else if (pd.t >= 2 && pd.mean > 0) verdict = 'Adding candles improved the unseen months by more than luck would explain.';
    else if (pd.t <= -2 && pd.mean < 0) verdict = 'Adding candles made the unseen months clearly worse.';
    else verdict = 'Adding candles made no clear difference. Any gap is within what luck produces.';
    candles = { base: b, plus: c2, diff: pd, verdict: verdict, patterns: patternStudy(P) };
  }
  var showN = Math.min(20, Math.max(N, 20)), picks = currentPicks(P, S, main.key, showN, h);
  picks.forEach(function (p) { p.conf = stockConf(P, S, main.key, p.s, P.kSig, p.origRank || p.rank); });
  var log = [];
  for (var k = Math.max(E.kFirst, E.kLast - 11); k <= E.kLast; k++) {
    var r = E.rows[main.key][k - E.kFirst];
    if (r) log.push({ label: monthLabel(P, k), picks: r.picks.map(function (s) { return P.syms[s]; }), ret: r.ret, bench: r.bench, ex: r.ex });
  }
  var horizons = [1, 2, 3].map(function (x) {
    var rep = hz[x];
    return {
      h: x, key: rep.key, name: SIGS.filter(function (g) { return g.key === rep.key; })[0].name,
      conf: rep.chk.conf, unseen: rep.unseen, all: rep.all,
      picks: currentPicks(P, S, rep.key, 3, x)
    };
  });
  return {
    P: P, h: h, N: N, cost: cost, main: main, table: table, candles: candles, picks: picks, log: log, horizons: horizons,
    replay: (isFinite(startKey) ? replayRun(P, E, startKey, endKey, S) : null), smart: PK_MODE === 'mom' ? null : smartInfo(P, E, h), adaptive: adaptiveStats(E), weak: weakList(P, S, P.kSig),
    growth: growthSeries(P, E, main.key),
    cands: (function () { var c = currentPicks(P, S, main.key, Math.min(20, Math.max(N, 10)), h); c.forEach(function (p) { p.conf = stockConf(P, S, main.key, p.s, P.kSig, p.origRank || p.rank); }); return c; })(),
    sim: (PK_OPT.exit > 0 || PK_OPT.rg !== 'none' || PK_OPT.sl > 0 || PK_WM !== 'equal') ? portSim(P, S, main.key, N, PK_OPT.exit > 0 ? Math.max(PK_OPT.exit, N + 1) : 0, cost, PK_OPT.rg, PK_OPT.rgL, startKey, endKey, PK_OPT.sl, weightsFor(PK_WM, N)) : null,
    cmp: cmpPicks(P, S, main.key, N, h),
    plan: planRun(P, S, main.key, N, cost, startKey),
    find: PK_OPT.find ? findStrategy(P, S, N, cost, PK_OPT.find.a, PK_OPT.find.b, PK_OPT.find.goal) : null,
    changes: rebalanceLog(P, S, main.key, N, startKey, endKey),
    scan: PK_OPT.scan ? autoScan(P, S, main.key, N, cost, PK_OPT.scan.a, PK_OPT.scan.b, PK_OPT.scan.L) : null,
    wgrid: (PK_OPT.explore || PK_WM !== 'equal') ? weightGrid(P, S, main.key, N, cost, startKey, endKey) : null,
    mgrid: PK_OPT.explore ? methodGrid(P, S, E, h, cost) : null,
    sgrid: PK_OPT.explore ? stopGrid(P, S, main.key, N, cost, startKey, endKey, PK_OPT.rg, PK_OPT.rgL) : null,
    asOf: monthLabel(P, P.kSig), nStocks: P.syms.length, months: P.kSig + 1, S: S
  };
}

/* ---------- reading files ---------- */
function splitCSVLine(l, delim) { return l.split(delim).map(function (s) { return s.trim().replace(/^"|"$/g, ''); }); }
function normHeader(x) { return x.toLowerCase().replace(/[^a-z. ]/g, '').trim(); }
function parseMulti(text, fileName) {
  var lines = String(text).split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean);
  if (lines.length < 3) throw new Error('That file has too few rows.');
  var l0 = lines[0];
  var delim = l0.indexOf('\t') >= 0 ? '\t' : (l0.split(';').length > l0.split(',').length ? ';' : ',');
  var head = splitCSVLine(l0, delim).map(normHeader);
  var di = head.findIndex(function (x) { return x.indexOf('date') >= 0; });
  var symI = head.findIndex(function (x) { return /^(symbol|ticker|name|stock|scrip|company|instrument|security)/.test(x); });
  var closeNames = ['adj close', 'adj. close', 'close', 'close price', 'closing price', 'price', 'nav', 'last'];
  var ci = -1;
  for (var q = 0; q < closeNames.length && ci < 0; q++) ci = head.findIndex(function (x, i) { return i !== di && x === closeNames[q]; });
  var out = [], i, p;
  if (di >= 0 && symI >= 0 && ci >= 0) {
    var by = {};
    for (i = 1; i < lines.length; i++) {
      p = splitCSVLine(lines[i], delim);
      var t = parseDate(p[di]), c = parseNum(p[ci]), sy = (p[symI] || '').trim();
      if (!sy || isNaN(t) || !isFinite(c) || c <= 0) continue;
      (by[sy] || (by[sy] = { t: [], c: [] })).t.push(t); by[sy].c.push(c);
    }
    Object.keys(by).forEach(function (sy) { out.push({ sym: sy, t: by[sy].t, c: by[sy].c }); });
  } else if (di >= 0 && ci < 0 && head.length >= 3) {
    var cols = head.map(function () { return { t: [], c: [] }; });
    for (i = 1; i < lines.length; i++) {
      p = splitCSVLine(lines[i], delim);
      var td = parseDate(p[di]);
      if (isNaN(td)) continue;
      for (var j = 0; j < head.length; j++) {
        if (j === di) continue;
        var v = parseNum(p[j]);
        if (isFinite(v) && v > 0) { cols[j].t.push(td); cols[j].c.push(v); }
      }
    }
    var orig = splitCSVLine(l0, delim);
    for (var j2 = 0; j2 < head.length; j2++) if (j2 !== di && cols[j2].t.length) out.push({ sym: orig[j2], t: cols[j2].t, c: cols[j2].c });
  } else {
    var D = parseData(text, fileName, 2);
    out.push({ sym: fileName, t: D.t, c: D.c, o: D.o, h: D.h, l: D.l });
  }
  if (!out.length) throw new Error('Could not find a Date column and prices in that file.');
  return out;
}
function cleanSymbol(name) {
  return String(name).replace(/\.[^.]+$/, '').replace(/[\s_-]*(historical|history|data|prices?)$/i, '').trim().toUpperCase().slice(0, 24);
}

/* ---------- example list (made up) ---------- */
function demoUniverse(count) {
  var names = ['ALFA', 'BRAVO', 'CEDAR', 'DELTA', 'EMBER', 'FALCON', 'GRANITE', 'HARBOR', 'IRIS', 'JASPER', 'KESTREL', 'LOTUS', 'MARBLE', 'NOVA', 'ORCHID', 'PRISM', 'QUARTZ', 'RIVER', 'SABLE', 'TUNDRA', 'UMBER', 'VERTEX', 'WILLOW', 'ZENITH'];
  var r = pkRng(424242), stocks = {};
  var nM = 12 * 14 + 10; // Jan 2012 .. Oct 2026
  var mkt = [], i, k;
  for (k = 0; k < nM; k++) mkt.push(0.008 + 0.04 * pkGauss(r));
  var list = names.slice();
  for (var z = names.length; z < (count || 0); z++) list.push('S' + z);
  list.forEach(function (nm, idx) {
    var alpha = (0.0 + 0.1 * r()) / 12, beta = 0.7 + 0.8 * r(), idio = 0.05 + 0.04 * r(), phi = 0.06 * r(), price = 100 + 400 * r(), prev = 0, map = {}, prevClose = price;
    for (k = 0; k < nM; k++) {
      var ret = alpha + beta * mkt[k] + idio * pkGauss(r) + phi * prev;
      if (ret < -0.6) ret = -0.6;
      prev = ret; price *= 1 + ret;
      var y = 2012 + Math.floor(k / 12), m = k % 12;
      var d = Date.UTC(y, m + 1, 0);
      while (new Date(d).getUTCDay() === 0 || new Date(d).getUTCDay() === 6) d -= 86400000;
      if (k === nM - 1) d = Date.UTC(2026, 9, 8);
      var cl = Math.round(price * 100) / 100, op = Math.round(prevClose * (1 + 0.01 * pkGauss(r)) * 100) / 100;
      var hi = Math.round(Math.max(op, cl) * (1 + Math.abs(0.02 * pkGauss(r))) * 100) / 100, lw = Math.round(Math.min(op, cl) * (1 - Math.abs(0.02 * pkGauss(r))) * 100) / 100;
      prevClose = cl;
      map[y * 12 + m] = [cl, d, op, hi, lw];
    }
    stocks[nm] = { m: map };
  });
  return stocks;
}

if (typeof module !== 'undefined') {
  module.exports = { patternStudy: patternStudy, candleAt: candleAt, analyse: analyse, buildPanel: buildPanel, computeSignals: computeSignals, demoUniverse: demoUniverse, toMonthMap: toMonthMap, mergeInto: mergeInto, parseMulti: parseMulti, SIGS: SIGS, horizonReport: horizonReport, currentPicks: currentPicks, weakList: weakList };
}

/* ===== Cloudflare Worker part: fetch prices, run the picker, send a notification ===== */
var DEFAULT_WATCHLIST = 'RELIANCE.NS,TCS.NS,HDFCBANK.NS,INFY.NS,ICICIBANK.NS,ITC.NS,LT.NS,SBIN.NS,BHARTIARTL.NS,KOTAKBANK.NS,HINDUNILVR.NS,AXISBANK.NS,ASIANPAINT.NS,MARUTI.NS,SUNPHARMA.NS,TITAN.NS,BAJFINANCE.NS,NTPC.NS,ULTRACEMCO.NS,M&M.NS';

function parseYahoo(json) {
  var r = json && json.chart && json.chart.result && json.chart.result[0];
  if (!r || !r.timestamp || !r.indicators || !r.indicators.quote) return null;
  var q = r.indicators.quote[0].close || [];
  var qo = r.indicators.quote[0].open || [], qh = r.indicators.quote[0].high || [], ql = r.indicators.quote[0].low || [];
  var adj = r.indicators.adjclose && r.indicators.adjclose[0] && r.indicators.adjclose[0].adjclose;
  var t = [], c = [], o = [], h = [], l = [];
  for (var i = 0; i < r.timestamp.length; i++) {
    var v = (adj && adj[i] != null && isFinite(adj[i])) ? adj[i] : q[i];
    if (v == null || !isFinite(v) || v <= 0) continue;
    var f = (q[i] != null && isFinite(q[i]) && q[i] > 0) ? v / q[i] : 1;
    var hasO = qo[i] != null && qh[i] != null && ql[i] != null && qh[i] >= ql[i] && ql[i] > 0;
    t.push(r.timestamp[i] * 1000); c.push(v);
    o.push(hasO ? qo[i] * f : NaN); h.push(hasO ? qh[i] * f : NaN); l.push(hasO ? ql[i] * f : NaN);
  }
  if (!t.length) return null;
  var mt = r.meta && r.meta.regularMarketTime ? r.meta.regularMarketTime * 1000 : 0;
  if (mt && monthKeyOf(mt) === monthKeyOf(t[t.length - 1])) t[t.length - 1] = mt;
  return { t: t, c: c, o: o, h: h, l: l };
}

var UAS = ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15', 'Mozilla/5.0 (compatible; StockPicker/1.0)'];
function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
async function loadYahoo(sym) {
  var hosts = ['query1', 'query2'], last = 'no response';
  for (var i = 0; i < 4; i++) {
    var url = 'https://' + hosts[i % 2] + '.finance.yahoo.com/v8/finance/chart/' + encodeURIComponent(sym) + (i < 2 ? '?range=max' : '?period1=0&period2=' + Math.floor(Date.now() / 1000 + 86400 * 2)) + '&interval=1mo&events=div%7Csplit';
    try {
      var res = await fetch(url, { headers: { 'User-Agent': UAS[i % UAS.length], 'Accept': 'application/json' } });
      if (res.status === 404) throw new Error(sym + ': not found');
      if (res.ok) { var d = parseYahoo(await res.json()); if (d) return d; last = 'no data'; }
      else last = 'HTTP ' + res.status;
    } catch (e) { last = String(e && e.message || e); if (/not found/.test(last)) break; }
    await sleep(350 * (i + 1));
  }
  throw new Error(sym + ': ' + last);
}
/* Turn rows of {date, open, high, low, close, adj} (any order) into the {t,c,o,h,l} shape the engine uses. Close is the adjusted close when given. */
function rowsToSeries(rows) {
  rows = rows.filter(function (r) { return r && isFinite(r.t) && isFinite(r.c) && r.c > 0; }).sort(function (a, b) { return a.t - b.t; });
  if (!rows.length) return null;
  var t = [], c = [], o = [], h = [], l = [];
  rows.forEach(function (r) {
    var f = (isFinite(r.raw) && r.raw > 0) ? r.c / r.raw : 1, ok = r.o > 0 && r.h > 0 && r.l > 0 && r.h >= r.l;
    t.push(r.t); c.push(r.c); o.push(ok ? r.o * f : NaN); h.push(ok ? r.h * f : NaN); l.push(ok ? r.l * f : NaN);
  });
  return { t: t, c: c, o: o, h: h, l: l };
}
function baseSym(sym) { return sym.replace(/\.NS$|\.BO$/, ''); }
async function getJson(url, label) {
  var res = await fetch(url, { headers: { 'User-Agent': UAS[0], 'Accept': 'application/json' } });
  if (!res.ok) throw new Error(label + ': HTTP ' + res.status);
  var j = await res.json();
  if (j && (j.Note || j.Information || j['Error Message'] || j.status === 'error' || j.code >= 400)) throw new Error(label + ': ' + String(j.Note || j.Information || j['Error Message'] || j.message || 'refused').slice(0, 100));
  return j;
}
/* Providers that need a free API key. Add the key as a Worker variable (Settings, Variables). Formats written from each provider's public docs. */
var PROVIDERS = {
  yahoo: { label: 'Yahoo Finance', env: null, load: loadYahoo },
  twelvedata: { label: 'Twelve Data', env: 'TWELVEDATA_KEY', load: async function (sym, env) {
    var bo = /\.BO$/.test(sym), j = await getJson('https://api.twelvedata.com/time_series?symbol=' + encodeURIComponent(baseSym(sym)) + '&exchange=' + (bo ? 'BSE' : 'NSE') + '&interval=1month&outputsize=5000&apikey=' + encodeURIComponent(env.TWELVEDATA_KEY), 'Twelve Data');
    return rowsToSeries((j.values || []).map(function (v) { return { t: Date.parse(v.datetime + 'T00:00:00Z'), c: +v.close, o: +v.open, h: +v.high, l: +v.low }; }));
  } },
  alphavantage: { label: 'Alpha Vantage', env: 'ALPHAVANTAGE_KEY', load: async function (sym, env) {
    var j = await getJson('https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=' + encodeURIComponent(baseSym(sym) + '.BSE') + '&apikey=' + encodeURIComponent(env.ALPHAVANTAGE_KEY), 'Alpha Vantage'), ts = j['Monthly Adjusted Time Series'];
    if (!ts) throw new Error('Alpha Vantage: no data');
    return rowsToSeries(Object.keys(ts).map(function (d) { var v = ts[d]; return { t: Date.parse(d + 'T00:00:00Z'), c: +v['5. adjusted close'], raw: +v['4. close'], o: +v['1. open'], h: +v['2. high'], l: +v['3. low'] }; }));
  } },
  fmp: { label: 'Financial Modeling Prep', env: 'FMP_KEY', load: async function (sym, env) {
    var j = await getJson('https://financialmodelingprep.com/stable/historical-price-eod/full?symbol=' + encodeURIComponent(sym) + '&apikey=' + encodeURIComponent(env.FMP_KEY), 'FMP'), arr = Array.isArray(j) ? j : (j.historical || []);
    if (!arr.length) throw new Error('FMP: no data');
    var by = {};
    arr.forEach(function (v) { var d = Date.parse(v.date + 'T00:00:00Z'), key = monthKeyOf(d); (by[key] = by[key] || []).push({ t: d, v: v }); });
    return rowsToSeries(Object.keys(by).map(function (k) {
      var days = by[k].sort(function (a, b) { return a.t - b.t; }), f = days[0].v, lst = days[days.length - 1].v, hi = -Infinity, lo = Infinity;
      days.forEach(function (x) { hi = Math.max(hi, +x.v.high); lo = Math.min(lo, +x.v.low); });
      var adj = +(lst.adjClose || lst.close);
      return { t: days[days.length - 1].t, c: adj, raw: +lst.close, o: +f.open, h: hi, l: lo };
    }));
  } },
  eodhd: { label: 'EODHD', env: 'EODHD_KEY', load: async function (sym, env) {
    var j = await getJson('https://eodhd.com/api/eod/' + encodeURIComponent(baseSym(sym) + (/\.BO$/.test(sym) ? '.BSE' : '.NSE')) + '?period=m&fmt=json&api_token=' + encodeURIComponent(env.EODHD_KEY), 'EODHD');
    if (!Array.isArray(j) || !j.length) throw new Error('EODHD: no data');
    return rowsToSeries(j.map(function (v) { return { t: Date.parse(v.date + 'T00:00:00Z'), c: +(v.adjusted_close || v.close), raw: +v.close, o: +v.open, h: +v.high, l: +v.low }; }));
  } }
};
var SOURCE_ORDER = ['yahoo', 'twelvedata', 'eodhd', 'fmp', 'alphavantage'];
function sourceStatus(env) {
  var o = {};
  SOURCE_ORDER.forEach(function (k) { var p = PROVIDERS[k]; o[k] = { label: p.label, ready: !p.env || !!(env && env[p.env]), env: p.env }; });
  return o;
}
/* Try the chosen source, or every ready source in order when src is "auto". Yahoo is also retried on the BSE (.BO) listing. */
async function loadStock(sym, env, src) {
  env = env || {};
  var order = (src && src !== 'auto' && PROVIDERS[src]) ? [src] : SOURCE_ORDER.filter(function (k) { return !PROVIDERS[k].env || env[PROVIDERS[k].env]; });
  var errs = [];
  for (var i = 0; i < order.length; i++) {
    var k = order[i], p = PROVIDERS[k];
    if (p.env && !env[p.env]) { errs.push(p.label + ': key not set'); continue; }
    var tries = [sym];
    if (/\.NS$/.test(sym)) tries.push(baseSym(sym) + '.BO');
    for (var j = 0; j < tries.length; j++) {
      try { var d = await p.load(tries[j], env); if (d && d.t.length >= 2) { d.src = p.label; return d; } errs.push(p.label + ': no data'); }
      catch (e) { errs.push(String(e && e.message || e)); }
    }
  }
  throw new Error(sym + ': ' + errs.slice(-3).join('; '));
}
async function staleGet(key) { try { var c = typeof caches !== 'undefined' ? caches.default : null; if (!c) return null; var h = await c.match(new Request(key)); return h ? await h.json() : null; } catch (e) { return null; } }
async function stalePut(key, obj, days) { try { var c = typeof caches !== 'undefined' ? caches.default : null; if (c) await c.put(new Request(key), new Response(JSON.stringify(obj), { headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=' + days * 86400 } })); } catch (e) { } }

var INDEX_FILES = {
  nifty50: 'ind_nifty50list.csv', niftynext50: 'ind_niftynext50list.csv', nifty100: 'ind_nifty100list.csv', nifty200: 'ind_nifty200list.csv',
  nifty500: 'ind_nifty500list.csv', midcap100: 'ind_niftymidcap100list.csv', midcap150: 'ind_niftymidcap150list.csv',
  smallcap100: 'ind_niftysmallcap100list.csv', smallcap250: 'ind_niftysmallcap250list.csv',
  largemidcap250: 'ind_niftylargemidcap250list.csv', midsmall400: 'ind_niftymidsmallcap400list.csv'
};
var ETF_BUILTIN = ['NIFTYBEES', 'JUNIORBEES', 'SETFNIF50', 'SETFNN50', 'HDFCNIFTY', 'UTINIFTETF', 'KOTAKNIFTY', 'NIFTYIETF', 'NEXT50IETF', 'LICNETFN50', 'MONIFTY500', 'MID150BEES', 'HDFCMID150', 'MIDCAPIETF', 'MOM100', 'HDFCSML250', 'ALPHA', 'LOWVOL1', 'ALPL30IETF', 'QUAL30IETF', 'MOM30IETF', 'NV20BEES', 'NV20IETF', 'SENSEXETF', 'HDFCSENSEX', 'UTISENSETF', 'BANKBEES', 'SETFNIFBK', 'KOTAKBKETF', 'UTIBANKETF', 'PSUBNKBEES', 'ITBEES', 'PHARMABEES', 'INFRABEES', 'CONSUMBEES', 'FMCGIETF', 'MAKEINDIA', 'CPSEETF', 'ICICIB22', 'DIVOPPBEES', 'SHARIABEES', 'HEALTHIETF', 'MOREALTY', 'MON100', 'MAFANG', 'HNGSNGBEES', 'MASPTOP50', 'MAHKTECH', 'GOLDBEES', 'GOLDIETF', 'HDFCGOLD', 'KOTAKGOLD', 'AXISGOLD', 'SETFGOLD', 'LICMFGOLD', 'SILVERBEES', 'SILVERIETF', 'HDFCSILVER', 'SILVER'];

/* Used only when NSE refuses this server (HTTP 403). Approximate large-cap lists; a symbol that no longer trades just shows as "no data". */
var FB_50 = 'ADANIENT ADANIPORTS APOLLOHOSP ASIANPAINT AXISBANK BAJAJ-AUTO BAJFINANCE BAJAJFINSV BEL BHARTIARTL CIPLA COALINDIA DRREDDY EICHERMOT ETERNAL GRASIM HCLTECH HDFCBANK HDFCLIFE HEROMOTOCO HINDALCO HINDUNILVR ICICIBANK INDUSINDBK INFY ITC JIOFIN JSWSTEEL KOTAKBANK LT M&M MARUTI NESTLEIND NTPC ONGC POWERGRID RELIANCE SBILIFE SBIN SHRIRAMFIN SUNPHARMA TATACONSUM TATASTEEL TCS TECHM TITAN TRENT ULTRACEMCO WIPRO'.split(' ').map(function (s) { return s + '.NS'; });
var FB_NEXT = 'ABB AMBUJACEM BANKBARODA BOSCHLTD CGPOWER CANBK CHOLAFIN DLF DABUR DIVISLAB GAIL GODREJCP HAL HAVELLS ICICIGI ICICIPRULI INDIGO IOC IRFC LICI LODHA NAUKRI PFC PIDILITIND PNB RECLTD SIEMENS TATAPOWER TORNTPHARM TVSMOTOR UNIONBANK VBL VEDL ZYDUSLIFE MUTHOOTFIN MAXHEALTH POLYCAB PERSISTENT COFORGE DIXON JINDALSTEL SHREECEM SRF BHARATFORG MARICO COLPAL PAGEIND AUROPHARMA LUPIN ALKEM BERGEPAINT'.split(' ').map(function (s) { return s + '.NS'; });
var FB_BY_INDEX = { nifty50: FB_50, niftynext50: FB_NEXT, nifty100: FB_50.concat(FB_NEXT), nifty200: FB_50.concat(FB_NEXT), nifty500: FB_50.concat(FB_NEXT), largemidcap250: FB_50.concat(FB_NEXT) };
function parseConstituents(text) {
  var lines = String(text).split(/\r?\n/).filter(function (l) { return l.trim(); });
  if (lines.length < 2) return [];
  var head = lines[0].split(',').map(function (x) { return x.trim().replace(/^"|"$/g, '').toLowerCase(); });
  var si = head.indexOf('symbol');
  if (si < 0) return [];
  var out = [];
  for (var i = 1; i < lines.length; i++) {
    var cells = lines[i].split(',');
    var s = (cells[si] || '').trim().replace(/^"|"$/g, '').toUpperCase();
    if (/^[A-Z0-9&-]{1,20}$/.test(s)) out.push(s + '.NS');
  }
  return out;
}
async function loadIndex(name) {
  if (name === 'etf') { var e = ETF_BUILTIN.map(function (s) { return s + '.NS'; }); e.source = 'built-in'; return e; }
  var file = INDEX_FILES[name];
  if (!file) throw new Error('Unknown index');
  var urls = ['https://nsearchives.nseindia.com/content/indices/' + file, 'https://archives.nseindia.com/content/indices/' + file,
    'https://www.niftyindices.com/IndexConstituent/' + file, 'https://niftyindices.com/IndexConstituent/' + file];
  var headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
    'Accept': 'text/csv,text/plain,application/octet-stream,*/*;q=0.8', 'Accept-Language': 'en-US,en;q=0.9', 'Referer': 'https://www.niftyindices.com/indices/equity/broad-based-indices' };
  var lastErr = 'no response', skey = 'https://stale.local/index/' + name;
  for (var pass = 0; pass < 2; pass++) {
  if (pass === 1) { try { var pr = await fetch('https://www.nseindia.com/', { headers: headers }); var ck = (pr.headers.get('set-cookie') || '').split(/,(?=[^;]+=)/).map(function (c) { return c.split(';')[0]; }).join('; '); if (ck) headers = Object.assign({}, headers, { Cookie: ck, 'User-Agent': UAS[1] }); } catch (e) { } }
  for (var i = 0; i < urls.length; i++) {
    try {
      var res = await fetch(urls[i], { headers: headers });
      if (!res.ok) { lastErr = 'HTTP ' + res.status; continue; }
      var list = parseConstituents(await res.text());
      if (list.length >= 10) { await stalePut(skey, list, 60); return list; }
      lastErr = 'unexpected file';
    } catch (e) { lastErr = String(e && e.message || e); }
  }
  }
  var old = await staleGet(skey);
  if (old && old.length >= 10) { old.fallback = true; old.source = 'saved copy from an earlier successful read'; return old; }
  if (FB_BY_INDEX[name]) { var fb = FB_BY_INDEX[name].slice(); fb.fallback = true; fb.source = 'built-in (NSE blocked: ' + lastErr + ')'; return fb; }
  throw new Error('Could not read the ' + name + ' list from NSE (' + lastErr + ')');
}

function pctText(x) { return isFinite(x) ? (x >= 0 ? '+' : '') + (x * 100).toFixed(1) + '%' : 'n/a'; }
function shortSym(s) { return s.replace(/\.NS$|\.BO$/, ''); }
function dayLabel(t) { var d = new Date(t); return d.getUTCDate() + ' ' + MONTH_NAMES[d.getUTCMonth()] + ' ' + d.getUTCFullYear(); }

function buildMessage(R, failed) {
  var P = R.P, lines = [], alert = false;
  var firstDays = P.partial && new Date(P.last).getUTCDate() <= 5;
  var nextMonth = MONTH_NAMES[(P.lo + P.K - 1) % 12] + ' ' + Math.floor((P.lo + P.K - 1) / 12);
  if (firstDays) {
    lines.push('Signals use prices to the end of ' + R.asOf + '. Statistics, not advice.');
    R.horizons.forEach(function (x) {
      lines.push(x.h + (x.h === 1 ? ' month' : ' months') + ' [' + x.conf + ' confidence]: ' + (x.picks.length ? x.picks.map(function (p) { return shortSym(p.sym); }).join(', ') : 'Cash, downtrend') + ' (' + x.name + ')');
    });
  } else {
    lines.push('Signals as of ' + R.asOf + ' month-end. Moves since then:');
    R.horizons[0].picks.forEach(function (p) {
      lines.push(shortSym(p.sym) + ' ' + pctText(p.since));
      if (isFinite(p.since) && p.since < -0.07) alert = true;
    });
  }
  if (R.weak.length) lines.push('Weak: ' + R.weak.slice(0, 5).map(function (w) { return shortSym(w.sym); }).join(', '));
  var lowConf = R.horizons.every(function (x) { return x.conf === 'Low'; });
  if (lowConf) lines.push('No method clearly beat your list on unseen months. Treat picks as low confidence.');
  if (alert) lines.push('ALERT: a top pick is down more than 7% since month-end.');
  if (failed && failed.length) lines.push('No data for: ' + failed.join(', '));
  return {
    title: (firstDays ? 'Monthly picks, ' + nextMonth : 'Daily check, ' + dayLabel(P.last)) + (alert ? ' (alert)' : ''),
    body: lines.join('\n'), alert: alert
  };
}

function ntfyHeaders(env, msg) {
  var h = { 'Title': msg.title, 'Priority': msg.alert ? '4' : '3', 'Tags': 'chart_with_upwards_trend' };
  if (env.SITE_URL) h['Click'] = env.SITE_URL;
  return h;
}

async function notify(env, msg) {
  var sent = [];
  if (env.NTFY_TOPIC) {
    var r = await fetch('https://ntfy.sh/' + encodeURIComponent(env.NTFY_TOPIC), {
      method: 'POST', body: msg.body,
      headers: ntfyHeaders(env, msg)
    });
    sent.push('ntfy ' + r.status);
  }
  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    var r2 = await fetch('https://api.telegram.org/bot' + env.TELEGRAM_BOT_TOKEN + '/sendMessage', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: msg.title + '\n\n' + msg.body })
    });
    sent.push('telegram ' + r2.status);
  }
  return sent;
}

async function runJob(env, send) {
  var max = Math.max(1, parseInt(env.MAX_STOCKS || '40', 10) || 40);
  var list;
  if (env.INDEX) {
    try {
      var all = [];
      var names = String(env.INDEX).toLowerCase().split(',');
      for (var ni = 0; ni < names.length; ni++) { var nmx = names[ni].trim(); if (nmx) all = all.concat(await loadIndex(nmx)); }
      list = cleanList(all.join(','), max);
    } catch (e) { list = null; }
  }
  if (!list) list = cleanList(env.WATCHLIST || DEFAULT_WATCHLIST, max);
  var hold = Math.min(3, Math.max(1, parseInt(env.HOLD || '1', 10) || 1));
  var buy = Math.max(1, parseInt(env.BUY || '1', 10) || 1);
  var cost = isFinite(parseFloat(env.COST)) ? parseFloat(env.COST) : 0.25;
  var stocks = {}, failed = [];
  var results = await Promise.all(list.map(function (sym) { return loadStock(sym, env, env.SOURCE).then(function (d) { return { sym: sym, d: d }; }, function () { failed.push(sym); return null; }); }));
  results.forEach(function (x) { if (x) mergeInto(stocks, x.sym, toMonthMap(x.d.t, x.d.c)); });
  var R = analyse(stocks, hold, buy, cost);
  var msg;
  if (R.err) msg = { title: 'Stock picker could not run', body: R.err + (failed.length ? '\nNo data for: ' + failed.join(', ') : ''), alert: true };
  else msg = buildMessage(R, failed);
  if (send) msg.sent = await notify(env, msg);
  return msg;
}


function cleanList(raw, cap) {
  var seen = {}, out = [];
  String(raw || '').split(/[\s,]+/).forEach(function (s) {
    s = s.trim().toUpperCase();
    if (/^[A-Z0-9.&^=-]{1,20}$/.test(s) && !seen[s]) { seen[s] = 1; out.push(s); }
  });
  return out.slice(0, cap || 40);
}

async function loadAll(list, env, src) {
  var out = {}, failed = [], via = {};
  for (var i = 0; i < list.length; i += 8) {
    var batch = list.slice(i, i + 8);
    var res = await Promise.all(batch.map(function (sym) {
      return loadStock(sym, env, src).then(function (d) { return { sym: sym, d: d }; }, function () { failed.push(sym); return null; });
    }));
    res.forEach(function (x) {
      if (!x) return;
      via[x.sym] = x.d.src || 'Yahoo Finance';
      var map = toMonthMap(x.d.t, x.d.c, x.d.o, x.d.h, x.d.l), rows = [];
      Object.keys(map).forEach(function (k) {
        var e = map[k];
        rows.push([+k, e[0], e[1], isFinite(e[2]) ? e[2] : null, isFinite(e[3]) ? e[3] : null, isFinite(e[4]) ? e[4] : null]);
      });
      rows.sort(function (a, b) { return a[0] - b[0]; });
      out[x.sym] = rows;
    });
  }
  return { stocks: out, failed: failed, via: via };
}

async function pricesResponse(request, env, ctx) {
  var u = new URL(request.url);
  var list = cleanList(u.searchParams.get('s') || env.WATCHLIST || DEFAULT_WATCHLIST);
  if (!list.length) return new Response(JSON.stringify({ error: 'No valid symbols' }), { status: 400, headers: { 'content-type': 'application/json' } });
  var cache = typeof caches !== 'undefined' ? caches.default : null;
  var src = u.searchParams.get('src') || 'auto';
  var key = new Request(u.origin + '/api/prices?src=' + encodeURIComponent(src) + '&s=' + encodeURIComponent(list.join(',')));
  if (cache) { var hit = await cache.match(key); if (hit) return hit; }
  var data = await loadAll(list, env, src), skey = 'https://stale.local/prices/' + src + '/' + list.join(',').slice(0, 800);
  if (data.failed.length) { var old = await staleGet(skey), still = []; data.failed.forEach(function (s) { if (old && old.stocks && old.stocks[s]) data.stocks[s] = old.stocks[s]; else still.push(s); }); data.failed = still; }
  if (Object.keys(data.stocks).length && !data.failed.length) await stalePut(skey, { stocks: data.stocks }, 14);
  else if (!Object.keys(data.stocks).length) { var any = await staleGet(skey); if (any && any.stocks) { data.stocks = any.stocks; data.failed = []; } }
  var body = JSON.stringify({ stocks: data.stocks, failed: data.failed, via: data.via, at: Date.now() });
  var ok = Object.keys(data.stocks).length > 0;
  var resp = new Response(body, { status: ok ? 200 : 502, headers: { 'content-type': 'application/json', 'cache-control': ok ? 'public, max-age=21600' : 'no-store' } });
  if (cache && ok && ctx && ctx.waitUntil) ctx.waitUntil(cache.put(key, resp.clone()));
  return resp;
}

/* ===== Rolling-window finder v2: every 12/24/36/48/60 month window inside a period you choose ===== */
var ROLL_JS = String.raw`
(function () {
  var LENS = [1, 2, 3, 6, 12, 24, 36, 48, 60], busy = false;
  var el = function (id) { return document.getElementById(id); };
  function ym(id) { var m = /^(\d{4})-(\d{2})/.exec((el(id) || {}).value || ''); return m ? (+m[1]) * 12 + (+m[2]) - 1 : NaN; }
  function lbl(k) { return MONTH_NAMES[k % 12] + ' ' + Math.floor(k / 12); }
  function setOut(h) { el('roll-out').innerHTML = h; }
  function goalScore(w, goal) { return goal === 'calmar' ? (isFinite(w.calmar) ? w.calmar : -1e9) : (goal === 'fall' ? w.dd : w.cagr); }
  function fw(r) { var w = r.w; return [w.m12, w.m6, w.m3, w.m1, w.lv, w.v12, w.v6, w.v3, r.filt].join(','); }
  function nm(r) { return esc(r.name) + ' (filter ' + (r.filt ? 'ON' : 'OFF') + ')'; }

  function mount() {
    var tab = el('tab-pk'), out = el('out-pk');
    if (!tab || !out || el('roll-card')) return;
    var c = document.createElement('div');
    c.className = 'card'; c.id = 'roll-card';
    c.innerHTML = '<h2>Rolling-window finder (1 to 60 months)</h2>' +
      '<p class="note">Choose a period. For each holding length you tick, the tool lists every window that fits fully inside that period, one start month after another, with the best strategies and their results. Example: period Jan 2015 to Dec 2016 with 12 months gives Jan 2015 to Dec 2015, Feb 2015 to Jan 2016, ... Jan 2016 to Dec 2016 (13 windows). Period Jan 2015 to Dec 2017 with 24 months gives Jan 2015 to Dec 2016, ... Jan 2016 to Dec 2017 (13 windows). With 1 month the tool lists the best strategy of every single month, with 2 or 3 months every two or three month window. Short windows show the growth in the window itself, not a yearly rate, and a switching test shows if changing strategy every window would have helped.</p>' +
      '<div class="fields">' +
      '<div class="field"><div class="lab"><label for="roll-from">Period starts (month)</label></div><input id="roll-from" type="date" value="2015-01-01"></div>' +
      '<div class="field"><div class="lab"><label for="roll-to">Period ends (month included)</label></div><input id="roll-to" type="date" value="2016-12-01"></div>' +
      '<div class="field full"><div class="lab"><label>Holding lengths</label></div><div class="chips">' +
      LENS.map(function (L) { return '<label class="check" style="display:inline-flex;align-items:center;gap:6px;min-height:36px"><input type="checkbox" class="roll-len" value="' + L + '"' + (L === 12 ? ' checked' : '') + ' style="width:20px;height:20px;min-height:0"> ' + (L === 1 ? '1 month' : L + ' months') + '</label>'; }).join('') +
      '</div></div>' +
      '<div class="field"><div class="lab"><label for="roll-top">Strategies listed per window</label></div><select id="roll-top"><option value="1">Best 1</option><option value="3">Best 3</option><option value="5">Best 5</option></select></div>' +
      '<div class="field"><div class="lab"><label for="roll-goal">Rank by</label></div><select id="roll-goal"><option value="cagr">Most growth</option><option value="calmar">Growth per unit of fall</option><option value="fall">Smallest fall</option></select></div>' +
      '<div class="field"><div class="lab"><label for="roll-anchor">Anchor window starts (month)</label></div><input id="roll-anchor" type="date" value="2015-01-01"></div>' +
      '</div>' +
      '<p class="note">Anchor window: the tool takes the best strategy of that one window (for example Jan 2015 to Dec 2015) and tests it in every other window. A table below also does this for every window at once.</p>' +
      '<div class="row"><button type="button" class="btn" id="roll-run">List best for every window</button></div>' +
      '<div id="roll-out" class="out"></div>';
    tab.insertBefore(c, out);
    /* keep these inputs from triggering the page recompute */
    ['input', 'change'].forEach(function (t) { c.addEventListener(t, function (e) { e.stopPropagation(); }); });
    el('roll-run').addEventListener('click', run);
  }

  async function run() {
    if (busy) return;
    var P = PK_CACHE.P, S = PK_CACHE.S;
    if (!P || !S || PK_CACHE.stocks !== PKS.store.stocks) { setOut(errBox('Load your stocks and wait for the picks table to appear, then tap again.')); return; }
    var ticked = $$('.roll-len').filter(function (x) { return x.checked; }).map(function (x) { return +x.value; });
    var anchor = ym('roll-anchor'), sFrom = ym('roll-from'), sTo = ym('roll-to'), goal = el('roll-goal').value, topK = +el('roll-top').value || 1;
    if (!ticked.length) { setOut(errBox('Tick at least one holding length.')); return; }
    if (!isFinite(sFrom) || !isFinite(sTo) || sTo < sFrom) { setOut(errBox('Set the period start on or before the period end.')); return; }
    var span = sTo - sFrom + 1;
    var lens = ticked.filter(function (L) { return L <= span; }), skipped = ticked.filter(function (L) { return L > span; });
    if (!lens.length) { setOut(errBox('Your period is only ' + span + ' months long, shorter than every length you ticked. Widen the period (for 12 months use at least 12 months, for 24 months at least 24).')); return; }
    var N = Math.round(val('pk-n', 10, 1, 20)), cost = val('pk-cost', 0.25, 0, 5);
    var ex = PK_OPT.exit > 0 ? Math.max(PK_OPT.exit, N + 1) : 0, wts = weightsFor(PK_WM, N);
    var cands = genCands(), recs = [], saveW = PK_W, saveF = PK_FILTOV, total = cands.length * 2, done = 0;
    busy = true; PK_FILTOV = '';
    try {
      for (var ci = 0; ci < cands.length; ci++) {
        for (var f = 0; f < 2; f++) {
          PK_W = Object.assign({}, cands[ci], { filt: f });
          var q = portSim(P, S, 'custom', N, ex, cost, PK_OPT.rg, PK_OPT.rgL, sFrom, sTo, PK_OPT.sl, wts);
          dropCustom(P);
          done++;
          if (!q.err) recs.push({ w: cands[ci], filt: f, name: stratName(cands[ci]), rows: q.rows });
        }
        if (ci % 6 === 0) { setOut('<p class="note">Testing strategies: ' + done + ' of ' + total + '. Please keep this page open...</p>'); await new Promise(function (r) { setTimeout(r, 0); }); }
      }
      if (!recs.length) { setOut(errBox('Too few months of results in that period. Move the period or add stocks with longer history.')); return; }
      var b0 = P.lo + recs[0].rows[0].k + 1, bEnd = b0 + recs[0].rows.length - 1, res = {};
      lens.forEach(function (L) {
        var wins = [], per = recs.map(function () { return { ok: 0, n: 0, cg: [], dd: [], ws: [] }; });
        for (var s = sFrom; s + L - 1 <= sTo; s++) {
          var a = s - b0;
          if (a < 0 || a + L > recs[0].rows.length) continue;
          var all = recs.map(function (r, i) {
            var w = winStats(r.rows, a, L), ok = w.cagr > w.bcagr && (L < 12 ? w.dd >= w.bdd : w.dd > w.bdd);
            per[i].n++; if (ok) per[i].ok++; per[i].cg.push(w.cagr); per[i].dd.push(w.dd); per[i].ws.push({ s: s, cagr: w.cagr, bcagr: w.bcagr, dd: w.dd, bdd: w.bdd, win: w.win, ok: ok });
            return { i: i, w: w, ok: ok, sc: goalScore(w, goal) };
          });
          all.sort(function (x, y) { return ((y.ok ? 1 : 0) - (x.ok ? 1 : 0)) || (y.sc - x.sc); });
          wins.push({ s: s, list: all.slice(0, topK), anyOk: all[0].ok, nOk: all.filter(function (z) { return z.ok; }).length });
        }
        res[L] = { wins: wins, per: per };
      });
      /* exact re-run of each listed strategy from its own start month (fresh portfolio) */
      var ids = [];
      lens.forEach(function (L) { res[L].wins.forEach(function (w) { w.list.forEach(function (it) { ids.push([L, w, it]); }); }); });
      for (var k = 0; k < ids.length; k++) {
        var L2 = ids[k][0], wn = ids[k][1], it = ids[k][2], rc = recs[it.i];
        PK_W = Object.assign({}, rc.w, { filt: rc.filt });
        var q2 = portSim(P, S, 'custom', N, ex, cost, PK_OPT.rg, PK_OPT.rgL, wn.s, wn.s + L2 - 1, PK_OPT.sl, wts);
        dropCustom(P);
        if (!q2.err) { var wc = 0; q2.rows.forEach(function (r) { if (r.ret > r.bench) wc++; }); it.x = { cagr: q2.cagr, bcagr: q2.bcagr, dd: q2.dd, bdd: q2.bdd, win: wc / q2.rows.length }; }
        if (k % 8 === 0) { setOut('<p class="note">Checking results: ' + k + ' of ' + ids.length + '...</p>'); await new Promise(function (r) { setTimeout(r, 0); }); }
      }
      setOut(render(res, lens, skipped, recs, N, sFrom, sTo, bEnd, topK, anchor));
    } catch (e) {
      setOut(errBox('Something went wrong: ' + e.message));
    } finally { PK_W = saveW; PK_FILTOV = saveF; busy = false; }
  }

  function render(res, lens, skipped, recs, N, sFrom, sTo, bEnd, topK, anchor) {
    var h = '<p class="note">Tested ' + recs.length + ' strategies (formulas with filter ON and OFF), ' + N + ' stocks per month, period ' + lbl(sFrom) + ' to ' + lbl(sTo) + '. Tap a row to load that strategy into My own blend.</p>';
    if (skipped.length) h += errBox('Skipped ' + skipped.join(', ') + ' months: your period is shorter than that. Widen the period to include them.');
    if (bEnd < sTo) h += errBox('Your price data ends at ' + lbl(bEnd) + ', before the period end, so the last windows are missing.');
    var overall = recs.map(function () { return { sum: 0, c: 0 }; });
    lens.forEach(function (L) {
      var R = res[L], wins = R.wins, per = R.per;
      var G = function (c) { return L < 12 ? Math.pow(1 + c, L / 12) - 1 : c; }, gl = L < 12 ? 'Growth in window' : 'Growth (yearly)';
      h += '<h3>' + (L === 1 ? '1 month' : L + ' months') + (L >= 12 ? ' (' + (L / 12) + (L === 12 ? ' year' : ' years') + ')' : '') + ': ' + wins.length + ' windows</h3>';
      if (!wins.length) { h += errBox('No ' + L + '-month window fits your data inside that period. Widen the period or add stocks with longer history.'); return; }
      var okN = wins.filter(function (w) { return w.anyOk; }).length, cnt = {};
      wins.forEach(function (w) { cnt[w.list[0].i] = (cnt[w.list[0].i] || 0) + 1; });
      var top = Object.keys(cnt).sort(function (a, b) { return cnt[b] - cnt[a]; }).slice(0, 3);
      h += '<p class="headline">In <b class="' + (okN === wins.length ? 'good' : (okN ? 'warn' : 'bad')) + '">' + okN + ' of ' + wins.length + '</b> windows some strategy beat the list with a smaller fall. Most frequent best: <b>' + nm(recs[top[0]]) + '</b>, in ' + cnt[top[0]] + ' windows.</p>';
      if (top.length > 1) h += '<p class="note">Also best often: ' + top.slice(1).map(function (i) { return nm(recs[i]) + ' (' + cnt[i] + ')'; }).join('; ') + '.</p>';
      h += '<div class="scroll"><table class="tbl"><thead><tr><th class="wrap">Window</th><th>Rank</th><th class="wrap">Strategy</th><th>' + gl + ' (list)</th><th>Worst fall (list)</th><th>Months won</th><th>Beat list?</th></tr></thead><tbody>' +
        wins.map(function (w) {
          return w.list.map(function (it, ri) {
            var r = recs[it.i], x = it.x || { cagr: it.w.cagr, bcagr: it.w.bcagr, dd: it.w.dd, bdd: it.w.bdd, win: it.w.win };
            return '<tr class="pick" tabindex="0" data-fw="' + fw(r) + '"><th class="wrap">' + (ri === 0 ? lbl(w.s) + ' to ' + lbl(w.s + L - 1) + '<br><span class="muted">' + w.nOk + ' strategies beat the list</span>' : '') + '</th><td>#' + (ri + 1) + '</td><td class="wrap">' + nm(r) + '</td><td><span class="' + tone(x.cagr) + '">' + pc(G(x.cagr), 1, true) + '</span> (' + pc(G(x.bcagr), 1, true) + ')</td><td><span class="bad">' + pc(x.dd, 0) + '</span> (' + pc(x.bdd, 0) + ')</td><td>' + pc(x.win, 0) + '</td><td class="' + (it.ok ? 'good' : 'bad') + '">' + (it.ok ? 'Yes' : 'No') + '</td></tr>';
          }).join('');
        }).join('') + '</tbody></table></div>';
      var rank = per.map(function (p, i) { return { i: i, p: p, f: p.n ? p.ok / p.n : 0, mc: medianOf(p.cg), md: medianOf(p.dd), wc: Math.min.apply(null, p.cg) }; });
      rank.forEach(function (x) { overall[x.i].sum += x.f; overall[x.i].c++; });
      rank.sort(function (a, b) { return (b.f - a.f) || (b.mc - a.mc); });
      h += '<p class="note"><b>Most consistent for ' + L + ' months</b> (beat the list with a smaller fall in the most windows):</p>';
      h += '<div class="scroll"><table class="tbl"><thead><tr><th class="wrap">Strategy</th><th>Windows beaten</th><th>Median growth</th><th>Median fall</th><th>Worst window</th></tr></thead><tbody>' +
        rank.slice(0, 5).map(function (x) {
          var r = recs[x.i];
          return '<tr class="pick" tabindex="0" data-fw="' + fw(r) + '"><th class="wrap">' + nm(r) + '</th><td class="' + (x.f >= 0.75 ? 'good' : (x.f >= 0.5 ? '' : 'bad')) + '">' + x.p.ok + ' of ' + x.p.n + '</td><td class="' + tone(x.mc) + '">' + pc(G(x.mc), 1, true) + '</td><td class="bad">' + pc(x.md, 0) + '</td><td class="' + tone(x.wc) + '">' + pc(G(x.wc), 1, true) + '</td></tr>';
        }).join('') + '</tbody></table></div>';

      /* switching test for short windows: change strategy every window using only the previous window's best */
      if (L <= 12) {
        var Pq = PK_CACHE.P, b0s = Pq.lo + recs[0].rows[0].k + 1, seq = wins.filter(function (w) { return (w.s - sFrom) % L === 0; }), eqS = 1, eqL = 1, eqF = 1, eqH = 1, nbS = 0, nbF = 0, nbH = 0, nSw = 0, chg = 0, prv = -1, fixI = rank[0].i, j, q4;
        for (j = 1; j < seq.length; j++) {
          var pi = seq[j - 1].list[0].i, hi2 = seq[j].list[0].i, a2 = seq[j].s - b0s, g1 = 1, g2 = 1, g3 = 1, g4 = 1;
          for (q4 = a2; q4 < a2 + L; q4++) { g1 *= 1 + recs[pi].rows[q4].ret; g2 *= 1 + recs[pi].rows[q4].bench; g3 *= 1 + recs[fixI].rows[q4].ret; g4 *= 1 + recs[hi2].rows[q4].ret; }
          eqS *= g1; eqL *= g2; eqF *= g3; eqH *= g4; nSw++; if (g1 > g2) nbS++; if (g3 > g2) nbF++; if (g4 > g2) nbH++; if (pi !== prv) chg++; prv = pi;
        }
        if (nSw >= 3) {
          var totM = nSw * L, ann = function (e) { return Math.pow(e, 12 / totM) - 1; };
          h += '<h3>Switching test (' + (L === 1 ? '1 month' : L + ' months') + ')</h3>';
          h += '<p class="headline">Using each window’s best strategy for the next window gave <b class="' + tone(eqS - eqL) + '">' + pc(eqS - 1, 1, true) + '</b> in ' + totM + ' months, against <b>' + pc(eqL - 1, 1, true) + '</b> for the list. It beat the list in ' + nbS + ' of ' + nSw + ' windows and changed strategy ' + chg + ' times.</p>';
          h += '<div class="scroll"><table class="tbl"><thead><tr><th class="wrap">Way of choosing (' + nSw + ' windows after the first)</th><th>Growth over ' + totM + ' months</th><th>Yearly rate</th><th>Windows beating the list</th></tr></thead><tbody>' +
            [['Switch: previous window’s best (no peeking)', eqS, nbS], ['Stay with the most consistent strategy: ' + nm(recs[fixI]), eqF, nbF], ['Peek: each window’s own best (not possible live)', eqH, nbH], ['Average stock of your list', eqL, null]].map(function (t) {
              return '<tr><th class="wrap">' + t[0] + '</th><td class="' + tone(t[1] - 1) + '">' + pc(t[1] - 1, 1, true) + '</td><td>' + pc(ann(t[1]), 1, true) + '</td><td>' + (t[2] === null ? '-' : t[2] + ' of ' + nSw) + '</td></tr>';
            }).join('') + '</tbody></table></div>';
          h += '<p class="note">Windows here do not overlap. Returns come from each strategy’s continuous run, so they ignore the extra trading cost of changing strategy. A real switch costs a little more. If switching does not beat staying with one strategy, month-by-month changes are not paying.</p>';
        }
      }

      /* A. every strategy that beat the list in ALL windows */
      var nW = wins.length;
      var allOk = rank.filter(function (x) { return x.p.n > 0 && x.p.ok === x.p.n; }).sort(function (a, b) { return b.mc - a.mc; });
      h += '<h3>Beat the list in ALL ' + nW + ' windows (' + L + ' months)</h3>';
      if (allOk.length) {
        h += '<p class="headline"><b class="good">' + allOk.length + '</b> of ' + recs.length + ' strategies beat the list, with a smaller fall, in every one of the ' + nW + ' windows. Best by median growth: <b>' + nm(recs[allOk[0].i]) + '</b>.</p>';
        h += '<div class="scroll"><table class="tbl"><thead><tr><th class="wrap">Strategy</th><th>Windows beaten</th><th>Median growth</th><th>Median fall</th><th>Worst window growth</th></tr></thead><tbody>' +
          allOk.slice(0, 25).map(function (x) {
            var r = recs[x.i];
            return '<tr class="pick" tabindex="0" data-fw="' + fw(r) + '"><th class="wrap">' + nm(r) + '</th><td class="good">' + x.p.ok + ' of ' + x.p.n + '</td><td class="' + tone(x.mc) + '">' + pc(G(x.mc), 1, true) + '</td><td class="bad">' + pc(x.md, 0) + '</td><td class="' + tone(x.wc) + '">' + pc(G(x.wc), 1, true) + '</td></tr>';
          }).join('') + '</tbody></table></div>';
        if (allOk.length > 25) h += '<p class="note">Showing the best 25 of ' + allOk.length + ' by median growth.</p>';
      } else {
        h += '<p class="headline"><b class="bad">No strategy</b> beat the list in all ' + nW + ' windows. The closest is <b>' + nm(recs[rank[0].i]) + '</b> with ' + rank[0].p.ok + ' of ' + rank[0].p.n + '.</p>';
      }

      /* B. anchor window: take its best strategy and test it everywhere */
      var ai = -1;
      wins.forEach(function (w, k) { if (w.s === anchor) ai = k; });
      var aMiss = ai < 0; if (aMiss) ai = 0;
      var aw = wins[ai], aList = aw.list.slice(0, 3);
      h += '<h3>Anchor window: ' + lbl(aw.s) + ' to ' + lbl(aw.s + L - 1) + '</h3>';
      if (aMiss && isFinite(anchor)) h += '<p class="note">No ' + L + '-month window starts in ' + lbl(anchor) + ' inside your period, so the first window is used.</p>';
      h += '<p class="headline">Best strategy of this window: <b>' + nm(recs[aList[0].i]) + '</b>. It beat the list in <b class="' + (per[aList[0].i].ok === per[aList[0].i].n ? 'good' : 'warn') + '">' + per[aList[0].i].ok + ' of ' + per[aList[0].i].n + '</b> windows.</p>';
      h += '<div class="scroll"><table class="tbl"><thead><tr><th class="wrap">Window</th><th>List</th>' + aList.map(function (it, q) { return '<th class="wrap">#' + (q + 1) + ' ' + nm(recs[it.i]) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        wins.map(function (w, k) {
          return '<tr class="' + (k === ai ? 'on' : '') + '"><th class="wrap">' + lbl(w.s) + ' to ' + lbl(w.s + L - 1) + '</th><td>' + pc(G(per[aList[0].i].ws[k].bcagr), 1, true) + '</td>' +
            aList.map(function (it) { var z = per[it.i].ws[k]; return '<td class="' + (z.ok ? 'good' : 'bad') + '">' + pc(G(z.cagr), 1, true) + ' (fall ' + pc(z.dd, 0) + ')</td>'; }).join('') + '</tr>';
        }).join('') +
        '<tr><th class="wrap">Windows beaten</th><td>-</td>' + aList.map(function (it) { return '<td>' + per[it.i].ok + ' of ' + per[it.i].n + '</td>'; }).join('') + '</tr></tbody></table></div>';
      h += '<p class="note">Green means that strategy beat the list with a smaller fall in that window, red means it did not. Growth is yearly growth for windows of 12 months or more, and growth in the window itself for shorter ones. Change Anchor window starts to look at any other month.</p>';

      /* C. every window's best strategy, and how it did in all the other windows */
      h += '<h3>Each window\'s best strategy, tested in all windows</h3>';
      h += '<div class="scroll"><table class="tbl"><thead><tr><th class="wrap">Window</th><th class="wrap">Its best strategy</th><th>Windows beaten</th><th>Median growth</th></tr></thead><tbody>' +
        wins.map(function (w) {
          var i = w.list[0].i, p = per[i], r = recs[i];
          return '<tr class="pick" tabindex="0" data-fw="' + fw(r) + '"><th class="wrap">' + lbl(w.s) + ' to ' + lbl(w.s + L - 1) + '</th><td class="wrap">' + nm(r) + '</td><td class="' + (p.ok === p.n ? 'good' : (p.ok / p.n >= 0.5 ? '' : 'bad')) + '">' + p.ok + ' of ' + p.n + '</td><td class="' + tone(medianOf(p.cg)) + '">' + pc(G(medianOf(p.cg)), 1, true) + '</td></tr>';
        }).join('') + '</tbody></table></div>';
    });
    if (lens.length > 1) {
      var ov = overall.map(function (o, i) { return { i: i, f: o.c ? o.sum / o.c : 0 }; }).sort(function (a, b) { return b.f - a.f; }).slice(0, 8);
      h += '<h3>Best across all lengths</h3><p class="note">Average share of windows in which the strategy beat the list with a smaller fall, over every length you ticked. A strategy high here works whatever start month and holding length you pick, so it is the least likely to be luck.</p>';
      h += '<div class="scroll"><table class="tbl"><thead><tr><th class="wrap">Strategy</th><th>Average share beaten</th>' + lens.map(function (L) { return '<th>' + L + 'm</th>'; }).join('') + '</tr></thead><tbody>' +
        ov.map(function (x) {
          var r = recs[x.i];
          return '<tr class="pick" tabindex="0" data-fw="' + fw(r) + '"><th class="wrap">' + nm(r) + '</th><td class="' + (x.f >= 0.75 ? 'good' : '') + '">' + pc(x.f, 0) + '</td>' + lens.map(function (L) { var p = res[L].per[x.i]; return '<td>' + (p.n ? p.ok + '/' + p.n : '-') + '</td>'; }).join('') + '</tr>';
        }).join('') + '</tbody></table></div>';
      var every = recs.map(function (r, i) { return i; }).filter(function (i) { return lens.every(function (L) { var p = res[L].per[i]; return p.n > 0 && p.ok === p.n; }); });
      h += '<p class="headline">' + (every.length ? '<b class="good">' + every.length + '</b> strategies beat the list in every window of every length you ticked. Best: <b>' + nm(recs[every.sort(function (a, b) { return medianOf(res[lens[0]].per[b].cg) - medianOf(res[lens[0]].per[a].cg); })[0]]) + '</b>.' : '<b class="bad">No strategy</b> beat the list in every window of every length you ticked.') + '</p>';
    }
    h += '<p class="note">How to read this: the best strategy in each window is picked with hindsight, so part of it is luck. Trust the consistency tables more. Numbers in the window table come from a fresh portfolio started in that window. The search itself reuses one continuous run for speed, so a few borderline picks can differ slightly. Windows that overlap share months. Your stock list holds today\u2019s survivors, which flatters old periods. Not investment advice.</p>';
    return h;
  }
  mount();
})();
`;

/* ===== Pattern advisor: regime, candle and chart patterns -> which strategy tends to win, checked walk-forward ===== */
var ADV_JS = String.raw`
(function () {
  var busy = false;
  var el = function (id) { return document.getElementById(id); };
  function nm(r) { return esc(r.name) + ' (filter ' + (r.filt ? 'ON' : 'OFF') + ')'; }
  function fw(r) { var w = r.w; return [w.m12, w.m6, w.m3, w.m1, w.lv, w.v12, w.v6, w.v3, r.filt].join(','); }
  function setOut(h) { el('adv-out').innerHTML = h; }
  var TAGS = [
    ['Long downtrend', 'Regime', 'index below its 10-month average and down over 12 months'],
    ['Uptrend', 'Regime', 'index above its 10-month average, up over 12 and 3 months'],
    ['Sharp fall then rebound', 'Regime', 'fell 12% or more within the last 6 months, then bounced 6% or more off the low'],
    ['Sharp fall last month', 'Regime', 'index lost 6% or more last month'],
    ['Going nowhere', 'Regime', '12-month change within plus or minus 8%'],
    ['Weak breadth', 'Regime', 'fewer than 40% of stocks above their 10-month average'],
    ['Strong breadth', 'Regime', 'more than 70% of stocks above their 10-month average'],
    ['Hammer', 'Candle', 'long lower shadow after a fall'],
    ['Bullish engulfing', 'Candle', 'up candle covering the previous down candle'],
    ['Strong up month', 'Candle', 'up candle closing in its top fifth'],
    ['Shooting star', 'Candle', 'long upper shadow after a rise'],
    ['Bearish engulfing', 'Candle', 'down candle covering the previous up candle'],
    ['Strong down month', 'Candle', 'down candle closing in its bottom fifth'],
    ['Breakout to 12m high', 'Chart', 'index closed above its highest close of the last 12 months'],
    ['Breakdown to 12m low', 'Chart', 'index closed below its lowest close of the last 12 months'],
    ['Short average crossed up', 'Chart', '3-month average moved above the 10-month average'],
    ['Short average crossed down', 'Chart', '3-month average moved below the 10-month average']
  ];
  var GRP = { reg: 'Regime', candle: 'Candle', chart: 'Chart' };

  function mount() {
    var tab = el('tab-pk'), out = el('out-pk');
    if (!tab || !out || el('adv-card')) return;
    var c = document.createElement('div');
    c.className = 'card'; c.id = 'adv-card';
    c.innerHTML = '<h2>Pattern advisor: which strategy for this month?</h2>' +
      '<p class="note">Step 1: the tool describes the market in every past month (regime, candle on an equal-weight index of your list, chart pattern) and notes which strategy did best after each pattern. Step 2: it reads the same patterns for this month and names the strategy that history favors. Step 3: it tests the whole idea walk-forward, choosing each month only from earlier months, against simpler ways of choosing. Step 4: give a past month in Check from (for example Feb 2016) and it shows what it would have advised for that month using only earlier data, and compares that with the strategy that really came out #1.</p>' +
      '<div class="fields"><div class="field"><div class="lab"><label for="adv-min">Minimum past months per pattern</label></div><select id="adv-min"><option value="1" selected>No minimum (use every month)</option><option value="3">3 months</option><option value="6">6 months</option><option value="8">8 months</option><option value="10">10 months</option><option value="12">12 months</option></select></div>' +
      '<div class="field"><div class="lab"><label for="adv-from">Check on past dates: from month (blank = all)</label></div><input id="adv-from" type="month"></div>' +
      '<div class="field"><div class="lab"><label for="adv-to">Check to month (blank = latest)</label></div><input id="adv-to" type="month"></div>' +
      '<div class="field"><div class="lab"><label for="adv-wfrom">Explain a window: from month</label></div><input id="adv-wfrom" type="month"></div>' +
      '<div class="field"><div class="lab"><label for="adv-wto">Explain a window: to month</label></div><input id="adv-wto" type="month"></div></div>' +
      '<div class="row"><button type="button" class="btn" id="adv-run">Read patterns and advise</button></div>' +
      '<div class="row"><button type="button" class="btn ghost" id="adv-explain">Explain this window: why the #1 formula?</button></div>' +
      '<div id="adv-xout" class="out"></div>' +
      '<h3>Study the #1 neighbourhood</h3>' +
      '<p class="note">For every window, take the top strategies (the #1 and the ones around it) and measure which ingredients and weights keep showing up. Then test if one period\u2019s ingredients point to the next period\u2019s winners.</p>' +
      '<div class="fields"><div class="field"><div class="lab"><label for="adv-slen">Window length</label></div><select id="adv-slen"><option value="1">1 month</option><option value="3">3 months</option><option value="6">6 months</option><option value="12" selected>12 months</option><option value="24">24 months</option></select></div>' +
      '<div class="field"><div class="lab"><label for="adv-scl">Around the #1: top share of strategies</label></div><select id="adv-scl"><option value="1">Top 1%</option><option value="5" selected>Top 5%</option><option value="10">Top 10%</option></select></div></div>' +
      '<div class="row"><button type="button" class="btn" id="adv-study">Study the #1 neighbourhood</button></div>' +
      '<div id="adv-sout" class="out"></div>' +
      '<div id="adv-out" class="out"></div>';
    tab.insertBefore(c, out);
    ['input', 'change'].forEach(function (t) { c.addEventListener(t, function (e) { e.stopPropagation(); }); });
    el('adv-run').addEventListener('click', run);
    el('adv-explain').addEventListener('click', explain);
    el('adv-study').addEventListener('click', study);
  }

  function buildIdx(P, S) {
    var K = P.K, n = P.syms.length, idx = new Array(K).fill(NaN), O = new Array(K).fill(NaN), H = new Array(K).fill(NaN), L = new Array(K).fill(NaN), k, s;
    idx[0] = 100;
    for (k = 1; k < K; k++) {
      var sm = 0, ct = 0, so = 0, sh = 0, sl = 0, c2 = 0;
      for (s = 0; s < n; s++) {
        var a = P.closes[s][k], b = P.closes[s][k - 1];
        if (isFinite(a) && isFinite(b) && b > 0) {
          sm += a / b - 1; ct++;
          if (P.hasOHLC) {
            var o = P.opens[s][k], h = P.highs[s][k], l = P.lows[s][k];
            if (isFinite(o) && isFinite(h) && isFinite(l)) { so += o / b; sh += h / b; sl += l / b; c2++; }
          }
        }
      }
      idx[k] = idx[k - 1] * (1 + (ct ? sm / ct : 0));
      if (P.hasOHLC && c2 >= Math.max(3, n * 0.3)) {
        O[k] = idx[k - 1] * so / c2; H[k] = idx[k - 1] * sh / c2; L[k] = idx[k - 1] * sl / c2;
        H[k] = Math.max(H[k], O[k], idx[k]); L[k] = Math.min(L[k], O[k], idx[k]);
      }
    }
    return { idx: idx, O: O, H: H, L: L, ohlc: !!P.hasOHLC };
  }
  function avg(a, i0, i1) { var s = 0, c = 0, i; for (i = i0; i <= i1; i++) { s += a[i]; c++; } return s / c; }
  function tagsAt(P, S, X, k) {
    var out = [], idx = X.idx, i, n = P.syms.length;
    if (k < 12 || !isFinite(idx[k]) || !isFinite(idx[k - 12])) return out;
    var r12 = idx[k] / idx[k - 12] - 1, r3 = idx[k] / idx[k - 3] - 1, r1 = idx[k] / idx[k - 1] - 1, ma10 = avg(idx, k - 9, k), up = idx[k] > ma10;
    var up1 = 0, tot = 0, s;
    for (s = 0; s < n; s++) { var tq = S.trend[s][k]; if (isFinite(tq)) { tot++; if (tq > 0) up1++; } }
    var br = tot ? up1 / tot : NaN;
    if (r12 < 0 && !up) out.push(0);
    if (up && r12 > 0 && r3 > 0) out.push(1);
    var ti = k, tv = idx[k];
    for (i = k - 5; i <= k; i++) if (idx[i] < tv) { tv = idx[i]; ti = i; }
    var pv = -Infinity; for (i = k - 11; i <= ti; i++) if (idx[i] > pv) pv = idx[i];
    if (ti < k && tv / pv - 1 <= -0.12 && idx[k] / tv - 1 >= 0.06) out.push(2);
    if (r1 <= -0.06) out.push(3);
    if (Math.abs(r12) < 0.08) out.push(4);
    if (isFinite(br) && br < 0.4) out.push(5);
    if (isFinite(br) && br > 0.7) out.push(6);
    if (X.ohlc && isFinite(X.O[k]) && X.H[k] > X.L[k]) {
      var o = X.O[k], h = X.H[k], l = X.L[k], c = idx[k], rg = h - l, body = Math.abs(c - o), upper = h - Math.max(o, c), lower = Math.min(o, c) - l, pos = (c - l) / rg, core = Math.max(body, 0.1 * rg), prior = idx[k - 1] / idx[k - 4] - 1;
      var po = X.O[k - 1], pc = idx[k - 1];
      if (lower >= 2 * core && upper <= 0.3 * rg && prior < 0) out.push(7);
      if (isFinite(po) && pc < po && c > o && o <= pc && c >= po) out.push(8);
      if (c > o && pos >= 0.8) out.push(9);
      if (upper >= 2 * core && lower <= 0.3 * rg && prior > 0) out.push(10);
      if (isFinite(po) && pc > po && c < o && o >= pc && c <= po) out.push(11);
      if (c < o && pos <= 0.2) out.push(12);
    }
    var hi = -Infinity, lo = Infinity; for (i = k - 12; i <= k - 1; i++) { if (idx[i] > hi) hi = idx[i]; if (idx[i] < lo) lo = idx[i]; }
    if (idx[k] > hi) out.push(13);
    if (idx[k] < lo) out.push(14);
    var s3 = avg(idx, k - 2, k), s3p = avg(idx, k - 3, k - 1), l10p = avg(idx, k - 10, k - 1);
    if (s3 > ma10 && s3p <= l10p) out.push(15);
    if (s3 < ma10 && s3p >= l10p) out.push(16);
    return out;
  }
  function pickBy(act, sum, cnt, sumAll, minN, M) {
    var use = act.filter(function (g) { return cnt[g] >= minN; }), best = -1, bv = -Infinity, i, v;
    for (i = 0; i < M; i++) {
      if (!use.length) v = sumAll[i];
      else { v = 0; use.forEach(function (g) { v += sum[g][i] / cnt[g]; }); v /= use.length; }
      if (v > bv) { bv = v; best = i; }
    }
    return best;
  }
  /* Ingredient composer: learn, per pattern, how each ingredient is placed (+, -, absent, filter) in the real #1 strategies, then build the strategy
     whose ingredients are best supported by the patterns active now. Evidence = log(share among #1s / share among all strategies), smoothed. */
  var AL = 3;
  function cScores(act, L, mn, M) {
    var use = act.filter(function (g) { return L.cnt[g] >= mn; }), C = L.C, srcs = use.length ? use.map(function (g) { return { a: L.wn[g], b: L.wy[g] }; }) : [{ a: L.wA, b: L.wAy }];
    var lift = [], c, si, i, v, e, k;
    for (c = 0; c < C; c++) lift.push(new Float64Array(L.NS[c]));
    srcs.forEach(function (sr) {
      var tot = 0, cn = [], w;
      for (c = 0; c < C; c++) cn.push(new Float64Array(L.NS[c]));
      for (i = 0; i < M; i++) { w = sr.a[i] + sr.b[i]; if (w) { tot += w; for (c = 0; c < C; c++) cn[c][L.SI[i * C + c]] += w; } }
      for (c = 0; c < C; c++) for (si = 0; si < L.NS[c]; si++) { var B = L.B[c][si]; lift[c][si] += Math.log(((cn[c][si] + AL * B) / (tot + AL)) / B) / srcs.length; }
    });
    var V = new Float64Array(M), E = new Float64Array(M);
    for (i = 0; i < M; i++) {
      v = 0; for (c = 0; c < C; c++) v += lift[c][L.SI[i * C + c]];
      if (!use.length) e = L.sumAll[i]; else { e = 0; use.forEach(function (g) { e += L.sum[g][i] / L.cnt[g]; }); e /= use.length; }
      V[i] = v; E[i] = e;
    }
    return { v: V, e: E, lift: lift, use: use };
  }
  function recipeOf(L, lift) {
    var out = [], c, si, bs, bl;
    for (c = 0; c < L.C; c++) { bs = 0; bl = -Infinity; for (si = 0; si < L.NS[c]; si++) if (lift[c][si] > bl) { bl = lift[c][si]; bs = si; } out.push({ c: c, val: L.SV[c][bs], lift: bl }); }
    return out;
  }
  function pickC(act, L, mn, M, wantRc) {
    var r = cScores(act, L, mn, M), best = 0, i;
    for (i = 1; i < M; i++) if (r.v[i] > r.v[best] || (r.v[i] === r.v[best] && r.e[i] > r.e[best])) best = i;
    L.rc = wantRc ? recipeOf(L, r.lift) : null;
    return best;
  }
  /* #1-based choice (older): score each strategy by how often it was the real #1 (month and rolling 12-month year) in past months with the same patterns */
  function pickW(act, L, mn, M) {
    var use = act.filter(function (g) { return L.cnt[g] >= mn; }), best = 0, bv = -Infinity, be = -Infinity, i, v, e;
    for (i = 0; i < M; i++) {
      if (!use.length) { v = (L.nA ? L.wA[i] / L.nA : 0) + (L.nAy ? L.wAy[i] / L.nAy : 0); e = L.sumAll[i]; }
      else { v = 0; e = 0; use.forEach(function (g) { v += L.wn[g][i] / L.cnt[g] + (L.cy[g] ? L.wy[g][i] / L.cy[g] : 0); e += L.sum[g][i] / L.cnt[g]; }); v /= use.length; e /= use.length; }
      if (v > bv || (v === bv && e > be)) { bv = v; be = e; best = i; }
    }
    return best;
  }
  function perf(rets, bens) {
    var n = rets.length, eq = 1, be = 1, pk = 1, bpk = 1, dd = 0, bdd = 0, hit = 0, ex = 0, i;
    for (i = 0; i < n; i++) { eq *= 1 + rets[i]; be *= 1 + bens[i]; pk = Math.max(pk, eq); bpk = Math.max(bpk, be); dd = Math.min(dd, eq / pk - 1); bdd = Math.min(bdd, be / bpk - 1); if (rets[i] > bens[i]) hit++; ex += rets[i] - bens[i]; }
    return { n: n, cagr: Math.pow(eq, 12 / n) - 1, bcagr: Math.pow(be, 12 / n) - 1, dd: dd, bdd: bdd, hit: hit / n, ex: ex / n };
  }
  function pairT(a, b) {
    var d = [], i; for (i = 0; i < a.length; i++) d.push(a[i] - b[i]);
    var m = mean(d), sd = sdev(d);
    return { mean: m, t: d.length > 5 && sd > 0 ? m / (sd / Math.sqrt(d.length)) : NaN };
  }

  function ymv(id) { var e = el(id), mm = /^(\d{4})-(\d{2})/.exec(e && e.value || ''); return mm ? (+mm[1]) * 12 + (+mm[2]) - 1 : NaN; }
  var CACHE = null;
  function setX(h) { el('adv-xout').innerHTML = h; }
  function tick() { return new Promise(function (r) { setTimeout(r, 0); }); }
  function fullW(w) { var o = { m12: 0, m6: 0, m3: 0, m1: 0, lv: 0, v12: 0, v6: 0, v3: 0 }; Object.keys(w).forEach(function (k) { o[k] = w[k]; }); return o; }
  var CN = { m12: '12m', m6: '6m', m3: '3m', m1: '1m', v12: '12m per risk', v6: '6m per risk', v3: '3m per risk', lv: 'calm' };
  function ingr(w, filt) { var o = []; FCOMPS.forEach(function (c) { if (w[c]) o.push(c + (w[c] > 0 ? '+' : '-')); }); o.push(filt ? 'F1' : 'F0'); return o; }
  function ingName(id) { if (id === 'F1') return 'Filter ON'; if (id === 'F0') return 'Filter OFF'; return CN[id.slice(0, -1)] + ' ' + (id.slice(-1) === '+' ? '+100' : '−100'); }
  function tb(head, rows) { return '<div class="scroll"><table class="tbl"><thead><tr>' + head.map(function (x, i) { return '<th' + (i === 0 ? ' class="wrap"' : '') + '>' + x + '</th>'; }).join('') + '</tr></thead><tbody>' + rows.join('') + '</tbody></table></div>'; }
  function qstat(q) { var wn = 0; q.rows.forEach(function (r) { if (r.ret > r.bench) wn++; }); return { cagr: q.cagr, bcagr: q.bcagr, dd: q.dd, bdd: q.bdd, win: wn / q.rows.length, n: q.rows.length, ok: q.cagr > q.bcagr && q.dd > q.bdd }; }
  function wsim(P, S, C, w, filt, a, b) {
    var sw = PK_W, sf = PK_FILTOV;
    PK_FILTOV = ''; PK_W = Object.assign({}, w, { filt: filt });
    try { var q = portSim(P, S, 'custom', C.N, C.ex, C.cost, PK_OPT.rg, PK_OPT.rgL, a, b, PK_OPT.sl, C.wts); dropCustom(P); return q; } finally { PK_W = sw; PK_FILTOV = sf; }
  }
  function ckey(N, cost, ex) { return [PK_VER, PK_CACHE.P ? PK_CACHE.P.K : 0, N, cost, ex, PK_OPT.sl, PK_OPT.rg, PK_OPT.rgL, PK_WM, PK_WM === 'custom' ? PK_WLIST : '', PK_MINCONF, PK_BREADTH, PK_MODE].join('|'); }
  async function build(say) {
    var P = PK_CACHE.P, S = PK_CACHE.S;
    if (!P || !S || PK_CACHE.stocks !== PKS.store.stocks) return { err: 'Load your stocks and wait for the picks table to appear, then tap again.' };
    var N = Math.round(val('pk-n', 10, 1, 20)), cost = val('pk-cost', 0.25, 0, 5);
    var ex = PK_OPT.exit > 0 ? Math.max(PK_OPT.exit, N + 1) : 0, wts = weightsFor(PK_WM, N), key = ckey(N, cost, ex);
    if (CACHE && CACHE.key === key && CACHE.P === P) return CACHE;
    var cands = genCands(), recs = [], saveW = PK_W, saveF = PK_FILTOV, total = cands.length * 2, done = 0;
    PK_FILTOV = '';
    try {
      for (var ci = 0; ci < cands.length; ci++) {
        for (var f = 0; f < 2; f++) {
          PK_W = Object.assign({}, cands[ci], { filt: f });
          var q = portSim(P, S, 'custom', N, ex, cost, PK_OPT.rg, PK_OPT.rgL, NaN, NaN, PK_OPT.sl, wts);
          dropCustom(P); done++;
          if (!q.err) recs.push({ w: cands[ci], filt: f, name: stratName(cands[ci]), rows: q.rows });
        }
        if (ci % 6 === 0) { say('<p class="note">Testing strategies over the whole history: ' + done + ' of ' + total + '. Please keep this page open...</p>'); await tick(); }
      }
    } finally { PK_W = saveW; PK_FILTOV = saveF; }
    if (!recs.length) return { err: 'Too few months of results. Add stocks with longer history.' };
    var T = recs[0].rows.length; recs = recs.filter(function (r) { return r.rows.length === T; });
    CACHE = { key: key, P: P, S: S, recs: recs, N: N, cost: cost, ex: ex, wts: wts };
    return CACHE;
  }

  async function explain() {
    if (busy) return;
    var a = ymv('adv-wfrom'), b = ymv('adv-wto');
    if (!isFinite(a) || !isFinite(b)) { setX(errBox('Fill both months of the window, for example Nov 2015 to Oct 2016.')); return; }
    if (b < a + 2) { setX(errBox('The window must cover at least 3 months.')); return; }
    busy = true;
    try {
      setX('<p class="note">Preparing...</p>');
      var C = await build(setX);
      if (C.err) { setX(errBox(C.err)); return; }
      var P = C.P, S = C.S, recs = C.recs, M = recs.length, L = b - a + 1, T = recs[0].rows.length, kFirst = recs[0].rows[0].k;
      var firstOut = P.lo + kFirst + 1, lastOut = P.lo + kFirst + T, ml = function (key) { return monthLabel(P, key - P.lo); };
      if (a < firstOut) { setX(errBox('The first month that can be tested is ' + ml(firstOut) + '. Start the window then or later.')); return; }
      if (b > lastOut) { setX(errBox('The latest month with a known result is ' + ml(lastOut) + '. End the window then or earlier.')); return; }
      /* 1. every strategy on the window only, the same way the strategy finder does it */
      var cands = genCands(), list = [], done = 0, ci, f, q;
      for (ci = 0; ci < cands.length; ci++) {
        for (f = 0; f < 2; f++) {
          q = wsim(P, S, C, fullW(cands[ci]), f, a, b); done++;
          if (q.err || q.rows.length !== L) continue;
          var st = qstat(q); st.w = fullW(cands[ci]); st.filt = f; st.name = stratName(cands[ci]); list.push(st);
        }
        if (ci % 8 === 0) { setX('<p class="note">Testing every strategy on the window: ' + done + ' of ' + cands.length * 2 + '...</p>'); await tick(); }
      }
      if (!list.length) { setX(errBox('No strategy could be tested on that window. Try a longer window.')); return; }
      var Mw = list.length, byG = list.slice().sort(function (x, y) { return y.cagr - x.cagr; });
      byG.forEach(function (r, i) { r.rk = i + 1; r.ing = ingr(r.w, r.filt); });
      var okList = byG.filter(function (r) { return r.ok; }), base = (okList.length ? okList : byG)[0], nOk = okList.length;
      var t5 = Math.max(10, Math.round(Mw * 0.05)); byG.slice(0, t5).forEach(function (r) { r.t5 = true; });
      var h = '<h3>Window ' + esc(ml(a)) + ' to ' + esc(ml(b)) + ' (' + L + ' months)</h3>';
      h += '<p class="headline">' + nOk + ' of ' + Mw + ' strategies beat the list with a smaller fall. The #1 is <b>' + nm(base) + '</b>: ' + pc(base.cagr, 1, true) + ' a year against the list ' + pc(base.bcagr, 1, true) + ', worst fall ' + pc(base.dd, 0) + ' against ' + pc(base.bdd, 0) + ', beat the list in ' + pc(base.win, 0) + ' of months.</p>';
      /* patterns at window start */
      var X = buildIdx(P, S), TG = [], t, i, j;
      for (t = 0; t < T; t++) TG.push(tagsAt(P, S, X, kFirst + t));
      var t0w = (a - 1 - P.lo) - kFirst, tgNow = TG[t0w] || [], tcount = TAGS.map(function () { return 0; });
      TG.forEach(function (arr) { arr.forEach(function (gi) { tcount[gi]++; }); });
      h += '<p class="note"><b>Market at the start (end of ' + esc(ml(a - 1)) + '):</b> ' + (tgNow.length ? tgNow.map(function (gi) { return esc(TAGS[gi][0]) + ' (' + TAGS[gi][1].toLowerCase() + ', seen in ' + tcount[gi] + ' of ' + T + ' months)'; }).join('; ') : 'no regime, candle or chart pattern was active') + '.</p>';
      /* 2. ingredients */
      var ids = {};
      list.forEach(function (r) { r.ing.forEach(function (id) { (ids[id] = ids[id] || []).push(r); }); });
      var irows = Object.keys(ids).map(function (id) {
        var g = ids[id], gs = g.slice().sort(function (x, y) { return y.cagr - x.cagr; });
        return { id: id, n: g.length, ok: g.filter(function (r) { return r.ok; }).length, med: medianOf(g.map(function (r) { return r.cagr; })), inTop: g.filter(function (r) { return r.t5; }).length, lift: (g.filter(function (r) { return r.t5; }).length / g.length) / (t5 / Mw), best: gs[0], inBase: base.ing.indexOf(id) >= 0 };
      });
      irows.sort(function (x, y) { return (y.inBase - x.inBase) || (y.lift - x.lift); });
      h += '<h3>Each ingredient on this window</h3>';
      h += tb(['Ingredient', 'Strategies using it', 'Beat list, smaller fall', 'Typical growth', 'In the top 5%', 'Lift', 'Best one with it'], irows.map(function (r) {
        return '<tr class="' + (r.inBase ? 'on' : '') + '"><th class="wrap">' + (r.inBase ? '● ' : '') + esc(ingName(r.id)) + '</th><td>' + r.n + '</td><td>' + r.ok + ' (' + pc(r.ok / r.n, 0) + ')</td><td class="' + tone(r.med) + '">' + pc(r.med, 1, true) + '</td><td>' + r.inTop + ' of ' + t5 + '</td><td class="' + (r.lift >= 1.5 ? 'good' : (r.lift < 0.7 ? 'bad' : '')) + '">' + num(r.lift, 2) + '</td><td class="wrap">' + esc(r.best.name) + ' (' + (r.best.filt ? 'ON' : 'OFF') + ') ' + pc(r.best.cagr, 1, true) + '</td></tr>';
      }));
      h += '<p class="note">● marks the ingredients of the #1. Lift compares how often an ingredient appears among the top 5% with how often it appears overall: 1.00 means no better than chance, above 1.5 means clearly over-represented, below 0.7 means under-represented. Strategies use several ingredients at once, so one ingredient alone proves little.</p>';
      /* 3. neighbours of the #1 */
      var vars = [], addV = function (label, w, flt) { if (FCOMPS.some(function (c) { return w[c]; })) vars.push({ label: label, w: w, filt: flt }); };
      FCOMPS.forEach(function (c) {
        if (base.w[c]) {
          var sg = base.w[c] > 0 ? '+' : '-', w1 = Object.assign({}, base.w), w2 = Object.assign({}, base.w);
          w1[c] = 0; w2[c] = -base.w[c];
          addV('Remove ' + ingName(c + sg), w1, base.filt);
          addV('Flip to ' + ingName(c + (sg === '+' ? '-' : '+')), w2, base.filt);
        } else {
          [100, -100].forEach(function (s) { var w3 = Object.assign({}, base.w); w3[c] = s; addV('Add ' + ingName(c + (s > 0 ? '+' : '-')), w3, base.filt); });
        }
      });
      addV('Filter ' + (base.filt ? 'OFF' : 'ON') + ' instead', base.w, 1 - base.filt);
      var all1 = [{ label: 'The #1 as it is', w: base.w, filt: base.filt, isBase: true }].concat(vars);
      for (i = 0; i < all1.length; i++) {
        var v = all1[i], qw = wsim(P, S, C, v.w, v.filt, a, b), qf = wsim(P, S, C, v.w, v.filt, NaN, NaN);
        if (qw.err || qf.err) { v.bad = true; continue; }
        v.win = qstat(qw); v.agg = scanAgg(qf.rows, L); v.rk = 1 + list.filter(function (r) { return r.cagr > v.win.cagr; }).length;
        if (i % 3 === 0) { setX('<p class="note">Comparing one-step changes to the #1: ' + (i + 1) + ' of ' + all1.length + '...</p>'); await tick(); }
      }
      var B0 = all1[0];
      if (!B0.bad && B0.agg) {
        var okV = vars.filter(function (v) { return !v.bad && v.agg; });
        okV.forEach(function (v) {
          var dW = v.win.cagr - B0.win.cagr, dH = v.agg.medCagr - B0.agg.medCagr;
          v.verdict = dW > 0 && dH > 0 ? 'Better in the window and over history' : (dW > 0 ? 'Better in the window only, likely fitted to it' : (dH > 0 ? 'Worse in the window, better over history' : 'Worse in both'));
          v.dW = dW; v.dH = dH;
        });
        okV.sort(function (x, y) { return y.dW - x.dW; });
        h += '<h3>Why this mix and not a small change of it?</h3>';
        var row = function (v, isB) {
          return '<tr class="' + (isB ? 'on' : '') + '"><th class="wrap">' + esc(v.label) + (isB ? '<br><span class="muted">' + nm(base) + '</span>' : '') + '</th><td class="' + tone(v.win.cagr) + '">' + pc(v.win.cagr, 1, true) + '</td><td class="bad">' + pc(v.win.dd, 0) + '</td><td>' + v.rk + ' of ' + Mw + '</td><td>' + (v.agg ? pc(v.agg.beat, 0) : '–') + '</td><td class="' + tone(v.agg ? v.agg.medCagr : NaN) + '">' + (v.agg ? pc(v.agg.medCagr, 1, true) : '–') + '</td><td class="wrap">' + (isB ? 'This one' : esc(v.verdict)) + '</td></tr>';
        };
        h += tb(['Change', 'Window growth', 'Window fall', 'Rank in window', 'All ' + L + '-month windows: beat list', 'Typical growth there', 'Verdict'], [row(B0, true)].concat(okV.map(function (v) { return row(v, false); })));
        var bothBetter = okV.filter(function (v) { return v.dW > 0 && v.dH > 0; }).length, winBetter = okV.filter(function (v) { return v.dW > 0; }).length, histBetter = okV.filter(function (v) { return v.dH > 0; }).length;
        h += '<p class="note"><b>' + winBetter + ' of ' + okV.length + '</b> one-step changes did better than the #1 in this window, <b>' + histBetter + '</b> did better over all ' + L + '-month windows of history, and <b>' + bothBetter + '</b> did better in both. ' + (winBetter === 0 ? 'No small change improved the window, so this exact mix is a local peak for it.' : 'Changes that only win in the window are the ones to distrust, because the #1 was picked after seeing this window.') + '</p>';
        var m1 = okV.filter(function (v) { return v.label.indexOf('1m') >= 0; });
        if (m1.length) h += '<p class="note"><b>The 1m question:</b> ' + m1.map(function (v) { return esc(v.label) + ' gives ' + pc(v.win.cagr, 1, true) + ' in the window (rank ' + v.rk + ') against ' + pc(B0.win.cagr, 1, true) + ', and a typical ' + pc(v.agg.medCagr, 1, true) + ' over all windows against ' + pc(B0.agg.medCagr, 1, true) + '. ' + esc(v.verdict) + '.'; }).join(' ') + '</p>';
      }
      /* 4. rolling windows across the whole history: where this formula comes */
      var RET = recs.map(function (r) { return r.rows.map(function (x) { return x.ret; }); }), BEN = recs[0].rows.map(function (x) { return x.bench; });
      var tIdx = -1; for (i = 0; i < M; i++) if (recs[i].filt === base.filt && FCOMPS.every(function (c) { return (recs[i].w[c] || 0) === base.w[c]; })) { tIdx = i; break; }
      var RI = recs.map(function (r) { return ingr(r.w, r.filt); }), wins = [], th = Math.ceil(M * 0.1);
      if (tIdx >= 0) {
        for (var s0 = 0; s0 + L <= T; s0++) {
          var be = 1, bpk = 1, bdd = 0, cg = new Float64Array(M), dds = new Float64Array(M), bI = -1, bV = -Infinity, aI = 0, aV = -Infinity, jj;
          for (jj = 0; jj < L; jj++) { be *= 1 + BEN[s0 + jj]; if (be > bpk) bpk = be; if (be / bpk - 1 < bdd) bdd = be / bpk - 1; }
          var bcg = Math.pow(be, 12 / L) - 1;
          for (i = 0; i < M; i++) {
            var eq = 1, pk = 1, dd = 0, row2 = RET[i];
            for (jj = 0; jj < L; jj++) { eq *= 1 + row2[s0 + jj]; if (eq > pk) pk = eq; if (eq / pk - 1 < dd) dd = eq / pk - 1; }
            cg[i] = Math.pow(eq, 12 / L) - 1; dds[i] = dd;
            if (cg[i] > aV) { aV = cg[i]; aI = i; }
            if (cg[i] > bcg && dd > bdd && cg[i] > bV) { bV = cg[i]; bI = i; }
          }
          if (bI < 0) bI = aI;
          var ab = 0; for (i = 0; i < M; i++) if (cg[i] > cg[tIdx]) ab++;
          wins.push({ s: s0, best: bI, bestC: cg[bI], bc: bcg, tc: cg[tIdx], tOk: cg[tIdx] > bcg && dds[tIdx] > bdd, rank: ab + 1 });
        }
      }
      if (wins.length) {
        var nW = wins.length, good = wins.filter(function (x) { return x.rank <= th; });
        h += '<h3>Where this formula came up in history (' + L + '-month windows)</h3>';
        h += '<p class="headline">Across ' + nW + ' ' + L + '-month windows, <b>' + esc(nm(base)) + '</b> beat the list in ' + wins.filter(function (x) { return x.tc > x.bc; }).length + ', ranked in the top 10% in <b>' + good.length + '</b> (chance gives about ' + Math.round(nW * 0.1) + '), and its typical rank was ' + Math.round(100 * (1 - (medianOf(wins.map(function (x) { return x.rank; })) - 1) / Math.max(1, M - 1))) + '% of all strategies.</p>';
        h += '<div class="chips">' + good.slice(0, 36).map(function (x) { return '<span class="tag">' + esc(monthLabel(P, kFirst + x.s + 1)) + ' (#' + x.rank + ')</span>'; }).join('') + (good.length > 36 ? '<span class="tag">+' + (good.length - 36) + ' more</span>' : '') + '</div>';
        h += '<p class="note">The chips are the starting months of windows where this exact formula was in the top 10% of all strategies, with its rank. Windows that overlap your own window are the ones it was picked on, so look at the others. If they are bunched in one or two periods, it is a period-specific fit and not a repeatable formation.</p>';
        /* ingredient frequency among each window winner */
        var ing2 = {}; RI.forEach(function (arr) { arr.forEach(function (id) { ing2[id] = ing2[id] || { all: 0, win: 0 }; ing2[id].all++; }); });
        wins.forEach(function (x) { RI[x.best].forEach(function (id) { ing2[id].win++; }); });
        var irs = Object.keys(ing2).map(function (id) { return { id: id, share: ing2[id].win / nW, base: ing2[id].all / M, inBase: base.ing.indexOf(id) >= 0 }; });
        irs.sort(function (x, y) { return (y.inBase - x.inBase) || (y.share / y.base - x.share / x.base); });
        h += tb(['Ingredient', 'Share of window #1s that used it', 'Share of all strategies using it', 'Lift'], irs.map(function (r) { var lf = r.share / r.base; return '<tr class="' + (r.inBase ? 'on' : '') + '"><th class="wrap">' + (r.inBase ? '● ' : '') + esc(ingName(r.id)) + '</th><td>' + pc(r.share, 0) + '</td><td>' + pc(r.base, 0) + '</td><td class="' + (lf >= 1.3 ? 'good' : (lf < 0.7 ? 'bad' : '')) + '">' + num(lf, 2) + '</td></tr>'; }));
        h += '<p class="note">For every ' + L + '-month window in history, the #1 strategy was found, and this table counts which ingredients it used. A lift above 1 means the ingredient wins more often than its share of strategies, over all of history and not only your window.</p>';
        /* pattern lift for this formula */
        var prow = [], allRank = mean(wins.map(function (x) { return 1 - (x.rank - 1) / Math.max(1, M - 1); }));
        TAGS.forEach(function (tg, gi) {
          var g = wins.filter(function (x) { return TG[x.s].indexOf(gi) >= 0; });
          if (g.length < 3) return;
          prow.push({ gi: gi, n: g.length, top: g.filter(function (x) { return x.rank <= th; }).length / g.length, beat: g.filter(function (x) { return x.tc > x.bc; }).length / g.length, rk: mean(g.map(function (x) { return 1 - (x.rank - 1) / Math.max(1, M - 1); })), now: tgNow.indexOf(gi) >= 0 });
        });
        prow.sort(function (x, y) { return (y.now - x.now) || (y.rk - x.rk); });
        h += '<h3>Which patterns were present when this formula worked</h3>';
        h += tb(['Pattern at the start of the window', 'Kind', 'Windows', 'Formula in top 10%', 'Formula beat list', 'Typical rank'], ['<tr><th class="wrap">All windows</th><td>–</td><td>' + nW + '</td><td>' + pc(good.length / nW, 0) + '</td><td>' + pc(wins.filter(function (x) { return x.tc > x.bc; }).length / nW, 0) + '</td><td>' + pc(allRank, 0) + '</td></tr>'].concat(prow.map(function (r) {
          return '<tr class="' + (r.now ? 'on' : '') + '"><th class="wrap">' + (r.now ? '● ' : '') + esc(TAGS[r.gi][0]) + '</th><td>' + TAGS[r.gi][1] + '</td><td>' + r.n + '</td><td class="' + (r.top > good.length / nW * 1.3 ? 'good' : '') + '">' + pc(r.top, 0) + '</td><td>' + pc(r.beat, 0) + '</td><td class="' + (r.rk > allRank + 0.05 ? 'good' : (r.rk < allRank - 0.05 ? 'bad' : '')) + '">' + pc(r.rk, 0) + '</td></tr>';
        })));
        h += '<p class="note">● marks patterns active at the start of your window. Compare each row with All windows: a pattern helps only if the top 10% share and the typical rank are clearly above that row, and it has a fair number of windows. Windows overlap heavily, so a few start months count many times. Treat it as a hint.</p>';
        /* most similar historic starts */
        if (tgNow.length) {
          var sim = [];
          wins.forEach(function (x) {
            if (Math.abs(x.s - t0w) < L) return;
            var tg = TG[x.s], inter = tg.filter(function (gi) { return tgNow.indexOf(gi) >= 0; }).length, uni = tg.length + tgNow.length - inter;
            if (uni && inter) sim.push({ x: x, sim: inter / uni, common: tg.filter(function (gi) { return tgNow.indexOf(gi) >= 0; }) });
          });
          sim.sort(function (p, q2) { return (q2.sim - p.sim) || (q2.x.s - p.x.s); });
          var topS = sim.slice(0, 8);
          if (topS.length) {
            h += '<h3>Past starts that looked most like your window</h3>';
            h += tb(['Start month', 'Match', 'Real #1 then', '#1 growth (list)', 'This formula (list)', 'Its rank'], topS.map(function (r) {
              var x = r.x;
              return '<tr><th class="wrap">' + esc(monthLabel(P, kFirst + x.s + 1)) + '<br><span class="muted">' + esc(r.common.map(function (gi) { return TAGS[gi][0]; }).join(', ')) + '</span></th><td>' + pc(r.sim, 0) + '</td><td class="wrap">' + nm(recs[x.best]) + '</td><td>' + pc(x.bestC, 1, true) + ' (' + pc(x.bc, 1, true) + ')</td><td class="' + tone(x.tc - x.bc) + '">' + pc(x.tc, 1, true) + '</td><td>' + x.rank + ' of ' + M + '</td></tr>';
            }));
            var sb = topS.filter(function (r) { return r.x.tc > r.x.bc; }).length;
            h += '<p class="note">In the ' + topS.length + ' past starts with the most similar patterns, this formula beat the list ' + sb + ' times. Match is the share of active patterns the two starts have in common. Nearby months overlap, so these are not independent tests.</p>';
          }
        }
      }
      h += '<p class="note">How to read this: with ' + Mw + ' strategies tried on one window, the #1 is partly luck. What counts is whether the same ingredients keep winning in other windows and similar markets, which the tables above test. This uses your stock list as it is today, so old months look better than real-time results would have been. Not investment advice.</p>';
      setX(h);
    } catch (e) {
      setX(errBox('Something went wrong: ' + e.message));
    } finally { busy = false; }
  }


  /* Research: which ingredients (and weights) sit in the top cluster around the #1, window after window, and do they carry over to the next period? */
  async function study() {
    if (busy) return;
    busy = true;
    var setS = function (h) { el('adv-sout').innerHTML = h; };
    try {
      setS('<p class="note">Preparing...</p>');
      var C = await build(setS);
      if (C.err) { setS(errBox(C.err)); return; }
      var P = C.P, recs = C.recs, M = recs.length, T = recs[0].rows.length, kFirst = recs[0].rows[0].k;
      var Ln = +el('adv-slen').value || 12, pctC = +el('adv-scl').value || 5, topN = Math.max(3, Math.ceil(M * pctC / 100)), nW = T - Ln + 1;
      if (nW < Ln + 4) { setS(errBox('Only ' + T + ' months of results, too few for ' + Ln + '-month windows. Choose a shorter window or add stocks with longer history.')); return; }
      var COMPS = FCOMPS.concat(['filt']), CC = COMPS.length, SI = new Uint8Array(M * CC), SV = [], NS = [], BB = [], off = [], tot = 0, c, i, s, st, p;
      COMPS.forEach(function (cn, ci) {
        var mp = {}, vals = [], cnts;
        recs.forEach(function (r, ri) { var v = cn === 'filt' ? (r.filt ? 1 : 0) : (+r.w[cn] || 0); if (!(v in mp)) { mp[v] = vals.length; vals.push(v); } SI[ri * CC + ci] = mp[v]; });
        cnts = new Float64Array(vals.length); recs.forEach(function (r, ri) { cnts[SI[ri * CC + ci]]++; });
        SV.push(vals); NS.push(vals.length); BB.push(Array.prototype.map.call(cnts, function (x) { return x / M; }));
      });
      COMPS.forEach(function (cn, ci) { off.push(tot); tot += NS[ci]; });
      var PL = recs.map(function (r) { var a = new Float64Array(T + 1), t; for (t = 0; t < T; t++) a[t + 1] = a[t] + Math.log(1 + Math.max(-0.99, r.rows[t].ret)); return a; });
      var POS = new Int32Array(nW * M), TOP1 = new Int32Array(nW), SH = new Float64Array(nW * tot), LF = new Float64Array(nW * tot), ORD = [];
      for (s = 0; s < nW; s++) {
        var gr = new Float64Array(M), order = [];
        for (i = 0; i < M; i++) { gr[i] = PL[i][s + Ln] - PL[i][s]; order.push(i); }
        order.sort(function (a, b) { return (gr[b] - gr[a]) || (a - b); });
        for (p = 0; p < M; p++) POS[s * M + order[p]] = p;
        TOP1[s] = order[0]; ORD.push(order.slice(0, topN));
        var cnt = new Float64Array(tot);
        for (p = 0; p < topN; p++) { i = order[p]; for (c = 0; c < CC; c++) cnt[off[c] + SI[i * CC + c]]++; }
        for (c = 0; c < CC; c++) for (st = 0; st < NS[c]; st++) { var B = BB[c][st], o = off[c] + st; SH[s * tot + o] = cnt[o] / topN; LF[s * tot + o] = Math.log(((cnt[o] + AL * B) / (topN + AL)) / B); }
        if (s % 20 === 0) { setS('<p class="note">Reading windows: ' + s + ' of ' + nW + '...</p>'); await tick(); }
      }
      var lab = function (cc, v) { var cn = COMPS[cc]; if (cn === 'filt') return 'Filter ' + (v ? 'ON' : 'OFF'); return v === 0 ? CN[cn] + ': not used' : CN[cn] + ' ' + (v > 0 ? '+' : '−') + Math.abs(v); };
      var winLab = function (s0) { return monthLabel(P, kFirst + s0 + 1) + (Ln > 1 ? ' to ' + monthLabel(P, kFirst + s0 + Ln) : ''); };
      /* 1. ingredient table: how often each placement sits in the top cluster */
      var rows = [];
      for (c = 0; c < CC; c++) for (st = 0; st < NS[c]; st++) {
        var o2 = off[c] + st, B2 = BB[c][st], sa = 0, over = 0;
        for (s = 0; s < nW; s++) { var shv = SH[s * tot + o2]; sa += shv; if (shv > 0 && shv / B2 >= 1.25) over++; }
        rows.push({ c: c, v: SV[c][st], base: B2, sh: sa / nW, ratio: sa / nW / B2, over: over });
      }
      rows.sort(function (a, b) { return b.ratio - a.ratio; });
      var stable = rows.filter(function (r) { return r.ratio >= 1.3 && r.over / nW >= 0.6 && !(COMPS[r.c] !== 'filt' && r.v === 0); });
      var h = '<p class="note"><b>Settings used:</b> stop loss ' + (PK_OPT.sl > 0 ? PK_OPT.sl + '%' : 'off') + ', exit rank ' + (C.ex > 0 ? C.ex : 'off') + ', cost ' + C.cost + '%, ' + C.N + ' stocks. ' + M + ' strategies, ' + T + ' months, ' + nW + ' overlapping ' + Ln + '-month windows. Cluster = top ' + topN + ' strategies (top ' + pctC + '%).</p>';
      h += '<h3>Which ingredients sit around the #1</h3>';
      h += '<p class="headline">' + (stable.length ? stable.length + ' placements are over-represented in the top cluster in most windows: <b>' + stable.slice(0, 6).map(function (r) { return esc(lab(r.c, r.v)); }).join(', ') + '</b>' + (stable.length > 6 ? ' and more' : '') + '.' : 'No placement stays over-represented in the top cluster in most windows. The #1 changes style from window to window.') + '</p>';
      h += tb(['Ingredient and weight', 'Share of all strategies', 'Share of top cluster', 'Lift', 'Windows where over-represented'], rows.filter(function (r) { return !(COMPS[r.c] !== 'filt' && r.v === 0); }).map(function (r) {
        return '<tr><th class="wrap">' + esc(lab(r.c, r.v)) + '</th><td>' + pc(r.base, 0) + '</td><td>' + pc(r.sh, 0) + '</td><td class="' + tone(r.ratio - 1) + '">x' + r.ratio.toFixed(2) + '</td><td>' + r.over + ' of ' + nW + ' (' + pc(r.over / nW, 0) + ')</td></tr>';
      }));
      h += '<p class="note">Lift above 1 means the placement is in the top cluster more often than its share of all strategies. Over-represented means at least 1.25 times its normal share in that window. Windows overlap, so treat counts as a guide.</p>';
      /* 2. does one period point to the next? non-overlapping windows, learned only from earlier windows */
      var tests = [], acc = new Float64Array(tot), accN = 0, nextU = 0;
      for (s = Ln; s < nW; s += Ln) {
        while (nextU <= s - Ln) { for (var q = 0; q < tot; q++) acc[q] += LF[nextU * tot + q]; accN++; nextU++; }
        var bA = 0, bB = 0, vA = -Infinity, vB = -Infinity;
        for (i = 0; i < M; i++) {
          var sa2 = 0, sb2 = 0;
          for (c = 0; c < CC; c++) { var oo = off[c] + SI[i * CC + c]; sa2 += LF[(s - Ln) * tot + oo]; sb2 += acc[oo] / accN; }
          if (sa2 > vA) { vA = sa2; bA = i; }
          if (sb2 > vB) { vB = sb2; bB = i; }
        }
        var pf = function (ii) { return 1 - POS[s * M + ii] / (M - 1); };
        tests.push({ s: s, a: pf(bA), b: pf(bB), c: pf(TOP1[s - Ln]), nameA: bA, nameB: bB });
      }
      var st2 = function (key) { var v = tests.map(function (x) { return x[key]; }), m = mean(v), sd = sdev(v); return { m: m, t: v.length > 4 && sd > 0 ? (m - 0.5) / (sd / Math.sqrt(v.length)) : NaN, t25: v.filter(function (x) { return x >= 0.75; }).length, t10: v.filter(function (x) { return x >= 0.9; }).length }; };
      var rA = st2('a'), rB = st2('b'), rC = st2('c'), nT = tests.length;
      h += '<h3>Do the ingredients carry over to the next period?</h3>';
      h += '<p class="headline">' + (rB.m > 0.55 && rB.t >= 2 ? 'Yes, somewhat: ingredients learned from all earlier windows placed the next window’s pick at a typical rank of ' + pc(rB.m, 0) + ' (50% = luck).' : (rA.m > 0.55 && rA.t >= 2 ? 'Partly: the last window’s ingredients placed the next pick at a typical rank of ' + pc(rA.m, 0) + ' (50% = luck).' : 'Not reliably. Ingredients learned from earlier windows placed the next window’s pick at a typical rank of ' + pc(rB.m, 0) + ', which is close to luck (50%).')) + '</p>';
      h += tb(['Way of choosing the next window’s strategy', 'Typical rank', 'Top 25%', 'Top 10%', 'Strength'], [['Ingredients from all earlier windows’ top clusters', rB], ['Ingredients from the last window’s top cluster', rA], ['Simply repeat the last window’s #1', rC]].map(function (x) {
        var r = x[1];
        return '<tr><th class="wrap">' + x[0] + '</th><td class="' + (r.m > 0.5 ? 'good' : 'bad') + '">' + pc(r.m, 0) + '</td><td>' + r.t25 + ' of ' + nT + '</td><td>' + r.t10 + ' of ' + nT + '</td><td>' + num(r.t, 2) + '</td></tr>';
      }));
      h += '<p class="note">' + nT + ' separate ' + Ln + '-month windows, one after another with no overlap. For each, the choice uses only earlier windows. Typical rank 50% is what random choosing gives; strength above 2 is more than luck would explain. Random choosing lands in the top 25% about ' + Math.round(nT * 0.25) + ' times and the top 10% about ' + Math.round(nT * 0.1) + ' times.</p>';
      /* 2b. Chase the #1: every possible start month, each pick made only from windows that had already finished */
      var SELN = ['Ingredients from all earlier windows', 'Ingredients from the last window', 'Repeat the last window #1', 'Most consistent so far (best average rank)', 'Best growth since the start', 'Always 12m +100 and 6m +100 (fixed)', 'Always 12m +100 (fixed)', 'Auto: the best-record one of the first five'];
      var NSEL = SELN.length, KAUTO = 5;
      var onlyW = function (r, keys) { var ok = true; FCOMPS.forEach(function (cn) { var v = +r.w[cn] || 0; if (keys.indexOf(cn) >= 0 ? v !== 100 : v !== 0) ok = false; }); return ok && !r.filt; };
      var fxA = -1, fxB = -1;
      recs.forEach(function (r, ri) { if (onlyW(r, ['m12', 'm6'])) fxA = ri; if (onlyW(r, ['m12'])) fxB = ri; });
      var BL = new Float64Array(T + 1);
      for (i = 0; i < T; i++) BL[i + 1] = BL[i] + Math.log(1 + Math.max(-0.99, recs[0].rows[i].bench));
      var cAcc = new Float64Array(tot), cAccN = 0, posAcc = new Float64Array(M), selPct = [], runS = new Float64Array(NSEL), runN = 0, CS = [], j2;
      for (j2 = 0; j2 < NSEL; j2++) { selPct.push(new Float64Array(nW)); CS.push({ hit1: 0, t1: 0, t5: 0, t10: 0, t25: 0, pct: [], gr: [], beat: 0, picks: [] }); }
      var CB = { gr1: [], grMed: [], grList: [] }, cN = 0, t1n = Math.max(1, Math.ceil(M * 0.01)), t5n = Math.max(1, Math.ceil(M * 0.05)), t10n = Math.max(1, Math.ceil(M * 0.1)), t25n = Math.max(1, Math.ceil(M * 0.25));
      for (s = Ln; s < nW; s++) {
        var u = s - Ln, pk2 = new Array(NSEL).fill(-1), vA2 = -Infinity, vB2 = -Infinity, vC2 = -Infinity, vD2 = -Infinity, bA2 = 0, bB2 = 0, bC2 = 0, bD2 = 0;
        for (q = 0; q < tot; q++) cAcc[q] += LF[u * tot + q];
        cAccN++;
        for (i = 0; i < M; i++) posAcc[i] += 1 - POS[u * M + i] / (M - 1);
        for (i = 0; i < M; i++) {
          var sa4 = 0, sb4 = 0;
          for (c = 0; c < CC; c++) { var o4 = off[c] + SI[i * CC + c]; sa4 += LF[u * tot + o4]; sb4 += cAcc[o4] / cAccN; }
          if (sb4 > vB2) { vB2 = sb4; bB2 = i; }
          if (sa4 > vA2) { vA2 = sa4; bA2 = i; }
          if (posAcc[i] > vC2) { vC2 = posAcc[i]; bC2 = i; }
          if (PL[i][s] > vD2) { vD2 = PL[i][s]; bD2 = i; }
        }
        pk2[0] = bB2; pk2[1] = bA2; pk2[2] = TOP1[u]; pk2[3] = bC2; pk2[4] = bD2; pk2[5] = fxA; pk2[6] = fxB;
        if (u >= Ln) { for (j2 = 0; j2 < KAUTO; j2++) runS[j2] += selPct[j2][u]; runN++; }
        var bj = 0, bjv = -Infinity;
        if (runN) for (j2 = 0; j2 < KAUTO; j2++) if (runS[j2] / runN > bjv) { bjv = runS[j2] / runN; bj = j2; }
        pk2[7] = pk2[bj];
        var grs = [], g1 = -Infinity;
        for (i = 0; i < M; i++) { var gg = PL[i][s + Ln] - PL[i][s]; grs.push(gg); if (gg > g1) g1 = gg; }
        grs.sort(function (a, b) { return a - b; });
        CB.gr1.push(Math.exp(g1) - 1); CB.grMed.push(Math.exp(grs[Math.floor(M / 2)]) - 1); CB.grList.push(Math.exp(BL[s + Ln] - BL[s]) - 1); cN++;
        for (j2 = 0; j2 < NSEL; j2++) {
          var pi2 = pk2[j2];
          if (pi2 < 0) continue;
          var ps = POS[s * M + pi2], pg = Math.exp(PL[pi2][s + Ln] - PL[pi2][s]) - 1, o5 = CS[j2];
          selPct[j2][s] = 1 - ps / (M - 1);
          if (ps === 0) o5.hit1++;
          if (ps < t1n) o5.t1++;
          if (ps < t5n) o5.t5++;
          if (ps < t10n) o5.t10++;
          if (ps < t25n) o5.t25++;
          o5.pct.push(selPct[j2][s]); o5.gr.push(pg);
          if (pg > CB.grList[cN - 1]) o5.beat++;
          o5.picks.push({ s: s, i: pi2, pos: ps });
        }
      }
      var chaseRows = [], bestJ = -1, bestV = -1;
      CS.forEach(function (o5, j) {
        var n5 = o5.pct.length;
        if (!n5) return;
        var share = o5.t5 / n5;
        if (j < KAUTO || j === NSEL - 1) { if (share > bestV) { bestV = share; bestJ = j; } }
        chaseRows.push('<tr class="' + (j === NSEL - 1 ? 'on' : '') + '"><th class="wrap">' + esc(SELN[j]) + '</th><td>' + o5.hit1 + ' of ' + n5 + ' (' + pc(o5.hit1 / n5, 1) + ')</td><td>' + pc(o5.t5 / n5, 0) + '</td><td>' + pc(o5.t10 / n5, 0) + '</td><td>' + pc(o5.t25 / n5, 0) + '</td><td>' + pc(mean(o5.pct), 0) + '</td><td class="' + tone(mean(o5.gr)) + '">' + pc(mean(o5.gr), 1, true) + '</td><td>' + pc(o5.beat / n5, 0) + '</td></tr>');
      });
      var nCh = CB.gr1.length;
      if (nCh) {
        chaseRows.push('<tr><th class="wrap">Hindsight: the real #1 of each window (cannot be known in advance)</th><td>' + nCh + ' of ' + nCh + '</td><td>100%</td><td>100%</td><td>100%</td><td>100%</td><td class="good">' + pc(mean(CB.gr1), 1, true) + '</td><td>-</td></tr>');
        chaseRows.push('<tr><th class="wrap">Typical strategy (median of all)</th><td>-</td><td>-</td><td>-</td><td>-</td><td>50%</td><td class="' + tone(mean(CB.grMed)) + '">' + pc(mean(CB.grMed), 1, true) + '</td><td>-</td></tr>');
        chaseRows.push('<tr><th class="wrap">Average stock in your list</th><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td class="' + tone(mean(CB.grList)) + '">' + pc(mean(CB.grList), 1, true) + '</td><td>-</td></tr>');
      }
      h += '<h3>Chasing the #1 in every possible ' + (Ln === 12 ? 'year' : Ln + '-month window') + '</h3>';
      if (nCh) {
        var cb = CS[bestJ], cn5 = cb.pct.length;
        h += '<p class="headline">Nobody can name the #1 in advance. Across ' + nCh + ' start months, the best way of choosing (<b>' + esc(SELN[bestJ]) + '</b>) landed on the exact #1 in <b>' + cb.hit1 + '</b> (' + pc(cb.hit1 / cn5, 1) + '), in the top ' + t5n + ' (top 5%) in ' + pc(cb.t5 / cn5, 0) + ', and averaged ' + pc(mean(cb.gr), 1, true) + ' a window against ' + pc(mean(CB.gr1), 1, true) + ' for the hindsight #1. Pure luck would hit the exact #1 about once in ' + M + ' tries.</p>';
        h += tb(['How the strategy is chosen (using only earlier windows)', 'Exact #1', 'Top 5%', 'Top 10%', 'Top 25%', 'Typical rank', 'Average ' + Ln + '-month growth', 'Beat the list'], chaseRows);
        h += '<p class="note">Every start month with a finished ' + Ln + '-month window is tested (' + nCh + ' windows, overlapping, so counts are a guide). Each pick uses only windows that had ended before the new window began. Typical rank 50% is luck. The fixed rows are simple rules with nothing learned: if a learned method does not beat them, it adds nothing. Top 5% means the pick was among the ' + t5n + ' best of ' + M + ' strategies in that window. Your stock list holds today survivors, which flatters long-term momentum.</p>';
        var ap = CS[NSEL - 1].picks.filter(function (x) { return (x.s - Ln) % Ln === 0; }).slice(-20), ar = [];
        ap.forEach(function (x) {
          var rl = recs[TOP1[x.s]];
          ar.push('<tr><th class="wrap">' + esc(winLab(x.s)) + '</th><td class="wrap">' + nm(recs[x.i]) + '</td><td class="' + (x.pos < t10n ? 'good' : (x.pos < t25n ? '' : 'bad')) + '">' + (x.pos + 1) + ' of ' + M + '</td><td class="' + tone(Math.exp(PL[x.i][x.s + Ln] - PL[x.i][x.s]) - 1) + '">' + pc(Math.exp(PL[x.i][x.s + Ln] - PL[x.i][x.s]) - 1, 1, true) + '</td><td class="wrap">' + nm(rl) + '</td><td class="good">' + pc(Math.exp(PL[TOP1[x.s]][x.s + Ln] - PL[TOP1[x.s]][x.s]) - 1, 1, true) + '</td></tr>');
        });
        h += '<h3>Auto advisor, window after window</h3>' + tb(['Window', 'Advisor picked', 'Its rank', 'Its growth', 'Real #1', 'Real #1 growth'], ar);
        h += '<p class="note">Last ' + ap.length + ' separate windows, one after another. The advisor choice for each window used only earlier windows.</p>';
      } else h += '<p class="note">Not enough finished windows to test.</p>';
      /* 2c. Monthly accuracy: one pick per month from earlier months only, scored three ways */
      var S = C.S, MW = 24, XX = buildIdx(P, S), TGm = [], tm, RETm = recs.map(function (r) { return r.rows.map(function (x) { return x.ret; }); }), BENm = recs[0].rows.map(function (x) { return x.bench; });
      for (tm = 0; tm < T; tm++) TGm.push(tagsAt(P, S, XX, kFirst + tm));
      var IND = [[], [], []], BEST1 = new Int32Array(T), beatFrac = 0, beatN = 0;
      for (tm = 0; tm < T; tm++) {
        var ordm = [], posm = new Int32Array(M), a0 = new Uint8Array(M), a1 = new Uint8Array(M), a2 = new Uint8Array(M), nb = 0;
        for (i = 0; i < M; i++) ordm.push(i);
        ordm.sort(function (x, y) { return (RETm[y][tm] - RETm[x][tm]) || (x - y); });
        for (i = 0; i < M; i++) posm[ordm[i]] = i;
        BEST1[tm] = ordm[0];
        for (i = 0; i < M; i++) { a0[i] = RETm[i][tm] > BENm[tm] ? 1 : 0; a1[i] = posm[i] < t25n ? 1 : 0; a2[i] = posm[i] < t10n ? 1 : 0; nb += a0[i]; }
        IND[0].push(a0); IND[1].push(a1); IND[2].push(a2);
        if (tm >= MW) { beatFrac += nb / M; beatN++; }
      }
      var NTG = TAGS.length, cntT = new Float64Array(NTG), cntAll = 0, hitT = [0, 1, 2].map(function () { var a = []; for (var g = 0; g < NTG; g++) a.push(new Float64Array(M)); return a; }), hitAll = [0, 1, 2].map(function () { return new Float64Array(M); });
      var MSN = ['Always 12m +100 and 6m +100 (fixed)', 'Always 12m +100 (fixed)', 'Repeat last month #1', 'Best record so far, no market reading', 'Regime advisor tuned to beat the list', 'Regime advisor tuned to top 25%', 'Regime advisor tuned to top 10%'];
      var HS = MSN.map(function () { return [[], [], []]; }), MEX = MSN.map(function () { return []; });
      for (tm = 0; tm < T; tm++) {
        if (tm >= MW) {
          var pkm = [fxA, fxB, BEST1[tm - 1], 0, 0, 0, 0], actm = TGm[tm].filter(function (g) { return cntT[g] >= 6; }), dd2, bi2, bv2, ov2, v2, b3 = 0;
          for (i = 1; i < M; i++) if (hitAll[0][i] > hitAll[0][b3]) b3 = i;
          pkm[3] = b3;
          for (dd2 = 0; dd2 < 3; dd2++) {
            bi2 = 0; bv2 = -Infinity; ov2 = -Infinity;
            for (i = 0; i < M; i++) {
              if (!actm.length) v2 = hitAll[dd2][i] / cntAll;
              else { v2 = 0; actm.forEach(function (g) { v2 += hitT[dd2][g][i] / cntT[g]; }); v2 /= actm.length; }
              if (v2 > bv2 || (v2 === bv2 && hitAll[dd2][i] > ov2)) { bv2 = v2; ov2 = hitAll[dd2][i]; bi2 = i; }
            }
            pkm[4 + dd2] = bi2;
          }
          pkm.forEach(function (pi3, j) {
            if (pi3 < 0) return;
            for (var e = 0; e < 3; e++) HS[j][e].push(IND[e][tm][pi3]);
            MEX[j].push(RETm[pi3][tm] - BENm[tm]);
          });
        }
        cntAll++;
        TGm[tm].forEach(function (g) { cntT[g]++; });
        for (var e2 = 0; e2 < 3; e2++) for (i = 0; i < M; i++) { var iv = IND[e2][tm][i]; if (iv) { hitAll[e2][i]++; TGm[tm].forEach(function (g) { hitT[e2][g][i]++; }); } }
      }
      var stretch = function (arr) { var n = arr.length, ok = 0, tt2 = 0, a, q2, sm; for (a = 0; a + 10 <= n; a++) { sm = 0; for (q2 = a; q2 < a + 10; q2++) sm += arr[q2]; tt2++; if (sm >= 8) ok++; } return tt2 ? ok / tt2 : NaN; };
      var rate = function (arr) { return arr.length ? arr.reduce(function (x, y) { return x + y; }, 0) / arr.length : NaN; };
      var best3 = [-1, -1, -1], bestR = [-1, -1, -1], accRows = [], strRows = [];
      HS.forEach(function (hs, j) {
        if (!hs[0].length) return;
        var r3 = hs.map(rate);
        if (j >= 3) { for (var e3 = 0; e3 < 3; e3++) if (r3[e3] > bestR[e3]) { bestR[e3] = r3[e3]; best3[e3] = j; } }
        accRows.push('<tr class="' + (j >= 4 ? 'on' : '') + '"><th class="wrap">' + esc(MSN[j]) + '</th><td>' + pc(r3[0], 0) + '</td><td>' + pc(r3[1], 0) + '</td><td>' + pc(r3[2], 0) + '</td><td class="' + tone(mean(MEX[j])) + '">' + pc(mean(MEX[j]), 2, true) + '</td></tr>');
        strRows.push('<tr><th class="wrap">' + esc(MSN[j]) + '</th><td>' + pc(stretch(hs[0]), 0) + '</td><td>' + pc(stretch(hs[1]), 0) + '</td><td>' + pc(stretch(hs[2]), 0) + '</td></tr>');
      });
      var nm2 = HS[0][0].length || (HS[4][0] || []).length;
      accRows.push('<tr><th class="wrap">Random strategy (chance)</th><td>' + pc(beatN ? beatFrac / beatN : NaN, 0) + '</td><td>25%</td><td>10%</td><td>-</td></tr>');
      h += '<h3>Monthly accuracy: how often is the monthly pick a hit?</h3>';
      var hit80 = [], lbl3 = ['beat the list', 'top 25%', 'top 10%'];
      for (i = 0; i < 3; i++) if (best3[i] >= 0 && bestR[i] >= 0.8) hit80.push(lbl3[i]);
      h += '<p class="headline">Best monthly hit rates using only earlier months: beat the list <b>' + pc(bestR[0], 0) + '</b>, top 25% <b>' + pc(bestR[1], 0) + '</b>, top 10% <b>' + pc(bestR[2], 0) + '</b> (regime advisors). ' + (hit80.length ? 'The 80% target was reached for: ' + hit80.join(', ') + '.' : 'None reached 80%.') + '</p>';
      h += tb(['How the strategy is chosen (earlier months only)', 'Beat the list', 'Top 25%', 'Top 10%', 'Average extra a month'], accRows);
      h += '<h3>The 8 out of 10 test</h3>';
      h += tb(['How the strategy is chosen', 'Beat the list: share of 10-month stretches with 8+ hits', 'Top 25%: same', 'Top 10%: same'], strRows);
      h += '<p class="note">' + (HS[4][0] || []).length + ' months tested, one pick each, starting after ' + MW + ' months of history. A hit is a month where the pick beat the list average, or was among the best 25% or 10% of all ' + M + ' strategies that month. The regime advisors read the market that month (trend, breadth, candle and chart patterns), look at past months with the same pattern, and pick the strategy that most often scored a hit in them. Each month is added to the record only after it is scored. Fixed rows learn nothing. The 8 out of 10 table counts every 10-month stretch, overlapping. Your stock list holds today survivors, so hit rates look better than real time would have given.</p>';
      /* 2d. Every holding length: 1, 3, 6, 12 and 24 months, one pick per window from earlier windows only */
      var HZ = [1, 3, 6, 12, 24], hzRows = [], hzOk = [], hzUsed = 0;
      var hzStretch = function (arr, step) { var tt3 = 0, ok3 = 0, o3, k3, sub, a3, q3, sm3; for (o3 = 0; o3 < step; o3++) { sub = arr.filter(function (x, k) { return k % step === o3; }); for (a3 = 0; a3 + 10 <= sub.length; a3++) { sm3 = 0; for (q3 = a3; q3 < a3 + 10; q3++) sm3 += sub[q3]; tt3++; if (sm3 >= 8) ok3++; } } return tt3 ? ok3 / tt3 : NaN; };
      var hzRate = function (arr) { return arr.length ? arr.reduce(function (x, y) { return x + y; }, 0) / arr.length : NaN; };
      HZ.forEach(function (hh) {
        var NW = T - hh + 1;
        if (NW < 40) return;
        var indH = [[], [], []], w2, ii2, e4;
        for (w2 = 0; w2 < NW; w2++) {
          var gv = new Float64Array(M), od = [], ps2 = new Int32Array(M), b0 = new Uint8Array(M), b1 = new Uint8Array(M), b2 = new Uint8Array(M), lg = Math.exp(BL[w2 + hh] - BL[w2]) - 1;
          for (ii2 = 0; ii2 < M; ii2++) { gv[ii2] = PL[ii2][w2 + hh] - PL[ii2][w2]; od.push(ii2); }
          od.sort(function (x, y) { return (gv[y] - gv[x]) || (x - y); });
          for (ii2 = 0; ii2 < M; ii2++) ps2[od[ii2]] = ii2;
          for (ii2 = 0; ii2 < M; ii2++) { b0[ii2] = (Math.exp(gv[ii2]) - 1) > lg ? 1 : 0; b1[ii2] = ps2[ii2] < t25n ? 1 : 0; b2[ii2] = ps2[ii2] < t10n ? 1 : 0; }
          indH[0].push(b0); indH[1].push(b1); indH[2].push(b2);
        }
        var cA = 0, cT = new Float64Array(NTG), hA = [0, 1, 2].map(function () { return new Float64Array(M); }), hT = [0, 1, 2].map(function () { var a = []; for (var g = 0; g < NTG; g++) a.push(new Float64Array(M)); return a; });
        var serF = [[], [], []], serR = [[], [], []], s2, u2;
        for (s2 = 0; s2 < NW; s2++) {
          u2 = s2 - hh;
          if (u2 >= 0) {
            cA++; TGm[u2].forEach(function (g) { cT[g]++; });
            for (e4 = 0; e4 < 3; e4++) for (ii2 = 0; ii2 < M; ii2++) if (indH[e4][u2][ii2]) { hA[e4][ii2]++; TGm[u2].forEach(function (g) { hT[e4][g][ii2]++; }); }
          }
          if (cA < 12) continue;
          var act3 = TGm[s2].filter(function (g) { return cT[g] >= 6; }), bi4 = 0, bv4 = -Infinity, ov4 = -Infinity, v4;
          for (ii2 = 0; ii2 < M; ii2++) {
            if (!act3.length) v4 = hA[1][ii2] / cA;
            else { v4 = 0; act3.forEach(function (g) { v4 += hT[1][g][ii2] / cT[g]; }); v4 /= act3.length; }
            if (v4 > bv4 || (v4 === bv4 && hA[1][ii2] > ov4)) { bv4 = v4; ov4 = hA[1][ii2]; bi4 = ii2; }
          }
          for (e4 = 0; e4 < 3; e4++) { if (fxA >= 0) serF[e4].push(indH[e4][s2][fxA]); serR[e4].push(indH[e4][s2][bi4]); }
        }
        if (!serR[0].length) return;
        hzUsed++;
        var hname = hh === 1 ? '1 month' : (hh === 12 ? '1 year' : (hh === 24 ? '2 years' : hh + ' months'));
        [['Fixed 12m +100 and 6m +100', serF], ['Regime advisor (tuned to top 25%)', serR]].forEach(function (pr) {
          var sr = pr[1];
          if (!sr[0].length) return;
          var rt = sr.map(hzRate), st8 = [hzStretch(sr[0], hh), hzStretch(sr[1], hh)];
          [[rt[0], 'beat the list'], [rt[1], 'top 25%'], [rt[2], 'top 10%']].forEach(function (x) { if (x[0] >= 0.8) hzOk.push(hname + ', ' + pr[0] + ': ' + x[1] + ' ' + pc(x[0], 0)); });
          hzRows.push('<tr class="' + (pr[0].indexOf('Regime') === 0 ? 'on' : '') + '"><th class="wrap">' + esc(hname) + ': ' + esc(pr[0]) + '</th><td class="' + (rt[0] >= 0.8 ? 'good' : '') + '">' + pc(rt[0], 0) + '</td><td class="' + (rt[1] >= 0.8 ? 'good' : '') + '">' + pc(rt[1], 0) + '</td><td class="' + (rt[2] >= 0.8 ? 'good' : '') + '">' + pc(rt[2], 0) + '</td><td>' + pc(st8[0], 0) + '</td><td>' + pc(st8[1], 0) + '</td><td>' + serR[0].length + '</td></tr>');
        });
      });
      h += '<h3>Every holding length: 1 month to 2 years</h3>';
      if (hzRows.length) {
        h += '<p class="headline">' + (hzOk.length ? 'Reached 80%: <b>' + esc(hzOk.slice(0, 4).join('; ')) + '</b>' + (hzOk.length > 4 ? ' and ' + (hzOk.length - 4) + ' more.' : '.') : 'No holding length reached 80% on any measure.') + '</p>';
        h += tb(['Holding length and method', 'Beat the list', 'Top 25%', 'Top 10%', '8+ of 10 periods: beat', '8+ of 10 periods: top 25%', 'Windows tested'], hzRows);
        h += '<p class="note">Each row picks one strategy per window, using only windows that had already finished, and holds it for that length. A hit is a window where the pick beat the list average, or finished among the best 25% or 10% of all ' + M + ' strategies in that window. 8+ of 10 periods looks at every run of 10 separate (non-overlapping) windows and shows how often 8 or more were hits. Windows overlap, so rates are a guide, and longer holds have far fewer separate windows. Daily holding cannot be tested: your prices are monthly, so the shortest test is 1 month. Your stock list holds today survivors, which flatters long-term momentum.</p>';
      } else h += '<p class="note">Not enough months to test holding lengths.</p>';
      /* 2e. Fair test of the fixed rule: early and late halves, choice from earlier data only, growth, worst fall, costs included */
      var fgs = function (a, b) {
        var n6 = a.length;
        if (n6 < 12) return null;
        var e6 = 1, b6 = 1, p6 = 1, q6 = 1, d6 = 0, f6 = 0, w6 = 0, t6;
        for (t6 = 0; t6 < n6; t6++) { e6 *= 1 + a[t6]; b6 *= 1 + b[t6]; p6 = Math.max(p6, e6); q6 = Math.max(q6, b6); d6 = Math.min(d6, e6 / p6 - 1); f6 = Math.min(f6, b6 / q6 - 1); if (a[t6] > b[t6]) w6++; }
        return { n: n6, g: Math.pow(e6, 12 / n6) - 1, bg: Math.pow(b6, 12 / n6) - 1, dd: d6, bdd: f6, win: w6 / n6 };
      };
      var fairRows = [], fairHead = '';
      if (fxA >= 0) {
        var FS = RETm[fxA], half = Math.floor(T / 2), wfR = [], wfB = [], wfF = [], tw2, bw2, vw2;
        for (tw2 = MW; tw2 < T; tw2++) {
          bw2 = 0; vw2 = -Infinity;
          for (i = 0; i < M; i++) if (PL[i][tw2] > vw2) { vw2 = PL[i][tw2]; bw2 = i; }
          wfR.push(RETm[bw2][tw2]); wfB.push(BENm[tw2]); wfF.push(FS[tw2]);
        }
        var fRow = function (label, st, hl) {
          if (!st) return;
          fairRows.push('<tr class="' + (hl ? 'on' : '') + '"><th class="wrap">' + esc(label) + '</th><td class="' + tone(st.g) + '">' + pc(st.g, 1, true) + '</td><td>' + pc(st.bg, 1, true) + '</td><td class="' + tone(st.g - st.bg) + '">' + pc(st.g - st.bg, 1, true) + '</td><td class="bad">' + pc(st.dd, 0) + '</td><td>' + pc(st.bdd, 0) + '</td><td>' + pc(st.win, 0) + '</td><td>' + st.n + '</td></tr>');
        };
        var sAll = fgs(FS, BENm), sH1 = fgs(FS.slice(0, half), BENm.slice(0, half)), sH2 = fgs(FS.slice(half), BENm.slice(half)), sSame = fgs(wfF, wfB), sWf = fgs(wfR, wfB);
        fRow('Fixed rule, all months', sAll, false);
        fRow('Fixed rule, first half of history', sH1, false);
        fRow('Fixed rule, second half of history', sH2, false);
        fRow('Fixed rule, same months as the next row', sSame, false);
        fRow('Best-growth-so-far pick, chosen from earlier months only', sWf, true);
        if (sAll) fairHead = 'The fixed rule (12m +100 and 6m +100, costs included) grew <b>' + pc(sAll.g, 1, true) + '</b> a year against the list <b>' + pc(sAll.bg, 1, true) + '</b>, ahead by <b>' + pc(sAll.g - sAll.bg, 1, true) + '</b> a year, with a worst fall of ' + pc(sAll.dd, 0) + ' against ' + pc(sAll.bdd, 0) + '. ' + (sWf ? 'When the rule is not known in advance and each month uses the best-growth strategy from earlier months only, it was ahead by <b>' + pc(sWf.g - sWf.bg, 1, true) + '</b> a year.' : '') + (sH1 && sH2 ? ' First half ahead by ' + pc(sH1.g - sH1.bg, 1, true) + ', second half by ' + pc(sH2.g - sH2.bg, 1, true) + '.' : '');
      }
      h += '<h3>Fair test of the fixed rule: how far ahead of the list?</h3>';
      if (fairRows.length) {
        h += '<p class="headline">' + fairHead + '</p>';
        h += tb(['Test', 'Yearly growth', 'List', 'Ahead per year', 'Worst fall', 'List fall', 'Months beat list', 'Months'], fairRows);
        h += '<p class="note">Growth is compounded month by month with trading costs, stop loss and exit rank from your settings. The first half and second half rows show whether the edge appears in both parts of history. The last row is the honest one: it does not know in advance that 12m +100 and 6m +100 would win, it just holds whichever strategy had grown most up to the previous month. If it is far behind the fixed rule, part of the fixed rule result is hindsight. Your stock list holds today survivors, which flatters long-term momentum. Not investment advice.</p>';
      } else h += '<p class="note">The fixed 12m +100 and 6m +100 strategy was not found, so this test could not run.</p>';
      /* 2f. Fall protection test: each 12-month window, hold last window's smallest-fall winner (one that beat the list), against the fixed rule and a 50/50 blend */
      var DH = 12, dfRows = [];
      var winDD = function (ser, a, b) { var e7 = 1, p7 = 1, d7 = 0, t7; for (t7 = a; t7 < b; t7++) { e7 *= 1 + ser[t7]; if (e7 > p7) p7 = e7; if (e7 / p7 - 1 < d7) d7 = e7 / p7 - 1; } return d7; };
      var winG = function (ser, a, b) { var e8 = 1, t8; for (t8 = a; t8 < b; t8++) e8 *= 1 + ser[t8]; return e8 - 1; };
      if (fxA >= 0 && T >= DH * 3) {
        var ACC = { list: [], fix: [], def: [], mix: [] }, nFall = 0, sd2, ii3, bd3, bdv, bgv, lgp, gp, ddp, fallback = 0;
        for (sd2 = DH; sd2 + DH <= T; sd2++) {
          lgp = winG(BENm, sd2 - DH, sd2); bd3 = -1; bdv = -Infinity; bgv = -Infinity;
          for (ii3 = 0; ii3 < M; ii3++) {
            gp = winG(RETm[ii3], sd2 - DH, sd2);
            if (gp <= lgp) continue;
            ddp = winDD(RETm[ii3], sd2 - DH, sd2);
            if (ddp > bdv || (ddp === bdv && gp > bgv)) { bdv = ddp; bgv = gp; bd3 = ii3; }
          }
          if (bd3 < 0) { bd3 = fxA; fallback++; }
          var mixS = [], q9;
          for (q9 = sd2; q9 < sd2 + DH; q9++) mixS.push(0.5 * RETm[fxA][q9] + 0.5 * RETm[bd3][q9]);
          var lgn = winG(BENm, sd2, sd2 + DH), ldn = winDD(BENm, sd2, sd2 + DH);
          [['list', BENm], ['fix', RETm[fxA]], ['def', RETm[bd3]], ['mix', mixS]].forEach(function (pr) {
            var ser = pr[1], off2 = pr[0] === 'mix' ? sd2 : 0;
            var a9 = pr[0] === 'mix' ? 0 : sd2, b9 = pr[0] === 'mix' ? DH : sd2 + DH, gg9 = winG(ser, a9, b9), dd9 = winDD(ser, a9, b9);
            ACC[pr[0]].push({ g: gg9, d: dd9, beat: gg9 > lgn, small: dd9 > ldn });
          });
          nFall++;
        }
        var dfLab = { list: 'Average stock in your list', fix: 'Fixed rule (12m +100 and 6m +100)', def: 'Last window smallest-fall winner (beat the list, smallest fall)', mix: '50% fixed rule + 50% smallest-fall winner' };
        ['list', 'fix', 'def', 'mix'].forEach(function (k) {
          var A = ACC[k], n9 = A.length;
          if (!n9) return;
          var gs = A.map(function (x) { return x.g; }), ds = A.map(function (x) { return x.d; });
          var bt = A.filter(function (x) { return x.beat; }).length, sm = A.filter(function (x) { return x.small; }).length, bo = A.filter(function (x) { return x.beat && x.small; }).length;
          dfRows.push('<tr class="' + (k === 'mix' ? 'on' : '') + '"><th class="wrap">' + esc(dfLab[k]) + '</th><td class="' + tone(mean(gs)) + '">' + pc(mean(gs), 1, true) + '</td><td class="bad">' + pc(mean(ds), 0) + '</td><td class="bad">' + pc(Math.min.apply(null, ds), 0) + '</td><td>' + (k === 'list' ? '-' : pc(bt / n9, 0)) + '</td><td>' + (k === 'list' ? '-' : pc(sm / n9, 0)) + '</td><td>' + (k === 'list' ? '-' : pc(bo / n9, 0)) + '</td><td>' + n9 + '</td></tr>');
        });
      }
      h += '<h3>Fall protection test: does last window smallest-fall winner keep the fall small?</h3>';
      if (dfRows.length) {
        h += tb(['Method (12-month windows, every start month)', 'Average growth', 'Average worst fall', 'Deepest fall in any window', 'Beat the list', 'Smaller fall than list', 'Both', 'Windows'], dfRows);
        h += '<p class="note">For every start month, the smallest-fall winner is found on the 12 months just before (among strategies that beat the list there, the one with the smallest worst fall), then held for the next 12 months. That is the same ranking as the option that sorts by smallest fall, but chosen only from earlier months. The blend splits money half and half and rebalances monthly. Compare Both against the fixed rule: if the smallest-fall pick does not keep a smaller fall in the next window, that ranking only describes the past. Windows overlap, so treat rates as a guide. Your stock list holds today survivors. Not investment advice.</p>';
      } else h += '<p class="note">Not enough months for this test.</p>';
      /* 3. window by window */
      var wrows = [], cap = 40, showS = [];
      for (s = 0; s < nW; s += Ln) showS.push(s);
      showS.slice(-cap).forEach(function (s0) {
        var top3 = [], tt;
        for (c = 0; c < CC; c++) for (st = 0; st < NS[c]; st++) { if (COMPS[c] !== 'filt' && SV[c][st] === 0) continue; top3.push({ c: c, v: SV[c][st], l: LF[s0 * tot + off[c] + st] }); }
        top3.sort(function (a, b) { return b.l - a.l; });
        wrows.push('<tr><th class="wrap">' + esc(winLab(s0)) + '</th><td class="wrap">' + nm(recs[TOP1[s0]]) + '</td><td class="wrap">' + top3.slice(0, 3).map(function (x) { return esc(lab(x.c, x.v)) + ' x' + Math.exp(x.l).toFixed(1); }).join('<br>') + '</td></tr>');
      });
      h += '<h3>Window by window</h3>' + tb(['Window', 'Real #1', 'Most over-represented in the top cluster'], wrows);
      h += '<p class="note">Windows shown do not overlap. Results use each strategy’s month-by-month returns from the full run, with your settings. Your stock list holds today’s survivors, which flatters old months. Not investment advice.</p>';
      setS(h);
    } catch (e) {
      setS(errBox('Something went wrong: ' + e.message));
    } finally { busy = false; }
  }

  async function run() {
    if (busy) return;
    var minN = Math.min(12, Math.max(1, +el('adv-min').value || 1));
    busy = true;
    try {
      var C = await build(setOut);
      if (C.err) { setOut(errBox(C.err)); return; }
      setOut(render(C.P, C.S, C.recs, C.N, minN, ymv('adv-from'), ymv('adv-to')));
    } catch (e) {
      setOut(errBox('Something went wrong: ' + e.message));
    } finally { busy = false; }
  }

  function render(P, S, recs, N, minN, fromKey, toKey) {
    var M = recs.length, T = recs[0].rows.length, kFirst = recs[0].rows[0].k, X = buildIdx(P, S), t, i, g;
    if (T < 40) return errBox('Only ' + T + ' months of results, too few for this test. Add stocks with longer history.');
    var RET = recs.map(function (r) { return r.rows.map(function (x) { return x.ret; }); }), BEN = recs[0].rows.map(function (x) { return x.bench; });
    var TG = []; for (t = 0; t < T; t++) TG.push(tagsAt(P, S, X, kFirst + t));
    var warm = 24, KEYS = ['reg', 'candle', 'chart', 'all', 'bsf', 'last'];
    var inGrp = function (key) { return function (x) { return key === 'all' || TAGS[x][1] === GRP[key]; }; };
    var abvOf = function (idx, tt) { var v = RET[idx][tt], a = 0, q; for (q = 0; q < M; q++) if (RET[q][tt] > v) a++; return a; };
    /* One pass through history. Each month the choice uses only months before it, then that month is added to the record. */
    var COMPS = FCOMPS.concat(['filt']), CC = COMPS.length, SI = new Uint8Array(M * CC), SV = [], NS = [], BB = [];
    COMPS.forEach(function (cn, c) {
      var mp = {}, vals = [], cnts;
      recs.forEach(function (r, ri) { var v = cn === 'filt' ? (r.filt ? 1 : 0) : (+r.w[cn] || 0); if (!(v in mp)) { mp[v] = vals.length; vals.push(v); } SI[ri * CC + c] = mp[v]; });
      cnts = new Float64Array(vals.length); recs.forEach(function (r, ri) { cnts[SI[ri * CC + c]]++; });
      SV.push(vals); NS.push(vals.length); BB.push(Array.prototype.map.call(cnts, function (x) { return x / M; }));
    });
    /* Invent weights: ingredient placement from the recipe, size from the weights the real #1s used under the same patterns */
    function learnW(act, L, mn) {
      var r = cScores(act, L, mn, M), rc = recipeOf(L, r.lift), use = r.use;
      var srcs = use.length ? use.map(function (g) { return { a: L.wn[g], b: L.wy[g] }; }) : [{ a: L.wA, b: L.wAy }];
      var cand = [], filt = 0, w = {};
      rc.forEach(function (x) {
        var cn = COMPS[x.c];
        if (cn === 'filt') { filt = x.val ? 1 : 0; return; }
        if (x.val === 0) return;
        var sg = x.val > 0 ? 1 : -1, num = 0, den = 0, ab = SV[x.c].indexOf(0), margin = x.lift - (ab >= 0 ? r.lift[x.c][ab] : 0);
        srcs.forEach(function (sr) { for (var i2 = 0; i2 < M; i2++) { var wg = sr.a[i2] + sr.b[i2]; if (wg) { var xv = +recs[i2].w[cn] || 0; if (xv * sg > 0) { num += wg * Math.abs(xv); den += wg; } } } });
        cand.push({ cn: cn, sg: sg, mag: den ? Math.max(5, Math.round(num / den / 5) * 5) : 100, margin: margin, lift: x.lift, den: den });
      });
      cand.sort(function (a, b) { return b.margin - a.margin; });
      cand = cand.slice(0, 4);
      cand.forEach(function (c) { w[c.cn] = c.sg * c.mag; });
      if (!cand.length) { var bi = 0, q; for (q = 1; q < M; q++) if (r.v[q] > r.v[bi] || (r.v[q] === r.v[bi] && r.e[q] > r.e[bi])) bi = q; w = Object.assign({}, recs[bi].w); filt = recs[bi].filt ? 1 : 0; cand = []; }
      return { w: fullW(w), filt: filt, cand: cand, rc: rc };
    }
    function invName(iv) { return esc(stratName(iv.w)) + ' (filter ' + (iv.filt ? 'ON' : 'OFF') + ')'; }
    function invTable(iv) {
      if (!iv.cand.length) return '<p class="note">No ingredient stood out, so the best matching strategy is used as it is.</p>';
      return '<div class="scroll"><table class="tbl"><thead><tr><th class="wrap">Ingredient</th><th>Invented weight</th><th>Seen in #1s</th></tr></thead><tbody>' +
        iv.cand.map(function (c) { return '<tr><th class="wrap">' + esc(CN[c.cn]) + '</th><td>' + (c.sg > 0 ? '+' : '−') + c.mag + '</td><td class="' + tone(c.lift) + '">x' + Math.exp(c.lift).toFixed(2) + ' vs chance</td></tr>'; }).join('') +
        '<tr><th class="wrap">Filter</th><td>' + (iv.filt ? 'ON' : 'OFF') + '</td><td></td></tr></tbody></table></div>';
    }
    /* one month of an invented strategy, carried month to month like the held strategies: same exit rank, stop loss, market filter, weights and cost */
    function invMonth(k, iv, ST) {
      var sw = PK_W, sf = PK_FILTOV, CA = CACHE, n = P.syms.length, ret = NaN, ben = NaN;
      PK_FILTOV = ''; PK_W = Object.assign({}, iv.w, { filt: iv.filt });
      try {
        var order = topIdx(scoresAt(P, S, 'custom', k), n), rankOf = {}, i3, exitRank = CA.ex, sl = PK_OPT.sl || 0, cost = CA.cost, wts = CA.wts;
        for (i3 = 0; i3 < order.length; i3++) rankOf[order[i3]] = i3 + 1;
        var bad = false, rgm = PK_OPT.rg, rgl = PK_OPT.rgL;
        if (rgm !== 'none' && k >= rgl - 1) { var av = 0; for (i3 = k - rgl + 1; i3 <= k; i3++) av += X.idx[i3]; bad = X.idx[k] < av / rgl; }
        var exv = bad ? (rgm === 'cash' ? 0 : 0.5) : 1;
        var tgt = exitRank > 0 ? ST.held.filter(function (x) { return rankOf[x] && rankOf[x] <= exitRank; }).slice(0, N) : [];
        for (i3 = 0; i3 < order.length && tgt.length < N; i3++) if (tgt.indexOf(order[i3]) < 0) tgt.push(order[i3]);
        if (wts) tgt.sort(function (x, y) { return (rankOf[x] || 1e9) - (rankOf[y] || 1e9); });
        var g = 0, keep = [], newW = {}, nent = {}, wStop = 0, tw = {}, turn = 0;
        tgt.forEach(function (x, pos) {
          var wi = wts ? (wts[pos] || 0) : 1 / N, c0 = P.closes[x][k], e0 = (ST.held.indexOf(x) >= 0 && ST.ent[x]) ? ST.ent[x] : c0, f = fwd(P, x, k, 1);
          tw[x] = wi;
          if (!isFinite(f)) { keep.push(x); nent[x] = e0; newW[x] = wi; return; }
          if (sl > 0) {
            var lw = P.lows[x][k + 1], lo2 = isFinite(lw) ? lw : P.closes[x][k + 1], lvl = e0 * (1 - sl / 100);
            if (isFinite(lo2) && lo2 <= lvl) { g += wi * (lvl / c0 - 1); wStop += wi; return; }
          }
          g += wi * f; keep.push(x); nent[x] = e0; newW[x] = wi * (1 + f);
        });
        var denom = 1 + g;
        keep.forEach(function (x) { newW[x] = wts ? newW[x] / denom : 1 / N; });
        Object.keys(tw).forEach(function (x) { turn += Math.abs(tw[x] - (ST.prevW[x] || 0)); });
        Object.keys(ST.prevW).forEach(function (x) { if (tw[x] === undefined) turn += ST.prevW[x]; });
        ret = exv * g - cost / 100 * 0.5 * turn * exv - cost / 100 * 0.5 * wStop * exv - cost / 100 * Math.abs(exv - ST.expo) * (tgt.length / N);
        ST.prevW = newW; ST.held = keep; ST.ent = nent; ST.expo = exv;
        ben = benchAt(P, k, 1).m;
      } finally { dropCustom(P); PK_W = sw; PK_FILTOV = sf; }
      return { ret: ret, ben: isFinite(ben) ? ben : 0, w: iv.w, filt: iv.filt };
    }
    function rcHtml(rc) {
      if (!rc) return '';
      var rows = rc.map(function (x) {
        var cn = COMPS[x.c], lab, st;
        if (cn === 'filt') { lab = 'Filter'; st = x.val ? 'ON' : 'OFF'; }
        else { lab = CN[cn]; st = x.val === 0 ? 'not used' : (x.val > 0 ? '+' : '−') + Math.abs(x.val); }
        return '<tr><th class="wrap">' + esc(lab) + '</th><td>' + esc(st) + '</td><td class="' + tone(x.lift) + '">x' + Math.exp(x.lift).toFixed(2) + '</td></tr>';
      });
      return '<div class="scroll"><table class="tbl"><thead><tr><th class="wrap">Ingredient</th><th>Best placement</th><th>How much more often than chance it sits in the #1</th></tr></thead><tbody>' + rows.join('') + '</tbody></table></div>';
    }
    function walk(mn, withInv) {
      var sum = TAGS.map(function () { return new Float64Array(M); }), cnt = TAGS.map(function () { return 0; }), sumAll = new Float64Array(M);
      var ser = {}, bens = [], hist = [], tt, ii, ST = { held: [], ent: {}, prevW: {}, expo: 1 };
      var wn = TAGS.map(function () { return new Float64Array(M); }), wy = TAGS.map(function () { return new Float64Array(M); }), cy = TAGS.map(function () { return 0; });
      var L = { sum: sum, cnt: cnt, sumAll: sumAll, wn: wn, wy: wy, cy: cy, wA: new Float64Array(M), wAy: new Float64Array(M), nA: 0, nAy: 0, SI: SI, SV: SV, NS: NS, B: BB, C: CC };
      KEYS.forEach(function (key) { ser[key] = []; }); ser.inv = [];
      for (tt = 0; tt < T; tt++) {
        if (tt >= warm) {
          bens.push(BEN[tt]);
          var pk = {}, pcs = {}, rcAll = null;
          ['reg', 'candle', 'chart', 'all'].forEach(function (key) { pk[key] = pickC(TG[tt].filter(inGrp(key)), L, mn, M, key === 'all'); if (key === 'all') rcAll = L.rc; });
          pk.bsf = pickBy([], sum, cnt, sumAll, mn, M);
          var lb = -1, lv = -Infinity; for (ii = 0; ii < M; ii++) if (RET[ii][tt - 1] > lv) { lv = RET[ii][tt - 1]; lb = ii; }
          pk.last = lb;
          KEYS.forEach(function (key) { ser[key].push(RET[pk[key]][tt]); pcs[key] = M > 1 ? (M - 1 - abvOf(pk[key], tt)) / (M - 1) : 1; });
          var invR = null;
          if (withInv) { invR = invMonth(kFirst + tt, learnW(TG[tt], L, mn), ST); ser.inv.push(invR.ret); var abI = 0, q3; for (q3 = 0; q3 < M; q3++) if (RET[q3][tt] > invR.ret) abI++; pcs.inv = M > 1 ? (M - 1 - abI) / (M - 1) : 1; invR.abv = abI; }
          var ab = 0, av = -Infinity; for (ii = 0; ii < M; ii++) if (RET[ii][tt] > av) { av = RET[ii][tt]; ab = ii; }
          hist.push({ t: tt, k: kFirst + tt, adv: pk.all, best: ab, abv: abvOf(pk.all, tt), pc: pcs, ret: RET[pk.all][tt], bestRet: av, ben: BEN[tt], use: TG[tt].filter(function (gi) { return cnt[gi] >= mn; }), tags: TG[tt], rc: rcAll, inv: invR });
        }
        for (ii = 0; ii < M; ii++) { var e = RET[ii][tt] - BEN[tt]; sumAll[ii] += e; TG[tt].forEach(function (gi) { sum[gi][ii] += e; }); }
        TG[tt].forEach(function (gi) { cnt[gi]++; });
        /* record the real #1 of this month, and of the 12-month year ending now, for the patterns active at its start */
        var wb = 0, wv = -Infinity; for (ii = 0; ii < M; ii++) if (RET[ii][tt] > wv) { wv = RET[ii][tt]; wb = ii; }
        L.wA[wb]++; L.nA++; TG[tt].forEach(function (gi) { wn[gi][wb]++; });
        if (tt >= 11) {
          var yb = 0, yv = -Infinity, eq, q2;
          for (ii = 0; ii < M; ii++) { eq = 1; for (q2 = tt - 11; q2 <= tt; q2++) eq *= 1 + RET[ii][q2]; if (eq > yv) { yv = eq; yb = ii; } }
          L.wAy[yb]++; L.nAy++; TG[tt - 11].forEach(function (gi) { wy[gi][yb]++; cy[gi]++; });
        }
      }
      return { sum: sum, cnt: cnt, sumAll: sumAll, ser: ser, bens: bens, hist: hist, L: L };
    }
    var W = walk(minN, true), WL = W.L, sum = W.sum, cnt = W.cnt, sumAll = W.sumAll, ser = W.ser, bens = W.bens;
    var kNow = P.kSig, act = tagsAt(P, S, X, kNow), now = {};
    /* library: best strategy after each pattern, using every past month */
    var lib = TAGS.map(function (tg, gi) {
      if (!cnt[gi]) return { gi: gi, n: 0 };
      var b = 0, bv = -Infinity; for (i = 0; i < M; i++) { var v = W.L.wn[gi][i] / cnt[gi]; if (v > bv) { bv = v; b = i; } }
      var h = 0; for (t = 0; t < T; t++) if (TG[t].indexOf(gi) >= 0 && RET[b][t] > BEN[t]) h++;
      return { gi: gi, n: cnt[gi], b: b, ex: bv, hit: h / cnt[gi], ok: cnt[gi] >= minN, act: act.indexOf(gi) >= 0 };
    });
    /* combined advice for this month */
    var CS = cScores(act, WL, minN, M), use = CS.use, sc = [];
    for (i = 0; i < M; i++) sc.push({ i: i, v: CS.v[i], e: CS.e[i] });
    sc.sort(function (a, b) { return (b.v - a.v) || (b.e - a.e); });
    var top = sc.slice(0, 3), topR = recs[top[0].i];
    var lbl = monthLabel(P, kNow + 1), asOf = monthLabel(P, kNow);
    var h = '<h3>This month: ' + esc(lbl) + ' (patterns read at the end of ' + esc(asOf) + ')</h3>';
    h += '<p class="headline">' + (use.length ? 'Patterns that match this month: <b>' + use.map(function (gi) { return esc(TAGS[gi][0]); }).join(', ') + '</b>.' : 'No pattern with enough past months matches this month, so the best strategy over all months is used.') + ' History favors: <b>' + nm(topR) + '</b> as the #1 strategy for ' + esc(lbl) + '.</p>';
    h += '<div class="scroll"><table class="tbl"><thead><tr><th>Rank</th><th class="wrap">Strategy</th><th>Ingredient evidence score</th></tr></thead><tbody>' +
      top.map(function (x, q) { var r = recs[x.i]; return '<tr class="pick" tabindex="0" data-fw="' + fw(r) + '"><th>#' + (q + 1) + '</th><td class="wrap">' + nm(r) + '</td><td>' + num(x.v, 2) + '</td></tr>'; }).join('') + '</tbody></table></div>';
    h += '<p class="note">Tap a row to load that strategy into My own blend. The library holds only the real #1 strategy of every past month and of every rolling 12-month year, filed under the patterns active when it started. For the patterns active now, the tool reads how each ingredient (12m, 6m, 3m, 1m, the per-risk ones, calm, filter) is placed in those #1s and builds the strategy whose ingredients are best supported. So a change in one regime, candle or chart pattern changes the evidence and can change the ingredients. A strategy that never won before can still be chosen.</p>';
    var invNow = learnW(act, WL, minN);
    h += '<h3>Invented strategy for ' + esc(lbl) + '</h3><p class="headline">Weights learned from the #1 strategies under the patterns active now: <b>' + invName(invNow) + '</b>.</p>' + invTable(invNow);
    h += '<div class="scroll"><table class="tbl"><tbody><tr class="pick" tabindex="0" data-fw="' + fw({ w: invNow.w, filt: invNow.filt }) + '"><th class="wrap">Tap to load the invented strategy into My own blend</th><td class="wrap">' + invName(invNow) + '</td></tr></tbody></table></div>';
    h += '<p class="note">Invented months are run with your exit rank, stop loss, market filter and cost, carried from month to month like the other strategies. Which ingredients to use and whether each is added or subtracted comes from the recipe. How strong each one is (for example 100, 60 or 30) is the average weight it had in the real #1 strategies that used it the same way under these patterns. Up to the 4 best-supported ingredients are kept. The best matching strategy from the list is shown above for comparison.</p>';
    h += '<h3>The recipe for ' + esc(lbl) + '</h3>' + rcHtml(recipeOf(WL, CS.lift));
    h += '<p class="note">Best placement is the state of each ingredient that is over-represented most in past #1 strategies under the patterns active now. The advised strategy above is the available one that matches this recipe best.</p>';
    /* data depth: how much history the advisor actually read */
    var late = P.syms.map(function (sy, si) { var f = 0; while (f < P.K && !isFinite(P.closes[si][f])) f++; return { s: sy, f: f }; }).sort(function (a, b) { return b.f - a.f; }).slice(0, 3);
    h += '<p class="note"><b>History read:</b> ' + P.syms.length + ' stocks, prices from ' + esc(monthLabel(P, 0)) + ' to ' + esc(monthLabel(P, P.K - 1)) + ' (' + (P.K / 12).toFixed(1) + ' years, the most each source returns). Strategies were scored on ' + T + ' months from ' + esc(monthLabel(P, kFirst + 1)) + ', and every one of those months feeds the pattern library. Testing starts once at least half of your stocks have prices. Latest-starting stocks: ' + late.map(function (x) { return esc(x.s) + ' (' + esc(monthLabel(P, x.f)) + ')'; }).join(', ') + '. Removing very new stocks opens earlier years.</p>';
    /* ingredient library built only from the real #1 strategies */
    var ING = {}, IDS = [];
    recs.forEach(function (r, ri) { ingr(r.w, r.filt).forEach(function (id) { if (!ING[id]) { ING[id] = []; IDS.push(id); } ING[id].push(ri); }); });
    var irows = IDS.map(function (id) {
      var g = ING[id], base = g.length / M, cells = [], wa = 0;
      g.forEach(function (ri) { wa += WL.wA[ri]; });
      TAGS.forEach(function (tg, gi) {
        if (cnt[gi] < minN) return;
        var wsum = 0; g.forEach(function (ri) { wsum += WL.wn[gi][ri]; });
        cells.push({ gi: gi, d: wsum / cnt[gi] - base, share: wsum / cnt[gi], n: cnt[gi] });
      });
      cells.sort(function (a, b) { return b.d - a.d; });
      return { id: id, k: g.length, base: base, all: WL.nA ? wa / WL.nA : NaN, best: cells.slice(0, 3), worst: cells.slice(-2).reverse() };
    });
    irows.sort(function (a, b) { return (b.best.length ? b.best[0].d : -1e9) - (a.best.length ? a.best[0].d : -1e9); });
    var cellH = function (c) { return esc(TAGS[c.gi][0]) + ' <span class="' + tone(c.d) + '">' + pc(c.share, 0) + ' of #1s</span> <span class="muted">(' + c.n + ' mo)</span>'; };
    h += '<h3>#1 library: which ingredients the real #1 strategies had</h3>';
    h += '<div class="scroll"><table class="tbl"><thead><tr><th class="wrap">Ingredient</th><th>Share of all strategies</th><th>Share of all real #1 months</th><th class="wrap">Most often in the #1 when</th><th class="wrap">Least often in the #1 when</th></tr></thead><tbody>' +
      irows.map(function (r) { return '<tr><th class="wrap">' + esc(ingName(r.id)) + '</th><td>' + pc(r.base, 0) + '</td><td class="' + tone(r.all - r.base) + '">' + pc(r.all, 0) + '</td><td class="wrap">' + (r.best.length ? r.best.map(cellH).join('<br>') : 'n/a') + '</td><td class="wrap">' + (r.worst.length ? r.worst.map(cellH).join('<br>') : 'n/a') + '</td></tr>'; }).join('') + '</tbody></table></div>';
    h += '<p class="note">Each past month has exactly one real #1 strategy, so this table counts only those winners. Share of all #1 months above the share of all strategies means the ingredient shows up in winners more than chance. The pattern columns show the same split when that pattern was active (' + (minN > 1 ? 'only patterns with at least ' + minN + ' past months' : 'every pattern with at least one past month, so rare patterns may be luck') + '). Months are filed causally: a winner is added only after its month, and a yearly winner only after its 12th month. Judge the library by the typical rank in the check below.</p>';
    /* past-date check: advice made from earlier months only, against the strategy that really came out #1 */
    var mlab = function (key) { return monthLabel(P, key - P.lo); };
    var firstOut = P.lo + kFirst + warm + 1, lastOut = P.lo + kFirst + T, fk = isFinite(fromKey) ? fromKey : firstOut, early = false;
    var hNow = h; h = '';
    h += '<h3>Check on past dates: advice vs the real #1</h3>';
    if (fk < firstOut) { early = true; fk = firstOut; }
    var tk = isFinite(toKey) ? Math.min(toKey, lastOut) : lastOut;
    if (fk > lastOut) h += errBox('The latest month with a known result is ' + mlab(lastOut) + ', so pick an earlier start month.');
    else if (tk < fk) h += errBox('The end month must not be before the start month.');
    else {
      var inR = function (x) { var m = P.lo + x.k + 1; return m >= fk && m <= tk; }, hs = W.hist.filter(inR), n = hs.length, cmpH = {};
      var avgPc = function (arr, key) { return mean(arr.map(function (x) { return x.pc[key]; })); };
      var pa = hs.map(function (x) { return x.pc.all; }), ma = mean(pa), sdA = sdev(pa), tA = n > 5 && sdA > 0 ? (ma - 0.5) / (sdA / Math.sqrt(n)) : NaN;
      var dB = hs.map(function (x) { return x.pc.all - x.pc.bsf; }), mB = mean(dB), sdB = sdev(dB), tB = n > 5 && sdB > 0 ? mB / (sdB / Math.sqrt(n)) : NaN;
      var top10 = hs.filter(function (x) { return x.pc.all >= 0.9; }).length, top25 = hs.filter(function (x) { return x.pc.all >= 0.75; }).length, exact = hs.filter(function (x) { return x.abv === 0; }).length;
      var beatL = hs.filter(function (x) { return x.ret > x.ben; }).length, f0 = hs[0];
      if (early) h += '<p class="note">Your start month is earlier than the first month that can be checked fairly. The tool needs ' + warm + ' months of earlier history first, so the check starts at ' + esc(mlab(fk)) + '.</p>';
      h += '<p class="headline">As of the end of <b>' + esc(monthLabel(P, f0.k)) + '</b>, using only earlier data, the tool ' + (f0.inv ? 'invented <b>' + invName(f0.inv) + '</b> for ' + esc(monthLabel(P, f0.k + 1)) + '. It made ' + pc(f0.inv.ret, 1, true) + ' and ranked ' + (f0.inv.abv + 1) + ' of ' + M + ' strategies. The best matching strategy from the list was <b>' + nm(recs[f0.adv]) + '</b>, which made ' + pc(f0.ret, 1, true) + ' and ranked ' + (f0.abv + 1) + '. ' : 'advised <b>' + nm(recs[f0.adv]) + '</b> for ' + esc(monthLabel(P, f0.k + 1)) + ', and it made ' + pc(f0.ret, 1, true) + ' (rank ' + (f0.abv + 1) + ' of ' + M + '). ') + 'The real #1 that month was <b>' + nm(recs[f0.best]) + '</b> (' + pc(f0.bestRet, 1, true) + ').</p>';
      if (f0.rc) h += '<p class="note"><b>Recipe the tool built for ' + esc(monthLabel(P, f0.k + 1)) + ' from earlier months only:</b></p>' + rcHtml(f0.rc);
      var vd;
      if (n < 12) vd = 'Only ' + n + ' months in this range, too few to judge. Use an earlier start month.';
      else if (tA >= 2 && ma > 0.5) vd = 'Over ' + n + ' months the advised strategy typically beat ' + Math.round(ma * 100) + '% of all strategies (random choosing gives 50%), by more than luck would explain (strength ' + num(tA, 2) + ').';
      else if (tA <= -2 && ma < 0.5) vd = 'Over ' + n + ' months the advised strategy typically beat only ' + Math.round(ma * 100) + '% of all strategies, clearly worse than random choosing (strength ' + num(tA, 2) + '). Do not rely on it.';
      else vd = 'Over ' + n + ' months the advised strategy typically beat ' + Math.round(ma * 100) + '% of all strategies. That is within what luck gives against 50% for random choosing (strength ' + num(tA, 2) + ').';
      h += '<p class="note"><b>' + vd + '</b> ' + (n >= 12 ? (tB >= 2 && mB > 0 ? 'It also did better than simply using the best strategy so far.' : (tB <= -2 && mB < 0 ? 'It did clearly worse than simply using the best strategy so far.' : 'It made no clear difference against simply using the best strategy so far.')) : '') + '</p>';
      h += '<div class="tiles">' +
        '<div class="tile"><span class="tl">Typical rank of advised strategy</span><span class="tv ' + (ma > 0.5 ? 'good' : 'bad') + '">' + pc(ma, 0) + '</span><span class="ts">50% = random choosing</span></div>' +
        '<div class="tile"><span class="tl">Months in the top 10%</span><span class="tv">' + top10 + ' of ' + n + '</span><span class="ts">random gives about ' + Math.round(n * 0.1) + '</span></div>' +
        '<div class="tile"><span class="tl">Months in the top 25%</span><span class="tv">' + top25 + ' of ' + n + '</span><span class="ts">random gives about ' + Math.round(n * 0.25) + '</span></div>' +
        '<div class="tile"><span class="tl">Months it picked the exact #1</span><span class="tv">' + exact + ' of ' + n + '</span><span class="ts">random gives about ' + (n / M).toFixed(1) + '</span></div>' +
        '<div class="tile"><span class="tl">Months it beat the list</span><span class="tv ' + (beatL / n >= 0.5 ? 'good' : 'bad') + '">' + pc(beatL / n, 0) + '</span><span class="ts">' + beatL + ' of ' + n + '</span></div></div>';
      /* compounded over the range: advisor against every fixed strategy */
      var eqA = 1, eqL = 1, eqB = 1, eqLast = 1, eqI = 1, eqS = new Array(M).fill(1), qq, hh;
      for (hh = 0; hh < n; hh++) { var tt2 = hs[hh].t; eqA *= 1 + hs[hh].ret; eqL *= 1 + hs[hh].ben; eqB *= 1 + W.ser.bsf[tt2 - warm]; eqLast *= 1 + W.ser.last[tt2 - warm]; eqI *= 1 + W.ser.inv[tt2 - warm]; for (qq = 0; qq < M; qq++) eqS[qq] *= 1 + RET[qq][tt2]; }
      var bi = 0, aboveA = 0; for (qq = 0; qq < M; qq++) { if (eqS[qq] > eqS[bi]) bi = qq; if (eqS[qq] > eqA) aboveA++; }
      var cg = function (e) { return Math.pow(e, 12 / n) - 1; };
      h += '<div class="scroll"><table class="tbl"><thead><tr><th class="wrap">Over ' + esc(mlab(fk)) + ' to ' + esc(mlab(tk)) + '</th><th>Yearly growth</th></tr></thead><tbody>' +
        '<tr><th class="wrap">Advisor, changing strategy every month</th><td class="' + tone(cg(eqA)) + '">' + pc(cg(eqA), 1, true) + '</td></tr>' +
        '<tr><th class="wrap">Advisor, invented weights each month</th><td class="' + tone(cg(eqI)) + '">' + pc(cg(eqI), 1, true) + '</td></tr>' +
        '<tr><th class="wrap">Best strategy so far, no patterns</th><td class="' + tone(cg(eqB)) + '">' + pc(cg(eqB), 1, true) + '</td></tr>' +
        '<tr><th class="wrap">Last month winner</th><td class="' + tone(cg(eqLast)) + '">' + pc(cg(eqLast), 1, true) + '</td></tr>' +
        '<tr><th class="wrap">Average stock of your list</th><td class="' + tone(cg(eqL)) + '">' + pc(cg(eqL), 1, true) + '</td></tr>' +
        '<tr><th class="wrap">Real #1 single strategy (known only afterwards): ' + nm(recs[bi]) + '</th><td class="' + tone(cg(eqS[bi])) + '">' + pc(cg(eqS[bi]), 1, true) + '</td></tr></tbody></table></div>';
      h += '<p class="note">The advisor beat ' + (M - aboveA) + ' of ' + M + ' strategies that were simply held for the whole period. The real #1 is the best of ' + M + ' tries picked with hindsight, so no method can be expected to match it. Judge the advisor by the typical rank and by how often it beat the list.</p>';
      /* which way of choosing ranked best on these dates */
      var ways = [['inv', 'Invented weights from #1 ingredients'], ['all', 'Patterns: best matching strategy'], ['reg', 'Regime patterns only'], ['candle', 'Candle patterns only'], ['chart', 'Chart patterns only'], ['bsf', 'Best strategy so far (no patterns)'], ['last', 'Last month winner']];
      h += '<div class="scroll"><table class="tbl"><thead><tr><th class="wrap">Way of choosing (these dates)</th><th>Typical rank</th></tr></thead><tbody>' +
        ways.map(function (w) { var v = avgPc(hs, w[0]); return '<tr><th class="wrap">' + w[1] + '</th><td class="' + (v > 0.5 ? 'good' : 'bad') + '">' + pc(v, 0) + '</td></tr>'; }).join('') + '</tbody></table></div>';
      /* accuracy by pattern */
      var accR = TAGS.map(function (tg, gi) { var g = hs.filter(function (x) { return x.tags.indexOf(gi) >= 0; }); return { gi: gi, n: g.length, v: g.length ? mean(g.map(function (x) { return x.pc.all; })) : NaN, t25: g.filter(function (x) { return x.pc.all >= 0.75; }).length, beat: g.filter(function (x) { return x.ret > x.ben; }).length }; }).filter(function (r) { return r.n > 0; });
      h += '<div class="scroll"><table class="tbl"><thead><tr><th class="wrap">Accuracy when this pattern was active</th><th>Kind</th><th>Months</th><th>Typical rank</th><th>Top 25%</th><th>Beat list</th></tr></thead><tbody>' +
        accR.map(function (r) { return '<tr><th class="wrap">' + esc(TAGS[r.gi][0]) + (r.n < 6 ? '<br><span class="muted">too few months to trust</span>' : '') + '</th><td>' + TAGS[r.gi][1] + '</td><td>' + r.n + '</td><td class="' + (r.v > 0.5 ? 'good' : 'bad') + '">' + pc(r.v, 0) + '</td><td>' + r.t25 + ' (' + pc(r.t25 / r.n, 0) + ')</td><td>' + r.beat + ' (' + pc(r.beat / r.n, 0) + ')</td></tr>'; }).join('') + '</tbody></table></div>';
      h += '<p class="note">Each row covers only the months where that pattern was active, so it shows where the advice worked and where it did not. Typical rank above 50% beats random choosing. Months overlap in meaning, because several patterns are often active together.</p>';
      /* which minimum-months setting checked best on these dates */
      var mins = [1, 3, 6, 8, 12];
      if (mins.indexOf(minN) < 0) mins.push(minN);
      mins.sort(function (a, b) { return a - b; });
      var mrows = mins.map(function (mn) { var Wk = mn === minN ? W : walk(mn), hk = Wk.hist.filter(inR); return { mn: mn, n: hk.length, v: hk.length ? avgPc(hk, 'all') : NaN, beat: hk.length ? hk.filter(function (x) { return x.ret > x.ben; }).length / hk.length : NaN }; });
      var bm = mrows[0]; mrows.forEach(function (r) { if (r.v > bm.v) bm = r; });
      h += '<div class="scroll"><table class="tbl"><thead><tr><th class="wrap">Minimum past months per pattern</th><th>Typical rank</th><th>Beat list</th></tr></thead><tbody>' +
        mrows.map(function (r) { return '<tr class="' + (r.mn === minN ? 'on' : '') + '"><th class="wrap">' + (r === bm ? '● ' : '') + (r.mn === 1 ? 'No minimum' : r.mn + ' months') + (r.mn === minN ? ' (selected)' : '') + '</th><td class="' + (r.v > 0.5 ? 'good' : 'bad') + '">' + pc(r.v, 0) + '</td><td>' + pc(r.beat, 0) + '</td></tr>'; }).join('') + '</tbody></table></div>';
      h += '<p class="note">' + (bm.mn === minN ? 'Your selected setting checked best on these dates.' : 'On these dates ' + bm.mn + ' months checked best. Change the setting above and run again to use it.') + ' Different dates may favor a different setting, so try a few start months before trusting one.</p>';
      /* by year */
      var by = {}; hs.forEach(function (x) { var y = Math.floor((P.lo + x.k + 1) / 12), o = by[y] || (by[y] = { y: y, n: 0, s: 0, b: 0 }); o.n++; o.s += x.pc.all; if (x.ret > x.ben) o.b++; });
      var yl = Object.keys(by).sort().map(function (y) { return by[y]; });
      if (yl.length > 1) h += '<div class="scroll"><table class="tbl"><thead><tr><th>Year</th><th>Months</th><th>Typical rank</th><th>Beat list</th></tr></thead><tbody>' +
        yl.map(function (o) { return '<tr><th>' + o.y + '</th><td>' + o.n + '</td><td class="' + (o.s / o.n > 0.5 ? 'good' : 'bad') + '">' + pc(o.s / o.n, 0) + '</td><td>' + o.b + ' (' + pc(o.b / o.n, 0) + ')</td></tr>'; }).join('') + '</tbody></table></div>';
      /* month by month */
      var cap = 36, shown = hs.slice(0, cap);
      h += '<div class="scroll"><table class="tbl"><thead><tr><th>Month</th><th class="wrap">Patterns used</th><th class="wrap">Advised</th><th>Result</th><th class="wrap">Real #1 that month</th><th>Rank</th><th>Beat list?</th><th class="wrap">Invented weights (result)</th></tr></thead><tbody>' +
        shown.map(function (x) {
          return '<tr><th>' + esc(monthLabel(P, x.k + 1)) + '</th><td class="wrap">' + (x.use.length ? x.use.map(function (gi) { return esc(TAGS[gi][0]); }).join(', ') : 'none, all months') + '</td><td class="wrap">' + nm(recs[x.adv]) + '</td><td class="' + tone(x.ret) + '">' + pc(x.ret, 1, true) + '</td><td class="wrap">' + nm(recs[x.best]) + ' ' + pc(x.bestRet, 1, true) + '</td><td>' + (x.abv + 1) + ' of ' + M + '</td><td class="' + (x.ret > x.ben ? 'good' : 'bad') + '">' + (x.ret > x.ben ? 'Yes' : 'No') + '</td><td class="wrap">' + (x.inv ? esc(stratName(x.inv.w)) + ' (F' + (x.inv.filt ? 'ON' : 'OFF') + ') <span class="' + tone(x.inv.ret) + '">' + pc(x.inv.ret, 1, true) + '</span>' : '') + '</td></tr>';
        }).join('') + '</tbody></table></div>';
      h += '<p class="note">' + (hs.length > cap ? 'Showing the first ' + cap + ' of ' + hs.length + ' months, the totals above cover all of them. ' : '') + 'Each month the advice uses only months that had already finished, so nothing peeks ahead. Rank 1 means the advised strategy was the real #1 that month. With ' + M + ' strategies, even the real #1 each month is partly luck, so a single month proves little. Look at the typical rank over many months. Your stock list holds today survivors, which flatters old months. Not investment advice.</p>';
    }
    /* walk-forward verdict */
    var P1 = {}; ['reg', 'candle', 'chart', 'all', 'bsf', 'last'].forEach(function (k2) { P1[k2] = perf(ser[k2], bens); });
    var cmp = pairT(ser.all, ser.bsf), verdict;
    if (cmp.t >= 2 && cmp.mean > 0) verdict = 'Choosing by patterns beat simply using the best strategy so far, by more than luck would explain (strength ' + num(cmp.t, 2) + '). The advice above has some evidence behind it.';
    else if (cmp.t <= -2 && cmp.mean < 0) verdict = 'Choosing by patterns did clearly worse than simply using the best strategy so far (strength ' + num(cmp.t, 2) + '). Do not rely on the advice above.';
    else verdict = 'Choosing by patterns made no clear difference against simply using the best strategy so far (strength ' + num(cmp.t, 2) + '). Treat the advice above as a hint, not a rule.';
    h += '<h3>Does it work? Walk-forward check</h3><p class="headline">' + esc(verdict) + '</p>';
    var names = [['all', 'Patterns: all three kinds'], ['reg', 'Regime patterns only'], ['candle', 'Candle patterns only'], ['chart', 'Chart patterns only'], ['bsf', 'Best strategy so far (no patterns)'], ['last', 'Last month winner']];
    h += '<div class="scroll"><table class="tbl"><thead><tr><th class="wrap">Way of choosing</th><th>Months</th><th>Avg extra a month</th><th>Months beating list</th><th>Yearly growth (list)</th><th>Worst fall (list)</th><th>Against best so far</th><th>Typical rank</th></tr></thead><tbody>' +
      names.map(function (x) {
        var p = P1[x[0]], c2 = pairT(ser[x[0]], ser.bsf);
        return '<tr><th class="wrap">' + x[1] + '</th><td>' + p.n + '</td><td class="' + tone(p.ex) + '">' + pc(p.ex, 2, true) + '</td><td>' + pc(p.hit, 0) + '</td><td><span class="' + tone(p.cagr) + '">' + pc(p.cagr, 1, true) + '</span> (' + pc(p.bcagr, 1, true) + ')</td><td><span class="bad">' + pc(p.dd, 0) + '</span> (' + pc(p.bdd, 0) + ')</td><td>' + (x[0] === 'bsf' ? '-' : num(c2.t, 2)) + '</td><td>' + pc(mean(W.hist.map(function (q) { return q.pc[x[0]]; })), 0) + '</td></tr>';
      }).join('') + '</tbody></table></div>';
    h += '<p class="note">Each month the choice uses only months that had already finished, starting after ' + warm + ' months of history. Against best so far shows the strength of the gap between that way of choosing and the best-so-far row. Above 2 is a real edge, below -2 is clearly worse, in between is within luck.</p>';
    /* library */
    h += '<h3>Pattern library: which strategy won after each pattern</h3>';
    h += '<div class="scroll"><table class="tbl"><thead><tr><th class="wrap">Pattern</th><th>Kind</th><th>Months seen</th><th class="wrap">#1 strategy after it</th><th>Avg extra a month</th><th>Beat list</th></tr></thead><tbody>' +
      lib.map(function (L) {
        var tg = TAGS[L.gi];
        if (!L.n) return '<tr><th class="wrap">' + esc(tg[0]) + '</th><td>' + tg[1] + '</td><td>0</td><td class="wrap" colspan="3">Never seen in your data</td></tr>';
        var r = recs[L.b];
        return '<tr class="' + (L.act ? 'on pick' : (L.ok ? 'pick' : '')) + '"' + (L.ok ? ' tabindex="0" data-fw="' + fw(r) + '"' : '') + '><th class="wrap">' + (L.act ? '● ' : '') + esc(tg[0]) + '<br><span class="muted">' + esc(tg[2]) + '</span></th><td>' + tg[1] + '</td><td class="' + (L.ok ? '' : 'warn') + '">' + L.n + (L.ok ? '' : ' (too few)') + '</td><td class="wrap">' + nm(r) + '</td><td class="' + tone(L.ex) + '">' + pc(L.ex, 2, true) + '</td><td>' + pc(L.hit, 0) + '</td></tr>';
      }).join('') + '</tbody></table></div>';
    h += '<p class="note">● marks patterns that are active this month. Rows with too few months are shown for information and ignored by the advice. Candle patterns are read on an equal-weight index built from your stocks monthly open, high, low and close' + (X.ohlc ? '' : '. Your data has no Open, High, Low columns, so candle patterns could not be read') + '. Because the highs and lows are averaged across stocks, shadows look longer than on a real index.</p>';
    var pastFirst = isFinite(fromKey) || isFinite(toKey);
    h += '<p class="note">How to read this: with hundreds of strategies and only a few months per pattern, the #1 after a pattern is often luck. The walk-forward table is the honest test. If it shows no edge, patterns are not telling you which strategy to use. Your stock list holds today survivors, which flatters old months. Not investment advice.</p>';
    var setH = '<p class="note"><b>Advisor build 5.</b> ' + (isFinite(fromKey) || isFinite(toKey) ? 'Your past dates come first; the latest month is at the bottom. ' : '') + '<b>Settings used:</b> stop loss ' + (PK_OPT.sl > 0 ? PK_OPT.sl + '%' : 'off') + ', exit rank ' + (CACHE && CACHE.ex > 0 ? CACHE.ex : 'off') + ', cost ' + (CACHE ? CACHE.cost : '') + '%, ' + N + ' stocks. Change them in the picker settings, then run again.</p>';
    return pastFirst ? setH + h + '<h3>Latest month, for reference</h3>' + hNow : setH + hNow + h;
  }
  mount();
})();
`;

export default {
  async scheduled(event, env, ctx) { ctx.waitUntil(runJob(env, true)); },
  async fetch(request, env, ctx) {
    var path = new URL(request.url).pathname;
    if (path === '/api/prices') return pricesResponse(request, env, ctx);
    if (path === '/api/sources') return new Response(JSON.stringify(sourceStatus(env)), { headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
    if (path === '/api/index') {
      try {
        var nm = new URL(request.url).searchParams.get('name') || 'nifty500';
        var syms = await loadIndex(nm);
        return new Response(JSON.stringify({ name: nm, count: syms.length, symbols: syms, source: syms.source || 'nse', fallback: !!syms.fallback }), { headers: { 'content-type': 'application/json', 'cache-control': syms.fallback ? 'no-store' : 'public, max-age=86400' } });
      } catch (e) {
        return new Response(JSON.stringify({ error: String(e && e.message || e) }), { status: 502, headers: { 'content-type': 'application/json' } });
      }
    }
    if (path === '/alert') {
      var m = await runJob(env, false);
      return new Response(m.title + '\n\n' + m.body + '\n', { headers: { 'content-type': 'text/plain; charset=utf-8' } });
    }
    if (path === '/' || path === '/index.html') {
      return new Response(PAGE_HTML + '<script>' + ROLL_JS + '<\/script><script>' + ADV_JS + '<\/script>', { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-cache' } });
    }
    return new Response('Not found', { status: 404 });
  }
};
