export interface Expert {
  id: string;
  name: string;
  title: string;
  profileImage: string;
  specializations: string[];
  phone: string;
  location: {
    state: string;
    district: string;
  };
  crops: string[];
  availability: {
    status: 'available' | 'unavailable';
    hours: string;
  };
  bio: string;
  rating: number;
  totalConsultations: number;
}

export const mockExperts: Expert[] = [
  {
    id: 'exp-001',
    name: 'Dr. Rajesh Kumar',
    title: 'Regional Extension Officer',
    profileImage: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=16a34a&color=fff&size=96',
    specializations: ['Crop diseases', 'Integrated pest management', 'Soil health'],
    phone: '+91-9876543210',
    location: {
      state: 'Punjab',
      district: 'Ludhiana',
    },
    crops: ['Rice', 'Wheat', 'Cotton'],
    availability: {
      status: 'available',
      hours: 'Available for consultation weekdays 9 AM - 5 PM',
    },
    bio: 'Over 15 years of experience in agricultural extension services. Specializes in sustainable farming practices and crop disease management.',
    rating: 4.8,
    totalConsultations: 342,
  },
  {
    id: 'exp-002',
    name: 'Priya Sharma',
    title: 'Irrigation Specialist',
    profileImage: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=0891b2&color=fff&size=96',
    specializations: ['Drip irrigation', 'Water management', 'Soil moisture'],
    phone: '+91-9876543211',
    location: {
      state: 'Haryana',
      district: 'Karnal',
    },
    crops: ['Rice', 'Wheat', 'Vegetables'],
    availability: {
      status: 'available',
      hours: 'Available most weekdays 10 AM - 6 PM',
    },
    bio: 'Expert in modern irrigation techniques and water conservation. Helped over 500 farmers optimize water usage.',
    rating: 4.9,
    totalConsultations: 428,
  },
  {
    id: 'exp-003',
    name: 'Suresh Patel',
    title: 'Cotton Specialist',
    profileImage: 'https://ui-avatars.com/api/?name=Suresh+Patel&background=ea580c&color=fff&size=96',
    specializations: ['Cotton farming', 'Pest control', 'Fertilizer management'],
    phone: '+91-9876543212',
    location: {
      state: 'Gujarat',
      district: 'Surat',
    },
    crops: ['Cotton'],
    availability: {
      status: 'unavailable',
      hours: 'Available weekdays 8 AM - 4 PM',
    },
    bio: 'Dedicated cotton farming expert with 20 years of field experience. Specialized in bollworm management.',
    rating: 4.7,
    totalConsultations: 289,
  },
  {
    id: 'exp-004',
    name: 'Meena Devi',
    title: 'Organic Farming Advisor',
    profileImage: 'https://ui-avatars.com/api/?name=Meena+Devi&background=7c3aed&color=fff&size=96',
    specializations: ['Organic farming', 'Composting', 'Natural pest control'],
    phone: '+91-9876543213',
    location: {
      state: 'Uttar Pradesh',
      district: 'Meerut',
    },
    crops: ['Rice', 'Wheat', 'Vegetables', 'Pulses'],
    availability: {
      status: 'available',
      hours: 'Available weekdays 9 AM - 5 PM',
    },
    bio: 'Pioneer in organic farming methods. Trains farmers in sustainable and chemical-free agriculture.',
    rating: 4.6,
    totalConsultations: 256,
  },
  {
    id: 'exp-005',
    name: 'Amit Singh',
    title: 'Soil Health Expert',
    profileImage: 'https://ui-avatars.com/api/?name=Amit+Singh&background=dc2626&color=fff&size=96',
    specializations: ['Soil testing', 'Nutrient management', 'pH balancing'],
    phone: '+91-9876543214',
    location: {
      state: 'Maharashtra',
      district: 'Pune',
    },
    crops: ['Cotton', 'Sugarcane', 'Vegetables'],
    availability: {
      status: 'available',
      hours: 'Available weekdays 10 AM - 4 PM',
    },
    bio: 'Soil science expert helping farmers improve soil health and fertility for better yields.',
    rating: 4.5,
    totalConsultations: 198,
  },
  {
    id: 'exp-006',
    name: 'Lakshmi Reddy',
    title: 'Rice Cultivation Expert',
    profileImage: 'https://ui-avatars.com/api/?name=Lakshmi+Reddy&background=059669&color=fff&size=96',
    specializations: ['Rice cultivation', 'Paddy management', 'Yield optimization'],
    phone: '+91-9876543215',
    location: {
      state: 'Andhra Pradesh',
      district: 'Guntur',
    },
    crops: ['Rice'],
    availability: {
      status: 'available',
      hours: 'Available most weekdays 9 AM - 5 PM',
    },
    bio: 'Specialized in rice cultivation techniques and paddy field management. Expert in SRI method.',
    rating: 4.9,
    totalConsultations: 567,
  },
  {
    id: 'exp-007',
    name: 'Karan Verma',
    title: 'Pest Management Specialist',
    profileImage: 'https://ui-avatars.com/api/?name=Karan+Verma&background=0284c7&color=fff&size=96',
    specializations: ['Integrated pest management', 'Biological control', 'Pesticide advisory'],
    phone: '+91-9876543216',
    location: {
      state: 'Punjab',
      district: 'Amritsar',
    },
    crops: ['Wheat', 'Rice', 'Cotton', 'Maize'],
    availability: {
      status: 'available',
      hours: 'Available weekdays 8 AM - 6 PM',
    },
    bio: 'IPM specialist focusing on eco-friendly pest control solutions and reducing chemical dependency.',
    rating: 4.8,
    totalConsultations: 412,
  },
  {
    id: 'exp-008',
    name: 'Sunita Nair',
    title: 'Vegetable Farming Consultant',
    profileImage: 'https://ui-avatars.com/api/?name=Sunita+Nair&background=ca8a04&color=fff&size=96',
    specializations: ['Vegetable cultivation', 'Greenhouse farming', 'Market linkage'],
    phone: '+91-9876543217',
    location: {
      state: 'Karnataka',
      district: 'Bangalore',
    },
    crops: ['Vegetables'],
    availability: {
      status: 'unavailable',
      hours: 'Available weekdays 9 AM - 3 PM',
    },
    bio: 'Helps vegetable farmers with modern cultivation techniques and connecting to urban markets.',
    rating: 4.7,
    totalConsultations: 334,
  },
];

export function filterExpertsByCropAndLocation(
  experts: Expert[],
  userCrop: string,
  userState: string
): Expert[] {
  const normalizedCrop = userCrop.charAt(0).toUpperCase() + userCrop.slice(1).toLowerCase();
  const normalizedState = userState.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');

  return experts.filter(expert => {
    const cropMatch = expert.crops.some(crop => 
      crop.toLowerCase() === normalizedCrop.toLowerCase()
    );
    const stateMatch = expert.location.state.toLowerCase() === normalizedState.toLowerCase();
    
    return cropMatch || stateMatch;
  });
}

export function searchExperts(
  experts: Expert[],
  searchQuery: string
): Expert[] {
  const query = searchQuery.toLowerCase().trim();
  
  if (!query) {
    return experts;
  }

  return experts.filter(expert => {
    const nameMatch = expert.name.toLowerCase().includes(query);
    const titleMatch = expert.title.toLowerCase().includes(query);
    const locationMatch = expert.location.district.toLowerCase().includes(query) ||
                         expert.location.state.toLowerCase().includes(query);
    const specializationMatch = expert.specializations.some(spec => 
      spec.toLowerCase().includes(query)
    );
    
    return nameMatch || titleMatch || locationMatch || specializationMatch;
  });
}
