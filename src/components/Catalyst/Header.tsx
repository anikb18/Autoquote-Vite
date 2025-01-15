'use client';

import { UserButton } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';
import { Link } from 'react-router-dom';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PiGearFill } from 'react-icons/pi';
import { MdRefresh } from 'react-icons/md';

export function Header() {
  const t = useTranslations('navigation');

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20 w-full"
    >
      <div className="flex justify-between h-12">
        <Link to="/dashboard" className="flex items-center gap-2" aria-label={t('dashboard')}>
          <div className="relative h-8 w-8">
            <Image
              src="/dark.svg"
              alt="AutoQuote24"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold text-white">AutoQuote24</span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label={t('quotes')}
            title={t('quotes')}
          >
            <MdRefresh className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label={t('settings')}
            title={t('settings')}
          >
            <PiGearFill className="h-5 w-5" />
          </button>
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: 'h-9 w-9',
                userButtonPopoverCard: 'bg-white/10 backdrop-blur-xl border border-white/20',
                userButtonPopoverActionButton: 'text-white hover:bg-white/20',
                userButtonPopoverActionButtonText: 'text-white',
                userButtonPopoverFooter: 'hidden'
              }
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
