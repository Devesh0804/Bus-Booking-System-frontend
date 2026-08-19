function Input({ className = '', ...props }) {
  return (
    <input
      className={`h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-950 shadow-sm transition placeholder:text-slate-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-100 ${className}`}
      {...props}
    />
  )
}

export default Input
