import React from "react"
import RecentPost from "../Widget/RecentPost"
import SideMenuWidget from "../Widget/SideMenuWidget"
import translate from "@/utils/translate"
import Newsletter from "../Widget/Newsletter"

export default function Sidebar({ customizedCategories, recent_post }) {
    return (
        <div className="cs_sidebar">
            <SideMenuWidget title={translate("Popular Categories")} data={customizedCategories} />
            <RecentPost title={translate("Popular Articles")} data={recent_post} />
            <div className="cs_sidebar_item widget_categories">
                <div className="cs_newsletter cs_style2">
                    <h2 className="cs_newsletter_title">{translate("Newsletter Sign Up Form")}</h2>
                    <Newsletter
                        placeholder={translate("example@email.com")}
                        inputFormClass="cs_newsletter_input"
                        btnText={translate("Subscribe Newsletter")}
                    />
                </div>
            </div>
        </div>
    )
}
