// ===== COOL FOOD - Menu Data =====
const MENU_DATA = {
  hotdog: [
    {
      id: 'hd1',
      name: 'Etalon Hot Dog (Standart)',
      desc: 'Hot dog çörəyi, iverya sosis, xüsusi sous, xardal, ketçup. Klassik lezzetli hot dog.',
      price: 6.90,
      emoji: '🌭',
      image: 'images/hotdog-hero.jpg',
      category: 'Hot-Dog'
    },
    {
      id: 'hd2',
      name: 'Sirrr Hot Dog (Pendirli)',
      desc: 'Hot dog çörəyi, iverya sosis, xüsusi sous, xüsusi pendirli sous. Pendir sevənlər üçün!',
      price: 7.90,
      emoji: '🌭',
      image: 'images/hotdog-hero.jpg',
      category: 'Hot-Dog'
    },
    {
      id: 'hd3',
      name: 'Hot-Hot Hot Dog (Acılı Meksikano)',
      desc: 'Hot dog çörəyi, iverya sosis, xüsusi sous, acı biber sousu, Meksika ədviyyatları. İstisevənlər üçün!',
      price: 7.90,
      emoji: '🌶️',
      image: 'images/hotdog-hero.jpg',
      category: 'Hot-Dog'
    }
  ],

  qelyanalt: [
    {
      id: 'qa1',
      name: 'Sendviç Vegetarian',
      desc: 'Təzə tərəvəzlər, mozzarella pendiri, xüsusi sous ilə hazırlanmış vegetarian sendviç.',
      price: 7.90,
      emoji: '🥪',
      image: null,
      category: 'Qəlyanaltı'
    },
    {
      id: 'qa2',
      name: 'Bomba Sendviç',
      desc: 'Dana əti, xüsusi sous, tərəvəzlər ilə hazırlanmış bomba dadlı sendviç.',
      price: 9.90,
      emoji: '🥪',
      image: null,
      category: 'Qəlyanaltı'
    },
    {
      id: 'qa3',
      name: 'Koko Popkorn (Toyuq)',
      desc: 'Xüsusi un xəmirində qızardılmış toyuq parçaları. Çox dadlı qəlyanaltı.',
      price: 8.90,
      emoji: '🍿',
      image: null,
      category: 'Qəlyanaltı'
    },
    {
      id: 'qa4',
      name: 'Krevetka Çöp',
      desc: 'Şüşəyə taxılmış, qızardılmış krevetka. Dəniz nemətlərini sevirsinizsə, bu sizin üçündür!',
      price: 8.90,
      emoji: '🍤',
      image: null,
      category: 'Qəlyanaltı'
    },
    {
      id: 'qa5',
      name: 'Toyuq Qanadları',
      desc: 'Xüsusi marinadda bişirilmiş, sousla servis edilən toyuq qanadları.',
      price: 8.90,
      emoji: '🍗',
      image: null,
      category: 'Qəlyanaltı'
    },
    {
      id: 'qa6',
      name: 'Toyuq Qanadları Yırt',
      desc: 'Xüsusi ədviyyatlarla hazırlanmış, xırtıldayan toyuq qanadları.',
      price: 9.90,
      emoji: '🍗',
      image: null,
      category: 'Qəlyanaltı'
    },
    {
      id: 'qa7',
      name: 'Çips (Mozarella Pendirli)',
      desc: 'Çıtır kartof çipsi üzərindən mozarella pendiri ilə servis olunur.',
      price: 8.90,
      emoji: '🧀',
      image: null,
      category: 'Qəlyanaltı'
    }
  ],

  burger: [
    {
      id: 'b1',
      name: 'Koko Burger İzqara (Toyuq)',
      desc: 'Burger çörəyi, izqarada bişirilmiş toyuq əti, pomidor, duzlu xiyar, xüsusi sous.',
      price: 6.90,
      emoji: '🍔',
      image: null,
      category: 'Burger'
    },
    {
      id: 'b2',
      name: 'Pan Koko Burger (Toyuq)',
      desc: 'Burger çörəyi, tavada bişirilmiş toyuq əti, pomidor, duzlu xiyar, sous.',
      price: 7.90,
      emoji: '🍔',
      image: null,
      category: 'Burger'
    },
    {
      id: 'b3',
      name: 'Çivauva Burger (Toyuq)',
      desc: 'Çiabata çörəyi, toyuq əti, pomidor, duzlu xiyar, xüsusi sous.',
      price: 8.90,
      emoji: '🍔',
      image: null,
      category: 'Burger'
    },
    {
      id: 'b4',
      name: 'Çizburger (Ət)',
      desc: 'Burger çörəyi, dana əti, çedar pendiri, pomidor, duzlu xiyar, sous.',
      price: 9.90,
      emoji: '🍔',
      image: null,
      category: 'Burger'
    },
    {
      id: 'b5',
      name: 'Napoli Burger',
      desc: 'Burger çörəyi, dana əti, çedar pendiri, xüsusi Napoli sousu, tərəvəzlər.',
      price: 10.90,
      emoji: '🍔',
      image: null,
      category: 'Burger'
    },
    {
      id: 'b6',
      name: 'Vegeterian Burger',
      desc: 'Çörək, göbələk, qaymaq, çedar pendiri, pomidor, xırtıldayan gəvən.',
      price: 10.90,
      emoji: '🥗',
      image: null,
      category: 'Burger'
    },
    {
      id: 'b7',
      name: 'Americano Burger (Ət)',
      desc: 'Burger çörəyi, dana əti, pomidor, duzlu xiyar, xüsusi Americano sousu.',
      price: 10.90,
      emoji: '🍔',
      image: null,
      category: 'Burger'
    },
    {
      id: 'b8',
      name: 'Tako Burger (Ət)',
      desc: 'Lavəş, dana əti, çedar pendiri, pomidor, duzlu xiyar, tako ədviyyatı.',
      price: 10.90,
      emoji: '🌮',
      image: null,
      category: 'Burger'
    },
    {
      id: 'b9',
      name: 'Aysberq Burger (Ət)',
      desc: 'Burger çörəyi, dana əti, aysberq kələmi, xüsusi sous, turşu.',
      price: 13.90,
      emoji: '🍔',
      image: null,
      category: 'Burger'
    }
  ],

  sorba: [
    {
      id: 's1',
      name: 'Günün Şorbası',
      desc: 'Hər gün təzə hazırlanan ev şorbası. Detallar üçün müraciət edin.',
      price: 4.90,
      emoji: '🍲',
      image: null,
      category: 'Şorba'
    },
    {
      id: 's2',
      name: 'Toyuq Şorbası',
      desc: 'Ev üsulunda bişirilmiş dadlı toyuq şorbası.',
      price: 5.90,
      emoji: '🍜',
      image: null,
      category: 'Şorba'
    }
  ],

  soyuq: [
    {
      id: 'si1',
      name: 'H2O (Su qazsız)',
      desc: 'Təmiz içməli su, qazsız. 0.5L',
      price: 1.50,
      emoji: '💧',
      image: null,
      category: 'Soyuq İçkilər'
    },
    {
      id: 'si2',
      name: 'H2O (Su qazlı)',
      desc: 'Qazlı içməli su. 0.5L',
      price: 1.50,
      emoji: '💧',
      image: null,
      category: 'Soyuq İçkilər'
    },
    {
      id: 'si3',
      name: 'Coca-Cola 300 ml',
      desc: 'Coca-Cola – klassik dadlı içki. 300 ml şüşə.',
      price: 2.00,
      emoji: '🥤',
      image: null,
      category: 'Soyuq İçkilər'
    },
    {
      id: 'si4',
      name: 'Fanta 300 ml',
      desc: 'Fanta portağal içki. 300 ml şüşə.',
      price: 2.00,
      emoji: '🍊',
      image: null,
      category: 'Soyuq İçkilər'
    },
    {
      id: 'si5',
      name: 'Sprite 300 ml',
      desc: 'Sprite sitrus içki. 300 ml.',
      price: 2.00,
      emoji: '🥤',
      image: null,
      category: 'Soyuq İçkilər'
    },
    {
      id: 'si6',
      name: 'Milkşeyk',
      desc: 'Çox dadlı süd içkisi. Müxtəlif ləzzətlərdə.',
      price: 4.90,
      emoji: '🥛',
      image: null,
      category: 'Soyuq İçkilər'
    },
    {
      id: 'si7',
      name: 'Bananlı Milkşeyk',
      desc: 'Banan ləzzətli soyuq milkşeyk. 350 ml.',
      price: 5.90,
      emoji: '🍌',
      image: null,
      category: 'Soyuq İçkilər'
    }
  ],

  isti: [
    {
      id: 'ii1',
      name: 'Çay (Stəkan)',
      desc: 'Ətirli çay, stəkanda servis olunur.',
      price: 1.00,
      emoji: '🍵',
      image: null,
      category: 'İsti İçkilər'
    },
    {
      id: 'ii2',
      name: 'Çay (Çaynik)',
      desc: 'Çaynikdə servis olunan bol çay.',
      price: 5.00,
      emoji: '☕',
      image: null,
      category: 'İsti İçkilər'
    },
    {
      id: 'ii3',
      name: 'Amerikano',
      desc: 'Klassik Americano qəhvəsi. Güclü, ətirli.',
      price: 3.90,
      emoji: '☕',
      image: null,
      category: 'İsti İçkilər'
    },
    {
      id: 'ii4',
      name: 'Espresso',
      desc: 'Güclü İtalyan espresso qəhvəsi.',
      price: 3.90,
      emoji: '☕',
      image: null,
      category: 'İsti İçkilər'
    },
    {
      id: 'ii5',
      name: 'Kapuçino',
      desc: 'Kremli, ətirli kapuçino qəhvəsi.',
      price: 4.50,
      emoji: '☕',
      image: null,
      category: 'İsti İçkilər'
    },
    {
      id: 'ii6',
      name: 'Latte',
      desc: 'Südlü latte – yumşaq dadlı qəhvə.',
      price: 4.50,
      emoji: '☕',
      image: null,
      category: 'İsti İçkilər'
    }
  ],

  extra: [
    {
      id: 'ex1',
      name: 'Əlcək',
      desc: 'Yeməkdən əvvəl əlcək.',
      price: 0.50,
      emoji: '🧤',
      image: null,
      category: 'Extra'
    },
    {
      id: 'ex2',
      name: 'Jelapino Sous',
      desc: 'Acılı Jalapeño sousu.',
      price: 0.50,
      emoji: '🌶️',
      image: null,
      category: 'Extra'
    },
    {
      id: 'ex3',
      name: 'Sriraça Çili Sous',
      desc: 'Sriraça əsaslı acı çili sousu.',
      price: 0.50,
      emoji: '🌶️',
      image: null,
      category: 'Extra'
    },
    {
      id: 'ex4',
      name: 'Ketçup',
      desc: 'Klassik pomidor ketçup.',
      price: 0.50,
      emoji: '🍅',
      image: null,
      category: 'Extra'
    },
    {
      id: 'ex5',
      name: 'Mayonez',
      desc: 'Kremli mayonez sousu.',
      price: 0.50,
      emoji: '🥄',
      image: null,
      category: 'Extra'
    },
    {
      id: 'ex6',
      name: 'Pendirli Sous',
      desc: 'Xüsusi hazırlanmış pendirli sous.',
      price: 0.50,
      emoji: '🧀',
      image: null,
      category: 'Extra'
    },
    {
      id: 'ex7',
      name: 'Şirin Çili Sous',
      desc: 'Şirin-acı çili sousu.',
      price: 0.50,
      emoji: '🍯',
      image: null,
      category: 'Extra'
    },
    {
      id: 'ex8',
      name: 'Xardal Sous',
      desc: 'Klassik xardal sousu.',
      price: 0.50,
      emoji: '🌻',
      image: null,
      category: 'Extra'
    }
  ]
};

