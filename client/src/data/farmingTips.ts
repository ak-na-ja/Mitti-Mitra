export interface FarmingTip {
  id: string;
  category: 'planting' | 'irrigation' | 'pest' | 'fertilizer' | 'harvest';
  icon: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  crops: string[];
  regions: string[];
  season?: string;
}

export const farmingTips: FarmingTip[] = [
  {
    id: 'wheat-planting-winter',
    category: 'planting',
    icon: 'sprout',
    title: { en: 'Wheat Planting Time', hi: 'गेहूं की बुवाई का समय' },
    description: { 
      en: 'Best time to plant wheat is mid-November. Ensure soil temperature is 18-20°C for optimal germination.',
      hi: 'गेहूं बोने का सबसे अच्छा समय नवंबर का मध्य है। इष्टतम अंकुरण के लिए मिट्टी का तापमान 18-20°C होना चाहिए।'
    },
    crops: ['wheat'],
    regions: ['punjab', 'haryana', 'up'],
    season: 'winter',
  },
  {
    id: 'rice-irrigation',
    category: 'irrigation',
    icon: 'droplets',
    title: { en: 'Rice Water Management', hi: 'चावल जल प्रबंधन' },
    description: {
      en: 'Maintain 2-3 inches of standing water for first 10 days after transplanting. Drain field 7-10 days before harvest.',
      hi: 'रोपाई के बाद पहले 10 दिनों के लिए 2-3 इंच खड़े पानी को बनाए रखें। कटाई से 7-10 दिन पहले खेत को सूखा दें।'
    },
    crops: ['rice'],
    regions: ['punjab', 'haryana', 'up', 'maharashtra'],
    season: 'monsoon',
  },
  {
    id: 'cotton-pest-control',
    category: 'pest',
    icon: 'bug',
    title: { en: 'Cotton Bollworm Control', hi: 'कपास बॉलवर्म नियंत्रण' },
    description: {
      en: 'Monitor for bollworm from flowering stage. Use pheromone traps and neem-based pesticides. Apply early morning or late evening.',
      hi: 'फूल आने की अवस्था से बॉलवर्म की निगरानी करें। फेरोमोन ट्रैप और नीम आधारित कीटनाशकों का उपयोग करें। सुबह जल्दी या देर शाम को लगाएं।'
    },
    crops: ['cotton'],
    regions: ['gujarat', 'maharashtra', 'mp'],
  },
  {
    id: 'sugarcane-fertilizer',
    category: 'fertilizer',
    icon: 'plant',
    title: { en: 'Sugarcane Nutrition', hi: 'गन्ना पोषण' },
    description: {
      en: 'Apply 120 kg Nitrogen, 60 kg Phosphorus, and 40 kg Potassium per hectare. Split nitrogen in 3 doses at planting, 45 days, and 90 days.',
      hi: 'प्रति हेक्टेयर 120 किलोग्राम नाइट्रोजन, 60 किलोग्राम फास्फोरस और 40 किलोग्राम पोटैशियम डालें। नाइट्रोजन को रोपण, 45 दिन और 90 दिन पर 3 खुराक में विभाजित करें।'
    },
    crops: ['sugarcane'],
    regions: ['up', 'maharashtra', 'gujarat'],
  },
  {
    id: 'general-neem-spray',
    category: 'pest',
    icon: 'spray-can',
    title: { en: 'Organic Pest Prevention', hi: 'जैविक कीट रोकथाम' },
    description: {
      en: 'Mix 50ml neem oil in 10 liters of water with 5ml liquid soap. Spray on crops every 7-10 days as preventive measure.',
      hi: '50 मिली नीम का तेल 10 लीटर पानी में 5 मिली तरल साबुन के साथ मिलाएं। निवारक उपाय के रूप में हर 7-10 दिनों में फसलों पर स्प्रे करें।'
    },
    crops: ['wheat', 'rice', 'cotton', 'sugarcane', 'maize', 'pulses'],
    regions: ['punjab', 'haryana', 'up', 'mp', 'maharashtra', 'gujarat'],
  },
  {
    id: 'maize-planting',
    category: 'planting',
    icon: 'sprout',
    title: { en: 'Maize Sowing Guidelines', hi: 'मक्का बुवाई दिशानिर्देश' },
    description: {
      en: 'Plant maize in rows 60-75 cm apart. Maintain plant-to-plant spacing of 20-25 cm. Sow 2-3 seeds per hole, thin to 1 after germination.',
      hi: 'मक्का को 60-75 सेमी दूर पंक्तियों में लगाएं। पौधे से पौधे की दूरी 20-25 सेमी रखें। प्रति गड्ढे 2-3 बीज बोएं, अंकुरण के बाद 1 करें।'
    },
    crops: ['maize'],
    regions: ['punjab', 'haryana', 'up', 'mp'],
    season: 'summer',
  },
  {
    id: 'pulses-irrigation',
    category: 'irrigation',
    icon: 'droplets',
    title: { en: 'Pulse Crop Water Needs', hi: 'दलहन फसल जल आवश्यकता' },
    description: {
      en: 'Pulses need less water than cereals. Irrigate at flowering and pod formation stages. Avoid waterlogging as it damages root nodules.',
      hi: 'दालों को अनाज की तुलना में कम पानी की आवश्यकता होती है। फूल और फली बनने की अवस्था में सिंचाई करें। जलभराव से बचें क्योंकि यह जड़ ग्रंथियों को नुकसान पहुंचाता है।'
    },
    crops: ['pulses'],
    regions: ['punjab', 'haryana', 'up', 'mp', 'maharashtra', 'gujarat'],
  },
  {
    id: 'alluvial-soil-care',
    category: 'fertilizer',
    icon: 'mountain',
    title: { en: 'Alluvial Soil Management', hi: 'जलोढ़ मिट्टी प्रबंधन' },
    description: {
      en: 'Add organic matter through composting. Alluvial soil is naturally fertile but benefits from green manuring with crops like dhaincha.',
      hi: 'कम्पोस्टिंग के माध्यम से जैविक पदार्थ जोड़ें। जलोढ़ मिट्टी स्वाभाविक रूप से उपजाऊ है लेकिन ढैंचा जैसी फसलों से हरी खाद से लाभान्वित होती है।'
    },
    crops: ['wheat', 'rice', 'sugarcane', 'maize'],
    regions: ['punjab', 'haryana', 'up'],
  },
  {
    id: 'black-soil-care',
    category: 'fertilizer',
    icon: 'mountain',
    title: { en: 'Black Soil Moisture Retention', hi: 'काली मिट्टी नमी प्रतिधारण' },
    description: {
      en: 'Black cotton soil retains moisture well. Plow after first monsoon shower. Add gypsum to improve structure if soil becomes too hard.',
      hi: 'काली कपास मिट्टी नमी को अच्छी तरह से बनाए रखती है। पहली मानसूनी बारिश के बाद जुताई करें। यदि मिट्टी बहुत कठोर हो जाए तो संरचना में सुधार के लिए जिप्सम जोड़ें।'
    },
    crops: ['cotton', 'sugarcane', 'pulses'],
    regions: ['maharashtra', 'mp', 'gujarat'],
  },
  {
    id: 'wheat-harvest-timing',
    category: 'harvest',
    icon: 'calendar',
    title: { en: 'Wheat Harvest Timing', hi: 'गेहूं कटाई का समय' },
    description: {
      en: 'Harvest wheat when grain moisture is 20-25%. Grains should be hard and difficult to crush between fingers. Usually ready in late March to April.',
      hi: 'गेहूं की कटाई तब करें जब अनाज की नमी 20-25% हो। अनाज कठोर होना चाहिए और उंगलियों के बीच कुचलना मुश्किल हो। आमतौर पर मार्च के अंत से अप्रैल में तैयार होता है।'
    },
    crops: ['wheat'],
    regions: ['punjab', 'haryana', 'up', 'mp'],
    season: 'spring',
  },
  {
    id: 'rice-pest-management',
    category: 'pest',
    icon: 'bug',
    title: { en: 'Rice Stem Borer Control', hi: 'धान तना छेदक नियंत्रण' },
    description: {
      en: 'Release egg parasitoid Trichogramma at 15-day intervals starting from 30 days after transplanting. Light traps can attract and kill adult moths.',
      hi: 'रोपाई के 30 दिन बाद से शुरू करके 15-दिन के अंतराल पर अंडा परजीवी ट्राइकोग्रामा छोड़ें। प्रकाश जाल वयस्क कीटों को आकर्षित और मार सकते हैं।'
    },
    crops: ['rice'],
    regions: ['punjab', 'haryana', 'up'],
  },
  {
    id: 'cotton-irrigation-schedule',
    category: 'irrigation',
    icon: 'droplets',
    title: { en: 'Cotton Water Schedule', hi: 'कपास जल कार्यक्रम' },
    description: {
      en: 'Irrigate cotton at 30, 60, 90, and 120 days after sowing. Critical stages are flowering and boll formation. Stop irrigation 15 days before harvest.',
      hi: 'बुवाई के 30, 60, 90 और 120 दिनों बाद कपास की सिंचाई करें। महत्वपूर्ण अवस्थाएं फूल आना और बोल बनना हैं। कटाई से 15 दिन पहले सिंचाई बंद करें।'
    },
    crops: ['cotton'],
    regions: ['gujarat', 'maharashtra', 'mp'],
  },
];

export function getTipsForUser(crop?: string, region?: string, soil?: string): FarmingTip[] {
  return farmingTips.filter(tip => {
    const cropMatch = !crop || tip.crops.includes(crop);
    const regionMatch = !region || tip.regions.includes(region);
    return cropMatch && regionMatch;
  });
}
