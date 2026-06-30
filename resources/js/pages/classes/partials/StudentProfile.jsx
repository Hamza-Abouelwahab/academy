
import { useState, useEffect } from "react";
import {
    Trophy,
    Flame,
    Star,
    Clock,
    BookOpen,
    Award,
    Mail,
    Gift,
    BookMarked,
    CheckCircle2,
    Target,
    Layers,
    Zap,
    Brain,
    Plus,
    Minus,
    MessageSquare,
    Camera,
    Pencil,
    Code2,
    Shield,
    Briefcase,
    ChevronLeft,
    TrendingUp,
} from "lucide-react";
import {
    PlayCircle,
    FileText,
    PenSquare,
    ArrowRight,
    Lock,
    ChevronRight,
} from "lucide-react";

import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,

    CartesianGrid,
} from "recharts";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import LearningJourney from "../components/student-profile/LearningJourney";
import Activitywakatime from "../components/student-profile/Activitywakatime";
import {Link} from "@inertiajs/react";
const A = "#F4B400";
const AD = "#c49000";
function getInitials(name = "") {
    return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}
function Card({ children, className = "", style = {},  background = true, }) {
    return (
        <div
 className={`${background ? "bg-white" : ""} border rounded-2xl ${className}`}
             style={style}
        >
            {children}
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <div className="w-1 h-4 rounded-full" style={{ background: A }} />
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    {title}
                </h3>
            </div>
            {children}
        </div>
    );
}

function Avatar({ src, name, className = "" }) {
    const [error, setError] = useState(false);
    if (src && !error) {
        return (
            <img
                src={src}
                alt={name}
                onError={() => setError(true)}
                className={`object-cover ${className}`}
            />
        );
    }
    return (
        <div className={`bg-[#F4B400] flex items-center justify-center font-bold text-white ${className}`}>
            {getInitials(name)}
        </div>
    );
}

