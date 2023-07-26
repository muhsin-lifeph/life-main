import { useState } from 'react';

export function setModalVisibility() {
  const [locationModalState, setLocationModalState] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [locationModal, setLocationModal] = useState(false)
  const [addNewAddress, setaddNewAddress] = useState(false);
  const [addnewAddressFormVisibility, setaddnewAddressFormVisibility] = useState(false);
  const [notValidOTPPageVisib, setnotValidOTPPageVisib] = useState(false);
  const [availableAddresses, setavailableAddresses] = useState(true);
  
  const [AddressDataIndex, setAddressDataIndex] = useState<any>(0);

  // const increment = () => {
  //   setCount((prevCount) => prevCount + 1);
  // };

  // const decrement = () => {
  //   setCount((prevCount) => prevCount - 1);
  // };

  return {
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
    addNewAddress,
    setAddressDataIndex,
    AddressDataIndex,
    availableAddresses,
    setavailableAddresses
  };
}