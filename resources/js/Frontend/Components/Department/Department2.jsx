import NavigationLink from "@/Components/NavigationLink"

export default function Department2({ data }) {
    const { section_title, section_subtitle, department_list } = data
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
            <div className="row">
                {department_list?.map((item, index) => (
                    <div className="col-xl-4 col-md-6" key={index}>
                        <NavigationLink href={item.department_btn_url} className="cs_iconbox cs_style_2">
                            {item.department_icon_url && (
                                <div className="cs_iconbox_icon">
                                    {item.department_icon_url && <img src={item.department_icon_url} alt="Icon" />}
                                </div>
                            )}
                            {item.department_title && (
                                <h2
                                    className="cs_iconbox_title cs_fs_32 cs_semibold m-0"
                                    dangerouslySetInnerHTML={{
                                        __html: item.department_title
                                    }}
                                />
                            )}
                        </NavigationLink>
                    </div>
                ))}
            </div>
        </div>
    )
}
