export const RenderField = (label: string, value: string | undefined) => (
    <div className="grid grid-cols-2 py-2">
        <span className="text-gray-600 font-medium">{label}:</span>
        <span className="text-gray-900 font-semibold text-left">{value || "N/A"}</span>
    </div>
);