import { useState, useEffect, useCallback, useRef } from “react”;

const TEAMS = [
{ code: “FWC”, name: “FIFA World Cup”, flag: “🏆”, count: 19 },
{ code: “MEX”, name: “México”, flag: “🇲🇽”, count: 20 },
{ code: “RSA”, name: “Sudáfrica”, flag: “🇿🇦”, count: 20 },
{ code: “KOR”, name: “Corea del Sur”, flag: “🇰🇷”, count: 20 },
{ code: “CZE”, name: “República Checa”, flag: “🇨🇿”, count: 20 },
{ code: “CAN”, name: “Canadá”, flag: “🇨🇦”, count: 20 },
{ code: “BIH”, name: “Bosnia”, flag: “🇧🇦”, count: 20 },
{ code: “QAT”, name: “Qatar”, flag: “🇶🇦”, count: 20 },
{ code: “SUI”, name: “Suiza”, flag: “🇨🇭”, count: 20 },
{ code: “BRA”, name: “Brasil”, flag: “🇧🇷”, count: 20 },
{ code: “MAR”, name: “Marruecos”, flag: “🇲🇦”, count: 20 },
{ code: “HAI”, name: “Haití”, flag: “🇭🇹”, count: 20 },
{ code: “SCO”, name: “Escocia”, flag: “🏴”, count: 20 },
{ code: “USA”, name: “Estados Unidos”, flag: “🇺🇸”, count: 20 },
{ code: “PAR”, name: “Paraguay”, flag: “🇵🇾”, count: 20 },
{ code: “AUS”, name: “Australia”, flag: “🇦🇺”, count: 20 },
{ code: “TUR”, name: “Turquía”, flag: “🇹🇷”, count: 20 },
{ code: “GER”, name: “Alemania”, flag: “🇩🇪”, count: 20 },
{ code: “CUW”, name: “Curaçao”, flag: “🇨🇼”, count: 20 },
{ code: “CIV”, name: “Costa de Marfil”, flag: “🇨🇮”, count: 20 },
{ code: “ECU”, name: “Ecuador”, flag: “🇪🇨”, count: 20 },
{ code: “NED”, name: “Países Bajos”, flag: “🇳🇱”, count: 20 },
{ code: “JPN”, name: “Japón”, flag: “🇯🇵”, count: 20 },
{ code: “SWE”, name: “Suecia”, flag: “🇸🇪”, count: 20 },
{ code: “TUN”, name: “Túnez”, flag: “🇹🇳”, count: 20 },
{ code: “BEL”, name: “Bélgica”, flag: “🇧🇪”, count: 20 },
{ code: “EGY”, name: “Egipto”, flag: “🇪🇬”, count: 20 },
{ code: “IRN”, name: “Irán”, flag: “🇮🇷”, count: 20 },
{ code: “NZL”, name: “Nueva Zelanda”, flag: “🇳🇿”, count: 20 },
{ code: “ESP”, name: “España”, flag: “🇪🇸”, count: 20 },
{ code: “CPV”, name: “Cabo Verde”, flag: “🇨🇻”, count: 20 },
{ code: “KSA”, name: “Arabia Saudita”, flag: “🇸🇦”, count: 20 },
{ code: “URU”, name: “Uruguay”, flag: “🇺🇾”, count: 20 },
{ code: “FRA”, name: “Francia”, flag: “🇫🇷”, count: 20 },
{ code: “SEN”, name: “Senegal”, flag: “🇸🇳”, count: 20 },
{ code: “IRQ”, name: “Irak”, flag: “🇮🇶”, count: 20 },
{ code: “NOR”, name: “Noruega”, flag: “🇳🇴”, count: 20 },
{ code: “ARG”, name: “Argentina”, flag: “🇦🇷”, count: 20 },
{ code: “ALG”, name: “Argelia”, flag: “🇩🇿”, count: 20 },
{ code: “AUT”, name: “Austria”, flag: “🇦🇹”, count: 20 },
{ code: “JOR”, name: “Jordania”, flag: “🇯🇴”, count: 20 },
{ code: “POR”, name: “Portugal”, flag: “🇵🇹”, count: 20 },
{ code: “COD”, name: “Congo RD”, flag: “🇨🇩”, count: 20 },
{ code: “UZB”, name: “Uzbekistán”, flag: “🇺🇿”, count: 20 },
{ code: “COL”, name: “Colombia”, flag: “🇨🇴”, count: 20 },
{ code: “ENG”, name: “Inglaterra”, flag: “🏴”, count: 20 },
{ code: “CRO”, name: “Croacia”, flag: “🇭🇷”, count: 20 },
{ code: “GHA”, name: “Ghana”, flag: “🇬🇭”, count: 20 },
{ code: “PAN”, name: “Panamá”, flag: “🇵🇦”, count: 20 },
{ code: “CC”,  name: “Coca-Cola”, flag: “🥤”, count: 14 },
];

