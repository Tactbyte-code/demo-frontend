export default function StatusBadge({ status, label }) {
  const styles = {
    strong: "bg-emerald-100 text-emerald-800 border-emerald-200",
    promising: "bg-blue-100 text-blue-800 border-blue-200",
    moderate: "bg-amber-100 text-amber-800 border-amber-200",
    weak: "bg-red-100 text-red-800 border-red-200",
    insufficient_data: "bg-gray-100 text-gray-800 border-gray-200",
    default: "bg-slate-100 text-slate-800 border-slate-200"
  };

  const normalizedStatus = status?.toLowerCase() || "default";
  const selectedStyle = styles[normalizedStatus] || styles.default;

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${selectedStyle}`}>
      {label || status}
    </span>
  );
}