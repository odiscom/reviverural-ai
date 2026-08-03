export const RVI_METRICS = {
  score: 87,
  change: "+4.8%",
  grantsSecured: "$4.82M",
  grantsSecuredCount: 14,
  microgridEnergy: "1.42 GWh",
  microgridOffset: "890 tons CO₂",
  cropYieldIncrease: "+18.5%",
  broadbandCoverage: "91.4%",
  activeBusinesses: 348,
  newJobsCreated: 124
};

export const GRANTS_DATA = [
  {
    id: "grant-1",
    title: "USDA REAP (Renewable Energy for America Program)",
    agency: "U.S. Department of Agriculture",
    category: "Clean Energy",
    amount: "Up to $1,000,000",
    matchReq: "25% Local Match",
    deadline: "2026-10-31",
    eligibility: "Rural Small Businesses & Agricultural Producers",
    description: "Financial assistance for agricultural producers and rural small business owners to purchase or install renewable energy systems or make energy efficiency improvements.",
    aiMatchScore: 98,
    status: "Open",
    keyFocus: ["Solar PV", "Anaerobic Digesters", "Energy Storage", "Irrigation Efficiency"],
    samplePrompt: "Draft a REAP grant executive summary for a 500kW community solar microgrid serving 120 family farms in Jasper County."
  },
  {
    id: "grant-2",
    title: "BEAD Rural Broadband Equity & Access Fund",
    agency: "NTIA / State Broadband Office",
    category: "Infrastructure",
    amount: "Up to $3,500,000",
    matchReq: "15% Local Match",
    deadline: "2026-11-15",
    eligibility: "Counties, Electric Co-ops, WISPs",
    description: "Funding last-mile high-speed fiber and fixed wireless expansion for unserved and underserved rural farming districts.",
    aiMatchScore: 94,
    status: "Open",
    keyFocus: ["Fiber to Farm", "5G Agricultural Nodes", "Digital Literacy", "Public Wi-Fi Hubs"],
    samplePrompt: "Generate a broadband infrastructure proposal for expanding 1Gbps fiber to 450 rural residences and agricultural sensors."
  },
  {
    id: "grant-3",
    title: "Rural Health Clinic Modernization & Telehealth Grant",
    agency: "HHS Health Resources & Services Administration",
    category: "Healthcare",
    amount: "Up to $750,000",
    matchReq: "0% Match Required",
    deadline: "2026-09-30",
    eligibility: "Rural Hospitals, Community Clinics, Non-profits",
    description: "Expand tele-triage kiosks, mobile diagnostic vans, and AI remote patient monitoring for rural counties lacking primary specialty care.",
    aiMatchScore: 91,
    status: "Open",
    keyFocus: ["Telehealth Kiosks", "Mobile Health Vans", "AI Diagnostics", "EHR Sync"],
    samplePrompt: "Write a grant application draft for establishing 4 AI Telehealth Kiosks in rural public libraries and senior centers."
  },
  {
    id: "grant-4",
    title: "USDA Value-Added Producer Grant (VAPG)",
    agency: "USDA Rural Development",
    category: "Agribusiness",
    amount: "Up to $250,000",
    matchReq: "50% Match",
    deadline: "2026-12-01",
    eligibility: "Independent Producers, Farmer Co-ops",
    description: "Helps agricultural producers generate value-added products, expand customer bases, and increase producer revenues.",
    aiMatchScore: 89,
    status: "Upcoming",
    keyFocus: ["Organic Processing", "Farm-to-Table Branding", "Craft Beverages", "Direct Marketing"],
    samplePrompt: "Create a VAPG business feasibility statement for an artisanal organic cheese and honey processing facility."
  },
  {
    id: "grant-5",
    title: "Main Street Revitalization & Heritage Tourism Fund",
    agency: "State Economic Development Authority",
    category: "Economic Revitalization",
    amount: "Up to $400,000",
    matchReq: "10% Local Match",
    deadline: "2026-10-15",
    eligibility: "Municipalities, Downtown Associations",
    description: "Restoration of historic storefronts, pedestrian lighting, electric vehicle chargers, and agri-tourism signage.",
    aiMatchScore: 86,
    status: "Open",
    keyFocus: ["Facade Grants", "EV Fast Chargers", "Wayfinding", "Artisan Pop-ups"],
    samplePrompt: "Draft a downtown Main Street grant application for historic building facade restoration and EV charging hubs."
  }
];

