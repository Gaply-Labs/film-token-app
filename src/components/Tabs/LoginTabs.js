import TabsEmailAuth from "../Section/@auth/TabsEmailAuth";

export const loginTabs = [
  { tab: 'Email', children: <TabsEmailAuth /> },
  { tab: 'Phone', children: <div className="h-64">hello Phone</div> },
];
