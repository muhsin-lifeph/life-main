import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import Image from "next/image"
import { Cross1Icon } from "@radix-ui/react-icons"
import { useDispatch } from "react-redux";
// import { removeFromCart } from "../redux/cart.slice";
import { toast } from 'react-toastify';
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion"
import { useCartActions } from "@/hooks/useCartActions";
import { SlRefresh } from "react-icons/sl";
export function CommandDemo({ cartItems, children }: { cartItems: any, children: any }) {

    return (
        <Command className="rounded-lg  bg-white p-1">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Cart Items" className="">
                    {cartItems.map((cartItem: any) => (

                        <CartItem cartItem={cartItem} />

                    ))}
                </CommandGroup>
            </CommandList>
            {children}
        </Command>
    )
}



const CartItem = ({ cartItem }: { cartItem: any }) => {
    // const dispatch = useDispatch();
    const { updateCart } = useCartActions();

    const [timeOutRemoveFromCart, setimeOutRemoveFromCart] = useState<any>(null)
    const [cartLoadingState, setCartLoadingState] = useState<any>(null)
    const removedFromCart = () => {
        toast.info(`Cart Suceesfully Updated`);
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

    const clearCartState = () => {
        cartInit.data.items = []
        cartInit.action = ""
    }


    const deleteCartItem = () => {
        cartInit.data.items.push({ id: cartItem.id, qty: 0 })
        setCartLoadingState(true)
        removedFromCart()
        clearTimeout(timeOutRemoveFromCart)
        const timeout = setTimeout(() => {

            updateCart(cartInit)
            clearCartState()
            setTimeout(()=>{
            setCartLoadingState(false)

            }, 2700)

        }, 500)
        setimeOutRemoveFromCart(timeout)
    }


    return (

        <CommandItem className="bg-white py-2 px-1 relative">
            <Image src={cartItem.featured_image ? cartItem.featured_image : "/images/default-product-image.png"} height={50} width={50} alt={cartItem.title} className="mr-2 max-w-[50px] max-h-[50px]" />
            <span>{cartItem.title}</span>
            <button onClick={() => { deleteCartItem() }} className="absolute right-3 hover:bg-gray-300 p-1 rounded-full ">
                <Cross1Icon className="w-3 h-3" />
            </button>
            {cartLoadingState ?
                <div className="absolute inset-0 bg-red-300 opacity-80 flex justify-center items-center">
                    <SlRefresh className='text-white animate-spin w-7 h-7' />
                </div>
                : null
            }
        </CommandItem>

    )
}

export default CartItem
