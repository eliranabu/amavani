import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <div className="empty-state">
        <h1 className="page-title">העמוד לא נמצא</h1>
        <p>ייתכן שהקישור השתנה או שהמוצר כבר לא זמין.</p>
        <Link href="/products" className="btn">לכל המוצרים</Link>
      </div>
    </div>
  );
}
