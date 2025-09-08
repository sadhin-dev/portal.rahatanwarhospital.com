import MenuWidget from "../Widget/MenuWidget"
import Newsletter from "../Widget/Newsletter"
import SocialWidget from "../Widget/SocialWidget"
import organizeMenusIntoHierarchy from "@/utils/organizeMenusIntoHierarchy"
import { useSelector } from "react-redux"
import translate from "@/utils/translate"
import { usePage } from "@inertiajs/react"
import { Icon } from "@iconify/react"
export default function Footer() {
    const { lang } = usePage().props
    const customize = useSelector((state) => state.customize)
    const { currentLang } = useSelector((state) => state.pages)
    const currentLanguage = currentLang ?? lang.default_lang

    const FooterMenuOne = localStorage.getItem("footer_menu_one") ? JSON.parse(localStorage.getItem("footer_menu_one")) : []
    const footer_menu_one = FooterMenuOne ? organizeMenusIntoHierarchy(FooterMenuOne[currentLanguage]) : []

    const FooterMenuTwo = localStorage.getItem("footer_menu_two") ? JSON.parse(localStorage.getItem("footer_menu_two")) : []
    const footer_menu_two = FooterMenuTwo ? organizeMenusIntoHierarchy(FooterMenuTwo[currentLanguage]) : []

    return (
        <footer className="cs_footer cs_style_1 cs_heading_color">
            <div
                className="cs_footer_logo_wrap"
                style={{ backgroundImage: `url(${customize?.footer?.footer_background_image_url})` }}
            >
                {Boolean(Number(customize?.footer?.footer_is_show_logo)) && (
                    <div className="cs_footer_brand">
                        <svg
                            width={426}
                            height={448}
                            color="#86BBF1"
                            viewBox="0 0 426 448"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g filter="url(#filter0_d_13_2673)">
                                <path
                                    d="M206.854 81C174.903 99.4444 107.638 114.367 78 119.523V242.388C88.7281 323.637 168.373 354.65 206.854 360C302.008 346.225 332.599 275.853 336 242.388V119.523C288.19 113.219 229.982 91.2144 206.854 81Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M206.854 81C174.903 99.4444 107.638 114.367 78 119.523V242.388C88.7281 323.637 168.373 354.65 206.854 360C302.008 346.225 332.599 275.853 336 242.388V119.523C288.19 113.219 229.982 91.2144 206.854 81Z"
                                    stroke="white"
                                    strokeWidth={11}
                                />
                            </g>
                            <defs>
                                <filter
                                    id="filter0_d_13_2673"
                                    x="0.5"
                                    y="0.84082"
                                    width={425}
                                    height="446.714"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                >
                                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                    <feColorMatrix
                                        in="SourceAlpha"
                                        type="matrix"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                        result="hardAlpha"
                                    />
                                    <feMorphology
                                        radius={8}
                                        operator="dilate"
                                        in="SourceAlpha"
                                        result="effect1_dropShadow_13_2673"
                                    />
                                    <feOffset dx={6} dy={4} />
                                    <feGaussianBlur stdDeviation={35} />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix
                                        type="matrix"
                                        values="0 0 0 0 0.188235 0 0 0 0 0.482353 0 0 0 0 0.768627 0 0 0 0.09 0"
                                    />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2673" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_13_2673" result="shape" />
                                </filter>
                            </defs>
                        </svg>
                        <img src={customize?.footer?.footer_icon_url} alt="Logo Icon" className="cs_footer_brand_icon" />
                        <h2 className="cs_footer_brand_text">{translate("ProHealth")}</h2>
                    </div>
                )}
            </div>
            <div className="cs_footer_main">
                <div className="container">
                    <div className="row justify-content-center">
                        {Boolean(Number(customize?.footer?.footer_is_show_contact_info)) && (
                            <div className="col-lg-4">
                                <div className="cs_footer_item">
                                    <div className="cs_text_widget">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: translate("ProHealth Medical & Healthcare Center")
                                            }}
                                        />
                                    </div>
                                    <ul className="cs_contact_widget">
                                        {customize?.contact?.contact_address && (
                                            <li>
                                                <i className="cs_accent_bg cs_white_color">
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
                                                <i className="cs_accent_bg cs_white_color">
                                                    <Icon icon="fa-solid:phone-alt" />
                                                </i>
                                                <a href={`tel:${customize?.contact?.contact_phone_number}`}>
                                                    {customize?.contact?.contact_phone_number}
                                                </a>
                                            </li>
                                        )}
                                        {customize?.contact?.contact_address && (
                                            <li>
                                                <i className="cs_accent_bg cs_white_color">
                                                    <Icon icon="fa-solid:envelope" />
                                                </i>
                                                <a href={`mailto:${customize?.contact?.contact_email}`}>
                                                    {customize?.contact?.contact_email}
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        )}
                        {Boolean(Number(customize?.footer?.footer_is_show_footer_menu_one)) && (
                            <div className="col-lg-2">
                                <div className="cs_footer_item">
                                    <MenuWidget menus={footer_menu_one} />
                                </div>
                            </div>
                        )}
                        {Boolean(Number(customize?.footer?.footer_is_show_footer_menu_two)) && (
                            <div className="col-lg-2">
                                <div className="cs_footer_item">
                                    <MenuWidget menus={footer_menu_two} />
                                </div>
                            </div>
                        )}
                        {Boolean(Number(customize?.footer?.footer_is_show_newslatter)) && (
                            <div className="col-lg-4">
                                <div className="cs_footer_item">
                                    <div className="cs_newsletter cs_style1">
                                        <h2
                                            className="cs_newsletter_title"
                                            dangerouslySetInnerHTML={{
                                                __html: translate("Be Our Subscribers")
                                            }}
                                        />
                                        <p
                                            className="cs_newsletter_subtitle mb-0"
                                            dangerouslySetInnerHTML={{
                                                __html: translate("To get the latest news about health from our experts")
                                            }}
                                        />
                                        <Newsletter
                                            placeholder={translate("example@email.com")}
                                            inputFormClass="cs_newsletter_input"
                                            btnText={translate("Submit")}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="cs_footer_bottom cs_accent_bg">
                <div className="container">
                    <div
                        className={`cs_footer_bottom_in${
                            customize.footer.footer_is_show_social_media == "1" ? "" : " justify-content-center"
                        }`}
                    >
                        {customize.footer.footer_is_show_social_media == "1" && (
                            <div className="cs_social_links_wrap">
                                <h2 className="cs_white_color">{translate("Follow Us")}</h2>
                                <SocialWidget />
                            </div>
                        )}

                        <div
                            className="cs_copyright"
                            dangerouslySetInnerHTML={{
                                __html: customize.footer.copyright_text
                            }}
                        />
                    </div>
                </div>
            </div>
        </footer>
    )
}
