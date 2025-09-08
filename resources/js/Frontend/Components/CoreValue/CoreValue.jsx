export default function CoreValue({ data }) {
    const { section_title, feature_list } = data
    return (
        <div className="cs_shape_wrap">
            <div className="cs_shape_1" />
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
                            <div className="cs_feature cs_style_1 cs_shadow_1 cs_radius_25 cs_white_bg">
                                <h2 className="cs_feature_title cs_semibold cs_fs_40 cs_center">
                                    {item.feature_icon_url && (
                                        <span className="cs_feature_icon cs_accent_bg cs_center rounded-circle">
                                            <img src={item.feature_icon_url} alt="Icon" />
                                        </span>
                                    )}
                                    {item.feature_title && (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: item.feature_title
                                            }}
                                        />
                                    )}
                                </h2>
                                {item.feature_subtitle && (
                                    <p
                                        className="m-0 text-center"
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
