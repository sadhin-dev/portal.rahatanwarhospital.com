import React from "react"
import translate from "@/utils/translate"
import Newsletter from "../Widget/Newsletter"

export default function Newsletter1({ data }) {
    const { section_title, section_subtitle, form_label } = data

    return (
        <div className="cs_newsletter_1_wrap">
            <div className="container">
                <div className="cs_newsletter cs_style_1">
                    <div className="cs_newsletter_left">
                        {section_title && (
                            <h2
                                className="cs_newsletter_title"
                                dangerouslySetInnerHTML={{
                                    __html: section_title
                                }}
                            />
                        )}
                        {section_subtitle && (
                            <p
                                className="cs_newsletter_subtitle"
                                dangerouslySetInnerHTML={{
                                    __html: section_subtitle
                                }}
                            />
                        )}
                    </div>
                    <div className="cs_newsletter_right">
                        {form_label && (
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: form_label
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
