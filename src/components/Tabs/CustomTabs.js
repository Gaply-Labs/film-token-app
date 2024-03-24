import { Tab, Tabs } from '@nextui-org/react';
import PropTypes from 'prop-types';
export default function CustomTabs({ tabs }) {
  return (
    <div className="flex max-w-[450px]  flex-col">
      <Tabs
        aria-label="options"
        variant="underlined"
        color="none"
        radius="sm"
        classNames={{
          tabList: ' w-full max-w-fit  relative rounded-lg p-0 border  border-gray',
          cursor: 'w-full bg-transparent text-secondary',
          tab: ' px-8 h-10 text-center w-32 text-white text-lg rounded-none even:border-l border-l-slate-300',
          tabContent: 'group-data-[selected=true]:text-secondary text-white text-opacity-70 ',
        }}
      >
        {tabs.map((item, index) => (
          <Tab
            key={item.tab}
            title={
              <div className="flex items-center space-x-2">
                <span className="uppercaseF">{item.tab}</span>
              </div>
            }
          >
            {item.children}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
CustomTabs.proptypes = {
  tabs: PropTypes.array,
};
