// ── Listing Detail Page
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Star, MapPin, Users, Bed, Bath, ChevronLeft, ChevronRight, Shield, CheckCircle } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SEED_LISTINGS } from '../data/listings';
import { AMENITY_LABELS } from '../types';

function formatN(n: number) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n);
}

export default function ListingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = SEED_LISTINGS.find(l => l.id === id);

  const [imgIdx, setImgIdx] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Listing not found</h2>
          <Link to="/search" className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-full">Browse listings</Link>
        </div>
      </div>
    );
  }

  const nights = checkIn && checkOut ? differenceInDays(new Date(checkOut), new Date(checkIn)) : 0;
  const serviceFee = Math.round(listing.pricePerNight * nights * 0.12);
  const total = listing.pricePerNight * nights + serviceFee;

  const handleBooking = () => {
    if (!checkIn || !checkOut) return alert('Please select check-in and check-out dates.');
    if (nights < 1) return alert('Check-out must be after check-in.');
    if (guests > listing.maxGuests) return alert(`Maximum ${listing.maxGuests} guests for this listing.`);
    const ref = 'ABJ-' + Math.random().toString(36).slice(2, 10).toUpperCase();
    setBookingRef(ref);
    setBookingSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header />

      {/* Image gallery */}
      <div className="pt-16 max-w-6xl mx-auto px-6 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded-2xl overflow-hidden mb-8">
          {/* Main image */}
          <div className="relative aspect-[4/3] md:aspect-[3/2] bg-zinc-100 overflow-hidden">
            <img
              src={listing.images[imgIdx]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            {listing.images.length > 1 && (
              <>
                <button
                  onClick={() => setImgIdx(i => (i - 1 + listing.images.length) % listing.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setImgIdx(i => (i + 1) % listing.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail grid */}
          {listing.images.slice(1, 5).length > 0 && (
            <div className="hidden md:grid grid-cols-2 gap-2">
              {listing.images.slice(1, 5).map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i + 1)} className="aspect-[4/3] overflow-hidden bg-zinc-100 hover:opacity-80 transition-opacity">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] mb-6 transition-colors">
          <ChevronLeft size={16} /> Back to search
        </button>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-3xl font-bold mb-1">{listing.title}</h1>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                    <MapPin size={14} />
                    {listing.location.address}, {listing.location.area}, Abuja
                    {listing.superhost && (
                      <span className="flex items-center gap-1 text-[var(--color-primary)] font-semibold">
                        <Shield size={13} /> Superhost
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-white border border-[var(--color-border)] px-3 py-1.5 rounded-full">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="font-bold">{listing.rating.toFixed(2)}</span>
                  <span className="text-[var(--color-text-muted)] text-sm">({listing.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Key specs */}
              <div className="flex items-center gap-4 flex-wrap mt-4 py-4 border-y border-[var(--color-border)]">
                {[
                  { icon: <Users size={16} />, label: `${listing.maxGuests} guests` },
                  { icon: <Bed size={16} />, label: `${listing.beds} beds` },
                  { icon: <span className="text-sm font-bold">🛏</span>, label: `${listing.bedrooms} bedrooms` },
                  { icon: <Bath size={16} />, label: `${listing.bathrooms} baths` },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-sm text-[var(--color-text)]">
                    {s.icon} <span className="font-medium">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Host */}
            <div className="flex items-center gap-4">
              <img src={listing.hostAvatar} alt={listing.hostName} className="w-14 h-14 rounded-full object-cover" />
              <div>
                <p className="font-bold">Hosted by {listing.hostName}</p>
                <p className="text-sm text-[var(--color-text-muted)]">Property host · Abuja-based</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold mb-3">About this place</h2>
              <p className="text-[var(--color-text)] leading-relaxed">{listing.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-bold mb-4">What this place offers</h2>
              <div className="grid grid-cols-2 gap-2">
                {listing.amenities.map(a => (
                  <div key={a} className="flex items-center gap-2.5 py-2">
                    <CheckCircle size={16} className="text-[var(--color-success)] shrink-0" />
                    <span className="text-sm">{AMENITY_LABELS[a as keyof typeof AMENITY_LABELS] || a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House rules */}
            <div>
              <h2 className="text-xl font-bold mb-3">House rules</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{listing.houseRules}</p>
            </div>
          </div>

          {/* Right: Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-[var(--color-border)] shadow-lg p-6 space-y-4">
              {/* Price header */}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[var(--color-text)]">
                  {formatN(listing.pricePerNight)}
                </span>
                <span className="text-[var(--color-text-muted)]">/ night</span>
              </div>

              {/* Date inputs */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold uppercase text-[var(--color-text-muted)] mb-1 block">Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    onChange={e => setCheckIn(e.target.value)}
                    className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-[var(--color-text-muted)] mb-1 block">Check-out</label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || format(new Date(), 'yyyy-MM-dd')}
                    onChange={e => setCheckOut(e.target.value)}
                    className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="text-xs font-semibold uppercase text-[var(--color-text-muted)] mb-1 block">Guests (max {listing.maxGuests})</label>
                <select
                  value={guests}
                  onChange={e => setGuests(Number(e.target.value))}
                  className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--color-primary)]"
                >
                  {Array.from({ length: listing.maxGuests }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              {/* Price breakdown */}
              {nights > 0 && (
                <div className="space-y-2 py-3 border-y border-[var(--color-border)]">
                  <div className="flex justify-between text-sm">
                    <span>{formatN(listing.pricePerNight)} × {nights} night{nights > 1 ? 's' : ''}</span>
                    <span>{formatN(listing.pricePerNight * nights)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-muted)]">Service fee (12%)</span>
                    <span className="text-[var(--color-text-muted)]">{formatN(serviceFee)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-[var(--color-border)]">
                    <span>Total</span>
                    <span className="text-[var(--color-primary)]">{formatN(total)}</span>
                  </div>
                </div>
              )}

              {/* CTA */}
              {!bookingSuccess ? (
                <button
                  onClick={handleBooking}
                  disabled={!checkIn || !checkOut}
                  className="w-full py-3.5 rounded-xl bg-[var(--color-primary)] text-white font-bold text-base hover:bg-[#163826] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {nights > 0 ? `Reserve · ${formatN(total)}` : 'Check availability'}
                </button>
              ) : (
                <div className="text-center py-6 bg-green-50 rounded-xl border border-green-200">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="font-bold text-[var(--color-success)] mb-1">Booking Confirmed!</p>
                  <p className="text-xs text-[var(--color-text-muted)] mb-3">Reference: <span className="font-mono font-bold">{bookingRef}</span></p>
                  <p className="text-sm text-[var(--color-text-muted)]">Check-in: <strong>{checkIn}</strong> · Check-out: <strong>{checkOut}</strong></p>
                  <p className="text-sm text-[var(--color-text-muted)]">Total paid: <strong className="text-[var(--color-primary)]">{formatN(total)}</strong></p>
                </div>
              )}

              <p className="text-center text-xs text-[var(--color-text-muted)]">You won't be charged yet</p>

              {/* Contact host */}
              <button className="w-full py-2.5 rounded-xl border border-[var(--color-border)] text-sm font-semibold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                Message {listing.hostName.split(' ')[0]}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}