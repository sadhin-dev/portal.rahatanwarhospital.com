import NavigationLink from "@/Components/NavigationLink"
import { Icon } from "@iconify/react"
import moment from "moment"

export default function Blog1({ data }) {
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
                <div className="row cs_gap_y_30">
                    {blogs?.slice(0, 3).map((item, index) => (
                        <div className="col-lg-4" key={index}>
                            <div className="cs_post cs_style_1">
                                {item?.thumbnail_image && (
                                    <NavigationLink href={route("blog.show", item?.slug)} className="cs_post_thumb cs_view_mouse">
                                        <img src={item?.thumbnail_image} alt={item?.content?.title} />
                                    </NavigationLink>
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
                                            <NavigationLink href={route("blog.show", item?.slug)}>
                                                {item?.content?.title}
                                            </NavigationLink>
                                        </h2>
                                    </div>
                                    {action_text && (
                                        <div className="cs_heading_color cs_medium">
                                            <NavigationLink href={route("blog.show", item?.slug)} className="cs_post_btn">
                                                {action_text}
                                            </NavigationLink>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
