import { Switch } from '@headlessui/react'

export default function InputToggle({ enabled, setEnabled }) {
  return (
    <div className=''>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-green-500' : 'bg-red-500'}
          relative inline-flex h-[18px] w-[34px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span className='sr-only'>Use setting</span>
        <span
          aria-hidden='true'
          className={`${enabled ? 'translate-x-4' : 'translate-x-0'}
            pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  )
}
