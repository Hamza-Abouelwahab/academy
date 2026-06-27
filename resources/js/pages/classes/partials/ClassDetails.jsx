// export default function ClassDetails({ students = [] }) {
//     return (
//         <div className="mt-6 rounded-xl bg-white p-6 shadow">
//             <h2 className="mb-4 text-xl font-semibold">
//                 Students
//             </h2>

//             <div className="space-y-3">
//                 {students.map((student) => (
//                     <div
//                         key={student.id}
//                         className="flex items-center justify-between rounded-lg border p-4"
//                     >
//                         <div>
//                             <h3>{student.name}</h3>
//                             <p className="text-sm text-gray-500">
//                                 {student.email}
//                             </p>
//                         </div>

//                         <span>
//                             Level {student.level}
//                         </span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }









// import { useState } from "react";
// import { MoreVertical, Plus, X } from "lucide-react";

// const TABS = [
//   { id: "students", label: "Students" },
//   { id: "streams", label: "Recorded streams" },
//   { id: "assignments", label: "Programme weekly" },
//   { id: "resources", label: "Resources" },
// ];

// export default function ClassDetails({ students = [] }) {
//   const [activeTab, setActiveTab] = useState("students");
//   const [selectedStudent, setSelectedStudent] = useState(null);

//   return (
//     <div className="flex gap-4">
//       {/* LEFT PANEL */}
//       <div className="flex-1 bg-white rounded-2xl border border-neutral-200 min-w-0">
//         {/* Tabs */}
//         <div className="flex gap-7 px-6 border-b border-neutral-200">
//           {TABS.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`py-4 text-sm border-b-2 transition-colors ${
//                 activeTab === tab.id
//                   ? "border-[#F4B400] font-medium text-black"
//                   : "border-transparent text-neutral-500"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Students Tab */}
//         {activeTab === "students" && (
//           <>
//             <div className="flex items-center justify-between px-6 py-5">
//               <span className="text-base font-medium text-black">
//                 Active roster{" "}
//                 <span className="font-normal text-neutral-400">
//                   {students.length} students
//                 </span>
//               </span>
//               <button className="flex items-center gap-1.5 text-[#F4B400] text-sm font-medium">
//                 <Plus size={15} />
//                 Add student
//               </button>
//             </div>

//             <div className="px-6 pb-6 overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-neutral-100">
//                     <th className="text-left py-3 text-xs font-medium text-neutral-400 uppercase tracking-wide">
//                       Student
//                     </th>
//                     <th className="text-left py-3 text-xs font-medium text-neutral-400 uppercase tracking-wide">
//                       Email
//                     </th>
//                     <th className="text-left py-3 text-xs font-medium text-neutral-400 uppercase tracking-wide">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map((student) => (
//                     <tr
//                       key={student.id}
//                       onDoubleClick={() => setSelectedStudent(student)}
//                       className="border-b border-neutral-100 hover:bg-neutral-50 cursor-pointer transition-colors"
//                     >
//                       <td className="py-4">
//                         <div className="flex items-center gap-3">
//                           <div className="w-9 h-9 rounded-full bg-[#F4B400] text-white flex items-center justify-center font-medium text-sm flex-shrink-0">
//                             {student.name?.charAt(0)}
//                           </div>
//                           <span className="text-sm font-medium text-black">
//                             {student.name}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="text-sm text-neutral-500">
//                         {student.email}
//                       </td>
//                       <td>
//                         <button className="text-neutral-400 hover:text-black transition-colors">
//                           <MoreVertical size={16} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                   {students.length === 0 && (
//                     <tr>
//                       <td
//                         colSpan={3}
//                         className="text-center py-12 text-sm text-neutral-400"
//                       >
//                         No students yet
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}

//         {activeTab !== "students" && (
//           <div className="p-6 text-sm text-neutral-400">Coming soon</div>
//         )}
//       </div>

//       {/* RIGHT SIDEBAR */}
//       {selectedStudent && (
//         <div className="w-[340px] bg-white rounded-2xl border border-neutral-200 p-5 h-fit sticky top-4 flex-shrink-0">
//           <div className="flex justify-end mb-3">
//             <button
//               onClick={() => setSelectedStudent(null)}
//               className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 transition-colors"
//             >
//               <X size={16} />
//             </button>
//           </div>

//           {/* Header */}
//           <div className="flex flex-col items-center gap-2">
//             <div className="w-20 h-20 rounded-full bg-[#F4B400] text-white flex items-center justify-center text-2xl font-medium">
//               {selectedStudent.name?.charAt(0)}
//             </div>
//             <p className="text-base font-medium text-black">
//               {selectedStudent.name}
//             </p>
//             <p className="text-sm text-neutral-500">{selectedStudent.email}</p>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-2 gap-2.5 mt-5">
//             {[
//               { label: "XP", value: "8,450" },
//               { label: "Level", value: "12" },
//               { label: "Streak", value: "24 days" },
//               { label: "Badges", value: "15" },
//             ].map(({ label, value }) => (
//               <div key={label} className="bg-neutral-50 rounded-xl p-3">
//                 <p className="text-xs text-neutral-400">{label}</p>
//                 <p className="text-lg font-medium text-black">{value}</p>
//               </div>
//             ))}
//           </div>

