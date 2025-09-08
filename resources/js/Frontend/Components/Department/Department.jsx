import NavigationLink from "@/Components/NavigationLink"

export default function Department({ data }) {
    const { section_background_url, section_title, section_subtitle, department_list } = data
    return (
        <div className="container">
            <div className="cs_departments cs_style_1">
                <div className="cs_departments_bg cs_radius_25" style={{ backgroundImage: `url(${section_background_url})` }} />
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
                        <h2
                            className="cs_section_title cs_fs_72 m-0 cs_white_color"
                            dangerouslySetInnerHTML={{
                                __html: section_title
                            }}
                        />
                    )}
                </div>
                <div className="cs_height_72 cs_height_lg_45" />
                <div className="cs_department_list">
                    {department_list?.map((item, index) => (
                        <div className="cs_department_list_item" key={index}>
                            <NavigationLink
                                href={item.department_btn_url}
                                className="cs_department cs_shadow_1 cs_radius_20 cs_white_bg"
                            >
                                {item.department_icon_url && <img src={item.department_icon_url} alt="Icon" />}
                                <p
                                    className="cs_department_title cs_medium cs_heading_color cs_fs_20 mb-0"
                                    dangerouslySetInnerHTML={{
                                        __html: item.department_title
                                    }}
                                />
                            </NavigationLink>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
