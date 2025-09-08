export default function Banner7({ data }) {
    const { title, subtitle, background_image_url } = data
    return (
        <div className="container">
            <div
                className="cs_banner cs_style_4 cs_bg_filed overflow-hidden"
                style={{ backgroundImage: `url(${background_image_url})` }}
            >
                {title && (
                    <h2
                        className="cs_banner_title cs_white_color cs_fs_72"
                        dangerouslySetInnerHTML={{
                            __html: title
                        }}
                    />
                )}
                {subtitle && (
                    <p
                        className="cs_banner_subtitle cs_white_color cs_fs_20 m-0"
                        dangerouslySetInnerHTML={{
                            __html: subtitle
                        }}
                    />
                )}
            </div>
        </div>
    )
}