//           {/* Progress */}
//           <div className="mt-5">
//             <div className="flex justify-between mb-2">
//               <span className="text-sm text-black">Learning progress</span>
//               <span className="text-sm font-medium text-black">75%</span>
//             </div>
//             <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
//               <div className="h-full w-[75%] bg-[#F4B400] rounded-full" />
//             </div>
//           </div>

//           {/* Activity */}
//           <div className="mt-5">
//             <p className="text-sm font-medium text-black mb-3">
//               Recent activity
//             </p>
//             <div className="space-y-2">
//               {[
//                 { title: "Completed React module", time: "2 hours ago" },
//                 { title: "Earned 150 XP", time: "Yesterday" },
//                 { title: "Submitted assignment", time: "3 days ago" },
//               ].map(({ title, time }) => (
//                 <div key={title} className="bg-neutral-50 rounded-xl p-3">
//                   <p className="text-sm font-medium text-black">{title}</p>
//                   <p className="text-xs text-neutral-400">{time}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="mt-5 flex flex-col gap-2">
//             <button className="bg-[#F4B400] text-white py-2.5 rounded-xl text-sm font-medium">
//               View full profile
//             </button>
//             <button className="border border-neutral-200 py-2.5 rounded-xl text-sm font-medium text-black">
//               Send message
//             </button>
//             <button className="border border-neutral-200 py-2.5 rounded-xl text-sm font-medium text-black">
//               Add XP
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


















import { useState } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import { router } from "@inertiajs/react";
import StudentProfile from "./StudentProfile";

const TABS = [
  { id: "students", label: "Students" },
  { id: "streams", label: "Recorded Streams" },
  { id: "Programme", label: "Programme" },
  { id: "resources", label: "Resources" },
];

function getInitials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function Avatar({ src, name }) {
  const [error, setError] = useState(false);

  if (src && !error) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setError(true)}
        className="w-9 h-9 rounded-full object-cover flex-shrink-0"
      />
    );
  }

  return (
    <div className="w-9 h-9 rounded-full bg-[#d0c4a8] text-[#7a6a4a] flex items-center justify-center font-bold text-sm flex-shrink-0">
      {getInitials(name)}
    </div>
  );
}

export default function ClassDetails({ students = [] }) {
  const [activeTab, setActiveTab] = useState("students");
const [selectedStudent, setSelectedStudent] = useState(null);





if (selectedStudent) {
    return (
        <StudentProfile
            student={selectedStudent}
            onBack={() => setSelectedStudent(null)}
        />
    );
}
  return (
<div className="bg-[#ffffff] rounded-2xl p-8 min-h-[400px]">
        {/* Tabs */}
      <div className="flex gap-8 border-b border-[#e8e0d0] mb-7">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm border-b-2 transition-all -mb-px ${
              activeTab === tab.id
                ? "font-semibold text-black border-[#C9A84C]"
                : "text-[#aaa] border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "students" && (
        <>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-baseline gap-3">
              <h2 className="text-lg font-bold text-black">Active Roster</h2>
              <span className="text-sm text-[#aaa]">{students.length} Students</span>
            </div>
            <button className="flex items-center gap-1.5 text-[#C9A84C] text-sm font-semibold">
              <Plus size={15} /> Add Student
            </button>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#e8e0d0]">
                {["Student", "Status", "Current Module", "Progress", "Actions"].map((h, i) => (
                  <th
                    key={h}
                    className={`pb-3 text-[11px] font-semibold tracking-widest text-[#aaa] uppercase ${
                      i === 4 ? "text-right" : "text-left"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((s) => {
                const online = s.status === "Online";
                return (
<tr
    key={s.id}
    onDoubleClick={() => setSelectedStudent(s)}
    className="border-b border-[#f0ebe0] last:border-0 cursor-pointer hover:bg-neutral-50"
>
  {/* Student */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar src={s.avatar} name={s.name} />
                        <div>
                          <p className="text-sm font-bold text-black">{s.name}</p>
                          <p className="text-xs text-[#aaa]">{s.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          online
                            ? "bg-green-100 text-green-700"
                            : "bg-neutral-100 text-neutral-500"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>

                    {/* Module */}
                    <td className="text-sm text-[#3a3a3a]">{s.module}</td>

                    {/* Progress */}
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="flex-1 h-1.5 bg-[#e8e0d0] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${s.progress}%`,
                              background: online ? "#C9A84C" : "#aaa",
                            }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-black w-9">
                          {s.progress}%
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="text-right">
                      <button className="text-[#aaa] hover:text-black transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {students.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-sm text-[#aaa]">
                    No students yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}

      {activeTab !== "students" && (
        <p className="text-sm text-[#aaa] py-8">Coming soon</p>
      )}
    </div>
  );
}