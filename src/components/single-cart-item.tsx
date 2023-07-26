import { useCartActions } from "@/hooks/useCartActions";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { Button } from "./ui/button";
import { BsPlus, BsTrash } from "react-icons/bs";
import { SlRefresh } from "react-icons/sl";
import { MinusIcon } from "lucide-react";

const SingleCartItem = ({ item }: { item: any }) => {

    const cartItems = useSelector((state: RootState) => state.cart);
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const [addedToCartClicked, addedToCartState] = useState(false)
    const [cartItemsUpdateTimeoutState, setCartItemsUpdateAddTimeout] = useState<any>(null)

    const cartItemsData = cartItems.cart.cart_data ? cartItems.cart.cart_data.items : []
    const [proQty, setProQty] = useState<any>(0)
    const { createCart, updateCart } = useCartActions();

    const getProductQuantity = (productId: any) => {
        const productItem = cartItemsData?.find((item: any) => item.items[0].id === productId ? item.items[0].qty : null);
        return productItem ? productItem.items[0].qty : 0;
    };
    const itemExists = () => {
        return cartItemsData?.some((itemData: any) => itemData.items[0].id === item.id)

    }

    const cartInit: any = {
        action: "",
        data: {
            items: [
                // {
                //     id: "a6c1a3e7-caea-4845-94ca-a49de40f18c0",
                //     qty: 1
                // }
            ],
            address_id: null
        }
    }

    const OfferType = (offer_type: string, offerValue: number) => {
        switch (offer_type) {
            case "flat_percentage_discount":
                return `FLAT ${offerValue}% OFF`
            default:
                return ""
        }
    }

    useEffect(() => {
        setProQty(getProductQuantity(item.id))
    }, [])

    const clearCartState = () => {
        cartInit.data.items = []
        cartInit.action = ""
    }
    const updateCartQuantity = (updatedQty: number) => {
        debugger
        setProQty(updatedQty)

        setLoadingState(true)
        addedToCartState(true);

        clearTimeout(cartItemsUpdateTimeoutState)

        const timeout = setTimeout(() => {
            debugger
            cartInit.data.items.push({ id: item.id, qty: updatedQty })
            updateCart(cartInit)
            setTimeout(()=>{
            setLoadingState(false)

            }, 2000)

            clearCartState()
        }, 800)

        setCartItemsUpdateAddTimeout(timeout)
        toast.success(`Item Added to the cart`);
    }

    return (
        (proQty > 0 && itemExists()) ?

            <div className="rounded-lg border border-muted my-3 relative bg-white shadow-md shadow-slate-200">
                <div className="flex p-3 space-x-4">
                    <div className="max-h-[10rem]">
                        <Image src={item.featured_image ? item.featured_image : "/images/default-product-image.png"} height={150} width={150} className=" border border-muted rounded-lg " alt="pro_Image" />
                    </div>
                    <div className="rounded-lg flex-col flex-grow justify-between flex ">
                        <p className=" xl:text-lg lg:text-base sm:text-sm text-xs">{item.title}</p>
                        {item.offers ?
                            <div className="bg-amber-200 w-fit text-sm px-2 border-orange-400 border p-1 rounded">{OfferType(item.offers.type, item.offers.value)}</div> : null}
                        <div className="flex space-x-3 items-center">
                            {item.prices[0].price.offer_price ? <div className="text-red-500"><span className="text-xs">AED</span> {item.prices[0].price.offer_price}</div> : null}

                            <div className="text-blue-500 text-sm line-through"><span className="text-xs"></span> {item.prices[0].price.regular_price}</div>

                        </div>
                    </div>
                </div>
                <div className="absolute bottom-2 right-2 flex h-7 items-center">
                    {/* <button
                    onClick={() => {
                        updateCartQuantity(proQty - 1)
                        toast.info(`Cart successfully updated`);
                    }} className="border border-muted bg-white px-1 w-[2rem]">
                    <Image src="https://www.lifepharmacy.com/images/trash.svg" height="15" width="15" alt="trash" className="h-5 mx-auto  w-4" />
                </button>
                <div className="px-2 text-center my-auto"><span>{getProductQuantity(item.id)}</span></div>
                <button
                    onClick={() => {
                        updateCartQuantity(proQty + 1)
                        toast.info(`Cart successfully updated`);
                    }} className="bg-[#39f] m-[0.5px] w-[2rem] ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{1.5}" stroke="white" className="h-4 w-5 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button> */}
                    <Button
                        onClick={() => {
                            updateCartQuantity(proQty - 1)
                        }}
                        variant={'ghost'} className=' !px-1 h-fit'>
                        {proQty > 1 ?
                            <MinusIcon className='w-4 h-3' />
                            :
                            <BsTrash className='w-4 h-3' />
                        }
                    </Button>
                    <button className='px-3'>

                        <span className='text-sm'>{proQty}</span>

                    </button>
                    <Button disableBtn={loadingState}
                        onClick={() => {
                            debugger
                            updateCartQuantity(proQty + 1)
                        }}
                        className='bg-primary text-white rounded-sm !px-1.5 h-fit'>
                        {/* <BsPlus className='w-4 h-3' /> */}
                        {!loadingState ?
                            <BsPlus className='w-4 h-3' />
                            : <SlRefresh className='text-white animate-spin' />
                        }
                    </Button>

                </div>

            </div> : null
    )
}

export default SingleCartItem