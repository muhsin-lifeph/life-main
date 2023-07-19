import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/hooks/useLanguage"
import LgScreenSubMenu from "./lg-screen-sub-menu"
import Example from "./headlessui-menu"
const LgNavbar = ({  isSheetOpen,  setSheetOpen, setLocationModal, searchButtonOnMouseEnter, SearchLoadingState, queryData, isArabic, children, searchSuggestions, setLanguageModal, searchButtonOnClick, searchData }: {  isSheetOpen:any,  setSheetOpen:any, searchData: any, searchButtonOnClick: any, SearchLoadingState: any, setLanguageModal: any, children: any, queryData: any, isArabic: boolean, searchSuggestions: any, searchButtonOnMouseEnter: any, setLocationModal: any }) => {

  const { t, countries, languages } = useLanguage()

  return (
    <div className="mx-auto flex max-w-[1450px] sm:px-[10px] px-[5px] gap-5  sm:py-3 py-1 ">
      <Link href={"/"} className="my-auto">
        <Image src="https://www.lifepharmacy.com/images/logo-white.svg" alt=""
          className=" bg-[#002579] filter md:flex hidden" width={380} height={250} />
        <Image className="mr-auto w-7 lg:hidden md:hidden" src="https://www.lifepharmacy.com/images/life.svg" alt="" width={100} height={100} />
      </Link>
      <div className="flex items-center w-full md:border-none border-2 rounded-lg md:rounded-none border-slate-200 " >
        <div className="relative w-full">
          <div className="relative group-search cursor-pointer" id="lg-screen-search" onChange={(e) => { searchButtonOnMouseEnter((e.target as HTMLInputElement).value) }}  onMouseDown={(e) => { searchButtonOnClick(true) }}   >
            <div className={`absolute inset-y-0  flex items-center pointer-events-none ${isArabic ? 'right-0 pr-3 ' : 'left-0 pl-3'}`}>
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 mr-3" fill="currentColor"
                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"></path>
              </svg>
              <p className="md:hidden sm:text-sm text-xs">Search For Products</p>
            </div>
            {SearchLoadingState ?
              <svg fill="none" className={`animate-spin w-5 h-5 absolute inline ${isArabic ? "left-8" : "right-8"}  inset-y-0 m-auto w-4 h-4 mx-2`} stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" shape-rendering="geometricPrecision" viewBox="0 0 24 24" height="24" width="24" ><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg> : ""}
            <Example searchSuggestions={searchSuggestions} searchData={searchData} queryData={queryData} isArabic={isArabic}/>
          </div>
        </div>
      </div>
      <LgScreenSubMenu setSheetOpen={setSheetOpen} isSheetOpen={isSheetOpen} countries={countries} languages={languages} setLanguageModal={setLanguageModal} setLocationModal={setLocationModal} />
    </div>
  )
}

export default LgNavbar