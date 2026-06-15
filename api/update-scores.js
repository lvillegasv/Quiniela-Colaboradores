import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Mapa ESPN team abbreviation → nuestro código
const ESPN_TO_CODE = {
  "MEX":"MEX","RSA":"RSA","KOR":"KOR","CZE":"CZE","CAN":"CAN","BIH":"BIH",
  "QAT":"QAT","SUI":"SUI","BRA":"BRA","MAR":"MAR","HAI":"HAI","SCO":"SCO",
  "USA":"USA","PAR":"PAR","AUS":"AUS","TUR":"TUR","GER":"GER","CUW":"CUW",
  "CIV":"CIV","ECU":"ECU","NED":"NED","JPN":"JPN","SWE":"SWE","TUN":"TUN",
  "BEL":"BEL","EGY":"EGY","IRN":"IRN","NZL":"NZL","ESP":"ESP","CPV":"CPV",
  "KSA":"KSA","URU":"URU","FRA":"FRA","SEN":"SEN","IRQ":"IRQ","NOR":"NOR",
  "ARG":"ARG","ALG":"ALG","AUT":"AUT","JOR":"JOR","POR":"POR","COD":"COD",
  "UZB":"UZB","COL":"COL","ENG":"ENG","CRO":"CRO","GHA":"GHA","PAN":"PAN",
  // Variantes ESPN
  "CHE":"SUI","CZE":"CZE","NLD":"NED","DEU":"GER","FRA":"FRA","BEL":"BEL",
  "ARG":"ARG","BRA":"BRA","ESP":"ESP","PRT":"POR","ENG":"ENG","SCO":"SCO",
  "SWE":"SWE","NOR":"NOR","URU":"URU","COL":"COL","ECU":"ECU","PAR":"PAR",
  "CRC":"CRC","BOL":"BOL","CHI":"CHI","PER":"PER",
};

// Nuestros partidos — home/away en orden
const MATCH_LIST = [
  {id:1,home:"MEX",away:"RSA"},{id:2,home:"KOR",away:"CZE"},{id:3,home:"CAN",away:"BIH"},
  {id:4,home:"USA",away:"PAR"},{id:5,home:"QAT",away:"SUI"},{id:6,home:"BRA",away:"MAR"},
  {id:7,home:"HAI",away:"SCO"},{id:8,home:"AUS",away:"TUR"},{id:9,home:"GER",away:"CUW"},
  {id:10,home:"NED",away:"JPN"},{id:11,home:"CIV",away:"ECU"},{id:12,home:"TUN",away:"SWE"},
  {id:13,home:"ESP",away:"CPV"},{id:14,home:"BEL",away:"EGY"},{id:15,home:"KSA",away:"URU"},
  {id:16,home:"IRN",away:"NZL"},{id:17,home:"FRA",away:"SEN"},{id:18,home:"IRQ",away:"NOR"},
  {id:19,home:"ARG",away:"ALG"},{id:20,home:"AUT",away:"JOR"},{id:21,home:"POR",away:"COD"},
  {id:22,home:"ENG",away:"CRO"},{id:23,home:"GHA",away:"PAN"},{id:24,home:"UZB",away:"COL"},
  {id:25,home:"CZE",away:"RSA"},{id:26,home:"SUI",away:"BIH"},{id:27,home:"CAN",away:"QAT"},
  {id:28,home:"MEX",away:"KOR"},{id:29,home:"USA",away:"AUS"},{id:30,home:"SCO",away:"MAR"},
  {id:31,home:"BRA",away:"HAI"},{id:32,home:"TUR",away:"PAR"},{id:33,home:"NED",away:"SWE"},
  {id:34,home:"GER",away:"CIV"},{id:35,home:"ECU",away:"CUW"},{id:36,home:"TUN",away:"JPN"},
  {id:37,home:"ESP",away:"KSA"},{id:38,home:"BEL",away:"IRN"},{id:39,home:"URU",away:"CPV"},
  {id:40,home:"NZL",away:"EGY"},{id:41,home:"ARG",away:"AUT"},{id:42,home:"FRA",away:"IRQ"},
  {id:43,home:"NOR",away:"SEN"},{id:44,home:"JOR",away:"ALG"},{id:45,home:"POR",away:"UZB"},
  {id:46,home:"ENG",away:"GHA"},{id:47,home:"PAN",away:"CRO"},{id:48,home:"COL",away:"COD"},
  {id:49,home:"SUI",away:"CAN"},{id:50,home:"BIH",away:"QAT"},{id:51,home:"BRA",away:"SCO"},
  {id:52,home:"MAR",away:"HAI"},{id:53,home:"MEX",away:"CZE"},{id:54,home:"KOR",away:"RSA"},
  {id:55,home:"ECU",away:"GER"},{id:56,home:"CUW",away:"CIV"},{id:57,home:"TUN",away:"NED"},
  {id:58,home:"JPN",away:"SWE"},{id:59,home:"USA",away:"TUR"},{id:60,home:"PAR",away:"AUS"},
  {id:61,home:"NOR",away:"FRA"},{id:62,home:"SEN",away:"IRQ"},{id:63,home:"URU",away:"ESP"},
  {id:64,home:"CPV",away:"KSA"},{id:65,home:"NZL",away:"BEL"},{id:66,home:"EGY",away:"IRN"},
  {id:67,home:"PAN",away:"ENG"},{id:68,home:"CRO",away:"GHA"},{id:69,home:"COL",away:"POR"},
  {id:70,home:"COD",away:"UZB"},{id:71,home:"ARG",away:"JOR"},{id:72,home:"ALG",away:"AUT"},
];

