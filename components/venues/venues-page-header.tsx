type VenuesPageHeaderProps = {
  companyName: string;
};

export function VenuesPageHeader({ companyName }: VenuesPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Discovery
          </span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          Partner Venues
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Browse corporate dining & banquet venues approved for{" "}
          <span className="font-semibold text-slate-700">{companyName}</span>.
        </p>
      </div>
    </div>
  );
}
