'use client'

import { CheckIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Catalyst/Logo'
import { CountdownTimer } from '@/components/CountdownTimer'
import { ProgressBar } from '@/components/ProgressBar'
import { SparklesIcon } from '@heroicons/react/24/solid'

const TOTAL_SPOTS = 500
const REMAINING_SPOTS = 127
const SPOTS_LAST_HOUR = 23

const NEW_CAR_FEATURES = 7
const TRADE_IN_FEATURES = 6

const tiers = [
  {
    name: 'Basic',
    href: '/register?plan=basic',
    priceMonthly: 1595,
    description: 'Everything you need to get started with new car quotes.',
    includedFeatures: [
      'Access to qualified leads',
      'Private bidding system',
      'Basic analytics',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    href: '/register?plan=pro',
    priceMonthly: 1895,
    description: 'A plan that scales with your rapidly growing business.',
    includedFeatures: [
      'All Basic features',
      'Used car buyouts',
      'Advanced analytics',
      'Priority support',
      'Custom reporting',
      'API access',
    ],
  },
]

const endTime = new Date();
endTime.setDate(endTime.getDate() + 7);

export function Pricing() {
  const { t } = useTranslation()

  return (
    <section
      id="pricing"
      aria-label={t('features.title')}
      className="bg-slate-900 py-16 sm:py-20 md:py-24 lg:py-32"
    >
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="md:text-center max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-white">
            {t('features.title')}
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-400 leading-relaxed">
            {t('features.subtitle')}
          </p>
          <div className="mt-6 sm:mt-8">
            <CountdownTimer endTime={endTime} />
          </div>
          <div className="mt-6 sm:mt-8 max-w-md mx-auto">
            <ProgressBar 
              total={TOTAL_SPOTS} 
              remaining={REMAINING_SPOTS}
              className="max-w-md mx-auto"
            />
          </div>
        </div>

        <div className="mt-10 sm:mt-12 md:mt-16 grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* New Car Package */}
          <div>
            <div className="h-full">
              <div className="flex flex-col h-full rounded-3xl bg-white/5 p-6 ring-1 ring-inset ring-white/10 hover:ring-white/20 transition-all duration-500 sm:p-8 md:p-10">
                <h3 className="font-display text-lg text-white sm:text-xl md:text-2xl">
                  {t('features.newCar.title')}
                </h3>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
                  {t('features.newCar.description')}
                </p>
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <p className="flex items-baseline flex-wrap">
                      <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                        {t('features.newCar.price')}
                      </span>
                      <span className="ml-2 text-sm text-slate-400">
                        {t('features.newCar.prelaunchPrice')}
                      </span>
                    </p>
                    <p className="mt-1 sm:mt-2 text-sm text-emerald-400">
                      <span className="font-bold">40% OFF</span> - {t('features.newCar.regularPrice')}
                    </p>
                  </div>
                  <div className="text-left sm:text-right group mt-3 sm:mt-0">
                    <div className="relative">
                      <p className="text-base sm:text-lg font-bold text-emerald-400 transition-all duration-300 group-hover:scale-110 group-hover:text-emerald-300">
                        {t('features.newCar.savings')}
                      </p>
                      <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-full sm:w-60 p-3 bg-emerald-400/10 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 text-sm text-emerald-400 ring-1 ring-inset ring-emerald-400/20 z-10">
                        {t('features.newCar.tooltip')}
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">
                      {t('spotsRemaining', { count: REMAINING_SPOTS })}
                    </p>
                  </div>
                </div>
                <div className="my-6 sm:my-8 h-px bg-white/10" />
                <ul role="list" className="space-y-3 sm:space-y-4 text-sm sm:text-base leading-relaxed text-slate-300 flex-grow">
                  {Array.from({ length: NEW_CAR_FEATURES }, (_, i) => (
                    <li key={i} className="flex items-start gap-3 sm:gap-4 group">
                      <CheckIcon className="h-5 w-5 flex-none text-emerald-400 mt-0.5 transition-all duration-300 group-hover:scale-110" />
                      <span className="transition-colors duration-300 group-hover:text-emerald-400">
                        {t(`features.items.newCar.${i}`)}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className="mt-6 sm:mt-8 w-full py-2.5 sm:py-3 text-sm sm:text-base"
                  aria-label={t('features.newCar.ctaLabel')}
                >
                  {t('features.newCar.cta')}
                </Link>
              </div>
            </div>
          </div>

          {/* Trade-In Package */}
          <div>
            <div className="h-full">
              <div className="relative flex flex-col h-full rounded-3xl bg-white/5 p-6 ring-2 ring-emerald-400/60 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] bg-gradient-to-b from-emerald-500/[0.075] to-transparent hover:shadow-[0_0_40px_-5px_rgba(16,185,129,0.4)] transition-all duration-500 sm:p-8 md:p-10">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-400 ring-1 ring-inset ring-emerald-400/20">
                    {t('features.mostPopular')}
                    <SparklesIcon className="h-4 w-4 text-yellow-400" />
                  </div>
                </div>
                <h3 className="font-display text-lg text-white sm:text-xl md:text-2xl">
                  {t('features.tradeIn.title')}
                </h3>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
                  {t('features.tradeIn.description')}
                </p>
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <p className="flex items-baseline flex-wrap">
                      <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                        {t('features.tradeIn.price')}
                      </span>
                      <span className="ml-2 text-sm text-slate-400">
                        {t('features.prelaunchPrice')}
                      </span>
                    </p>
                    <p className="mt-1 sm:mt-2 text-sm text-emerald-400">
                      <span className="font-bold">40% OFF</span> - {t('features.regularPrice')} {t('features.tradeIn.regularPrice')}
                    </p>
                  </div>
                  <div className="text-left sm:text-right group mt-3 sm:mt-0">
                    <div className="relative">
                      <p className="text-base sm:text-lg font-bold text-emerald-400 transition-all duration-300 group-hover:scale-110 group-hover:text-emerald-300">
                        {t('features.save')} {t('features.tradeIn.savings')}
                      </p>
                      <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-full sm:w-60 p-3 bg-emerald-400/10 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 text-sm text-emerald-400 ring-1 ring-inset ring-emerald-400/20 z-10">
                        {t('features.tradeIn.tooltip')}
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">
                      {t('spotsRemaining', { count: REMAINING_SPOTS })}
                    </p>
                  </div>
                </div>
                <div className="my-6 sm:my-8 h-px bg-white/10" />
                <ul role="list" className="space-y-3 sm:space-y-4 text-sm sm:text-base leading-relaxed text-slate-300 flex-grow">
                  {Array.from({ length: TRADE_IN_FEATURES }, (_, i) => (
                    <li key={i} className="flex items-start gap-3 sm:gap-4 group">
                      <CheckIcon className="h-5 w-5 flex-none text-emerald-400 mt-0.5 transition-all duration-300 group-hover:scale-110" />
                      <span className="transition-colors duration-300 group-hover:text-emerald-400">
                        {t(`features.items.tradeIn.${i}`)}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className="mt-6 sm:mt-8 w-full py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                  aria-label={t('features.tradeIn.ctaLabel')}
                >
                  {t('features.tradeIn.cta')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}