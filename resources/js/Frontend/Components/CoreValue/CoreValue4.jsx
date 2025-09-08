export default function CoreValue4({ data }) {
    const { section_title, section_subtitle, feature_list } = data
    return (
        <div className="container">
            {(section_subtitle || section_title) && (
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
                    <div className="cs_height_70 cs_height_lg_50" />
                </div>
            )}

            <div className="cs_iconbox_8_wrap cs_radius_30">
                <div className="row">
                    {feature_list?.map((item, index) => (
                        <div className="col-xl-3 col-md-6" key={index}>
                            <div className="cs_iconbox cs_style_8 text-center cs_radius_20">
                                {item.feature_icon_url && (
                                    <div className="cs_iconbox_icon rounded-circle cs_center">
                                        <img src={item.feature_icon_url} alt="Icon" />
                                    </div>
                                )}
                                {item.feature_title && (
                                    <h2
                                        className="cs_iconbox_title cs_semibold cs_fs_32"
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
