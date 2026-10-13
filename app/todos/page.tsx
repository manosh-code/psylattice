import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function TodosPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: todos } = await supabase.from("todos").select();

  return (
    <main className="mx-auto max-w-xl p-8 font-sans">
      <h1 className="mb-4 text-2xl font-bold text-slate-900">Supabase Todos Test</h1>
      <ul className="space-y-2">
        {todos?.map((todo: { id: string | number; name: string }) => (
          <li
            key={todo.id}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-800 shadow-sm"
          >
            {todo.name}
          </li>
        ))}
      </ul>
      {(!todos || todos.length === 0) && (
        <p className="mt-4 text-sm text-slate-500">
          No records found in the <code className="rounded bg-slate-100 px-1 py-0.5">todos</code> table yet.
        </p>
      )}
    </main>
  );
}
