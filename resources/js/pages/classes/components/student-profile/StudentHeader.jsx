   <div className="rounded-3xl overflow-hidden border bg-gradient-to-b from-[#FFF7DD] via-[#FAF8F3] to-[#F2F2F2]">

                <button
                    onClick={onBack}
                    className="absolute top-5 left-6 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition backdrop-blur-sm"
                >
                    <ChevronLeft size={15} /> Back
                </button>
                {/* Info */}
                <div className="flex gap-8 px-8 py-8">
                    <div className="flex-1">
                        {/* Avatar */}
                        <div className="mt-8">
                            <div className="h-32 w-32 overflow-hidden rounded-full border border-neutral-200">
                                <img
                                    src={`http://127.0.0.1:8000/storage/avatars/${student.avatar}`}
                                    alt={student.name}

                                    className="h-full w-full object-cover object-top"
                                />
                            </div>
                        </div>
                        <div>

                            <h2 className="text-3xl font-bold text-gray-900">
                                {student.name}
                            </h2>

                            <p className="mt-1 text-gray-500">
                                {student.email}
                            </p>

                            <div className="flex items-center gap-2 mt-4">
                                <span className="text-sm text-gray-500">
                                    Promo {student.promo} • {student.type} {student.class}
                                </span>

                                <span className="w-1 h-1 rounded-full bg-gray-300" />

                                <span
                                    className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                                    style={{ background: A }}
                                >
                                    {student.status}
                                </span>
                            </div>



                            {/* NEW */}
                            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6">
                                {[
                                    { label: "XP", value: s.xp, color: "text-[#F4B400]" },
                                    { label: "Level", value: s.level, color: "text-neutral-900" },
                                    { label: "Lessons", value: s.lessons, color: "text-neutral-900" },
                                    { label: "Exercises", value: s.exercises, color: "text-neutral-900" },
                                    { label: "Quizzes", value: s.quizzes, color: "text-neutral-900" },
                                    { label: "Projects", value: s.projects, color: "text-neutral-900" },
                                    { label: "Badges", value: s.badges, color: "text-neutral-900" }
                                ].map((stat, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                                            {stat.label}
                                        </span>
                                        <span className={`text-lg font-semibold ${stat.color}`}>
                                            {stat.value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center gap-2 text-[11px] text-neutral-400 font-medium">
                                <Clock size={12} />
                                <span>Last login : {s.last_active}</span>
                            </div>

                        </div>


                    </div>
                    <div className="w-[420px] shrink-0">
                        <Section title="Skill Mastery">
                            <Card
                                className="p-6 flex justify-center items-center border border-[#E8D28A]"

                            >
                                <div className="w-[360px] h-[360px]">

                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart
                                            cx="50%"
                                            cy="50%"
                                            outerRadius="68%"
                                            data={skillData}
                                        >

                                            <PolarGrid />

                                            <Tooltip
                                                cursor={{ fill: "rgba(244,180,0,0.06)" }}
                                                contentStyle={{
                                                    background: "#fff",
                                                    border: "1px solid #F3F4F6",
                                                    borderRadius: "10px",
                                                    boxShadow: "0 8px 20px rgba(0,0,0,.08)",
                                                }}
                                                formatter={(value) => [`${value}%`, "Mastery"]}
                                            />

                                            <PolarAngleAxis
                                                dataKey="subject"
                                                tick={{
                                                    fill: "#111827",
                                                    fontSize: 13,
                                                    fontWeight: 500,
                                                }}
                                            />

                                            <PolarRadiusAxis
                                                domain={[0, 100]}
                                                tick={false}
                                                axisLine={false}
                                            />

                                            <Radar
                                                dataKey="value"
                                                stroke="#8B6B00"
                                                fill="#F4B400"
                                                fillOpacity={0.35}
                                                strokeWidth={4}
                                            />

                                        </RadarChart>
                                    </ResponsiveContainer>

                                </div>

                            </Card>
                        </Section>
                    </div>
                </div>

                {/* Quick stats bar */}
                <div className="border-t  px-8 py-6">
                    <div className="grid grid-cols-4 gap-5">

                        {[
                            { icon: <Trophy size={20} />, label: "Global Rank", value: s.global_rank ?? "—" },
                            { icon: <Code2 size={20} />, label: "Coding Hours", value: s.coding_hours },
                            { icon: <Shield size={20} />, label: "Level", value: String(s.level) },
                            { icon: <Briefcase size={20} />, label: "Projects", value: String(s.projects) },
                        ].map(({ icon, label, value }) => (

                            <div
                                key={label}
                                className="
        flex items-center gap-4
        px-6 py-5
        rounded-2xl
        -translate-y-1
        shadow-lg
        transition-all duration-500
        hover:-translate-y-2
        hover:shadow-xl
        hover:scale-[1.00]
        cursor-default
        animate-[fadeIn_.3s_ease]
    "
                            >
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                                    style={{
                                        background: "#FFC801",
                                        boxShadow: "0 8px 20px rgba(255,200,1,.18)",
                                    }}
                                >
                                    <span className="text-white">
                                        {icon}
                                    </span>
                                </div>

                                <div className="flex flex-col">
                                    <p className="text-2xl font-bold text-neutral-900 leading-none">
                                        {value}
                                    </p>

                                    <p className="text-xs text-neutral-400 mt-1 font-medium">
                                        {label}
                                    </p>
                                </div>
                            </div>

                        ))}

                    </div>
                </div>
            </div>