import { Link } from "@inertiajs/react"
import moment from "moment"
import BlogLayout from "@/Frontend/Layouts/BlogLayout"
import limitString from "@/utils/limitString.js"
import removeHTMLTags from "@/utils/removeHTMLTags.js"
import gravatarUrl from "gravatar-url"
import BlogComment from "@/Frontend/Components/Post/PostComent"
import ProcessContent from "@/utils/ProcessContent"
import translate from "@/utils/translate"
import ProhealthMeta from "@/utils/ProhealthMeta"

export default function BlogDetails({ blog, meta_title, meta_description, meta_image, site_name, slug, page: renderedPage }) {
    const { is_show_blog_details_sidebar } = JSON.parse(localStorage.getItem("page_settings")) || {}
    ProhealthMeta(
        blog?.content?.meta_title ?? blog?.content?.title,
        meta_title ?? blog?.content?.title,
        blog?.content?.meta_tags,
        meta_description ?? limitString(removeHTMLTags(blog?.content?.content), 150),
        meta_image ?? blog?.thumbnail_image,
        site_name
    )

    // page header data
    let pageHeaderData = {
        title: blog.content?.title,
        breadcrumb: [
            { label: translate("Home"), url: "/" },
            { label: renderedPage?.content?.title, url: route("pages.show", slug) },
            {
                label: blog?.category?.content?.title,
                url: route("pages.show", {
                    slug: slug,
                    filter: { category: blog?.category?.content?.title }
                })
            },
            { label: blog?.content?.title, url: null }
        ]
    }

    return (
        <BlogLayout
            pageHeaderData={pageHeaderData}
            blogDetails={true}
            blogDetailsTitle={blog?.content?.title}
            blogDetailsThumbnailImageUrl={blog?.thumbnail_image}
            blogDetailsCategory={blog?.category?.content?.title}
            blogDetailsDate={moment(blog?.created_at).format("ll")}
            blogDetailsUser={blog?.user?.name}
            blogSlug={blog?.slug}
            is_show_blog_details_sidebar={is_show_blog_details_sidebar}
        >
            {/* Start Details Post Content */}
            <div className="cs_blog_details_wrap">
                <div
                    className="cs_blog_details"
                    dangerouslySetInnerHTML={{
                        __html: ProcessContent(blog?.content?.content)
                    }}
                />
            </div>
            {/* End Details Post Content */}
            <div className="cs_author_card text-center">
                <Link
                    href={route("pages.show", {
                        slug: slug,
                        filter: { author: blog?.user?.id }
                    })}
                >
                    <img
                        alt=""
                        src={gravatarUrl(blog?.user?.email, { size: 400 })}
                        height={180}
                        width={180}
                        loading="lazy"
                        decoding="async"
                    />
                </Link>
                {/* <span className="designation">{translate("Written by")}</span> */}
                <h3 className="cs_fs_32">
                    <Link
                        href={route("pages.show", {
                            slug: slug,
                            filter: { author: blog?.user?.id }
                        })}
                    >
                        {blog?.user?.name}
                    </Link>
                </h3>
                <p
                    className="m-0"
                    dangerouslySetInnerHTML={{
                        __html: blog?.user?.about
                    }}
                />
            </div>
            {/* Start Comment Section */}
            <BlogComment blog={blog} commnets={blog?.comments} />
            {/* End Comment Section */}
        </BlogLayout>
    )
}
