import React, { useState, useRef, useEffect } from "react"

function AccordionItem({ title, content, isOpen, onClick, arrowStyle }) {
    const accordionContentRef = useRef(null)
    const [contentHeight, setContentHeight] = useState(0)

    useEffect(() => {
        if (accordionContentRef.current) {
            // Measure the content's height and set it dynamically
            setContentHeight(accordionContentRef.current.offsetHeight)
        }
    }, [isOpen])

    const accordionClass = isOpen ? "cs_accordian active" : "cs_accordian"

    return (
        <>
            <div className={accordionClass}>
                <h2 className="cs_accordian_head cs_heading_color" onClick={onClick}>
                    {title}
                    <span className="cs_accordian_arrow">
                        {arrowStyle === 1 && (
                            <svg width={28} height={28} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M-6.11959e-07 14C-2.74531e-07 21.7195 6.28053 28 14 28C21.7195 28 28 21.7195 28 14C28 6.28053 21.7195 -9.49388e-07 14 -6.11959e-07C6.28053 -2.74531e-07 -9.49388e-07 6.28053 -6.11959e-07 14ZM26.25 14C26.25 20.7548 20.7548 26.25 14 26.25C7.24522 26.25 1.75 20.7548 1.75 14C1.75 7.24522 7.24522 1.75 14 1.75C20.7548 1.75 26.25 7.24522 26.25 14ZM13.3814 8.13137C13.7233 7.78947 14.2769 7.78947 14.6186 8.13137L18.9936 12.5064C19.1645 12.6772 19.25 12.9012 19.25 13.125C19.25 13.3488 19.1645 13.5728 18.9936 13.7436C18.6517 14.0855 18.0981 14.0855 17.7564 13.7436L14.875 10.8622L14.875 19.25C14.875 19.7332 14.4837 20.125 14 20.125C13.5163 20.125 13.125 19.7332 13.125 19.25L13.125 10.8622L10.2436 13.7436C9.90172 14.0855 9.34806 14.0855 9.00637 13.7436C8.66469 13.4017 8.66447 12.8481 9.00637 12.5064L13.3814 8.13137Z"
                                    fill="#307BC4"
                                />
                            </svg>
                        )}
                        {arrowStyle === 2 && (
                            <svg width={23} height={13} viewBox="0 0 23 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M22.9996 1.52904C23.0071 1.23098 22.9085 0.938281 22.7175 0.691638C22.5265 0.444996 22.2525 0.256664 21.9337 0.152828C21.615 0.048992 21.2674 0.0348107 20.939 0.112255C20.6107 0.1897 20.3181 0.354922 20.1018 0.584951L11.5264 9.36188L2.95408 0.58495C2.8207 0.425828 2.65137 0.292566 2.45653 0.193511C2.26169 0.094456 2.04557 0.0317421 1.82181 0.00929567C1.59805 -0.0131507 1.37146 0.00515451 1.15614 0.0630648C0.940819 0.120975 0.741392 0.217243 0.570471 0.345839C0.399549 0.474436 0.260902 0.632592 0.162918 0.810402C0.0649357 0.988212 0.00990291 1.18185 0.00121875 1.37918C-0.00746351 1.57651 0.0302848 1.77329 0.112352 1.95719C0.19442 2.14109 0.318905 2.30815 0.478018 2.44791L10.2836 12.4967C10.4372 12.6545 10.6278 12.7812 10.8427 12.8681C11.0575 12.955 11.2914 13 11.528 13C11.7646 13 11.9984 12.955 12.2132 12.8681C12.4281 12.7812 12.6189 12.6545 12.7725 12.4967L22.5875 2.44791C22.8447 2.19407 22.9905 1.86847 22.9996 1.52904Z"
                                    fill="#307BC4"
                                />
                            </svg>
                        )}
                    </span>
                </h2>
                <div className="cs_accordian_body_wrap" style={{ height: isOpen ? `${contentHeight}px` : "0" }}>
                    <div className="cs_accordian_body" ref={accordionContentRef}>
                        <p>{content}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function Accordion({ accordionData, variant, arrowStyle }) {
    const [openItemIndex, setOpenItemIndex] = useState(-1) // Initialize with -1 for no item open initially
    const [firstItemOpen, setFirstItemOpen] = useState(true) // Set the first item to open initially

    const handleItemClick = (index) => {
        if (index === openItemIndex) {
            setOpenItemIndex(-1)
        } else {
            setOpenItemIndex(index)
        }
    }
    useEffect(() => {
        // Open the first item when the component mounts
        if (firstItemOpen) {
            setOpenItemIndex(1)
            setFirstItemOpen(false)
        }
    }, [firstItemOpen])

    return (
        <>
            <div className={variant}>
                {accordionData?.map((item, index) => (
                    <AccordionItem
                        key={index}
                        title={item.faq_question}
                        content={item.faq_answer}
                        isOpen={index === openItemIndex}
                        onClick={() => handleItemClick(index)}
                        arrowStyle={arrowStyle}
                    />
                ))}
            </div>
        </>
    )
}
