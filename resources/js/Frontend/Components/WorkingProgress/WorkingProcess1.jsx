export default function WorkingProcess1({ data }) {
    const { section_title, section_subtitle, feature_list } = data || {}
    return (
        <div className="cs_shape_wrap">
            <div className="cs_shape_1 cs_position_2" />
            <div className="container">
                {(section_subtitle || section_title) && (
                    <>
                        <div className="cs_section_heading cs_style_1 text-center">
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
                        <div className="cs_height_105 cs_height_lg_50"></div>
                    </>
                )}
                <div className="cs_iconbox_3_wrap">
                    {feature_list?.map((item, index) => (
                        <div className="cs_iconbox cs_style_3" key={index}>
                            {item.feature_icon_url && (
                                <div className="cs_iconbox_left">
                                    <div className="cs_iconbox_icon cs_center rounded-circle">
                                        <img src={item.feature_icon_url} alt="Icon" />
                                    </div>
                                </div>
                            )}
                            <div className="cs_iconbox_right">
                                {item.feature_number && (
                                    <h4
                                        className="cs_iconbox_number"
                                        dangerouslySetInnerHTML={{
                                            __html: item.feature_number
                                        }}
                                    />
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
    )
}
