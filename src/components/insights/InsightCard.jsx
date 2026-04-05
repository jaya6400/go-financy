export default function InsightCard({ title, value, subtext, accentColor }) {
  return (
    <div
      className="rounded-2xl p-4 cursor-default flex flex-col"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        boxShadow: 'var(--shadow-card)',
        borderLeft: `4px solid ${accentColor}`,
      }}
    >
      <span
        className="text-xs font-semibold uppercase tracking-widest mb-3"
        style={{ color: 'var(--text-muted)' }}
      >
        {title}
      </span>
      <p
        className="text-xl font-extrabold tracking-tight truncate"
        style={{ color: 'var(--text-primary)' }}
        title={value}
      >
        {value}
      </p>
      <p className="text-xs mt-1.5 font-medium truncate" style={{ color: 'var(--text-muted)' }}>
        {subtext}
      </p>
    </div>
  );
}