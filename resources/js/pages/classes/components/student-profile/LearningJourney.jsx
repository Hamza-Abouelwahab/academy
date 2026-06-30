

import { useState } from "react";

import { CheckCircle2, PlayCircle, Lock, ChevronRight } from "lucide-react";








const A = "#F4B400";
const AD = "#c49000";



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






export default function LearningJourney({ }) {
    
        const roadmapData = [
            {
                id: 1,
                title: "HTML City",
                progress: 100,
                status: "completed",
                currentLesson: "Completed",
                lessons: "18 / 18",
                exercises: "12 / 12",
                quizzes: "4 / 4",
            },
            {
                id: 2,
                title: "CSS Island",
                progress: 100,
                status: "completed",
                currentLesson: "Completed",
                lessons: "24 / 24",
                exercises: "16 / 16",
                quizzes: "5 / 5",
            },
            {
                id: 3,
                title: "JavaScript Kingdom",
                progress: 85,
                status: "current",
                chapter: "DOM Manipulation",
                currentLesson: "DOM Events",
                lessons: "35 / 42",
                exercises: "18 / 22",
                quizzes: "6 / 8",
                eta: "6 days",
                activity: "2 hours ago",
            },
            {
                id: 4,
                title: "React Galaxy",
                progress: 20,
                status: "available",
            },
            {
                id: 5,
                title: "Backend Empire",
                progress: 0,
                status: "locked",
            },
        ];
    
        const [selectedRoadmap, setSelectedRoadmap] = useState(null);
        return (
            <div>
            
                        <Section title="Learning Journey">
            
                            <Card className="overflow-hidden rounded-3xl border border-[#EFE7C7]">
            
                                <div className="bg-gradient-to-r from-[#FFF9E8] via-white to-[#FAFAF9] p-7">
            
                                    <div className="flex items-center justify-between">
            
                                        <div>
                                            <h3 className="text-lg font-semibold text-neutral-900">
                                                Learning Journey
                                            </h3>
            
                                            <p className="text-xs text-neutral-500 mt-1">
                                                Student progression across learning roadmaps
                                            </p>
                                        </div>
            
                                        <div className="rounded-full border bg-white px-4 py-2 text-xs font-medium text-neutral-500">
                                            {roadmapData.length} Modules
                                        </div>
            
                                    </div>
            
                                    <div className="mt-8 flex items-center gap-4 overflow-x-auto pb-2">
            
                                        {roadmapData.map((roadmap, index) => {
            
                                            const completed = roadmap.status === "completed";
                                            const current = roadmap.status === "current";
                                            const locked = roadmap.status === "locked";
            
                                            return (
            
                                                <>
            
                                                    <button
                                                        key={roadmap.id}
                                                        disabled={locked}
                                                        onClick={() => setSelectedRoadmap(roadmap)}
                                                        className={`
            w-[210px]
            shrink-0
            rounded-2xl
            border
            bg-white
            p-5
            text-left
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
            ${current ? "border-[#F4B400] shadow-lg" : "border-neutral-200"}
            ${locked ? "opacity-50" : ""}
            `}
                                                    >
            
                                                        <div className="flex justify-between items-center">
            
                                                            <div>
            
                                                                <p className="text-sm font-semibold text-neutral-900">
                                                                    {roadmap.title}
                                                                </p>
            
                                                                <p className="text-[11px] text-neutral-400 mt-1">
            
                                                                    {completed && "Completed"}
            
                                                                    {current && "In Progress"}
            
                                                                    {locked && "Locked"}
            
                                                                </p>
            
                                                            </div>
            
                                                            <div>
            
                                                                {completed && (
                                                                    <CheckCircle2
                                                                        size={18}
                                                                        className="text-green-600"
                                                                    />
                                                                )}
            
                                                                {current && (
                                                                    <PlayCircle
                                                                        size={18}
                                                                        className="text-[#F4B400]"
                                                                    />
                                                                )}
            
                                                                {locked && (
                                                                    <Lock
                                                                        size={17}
                                                                        className="text-neutral-400"
                                                                    />
                                                                )}
            
                                                            </div>
            
                                                        </div>
            
                                                        <div className="mt-5 h-[5px] rounded-full bg-neutral-100 overflow-hidden">
            
                                                            <div
                                                                className="h-full rounded-full bg-[#F4B400]"
                                                                style={{
                                                                    width: `${roadmap.progress}%`
                                                                }}
                                                            />
            
                                                        </div>
            
                                                        <div className="flex justify-between mt-3">
            
                                                            <p className="text-xs font-medium text-neutral-500">
                                                                {roadmap.progress}% Complete
                                                            </p>
            
                                                           
            
                                                        </div>
            
                                                    </button>

            
                                                </>
            
                                            );
            
                                        })}
            
                                    </div>
            
                                </div>
            
                            </Card>
            
                        </Section>




            {
                selectedRoadmap && (

                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm"  onClick={() => setSelectedRoadmap(null)}>

                        <div className="w-[420px] rounded-3xl bg-white shadow-2xl border border-neutral-200 overflow-hidden" onClick={(e) => e.stopPropagation()}>

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
            }
</div>

        )
    }
