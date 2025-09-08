import NavigationLink from "@/Components/NavigationLink"

export default function Department3({ data }) {
    const { section_title, section_subtitle, department_list } = data

    const renderDepartmentItems = () => {
        return department_list
            .map((department, index) => {
                const elements = []

                // After every 2 items (except first), add 3 empty divs
                if (index > 0 && index % 2 === 0) {
                    elements.push(
                        <div key={`empty-${index}-1`} className="col-lg-3" />,
                        <div key={`empty-${index}-2`} className="col-lg-3" />,
                        <div key={`empty-${index}-3`} className="col-lg-3" />
                    )
                }

                // After every 6 items (complete cycles), add one more empty div
                if (index > 0 && index % 6 === 0) {
                    elements.push(<div key={`extra-empty-${index}`} className="col-lg-3" />)
                }

                // Add the department item
                elements.push(
                    <div key={index} className="col-lg-3 col-sm-6">
                        <NavigationLink
                            href={department.department_btn_url}
                            className="cs_iconbox cs_style_9 text-center cs_radius_20"
                        >
                            {department.department_icon_url && <img src={department.department_icon_url} alt="Icon" />}
                            {department.department_title && (
                                <h2
                                    className="cs_iconbox_title cs_white_color cs_fs_20 cs_medium mb-0"
                                    dangerouslySetInnerHTML={{
                                        __html: department.department_title
                                    }}
                                />
                            )}
                        </NavigationLink>
                    </div>
                )

                return elements
            })
            .flat() // Flatten the array of arrays into a single array
    }

    return (
        <div className="container">
            <div className="row align-items-center flex-xl-row flex-column-reverse">
                <div className="col-xl-8">
                    <div className="row">{renderDepartmentItems()}</div>
                </div>
                <div className="col-xl-4">
                    {(section_subtitle || section_title) && (
                        <div className="cs_section_heading cs_style_1 text-end">
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
                </div>
            </div>
        </div>
    )
}
