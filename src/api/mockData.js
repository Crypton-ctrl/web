export const initialHotels = [
  {
    id: '101',
    name: 'The Grand Heritage Palace',
    location: 'Mumbai, India',
    city: 'Mumbai',
    starRating: 5,
    pricePerNight: 8500,
    ratingScore: 4.9,
    reviewsCount: 328,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    description: 'An iconic waterfront luxury hotel offering breathtaking harbor views, royal heritage suites, and Michelin-star dining.',
    amenities: ['Free WiFi', 'Swimming Pool', 'Luxury Spa', 'Fitness Gym', 'Free Breakfast', 'Valet Parking', 'Airport Shuttle'],
    rooms: [
      { id: 'r101-1', type: 'Deluxe Heritage Room', price: 8500, capacity: 2, beds: '1 King Bed', size: '42 sq m', available: 5 },
      { id: 'r101-2', type: 'Executive Sea-Facing Suite', price: 14200, capacity: 3, beds: '1 King Bed + 1 Sofa Bed', size: '68 sq m', available: 3 },
      { id: 'r101-3', type: 'Royal Presidential Suite', price: 28500, capacity: 4, beds: '2 King Beds', size: '120 sq m', available: 1 }
    ]
  },
  {
    id: '102',
    name: 'Azure Coastline Beach Resort',
    location: 'Goa, India',
    city: 'Goa',
    starRating: 4,
    pricePerNight: 5800,
    ratingScore: 4.7,
    reviewsCount: 245,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    description: 'Direct beachfront access with private cabanas, tropical infinity pool, sunset cocktails, and aquatic water sports.',
    amenities: ['Free WiFi', 'Swimming Pool', 'Luxury Spa', 'Free Breakfast', 'Beachfront', 'Bar & Lounge'],
    rooms: [
      { id: 'r102-1', type: 'Tropical Garden Villa', price: 5800, capacity: 2, beds: '1 Queen Bed', size: '38 sq m', available: 4 },
      { id: 'r102-2', type: 'Ocean Breeze Suite', price: 9200, capacity: 3, beds: '1 King Bed', size: '55 sq m', available: 2 },
      { id: 'r102-3', type: 'Private Pool Beach Villa', price: 18000, capacity: 4, beds: '2 King Beds', size: '95 sq m', available: 1 }
    ]
  },
  {
    id: '103',
    name: 'Alpine Pine Mountain Retreat',
    location: 'Manali, Himachal Pradesh',
    city: 'Manali',
    starRating: 4,
    pricePerNight: 4200,
    ratingScore: 4.6,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    description: 'Nestled amidst cedar pine forests with snow-capped Himalayan panorama, cozy wood-burning fireplaces, and warm hospitality.',
    amenities: ['Free WiFi', 'Luxury Spa', 'Fitness Gym', 'Free Breakfast', 'Bonfire', 'Mountain View', 'Valet Parking'],
    rooms: [
      { id: 'r103-1', type: 'Cedar Wood Deluxe', price: 4200, capacity: 2, beds: '1 Queen Bed', size: '34 sq m', available: 6 },
      { id: 'r103-2', type: 'Himalayan Panorama Suite', price: 7100, capacity: 3, beds: '1 King Bed', size: '50 sq m', available: 3 }
    ]
  },
  {
    id: '104',
    name: 'Skyline Metropolitan Hotel',
    location: 'Bangalore, Karnataka',
    city: 'Bangalore',
    starRating: 5,
    pricePerNight: 7200,
    ratingScore: 4.8,
    reviewsCount: 412,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    description: 'Contemporary tech-enabled urban sanctuary located right in the vibrant heart of the city with rooftop cocktail terrace.',
    amenities: ['Free WiFi', 'Swimming Pool', 'Fitness Gym', 'Valet Parking', 'Airport Shuttle', 'Business Center'],
    rooms: [
      { id: 'r104-1', type: 'Smart Business Room', price: 7200, capacity: 2, beds: '1 Queen Bed', size: '36 sq m', available: 8 },
      { id: 'r104-2', type: 'Club Premier Suite', price: 11500, capacity: 2, beds: '1 King Bed', size: '58 sq m', available: 4 }
    ]
  },
  {
    id: '105',
    name: 'Emerald Lake Serenity Resort',
    location: 'Udaipur, Rajasthan',
    city: 'Udaipur',
    starRating: 5,
    pricePerNight: 9900,
    ratingScore: 4.9,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    description: 'Palatial Marwar architecture overlooking tranquil Lake Pichola. Sunset boat rides, folk performances, and regal feasts.',
    amenities: ['Free WiFi', 'Swimming Pool', 'Luxury Spa', 'Free Breakfast', 'Valet Parking', 'Lake View'],
    rooms: [
      { id: 'r105-1', type: 'Heritage Courtyard Room', price: 9900, capacity: 2, beds: '1 King Bed', size: '45 sq m', available: 3 },
      { id: 'r105-2', type: 'Royal Pichola Suite', price: 16800, capacity: 3, beds: '1 King Bed', size: '75 sq m', available: 2 }
    ]
  }
];

