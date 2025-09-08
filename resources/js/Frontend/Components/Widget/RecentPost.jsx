import React from "react"
import { Link } from "@inertiajs/react"
import moment from "moment"
import { Icon } from "@iconify/react"

export default function RecentPost({ title, data }) {
    return (
        <>
            {data?.length === 0 ? (
                ""
            ) : (
                <div className="cs_sidebar_item">
                    <h4 className="cs_sidebar_widget_title">{title}</h4>
                    <ul className="cs_popular_posts">
                        {data?.map((item, index) => (
                            <li key={index}>
                                <div className="cs_popular_post">
                                    <h3 className="cs_popular_post_title">
                                        <Link
                                            href={route("blog.show", {
                                                slug: item?.slug
                                            })}
                                        >
                                            {item?.content?.title}
                                        </Link>
                                    </h3>
                                    <ul className="cs_popular_post_meta">
                                        <li className="cs_posted_author">
                                            <Icon icon="fa6-solid:circle-user" width="16" height="16" />
                                            {item?.user?.name}
                                        </li>
                                        <li className="cs_posted_by">
                                            <Icon icon="fa6-solid:clock" width="16" height="16" />
                                            {moment(item?.created_at).format("ll")}
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}
