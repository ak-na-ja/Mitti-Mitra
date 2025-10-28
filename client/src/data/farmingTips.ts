export type CropType = 'Rice' | 'Wheat' | 'Cotton' | 'Maize' | 'Vegetables';
export type StateType = 'Punjab' | 'Haryana' | 'Uttar Pradesh' | 'Maharashtra' | 'Gujarat' | 'Madhya Pradesh' | 'Karnataka' | 'Andhra Pradesh' | 'Tamil Nadu' | 'Bihar';
export type SoilType = 'Alluvial' | 'Black' | 'Red' | 'Laterite' | 'Desert' | 'Mountain';
export type Season = 'Kharif' | 'Rabi' | 'Zaid';
export type GrowthStage = 'Vegetative' | 'Flowering' | 'Grain Filling' | 'Harvesting';
export type IrrigationType = 'Drip' | 'Sprinkler' | 'Flood' | 'Rain-fed';
export type Priority = 'high' | 'medium' | 'low';

export interface WeatherCondition {
  minTemp?: number;
  maxTemp?: number;
  minRainfall?: number;
  maxRainfall?: number;
  minHumidity?: number;
  maxHumidity?: number;
}

export interface FarmingTip {
  id: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  whyThisTip: { en: string; hi: string };
  icon: string;
  priority: Priority;
  
  crops: CropType[];
  states: StateType[];
  soilTypes: SoilType[];
  seasons: Season[];
  growthStages?: GrowthStage[];
  irrigationTypes?: IrrigationType[];
  
  weatherTrigger?: WeatherCondition;
  category: 'irrigation' | 'fertilizer' | 'pest' | 'disease' | 'soil' | 'planting' | 'harvest' | 'general';
}

export interface WeeklyTask {
  id: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  icon: string;
  completed: boolean;
  type: 'season' | 'weather' | 'soil' | 'crop-stage';
  dueDate?: Date;
}

export interface WeatherAlert {
  id: string;
  condition: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  icon: string;
  actionRequired: { en: string; hi: string };
  severity: 'low' | 'medium' | 'high';
}

export const seasonMonthMapping: Record<number, Season> = {
  0: 'Rabi',
  1: 'Rabi',
  2: 'Zaid',
  3: 'Zaid',
  4: 'Zaid',
  5: 'Kharif',
  6: 'Kharif',
  7: 'Kharif',
  8: 'Kharif',
  9: 'Kharif',
  10: 'Rabi',
  11: 'Rabi',
};

export function getCurrentSeason(): Season {
  const month = new Date().getMonth();
  return seasonMonthMapping[month];
}

