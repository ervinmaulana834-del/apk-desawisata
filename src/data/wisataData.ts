export type PackageCategory = 'semua' | 'alam' | 'edukasi' | 'keluarga';

export interface ItineraryStep {
  time: string;
  activity: string;
}

export interface TourPackage {
  id: string;
  title: string;
  category: Exclude<PackageCategory, 'semua'>;
  categoryLabel: string;
  duration: string;
  capacity: string;
  audience: string;
  pricePerPerson: number;
  image: string;
  imageAlt: string;
  summary: string;
  highlights: string[];
  itinerary: ItineraryStep[];
}

export interface Testimonial {
  id: string;
  authorName: string;
  origin: string;
  packageId: string;
  packageTitle: string;
  visitDate: string;
  rating: number;
  quote: string;
  outcome: string;
}

export const WHATSAPP_NUMBER = '6281234567890';
export const WHATSAPP_DISPLAY = '+62 812-3456-7890';

export const HERO_IMAGE = {
  src: '/src/assets/images/hero_lereng_asri_1794887194267.jpg',
  alt: 'Pendopo bambu hangat di Desa Wisata Lereng Asri yang dikelilingi terasering kebun teh, kopi, dan kabut pagi pegunungan',
};

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'trekking-air-terjun',
    title: 'Jelajah Hutan Pinus & Air Terjun Embun',
    category: 'alam',
    categoryLabel: 'Alam & Trekking',
    duration: '4 Jam',
    capacity: 'Min. 2 orang',
    audience: 'Cocok untuk remaja, keluarga aktif & komunitas',
    pricePerPerson: 135000,
    image: '/src/assets/images/paket_trekking_airterjun_1794887194484.jpg',
    imageAlt: 'Jalur jalan kaki batu alam dan jembatan bambu menuju Air Terjun Embun yang jernih di hutan pegunungan Lereng Asri',
    summary:
      'Menyusuri jalur setapak batu alam yang aman dan rindang menuju air terjun pegunungan yang jernih, dipandu warga lokal yang ramah.',
    highlights: [
      'Pemandu wisata lokal bersertifikat & kotak P3K',
      'Teh jahe hangat & jajanan pasar di pos istirahat',
      'Tiket masuk kawasan air terjun & dokumentasi foto',
      'Jalur aman berpegangan bambu dengan tanjakan landai',
    ],
    itinerary: [
      { time: '07.30 WIB', activity: 'Penyambutan di Pendopo Lereng Asri & minum teh hangat' },
      { time: '08.00 WIB', activity: 'Jalan santai menyusuri kebun teh dan hutan pinus' },
      { time: '09.15 WIB', activity: 'Tiba di Air Terjun Embun, bermain air & sesi foto' },
      { time: '11.00 WIB', activity: 'Kembali ke pendopo dengan kudapan singkong keju hangat' },
    ],
  },
  {
    id: 'edukasi-petik-kopi',
    title: 'Edukasi Petik & Sangrai Kopi Pegunungan',
    category: 'edukasi',
    categoryLabel: 'Edukasi & Budaya',
    duration: '3,5 Jam',
    capacity: 'Min. 4 orang',
    audience: 'Cocok untuk pelajar, keluarga & rombongan kantor',
    pricePerPerson: 155000,
    image: '/src/assets/images/paket_kopi_edukasi_1794887194931.jpg',
    imageAlt: 'Warga Desa Wisata Lereng Asri menyortir dan menyangrai biji kopi arabika pegunungan menggunakan tampah bambu dan wajan tanah liat',
    summary:
      'Belajar langsung dari petani desa: memetik buah kopi merah di kebun terasering, menyangrai dengan wajan tanah liat, hingga menyeduh kopi segar.',
    highlights: [
      'Tur kebun kopi arabika lereng bersama petani desa',
      'Praktik sangrai tradisional & seduh manual bersama',
      'Oleh-oleh 100 gram kopi bubuk hasil sangrai sendiri',
      'Sajian pisang goreng gula aren dan teh daun kopi',
    ],
    itinerary: [
      { time: '08.30 WIB', activity: 'Pengenalan jenis kopi arabika di kebun lereng desa' },
      { time: '09.15 WIB', activity: 'Praktik petik buah kopi matang dan proses jemur' },
      { time: '10.30 WIB', activity: 'Menyangrai biji kopi di atas tungku kayu & wajan tanah liat' },
      { time: '11.30 WIB', activity: 'Cicip kopi hangat bersama warga & bawa pulang kemasan kopi' },
    ],
  },
  {
    id: 'kemah-keluarga-asri',
    title: 'Kemah Nyaman Keluarga & Api Unggun',
    category: 'keluarga',
    categoryLabel: 'Keluarga & Kemah',
    duration: '2 Hari 1 Malam',
    capacity: '2–5 orang per tenda',
    audience: 'Cocok untuk keluarga dengan anak-anak & lansia',
    pricePerPerson: 295000,
    image: '/src/assets/images/paket_kemah_keluarga_1794887195129.jpg',
    imageAlt: 'Tenda kemah keluarga yang luas dan rapi di atas rumput hijau menghadap lembah pegunungan berkabut saat matahari terbit',
    summary:
      'Menginap nyaman tanpa repot di tenda kanvas luas berkasur empuk, lengkap dengan dek kayu, makan malam hangat, api unggun, dan sarapan pagi menghadap lembah.',
    highlights: [
      'Tenda kanvas keluarga sudah terpasang dengan kasur & selimut tebal',
      'Kamar mandi bersih air hangat berjarak 20 meter',
      'Makan malam nasi liwet hangat, jagung bakar & sarapan pagi',
      'Area rumput datar aman untuk anak-anak bermain bebas',
    ],
    itinerary: [
      { time: '14.00 WIB', activity: 'Check-in tenda keluarga & selamat datang minuman rempah' },
      { time: '16.30 WIB', activity: 'Jalan sore melihat matahari terbenam dari bukit pandang' },
      { time: '19.30 WIB', activity: 'Makan malam bersama & api unggun dengan jagung bakar' },
      { time: '07.00 WIB', activity: 'Sarapan pagi di dek kayu menghadap kabut lembah' },
    ],
  },
  {
    id: 'kuliner-joglo-sawah',
    title: 'Wisata Kuliner Joglo & Panen Sayur Organik',
    category: 'keluarga',
    categoryLabel: 'Keluarga & Kemah',
    duration: '3 Jam',
    capacity: 'Min. 2 orang',
    audience: 'Cocok untuk keluarga besar, arisan & orang tua',
    pricePerPerson: 125000,
    image: '/src/assets/images/paket_kuliner_desa_1794887196456.jpg',
    imageAlt: 'Hidangan nasi liwet tradisional beralas daun pisang dengan ayam bakar dan lalapan segar di pendopo bambu menghadap sawah hijau',
    summary:
      'Memetik sayur segar dari kebun warga tanpa rute menanjak, dilanjutkan santap siang nasi liwet ayam bakar di pendopo bambu terbuka menghadap terasering hijau.',
    highlights: [
      'Petik sayur organik langsung di kebun datar ramah lansia',
      'Makan siang komplet nasi liwet daun pisang, ayam kampung & lalapan',
      'Minuman es kelapa muda atau wedang uwuh hangat sepuasnya',
      'Tempat duduk joglo luas dengan akses kursi roda yang mudah',
    ],
    itinerary: [
      { time: '10.00 WIB', activity: 'Tiba di Pendopo Joglo & sambutan wedang uwuh hangat' },
      { time: '10.30 WIB', activity: 'Petik selada, tomat ceri & cabai segar di kebun desa' },
      { time: '11.45 WIB', activity: 'Santap siang liwetan hangat menghadap terasering sawah' },
      { time: '13.00 WIB', activity: 'Santai sore & bebas membawa pulang hasil petik sayur' },
    ],
  },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-1',
    authorName: 'Ibu Ratna Kusuma',
    origin: 'Wisatawan Keluarga · Surabaya',
    packageId: 'kemah-keluarga-asri',
    packageTitle: 'Kemah Nyaman Keluarga & Api Unggun',
    visitDate: 'Oktober 2026',
    rating: 5,
    quote:
      'Awalnya ragu mengajak dua anak kecil dan orang tua berkemah, takut dingin dan kamar mandi jauh. Ternyata tendanya sangat rapi, kasurnya hangat, dan toilet bersihnya dekat sekali. Anak-anak senang sekali membakar jagung malam hari.',
    outcome: 'Liburan akhir pekan bebas gadget & tidur nyenyak',
  },
  {
    id: 'testi-2',
    authorName: 'Bapak Hendra Wijaya',
    origin: 'Koordinator Outing PT Sinar Nusantara · Semarang',
    packageId: 'edukasi-petik-kopi',
    packageTitle: 'Edukasi Petik & Sangrai Kopi Pegunungan',
    visitDate: 'September 2026',
    rating: 5,
    quote:
      'Kami membawa 28 karyawan untuk kegiatan kebersamaan. Komunikasi lewat WhatsApp sangat cepat dan jadwalnya tertata rapi sejak pagi. Petani kopinya sabar menjelaskan dan kopi hasil sangrai sendiri jadi oleh-oleh favorit tim.',
    outcome: '28 peserta puas, proses pemesanan selesai dalam 15 menit',
  },
  {
    id: 'testi-3',
    authorName: 'Nadia Putri Pratiwi',
    origin: 'Wisatawan Mandiri · Yogyakarta',
    packageId: 'trekking-air-terjun',
    packageTitle: 'Jelajah Hutan Pinus & Air Terjun Embun',
    visitDate: 'Oktober 2026',
    rating: 5,
    quote:
      'Jalur ke air terjunnya bersih, tidak licin, dan pemandu kami Mas Bagus sangat memperhatikan langkah setiap peserta. Air terjunnya masih asri sekali dan suguhan teh jahe di pos istirahat membuat badan langsung hangat kembali.',
    outcome: 'Trekking aman untuk pemula dengan suasana hutan terjaga',
  },
  {
    id: 'testi-4',
    authorName: 'Pak Budi Santoso',
    origin: 'Rombongan Keluarga Besar · Solo',
    packageId: 'kuliner-joglo-sawah',
    packageTitle: 'Wisata Kuliner Joglo & Panen Sayur Organik',
    visitDate: 'Agustus 2026',
    rating: 5,
    quote:
      'Ibu saya yang berusia 72 tahun bisa ikut menikmati suasana tanpa harus mendaki tangga curam. Akses ke joglonya rata, makanannya hangat dan bumbunya terasa segar sekali. Tempat terbaik untuk kumpul keluarga lintas usia.',
    outcome: 'Nyaman untuk lansia & balita, hidangan habis tak bersisa',
  },
];

