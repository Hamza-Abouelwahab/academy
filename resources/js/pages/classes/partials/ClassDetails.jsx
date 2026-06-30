import { useState } from "react";
import { router } from "@inertiajs/react";
import StudentProfile from "./StudentProfile";
import { Plus, MoreHorizontal, Search } from "lucide-react";

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
    <div className="w-9 h-9 rounded-full bg-[#f0bd05e1] text-[#000000] flex items-center justify-center font-bold text-sm flex-shrink-0">
      {getInitials(name)}
    </div>
  );
}

export default function ClassDetails({ students = [], coach }) {
  const [activeTab, setActiveTab] = useState("students");
const [selectedStudent, setSelectedStudent] = useState(null);


const [search, setSearch] = useState("");
const filteredStudents = students.filter((student) =>
  student.name.toLowerCase().includes(search.toLowerCase()) ||
  student.email.toLowerCase().includes(search.toLowerCase())
);


if (selectedStudent) {
    return (
        <StudentProfile
            student={selectedStudent}
            onBack={() => setSelectedStudent(null)}
        />
    );
}
console.log(coach);
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
         <div className="flex items-center justify-between mb-6 ">

<div className="mb-2 flex justify-center">

    <div className="h-[80px] w-[1150px] rounded-3xl  border-[#ECE6D8] bg-gradient-to-r from-[#FFF8E5] via-[#FAF8F3] to-[#F4F4F2] px-6 py-4 shadow-[0_15px_45px_rgba(0,0,0,.05)]">

      <div className="flex items-center justify-between h-full">

    {/* LEFT */}
    <div className="flex items-center gap-6">

        {/* Active Roster */}
        <div>
            <p className="mt-1 text-xl font-bold tracking-tight text-neutral-900">
                Classroom
            </p>

           

            <p className="mt-1 text-xs text-neutral-500">
                {filteredStudents.length} Students 
            </p>
        </div>

        <div className="h-10 w-px bg-neutral-200" />

        {/* Coach */}
        <div>
            <p className="text-[9px] uppercase tracking-[0.22em] text-neutral-400 font-semibold">
                Coach
            </p>

            <p className="mt-1 text-base font-semibold text-neutral-900">
                {coach}
            </p>
        </div>

    </div>

    {/* RIGHT */}
    <div className="relative w-[700px]">

        <Search
            size={15}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
        />

        <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students..."
            className="
                h-10
                w-full
                rounded-xl
                border
                border-[#E8E1D1]
                bg-white
                pl-10
                pr-4
                text-xs
                placeholder:text-neutral-400
                outline-none
                transition
                focus:border-[#F4B400]
                focus:ring-2
                focus:ring-[#F4B400]/15
            "
        />

    </div>

</div>

    </div>

</div>

    {/* <button className="flex items-center gap-1.5 text-[#C9A84C] text-sm font-semibold">
        <Plus size={15} />
        Add Student
    </button> */}

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
{filteredStudents.map((s) => {
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
                            : "bg-gradient-to-r from-[#FFF8E5] via-[#FAF8F3] to-[#F4F4F2]"
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

{filteredStudents.length === 0 && (
  <tr>
    <td colSpan={5} className="text-center py-12 text-sm text-[#aaa]">
      No students found
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