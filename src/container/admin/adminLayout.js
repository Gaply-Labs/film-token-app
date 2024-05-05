import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, AccordionItem } from '@nextui-org/react';
import Layout from '../Layout/Layout';
import Link from 'next/link';

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function AdminLayout({ children }) {
  return (
    <Layout>
      <div className="w-full pt-10 flex gap-x-10 min-h-[60vh] max-w-screen-2xl mx-auto">
        {/* sidebar */}
        <div className="w-full max-w-[270px]">
          <div className="w-full py-2 px-4 rounded-xl bg-black shadow-md flex flex-col gap-y-4">
            <Accordion defaultExpandedKeys={'1'}>
              <AccordionItem key={'1'} title="Master" className="pb-3 font-medium" isCompact>
                <div className="flex flex-col gap-y-4 px-4 text-sm text-white/80 ">
                  <Link href={'/admin/dashboard'}>Add Master</Link>
                  <Link href={'/admin/dashboard/status/master'}>Master Status</Link>
                </div>
              </AccordionItem>
              <AccordionItem key={'2'} title="Initilize" className="pb-3 font-medium" isCompact>
                <div className="flex flex-col gap-y-4 px-4 text-sm text-white/80 ">
                  <Link href={'/admin/dashboard/initilize'}>Add Initilize</Link>
                  <Link href={'/admin/dashboard/status/Initial'}>Initilize Status</Link>
                </div>
              </AccordionItem>
              <AccordionItem key={'3'} title="Reveal" className="pb-3 font-medium" isCompact>
                <div className="flex flex-col gap-y-4 px-4 text-sm text-white/80 ">
                  <Link href={'/admin/dashboard/reveal'}>Call Reveal</Link>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="flex-grow ">
          <div className="w-full flex flex-col gap-y-4 py-4 bg-black rounded-xl shadow-md px-8">{children}</div>
        </div>
      </div>
    </Layout>
  );
}
