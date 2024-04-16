"use client"

import { showRightSidebarAtom } from '@/jotai/ui-atoms'
import { useAtom } from 'jotai'
import { motion, AnimatePresence } from "framer-motion"
export default function RightSidebar() {
  const [showRightSidebar, setShowRightSidebar] = useAtom(showRightSidebarAtom)

  return <AnimatePresence >
    {showRightSidebar ?
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="h-screen border w-[18%]">
        <section>
          <h1>Right Sidebar</h1>
        </section>
      </motion.div> : <></>}
  </AnimatePresence>
}