function buildStickerIds() {
const ids = [];
TEAMS.forEach(t => { for (let i = 1; i <= t.count; i++) ids.push(`${t.code}${i}`); });
return ids;
}

const ALL_STICKERS = buildStickerIds();
const TOTAL = ALL_STICKERS.length;

// ─────────────────────────────────────────────────────────────────────────────
// Generates a self-contained HTML file and downloads it.
// On iPhone: open the file from Downloads in Safari → Share ⎦↑ → Imprimir
// On desktop: the file auto-triggers window.print() when opened.
// This avoids ALL iframe / popup-blocker / @media print iframe issues.
// ─────────────────────────────────────────────────────────────────────────────
function downloadPrintHTML(collected) {
const collectedCount = Object.values(collected).filter(Boolean).length;
const percent = Math.round((collectedCount / TOTAL) * 100);
const date = new Date().toLocaleDateString(“es-ES”, { day:“2-digit”, month:“long”, year:“numeric” });

const teamBlocks = TEAMS.map(team => {
const stickers = ALL_STICKERS.filter(id => id.startsWith(team.code));
const done = stickers.filter(id => collected[id]).length;
const pct = Math.round((done / stickers.length) * 100);
const barColor = pct === 100 ? “#16a34a” : pct > 50 ? “#b8860b” : “#2563eb”;
const cells = stickers.map(id => {
const ok = !!collected[id];
return `<span style="display:inline-block;padding:2px 5px;border-radius:3px;font-size:9px;font-weight:600;letter-spacing:.3px;border:1px solid ${ok ? "#86efac" : "#ddd"};background:${ok ? "#dcfce7" : "#f5f5f5"};color:${ok ? "#15803d" : "#bbb"};${ok ? "" : "text-decoration:line-through;"}">${id}</span>`;
}).join(” “);

```
return `
<div style="break-inside:avoid;page-break-inside:avoid;margin-bottom:10px;border:1px solid #e8e0d0;border-radius:6px;overflow:hidden;">
  <div style="display:flex;align-items:center;gap:8px;background:#f9f6f0;border-bottom:1px solid #e8e0d0;padding:5px 10px;">
    <span style="font-size:15px">${team.flag}</span>
    <span style="font-weight:700;font-size:12px;color:#222;flex:1">${team.name}</span>
    <span style="font-size:9px;color:#999;letter-spacing:1px">${team.code}</span>
    <div style="display:flex;align-items:center;gap:5px;min-width:80px">
      <div style="flex:1;height:4px;background:#ddd;border-radius:2px;overflow:hidden">
        <div style="height:100%;width:${pct}%;background:${barColor};border-radius:2px"></div>
      </div>
      <span style="font-size:9px;color:#777;white-space:nowrap">${done}/${stickers.length}</span>
    </div>
  </div>
  <div style="display:flex;flex-wrap:wrap;gap:3px;padding:5px 8px;background:#fff">${cells}</div>
</div>`;
```

}).join(””);

const html = `<!DOCTYPE html>

<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Álbum Panini – FIFA World Cup 2026</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:Arial,sans-serif;background:#fff;color:#111;padding:16px 20px 40px;font-size:11px;}
  @media print{
    body{padding:8px 12px 20px;}
    .no-print{display:none!important;}
  }
</style>
</head>
<body>

<!-- Instrucciones – solo visibles en pantalla -->

<div class="no-print" style="background:#fffbea;border:2px solid #f0c040;border-radius:8px;padding:12px 16px;margin-bottom:18px;font-size:12px;color:#555;line-height:1.6">
  <strong style="color:#b8860b;font-size:14px">🖨️ Cómo imprimir / guardar como PDF</strong><br/>
  <strong>iPhone / iPad (Safari):</strong> toca el ícono de compartir <strong>⎦↑</strong> → <strong>Imprimir</strong><br/>
  <strong>Mac / PC:</strong> pulsa <strong>Cmd+P</strong> o <strong>Ctrl+P</strong> → elige «Guardar como PDF»
</div>

<!-- Portada -->

<div style="text-align:center;padding:14px 0 12px;border-bottom:3px solid #b8860b;margin-bottom:14px">
  <div style="font-size:36px;font-weight:900;letter-spacing:6px;color:#b8860b;line-height:1">ÁLBUM PANINI</div>
  <div style="font-size:12px;letter-spacing:3px;color:#666;margin-top:3px">FIFA WORLD CUP 2026™</div>
  <div style="font-size:9px;color:#aaa;margin-top:4px;letter-spacing:1px">Impreso el ${date}</div>
</div>

<!-- Progreso global -->

<div style="display:flex;align-items:center;gap:12px;background:#f7f4ec;border:1px solid #e0d0a0;border-radius:7px;padding:9px 14px;margin-bottom:12px">
  <div style="font-size:32px;font-weight:900;color:#b8860b;line-height:1">${collectedCount}</div>
  <div style="font-size:10px;color:#555;line-height:1.5">
    <strong style="font-size:12px;color:#111">de ${TOTAL} cromos obtenidos</strong><br/>
    Progreso total del álbum
  </div>
  <div style="flex:1">
    <div style="height:8px;background:#e0e0e0;border-radius:4px;overflow:hidden;margin-bottom:3px">
      <div style="height:100%;width:${percent}%;background:linear-gradient(90deg,#b8860b,#d4a017);border-radius:4px"></div>
    </div>
    <div style="font-size:11px;color:#b8860b;font-weight:700">${percent}% completado</div>
  </div>
</div>

<!-- Leyenda -->

<div style="display:flex;gap:14px;margin-bottom:10px;font-size:9px;color:#666">
  <span><span style="display:inline-block;width:10px;height:10px;background:#dcfce7;border:1px solid #86efac;border-radius:2px;vertical-align:middle;margin-right:3px"></span>Obtenido</span>
  <span><span style="display:inline-block;width:10px;height:10px;background:#f5f5f5;border:1px solid #ddd;border-radius:2px;vertical-align:middle;margin-right:3px"></span>Pendiente</span>
</div>

<!-- Equipos -->

${teamBlocks}

<!-- Pie -->

<div style="margin-top:16px;border-top:1px solid #e0d0a0;padding-top:6px;display:flex;justify-content:space-between;font-size:8px;color:#bbb;letter-spacing:.5px">
  <span>FIFA WORLD CUP 2026™ · Panini</span>
  <span>${collectedCount}/${TOTAL} cromos · ${percent}%</span>
</div>

</body>
</html>`;

const blob = new Blob([html], { type: “text/html;charset=utf-8” });
const url  = URL.createObjectURL(blob);
const a    = document.createElement(“a”);
a.href     = url;
a.download = `album-panini-2026.html`;
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
setTimeout(() => URL.revokeObjectURL(url), 5000);
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Album component
// ─────────────────────────────────────────────────────────────────────────────
export default function Album() {
const [collected, setCollected] = useState({});
const [search, setSearch]       = useState(””);
const [filterTeam, setFilter]   = useState(“ALL”);
const [loaded, setLoaded]       = useState(false);
const [toast, setToast]         = useState(null);
const importRef = useRef();

useEffect(() => {
async function load() {
try {
const r = loc.get(“wc2026-collected”);
if (r?.value) setCollected(JSON.parse(r.value));
} catch {}
setLoaded(true);
}
load();
}, []);

const saveLocal = useCallback(async (data) => {
try { LocalStorage.set(“wc2026-collected”, JSON.stringify(data)); } catch {}
}, []);

const showToast = (msg, color = “#4ade80”) => {
setToast({ msg, color });
setTimeout(() => setToast(null), 3500);
};

const toggle = useCallback((id) => {
setCollected(prev => {
const next = { …prev, [id]: !prev[id] };
saveLocal(next);
return next;
});
}, [saveLocal]);

const markAll = (code) => {
const list = code === “ALL” ? ALL_STICKERS : ALL_STICKERS.filter(id => id.startsWith(code));
setCollected(prev => {
const next = { …prev };
list.forEach(id => (next[id] = true));
saveLocal(next);
return next;
});
};

const clearAll = (code) => {
const list = code === “ALL” ? ALL_STICKERS : ALL_STICKERS.filter(id => id.startsWith(code));
setCollected(prev => {
const next = { …prev };
list.forEach(id => delete next[id]);
saveLocal(next);
return next;
});
};

const handleExport = () => {
const collectedList = ALL_STICKERS.filter(id => collected[id]);
const payload = { version:1, exportedAt:new Date().toISOString(), total:TOTAL, collected:collectedList.length, stickers:collectedList };
const blob = new Blob([JSON.stringify(payload, null, 2)], { type:“application/json” });
const url  = URL.createObjectURL(blob);
const a    = document.createElement(“a”);
a.href = url;
a.download = `album-mundial-2026-${new Date().toLocaleDateString("es-ES").replace(/\//g,"-")}.json`;
a.click();
URL.revokeObjectURL(url);
showToast(“✅ Archivo JSON descargado.”, “#4ade80”);
};

const handleImport = (e) => {
const file = e.target.files?.[0];
if (!file) return;
const reader = new FileReader();
reader.onload = (ev) => {
try {
const parsed = JSON.parse(ev.target.result);
let newCollected = {};
if (parsed.stickers && Array.isArray(parsed.stickers)) {
parsed.stickers.forEach(id => (newCollected[id] = true));
} else if (parsed.collected && typeof parsed.collected === “object” && !Array.isArray(parsed.collected)) {
newCollected = parsed.collected;
} else { showToast(“❌ Formato no reconocido”, “#f87171”); return; }
setCollected(newCollected);
saveLocal(newCollected);
showToast(`✅ Importados ${Object.values(newCollected).filter(Boolean).length} cromos`, “#4ade80”);
} catch { showToast(“❌ Error al leer el archivo”, “#f87171”); }
};
reader.readAsText(file);
e.target.value = “”;
};

const collectedCount = Object.values(collected).filter(Boolean).length;
const percent = Math.round((collectedCount / TOTAL) * 100);
const getStickers = (team) => ALL_STICKERS.filter(id => id.startsWith(team.code));
const visibleTeams = filterTeam === “ALL” ? TEAMS : TEAMS.filter(t => t.code === filterTeam);
const filtered = (stickers) => search ? stickers.filter(id => id.toLowerCase().includes(search.toLowerCase())) : stickers;

if (!loaded) return (
<div style={{ minHeight:“100vh”, display:“flex”, alignItems:“center”, justifyContent:“center”,
background:”#0a0f1e”, color:”#fff”, fontFamily:“Arial,sans-serif”, fontSize:32, letterSpacing:4 }}>
CARGANDO…
</div>
);

return (
<div style={s.root}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@400;500&display=swap'); *{box-sizing:border-box;margin:0;padding:0;} ::-webkit-scrollbar{width:6px;} ::-webkit-scrollbar-track{background:#0a0f1e;} ::-webkit-scrollbar-thumb{background:#c8a84b;border-radius:3px;} .sb{transition:all .15s;cursor:pointer;border:none;background:none;padding:0;} .sb:hover .sc{transform:scale(1.08);} .ab{transition:opacity .15s;cursor:pointer;} .ab:hover{opacity:.8;} @keyframes fi{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:none;}} .ts{animation:fi .25s ease both;} @keyframes slideIn{from{opacity:0;transform:translateY(-16px);}to{opacity:1;transform:none;}} .toast{animation:slideIn .25s ease both;}`}</style>

```
  {/* Toast */}
  {toast && (
    <div className="toast" style={{ position:"fixed", top:16, left:"50%", transform:"translateX(-50%)",
      background:"#0d1828", border:`1.5px solid ${toast.color}`, color:toast.color,
      borderRadius:10, padding:"10px 20px", fontSize:14, fontFamily:"'Barlow Condensed',sans-serif",
      letterSpacing:.5, zIndex:999, boxShadow:"0 4px 20px rgba(0,0,0,.5)", whiteSpace:"nowrap" }}>
      {toast.msg}
    </div>
  )}

  {/* Header */}
  <header style={s.hdr}>
    <div style={s.hdrIn}>
      <div>
        <h1 style={s.title}>ÁLBUM PANINI</h1>
        <p style={s.sub}>FIFA WORLD CUP 2026™</p>
      </div>
      <div style={s.stats}>
        <div style={s.statN}>{collectedCount}</div>
        <div style={s.statL}>de {TOTAL} cromos</div>
        <div style={s.pbar}><div style={{...s.pfill, width:`${percent}%`}}/></div>
        <div style={s.statP}>{percent}% completado</div>
      </div>
    </div>
  </header>

  {/* Toolbar */}
  <div style={s.iobar}>
    <div style={s.ioLeft}>
      <span style={s.ioTitle}>💾 Copia de seguridad</span>
      <span style={s.ioHint}>Exporta tu progreso y súbelo a Drive o guárdalo donde quieras</span>
    </div>
    <div style={s.ioRight}>
      <input ref={importRef} type="file" accept=".json" style={{display:"none"}} onChange={handleImport} />
      <button className="ab" style={s.iobtn} onClick={() => importRef.current?.click()}>
        📂 Importar JSON
      </button>
      <button className="ab" style={{...s.iobtn, background:"#1a3a28", border:"1px solid #2a5a40", color:"#4ade80"}}
        onClick={handleExport}>
        ⬇️ Exportar JSON
      </button>
      <button className="ab"
        style={{...s.iobtn, background:"#1a1a3a", border:"1px solid #3a3a7a", color:"#a0a0ff"}}
        onClick={() => {
          downloadPrintHTML(collected);
          showToast("📄 Abre el archivo .html descargado en Safari → Compartir ⎦↑ → Imprimir", "#a0a0ff");
        }}>
        🖨️ Descargar para imprimir
      </button>
    </div>
  </div>

  {/* Hint bar */}
  <div style={s.hint}>
    <span style={s.hintIcon}>💡</span>
    <span>Para guardar en Drive: exporta el JSON → abre <strong style={{color:"#4285f4"}}>drive.google.com</strong> → arrastra el archivo ahí.</span>
    <span style={{marginLeft:12,color:"#5a5a9a"}}>
      📱 <strong style={{color:"#8080d0"}}>iPhone:</strong> descarga el HTML → ábrelo en Safari → ícono compartir <strong>⎦↑</strong> → <strong>Imprimir</strong>.
    </span>
  </div>

  {/* Controls */}
  <div style={s.ctrl}>
    <input style={s.srch} placeholder="Buscar cromo (ej: ARG10)..." value={search} onChange={e=>setSearch(e.target.value)} />
    <div style={{display:"flex",gap:8}}>
      <button className="ab" style={s.bdng} onClick={()=>{if(confirm("¿Reiniciar álbum?"))clearAll("ALL")}}>🗑 Reiniciar</button>
      <button className="ab" style={s.bsuc} onClick={()=>markAll("ALL")}>✅ Completar todo</button>
    </div>
  </div>

  {/* Team filter */}
  <div style={s.fscr}>
    <button className="ab" style={{...s.chip,...(filterTeam==="ALL"?s.chipA:{})}} onClick={()=>setFilter("ALL")}>Todos</button>
    {TEAMS.map(t => {
      const st = getStickers(t);
      const done = st.filter(id => collected[id]).length;
      const act = filterTeam === t.code;
      return (
        <button key={t.code} className="ab" style={{...s.chip,...(act?s.chipA:{})}} onClick={()=>setFilter(t.code)}>
          {t.flag} {t.code}<span style={s.badge}>{done}/{st.length}</span>
        </button>
      );
    })}
  </div>

  {/* Main grid */}
  <main style={s.main}>
    {visibleTeams.map(team => {
      const stickers = filtered(getStickers(team));
      if (!stickers.length) return null;
      const done = stickers.filter(id => collected[id]).length;
      const pct  = Math.round((done / stickers.length) * 100);
      return (
        <div key={team.code} className="ts" style={s.tsec}>
          <div style={s.thdr}>
            <div style={s.tinf}>
              <span style={{fontSize:26}}>{team.flag}</span>
              <div>
                <div style={s.tname}>{team.name}</div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginTop:3}}>
                  <div style={s.tbar}>
                    <div style={{...s.tbfil, width:`${pct}%`,
                      background: pct===100?"#4ade80":pct>50?"#c8a84b":"#3b82f6"}}/>
                  </div>
                  <span style={s.tcnt}>{done}/{stickers.length}</span>
                </div>
              </div>
            </div>
            <div style={{display:"flex",gap:6}}>
              <button className="ab" style={s.tbtn} onClick={()=>markAll(team.code)}>✓ Todos</button>
              <button className="ab" style={{...s.tbtn,background:"#1e2a3a"}} onClick={()=>clearAll(team.code)}>✗ Ninguno</button>
            </div>
          </div>
          <div style={s.grid}>
            {stickers.map(id => {
              const ok = !!collected[id];
              return (
                <button key={id} className="sb" onClick={()=>toggle(id)}>
                  <div className="sc" style={{...s.sc,
                    background: ok?"linear-gradient(135deg,#1a3a2a,#0d2a1a)":"linear-gradient(135deg,#141c2f,#0d1220)",
                    border: ok?"2px solid #4ade80":"2px solid #1e2d45",
                    boxShadow: ok?"0 0 10px rgba(74,222,128,.22)":"none"}}>
                    {ok && <div style={s.chk}>✓</div>}
                    <span style={{...s.slab, color:ok?"#4ade80":"#8899bb", fontWeight:ok?700:500}}>{id}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      );
    })}
  </main>

  <footer style={s.foot}>
    <span>FIFA WORLD CUP 2026™ · Panini</span>
    <span style={{color:"#c8a84b"}}>{collectedCount}/{TOTAL} cromos obtenidos</span>
  </footer>
</div>
```

);
}

const s = {
root:{minHeight:“100vh”,background:“linear-gradient(180deg,#060c1a,#0a1228)”,fontFamily:”‘Barlow’,sans-serif”,color:”#e8edf5”},
hdr:{background:“linear-gradient(135deg,#0d1b35,#0a1428,#0d1b35)”,borderBottom:“3px solid #c8a84b”,padding:“16px 24px 12px”,position:“sticky”,top:0,zIndex:100,boxShadow:“0 4px 24px rgba(0,0,0,.5)”},
hdrIn:{maxWidth:1400,margin:“0 auto”,display:“flex”,justifyContent:“space-between”,alignItems:“center”,gap:20},
title:{fontFamily:”‘Bebas Neue’,sans-serif”,fontSize:38,letterSpacing:4,color:”#c8a84b”,lineHeight:1,textShadow:“0 0 30px rgba(200,168,75,.3)”},
sub:{fontFamily:”‘Barlow Condensed’,sans-serif”,fontSize:12,letterSpacing:3,color:”#6a8ab0”,marginTop:2},
stats:{textAlign:“right”,minWidth:170},
statN:{fontFamily:”‘Bebas Neue’,sans-serif”,fontSize:44,color:”#fff”,lineHeight:1},
statL:{fontSize:11,color:”#6a8ab0”,fontFamily:”‘Barlow Condensed’,sans-serif”,letterSpacing:1},
pbar:{height:5,background:”#1e2d45”,borderRadius:3,overflow:“hidden”,margin:“6px 0 3px”},
pfill:{height:“100%”,background:“linear-gradient(90deg,#c8a84b,#f0d080)”,borderRadius:3,transition:“width .4s”},
statP:{fontSize:10,color:”#c8a84b”,fontFamily:”‘Barlow Condensed’,sans-serif”,letterSpacing:1},
iobar:{background:”#080e1c”,borderBottom:“1px solid #1a2a3e”,padding:“10px 24px”,display:“flex”,justifyContent:“space-between”,alignItems:“center”,gap:12,flexWrap:“wrap”},
ioLeft:{display:“flex”,flexDirection:“column”,gap:2},
ioTitle:{fontFamily:”‘Barlow Condensed’,sans-serif”,fontSize:14,letterSpacing:1,color:”#c8a84b”,fontWeight:600},
ioHint:{fontSize:11,color:”#3a4a60”,fontFamily:”‘Barlow’,sans-serif”},
ioRight:{display:“flex”,gap:8,alignItems:“center”,flexWrap:“wrap”},
iobtn:{background:”#0d1828”,border:“1px solid #1e2d45”,color:”#8899bb”,borderRadius:7,padding:“7px 14px”,fontSize:12,fontFamily:”‘Barlow Condensed’,sans-serif”,letterSpacing:.5,cursor:“pointer”},
hint:{background:”#0a1220”,borderBottom:“1px solid #131e30”,padding:“8px 24px”,fontSize:11,color:”#4a5a70”,fontFamily:”‘Barlow’,sans-serif”,display:“flex”,alignItems:“center”,gap:6,flexWrap:“wrap”},
hintIcon:{fontSize:14},
ctrl:{maxWidth:1400,margin:“0 auto”,padding:“11px 24px”,display:“flex”,gap:12,alignItems:“center”,flexWrap:“wrap”},
srch:{flex:1,minWidth:160,background:”#0d1828”,border:“2px solid #1e2d45”,borderRadius:8,color:”#e8edf5”,padding:“8px 13px”,fontSize:13,fontFamily:”‘Barlow’,sans-serif”,outline:“none”},
bdng:{background:”#2a1010”,border:“1px solid #5a2020”,color:”#ff6b6b”,borderRadius:7,padding:“7px 13px”,fontSize:12,fontFamily:”‘Barlow Condensed’,sans-serif”,cursor:“pointer”},
bsuc:{background:”#0d2a1a”,border:“1px solid #1a5a30”,color:”#4ade80”,borderRadius:7,padding:“7px 13px”,fontSize:12,fontFamily:”‘Barlow Condensed’,sans-serif”,cursor:“pointer”},
fscr:{display:“flex”,gap:7,overflowX:“auto”,padding:“0 24px 9px”,maxWidth:1400,margin:“0 auto”,scrollbarWidth:“none”},
chip:{flexShrink:0,background:”#0d1828”,border:“1.5px solid #1e2d45”,color:”#8899bb”,borderRadius:20,padding:“4px 11px”,fontSize:11,fontFamily:”‘Barlow Condensed’,sans-serif”,letterSpacing:.5,display:“flex”,alignItems:“center”,gap:4,whiteSpace:“nowrap”,cursor:“pointer”},
chipA:{background:”#1a2a40”,border:“1.5px solid #c8a84b”,color:”#c8a84b”},
badge:{background:”#1e2d45”,borderRadius:10,padding:“1px 5px”,fontSize:9,color:”#6a8ab0”},
main:{maxWidth:1400,margin:“0 auto”,padding:“8px 24px 40px”},
tsec:{background:“linear-gradient(135deg,#0d1828,#0a1220)”,border:“1px solid #1a2a3e”,borderRadius:12,padding:“13px 15px”,marginBottom:12},
thdr:{display:“flex”,justifyContent:“space-between”,alignItems:“center”,marginBottom:9,flexWrap:“wrap”,gap:7},
tinf:{display:“flex”,alignItems:“center”,gap:10},
tname:{fontFamily:”‘Barlow Condensed’,sans-serif”,fontWeight:700,fontSize:16,letterSpacing:1,color:”#ddeeff”},
tbar:{width:85,height:4,background:”#1e2d45”,borderRadius:2,overflow:“hidden”},
tbfil:{height:“100%”,borderRadius:2,transition:“width .3s”},
tcnt:{fontSize:10,color:”#6a8ab0”,fontFamily:”‘Barlow Condensed’,sans-serif”},
tbtn:{background:”#1a3a28”,border:“1px solid #2a5a40”,color:”#4ade80”,borderRadius:6,padding:“4px 9px”,fontSize:11,fontFamily:”‘Barlow Condensed’,sans-serif”,cursor:“pointer”},
grid:{display:“grid”,gridTemplateColumns:“repeat(auto-fill,minmax(64px,1fr))”,gap:5},
sc:{borderRadius:8,padding:“7px 3px 5px”,display:“flex”,flexDirection:“column”,alignItems:“center”,justifyContent:“center”,minHeight:48,position:“relative”,transition:“all .15s”},
chk:{position:“absolute”,top:3,right:4,fontSize:9,color:”#4ade80”,fontWeight:700},
slab:{fontFamily:”‘Barlow Condensed’,sans-serif”,fontSize:11,letterSpacing:.5,textAlign:“center”},
foot:{
borderTop:“1px solid #1a2a3e”,
padding:“11px 24px”,
display:“flex”,
justifyContent:“space-between”,
fontSize:10,
color:”#3a4a60”,
fontFamily:”‘Barlow Condensed’,sans-serif”,
letterSpacing:1,
maxWidth:1400,
margin:“0 auto”,
},
};
