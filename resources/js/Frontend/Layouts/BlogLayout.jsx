import PageHeading from "@/Frontend/Components/PageHeading"
import Sidebar from "@/Frontend/Components/Sidebar"
import Footer from "../Components/Footer"
import Header from "../Components/Header"
import { Link, usePage } from "@inertiajs/react"
import { Icon } from "@iconify/react"
import FrontendLayout from "./FrontendLayout"

export default function BlogLayout({
    children,
    pageHeaderData,
    blogDetails,
    blogDetailsTitle,
    blogDetailsThumbnailImageUrl,
    blogDetailsCategory,
    blogSlug,
    blogDetailsDate,
    blogDetailsUser,
    is_show_blog_details_sidebar,
    blogList
}) {
    const { breadcrumb_image, is_show_breadcrumb } = JSON.parse(localStorage.getItem("page_settings")) || {}
    const { categories, tags, recent_post, slug } = usePage().props

    // categories
    const customizedCategories = categories?.map((item) => {
        return {
            title: item?.content?.title,
            url: route("pages.show", {
                slug: slug,
                filter: { category: item?.content?.title }
            })
        }
    })

    // tags
    const customizedTags = tags?.map((tag) => {
        return {
            title: tag,

            url: route("pages.show", {
                filter: { tag: tag },
                slug: slug
            })
        }
    })
    return (
        <FrontendLayout>
            <div className="">
                <div className="cs_height_170"></div>
                <div className="container">
                    <ol className="breadcrumb">
                        {pageHeaderData?.breadcrumb?.map((item) => (
                            <li className="breadcrumb-item">
                                {item.url ? (
                                    <Link href={item.url}>{item.label}</Link>
                                ) : (
                                    <span className="search current-item">{item.label}</span>
                                )}
                            </li>
                        ))}
                    </ol>
                    <div className="cs_height_18"></div>
                    {pageHeaderData.title && <h1 className="cs_fs_72 mb-0">{pageHeaderData.title}</h1>}
                    <div className="cs_height_54"></div>
                </div>
            </div>
            {blogList ? (
                <div className="container cs_blog_list_content_section">{children}</div>
            ) : (
                <div className="container cs_blog_details_content_section">
                    <div className="cs_blog_details_info">
                        <div className="cs_blog_details_info_left">
                            <div className="cs_blog_details_tags">
                                {customizedTags?.map((tag, index) => (
                                    <Link href={tag.url} className="tag-cloud-link" key={index}>
                                        {tag.title}
                                    </Link>
                                ))}
                            </div>
                            <div className="cs_blog_details_date">
                                {blogDetailsDate} | {blogDetailsUser}
                            </div>
                        </div>
                        <div className="cs_social_links_wrap">
                            <h2>Share:</h2>
                            <div className="cs_social_links">
                                <a
                                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${route("blog.show", blogSlug)}`}
                                    target="_blank"
                                >
                                    <Icon icon="fa6-brands:linkedin-in" width="16" height="16" />
                                </a>
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${route("blog.show", blogSlug)}`}
                                    target="_blank"
                                >
                                    <Icon icon="fa6-brands:facebook-f" width="16" height="16" />
                                </a>
                                <a href={`https://twitter.com/intent/tweet?url=${route("blog.show", blogSlug)}`} target="_blank">
                                    <Icon icon="fa6-brands:twitter" width="16" height="16" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="cs_height_55"></div>
                    {blogDetailsThumbnailImageUrl && (
                        <>
                            <img src={blogDetailsThumbnailImageUrl} alt="" className="w-100 cs_radius_20" />
                            <div className="cs_height_90 cs_height_lg_50"></div>
                        </>
                    )}
                    <div className="row">
                        <div className={`${is_show_blog_details_sidebar === "1" ? "col-lg-8" : "col-lg-12"}`}>{children}</div>
                        {is_show_blog_details_sidebar === "1" && (
                            <div className="col-lg-4">
                                <Sidebar
                                    recent_post={recent_post}
                                    customizedCategories={customizedCategories}
                                    customizedTags={customizedTags}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="cs_height_150 cs_height_lg_80"></div>
        </FrontendLayout>
    )
}
