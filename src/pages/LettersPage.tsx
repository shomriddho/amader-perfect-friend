import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Mail, Calendar, User, ArrowLeft, Loader2 } from "lucide-react";

interface Letter {
  id: string;
  sender_name: string;
  content_html: string;
  created_at: string;
}

async function fetchLetters(): Promise<Letter[]> {
  const { data, error } = await supabase
    .from("letters")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

export default function LettersPage() {
  const {
    data: letters,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["letters"],
    queryFn: fetchLetters,
  });

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sky-100 pb-5">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
              <Mail className="w-8 h-8 text-sky-600" />
              <span>All Chithis</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Browse letters sent by friends and readers.
            </p>
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-medium shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Write New</span>
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
            <p className="text-sm font-medium">Loading chithis...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm text-center">
            Failed to load letters:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && letters?.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-sky-100 p-8 shadow-sm">
            <Mail className="w-12 h-12 text-sky-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-700">
              No Chithis Found
            </h3>
            <p className="text-slate-500 text-sm mt-1 mb-4">
              Be the first one to write a letter!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white rounded-xl text-sm font-medium hover:bg-sky-700 transition-colors"
            >
              Write a Chithi
            </Link>
          </div>
        )}

        {/* Letters List Grid */}
        <div className="grid gap-6">
          {letters?.map((letter) => (
            <article
              key={letter.id}
              className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow text-left"
            >
              {/* Meta information bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-sky-700 font-semibold text-sm">
                  <User className="w-4 h-4 text-sky-500" />
                  <span>{letter.sender_name}</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={letter.created_at}>
                    {new Date(letter.created_at).toLocaleDateString(undefined, {
                      dateStyle: "medium",
                    })}
                  </time>
                </div>
              </div>

              {/* HTML Content Rendered with Tiptap styling rules */}
              <div
                className="text-slate-700 font-sans leading-relaxed space-y-2
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2
                  [&_li]:mb-1
                  [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-slate-800 [&_h1]:my-2
                  [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-slate-800 [&_h2]:my-2
                  [&_blockquote]:border-l-4 [&_blockquote]:border-sky-400 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-2 [&_blockquote]:text-slate-500"
                dangerouslySetInnerHTML={{ __html: letter.content_html }}
              />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
