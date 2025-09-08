import Button from "../Button"

export default function Banner4({ data }) {
    const { title, subtitle, image_url, background_image_url, action_text, action_url } = data
    return (
        <div className="cs_banner cs_style_3 cs_bg_filed" style={{ backgroundImage: `url(${background_image_url})` }}>
            {image_url && (
                <div className="cs_banner_img">
                    <img src={image_url} alt="Banner Image" className="cs_main_banner_img" />
                </div>
            )}
            <div className="container">
                <div className="cs_banner_text">
                    {title && (
                        <h2
                            className="cs_banner_title cs_fs_72"
                            dangerouslySetInnerHTML={{
                                __html: title
                            }}
                        />
                    )}
                    {subtitle && (
                        <p
                            className="cs_banner_subtitle cs_fs_20 mb-0 cs_heading_color"
                            dangerouslySetInnerHTML={{
                                __html: subtitle
                            }}
                        />
                    )}
                    {(action_url || action_text) && (
                        <>
                            <div className="cs_height_25 cs_height_lg_25"></div>
                            <Button href={action_url} btnText={action_text} btnClass="cs_btn cs_style_1" />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
