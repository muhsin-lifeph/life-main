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
import { removeFromCart } from "../redux/cart.slice";
import { toast } from 'react-toastify';
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion"
export function CommandDemo({ cartItems, children }: { cartItems: any, children: any }) {

    return (
        <Command className="rounded-lg border shadow-md bg-white">
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
    const dispatch = useDispatch();
    const [timeOutRemoveFromCart, setimeOutRemoveFromCart] = useState<any>(null)
    const removedFromCart = () => {
        toast.info(`Cart Suceesfully Updated`);
    }

    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
    }
    const x = useMotionValue(0)
    const [closed, setClosed] = useState(false)

    const deleteCartItem = () => {
        setClosed(true)
        removedFromCart()
        clearTimeout(timeOutRemoveFromCart)
        const timeout = setTimeout(() => {
            setClosed(false)
            dispatch(removeFromCart(cartItem.id))

        }, 500)
        setimeOutRemoveFromCart(timeout)
    }

    const background = useTransform(
        x,
        [-30, 0, 0],
        ["#ef4444", "#fff", "#ef4444"]
    )
    return (
        <motion.div style={{ background }}>
            <motion.div
                animate={closed ? "closed" : "open"}
                variants={variants}
                dragConstraints={{ left: 0, right: 0 }}
                drag="x"
                style={{ x }}
            >
                <CommandItem className="bg-white">
                    <Image src={cartItem.images.featured_image} height={50} width={50} alt={cartItem.title} className="mr-2 max-w-[50px] max-h-[50px]" />
                    <span>{cartItem.title}</span>
                    <button onClick={() => { deleteCartItem() }} className="absolute right-3 hover:bg-gray-300 p-1 rounded-full ">
                        <Cross1Icon className="w-3 h-3" />
                    </button>
                </CommandItem>
            </motion.div>
        </motion.div>
    )
}

export default CartItem
