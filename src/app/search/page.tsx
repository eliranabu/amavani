import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResults } from "./SearchResults";

export const metadata: Metadata = { title: "תוצאות חיפוש", robots: { index: false } };

export default function SearchPage() {
  return (
    <div className="container">
      <Suspense fallback={<p className="page-head muted">טוען תוצאות…</p>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
