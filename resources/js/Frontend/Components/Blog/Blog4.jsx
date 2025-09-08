import NavigationLink from "@/Components/NavigationLink"
import { Icon } from "@iconify/react"
import moment from "moment"

export default function Blog4({ data }) {
    const { section_title, section_subtitle, action_text } = data
    const blogs = localStorage.getItem("blogs") ? JSON.parse(localStorage.getItem("blogs")) : []
    return (
        <>
            <div className="container">
                {(section_subtitle || section_title) && (
                    <>
                        <div className="cs_section_heading cs_style_1 text-center">
                            {section_subtitle && (
                                <>
                                    <h3
                                        className="cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32"
                                        dangerouslySetInnerHTML={{
                                            __html: section_subtitle
                                        }}
                                    />
                                    <div className="cs_height_5" />
                                </>
                            )}
                            {section_title && (
                                <>
                                    <h2
                                        className="cs_section_title cs_fs_72 m-0"
                                        dangerouslySetInnerHTML={{
                                            __html: section_title
                                        }}
                                    />
                                </>
                            )}
                        </div>
                        <div className="cs_height_72 cs_height_lg_45" />
                    </>
                )}
                <div className="row cs_gap_y_24">
                    <div className="col-lg-6">
                        <div className="cs_post_pr_136">
                            <div className="cs_post cs_style_1 cs_type_2">
                                <a href="blog-details.html" className="cs_post_thumb cs_view_mouse">
                                    <img src={blogs[0]?.thumbnail_image} alt={blogs[0]?.content?.title} />
                                </a>
                                <div className="cs_post_info">
                                    <div>
                                        <h2 className="cs_post_title cs_semibold cs_fs_32">
                                            <NavigationLink href={route("blog.show", blogs[0]?.slug)}>
                                                {blogs[0]?.content?.title}
                                            </NavigationLink>
                                        </h2>
                                    </div>
                                    <div className="cs_post_meta">
                                        <div className="cs_posted_by">{moment(blogs[0]?.created_at).format("ll")}</div>
                                        <div className="cs_post_social">
                                            <a
                                                href={`https://www.linkedin.com/shareArticle?mini=true&url=${route(
                                                    "blog.show",
                                                    blogs[0]?.slug
                                                )}`}
                                                target="_blank"
                                                className="cs_center rounded-circle"
                                            >
                                                <Icon icon="fa6-brands:linkedin-in" width="16" height="16" />
                                            </a>
                                            <a
                                                href={`https://www.facebook.com/sharer/sharer.php?u=${route(
                                                    "blog.show",
                                                    blogs[0]?.slug
                                                )}`}
                                                target="_blank"
                                                className="cs_center rounded-circle"
                                            >
                                                <Icon icon="fa6-brands:facebook-f" width="16" height="16" />
                                            </a>
                                            <a
                                                href={`https://twitter.com/intent/tweet?url=${route(
                                                    "blog.show",
                                                    blogs[0]?.slug
                                                )}`}
                                                target="_blank"
                                                className="cs_center rounded-circle"
                                            >
                                                <Icon icon="fa6-brands:twitter" width="16" height="16" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        {blogs?.slice(1, 4).map((item, index) => (
                            <div className="cs_post cs_style_2 cs_radius_20 overflow-hidden" key={index}>
                                {item?.thumbnail_image && (
                                    <NavigationLink href={route("blog.show", item?.slug)} className="cs_post_thumb cs_view_mouse">
                                        <img src={item?.thumbnail_image} alt={item?.content?.title} />
                                    </NavigationLink>
                                )}
                                <div className="cs_post_info">
                                    <div>
                                        <h2 className="cs_post_title cs_semibold cs_fs_24">
                                            <NavigationLink href={route("blog.show", item?.slug)}>
                                                {item?.content?.title}
                                            </NavigationLink>
                                        </h2>
                                        <div className="cs_posted_by">{moment(item?.created_at).format("ll")}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
