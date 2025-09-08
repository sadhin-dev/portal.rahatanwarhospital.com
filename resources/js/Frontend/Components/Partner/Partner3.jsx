export default function Partner3({ data }) {
    const { section_title, partner_list } = data
    return (
        <div className="cs_half_bg_2">
            <div className="container">
                {section_title && (
                    <>
                        <h2
                            className="cs_fs_40 text-center mb-0 cs_semibold"
                            dangerouslySetInnerHTML={{
                                __html: section_title
                            }}
                        />
                        <div className="cs_height_60" />
                    </>
                )}
                <div className="cs_brands cs_style_3 cs_radius_20">
                    {partner_list?.map((item, index) => (
                        <div className="cs_brand" key={index}>
                            {item.partner_image_url && <img src={item.partner_image_url} alt="Brand" />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
