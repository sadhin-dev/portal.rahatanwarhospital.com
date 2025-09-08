import Pagination from "@/Frontend/Components/Pagination"
import moment from "moment"
import BlogLayout from "@/Frontend/Layouts/BlogLayout"
import translate from "@/utils/translate"
import { Link } from "@inertiajs/react"
import SearchWidget from "@/Frontend/Components/Widget/SearchWidget"
import { Icon } from "@iconify/react"
import ProhealthMeta from "@/utils/ProhealthMeta"

export default function Blogs({ posts, search, filter, meta_tags, tagline, site_name, is_show_blog_details_sidebar, slug, title: pageTitle }) {
    ProhealthMeta(tagline, "", meta_tags, "", "", site_name)

    // page header data
    let pageHeaderData = {
        title: pageTitle,
        breadcrumb: [
            { label: translate("Home"), url: "/" },
            { label: pageTitle, url: null }
        ]
    }
    // dynamic assigned page header data
    if (filter.category) {
        pageHeaderData.title = `${translate("Category")}: ${filter.category}`
        pageHeaderData.breadcrumb = [
            { label: translate("Home"), url: "/" },
            { label: pageTitle, url: route("pages.show", slug) },
            { label: filter.category, url: null }
        ]
    } else if (filter.tag) {
        pageHeaderData.title = `Tag: ${filter.tag}`
        pageHeaderData.breadcrumb = [
            { label: translate("Home"), url: "/" },
            { label: pageTitle, url: route("pages.show", slug) },
            { label: filter.tag, url: null }
        ]
    } else if (search) {
        pageHeaderData.title = `${translate("Search Results for")}: ${search}`
        pageHeaderData.breadcrumb = [
            { label: translate("Home"), url: "/" },
            {
                label: `${translate("Search Results for")}: ${search}`,
                url: null
            }
        ]
    }
    return (
        <BlogLayout pageHeaderData={pageHeaderData} is_show_blog_details_sidebar={is_show_blog_details_sidebar} blogList={true}>
            {search && !posts.data.length ? (
                <div className="postbox__wrapper">
                    <section className="no-results not-found">
                        <div className="page-header">
                            <h1 className="page-title blog-search-title">{translate("Nothing Found")}</h1>
                        </div>
                        {/* .page-header */}
                        <div className="pageontent blog-search-content">
                            <p>
                                {translate(
                                    "Sorry, but nothing matched your search terms. Please try again with some different keywords."
                                )}
                            </p>
                            <SearchWidget />
                        </div>
                    </section>
                </div>
            ) : (
                <>
                    <div className="row cs_row_gap_50">
                        {posts.data.map((item, index) => (
                            <div className="col-xl-4 col-md-6" key={index}>
                                <div className="cs_post cs_style_1">
                                    {item?.thumbnail_image && (
                                        <Link
                                            href={route("blog.show", {
                                                slug: item.slug
                                            })}
                                            className="cs_post_thumb cs_view_mouse"
                                        >
                                            <img src={item?.thumbnail_image} alt="Post" />
                                        </Link>
                                    )}
                                    <div className="cs_post_info">
                                        <div>
                                            <div className="cs_post_meta">
                                                <div className="cs_posted_by">{moment(item?.created_at).format("ll")}</div>
                                                <div className="cs_post_social">
                                                    <a
                                                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${route(
                                                            "blog.show",
                                                            item?.slug
                                                        )}`}
                                                        target="_blank"
                                                        className="cs_center rounded-circle"
                                                    >
                                                        <Icon icon="fa6-brands:linkedin-in" width="16" height="16" />
                                                    </a>
                                                    <a
                                                        href={`https://www.facebook.com/sharer/sharer.php?u=${route(
                                                            "blog.show",
                                                            item?.slug
                                                        )}`}
                                                        target="_blank"
                                                        className="cs_center rounded-circle"
                                                    >
                                                        <Icon icon="fa6-brands:facebook-f" width="16" height="16" />
                                                    </a>
                                                    <a
                                                        href={`https://twitter.com/intent/tweet?url=${route(
                                                            "blog.show",
                                                            item?.slug
                                                        )}`}
                                                        target="_blank"
                                                        className="cs_center rounded-circle"
                                                    >
                                                        <Icon icon="fa6-brands:twitter" width="16" height="16" />
                                                    </a>
                                                </div>
                                            </div>
                                            <h2 className="cs_post_title cs_semibold cs_fs_32">
                                                <Link
                                                    href={route("blog.show", {
                                                        slug: item.slug
                                                    })}
                                                >
                                                    {item?.content?.title}
                                                </Link>
                                            </h2>
                                        </div>
                                        <div className="cs_heading_color cs_medium">
                                            <Link
                                                href={route("blog.show", {
                                                    slug: item.slug
                                                })}
                                                classID="cs_post_btn"
                                            >
                                                Learn More
                                            </Link>
                                        </div>

                                        {/* <div className="cs_post_meta">
                                    <span className="cs_medium cs_fs_18 cs_heading_color">{item?.category.content.title}</span>
                                    <span>{moment(item?.created_at).format("ll")}</span>
                                </div>
                                <h2 className="cs_post_title cs_fs_32 mb-0">
                                    <Link
                                        href={route("blog.show", {
                                            slug: item.slug
                                        })}
                                    >
                                        {item?.content?.title}
                                    </Link>
                                </h2> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {posts.links.length > 3 ? (
                        <>
                            <div className="cs_height_60 cs_height_lg_40"></div>
                            <Pagination links={posts.links} />
                        </>
                    ) : (
                        ""
                    )}
                </>
            )}
        </BlogLayout>
    )
}
