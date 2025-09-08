import React from "react"
import Button from "../Button"
import { useState } from "react"
import { Icon } from "@iconify/react"

export default function Pricing1({ data }) {
    const [active, setActive] = useState(0)
    const { section_title, section_subtitle, pricing_list } = data
    return (
        <div className="container">
            {(section_subtitle || section_title) && (
                <div className="cs_section_heading cs_style_1 text-center">
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
                    <div className="cs_height_72 cs_height_lg_45"></div>
                </div>
            )}

            {pricing_list?.length > 1 && (
                <div className="text-center">
                    <div className="cs_price_tab_btns">
                        {pricing_list?.map((item, index) => (
                            <span
                                className={`cs_price_tab_btn${index === active ? " active" : ""}`}
                                key={index}
                                onClick={() => setActive(index)}
                            >
                                {item.package_type}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {pricing_list?.map((pricingItem, pricingIndex) => {
                if (pricingIndex === active) {
                    return (
                        <div className="row cs_gap_y_50 justify-content-center" key={pricingIndex}>
                            {pricingItem.package_list?.map((item, index) => (
                                <div className="col-xl-4" key={index}>
                                    <div className="cs_pricing_card cs_style_1 cs_radius_20 overflow-hidden">
                                        <div className="cs_pricing_card_head cs_accent_bg cs_white_color">
                                            <h3 className="cs_white_color cs_fs_24 cs_semibold">
                                                <span className="cs_accent_bg">{item.package_name}</span>
                                                {item.is_popular_text && (
                                                    <span className="cs_heading_color cs_normal">{item.is_popular_text}</span>
                                                )}
                                            </h3>
                                            <h2 className="cs_white_color mb-0 cs_fs_72 cs_semibold">
                                                {item.package_price}
                                                <span className="cs_fs_24">{item.package_per}</span>
                                            </h2>
                                        </div>
                                        <div className="cs_pricing_card_body">
                                            <ul className="cs_pricing_card_feature cs_fs_20 cs_heading_color">
                                                {item.package_feature?.map((featureItem, featureIndex) => (
                                                    <li key={featureIndex}>
                                                        <i className="d-flex">
                                                            <Icon icon="fa6-solid:circle-check" width="20" height="20" />
                                                        </i>
                                                        <span>{featureItem.package_feature_text}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="cs_pricing_card_btn">
                                                {(item.package_btn_url || item.package_btn_text) && (
                                                    <Button
                                                        href={item.package_btn_url}
                                                        btnText={item.package_btn_text}
                                                        btnClass="cs_btn cs_style_1 w-100"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="cs_pricing_table cs_style_1">
                                        <h2 className="cs_pricing_title cs_fs_53 cs_normal">
                                            {item.package_icon_url && (
                                                <i className="cs_center">
                                                    <img src={item.package_icon_url} alt="" />
                                                </i>
                                            )}
                                        </h2>
                                        <ul className="cs_pricing_feature cs_mp0 cs_fs_18 cs_medium"></ul>
                                        <div className="cs_pricing_info">
                                            <div className="cs_price">
                                                <h3 className="cs_fs_53 cs_normal mb-0"></h3>
                                                <span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }
                return null // Skip rendering for other indices
            })}
        </div>
    )
}
