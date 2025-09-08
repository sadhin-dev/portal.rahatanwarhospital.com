export default function About5({ data }) {
    const { image_url, section_title, section_subtitle, section_description } = data
    return (
        <div className="cs_shape_wrap">
            <div className="cs_shape_1 cs_position_5" />
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-4">
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
                                    <div className="cs_height_54 cs_height_lg_30" />
                                </>
                            )}
                            {section_description && (
                                <p
                                    className="m-0"
                                    dangerouslySetInnerHTML={{
                                        __html: section_description
                                    }}
                                />
                            )}
                            <div className="cs_height_120 cs_height_lg_60" />
                        </div>
                    </div>
                    <div className="col-lg-7 offset-lg-1">{image_url && <img src={image_url} alt="About" />}</div>
                </div>
            </div>
        </div>
    )
}
