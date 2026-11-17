import { useEffect, useState, type FormEvent } from 'react';
import { Star, X } from 'lucide-react';
import { TOUR_PACKAGES, type Testimonial } from '../data/wisataData';

interface TestimonialFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitTestimonial: (testimonial: Testimonial) => void;
}

export function TestimonialFormModal({
  isOpen,
  onClose,
  onSubmitTestimonial,
}: TestimonialFormModalProps) {
  const [authorName, setAuthorName] = useState('');
  const [origin, setOrigin] = useState('');
  const [packageId, setPackageId] = useState(TOUR_PACKAGES[0].id);
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState('');
  const [outcome, setOutcome] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !origin.trim() || quote.trim().length < 15) {
      setErrorMessage(
        'Mohon lengkapi nama, asal kota/rombongan, serta cerita pengalaman minimal 15 karakter.'
      );
      return;
    }

    const pkg = TOUR_PACKAGES.find((item) => item.id === packageId) || TOUR_PACKAGES[0];
    const now = new Date();
    const visitDate = now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

    const newTestimonial: Testimonial = {
      id: `testi-${Date.now()}`,
      authorName: authorName.trim(),
      origin: origin.trim(),
      packageId: pkg.id,
      packageTitle: pkg.title,
      visitDate,
      rating,
      quote: quote.trim(),
      outcome: outcome.trim() || 'Pengalaman berkunjung menyenangkan bersama warga desa',
    };

    onSubmitTestimonial(newTestimonial);
    setAuthorName('');
    setOrigin('');
    setQuote('');
    setOutcome('');
    setRating(5);
    setErrorMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#162419]/60 backdrop-blur-sm p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="testi-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full sm:max-w-lg bg-[#FAF9F6] rounded-t-3xl sm:rounded-2xl border border-[#E5E3DC] shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
        <div className="sm:hidden pt-3 pb-1 flex justify-center shrink-0">
          <div className="w-10 h-1.5 rounded-full bg-[#D1CFC7]" aria-hidden="true" />
        </div>

        <div className="flex items-start justify-between gap-4 px-5 sm:px-6 pt-3 sm:pt-5 pb-4 border-b border-[#E5E3DC] shrink-0">
          <div>
            <h2 id="testi-modal-title" className="font-display text-xl sm:text-2xl font-bold text-[#162419]">
              Bagikan Pengalaman Anda
            </h2>
            <p className="text-sm text-[#4A5D4E] mt-0.5">
              Cerita Anda membantu calon wisatawan lain merasa yakin berkunjung
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup formulir testimoni"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#4A5D4E] hover:bg-[#EFF3EC] hover:text-[#162419] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto px-5 sm:px-6 py-5 space-y-4">
          {errorMessage && (
            <div
              role="alert"
              className="rounded-xl bg-[#FDF2F2] border border-[#F5C2C2] px-4 py-3 text-sm text-[#8B1E1E]"
            >
              {errorMessage}
            </div>
          )}

          <div>
            <span className="block text-sm font-semibold text-[#162419] mb-1.5">
              Penilaian Keseluruhan
            </span>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => {
                const active = value <= rating;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    aria-label={`Beri nilai ${value} dari 5 bintang`}
                    className={`min-h-[46px] min-w-[46px] flex items-center justify-center rounded-xl border transition-colors ${
                      active
                        ? 'bg-[#FEF7E6] border-[#E7C26B] text-[#B45309]'
                        : 'bg-white border-[#D4D1C7] text-[#9CA99E]'
                    }`}
                  >
                    <Star className={`w-5 h-5 ${active ? 'fill-[#D97706] text-[#D97706]' : ''}`} />
                  </button>
                );
              })}
              <span className="ml-2 text-sm font-semibold text-[#162419] tabular-nums">
                {rating}.0 / 5
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="testi-name" className="block text-sm font-semibold text-[#162419] mb-1.5">
                Nama Lengkap
              </label>
              <input
                id="testi-name"
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Contoh: Ibu Dewi Lestari"
                className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white border border-[#D4D1C7] text-base text-[#162419] placeholder:text-[#7D8C80] focus:outline-none focus:border-[#1B5E3A]"
              />
            </div>

            <div>
              <label htmlFor="testi-origin" className="block text-sm font-semibold text-[#162419] mb-1.5">
                Asal Kota / Jenis Rombongan
              </label>
              <input
                id="testi-origin"
                type="text"
                required
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Contoh: Keluarga · Bandung"
                className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white border border-[#D4D1C7] text-base text-[#162419] placeholder:text-[#7D8C80] focus:outline-none focus:border-[#1B5E3A]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="testi-package" className="block text-sm font-semibold text-[#162419] mb-1.5">
              Paket yang Diikuti
            </label>
            <select
              id="testi-package"
              value={packageId}
              onChange={(e) => setPackageId(e.target.value)}
              className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white border border-[#D4D1C7] text-base text-[#162419] focus:outline-none focus:border-[#1B5E3A]"
            >
              {TOUR_PACKAGES.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="testi-quote" className="block text-sm font-semibold text-[#162419] mb-1.5">
              Cerita Pengalaman Anda
            </label>
            <textarea
              id="testi-quote"
              rows={3}
              required
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Ceritakan bagaimana suasana desa, pelayanan pemandu, kebersihan fasilitas, atau makanan selama berkunjung..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D4D1C7] text-base text-[#162419] placeholder:text-[#7D8C80] focus:outline-none focus:border-[#1B5E3A]"
            />
          </div>

          <div>
            <label htmlFor="testi-outcome" className="block text-sm font-semibold text-[#162419] mb-1.5">
              Kesan Singkat (Opsional)
            </label>
            <input
              id="testi-outcome"
              type="text"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              placeholder="Contoh: Anak-anak betah dan aman bermain di alam"
              className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white border border-[#D4D1C7] text-base text-[#162419] placeholder:text-[#7D8C80] focus:outline-none focus:border-[#1B5E3A]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full min-h-[52px] px-6 py-3 rounded-xl bg-[#1B5E3A] hover:bg-[#14482C] text-white font-semibold text-base transition-colors"
            >
              Kirim Testimoni
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