// ===== VACANCIES DATA =====
const VACANCIES_DATA = [
  {
    id: 'v1',
    title: 'Kassir / Sərvis Müştəri',
    tag: 'Tam Ştat',
    dept: 'Xidmət',
    location: 'Bakı',
    schedule: 'Növbəli iş',
    salary: 'Razılaşma ilə',
    desc: 'Müştərilərə gülərüzlü xidmət göstərən, sürətli iş tempi olan kassir axtarıyırıq.',
    requirements: [
      'Kommunikasiya bacarıqları',
      'Gülərüz olmaq',
      'Yemək sektoru təcrübəsi üstünlük',
      'Azərbaycan dili biliyi',
      'Yaş: 18-35'
    ],
    duties: [
      'Müştərilərlə ünsiyyət qurmaq',
      'Sifarişləri qəbul etmək',
      'Kassa əməliyyatları',
      'Yeməkxananı səliqəli saxlamaq'
    ]
  },
  {
    id: 'v2',
    title: 'Aşpaz / Bürger Hazırlayan',
    tag: 'Tam Ştat',
    dept: 'Mətbəx',
    location: 'Bakı',
    schedule: 'Növbəli iş',
    salary: 'Razılaşma ilə',
    desc: 'Sürətli iş tempinə uyğunlaşa bilən, keyfiyyəti önə çəkən aşpaz axtarıyırıq.',
    requirements: [
      'Mətbəx təcrübəsi (üstünlük)',
      'Sürətli işləmək',
      'Sanitariya qaydaları bilmək',
      'Komanda ruhu',
      'Yaş: 18-45'
    ],
    duties: [
      'Burger və hot-dog hazırlamaq',
      'Qəlyanaltı bişirmək',
      'Mətbəx gigiyenasını qorumaq',
      'Məhsul keyfiyyətinə nəzarət etmək'
    ]
  },
  {
    id: 'v3',
    title: 'Çatdırılma Sürücüsü',
    tag: 'Yarım / Tam Ştat',
    dept: 'Çatdırılma',
    location: 'Bakı',
    schedule: 'Çevik saat',
    salary: 'Razılaşma ilə',
    desc: 'Sifarişləri vaxtında, salamat çatdıran motosiklet və ya avtomobil sürücüsü axtarıyırıq.',
    requirements: [
      'Sürücülük şəhadətnaməsi',
      'Bakı yollarını bilmək',
      'Məsuliyyətli olmaq',
      'Motosiklet / avtomobil',
      'Yaş: 20-45'
    ],
    duties: [
      'Sifarişləri vaxtında çatdırmaq',
      'Müştərilərlə nəzakətli ünsiyyət',
      'Marşrutları optimallaşdırmaq'
    ]
  },
  {
    id: 'v4',
    title: 'SMM Mütəxəssisi',
    tag: 'Part-time',
    dept: 'Marketinq',
    location: 'Bakı / Remote',
    schedule: 'Çevik saat',
    salary: 'Razılaşma ilə',
    desc: 'Instagram, TikTok və digər sosial media platformalarında Cool Food-u populyarlaşdıracaq kreativ şəxs axtarıyırıq.',
    requirements: [
      'Instagram/TikTok bilikləri',
      'Kreativ düşüncə',
      'Foto/video çəkmək bacarığı',
      'Copywriting bacarıqları',
      'Azərbaycan dili biliyi'
    ],
    duties: [
      'Gündəlik post paylaşmaq',
      'Reels / video hazırlamaq',
      'Müştəri şərhlərinə cavab vermək',
      'Kampaniyalar hazırlamaq'
    ]
  }
];