export const farmingTips: FarmingTip[] = [
  {
    id: 'rice-kharif-irrigation-high',
    title: { en: 'Maintain Water Levels', hi: 'जल स्तर बनाए रखें' },
    description: { en: 'Keep 2-3 inches of standing water during vegetative stage. Essential for healthy root development and nutrient uptake.', hi: 'वानस्पतिक अवस्था के दौरान 2-3 इंच खड़ा पानी रखें। स्वस्थ जड़ विकास और पोषक तत्व ग्रहण के लिए आवश्यक।' },
    whyThisTip: { en: 'Rice in Kharif season, Alluvial soil, Vegetative stage', hi: 'खरीफ मौसम में धान, जलोढ़ मिट्टी, वानस्पतिक अवस्था' },
    icon: 'droplets',
    priority: 'high',
    crops: ['Rice'],
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar'],
    soilTypes: ['Alluvial'],
    seasons: ['Kharif'],
    growthStages: ['Vegetative'],
    category: 'irrigation',
  },
  {
    id: 'rice-high-temp-irrigation',
    title: { en: 'Increase Irrigation Frequency', hi: 'सिंचाई की आवृत्ति बढ़ाएं' },
    description: { en: 'With temperatures above 35°C, irrigate twice daily - early morning and evening to prevent heat stress.', hi: '35°C से ऊपर के तापमान के साथ, गर्मी के तनाव को रोकने के लिए दिन में दो बार सिंचाई करें - सुबह जल्दी और शाम को।' },
    whyThisTip: { en: 'High temperature alert, Rice crop', hi: 'उच्च तापमान चेतावनी, धान की फसल' },
    icon: 'thermometer-sun',
    priority: 'high',
    crops: ['Rice'],
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra', 'Andhra Pradesh', 'Tamil Nadu'],
    soilTypes: ['Alluvial', 'Black', 'Red'],
    seasons: ['Kharif'],
    weatherTrigger: { minTemp: 35 },
    category: 'irrigation',
  },
  {
    id: 'wheat-rabi-planting',
    title: { en: 'Optimal Sowing Time', hi: 'इष्टतम बुवाई का समय' },
    description: { en: 'Sow wheat between mid-November to early December. Soil temperature should be 18-20°C for best germination.', hi: 'नवंबर के मध्य से दिसंबर की शुरुआत के बीच गेहूं बोएं। सर्वोत्तम अंकुरण के लिए मिट्टी का तापमान 18-20°C होना चाहिए।' },
    whyThisTip: { en: 'Wheat crop, Rabi season, Alluvial soil', hi: 'गेहूं की फसल, रबी का मौसम, जलोढ़ मिट्टी' },
    icon: 'sprout',
    priority: 'high',
    crops: ['Wheat'],
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh'],
    soilTypes: ['Alluvial'],
    seasons: ['Rabi'],
    category: 'planting',
  },
  {
    id: 'cotton-flowering-pest-alert',
    title: { en: 'Monitor for Bollworms', hi: 'बॉलवर्म की निगरानी करें' },
    description: { en: 'Install pheromone traps. Check plants daily for eggs and larvae. Use neem spray as preventive measure.', hi: 'फेरोमोन ट्रैप लगाएं। अंडे और लार्वा के लिए पौधों की रोजाना जांच करें। निवारक उपाय के रूप में नीम स्प्रे का उपयोग करें।' },
    whyThisTip: { en: 'Cotton at flowering stage, High humidity season', hi: 'फूल अवस्था में कपास, उच्च आर्द्रता का मौसम' },
    icon: 'bug',
    priority: 'high',
    crops: ['Cotton'],
    states: ['Gujarat', 'Maharashtra', 'Madhya Pradesh', 'Karnataka', 'Andhra Pradesh'],
    soilTypes: ['Black', 'Red'],
    seasons: ['Kharif'],
    growthStages: ['Flowering'],
    weatherTrigger: { minHumidity: 70 },
    category: 'pest',
  },
  {
    id: 'heavy-rainfall-drainage',
    title: { en: 'Ensure Proper Drainage', hi: 'उचित जल निकासी सुनिश्चित करें' },
    description: { en: 'Heavy rainfall alert! Clear drainage channels immediately. Create temporary drains to prevent waterlogging and root rot.', hi: 'भारी बारिश की चेतावनी! तुरंत जल निकासी चैनल साफ करें। जलभराव और जड़ सड़न को रोकने के लिए अस्थायी नालियां बनाएं।' },
    whyThisTip: { en: 'Heavy rainfall forecast, All crops vulnerable', hi: 'भारी बारिश का पूर्वानुमान, सभी फसलें संवेदनशील' },
    icon: 'cloud-rain',
    priority: 'high',
    crops: ['Rice', 'Wheat', 'Cotton', 'Maize', 'Vegetables'],
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra', 'Gujarat', 'Madhya Pradesh', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu', 'Bihar'],
    soilTypes: ['Alluvial', 'Black', 'Red', 'Laterite'],
    seasons: ['Kharif'],
    weatherTrigger: { minRainfall: 20 },
    category: 'general',
  },
  {
    id: 'maize-nitrogen-application',
    title: { en: 'Apply Nitrogen Fertilizer', hi: 'नाइट्रोजन उर्वरक लगाएं' },
    description: { en: 'Apply 60 kg/hectare nitrogen at knee-high stage. Split application reduces leaching and improves uptake.', hi: 'घुटने की ऊंचाई की अवस्था में 60 किलो/हेक्टेयर नाइट्रोजन लगाएं। विभाजित अनुप्रयोग लीचिंग को कम करता है और ग्रहण में सुधार करता है।' },
    whyThisTip: { en: 'Maize at vegetative stage, Alluvial soil needs', hi: 'वानस्पतिक अवस्था में मक्का, जलोढ़ मिट्टी की जरूरतें' },
    icon: 'leaf',
    priority: 'medium',
    crops: ['Maize'],
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh', 'Bihar', 'Karnataka'],
    soilTypes: ['Alluvial', 'Red'],
    seasons: ['Kharif', 'Zaid'],
    growthStages: ['Vegetative'],
    category: 'fertilizer',
  },
  {
    id: 'vegetables-drip-irrigation',
    title: { en: 'Use Drip Irrigation', hi: 'ड्रिप सिंचाई का उपयोग करें' },
    description: { en: 'Drip irrigation saves 40% water for vegetables. Apply water directly to roots, reducing disease and weed growth.', hi: 'ड्रिप सिंचाई सब्जियों के लिए 40% पानी बचाती है। सीधे जड़ों में पानी लगाएं, बीमारी और खरपतवार वृद्धि को कम करें।' },
    whyThisTip: { en: 'Vegetables, Water conservation, All seasons', hi: 'सब्जियां, जल संरक्षण, सभी मौसम' },
    icon: 'droplets',
    priority: 'medium',
    crops: ['Vegetables'],
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra', 'Gujarat', 'Karnataka', 'Tamil Nadu'],
    soilTypes: ['Alluvial', 'Black', 'Red', 'Laterite'],
    seasons: ['Kharif', 'Rabi', 'Zaid'],
    irrigationTypes: ['Drip'],
    category: 'irrigation',
  },
  {
    id: 'black-soil-cotton-care',
    title: { en: 'Black Soil Moisture Management', hi: 'काली मिट्टी नमी प्रबंधन' },
    description: { en: 'Black cotton soil retains moisture well. Avoid over-irrigation. One deep irrigation per week is sufficient.', hi: 'काली कपास मिट्टी नमी को अच्छी तरह बनाए रखती है। अधिक सिंचाई से बचें। प्रति सप्ताह एक गहरी सिंचाई पर्याप्त है।' },
    whyThisTip: { en: 'Black soil characteristics, Cotton crop needs', hi: 'काली मिट्टी की विशेषताएं, कपास की फसल की जरूरतें' },
    icon: 'mountain',
    priority: 'medium',
    crops: ['Cotton'],
    states: ['Maharashtra', 'Gujarat', 'Madhya Pradesh', 'Karnataka'],
    soilTypes: ['Black'],
    seasons: ['Kharif'],
    category: 'soil',
  },
  {
    id: 'wheat-grain-filling-irrigation',
    title: { en: 'Critical Irrigation Stage', hi: 'महत्वपूर्ण सिंचाई अवस्था' },
    description: { en: 'Grain filling stage needs consistent moisture. Irrigate every 10-12 days. This determines final yield.', hi: 'अनाज भरने की अवस्था में लगातार नमी की आवश्यकता होती है। हर 10-12 दिन में सिंचाई करें। यह अंतिम उपज निर्धारित करता है।' },
    whyThisTip: { en: 'Wheat at grain filling, Critical for yield', hi: 'अनाज भरने में गेहूं, उपज के लिए महत्वपूर्ण' },
    icon: 'droplets',
    priority: 'high',
    crops: ['Wheat'],
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh', 'Bihar'],
    soilTypes: ['Alluvial'],
    seasons: ['Rabi'],
    growthStages: ['Grain Filling'],
    category: 'irrigation',
  },
  {
    id: 'rice-blast-disease-humidity',
    title: { en: 'Watch for Blast Disease', hi: 'ब्लास्ट रोग से सावधान रहें' },
    description: { en: 'High humidity increases blast disease risk. Apply Tricyclazole fungicide. Remove infected leaves immediately.', hi: 'उच्च आर्द्रता ब्लास्ट रोग जोखिम बढ़ाती है। ट्राइसाइक्लाज़ोल कवकनाशी लगाएं। संक्रमित पत्तियों को तुरंत हटा दें।' },
    whyThisTip: { en: 'Rice crop, High humidity alert', hi: 'धान की फसल, उच्च आर्द्रता चेतावनी' },
    icon: 'alert-triangle',
    priority: 'high',
    crops: ['Rice'],
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar', 'Andhra Pradesh', 'Tamil Nadu'],
    soilTypes: ['Alluvial'],
    seasons: ['Kharif'],
    weatherTrigger: { minHumidity: 70 },
    category: 'disease',
  },
  {
    id: 'cotton-harvest-timing',
    title: { en: 'Harvest at Right Time', hi: 'सही समय पर कटाई करें' },
    description: { en: 'Harvest when 60% bolls open. Pick in dry weather. Multiple pickings ensure better quality and higher returns.', hi: 'जब 60% बोल खुल जाएं तो कटाई करें। सूखे मौसम में चुनें। कई बार चुनने से बेहतर गुणवत्ता और अधिक रिटर्न मिलता है।' },
    whyThisTip: { en: 'Cotton at harvesting stage, Quality matters', hi: 'कटाई अवस्था में कपास, गुणवत्ता महत्वपूर्ण' },
    icon: 'harvest',
    priority: 'high',
    crops: ['Cotton'],
    states: ['Gujarat', 'Maharashtra', 'Madhya Pradesh', 'Karnataka', 'Andhra Pradesh'],
    soilTypes: ['Black', 'Red'],
    seasons: ['Kharif'],
    growthStages: ['Harvesting'],
    category: 'harvest',
  },
  {
    id: 'alluvial-soil-organic-matter',
    title: { en: 'Add Organic Matter', hi: 'जैविक पदार्थ जोड़ें' },
    description: { en: 'Mix 5-10 tons compost per hectare before planting. Improves soil structure and water retention in alluvial soils.', hi: 'रोपण से पहले प्रति हेक्टेयर 5-10 टन खाद मिलाएं। जलोढ़ मिट्टी में मिट्टी की संरचना और जल प्रतिधारण में सुधार होता है।' },
    whyThisTip: { en: 'Alluvial soil improvement, All crops benefit', hi: 'जलोढ़ मिट्टी सुधार, सभी फसलों को लाभ' },
    icon: 'plant',
    priority: 'medium',
    crops: ['Rice', 'Wheat', 'Maize', 'Vegetables'],
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar'],
    soilTypes: ['Alluvial'],
    seasons: ['Kharif', 'Rabi', 'Zaid'],
    category: 'soil',
  },
  {
    id: 'maize-flowering-water-stress',
    title: { en: 'Prevent Water Stress', hi: 'जल तनाव रोकें' },
    description: { en: 'Flowering is critical for maize. Ensure adequate moisture. Even 2-3 days of water stress reduces yield by 20-30%.', hi: 'फूल आना मक्के के लिए महत्वपूर्ण है। पर्याप्त नमी सुनिश्चित करें। 2-3 दिन का जल तनाव भी उपज को 20-30% कम कर देता है।' },
    whyThisTip: { en: 'Maize at flowering, Critical growth stage', hi: 'फूल अवस्था में मक्का, महत्वपूर्ण वृद्धि अवस्था' },
    icon: 'droplets',
    priority: 'high',
    crops: ['Maize'],
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh', 'Bihar', 'Karnataka'],
    soilTypes: ['Alluvial', 'Red', 'Black'],
    seasons: ['Kharif', 'Zaid'],
    growthStages: ['Flowering'],
    category: 'irrigation',
  },
  {
    id: 'red-soil-lime-application',
    title: { en: 'Apply Lime to Red Soil', hi: 'लाल मिट्टी में चूना लगाएं' },
    description: { en: 'Red soils are acidic. Apply 2-3 tons lime per hectare every 3 years. Improves pH and nutrient availability.', hi: 'लाल मिट्टी अम्लीय होती है। हर 3 साल में प्रति हेक्टेयर 2-3 टन चूना लगाएं। पीएच और पोषक तत्व उपलब्धता में सुधार होता है।' },
    whyThisTip: { en: 'Red soil acidity, Nutrient management', hi: 'लाल मिट्टी अम्लता, पोषक तत्व प्रबंधन' },
    icon: 'mountain',
    priority: 'medium',
    crops: ['Cotton', 'Maize', 'Vegetables'],
    states: ['Maharashtra', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu'],
    soilTypes: ['Red', 'Laterite'],
    seasons: ['Kharif', 'Rabi', 'Zaid'],
    category: 'soil',
  },
  {
    id: 'vegetables-pest-neem-spray',
    title: { en: 'Organic Pest Control', hi: 'जैविक कीट नियंत्रण' },
    description: { en: 'Mix 50ml neem oil in 10L water. Spray weekly in evening. Safe for vegetables, effective against aphids and caterpillars.', hi: '10 लीटर पानी में 50 मिली नीम का तेल मिलाएं। शाम को साप्ताहिक स्प्रे करें। सब्जियों के लिए सुरक्षित, एफिड और कैटरपिलर के खिलाफ प्रभावी।' },
    whyThisTip: { en: 'Vegetables, Safe organic method', hi: 'सब्जियां, सुरक्षित जैविक तरीका' },
    icon: 'spray-can',
    priority: 'medium',
    crops: ['Vegetables'],
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra', 'Gujarat', 'Karnataka', 'Tamil Nadu', 'Bihar'],
    soilTypes: ['Alluvial', 'Black', 'Red', 'Laterite'],
    seasons: ['Kharif', 'Rabi', 'Zaid'],
    category: 'pest',
  },
  {
    id: 'wheat-late-sowing-variety',
    title: { en: 'Choose Late-Sowing Variety', hi: 'देर से बोने की किस्म चुनें' },
    description: { en: 'If sowing delayed beyond December, use HD2967 or DBW17. These varieties tolerate higher temperatures at grain filling.', hi: 'यदि दिसंबर के बाद बुवाई में देरी हो, तो HD2967 या DBW17 का उपयोग करें। ये किस्में अनाज भरने पर उच्च तापमान सहन करती हैं।' },
    whyThisTip: { en: 'Wheat, Late Rabi season sowing', hi: 'गेहूं, देर से रबी मौसम बुवाई' },
    icon: 'sprout',
    priority: 'medium',
    crops: ['Wheat'],
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh'],
    soilTypes: ['Alluvial'],
    seasons: ['Rabi'],
    category: 'planting',
  },
  {
    id: 'rice-zinc-deficiency',
    title: { en: 'Apply Zinc Sulfate', hi: 'जिंक सल्फेट लगाएं' },
    description: { en: 'Rice in alkaline soils often shows zinc deficiency. Apply 25 kg zinc sulfate per hectare at transplanting.', hi: 'क्षारीय मिट्टी में धान अक्सर जिंक की कमी दिखाता है। रोपाई के समय प्रति हेक्टेयर 25 किलो जिंक सल्फेट लगाएं।' },
    whyThisTip: { en: 'Rice crop, Alluvial soil micronutrient needs', hi: 'धान की फसल, जलोढ़ मिट्टी सूक्ष्म पोषक तत्व की जरूरतें' },
    icon: 'flask',
    priority: 'medium',
    crops: ['Rice'],
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar'],
    soilTypes: ['Alluvial'],
    seasons: ['Kharif'],
    growthStages: ['Vegetative'],
    category: 'fertilizer',
  },
  {
    id: 'cotton-whitefly-control',
    title: { en: 'Control Whitefly Population', hi: 'सफेद मक्खी जनसंख्या नियंत्रित करें' },
    description: { en: 'Whiteflies spread viral diseases. Use yellow sticky traps. Spray Imidacloprid if population exceeds threshold.', hi: 'सफेद मक्खियां वायरल रोग फैलाती हैं। पीले चिपचिपे ट्रैप का उपयोग करें। यदि जनसंख्या सीमा से अधिक हो तो इमिडाक्लोप्रिड स्प्रे करें।' },
    whyThisTip: { en: 'Cotton crop, Pest prevention', hi: 'कपास की फसल, कीट रोकथाम' },
    icon: 'bug',
    priority: 'high',
    crops: ['Cotton'],
    states: ['Gujarat', 'Maharashtra', 'Madhya Pradesh', 'Karnataka', 'Andhra Pradesh'],
    soilTypes: ['Black', 'Red'],
    seasons: ['Kharif'],
    growthStages: ['Vegetative', 'Flowering'],
    category: 'pest',
  },
  {
    id: 'maize-weed-control',
    title: { en: 'Early Weed Management', hi: 'प्रारंभिक खरपतवार प्रबंधन' },
    description: { en: 'First 30 days are critical. Hand weed twice or use Atrazine herbicide. Weeds reduce maize yield by 40%.', hi: 'पहले 30 दिन महत्वपूर्ण हैं। दो बार हाथ से निराई करें या एट्राजीन हर्बिसाइड का उपयोग करें। खरपतवार मक्के की उपज को 40% कम करते हैं।' },
    whyThisTip: { en: 'Maize at vegetative stage, Weed competition', hi: 'वानस्पतिक अवस्था में मक्का, खरपतवार प्रतिस्पर्धा' },
    icon: 'sprout',
    priority: 'high',
    crops: ['Maize'],
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh', 'Bihar', 'Karnataka'],
    soilTypes: ['Alluvial', 'Red', 'Black'],
    seasons: ['Kharif', 'Zaid'],
    growthStages: ['Vegetative'],
    category: 'general',
  },
  {
    id: 'vegetables-mulching',
    title: { en: 'Use Mulch for Vegetables', hi: 'सब्जियों के लिए मल्च का उपयोग करें' },
    description: { en: 'Apply 5cm thick mulch around plants. Reduces water need by 30%, controls weeds, moderates soil temperature.', hi: 'पौधों के चारों ओर 5 सेमी मोटी मल्च लगाएं। पानी की आवश्यकता को 30% कम करता है, खरपतवार नियंत्रित करता है, मिट्टी के तापमान को नियंत्रित करता है।' },
    whyThisTip: { en: 'Vegetables, Water conservation, All seasons', hi: 'सब्जियां, जल संरक्षण, सभी मौसम' },
    icon: 'layers',
    priority: 'medium',
    crops: ['Vegetables'],
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra', 'Gujarat', 'Karnataka', 'Tamil Nadu'],
    soilTypes: ['Alluvial', 'Black', 'Red', 'Laterite'],
    seasons: ['Kharif', 'Rabi', 'Zaid'],
    category: 'general',
  },
  {
    id: 'wheat-aphid-control',
    title: { en: 'Monitor for Aphids', hi: 'एफिड्स की निगरानी करें' },
    description: { en: 'Check wheat plants weekly for aphids. Spray Dimethoate if infestation severe. Early control prevents yield loss.', hi: 'एफिड्स के लिए साप्ताहिक गेहूं के पौधों की जांच करें। यदि संक्रमण गंभीर हो तो डाइमेथोएट स्प्रे करें। प्रारंभिक नियंत्रण उपज हानि को रोकता है।' },
    whyThisTip: { en: 'Wheat crop, Grain filling stage pest', hi: 'गेहूं की फसल, अनाज भरने की अवस्था कीट' },
    icon: 'bug',
    priority: 'medium',
    crops: ['Wheat'],
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh', 'Bihar'],
    soilTypes: ['Alluvial'],
    seasons: ['Rabi'],
    growthStages: ['Flowering', 'Grain Filling'],
    category: 'pest',
  },
  {
    id: 'rice-flowering-potassium',
    title: { en: 'Apply Potassium at Flowering', hi: 'फूल आने पर पोटैशियम लगाएं' },
    description: { en: 'Apply 20 kg potassium per hectare at panicle initiation. Improves grain filling and disease resistance.', hi: 'पुष्पगुच्छ आरंभ पर प्रति हेक्टेयर 20 किलो पोटैशियम लगाएं। अनाज भरने और रोग प्रतिरोध में सुधार होता है।' },
    whyThisTip: { en: 'Rice at flowering, Nutrient timing', hi: 'फूल अवस्था में धान, पोषक तत्व समय' },
    icon: 'leaf',
    priority: 'medium',
    crops: ['Rice'],
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar', 'Andhra Pradesh', 'Tamil Nadu'],
    soilTypes: ['Alluvial'],
    seasons: ['Kharif'],
    growthStages: ['Flowering'],
    category: 'fertilizer',
  },
  {
    id: 'cotton-drip-fertigation',
    title: { en: 'Use Drip Fertigation', hi: 'ड्रिप फर्टिगेशन का उपयोग करें' },
    description: { en: 'Combine drip irrigation with liquid fertilizers. Saves 40% water and 30% fertilizer. Better nutrient efficiency.', hi: 'ड्रिप सिंचाई को तरल उर्वरकों के साथ जोड़ें। 40% पानी और 30% उर्वरक बचाता है। बेहतर पोषक तत्व दक्षता।' },
    whyThisTip: { en: 'Cotton crop, Drip irrigation system', hi: 'कपास की फसल, ड्रिप सिंचाई प्रणाली' },
    icon: 'droplets',
    priority: 'medium',
    crops: ['Cotton'],
    states: ['Gujarat', 'Maharashtra', 'Karnataka', 'Andhra Pradesh'],
    soilTypes: ['Black', 'Red'],
    seasons: ['Kharif'],
    irrigationTypes: ['Drip'],
    category: 'irrigation',
  },
];

