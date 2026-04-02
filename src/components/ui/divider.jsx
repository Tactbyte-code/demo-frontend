export function Divider({ label }) {
    return (
        <div className="relative flex items-center py-2">
            <div className="grow border-t" />
            {label && (
                <span className="mx-4 text-[10px] font-bold uppercase tracking-widest">
                    {label}
                </span>
            )}
            <div className="grow border-t" />
        </div>
    )
}