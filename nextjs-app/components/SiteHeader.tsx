import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header>
      <div className="site-header">
        <div>
          <div className="site-title">
            <Link href="/">HIGH SCHOOL WINS</Link>
          </div>
          <div className="site-subtitle">Sports Archive Collection</div>
        </div>
      </div>
    </header>
  );
}
