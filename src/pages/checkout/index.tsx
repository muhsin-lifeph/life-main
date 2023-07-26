import { DeliverInstructionsBtn } from "@/components/Button";
import AuthModal from "@/components/authorixzation-modal";
import { PaymentMethodModal } from "@/components/location-modal";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setModalVisibility } from "@/hooks/useOutsideClick";
import { RootState } from "@/redux/store";
import { ChevronDown, InfoIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { useSelector } from "react-redux";

export default function Checkout({ }) {
    const [domLoaded, setDomLoaded] = useState(false);
    const [paymentMethodModalState, setPaymentMethodModalState] = useState(false);
    const [newCardSelected, setNewCardSelectedState] = useState(false);
    const [btnLoadingState, setBtnLoadingState] = useState(false);
    const { data: session } = useSession()
    useEffect(() => {
        setDomLoaded(true)
    }, [])

    const cartItems = useSelector((state: RootState) => state.cart);
    const selectedAddress = session?.token.addresses[0]
    const cartItemsData = cartItems.cart.cart_data ? cartItems.cart.cart_data.items : []
    const shipmentData = cartItems.cart.shipment_data ? cartItems.cart.shipment_data[0] : []
    const cartSummery = cartItems.cart.cart_summary

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
    return (
        domLoaded ?
            <div className="grid grid-cols-12 gap-x-3 px-[10px] py-5 max-w-[1440px] mx-auto">
                <div className="space-y-3 md:col-span-8 col-span-full">
                    <div className="shadow-md rounded-lg p-1 border-2 border-muted">
                        <div className="bg-blue-400 text-white flex justify-between rounded-full px-5 py-1">
                            <div className="flex space-x-2 items-center">
                                <MdLocationPin />
                                <span className="text-sm">DELIVER TO</span>
                            </div>
                            <button className="bg-blue-800 text-sm h-fit my-auto px-2  rounded-full"><small>CHANGE</small> </button>
                        </div>
                        {session ?
                            <div className="p-2">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="px-3">
                                                <small className="">NAME:</small>
                                            </td>
                                            <td>
                                                <small className="text-life">{selectedAddress?.name}</small>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-3">
                                                <small className="">ADDRESS:</small>
                                            </td>
                                            <td>
                                                <small className="text-life">{selectedAddress?.google_address}</small>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-3">
                                                <small className="">PHONE:</small>
                                            </td>
                                            <td>
                                                <small className="text-life">{selectedAddress?.phone}</small>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> : null}

                    </div>
                    <h5 className="text-life mb-2 font-semibold text-lg">Delivery Options</h5>

                    <div className="shadow-md rounded-lg p-2 border-2 border-muted">

                        <div className="bg-violet-200 text-white flex justify-between rounded-full px-5 py-1">
                            <div className="flex space-x-2 items-center">
                                <InfoIcon className="w-4 h-4 text-slate-700" />
                                <small className="text-sm text-life">Delivery From: {shipmentData.store_code}</small>
                            </div>
                            <small className="text-life">Shipment 1</small>
                        </div>

                        <div className="py-5">
                            <div className="flex space-x-3 overflow-x-auto scrollbar-thin pb-2">
                                {cartItemsData.map((cartData: any) => (
                                    <div className="min-h-[70px] min-w-[70px] relative border-2 border-muted rounded-lg">
                                        <Image src={cartData.items[0].featured_image ? cartData.items[0].featured_image : "/images/default-product-image.png"} alt="pro-img" height="50" width="50" className="h-full w-full" />
                                        <div className="absolute -right-2 -bottom-2 rounded-full bg-primary text-white px-2 text-sm">x <small>{cartData.items[0].qty}</small></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="divide-gray-300 divide-y border-gray-300 border rounded-lg">
                            {shipmentData.available_slots.map((avSlot: any, indx: number) =>
                                <label htmlFor={`delivery_slot-${indx}`} className={`cursor-pointer flex justify-between items-center  bg-slate-200 px-5 py-3 ${indx % 2 === 0 ? "rounded-t-lg" : "rounded-b-lg"}`}>
                                    <div className="flex space-x-4 items-center">
                                        <input defaultChecked={indx === 0} type="radio" name="delivery_slots" id={`delivery_slot-${indx}`} />

                                        <Image src="https://www.lifepharmacy.com/images/standard-icon.svg" height={40} width={40} alt="standard-icon" />

                                        <span className="text-sm">{avSlot.title}</span>
                                    </div>
                                    <p className="text-sm">
                                        <small>{avSlot.subtitle}</small>
                                    </p>
                                </label>)}
                        </div>

                    </div>



                </div>
                <div className="space-y-4 md:col-span-4 col-span-full">
                    <div className="shadow-md rounded-lg">
                        <div className="border-muted border p-3">
                            <span className="text-base text-life"><small>HAVE A COUPON</small> </span>

                            <Input placeholder="Enter Coupon Code" className="rounded-r-none border-dashed !text-base font-normal" type="text" buttonRight={
                                <span>Apply</span>
                            } buttonLeftClassName={buttonVariants({ variant: 'default' })} />
                        </div>
                    </div>
                    <div className="shadow-md rounded-lg border-muted border p-3 space-y-4">
                        <div>
                            <span className="text-base text-life"><small>DELIVER INSTRUCTIONS</small> </span>
                            <div className="grid lg:grid-cols-4 grid-cols-2 gap-x-2">
                                {cartItems.cart.delivery_instructions.map((instr: any) => (
                                    <DeliverInstructionsBtn instr={instr} />
                                )
                                )}
                            </div>
                        </div>

                        <Input placeholder="Add a note" className=" border-t-0 border-x-0 rounded-none font-normal !text-sm" buttonLeft={
                            <Image src={"https://www.lifepharmacy.com/images/notes.svg"} alt="note" width={50} height={50} />
                        } buttonLeftClassName="bg-white" />


                    </div>
                    <div className='border-2 border-muted h-fit flex p-2 rounded-lg shadow-sm mb-3 items-center'>
                        <div className='mr-2'>
                            <Image src={"https://www.lifepharmacy.com/images/return.svg"} height={35} width={35} alt={"delivery"} />
                        </div>
                        <div className='p-1'>
                            <p className='text-life  text-xs font-semibold'> RETURN POLICY</p>
                            <p className='text-[10px]'>Orders once placed can't be returned or exchanged <span><a className='text-blue-500'>Learn More</a></span> </p>
                        </div>
                    </div>
                    <div className='border-2 border-muted h-fit  p-3 rounded-lg shadow-md text-life  text-xs'>
                        <h1 className='mb-2 font-semibold'>ORDER SUMMARY</h1>
                        <div className='space-y-1'>
                            <div className='flex justify-between'>
                                <p>Order Total</p>
                                <p>AED {cartSummery.sub_total}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Items Discount</p>
                                <p>- AED {cartSummery.item_discount}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Estimated VAT %</p>
                                <p>AED {cartSummery.vat}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Shipping <span><a href="#" className='text-blue-500'><small> Know More</small></a></span></p>
                                {cartSummery.shipping_fee != 0 ?
                                    <p>{cartSummery.shipping_fee}</p> : null}
                                <p> FREE ABOVE 29 AED</p>
                            </div>
                        </div>
                        <div className='bg-slate-100 w-10/12 mx-auto h-[1px] my-2 '></div>
                        <div className='space-y-3'>
                            <div className='flex justify-between py-2 '>
                                <p> <span className='text-life'><b>Total Amount</b></span> (Inclusive of VAT)</p>
                                <p className='text-blue-500 font-semibold'>{cartSummery.total}</p>
                            </div>
                        </div>
                    </div>
                    <div className="border border-blue-600 rounded-lg px-3 py-2">
                        <div className="flex space-x-2 px-2 bg-white -mt-4 w-fit">
                            <small className="text-xs">PAYING WITH</small>
                            <img src="https://www.lifepharmacy.com/images/card.svg" height={20} width={20} />
                        </div>
                        {newCardSelected ?

                            <div className="flex justify-between items-center">
                                <p className="text-sm">New Credit or Debit Card</p>
                                <u onClick={() => setPaymentMethodModalState(true)} className="text-blue-500 flex space-x-1 p-2 items-center cursor-pointer">
                                    <small>CHANGE</small>
                                    <ChevronDown className="w-4 h-4" />
                                </u>
                            </div>
                            :
                            <u onClick={() => setPaymentMethodModalState(true)} className="text-blue-500 flex space-x-1 p-2 items-center cursor-pointer">
                                <small>Choose Payment Method</small>
                                <ChevronDown className="w-4 h-4" />
                            </u>

                        }

                    </div>
                    <div className="sm:flex block sm:space-x-2 space-y-2">
                        <div className="border border-blue-600 rounded-lg px-3 py-2 w-full">
                            <div className="px-2 bg-white -mt-5 w-fit">
                                <small className="text-xs">TOTAL PAYABLE</small>
                            </div>
                            <span className="text-blue-500 text-sm">
                                AED {cartSummery.total}
                            </span>
                        </div>
                        <Button onClick={() => setBtnLoadingState(true)} isLoading={btnLoadingState} size={"lg"} disableBtn={!newCardSelected} className="w-full text-sm" >PLACE ORDER </Button>
                    </div>

                </div>
                
                {!session ?
                    <AuthModal setSheetOpen={setSheetOpen} isSheetOpen={true} showModal={locationModal} setCloseModal={setLocationModal} setaddNewAddress={setaddNewAddress} setaddnewAddressFormVisibility={setaddnewAddressFormVisibility} setLocationModal={setLocationModal} setnotValidOTPPageVisib={setnotValidOTPPageVisib} /> : null}
                <PaymentMethodModal newCardSelected={newCardSelected} setNewCardSelectedState={setNewCardSelectedState} showModal={paymentMethodModalState} setCloseModal={setPaymentMethodModalState} />
            </div>
            : <></>
    )
}

