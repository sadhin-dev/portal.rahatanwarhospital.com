import React, { useState } from "react"
import LightGallery from "./LightGallery"
import { Icon } from "@iconify/react"

export default function PhotoGallery1({ data }) {
    const { section_subtitle, section_title, gallery_list } = data
    const [modalToggle, setModalToggle] = useState(false)
    const [initialSlideIndex, setInitialSlideIndex] = useState(0)

    const slideTo = (index) => {
        setInitialSlideIndex(index)
        setModalToggle(true)
    }

    return (
        <>
            <div className="container">
                <div className="cs_gallery_grid_1">
                    <div className="cs_section_heading cs_style_1">
                        {section_subtitle && (
                            <>
                                <h3
                                    className="cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32"
                                    dangerouslySetInnerHTML={{
                                        __html: section_subtitle
                                    }}
                                />
                                <div className="cs_height_5" />
                            </>
                        )}
                        {section_title && (
                            <>
                                <h2
                                    className="cs_section_title cs_fs_72 m-0"
                                    dangerouslySetInnerHTML={{
                                        __html: section_title
                                    }}
                                />
                            </>
                        )}

                        <div className="cs_height_52 cs_height_lg_25" />
                    </div>
                    <div className="cs_portfolio_blank_grid"></div>
                    {gallery_list?.map((item, index) => (
                        <div className={`cs_portfolio cs_style_1${index === 2 ? " cs_size_1" : ""} cs_radius_20 overflow-hidden`}>
                            <div
                                className="cs_portfolio_img d-block cs_bg_filed st_lightbox_item"
                                style={{
                                    backgroundImage: `url(${item.gallery_image_url})`
                                }}
                                key={index}
                                onClick={() => slideTo(index)}
                            >
                                <span className="cs_link_hover">
                                    <i className="d-flex">
                                        <Icon icon="fa6-solid:arrows-up-down-left-right" width="24" height="24" />
                                    </i>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <LightGallery
                modalToggle={modalToggle}
                setModalToggle={setModalToggle}
                galleryList={gallery_list}
                initialSlideIndex={initialSlideIndex}
            />
        </>
    )
}
