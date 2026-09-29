// Comprehensive Agricultural & Pathological Database for Tomato Leaf Diseases
// Matching the 10 Kaggle categories used in tomato.py

export const CATEGORIES = [
  "Tomato___Bacterial_spot",
  "Tomato___Early_blight",
  "Tomato___healthy",
  "Tomato___Late_blight",
  "Tomato___Leaf_Mold",
  "Tomato___Septoria_leaf_spot",
  "Tomato___Spider_mites Two-spotted_spider_mite",
  "Tomato___Target_Spot",
  "Tomato___Tomato_mosaic_virus",
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus"
];

export const DISEASE_INFO = {
  "Tomato___Bacterial_spot": {
    id: "Tomato___Bacterial_spot",
    name: "Bacterial Spot",
    scientificName: "Xanthomonas perforans / Xanthomonas campestris pv. vesicatoria",
    pathogenType: "Bacterial",
    severity: "High",
    riskColor: "#f59e0b",
    summary: "A devastating bacterial disease causing small, dark, water-soaked angular spots on foliage and scab-like lesions on tomato fruit.",
    symptoms: [
      "Small (under 3mm), dark brown-black circular or angular water-soaked spots on foliage.",
      "Lesions frequently surrounded by faint chlorotic (yellow) halos.",
      "In wet conditions, spots coalesce leading to extensive leaf blight and defoliation.",
      "Rough, raised, scab-like brown lesions on green and ripening fruits."
    ],
    causes: [
      "Warm temperatures between 24°C and 30°C (75°F - 86°F).",
      "Prolonged leaf wetness and high relative humidity (>85%).",
      "Spread via overhead sprinkler splashing, infected seeds, or contaminated pruning tools."
    ],
    organicControl: [
      "Apply preventative Fixed Copper sprays (copper octanoate / copper hydroxide) combined with Bacillus subtilis.",
      "Practice strict sanitization: dip pruning shears in 70% isopropyl alcohol or 10% bleach between plants.",
      "Remove and incinerate heavily infected lower branches immediately (never compost infected foliage)."
    ],
    chemicalControl: [
      "Copper hydroxide + Mancozeb tank mix (provides synergistic control of copper-tolerant strains).",
      "Bactericides containing Streptomycin or Kasugamycin (where permitted by regional agricultural regulations).",
      "Actigard (Acibenzolar-S-methyl) plant defense inducer applied early in vegetative stage."
    ],
    prevention: [
      "Use certified disease-free, hot-water treated tomato seeds.",
      "Switch exclusively to drip or furrow irrigation to keep foliage completely dry.",
      "Implement a minimum 2-3 year crop rotation away from Solanaceae (tomatoes, peppers, potatoes, eggplants)."
    ]
  },

  "Tomato___Early_blight": {
    id: "Tomato___Early_blight",
    name: "Early Blight",
    scientificName: "Alternaria solani",
    pathogenType: "Fungal",
    severity: "Moderate to High",
    riskColor: "#f97316",
    summary: "Common fungal disease recognizable by distinct dark brown concentric target rings surrounded by bright yellow halos, starting on older leaves.",
    symptoms: [
      "Concentric circular rings resembling a 'target board' or 'bullseye' pattern.",
      "Prominent yellow chlorotic halo around each brown necrotic lesion.",
      "Begins on older leaves closest to the soil and progresses systematically upward.",
      "Stem cankers: dark, sunken, concentric oval lesions near the soil line ('collar rot')."
    ],
    causes: [
      "Warm temperatures between 24°C - 29°C (75°F - 84°F).",
      "Alternating wet and dry cycles (heavy dews followed by warm sunny afternoons).",
      "Fungal spores overwintering in soil debris and splashing onto lower foliage."
    ],
    organicControl: [
      "Prune all leaves within 12-18 inches of the soil line to eliminate splash inoculation.",
      "Apply organic bio-fungicides containing Bacillus amyloliquefaciens (Serenade) or Trichoderma harzianum.",
      "Mulch heavily around tomato bases with clean straw, plastic sheeting, or wood chips to create a splash barrier."
    ],
    chemicalControl: [
      "Chlorothalonil (Bravo, Daconil) applied preventatively at first sign of disease.",
      "Azoxystrobin (Quadris) or Pyraclostrobin (Cabrio) strobilurin fungicides.",
      "Difenoconazole + Azoxystrobin (Amistar Top) for strong systemic curative action."
    ],
    prevention: [
      "Maintain adequate plant spacing (at least 60 cm / 24 in) and stake plants for maximum airflow.",
      "Ensure balanced soil nutrition: avoid nitrogen deficiency which predisposes leaves to early blight.",
      "3-year crop rotation with non-solanaceous crops (e.g., legumes, brassicas, sweet corn)."
    ]
  },

  "Tomato___Late_blight": {
    id: "Tomato___Late_blight",
    name: "Late Blight",
    scientificName: "Phytophthora infestans",
    pathogenType: "Oomycete / Water Mold",
    severity: "Critical",
    riskColor: "#ef4444",
    summary: "One of the most destructive agricultural plant diseases in history. Can collapse an entire tomato crop within days during cool, humid conditions.",
    symptoms: [
      "Large, irregular, water-soaked pale to greasy dark greenish-brown lesions.",
      "Rapidly spreading necrosis across leaf surface without clear margins.",
      "Delicate white cottony/downy mold sporulation visible on the undersides of leaves during high humidity.",
      "Dark brown to black lesions on petioles and stems causing rapid vine collapse."
    ],
    causes: [
      "Cool to moderate temperatures (15°C to 22°C / 60°F - 72°F).",
      "Relative humidity exceeding 90% or persistent rainfall and dense fog.",
      "Wind-blown airborne sporangia that can travel several miles from neighboring infected fields."
    ],
    organicControl: [
      "Copper soap (copper octanoate) applied immediately before predicted prolonged rains.",
      "Immediate total rogueing: pull out severely infected plants, bag them in plastic on-site, and dispose in landfill.",
      "Never allow cull piles or volunteer tomatoes to survive near production fields."
    ],
    chemicalControl: [
      "Mandipropamid (Revus) or Cyazofamid (Ranman) - highly effective oomycete specific active ingredients.",
      "Fluopicolide (Presidio) or Propamocarb (Previcur Flex) tank-mixed with protectant Chlorothalonil.",
      "Dimethomorph (Acrobat) with 7-day application intervals during high epidemic pressure."
    ],
    prevention: [
      "Plant resistant cultivars (such as 'Defiant Ph-R', 'Mountain Merit', 'Mountain Magic', 'Plum Regal').",
      "Avoid planting adjacent to potato fields (the primary alternate host for Phytophthora).",
      "Monitor regional agricultural extension weather alerts and disease forecast models (e.g. BlightCast)."
    ]
  },

  "Tomato___Leaf_Mold": {
    id: "Tomato___Leaf_Mold",
    name: "Leaf Mold",
    scientificName: "Passalora fulva (formerly Cladosporium fulvum)",
    pathogenType: "Fungal",
    severity: "Moderate",
    riskColor: "#eab308",
    summary: "A common greenhouse and high-tunnel problem characterized by pale yellow patches on top of the leaf with velvety olive-green mold underneath.",
    symptoms: [
      "Pale green to yellowish indistinct chlorotic patches on the upper leaf surface.",
      "Rich olive-green to grayish-brown velvety fungal mold coating the matching underside of the leaf.",
      "Infected leaves eventually turn yellowish-brown, curl, wither, and drop prematurely.",
      "Blossom drop and reduced fruit set if severe defoliation occurs."
    ],
    causes: [
      "High relative humidity (>85%) combined with warm ambient temperatures (20°C - 25°C / 68°F - 77°F).",
      "Poor air circulation inside enclosed greenhouses, high tunnels, or overly dense canopies.",
      "Free water on leaves is not required; high ambient air moisture alone is sufficient for germination."
    ],
    organicControl: [
      "Vigorously improve ventilation: run exhaust fans, open side vents, and prune suckers to promote air currents.",
      "Apply potassium bicarbonate (Armicarb / MilStop) or horticultural sulfur to lower leaf undersides.",
      "Reduce planting density to ensure sun penetration through the lower canopy."
    ],
    chemicalControl: [
      "Chlorothalonil or Mancozeb preventative sprays on both upper and lower leaf surfaces.",
      "Cyprodinil + Fludioxonil (Switch) or Boscalid (Endura) for targeted greenhouse mold suppression.",
      "Triazole fungicides such as Difenoconazole where registered."
    ],
    prevention: [
      "Select greenhouse tomato varieties carrying specific Cf resistance genes (Cf-2, Cf-4, Cf-9).",
      "Heat greenhouses slightly at sunset while venting to lower relative humidity below 80%.",
      "Sanitize greenhouse structures, trellises, and support strings thoroughly between cropping cycles."
    ]
  },

  "Tomato___Septoria_leaf_spot": {
    id: "Tomato___Septoria_leaf_spot",
    name: "Septoria Leaf Spot",
    scientificName: "Septoria lycopersici",
    pathogenType: "Fungal",
    severity: "High",
    riskColor: "#ea580c",
    summary: "Pervasive fungal leaf spot distinguished by numerous small circular spots with ashen-gray centers and dark brown margins dotted with tiny black pycnidia.",
    symptoms: [
      "Hundreds of small (1.5mm - 3mm) circular spots with distinct dark brown margins and whitish/ash-gray centers.",
      "Under magnification, tiny pepper-like black specks (pycnidia fruiting bodies) are visible in spot centers.",
      "Leaves turn yellow and fall off starting strictly from the base of the plant upward.",
      "Exposes developing tomato fruits to severe sunscald due to heavy canopy defoliation."
    ],
    causes: [
      "Temperatures between 20°C and 26°C (68°F - 78°F).",
      "Wet foliage from rain, dew, or overhead sprinklers for prolonged periods.",
      "Fungal spores overwintering on Solanaceous weed hosts (such as horsenettle or nightshade)."
    ],
    organicControl: [
      "Apply liquid copper fungicide every 7 to 10 days starting at transplanting.",
      "Strip lower leaves 1-2 feet up from ground level once the plant has established 4-5 fruit clusters.",
      "Apply 3 to 4 inches of organic mulch (straw, untreated grass clippings) to suppress spore splash."
    ],
    chemicalControl: [
      "Chlorothalonil (Daconil 2787) applied before symptoms become widespread.",
      "Pyraclostrobin (Cabrio EG) or Azoxystrobin (Heritage) in rotation with multi-site protectants.",
      "Boscalid (Endura) applied during flowering and fruit sizing."
    ],
    prevention: [
      "Eradicate horsenettle, black nightshade, and groundcherry weeds within 100 feet of the field.",
      "Never work in or cultivate the tomato patch while the foliage is wet from rain or morning dew.",
      "Deeply plow or bury all crop residue post-harvest to accelerate fungal decomposition."
    ]
  },

  "Tomato___Spider_mites Two-spotted_spider_mite": {
    id: "Tomato___Spider_mites Two-spotted_spider_mite",
    name: "Spider Mites (Two-spotted)",
    scientificName: "Tetranychus urticae",
    pathogenType: "Pest / Arachnid",
    severity: "High",
    riskColor: "#d97706",
    summary: "Microscopic arachnid pests that pierce leaf cells to suck out sap, causing dense yellow stippling, bronze discoloration, and fine silken webs.",
    symptoms: [
      "Fine yellow, white, or bronze speckling (stippling) on the upper surface of leaflets.",
      "Fine silken webbing spun across leaf axils, flower trusses, and undersides of leaves.",
      "Leaves turn completely dry, pale parchment-like, brittle, and drop off in severe infestations.",
      "Colonies of tiny yellow-green eight-legged mites with two dark dorsal spots crawling on leaf undersides."
    ],
    causes: [
      "Hot, dry, dusty conditions (temperatures above 30°C / 86°F).",
      "Overuse of broad-spectrum pyrethroid insecticides that kill natural predatory insects and mites.",
      "Water-stressed plants are especially vulnerable to explosive population booms."
    ],
    organicControl: [
      "Release predatory mites: Phytoseiulus persimilis or Neoseiulus californicus at early detection.",
      "Spray cold-pressed pure Neem Oil (0.5% - 1.0%) or insecticidal potassium soaps targeting leaf undersides.",
      "Spray high-pressure water streams on lower canopy to dislodge mite webbing and disrupt colonies."
    ],
    chemicalControl: [
      "Abamectin (Agri-Mek) translaminar miticide targeting all mobile life stages.",
      "Bifenazate (Acramite) or Spiromesifen (Oberon) offering long residual mite control.",
      "Etoxazole or Hexythiazox ovicides to disrupt egg and nymph hatching cycles."
    ],
    prevention: [
      "Keep garden pathways moist or grass-covered to minimize road dust that discourages predators.",
      "Ensure regular, adequate irrigation to avoid plant water stress.",
      "Isolate and inspect greenhouse transplants thoroughly before introduction."
    ]
  },

  "Tomato___Target_Spot": {
    id: "Tomato___Target_Spot",
    name: "Target Spot",
    scientificName: "Corynespora cassiicola",
    pathogenType: "Fungal",
    severity: "Moderate to High",
    riskColor: "#b45309",
    summary: "Fungal disease causing pinpoint to larger brown circular lesions with concentric rings, attacking leaves, stems, and fruits.",
    symptoms: [
      "Small circular brown lesions that enlarge up to 10mm with light brown centers and dark margins.",
      "Zonate concentric rings similar to early blight, but usually smaller and more numerous.",
      "Lesions do not always display the distinct bright yellow halo of Alternaria solani.",
      "Dark sunken crater-like spots on green and ripe tomato fruit."
    ],
    causes: [
      "Warm to high temperatures (20°C - 32°C / 68°F - 90°F).",
      "Frequent rains, high humidity (>80%), or persistent heavy fog.",
      "Wide host range including cucumbers, soybeans, cotton, and papaya."
    ],
    organicControl: [
      "Copper octanoate or copper sulfate pentahydrate applied at 7-day intervals.",
      "Biofungicides containing Bacillus subtilis (Companion or Serenade ASO).",
      "Prune dense inner foliage to facilitate UV sunlight penetration and fast canopy drying."
    ],
    chemicalControl: [
      "Fluopyram + Trifloxystrobin (Luna Sensation) or Pyraclostrobin + Boscalid (Pristine).",
      "Chlorothalonil + Mancozeb broad-spectrum rotation.",
      "Famoxadone + Cymoxanil (Tanos) for disease knockdown."
    ],
    prevention: [
      "Avoid planting tomatoes adjacent to cucurbits, soybeans, or cotton.",
      "Ensure wide plant spacing and keep lower canopy pruned.",
      "Burn or deeply bury post-harvest vines to destroy overwintering chlamydospores."
    ]
  },

  "Tomato___Tomato_mosaic_virus": {
    id: "Tomato___Tomato_mosaic_virus",
    name: "Tomato Mosaic Virus (ToMV)",
    scientificName: "Tomato mosaic virus (Tobamovirus)",
    pathogenType: "Viral",
    severity: "High",
    riskColor: "#8b5cf6",
    summary: "Extremely stable and easily transmissible plant virus causing mosaic mottling, leaflet distortion ('shoestringing'), and internal fruit browning.",
    symptoms: [
      "Mottling of alternating light green and dark green patches on leaflets.",
      "Blister-like raised dark green areas and leaf puckering or deformation.",
      "Fern-leaf or 'shoestring' symptom: leaf blades become severely narrowed and ribbon-like.",
      "Internal brown browning (vascular necrosis) inside fruit flesh ('internal browning')."
    ],
    causes: [
      "Mechanical transmission: touch from hands, garden tools, clothing, machinery, or plant-to-plant contact.",
      "Tobacco products: smokers can transmit the virus from tobacco shreds directly to tomato leaves.",
      "Infected seeds and soil containing root debris from previous crops."
    ],
    organicControl: [
      "No chemical or biological cure exists once a plant is infected with ToMV.",
      "Immediately rogue and discard infected plants; do not allow infected foliage to touch healthy vines.",
      "Wash hands thoroughly with soap and 20% skim milk before handling plants (milk proteins denature viral capsids)."
    ],
    chemicalControl: [
      "Viricides do not exist for plant viruses.",
      "Disinfect pruning knives and tools between plants with Trisodium phosphate (TSP) 10% solution or 20% non-fat dry milk solution.",
      "Avoid chemical sprays that create leaf abrasions and ease viral entry."
    ],
    prevention: [
      "Plant TMV/ToMV resistant cultivars (look for 'T' or 'ToMV' designation on seed packets).",
      "Strict prohibition of tobacco use near tomato growing areas.",
      "Use certified heat-treated or bleach-treated seeds."
    ]
  },

  "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
    id: "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    name: "Tomato Yellow Leaf Curl Virus (TYLCV)",
    scientificName: "Tomato yellow leaf curl virus (Begomovirus)",
    pathogenType: "Viral",
    severity: "Critical",
    riskColor: "#a855f7",
    summary: "Devastating viral disease transmitted by the sweetpotato whitefly, causing dramatic upward leaf curling, severe stunting, and near total yield loss.",
    symptoms: [
      "Pronounced upward and inward rolling/cupping of leaf margins.",
      "Interveinal chlorosis (intense yellowing) particularly pronounced on young emerging leaves.",
      "Severe stunting and bushy 'bonsai-like' plant architecture with shortened internodes.",
      "Flowers abort and drop off, resulting in virtually no fruit formation if infected young."
    ],
    causes: [
      "Transmitted exclusively by the Sweetpotato Whitefly (Bemisia tabaci).",
      "A whitefly needs only 15-30 minutes of feeding on an infected plant to acquire and spread the virus.",
      "Warm, dry tropical and subtropical climates favoring huge whitefly population blooms."
    ],
    organicControl: [
      "Use 50-mesh fine insect exclusion netting on high tunnels and greenhouses to physically exclude whiteflies.",
      "Hang bright Yellow Sticky Cards throughout the canopy to monitor and mass-trap adult whiteflies.",
      "Spray Beauveria bassiana (entomopathogenic fungus) or insecticidal soap to control whitefly nymphs on leaf undersides."
    ],
    chemicalControl: [
      "Systemic neonicotinoids or diamides (e.g., Dinotefuran, Thiamethoxam, Cyantraniliprole) at planting.",
      "Spirotetramat (Movento) or Pyriproxyfen insect growth regulators to interrupt whitefly reproduction.",
      "Flupyradifurone (Sivanto Prime) fast feeding blocker to stop virus transmission."
    ],
    prevention: [
      "Choose resistant or tolerant tomato hybrids (such as 'Charger', 'Tycoon', 'Inbar', 'Sakura').",
      "Implement a 2-month host-free crop break in the region to crash whitefly populations.",
      "Rogue out and destroy volunteer plants and weed reservoirs (like mallow, jimsonweed)."
    ]
  },

  "Tomato___healthy": {
    id: "Tomato___healthy",
    name: "Healthy Tomato Plant",
    scientificName: "Solanum lycopersicum",
    pathogenType: "None (Healthy)",
    severity: "None",
    riskColor: "#10b981",
    summary: "The plant exhibits optimal physiological health with deep green foliage, robust vascular turgor, clean margins, and no visible pathological lesions.",
    symptoms: [
      "Uniform, rich emerald green coloration without chlorosis or yellowing.",
      "Crisp, well-defined serrated leaf margins free from necrosis, spots, or scorching.",
      "Strong turgid leaf petioles and healthy pubescence (fine glandular trichome hairs).",
      "No insect stippling, honeydew excretion, or fungal mycelium."
    ],
    causes: [
      "Optimal balance of sunlight (6-8+ hours direct sun), moisture, and temperature.",
      "Nutrient balance: balanced N-P-K with adequate calcium and magnesium.",
      "Proper soil drainage with pH between 6.2 and 6.8."
    ],
    organicControl: [
      "Maintain active soil biology with well-rotted compost, worm castings, and mycorrhizal fungi.",
      "Apply foliar kelp/seaweed extract monthly to strengthen cell walls against abiotic stress.",
      "Companion plant with basil, marigolds, and alliums to deter aphids and thrips naturally."
    ],
    chemicalControl: [
      "No chemical pesticides needed! Routine maintenance only.",
      "Apply calcium nitrate or gypsum if blossom end rot prevention is needed on heavy fruiting crops.",
      "Ensure balanced micronutrient fertilization (zinc, boron, iron)."
    ],
    prevention: [
      "Continue consistent deep drip watering at the soil level early in the morning.",
      "Keep bottom 12 inches of stems pruned to maintain good air circulation and prevent soil splash.",
      "Inspect leaf undersides weekly for early detection of any emerging pest or fungal pressures."
    ]
  }
};
