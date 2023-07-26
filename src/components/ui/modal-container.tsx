import { cn } from "@/lib/utils";
import { Dialog, Transition, RadioGroup, Listbox } from "@headlessui/react";
import { VariantProps, cva } from "class-variance-authority";
import { Fragment } from "react"
import * as React from "react"

const modalVariants = cva(
    "transform overflow-hidden rounded-2xl sm:rounded-b-2xl rounded-b-none bg-white  text-left align-middle shadow-xl transition-all",
    {
        variants: {
            // variant: {
            //   default: "bg-primary disabled:bg-blue-400 disabled:cursor-not-allowed text-white p-2 rounded-lg hover:bg-blue-500",
            //   outline:
            //     "btn-primary",
            //   ghost: "border-[#39f] border hover:border-slate-100 text-[#39f]",
            //   normal: "bg-slate-100",
            // },
            size: {
                default: "sm:max-w-md w-full p-3",
                sm: "sm:max-w-sm w-full p-3",
                lg: "sm:max-w-xl w-full sm:p-5 p-3",
                full: "w-full"
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
)

export interface ModalProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants> {
    asChild?: boolean,
    showModal: any, setCloseModal: any, children: any
    fullModal?: boolean
}

const ModalContainer = React.forwardRef<HTMLDivElement, ModalProps>(({ showModal, setCloseModal, children, className, size, fullModal }) => {

    return (
        <Transition appear show={showModal} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => { setCloseModal(false) }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className={`fixed  ${fullModal ? "inset-0" : "sm:inset-y-0 bottom-0 overflow-y-auto inset-x-0"}`}>
                    <div className={`flex min-h-full  w-full text-center ${fullModal ? "" : "items-center justify-center"}`}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className={cn(modalVariants({ size, className }))}>
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )

})



export default ModalContainer