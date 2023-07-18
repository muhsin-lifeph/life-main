import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import LgSearchComponent from './lg-search'
import { useLanguage } from '@/hooks/useLanguage'

export default function Example({ searchSuggestions, searchData, queryData, isArabic }: { queryData: any, searchSuggestions: any, searchData: any, isArabic: any }) {
  const { t } = useLanguage()

  return (
    <Menu as="div" className="">
      {({ open }) => (
        <>
          <Menu.Button className="w-full">
            <input type="search" ref={input => input && input.focus()} onKeyDown={(e) => e.key === "Enter" ? searchSuggestions((e.target as HTMLInputElement).value, false, "search") : null} defaultValue={queryData} id="lg-searchbox"
              className={`focus:ring-0 focus:ring-offset-0 hidden md:block bg-white  p-[0.7rem]  text-gray-900 text-sm rounded-2xl ${open ? "rounded-b-none" : "rounded-full"}  w-full ${isArabic ? 'pr-10 ' : 'pl-10 '} p-3`}
              placeholder={t.navbar.searchbox_text} />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
            <Menu.Items className="absolute right-0 z-30  left-0 bg-white rounded-lg rounded-t-none border-t w-full">
              <LgSearchComponent searchSuggestions={searchSuggestions} searchData={searchData} />
            </Menu.Items>
          </Transition></>
      )}
    </Menu>
  )
}

