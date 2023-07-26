import Image from "next/image";
import { useEffect } from "react";
import { useState, Fragment } from "react";
import 'react-phone-number-input/style.css';
import { useSession } from "next-auth/react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useRouter } from "next/router";
import React, { FC } from 'react'

import { SmSearchBoxModal } from "./sm-searchbox-modal";
import SmMenu from "./sm-menu";
import { useLanguage } from "@/hooks/useLanguage";
import LgNavbar from "./lg-navbar";
import SmNavbarTop from "./sm-navbar-top";
import getSearchDataSuggestions from "@/lib/getSearchData";
import NavbarBottom from "./lg-navbar-top";
import dynamic from 'next/dynamic'
import { setModalVisibility } from "@/hooks/useOutsideClick";

const LgNavbarMenu = dynamic(() => import('./lg-navbar-menu'), {
  ssr: false,
})

const LanguageChangeModal = dynamic(() => import('./language-change-modal'), {
  ssr: false,
})
const LocationModal = dynamic(() => import('./location-modal'), {
  ssr: false,
})
const AuthModal = dynamic(() => import('./authorixzation-modal'), {
  ssr: false,
})
const InvalidOTPModal = dynamic(() => import('./invalid-otp-modal'), {
  ssr: false,
})
const AddressModal = dynamic(() => import('./address-modal'), {
  ssr: false,
})

interface navbarProps {
  data: any,
  brands_data: any,
  isArabic: boolean,
  lang: string
}

