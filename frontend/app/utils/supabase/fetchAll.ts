import { SupabaseClient } from "@supabase/supabase-js";

// Supabase restituisce al massimo 1000 righe per richiesta
const PAGE_SIZE = 1000;

export const fetchAll = async (
  supabase: SupabaseClient,
  table: string,
  columns: string,
  orderBy = "id",
  filter: (query: any) => any = (query) => query
) => {
  let rows: any[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await filter(supabase.from(table).select(columns))
      .order(orderBy)
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw new Error(`Errore lettura ${table}: ${error.message}`);
    rows = rows.concat(data);
    if (data.length < PAGE_SIZE) return rows;
  }
};
