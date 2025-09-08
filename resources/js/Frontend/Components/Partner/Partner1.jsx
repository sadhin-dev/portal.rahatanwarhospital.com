export default function Partner1({ data }) {
    const { section_title, partner_list } = data
    return (
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
            <div className="cs_brands cs_style_1">
                {partner_list?.map((item, index) => (
                    <div className="cs_brand cs_center" key={index}>
                        {item.partner_image_url && <img src={item.partner_image_url} alt="Brand" />}
                    </div>
                ))}
            </div>
        </div>
    )
}