export const CATEGORY_FILTERS: { id: PackageCategory; label: string }[] = [
  { id: 'semua', label: 'Semua Paket' },
  { id: 'alam', label: 'Alam & Trekking' },
  { id: 'edukasi', label: 'Edukasi & Budaya' },
  { id: 'keluarga', label: 'Keluarga & Kemah' },
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function buildWhatsAppUrl(params: {
  packageTitle: string;
  visitorName?: string;
  visitDate?: string;
  guestCount?: number;
  notes?: string;
  estimatedTotal?: number;
}): string {
  const lines = [
    'Halo Admin Desa Wisata Lereng Asri,',
    '',
    'Saya tertarik untuk memesan / menanyakan ketersediaan paket berikut:',
    `- Paket: ${params.packageTitle}`,
  ];

  if (params.visitorName && params.visitorName.trim()) {
    lines.push(`- Nama Pemesan: ${params.visitorName.trim()}`);
  }
  if (params.visitDate && params.visitDate.trim()) {
    lines.push(`- Rencana Tanggal: ${params.visitDate.trim()}`);
  }
  if (params.guestCount && params.guestCount > 0) {
    lines.push(`- Jumlah Peserta: ${params.guestCount} orang`);
  }
  if (params.estimatedTotal && params.estimatedTotal > 0) {
    lines.push(`- Perkiraan Biaya: ${formatRupiah(params.estimatedTotal)}`);
  }
  if (params.notes && params.notes.trim()) {
    lines.push(`- Catatan: ${params.notes.trim()}`);
  }

  lines.push('', 'Mohon info ketersediaan jadwalnya. Terima kasih!');
  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
