import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    router.push('/admin/dashboard');
  }, [router]);
  return <div className="w-full min-h-screen">waiting</div>;
}