export default function StudentProfile({ student, onBack }) {

    console.log(student);
    const s = {
        xp: student.xp ?? "8,357",
        level: student.level ?? 14,
        streak: student.streak ?? 28,
        study_time: student.study_time ?? "284h",
        lessons: student.lessons ?? 642,
        exercises: student.exercises ?? 87,
        quizzes: student.quizzes ?? 52,
        projects: student.projects ?? 4,
        badges: student.badges ?? 24,
        lhi: student.lhi ?? 97,
        consistency: student.consistency ?? 95,
        engagement: student.engagement ?? 98,
        dropout_risk: student.dropout_risk ?? 5,
        coding_today: student.coding_today ?? "2h 14m",
        coding_week: student.coding_week ?? "12h 43m",
        coding_month: student.coding_month ?? "48h 12m",
        coding_total: student.coding_total ?? "284h",
        promotion: student.promotion ?? "Promo 5 – Coding 2",
        last_active: student.last_active ?? "21/06/2026 14:25:21",
        global_rank: student.global_rank ?? null,
        coding_hours: student.coding_hours ?? "551.6h",
        posts: student.posts ?? 0,
    };
    const velocityData = [
        { week: "WK 01", xp: 60 },
        { week: "WK 02", xp: 68 },
        { week: "WK 03", xp: 66 },
        { week: "WK 04", xp: 82 },
        { week: "WK 05", xp: 81 },
        { week: "WK 06", xp: 92 },
    ];


    const [waka, setWaka] = useState(null);
    const activity = Array.isArray(waka) ? waka : [];

   useEffect(() => {
    console.log("Student ID:", student.id);

    if (!student.id) return;

    fetch(`/wakatime/${student.id}`)
        .then(res => {
            console.log("Status:", res.status);
            console.log("OK:", res.ok);
            return res.json();
        })
        .then(data => {
            console.log("DATA:", data);
            setWaka(data);
        })
        .catch(err => {
            console.error(err);
        });

}, [student.id]);

    const monthLabels = [
        { name: "Jul", week: 0 },
        { name: "Aug", week: 4 },
        { name: "Sep", week: 8 },
        { name: "Oct", week: 13 },
        { name: "Nov", week: 17 },
        { name: "Dec", week: 22 },
        { name: "Jan", week: 26 },
        { name: "Feb", week: 31 },
        { name: "Mar", week: 35 },
        { name: "Apr", week: 40 },
        { name: "May", week: 44 },
        { name: "Jun", week: 49 },
    ];



    const heatColor = (level) => {
        switch (level) {
            case 0: return "#F5F5F4";
            case 1: return "#FEF3C7";
            case 2: return "#FCD34D";
            case 3: return "#F4B400";
            case 4: return "#B45309";
            default: return "#F5F5F4";
        }
    };




    const xpBreakdown = [
        {
            name: "Quizzes",
            value: 2400,
            color: "#F4B400",
        },
        {
            name: "Exercises",
            value: 1800,
            color: "#D9A000",
        },
        {
            name: "Projects",
            value: 3100,
            color: "#A97800",
        },
        {
            name: "Challenges",
            value: 1057,
            color: "#E5E7EB",
        },
    ];
    const roadmap = [
        { name: "HTML City", pct: 100 },
        { name: "CSS Island", pct: 100 },
        { name: "JavaScript Kingdom", pct: 85 },
        { name: "React Galaxy", pct: 20 },
        { name: "Backend Empire", pct: 0 },
    ];

    const quizzes = [
        { name: "HTML Basics", score: 100, date: "Jan 10", passed: true },
        { name: "CSS Flexbox", score: 90, date: "Jan 14", passed: true },
        { name: "JS Functions", score: 80, date: "Jan 25", passed: true },
        { name: "JS Algorithms", score: 55, date: "Feb 02", passed: false },
        { name: "React Hooks", score: 88, date: "Feb 10", passed: true },
    ];

    const exercises = [
        { name: "Variables", result: "Completed", date: "Jan 13" },
        { name: "Loops", result: "Completed", date: "Jan 15" },
        { name: "Arrays", result: "Completed", date: "Jan 17" },
        { name: "DOM Manipulation", result: "Completed", date: "Jan 22" },
        { name: "Async / Await", result: "Failed", date: "Feb 01" },
    ];

    const projects = [
        { name: "Landing Page", score: 92, date: "Jan 12" },
        { name: "Portfolio", score: 95, date: "Jan 18" },
        { name: "React Dashboard", score: 88, date: "Feb 03" },
        { name: "Blog App", score: 79, date: "Feb 20" },
    ];

    const badges = [
        { icon: "🔥", label: "30 Day Streak" },
        { icon: "🏆", label: "Quiz Master" },
        { icon: "⚡", label: "Fast Learner" },
        { icon: "💎", label: "XP Hunter" },
        { icon: "🚀", label: "Challenge Champ" },
        { icon: "🎯", label: "Perfect Score" },
    ];

    const timeDistribution = [
        { label: "Practice", hours: 18.4, color: "#F4B400" },
        { label: "Video", hours: 12.2, color: "#D4A000" },
        { label: "Projects", hours: 9.1, color: "#A87D00" },
        { label: "Community", hours: 9.5, color: "#E5E7EB" },
    ];
    const totalHours = timeDistribution.reduce((acc, d) => acc + d.hours, 0);

    const insights = [
        { icon: "✅", bg: "bg-green-50 border-green-100", title: "Excellent consistency", body: "Student logs in daily and maintains a 28-day streak. LHI is 97% — top 5% of all students." },
        { icon: "💪", bg: "bg-amber-50 border-amber-100", title: "Strong React performance", body: "Averaging 88% on React quizzes. Project scores consistently above 88%. Frontend skill at 80%." },
        { icon: "⚠️", bg: "bg-red-50 border-red-100", title: "Weakness: JS Algorithms", body: "Latest JS Algorithms quiz scored 55%. Recommend focused practice on problem-solving and data structures." },
        { icon: "🎯", bg: "bg-blue-50 border-blue-100", title: "Recommended next course", body: "Advanced JavaScript Patterns — available in catalog. Estimated completion: 3 weeks at current pace." },
    ];


    const skillData = [
        { subject: "Frontend", value: 85 },
        { subject: "Backend", value: 78 },
        { subject: "Database", value: 82 },
        { subject: "AI", value: 40 },
        { subject: "Design", value: 75 },
    ];



// const activity = Array.isArray(waka) ? waka : [];


// function getLevel(seconds) {
//     if (!seconds || seconds === 0) return 0;
//     if (seconds < 1800) return 1;
//     if (seconds < 3600) return 2;
//     if (seconds < 7200) return 3;
//     return 4;
// }

// // F grid mapping:
// const grid = activity.map((day) => {
//     const diffDays = Math.floor((new Date(day.date) - startDate) / (1000 * 60 * 60 * 24));
//     return {
//         ...day,
//         col: Math.floor(diffDays / 7),
//         row: new Date(day.date).getDay(),
//         level: getLevel(day.seconds), // ✅ zid hadchi
//     };
// });


// console.log(activity.find(day => day.seconds > 0));
// console.log("FIRST ITEM:", waka?.[0]);
// const startDate = new Date(activity[0]?.date);

// const grid = activity.map((day) => {
//     const date = new Date(day.date);

//     const diffDays = Math.floor(
//         (date - startDate) / (1000 * 60 * 60 * 24)
//     );

//     return {
//         ...day,
//        col: Math.floor(diffDays / 7),
// row: new Date(day.date).getDay(), // 0 = Sunday
//     };
// });

// const activity = (Array.isArray(waka) ? waka : [])
//     .slice()
//     .sort((a, b) => new Date(a.date) - new Date(b.date));

// 1. AwwaL — hisab startDate
const startDate = activity.length > 0 ? new Date(activity[0].date) : new Date();

// 2. Men ba3d — getLevel
function getLevel(seconds) {
    if (!seconds || seconds === 0) return 0;
    if (seconds < 1800) return 1;
    if (seconds < 3600) return 2;
    if (seconds < 7200) return 3;
    return 4;
}

// 3.Akhiran — grid
const grid = activity.map((day) => {
    const diffDays = Math.floor(
        (new Date(day.date) - startDate) / (1000 * 60 * 60 * 24)
    );
    return {
        ...day,
        col: Math.floor(diffDays / 7),
        row: new Date(day.date).getDay(),
        level: getLevel(day.seconds),
    };
});


    console.log("waka", waka);
console.log("activity", activity);
console.log("grid", grid);


    return (
        <div className="flex flex-col gap-8 pb-16 ">

            <div className="rounded-3xl overflow-hidden border bg-gradient-to-b from-[#FFF7DD] via-[#FAF8F3] to-[#F2F2F2]">

                <button
                    onClick={onBack}
                    className="absolute top-14 left-6 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ffc801] hover:bg-black hover:text-[#ffc801] text-black text-sm font-medium transition backdrop-blur-sm"
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
                                    className="px-3 py-1 rounded-full text-xs font-semibold text-black"
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
                                className="p-6  !bg-transparent flex justify-center items-center border border-[#E8D28A]"

                            >
                                <div className="w-[360px] h-[360px]">

                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart
                                            cx="50%"
                                            cy="50%"
                                            outerRadius="68%"
                                            data={skillData}
                                            
                                        >

                                             <PolarGrid
        gridType="polygon"
        fill="#FFFFFF"
        fillOpacity={1}
        stroke="#E5E7EB"
    />

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
                {/* <div className="border-t  px-8 py-6">
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
                </div> */}
            </div>


            <Activitywakatime
    grid={grid}
    monthLabels={monthLabels}
    heatColor={heatColor}
/>
















<LearningJourney/>



{/* 
            <Card className="rounded-3xl p-7 border border-neutral-200">

                <div className="flex items-center justify-between mb-8">

                    <div>
                        <h3 className="text-lg font-semibold">
                            Activity Heatmap
                        </h3>

                        <p className="text-sm text-neutral-400 mt-1">
                            365 Days
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-neutral-500">

                        Less

                        {[0, 1, 2, 3, 4].map(level => (
                            <div
                                key={level}
                                className="w-4 h-4 rounded"
                                style={{
                                    background: heatColor(level)
                                }}
                            />
                        ))}

                        More

                    </div>

                </div>

                <div className="overflow-x-auto">

                    <div className="min-w-[900px]">

                        {/* Months */}
{/* 
                        <div
                            className="grid mb-3"
                            style={{
                                gridTemplateColumns: "repeat(53,14px)",
                                columnGap: "4px"
                            }}
                        >

                            {monthLabels.map(month => (
                                <div
                                    key={month.name}
                                    style={{
                                        gridColumnStart: month.week + 1
                                    }}
                                    className="text-xs text-neutral-400"
                                >
                                    {month.name}
                                </div>
                            ))}

                        </div> */}

                        {/* Heatmap */}

                        {/* <div
                            className="grid grid-flow-col"
                            style={{
                                gridTemplateRows: "repeat(7,14px)",
                                gridAutoColumns: "14px",
                                gap: "4px"
                            }}
                        >

                            {grid.map(day => (
                                <div
                                    key={day.date}
                                    title={`${day.date} - ${day.text}`}
                                    className="w-[12px] h-[12px] rounded-[3px]"
                                    style={{ background: heatColor(day.level) }}
                                />
                            ))}


                        </div>

                    </div>

                </div>

            </Card> */}





            <Section title="Learning Health">
                <div className="grid grid-cols-4 gap-3">
                    {[
                        { title: "Learning Health Index", value: `${s.lhi}%`, sub: "Quiz, streak & attendance." },
                        { title: "Consistency", value: `${s.consistency}%`, sub: "Weekly activity frequency." },
                        { title: "Engagement", value: `${s.engagement}%`, sub: "Videos & exercises rate." },
                        { title: "Dropout Risk", value: `${s.dropout_risk}%`, sub: "Risk factor analysis." },
                    ].map(({ title, value, sub }, i) => {
                        const isRed = i === 3; // Dropout risk index
                        return (
                            <Card key={title} className={`p-4 border-none shadow-none bg-neutral-50/50 ${isRed ? "!bg-red-50/30" : ""}`}>
                                <div className="flex flex-col">
                                    <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${isRed ? "text-red-400" : "text-neutral-400"}`}>
                                        {title}
                                    </span>
                                    <span className={`text-2xl font-black mt-1 ${isRed ? "text-red-500" : "text-neutral-900"}`}>
                                        {value}
                                    </span>
                                    <span className="text-[10px] text-neutral-400 mt-1 leading-snug">
                                        {sub}
                                    </span>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </Section>






            <section className="flex items-stretch gap-6">
                <div className="w-[700px] shrink-0">
                    <Card className="h-full p-6 rounded-3xl border border-neutral-200">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-neutral-900">
                                Learning Velocity
                            </h3>

                            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#F4B400]/40 bg-[#FFF9E8]">
                                <TrendingUp size={15} color="#F4B400" />
                                <span className="text-sm font-semibold text-[#C49000]">
                                    +24% vs Last Month
                                </span>
                            </div>
                        </div>

                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={velocityData}>
                                    <defs>
                                        <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#F4B400" stopOpacity={0.30} />
                                            <stop offset="100%" stopColor="#F4B400" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>

                                    <XAxis
                                        dataKey="week"
                                        tick={{ fill: "#9CA3AF", fontSize: 13 }}
                                        tickLine={false}
                                        axisLine={false}
                                    />

                                    <YAxis hide />

                                    <Tooltip
                                        cursor={false}
                                        contentStyle={{
                                            borderRadius: 12,
                                            border: "1px solid #F3F4F6",
                                            boxShadow: "0 10px 25px rgba(0,0,0,.08)",
                                        }}
                                    />

                                    <Area
                                        type="monotone"
                                        dataKey="xp"
                                        stroke="#C49000"
                                        strokeWidth={3}
                                        fill="url(#velocityGradient)"
                                        dot={false}
                                        activeDot={{
                                            r: 5,
                                            fill: "#F4B400",
                                        }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                <div className="w-[420px]">

                    {/* XP */}
                    <Card className="h-full p-6 rounded-3xl border border-neutral-200 flex flex-col">
                        <h3 className="text-base font-semibold mb-5">
                            XP Breakdown
                        </h3>

                        <ResponsiveContainer width="100%" height={180}>
                            <PieChart>
                                <Pie
                                    data={xpBreakdown}
                                    dataKey="value"
                                    innerRadius={55}
                                    outerRadius={78}
                                    paddingAngle={3}
                                >
                                    {xpBreakdown.map((item, index) => (
                                        <Cell
                                            key={index}
                                            fill={item.color}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip formatter={(v) => [`${v} XP`]} />
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="space-y-3 mt-4">
                            {xpBreakdown.map((item) => (
                                <div
                                    key={item.name}
                                    className="flex items-center justify-between text-sm"
                                >
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-3 h-3 rounded-full"
                                            style={{ background: item.color }}
                                        />
                                        <span className="text-gray-500">
                                            {item.name}
                                        </span>
                                    </div>

                                    <span className="font-semibold">
                                        {item.value} XP
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Card>






                </div>

            </section>










            {/* ══════════════════════════════════════
          7. PROJECTS + BADGES
      ══════════════════════════════════════ */}
            <Section title="Projects · Badges">
                <div className="grid grid-cols-2 gap-4">
                    <Card className="p-5">
                        <p className="text-sm font-semibold text-gray-800 mb-3">Projects</p>
                        <div className="flex flex-col divide-y divide-gray-50">
                            {projects.map(({ name, score, date }) => (
                                <div key={name} className="flex items-center justify-between py-3">
                                    <div>
                                        <p className="text-xs font-medium text-gray-800">{name}</p>
                                        <p className="text-[10px] text-gray-400 mt-0.5">{date}</p>
                                    </div>
                                    <span
                                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                                        style={{
                                            background: score >= 90 ? "#F0FDF4" : score >= 75 ? "#FEFCE8" : "#FEF2F2",
                                            color: score >= 90 ? "#15803D" : score >= 75 ? "#A16207" : "#B91C1C",
                                        }}
                                    >
                                        {score}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-5">
                        <p className="text-sm font-semibold text-gray-800 mb-3">Badges Earned</p>
                        <div className="grid grid-cols-3 gap-2">
                            {badges.map(({ icon, label }) => (
                                <div
                                    key={label}
                                    className="flex flex-col items-center gap-1.5 bg-amber-50 border border-amber-100 rounded-xl py-3 px-2"
                                >
                                    <span className="text-2xl">{icon}</span>
                                    <p className="text-[10px] text-center text-amber-800 font-medium leading-tight">{label}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </Section>

            {/* ══════════════════════════════════════
          8. QUIZ & EXERCISE HISTORY
      ══════════════════════════════════════ */}
            <Section title="Quiz & Exercise History">
                <div className="grid grid-cols-2 gap-4">
                    <Card className="p-5">
                        <p className="text-sm font-semibold text-gray-800 mb-4">Quiz History</p>
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="border-b border-gray-50 text-gray-400">
                                    <th className="text-left pb-2 font-medium">Quiz</th>
                                    <th className="text-center pb-2 font-medium">Score</th>
                                    <th className="text-center pb-2 font-medium">Date</th>
                                    <th className="text-center pb-2 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {quizzes.map(({ id,name, score, date, passed }) => (
                                    <tr key={name}>
                                       
<td className="py-2.5">
    <Link
        href={`/admin/quizzes/${id}`}
        className="font-medium text-[#000000] hover:text-[#ffc801] hover:underline transition"
    >
        {name}
    </Link>
</td>



                                        <td
                                            className="py-2.5 text-center font-bold"
                                            style={{ color: score >= 80 ? "#15803D" : "#B91C1C" }}
                                        >
                                            {score}%
                                        </td>
                                        <td className="py-2.5 text-center text-gray-400">{date}</td>
                                        <td className="py-2.5 text-center">
                                            <span
                                                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${passed ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                                                    }`}
                                            >
                                                {passed ? "Passed" : "Failed"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>

                    <Card className="p-5">
                        <p className="text-sm font-semibold text-gray-800 mb-4">Exercise History</p>
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="border-b border-gray-50 text-gray-400">
                                    <th className="text-left pb-2 font-medium">Exercise</th>
                                    <th className="text-center pb-2 font-medium">Result</th>
                                    <th className="text-center pb-2 font-medium">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {exercises.map(({id, name, result, date }) => (
                                    <tr key={name}>
                                        <td className="py-2.5">
                <Link
                    href={`/admin/exercises/${id}`}
                    className="font-medium text-[#000000] hover:text-[#ffc801] hover:underline transition"
                >
                    {name}
                </Link>
            </td>
                                        <td className="py-2.5 text-center">
                                            <span
                                                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${result === "Completed" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                                                    }`}
                                            >
                                                {result}
                                            </span>
                                        </td>
                                        <td className="py-2.5 text-center text-gray-400">{date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </div>
            </Section>


{/* 
            {
                selectedRoadmap && (

                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm">

                        <div className="w-[420px] rounded-3xl bg-white shadow-2xl border border-neutral-200 overflow-hidden">

                            <div className="bg-gradient-to-r from-[#FFF9EA] to-white p-6 border-b">

                                <div className="flex justify-between items-start">

                                    <div>

                                        <h2 className="text-lg font-semibold">

                                            {selectedRoadmap.title}

                                        </h2>

                                        <p className="text-sm text-neutral-400 mt-1">

                                            Currently Learning

                                        </p>

                                    </div>

                                    <button

                                        onClick={() => setSelectedRoadmap(null)}

                                        className="text-neutral-400 hover:text-black"

                                    >

                                        ✕

                                    </button>

                                </div>

                                <div className="mt-6">

                                    <p className="text-5xl font-bold text-[#F4B400]">

                                        {selectedRoadmap.progress}%

                                    </p>

                                    <div className="mt-3 h-2 rounded-full bg-neutral-100 overflow-hidden">

                                        <div

                                            className="h-full bg-[#F4B400]"

                                            style={{

                                                width: `${selectedRoadmap.progress}%`

                                            }}

                                        />

                                    </div>

                                </div>

                            </div>

                            <div className="p-6 space-y-6">

                                <div>

                                    <p className="text-[11px] uppercase tracking-widest text-neutral-400">
                                        Current Chapter
                                    </p>

                                    <p className="font-semibold mt-2 text-neutral-900">
                                        {selectedRoadmap.chapter}
                                    </p>

                                    <p className="text-sm text-neutral-500 mt-1">
                                        {selectedRoadmap.currentLesson}
                                    </p>

                                </div>

                                <div className="grid grid-cols-2 gap-3">

                                    <div className="rounded-2xl border bg-neutral-50 p-4">

                                        <p className="text-[10px] uppercase text-neutral-400">
                                            Days in Module
                                        </p>

                                        <p className="mt-2 text-xl font-bold">
                                            18 Days
                                        </p>

                                    </div>

                                    <div className="rounded-2xl border bg-neutral-50 p-4">

                                        <p className="text-[10px] uppercase text-neutral-400">
                                            Last Activity
                                        </p>

                                        <p className="mt-2 text-xl font-bold">
                                            2 Hours Ago
                                        </p>

                                    </div>

                                </div>

                                <div className="grid grid-cols-3 gap-3">

                                    <div className="rounded-xl bg-neutral-50 border p-4">

                                        <p className="text-[10px] uppercase text-neutral-400">
                                            Lessons
                                        </p>

                                        <p className="font-semibold mt-2">
                                            {selectedRoadmap.lessons}
                                        </p>

                                    </div>

                                    <div className="rounded-xl bg-neutral-50 border p-4">

                                        <p className="text-[10px] uppercase text-neutral-400">
                                            Exercises
                                        </p>

                                        <p className="font-semibold mt-2">
                                            {selectedRoadmap.exercises}
                                        </p>

                                    </div>

                                    <div className="rounded-xl bg-neutral-50 border p-4">

                                        <p className="text-[10px] uppercase text-neutral-400">
                                            Quizzes
                                        </p>

                                        <p className="font-semibold mt-2">
                                            {selectedRoadmap.quizzes}
                                        </p>

                                    </div>

                                </div>

                                <div className="border rounded-2xl p-4 bg-[#FFF9EA] border-[#F4D77C]">

                                    <p className="text-[10px] uppercase tracking-widest text-neutral-500">
                                        Progress Summary
                                    </p>

                                    <div className="mt-3 space-y-2 text-sm">

                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">
                                                Completion
                                            </span>

                                            <span className="font-semibold">
                                                {selectedRoadmap.progress}%
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">
                                                Estimated Finish
                                            </span>

                                            <span className="font-semibold">
                                                6 Days
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">
                                                Status
                                            </span>

                                            <span className="font-semibold text-green-600">
                                                Active
                                            </span>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                )
            } */}

        </div>


    );


}