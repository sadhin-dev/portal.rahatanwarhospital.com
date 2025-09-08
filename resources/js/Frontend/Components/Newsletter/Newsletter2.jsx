import translate from "@/utils/translate"
import Newsletter from "../Widget/Newsletter"
export default function Newsletter2({ data }) {
    const { section_title, section_subtitle, image_url } = data
    return (
        <div className="cs_newsletter_2_wrap">
            <div className="container">
                <div className="cs_newsletter cs_style_2">
                    {image_url && (
                        <div className="cs_newsletter_img">
                            <img src={image_url} alt="Newsletter" />
                        </div>
                    )}
                    <div className="cs_newsletter_in">
                        {section_subtitle && (
                            <p
                                className="cs_newsletter_subtitle cs_accent_color m-0 text-uppercase cs_fs_24"
                                dangerouslySetInnerHTML={{
                                    __html: section_subtitle
                                }}
                            />
                        )}
                        <div className="cs_height_6" />
                        {section_title && (
                            <h2
                                className="cs_newsletter_title cs_fs_72"
                                dangerouslySetInnerHTML={{
                                    __html: section_title
                                }}
                            />
                        )}
                        <Newsletter
                            placeholder={translate("example@email.com")}
                            inputFormClass="cs_form_field"
                            btnText={translate("Submit")}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
