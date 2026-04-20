// ── Become a Host Page
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Camera, Shield, Clock, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const STEPS = [
  {
    icon: <Home size={24} />,
    title: 'Tell us about your property',
    desc: 'Share the basics — type, size, location, and what makes it special.',
  },
  {
    icon: <Camera size={24} />,
    title: 'Add photos and details',
    desc: 'Upload quality photos and write an honest, engaging description.',
  },
  {
    icon: <Shield size={24} />,
    title: 'We verify and approve',
    desc: 'Our Abuja team reviews your listing and gives feedback within 48 hours.',
  },
  {
    icon: <Clock size={24} />,
    title: 'Start earning',
    desc: 'Go live, accept bookings, and get paid directly to your Nigerian bank account.',
  },
];

export default function BecomeHostPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', propertyType: '', area: '', address: '',
    beds: '', price: '', description: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.propertyType || !form.area) {
      alert('Please fill in all required fields.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header />

      <div className="pt-24 max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">List Your Abuja Property</h1>
          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
            Join hundreds of Abuja landlords earning steady income from short-term rentals. Our team helps you get set up and verified within 48 hours.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
          {STEPS.map((step, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-[var(--color-border)] text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mx-auto mb-3">
                {step.icon}
              </div>
              <h3 className="font-bold text-sm mb-1">{step.title}</h3>
              <p className="text-xs text-[var(--color-text-muted)]">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        {submitted ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-green-200">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">Application Received!</h2>
            <p className="text-[var(--color-text-muted)] mb-6">
              We'll be in touch within 48 hours. Check your email at <strong>{form.email}</strong>.
            </p>
            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold">
              Back to Home <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[var(--color-border)] p-8 space-y-5">
            <h2 className="text-xl font-bold">Start your listing</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase text-[var(--color-text-muted)] mb-1.5 block">Full Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" required />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-[var(--color-text-muted)] mb-1.5 block">Email *</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" required />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-[var(--color-text-muted)] mb-1.5 block">Phone (WhatsApp)</label>
                <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+234 800 000 0000" className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-[var(--color-text-muted)] mb-1.5 block">Property Type *</label>
                <select value={form.propertyType} onChange={e => setForm(f => ({ ...f, propertyType: e.target.value }))} className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" required>
                  <option value="">Select type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House / Detached</option>
                  <option value="flat">Flat</option>
                  <option value="room">Single Room</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-[var(--color-text-muted)] mb-1.5 block">Area *</label>
                <select value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))} className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" required>
                  <option value="">Select area</option>
                  {['Maitama','Wuse','Asokoro','Jabi','Garki','Utako','Wuye','Mabushi','Katampe'].map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-[var(--color-text-muted)] mb-1.5 block">Beds</label>
                <input type="number" value={form.beds} onChange={e => setForm(f => ({ ...f, beds: e.target.value }))} placeholder="e.g. 3" className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-[var(--color-text-muted)] mb-1.5 block">Property Address</label>
              <input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Street address, estate name..." className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-[var(--color-text-muted)] mb-1.5 block">Nightly Rate (NGN)</label>
              <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="e.g. 45000" className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-[var(--color-text-muted)] mb-1.5 block">Why should guests choose your property?</label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4} placeholder="Tell guests what makes your space special — location, vibe, amenities, nearby landmarks..." className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" />
            </div>

            <button type="submit" className="w-full py-4 rounded-xl bg-[var(--color-primary)] text-white font-bold text-base hover:bg-[#163826] transition-colors flex items-center justify-center gap-2">
              Submit Listing Application <ArrowRight size={18} />
            </button>

            <p className="text-center text-xs text-[var(--color-text-muted)]">
              No commitment. No fees to list. We only charge 12% when you earn.
            </p>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
}