function SearchCard({ children, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/70 sm:p-5 lg:p-6"
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_0.9fr_0.85fr_auto] lg:items-end">
        {children}
      </div>
    </form>
  )
}

export default SearchCard
