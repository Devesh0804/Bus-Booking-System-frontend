function Label({ children, className = '', htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-semibold text-slate-700 ${className}`}
    >
      {children}
    </label>
  )
}

export default Label
