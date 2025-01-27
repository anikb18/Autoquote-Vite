import { useState } from 'react'
import { Radio, RadioGroup } from '@headlessui/react'

const plans = [
  { name: 'Hobby', ram: '8GB', cpus: '4 CPUs', disk: '160 GB SSD disk', price: '$40' },
  { name: 'Startup', ram: '12GB', cpus: '6 CPUs', disk: '256 GB SSD disk', price: '$80' },
  { name: 'Business', ram: '16GB', cpus: '8 CPUs', disk: '512 GB SSD disk', price: '$160' },
  { name: 'Enterprise', ram: '32GB', cpus: '12 CPUs', disk: '1024 GB SSD disk', price: '$240' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [selected, setSelected] = useState(plans[0])

  return (
    <fieldset aria-label="Server size">
      <RadioGroup value={selected} onChange={setSelected} className="space-y-4">
        {plans.map((plan) => (
          <Radio
            key={plan.name}
            value={plan}
            aria-label={plan.name}
            aria-description={`${plan.ram}, ${plan.cpus}, ${plan.disk}, ${plan.price} per month`}
            className={({ focus }) =>
              classNames(
                focus ? 'border-indigo-600 ring-2 ring-indigo-600' : '',
                !focus ? 'border-gray-300' : '',
                'relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between'
              )
            }
          >
            {({ checked, focus }) => (
              <>
                <span className="flex items-center">
                  <span className="flex flex-col text-sm">
                    <span className="font-medium text-gray-900">{plan.name}</span>
                    <span className="text-gray-500">
                      <span className="block sm:inline">
                        {plan.ram} / {plan.cpus}
                      </span>{' '}
                      <span className="hidden sm:mx-1 sm:inline" aria-hidden="true">
                        &middot;
                      </span>{' '}
                      <span className="block sm:inline">{plan.disk}</span>
                    </span>
                  </span>
                </span>
                <span className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right">
                  <span className="font-medium text-gray-900">{plan.price}</span>
                  <span className="ml-1 text-gray-500 sm:ml-0">/mo</span>
                </span>
                <span
                  className={classNames(
                    checked ? 'border-indigo-600' : 'border-transparent',
                    focus ? 'border' : 'border-2',
                    'pointer-events-none absolute -inset-px rounded-lg'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </Radio>
        ))}
      </RadioGroup>
    </fieldset>
  )
}