const Navbar: FC<navbarProps> = ({ data, brands_data, isArabic, lang }) => {

  const { t, countries, languages } = useLanguage()

  //-----------------------------hooks-------------------------------------
  const { data: session } = useSession()

  const { locale } = useLanguage()
  const [signInUsing, signInSet] = useState("");
  const [isPhoneNumberValid, setPhoneNumberValidState] = useState(false);
  const [showElement, setShowElement] = useState(false);
  const [overlayVisible, setOverlay] = useState(false);
  const [searchClosebtn, setVisibility] = useState(false);
  const [addNewAddressClick, setAddNewAddressClick] = useState(false);
  // const [showNavbarAcc, setShowNavbarAcc] = useState(false);
  const [languageModal, setLanguageModal] = useState(false)
  const [smScreenSearchBox, setSmScreenSearchBox] = useState(false)
  const [SearchLoadingState, setSearchLoadingState] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTimer, setSearchTimer] = useState<any>(null)
  const [queryData, setQueryData] = useState("")

  //setModalVisibility
  const {
    locationModalState,
    setLocationModalState,
    setSheetOpen,
    setaddNewAddress,
    setaddnewAddressFormVisibility,
    setnotValidOTPPageVisib,
    isSheetOpen,
    locationModal,
    setLocationModal,
    notValidOTPPageVisib,
    setAddressDataIndex,
    AddressDataIndex,
    addNewAddress,
    availableAddresses,
    setavailableAddresses } = setModalVisibility();

  const [searchData, setData] = useState({
    results: [
      {
        hits: [
          {
            title: "",
            images: {
              featured_image: "https://www.life-me.com/wp-content/themes/LifePharmacy/assets/images/life-pharmacy-logo-white.png"
            },
            query: "",
            slug: ""
          }
        ]
      },

    ]
  })


  //default-address
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
    area: "Satwa",
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

  const router = useRouter();

  //-----------------------------hooks-------------------------------------

  useEffect(() => {
    if (!showDropdown) return;
    function handleClick(event: any) {
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);


  const searchSuggestions = (searchData: string, isMobile: boolean, type: string) => {
    debugger
    if (isMobile) {
      setSmScreenSearchBox(false)
    }
    else {
      searchButtonOnClick(false)
    }
    if (type === "search") {
      router.push(`/search?term=${searchData}`)
    }
    else {
      router.push(`/product/${searchData}`)
    }
  }

  function isValidCredentials(value: string) {
    if (value != null) {
      if (isValidPhoneNumber(value)) {
        setPhoneNumberValidState(true);
        setFormData({ ...formData, phone: value });
        signInSet("Phone");
      }
      else {
        setPhoneNumberValidState(false);
      }
    }
  }

  const searchButtonOnClick = (isOpen: boolean) => {
    if (window.innerWidth > 767) {
      const lgScreenSearchBox = document.getElementById("lg-screen-search") as HTMLInputElement

      if (isOpen) {
        // document.getElementsByClassName("lg-screen-searchsuggestion-lg")[0].classList.remove("hidden");
        lgScreenSearchBox.classList.remove("rounded-full");
        lgScreenSearchBox.classList.add("rounded-b-none", "rounded-3xl");
      }
    }
    else {
      setSmScreenSearchBox(true)
    }
    searchButtonOnMouseEnter(queryData)
  }

  const searchBoxClear = () => {
    (document.getElementById("sm-searchbox") as HTMLInputElement).value = ""
    setQueryData("")
    searchButtonOnMouseEnter("",)
    setVisibility(false);
  }
  function searchButtonOnMouseEnter(query: string) {
    setQueryData(query)

    clearTimeout(searchTimer)

    const newTimer = setTimeout(() => {
      getSearchData(query)
    }, 600)

    setSearchTimer(newTimer)

    if (query != "") {
      setVisibility(true);
    }
    else {
      setVisibility(false);
    }
  }

  const getSearchData = (query: string) => {
    setSearchLoadingState(true)
    getSearchDataSuggestions(query).then(res => {
      setData(res)
      setSearchLoadingState(false)
    })
  }

  var addressId = session ? (session.token.addresses.length != 0 ? (session.token.addresses[session.token.addresses.length - 1]?.id) + 1 : 12345 + 1) : ""

  const formDatahandleChange = (e: any): void => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const locationOnClickHandle = () => {
    debugger
    if (session != null) {
      setaddNewAddress(true)

      if (session.token.addresses.length > 0) {
        setavailableAddresses(true)
      }
      else if (session.token.addresses.length === 0) {
        setAddNewAddressClick(true)
      }
    }
    else {
      setLocationModalState(true);
    }
  }

  const setModalState = (modalState: any) => {
    setLanguageModal(modalState)
  }

  const parts = locale ? locale?.split("-") : ["ae", "en"]
  return (

    <>

      <div className="sticky top-0 z-50 bg-white mx-auto">
        <SmNavbarTop />
        <div className="md:bg-[#002579] bg-white  backdrop-blur backdrop-filter ">
          <LgNavbar setSheetOpen={setSheetOpen} searchData={searchData} SearchLoadingState={SearchLoadingState} queryData={queryData} isArabic={isArabic} searchSuggestions={searchSuggestions} searchButtonOnMouseEnter={searchButtonOnMouseEnter} setLanguageModal={setLanguageModal} setLocationModal={setLocationModal} searchButtonOnClick={searchButtonOnClick}>
            <input type="button" onClick={() => {
              setSmScreenSearchBox(true)
            }} className={`cursor-pointer md:hidden block bg-gray-50 border border-slate-300 text-[#9ba0b1] text-sm rounded-lg focus:ring-0 w-full ${isArabic ? "text-right pr-12" : "pl-10 text-left"}  p-3  rounded-full`}
              value={t.navbar.searchbox_text} />
          </LgNavbar>
          <NavbarBottom locationOnClickHandle={locationOnClickHandle} AddressDataIndex={AddressDataIndex} />
          {/* <LgNavbarMenu setOverlay={setOverlay} data={data} brands_data={brands_data} /> */}
          <LgNavbarMenu data={data} setOverlay={setOverlay} brands_data={brands_data} />
        </div>
      </div>

      {/* modals */}
      <LocationModal showModal={locationModalState} setCloseModal={setLocationModalState} />

      <AuthModal setSheetOpen={setSheetOpen} isSheetOpen={isSheetOpen} showModal={locationModal} setCloseModal={setLocationModal} setaddNewAddress={setaddNewAddress} setaddnewAddressFormVisibility={setaddnewAddressFormVisibility} setLocationModal={setLocationModal} setnotValidOTPPageVisib={setnotValidOTPPageVisib} />

      <InvalidOTPModal showModal={notValidOTPPageVisib} setCloseModal={setnotValidOTPPageVisib} />

      <AddressModal setaddNewAddress={setaddNewAddress} session={session} formData={formData} isValidCredentials={isValidCredentials}
        isPhoneNumberValid={isPhoneNumberValid} availableAddresses={availableAddresses}
        setavailableAddresses={setavailableAddresses} showModal={session && addNewAddress ? true : false}
        AddressDataIndex={AddressDataIndex} formDatahandleChange={formDatahandleChange} setAddressDataIndex={setAddressDataIndex} />

      <LanguageChangeModal setModalState={setModalState} modalState={languageModal} currentLanguage={parts[1] === "ar" ? languages[0] : languages[1]} currentCountry={parts[0] === "sa" ? countries[1] : countries[0]} countries={countries} languages={languages} lang={parts} />

      <SmSearchBoxModal showModal={smScreenSearchBox} setCloseModal={setSmScreenSearchBox} isArabic={isArabic} queryData={queryData} setQueryData={setQueryData} searchButtonOnMouseEnter={searchButtonOnMouseEnter} SearchLoadingState={SearchLoadingState} searchData={searchData} searchBoxClear={searchBoxClear} searchSuggestions={searchSuggestions} searchClosebtn={searchClosebtn} />

      <SmMenu searchButtonOnClick={searchButtonOnClick} setSmScreenSearchBox={setSmScreenSearchBox} isSheetOpen={isSheetOpen} setSheetOpen={setSheetOpen} />

      {
        overlayVisible ? <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-10" />
          : null
      }

      <button className="fixed bottom-7 right-7 z-50 bg-[#2000F0] text-white p-3 rounded-full sm:block hidden">
        <svg color="inherit" viewBox="0 0 32 32" className="w-8 h-8"><path fill="#FFFFFF" d="M12.63,26.46H8.83a6.61,6.61,0,0,1-6.65-6.07,89.05,89.05,0,0,1,0-11.2A6.5,6.5,0,0,1,8.23,3.25a121.62,121.62,0,0,1,15.51,0A6.51,6.51,0,0,1,29.8,9.19a77.53,77.53,0,0,1,0,11.2,6.61,6.61,0,0,1-6.66,6.07H19.48L12.63,31V26.46"></path><path fill="#2000F0" d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z" className="w-10 h-10"></path></svg>
      </button>


    </>
  );
};

export default Navbar; 