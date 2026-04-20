// ── ListingCard Component
import { Link } from 'react-router-dom';
import { Star, Wifi, Wind, Car, Shield } from 'lucide-react';
import { useState } from 'react';
import type { Listing } from '../types';

interface Props {
  listing: Listing;
}

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  wifi: <Wifi size={13} />,
  ac: <Wind size={13} />,
  parking: <Car size={13} />,
  security: <Shield size={13} />,
};

function formatNaira(n: number) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n);
}

export default function ListingCard({ listing }: Props) {
  const [imgIdx, setImgIdx] = useState(0);

  return (
    <Link
      to={`/listing/${listing.id}`}
      className="group block rounded-2xl overflow-hidden border border-[var(--color-border)] bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
      onMouseEnter={() => {
        if (listing.images.length > 1) {
          const interval = setInterval(() => setImgIdx(i => (i + 1) % listing.images.length), 1200);
          (window as unknown as { _int?: ReturnType<typeof setInterval> })._int = interval;
        }
      }}
      onMouseLeave={() => {
        const intr = (window as unknown as { _int?: ReturnType<typeof setInterval> })._int;
        if (intr) clearInterval(intr);
        setImgIdx(0);
      }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        <img
          src={listing.images[imgIdx]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {listing.superhost && (
            <span className="px-2 py-1 bg-[var(--color-primary)] text-white text-[10px] font-bold rounded-full">
              ★ Superhost
            </span>
          )}
          {!listing.available && (
            <span className="px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded-full">
              Unavailable
            </span>
          )}
        </div>

        {/* Image dots */}
        {listing.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {listing.images.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIdx ? 'bg-white w-3' : 'bg-white/50'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        {/* Location + rating */}
        <div className="flex items-start justify-between mb-1.5">
          <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
            {listing.location.area}, Abuja
          </span>
          {listing.reviewCount > 0 && (
            <div className="flex items-center gap-1 text-xs">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="font-medium">{listing.rating.toFixed(2)}</span>
              <span className="text-[var(--color-text-muted)]">({listing.reviewCount})</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-[var(--color-text)] text-base mb-2 line-clamp-2 leading-snug">
          {listing.title}
        </h3>

        {/* Amenities preview */}
        <div className="flex items-center gap-2 mb-3 text-[var(--color-text-muted)]">
          {listing.amenities.slice(0, 3).map(a => (
            <span key={a} className="flex items-center gap-1 text-xs">
              {AMENITY_ICONS[a] || '•'} {a}
            </span>
          ))}
          {listing.amenities.length > 3 && (
            <span className="text-xs text-[var(--color-text-muted)]">+{listing.amenities.length - 3}</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-[var(--color-primary)]">
            {formatNaira(listing.pricePerNight)}
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">/ night</span>
        </div>

        {/* Beds info */}
        <div className="text-xs text-[var(--color-text-muted)] mt-1">
          {listing.beds} bed{listing.beds > 1 ? 's' : ''} · {listing.bedrooms} bed{listing.bedrooms > 1 ? 'rooms' : 'room'} · {listing.bathrooms} bath{listing.bathrooms > 1 ? 's' : ''}
        </div>
      </div>
    </Link>
  );
}