export default async function handler(req, res) {
  try {
    // Obtener scoreboard ESPN del Mundial 2026
    const url = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard";
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    if (!response.ok) {
      return res.status(200).json({ ok: false, error: "ESPN no disponible" });
    }

    const data = await response.json();
    const events = data.events || [];

    let updated = 0;
    let published = 0;

    for (const event of events) {
      const comp = event.competitions?.[0];
      if (!comp) continue;

      const competitors = comp.competitors || [];
      if (competitors.length < 2) continue;

      // ESPN: home es index 0, away es index 1
      const homeComp = competitors.find(c => c.homeAway === "home") || competitors[0];
      const awayComp = competitors.find(c => c.homeAway === "away") || competitors[1];

      const homeAbbr = homeComp.team?.abbreviation?.toUpperCase();
      const awayAbbr = awayComp.team?.abbreviation?.toUpperCase();
      const homeCode = ESPN_TO_CODE[homeAbbr] || homeAbbr;
      const awayCode = ESPN_TO_CODE[awayAbbr] || awayAbbr;

      // Buscar el partido en nuestra lista
      const match = MATCH_LIST.find(m =>
        (m.home === homeCode && m.away === awayCode) ||
        (m.home === awayCode && m.away === homeCode)
      );
      if (!match) continue;

      const homeScore = parseInt(homeComp.score) || 0;
      const awayScore = parseInt(awayComp.score) || 0;

      // Si los equipos están invertidos, invertir scores
      const isInverted = match.home === awayCode;
      const finalHome = isInverted ? awayScore : homeScore;
      const finalAway = isInverted ? homeScore : awayScore;

      const status = event.status?.type;
      const isLive = status?.state === "in";
      const isCompleted = status?.completed === true;

      // Verificar si ya está publicado en nuestra DB
      const { data: existing } = await supabase
        .from("resultados")
        .select("published, locked")
        .eq("match_id", match.id)
        .maybeSingle();

      // Si ya está publicado, no tocar
      if (existing?.published) continue;

      if (isLive || isCompleted) {
        const upsertData = {
          match_id: match.id,
          home: finalHome,
          away: finalAway,
          locked: true,
          updated_at: new Date().toISOString(),
        };

        if (isCompleted) {
          upsertData.published = true;
          published++;
        }

        await supabase
          .from("resultados")
          .upsert(upsertData, { onConflict: "match_id" });

        updated++;
      }
    }

    return res.status(200).json({
      ok: true,
      message: `Procesados: ${events.length} eventos. Actualizados: ${updated}. Publicados: ${published}.`,
      timestamp: new Date().toISOString(),
    });

  } catch (err) {
    return res.status(200).json({ ok: false, error: err.message });
  }
}
