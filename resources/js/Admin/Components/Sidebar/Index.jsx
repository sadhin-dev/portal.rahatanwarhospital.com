import { Link, usePage } from "@inertiajs/react"
import { useState } from "react"
import hasPermission from "@/Admin/Utils/hasPermission"
import translate from "@/utils/translate"
import { Icon } from "@iconify/react"

export default function Sidebar() {
    const { auth, isEnabledEcommerce, isEnabledDoctors, isEnabledDepartments } = usePage().props
    const [toggle, setToggle] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    // Helper function to check if a route matches any of the patterns
    const isRouteActive = (patterns) => {
        return patterns.some((pattern) => route().current(pattern))
    }

    // Determine initially active menu based on current route
    const initialActiveMenu = () => {
        if (
            isRouteActive([
                "admin.products.*",
                "admin.product.categories.*",
                "admin.coupons.*",
                "admin.product.tags.*",
                "admin.reviews.*"
            ])
        )
            return "products"
        if (isRouteActive(["admin.orders.*"])) return "orders"
        if (isRouteActive(["admin.posts.*", "admin.categories.*", "admin.tags.*"])) return "posts"
        if (isRouteActive(["admin.pages.*"])) return "pages"
        if (isRouteActive(["admin.themes.*", "admin.menus.*"])) return "appearance"
        if (isRouteActive(["admin.departments.*"])) return "departments"
        if (isRouteActive(["admin.doctors.*"])) return "doctors"
        if (isRouteActive(["admin.testimonials.*"])) return "testimonials"
        if (isRouteActive(["admin.users.*", "admin.roles.permissions.*"])) return "users"
        if (
            isRouteActive([
                "admin.settings.*",
                "admin.languages.*",
                "admin.translations.*",
                "admin.settings.currency.setting",
                "admin.settings.invoice",
                "admin.settings.social.login",
                "admin.manual.payment.gateway.*"
            ])
        )
            return "settings"
        return null
    }

    const [activeMenu, setActiveMenu] = useState(initialActiveMenu())

    const handleToggle = () => {
        const body = document.body
        if (toggle) {
            setToggle(false)
            body.classList.remove("yoo-sidebar-active")
        } else {
            setToggle(true)
            body.classList.add("yoo-sidebar-active")
        }
    }

    const toggleMenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu)
    }

    return (
        <>
            <div className="yoo-sidebarheader-toggle" onClick={handleToggle}>
                <div className="yoo-button-bar1" />
                <div className="yoo-button-bar2" />
                <div className="yoo-button-bar3" />
            </div>
            <div
                className={`yoo-sidebarheader yoo-with-boxed-icon${isHovered ? " yoo-hover-active" : ""}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="yoo-sidebarheader-in">
                    <div className="yoo-sidebar-nav">
                        <ul className="yoo-sidebar-nav-list yoo-mp0">
                            <li className={`${route().current("admin.dashboard") ? "active" : ""}`}>
                                <Link href={route("admin.dashboard")}>
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-indigo-bg">
                                            <Icon icon="ion:cube-outline" width="20" height="20" />
                                        </span>
                                        <span className="yoo-sidebar-link-text">{translate("Dashboard")}</span>
                                    </span>
                                </Link>
                            </li>

                            {/* Posts Menu */}
                            <li className={`yoo-sidebar-has-children ${activeMenu === "posts" ? "active" : ""}`}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        toggleMenu("posts")
                                    }}
                                >
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-blue-bg">
                                            <Icon icon="ion:newspaper-outline" width="20" height="20" />
                                        </span>
                                        <span className="yoo-sidebar-link-text">{translate("Posts")}</span>
                                    </span>
                                    <span className="yoo-dropdown-arrow">
                                        <Icon
                                            icon={activeMenu === "posts" ? "ion:chevron-down" : "ion:chevron-forward"}
                                            width="16"
                                            height="16"
                                        />
                                    </span>
                                </a>
                                <ul className={`yoo-sidebar-nav-dropdown ${activeMenu === "posts" ? "active" : ""}`}>
                                    {hasPermission("posts.index") && (
                                        <li className={`${route().current("admin.posts.index") && "active"}`}>
                                            <Link href={route("admin.posts.index")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("All Posts")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("posts.create") && (
                                        <li className={`${route().current("admin.posts.create") && "active"}`}>
                                            <Link href={route("admin.posts.create")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Add new")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("post_category.index") && (
                                        <li className={`${route().current("admin.categories.*") && "active"}`}>
                                            <Link href={route("admin.categories.index")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Categories")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("post_tags.index") && (
                                        <li className={`${route().current("admin.tags.index") && "active"}`}>
                                            <Link href={route("admin.tags.index")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Tags")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </li>

                            {/* Comments */}
                            {hasPermission("comments.index") && (
                                <li className={`${route().current("admin.comments.*") ? "active" : ""}`}>
                                    <Link href={route("admin.comments.index")}>
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-light-blue-bg">
                                                <Icon icon="ion:chatbox-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Comments")}</span>
                                        </span>
                                    </Link>
                                </li>
                            )}

                            {/* Products Menu */}
                            {isEnabledEcommerce === "1" && (
                                <li className={`yoo-sidebar-has-children ${activeMenu === "products" ? "active" : ""}`}>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            toggleMenu("products")
                                        }}
                                    >
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-pink-bg">
                                                <Icon icon="ion:bag-handle-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Products")}</span>
                                        </span>
                                        <span className="yoo-dropdown-arrow">
                                            <Icon
                                                icon={activeMenu === "products" ? "ion:chevron-down" : "ion:chevron-forward"}
                                                width="16"
                                                height="16"
                                            />
                                        </span>
                                    </a>
                                    <ul className={`yoo-sidebar-nav-dropdown ${activeMenu === "products" ? "active" : ""}`}>
                                        {hasPermission("products.index") && (
                                            <li className={`${route().current("admin.products.*") && "active"}`}>
                                                <Link href={route("admin.products.index")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("Products")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        {hasPermission("product_categories.index") && (
                                            <li className={`${route().current("admin.product.categories.*") && "active"}`}>
                                                <Link href={route("admin.product.categories.index")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("Categories")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        {hasPermission("product_tags.index") && (
                                            <li className={`${route().current("admin.product.tags.*") && "active"}`}>
                                                <Link href={route("admin.product.tags.index")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("Tags")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        {hasPermission("coupons.index") && (
                                            <li className={`${route().current("admin.coupons.*") && "active"}`}>
                                                <Link href={route("admin.coupons.index")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("Coupons")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        {hasPermission("product_reviews.index") && (
                                            <li className={`${route().current("admin.reviews.*") && "active"}`}>
                                                <Link href={route("admin.reviews.index")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("Reviews")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                            )}

                            {/* Orders Menu */}
                            {isEnabledEcommerce === "1" && (
                                <>

                                    {hasPermission("orders.index") && (
                                        <li className={`yoo-sidebar-has-children ${activeMenu === "orders" ? "active" : ""}`}>
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    toggleMenu("orders")
                                                }}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-icon yoo-salmon-bg">
                                                        <Icon icon="ion:cart-outline" width="20" height="20" />
                                                    </span>
                                                    <span className="yoo-sidebar-link-text">{translate("Orders")}</span>
                                                </span>
                                                <span className="yoo-dropdown-arrow">
                                                    <Icon
                                                        icon={activeMenu === "orders" ? "ion:chevron-down" : "ion:chevron-forward"}
                                                        width="16"
                                                        height="16"
                                                    />
                                                </span>
                                            </a>
                                            <ul className={`yoo-sidebar-nav-dropdown ${activeMenu === "orders" ? "active" : ""}`}>
                                                <li
                                                    className={`${route().current("admin.orders.index") && !route().params.filter && "active"
                                                        }`}
                                                >
                                                    <Link href={route("admin.orders.index")}>
                                                        <span className="yoo-sidebar-link-title">
                                                            <span className="yoo-sidebar-link-text">{translate("All Orders")}</span>
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li
                                                    className={`${route().current("admin.orders.index", {
                                                        filter: {
                                                            payment_status: "2"
                                                        }
                                                    }) && "active"
                                                        }`}
                                                >
                                                    <Link
                                                        href={route("admin.orders.index", {
                                                            filter: {
                                                                payment_status: "2"
                                                            }
                                                        })}
                                                    >
                                                        <span className="yoo-sidebar-link-title">
                                                            <span className="yoo-sidebar-link-text">{translate("Completed Orders")}</span>
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li
                                                    className={`${route().current("admin.orders.index", {
                                                        filter: {
                                                            payment_status: "3"
                                                        }
                                                    }) && "active"
                                                        }`}
                                                >
                                                    <Link
                                                        href={route("admin.orders.index", {
                                                            filter: {
                                                                payment_status: "3"
                                                            }
                                                        })}
                                                    >
                                                        <span className="yoo-sidebar-link-title">
                                                            <span className="yoo-sidebar-link-text">{translate("Cancelled Orders")}</span>
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li
                                                    className={`${route().current("admin.orders.index", {
                                                        filter: {
                                                            payment_status: "1"
                                                        }
                                                    }) && "active"
                                                        }`}
                                                >
                                                    <Link
                                                        href={route("admin.orders.index", {
                                                            filter: {
                                                                payment_status: "1"
                                                            }
                                                        })}
                                                    >
                                                        <span className="yoo-sidebar-link-title">
                                                            <span className="yoo-sidebar-link-text">
                                                                {translate("Pending Payment Orders")}
                                                            </span>
                                                        </span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    )}
                                </>
                            )}

                            {/* Subscribers */}
                            {hasPermission("subscribers.index") && (
                                <li className={`${route().current("admin.subscribers.*") ? "active" : ""}`}>
                                    <Link href={route("admin.subscribers.index")}>
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-green-bg">
                                                <Icon icon="ion:mail-open-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Subscribers")}</span>
                                        </span>
                                    </Link>
                                </li>
                            )}

                            {/* Support Ticket */}
                            <li className={`${route().current("admin.tickets.*") ? "active" : ""}`}>
                                <Link href={route("admin.tickets.index")}>
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-salmon-bg">
                                            <Icon icon="ion:chatbubbles-outline" width="20" height="20" />
                                        </span>
                                        <span className="yoo-sidebar-link-text">{translate("Support Ticket")}</span>
                                    </span>
                                </Link>
                            </li>

                            {/* Form Response */}
                            {hasPermission("form_response.index") && (
                                <li className={`${route().current("admin.form.response.*") ? "active" : ""}`}>
                                    <Link href={route("admin.form.response.index")}>
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-orange-bg">
                                                <Icon icon="ion:mail-unread-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Form Response")}</span>
                                        </span>
                                    </Link>
                                </li>
                            )}
                            {/* Pricing Plan */}
                            {hasPermission("pricing_plans.index") && (
                                <li className={`${route().current("admin.pricing.plans.*") ? "active" : ""}`}>
                                    <Link href={route("admin.pricing.plans.index")}>
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-blue-bg">
                                                <Icon icon="ion:cash-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Pricing Plan")}</span>
                                        </span>
                                    </Link>
                                </li>
                            )}
                            {/* Payment History */}
                            {hasPermission("payment_history.index") && (
                                <li className={`${route().current("admin.payment.history.*") ? "active" : ""}`}>
                                    <Link href={route("admin.payment.history.index")}>
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-green-bg">
                                                <Icon icon="ion:card-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Payment History")}</span>
                                        </span>
                                    </Link>
                                </li>
                            )}
                            {/* Media */}
                            {hasPermission("media.index") && (
                                <li className={`${route().current("admin.media.library") ? "active" : ""}`}>
                                    <Link href={route("admin.media.library")}>
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-gray-bg">
                                                <Icon icon="ion:camera-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Media")}</span>
                                        </span>
                                    </Link>
                                </li>
                            )}
                            {/* Departments Menu */}
                            {isEnabledDepartments === "1" && (
                                <li className={`yoo-sidebar-has-children ${activeMenu === "departments" ? "active" : ""}`}>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            toggleMenu("departments")
                                        }}
                                    >
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-indigo-bg">
                                                <Icon icon="ion:shield-checkmark-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Departments")}</span>
                                        </span>
                                        <span className="yoo-dropdown-arrow">
                                            <Icon
                                                icon={activeMenu === "departments" ? "ion:chevron-down" : "ion:chevron-forward"}
                                                width="16"
                                                height="16"
                                            />
                                        </span>
                                    </a>
                                    <ul className={`yoo-sidebar-nav-dropdown ${activeMenu === "departments" ? "active" : ""}`}>
                                        {hasPermission("departments.index") && (
                                            <li className={`${route().current("admin.departments.index") && "active"}`}>
                                                <Link href={route("admin.departments.index")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("All Departments")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        {hasPermission("departments.create") && (
                                            <li className={`${route().current("admin.departments.create") && "active"}`}>
                                                <Link href={route("admin.departments.create")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("Add new")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        {hasPermission("department_categories.index") && (
                                            <li className={`${route().current("admin.departments.categories.index") && "active"}`}>
                                                <Link href={route("admin.departments.categories.index")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("Categories")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                            )}

                            {/* Doctors Menu */}
                            {isEnabledDoctors === "1" && (
                                <li className={`yoo-sidebar-has-children ${activeMenu === "doctors" ? "active" : ""}`}>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            toggleMenu("doctors")
                                        }}
                                    >
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-light-blue-bg">
                                                <Icon icon="ion:person-add-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Doctors")}</span>
                                        </span>
                                        <span className="yoo-dropdown-arrow">
                                            <Icon
                                                icon={activeMenu === "doctors" ? "ion:chevron-down" : "ion:chevron-forward"}
                                                width="16"
                                                height="16"
                                            />
                                        </span>
                                    </a>
                                    <ul className={`yoo-sidebar-nav-dropdown ${activeMenu === "doctors" ? "active" : ""}`}>
                                        {hasPermission("doctors.index") && (
                                            <li className={`${route().current("admin.doctors.index") && "active"}`}>
                                                <Link href={route("admin.doctors.index")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("All Doctors")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        {hasPermission("doctors.create") && (
                                            <li className={`${route().current("admin.doctors.create") && "active"}`}>
                                                <Link href={route("admin.doctors.create")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("Add new")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                            )}

                            {/* Pages Menu */}
                            <li className={`yoo-sidebar-has-children ${activeMenu === "pages" ? "active" : ""}`}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        toggleMenu("pages")
                                    }}
                                >
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-orange-bg">
                                            <Icon icon="ion:file-tray-full-outline" width="20" height="20" />
                                        </span>
                                        <span className="yoo-sidebar-link-text">{translate("Pages")}</span>
                                    </span>
                                    <span className="yoo-dropdown-arrow">
                                        <Icon
                                            icon={activeMenu === "pages" ? "ion:chevron-down" : "ion:chevron-forward"}
                                            width="16"
                                            height="16"
                                        />
                                    </span>
                                </a>
                                <ul className={`yoo-sidebar-nav-dropdown ${activeMenu === "pages" ? "active" : ""}`}>
                                    {hasPermission("pages.index") && (
                                        <li className={route().current("admin.pages.index") ? "active" : ""}>
                                            <Link href={route("admin.pages.index")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("All Pages")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("pages.create") && (
                                        <li>
                                            <Link href={route("admin.pages.create")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Add New Pages")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </li>

                            {/* Appearance Menu */}
                            <li className={`yoo-sidebar-has-children ${activeMenu === "appearance" ? "active" : ""}`}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        toggleMenu("appearance")
                                    }}
                                >
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-gray-bg">
                                            <Icon icon="ion:brush-outline" width="20" height="20" />
                                        </span>
                                        <span className="yoo-sidebar-link-text">{translate("Appearance")}</span>
                                    </span>
                                    <span className="yoo-dropdown-arrow">
                                        <Icon
                                            icon={activeMenu === "appearance" ? "ion:chevron-down" : "ion:chevron-forward"}
                                            width="16"
                                            height="16"
                                        />
                                    </span>
                                </a>
                                <ul className={`yoo-sidebar-nav-dropdown ${activeMenu === "appearance" ? "active" : ""}`}>
                                    {hasPermission("appearance.customize") && (
                                        <li>
                                            <Link href={route("admin.customize.customize")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Customize")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("appearance.menus") && (
                                        <li className={route().current("admin.menus.index") ? "active" : ""}>
                                            <Link href={route("admin.menus.index")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Menus")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </li>

                            {/* Users Menu */}
                            <li className={`yoo-sidebar-has-children ${activeMenu === "users" ? "active" : ""}`}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        toggleMenu("users")
                                    }}
                                >
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-pink-bg">
                                            <Icon icon="ion:people-outline" width="20" height="20" />
                                        </span>
                                        <span className="yoo-sidebar-link-text">{translate("Users")}</span>
                                    </span>
                                    <span className="yoo-dropdown-arrow">
                                        <Icon
                                            icon={activeMenu === "users" ? "ion:chevron-down" : "ion:chevron-forward"}
                                            width="16"
                                            height="16"
                                        />
                                    </span>
                                </a>
                                <ul className={`yoo-sidebar-nav-dropdown ${activeMenu === "users" ? "active" : ""}`}>
                                    {hasPermission("users.index") && (
                                        <li className={route().current("admin.users.index") ? "active" : ""}>
                                            <Link href={route("admin.users.index")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("All Users")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("users.create") && (
                                        <li className={route().current("admin.users.create") ? "active" : ""}>
                                            <Link href={route("admin.users.create")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Add User")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {auth.user.role_name === "admin" && (
                                        <li className={route().current("admin.roles.permissions.*") ? "active" : ""}>
                                            <Link href={route("admin.roles.permissions.index")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        {translate("Role & Permission")}
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </li>

                            {/* Settings Menu */}
                            {hasPermission("settings.manage") && (
                                <li className={`yoo-sidebar-has-children ${activeMenu === "settings" ? "active" : ""}`}>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            toggleMenu("settings")
                                        }}
                                    >
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-blue-bg">
                                                <Icon icon="ion:cog-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Settings")}</span>
                                        </span>
                                        <span className="yoo-dropdown-arrow">
                                            <Icon
                                                icon={activeMenu === "settings" ? "ion:chevron-down" : "ion:chevron-forward"}
                                                width="16"
                                                height="16"
                                            />
                                        </span>
                                    </a>
                                    <ul className={`yoo-sidebar-nav-dropdown ${activeMenu === "settings" ? "active" : ""}`}>
                                        <li className={`${route().current("admin.settings.common.settings") && "active"}`}>
                                            <Link href={route("admin.settings.common.settings")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Common Settings")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className={`${route().current("admin.settings.google.captcha") && "active"}`}>
                                            <Link href={route("admin.settings.google.captcha")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        {translate("Google Captcha Setting")}
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className={`${route().current("admin.settings.payment.gateway") && "active"}`}>
                                            <Link href={route("admin.settings.payment.gateway")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Payment Gateways")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className={`${route().current("admin.manual.payment.gateway.*") && "active"}`}>
                                            <Link href={route("admin.manual.payment.gateway.index")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Manual Payment Gateways")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className={`${route().current("admin.settings.smtp.setting") && "active"}`}>
                                            <Link href={route("admin.settings.smtp.setting")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("SMTP Settings")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className={`${route().current("admin.settings.page.setting") && "active"}`}>
                                            <Link href={route("admin.settings.page.setting")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Page Settings")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className={`${route().current("admin.settings.currency.setting") && "active"}`}>
                                            <Link href={route("admin.settings.currency.setting")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        {translate("Currency Settings")}
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className={`${route().current("admin.languages.*") && "active"}`}>
                                            <Link href={route("admin.languages.index")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Languages")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className={`${route().current("admin.translations.*") && "active"}`}>
                                            <Link href={route("admin.translations.index")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Translation")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className={`${route().current("admin.settings.invoice") && "active"}`}>
                                            <Link href={route("admin.settings.invoice")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Invoice Settings")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className={`${route().current("admin.settings.social.login") && "active"}`}>
                                            <Link href={route("admin.settings.social.login")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">
                                                        {translate("Social Media Login")}
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
