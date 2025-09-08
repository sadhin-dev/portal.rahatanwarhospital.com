import PageHeading from "@/Frontend/Components/PageHeading"
import FrontendLayout from "@/Frontend/Layouts/FrontendLayout"
import React from "react"
import { Link, usePage } from "@inertiajs/react"
import translate from "@/utils/translate"
import { useState } from "react"
import { useEffect } from "react"
import { Icon } from "@iconify/react"
import ProhealthMeta from "@/utils/ProhealthMeta"

export default function Index({ search, search_results, meta_tags, tagline, site_name }) {
    const { breadcrumb_image, is_show_breadcrumb } = JSON.parse(localStorage.getItem("page_settings")) || {}
    const { isEnabledEcommerce, isEnabledDoctors, isEnabledDepartments } = usePage().props

    ProhealthMeta(tagline, "", meta_tags, "", "", site_name)

    let pageHeaderData = {
        title: `${translate("Search Results For")} "${search}"`,
        breadcrumb: [
            { label: "Home", url: "/" },
            { label: "Search", url: null }
        ]
    }

    const [posts, setPosts] = useState([])
    const [pages, setPages] = useState([])
    const [products, setProduct] = useState([])
    const [doctors, setDoctors] = useState([])
    const [departments, setDepartments] = useState([])

    useEffect(() => {
        setPosts(search_results.filter((item) => item.type === "post"))
        setPages(search_results.filter((item) => item.type === "page"))
        setProduct(search_results.filter((item) => item.type === "product"))
        setDoctors(search_results.filter((item) => item.type === "doctor"))
        setDepartments(search_results.filter((item) => item.type === "department"))
    }, [search])

    // Helper function to get the correct route for each content type
    const getItemUrl = (item) => {
        switch (item.type) {
            case "post":
                return `/blog/${item.slug}`
            case "department":
                return `/department/${item.slug}`
            case "doctor":
                return `/doctors/${item.slug}`
            case "product":
                return `/product/${item.slug}`
            case "page":
                return `/${item.slug}`
            default:
                return `/${item.type}/${item.slug}`
        }
    }

    // Calculate visible results count based on enabled content types
    const getEnabledResultsCount = () => {
        let count = 0
        count += posts.length
        count += pages.length
        count += isEnabledEcommerce !== "0" ? products.length : 0
        count += isEnabledDoctors !== "0" ? doctors.length : 0
        count += isEnabledDepartments !== "0" ? departments.length : 0
        return count
    }

    // Check if there are no results or if all content types are disabled/empty
    const hasNoResults = () => {
        return getEnabledResultsCount() === 0
    }

    return (
        <FrontendLayout headerLayout={"1"} footerLayout={"1"}>
            {is_show_breadcrumb === "1" && (
                <PageHeading
                    data={pageHeaderData}
                    is_show_breadcrumb={true}
                    bgSrc={breadcrumb_image ? breadcrumb_image : "/static/page_heading.svg"}
                />
            )}

            <div className="cs_search_section">
                <div className="container">
                    <div className="cs_search_info cs_mb_30">
                        {getEnabledResultsCount()} {translate("Results Found")}
                    </div>

                    {hasNoResults() ? (
                        <div className="cs_no_results cs_text_center cs_mt_40 cs_mb_40">
                            <h3 className="cs_mb_15">{translate("No results found")}</h3>
                            <p>Try searching with different keywords</p>
                        </div>
                    ) : (
                        <>
                            <div className="cs_search_result_wrap">
                                {doctors.length > 0 && isEnabledDoctors !== "0" && (
                                    <div className="cs_search_result">
                                        <h3 className="">
                                            Doctors <span>({doctors.length})</span>
                                        </h3>
                                        <ul className="cs_search_result_list">
                                            {doctors.map((doctor, index) => (
                                                <li key={index}>
                                                    <h4 className="cs_search_item_title cs_mb_10">
                                                        <Link href={getItemUrl(doctor)} className="cs_heading_color_hover">
                                                            <Icon icon="lucide:link-2" width="20" height="20" />
                                                            {doctor.title}
                                                        </Link>
                                                    </h4>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {products.length > 0 && isEnabledEcommerce !== "0" && (
                                    <div className="cs_search_result">
                                        <h3 className="">
                                            Products <span>({products.length})</span>
                                        </h3>
                                        <ul className="cs_search_result_list">
                                            {products.map((product, index) => (
                                                <li key={index}>
                                                    <h4 className="cs_search_item_title cs_mb_10">
                                                        <Link href={getItemUrl(product)} className="cs_heading_color_hover">
                                                            <Icon icon="lucide:link-2" width="20" height="20" />
                                                            {product.title}
                                                        </Link>
                                                    </h4>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {departments.length > 0 && isEnabledDepartments !== "0" && (
                                    <div className="cs_search_result">
                                        <h3 className="">
                                            Departments <span>({departments.length})</span>
                                        </h3>
                                        <ul className="cs_search_result_list">
                                            {departments.map((department, index) => (
                                                <li key={index}>
                                                    <h4 className="cs_search_item_title cs_mb_10">
                                                        <Link href={getItemUrl(department)} className="cs_heading_color_hover">
                                                            <Icon icon="lucide:link-2" width="20" height="20" />
                                                            {department.title}
                                                        </Link>
                                                    </h4>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {posts.length > 0 && (
                                    <div className="cs_search_result">
                                        <h3 className="">
                                            Posts <span>({posts.length})</span>
                                        </h3>
                                        <ul className="cs_search_result_list">
                                            {posts.map((post, index) => (
                                                <li key={index}>
                                                    <h4 className="cs_search_item_title cs_mb_10">
                                                        <Link href={getItemUrl(post)} className="cs_heading_color_hover">
                                                            <Icon icon="lucide:link-2" width="20" height="20" />
                                                            {post.title}
                                                        </Link>
                                                    </h4>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {pages.length > 0 && (
                                    <div className="cs_search_result">
                                        <h3 className="">
                                            Pages <span>({pages.length})</span>
                                        </h3>
                                        <ul className="cs_search_result_list">
                                            {pages.map((page, index) => (
                                                <li key={index}>
                                                    <h4 className="cs_search_item_title cs_mb_10">
                                                        <Link href={getItemUrl(page)} className="cs_heading_color_hover">
                                                            <Icon icon="lucide:link-2" width="20" height="20" />
                                                            {page.title}
                                                        </Link>
                                                    </h4>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </FrontendLayout>
    )
}
