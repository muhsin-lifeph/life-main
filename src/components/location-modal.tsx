import { Dialog, Transition, RadioGroup, Listbox } from "@headlessui/react";
import { Fragment, useState } from "react"
import ModalContainer from "./ui/modal-container";
import { Button } from "./ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";

const LocationModal = ({ showModal, setCloseModal }: { showModal: boolean, setCloseModal: any}) => {
    return (
        <ModalContainer showModal={showModal} setCloseModal={setCloseModal} >
            <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between rounded-t ">
                    <button type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  "
                        data-modal-hide="medium-modal">
                        <button onClick={() => setCloseModal(false)}>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </button>
                </div>
                <div className="p-6 sm:space-y-6 space-y-5">
                    <h3 className="sm:text-lg font-medium text-blue-400  text-center">
                        Where do you want the delivery?
                    </h3>
                    <p className="sm:text-sm leading-relaxed text-gray-500  text-center text-xs">
                        By knowing your area, we will be able to provide instant delivery from the nearest Life
                        store around you! </p>
                    <button className="ml-auto bg-blue-400 p-3 text-white rounded-xl w-full">Detect My Location</button>
                    <h3 className=" font-medium  text-center">
                        OR
                    </h3>
                    <div className="flex">
                        <select id="states"
                            className=" flex-shrink-0 rounded-l-lg bg-gray-50 text-gray-900 text-sm  block  sm:p-2.5   ">
                            <option selected>Ship To</option>
                            <option value="CA">UAE</option>
                            <option value="TX">KSA</option>
                        </select>
                        <label htmlFor="states" className="sr-only">Type Location</label>
                        <input type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 border-l-2  block w-full p-2.5     " placeholder="Type a Location" />
                    </div>
                    <a href="#"><h3 className=" font-medium text-blue-400  text-center underline sm:mt-16 mt-4" onClick={() => {
                      
                        setCloseModal(false)
                    }
                    }>
                        Or Login Now
                    </h3></a>
                    <p className="sm:text-sm leading-relaxed text-gray-500  text-center text-xs">
                        Get access to My Address, Orders & Prescriptions in your profile section.
                    </p>
                </div>
            </div>
        </ModalContainer>
    )
}

export const PaymentMethodModal = ({ newCardSelected, showModal, setCloseModal, setNewCardSelectedState }: { newCardSelected:boolean, showModal: any, setCloseModal: any, setNewCardSelectedState:any }) => {
 
   
    return (
        <ModalContainer size={"sm"} showModal={showModal} setCloseModal={setCloseModal} >
            <div className=" space-y-3">
                <div className="flex justify-between">
                    <h5 className="text-life font-semibold">Select Payment Method</h5>
                    <button onClick={() => { setCloseModal(false) }}>
                        <Cross1Icon />
                    </button>
                </div>
                <button onClick={()=>setNewCardSelectedState(!newCardSelected)}  className="flex space-x-4 py-2 w-full">
                    <input checked={newCardSelected} type="radio" name="payment_method" id="method-1" />
                    <img src="https://www.lifepharmacy.com/images/card.svg" height={30} width={30} />
                    <p className="text-sm">Pay with New Card</p>
                </button>
                <Button onClick={()=>setCloseModal(false)} disableBtn={!newCardSelected} className="text-xs w-full">SELECT AND CONTINUE</Button>
            </div>
        </ModalContainer>
    )
}

export default LocationModal


