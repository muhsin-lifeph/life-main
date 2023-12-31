import Image from 'next/image';
import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

export const BrandsButton = ({ selectedBrands, brandName, filterSet }: { selectedBrands: string, brandName: any, filterSet: any }) => {
    const [isInverted, setIsInverted] = useState(false);
    const brandsArray = selectedBrands.split(",")

    return (
        <div onClick={() => {
            setIsInverted(!isInverted)
            isInverted ?
                filterSet(0, "brands", brandName.toLowerCase().replace(/[\s&]+/g, '-'), true)
                : filterSet(0, "brands", brandName.toLowerCase().replace(/[\s&]+/g, '-'), false)
        }} className={`${brandsArray.includes(brandName.toLowerCase().replace(/[\s&]+/g, '-')) ? "!bg-blue-500 !text-white" : ""} ${isInverted ? "!bg-blue-500 !text-white " : " "} cursor-pointer text-blue-500 border border-blue-500 px-2 py-1 text-center my-1 mr-2 rounded-full hover:bg-blue-500 hover:text-white inline-block text-xs`}>{brandName}</div>
    )
}


export const ShopNowButton = ({ classNames, children, onClick }: { children: any, classNames: string, onClick?: () => void }) => {
    return (
        <button className={"btn-primary sm:text-base text-sm sm:py-3 py-2 sm:px-7 px-5 " + classNames} onClick={onClick}>
            {children}
        </button>
    )
}

export const DeliverInstructionsBtn = ({ instr }: { instr: any }) => {

    const [instrSelected, setInstrSelected] = useState(false)
    return (
        <button onClick={() => setInstrSelected(!instrSelected)} className={`border  p-2 rounded-lg ${instrSelected?" bg-blue-200":"border-muted"}`}>
            <Image src={instrSelected ?  instr.icon_selected : instr.icon_unselected } height={50} width={50} alt="del-ins" className="mx-auto" />
            <p className="text-xs text-center">{instr.instruction}</p>
        </button>
    )
}