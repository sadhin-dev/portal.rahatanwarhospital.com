import React, { useState, useEffect } from "react"
import NavigationLink from "@/Components/NavigationLink"
import { Icon } from "@iconify/react"

export default function Team3({ data }) {
    const { team_list } = data
    // State for active filter, current page, and view mode
    const [activeFilter, setActiveFilter] = useState("All")
    const [currentPage, setCurrentPage] = useState(1)
    const [viewMode, setViewMode] = useState("grid")
    const itemsPerPage = 12

    // Get unique categories from team_list
    const categories = ["All", ...new Set(team_list?.map((item) => item.team_member_category))]

    // Filter and paginate data
    const filteredData =
        activeFilter === "All" ? team_list : team_list?.filter((item) => item.team_member_category === activeFilter)

    const totalItems = filteredData?.length || 0
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const paginatedData = filteredData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    // Reset to first page when filter changes
    useEffect(() => {
        setCurrentPage(1)
    }, [activeFilter])

    // Handle pagination
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    // Generate pagination items
    const renderPagination = () => {
        const pages = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Always show first page
            pages.push(1)

            // Show ellipsis if current page is far from start
            if (currentPage > 3) {
                pages.push("...")
            }

            // Show current page and neighbors
            const start = Math.max(2, currentPage - 1)
            const end = Math.min(totalPages - 1, currentPage + 1)

            for (let i = start; i <= end; i++) {
                if (i > 1 && i < totalPages) {
                    pages.push(i)
                }
            }

            // Show ellipsis if current page is far from end
            if (currentPage < totalPages - 2) {
                pages.push("...")
            }

            // Always show last page
            pages.push(totalPages)
        }

        return (
            <ul className="cs_pagination_box">
                <li>
                    <a
                        href="#"
                        className={`cs_pagination_arrow cs_center ${currentPage === 1 ? "disabled" : ""}`}
                        onClick={(e) => {
                            e.preventDefault()
                            handlePageChange(currentPage - 1)
                        }}
                    >
                        <svg width={35} height={24} viewBox="0 0 35 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.465801 13.0789L11.6023 23.5789C11.9023 23.8522 12.3042 24.0034 12.7213 23.9999C13.1385 23.9965 13.5375 23.8388 13.8325 23.5607C14.1274 23.2825 14.2947 22.9063 14.2984 22.513C14.302 22.1197 14.1416 21.7408 13.8518 21.4579L5.43108 13.5184H33.4091C33.831 13.5184 34.2357 13.3604 34.534 13.0791C34.8324 12.7978 35 12.4163 35 12.0184C35 11.6206 34.8324 11.2391 34.534 10.9578C34.2357 10.6765 33.831 10.5184 33.4091 10.5184H5.43108L13.8518 2.57893C14.0038 2.44056 14.125 2.27505 14.2084 2.09204C14.2917 1.90903 14.3356 1.7122 14.3375 1.51303C14.3393 1.31386 14.2991 1.11635 14.2191 0.932003C14.1391 0.747658 14.0209 0.580179 13.8716 0.439341C13.7222 0.298502 13.5446 0.18712 13.349 0.111698C13.1535 0.0362778 12.944 -0.00167465 12.7328 5.53131e-05C12.5215 0.00178719 12.3128 0.0431671 12.1187 0.12178C11.9246 0.200394 11.749 0.314665 11.6023 0.457932L0.465801 10.9579C0.167549 11.2392 0 11.6207 0 12.0184C0 12.4162 0.167549 12.7976 0.465801 13.0789Z"
                                fill="currentColor"
                            />
                        </svg>
                    </a>
                </li>

                {pages.map((page, index) => (
                    <li key={index}>
                        {page === "..." ? (
                            <span className="cs_pagination_item cs_center">...</span>
                        ) : (
                            <a
                                className={`cs_pagination_item cs_center ${currentPage === page ? "active" : ""}`}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handlePageChange(page)
                                }}
                            >
                                {page}
                            </a>
                        )}
                    </li>
                ))}

                <li>
                    <a
                        href="#"
                        className={`cs_pagination_arrow cs_center ${currentPage === totalPages ? "disabled" : ""}`}
                        onClick={(e) => {
                            e.preventDefault()
                            handlePageChange(currentPage + 1)
                        }}
                    >
                        <svg width={35} height={24} viewBox="0 0 35 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M34.5342 13.0789L23.3977 23.5789C23.0977 23.8522 22.6958 24.0034 22.2787 23.9999C21.8615 23.9965 21.4625 23.8388 21.1675 23.5607C20.8726 23.2825 20.7053 22.9063 20.7016 22.513C20.698 22.1197 20.8584 21.7408 21.1482 21.4579L29.5689 13.5184H1.59092C1.16899 13.5184 0.764327 13.3604 0.465971 13.0791C0.167615 12.7978 0 12.4163 0 12.0184C0 11.6206 0.167615 11.2391 0.465971 10.9578C0.764327 10.6765 1.16899 10.5184 1.59092 10.5184H29.5689L21.1482 2.57893C20.9962 2.44056 20.875 2.27505 20.7916 2.09204C20.7083 1.90903 20.6644 1.7122 20.6625 1.51303C20.6607 1.31386 20.7009 1.11635 20.7809 0.932003C20.8609 0.747658 20.9791 0.580179 21.1284 0.439341C21.2778 0.298502 21.4554 0.18712 21.651 0.111698C21.8465 0.0362778 22.056 -0.00167465 22.2672 5.53131e-05C22.4785 0.00178719 22.6872 0.0431671 22.8813 0.12178C23.0754 0.200394 23.251 0.314665 23.3977 0.457932L34.5342 10.9579C34.8325 11.2392 35 11.6207 35 12.0184C35 12.4162 34.8325 12.7976 34.5342 13.0789Z"
                                fill="currentColor"
                            />
                        </svg>
                    </a>
                </li>
            </ul>
        )
    }

    return (
        <div className="container">
            <div className="cs_doctors_heading">
                <div className="cs_isotop_filter cs_style1">
                    <p className="mb-0">Sort by</p>
                    <ul className="cs_mp0">
                        {categories.map((category, index) => (
                            <li
                                key={index}
                                className={activeFilter === category ? "active" : ""}
                                onClick={() => setActiveFilter(category)}
                            >
                                <span>{category}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="cs_view_box">
                    <span>
                        We have <span className="cs_heading_color cs_semibold">{totalItems}</span> doctors
                    </span>
                    <div className="cs_view_box_in">
                        <button
                            type="button"
                            className={`cs_grid_view ${viewMode === "grid" ? "active" : ""}`}
                            onClick={() => setViewMode("grid")}
                        >
                            <svg width={25} height={25} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0 11.8571H11.8571V0H0V11.8571ZM1.5625 1.5625H10.2948V10.2948H1.5625V1.5625ZM13.1429 0V11.8571H25V0H13.1429ZM23.4375 10.2948H14.7052V1.5625H23.4375V10.2948ZM0 25H11.8571V13.1429H0V25ZM1.5625 14.7052H10.2948V23.4375H1.5625V14.7052ZM13.1429 25H25V13.1429H13.1429V25ZM14.7052 14.7052H23.4375V23.4375H14.7052V14.7052Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className={`cs_list_view ${viewMode === "list" ? "active" : ""}`}
                            onClick={() => setViewMode("list")}
                        >
                            <svg width={25} height={25} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0 11.8571H12.2396V0H0V11.8571ZM1.6129 1.5625H10.6267V10.2946H1.6129V1.5625ZM0 25H12.2396V13.1429H0V25ZM1.6129 14.7052H10.6267V23.4375H1.6129V14.7052ZM25 0.85022V2.41272H14.3731V0.85022H25ZM14.3731 9.44458H25V11.0071H14.3731V9.44458ZM14.3731 5.1475H25V6.71H14.3731V5.1475ZM14.3731 13.9929H25V15.5554H14.3731V13.9929ZM14.3731 22.5873H25V24.1498H14.3731V22.5873ZM14.3731 18.2902H25V19.8527H14.3731V18.2902Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="cs_height_65"></div>
            <div className={`row cs_gap_y_30 ${viewMode === "list" ? "cs_list_view_wrap" : "cs_grid_view_wrap"}`}>
                {paginatedData?.map((item, index) => (
                    <div className={viewMode === "list" ? "col-lg-12" : "col-lg-4"} key={index}>
                        <div className="cs_team cs_style_1 cs_type_2 text-center cs_radius_20 overflow-hidden">
                            <div className="cs_member_img">
                                {item.team_image_url && (
                                    <NavigationLink href={item.team_member_action_url} className="d-block">
                                        <img src={item.team_image_url} alt={item.team_member_name} />
                                    </NavigationLink>
                                )}
                                {item.team_member_category && (
                                    <div className="cs_label cs_white_color cs_accent_bg">{item.team_member_category}</div>
                                )}
                            </div>

                            <div className="cs_team_meta cs_white_bg">
                                <div>
                                    {item.team_member_name && (
                                        <h3 className="cs_member_name cs_fs_32">
                                            <NavigationLink href={item.team_member_action_url}>
                                                {item.team_member_name}
                                            </NavigationLink>
                                        </h3>
                                    )}
                                    {item.team_member_designation && (
                                        <p className="cs_member_designation cs_heading_color cs_medium">
                                            {item.team_member_designation}
                                        </p>
                                    )}
                                    {item.team_member_description && (
                                        <p
                                            className="cs_member_description"
                                            dangerouslySetInnerHTML={{
                                                __html: item.team_member_description
                                            }}
                                        />
                                    )}
                                </div>
                                <div>
                                    <div className="cs_social_links">
                                        {item?.social_btns?.map((socialItem, socialIndex) => (
                                            <React.Fragment key={socialIndex}>
                                                {(socialItem.social_icon_class || socialItem.social_action_url) && (
                                                    <NavigationLink href={socialItem.social_action_url}>
                                                        <i className="d-flex">
                                                            <Icon icon={socialItem.social_icon_class} width="16" height="16" />
                                                        </i>
                                                    </NavigationLink>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <>
                    <div className="cs_height_65"></div>
                    <div className="cs_pagination">{renderPagination()}</div>
                </>
            )}
        </div>
    )
}
