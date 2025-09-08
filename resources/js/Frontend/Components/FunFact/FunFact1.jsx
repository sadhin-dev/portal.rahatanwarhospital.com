import React from "react"

export default function FunFact1({ data }) {
    const { background_image_url, funfact_list } = data
    return (
        <div className="container">
            <div
                className="cs_funfact_1_wrap cs_radius_30 cs_bg_filed"
                style={{ backgroundImage: `url(${background_image_url})` }}
            >
                {funfact_list?.map((item, index) => (
                    <div className="cs_funfact cs_style_1 text-center" key={index}>
                        {item.funfact_value && (
                            <h2
                                className="cs_funfact_number cs_fs_72"
                                dangerouslySetInnerHTML={{
                                    __html: item.funfact_value
                                }}
                            />
                        )}
                        {item.funfact_title && (
                            <p
                                className="cs_funfact_title m-0 cs_heading_color"
                                dangerouslySetInnerHTML={{
                                    __html: item.funfact_title
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
