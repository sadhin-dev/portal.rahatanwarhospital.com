import React, { useEffect, useState } from "react"
import { Link, usePage } from "@inertiajs/react"
import organizeMenusIntoHierarchy from "@/utils/organizeMenusIntoHierarchy"
import MenuItem from "@/Admin/Components/Header/MenuItem"
import { useSelector } from "react-redux"
import SideHeader from "./SideHeader"
import LanguageDropdown from "./LanguageDropdown"
import Button from "../Button"
import { Icon } from "@iconify/react"
import gravatarUrl from "gravatar-url"
import { showAlert } from "@/Admin/Utils/SweetAlert"
import translate from "@/utils/translate"

export default function Header2() {
    const { currentLang, pageInfo } = useSelector((state) => state.pages)
    const currentLangPageInfo = pageInfo[currentLang]
    const customize = useSelector((state) => state.customize)
    const [sideHeaderToggle, setSideHeaderToggle] = useState(false)
    const [mobileToggle, setMobileToggle] = useState(false)
    const [isSticky, setIsSticky] = useState()
    const { lang, auth } = usePage().props
    const currentLanguage = currentLang ?? lang.default_lang
    const mainMenus = localStorage.getItem("main_menu") ? JSON.parse(localStorage.getItem("main_menu")) : []
    const menus = mainMenus ? organizeMenusIntoHierarchy(mainMenus[currentLanguage]) : []
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

    const handleProfileDropdownToggle = () => setProfileDropdownOpen(!profileDropdownOpen)

    // handle logout
    const handleLogout = () => {
        showAlert(
            `${translate("Are you sure")}?`,
            `${translate("You want to logout this session")}?`,
            `${translate("Logout")}!`,
            () => {
                router.post(route("logout"))
            }
        )
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".cs_dropdown_wrap")) {
                setProfileDropdownOpen(false)
            }
        }

        if (profileDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [profileDropdownOpen])

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 0) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        })
    }, [])

    return (
        <>
            <header
                className={`cs_site_header cs_style1 cs_color_2 cs_heading_color cs_sticky_header ${
                    isSticky ? " cs_sticky_active" : ""
                }`}
            >
                <div className="cs_main_header">
                    <div className="container">
                        <div className="cs_main_header_in">
                            <div className="cs_main_header_left">
                                <Link className="cs_site_branding" to="/" href="/">
                                    <img src={customize?.general?.site_logo_dark} alt={customize?.general?.site_name} />
                                </Link>
                                <div className="cs_nav">
                                    <nav className={`cs_nav_list_wrap${mobileToggle ? " cs_active" : ""}`}>
                                        <ul className="cs_nav_list">
                                            {menus.map((menuItem) => (
                                                <MenuItem setMobileToggle={setMobileToggle} key={menuItem.id} item={menuItem} />
                                            ))}
                                        </ul>
                                    </nav>
                                    <span
                                        className={`cs_menu_toggle${mobileToggle ? " cs_toggle_active" : ""}`}
                                        onClick={() => setMobileToggle(!mobileToggle)}
                                    >
                                        <span></span>
                                    </span>
                                </div>
                            </div>
                            <div className="cs_main_header_right">
                                <div className="cs_toolbox">
                                    {Object.entries(lang.languages).length > 1 && <LanguageDropdown />}
                                    {auth?.is_loggedIn ? (
                                        <div className="cs_dropdown_wrap">
                                            <div
                                                onClick={handleProfileDropdownToggle}
                                                className={`cs_header_user_btn ${profileDropdownOpen ? "active" : ""}`}
                                            >
                                                <img src={gravatarUrl(auth?.user?.email)} alt="" />
                                            </div>
                                            {profileDropdownOpen && (
                                                <div className="cs_header_user_dropdown">
                                                    <div className="cs_header_user_info">
                                                        <img src={gravatarUrl(auth?.user?.email)} alt="" />
                                                        <h4 className="">{auth?.user?.name}</h4>
                                                        <p className="">{auth?.user?.email}</p>
                                                    </div>
                                                    <ul className="cs_header_user_list cs_mp0">
                                                        <li>
                                                            <Link href={route("user.dashboard")}>{translate("Dashboard")}</Link>
                                                        </li>
                                                        <li>
                                                            <Link href={route("user.orders")}>{translate("My Orders")}</Link>
                                                        </li>
                                                        <li>
                                                            <Link href={route("user.profile.edit")}>{translate("Profile")}</Link>
                                                        </li>
                                                        <li>
                                                            <a href="#" onClick={handleLogout}>
                                                                {translate("Logout")}
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="cs_header_user_btn active d-flex">
                                            <Link href={route("login.create")} className="cs_tooltip">
                                                <Icon icon="lucide:circle-user-round" width="32" height="32" />
                                                <span className="cs_tooltip_text">{translate("Login")}</span>
                                            </Link>
                                        </div>
                                    )}
                                    {(currentLangPageInfo?.header_action_button_url ||
                                        currentLangPageInfo?.header_action_button_text) && (
                                        <Button
                                            href={currentLangPageInfo?.header_action_button_url}
                                            btnText={currentLangPageInfo?.header_action_button_text}
                                            btnClass="cs_btn cs_style_1"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <SideHeader sideHeaderToggle={sideHeaderToggle} setSideHeaderToggle={setSideHeaderToggle} customize={customize} />
        </>
    )
}