export const initialRestaurants = [
  {
    id: 'rest-1',
    name: 'The Rustic Truffle',
    cuisine: 'Italian',
    location: 'Downtown, Mumbai',
    city: 'Mumbai',
    rating: 4.8,
    reviewsCount: 284,
    priceRange: '₹₹₹',
    averageCostForTwo: 2200,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    description: 'Artisanal wood-fired sourdough pizzas, hand-rolled pastas, truffle risotto, and an exquisite Tuscan wine cellar.',
    operatingHours: '12:00 PM - 11:30 PM',
    tables: [
      { id: 'tbl-1', number: 'T-01', capacity: 2, type: 'Window Seat', available: true },
      { id: 'tbl-2', number: 'T-02', capacity: 2, type: 'Patio Outdoor', available: true },
      { id: 'tbl-3', number: 'T-03', capacity: 4, type: 'Cozy Booth', available: true },
      { id: 'tbl-4', number: 'T-04', capacity: 4, type: 'Indoor Dining', available: true },
      { id: 'tbl-5', number: 'T-05', capacity: 6, type: 'Family Table', available: false },
      { id: 'tbl-6', number: 'T-06', capacity: 8, type: 'Private VIP Room', available: true }
    ],
    timeSlots: ['12:30 PM', '01:30 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM']
  },
  {
    id: 'rest-2',
    name: 'Spice Symphony',
    cuisine: 'Indian',
    location: 'Indiranagar, Bangalore',
    city: 'Bangalore',
    rating: 4.9,
    reviewsCount: 512,
    priceRange: '₹₹₹₹',
    averageCostForTwo: 2800,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    description: 'A celebration of Awadhi slow-cooked biryanis, coastal seafood curries, and heritage royal tandoori delicacies.',
    operatingHours: '11:30 AM - 11:00 PM',
    tables: [
      { id: 'tbl-21', number: 'S-01', capacity: 2, type: 'Indoor Intimate', available: true },
      { id: 'tbl-22', number: 'S-02', capacity: 4, type: 'Royal Alcove', available: true },
      { id: 'tbl-23', number: 'S-03', capacity: 6, type: 'Courtyard Garden', available: true },
      { id: 'tbl-24', number: 'S-04', capacity: 8, type: 'Maharaja Table', available: true }
    ],
    timeSlots: ['12:00 PM', '01:00 PM', '07:30 PM', '08:30 PM', '09:30 PM']
  },
  {
    id: 'rest-3',
    name: 'Sakura Blossom',
    cuisine: 'Japanese',
    location: 'Connaught Place, Delhi',
    city: 'Delhi',
    rating: 4.7,
    reviewsCount: 310,
    priceRange: '₹₹₹₹',
    averageCostForTwo: 3500,
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80',
    description: 'Authentic Tokyo omakase sushi bar, robatayaki grill, freshly brewed matcha, and hand-crafted ramen bowls.',
    operatingHours: '12:00 PM - 10:30 PM',
    tables: [
      { id: 'tbl-31', number: 'K-01', capacity: 2, type: 'Sushi Counter', available: true },
      { id: 'tbl-32', number: 'K-02', capacity: 4, type: 'Tatami Room', available: true },
      { id: 'tbl-33', number: 'K-03', capacity: 4, type: 'Zen Garden View', available: true },
      { id: 'tbl-34', number: 'K-04', capacity: 6, type: 'Private Dining', available: false }
    ],
    timeSlots: ['12:30 PM', '02:00 PM', '06:30 PM', '08:00 PM', '09:30 PM']
  },
  {
    id: 'rest-4',
    name: 'Le Gourmet Bistro',
    cuisine: 'French',
    location: 'Colaba, Mumbai',
    city: 'Mumbai',
    rating: 4.6,
    reviewsCount: 195,
    priceRange: '₹₹₹',
    averageCostForTwo: 2400,
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
    description: 'Parisian brasserie vibes serving classic duck confit, beef bourguignon, freshly baked baguettes, and crêpes Suzette.',
    operatingHours: '11:00 AM - 11:00 PM',
    tables: [
      { id: 'tbl-41', number: 'B-01', capacity: 2, type: 'Sidewalk Patio', available: true },
      { id: 'tbl-42', number: 'B-02', capacity: 2, type: 'Bistro Window', available: true },
      { id: 'tbl-43', number: 'B-03', capacity: 4, type: 'Indoor Velvet', available: true },
      { id: 'tbl-44', number: 'B-04', capacity: 6, type: 'Chef Table', available: true }
    ],
    timeSlots: ['12:00 PM', '01:30 PM', '07:00 PM', '08:30 PM', '10:00 PM']
  },
  {
    id: 'rest-5',
    name: 'El Fuego Cantina',
    cuisine: 'Mexican',
    location: 'Koramangala, Bangalore',
    city: 'Bangalore',
    rating: 4.5,
    reviewsCount: 220,
    priceRange: '₹₹',
    averageCostForTwo: 1600,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    description: 'Vibrant street tacos, sizzling fajita skillets, tableside guacamole, and fresh lime agave margaritas.',
    operatingHours: '12:00 PM - 11:30 PM',
    tables: [
      { id: 'tbl-51', number: 'M-01', capacity: 2, type: 'High Top Bar', available: true },
      { id: 'tbl-52', number: 'M-02', capacity: 4, type: 'Patio Pergola', available: true },
      { id: 'tbl-53', number: 'M-03', capacity: 6, type: 'Colorful Booth', available: true }
    ],
    timeSlots: ['01:00 PM', '07:00 PM', '08:30 PM', '09:45 PM']
  }
];

