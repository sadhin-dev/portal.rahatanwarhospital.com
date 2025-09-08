export default function Banner2({ data }) {
    const { title, subtitle, background_image_url } = data

    return (
        <div className="container">
            <div
                className="cs_banner cs_style_2 cs_radius_25 cs_bg_filed"
                style={{ backgroundImage: `url(${background_image_url})` }}
            >
                <div className="cs_section_heading cs_style_1">
                    {title && (
                        <h2
                            className="cs_section_title cs_fs_72 m-0 cs_white_color"
                            dangerouslySetInnerHTML={{
                                __html: title
                            }}
                        />
                    )}
                    {subtitle && (
                        <>
                            <div className="cs_height_22" />
                            <p
                                className="m-0 cs_white_color cs_fs_20 cs_medium"
                                dangerouslySetInnerHTML={{
                                    __html: subtitle
                                }}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
