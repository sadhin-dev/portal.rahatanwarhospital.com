import NavigationLink from "@/Components/NavigationLink"

export default function Department4({ data }) {
    const { section_background_url, section_title, section_subtitle, department_list } = data
    return (
        <div className="container">
            {(section_subtitle || section_title) && (
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
                    <div className="cs_height_72 cs_height_lg_45"></div>
                </div>
            )}
            <div className="cs_iconbox_12_wrap">
                {department_list?.map((item, index) => (
                    <div key={index}>
                        <div className="cs_iconbox cs_style_12">
                            <div className="cs_iconbox_info cs_radius_20">
                                <span className="cs_iconbox_circle cs_accent_bg" />
                                {item.department_title && (
                                    <h2 className="cs_iconbox_title cs_fs_32 cs_semibold">
                                        <NavigationLink
                                            href={item.department_btn_url}
                                            dangerouslySetInnerHTML={{
                                                __html: item.department_title
                                            }}
                                        />
                                    </h2>
                                )}
                                {item.department_subtitle && (
                                    <p
                                        className="cs_iconbox_subtitle mb-0 cs_heading_color"
                                        dangerouslySetInnerHTML={{
                                            __html: item.department_subtitle
                                        }}
                                    />
                                )}
                            </div>
                            {item.department_icon_url && (
                                <NavigationLink href={item.department_btn_url} className="cs_iconbox_icon cs_center">
                                    <img src={item.department_icon_url} alt="Icon" />
                                </NavigationLink>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
