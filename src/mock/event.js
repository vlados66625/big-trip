import { getRandomItemArray } from '../util/common.js';

const Points = [
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c',
    basePrice: 1100,
    dateFrom: '2024-07-10T22:55:56.845Z',
    dateTo: '2024-07-12T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31',
      'a3f1e4e8-99d2-44a3-bf47-c2e318baa123'
    ],
    type: 'taxi'
  },
  {
    id: 'bbd77e9c-8ef0-42d5-b0e3-36fa3de073df',
    basePrice: 1500,
    dateFrom: '2024-08-15T10:45:23.000Z',
    dateTo: '2024-08-15T13:30:00.000Z',
    destination: 'f7a5cb63-c1ee-4c32-9b7d-0f525e920e87',
    isFavorite: true,
    offers: [
      'ab12c4e3-45f3-43cb-9a07-8d5b1d034aa1',
      'fd2e3b29-4879-4c12-98e2-4e5a61dbb6d3'
    ],
    type: 'flight'
  },
  {
    id: 'd9b4d6f3-8d91-49e1-81d3-a6d2ef42c57d',
    basePrice: 800,
    dateFrom: '2024-09-05T09:55:45.000Z',
    dateTo: '2024-09-05T10:00:00.000Z',
    destination: 'bf97cb75-b2ef-4d74-a83f-0e527b920e22',
    isFavorite: false,
    offers: [
      '1ac3b3a5-90f2-4bc8-bb4f-2c13b9a4e5d2',
      'b1f3a2d7-12ab-4c9f-912a-9e57b3e1234f',
      '4f9e9f53-56fa-4c2c-b934-4eab917f38b7'
    ],
    type: 'drive'
  },
  {
    id: 'c1f8c9d4-478c-4d3e-b5ff-9e5b6e7c917f',
    basePrice: 600,
    dateFrom: '2024-10-01T14:22:00.000Z',
    dateTo: '2024-10-01T14:50:00.000Z',
    destination: 'e5d8a4b1-1d0b-4c4d-9f5c-3d273a5dfb6a',
    isFavorite: true,
    offers: [
      'c1e4d6b7-5b7a-4e1c-a4a6-3f2818b3312c',
      'b5f1c3d6-7c8e-4b3b-b6ff-8d7c1f3d5a5e',
      'a4b7c6d8-92cf-4f5d-8f3b-6d12b7c7d222'
    ],
    type: 'check-in'
  },
  {
    id: 'b5f6c7d8-9e8f-4c1d-8a6b-f5d3e7a9f312',
    basePrice: 450,
    dateFrom: '2024-11-01T10:00:00.000Z',
    dateTo: '2024-11-01T15:00:00.000Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31',
      'fd2e3b29-4879-4c12-98e2-4e5a61dbb6d3',
    ],
    type: 'drive',
  },
  {
    id: 'a1c2d3f4-5b6e-7a8f-9c0d-b4f5e6a1c278',
    basePrice: 600,
    dateFrom: '2024-11-01T08:00:00.000Z',
    dateTo: '2024-11-21T18:00:00.000Z',
    destination: 'f7a5cb63-c1ee-4c32-9b7d-0f525e920e87',
    isFavorite: true,
    offers: [
      'ab12c4e3-45f3-43cb-9a07-8d5b1d034aa1',
      'a3f1e4e8-99d2-44a3-bf47-c2e318baa123',
    ],
    type: 'flight',
  },
  {
    id: 'c3e4f5a6-7b8c-9d0e-f1a2-b5c3d4e6a9f1',
    basePrice: 750,
    dateFrom: '2024-11-10T09:00:00.000Z',
    dateTo: '2024-11-25T19:00:00.000Z',
    destination: 'bf97cb75-b2ef-4d74-a83f-0e527b920e22',
    isFavorite: false,
    offers: [
      'c1e4d6b7-5b7a-4e1c-a4a6-3f2818b3312c',
      'a4b7c6d8-92cf-4f5d-8f3b-6d12b7c7d222',
    ],
    type: 'check-in',
  },
  {
    id: 'd4e5f6a7-8b9c-0d1e-f2a3-c4d5e6f7a8b9',
    basePrice: 520,
    dateFrom: '2024-11-15T07:00:00.000Z',
    dateTo: '2024-11-22T14:00:00.000Z',
    destination: 'e5d8a4b1-1d0b-4c4d-9f5c-3d273a5dfb6a',
    isFavorite: true,
    offers: [
      'fd2e3b29-4879-4c12-98e2-4e5a61dbb6d3',
      'a3f1e4e8-99d2-44a3-bf47-c2e318baa123',
    ],
    type: 'taxi',
  },
  {
    id: 'e5f6a7b8-9c0d-1e2f-f3a4-d5e6f7b8a9c0',
    basePrice: 630,
    dateFrom: '2024-11-12T06:30:00.000Z',
    dateTo: '2024-11-26T17:00:00.000Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31',
      'ab12c4e3-45f3-43cb-9a07-8d5b1d034aa1',
    ],
    type: 'drive',
  },
  {
    id: 'f6a7b8c9-0d1e-2f3f-a4b5-c6d7e8f9a0b1',
    basePrice: 580,
    dateFrom: '2024-11-18T10:00:00.000Z',
    dateTo: '2024-11-28T16:00:00.000Z',
    destination: 'f7a5cb63-c1ee-4c32-9b7d-0f525e920e87',
    isFavorite: true,
    offers: [
      'a3f1e4e8-99d2-44a3-bf47-c2e318baa123',
      'fd2e3b29-4879-4c12-98e2-4e5a61dbb6d3',
    ],
    type: 'flight',
  },
  {
    id: 'g7a8b9c0-1d2e-3f4f-b5c6-d7e8f9a0b1c2',
    basePrice: 700,
    dateFrom: '2024-12-30T09:00:00.000Z',
    dateTo: '2024-12-30T17:00:00.000Z',
    destination: 'bf97cb75-b2ef-4d74-a83f-0e527b920e22',
    isFavorite: false,
    offers: [
      'c1e4d6b7-5b7a-4e1c-a4a6-3f2818b3312c',
      'a4b7c6d8-92cf-4f5d-8f3b-6d12b7c7d222',
    ],
    type: 'check-in',
  },
  {
    id: 'h8b9c0d1-2e3f-4g5f-c6d7-e8f9a0b1c3d4',
    basePrice: 620,
    dateFrom: '2024-12-05T08:30:00.000Z',
    dateTo: '2024-12-05T15:45:00.000Z',
    destination: 'e5d8a4b1-1d0b-4c4d-9f5c-3d273a5dfb6a',
    isFavorite: true,
    offers: [
      'fd2e3b29-4879-4c12-98e2-4e5a61dbb6d3',
      'b4c3e4e6-9053-42ce-b747-e281314baa31',
    ],
    type: 'taxi',
  },
  {
    id: 'i9c0d1e2-3f4g-5h6f-d7e8-f9a0b1c3d4e5',
    basePrice: 800,
    dateFrom: '2024-12-22T07:00:00.000Z',
    dateTo: '2024-12-22T13:00:00.000Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: false,
    offers: [
      'ab12c4e3-45f3-43cb-9a07-8d5b1d034aa1',
      'a3f1e4e8-99d2-44a3-bf47-c2e318baa123',
    ],
    type: 'drive',
  },
  {
    id: 'j0d1e2f3-4g5h-6i7f-e8f9-a0b1c3d4e5f6', // В будущем году
    basePrice: 900,
    dateFrom: '2024-12-20T09:30:00.000Z',
    dateTo: '2024-12-20T20:00:00.000Z',
    destination: 'f7a5cb63-c1ee-4c32-9b7d-0f525e920e87',
    isFavorite: true,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31',
      'fd2e3b29-4879-4c12-98e2-4e5a61dbb6d3',
    ],
    type: 'flight',
  },
];

