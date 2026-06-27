// export default function StudentProfile({ student, onBack }) {
//     return (
//         <div className="rounded-2xl bg-white p-8 border border-neutral-200">
//             <button
//                 onClick={onBack}
//                 className="mb-6 text-sm font-medium text-[#F4B400]"
//             >
//                 ← Back to Students
//             </button>

//             <h1 className="text-3xl font-bold">
//                 {student.name}
//             </h1>

//             <p className="mt-2 text-neutral-500">
//                 {student.email}
//             </p>

//             <div className="mt-10">
//                 Student Profile Coming Soon...
//             </div>
//         </div>
//     );
// }



















import { useState, useEffect } from "react";
import {
  Trophy, Flame, Star, Clock, BookOpen, Award,
  Mail, Gift, BookMarked, CheckCircle2,
  Target, Layers, Zap, Brain, Plus, Minus,
  MessageSquare, Camera, Pencil, Code2,
  MessageCircle, Briefcase, ChevronLeft,
} from "lucide-react";

const A = "#F4B400";
const AD = "#c49000";

function getInitials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white border border-gray-100 rounded-2xl ${className}`}>
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

  const s = {
    xp:           student.xp          ?? "8,357",
    level:        student.level        ?? 14,
    streak:       student.streak       ?? 28,
    study_time:   student.study_time   ?? "284h",
    lessons:      student.lessons      ?? 642,
    exercises:    student.exercises    ?? 87,
    quizzes:      student.quizzes      ?? 52,
    projects:     student.projects     ?? 4,
    badges:       student.badges       ?? 24,
    lhi:          student.lhi          ?? 97,
    consistency:  student.consistency  ?? 95,
    engagement:   student.engagement   ?? 98,
    dropout_risk: student.dropout_risk ?? 5,
    coding_today: student.coding_today ?? "2h 14m",
    coding_week:  student.coding_week  ?? "12h 43m",
    coding_month: student.coding_month ?? "48h 12m",
    coding_total: student.coding_total ?? "284h",
    promotion:    student.promotion    ?? "Promo 5 – Coding 2",
    last_active:  student.last_active  ?? "21/06/2026 14:25:21",
    global_rank:  student.global_rank  ?? null,
    coding_hours: student.coding_hours ?? "551.6h",
    posts:        student.posts        ?? 0,
  };

  const roadmap = [
    { name: "HTML City",          pct: 100 },
    { name: "CSS Island",         pct: 100 },
    { name: "JavaScript Kingdom", pct: 85  },
    { name: "React Galaxy",       pct: 20  },
    { name: "Backend Empire",     pct: 0   },
  ];

  const quizzes = [
    { name: "HTML Basics",   score: 100, date: "Jan 10", passed: true  },
    { name: "CSS Flexbox",   score: 90,  date: "Jan 14", passed: true  },
    { name: "JS Functions",  score: 80,  date: "Jan 25", passed: true  },
    { name: "JS Algorithms", score: 55,  date: "Feb 02", passed: false },
    { name: "React Hooks",   score: 88,  date: "Feb 10", passed: true  },
  ];

  const exercises = [
    { name: "Variables",        result: "Completed", date: "Jan 13" },
    { name: "Loops",            result: "Completed", date: "Jan 15" },
    { name: "Arrays",           result: "Completed", date: "Jan 17" },
    { name: "DOM Manipulation", result: "Completed", date: "Jan 22" },
    { name: "Async / Await",    result: "Failed",    date: "Feb 01" },
  ];

  const projects = [
    { name: "Landing Page",    score: 92, date: "Jan 12" },
    { name: "Portfolio",       score: 95, date: "Jan 18" },
    { name: "React Dashboard", score: 88, date: "Feb 03" },
    { name: "Blog App",        score: 79, date: "Feb 20" },
  ];

  const badges = [
    { icon: "🔥", label: "30 Day Streak"  },
    { icon: "🏆", label: "Quiz Master"     },
    { icon: "⚡", label: "Fast Learner"    },
    { icon: "💎", label: "XP Hunter"       },
    { icon: "🚀", label: "Challenge Champ" },
    { icon: "🎯", label: "Perfect Score"   },
  ];

  const timeDistribution = [
    { label: "Practice",  hours: 18.4, color: "#F4B400" },
    { label: "Video",     hours: 12.2, color: "#D4A000" },
    { label: "Projects",  hours: 9.1,  color: "#A87D00" },
    { label: "Community", hours: 9.5,  color: "#E5E7EB" },
  ];
  const totalHours = timeDistribution.reduce((acc, d) => acc + d.hours, 0);

  const insights = [
    { icon: "✅", bg: "bg-green-50 border-green-100", title: "Excellent consistency",    body: "Student logs in daily and maintains a 28-day streak. LHI is 97% — top 5% of all students."                          },
    { icon: "💪", bg: "bg-amber-50 border-amber-100", title: "Strong React performance", body: "Averaging 88% on React quizzes. Project scores consistently above 88%. Frontend skill at 80%."                       },
    { icon: "⚠️", bg: "bg-red-50 border-red-100",    title: "Weakness: JS Algorithms",  body: "Latest JS Algorithms quiz scored 55%. Recommend focused practice on problem-solving and data structures."            },
    { icon: "🎯", bg: "bg-blue-50 border-blue-100",  title: "Recommended next course",  body: "Advanced JavaScript Patterns — available in catalog. Estimated completion: 3 weeks at current pace."                 },
  ];

  return (
    <div className="flex flex-col gap-8 pb-16">

      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <div className="rounded-2xl overflow-hidden bg-white border border-gray-100">

        {/* Banner */}
        {/* <div className="relative h-48 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div
              className="w-38 h-48"
              style={{
                clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
                background: "white",
              }}
            />
          </div> */}
          <button
            onClick={onBack}
            className="absolute top-5 left-6 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition backdrop-blur-sm"
          >
            <ChevronLeft size={15} /> Back
          </button>
          {/* <button className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition">
            <Camera size={15} />
          </button> */}
        {/* </div> */}

        {/* Info */}
        <div className="px-8 pb-6">
          <div className="flex items-end justify-between pt-8 mb-5">
<div className="h-28 w-28 overflow-hidden rounded-full border border-neutral-200">
    <img
        src={student.avatar}
        alt={student.name}
        className="h-full w-full object-cover object-top"
    />
</div>
            <button
              className="mb-1 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: A }}
            >
              <Pencil size={14} /> Edit Profile
            </button>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-sm text-gray-500">{s.promotion}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="text-xs font-semibold px-3 py-0.5 rounded-full text-white" style={{ background: A }}>
              Studying
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1.5">
            <Clock size={12} />
            <span>Last login: {s.last_active}</span>
          </div>
        </div>

        {/* Quick stats bar */}
        <div className="border-t border-gray-100 grid grid-cols-4 divide-x divide-gray-100">
          {[
            { icon: <Trophy size={20} />,       label: "Global Rank",  value: s.global_rank ?? "—" },
            { icon: <Code2 size={20} />,         label: "Coding Hours", value: s.coding_hours },
            { icon: <MessageCircle size={20} />, label: "Level",        value: String(s.level) },
            { icon: <Briefcase size={20} />,     label: "Projects",     value: String(s.projects) },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 px-6 py-5">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: A }}>
                <span className="text-white">{icon}</span>
              </div>
              <div>
                <p className="text-xl font-bold leading-none" style={{ color: value === "—" || value === "0" ? "#D1D5DB" : A }}>
                  {value}
                </p>
                <p className="text-xs text-gray-500 mt-1">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          2. MINI STATS BAR
      ══════════════════════════════════════ */}
      <Card className="overflow-hidden">
        <div className="grid grid-cols-9 divide-x divide-gray-100">
          {[
            { icon: <Star size={14} />,     label: "XP",         value: s.xp },
            { icon: <Trophy size={14} />,   label: "Level",      value: `Lv ${s.level}` },
            { icon: <Flame size={14} />,    label: "Streak",     value: `${s.streak}d` },
            { icon: <Clock size={14} />,    label: "Study Time", value: s.study_time },
            { icon: <BookOpen size={14} />, label: "Lessons",    value: s.lessons },
            { icon: <Target size={14} />,   label: "Exercises",  value: s.exercises },
            { icon: <Brain size={14} />,    label: "Quizzes",    value: s.quizzes },
            { icon: <Layers size={14} />,   label: "Projects",   value: s.projects },
            { icon: <Award size={14} />,    label: "Badges",     value: s.badges },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex flex-col items-center justify-center py-4 gap-1">
              <span style={{ color: A }}>{icon}</span>
              <p className="font-bold text-sm leading-none">{value}</p>
              <p className="text-[10px] text-gray-400 leading-none">{label}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* ══════════════════════════════════════
          3. COACH ACTIONS
      ══════════════════════════════════════ */}
      {/* <Card className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap size={14} style={{ color: A }} />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Coach Actions</span>
          </div>
          <div className="flex items-center gap-2">
            {[
              { icon: <Plus size={13} />,          label: "Add XP",    primary: true  },
              { icon: <Minus size={13} />,         label: "Remove XP", primary: false },
              { icon: <BookMarked size={13} />,    label: "Recommend", primary: false },
              { icon: <MessageSquare size={13} />, label: "Message",   primary: false },
            ].map(({ icon, label, primary }) => (
              <button
                key={label}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                  primary ? "text-white" : "border border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
                style={primary ? { background: A } : {}}
              >
                {icon} {label}
              </button>
            ))}
            <button className="border border-gray-200 rounded-xl p-2 hover:bg-gray-50 transition">
              <Mail size={14} className="text-gray-600" />
            </button>
          </div>
        </div>
      </Card> */}

      {/* ══════════════════════════════════════
          4. LEARNING HEALTH
      ══════════════════════════════════════ */}
      <Section title="Learning Health">
        <div className="grid grid-cols-4 gap-4">
          {[
            { title: "Learning Health Index", value: `${s.lhi}%`,         sub: "Quiz scores, streaks & attendance combined.", red: false },
            { title: "Consistency Score",     value: `${s.consistency}%`, sub: "Daily, weekly & monthly activity frequency.", red: false },
            { title: "Engagement Score",      value: `${s.engagement}%`,  sub: "Videos, exercises & quizzes frequency.",      red: false },
            { title: "Dropout Risk",          value: `${s.dropout_risk}%`,sub: null, red: true },
          ].map(({ title, value, sub, red }) => (
            <Card key={title} className={`p-5 ${red ? "!bg-red-50 !border-red-100" : ""}`}>
              <p className={`text-[10px] font-bold uppercase tracking-widest ${red ? "text-red-400" : "text-gray-400"}`}>
                {title}
              </p>
              <p className={`text-4xl font-bold mt-2 ${red ? "text-red-500" : "text-gray-900"}`}>
                {value}
              </p>
              {sub ? (
                <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">{sub}</p>
              ) : (
                <span className="flex items-center gap-1 text-green-600 text-[11px] font-medium mt-2">
                  <CheckCircle2 size={12} /> Healthy progression speeds
                </span>
              )}
            </Card>
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════════════
          5. LEARNING JOURNEY
      ══════════════════════════════════════ */}
      {/* <Section title="Learning Journey">
        <div className="grid grid-cols-5 gap-4">
          {roadmap.map(({ name, pct }) => (
            <Card key={name} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-gray-700 leading-tight">{name}</p>
                <span
                  className="text-[11px] font-bold ml-2 shrink-0"
                  style={{ color: pct === 100 ? "#16A34A" : pct === 0 ? "#9CA3AF" : AD }}
                >
                  {pct}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background: pct === 100 ? "#16A34A" : pct === 0 ? "#E5E7EB" : A,
                  }}
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-2">
                {pct === 100 ? "✅ Completed" : pct === 0 ? "🔒 Not started" : "🔄 In progress"}
              </p>
            </Card>
          ))}
        </div>
      </Section> */}

      {/* ══════════════════════════════════════
          6. CODING TIME
      ══════════════════════════════════════ */}
      <Section title="Coding Time">
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Today",        value: s.coding_today },
            { label: "This Week",    value: s.coding_week  },
            { label: "This Month",   value: s.coding_month },
            { label: "Total Coding", value: s.coding_total },
          ].map(({ label, value }) => (
            <Card key={label} className="p-5">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">{label}</p>
              <p className="text-3xl font-bold mt-2" style={{ color: AD }}>{value}</p>
            </Card>
          ))}
        </div>

        <Card className="p-5">
          <p className="text-xs font-semibold text-gray-700 mb-3">Time Distribution</p>
          <div className="flex rounded-full overflow-hidden h-3 mb-4">
            {timeDistribution.map((d) => (
              <div
                key={d.label}
                style={{ width: `${((d.hours / totalHours) * 100).toFixed(1)}%`, background: d.color }}
              />
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {timeDistribution.map((d) => (
              <div key={d.label} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: d.color }} />
                <div>
                  <p className="text-[10px] text-gray-400">{d.label}</p>
                  <p className="text-sm font-semibold text-gray-800">{d.hours}h</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Section>

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
                      color:      score >= 90 ? "#15803D" : score >= 75 ? "#A16207" : "#B91C1C",
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
                {quizzes.map(({ name, score, date, passed }) => (
                  <tr key={name}>
                    <td className="py-2.5 text-gray-700 font-medium">{name}</td>
                    <td
                      className="py-2.5 text-center font-bold"
                      style={{ color: score >= 80 ? "#15803D" : "#B91C1C" }}
                    >
                      {score}%
                    </td>
                    <td className="py-2.5 text-center text-gray-400">{date}</td>
                    <td className="py-2.5 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          passed ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
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
                {exercises.map(({ name, result, date }) => (
                  <tr key={name}>
                    <td className="py-2.5 text-gray-700 font-medium">{name}</td>
                    <td className="py-2.5 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          result === "Completed" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
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

      {/* ══════════════════════════════════════
          9. COACH INSIGHTS
      ══════════════════════════════════════ */}
      <Section title="Coach Insights">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 flex flex-col gap-3">
            {insights.map(({ icon, bg, title, body }) => (
              <div key={title} className={`flex gap-3 p-4 rounded-2xl border ${bg}`}>
                <span className="text-xl shrink-0 mt-0.5">{icon}</span>
                <div>
                  <p className="text-xs font-bold text-gray-800">{title}</p>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <Card className="p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
                Risk Assessment
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Dropout Risk", value: "Very Low",  color: "#15803D", pct: s.dropout_risk },
                  { label: "Engagement",   value: "Excellent", color: "#15803D", pct: s.engagement   },
                  { label: "Consistency",  value: "High",      color: A,         pct: s.consistency  },
                ].map(({ label, value, color, pct }) => (
                  <div key={label}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-gray-500">{label}</span>
                      <span className="font-semibold" style={{ color }}>{value}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="bg-gray-900 rounded-2xl p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">
                Quick Actions
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { icon: <Gift size={13} />,          label: "Grant Bonus XP"  },
                  { icon: <BookMarked size={13} />,    label: "Recommend Course" },
                  { icon: <MessageSquare size={13} />, label: "Send Message"    },
                ].map(({ icon, label }) => (
                  <button
                    key={label}
                    className="w-full text-left text-xs py-2.5 px-3 bg-white/10 hover:bg-white/20 rounded-xl transition flex items-center gap-2 text-white"
                  >
                    <span style={{ color: A }}>{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

    </div>
                

  );


}