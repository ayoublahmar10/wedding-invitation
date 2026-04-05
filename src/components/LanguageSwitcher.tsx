import { useTranslation, type Language } from '../i18n';

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  const options: { value: Language; label: string }[] = [
    { value: 'fr', label: 'FR' },
    { value: 'ar', label: 'عربي' },
  ];

  return (
    <div
      className="fixed top-4 right-4 z-50 flex overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
      style={{ borderRadius: '999px', border: '1px solid rgba(212,175,55,0.35)' }}
    >
      {options.map(({ value, label }, i) => (
        <button
          key={value}
          onClick={() => setLanguage(value)}
          className={`
            relative px-4 py-1.5 text-xs transition-all duration-250 select-none
            font-serif tracking-wider
            ${language === value
              ? 'text-ivory'
              : 'text-text-primary hover:text-curtain'
            }
            ${i === 0 ? '' : 'border-l border-gold/25'}
          `}
          style={{
            background:
              language === value
                ? 'linear-gradient(135deg, #8B1A1A 0%, #6B0F0F 100%)'
                : 'rgba(255,253,249,0.92)',
          }}
        >
          {/* Active glow */}
          {language === value && (
            <span
              className="absolute inset-0 rounded-none pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)',
              }}
            />
          )}
          <span className="relative z-10">{label}</span>
        </button>
      ))}
    </div>
  );
}
