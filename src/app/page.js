'use client';

import React from 'react';
import { useState } from 'react';
import DashboardMain from '@/components/dashboard';
import Notes from '@/components/notes';
import Sources from '@/components/sources';
import Navbar from '@/components/navbar';

export default function Home() {
  const [activePage, setActivePage] = useState('Dashboard');

  return (
    <>
    <div>
      <Navbar setActivePage={setActivePage} />
      <div>
        {activePage === 'Dashboard' && <DashboardMain />}
        {activePage === 'Notes' && <Notes />}
        {activePage === 'Sources' && <Sources />}
      </div>
    </div>
    </>
  );
}
