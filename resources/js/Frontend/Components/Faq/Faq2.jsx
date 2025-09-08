import Accordion from "../Accordion"

export default function Faq2({ data }) {
    const { section_title, section_subtitle, faq_list } = data
    return (
        <div className="container">
            {(section_subtitle || section_title) && (
                <div className="row">
                    <div className="col-xxl-4">
                        <div className="cs_section_heading cs_style_1">
                            {section_subtitle && (
                                <>
                                    <h3
                                        className="cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32"
                                        dangerouslySetInnerHTML={{
                                            __html: section_subtitle
                                        }}
                                    />
                                    <div className="cs_height_5"></div>
                                </>
                            )}
                            {section_title && (
                                <h2
                                    className="cs_section_title cs_fs_72 m-0"
                                    dangerouslySetInnerHTML={{
                                        __html: section_title
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="cs_height_70 cs_height_lg_50"></div>
                </div>
            )}
            <div className="row">
                <div className="col-xxl-8 offset-xxl-4">
                    <Accordion
                        accordionData={faq_list}
                        arrowStyle={2}
                        variant="cs_accordians cs_style1 cs_type_1 cs_heading_color"
                    />
                </div>
            </div>
        </div>
    )
}
