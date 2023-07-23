import { Dialog, Transition, RadioGroup, Listbox } from "@headlessui/react";
import React, { Fragment, useEffect } from "react"
import ModalContainer from "./ui/modal-container";
import { Tabs, Tab, TabsHeader, TabsBody, TabPanel, Drawer } from "@material-tailwind/react"
import PhoneInput from "react-phone-number-input";
import { useState } from "react"
import { isValidPhoneNumber } from "react-phone-number-input";
import { useSession } from "next-auth/react";
import OtpField from "react-otp-field";
import { useTimer } from "use-timer";
import { signIn } from "next-auth/react";
import Sheet, { SheetRef } from 'react-modal-sheet';
import { CalendarIcon, CaretSortIcon, CheckIcon, Cross1Icon, EnvelopeClosedIcon, FaceIcon, GearIcon, PersonIcon, RocketIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "./ui/command";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { AiFillCheckCircle, AiOutlineInfoCircle, AiOutlineLoading3Quarters } from 'react-icons/ai'
import OtpInput from 'react-otp-input';
import { MdAlternateEmail } from "react-icons/md"
import { motion } from "framer-motion";
import { BsPatchCheckFill } from "react-icons/bs"
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

const AuthModal = ({ setSheetOpen, isSheetOpen, showModal, setCloseModal, setaddnewAddressFormVisibility, setLocationModal, setnotValidOTPPageVisib, setaddNewAddress }: { setSheetOpen: any, isSheetOpen: any, showModal: boolean, setCloseModal: any, setaddNewAddress: any, setaddnewAddressFormVisibility: any, setLocationModal: any, setnotValidOTPPageVisib: any }) => {
    const { data: session } = useSession();
    const [isPhoneNumberValid, setPhoneNumberValidState] = useState<any>("");
    const [signInUsing, signInSet] = useState({ value: "", type: "" });
    const [isEmailValid, setEmailValidState] = useState<any>(null);
    const [otpPageVisibility, setOtpPageVisibility] = useState(false);
    const [state, setState] = useState('');
    const [countDownVisible, setCountDownVisible] = useState(false);
    const handleChange = (state: string) => setState(state);
    const [phoneNumberforOTP, setPhoneNumberforOtp] = useState('');
    const [LoginSignUpPageVisibility, setLoginSignUpPageVisibility] = useState(true)

    const [selectedCountryData, setSelectedCountryData] = useState<any>(null)

    var addressId = session ? (session.token.addresses.length != 0 ? (session.token.addresses[session.token.addresses.length - 1]?.id) + 1 : 12345 + 1) : ""

    const { time, start, pause, reset, status } = useTimer({
        initialTime: 59,
        timerType: 'DECREMENTAL',
    });


    async function otpIsValid(otpValue: string) {
        
        if (signInUsing.type === "Phone") {
            await signIn('credentials', { phone: phoneNumberforOTP, code: otpValue, isPhone: "true", redirect: false })
                .then(async (res) => {
                    if (res?.ok) {
                        setaddNewAddress(true);
                        setaddnewAddressFormVisibility(false)
                        setLocationModal(false);
                        setSheetOpen(false)
                    }
                    else {
                        // console.log(error)
                        setnotValidOTPPageVisib(true)
                    }
                })
        }
        else {
            await signIn('credentials', { email: phoneNumberforOTP, code: otpValue, isPhone: "false", redirect: false })
                .then(async (res) => {
                    
                    if (res?.ok) {
                        setaddNewAddress(true);
                        setaddnewAddressFormVisibility(false)
                        setLocationModal(false);
                        setSheetOpen(false)
                    }
                    else {
                        setnotValidOTPPageVisib(true)
                    }
                })
            setPhoneNumberValidState(false)
            setEmailValidState(false)
        }
    }


    function sendOTPtoPhoneNo(pHNumber: string, type: string) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw
        if (type === "Phone") {
            raw = JSON.stringify({
                "phone": pHNumber
            });
        }
        else if (type === "Email") {
            raw = JSON.stringify({
                "email": pHNumber
            });
        }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        setPhoneNumberforOtp(pHNumber)
        const res = fetch("https://prodapp.lifepharmacy.com/api/auth/request-otp", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error while fetching search data', error));
    }


    const [formData, setFormData] = useState({
        id: addressId,
        entity_id: 1462724,
        name: "",
        phone: "",
        longitude: "55.272887000000000",
        latitude: "25.219370000000000",
        type: "Home",
        country: "United Arab Emirates",
        state: "",
        city: "",
        area: "Satwa/Badaa",
        street_address: "",
        building: "",
        flat_number: "",
        suitable_timing: "0",
        created_at: "2023-03-16T08:09:22.000000Z",
        updated_at: "2023-03-16T08:09:22.000000Z",
        google_address: "Al Satwa - Dubai - United Arab Emirates",
        additional_info: "",
        belongs_to: "user",
        deleted_at: null,
        is_validated: 1
    });

    const [phoneNumberValidTimeout, setPhoneNumberValidTimeout] = useState<any>(null)

    function isValidCredentials(value: string) {
        
        setPhoneNumberValidState("loading")
        clearTimeout(phoneNumberValidTimeout)
        const timeout = setTimeout(() => {
            if (value != null) {
                if (isValidPhoneNumber(value)) {
                    setPhoneNumberValidState("success");
                    setFormData({ ...formData, phone: value });
                    signInSet({ type: "Phone", value: value });
                }
                else {
                    setPhoneNumberValidState("failed");
                }
            }
        }, 400)
        setPhoneNumberValidTimeout(timeout)
    }

    function isValidEmail(value: string): void {
        setEmailValidState("loading")
        clearTimeout(phoneNumberValidTimeout)
        const timeout = setTimeout(() => {
            if (value !== "") {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                    setEmailValidState("success");
                    signInSet({ type: "Email", value: value });

                } else {
                    setEmailValidState("failed");
                }
            }
            else {
                setEmailValidState("failed");

            }
        }, 400)
        setPhoneNumberValidTimeout(timeout)
    }

    function startTimer() {
        start();
        setCountDownVisible(true);
    }
    const stopTimer = () => {
        setCountDownVisible(false);
        reset();
        return 0;
    }

    function isValidPhoneNoInput(SetOtpVisb: boolean) {
        if (SetOtpVisb) {
            setLoginSignUpPageVisibility(false)
            setOtpPageVisibility(true);
            setState('');
            startTimer();

            sendOTPtoPhoneNo(signInUsing.value, signInUsing.type);

        }
        else {
            setLoginSignUpPageVisibility(true)
            setOtpPageVisibility(false);
            stopTimer()
        }
    }

    const [countriesData, setCountriesData] = useState<any>(null)
    useEffect(() => {
        fetch("https://restcountries.com/v2/region/Asia?fields=name,alpha2Code,callingCodes").then(res => res.json()).then(countriesData => {
            setCountriesData(countriesData)
            fetch("https://ipapi.co/json").then(res => res.json()).then((data: any) => {
                
                const selectedCountriesDatas = countriesData.filter((countryData: any) => countryData.name === data.country_name)
                setSelectedCountryData(selectedCountriesDatas)
            }
            )
        })
    }, [])
    const [countriesDrawerState, setCountriesDrawerState] = useState(false)
    const {width} = useWindowDimensions()

    const variants = {
        closed: {
            bottom: "-50%",
            opacity: 0,
            position: "fixed",
            left: 0,
            right: 0,
        },
        open: {
            bottom: width>576?"30%":0,
            opacity: 1,
            position: "fixed",
            left: 0,
            right: 0,
        },
    };


    return (

        <>
            <div onClick={() => { countriesDrawerState ? setCountriesDrawerState(false) : setSheetOpen(false) }} className={isSheetOpen || countriesDrawerState ? "bg-black inset-0 fixed z-50 bg-opacity-50 backdrop-blur-sm" : ""}></div>
            <motion.div
                animate={isSheetOpen ? "open" : "closed"}
                //@ts-ignore
                variants={variants} className="z-50 bg-white max-w-xl mx-auto py-1 sm:rounded-3xl rounded-3xl rounded-b-none px-4">
                <div>
                    <div className=" flex justify-between border-b-2 border-muted pt-3 font-semibold ">
                        <h4 className=" sm:text-2xl text-base items-center">Login or Sign up</h4>
                        <div className="cursor-pointer" onClick={()=>{setSheetOpen(false)}}>
                            <Cross1Icon className="sm:w-6 sm:h-6 w-4 h-4" />
                        </div>
                    </div>
                    {LoginSignUpPageVisibility ?
                        <form className="sm:space-y-2 space-y-0 pb-2" action="#" >
                            <div className="mt-3 flex-1">
                                <Tabs value="phone" className="border-none">
                                    <TabsHeader className="bg-slate-100">
                                        <Tab key="phone" value="phone" className="z-20">
                                            <span className="sm:text-base text-xs">Using Phone</span>
                                        </Tab>
                                        <Tab key="email" value="email">
                                            <span className="sm:text-base text-xs">Using Email</span>
                                        </Tab>
                                    </TabsHeader>
                                    <TabsBody >
                                        <TabPanel key="phoneinput" value="phone" >
                                            <div>
                                                <label className=" block mb-2 font-medium text-gray-900 sm:text-lg text-sm">Enter your mobile number <span className="text-red-500">*</span></label>

                                                <Input onChange={(e) => isValidCredentials('+' + selectedCountryData[0].callingCodes + e.target.value)} className=" rounded-l-none" buttonLeft={
                                                    <button onClick={(e) => {
                                                        e.preventDefault()
                                                        setCountriesDrawerState(true)
                                                    }
                                                    } className="bg-slate-100 flex items-center space-x-2 rounded-l-lg px-2 py-1 border border-slate-300 border-r-0">
                                                        {selectedCountryData ? <> <Image src={`https://hatscripts.github.io/circle-flags/flags/${selectedCountryData[0].alpha2Code.toLowerCase()}.svg`} width="50" height="50" className="sm:w-8 sm:h-8 h-6 w-6" alt={countriesData[0].name} />
                                                            <h5 className="font-semibold sm:text-lg text-sm">+{selectedCountryData[0].callingCodes}</h5>
                                                        </>
                                                            : null
                                                        }
                                                        <ChevronDown className="sm:w-12 sm:h-10 w-9 h-6" />
                                                    </button>} iconRight={
                                                        isPhoneNumberValid === "loading" ?
                                                            <AiOutlineLoading3Quarters className="sm:w-5 sm:h-5 h-3 w-3 text-blue-500 animate-spin" /> :
                                                            isPhoneNumberValid === "success" ?
                                                                <AiFillCheckCircle className="sm:w-6 sm:h-6 h-4 w-4 text-green-500 " />
                                                                : isPhoneNumberValid === "failed" ? <AiOutlineInfoCircle className="sm:w-6 sm:h-6 h-4 w-4 text-red-500 " />
                                                                    : null} />

                                            </div>
                                        </TabPanel>
                                        <TabPanel key="emailInput" value="email" >
                                            <div>
                                                <label className=" block mb-2 font-medium text-gray-900 sm:text-lg text-sm">Enter your Email Address <span className="text-red-500">*</span></label>
                                                <Input
                                                    iconRight={
                                                        isEmailValid === "loading" ?
                                                            <AiOutlineLoading3Quarters className="sm:w-5 sm:h-5 h-3 w-3 text-blue-500 animate-spin" /> :
                                                            isEmailValid === "success" ?
                                                                <AiFillCheckCircle className="sm:w-6 sm:h-6 h-4 w-4 text-green-500 " />
                                                                : isEmailValid === "failed" ? <AiOutlineInfoCircle className="sm:w-6 sm:h-6 h-4 w-4 text-red-500 " /> : null
                                                    }
                                                    onChange={(e) => { isValidEmail(e.target.value) }} className="font-semibold sm:text-lg text-sm w-full  sm:py-2 py-1" iconLeft={
                                                        <MdAlternateEmail className="sm:w-6 sm:h-6 h-5 w-5 text-slate-400" />
                                                    } />
                                            </div>
                                        </TabPanel>
                                    </TabsBody>
                                </Tabs>
                            </div>
                            <div className="">
                                <div className="flex justify-between mb-4">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                        </div>
                                        <div className="sm:text-sm  text-gray-500 text-xs">
                                            By continuing, I agree to the <span><a href="#" className="text-blue-500">Terms of Use</a></span> & <span><a href="#" className="text-blue-500">Privacy Policy</a></span>
                                        </div>
                                    </div>
                                </div>
                                <Button disabled={isPhoneNumberValid === "success" || isEmailValid === "success" ? false : true} className="w-full" onClick={() => { isValidPhoneNoInput(true) }} >
                                    PROCEED
                                </Button>
                            </div>
                        </form>
                        : null}
                    {otpPageVisibility ?
                        <div className="py-2" id="otpPage">
                            <h3 className="mb-3 text-xl text-blue-500 ">OTP Code</h3>
                            <label className="block mb-2 font-medium text-gray-900 sm:text-base text-xs">Please check your {signInUsing.type} and enter the OTP code  <span className="text-red-500">*</span></label>

                            <form className="space-y-6" action="#" >

                                <OtpInput
                                    value={state}
                                    onChange={handleChange}
                                    containerStyle={{ display: "flex", justifyContent: "space-between", width: "80%", marginLeft: "auto", marginRight: "auto" }}
                                    numInputs={4}
                                    inputStyle={{ width: "100%", fontSize: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
                                    renderSeparator={<span className="w-[7rem] "> </span>}
                                    renderInput={(props: any) => <Input  {...props} className="h-14" />}
                                />
                                <div className="sm:text-sm text-[10px]">
                                    {countDownVisible ? <div className=" text-gray-500 flex justify-between" id="seconds-count">
                                        <p>Didn't Receive Code?</p> <p className="">Request again in {time >= 0 ? time : stopTimer()} seconds</p>
                                    </div> : <Button variant={"outline"} onClick={() => { isValidPhoneNoInput(true) }} type="button" size={"sm"} >RESEND OTP</Button>
                                    }
                                </div>
                                <div className="flex space-x-3">
                                    <Button onClick={() => { isValidPhoneNoInput(false) }} variant={"outline"} className="w-1/3">
                                        Back
                                    </Button>
                                    <Button onClick={(e) => {
                                        e.preventDefault()
                                        otpIsValid(state)
                                    }} className="w-full" disabled={state.length === 4 ? false : true}>
                                        PROCEED
                                    </Button>
                                </div>
                            </form>
                        </div> : null}
                </div>
            </motion.div>


            <motion.div
                animate={countriesDrawerState ? "open" : "closed"}
                //@ts-ignore
                variants={variants} className="z-50 bg-white  max-w-xl mx-auto py-3 md:rounded-xl rounded-xl rounded-b-none px-3">
                <div className="pb-2">
                    <h3 className="text-xl">Select a Country</h3>
                </div>
                <Command className="rounded-lg border shadow-md ">
                    <CommandInput placeholder="Search for Countries..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup >
                            {selectedCountryData ?
                                <CommandItem>
                                    <button className="space-x-3 items-center bg-green-100 flex justify-between  px-2 pr-5 py-1.5 w-full" onClick={() => { setCountriesDrawerState(false) }}>
                                        <div className="flex space-x-3 items-center">
                                            <Image src={`https://hatscripts.github.io/circle-flags/flags/${selectedCountryData[0].alpha2Code.toLowerCase()}.svg`} width="50" height="50" className="w-8 h-8" alt={selectedCountryData[0].name} />
                                            <p className="sm:text-base text-xs whitespace-nowrap overflow-hidden text-ellipsis">{selectedCountryData[0].name}</p>
                                            <p className="sm:text-sm text-xs font-semibold">(+{selectedCountryData[0].callingCodes})</p>
                                        </div>
                                        <BsPatchCheckFill className="sm:w-6 sm:h-6 h-5 w-5 fill-green-500" />
                                    </button>
                                </CommandItem>
                                : null}
                            {countriesData ?
                                countriesData.map((countr: any) => (
                                    <CommandItem className={` ${selectedCountryData && selectedCountryData[0].name === countr.name ? "hidden" : ""}`}>
                                        <button onClick={() => {
                                            setSelectedCountryData([countr])
                                            setCountriesDrawerState(false)
                                        }
                                        } className="space-x-3 items-center w-full h-full flex px-2 pr-5 py-1.5">
                                            <Image src={`https://hatscripts.github.io/circle-flags/flags/${countr.alpha2Code.toLowerCase()}.svg`} width="50" height="50" className="w-8 h-8" alt={countr.name} />
                                            <p className="sm:text-base text-xs overflow-hidden whitespace-nowrap text-ellipsis">{countr.name}</p>
                                            <p className="sm:text-sm text-xs font-semibold">(+{countr.callingCodes})</p>
                                        </button>
                                    </CommandItem>
                                ))
                                : null}
                        </CommandGroup>
                        <CommandSeparator />
                    </CommandList>
                </Command>

            </motion.div>
        </>
    )


}

export default AuthModal