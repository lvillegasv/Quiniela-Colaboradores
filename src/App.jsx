import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { Save, LogOut } from "lucide-react";

// ─── SUPABASE ─────────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://clkbutrtukcjgtukaqok.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_jtTqWTvysUC8w1SKiscIXw_oi_rtAWC";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── ADMINS ───────────────────────────────────────────────────────────────────
const ADMIN_EMAILS = ["lvillegasv@mfamayoreo.com"];
const isAdmin = (user) => user && (ADMIN_EMAILS.includes(user.email) || user.esAdmin === true);

// ─── PALETA ───────────────────────────────────────────────────────────────────
const G = {
  green:"#1a9e3f", greenDark:"#0f6b2a", greenDim:"#1e3d28", greenLight:"#22c44f",
  bg:"#0d0d0d", card:"#161616", card2:"#1e1e1e", border:"#2a2a2a", muted:"#666", gray:"#aaa",
};

const inp = { width:"100%", background:G.bg, border:`1px solid ${G.border}`, borderRadius:8, padding:"11px 14px", fontSize:14, color:"#fff", fontFamily:"'Barlow',sans-serif", outline:"none" };
const lbl = { display:"block", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:".8px", color:G.gray, marginBottom:6 };
const greenBtn = { width:"100%", background:G.green, border:"none", borderRadius:10, padding:"14px", fontFamily:"'Barlow Condensed',sans-serif", fontSize:18, fontWeight:900, letterSpacing:2, textTransform:"uppercase", color:"#fff", cursor:"pointer" };
const card = { background:G.card, border:`1px solid ${G.border}`, borderRadius:16 };

// ─── SELECCIONES Y JUGADORES ─────────────────────────────────────────────────
const teams = {
  MEX:{code:"MEX",name:"México",flag:"🇲🇽"},RSA:{code:"RSA",name:"Sudáfrica",flag:"🇿🇦"},KOR:{code:"KOR",name:"Corea del Sur",flag:"🇰🇷"},CZE:{code:"CZE",name:"Chequia",flag:"🇨🇿"},CAN:{code:"CAN",name:"Canadá",flag:"🇨🇦"},BIH:{code:"BIH",name:"Bosnia",flag:"🇧🇦"},QAT:{code:"QAT",name:"Qatar",flag:"🇶🇦"},SUI:{code:"SUI",name:"Suiza",flag:"🇨🇭"},BRA:{code:"BRA",name:"Brasil",flag:"🇧🇷"},MAR:{code:"MAR",name:"Marruecos",flag:"🇲🇦"},HAI:{code:"HAI",name:"Haití",flag:"🇭🇹"},SCO:{code:"SCO",name:"Escocia",flag:"🏴"},USA:{code:"USA",name:"EE.UU.",flag:"🇺🇸"},PAR:{code:"PAR",name:"Paraguay",flag:"🇵🇾"},AUS:{code:"AUS",name:"Australia",flag:"🇦🇺"},TUR:{code:"TUR",name:"Turquía",flag:"🇹🇷"},GER:{code:"GER",name:"Alemania",flag:"🇩🇪"},CUW:{code:"CUW",name:"Curazao",flag:"🇨🇼"},CIV:{code:"CIV",name:"Costa de Marfil",flag:"🇨🇮"},ECU:{code:"ECU",name:"Ecuador",flag:"🇪🇨"},NED:{code:"NED",name:"Países Bajos",flag:"🇳🇱"},JPN:{code:"JPN",name:"Japón",flag:"🇯🇵"},SWE:{code:"SWE",name:"Suecia",flag:"🇸🇪"},TUN:{code:"TUN",name:"Túnez",flag:"🇹🇳"},BEL:{code:"BEL",name:"Bélgica",flag:"🇧🇪"},EGY:{code:"EGY",name:"Egipto",flag:"🇪🇬"},IRN:{code:"IRN",name:"Irán",flag:"🇮🇷"},NZL:{code:"NZL",name:"Nueva Zelanda",flag:"🇳🇿"},ESP:{code:"ESP",name:"España",flag:"🇪🇸"},CPV:{code:"CPV",name:"Cabo Verde",flag:"🇨🇻"},KSA:{code:"KSA",name:"Arabia Saudita",flag:"🇸🇦"},URU:{code:"URU",name:"Uruguay",flag:"🇺🇾"},FRA:{code:"FRA",name:"Francia",flag:"🇫🇷"},SEN:{code:"SEN",name:"Senegal",flag:"🇸🇳"},IRQ:{code:"IRQ",name:"Irak",flag:"🇮🇶"},NOR:{code:"NOR",name:"Noruega",flag:"🇳🇴"},ARG:{code:"ARG",name:"Argentina",flag:"🇦🇷"},ALG:{code:"ALG",name:"Argelia",flag:"🇩🇿"},AUT:{code:"AUT",name:"Austria",flag:"🇦🇹"},JOR:{code:"JOR",name:"Jordania",flag:"🇯🇴"},POR:{code:"POR",name:"Portugal",flag:"🇵🇬"},COD:{code:"COD",name:"Congo DR",flag:"🇨🇩"},UZB:{code:"UZB",name:"Uzbekistán",flag:"🇺🇿"},COL:{code:"COL",name:"Colombia",flag:"🇨🇴"},ENG:{code:"ENG",name:"Inglaterra",flag:"🏴"},CRO:{code:"CRO",name:"Croacia",flag:"🇭🇷"},GHA:{code:"GHA",name:"Ghana",flag:"🇬🇭"},PAN:{code:"PAN",name:"Panamá",flag:"🇵🇦"},
};

const matchList = [
  {id:1,group:"A",home:"MEX",away:"RSA",date:"11 JUN",time:"1:00 PM"},{id:2,group:"A",home:"KOR",away:"CZE",date:"11 JUN",time:"8:00 PM"},{id:3,group:"B",home:"CAN",away:"BIH",date:"12 JUN",time:"1:00 PM"},{id:4,group:"D",home:"USA",away:"PAR",date:"12 JUN",time:"7:00 PM"},{id:5,group:"B",home:"QAT",away:"SUI",date:"13 JUN",time:"1:00 PM"},{id:6,group:"C",home:"BRA",away:"MAR",date:"13 JUN",time:"4:00 PM"},{id:7,group:"C",home:"HAI",away:"SCO",date:"13 JUN",time:"7:00 PM"},{id:8,group:"D",home:"AUS",away:"TUR",date:"13 JUN",time:"10:00 PM"},{id:9,group:"E",home:"GER",away:"CUW",date:"14 JUN",time:"11:00 AM"},{id:10,group:"F",home:"NED",away:"JPN",date:"14 JUN",time:"2:00 PM"},{id:11,group:"E",home:"CIV",away:"ECU",date:"14 JUN",time:"5:00 PM"},{id:12,group:"F",home:"TUN",away:"SWE",date:"14 JUN",time:"8:00 PM"},{id:13,group:"H",home:"ESP",away:"CPV",date:"15 JUN",time:"10:00 AM"},{id:14,group:"G",home:"BEL",away:"EGY",date:"15 JUN",time:"1:00 PM"},{id:15,group:"H",home:"KSA",away:"URU",date:"15 JUN",time:"4:00 PM"},{id:16,group:"G",home:"IRN",away:"NZL",date:"15 JUN",time:"7:00 PM"},{id:17,group:"I",home:"FRA",away:"SEN",date:"16 JUN",time:"1:00 PM"},{id:18,group:"I",home:"IRQ",away:"NOR",date:"16 JUN",time:"4:00 PM"},{id:19,group:"J",home:"ARG",away:"ALG",date:"16 JUN",time:"7:00 PM"},{id:20,group:"J",home:"AUT",away:"JOR",date:"16 JUN",time:"10:00 PM"},{id:21,group:"K",home:"POR",away:"COD",date:"17 JUN",time:"11:00 AM"},{id:22,group:"L",home:"ENG",away:"CRO",date:"17 JUN",time:"2:00 PM"},{id:23,group:"L",home:"GHA",away:"PAN",date:"17 JUN",time:"5:00 PM"},{id:24,group:"K",home:"UZB",away:"COL",date:"17 JUN",time:"8:00 PM"},{id:25,group:"A",home:"CZE",away:"RSA",date:"18 JUN",time:"10:00 AM"},{id:26,group:"B",home:"SUI",away:"BIH",date:"18 JUN",time:"1:00 PM"},{id:27,group:"B",home:"CAN",away:"QAT",date:"18 JUN",time:"4:00 PM"},{id:28,group:"A",home:"MEX",away:"KOR",date:"18 JUN",time:"7:00 PM"},{id:29,group:"D",home:"USA",away:"AUS",date:"19 JUN",time:"1:00 PM"},{id:30,group:"C",home:"SCO",away:"MAR",date:"19 JUN",time:"1:00 PM"},{id:31,group:"C",home:"BRA",away:"HAI",date:"19 JUN",time:"7:00 PM"},{id:32,group:"D",home:"TUR",away:"PAR",date:"19 JUN",time:"10:00 PM"},{id:33,group:"F",home:"NED",away:"SWE",date:"20 JUN",time:"11:00 AM"},{id:34,group:"E",home:"GER",away:"CIV",date:"20 JUN",time:"2:00 PM"},{id:35,group:"E",home:"ECU",away:"CUW",date:"20 JUN",time:"6:00 PM"},{id:36,group:"F",home:"TUN",away:"JPN",date:"20 JUN",time:"10:00 PM"},{id:37,group:"H",home:"ESP",away:"KSA",date:"21 JUN",time:"10:00 AM"},{id:38,group:"G",home:"BEL",away:"IRN",date:"21 JUN",time:"1:00 PM"},{id:39,group:"H",home:"URU",away:"CPV",date:"21 JUN",time:"4:00 PM"},{id:40,group:"G",home:"NZL",away:"EGY",date:"21 JUN",time:"7:00 PM"},{id:41,group:"J",home:"ARG",away:"AUT",date:"22 JUN",time:"11:00 AM"},{id:42,group:"I",home:"FRA",away:"IRQ",date:"22 JUN",time:"3:00 PM"},{id:43,group:"I",home:"NOR",away:"SEN",date:"22 JUN",time:"6:00 PM"},{id:44,group:"J",home:"JOR",away:"ALG",date:"22 JUN",time:"9:00 PM"},{id:45,group:"K",home:"POR",away:"UZB",date:"23 JUN",time:"11:00 AM"},{id:46,group:"L",home:"ENG",away:"GHA",date:"23 JUN",time:"2:00 PM"},{id:47,group:"L",home:"PAN",away:"CRO",date:"23 JUN",time:"5:00 PM"},{id:48,group:"K",home:"COL",away:"COD",date:"23 JUN",time:"8:00 PM"},{id:49,group:"B",home:"SUI",away:"CAN",date:"24 JUN",time:"1:00 PM"},{id:50,group:"B",home:"BIH",away:"QAT",date:"24 JUN",time:"1:00 PM"},{id:51,group:"C",home:"BRA",away:"SCO",date:"24 JUN",time:"4:00 PM"},{id:52,group:"C",home:"MAR",away:"HAI",date:"24 JUN",time:"4:00 PM"},{id:53,group:"A",home:"MEX",away:"CZE",date:"24 JUN",time:"7:00 PM"},{id:54,group:"A",home:"KOR",away:"RSA",date:"24 JUN",time:"7:00 PM"},{id:55,group:"E",home:"ECU",away:"GER",date:"25 JUN",time:"2:00 PM"},{id:56,group:"E",home:"CUW",away:"CIV",date:"25 JUN",time:"2:00 PM"},{id:57,group:"F",home:"TUN",away:"NED",date:"25 JUN",time:"5:00 PM"},{id:58,group:"F",home:"JPN",away:"SWE",date:"25 JUN",time:"5:00 PM"},{id:59,group:"D",home:"USA",away:"TUR",date:"25 JUN",time:"8:00 PM"},{id:60,group:"D",home:"PAR",away:"AUS",date:"25 JUN",time:"8:00 PM"},{id:61,group:"I",home:"NOR",away:"FRA",date:"26 JUN",time:"1:00 PM"},{id:62,group:"I",home:"SEN",away:"IRQ",date:"26 JUN",time:"1:00 PM"},{id:63,group:"H",home:"URU",away:"ESP",date:"26 JUN",time:"6:00 PM"},{id:64,group:"H",home:"CPV",away:"KSA",date:"26 JUN",time:"6:00 PM"},{id:65,group:"G",home:"NZL",away:"BEL",date:"26 JUN",time:"9:00 PM"},{id:66,group:"G",home:"EGY",away:"IRN",date:"26 JUN",time:"9:00 PM"},{id:67,group:"L",home:"PAN",away:"ENG",date:"27 JUN",time:"3:00 PM"},{id:68,group:"L",home:"CRO",away:"GHA",date:"27 JUN",time:"3:00 PM"},{id:69,group:"K",home:"COL",away:"POR",date:"27 JUN",time:"5:30 PM"},{id:70,group:"K",home:"COD",away:"UZB",date:"27 JUN",time:"5:30 PM"},{id:71,group:"J",home:"ARG",away:"JOR",date:"27 JUN",time:"8:00 PM"},{id:72,group:"J",home:"ALG",away:"AUT",date:"27 JUN",time:"8:00 PM"},
];

const SELECCIONES_MUNDIAL = [
  "México","Sudáfrica","Corea del Sur","Chequia","Canadá","Bosnia","Qatar","Suiza",
  "Brasil","Marruecos","Haití","Escocia","EE.UU.","Paraguay","Australia","Turquía",
  "Alemania","Curazao","Costa de Marfil","Ecuador","Países Bajos","Japón","Suecia",
  "Túnez","Bélgica","Egipto","Irán","Nueva Zelanda","España","Cabo Verde",
  "Arabia Saudita","Uruguay","Francia","Senegal","Irak","Noruega","Argentina",
  "Argelia","Austria","Jordania","Portugal","Congo DR","Uzbekistán","Colombia",
  "Inglaterra","Croacia","Ghana","Panamá"
];

