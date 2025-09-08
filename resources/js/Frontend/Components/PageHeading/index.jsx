import { Link } from "@inertiajs/react"
import React from "react"

export default function PageHeading({ data, bgSrc, variant }) {
    return (
        <>
            <div
                className={`cs_page_heading cs_style_1 cs_bg_filed ${variant ? variant : ""}`}
                style={{
                    backgroundImage: `url(${bgSrc})`
                }}
            >
                <div className="container">
                    <div className="cs_section_heading cs_style_1">
                        {data.title && <h1 className="cs_section_title cs_fs_40 mb-0">{data.title}</h1>}
                        <ol className="breadcrumb">
                            {data?.breadcrumb?.map((item) => (
                                <li className="breadcrumb-item">
                                    {item.url ? (
                                        <Link href={item.url}>{item.label}</Link>
                                    ) : (
                                        <span className="search current-item">{item.label}</span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </>
    )
}
