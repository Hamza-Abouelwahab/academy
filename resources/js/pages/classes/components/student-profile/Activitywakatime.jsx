const A = "#F4B400";
const CELL = 13;
const GAP = 3;

function Card({ children, className = "", style = {} }) {
    return (
        <div
            className={`bg-white border rounded-2xl ${className}`}
            style={style}
        >
            {children}
        </div>
    );
}

export default function Activitywakatime({ grid, monthLabels, heatColor }) {
    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
<Card className="w-full rounded-3xl p-8 border border-neutral-200">
                <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-lg font-semibold">Activity Heatmap</h3>
                    <p className="text-sm text-neutral-400 mt-1">Last 365 Days</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <span>Less</span>
                    {[0,1,2,3,4].map(level => (
                        <div key={level} className="w-4 h-4 rounded" style={{ background: heatColor(level) }} />
                    ))}
                    <span>More</span>
                </div>
            </div>

<div className="flex gap-3 w-full">
{/* <div className="w-full min-w-[1200px] flex gap-4">                     */}
                    {/* Day labels column */}
                    <div className="flex flex-col shrink-0" style={{ paddingTop: "20px", gap: `${GAP}px` }}>
                        {dayLabels.map((label, i) => (
                            <div
                                key={label}
                                className="text-xs text-neutral-400 text-right pr-2"
                             style={{ height: `${CELL}px`, lineHeight: `${CELL}px`,visibility: i % 2 === 0 ? "hidden" : "visible" }}
                            >
                                {label}
                            </div>
                        ))}
                    </div>

<div className="flex flex-col w-fit">
                                    {/* Month labels */}
                        <div
                            className="grid mb-2"
                    style={{ gridTemplateColumns: `repeat(53, ${CELL}px)`, columnGap: `${GAP}px` , }}
                        >
                            {monthLabels.map(month => (
                                <div
                                    key={month.name}
                                    style={{ gridColumnStart: month.week + 1 }}
                                    className="text-xs text-neutral-400"
                                >
                                    {month.name}
                                </div>
                            ))}
                        </div>

                        {/* Grid */}
                        <div
                            style={{
                                display: "grid",
                               gridTemplateColumns: `repeat(53, ${CELL}px)`,
                                gridTemplateRows: `repeat(7, ${CELL}px)`,
                            gap: `${GAP}px`,

                            }}
                        >
                            {grid.map((day) => (
                                <div
                                    key={day.date}
                                    title={`${day.date} — ${Math.round((day.seconds || 0) / 60)} mins`}
                                    style={{
        gridColumnStart: day.col + 1,
        gridRowStart: day.row + 1,
        background: heatColor(day.level),
       width: `${CELL}px`,
    height: `${CELL}px`,
    }}
className="rounded-[3px] transition-all duration-200 hover:scale-110 cursor-pointer"

/>
                            ))}
                        </div>
                    </div>
                    
                </div>
                            {/* <div className="mt-6 flex justify-end ">
    <div className="flex items-center gap-2 text-xs text-neutral-500">
        <span>Less</span>

        {[0, 1, 2, 3, 4].map((level) => (
            <div
                key={level}
                className="w-3 h-3 rounded-sm"
                style={{
                    background: heatColor(level),
                }}
            />
        ))}

        <span>More</span>
    </div>
</div> */}
            {/* </div> */}

        </Card>
    );
}