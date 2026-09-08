import { RefreshCw } from "lucide-react";

interface RefreshProps {
  onClick: () => void;
  loading?: boolean;
}

const Refresh = ({ onClick, loading = false }: RefreshProps) => {
  return (
    <button
      type="button"
      onClick={loading ? undefined : onClick}
      disabled={loading}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
      {loading ? "Refreshing..." : "Refresh"}
    </button>
  );
};

export default Refresh;