const TOP_JUGADORES = [
  "Lionel Messi","Cristiano Ronaldo","Kylian Mbappé","Erling Haaland","Vinicius Jr.",
  "Rodri","Lamine Yamal","Jude Bellingham","Phil Foden","Bukayo Saka",
  "Pedri","Gavi","Federico Valverde","Toni Kroos","Kevin De Bruyne",
  "Mohamed Salah","Harry Kane","Robert Lewandowski","Antoine Griezmann","Romelu Lukaku",
  "Riyad Mahrez","Son Heung-min","Dusan Vlahovic","Rafael Leão","Khvicha Kvaratskhelia",
  "Jamal Musiala","Florian Wirtz","Marcus Rashford","Bruno Fernandes","Bernardo Silva",
  "Ruben Dias","Virgil van Dijk","Achraf Hakimi","Theo Hernández","Leroy Sané",
  "Hirving Lozano","Guillermo Ochoa","Raúl Jiménez","Edson Álvarez","Santiago Giménez",
  "Christian Pulisic","Tyler Adams","Weston McKennie","Ricardo Pepi",
  "Enner Valencia","Moisés Caicedo","Jeremy Sarmiento","Gonzalo Plata","Piero Hincapié",
  "Lautaro Martínez","Julián Álvarez","Rodrigo De Paul","Alexis Mac Allister","Enzo Fernández",
  "Neymar Jr.","Richarlison","Gabriel Martinelli","Endrick","Raphinha",
  "Sofyan Amrabat","Hakim Ziyech","Youssef En-Nesyri",
  "Sadio Mané","Ismaïla Sarr","Boulaye Dia","Nicolas Jackson",
  "Kaoru Mitoma","Wataru Endo","Ao Tanaka","Daichi Kamada",
  "Cody Gakpo","Memphis Depay","Xavi Simons","Tijjani Reijnders",
  "Ivan Toney","Jordan Pickford","Declan Rice","Trent Alexander-Arnold","Kobbie Mainoo",
  "Álvaro Morata","Mikel Merino","Martín Zubimendi",
  "Ousmane Dembélé","Aurélien Tchouaméni","Eduardo Camavinga","Marcus Thuram",
  "Granit Xhaka","Breel Embolo","Manuel Akanji","Yann Sommer",
  "Luka Modric","Ivan Perisic",
  "Lee Kang-in","Cho Gue-sung","Kim Min-jae","Hwang Hee-chan",
];

// ─── PUNTOS ───────────────────────────────────────────────────────────────────
function calcPoints(pred, result) {
  if (!pred || pred.home === "" || pred.away === "") return 0;
  const h = Number(pred.home), a = Number(pred.away);
  if (h === result.home && a === result.away) return 5;
  const pd = h - a, rd = result.home - result.away;
  const pw = pd === 0 ? "d" : pd > 0 ? "h" : "a";
  const rw = rd === 0 ? "d" : rd > 0 ? "h" : "a";
  let pts = 0;
  if (pw === rw) pts += 3;
  if (pd === rd && pts < 5) pts += 1;
  return pts;
}

// ─── COMPONENTES BASE ─────────────────────────────────────────────────────────
function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={lbl}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={inp} />
    </div>
  );
}

function Divider({ label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, margin:"16px 0 14px" }}>
      <div style={{ flex:1, height:1, background:G.border }}></div>
      <span style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:1, color:G.green, whiteSpace:"nowrap" }}>{label}</span>
      <div style={{ flex:1, height:1, background:G.border }}></div>
    </div>
  );
}

function ErrorBox({ msg }) {
  return (
    <div style={{ background:"rgba(255,80,80,.1)", border:"1px solid rgba(255,80,80,.3)", borderRadius:8, padding:"10px 14px", fontSize:13, color:"#ff5050", marginBottom:14 }}>
      ⚠️ {msg}
    </div>
  );
}

// ─── BANNER ───────────────────────────────────────────────────────────────────
function BannerDisplay({ slot, vertical=false, height=null, maxHeight=null, stretch=false }) {
  const [banner, setBanner] = React.useState(null);
  React.useEffect(() => {
    supabase.from("banners").select("*").eq("orden", slot).eq("activo", true).single().then(({data}) => {
      if (data?.imagen_url) setBanner(data);
    });
  }, [slot]);
  if (!banner) return null;
  const imgHeight = height || (vertical ? "400px" : "auto");
  const imgMaxHeight = maxHeight || (vertical ? "100vh" : "200px");
  return (
    <div style={{width:"100%",height:stretch?"100%":undefined,marginBottom:stretch?0:16,borderRadius:12,overflow:"hidden",border:`1px solid ${G.border}`}}>
      <img src={banner.imagen_url} alt={banner.nombre} style={{width:"100%",height:stretch?"100%":imgHeight,maxHeight:stretch?"none":imgMaxHeight,objectFit:"cover",display:"block"}}/>
    </div>
  );
}

