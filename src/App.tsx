import { useMemo, useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Compass,
  Home,
  MessageCircle,
  Minus,
  Plus,
  Star,
  Users,
} from 'lucide-react';
import { ResilientImage } from './components/ResilientImage';
import { TestimonialFormModal } from './components/TestimonialFormModal';
import { WhatsAppBookingModal } from './components/WhatsAppBookingModal';
import {
  CATEGORY_FILTERS,
  HERO_IMAGE,
  INITIAL_TESTIMONIALS,
  TOUR_PACKAGES,
  WHATSAPP_DISPLAY,
  buildWhatsAppUrl,
  formatRupiah,
  type PackageCategory,
  type Testimonial,
} from './data/wisataData';

type MobileTab = 'beranda' | 'paket' | 'testimoni';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<PackageCategory>('semua');
  const [expandedItineraryId, setExpandedItineraryId] = useState<string | null>(null);

  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [testimonialFilter, setTestimonialFilter] = useState<string>('semua');
  const [testimonialNotice, setTestimonialNotice] = useState<string>('');

  const [isWaModalOpen, setIsWaModalOpen] = useState(false);
  const [waModalPackageId, setWaModalPackageId] = useState<string | undefined>(undefined);
  const [isTestiModalOpen, setIsTestiModalOpen] = useState(false);

  const [activeMobileTab, setActiveMobileTab] = useState<MobileTab>('beranda');

  // Interactive quick estimator in the bottom Contact & Booking section
  const [quickPkgId, setQuickPkgId] = useState<string>(TOUR_PACKAGES[0].id);
  const [quickGuests, setQuickGuests] = useState<number>(4);
  const [quickDate, setQuickDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [quickVisitorName, setQuickVisitorName] = useState<string>('');

  const filteredPackages = useMemo(() => {
    if (selectedCategory === 'semua') return TOUR_PACKAGES;
    return TOUR_PACKAGES.filter((pkg) => pkg.category === selectedCategory);
  }, [selectedCategory]);

  const filteredTestimonials = useMemo(() => {
    if (testimonialFilter === 'semua') return testimonials;
    return testimonials.filter((item) => item.packageId === testimonialFilter);
  }, [testimonials, testimonialFilter]);

  const averageRating = useMemo(() => {
    const baseCount = 180;
    const baseSum = 180 * 4.9;
    const extraCount = testimonials.length - INITIAL_TESTIMONIALS.length;
    const extraSum = testimonials
      .slice(0, Math.max(0, extraCount))
      .reduce((acc, item) => acc + item.rating, 0);
    const totalCount = baseCount + testimonials.length;
    const avg = (baseSum + INITIAL_TESTIMONIALS.reduce((a, b) => a + b.rating, 0) + extraSum) / totalCount;
    return {
      score: avg.toFixed(1).replace('.', ','),
      totalReviews: totalCount,
    };
  }, [testimonials]);

  const quickPackage = useMemo(
    () => TOUR_PACKAGES.find((p) => p.id === quickPkgId) || TOUR_PACKAGES[0],
    [quickPkgId]
  );

  const quickTotalCost = quickPackage.pricePerPerson * quickGuests;

  const quickWaHref = useMemo(() => {
    const parsedDate = quickDate ? new Date(`${quickDate}T00:00:00`) : null;
    const formattedDate =
      parsedDate && !Number.isNaN(parsedDate.getTime())
        ? parsedDate.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : quickDate;

    return buildWhatsAppUrl({
      packageTitle: quickPackage.title,
      visitorName: quickVisitorName,
      visitDate: formattedDate,
      guestCount: quickGuests,
      estimatedTotal: quickTotalCost,
    });
  }, [quickPackage.title, quickVisitorName, quickDate, quickGuests, quickTotalCost]);

  const openWhatsAppBooking = (packageId?: string) => {
    setWaModalPackageId(packageId);
    setIsWaModalOpen(true);
  };

  const handleAddTestimonial = (newItem: Testimonial) => {
    setTestimonials((prev) => [newItem, ...prev]);
    setTestimonialFilter('semua');
    setTestimonialNotice(
      `Terima kasih, ${newItem.authorName}! Testimoni Anda sudah tampil di daftar ulasan pengunjung.`
    );
  };

  const scrollToSection = (sectionId: string, tab?: MobileTab) => {
    if (tab) setActiveMobileTab(tab);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#162419] pb-20 md:pb-0">
      {/* Top Bar: Strictly 1 row, 3 zones separated by gap-8 */}
      <header className="md:sticky md:top-0 z-30 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E5E3DC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('beranda', 'beranda');
            }}
            className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#162419] whitespace-nowrap shrink-0"
          >
            Lereng Asri
          </a>

          <nav
            aria-label="Navigasi Utama"
            className="hidden md:flex items-center gap-6 text-[15px] font-medium text-[#3D4F41]"
          >
            <a
              href="#beranda"
              className="hover:text-[#1B5E3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Beranda
            </a>
            <a
              href="#paket"
              className="hover:text-[#1B5E3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Paket Wisata
            </a>
            <a
              href="#testimoni"
              className="hover:text-[#1B5E3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Testimoni
            </a>
            <a
              href="#lokasi"
              className="hover:text-[#1B5E3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Lokasi &amp; Jadwal
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => openWhatsAppBooking()}
              className="min-h-[44px] px-4 sm:px-5 py-2 rounded-xl bg-[#1B5E3A] hover:bg-[#14482C] text-white text-sm sm:text-[15px] font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Pesan WhatsApp</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Section 1: Beranda / Hero */}
        <section id="beranda" className="pt-6 pb-10 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Mobile-first Hero Image appears first on small screens, right column on desktop */}
              <div className="lg:col-span-7 lg:order-2 relative rounded-2xl overflow-hidden border border-[#E5E3DC] bg-[#E6EDE4] min-h-[240px] sm:min-h-[340px]">
                <ResilientImage
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  loading="eager"
                  fallbackLabel="Desa Wisata Lereng Asri"
                  className="w-full h-full aspect-[16/9] lg:aspect-auto lg:h-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#162419]/80 via-[#162419]/20 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <p className="text-sm sm:text-base font-medium text-white/95">
                    Pendopo Utama Lereng Asri · Ketinggian 1.150 mdpl, Udara Sejuk Alami
                  </p>
                </div>
              </div>

              {/* Hero Copy & Dominant Primary CTA */}
              <div className="lg:col-span-5 lg:order-1 flex flex-col justify-center">
                <p className="text-sm font-medium text-[#1B5E3A] mb-3">
                  Desa Wisata Alam, Edukasi &amp; Kuliner Keluarga
                </p>

                <h1 className="font-display text-[2.15rem] sm:text-4xl lg:text-[2.85rem] font-bold leading-[1.15] tracking-tight text-[#162419] [text-wrap:balance] mb-4">
                  Segarnya Alam Pegunungan di Desa Wisata Lereng Asri
                </h1>

                <p className="text-base sm:text-[17px] text-[#3D4F41] leading-relaxed mb-7 max-w-xl">
                  Ajak keluarga dan rombongan menikmati udara pagi yang bersih, jalan santai menuju
                  air terjun, belajar sangrai kopi bersama petani, hingga santap siang hangat di
                  pendopo bambu.
                </p>

                <div className="flex flex-col sm:flex-row gap-3.5">
                  <button
                    type="button"
                    onClick={() => openWhatsAppBooking()}
                    className="min-h-[54px] px-6 py-3.5 rounded-xl bg-[#1B5E3A] hover:bg-[#14482C] active:scale-[0.99] text-white text-base sm:text-[17px] font-semibold flex items-center justify-center gap-2.5 shadow-sm transition-all whitespace-nowrap cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>Pesan via WhatsApp</span>
                  </button>

                  <a
                    href="#paket"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('paket', 'paket');
                    }}
                    className="min-h-[54px] px-6 py-3.5 rounded-xl bg-white hover:bg-[#EFF3EC] border border-[#D4D1C7] text-[#162419] text-base font-semibold flex items-center justify-center transition-colors whitespace-nowrap"
                  >
                    Lihat Paket Wisata
                  </a>
                </div>

                <p className="text-sm text-[#4A5D4E] mt-4">
                  Tanpa uang muka rumit · Konsultasi jadwal gratis setiap hari pukul 07.00–20.00 WIB
                </p>
              </div>
            </div>

            {/* Full-Width 4-Column Trust Strip below Hero Split */}
            <div className="mt-10 pt-8 border-t border-[#E5E3DC] grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#162419] tabular-nums">
                  {averageRating.score} / 5
                </p>
                <p className="text-sm sm:text-[15px] text-[#4A5D4E] mt-1">
                  Nilai kepuasan dari {averageRating.totalReviews}+ tamu
                </p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#162419] tabular-nums">
                  1.150 mdpl
                </p>
                <p className="text-sm sm:text-[15px] text-[#4A5D4E] mt-1">
                  Suhu sejuk 19–24°C sepanjang hari
                </p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#162419] tabular-nums">
                  45 Menit
                </p>
                <p className="text-sm sm:text-[15px] text-[#4A5D4E] mt-1">
                  Akses jalan aspal mulus dari pusat kota
                </p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#162419] tabular-nums">
                  100% Warga
                </p>
                <p className="text-sm sm:text-[15px] text-[#4A5D4E] mt-1">
                  Dikelola ramah oleh masyarakat desa lokal
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Paket Wisata */}
        <section id="paket" className="py-12 sm:py-16 bg-[#EFF3EC] border-y border-[#E5E3DC]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div className="max-w-2xl">
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#162419] [text-wrap:balance]">
                  Pilihan Paket Wisata Lereng Asri
                </h2>
                <p className="text-base sm:text-[17px] text-[#3D4F41] mt-2">
                  Harga transparan per orang tanpa biaya tersembunyi. Pilih paket yang paling
                  sesuai dengan usia dan minat rombongan Anda.
                </p>
              </div>

              {/* Interactive Filter Controls */}
              <div
                role="tablist"
                aria-label="Filter kategori paket wisata"
                className="flex flex-wrap gap-2"
              >
                {CATEGORY_FILTERS.map((tab) => {
                  const isActive = selectedCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCategory(tab.id)}
                      className={`min-h-[44px] px-4 py-2 rounded-xl text-sm sm:text-[15px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-[#1B5E3A] text-white shadow-sm'
                          : 'bg-white text-[#3D4F41] border border-[#D4D1C7] hover:bg-[#FAF9F6] hover:text-[#162419]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {filteredPackages.map((pkg) => {
                const isExpanded = expandedItineraryId === pkg.id;
                return (
                  <article
                    key={pkg.id}
                    className="bg-white rounded-2xl border border-[#E5E3DC] overflow-hidden flex flex-col"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-[#E6EDE4]">
                      <ResilientImage
                        src={pkg.image}
                        alt={pkg.imageAlt}
                        fallbackLabel={pkg.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-5 sm:p-6 flex-1 flex flex-col">
                      {/* Clean Unboxed Metadata */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#4A5D4E] mb-2">
                        <span className="font-medium text-[#1B5E3A]">{pkg.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{pkg.duration}</span>
                        <span aria-hidden="true">·</span>
                        <span>{pkg.capacity}</span>
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#162419] leading-snug mb-2">
                        {pkg.title}
                      </h3>

                      <p className="text-base text-[#3D4F41] leading-relaxed mb-4">
                        {pkg.summary}
                      </p>

                      <p className="text-sm font-medium text-[#4A5D4E] mb-4">{pkg.audience}</p>

                      {/* Facility list */}
                      <ul className="space-y-2 pt-4 border-t border-[#EFECE4] mb-5">
                        {pkg.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-[15px] text-[#2B3A2E]">
                            <Check
                              className="w-4 h-4 text-[#1B5E3A] shrink-0 mt-1"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Expandable itinerary */}
                      <div className="mb-5">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedItineraryId(isExpanded ? null : pkg.id)
                          }
                          aria-expanded={isExpanded}
                          className="min-h-[44px] w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] hover:bg-[#EFF3EC] border border-[#E5E3DC] text-sm font-semibold text-[#162419] flex items-center justify-between transition-colors cursor-pointer"
                        >
                          <span>Lihat Contoh Jadwal Kegiatan</span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-[#4A5D4E]" aria-hidden="true" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#4A5D4E]" aria-hidden="true" />
                          )}
                        </button>

                        {isExpanded && (
                          <ol className="mt-3 space-y-2.5 pl-1">
                            {pkg.itinerary.map((step) => (
                              <li key={step.time} className="flex gap-3 text-sm text-[#3D4F41]">
                                <span className="font-semibold text-[#1B5E3A] tabular-nums shrink-0 w-20">
                                  {step.time}
                                </span>
                                <span>{step.activity}</span>
                              </li>
                            ))}
                          </ol>
                        )}
                      </div>

                      {/* Price & Primary WhatsApp CTA pinned cleanly at bottom */}
                      <div className="mt-auto pt-4 border-t border-[#EFECE4] space-y-3">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-sm text-[#4A5D4E]">Biaya paket mulai</span>
                          <p className="text-xl sm:text-2xl font-bold text-[#162419] tabular-nums">
                            {formatRupiah(pkg.pricePerPerson)}
                            <span className="text-sm font-normal text-[#4A5D4E]"> / orang</span>
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => openWhatsAppBooking(pkg.id)}
                          className="w-full min-h-[50px] px-5 py-3 rounded-xl bg-[#1B5E3A] hover:bg-[#14482C] active:scale-[0.99] text-white text-base font-semibold flex items-center justify-center gap-2 transition-all whitespace-nowrap cursor-pointer"
                        >
                          <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                          <span>Pesan Paket Ini via WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3: Testimoni Pelanggan (Claim-to-proof adjacency right after Paket Wisata) */}
        <section id="testimoni" className="py-12 sm:py-16 bg-[#FAF9F6]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div className="max-w-2xl">
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#162419] [text-wrap:balance]">
                  Cerita Hangat dari Wisatawan yang Pernah Berkunjung
                </h2>
                <p className="text-base sm:text-[17px] text-[#3D4F41] mt-2">
                  Baca pengalaman keluarga, komunitas, dan rombongan kantor sebelum Anda menentukan
                  tanggal kunjungan.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsTestiModalOpen(true)}
                className="min-h-[48px] px-5 py-3 rounded-xl bg-white hover:bg-[#EFF3EC] border border-[#1B5E3A] text-[#1B5E3A] text-base font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start md:self-auto"
              >
                Tulis Testimoni Anda
              </button>
            </div>

            {testimonialNotice && (
              <div
                role="status"
                className="mb-6 rounded-xl bg-[#E8F4EC] border border-[#B7DBC3] px-4 py-3.5 text-base text-[#14482C]"
              >
                {testimonialNotice}
              </div>
            )}

            {/* Trust Rating Summary + Package Filter */}
            <div className="bg-white rounded-2xl border border-[#E5E3DC] p-5 sm:p-6 mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-3xl sm:text-4xl font-bold text-[#162419] tabular-nums">
                      {averageRating.score}
                    </span>
                    <span className="text-base text-[#4A5D4E] tabular-nums">/ 5,0</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1" aria-label="Rating bintang 5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-[#D97706] text-[#D97706]"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
                <div className="pl-5 border-l border-[#E5E3DC]">
                  <p className="text-base font-semibold text-[#162419]">
                    Direkomendasikan {averageRating.totalReviews}+ pengunjung
                  </p>
                  <p className="text-sm text-[#4A5D4E] mt-0.5">
                    Dinilai tinggi pada keramahan warga, kebersihan toilet &amp; rasa makanan
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setTestimonialFilter('semua')}
                  className={`min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    testimonialFilter === 'semua'
                      ? 'bg-[#162419] text-white'
                      : 'bg-[#FAF9F6] text-[#3D4F41] border border-[#D4D1C7] hover:bg-[#EFF3EC]'
                  }`}
                >
                  Semua Ulasan
                </button>
                {TOUR_PACKAGES.map((pkg) => {
                  const active = testimonialFilter === pkg.id;
                  const shortLabel =
                    pkg.id === 'trekking-air-terjun'
                      ? 'Air Terjun'
                      : pkg.id === 'edukasi-petik-kopi'
                        ? 'Petik Kopi'
                        : pkg.id === 'kemah-keluarga-asri'
                          ? 'Kemah Keluarga'
                          : 'Kuliner Joglo';
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setTestimonialFilter(pkg.id)}
                      className={`min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                        active
                          ? 'bg-[#162419] text-white'
                          : 'bg-[#FAF9F6] text-[#3D4F41] border border-[#D4D1C7] hover:bg-[#EFF3EC]'
                      }`}
                    >
                      {shortLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Testimonial Cards */}
            {filteredTestimonials.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E5E3DC] p-8 text-center">
                <p className="text-base text-[#3D4F41]">
                  Belum ada ulasan untuk paket ini. Jadilah pengunjung pertama yang membagikan
                  cerita!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTestimonials.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white rounded-2xl border border-[#E5E3DC] p-5 sm:p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <div className="flex items-center gap-1" aria-label={`Nilai ${item.rating} dari 5`}>
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              className={`w-4 h-4 ${
                                idx < item.rating
                                  ? 'fill-[#D97706] text-[#D97706]'
                                  : 'text-[#D4D1C7]'
                              }`}
                              aria-hidden="true"
                            />
                          ))}
                          <span className="ml-1.5 text-sm font-semibold text-[#162419] tabular-nums">
                            {item.rating}.0
                          </span>
                        </div>
                        <span className="text-sm text-[#4A5D4E]">{item.visitDate}</span>
                      </div>

                      <blockquote className="text-base text-[#162419] leading-relaxed mb-4">
                        “{item.quote}”
                      </blockquote>
                    </div>

                    <div className="pt-4 border-t border-[#EFECE4] space-y-1">
                      <p className="text-sm font-medium text-[#1B5E3A]">{item.outcome}</p>
                      <p className="text-base font-bold text-[#162419]">{item.authorName}</p>
                      <p className="text-sm text-[#4A5D4E]">
                        {item.origin} · {item.packageTitle}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Section 4: Panduan Berkunjung & Pemesanan Cepat WhatsApp */}
        <section id="lokasi" className="py-12 sm:py-16 bg-[#EFF3EC] border-t border-[#E5E3DC]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Practical Info */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#162419] [text-wrap:balance]">
                    Siap Berkunjung ke Lereng Asri?
                  </h2>
                  <p className="text-base sm:text-[17px] text-[#3D4F41] mt-2">
                    Kami menyiapkan pemandu, perlengkapan, dan hidangan hangat sesuai jumlah tamu
                    Anda agar liburan terasa tenang sejak tiba di pendopo desa.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-[#E5E3DC] divide-y divide-[#EFECE4]">
                  <div className="p-5">
                    <h3 className="text-base font-bold text-[#162419] mb-1">
                      Lokasi &amp; Titik Temu Utama
                    </h3>
                    <p className="text-[15px] text-[#3D4F41]">
                      Pendopo Desa Wisata Lereng Asri, Jl. Raya Lereng Asri No. 18, Kec.
                      Tawangmangu, Jawa Tengah. Parkir luas tersedia untuk mobil pribadi hingga bus
                      pariwisata.
                    </p>
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-bold text-[#162419] mb-1">
                      Jam Buka &amp; Layanan Admin
                    </h3>
                    <p className="text-[15px] text-[#3D4F41]">
                      Kawasan wisata buka setiap hari pukul 07.00 – 17.30 WIB (tamu kemah 24 jam).
                      Layanan WhatsApp aktif pukul 07.00 – 20.00 WIB di {WHATSAPP_DISPLAY}.
                    </p>
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-bold text-[#162419] mb-1">
                      Tips Persiapan Nyaman
                    </h3>
                    <p className="text-[15px] text-[#3D4F41]">
                      Kenakan alas kaki anti-selip, bawa jaket ringan untuk pagi atau sore hari, dan
                      informasikan jika membawa orang tua atau balita agar kami siapkan rute datar.
                    </p>
                  </div>
                </div>
              </div>

              {/* Embedded Quick Estimator & Direct WhatsApp Conversion */}
              <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E5E3DC] p-5 sm:p-7">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#162419] mb-1">
                  Hitung Perkiraan Biaya &amp; Pesan Cepat
                </h3>
                <p className="text-sm sm:text-base text-[#4A5D4E] mb-6">
                  Atur paket dan jumlah orang untuk melihat total perkiraan, lalu langsung kirim ke
                  WhatsApp admin desa.
                </p>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="quick-pkg"
                      className="block text-sm font-semibold text-[#162419] mb-1.5"
                    >
                      Pilih Paket Wisata
                    </label>
                    <select
                      id="quick-pkg"
                      value={quickPkgId}
                      onChange={(e) => setQuickPkgId(e.target.value)}
                      className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#D4D1C7] text-base text-[#162419] focus:outline-none focus:border-[#1B5E3A]"
                    >
                      {TOUR_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.title} — {formatRupiah(pkg.pricePerPerson)}/orang
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="quick-name"
                        className="block text-sm font-semibold text-[#162419] mb-1.5"
                      >
                        Nama Pemesan
                      </label>
                      <input
                        id="quick-name"
                        type="text"
                        value={quickVisitorName}
                        onChange={(e) => setQuickVisitorName(e.target.value)}
                        placeholder="Contoh: Pak Agus"
                        className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#D4D1C7] text-base text-[#162419] placeholder:text-[#7D8C80] focus:outline-none focus:border-[#1B5E3A]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="quick-date"
                        className="block text-sm font-semibold text-[#162419] mb-1.5"
                      >
                        Tanggal Berkunjung
                      </label>
                      <input
                        id="quick-date"
                        type="date"
                        value={quickDate}
                        onChange={(e) => setQuickDate(e.target.value)}
                        className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#D4D1C7] text-base text-[#162419] focus:outline-none focus:border-[#1B5E3A]"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="block text-sm font-semibold text-[#162419] mb-1.5">
                      Jumlah Pengunjung
                    </span>
                    <div className="flex items-center justify-between bg-[#FAF9F6] border border-[#D4D1C7] rounded-xl p-1.5">
                      <button
                        type="button"
                        onClick={() => setQuickGuests((prev) => Math.max(1, prev - 1))}
                        aria-label="Kurangi jumlah pengunjung"
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-white border border-[#E5E3DC] text-[#162419] hover:bg-[#EFF3EC] cursor-pointer"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="text-lg font-bold text-[#162419] tabular-nums">
                        {quickGuests} Orang
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuickGuests((prev) => Math.min(100, prev + 1))}
                        aria-label="Tambah jumlah pengunjung"
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-white border border-[#E5E3DC] text-[#162419] hover:bg-[#EFF3EC] cursor-pointer"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#EFECE4] flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-[#4A5D4E]">Perkiraan total biaya</p>
                      <p className="text-xs text-[#4A5D4E]">Pembayaran dapat dilakukan di tempat</p>
                    </div>
                    <p className="font-display text-2xl sm:text-3xl font-bold text-[#1B5E3A] tabular-nums">
                      {formatRupiah(quickTotalCost)}
                    </p>
                  </div>

                  <a
                    href={quickWaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[54px] px-6 py-3.5 rounded-xl bg-[#1B5E3A] hover:bg-[#14482C] text-white text-base sm:text-[17px] font-semibold flex items-center justify-center gap-2.5 shadow-sm transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>Kirim Pesanan ke WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="bg-[#FAF9F6] border-t border-[#E5E3DC] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-display text-lg font-bold text-[#162419]">
              Desa Wisata Lereng Asri
            </p>
            <p className="text-sm text-[#4A5D4E]">
              © 2026 Pokdarwis Lereng Asri · Jl. Raya Lereng Asri No. 18, Tawangmangu
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-[#3D4F41]">
            <a href="#beranda" className="hover:text-[#1B5E3A] whitespace-nowrap">
              Beranda
            </a>
            <a href="#paket" className="hover:text-[#1B5E3A] whitespace-nowrap">
              Paket Wisata
            </a>
            <a href="#testimoni" className="hover:text-[#1B5E3A] whitespace-nowrap">
              Testimoni
            </a>
            <button
              type="button"
              onClick={() => openWhatsAppBooking()}
              className="text-[#1B5E3A] font-semibold hover:underline whitespace-nowrap cursor-pointer"
            >
              Hubungi WhatsApp
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile-First Thumb Zone Bottom Bar (64px height, strictly <15% viewport cap) */}
      <nav
        aria-label="Navigasi Cepat Seluler"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-white/95 backdrop-blur-md border-t border-[#E5E3DC] px-2 grid grid-cols-4 items-center"
      >
        <button
          type="button"
          onClick={() => scrollToSection('beranda', 'beranda')}
          className={`min-h-[48px] flex flex-col items-center justify-center gap-0.5 rounded-lg text-[11px] font-semibold transition-colors ${
            activeMobileTab === 'beranda' ? 'text-[#1B5E3A]' : 'text-[#4A5D4E]'
          }`}
        >
          <Home className="w-5 h-5" aria-hidden="true" />
          <span>Beranda</span>
        </button>

        <button
          type="button"
          onClick={() => scrollToSection('paket', 'paket')}
          className={`min-h-[48px] flex flex-col items-center justify-center gap-0.5 rounded-lg text-[11px] font-semibold transition-colors ${
            activeMobileTab === 'paket' ? 'text-[#1B5E3A]' : 'text-[#4A5D4E]'
          }`}
        >
          <Compass className="w-5 h-5" aria-hidden="true" />
          <span>Paket</span>
        </button>

        <button
          type="button"
          onClick={() => scrollToSection('testimoni', 'testimoni')}
          className={`min-h-[48px] flex flex-col items-center justify-center gap-0.5 rounded-lg text-[11px] font-semibold transition-colors ${
            activeMobileTab === 'testimoni' ? 'text-[#1B5E3A]' : 'text-[#4A5D4E]'
          }`}
        >
          <Users className="w-5 h-5" aria-hidden="true" />
          <span>Testimoni</span>
        </button>

        <button
          type="button"
          onClick={() => openWhatsAppBooking()}
          className="min-h-[46px] mx-1 px-2 rounded-xl bg-[#1B5E3A] text-white flex flex-col items-center justify-center gap-0.5 text-[11px] font-semibold shadow-sm active:scale-95 transition-transform"
        >
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
          <span>WhatsApp</span>
        </button>
      </nav>

      {/* Modals */}
      <WhatsAppBookingModal
        isOpen={isWaModalOpen}
        initialPackageId={waModalPackageId}
        onClose={() => setIsWaModalOpen(false)}
      />

      <TestimonialFormModal
        isOpen={isTestiModalOpen}
        onClose={() => setIsTestiModalOpen(false)}
        onSubmitTestimonial={handleAddTestimonial}
      />
    </div>
  );
}
