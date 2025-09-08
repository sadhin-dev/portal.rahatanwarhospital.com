export default function CoreValue3({ data }) {
    const { section_title, feature_list } = data
    return (
        <div className="container">
            {section_title && (
                <>
                    <div className="cs_section_heading cs_style_1 text-center">
                        <h2
                            className="cs_section_title cs_fs_72 m-0"
                            dangerouslySetInnerHTML={{
                                __html: section_title
                            }}
                        />
                    </div>
                    <div className="cs_height_72 cs_height_lg_45" />
                </>
            )}
            <div className="cs_random_features">
                {feature_list?.map((item, index) => (
                    <div className="cs_random_features_col" key={index}>
                        <div className="cs_iconbox cs_style_13 text-center cs_radius_25">
                            {item.feature_icon_url && (
                                <div className="cs_iconbox_icon">
                                    <div className="cs_iconbox_icon_in cs_accent_bg cs_center">
                                        <img src={item.feature_icon_url} alt="Icon" />
                                    </div>
                                </div>
                            )}
                            <div className="cs_iconbox_info">
                                {item.feature_title && (
                                    <h2
                                        className="cs_iconbox_title cs_fs_40"
                                        dangerouslySetInnerHTML={{
                                            __html: item.feature_title
                                        }}
                                    />
                                )}
                                {item.feature_subtitle && (
                                    <p
                                        className="cs_iconbox_subtitle mb-0"
                                        dangerouslySetInnerHTML={{
                                            __html: item.feature_subtitle
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