// ─── BANNERS ADMIN ────────────────────────────────────────────────────────────
function BannersAdmin() {
  const [banners, setBanners] = React.useState([]);
  const [uploading, setUploading] = React.useState(null);

  const loadBanners = React.useCallback(async () => {
    const { data } = await supabase.from("banners").select("*").order("orden");
    if (data) setBanners(data);
  }, []);

  React.useEffect(() => { loadBanners(); }, [loadBanners]);

  const uploadBanner = async (bannerId, file) => {
    if (!file) return;
    setUploading(bannerId);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `banner_${bannerId}_${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("banners").upload(fileName, file, { upsert: true, contentType: file.type });
      if (uploadError) { alert("Error al subir imagen: " + uploadError.message); setUploading(null); return; }
      const { data: urlData } = supabase.storage.from("banners").getPublicUrl(fileName);
      const { error: updateError } = await supabase.from("banners").update({ imagen_url: urlData.publicUrl, updated_at: new Date().toISOString() }).eq("id", bannerId);
      if (updateError) { alert("Error al guardar URL: " + updateError.message); setUploading(null); return; }
      await loadBanners();
    } catch(e) { alert("Error inesperado: " + e.message); }
    finally { setUploading(null); }
  };

  const toggleBanner = async (bannerId, activo) => {
    await supabase.from("banners").update({ activo: !activo }).eq("id", bannerId);
    await loadBanners();
  };

  const removeBanner = async (bannerId) => {
    await supabase.from("banners").update({ imagen_url: null }).eq("id", bannerId);
    await loadBanners();
  };

  return (
    <div>
      <div style={{...card,padding:16,borderRadius:12,marginBottom:20}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:G.green,textTransform:"uppercase",marginBottom:4}}>🖼️ Gestión de banners</div>
        <div style={{fontSize:13,color:G.muted}}>Sube imágenes para cada sección. Tamaño recomendado: <strong style={{color:"#fff"}}>1200 x 400 px</strong>. Formatos: JPG, PNG, WebP.</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:16}} className="admin-banners-grid">
        {banners.map(b=>(
          <div key={b.id} style={{...card,padding:20,borderRadius:12}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:"#fff",textTransform:"uppercase"}}>{b.nombre}</div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <span style={{fontSize:11,padding:"3px 8px",borderRadius:100,border:"1px solid",borderColor:b.activo?"rgba(26,158,63,.4)":"rgba(255,80,80,.4)",background:b.activo?"rgba(26,158,63,.1)":"rgba(255,80,80,.1)",color:b.activo?G.green:"#ff5050",fontWeight:700}}>{b.activo?"Activo":"Inactivo"}</span>
              </div>
            </div>
            {b.imagen_url ? (
              <img src={b.imagen_url} alt={b.nombre} style={{width:"100%",height:120,objectFit:"cover",borderRadius:8,border:`1px solid ${G.border}`,marginBottom:12}}/>
            ) : (
              <div style={{width:"100%",height:120,background:G.card2,borderRadius:8,border:`1px dashed ${G.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:G.muted,marginBottom:12}}>Sin imagen</div>
            )}
            <div style={{display:"flex",gap:8}}>
              <label style={{flex:1,background:"rgba(26,158,63,.1)",border:"1px solid rgba(26,158,63,.3)",borderRadius:8,padding:"8px",fontSize:12,fontWeight:700,color:G.green,cursor:"pointer",textAlign:"center"}}>
                {uploading===b.id?"Subiendo...":"📤 Subir imagen"}
                <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>uploadBanner(b.id,e.target.files[0])} disabled={uploading===b.id}/>
              </label>
              <button onClick={()=>toggleBanner(b.id,b.activo)} style={{background:"rgba(255,180,0,.1)",border:"1px solid rgba(255,180,0,.3)",borderRadius:8,padding:"8px 12px",fontSize:12,fontWeight:700,color:"#ffb400",cursor:"pointer"}}>{b.activo?"Ocultar":"Mostrar"}</button>
              {b.imagen_url && <button onClick={()=>removeBanner(b.id)} style={{background:"rgba(255,80,80,.1)",border:"1px solid rgba(255,80,80,.3)",borderRadius:8,padding:"8px 12px",fontSize:12,color:"#ff5050",cursor:"pointer"}}>🗑️</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ACCESS LOG ───────────────────────────────────────────────────────────────
function AccessLogView() {
  const [logs, setLogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [filterEvento, setFilterEvento] = React.useState("all");

  React.useEffect(() => {
    supabase.from("access_log").select("*").order("timestamp", { ascending: false }).limit(200).then(({ data }) => {
      if (data) setLogs(data);
      setLoading(false);
    });
  }, []);

  const toCR = (ts) => {
    if (!ts) return "—";
    const d = new Date(ts);
    const cr = new Date(d.getTime() - 6*60*60*1000);
    const pad = n => String(n).padStart(2,"0");
    return `${pad(cr.getUTCDate())}/${pad(cr.getUTCMonth()+1)}/${cr.getUTCFullYear()} ${pad(cr.getUTCHours())}:${pad(cr.getUTCMinutes())}`;
  };

  const colorEvento = (e) => {
    if (e === "login_exitoso") return { color:G.green, bg:"rgba(26,158,63,.1)", border:"rgba(26,158,63,.3)" };
    if (e === "login_fallido") return { color:"#ff5050", bg:"rgba(255,80,80,.1)", border:"rgba(255,80,80,.3)" };
    if (e === "registro") return { color:"#ffb400", bg:"rgba(255,180,0,.1)", border:"rgba(255,180,0,.3)" };
    if (e === "login_bloqueado") return { color:"#ff5050", bg:"rgba(255,80,80,.2)", border:"rgba(255,80,80,.5)" };
    return { color:G.gray, bg:"rgba(255,255,255,.05)", border:G.border };
  };

  const ipCounts = {};
  logs.forEach(l => { if (l.ip) ipCounts[l.ip] = (ipCounts[l.ip]||0)+1; });
  const suspiciousIPs = new Set(Object.entries(ipCounts).filter(([,c])=>c>=5).map(([ip])=>ip));

  const filtered = filterEvento === "all" ? logs : logs.filter(l => l.evento === filterEvento);

  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
        {[["all","Todos"],["login_exitoso","Exitosos"],["login_fallido","Fallidos"],["registro","Registros"],["login_bloqueado","Bloqueados"]].map(([v,l])=>(
          <button key={v} onClick={()=>setFilterEvento(v)} style={{padding:"7px 14px",borderRadius:100,border:`1px solid ${filterEvento===v?G.green:G.border}`,background:filterEvento===v?G.green:"transparent",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer"}}>{l}</button>
        ))}
      </div>
      {loading ? (
        <div style={{...card,padding:40,textAlign:"center",color:G.muted,borderRadius:12}}>Cargando logs...</div>
      ) : (
        <div style={{overflowX:"auto"}} className="admin-pred-table">
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:700}}>
            <thead>
              <tr style={{background:G.card2}}>
                {["Fecha (CR)","Email","Evento","IP","User Agent"].map(h=>(
                  <th key={h} style={{padding:"10px 12px",textAlign:"left",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:G.muted}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((log,i) => {
                const c = colorEvento(log.evento);
                const suspicious = suspiciousIPs.has(log.ip);
                return (
                  <tr key={i} style={{borderBottom:`1px solid ${G.border}`,background:suspicious&&log.evento==="login_fallido"?"rgba(255,80,80,.04)":"transparent"}}>
                    <td style={{padding:"10px 12px",fontSize:12,color:G.gray,whiteSpace:"nowrap"}}>{toCR(log.timestamp)}</td>
                    <td style={{padding:"10px 12px",fontSize:13}}>{log.email||"—"}</td>
                    <td style={{padding:"10px 12px"}}>
                      <span style={{fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:100,border:`1px solid ${c.border}`,background:c.bg,color:c.color,whiteSpace:"nowrap"}}>{log.evento}</span>
                    </td>
                    <td style={{padding:"10px 12px",fontSize:12,color:suspicious?"#ff5050":G.gray,fontWeight:suspicious?700:400}}>{log.ip||"—"}{suspicious&&" ⚠️"}</td>
                    <td style={{padding:"10px 12px",fontSize:11,color:G.muted,maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{log.user_agent||"—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <div style={{textAlign:"center",padding:"40px 0",color:G.muted}}>Sin registros.</div>}
        </div>
      )}
    </div>
  );
}

// ─── BONIFICACIONES DISPLAY ───────────────────────────────────────────────────
function BonificacionesDisplay({ email }) {
  const [bonos, setBonos] = React.useState(null);
  React.useEffect(() => {
    supabase.from("usuarios").select("bono_campeon,bono_goleador,bono_mvp,bonos_completado").eq("email", email).single()
      .then(({ data }) => { if (data) setBonos(data); });
  }, [email]);
  if (!bonos) return <div style={{fontSize:13,color:G.muted}}>Cargando...</div>;
  if (!bonos.bonos_completado) return <div style={{fontSize:13,color:"#ffb400"}}>⚠️ Aún no completadas.</div>;
  return (
    <div style={{display:"grid",gap:10}}>
      {[["🏆 Campeón","20 pts",bonos.bono_campeon],["⚽ Goleador","10 pts",bonos.bono_goleador],["🌟 MVP","10 pts",bonos.bono_mvp]].map(([label,pts,valor])=>(
        <div key={label} style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:8,padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{label}</div>
            <div style={{fontSize:11,color:G.muted,marginTop:2}}>{pts}</div>
          </div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:15,fontWeight:700,color:G.green,textAlign:"right"}}>{valor||"—"}</div>
        </div>
      ))}
    </div>
  );
}

// ─── COMPONENT PRINCIPAL ──────────────────────────────────────────────────────
export default function App() {
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotStatus, setForgotStatus] = useState("");
  const [isSendingForgot, setIsSendingForgot] = useState(false);
  const [cedula, setCedula] = useState("");
  const [cedulaStatus, setCedulaStatus] = useState(""); // "loading" | "ok" | "error"
  const [firstName, setFirstName] = useState("");
  const [lastName1, setLastName1] = useState("");
  const [lastName2, setLastName2] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aceptoTerminos, setAceptoTerminos] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [view, setView] = useState("predictions");
  const [showWelcome, setShowWelcome] = useState(true);
  const [showBonos, setShowBonos] = useState(false);
  const [bonosCampeon, setBonosCampeon] = useState("");
  const [bonosGoleador, setBonosGoleador] = useState("");
  const [bonosMVP, setBonosMVP] = useState("");
  const [bonosGoleadorOtro, setBonosGoleadorOtro] = useState("");
  const [bonosMVPOtro, setBonosMVPOtro] = useState("");
  const [predictions, setPredictions] = useState({});
  const [predictionStatus, setPredictionStatus] = useState("");
  const [matchFilter, setMatchFilter] = useState("all");
  const [adminResults, setAdminResults] = useState({});
  const [liveStandings, setLiveStandings] = useState([]);

  // Cargar resultados al montar
  useEffect(() => {
    supabase.from("resultados").select("*").then(({ data }) => {
      if (data) {
        const map = {};
        data.forEach(r => { map[r.match_id] = { home: r.home, away: r.away, locked: r.locked }; });
        setAdminResults(map);
      }
    });
  }, []);

  const getMatchStatus = (date, time) => {
    const months = { "JUN": 5 };
    const [day, monthStr] = date.split(" ");
    const [hourStr, minuteStr] = time.replace(" PM","").replace(" AM","").split(":");
    let hour = parseInt(hourStr);
    const isPM = time.includes("PM");
    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;
    const matchDate = new Date(Date.UTC(2026, months[monthStr], parseInt(day), hour + 6, parseInt(minuteStr)));
    const now = new Date();
    const diffMs = matchDate - now;
    const diffHours = diffMs / (1000 * 60 * 60);
    if (diffMs <= 0) return "Cerrado";
    if (diffHours <= 2) return "Cierra pronto";
    return "Abierto";
  };

  const matches = matchList.map((m) => ({
    ...m, homeTeam:teams[m.home], awayTeam:teams[m.away],
    status: getMatchStatus(m.date, m.time),
    result: adminResults[m.id] && adminResults[m.id].home !== "" && adminResults[m.id].away !== ""
      ? { home:Number(adminResults[m.id].home), away:Number(adminResults[m.id].away) } : null,
  }));

  // Standings en landing (sin sesión)
  useEffect(() => {
    if (user) return;
    const load = async () => {
      const { data: usuarios } = await supabase.from("usuarios").select("email, nombre, primer_apellido");
      const { data: preds } = await supabase.from("predicciones").select("*");
      const { data: resultados } = await supabase.from("resultados").select("*");
      if (!usuarios || !preds) return;
      const resMap = {};
      (resultados||[]).forEach(r => { resMap[r.match_id] = { home:r.home, away:r.away }; });
      const standing = usuarios.map(u => {
        const userPreds = preds.filter(p => p.user_email === u.email);
        const pts = userPreds.reduce((total, p) => {
          const res = resMap[p.match_id];
          if (!res) return total;
          return total + calcPoints(p, res);
        }, 0);
        const name = u.nombre && u.primer_apellido ? `${u.nombre} ${u.primer_apellido}` : "Colaborador";
        return { name, pts, preds: userPreds.length };
      }).sort((a,b) => b.pts - a.pts || b.preds - a.preds).slice(0, 10);
      setLiveStandings(standing);
    };
    load();
  }, [user]);

  // Consulta cédula al TSE — se dispara automático al completar 9 dígitos
  const buscarCedula = async (num) => {
    const clean = num.replace(/\D/g, "");
    if (clean.length < 9) {
      setCedulaStatus(""); setFirstName(""); setLastName1(""); setLastName2(""); return;
    }
    setCedulaStatus("loading");
    try {
      const res = await fetch(`https://apis.gometa.org/cedulas/${clean}`);
      if (!res.ok) throw new Error("No encontrado");
      const data = await res.json();
      // La API de gometa devuelve: { nombre, apellido1, apellido2 }
      // "nombre" en esa API es solo el nombre, no el nombre completo
      if (data && (data.nombre || data.apellido1)) {
        setFirstName(data.nombre || "");
        setLastName1(data.apellido1 || "");
        setLastName2(data.apellido2 || "");
        setCedulaStatus("ok");
      } else {
        throw new Error("Sin datos");
      }
    } catch {
      setCedulaStatus("error");
      setFirstName(""); setLastName1(""); setLastName2("");
    }
  };

  const handleCedulaChange = (val) => {
    setCedula(val);
    const clean = val.replace(/\D/g, "");
    if (clean.length >= 9) {
      buscarCedula(val); // disparo automático
    } else {
      setCedulaStatus(""); setFirstName(""); setLastName1(""); setLastName2("");
    }
  };

  // Login
  const handleLogin = async () => {
    setError("");
    if (!email.trim()||!password.trim()) { setError("Completa todos los campos."); return; }
    setIsLoading(true);
    try {
      const { data:u, error:e } = await supabase.from("usuarios").select("*").eq("email",email.trim().toLowerCase()).eq("password",password.trim()).maybeSingle();
      if (e) throw new Error(e.message);
      if (!u) {
        try { await supabase.from("access_log").insert({ email: email.trim().toLowerCase(), evento: "login_fallido", timestamp: new Date().toISOString() }); } catch(_){}
        setError("Correo o contraseña incorrectos."); setIsLoading(false); return;
      }
      if (u.bloqueado) {
        try { await supabase.from("access_log").insert({ email: u.email, evento: "login_bloqueado", timestamp: new Date().toISOString() }); } catch(_){}
        setError("Tu cuenta ha sido suspendida. Contacta a MFA para más información."); setIsLoading(false); return;
      }
      const ipResp = await fetch("https://api.ipify.org?format=json").catch(()=>({json:()=>({ip:"desconocida"})}));
      const { ip } = await ipResp.json().catch(()=>({ip:"desconocida"}));
      try { await supabase.from("access_log").insert({ email: u.email, evento: "login_exitoso", ip, user_agent: navigator.userAgent, timestamp: new Date().toISOString() }); } catch(_){}
      setUser({ email:u.email, firstName:u.nombre, lastName1:u.primer_apellido, lastName2:u.segundo_apellido, esAdmin:u.es_admin||false });
    } catch(err) { setError(err.message||"Error al iniciar sesión."); }
    finally { setIsLoading(false); }
  };

  // Registro
  const handleRegister = async () => {
    setError("");
    if (!cedula.trim()) { setError("Ingresa tu número de cédula."); return; }
    if (cedulaStatus !== "ok") { setError("Esperá a que se verifique la cédula."); return; }
    if (!email.trim()||!password.trim()||!firstName.trim()||!lastName1.trim()) {
      setError("Completa todos los campos antes de crear el usuario."); return;
    }
    if (!departamento) { setError("Seleccioná tu departamento."); return; }
    if (password.trim().length < 6) { setError("La contraseña debe tener al menos 6 caracteres."); return; }
    setIsLoading(true);
    try {
      const { data:ex } = await supabase.from("usuarios").select("id").eq("email",email.trim().toLowerCase()).maybeSingle();
      if (ex) { setError("Este correo ya está registrado."); setIsLoading(false); return; }
      const { error:ie } = await supabase.from("usuarios").insert({
        email:email.trim().toLowerCase(), password:password.trim(),
        nombre:firstName.trim(), primer_apellido:lastName1.trim(), segundo_apellido:lastName2.trim(),
        nombre_comercial:`${firstName.trim()} ${lastName1.trim()}`,
        cedula: cedula.replace(/\D/g,""),
        departamento,
      });
      if (ie) throw new Error(ie.message);
      const ipR = await fetch("https://api.ipify.org?format=json").catch(()=>({json:()=>({ip:"desconocida"})}));
      const { ip: ipReg } = await ipR.json().catch(()=>({ip:"desconocida"}));
      try { await supabase.from("access_log").insert({ email: email.trim().toLowerCase(), evento: "registro", ip: ipReg, user_agent: navigator.userAgent, timestamp: new Date().toISOString() }); } catch(_){}
      setUser({ email:email.trim().toLowerCase(), firstName:firstName.trim(), lastName1:lastName1.trim(), lastName2:lastName2.trim(), esAdmin:false });
    } catch(err) { setError(err.message||"Error al crear el usuario."); }
    finally { setIsLoading(false); }
  };

  // Recuperar contraseña
  const handleForgotPassword = async () => {
    setForgotStatus("");
    if (!forgotEmail.trim() || !forgotEmail.includes("@")) { setForgotStatus("error:Ingresa un correo electrónico válido."); return; }
    setIsSendingForgot(true);
    try {
      const { data: u } = await supabase.from("usuarios").select("password, nombre").eq("email", forgotEmail.trim().toLowerCase()).maybeSingle();
      if (!u) { setForgotStatus("error:No encontramos una cuenta con ese correo."); setIsSendingForgot(false); return; }
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_suphdhh", template_id: "template_mwt2rhs", user_id: "jX4XRELE75nhLURIb",
          template_params: { to_email: forgotEmail.trim().toLowerCase(), to_name: u.nombre || "Colaborador", password: u.password }
        })
      });
      if (response.ok) { setForgotStatus("ok:Correo enviado. Revisa tu bandeja de entrada."); }
      else { setForgotStatus("error:No se pudo enviar el correo. Intenta nuevamente."); }
    } catch { setForgotStatus("error:Error al enviar el correo. Intenta nuevamente."); }
    finally { setIsSendingForgot(false); }
  };

  // Bonos
  const saveBonos = async () => {
    const campeon = bonosCampeon.trim();
    const goleador = bonosGoleador === "Otro" ? bonosGoleadorOtro.trim() : bonosGoleador;
    const mvp = bonosMVP === "Otro" ? bonosMVPOtro.trim() : bonosMVP;
    if (!campeon || !goleador || !mvp) { alert("Por favor completa los tres campos de bonificación."); return; }
    const { error } = await supabase.from("usuarios").update({
      bono_campeon: campeon, bono_goleador: goleador, bono_mvp: mvp, bonos_completado: true
    }).eq("email", user.email);
    if (error) { alert("Error al guardar bonificaciones: " + error.message); return; }
    setShowBonos(false);
  };

  // Predicciones
  const updatePrediction = async (matchId, team, value) => {
    const match = matchList.find(m => m.id === matchId);
    if (!match) return;
    const status = getMatchStatus(match.date, match.time);
    if (status === "Cerrado") return;
    const v = value.replace(/[^0-9]/g,"").slice(0,2);
    const updated = { ...predictions, [matchId]: { ...(predictions[matchId]||{}), [team]: v } };
    setPredictions(updated);
    const pred = updated[matchId];
    if (pred.home !== undefined && pred.home !== "" && pred.away !== undefined && pred.away !== "") {
      const statusNow = getMatchStatus(match.date, match.time);
      if (statusNow === "Cerrado") { setPredictionStatus("closed"); setTimeout(()=>setPredictionStatus(""),3000); return; }
      await supabase.from("predicciones").upsert({ user_email:user.email, match_id:matchId, home:pred.home, away:pred.away, updated_at:new Date().toISOString() }, { onConflict:"user_email,match_id" });
      setPredictionStatus("saved"); setTimeout(()=>setPredictionStatus(""),2000);
    }
  };

  const savePredictions = async () => {
    const now = new Date();
    const entries = Object.entries(predictions)
      .filter(([matchId, p]) => {
        if (p.home === undefined || p.home === "" || p.away === undefined || p.away === "") return false;
        const match = matchList.find(m => m.id === Number(matchId));
        if (!match) return false;
        return getMatchStatus(match.date, match.time) !== "Cerrado";
      })
      .map(([matchId, p]) => ({ user_email:user.email, match_id:Number(matchId), home:p.home, away:p.away, updated_at:now.toISOString() }));
    if (entries.length > 0) await supabase.from("predicciones").upsert(entries, { onConflict:"user_email,match_id" });
    setPredictionStatus("saved"); setTimeout(()=>setPredictionStatus(""),2000);
  };

  // Resultados (admin)
  const updateResult = (matchId, team, value) => {
    if (adminResults[matchId]?.locked) return;
    const clean = value.replace(/[^0-9]/g,"").slice(0,2);
    setAdminResults(c=>({...c,[matchId]:{...c[matchId],[team]:clean}}));
  };
  const publishResult = async (matchId) => {
    if (!isAdmin(user)) return;
    const r = adminResults[matchId];
    if (!r || r.home === "" || r.away === "" || r.home === undefined || r.away === undefined) return;
    const match = matchList.find(m => m.id === matchId);
    if (match && getMatchStatus(match.date, match.time) !== "Cerrado") { alert("⚠️ No se puede publicar el resultado antes del cierre del partido."); return; }
    await supabase.from("resultados").upsert({ match_id:matchId, home:Number(r.home), away:Number(r.away), locked:true, updated_at:new Date().toISOString() }, { onConflict:"match_id" });
    setAdminResults(c=>({...c,[matchId]:{...c[matchId],locked:true}}));
  };
  const clearResult = async (matchId) => {
    await supabase.from("resultados").delete().eq("match_id", matchId);
    setAdminResults(c=>{const u={...c};delete u[matchId];return u;});
  };

  // Cargar bonos y predicciones al iniciar sesión
  useEffect(() => {
    if (!user) return;
    supabase.from("usuarios").select("bono_campeon,bono_goleador,bono_mvp,bonos_completado").eq("email", user.email).single().then(({ data }) => {
      if (data) {
        if (data.bono_campeon) setBonosCampeon(data.bono_campeon);
        if (data.bono_goleador) setBonosGoleador(data.bono_goleador);
        if (data.bono_mvp) setBonosMVP(data.bono_mvp);
        if (!data.bonos_completado) setShowBonos(true);
      } else { setShowBonos(true); }
    });
  }, [user]);

  useEffect(() => {
    if (!user) return;
    supabase.from("predicciones").select("*").eq("user_email", user.email).then(({ data }) => {
      if (data) {
        const map = {};
        data.forEach(p => { map[p.match_id] = { home: p.home, away: p.away }; });
        setPredictions(map);
      }
    });
  }, [user]);

  // ─── PANTALLA: FORGOT PASSWORD ──────────────────────────────────────────────
  if (!user && authMode === "forgot") {
    return (
      <div style={{background:G.bg,minHeight:"100vh",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <style>{GLOBAL_CSS}</style>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.4}} style={{width:"100%",maxWidth:420,padding:"0 20px"}}>
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={{width:64,height:64,background:"rgba(26,158,63,.1)",border:`2px solid ${G.green}`,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:28}}>🔑</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:26,fontWeight:900,letterSpacing:1,textTransform:"uppercase",color:"#fff"}}>¿Olvidaste tu contraseña?</div>
            <div style={{fontSize:14,color:G.muted,marginTop:8}}>Ingresa tu correo y te enviaremos tu contraseña.</div>
          </div>
          <div style={{...card,padding:28,borderRadius:20}}>
            <Field label="Correo electrónico" value={forgotEmail} onChange={setForgotEmail} placeholder="tu@correo.com" type="email"/>
            {forgotStatus && (
              <div style={{borderRadius:8,padding:"10px 14px",fontSize:13,marginBottom:14,
                background:forgotStatus.startsWith("ok")?"rgba(26,158,63,.1)":"rgba(255,80,80,.1)",
                border:`1px solid ${forgotStatus.startsWith("ok")?"rgba(26,158,63,.3)":"rgba(255,80,80,.3)"}`,
                color:forgotStatus.startsWith("ok")?G.green:"#ff5050"
              }}>
                {forgotStatus.startsWith("ok")?"✅":"⚠️"} {forgotStatus.split(":")[1]}
              </div>
            )}
            <button onClick={handleForgotPassword} disabled={isSendingForgot} style={{...greenBtn,opacity:isSendingForgot?.7:1}}>{isSendingForgot?"Enviando...":"Enviar contraseña"}</button>
            <button onClick={()=>{setAuthMode("login");setForgotStatus("");setForgotEmail("");}} style={{width:"100%",background:"none",border:"none",color:G.gray,fontSize:13,cursor:"pointer",marginTop:12,textDecoration:"underline"}}>← Volver al inicio de sesión</button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── PANTALLA: LOGIN / REGISTRO ─────────────────────────────────────────────
  if (!user) {
    return (
      <div style={{background:G.bg,minHeight:"100vh",color:"#fff"}}>
        <style>{GLOBAL_CSS}</style>
        <div style={{maxWidth:1400,margin:"0 auto",padding:"24px 20px"}} className="main-padding">
          {/* Header */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingBottom:28}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:46,height:46,background:G.green,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:"#fff"}}>M</div>
              <div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:24,fontWeight:900,letterSpacing:2,lineHeight:1}}>MFA</div>
                <div style={{fontSize:10,color:G.gray,letterSpacing:1,textTransform:"uppercase"}}>Mayoreo Ferretería y Acabados</div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8,background:G.card,border:`1px solid ${G.border}`,borderRadius:100,padding:"8px 16px"}} className="header-pill">
              <div style={{width:8,height:8,background:G.green,borderRadius:"50%",animation:"pulse 2s infinite"}}></div>
              <span style={{fontSize:12,color:G.gray}}>Quiniela Colaboradores · Mundial 2026</span>
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"200px 1fr 390px",gap:16,alignItems:"stretch"}} className="landing-grid">
            {/* Banner lateral izquierdo */}
            <div style={{minHeight:"100%"}} className="banner-lateral"><BannerDisplay slot={2} stretch={true}/></div>

            {/* Centro */}
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.5}}>
              <BannerDisplay slot={1}/>
              {/* Badge de colaboradores */}
              <div style={{background:"rgba(26,158,63,.08)",border:"1px solid rgba(26,158,63,.25)",borderRadius:12,padding:"14px 20px",marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontSize:24}}>👷</span>
                <div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:17,fontWeight:700,color:G.green}}>Quiniela MFA · Colaboradores Internos</div>
                  <div style={{fontSize:12,color:G.muted}}>Exclusiva para colaboradores de Mayoreo Ferretería y Acabados y El Colono.</div>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}} className="landing-info-grid">
                {/* Top 10 */}
                <div style={{...card,padding:16}}>
                  <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:G.gray,marginBottom:12}}>🏅 Top 10 colaboradores</div>
                  {liveStandings.length === 0 ? (
                    <div style={{fontSize:13,color:G.muted,textAlign:"center",padding:"16px 0"}}>Aún no hay participantes.</div>
                  ) : liveStandings.map((p,i)=>(
                    <div key={p.name+i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:i<liveStandings.length-1?`1px solid ${G.border}`:"none"}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900,color:i<3?G.green:G.muted,width:22}}>{i+1}</span>
                        <div style={{width:28,height:28,borderRadius:"50%",background:G.card2,border:`1px solid ${G.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:G.gray}}>{p.name[0]}</div>
                        <span style={{fontSize:13}}>{p.name}</span>
                      </div>
                      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:15,fontWeight:700,color:G.green}}>{p.pts} pts</span>
                    </div>
                  ))}
                </div>
                {/* Próximos partidos */}
                <div style={{...card,padding:16}}>
                  <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:G.gray,marginBottom:12}}>📅 Próximos partidos</div>
                  {matches.slice(0,4).map(m=>(
                    <div key={m.id} style={{display:"grid",gridTemplateColumns:"1fr auto 1fr auto",gap:8,alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${G.border}`}}>
                      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700}}>{m.homeTeam.flag} {m.home}</span>
                      <span style={{fontSize:10,fontWeight:700,color:G.green,background:"rgba(26,158,63,.15)",padding:"2px 5px",borderRadius:4}}>VS</span>
                      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700}}>{m.away} {m.awayTeam.flag}</span>
                      <div style={{textAlign:"right",fontSize:9,color:G.muted,lineHeight:1.4}}>{m.date}<br/>{m.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Formulario login/registro */}
            <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{duration:.5,delay:.1}}>
              <div style={{...card,padding:28,borderRadius:20}}>
                <div style={{textAlign:"center",marginBottom:24}}>
                  <div style={{width:64,height:64,background:"rgba(26,158,63,.1)",border:`2px solid ${G.green}`,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:28}}>🏆</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>Ingresa a la quiniela</div>
                  <div style={{fontSize:13,color:G.muted,marginTop:4}}>Solo colaboradores MFA · El Colono</div>
                </div>

                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:22}}>
                  {[["login","Iniciar sesión"],["register","Crear usuario"]].map(([mode,label])=>(
                    <button key={mode} onClick={()=>{setAuthMode(mode);setError("");}} style={{padding:"12px",borderRadius:8,fontFamily:"'Barlow Condensed',sans-serif",fontSize:15,fontWeight:700,letterSpacing:1,textTransform:"uppercase",cursor:"pointer",border:`2px solid ${G.green}`,color:"#fff",background:authMode===mode?G.green:G.greenDim}}>{label}</button>
                  ))}
                </div>

                {authMode === "login" ? (
                  <form onSubmit={e=>{e.preventDefault();handleLogin();}}>
                    <Field label="Correo electrónico" value={email} onChange={setEmail} placeholder="tu@correo.com" type="email"/>
                    <Field label="Contraseña" value={password} onChange={setPassword} placeholder="Tu contraseña" type="password"/>
                    {error && <ErrorBox msg={error}/>}
                    <button type="submit" disabled={isLoading} style={{...greenBtn,opacity:isLoading?.7:1,marginTop:8}}>{isLoading?"Verificando...":"Ingresar"}</button>
                    <button type="button" onClick={()=>setAuthMode("forgot")} style={{width:"100%",background:"none",border:"none",color:G.green,fontSize:13,cursor:"pointer",marginTop:10,textDecoration:"underline"}}>¿Olvidé mi contraseña?</button>
                  </form>
                ) : (
                  <form onSubmit={e=>{e.preventDefault();handleRegister();}}>
                    <Divider label="Verificación de identidad"/>

                    {/* Cédula — disparo automático */}
                    <div style={{marginBottom:14}}>
                      <label style={lbl}>Número de cédula</label>
                      <div style={{position:"relative"}}>
                        <input
                          value={cedula}
                          onChange={e=>handleCedulaChange(e.target.value)}
                          placeholder="Ej: 123456789"
                          inputMode="numeric"
                          maxLength={12}
                          style={{...inp, paddingRight:36}}
                        />
                        {cedulaStatus==="loading" && (
                          <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:14,color:G.muted}}>⏳</span>
                        )}
                        {cedulaStatus==="ok" && (
                          <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:14}}>✅</span>
                        )}
                        {cedulaStatus==="error" && (
                          <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:14}}>❌</span>
                        )}
                      </div>
                      {cedulaStatus==="loading" && <div style={{marginTop:5,fontSize:11,color:G.muted}}>Consultando el Registro Civil...</div>}
                      {cedulaStatus==="ok" && <div style={{marginTop:5,fontSize:11,color:G.green}}>✅ Datos verificados en el Registro Civil</div>}
                      {cedulaStatus==="error" && <div style={{marginTop:5,fontSize:11,color:"#ff5050"}}>❌ Cédula no encontrada. Verificá el número.</div>}
                    </div>

                    {/* Datos autocompletados */}
                    <Divider label="Datos del colaborador"/>
                    <div style={{marginBottom:14}}>
                      <label style={lbl}>Nombre</label>
                      <input value={firstName} readOnly style={{...inp, background:"rgba(255,255,255,.03)", color: cedulaStatus==="ok"?"#fff":G.muted, cursor:"default"}} placeholder="Se completa automáticamente"/>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
                      <div>
                        <label style={lbl}>Primer apellido</label>
                        <input value={lastName1} readOnly style={{...inp, background:"rgba(255,255,255,.03)", color: cedulaStatus==="ok"?"#fff":G.muted, cursor:"default"}} placeholder="Automático"/>
                      </div>
                      <div>
                        <label style={lbl}>Segundo apellido</label>
                        <input value={lastName2} readOnly style={{...inp, background:"rgba(255,255,255,.03)", color: cedulaStatus==="ok"?"#fff":G.muted, cursor:"default"}} placeholder="Automático"/>
                      </div>
                    </div>

                    {/* Departamento */}
                    <div style={{marginBottom:14}}>
                      <label style={lbl}>Departamento</label>
                      <select value={departamento} onChange={e=>setDepartamento(e.target.value)} style={{...inp, cursor:"pointer"}}>
                        <option value="">Seleccioná tu departamento...</option>
                        {["Compras - Abastecimiento","Importaciones","Recursos Humanos","Finanzas","Logística","Comercial","Mercadeo"].map(d=>(
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <Divider label="Acceso"/>
                    <Field label="Correo electrónico" value={email} onChange={setEmail} placeholder="tu@correo.com" type="email"/>
                    <Field label="Contraseña" value={password} onChange={setPassword} placeholder="Mínimo 6 caracteres" type="password"/>
                    {error && <ErrorBox msg={error}/>}
                    <div style={{display:"flex",alignItems:"flex-start",gap:10,margin:"14px 0",padding:"14px",background:"rgba(26,158,63,.06)",border:"1px solid rgba(26,158,63,.2)",borderRadius:10}}>
                      <input type="checkbox" id="terminos" checked={aceptoTerminos} onChange={e=>setAceptoTerminos(e.target.checked)} style={{marginTop:3,width:16,height:16,accentColor:G.green,cursor:"pointer",flexShrink:0}}/>
                      <label htmlFor="terminos" style={{fontSize:12,color:G.gray,lineHeight:1.6,cursor:"pointer"}}>
                        Declaro que soy colaborador activo de MFA o El Colono. Acepto las <span style={{color:G.green,fontWeight:700}}>reglas y condiciones</span> de la Quiniela MFA Colaboradores.
                      </label>
                    </div>
                    <button type="submit" disabled={isLoading||!aceptoTerminos||cedulaStatus!=="ok"||!departamento} style={{...greenBtn,opacity:(isLoading||!aceptoTerminos||cedulaStatus!=="ok"||!departamento)?.5:1,marginTop:4}}>{isLoading?"Creando cuenta...":"Crear usuario"}</button>
                  </form>
                )}
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:14,fontSize:12,color:G.muted}}>🔒 Tus datos están protegidos</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // ─── PANTALLA PRINCIPAL (SESIÓN ACTIVA) ──────────────────────────────────────
  const isAdminUser = isAdmin(user);
  const tabs = [
    ["predictions","🎯","Mis predicciones"],
    ["results","📊","Mis resultados"],
    ["standings","🏅","Posiciones"],
    ["profile","👤","Mi perfil"],
    ["chat","💬","Chat"],
    ...(isAdminUser ? [["admin","⚙️","Admin"]] : []),
    ["rules","📋","Reglas"],
  ];

  return (
    <div style={{background:G.bg,minHeight:"100vh",color:"#fff"}}>
      <style>{GLOBAL_CSS}</style>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"24px 20px"}} className="main-padding">

        {/* Header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingBottom:24}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:44,height:44,background:G.green,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:"#fff"}}>M</div>
            <div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,letterSpacing:2,lineHeight:1}}>MFA</div>
              <div style={{fontSize:10,color:G.gray,letterSpacing:1,textTransform:"uppercase"}}>{user.firstName} {user.lastName1}</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:13,fontWeight:600}}>{user.firstName} {user.lastName1}</div>
              <div style={{fontSize:11,color:G.muted}}>{user.email}</div>
            </div>
            <button onClick={()=>setUser(null)} style={{background:"rgba(255,255,255,.05)",border:`1px solid ${G.border}`,borderRadius:8,padding:"8px 12px",color:G.gray,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",gap:6}}>
              <LogOut size={14}/> Salir
            </button>
          </div>
        </div>

        <div style={{background:"rgba(26,158,63,.08)",border:"1px solid rgba(26,158,63,.2)",borderRadius:12,padding:"14px 20px",display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
          <span style={{fontSize:24}}>👷</span>
          <div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,color:G.green}}>¡Bienvenido a la Quiniela MFA Colaboradores!</div>
            <div style={{fontSize:13,color:G.gray}}>Ingresa tus predicciones antes del inicio de cada partido.</div>
          </div>
        </div>

        <BannerDisplay slot={4}/>

        <div style={{display:"flex",gap:6,marginBottom:24,flexWrap:"wrap"}} className="tabs-row">
          {tabs.map(([id,icon,label])=>(
            <button key={id} onClick={()=>setView(id)} style={{padding:"10px 16px",borderRadius:8,border:`1px solid ${view===id?G.green:G.border}`,background:view===id?G.green:G.card,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700,letterSpacing:1,textTransform:"uppercase",cursor:"pointer"}}>{icon} {label}</button>
          ))}
        </div>

        {/* Modal bonificaciones */}
        {showBonos && (
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.92)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
            <div style={{background:G.card,border:`1px solid ${G.green}`,borderRadius:20,padding:32,maxWidth:520,width:"100%",maxHeight:"90vh",overflowY:"auto"}}>
              <div style={{textAlign:"center",marginBottom:24}}>
                <div style={{fontSize:40,marginBottom:10}}>⭐</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:26,fontWeight:900,color:G.green,textTransform:"uppercase",letterSpacing:1}}>Bonificaciones Especiales</div>
                <div style={{fontSize:13,color:G.gray,marginTop:6}}>Estas predicciones otorgan puntos extra al final del torneo</div>
              </div>
              {[
                ["🏆 Campeón del torneo","campeon","20 pts",bonosCampeon,setBonosCampeon,"campeon-list",SELECCIONES_MUNDIAL,null,null,null,null],
                ["⚽ Goleador del torneo","goleador","10 pts",bonosGoleador,setBonosGoleador,"goleador-list",TOP_JUGADORES,bonosGoleador,bonosGoleadorOtro,setBonosGoleadorOtro,"Escribe el nombre del jugador..."],
                ["🌟 MVP del torneo","mvp","10 pts",bonosMVP,setBonosMVP,"mvp-list",TOP_JUGADORES,bonosMVP,bonosMVPOtro,setBonosMVPOtro,"Escribe el nombre del jugador..."],
              ].map(([title,,pts,val,setVal,listId,opts,checkOtro,otroVal,setOtro,otroPH])=>(
                <div key={title} style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:12,padding:20,marginBottom:16}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,color:"#fff"}}>{title}</div>
                    <span style={{background:"rgba(26,158,63,.15)",color:G.green,border:"1px solid rgba(26,158,63,.3)",borderRadius:100,padding:"3px 10px",fontSize:12,fontWeight:700}}>{pts}</span>
                  </div>
                  <input list={listId} value={val} onChange={e=>setVal(e.target.value)} placeholder="Escribe o selecciona..." style={inp}/>
                  <datalist id={listId}>{opts.map(o=><option key={o} value={o}/>)}{setOtro&&<option value="Otro"/>}</datalist>
                  {checkOtro === "Otro" && setOtro && <input value={otroVal} onChange={e=>setOtro(e.target.value)} placeholder={otroPH} style={{...inp,marginTop:8}}/>}
                </div>
              ))}
              <div style={{fontSize:11,color:G.muted,textAlign:"center",marginBottom:16}}>⚠️ Solo podrás modificar estas predicciones antes del inicio del torneo (11 JUN)</div>
              <button onClick={saveBonos} style={{...greenBtn,fontSize:16}}>✅ Guardar bonificaciones</button>
            </div>
          </div>
        )}

        {/* Modal bienvenida */}
        {showWelcome && (
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
            <div style={{background:G.card,border:`1px solid ${G.green}`,borderRadius:20,padding:32,maxWidth:560,width:"100%",maxHeight:"80vh",overflowY:"auto"}}>
              <div style={{textAlign:"center",marginBottom:24}}>
                <div style={{fontSize:40,marginBottom:12}}>🏆</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:28,fontWeight:900,color:G.green,textTransform:"uppercase",letterSpacing:1}}>Quiniela MFA Colaboradores</div>
                <div style={{fontSize:14,color:G.gray,marginTop:6}}>Mundial 2026 · Bienvenido</div>
              </div>
              <div style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:12,padding:20,marginBottom:20}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,color:"#fff",textTransform:"uppercase",marginBottom:14}}>📋 Reglas y puntaje</div>
                {[
                  ["🎯 Marcador exacto","5 pts — acertás el resultado exacto"],
                  ["✅ Ganador correcto","3 pts — acertás quién gana o empate"],
                  ["📊 Diferencia correcta","+1 pt — la diferencia de goles es la misma"],
                  ["⏰ Cierre de predicciones","Se cierran al inicio de cada partido"],
                  ["🏅 Ranking","Se actualiza después de cada partido publicado"],
                  ["🎁 Premios","Los mejores al final del torneo se llevan premios"],
                ].map(([title, desc]) => (
                  <div key={title} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"10px 0",borderBottom:`1px solid ${G.border}`}}>
                    <span style={{fontSize:13,fontWeight:700,color:"#fff"}}>{title}</span>
                    <span style={{fontSize:12,color:G.gray,textAlign:"right",maxWidth:"55%"}}>{desc}</span>
                  </div>
                ))}
              </div>
              <button onClick={()=>setShowWelcome(false)} style={{...greenBtn,fontSize:16,letterSpacing:1}}>✅ Entendido — ¡A jugar!</button>
            </div>
          </div>
        )}

        <div>
          {view==="predictions"&&<PredictionsView matches={matches} predictions={predictions} updatePrediction={updatePrediction} savePredictions={savePredictions} predictionStatus={predictionStatus} matchFilter={matchFilter} setMatchFilter={setMatchFilter} calcPoints={calcPoints}/>}
          {view==="results"&&<ResultsView matches={matches} predictions={predictions} calcPoints={calcPoints}/>}
          {view==="standings"&&<StandingsView matches={matches} predictions={predictions} calcPoints={calcPoints} user={user}/>}
          {view==="profile"&&<ProfileView user={user} setUser={setUser} predictions={predictions} matches={matches} calcPoints={calcPoints}/>}
          {view==="chat"&&<ChatView user={user}/>}
          {view==="admin"&&<AdminView matches={matches} updateResult={updateResult} publishResult={publishResult} clearResult={clearResult} adminResults={adminResults} calcPoints={calcPoints}/>}
          {view==="rules"&&<RulesView/>}
        </div>
      </div>
    </div>
  );
}

