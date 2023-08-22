import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DashboardNavbar } from '../components'
import { Books, Customers, Orders } from './admin/components'

function Dashboard() {

  const commonTabList = [
    { id: 1, title: 'Dashboard' },
    { id: 2, title: 'Customers' },
    { id: 3, title: 'Books' },
    { id: 4, title: 'Orders' },
  ];

  const [selectedTab, setSelectedTab] = useState<number>(1);

  const onTabPress = (tab:number) => {
    setSelectedTab(tab);
  }

  const renderTabs = () => {
    switch(selectedTab) {
      case 2: return <Customers />;
      case 3: return <Books />;
      case 4: return <Orders />;
      default: return null;
    }
  }

  return (
    <section className='md:flex'>
      <div className='flex-[0.25] md:flex-1'>
        <DashboardNavbar commonTabList={commonTabList} onTabPress={onTabPress} />
      </div>
      <div className='w-screen flex-[4]'>
        {renderTabs()}
      </div>
    </section>
  )
}

export default Dashboard