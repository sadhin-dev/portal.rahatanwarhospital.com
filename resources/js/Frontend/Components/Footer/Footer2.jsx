import MenuWidget from "../Widget/MenuWidget"
import SocialWidget from "../Widget/SocialWidget"
import organizeMenusIntoHierarchy from "@/utils/organizeMenusIntoHierarchy"
import { useSelector } from "react-redux"
import translate from "@/utils/translate"
import { usePage } from "@inertiajs/react"
import { Icon } from "@iconify/react"
import Newsletter from "../Widget/Newsletter"
export default function Footer2() {
    const { lang } = usePage().props
    const customize = useSelector((state) => state.customize)
    const { currentLang } = useSelector((state) => state.pages)
    const currentLanguage = currentLang ?? lang.default_lang

    const FooterMenuOne = localStorage.getItem("footer_menu_one") ? JSON.parse(localStorage.getItem("footer_menu_one")) : []
    const footer_menu_one = FooterMenuOne ? organizeMenusIntoHierarchy(FooterMenuOne[currentLanguage]) : []

    const FooterMenuTwo = localStorage.getItem("footer_menu_two") ? JSON.parse(localStorage.getItem("footer_menu_two")) : []
    const footer_menu_two = FooterMenuTwo ? organizeMenusIntoHierarchy(FooterMenuTwo[currentLanguage]) : []

    const FooterMenuThree = localStorage.getItem("footer_menu_three") ? JSON.parse(localStorage.getItem("footer_menu_three")) : []
    const footer_menu_three = FooterMenuThree ? organizeMenusIntoHierarchy(FooterMenuThree[currentLanguage]) : []

    return (
        <footer className="cs_footer cs_style_2 cs_accent_bg cs_white_color">
            <div className="container">
                <div className="cs_footer_in">
                    <div className="cs_footer_col">
                        <div className="cs_footer_item">
                            <div className="cs_text_widget">
                                {Boolean(Number(customize?.footer?.footer_is_show_logo)) && (
                                    <img src={customize.general.site_logo_light} alt="Logo" />
                                )}
                                {customize.footer.footer_is_show_contact_info == "1" && (
                                    <p
                                        className="cs_medium"
                                        dangerouslySetInnerHTML={{
                                            __html: translate("ProHealth Medical & Healthcare Center")
                                        }}
                                    />
                                )}
                            </div>
                            {customize.footer.footer_is_show_contact_info == "1" && (
                                <ul className="cs_contact_widget">
                                    {customize?.contact?.contact_address && (
                                        <li>
                                            <i className="cs_accent_color">
                                                <Icon icon="fa-solid:map-marker-alt" />
                                            </i>
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: customize?.contact?.contact_address
                                                }}
                                            />
                                        </li>
                                    )}
                                    {customize?.contact?.contact_address && (
                                        <li>
                                            <i className="cs_accent_color">
                                                <Icon icon="fa-solid:phone-alt" />
                                            </i>
                                            <a href={`tel:${customize?.contact?.contact_phone_number}`}>
                                                {customize?.contact?.contact_phone_number}
                                            </a>
                                        </li>
                                    )}
                                    {customize?.contact?.contact_address && (
                                        <li>
                                            <i className="cs_accent_color">
                                                <Icon icon="fa-solid:envelope" />
                                            </i>
                                            <a href={`mailto:${customize?.contact?.contact_email}`}>
                                                {customize?.contact?.contact_email}
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>
                    {Boolean(Number(customize?.footer?.footer_is_show_footer_menu_one)) && (
                        <div className="cs_footer_col">
                            <div className="cs_footer_item">
                                <MenuWidget menus={footer_menu_one} />
                            </div>
                        </div>
                    )}
                    {Boolean(Number(customize?.footer?.footer_is_show_footer_menu_two)) && (
                        <div className="cs_footer_col">
                            <div className="cs_footer_item">
                                <MenuWidget menus={footer_menu_two} />
                            </div>
                        </div>
                    )}
                    <div className="cs_footer_col">
                        <div className="cs_footer_item">
                            {Boolean(Number(customize?.footer?.footer_is_show_footer_menu_three)) && (
                                <MenuWidget menus={footer_menu_three} />
                            )}
                            {customize.footer.footer_is_show_social_media == "1" && (
                                <div className="cs_social_links_wrap">
                                    <h2 className="cs_white_color">{translate("Follow Us")}</h2>
                                    <SocialWidget />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="cs_footer_bottom">
                <div className="container">
                    <div
                        className="cs_copyright"
                        dangerouslySetInnerHTML={{
                            __html: customize.footer.copyright_text
                        }}
                    />
                </div>
            </div>
        </footer>
    )
}
