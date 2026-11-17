import { useEffect, useMemo, useState } from 'react';
import { Check, Copy, MessageCircle, Minus, Plus, X } from 'lucide-react';
import {
  TOUR_PACKAGES,
  WHATSAPP_DISPLAY,
  buildWhatsAppUrl,
  formatRupiah,
  type TourPackage,
} from '../data/wisataData';

interface WhatsAppBookingModalProps {
  isOpen: boolean;
  initialPackageId?: string;
  onClose: () => void;
}

function getDefaultTomorrowDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

export function WhatsAppBookingModal({
  isOpen,
  initialPackageId,
  onClose,
}: WhatsAppBookingModalProps) {
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    initialPackageId || TOUR_PACKAGES[0].id
  );
  const [visitorName, setVisitorName] = useState('');
  const [visitDate, setVisitDate] = useState(getDefaultTomorrowDate);
  const [guestCount, setGuestCount] = useState(4);
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [dispatched, setDispatched] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedPackageId(initialPackageId || 'konsultasi-umum');
      setCopied(false);
      setDispatched(false);
    }
  }, [isOpen, initialPackageId]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const selectedPackage: TourPackage | undefined = useMemo(
    () => TOUR_PACKAGES.find((pkg) => pkg.id === selectedPackageId),
    [selectedPackageId]
  );

  const packageTitle = selectedPackage
    ? selectedPackage.title
    : 'Konsultasi Jadwal & Rekomendasi Paket Wisata';

  const estimatedTotal = selectedPackage ? selectedPackage.pricePerPerson * guestCount : 0;

  const formattedDate = useMemo(() => {
    if (!visitDate) return '';
    const parsed = new Date(`${visitDate}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return visitDate;
    return parsed.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [visitDate]);

  const whatsappUrl = useMemo(
    () =>
      buildWhatsAppUrl({
        packageTitle,
        visitorName,
        visitDate: formattedDate,
        guestCount,
        notes,
        estimatedTotal,
      }),
    [packageTitle, visitorName, formattedDate, guestCount, notes, estimatedTotal]
  );

  const plainMessagePreview = useMemo(() => {
    const lines = [
      'Halo Admin Desa Wisata Lereng Asri,',
      `Saya ingin memesan / tanya ketersediaan:`,
      `• Paket: ${packageTitle}`,
      visitorName.trim() ? `• Nama: ${visitorName.trim()}` : null,
      formattedDate ? `• Tanggal: ${formattedDate}` : null,
      `• Peserta: ${guestCount} orang`,
      estimatedTotal > 0 ? `• Perkiraan Biaya: ${formatRupiah(estimatedTotal)}` : null,
      notes.trim() ? `• Catatan: ${notes.trim()}` : null,
    ].filter(Boolean);
    return lines.join('\n');
  }, [packageTitle, visitorName, formattedDate, guestCount, estimatedTotal, notes]);

  if (!isOpen) return null;

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(plainMessagePreview);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#162419]/60 backdrop-blur-sm p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wa-modal-title"
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
            <h2 id="wa-modal-title" className="font-display text-xl sm:text-2xl font-bold text-[#162419]">
              Pesan via WhatsApp
            </h2>
            <p className="text-sm text-[#4A5D4E] mt-0.5">
              Admin desa membalas cepat di {WHATSAPP_DISPLAY}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup formulir pemesanan"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#4A5D4E] hover:bg-[#EFF3EC] hover:text-[#162419] focus-visible:outline-2 focus-visible:outline-[#1B5E3A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 sm:px-6 py-5 space-y-5">
          <div>
            <label htmlFor="wa-package" className="block text-sm font-semibold text-[#162419] mb-1.5">
              Pilih Paket Wisata
            </label>
            <select
              id="wa-package"
              value={selectedPackageId}
              onChange={(e) => setSelectedPackageId(e.target.value)}
              className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white border border-[#D4D1C7] text-base text-[#162419] focus:outline-none focus:border-[#1B5E3A] focus:ring-2 focus:ring-[#1B5E3A]/20"
            >
              <option value="konsultasi-umum">Konsultasi Umum / Tanya Rekomendasi</option>
              {TOUR_PACKAGES.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.title} ({formatRupiah(pkg.pricePerPerson)}/org)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="wa-name" className="block text-sm font-semibold text-[#162419] mb-1.5">
                Nama Anda
              </label>
              <input
                id="wa-name"
                type="text"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder="Contoh: Ibu Sari"
                className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white border border-[#D4D1C7] text-base text-[#162419] placeholder:text-[#7D8C80] focus:outline-none focus:border-[#1B5E3A] focus:ring-2 focus:ring-[#1B5E3A]/20"
              />
            </div>

            <div>
              <label htmlFor="wa-date" className="block text-sm font-semibold text-[#162419] mb-1.5">
                Rencana Tanggal
              </label>
              <input
                id="wa-date"
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white border border-[#D4D1C7] text-base text-[#162419] focus:outline-none focus:border-[#1B5E3A] focus:ring-2 focus:ring-[#1B5E3A]/20"
              />
            </div>
          </div>

          <div>
            <span className="block text-sm font-semibold text-[#162419] mb-1.5">
              Jumlah Peserta
            </span>
            <div className="flex items-center justify-between bg-white border border-[#D4D1C7] rounded-xl p-1.5">
              <button
                type="button"
                onClick={() => setGuestCount((prev) => Math.max(1, prev - 1))}
                aria-label="Kurangi jumlah peserta"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-[#EFF3EC] text-[#162419] hover:bg-[#DFE8DC] active:scale-95 transition-transform"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-lg font-bold text-[#162419] tabular-nums px-4">
                {guestCount} Orang
              </span>
              <button
                type="button"
                onClick={() => setGuestCount((prev) => Math.min(100, prev + 1))}
                aria-label="Tambah jumlah peserta"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-[#EFF3EC] text-[#162419] hover:bg-[#DFE8DC] active:scale-95 transition-transform"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="wa-notes" className="block text-sm font-semibold text-[#162419] mb-1.5">
              Catatan Khusus (Opsional)
            </label>
            <textarea
              id="wa-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Membawa anak balita, butuh makan siang tidak pedas"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D4D1C7] text-base text-[#162419] placeholder:text-[#7D8C80] focus:outline-none focus:border-[#1B5E3A] focus:ring-2 focus:ring-[#1B5E3A]/20"
            />
          </div>

          <div className="bg-[#EFF3EC] rounded-xl p-4 space-y-2 border border-[#DCE4D8]">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-[#162419]">Ringkasan Pesan WhatsApp</span>
              {estimatedTotal > 0 && (
                <span className="text-base font-bold text-[#1B5E3A] tabular-nums">
                  {formatRupiah(estimatedTotal)}
                </span>
              )}
            </div>
            <pre className="whitespace-pre-wrap font-sans text-sm text-[#354739] leading-relaxed">
              {plainMessagePreview}
            </pre>
          </div>

          {dispatched && (
            <div className="rounded-xl bg-[#E8F4EC] border border-[#B7DBC3] p-3.5 text-sm text-[#14482C]">
              Jendela WhatsApp telah disiapkan. Bila aplikasi WhatsApp belum terbuka otomatis, Anda dapat menyalin pesan di bawah ini.
            </div>
          )}
        </div>

        <div className="px-5 sm:px-6 py-4 bg-white border-t border-[#E5E3DC] space-y-2.5 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setDispatched(true)}
            className="w-full min-h-[52px] px-6 py-3 rounded-xl bg-[#1B5E3A] hover:bg-[#14482C] text-white font-semibold text-base flex items-center justify-center gap-2.5 shadow-sm transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Kirim Pesan ke WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={handleCopyMessage}
            className="w-full min-h-[44px] px-4 py-2 rounded-xl border border-[#D4D1C7] bg-[#FAF9F6] hover:bg-[#EFF3EC] text-[#162419] font-medium text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#1B5E3A]" aria-hidden="true" />
                <span>Format Pesan Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" aria-hidden="true" />
                <span>Salin Format Pesan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