export const weatherAlerts: WeatherAlert[] = [
  {
    id: 'heavy-rain-alert',
    condition: 'rainfall > 20mm',
    title: { en: 'Heavy Rainfall Alert', hi: 'भारी बारिश की चेतावनी' },
    description: { en: 'Rainfall above 20mm expected. Risk of waterlogging and nutrient leaching.', hi: '20 मिमी से ऊपर बारिश की उम्मीद। जलभराव और पोषक तत्व लीचिंग का जोखिम।' },
    icon: 'cloud-rain',
    actionRequired: { en: 'Clear drainage channels, avoid fertilizer application', hi: 'जल निकासी चैनल साफ करें, उर्वरक अनुप्रयोग से बचें' },
    severity: 'high',
  },
  {
    id: 'high-temp-alert',
    condition: 'temperature > 35°C',
    title: { en: 'Heat Wave Warning', hi: 'गर्मी की लहर चेतावनी' },
    description: { en: 'Temperature above 35°C. Plants under heat stress, increased water requirement.', hi: '35°C से ऊपर तापमान। गर्मी के तनाव में पौधे, पानी की आवश्यकता बढ़ी।' },
    icon: 'thermometer-sun',
    actionRequired: { en: 'Increase irrigation frequency, apply light irrigation', hi: 'सिंचाई की आवृत्ति बढ़ाएं, हल्की सिंचाई लगाएं' },
    severity: 'high',
  },
  {
    id: 'high-humidity-alert',
    condition: 'humidity > 70%',
    title: { en: 'High Humidity Alert', hi: 'उच्च आर्द्रता चेतावनी' },
    description: { en: 'Humidity above 70%. Increased risk of fungal diseases and pest attacks.', hi: '70% से ऊपर आर्द्रता। फंगल रोगों और कीट हमलों का बढ़ा जोखिम।' },
    icon: 'cloud-fog',
    actionRequired: { en: 'Monitor for pests, apply preventive fungicide spray', hi: 'कीटों की निगरानी करें, निवारक कवकनाशी स्प्रे लगाएं' },
    severity: 'medium',
  },
  {
    id: 'low-humidity-alert',
    condition: 'humidity < 30%',
    title: { en: 'Low Humidity Alert', hi: 'कम आर्द्रता चेतावनी' },
    description: { en: 'Very dry conditions. Increased water loss through transpiration.', hi: 'बहुत शुष्क स्थितियां। वाष्पोत्सर्जन के माध्यम से पानी की हानि बढ़ी।' },
    icon: 'wind',
    actionRequired: { en: 'Irrigate more frequently, apply mulch to retain moisture', hi: 'अधिक बार सिंचाई करें, नमी बनाए रखने के लिए मल्च लगाएं' },
    severity: 'medium',
  },
];
