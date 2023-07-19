import { Dialog, Transition, RadioGroup, Listbox } from "@headlessui/react";
import React, { Fragment, useEffect } from "react"
import ModalContainer from "./ui/modal-container";
import { Tabs, Tab, TabsHeader, TabsBody, TabPanel, select } from "@material-tailwind/react"
import PhoneInput from "react-phone-number-input";
import { useState, useRef } from "react"
import { isValidPhoneNumber } from "react-phone-number-input";
import { useSession } from "next-auth/react";
import OtpField from "react-otp-field";
import { useTimer } from "use-timer";
import { signIn } from "next-auth/react";
import Sheet, { SheetRef } from 'react-modal-sheet';
import { CalendarIcon, CaretSortIcon, CheckCircledIcon, CheckIcon, Cross1Icon, EnvelopeClosedIcon, FaceIcon, GearIcon, PersonIcon, RocketIcon } from "@radix-ui/react-icons";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "./ui/command";
import { cn } from "@/lib/utils";
import { Check, CheckCircle, ChevronDown, ChevronsUpDown } from "lucide-react";
import { BsPatchCheckFill } from "react-icons/bs"
import Image from "next/image";
import ExampleSheet from "./sheet";
import { Button, Cascader, Drawer, DrawerProps, Radio, Select, Space } from 'antd';
import ComboboxDemo from "./comp";
import { Input } from 'antd';
import { AiFillCheckCircle, AiOutlineInfoCircle, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { MdAlternateEmail } from "react-icons/md"
import OtpInput from 'react-otp-input';


const { Search } = Input;
const AuthModal = ({  isSheetOpen,  setSheetOpen, setaddnewAddressFormVisibility, setLocationModal, setnotValidOTPPageVisib, setaddNewAddress }: {  setaddNewAddress: any, setaddnewAddressFormVisibility: any, setLocationModal: any, setnotValidOTPPageVisib: any, setSheetOpen: any, isSheetOpen:any }) => {
    const { data: session } = useSession();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPhoneNumberValid, setPhoneNumberValidState] = useState<any>("");
    const [signInUsing, signInSet] = useState({ value: "", type: "" });
    const [isEmailValid, setEmailValidState] = useState<any>(null);
    const [otpPageVisibility, setOtpPageVisibility] = useState(false);
    const [state, setState] = useState('');
    const [countDownVisible, setCountDownVisible] = useState(false);
    const handleChange = (state: string) => setState(state);
    const [phoneNumberforOTP, setPhoneNumberforOtp] = useState('');
    // const ref = React.useRef<SheetRef>();
    const sheetRef = useRef<any>()
    const [value, setValue] = React.useState("")
    const [LoginSignUpPageVisibility, setLoginSignUpPageVisibility] = useState(true)
    const [selectedCountryData, setSelectedCountryData] = useState<any>(null)
    var addressId = session ? (session.token.addresses.length != 0 ? (session.token.addresses[session.token.addresses.length - 1]?.id) + 1 : 12345 + 1) : ""

    const { time, start, pause, reset, status } = useTimer({
        initialTime: 59,
        timerType: 'DECREMENTAL',
    });


    async function otpIsValid(otpValue: string) {
        debugger
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
                    debugger
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
        debugger
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
    // const [LoginCredential, setLogincredentials] = useState("")
    function isValidCredentials(value: string) {
        debugger
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
        debugger
        if (SetOtpVisb) {
            setLoginSignUpPageVisibility(false)
            // (document.getElementById("loginOrSignup") as HTMLInputElement).classList.add("hidden")
            setOtpPageVisibility(true);
            setState('');
            startTimer();

            sendOTPtoPhoneNo(signInUsing.value, signInUsing.type);

        }
        else {
            setLoginSignUpPageVisibility(true)
            // (document.getElementById("loginOrSignup") as HTMLInputElement).classList.remove("hidden")
            setOtpPageVisibility(false);
            stopTimer()
        }
    }

    const [countriesData, setCountriesData] = useState<any>(null)
    const [countriesSheet, setCountriesSheetVisib] = useState<boolean>(false)
    const [placement, setPlacement] = useState<DrawerProps['placement']>('bottom');
    useEffect(() => {
        fetch("https://restcountries.com/v2/region/Asia?fields=name,alpha2Code,callingCodes").then(res => res.json()).then(countriesData => {
            setCountriesData(countriesData)
            fetch("https://ipapi.co/json").then(res => res.json()).then((data: any) => {
                debugger
                const selectedCountriesDatas = countriesData.filter((countryData: any) => countryData.name === data.country_name)
                setSelectedCountryData(selectedCountriesDatas)
            }
            )
        })
    }, [])

    return (

        <>

            {/* <Sheet
                ref={ref}
                initialSnap={0}
                snapPoints={[-50, 100, 0]}
                detent="content-height"
                isOpen={isSheetOpen} onClose={() => setSheetOpen(false)}>
                <Sheet.Container className="px-4  py-2">
                    <Sheet.Header />
                    <Sheet.Content >
                        <div className=" flex justify-between border-b-2 border-muted hidden">
                            <h4 className="font-semibold text-xl items-center">Login or sign up</h4>
                            <div>
                                <Cross1Icon className="w-6 h-6" />
                            </div>
                        </div>
                        <div className=" flex justify-between border-b-2 border-muted ">
                            <h4 className="font-semibold text-xl items-center">Select a Country</h4>
                            <div>
                                <Cross1Icon className="w-6 h-6" />
                            </div>
                        </div>
                        <form className="space-y-6 hidden" action="#" >
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
                                                <label className=" block mb-2 font-medium text-gray-900 sm:text-base text-sm
 ">Enter your mobile number <span className="text-red-500">*</span></label>
                                                <div className="relative border border-gray-300 pl-3 rounded-lg">
                                                    <PhoneInput
                                                        placeholder="Enter phone number"
                                                        value={phoneNumber}
                                                        onChange={isValidCredentials}
                                                        international
                                                        defaultCountry="AE"
                                                        id="phoneInputOTP"
                                                    />
                                                    {isPhoneNumberValid ?
                                                        <div
                                                            className="absolute top-[21px] right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500"
                                                        >
                                                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                                            </svg>

                                                        </div> : ""}

                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel key="emailInput" value="email" >
                                            <div className="relative">
                                                <label className="block mb-2  font-medium text-gray-900
">Please enter your email <span className="text-red-500">*</span></label>
                                                <input onChange={isValidEmail} id="emailInput" type="text" name="email" className="text-md font-semibold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-0 focus:border-0 block w-full p-2.5" placeholder="Your Email Address" required />
                                                {isEmailValid ?
                                                    <div
                                                        className="absolute top-[60px] right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
                                                        <i className="">
                                                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                                            </svg>
                                                        </i>
                                                    </div> : ""}
                                            </div>
                                        </TabPanel>
                                    </TabsBody>
                                </Tabs>
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between mb-4">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                        </div>
                                        <div className="sm:text-sm  text-gray-500 text-xs">
                                            By continuing, I agree to the <span><a href="#" className="text-blue-500">Terms of Use</a></span> & <span><a href="#" className="text-blue-500">Privacy Policy</a></span>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" disabled={isPhoneNumberValid || isEmailValid ? false : true} onClick={() => { isValidPhoneNoInput(true) }} className={"bg-blue-500 disabled:bg-blue-300" + (" flex justify-center w-full   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ")}>
                                    <span className="mr-4 text-white">PROCEED</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </button>
                            </div>
                        </form>

                        <Command className="rounded-lg border shadow-md ">
                            <CommandInput placeholder="Type a command or search..." />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup >
                                    {countriesData ?
                                        countriesData.map((countr: any) => (
                                            <CommandItem className={`space-x-3 items-center ${CurrentCountry === countr.name ? "bg-slate-200 " : ""}`}>
                                                <Image src={countr.flags.svg} width="50" height="50" className="w-[2.5rem] h-[2.5rem] rounded-full object-cover" alt={countr.name} />
                                                <p className="text-base">{countr.name}</p>
                                                <p className="text-base font-semibold">(+{countr.callingCodes})</p>
                                            </CommandItem>
                                        ))
                                        : null}
                                </CommandGroup>
                                <CommandSeparator />
                            </CommandList>
                        </Command>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet> */}

            <Drawer
                title="Login or Signup"
                placement={placement}
                width={500}
                onClose={() => setSheetOpen(false)}
                open={isSheetOpen}
                extra={
                    <Space>

                    </Space>
                }
                className="sm:rounded-3xl rounded-b-none rounded-3xl max-w-xl mx-auto"
            >
                <div className=" flex justify-between border-b-2 border-muted hidden">
                    <h4 className=" text-xl items-center">Login or sign up</h4>
                    <div>
                        <Cross1Icon className="w-6 h-6" />
                    </div>
                </div>
                {LoginSignUpPageVisibility ?
                    <form className="sm:space-y-2 space-y-0" action="#" >
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
                                            <Space.Compact size="small" style={{ width: '100%' }}>
                                                <button onClick={(e) => {
                                                    e.preventDefault()
                                                    setCountriesSheetVisib(true)
                                                }
                                                } className="bg-slate-100 flex items-center space-x-2 rounded-l-lg px-2 py-1 border border-slate-300 border-r-0">
                                                    {selectedCountryData ? <> <Image src={`https://hatscripts.github.io/circle-flags/flags/${selectedCountryData[0].alpha2Code.toLowerCase()}.svg`} width="50" height="50" className="sm:w-8 sm:h-8 h-6 w-6" alt={countriesData[0].name} />
                                                        <h5 className="font-semibold sm:text-base text-sm">+{selectedCountryData[0].callingCodes}</h5>
                                                    </>
                                                        : null
                                                    }
                                                    <ChevronDown className="sm:w-12 sm:h-10 w-9 h-6" />
                                                </button>
                                                <Input onChange={(e) => isValidCredentials('+' + selectedCountryData[0].callingCodes + e.target.value)} className="font-semibold sm:text-lg text-base" suffix={
                                                    isPhoneNumberValid === "loading" ?
                                                        <AiOutlineLoading3Quarters className="sm:w-5 sm:h-5 h-3 w-3 text-blue-500 animate-spin" /> :
                                                        isPhoneNumberValid === "success" ?
                                                            <AiFillCheckCircle className="sm:w-6 sm:h-6 h-4 w-4 text-green-500 " />
                                                            : isPhoneNumberValid === "failed" ? <AiOutlineInfoCircle className="sm:w-6 sm:h-6 h-4 w-4 text-red-500 " />
                                                                : null
                                                } />
                                            </Space.Compact>
                                        </div>
                                    </TabPanel>
                                    <TabPanel key="emailInput" value="email" >
                                        {/* <div className="relative">
                                        <label className="block mb-2  font-medium text-gray-900
">Please enter your email <span className="text-red-500">*</span></label>
                                        <input onChange={isValidEmail} id="emailInput" type="text" name="email" className="text-md font-semibold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-0 focus:border-0 block w-full p-2.5" placeholder="Your Email Address" required />
                                        {isEmailValid ?
                                            <div
                                                className="absolute top-[60px] right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
                                                <i className="">
                                                    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                                    </svg>
                                                </i>
                                            </div> : ""}
                                    </div> */}
                                        <div>
                                            <label className=" block mb-2 font-medium text-gray-900 sm:text-lg text-sm">Enter your Email Address <span className="text-red-500">*</span></label>
                                            <Space.Compact size="large" style={{ width: '100%' }}>
                                                <Input suffix={
                                                    isEmailValid === "loading" ?
                                                        <AiOutlineLoading3Quarters className="sm:w-5 sm:h-5 h-3 w-3 text-blue-500 animate-spin" /> :
                                                        isEmailValid === "success" ?
                                                            <AiFillCheckCircle className="sm:w-6 sm:h-6 h-4 w-4 text-green-500 " />
                                                            : isEmailValid === "failed" ? <AiOutlineInfoCircle className="sm:w-6 sm:h-6 h-4 w-4 text-red-500 " />
                                                                : null
                                                } onChange={(e) => { isValidEmail(e.target.value) }} className="font-semibold sm:text-lg text-sm w-full  sm:py-2 py-1" prefix={
                                                    <MdAlternateEmail className="sm:w-6 sm:h-6 h-5 w-5 text-slate-400" />
                                                } />
                                            </Space.Compact>
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
                            <Button disabled={isPhoneNumberValid === "success" || isEmailValid === "success" ? false : true} block={true} size="large" type="primary" className="bg-blue-500 text-white disabled:bg-blue-200 sm:text-base !text-xs" onClick={() => { isValidPhoneNoInput(true) }} >
                                <span className="mr-4 text-white">PROCEED</span>
                            </Button>
                        </div>
                    </form>
                    : null}
                {otpPageVisibility ?
                    <div className="py-1" id="otpPage">
                        <h3 className="mb-3 text-xl text-blue-500 ">OTP Code</h3>
                        <label className="block mb-2 font-medium text-gray-900 sm:text-base text-xs">Please check your {signInUsing.type} and enter the OTP code  <span className="text-red-500">*</span></label>

                        <form className="space-y-6" action="#" >

                            <OtpInput
                                value={state}
                                onChange={handleChange}
                                containerStyle={{ display: "flex", justifyContent: "space-between", width: "80%", marginLeft: "auto", marginRight: "auto" }}
                                numInputs={4}
                                inputStyle={{ width: "100%", fontSize: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
                                renderSeparator={<span className="w-[0.5rem] mx-auto"> - </span>}
                                renderInput={(props: any) => <Input  {...props} />}
                            />
                            <div className="sm:text-sm text-[10px]">
                                {countDownVisible ? <div className=" text-gray-500 flex justify-between" id="seconds-count">
                                    <p>Didn't Receive Code?</p> <p className="">Request again in {time >= 0 ? time : stopTimer()} seconds</p>
                                </div> : <button onClick={() => { isValidPhoneNoInput(true) }} type="button" className="bg-white hover:bg-blue-600 px-3 sm:py-2 py-1 rounded-lg border text-blue-500 border-blue-500  hover:text-white text-[10px] tracking-widest" >RESEND OTP</button>
                                }
                            </div>
                            <div className="flex space-x-3">
                                <Button size="large" type="default" onClick={() => { isValidPhoneNoInput(false) }} className="sm:text-base !text-xs" >
                                    Back
                                </Button>
                                <Button size="large" block type="primary" onClick={(e) => {
                                    e.preventDefault()
                                    otpIsValid(state)
                                }} disabled={state.length === 4 ? false : true} className="bg-blue-500 text-white disabled:bg-blue-200 sm:text-base !text-xs">
                                    <span className="mr-4 text-white ">PROCEED</span>
                                </Button>
                            </div>
                        </form>
                    </div> : null}
            </Drawer>

            <Drawer
                title="Select a Country"
                placement={placement}
                width={500}
                onClose={() => setCountriesSheetVisib(false)}
                open={countriesSheet}
                extra={
                    <Space>

                    </Space>
                }
                className="sm:rounded-3xl rounded-b-none rounded-3xl max-w-xl mx-auto"
            >
                <Command className="rounded-lg border shadow-md ">
                    <CommandInput placeholder="Search for Countries..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup >
                            {selectedCountryData ?
                                <CommandItem>
                                    <button className="space-x-3 items-center bg-green-100 flex justify-between  px-2 pr-5 py-1.5 w-full" onClick={() => { setCountriesSheetVisib(false) }}>
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
                                            setCountriesSheetVisib(false)
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

            </Drawer>

            {/* <ModalContainer showModal={showModal} setCloseModal={setCloseModal}>
                <Dialog.Panel className="w-full sm:max-w-lg max-w-xs transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div id="loginOrSignup">
                        <Dialog.Title
                            as="h3"
                            className="sm:text-2xl font-bold text-blue-500 mb-3"
                        >
                            <h3>Login Or SignUp</h3>
                        </Dialog.Title>

                        <form className="space-y-6" action="#" >
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
                                                <label className=" block mb-2 font-medium text-gray-900 sm:text-base text-sm">Enter your mobile number <span className="text-red-500">*</span></label>
                                                <div className="relative border border-gray-300 pl-3 rounded-lg">
                                                    <PhoneInput
                                                        placeholder="Enter phone number"
                                                        value={phoneNumber}
                                                        onChange={isValidCredentials}
                                                        international
                                                        defaultCountry="AE"
                                                        id="phoneInputOTP"
                                                    />
                                                    {isPhoneNumberValid ?
                                                        <div
                                                            className="absolute top-[21px] right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500"
                                                        >
                                                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                                            </svg>

                                                        </div> : ""}
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel key="emailInput" value="email" >
                                            <div className="relative">
                                                <label className="block mb-2  font-medium text-gray-900">Please enter your email <span className="text-red-500">*</span></label>
                                                <input onChange={isValidEmail} id="emailInput" type="text" name="email" className="text-md font-semibold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-0 focus:border-0 block w-full p-2.5" placeholder="Your Email Address" required />
                                                {isEmailValid ?
                                                    <div
                                                        className="absolute top-[60px] right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
                                                        <i className="">
                                                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                                            </svg>
                                                        </i>
                                                    </div> : ""}
                                            </div>
                                        </TabPanel>
                                    </TabsBody>
                                </Tabs>
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between mb-4">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                        </div>
                                        <div className="sm:text-sm  text-gray-500 text-xs">
                                            By continuing, I agree to the <span><a href="#" className="text-blue-500">Terms of Use</a></span> & <span><a href="#" className="text-blue-500">Privacy Policy</a></span>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" disabled={isPhoneNumberValid || isEmailValid ? false : true} onClick={() => { isValidPhoneNoInput(true) }} className={"bg-blue-500 disabled:bg-blue-300" + (" flex justify-center w-full   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ")}>
                                    <span className="mr-4 text-white">PROCEED</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                    {otpPageVisibility ?

                        <div className="" id="otpPage">
                            <h3 className="mb-3 text-2xl font-bold text-blue-500 ">OTP Code</h3>
                            <label className="block mb-2 font-medium text-gray-900">Please check your {signInUsing} and enter the OTP code  <span className="text-red-500">*</span></label>

                            <form className="space-y-6" action="#" >
                                <OtpField
                                    value={state}
                                    onChange={handleChange}
                                    numInputs={4}
                                    classNames={"flex justify-center "}
                                    inputProps={{ className: 'sm:!w-[90px] w-[60px]  mr-5 text-3xl text-center font-bold h-[60px] border-blue-400 focus:ring-0 border-b-4 border-t-0 border-x-0 bg-transparent' }}
                                />

                                <div className="mx-3">
                                    {countDownVisible ? <div className="text-sm  text-gray-500 flex justify-between" id="seconds-count">
                                        <p>Didn't Receive Code?</p> <div className="">Request again in {time >= 0 ? time : stopTimer()} seconds</div>
                                    </div> : <button onClick={() => { isValidPhoneNoInput(true) }} type="button" className="bg-white hover:bg-blue-600 px-3 py-2 rounded-lg border text-blue-500 border-blue-500  hover:text-white text-xs tracking-widest" >RESEND OTP</button>
                                    }
                                </div>
                                <div className="flex space-x-3">
                                    <button onClick={() => { isValidPhoneNoInput(false) }} className="bg-white border border-gray-600  justify-center w-1/2 flex items-center focus:bg-black active:text-white focus:text-white hover:bg-gray-700  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                        </svg>
                                        <span className="ml-4">Back</span>
                                    </button>
                                    <button type="button" onClick={(e) => {
                                        e.preventDefault()
                                        otpIsValid(state)
                                    }} disabled={state.length === 4 ? false : true} className={" disabled:bg-blue-300 bg-blue-500  items-center flex justify-center w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "}>
                                        <span className="mr-4 text-white ">PROCEED</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div> : null}
                </Dialog.Panel>
            </ModalContainer> */}
        </>
    )


}

export default AuthModal