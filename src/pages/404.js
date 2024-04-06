import React from 'react';
import Layout from '../container/Layout/Layout';
import Dashboard from '../container/Layout/Dashboard';
import CustomButton from '../components/common/CustomButton';
import { useRouter } from 'next/router';

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <Layout>
      <div className="max-w-screen-2xl mx-auto px-4 w-full pt-10">
        <Dashboard>
          <div className="col-span-12  lg:col-span-7 xl:col-span-9 rounded-lg bg-black shadow-lg  flex flex-col">
            <div className="w-full flex items-center justify-center py-10 flex-col gap-y-4">
              <h4>Not Found Routes</h4>
              <CustomButton onClick={() => router.replace('/')}>NFT Page</CustomButton>
            </div>
          </div>
        </Dashboard>
      </div>
    </Layout>
  );
}
