import React from "react"
import { Link } from "@inertiajs/react"
import SocialWidget from "../Widget/SocialWidget"
import translate from "@/utils/translate"
import Newsletter from "../Widget/Newsletter"

export default function SideHeader({ sideHeaderToggle, setSideHeaderToggle, customize }) {
    return (
        <div className={`cs_sidenav${sideHeaderToggle ? " active" : ""}`}>
            <div className="cs_sidenav_overlay" onClick={() => setSideHeaderToggle(!sideHeaderToggle)} />
            <div className="cs_sidenav_in">
                <button className="cs_close" onClick={() => setSideHeaderToggle(!sideHeaderToggle)}>
                    <svg width={28} height={28} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.743 1.74333C2.70601 0.780314 3.95464 0.468314 4.53233 1.046L26.8469 23.3606C27.4246 23.9383 27.1126 25.1869 26.1496 26.1499C25.1868 27.1127 23.9379 27.4249 23.3603 26.8472L1.04567 4.53265C0.467986 3.95497 0.780218 2.70611 1.743 1.74333Z"
                            fill="#274760"
                        />
                        <path
                            d="M1.74333 26.1499C0.780314 25.1869 0.468314 23.9383 1.046 23.3606L23.3606 1.04599C23.9383 0.468325 25.1869 0.780311 26.1499 1.74333C27.1127 2.70611 27.4249 3.95498 26.8472 4.53265L4.53265 26.8472C3.95497 27.4249 2.70611 27.1127 1.74333 26.1499Z"
                            fill="#274760"
                        />
                    </svg>
                </button>
                {Boolean(Number(customize.sidebar.is_show_logo)) && (
                    <>
                        <div className="cs_logo_box">
                            <Link className="cs_site_branding" to="/" href="/">
                                <img src={customize?.general?.site_logo_dark} alt="Logo" />
                            </Link>
                            <div className="cs_height_15"></div>
                            <h3
                                className="cs_fs_24 cs_semibold mb-0"
                                dangerouslySetInnerHTML={{
                                    __html: translate("Your Partner in Health and Wellness")
                                }}
                            />
                        </div>
                        <div className="cs_height_35" />
                    </>
                )}
                <hr />
                <div className="cs_height_70 cs_height_lg_50" />
                {Boolean(Number(customize?.sidebar?.is_show_contact_info)) && (
                    <>
                        {customize?.contact?.contact_phone_number && (
                            <>
                                <div className="cs_iconbox cs_style_11 cs_radius_25">
                                    <div className="cs_iconbox_icon">
                                        <svg
                                            width={60}
                                            height={60}
                                            viewBox="0 0 60 60"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12.1587 39.884C18.0991 46.9581 25.25 52.528 33.4118 56.4691C36.5193 57.9362 40.675 59.6768 45.305 59.9751C45.5921 59.9876 45.8666 60 46.1537 60C49.2611 60 51.7571 58.9308 53.7913 56.7302C53.8038 56.7178 53.8287 56.6929 53.8412 56.668C54.565 55.7978 55.3887 55.0145 56.2498 54.1815C56.8364 53.622 57.4354 53.0377 58.0095 52.4409C60.6677 49.6809 60.6677 46.1749 57.9845 43.5019L50.4841 36.0298C49.2112 34.712 47.6887 34.0157 46.0913 34.0157C44.4939 34.0157 42.9588 34.712 41.6485 36.0174L37.1807 40.4683C36.7689 40.2321 36.3446 40.0207 35.9452 39.8218C35.446 39.5731 34.9843 39.3369 34.5724 39.0758C30.504 36.5023 26.81 33.1455 23.2782 28.8313C21.4936 26.581 20.2955 24.6913 19.4594 22.7642C20.6325 21.7074 21.7307 20.6009 22.7915 19.5193C23.1659 19.1339 23.5528 18.7484 23.9396 18.363C25.2875 17.0203 26.0113 15.4662 26.0113 13.8873C26.0113 12.3083 25.2999 10.7542 23.9396 9.41152L20.2207 5.70659C19.7839 5.27145 19.372 4.84874 18.9477 4.41359C18.1241 3.56817 17.263 2.69789 16.4143 1.91463C15.1289 0.658931 13.6189 0 12.0215 0C10.4365 0 8.91399 0.658931 7.57865 1.92706L2.91121 6.57688C1.21396 8.26772 0.253014 10.3191 0.0533375 12.6937C-0.183778 15.6651 0.365332 18.823 1.78803 22.6399C3.97199 28.5454 7.26665 34.0282 12.1587 39.884ZM3.09841 12.9548C3.24816 11.3013 3.88463 9.92126 5.08269 8.72772L9.72517 4.10278C10.449 3.40655 11.2477 3.046 12.0215 3.046C12.7827 3.046 13.5565 3.40655 14.2678 4.12764C15.104 4.89847 15.8902 5.70659 16.7388 6.56444C17.1631 6.99959 17.5999 7.43473 18.0367 7.8823L21.7557 11.5872C22.5294 12.3581 22.9288 13.1413 22.9288 13.9121C22.9288 14.683 22.5294 15.4662 21.7557 16.2371C21.3688 16.6225 20.9819 17.0203 20.5951 17.4057C19.4344 18.5744 18.3487 19.6809 17.1506 20.7377C17.1257 20.7625 17.1132 20.775 17.0882 20.7998C16.0524 21.8317 16.2147 22.8139 16.4643 23.5599C16.4767 23.5972 16.4892 23.622 16.5017 23.6593C17.4626 25.9594 18.798 28.1475 20.8821 30.7584C24.626 35.3585 28.5696 38.9266 32.9126 41.6743C33.4492 42.0224 34.0233 42.2959 34.5599 42.5694C35.0591 42.8181 35.5209 43.0543 35.9327 43.3154C35.9826 43.3402 36.0201 43.3651 36.07 43.39C36.4818 43.6013 36.8812 43.7008 37.2805 43.7008C38.2789 43.7008 38.9279 43.0667 39.14 42.8554L43.8075 38.2056C44.5313 37.4845 45.3175 37.099 46.0913 37.099C47.0397 37.099 47.8135 37.6834 48.3002 38.2056L55.8255 45.69C57.3231 47.1819 57.3106 48.7982 55.7881 50.3771C55.2639 50.9366 54.7148 51.4712 54.1282 52.0307C53.2547 52.8761 52.3436 53.7464 51.52 54.7286C50.0848 56.2702 48.3751 56.9913 46.1661 56.9913C45.954 56.9913 45.7294 56.9789 45.5172 56.9664C41.4238 56.7053 37.6175 55.114 34.7596 53.7588C26.9972 50.0166 20.1832 44.7078 14.5299 37.9693C9.87493 32.3871 6.7425 27.1902 4.67086 21.6204C3.38544 18.2014 2.89873 15.4538 3.09841 12.9548Z"
                                                fill="#307BC4"
                                            />
                                        </svg>
                                    </div>
                                    <div className="cs_iconbox_right">
                                        <h3
                                            className="cs_iconbox_title cs_fs_24 mb-0"
                                            dangerouslySetInnerHTML={{
                                                __html: translate("Phone")
                                            }}
                                        />
                                        <p className="cs_iconbox_subtitle mb-0 cs_heading_color">
                                            <a href={`tel:${customize?.contact?.contact_phone_number}`}>
                                                {customize?.contact?.contact_phone_number}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="cs_height_30" />
                            </>
                        )}
                        {customize?.contact?.contact_email && (
                            <>
                                <div className="cs_iconbox cs_style_11 cs_radius_25">
                                    <div className="cs_iconbox_icon">
                                        <svg
                                            width={80}
                                            height={60}
                                            viewBox="0 0 80 60"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M73.3333 0H6.66672C2.98984 0 0 2.98984 0 6.66672V53.3334C0 57.0102 2.98984 60 6.66672 60H73.3334C77.0102 60 80 57.0102 80 53.3333V6.66672C80 2.98984 77.0102 0 73.3333 0ZM6.66672 3.33328H73.3334C73.5791 3.33328 73.7955 3.42281 74.0259 3.47344C68.2542 8.75578 49.1161 26.2639 42.4188 32.2981C41.8947 32.7702 41.05 33.3333 40.0002 33.3333C38.9503 33.3333 38.1056 32.7702 37.5798 32.2966C30.8831 26.2633 11.7439 8.75422 5.97312 3.47375C6.20406 3.42313 6.42094 3.33328 6.66672 3.33328ZM3.33328 53.3333V6.66672C3.33328 6.34016 3.43172 6.04391 3.51984 5.74547C7.93734 9.78859 21.2911 22.0048 29.9498 29.8787C21.3192 37.2923 7.96203 49.9561 3.50937 54.202C3.43078 53.9186 3.33328 53.6414 3.33328 53.3333ZM73.3333 56.6667H6.66672C6.40047 56.6667 6.16375 56.5739 5.91516 56.5145C10.5162 52.1283 23.9584 39.3917 32.4373 32.1381C33.5427 33.1408 34.5523 34.055 35.3483 34.7722C36.722 36.0125 38.33 36.6667 40 36.6667C41.67 36.6667 43.278 36.0123 44.65 34.7738C45.4463 34.0563 46.4567 33.1412 47.5627 32.1381C56.042 39.3909 69.4823 52.1266 74.0848 56.5145C73.8363 56.5739 73.5998 56.6667 73.3333 56.6667ZM76.6667 53.3333C76.6667 53.6413 76.5692 53.9186 76.4908 54.202C72.0364 49.9539 58.6808 37.2916 50.0503 29.8789C58.7094 22.005 72.0611 9.78984 76.4802 5.74516C76.5683 6.04359 76.6667 6.34 76.6667 6.66656V53.3333Z"
                                                fill="#307BC4"
                                            />
                                        </svg>
                                    </div>
                                    <div className="cs_iconbox_right">
                                        <h3
                                            className="cs_iconbox_title cs_fs_24 mb-0"
                                            dangerouslySetInnerHTML={{
                                                __html: translate("Email")
                                            }}
                                        />
                                        <p className="cs_iconbox_subtitle mb-0 cs_heading_color">
                                            <a href={`mailto:${customize?.contact?.contact_email}`}>
                                                {customize?.contact?.contact_email}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="cs_height_30" />
                            </>
                        )}
                        {customize?.contact?.contact_address && (
                            <>
                                <div className="cs_iconbox cs_style_11 cs_radius_25">
                                    <div className="cs_iconbox_icon">
                                        <svg
                                            width={60}
                                            height={60}
                                            viewBox="0 0 60 60"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <mask
                                                id="mask0_35_1502"
                                                style={{ maskType: "luminance" }}
                                                maskUnits="userSpaceOnUse"
                                                x={0}
                                                y={0}
                                                width={60}
                                                height={60}
                                            >
                                                <path d="M0 0H60V60H0V0Z" fill="white" />
                                            </mask>
                                            <g mask="url(#mask0_35_1502)">
                                                <path
                                                    d="M30 58.2422C22.9688 47.6953 10.6641 33.3984 10.6641 21.0938C10.6641 10.4319 19.3382 1.75781 30 1.75781C40.6618 1.75781 49.3359 10.4319 49.3359 21.0938C49.3359 33.3984 37.0313 47.6953 30 58.2422Z"
                                                    stroke="#307BC4"
                                                    strokeWidth={2}
                                                    strokeMiterlimit={10}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M30 29.8824C25.1539 29.8824 21.2109 25.9394 21.2109 21.0934C21.2109 16.2473 25.1539 12.3043 30 12.3043C34.8461 12.3043 38.7891 16.2473 38.7891 21.0934C38.7891 25.9394 34.8461 29.8824 30 29.8824Z"
                                                    stroke="#307BC4"
                                                    strokeWidth={2}
                                                    strokeMiterlimit={10}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="cs_iconbox_right">
                                        <h3
                                            className="cs_iconbox_title cs_fs_24 mb-0"
                                            dangerouslySetInnerHTML={{
                                                __html: translate("Location")
                                            }}
                                        />
                                        <p
                                            className="cs_iconbox_subtitle mb-0 cs_heading_color"
                                            dangerouslySetInnerHTML={{
                                                __html: customize?.contact?.contact_address
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="cs_height_60" />
                            </>
                        )}
                    </>
                )}
                {Boolean(Number(customize?.sidebar?.is_show_subscribe)) && (
                    <div className="cs_newsletter cs_style1">
                        <h2
                            className="cs_newsletter_title"
                            dangerouslySetInnerHTML={{
                                __html: translate("Be Our Subscribers")
                            }}
                        />
                        <p
                            className="cs_newsletter_subtitle"
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
                )}

                {Boolean(Number(customize.sidebar.is_show_social_media)) && (
                    <>
                        <div className="cs_height_70 cs_height_lg_50"></div>
                        <hr />
                        <div className="cs_height_70 cs_height_lg_50"></div>
                        <div className="cs_social_links_wrap">
                            <h2>{translate("Follow Us")}</h2>
                            <SocialWidget />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
