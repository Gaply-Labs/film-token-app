import { useState } from 'react';
import { Icon } from '@iconify/react';
import Layout from '../container/Layout/Layout';
import Dashboard from '../container/Layout/Dashboard';
import { Button } from '@nextui-org/react';

export default function Home() {
  const [mint, setMint] = useState(0);
  const addMintPlus = () => {
    setMint((c) => c + 1);
  };
  const minesMint = () => {
    setMint((c) => (c > 0 ? c - 1 : 0));
  };
  return (
    <Layout>
      <div className="max-w-screen-2xl mx-auto px-4 w-full pt-10">
        <Dashboard>
          <div className="col-span-12 lg:col-span-7 xl:col-span-9 rounded-lg bg-[#192335] shadow-md ">
            <div className="w-full  max-w-screen-sm mx-auto h-[60vh] flex items-center justify-center">
              <div className=" w-full mx-auto px-4 flex flex-col gap-y-4">
                <div className="w-full rounded-lg hover:bg-slate-400/80 transition-all ease-in-out duration-250 hover:ring-1 cursor-pointer hover:ring-slate-400/90 bg-slate-400 h-96 flex items-center justify-center">
                  <p>Mint</p>
                </div>
                <div className="flex items-center gap-x-4 w-full">
                  <Button
                    onClick={addMintPlus}
                    color="secondary"
                    className="w-full max-w-[100px] h-full py-4 px-4 flex items-center justify-center rounded-md "
                  >
                    <Icon icon={'ic:round-plus'} width={24} />
                  </Button>
                  <div className="flex-1 py-4 px-4 flex items-center justify-center border border-secondary rounded-md">
                    {mint}
                  </div>
                  <Button
                    onClick={minesMint}
                    color="secondary"
                    className="w-full max-w-[100px] h-full py-4 px-4 rounded-md flex items-center justify-center "
                  >
                    <Icon icon={'mdi-light:minus'} width={24} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Dashboard>
      </div>
    </Layout>
  );
}
