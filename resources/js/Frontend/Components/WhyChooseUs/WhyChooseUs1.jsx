export default function WhyChooseUs1({ data }) {
    const { section_title, section_subtitle, image_url, feature_list } = data
    return (
        <div className="cs_shape_wrap">
            <div className="cs_shape_1 cs_position_1" />
            <div className="container">
                <div className="row cs_row_gap_85">
                    <div className="col-xl-5">
                        {image_url && (
                            <div className="cs_pr_95 text-center cs_img_filed">
                                <img src={image_url} alt="Why Choose Us" className=" cs_radius_30" />
                            </div>
                        )}
                    </div>
                    <div className="col-xl-7">
                        {(section_subtitle || section_title) && (
                            <>
                                <div className="cs_section_heading cs_style_1">
                                    {section_subtitle && (
                                        <>
                                            <h3
                                                className="cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32"
                                                dangerouslySetInnerHTML={{
                                                    __html: section_subtitle
                                                }}
                                            />
                                            <div className="cs_height_5"></div>
                                        </>
                                    )}
                                    {section_title && (
                                        <h2
                                            className="cs_section_title cs_fs_72 m-0"
                                            dangerouslySetInnerHTML={{
                                                __html: section_title
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="cs_height_85 cs_height_lg_50"></div>
                            </>
                        )}
                        <div className="row cs_row_gap_85">
                            {feature_list?.map((item, index) => (
                                <div className="col-md-6" key={index}>
                                    <div className="cs_iconbox cs_style_6">
                                        {item.feature_icon_url && (
                                            <div className="cs_iconbox_icon cs_center cs_accent_bg rounded-circle">
                                                <img src={item.feature_icon_url} alt="Icon" />
                                            </div>
                                        )}
                                        {item.feature_title && (
                                            <h2
                                                className="cs_iconbox_title cs_fs_32 cs_semibold"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.feature_title
                                                }}
                                            />
                                        )}
                                        {item.feature_subtitle && (
                                            <p
                                                className="cs_iconbox_subtitle m-0"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.feature_subtitle
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
