export default function Banner9({ data }) {
    const { title, subtitle, image_url } = data
    return (
        <div className="container">
            <div className="cs_banner cs_style_9 cs_type_1 cs_white_bg cs_radius_30">
                {image_url && (
                    <div className="cs_banner_img">
                        <img src={image_url} alt="Banner" />
                    </div>
                )}
                {title && (
                    <h2
                        className="cs_banner_title cs_fs_72 mb-0"
                        dangerouslySetInnerHTML={{
                            __html: title
                        }}
                    />
                )}
                {subtitle && (
                    <>
                        <div className="cs_height_22" />
                        <p
                            className="cs_banner_subtitle cs_fs_20 m-0 cs_medium"
                            dangerouslySetInnerHTML={{
                                __html: subtitle
                            }}
                        />
                    </>
                )}
            </div>
        </div>
    )
}