const Destinations = [
  {
    id: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    description: 'Chamonix, is a beautiful city, a true Asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'https://20.objects.htmlacademy.pro/static/destinations/19.jpg',
        description: 'Naples a true asian pearl'
      },
      {
        src: 'https://20.objects.htmlacademy.pro/static/destinations/16.jpg',
        description: 'Naples full of of cozy canteens where you can try the best coffee in the Middle East'
      },
      {
        src: 'https://20.objects.htmlacademy.pro/static/destinations/20.jpg',
        description: 'Naples a true asian pearl'
      },
      {
        src: 'https://20.objects.htmlacademy.pro/static/destinations/8.jpg',
        description: 'Naples middle-eastern paradise'
      }
    ]
  },
  {
    id: 'f7a5cb63-c1ee-4c32-9b7d-0f525e920e87',
    description: 'Paris, the city of lights and love, known for its historic landmarks and cafes.',
    name: 'Paris',
    pictures: [
      {
        src: 'https://20.objects.htmlacademy.pro/static/destinations/8.jpg',
        description: 'Naples middle-eastern paradise'
      },
      {
        src: 'https://20.objects.htmlacademy.pro/static/destinations/7.jpg',
        description: 'Naples with crowded streets'
      },
      {
        src: 'https://20.objects.htmlacademy.pro/static/destinations/19.jpg',
        description: 'Naples a true asian pearl'
      }
    ]
  },
  {
    id: 'bf97cb75-b2ef-4d74-a83f-0e527b920e22',
    description: 'Berlin, a vibrant city with rich history and modern culture.',
    name: 'Berlin',
    pictures: []
  },
  {
    id: 'e5d8a4b1-1d0b-4c4d-9f5c-3d273a5dfb6a',
    description: 'Tokyo, a city that combines futuristic technology with traditional temples.',
    name: 'Tokyo',
    pictures: [
      {
        src: 'https://20.objects.htmlacademy.pro/static/destinations/16.jpg',
        description: 'Tokyo Tower in the evening'
      }
    ]
  }
];

