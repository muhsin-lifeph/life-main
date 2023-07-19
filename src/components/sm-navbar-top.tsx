import { useState } from "react"
import TransitionComp from "./ui/transition"
import { useLanguage } from "@/hooks/useLanguage"
const SmNavbarTop = () => {
    const [highestRatedP, sethighestRatedP] = useState(true)
    const { t } = useLanguage()
    return (
        highestRatedP ?
            <TransitionComp
                setTransition={highestRatedP} >
                <div className="grid grid-flow-col bg-life-2 text-white  text-xs px-2 py-1 md:hidden ">
                    <div className="flex justify-start">
                        <svg onClick={() => { sethighestRatedP(false) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" className=" sm:w-5 sm:h-7 w-4 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <div className="my-auto sm:text-sm text-xs overflow-hidden whitespace-nowrap text-ellipsis  mx-2">{t.navbar.highest_rated_phar}</div>
                    </div>
                    <div className="text-end sm:text-sm text-[10px] my-auto overflow-hidden whitespace-nowrap text-ellipsis">{t.navbar.download_now}</div>
                </div>
            </TransitionComp>
            : null
    )
}

export default SmNavbarTop