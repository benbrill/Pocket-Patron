'use client';
import { useRouter } from 'next/navigation';

function BackButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.push('/dashboard', { scroll: false })}>
      back
    </button>
  );
}

export default BackButton;