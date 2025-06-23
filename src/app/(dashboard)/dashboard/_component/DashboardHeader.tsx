'use client'

import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import Logo from '@/components/Logo'
import UserAvatar from '@/components/UserAvatar'
import { SidebarTriggerDashboard } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

const DashboardHeader = () => {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-40 h-14 bg-white border-b flex items-center px-4 shadow-sm">
      {/* Mobile logo */}
      <div className="md:hidden">
        <Logo w={80} />
      </div>

      {/* Greeting on desktop */}
      <div className={cn("hidden md:flex items-center text-muted-foreground font-medium text-sm ml-2")}>
        👋 Hi, <span className="ml-1 text-black font-semibold">{session?.user?.name || "User"}</span>
      </div>

      {/* Right side - avatar / sidebar trigger */}
      <div className="ml-auto flex items-center gap-2">
        {/* Show user avatar (with dropdown inside component) */}
        <div className="hidden md:block">
          <UserAvatar />
        </div>

        {/* Sidebar trigger for mobile */}
        <div className="md:hidden">
          <SidebarTriggerDashboard />
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
