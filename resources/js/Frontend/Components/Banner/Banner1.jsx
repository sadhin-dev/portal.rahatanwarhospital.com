export default function Banner1({ data }) {
    const { title, subtitle, background_image_url, image_url } = data
    return (
        <div className="container">
            <div className="cs_banner cs_style_1 cs_bg_filed" style={{ backgroundImage: `url(${background_image_url})` }}>
                {image_url && <img src={image_url} alt="Cta" className="cs_banner_img" />}
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
                        className="cs_banner_subtitle cs_heading_color cs_fs_20 cs_medium m-0"
                        dangerouslySetInnerHTML={{
                            __html: subtitle
                        }}
                    />
                )}
            </div>
        </div>
    )
}
