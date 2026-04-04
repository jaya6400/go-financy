export default function InsightCard({ title, value, subtext, icon, accentColor }) {
  return (
    <div
      className="rounded-2xl p-5 cursor-default"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        boxShadow: 'var(--shadow-card)',
        borderLeft: `4px solid ${accentColor}`,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
          {title}
        </span>
        <span className="text-xl">{icon}</span>
      </div>
      <p className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
        {value}
      </p>
      <p className="text-xs mt-1.5 font-medium" style={{ color: 'var(--text-muted)' }}>
        {subtext}
      </p>
    </div>
  );
}