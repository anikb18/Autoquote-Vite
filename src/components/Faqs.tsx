'use client'

import { useTranslation } from 'react-i18next'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'

const faqs = [
  {
    id: '1',
    question: 'question1',
    answer: 'answer1',
  },
  {
    id: '2',
    question: 'question2',
    answer: 'answer2',
  },
  {
    id: '3',
    question: 'question3',
    answer: 'answer3',
  },
  {
    id: '4',
    question: 'question4',
    answer: 'answer4',
  },
  {
    id: '5',
    question: 'question5',
    answer: 'answer5',
  },
  {
    id: '6',
    question: 'question6',
    answer: 'answer6',
  },
  {
    id: '7',
    question: 'question7',
    answer: 'answer7',
  },
  {
    id: '8',
    question: 'question8',
    answer: 'answer8',
  },
  {
    id: '9',
    question: 'question9',
    answer: 'answer9',
  },
]

export function Faqs() {
  const { t } = useTranslation()

  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <img
        className="absolute left-1/2 top-0 max-w-none -translate-x-1/2 translate-y-[-10%]"
        src={backgroundImage}
        alt=""
        width={1824}
        height={1080}
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            {t('faqs.title')}
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            {t('faqs.description')}
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((faq) => (
            <li key={faq.id}>
              <h3 className="font-display text-lg leading-7 text-slate-900">
                {t(`faqs.items.${faq.id}.question`)}
              </h3>
              <p className="mt-4 text-sm text-slate-700">
                {t(`faqs.items.${faq.id}.answer`)}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
