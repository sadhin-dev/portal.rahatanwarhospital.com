export default function Banner3({ data }) {
    const { title, subtitle, background_image_url, image_url } = data

    return (
        <div className="cs_banner_8_wrap">
            <div className="container">
                <div
                    className="cs_banner cs_style_8 cs_radius_25 cs_bg_filed"
                    style={{ backgroundImage: `url(${background_image_url})` }}
                >
                    {image_url && (
                        <div className="cs_banner_img">
                            <img src={image_url} alt="Banner" />
                        </div>
                    )}
                    <div className="cs_banner_in">
                        {title && (
                            <h2
                                className="cs_banner_title cs_fs_72 cs_white_color"
                                dangerouslySetInnerHTML={{
                                    __html: title
                                }}
                            />
                        )}
                        {subtitle && (
                            <p
                                className="cs_banner_subtitle cs_heading_color cs_fs_20 mb-0"
                                dangerouslySetInnerHTML={{
                                    __html: subtitle
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
