import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Send,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface LetterEditorProps {
  value?: string;
  onChange: (html: string) => void;
}

export default function LetterEditor({ onChange }: LetterEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2], // Only H1 and H2
        },
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-[260px] p-5 text-slate-700 font-sans text-left max-w-none space-y-2 " +
          "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2 " +
          "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2 " +
          "[&_li]:mb-1 " +
          "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-slate-800 [&_h1]:my-3 " +
          "[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-slate-800 [&_h2]:my-2 " +
          "[&_blockquote]:border-l-4 [&_blockquote]:border-sky-400 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-3 [&_blockquote]:text-slate-500",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      if (errorMsg) setErrorMsg("");
    },
  });

  // React Query Mutation to handle letter submission
  const submitLetterMutation = useMutation({
    mutationFn: async (payload: { senderName: string; letterHtml: string }) => {
      console.log("📨 --- Chithi Submitted --- 📨");
      console.log("Sender Name:", payload.senderName);
      console.log("Letter HTML Content:", payload.letterHtml);
      console.log("----------------------------");

      return { success: true };
    },
    onSuccess: () => {
      setIsOpen(false);
      alert("Chithi Successfully Sent!");
    },
  });

  // TanStack Form setup for Modal Form
  const form = useForm({
    defaultValues: {
      senderName: "",
    },
    onSubmit: async ({ value }) => {
      const letterHtml = editor?.getHTML() || "";
      await submitLetterMutation.mutateAsync({
        senderName: value.senderName,
        letterHtml,
      });
    },
  });

  if (!editor) return null;

  const handleOpenModal = () => {
    const textContent = editor.getText().trim();
    if (!textContent) {
      setErrorMsg(
        "Chithi te kichu likhun shob-shudhu faka chithi pathano jabe na!",
      );
      return;
    }
    setErrorMsg("");
    setIsOpen(true);
  };

  return (
    <div className="w-full max-w-3xl bg-white/90 backdrop-blur rounded-2xl border border-sky-100 shadow-md shadow-sky-100/50 overflow-hidden flex flex-col gap-2">
      {/* Mobile Toolbar */}
      <div className="flex items-center gap-1 p-2.5 bg-sky-50/60 border-b border-sky-100 flex-wrap select-none">
        {/* Headings (H1 & H2 only) */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive("heading", { level: 1 })
              ? "bg-sky-500 text-white"
              : "text-slate-600 hover:bg-sky-100"
          }`}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive("heading", { level: 2 })
              ? "bg-sky-500 text-white"
              : "text-slate-600 hover:bg-sky-100"
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-sky-200 mx-1" />

        {/* Text Styling */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive("bold")
              ? "bg-sky-500 text-white"
              : "text-slate-600 hover:bg-sky-100"
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive("italic")
              ? "bg-sky-500 text-white"
              : "text-slate-600 hover:bg-sky-100"
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive("strike")
              ? "bg-sky-500 text-white"
              : "text-slate-600 hover:bg-sky-100"
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-sky-200 mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive("bulletList")
              ? "bg-sky-500 text-white"
              : "text-slate-600 hover:bg-sky-100"
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive("orderedList")
              ? "bg-sky-500 text-white"
              : "text-slate-600 hover:bg-sky-100"
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive("blockquote")
              ? "bg-sky-500 text-white"
              : "text-slate-600 hover:bg-sky-100"
          }`}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} />

      {/* Validation Error Notice */}
      {errorMsg && (
        <p className="text-red-500 text-sm font-sans px-5 pt-1 text-left">
          {errorMsg}
        </p>
      )}

      {/* Submit Trigger Button */}
      <div className="p-3 bg-sky-50/40 border-t border-sky-100 flex justify-end">
        <button
          type="button"
          onClick={handleOpenModal}
          className="flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Send Chithi</span>
        </button>
      </div>

      {/* Shadcn Modal Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-2 text-left">
            <h3 className="text-xl font-semibold text-slate-800">
              Apnar Naam Din
            </h3>
            <p className="text-sm text-slate-500">
              Chithi-ti pathanor age apnar naam ba porichoy likhun.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4 pt-2 text-left"
          >
            {/* TanStack Form Field */}
            <form.Field
              name="senderName"
              validators={{
                onChange: ({ value }) =>
                  !value.trim() ? "Apnar naam dewa aboshshok" : undefined,
              }}
              children={(field) => (
                <div className="space-y-1">
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-slate-700"
                  >
                    Your Name / Name
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="E.g. Rahat / Anonymous Friend"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                  {field.state.meta.errors ? (
                    <p className="text-xs text-red-500 font-sans">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  ) : null}
                </div>
              )}
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit]) => (
                  <button
                    type="submit"
                    disabled={!canSubmit || submitLetterMutation.isPending}
                    className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {submitLetterMutation.isPending
                      ? "Sending..."
                      : "Submit Chithi"}
                  </button>
                )}
              />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
