import React from "react";
function FormInput({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-3 py-2 rounded bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
      />

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
export default FormInput;