export const sampleReservations = [
  {
    id: 'res-901',
    restaurantId: 'rest-1',
    restaurantName: 'The Rustic Truffle',
    cuisine: 'Italian',
    location: 'Downtown, Mumbai',
    date: '2026-10-25',
    time: '08:00 PM',
    guests: 2,
    tableId: 'tbl-1',
    tableNumber: 'T-01',
    tableType: 'Window Seat',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav@example.com',
    customerPhone: '9876543210',
    specialRequests: 'Window seat for anniversary dinner; please arrange a candle.',
    status: 'CONFIRMED',
    createdAt: '2026-10-15T14:20:00Z'
  },
  {
    id: 'res-902',
    restaurantId: 'rest-2',
    restaurantName: 'Spice Symphony',
    cuisine: 'Indian',
    location: 'Indiranagar, Bangalore',
    date: '2026-10-28',
    time: '07:30 PM',
    guests: 4,
    tableId: 'tbl-22',
    tableNumber: 'S-02',
    tableType: 'Royal Alcove',
    customerName: 'Priya Patel',
    customerEmail: 'priya@example.com',
    customerPhone: '9823456789',
    specialRequests: 'Less spicy food for children.',
    status: 'CONFIRMED',
    createdAt: '2026-10-16T10:10:00Z'
  }
];
