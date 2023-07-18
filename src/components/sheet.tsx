import Sheet, { SheetRef } from 'react-modal-sheet';
import React, { useState } from 'react';

export default function ExampleSheet() {
    const [isOpen, setOpen] = useState(false);
    const ref = React.useRef<SheetRef>();
    return (
        <>
            {/* <button onClick={() => setOpen(true)}>Open sheet</button>

            <Sheet
                ref={ref}
                initialSnap={0}
                snapPoints={[-50, 100, 0]}
                detent="content-height"
                isOpen={isOpen} onClose={() => setOpen(false)}>
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>

                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet> */}
        </>
    );
}