const Offers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa31',
        title: 'Up to a business',
        price: 120
      },
      {
        id: 'a3f1e4e8-99d2-44a3-bf47-c2e318baa123',
        title: 'Choose the radio',
        price: 10
      },
      {
        id: 'd1e7c4b2-4d3f-423a-a347-e281afcb3321',
        title: 'Drive with air',
        price: 50
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 'c1e4d6b7-5b7a-4e1c-a4a6-3f2818b3312c',
        title: 'Priority check-in',
        price: 30
      },
      {
        id: 'b5f1c3d6-7c8e-4b3b-b6ff-8d7c1f3d5a5e',
        title: 'welcome drink',
        price: 15
      },
      {
        id: 'a4b7c6d8-92cf-4f5d-8f3b-6d12b7c7d222',
        title: 'Access to VIP',
        price: 100
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: '1ac3b3a5-90f2-4bc8-bb4f-2c13b9a4e5d2',
        title: 'Add luggage',
        price: 25
      },
      {
        id: 'b1f3a2d7-12ab-4c9f-912a-9e57b3e1234f',
        title: 'Ecenic route',
        price: 40
      },
      {
        id: '4f9e9f53-56fa-4c2c-b934-4eab917f38b7',
        title: 'Extra driver',
        price: 60
      },
      {
        id: 'd8b5c2e1-14ac-4c8f-9b1e-a9e23f4b3d45',
        title: 'Child seat',
        price: 15
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 'ab12c4e3-45f3-43cb-9a07-8d5b1d034aa1',
        title: 'Extra legroom',
        price: 50
      },
      {
        id: 'fd2e3b29-4879-4c12-98e2-4e5a61dbb6d3',
        title: 'In-flight meal',
        price: 20
      },
      {
        id: 'f9d1c3a7-9a3b-4d7e-b4c5-f5e3d7a6b123',
        title: 'Window seat',
        price: 15
      },
      {
        id: 'b5d3e4c6-8f4d-4c9e-a5d2-8f1e3a6b4d52',
        title: 'Priority boarding',
        price: 35
      },
      {
        id: 'e7c8a3d2-5b3f-4a7e-9c2d-a1d8b5f9d9ab',
        title: 'Track security',
        price: 25
      }
    ]
  }
];

const getRandomEvent = () => getRandomItemArray(Points);

export { getRandomEvent, Destinations, Offers };

