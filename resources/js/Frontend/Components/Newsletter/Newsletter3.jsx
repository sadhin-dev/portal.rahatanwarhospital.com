export default function Newsletter3({ data }) {
    const { section_title, background_image_url, video_url } = data
    return (
        <>
            {section_title && (
                <div className="container">
                    <div className="cs_section_heading cs_style_1 text-center">
                        <h2
                            className="cs_section_title cs_fs_53 cs_normal mb-0"
                            dangerouslySetInnerHTML={{
                                __html: section_title
                            }}
                        />
                    </div>
                    <div className="cs_height_85 cs_height_lg_50" />
                </div>
            )}
        </>
    )
}
