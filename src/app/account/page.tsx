import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui";
import { AccountView } from "./AccountView";

export const metadata: Metadata = { title: "החשבון שלי" };

export default function AccountPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "החשבון שלי" }]} />
      <header className="page-head"><h1 className="page-title">החשבון שלי</h1></header>
      <AccountView />
    </div>
  );
}
