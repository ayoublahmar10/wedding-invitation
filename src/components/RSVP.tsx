import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../i18n';
import { weddingConfig } from '../config/wedding';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function RSVP() {
  const { t, language } = useTranslation();
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('1');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const payload = { name, guests: Number(guests), message, language };

    // Demo mode if endpoint is empty
    if (!weddingConfig.rsvp.endpoint) {
      await new Promise((r) => setTimeout(r, 800));
      setStatus('success');
      return;
    }

    try {
      const res = await fetch(weddingConfig.rsvp.endpoint, {
        method: weddingConfig.rsvp.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const inputClass = `w-full bg-ivory border border-gold/40 text-text-primary font-serif text-sm px-4 py-3 placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors duration-200 ${
    language === 'ar' ? 'font-arabic text-right' : ''
  }`;

  const labelClass = `font-serif uppercase tracking-[0.2em] text-text-secondary text-xs mb-1 block ${
    language === 'ar' ? 'font-arabic tracking-normal text-sm' : ''
  }`;

  return (
    <section className="w-full bg-ivory py-20 px-6 flex flex-col items-center">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="text-gold text-2xl mb-4 tracking-widest">✦</div>
        <h2 className={`${
          language === 'ar'
            ? 'font-script-ar text-curtain text-4xl sm:text-5xl'
            : 'font-script text-curtain text-4xl sm:text-5xl'
        }`}>
          {t.rsvp}
        </h2>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
      </motion.div>

      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="text-gold text-4xl mb-4">♥</div>
          <p className={`font-serif text-text-primary text-base ${
            language === 'ar' ? 'font-arabic' : ''
          }`}>
            {t.rsvpSuccess}
          </p>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex flex-col gap-5"
        >
          {/* Name */}
          <div>
            <label className={labelClass}>{t.rsvpName}</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.rsvpName}
              className={inputClass}
            />
          </div>

          {/* Guests */}
          <div>
            <label className={labelClass}>{t.rsvpGuests}</label>
            <select
              required
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className={inputClass}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className={labelClass}>{t.rsvpMessage}</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.rsvpMessage}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Error */}
          {status === 'error' && (
            <p className={`text-curtain text-xs font-serif ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t.rsvpError}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className={`w-full bg-curtain text-ivory font-serif uppercase tracking-[0.25em] text-sm py-4 hover:bg-curtain-dark transition-colors duration-200 disabled:opacity-60 ${
              language === 'ar' ? 'font-arabic tracking-normal' : ''
            }`}
          >
            {status === 'loading' ? '...' : t.rsvpSubmit}
          </button>
        </motion.form>
      )}

      {/* Bottom ornament */}
      <div className="text-gold text-2xl mt-12 tracking-widest">✦ ✦ ✦</div>
    </section>
  );
}