export const AGTECH_DATA = {
  currentSoil: {
    moisture: "42%",
    moistureStatus: "Optimal",
    nitrogen: "84 ppm (High)",
    phosphorus: "72 ppm (Balanced)",
    potassium: "195 ppm (Optimal)",
    ph: "6.7",
    organicMatter: "4.8%",
    temperature: "68°F"
  },
  weatherAlert: {
    temp: "74°F",
    condition: "Partly Cloudy with Evening Rain Forecasted",
    precipitation: "0.65 in expected",
    humidity: "62%",
    wind: "8 mph SW",
    recommendation: "Hold nitrogen fertilizer application until post-rain absorption window tomorrow morning."
  },
  cropDiagnoses: [
    {
      id: "diag-1",
      name: "Northern Corn Leaf Blight (Exserohilum turcicum)",
      severity: "Moderate",
      confidence: "96.4%",
      symptoms: "Elongated gray-green to tan lesions on lower leaves.",
      treatment: "Apply targeted triazole fungicide before tasseling; rotate with non-host crop next season.",
      imageKey: "crop_diagnostic"
    },
    {
      id: "diag-2",
      name: "Soybean Cyst Nematode / Potassium Deficiency",
      severity: "Low",
      confidence: "91.8%",
      symptoms: "Interveinal yellowing on leaf margins during peak pods.",
      treatment: "Side-dress potassium sulfate (K2SO4) at 40 lbs/acre; test soil nematode egg counts post-harvest.",
      imageKey: "crop_diagnostic"
    },
    {
      id: "diag-3",
      name: "Tractor Engine Diagnostic Code: P0420 (Exhaust Sensor)",
      severity: "Warning",
      confidence: "99.1%",
      symptoms: "DEF fluid heater circuit intermittent signal on John Deere 6R.",
      treatment: "Check DEF harness connection behind exhaust filter assembly; clean connector pins with contact cleaner.",
      imageKey: "farm_drone_hero"
    }
  ]
};

export const MICROGRID_DATA = {
  solarCapacityKw: 850,
  windCapacityKw: 420,
  batteryStorageMwh: 2.4,
  currentOutputKw: 1120,
  gridIndependencePercent: 88,
  annualSavingsUsd: 142000,
  co2ReducedTons: 890,
  nodes: [
    { name: "Jasper Central Ag Co-op Solar Array", capacity: "500 kW", status: "Active (Generating 480 kW)", health: 99 },
    { name: "Oak Ridge Wind Turbine Unit #1", capacity: "220 kW", status: "Active (Generating 195 kW)", health: 97 },
    { name: "Oak Ridge Wind Turbine Unit #2", capacity: "200 kW", status: "Active (Generating 180 kW)", health: 95 },
    { name: "County Hospital Emergency Battery Bank", capacity: "1.2 MWh", status: "Standby (100% Charge)", health: 100 },
    { name: "Prairie Water Pumping Station Solar", capacity: "150 kW", status: "Active (Generating 142 kW)", health: 98 }
  ]
};

export const MAIN_STREET_DATA = {
  businesses: [
    { id: "b1", name: "Heritage Valley Artisan Bakery & Mill", category: "Food & Craft", growth: "+24%", rating: 4.9, story: "Stone-ground heirloom wheat from local farms, fresh sourdough baked daily." },
    { id: "b2", name: "Timber & Farm Supply Co-op", category: "Agriculture & Retail", growth: "+18%", rating: 4.8, story: "Providing organic seed, custom hardware, and equipment rental to 3 counties." },
    { id: "b3", name: "Prairie Moon Craft Cidery", category: "Agri-Tourism", growth: "+35%", rating: 5.0, story: "Farm-to-glass orchard cidery hosting weekend live acoustic music and orchard tours." },
    { id: "b4", name: "Old Town Fiber & Weaving Guild", category: "Textiles & Crafts", growth: "+15%", rating: 4.9, story: "Handcrafted alpaca wool goods sourced directly from regional livestock farms." }
  ],
  upcomingEvents: [
    { name: "Annual Harvest & Agri-Tech Festival", date: "Sept 18-20, 2026", location: "Jasper Town Square", expectedAttendees: "3,500+" },
    { name: "Rural Maker & Artisan Night Market", date: "Oct 2, 2026", location: "Main Street Pedestrian Plaza", expectedAttendees: "1,200+" },
    { name: "Farm-to-Table Autumn Feast Trail", date: "Oct 17, 2026", location: "Valley Scenic Byway", expectedAttendees: "850+" }
  ]
};

export const RURAL_IQ_PROMPTS = [
  "How can our township qualify for a 100% USDA REAP clean energy grant?",
  "What is the best crop rotation strategy to maximize soil nitrogen in sandy clay loam?",
  "Generate a step-by-step roadmap for launching a rural broadband wireless co-op.",
  "Draft a promotional campaign for our town's upcoming Agri-Tourism Autumn Harvest festival.",
  "How do we setup an AI Telehealth Kiosk in our local rural library?"
];
