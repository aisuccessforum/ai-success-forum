'use client';
import { useState } from 'react';

const EMAILJS_SERVICE_ID  = 'service_aqh8xe7';   // from Step 1
const EMAILJS_TEMPLATE_ID = 'template_qe0rcvi';  // from Step 2
const EMAILJS_PUBLIC_KEY  = '2cyitvcu6udSYTcvO';   // from Step 3
const YOUR_GMAIL          = 'aisuccessforum@gmail.com';    // your actual Gmail

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id:  EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id:     EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name:  form.name,
            from_email: form.email,
            subject:    form.subject,
            message:    form.message,
            to_email:   YOUR_GMAIL,
          },
        }),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <span className="text-xs font-mono text-neon-blue/70 uppercase tracking-widest">Contact</span>
      <h1 className="font-display font-black text-3xl sm:text-4xl text-light-50 mt-2 mb-3">
        Get In Touch
      </h1>
      <p className="text-sm text-light-200/60 mb-10">
        Have a question, partnership inquiry, or want to contribute? We would love to hear from you.
      </p>

      {status === 'sent' ? (
        <div className="card-dark rounded-xl p-10 text-center">
          <p className="text-4xl mb-4">✉️</p>
          <h2 className="font-display font-bold text-xl text-neon-blue mb-2">Message Sent!</h2>
          <p className="text-sm text-light-200/60">We will get back to you within 1 to 2 business days.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(['name', 'email'] as const).map((field) => (
              <div key={field}>
                <label className="block text-xs font-mono text-light-200/50 uppercase tracking-wide mb-1.5">
                  {field}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  value={form[field]}
                  onChange={update(field)}
                  required
                  className="w-full bg-dark-700 border border-[rgba(0,212,255,0.15)] rounded-lg px-4 py-2.5 text-sm text-light-200 placeholder-light-200/20 focus:outline-none focus:border-neon-blue/50 transition-colors"
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs font-mono text-light-200/50 uppercase tracking-wide mb-1.5">Subject</label>
            <select
              value={form.subject}
              onChange={update('subject')}
              required
              className="w-full bg-dark-700 border border-[rgba(0,212,255,0.15)] rounded-lg px-4 py-2.5 text-sm text-light-200 focus:outline-none focus:border-neon-blue/50 transition-colors"
            >
              <option value="">Select a subject</option>
              <option>General Question</option>
              <option>Partnership or Sponsorship</option>
              <option>Content Submission</option>
              <option>Affiliate Program</option>
              <option>Bug or Technical Issue</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono text-light-200/50 uppercase tracking-wide mb-1.5">Message</label>
            <textarea
              value={form.message}
              onChange={update('message')}
              required
              rows={6}
              className="w-full bg-dark-700 border border-[rgba(0,212,255,0.15)] rounded-lg px-4 py-2.5 text-sm text-light-200 placeholder-light-200/20 focus:outline-none focus:border-neon-blue/50 transition-colors resize-none"
            />
          </div>
          {status === 'error' && (
            <p className="text-sm text-red-400">Something went wrong. Please try again or email us directly.</p>
          )}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn-neon px-8 py-3 rounded-lg text-sm w-full sm:w-auto disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <div className="card-dark rounded-lg p-4 flex-1 text-center">
          <p className="text-lg mb-1">📧</p>
          <p className="text-xs font-mono text-neon-blue/70 uppercase tracking-wide mb-1">Email</p>
          <a href={`mailto:${YOUR_GMAIL}`} className="text-xs text-light-200/60 hover:text-neon-blue transition-colors">
            {YOUR_GMAIL}
          </a>
        </div>
        <div className="card-dark rounded-lg p-4 flex-1 text-center">
          <p className="text-lg mb-1">𝕏</p>
          <p className="text-xs font-mono text-neon-blue/70 uppercase tracking-wide mb-1">Twitter / X</p>
          <a href="https://twitter.com/aisuccessforum" target="_blank" rel="noopener noreferrer"
            className="text-xs text-light-200/60 hover:text-neon-blue transition-colors">
            @aisuccessforum
          </a>
        </div>
      </div>
    </div>
  );
}