// ─── PREDICCIONES ─────────────────────────────────────────────────────────────
function PredictionsView({ matches, predictions, updatePrediction, savePredictions, predictionStatus, matchFilter, setMatchFilter, calcPoints }) {
  const groups = matches.reduce((acc,m)=>{
    if(matchFilter==="all"||m.status===matchFilter){acc[m.date]=acc[m.date]||[];acc[m.date].push(m);}
    return acc;
  },{});
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12}} className="predictions-header">
        <div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:G.green,textTransform:"uppercase"}}>Mis predicciones</div>
          <div style={{fontSize:13,color:G.muted}}>Primera fase · Por grupo · Marcador exacto = 5 pts</div>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}} className="predictions-filters">
          {[["all","Todos"],["Abierto","Abiertos"],["Cierra pronto","Cierra pronto"],["Cerrado","Cerrados"]].map(([v,l])=>(
            <button key={v} onClick={()=>setMatchFilter(v)} style={{padding:"7px 14px",borderRadius:100,border:`1px solid ${matchFilter===v?G.green:G.border}`,background:matchFilter===v?G.green:"transparent",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer"}}>{l}</button>
          ))}
        </div>
      </div>
      {Object.entries(groups).filter(([,gm])=>gm.length>0).map(([group,gMatches])=>(
        <div key={group} style={{...card,padding:20,borderRadius:16,marginBottom:16}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:G.green,textTransform:"uppercase",marginBottom:16}}>📅 {group}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}} className="predictions-grid">
            {gMatches.map(m=>{
              const pred=predictions[m.id]||{};
              return (
                <div key={m.id} style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:12,padding:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                    <span style={{fontSize:11,color:G.muted}}>{m.date} · {m.time}</span>
                    <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:100,border:"1px solid",...(m.status==="Abierto"?{borderColor:"rgba(26,158,63,.4)",background:"rgba(26,158,63,.1)",color:G.green}:m.status==="Cierra pronto"?{borderColor:"rgba(255,180,0,.4)",background:"rgba(255,180,0,.1)",color:"#ffb400"}:{borderColor:"rgba(255,80,80,.4)",background:"rgba(255,80,80,.1)",color:"#ff5050"})}}>{m.status}</span>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 52px auto 52px 1fr",alignItems:"center",gap:8}}>
                    <div style={{textAlign:"right"}}><div style={{fontSize:20}}>{m.homeTeam.flag}</div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700}}>{m.home}</div></div>
                    <input value={pred.home||""} onChange={e=>updatePrediction(m.id,"home",e.target.value)} inputMode="numeric" style={{...inp,textAlign:"center",fontSize:22,fontWeight:900,padding:"8px 4px"}} placeholder="0"/>
                    <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700,color:G.green}}>VS</span>
                    <input value={pred.away||""} onChange={e=>updatePrediction(m.id,"away",e.target.value)} inputMode="numeric" style={{...inp,textAlign:"center",fontSize:22,fontWeight:900,padding:"8px 4px"}} placeholder="0"/>
                    <div><div style={{fontSize:20}}>{m.awayTeam.flag}</div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700}}>{m.away}</div></div>
                  </div>
                  {m.result&&(
                    <div style={{marginTop:10,background:"rgba(26,158,63,.08)",border:"1px solid rgba(26,158,63,.2)",borderRadius:8,padding:"8px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontSize:12,color:G.green}}>Resultado: {m.result.home} - {m.result.away}</span>
                      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:900,color:G.green}}>{calcPoints(pred,m.result)} pts</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      {predictionStatus==="saved"&&<div style={{borderRadius:10,padding:"12px 16px",marginBottom:16,background:"rgba(26,158,63,.1)",border:"1px solid rgba(26,158,63,.3)",color:G.green,fontSize:13}}>✅ Predicción guardada automáticamente.</div>}
      {predictionStatus==="closed"&&<div style={{borderRadius:10,padding:"12px 16px",marginBottom:16,background:"rgba(255,80,80,.1)",border:"1px solid rgba(255,80,80,.3)",color:"#ff5050",fontSize:13}}>🔒 Este partido ya cerró. No se puede modificar la predicción.</div>}
      <button onClick={savePredictions} style={{...greenBtn,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><Save size={18}/> Guardar predicciones</button>
    </div>
  );
}

// ─── RESULTADOS ───────────────────────────────────────────────────────────────
function ResultsView({ matches, predictions, calcPoints }) {
  const played=matches.filter(m=>m.result);
  const total=played.reduce((t,m)=>t+calcPoints(predictions[m.id]||{},m.result),0);
  const done=played.filter(m=>{const p=predictions[m.id]||{};return p.home!==undefined&&p.home!==""&&p.away!==undefined&&p.away!==""}).length;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:24}} className="results-stats">
        {[["Puntos ganados",`${total} pts`],["Partidos jugados",played.length],["Predicciones hechas",`${done}/${played.length}`]].map(([t,v])=>(
          <div key={t} style={{...card,padding:20,textAlign:"center",borderRadius:12}}>
            <div style={{fontSize:12,color:G.muted,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>{t}</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:32,fontWeight:900,color:G.green}}>{v}</div>
          </div>
        ))}
      </div>
      {played.length === 0 ? (
        <div style={{...card,padding:40,textAlign:"center",borderRadius:12}}>
          <div style={{fontSize:40,marginBottom:16}}>⏳</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:700,color:G.green}}>Aún no hay resultados publicados</div>
          <div style={{fontSize:13,color:G.muted,marginTop:8}}>Los resultados aparecerán aquí después de cada partido.</div>
        </div>
      ) : played.map(m=>{
        const pred=predictions[m.id]||{};
        const pts=calcPoints(pred,m.result);
        const hasPred=pred.home!==undefined&&pred.home!==""&&pred.away!==undefined&&pred.away!=="";
        return (
          <div key={m.id} style={{...card,padding:16,borderRadius:12,marginBottom:12,border:`1px solid ${pts===5?"rgba(26,158,63,.4)":pts>0?"rgba(255,180,0,.3)":G.border}`}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,alignItems:"center"}} className="result-row">
              <div>
                <div style={{fontSize:11,color:G.muted,marginBottom:4}}>Grupo {m.group} · {m.date}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:15,fontWeight:700}}>{m.homeTeam.flag} {m.home} vs {m.away} {m.awayTeam.flag}</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,textAlign:"center"}} className="result-scores">
                <div style={{background:G.card2,borderRadius:8,padding:"8px 0"}}>
                  <div style={{fontSize:9,color:G.muted,textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>Mi predicción</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:hasPred?"#fff":G.muted}}>{hasPred?`${pred.home} - ${pred.away}`:"—"}</div>
                </div>
                <div style={{background:G.card2,borderRadius:8,padding:"8px 0"}}>
                  <div style={{fontSize:9,color:G.muted,textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>Resultado oficial</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:G.green}}>{m.result.home} - {m.result.away}</div>
                </div>
              </div>
              <div style={{textAlign:"center"}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:40,fontWeight:900,color:pts===5?G.green:pts>0?"#ffb400":G.muted}}>{pts}</div>
                <div style={{fontSize:11,color:G.muted}}>puntos</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── POSICIONES ───────────────────────────────────────────────────────────────
