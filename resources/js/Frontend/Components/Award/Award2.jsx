export default function Award2({ data }) {
    const { section_title, section_subtitle, section_subtitle_2, award_list } = data
    return (
        <div className="container">
            {(section_subtitle || section_title) && (
                <>
                    <div className="cs_section_heading cs_style_1 text-center">
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
                            </>
                        )}
                        {section_subtitle_2 && (
                            <>
                                <div className="cs_height_25"></div>
                                <p
                                    className="m-0"
                                    dangerouslySetInnerHTML={{
                                        __html: section_subtitle_2
                                    }}
                                />
                            </>
                        )}
                    </div>
                    <div className="cs_height_72 cs_height_lg_45" />
                </>
            )}

            <div className="row gy-4">
                {award_list?.map((item, index) => (
                    <div className="col-xxl-3 col-md-6" key={index}>
                        <div className="cs_iconbox cs_style_5 cs_white_bg cs_radius_15">
                            {item.award_icon_url && (
                                <div className="cs_iconbox_icon cs_center cs_accent_bg cs_radius_15">
                                    <img src={item.award_icon_url} alt="Award" />
                                </div>
                            )}
                            {item.award_title && (
                                <h2
                                    className="cs_iconbox_title m-0 cs_fs_20 cs_medium"
                                    dangerouslySetInnerHTML={{
                                        __html: item.award_title
                                    }}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
