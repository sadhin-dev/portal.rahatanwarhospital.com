import React, { useEffect, useState } from "react"
import { Link, router, usePage } from "@inertiajs/react"
import organizeMenusIntoHierarchy from "@/utils/organizeMenusIntoHierarchy"
import MenuItem from "@/Admin/Components/Header/MenuItem"
import { useSelector } from "react-redux"
import SideHeader from "./SideHeader"
import GlobalSearch from "./GlobalSearch"
import LanguageDropdown from "./LanguageDropdown"
import { Icon } from "@iconify/react"
import gravatarUrl from "gravatar-url"
import { showAlert } from "@/Admin/Utils/SweetAlert"
import translate from "@/utils/translate"

export default function Header({ cart }) {
    const { cart_slug, auth } = usePage().props
    const { carts } = useSelector((state) => state.carts)
    const { currentLang } = useSelector((state) => state.pages)
    const customize = useSelector((state) => state.customize)
    const [sideHeaderToggle, setSideHeaderToggle] = useState(false)
    const [mobileToggle, setMobileToggle] = useState(false)
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
    const [isSticky, setIsSticky] = useState()
    const { lang } = usePage().props
    const currentLanguage = currentLang ?? lang.default_lang
    const mainMenus = localStorage.getItem("main_menu") ? JSON.parse(localStorage.getItem("main_menu")) : []
    const menus = mainMenus ? organizeMenusIntoHierarchy(mainMenus[currentLanguage]) : []

    const cartItemCount = carts?.reduce((total, item) => total + (item.quantity || 1), 0) || 0

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
        window.addEventListener("scroll", () => {
            if (window.scrollY > 0) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        })
    }, [])

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

    return (
        <>
            <header
                className={`cs_site_header cs_style1 cs_sticky_header cs_heading_color${isSticky ? " cs_sticky_active" : ""}`}
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
                                    <GlobalSearch />
                                    {Object.entries(lang.languages).length > 1 && <LanguageDropdown />}
                                    {cart && (
                                        <Link href={route("pages.show", { slug: cart_slug })} className="cart-counter">
                                            <Icon icon="lucide:shopping-bag" width="30" height="30" />
                                            {cartItemCount === 0 ? "" : <span>{cartItemCount}</span>}
                                        </Link>
                                    )}
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
                                    <button
                                        className="cs_toolbox_btn cs_sidebar_toggle_btn"
                                        onClick={() => setSideHeaderToggle(!sideHeaderToggle)}
                                    >
                                        <svg
                                            width={30}
                                            height={30}
                                            viewBox="0 0 35 30"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M0.483887 2.46544C0.483887 1.10383 1.14618 0 1.96315 0H33.5208C34.3377 0 35 1.10383 35 2.46544C35 3.82708 34.3377 4.93088 33.5208 4.93088H1.96315C1.14618 4.93088 0.483887 3.82708 0.483887 2.46544Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M0.483887 14.6694C0.483887 13.3074 1.14618 12.2039 1.96315 12.2039H33.5208C34.3377 12.2039 35 13.3074 35 14.6694C35 16.0309 34.3377 17.1348 33.5208 17.1348H1.96315C1.14618 17.1348 0.483887 16.0309 0.483887 14.6694Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M0.483887 26.6267C0.483887 25.2648 1.14618 24.1613 1.96315 24.1613H33.5208C34.3377 24.1613 35 25.2648 35 26.6267C35 27.9883 34.3377 29.0922 33.5208 29.0922H1.96315C1.14618 29.0922 0.483887 27.9883 0.483887 26.6267Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </button>
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
