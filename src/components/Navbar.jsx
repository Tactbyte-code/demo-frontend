import Link from 'next/link';

export default function Navbar() {
    return (
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', gap: '10px' }}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
        </nav>
    );
}