
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Map ESPN team abbreviations → your matchList codes
const ESPN_TO_CODE = {
  // Group A
  "MEX": "MEX", "ZAF": "RSA", "KOR": "KOR", "CZE": "CZE",
  // Group B
  "CAN": "CAN", "BIH": "BIH", "QAT": "QAT", "SUI": "SUI",
  // Group C
  "BRA": "BRA", "MAR": "MAR", "HTI": "HAI", "SCO": "SCO",
  // Group D
  "USA": "USA", "PRY": "PAR", "AUS": "AUS", "TUR": "TUR",
  // Group E
  "GER": "GER", "CUW": "CUW", "CIV": "CIV", "ECU": "ECU",
  // Group F
  "NED": "NED", "JPN": "JPN", "TUN": "TUN", "SWE": "SWE",
  // Group G
  "BEL": "BEL", "EGY": "EGY", "IRN": "IRN", "NZL": "NZL",
  // Group H
  "ESP": "ESP", "CPV": "CPV", "KSA": "KSA", "URU": "URU",
  // Group I
  "FRA": "FRA", "SEN": "SEN", "IRQ": "IRQ", "NOR": "NOR",
  // Group J
  "ARG": "ARG", "ALG": "ALG", "AUT": "AUT", "JOR": "JOR",
  // Group K
  "POR": "POR", "COD": "COD", "UZB": "UZB", "COL": "COL",
  // Group L
  "ENG": "ENG", "CRO": "CRO", "GHA": "GHA", "PAN": "PAN",
};

// Your match list: id, home code, away code
const MATCHES = [
  {id:1,home:"MEX",away:"RSA"},{id:2,home:"KOR",away:"CZE"},
  {id:3,home:"CAN",away:"BIH"},{id:4,home:"USA",away:"PAR"},
  {id:5,home:"QAT",away:"SUI"},{id:6,home:"BRA",away:"MAR"},
  {id:7,home:"HAI",away:"SCO"},{id:8,home:"AUS",away:"TUR"},
  {id:9,home:"GER",away:"CUW"},{id:10,home:"NED",away:"JPN"},
  {id:11,home:"CIV",away:"ECU"},{id:12,home:"TUN",away:"SWE"},
  {id:13,home:"ESP",away:"CPV"},{id:14,home:"BEL",away:"EGY"},
  {id:15,home:"KSA",away:"URU"},{id:16,home:"IRN",away:"NZL"},
  {id:17,home:"FRA",away:"SEN"},{id:18,home:"IRQ",away:"NOR"},
  {id:19,home:"ARG",away:"ALG"},{id:20,home:"AUT",away:"JOR"},
  {id:21,home:"POR",away:"COD"},{id:22,home:"ENG",away:"CRO"},
  {id:23,home:"GHA",away:"PAN"},{id:24,home:"UZB",away:"COL"},
  {id:25,home:"CZE",away:"RSA"},{id:26,home:"SUI",away:"BIH"},
  {id:27,home:"CAN",away:"QAT"},{id:28,home:"MEX",away:"KOR"},
  {id:29,home:"USA",away:"AUS"},{id:30,home:"SCO",away:"MAR"},
  {id:31,home:"BRA",away:"HAI"},{id:32,home:"TUR",away:"PAR"},
  {id:33,home:"NED",away:"SWE"},{id:34,home:"GER",away:"CIV"},
  {id:35,home:"ECU",away:"CUW"},{id:36,home:"TUN",away:"JPN"},
  {id:37,home:"ESP",away:"KSA"},{id:38,home:"BEL",away:"IRN"},
  {id:39,home:"URU",away:"CPV"},{id:40,home:"NZL",away:"EGY"},
  {id:41,home:"ARG",away:"AUT"},{id:42,home:"FRA",away:"IRQ"},
  {id:43,home:"NOR",away:"SEN"},{id:44,home:"JOR",away:"ALG"},
  {id:45,home:"POR",away:"UZB"},{id:46,home:"ENG",away:"GHA"},
  {id:47,home:"PAN",away:"CRO"},{id:48,home:"COL",away:"COD"},
  {id:49,home:"SUI",away:"CAN"},{id:50,home:"BIH",away:"QAT"},
  {id:51,home:"BRA",away:"SCO"},{id:52,home:"MAR",away:"HAI"},
  {id:53,home:"MEX",away:"CZE"},{id:54,home:"KOR",away:"RSA"},
  {id:55,home:"ECU",away:"GER"},{id:56,home:"CUW",away:"CIV"},
  {id:57,home:"TUN",away:"NED"},{id:58,home:"JPN",away:"SWE"},
  {id:59,home:"USA",away:"TUR"},{id:60,home:"PAR",away:"AUS"},
  {id:61,home:"NOR",away:"FRA"},{id:62,home:"SEN",away:"IRQ"},
  {id:63,home:"URU",away:"ESP"},{id:64,home:"CPV",away:"KSA"},
  {id:65,home:"NZL",away:"BEL"},{id:66,home:"EGY",away:"IRN"},
  {id:67,home:"PAN",away:"ENG"},{id:68,home:"CRO",away:"GHA"},
  {id:69,home:"COL",away:"POR"},{id:70,home:"COD",away:"UZB"},
  {id:71,home:"ARG",away:"JOR"},{id:72,home:"ALG",away:"AUT"},
];

module.exports = async (req, res) => {
  try {
    // Fetch ESPN scoreboard
    const espnRes = await fetch(
      "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard"
    );
    const espnData = await espnRes.json();
    const events = espnData.events || [];

    let updated = 0;
    let skipped = 0;

    for (const event of events) {
      const competition = event.competitions?.[0];
      if (!competition) continue;

      // Only process completed matches
      const status = competition.status?.type?.name;
      if (status !== "STATUS_FINAL") { skipped++; continue; }

      const competitors = competition.competitors || [];
      if (competitors.length < 2) continue;

      // ESPN returns home/away competitors
      const homeComp = competitors.find(c => c.homeAway === "home");
      const awayComp = competitors.find(c => c.homeAway === "away");
      if (!homeComp || !awayComp) continue;

      const espnHome = homeComp.team?.abbreviation?.toUpperCase();
      const espnAway = awayComp.team?.abbreviation?.toUpperCase();
      const homeScore = parseInt(homeComp.score);
      const awayScore = parseInt(awayComp.score);

      if (isNaN(homeScore) || isNaN(awayScore)) continue;

      // Map ESPN codes to your codes
      const myHome = ESPN_TO_CODE[espnHome];
      const myAway = ESPN_TO_CODE[espnAway];
      if (!myHome || !myAway) continue;

      // Find match in your list
      const match = MATCHES.find(m => m.home === myHome && m.away === myAway);
      if (!match) continue;

      // Check if already published with same score
      const { data: existing } = await supabase
        .from("resultados")
        .select("home, away, published")
        .eq("match_id", match.id)
        .maybeSingle();

      if (existing?.published && existing.home === homeScore && existing.away === awayScore) {
        skipped++;
        continue; // already published, skip
      }

      // Upsert result and publish
      const { error } = await supabase.from("resultados").upsert({
        match_id: match.id,
        home: homeScore,
        away: awayScore,
        locked: true,
        published: true,
        updated_at: new Date().toISOString(),
      }, { onConflict: "match_id" });

      if (!error) updated++;
    }

    return res.status(200).json({
      ok: true,
      updated,
      skipped,
      total_events: events.length,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("update-scores error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
};
