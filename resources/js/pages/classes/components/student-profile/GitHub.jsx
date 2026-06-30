import {
    Github,
    GitBranch,
    Star,
    Code2,
    ExternalLink,
} from "lucide-react";

export default function GitHub({ repos = [] }) {
    return (
        <div className="mt-8">

            {/* Header */}

            <div className="flex items-center justify-between mb-6">

                <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-neutral-400 font-semibold">
                        GitHub
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-neutral-900">
                        Repository Activity
                    </h2>
                </div>

                <div className="px-4 py-2 rounded-xl bg-[#FFF8E5] border border-[#F4E2A0] text-sm font-semibold text-[#A97A00]">
                    {repos.length} Repositories
                </div>

            </div>

            <div className="grid grid-cols-2 gap-5">

                {repos.map((repo) => (

                    <a
                        key={repo.id}
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="
                            rounded-3xl
                            border
                            border-neutral-200
                            bg-white
                            p-6
                            transition-all
                            hover:-translate-y-1
                            hover:shadow-lg
                        "
                    >

                        <div className="flex justify-between items-start">

                            <div>

                                <h3 className="font-semibold text-lg text-neutral-900">
                                    {repo.name}
                                </h3>

                                <p className="text-sm text-neutral-500 mt-2 line-clamp-2">
                                    {repo.description || "No description"}
                                </p>

                            </div>

                            <ExternalLink
                                size={18}
                                className="text-neutral-400"
                            />

                        </div>

                        <div className="mt-6 flex items-center gap-5 text-sm text-neutral-600">

                            <div className="flex items-center gap-2">
                                <Code2 size={16} />
                                {repo.language || "-"}
                            </div>

                            <div className="flex items-center gap-2">
                                <Star size={16} />
                                {repo.stars}
                            </div>

                            <div className="flex items-center gap-2">
                                <GitBranch size={16} />
                                {repo.forks}
                            </div>

                        </div>

                    </a>

                ))}

            </div>

        </div>
    );
}