function StandingsView({ matches, predictions: myPreds, calcPoints, user }) {
  const [standings, setStandings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const load = async () => {
      const { data: usuarios } = await supabase.from("usuarios").select("email, nombre, primer_apellido, bono_campeon, bono_goleador, bono_mvp, bonos_completado");
      const { data: preds } = await supabase.from("predicciones").select("*");
      const { data: resultados } = await supabase.from("resultados").select("*");
      if (!usuarios || !preds) { setLoading(false); return; }
      const resMap = {};
      (resultados||[]).forEach(r => { resMap[r.match_id] = { home:r.home, away:r.away }; });
      const data = usuarios.map(u => {
        const userPreds = preds.filter(p => p.user_email === u.email);
        const pts = userPreds.reduce((total, p) => {
          const res = resMap[p.match_id];
          if (!res) return total;
          return total + calcPoints(p, res);
        }, 0);
        const name = u.nombre && u.primer_apellido ? `${u.nombre} ${u.primer_apellido}` : "Colaborador";
        return { name, email:u.email, pts, predCount:userPreds.length };
      }).sort((a,b) => b.pts - a.pts || b.predCount - a.predCount);
      setStandings(data);
      setLoading(false);
    };
    load();
  }, [calcPoints]);

  const myPos = standings.findIndex(s => s.email === user.email) + 1;
  const myData = standings.find(s => s.email === user.email);

  return (
    <div>
      {myData && (
        <div style={{background:"rgba(26,158,63,.08)",border:"1px solid rgba(26,158,63,.2)",borderRadius:12,padding:"16px 20px",marginBottom:24,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:42,fontWeight:900,color:G.green,lineHeight:1}}>#{myPos}</div>
            <div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,color:"#fff"}}>Tu posición actual</div>
              <div style={{fontSize:12,color:G.muted}}>{myData.predCount} predicciones ingresadas</div>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:36,fontWeight:900,color:G.green}}>{myData.pts}</div>
            <div style={{fontSize:11,color:G.muted}}>puntos</div>
          </div>
        </div>
      )}
      {loading ? (
        <div style={{...card,padding:40,textAlign:"center",color:G.muted,borderRadius:12}}>Cargando posiciones...</div>
      ) : (
        <div style={{overflowX:"auto"}} className="standings-table">
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:480}}>
            <thead>
              <tr style={{background:G.card2}}>
                {["#","Colaborador","Predicciones","Puntos"].map(h=>(
                  <th key={h} style={{padding:"12px 16px",textAlign:"left",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:G.muted}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {standings.map((s,i)=>(
                <tr key={s.email} style={{borderBottom:`1px solid ${G.border}`,background:s.email===user.email?"rgba(26,158,63,.06)":"transparent"}}>
                  <td style={{padding:"12px 16px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:i<3?G.green:G.muted}}>{i+1}</td>
                  <td style={{padding:"12px 16px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:32,height:32,borderRadius:"50%",background:G.card2,border:`1px solid ${s.email===user.email?G.green:G.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:s.email===user.email?G.green:G.gray}}>{s.name[0]}</div>
                      <div>
                        <div style={{fontSize:14,fontWeight:600,color:s.email===user.email?G.green:"#fff"}}>{s.name}{s.email===user.email&&" (tú)"}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{padding:"12px 16px",fontSize:13,color:G.gray}}>{s.predCount}</td>
                  <td style={{padding:"12px 16px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:i<3?G.green:"#fff"}}>{s.pts} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── PERFIL ───────────────────────────────────────────────────────────────────
function ProfileView({ user, predictions, matches, calcPoints }) {
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [pwStatus, setPwStatus] = React.useState("");
  const [isChanging, setIsChanging] = React.useState(false);

  const handleChangePassword = async () => {
    setPwStatus("");
    if (!currentPassword.trim()||!newPassword.trim()||!confirmPassword.trim()) { setPwStatus("error:Completa todos los campos."); return; }
    if (newPassword.trim() !== confirmPassword.trim()) { setPwStatus("error:Las contraseñas nuevas no coinciden."); return; }
    if (newPassword.trim().length < 6) { setPwStatus("error:La nueva contraseña debe tener al menos 6 caracteres."); return; }
    setIsChanging(true);
    try {
      const { data: u } = await supabase.from("usuarios").select("password").eq("email", user.email).single();
      if (!u || u.password !== currentPassword.trim()) { setPwStatus("error:La contraseña actual es incorrecta."); setIsChanging(false); return; }
      const { error } = await supabase.from("usuarios").update({ password: newPassword.trim() }).eq("email", user.email);
      if (error) throw new Error(error.message);
      setPwStatus("ok:Contraseña actualizada correctamente.");
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    } catch(err) { setPwStatus("error:" + (err.message || "Error al cambiar contraseña.")); }
    finally { setIsChanging(false); }
  };

  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,alignItems:"start"}} className="profile-grid">
      {/* Datos del colaborador */}
      <div style={{...card,padding:24,borderRadius:16}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:G.green,textTransform:"uppercase",marginBottom:20}}>👷 Mis datos</div>
        <div style={{display:"grid",gap:10}}>
          {[
            ["Nombre completo", [user.firstName, user.lastName1, user.lastName2].filter(Boolean).join(" ") || "—"],
            ["Correo electrónico", user.email],
          ].map(([label,value])=>(
            <div key={label} style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:8,padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:G.muted}}>{label}</span>
              <span style={{fontSize:14,fontWeight:600,color:"#fff",textAlign:"right",maxWidth:"60%"}}>{value||"—"}</span>
            </div>
          ))}
        </div>
        <div style={{marginTop:14,background:"rgba(26,158,63,.06)",border:"1px solid rgba(26,158,63,.2)",borderRadius:8,padding:"12px 14px",fontSize:12,color:G.muted}}>
          Para actualizar tus datos, contacta al administrador.
        </div>
      </div>

      {/* Bonificaciones */}
      <div style={{...card,padding:24,borderRadius:16}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:G.green,textTransform:"uppercase",marginBottom:20}}>⭐ Bonificaciones especiales</div>
        <BonificacionesDisplay email={user.email}/>
      </div>

      {/* Resumen predicciones */}
      <div style={{...card,padding:24,borderRadius:16,gridColumn:"1/-1"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:G.green,textTransform:"uppercase"}}>Resumen de mis predicciones</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}} className="profile-stats">
            {[["Predicciones",Object.keys(predictions).length],["Con resultado",matches.filter(m=>m.result).length],["Puntos",matches.filter(m=>m.result).reduce((t,m)=>t+calcPoints(predictions[m.id]||{},m.result),0)+" pts"]].map(([l,v])=>(
              <div key={l} style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:10,padding:"10px 16px",textAlign:"center",minWidth:110}}>
                <div style={{fontSize:10,color:G.muted,textTransform:"uppercase",letterSpacing:1}}>{l}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:G.green,marginTop:4}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{overflowX:"auto"}} className="profile-table">
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:700}}>
            <thead>
              <tr style={{background:G.card2}}>
                {["Grupo","Partido","Fecha","Mi predicción","Resultado","Puntos","Estado"].map(h=>(
                  <th key={h} style={{padding:"10px 12px",textAlign:"left",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:G.muted}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matches.map(m=>{
                const pred=predictions[m.id]||{};
                const hasPred=pred.home!==undefined&&pred.home!==""&&pred.away!==undefined&&pred.away!=="";
                const pts=m.result?calcPoints(pred,m.result):null;
                return (
                  <tr key={m.id} style={{borderBottom:`1px solid ${G.border}`,background:pts===5?"rgba(26,158,63,.05)":"transparent"}}>
                    <td style={{padding:"10px 12px",fontSize:13,color:G.muted,fontWeight:700}}>{m.group}</td>
                    <td style={{padding:"10px 12px",fontSize:13}}>{m.homeTeam.flag} {m.home} vs {m.away} {m.awayTeam.flag}</td>
                    <td style={{padding:"10px 12px",fontSize:12,color:G.muted,whiteSpace:"nowrap"}}>{m.date} {m.time}</td>
                    <td style={{padding:"10px 12px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:hasPred?"#fff":G.muted}}>{hasPred?`${pred.home} - ${pred.away}`:"—"}</td>
                    <td style={{padding:"10px 12px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:G.green}}>{m.result?`${m.result.home} - ${m.result.away}`:"—"}</td>
                    <td style={{padding:"10px 12px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900,color:pts===5?G.green:pts>0?"#ffb400":G.muted}}>{pts!==null?`${pts} pts`:"—"}</td>
                    <td style={{padding:"10px 12px"}}>
                      <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:100,border:"1px solid",
                        ...(m.status==="Abierto"?{borderColor:"rgba(26,158,63,.4)",background:"rgba(26,158,63,.1)",color:G.green}:
                           m.status==="Cierra pronto"?{borderColor:"rgba(255,180,0,.4)",background:"rgba(255,180,0,.1)",color:"#ffb400"}:
                           {borderColor:"rgba(255,80,80,.4)",background:"rgba(255,80,80,.1)",color:"#ff5050"})
                      }}>{m.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cambiar contraseña */}
      <div style={{...card,padding:24,borderRadius:16}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:G.green,textTransform:"uppercase",marginBottom:6}}>Cambiar contraseña</div>
        <Field label="Contraseña actual" value={currentPassword} onChange={setCurrentPassword} placeholder="Tu contraseña actual" type="password"/>
        <Field label="Nueva contraseña" value={newPassword} onChange={setNewPassword} placeholder="Mínimo 6 caracteres" type="password"/>
        <Field label="Confirmar nueva contraseña" value={confirmPassword} onChange={setConfirmPassword} placeholder="Repite la nueva contraseña" type="password"/>
        {pwStatus && (
          <div style={{borderRadius:8,padding:"10px 14px",fontSize:13,marginBottom:14,
            background:pwStatus.startsWith("ok")?"rgba(26,158,63,.1)":"rgba(255,80,80,.1)",
            border:`1px solid ${pwStatus.startsWith("ok")?"rgba(26,158,63,.3)":"rgba(255,80,80,.3)"}`,
            color:pwStatus.startsWith("ok")?G.green:"#ff5050"
          }}>{pwStatus.startsWith("ok")?"✅":"⚠️"} {pwStatus.split(":")[1]}</div>
        )}
        <button onClick={handleChangePassword} disabled={isChanging} style={{...greenBtn,opacity:isChanging?.7:1}}>{isChanging?"Actualizando...":"Cambiar contraseña"}</button>
      </div>
    </div>
  );
}

// ─── CHAT ─────────────────────────────────────────────────────────────────────
function ChatView({ user }) {
  const [messages, setMessages] = React.useState([]);
  const [newMsg, setNewMsg] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [showPollForm, setShowPollForm] = React.useState(false);
  const [pollQuestion, setPollQuestion] = React.useState("");
  const [pollOptions, setPollOptions] = React.useState(["",""]);
  const [userVotes, setUserVotes] = React.useState({});
  const [uploadingImg, setUploadingImg] = React.useState(false);
  const bottomRef = React.useRef(null);
  const fileInputRef = React.useRef(null);
  const isAdminUser = isAdmin(user);
  const userName = [user.firstName, user.lastName1].filter(Boolean).join(" ") || "Colaborador";

  const loadMessages = React.useCallback(async () => {
    const { data } = await supabase.from("chat").select("*").order("created_at", { ascending: true }).limit(100);
    if (data) setMessages(data);
    const { data: votes } = await supabase.from("votos_encuesta").select("*").eq("user_email", user.email);
    if (votes) { const map = {}; votes.forEach(v => { map[v.mensaje_id] = v.opcion; }); setUserVotes(map); }
  }, [user.email]);

  React.useEffect(() => { loadMessages(); const i = setInterval(loadMessages, 5000); return () => clearInterval(i); }, [loadMessages]);
  React.useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  const formatTime = (ts) => { const d=new Date(ts); const cr=new Date(d.getTime()-6*60*60*1000); const pad=n=>String(n).padStart(2,"0"); return `${pad(cr.getUTCDate())}/${pad(cr.getUTCMonth()+1)} ${pad(cr.getUTCHours())}:${pad(cr.getUTCMinutes())}`; };

  const sendMessage = async () => {
    const text = newMsg.trim(); if (!text) return;
    setSending(true);
    await supabase.from("chat").insert({ user_email:user.email, user_name:userName, mensaje:text, tipo:"mensaje" });
    setNewMsg(""); await loadMessages(); setSending(false);
  };

  const sendPoll = async () => {
    if (!pollQuestion.trim() || pollOptions.filter(o=>o.trim()).length < 2) return;
    setSending(true);
    const opts = pollOptions.filter(o=>o.trim());
    await supabase.from("chat").insert({ user_email:user.email, user_name:userName, mensaje:pollQuestion.trim(), tipo:"encuesta", encuesta:{ pregunta:pollQuestion.trim(), opciones:opts, votos:opts.map(()=>0) } });
    setPollQuestion(""); setPollOptions(["",""]); setShowPollForm(false); await loadMessages(); setSending(false);
  };

  const vote = async (msgId, opcionIdx) => {
    if (userVotes[msgId] !== undefined) return;
    const { error: voteError } = await supabase.from("votos_encuesta").insert({ mensaje_id:msgId, user_email:user.email, opcion:opcionIdx });
    if (voteError) return;
    const { data: allVotes } = await supabase.from("votos_encuesta").select("opcion").eq("mensaje_id", msgId);
    const { data: msgData } = await supabase.from("chat").select("encuesta").eq("id", msgId).single();
    if (allVotes && msgData) {
      const enc = msgData.encuesta;
      await supabase.from("chat").update({ encuesta:{ ...enc, votos:enc.opciones.map((_,i)=>allVotes.filter(v=>v.opcion===i).length) } }).eq("id", msgId);
    }
    setUserVotes(c=>({...c,[msgId]:opcionIdx})); await loadMessages();
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setUploadingImg(true);
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from("chat-images").upload(fileName, file, { contentType: file.type });
      if (error) { alert("Error al subir imagen: " + error.message); setUploadingImg(false); e.target.value = ""; return; }
      const { data:urlData } = supabase.storage.from("chat-images").getPublicUrl(fileName);
      await supabase.from("chat").insert({ user_email:user.email, user_name:userName, mensaje:"📷 Imagen", tipo:"imagen", imagen_url:urlData.publicUrl });
      await loadMessages();
    } catch(err) { alert("Error inesperado: " + err.message); }
    finally { setUploadingImg(false); e.target.value = ""; }
  };

  const handleKey = (e) => { if (e.key==="Enter"&&!e.shiftKey) { e.preventDefault(); sendMessage(); } };
  const totalVotos = (enc) => enc.votos.reduce((t,v)=>t+(v||0),0);

  return (
    <div style={{display:"flex",flexDirection:"column",height:"75vh",gap:0}} className="chat-container">
      <div style={{...card,borderRadius:"16px 16px 0 0",flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{padding:"14px 20px",borderBottom:`1px solid ${G.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:20}}>💬</span>
            <div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,color:G.green,textTransform:"uppercase"}}>Chat colaboradores</div>
              <div style={{fontSize:11,color:G.muted}}>Visible para todos · Se actualiza cada 5 seg</div>
            </div>
          </div>
          {isAdminUser && (
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setShowPollForm(!showPollForm)} style={{background:showPollForm?"rgba(255,180,0,.2)":"rgba(26,158,63,.1)",border:`1px solid ${showPollForm?"rgba(255,180,0,.4)":"rgba(26,158,63,.3)"}`,borderRadius:8,padding:"6px 12px",color:showPollForm?"#ffb400":G.green,fontSize:12,fontWeight:700,cursor:"pointer"}}>📊 Encuesta</button>
              <button onClick={()=>fileInputRef.current?.click()} disabled={uploadingImg} style={{background:"rgba(26,158,63,.1)",border:"1px solid rgba(26,158,63,.3)",borderRadius:8,padding:"6px 12px",color:G.green,fontSize:12,fontWeight:700,cursor:"pointer",opacity:uploadingImg?.6:1}}>{uploadingImg?"Subiendo...":"📷 Foto"}</button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={uploadImage} style={{display:"none"}}/>
            </div>
          )}
        </div>

        {showPollForm && isAdminUser && (
          <div style={{padding:"14px 20px",borderBottom:`1px solid ${G.border}`,background:"rgba(255,180,0,.05)"}}>
            <div style={{fontSize:12,fontWeight:700,color:"#ffb400",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Nueva encuesta</div>
            <input value={pollQuestion} onChange={e=>setPollQuestion(e.target.value)} placeholder="Pregunta de la encuesta..." style={{...inp,marginBottom:8}}/>
            {pollOptions.map((opt,i)=>(
              <div key={i} style={{display:"flex",gap:6,marginBottom:6}}>
                <input value={opt} onChange={e=>{const n=[...pollOptions];n[i]=e.target.value;setPollOptions(n);}} placeholder={`Opción ${i+1}`} style={{...inp,flex:1}}/>
                {pollOptions.length>2&&<button onClick={()=>setPollOptions(pollOptions.filter((_,j)=>j!==i))} style={{background:"rgba(255,80,80,.1)",border:"1px solid rgba(255,80,80,.3)",borderRadius:6,padding:"0 10px",color:"#ff5050",cursor:"pointer",fontSize:16}}>×</button>}
              </div>
            ))}
            <div style={{display:"flex",gap:8,marginTop:8}}>
              <button onClick={()=>setPollOptions([...pollOptions,""])} style={{background:"rgba(26,158,63,.1)",border:"1px solid rgba(26,158,63,.3)",borderRadius:8,padding:"8px 12px",color:G.green,fontSize:12,fontWeight:700,cursor:"pointer"}}>+ Agregar opción</button>
              <button onClick={sendPoll} disabled={sending} style={{background:G.green,border:"none",borderRadius:8,padding:"8px 16px",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",opacity:sending?.6:1}}>Publicar encuesta</button>
            </div>
          </div>
        )}

        <div style={{flex:1,overflowY:"auto",padding:"16px 20px",display:"flex",flexDirection:"column",gap:12}}>
          {messages.map(m=>{
            const isMe = m.user_email === user.email;
            if (m.tipo === "imagen") return (
              <div key={m.id} style={{display:"flex",flexDirection:"column",alignItems:isMe?"flex-end":"flex-start"}}>
                <div style={{fontSize:10,color:G.muted,marginBottom:4,paddingLeft:4,paddingRight:4}}>{!isMe&&<span style={{color:G.green,fontWeight:700}}>{m.user_name} · </span>}{formatTime(m.created_at)}{isMe&&<span style={{color:G.green,fontWeight:700}}> · Tú</span>}</div>
                <img src={m.imagen_url} alt="img" style={{maxWidth:280,maxHeight:200,borderRadius:12,border:`1px solid ${G.border}`,objectFit:"cover",cursor:"pointer"}} onClick={()=>window.open(m.imagen_url,"_blank")}/>
              </div>
            );
            if (m.tipo === "encuesta") {
              const enc = m.encuesta||{}; const total = totalVotos(enc); const myVote = userVotes[m.id];
              return (
                <div key={m.id} style={{maxWidth:360,alignSelf:"flex-start"}}>
                  <div style={{fontSize:10,color:G.muted,marginBottom:4}}><span style={{color:G.green,fontWeight:700}}>{m.user_name} · </span>{formatTime(m.created_at)}</div>
                  <div style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:12,padding:16}}>
                    <div style={{fontSize:13,fontWeight:700,color:"#ffb400",marginBottom:2}}>📊 Encuesta</div>
                    <div style={{fontSize:14,fontWeight:600,color:"#fff",marginBottom:12}}>{enc.pregunta}</div>
                    {(enc.opciones||[]).map((opt,i)=>{
                      const votos=enc.votos?.[i]||0; const pct=total>0?Math.round(votos/total*100):0; const voted=myVote===i;
                      return (
                        <div key={i} style={{marginBottom:8}}>
                          <button onClick={()=>vote(m.id,i)} disabled={myVote!==undefined} style={{width:"100%",background:voted?"rgba(26,158,63,.2)":"rgba(255,255,255,.05)",border:`1px solid ${voted?G.green:G.border}`,borderRadius:8,padding:"8px 12px",color:voted?G.green:"#fff",cursor:myVote!==undefined?"default":"pointer",textAlign:"left",fontSize:13,marginBottom:4}}>{voted?"✅ ":""}{opt}</button>
                          {myVote!==undefined&&(<div style={{display:"flex",alignItems:"center",gap:8}}><div style={{flex:1,height:4,background:G.border,borderRadius:2,overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:voted?G.green:G.gray,borderRadius:2,transition:".3s"}}/></div><span style={{fontSize:11,color:G.muted,width:40,textAlign:"right"}}>{pct}% ({votos})</span></div>)}
                        </div>
                      );
                    })}
                    <div style={{fontSize:11,color:G.muted,marginTop:4}}>{total} {total===1?"voto":"votos"}</div>
                  </div>
                </div>
              );
            }
            return (
              <div key={m.id} style={{display:"flex",flexDirection:"column",alignItems:isMe?"flex-end":"flex-start"}}>
                <div style={{fontSize:10,color:G.muted,marginBottom:4,paddingLeft:4,paddingRight:4}}>{!isMe&&<span style={{color:G.green,fontWeight:700}}>{m.user_name} · </span>}{formatTime(m.created_at)}{isMe&&<span style={{color:G.green,fontWeight:700}}> · Tú</span>}</div>
                <div style={{maxWidth:"70%",padding:"10px 14px",borderRadius:isMe?"16px 4px 16px 16px":"4px 16px 16px 16px",background:isMe?G.green:G.card2,border:`1px solid ${isMe?"transparent":G.border}`,color:"#fff",fontSize:14,lineHeight:1.5,wordBreak:"break-word"}}>{m.mensaje}</div>
              </div>
            );
          })}
          <div ref={bottomRef}/>
        </div>
      </div>
      <div style={{background:G.card,border:`1px solid ${G.border}`,borderTop:"none",borderRadius:"0 0 16px 16px",padding:"12px 16px",display:"flex",gap:10,alignItems:"flex-end"}}>
        <textarea value={newMsg} onChange={e=>setNewMsg(e.target.value)} onKeyDown={handleKey} placeholder="Escribe un mensaje... (Enter para enviar)" rows={1} style={{flex:1,background:G.bg,border:`1px solid ${G.border}`,borderRadius:10,padding:"10px 14px",fontSize:14,color:"#fff",resize:"none",outline:"none",fontFamily:"'Barlow',sans-serif",lineHeight:1.5}}/>
        <button onClick={sendMessage} disabled={sending||!newMsg.trim()} style={{background:G.green,border:"none",borderRadius:10,padding:"10px 18px",color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,cursor:"pointer",opacity:sending||!newMsg.trim()?.5:1,whiteSpace:"nowrap"}}>{sending?"...":"Enviar ➤"}</button>
      </div>
    </div>
  );
}

// ─── ADMIN ────────────────────────────────────────────────────────────────────
function AdminView({ matches, updateResult, publishResult, clearResult, adminResults, calcPoints }) {
  const [section, setSection] = React.useState("scores");
  const [dbUsers, setDbUsers] = React.useState([]);
  const [loadingUsers, setLoadingUsers] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [extraAdmins, setExtraAdmins] = React.useState([]);
  const SUPERUSER = "lvillegasv@mfamayoreo.com";

  const isUserAdmin = (email) => ADMIN_EMAILS.includes(email) || extraAdmins.includes(email);

  React.useEffect(() => {
    supabase.from("usuarios").select("email").eq("es_admin", true).then(({ data }) => {
      if (data) setExtraAdmins(data.map(u => u.email));
    });
  }, []);

  const toggleAdmin = async (email) => {
    if (email === SUPERUSER) return;
    const currentlyAdmin = isUserAdmin(email);
    const { error } = await supabase.from("usuarios").update({ es_admin: !currentlyAdmin }).eq("email", email);
    if (error) { alert("Error al actualizar permisos: " + error.message); return; }
    setExtraAdmins(c => currentlyAdmin ? c.filter(e=>e!==email) : [...c, email]);
  };

  const toggleBloqueo = async (u) => {
    if (u.email === SUPERUSER) return;
    const bloqueado = !u.bloqueado;
    const { error } = await supabase.from("usuarios").update({ bloqueado }).eq("email", u.email);
    if (error) { alert("Error al actualizar estado: " + error.message); return; }
    setSelectedUser(prev => ({...prev, bloqueado}));
    setDbUsers(prev => prev.map(x => x.email === u.email ? {...x, bloqueado} : x));
    try { await supabase.from("access_log").insert({ email: u.email, evento: bloqueado ? "usuario_bloqueado" : "usuario_desbloqueado", timestamp: new Date().toISOString() }); } catch(_){}
  };

  const loadUsers = React.useCallback(async () => {
    setLoadingUsers(true);
    const { data } = await supabase.from("usuarios").select("*").order("created_at", { ascending: false });
    if (data) setDbUsers(data);
    setLoadingUsers(false);
  }, []);

  React.useEffect(() => { if (section === "users") loadUsers(); }, [section, loadUsers]);

  const filteredUsers = dbUsers.filter(u => {
    const s = search.toLowerCase();
    return (u.nombre||"").toLowerCase().includes(s) ||
      (u.email||"").toLowerCase().includes(s) ||
      (u.primer_apellido||"").toLowerCase().includes(s);
  });

  const exportToExcel = () => {
    const esc = v => String(v||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    const rows = filteredUsers.map(u => `<tr><td>${esc(u.nombre)}</td><td>${esc(u.primer_apellido)}</td><td>${esc(u.segundo_apellido)}</td><td>${esc(u.email)}</td><td>${esc(u.created_at?.slice(0,10))}</td></tr>`).join("");
    const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="UTF-8"/><style>th{background:#1a9e3f;color:#fff;font-weight:bold}th,td{border:1px solid #999;padding:8px}</style></head><body><h2>Colaboradores Quiniela MFA</h2><table><thead><tr><th>Nombre</th><th>Primer apellido</th><th>Segundo apellido</th><th>Correo</th><th>Registro</th></tr></thead><tbody>${rows}</tbody></table></body></html>`;
    const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "colaboradores_quiniela_mfa.xls";
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{display:"flex",gap:6,marginBottom:20,flexWrap:"wrap"}} className="admin-tabs">
        {[["scores","⚽ Marcadores"],["users","👥 Colaboradores"],["banners","🖼️ Banners"],["log","🔍 Log"]].map(([s,l])=>(
          <button key={s} onClick={()=>setSection(s)} style={{padding:"10px 18px",borderRadius:8,border:`1px solid ${section===s?G.green:G.border}`,background:section===s?G.green:G.card,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700,letterSpacing:1,textTransform:"uppercase",cursor:"pointer"}}>{l}</button>
        ))}
      </div>

      {section==="banners" ? <BannersAdmin/> :
       section==="log" ? <AccessLogView/> :
       section==="scores" ? (
        <div>
          <div style={{...card,padding:16,borderRadius:12,marginBottom:16}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:G.green,textTransform:"uppercase"}}>Cargar marcadores oficiales</div>
            <div style={{fontSize:13,color:G.muted,marginTop:4}}>Al publicar un marcador se actualizan los puntos automáticamente.</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}} className="admin-scores-grid">
            {matches.map(m=>(
              <div key={m.id} style={{...card,padding:14,borderRadius:12}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                  <span style={{fontSize:11,color:G.muted}}>Grupo {m.group} · {m.date}</span>
                  <span style={{fontSize:11,color:m.result?G.green:"#ffb400"}}>{m.result?"✅ Publicado":"⏳ Pendiente"}</span>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 52px auto 52px 1fr",alignItems:"center",gap:6,marginBottom:12}}>
                  <div style={{textAlign:"right",fontSize:18}}>{m.homeTeam.flag}</div>
                  <input disabled={m.result?.locked} value={adminResults[m.id]?.home?.toString()||""} onChange={e=>updateResult(m.id,"home",e.target.value)} inputMode="numeric" style={{...inp,textAlign:"center",fontSize:20,fontWeight:900,padding:"7px 4px"}} placeholder="0"/>
                  <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:G.green,fontWeight:700}}>VS</span>
                  <input disabled={m.result?.locked} value={adminResults[m.id]?.away?.toString()||""} onChange={e=>updateResult(m.id,"away",e.target.value)} inputMode="numeric" style={{...inp,textAlign:"center",fontSize:20,fontWeight:900,padding:"7px 4px"}} placeholder="0"/>
                  <div style={{fontSize:18}}>{m.awayTeam.flag}</div>
                </div>
                {m.result?.locked?(
                  <div style={{textAlign:"center",padding:"8px",background:"rgba(26,158,63,.08)",border:"1px solid rgba(26,158,63,.2)",borderRadius:8,fontSize:12,color:G.green}}>🔒 Resultado bloqueado</div>
                ):(
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    <button onClick={()=>clearResult(m.id)} style={{background:"rgba(255,80,80,.1)",border:"1px solid rgba(255,80,80,.3)",borderRadius:8,padding:"8px",fontSize:12,fontWeight:700,color:"#ff5050",cursor:"pointer"}}>Limpiar</button>
                    <button onClick={()=>publishResult(m.id)} style={{background:"rgba(26,158,63,.1)",border:"1px solid rgba(26,158,63,.3)",borderRadius:8,padding:"8px",fontSize:12,fontWeight:700,color:G.green,cursor:"pointer"}}>Publicar</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:12}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:G.green,textTransform:"uppercase"}}>Colaboradores registrados ({filteredUsers.length})</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <button onClick={loadUsers} style={{background:G.card,border:`1px solid ${G.border}`,borderRadius:8,padding:"8px 14px",color:G.gray,cursor:"pointer",fontSize:13}}>🔄 Actualizar</button>
              <button onClick={exportToExcel} style={{background:G.green,border:"none",borderRadius:8,padding:"8px 14px",color:"#fff",cursor:"pointer",fontWeight:700,fontSize:13}}>📥 Exportar Excel</button>
              <button onClick={async()=>{
                const c1=window.confirm("⚠️ ¿Borrar TODAS las predicciones?"); if(!c1) return;
                const c2=window.confirm("🔴 CONFIRMACIÓN FINAL. ¿Continuar?"); if(!c2) return;
                await supabase.from("predicciones").delete().neq("id","00000000-0000-0000-0000-000000000000");
                alert("✅ Todas las predicciones han sido borradas.");
              }} style={{background:"rgba(255,80,80,.1)",border:"1px solid rgba(255,80,80,.4)",borderRadius:8,padding:"8px 14px",color:"#ff5050",cursor:"pointer",fontWeight:700,fontSize:13}}>🗑️ Resetear</button>
            </div>
          </div>
          <div style={{marginBottom:16}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar por nombre o correo..." style={{...inp,padding:"11px 16px"}}/>
          </div>
          {loadingUsers ? (
            <div style={{...card,padding:40,textAlign:"center",color:G.muted,borderRadius:12}}>Cargando colaboradores...</div>
          ) : (
            <div style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:16,alignItems:"start"}} className="admin-users-grid">
              <div style={{...card,borderRadius:12,overflow:"hidden"}}>
                <div style={{padding:"12px 16px",background:G.card2,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:G.muted}}>Lista de colaboradores</div>
                <div style={{maxHeight:600,overflowY:"auto"}}>
                  {filteredUsers.map(u=>(
                    <div key={u.id} onClick={()=>setSelectedUser(u)} style={{padding:"12px 16px",cursor:"pointer",borderBottom:`1px solid ${G.border}`,background:selectedUser?.id===u.id?"rgba(26,158,63,.08)":"transparent",display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:34,height:34,borderRadius:"50%",background:G.card2,border:`1px solid ${u.bloqueado?"rgba(255,80,80,.4)":G.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:u.bloqueado?"#ff5050":G.gray,flexShrink:0}}>
                        {(u.nombre||"?")[0].toUpperCase()}
                      </div>
                      <div style={{minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:600,color:u.bloqueado?"#ff5050":"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{u.nombre} {u.primer_apellido}</div>
                        <div style={{fontSize:11,color:G.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{u.email}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {selectedUser ? (
                <div style={{...card,padding:24,borderRadius:12}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12}}>
                    <div>
                      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:900,color:"#fff"}}>{selectedUser.nombre} {selectedUser.primer_apellido} {selectedUser.segundo_apellido}</div>
                      <div style={{fontSize:13,color:G.muted}}>{selectedUser.email}</div>
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      {selectedUser.email !== SUPERUSER && (
                        <>
                          <button onClick={()=>toggleAdmin(selectedUser.email)} style={{background:isUserAdmin(selectedUser.email)?"rgba(255,180,0,.1)":"rgba(26,158,63,.1)",border:`1px solid ${isUserAdmin(selectedUser.email)?"rgba(255,180,0,.4)":"rgba(26,158,63,.3)"}`,borderRadius:8,padding:"8px 14px",color:isUserAdmin(selectedUser.email)?"#ffb400":G.green,cursor:"pointer",fontSize:12,fontWeight:700}}>
                            {isUserAdmin(selectedUser.email)?"⚙️ Quitar admin":"⚙️ Hacer admin"}
                          </button>
                          <button onClick={()=>toggleBloqueo(selectedUser)} style={{background:selectedUser.bloqueado?"rgba(26,158,63,.1)":"rgba(255,80,80,.1)",border:`1px solid ${selectedUser.bloqueado?"rgba(26,158,63,.3)":"rgba(255,80,80,.3)"}`,borderRadius:8,padding:"8px 14px",color:selectedUser.bloqueado?G.green:"#ff5050",cursor:"pointer",fontSize:12,fontWeight:700}}>
                            {selectedUser.bloqueado?"✅ Desbloquear":"🚫 Bloquear"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}} className="admin-user-detail">
                    {[
                      ["Nombre",`${selectedUser.nombre||""} ${selectedUser.primer_apellido||""} ${selectedUser.segundo_apellido||""}`],
                      ["Correo",selectedUser.email],
                      ["Estado",selectedUser.bloqueado?"🚫 Bloqueado":"✅ Activo"],
                      ["Es admin",isUserAdmin(selectedUser.email)?"✅ Sí":"—"],
                      ["Registro",selectedUser.created_at?.slice(0,10)||"—"],
                      ["Bonos",selectedUser.bonos_completado?"✅ Completados":"⏳ Pendientes"],
                    ].map(([l,v])=>(
                      <div key={l} style={{background:G.card2,border:`1px solid ${G.border}`,borderRadius:8,padding:"10px 14px"}}>
                        <div style={{fontSize:10,color:G.muted,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{l}</div>
                        <div style={{fontSize:13,fontWeight:600,color:"#fff"}}>{v||"—"}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{...card,padding:40,textAlign:"center",borderRadius:12,color:G.muted}}>Selecciona un colaborador para ver sus detalles.</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── REGLAS ───────────────────────────────────────────────────────────────────
function RulesView() {
  const seccion = (titulo, emoji, items) => (
    <div style={{...card,padding:20,borderRadius:12,marginBottom:16}}>
      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900,color:G.green,textTransform:"uppercase",marginBottom:14}}>{emoji} {titulo}</div>
      <div style={{display:"grid",gap:8}}>
        {items.map(([texto,valor],i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"10px 0",borderBottom:i<items.length-1?`1px solid ${G.border}`:"none",gap:16}}>
            <span style={{fontSize:13,color:"#fff",lineHeight:1.6}}>{texto}</span>
            {valor&&<span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:900,color:G.green,whiteSpace:"nowrap"}}>{valor}</span>}
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div>
      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:24,fontWeight:900,color:G.green,textTransform:"uppercase",marginBottom:20}}>📋 Reglas de la Quiniela MFA Colaboradores</div>

      {seccion("Elegibilidad","🏢",[
        ["La Quiniela MFA Colaboradores es una dinámica exclusiva para colaboradores activos de Mayoreo Ferretería y Acabados (MFA) y El Colono.",""],
        ["Solo pueden participar personas que sean colaboradores activos al momento del registro.",""],
        ["Se permite un único registro por colaborador y por correo electrónico.",""],
        ["Al registrarse, el participante declara bajo su responsabilidad que es colaborador activo de MFA o El Colono.",""],
      ])}

      {seccion("Predicciones","🎯",[
        ["Las predicciones deben ingresarse antes del inicio oficial de cada partido según el horario de Costa Rica (UTC-6).",""],
        ["Una vez iniciado el partido, las predicciones quedan bloqueadas automáticamente y no pueden modificarse.",""],
        ["Los resultados oficiales son los publicados al finalizar el tiempo reglamentario (90 minutos). No se consideran prórrogas ni penales para la fase de grupos.",""],
        ["Las bonificaciones especiales (Campeón, Goleador, MVP) deben completarse antes del inicio del torneo (11 JUN).",""],
      ])}

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}} className="rules-grid">
        {seccion("Puntaje fase de grupos","📊",[
          ["Marcador exacto","5 pts"],
          ["Ganador o empate correcto","3 pts"],
          ["Diferencia de goles correcta","+1 pt"],
        ])}
        {seccion("Bonificaciones especiales","⭐",[
          ["Campeón del torneo","20 pts"],
          ["Goleador del torneo","10 pts"],
          ["MVP del torneo","10 pts"],
        ])}
      </div>

      {seccion("Conducta","🛡️",[
        ["Queda estrictamente prohibido el uso de herramientas automatizadas, bots o cualquier medio artificial para ingresar predicciones.",""],
        ["Cualquier intento de manipular el sistema, los resultados o el ranking será motivo de descalificación inmediata.",""],
        ["Las decisiones del administrador sobre descalificaciones o disputas son finales e inapelables.",""],
      ])}

      <div style={{background:"rgba(26,158,63,.06)",border:"1px solid rgba(26,158,63,.2)",borderRadius:12,padding:"16px 20px",fontSize:12,color:G.muted,lineHeight:1.7}}>
        <strong style={{color:G.green,display:"block",marginBottom:6}}>⚖️ Disposiciones generales</strong>
        La Quiniela MFA Colaboradores es una dinámica interna sin costo de participación, organizada por Mayoreo Ferretería y Acabados. La participación implica la aceptación total de estas reglas. Para consultas: <strong style={{color:"#fff"}}>lvillegasv@mfamayoreo.com</strong>
      </div>
    </div>
  );
}

// ─── CSS GLOBAL ───────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;600&family=Barlow+Condensed:wght@700;900&display=swap');
* { box-sizing: border-box; }
body { margin: 0; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }

@media (max-width: 768px) {
  .landing-grid { display: flex !important; flex-direction: column !important; }
  .banner-lateral { display: none !important; }
  .dashboard-grid { display: flex !important; flex-direction: column !important; }
  .dashboard-sidebar { display: none !important; }
  .tabs-row { display: flex !important; overflow-x: auto !important; flex-wrap: nowrap !important; -webkit-overflow-scrolling: touch !important; padding-bottom: 6px !important; gap: 6px !important; scrollbar-width: none !important; }
  .tabs-row::-webkit-scrollbar { display: none !important; }
  .tabs-row button { flex-shrink: 0 !important; padding: 8px 10px !important; font-size: 11px !important; }
  .header-pill { display: none !important; }
  .header-bar { padding-bottom: 12px !important; }
  .main-padding { padding: 12px !important; }
  .landing-info-grid { grid-template-columns: 1fr !important; }
  .predictions-grid { grid-template-columns: 1fr !important; }
  .predictions-header { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
  .predictions-filters { width: 100% !important; overflow-x: auto !important; flex-wrap: nowrap !important; scrollbar-width: none !important; }
  .predictions-filters::-webkit-scrollbar { display: none !important; }
  .results-stats { grid-template-columns: 1fr 1fr !important; }
  .result-row { grid-template-columns: 1fr !important; gap: 10px !important; }
  .result-scores { grid-template-columns: 1fr 1fr !important; }
  .standings-table { overflow-x: auto !important; }
  .standings-table table { min-width: 480px !important; }
  .standings-table th, .standings-table td { padding: 10px 10px !important; font-size: 12px !important; }
  .profile-grid { grid-template-columns: 1fr !important; }
  .profile-summary { grid-column: 1 !important; }
  .profile-stats { grid-template-columns: 1fr 1fr !important; }
  .profile-table { overflow-x: auto !important; }
  .profile-table table { min-width: 580px !important; }
  .chat-container { height: 70vh !important; }
  .admin-tabs { flex-wrap: wrap !important; }
  .admin-scores-grid { grid-template-columns: 1fr !important; }
  .admin-users-grid { grid-template-columns: 1fr !important; }
  .admin-user-detail { grid-template-columns: 1fr 1fr !important; }
  .admin-pred-table { overflow-x: auto !important; }
  .admin-pred-table table { min-width: 600px !important; }
  .admin-banners-grid { grid-template-columns: 1fr !important; }
  .rules-grid { grid-template-columns: 1fr !important; }
}
@media (min-width: 769px) and (max-width: 1024px) {
  .landing-grid { grid-template-columns: 160px 1fr !important; }
  .banner-lateral { display: none !important; }
  .landing-info-grid { grid-template-columns: 1fr 1fr !important; }
  .predictions-grid { grid-template-columns: 1fr 1fr !important; }
  .admin-users-grid { grid-template-columns: 1fr !important; }
  .profile-table { overflow-x: auto !important; }
  .profile-table table { min-width: 580px !important; }
}
`;
