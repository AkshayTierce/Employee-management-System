interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: "blue" | "green" | "amber";
}

const accentMap = {
  blue: "text-blue-600",
  green: "text-green-700",
  amber: "text-amber-600",
};

export default function StatCard({ label, value, sub, accent = "blue" }: StatCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-3xl font-bold font-mono ${accentMap[accent]}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}
