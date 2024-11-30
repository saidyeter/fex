import { useTabs } from "@/lib/hooks/useTabs";
import tabService from "@/services/tab-service";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function TopTabbar() {

  const { tabs, currentTabId: tab } = useTabs()

  return (
    <ul className="h-10 justify-start flex-row flex gap-2">
      <AnimatePresence>
        {tabs?.sort((a, b) => a.order - b.order).map(t => {
          return (
            <motion.li
              key={t.order}
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="relative flex items-center justify-center">
              <Link
                prefetch={true}
                key={t.order}
                href={tabService.getUrl(t)}
                className={" px-3 py-1.5 font-medium outline-2 outline-sky-400 h-full"}
              >
                {tab == t.order?.toString() &&
                  (
                    <motion.div
                      layoutId="active-tab"
                      className="bg-primary absolute inset-0 rounded-lg"
                      transition={{ duration: 0.5, type: 'spring' }}
                    />
                  )}
                <span className={`relative z-10 ${tab == t.order?.toString() ? "text-primary-foreground" : "text-secondary-foreground"} `}>{t.name}</span>
              </Link>
            </motion.li>
          )
        })}
      </AnimatePresence>
    </ul>
  );
}

// more animations
// https://github.com/samselikoff/2022-08-24-staggered-imessage-animation/commit/c2b72e20cf8f6cbf7f4f3bc98a631f6c98b7cbf5
