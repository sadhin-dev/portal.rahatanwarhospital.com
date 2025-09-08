import React from "react"
import Button from "../Button"

export default function Cta({ data }) {
    const { background_image_url, title, sub_title, action_text, action_url } = data
    return (
        <div className="container">
            <div
                className="cs_cta cs_style_1 cs_bg_filed cs_radius_20"
                style={{ backgroundImage: `url(${background_image_url})` }}
            >
                {title && (
                    <h2
                        className="cs_cta_title cs_fs_72"
                        dangerouslySetInnerHTML={{
                            __html: title
                        }}
                    />
                )}
                {sub_title && (
                    <p
                        className="cs_cta_subtitle cs_heading_color"
                        dangerouslySetInnerHTML={{
                            __html: sub_title
                        }}
                    />
                )}
                {(action_text || action_url) && <Button href={action_url} btnText={action_text} btnClass="cs_btn cs_style_1" />}
            </div>
        </div>
    )
}
