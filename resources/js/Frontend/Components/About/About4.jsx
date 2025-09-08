export default function About4({ data }) {
    const { image_url, section_title, section_subtitle, section_description, support_icon_url, support_title, support_subtitle } =
        data
    return (
        <div className=" cs_half_bg">
            <div className="container">
                <div className="cs_about cs_style_3 cs_radius_20 overflow-hidden">
                    <div className="row flex-xl-row flex-column-reverse">
                        <div className="col-xl-7 position-relative">
                            <div className="cs_about_text d-flex  align-items-center">
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
                                    {section_description && (
                                        <>
                                            <div className="cs_height_85 cs_height_lg_30" />
                                            <p
                                                className="cs_section_minititle m-0 cs_heading_color cs_fs_20"
                                                dangerouslySetInnerHTML={{
                                                    __html: section_description
                                                }}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                            {(support_icon_url || support_title || support_subtitle) && (
                                <div className="cs_support_card">
                                    {support_icon_url && (
                                        <div className="cs_support_card_icon">
                                            <img src={support_icon_url} alt="Icon" />
                                        </div>
                                    )}
                                    <div className="cs_support_card_right">
                                        {support_title && (
                                            <h3
                                                className="cs_fs_24 cs_semibold mb-0"
                                                dangerouslySetInnerHTML={{
                                                    __html: support_title
                                                }}
                                            />
                                        )}
                                        {support_subtitle && (
                                            <p
                                                className="cs_heading_color mb-0"
                                                dangerouslySetInnerHTML={{
                                                    __html: support_subtitle
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-xl-5">
                            {image_url && (
                                <div className="cs_about_img">
                                    <img src={image_url} alt="About" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
