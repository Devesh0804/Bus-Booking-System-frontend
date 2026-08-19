function Button({ children, className = '', variant = 'primary', type = 'button', ...props }) {
  const variantStyles = {
    primary: 'bg-rose-600 text-white shadow-sm hover:bg-rose-700 focus:ring-rose-500',
    outline: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-rose-500',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-rose-500',
  }

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-3xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
