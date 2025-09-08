import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Link, Head, usePage } from "@inertiajs/react"
import gravatarUrl from "gravatar-url"
import translate from "@/utils/translate"
import { Icon } from "@iconify/react"

export default function Dashboard() {
    const { post_count, department_count, doctor_count, products_count, comment_count, user_count, subscriber_count, form_response_count, latest_subscribers, latest_comments, isEnabledEcommerce, isEnabledDoctors, isEnabledDepartments } = usePage().props

    console.log(latest_subscribers)

    const getGravatar = (email) => {
        try {
            return email ? gravatarUrl(email) : gravatarUrl("default@example.com", { default: "mp" })
        } catch (e) {
            return gravatarUrl("default@example.com", { default: "mp" })
        }
    }
    return (
        <>
            <Head title="Dashboard" />
            <AdminLayouts>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container-fluid">
                    <div className="yoo-uikits-heading">
                        <h2 className="yoo-uikits-title">{translate("Dashboard")}</h2>
                    </div>
                </div>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-3 col-sm-6">
                            <div className="yoo-iconbox yoo-style1 yoo-color1 yoo-blue-bg yoo-blue-shadow">
                                <div className="yoo-iconbox-in">
                                    <div className="yoo-iconbox-title">{translate("TOTAL POSTS")}</div>
                                    <div className="yoo-iconbox-number">{post_count}</div>
                                    <div className="yoo-iconbox-icon">
                                        <Icon icon="ion:newspaper-outline" width="40" height="40" />
                                    </div>
                                </div>
                            </div>
                            <div className="yoo-height-b30 yoo-height-lg-b30" />
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="yoo-iconbox yoo-style1 yoo-color1 yoo-green-bg yoo-green-shadow">
                                <div className="yoo-iconbox-in">
                                    <div className="yoo-iconbox-title">{translate("TOTAL USERS")}</div>
                                    <div className="yoo-iconbox-number">{user_count}</div>
                                    <div className="yoo-iconbox-icon">
                                        <Icon icon="ion:people-outline" width="40" height="40" />
                                    </div>
                                </div>
                            </div>
                            <div className="yoo-height-b30 yoo-height-lg-b30" />
                        </div>
                        {isEnabledEcommerce === "1" && (
                            <div className="col-xl-3 col-sm-6">
                                <div className="yoo-iconbox yoo-style1 yoo-color1 yoo-gray-bg yoo-gray-shadow">
                                    <div className="yoo-iconbox-in">
                                        <div className="yoo-iconbox-title">{translate("TOTAL PRODUCTS")}</div>
                                        <div className="yoo-iconbox-number">{products_count}</div>
                                        <div className="yoo-iconbox-icon">
                                            <Icon icon="ion:folder-open-outline" width="40" height="40" />
                                        </div>
                                    </div>
                                </div>
                                <div className="yoo-height-b30 yoo-height-lg-b30" />
                            </div>
                        )}
                        {isEnabledDoctors === "1" && (
                            <div className="col-xl-3 col-sm-6">
                                <div className="yoo-iconbox yoo-style1 yoo-color1 yoo-light-blue-bg yoo-light-blue-shadow">
                                    <div className="yoo-iconbox-in">
                                        <div className="yoo-iconbox-title">{translate("TOTAL DOCTORS")}</div>
                                        <div className="yoo-iconbox-number">{doctor_count}</div>
                                        <div className="yoo-iconbox-icon">
                                            <Icon icon="ion:copy-outline" width="40" height="40" />
                                        </div>
                                    </div>
                                </div>
                                <div className="yoo-height-b30 yoo-height-lg-b30" />
                            </div>
                        )}
                        {isEnabledDepartments === "1" && (
                            <div className="col-xl-3 col-sm-6">
                                <div className="yoo-iconbox yoo-style1 yoo-color1 yoo-light-blue-bg yoo-light-blue-shadow">
                                    <div className="yoo-iconbox-in">
                                        <div className="yoo-iconbox-title">{translate("TOTAL DEPARTMENT")}</div>
                                        <div className="yoo-iconbox-number">{department_count}</div>
                                        <div className="yoo-iconbox-icon">
                                            <Icon icon="ion:cloudy-outline" width="40" height="40" />
                                        </div>
                                    </div>
                                </div>
                                <div className="yoo-height-b30 yoo-height-lg-b30" />
                            </div>
                        )}
                        <div className="col-xl-3 col-sm-6">
                            <div className="yoo-iconbox yoo-style1 yoo-color1 yoo-gray-bg yoo-gray-shadow">
                                <div className="yoo-iconbox-in">
                                    <div className="yoo-iconbox-title">{translate("TOTAL COMMENTS")}</div>
                                    <div className="yoo-iconbox-number">{comment_count}</div>
                                    <div className="yoo-iconbox-icon">
                                        <Icon icon="ion:chatbox-outline" width="40" height="40" />
                                    </div>
                                </div>
                            </div>
                            <div className="yoo-height-b30 yoo-height-lg-b30" />
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="yoo-iconbox yoo-style1 yoo-color1 yoo-green-bg yoo-green-shadow">
                                <div className="yoo-iconbox-in">
                                    <div className="yoo-iconbox-title">{translate("TOTAL SUBSCRIBER")}</div>
                                    <div className="yoo-iconbox-number">{subscriber_count}</div>
                                    <div className="yoo-iconbox-icon">
                                        <Icon icon="ion:paper-plane-outline" width="40" height="40" />
                                    </div>
                                </div>
                            </div>
                            <div className="yoo-height-b30 yoo-height-lg-b30" />
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="yoo-iconbox yoo-style1 yoo-color1 yoo-blue-bg yoo-blue-shadow">
                                <div className="yoo-iconbox-in">
                                    <div className="yoo-iconbox-title">{translate("TOTAL FORM RESPONSES")}</div>
                                    <div className="yoo-iconbox-number">{form_response_count}</div>
                                    <div className="yoo-iconbox-icon">
                                        <Icon icon="ion:mail-open-outline" width="40" height="40" />
                                    </div>
                                </div>
                            </div>
                            <div className="yoo-height-b30 yoo-height-lg-b30" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="yoo-card yoo-style1">
                                <div className="yoo-card-heading">
                                    <div className="yoo-card-heading-left">
                                        <h2 className="yoo-card-title">
                                            <span className="yoo-card-title-icon yoo-light-blue-bg">
                                                <Icon icon="ion:send-outline" width="16" height="16" />
                                            </span>
                                            {translate("Latest Subscribers")}
                                        </h2>
                                    </div>
                                </div>
                                <div className="yoo-card-body">
                                    <div className="yoo-padd-lr-20">
                                        <div className="yoo-height-b20 yoo-height-lg-b20" />
                                        <div className="yoo-margin-bottom-3">
                                            <ul className="yoo-list-group yoo-style1 yoo-type1 yoo-mp0">
                                                {latest_subscribers.map((item, index) => (
                                                    <li key={index}>
                                                        <div className="yoo-medias yoo-style1 yoo-type1">
                                                            <div className="yoo-media-img">
                                                                <div className="yoo-box-md yoo-radious10 yoo-img-box yoo-purple-box">
                                                                    <img
                                                                        src={getGravatar(item?.email)}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="yoo-media-meta">
                                                                <div className="yoo-media-subtitle">
                                                                    {item?.email}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                                {!latest_subscribers.length && (
                                                    <div className="text-center">{translate("No subscriber found")}</div>
                                                )}
                                            </ul>
                                        </div>
                                        <div className="yoo-height-b15 yoo-height-lg-b15" />
                                    </div>
                                </div>
                            </div>
                            <div className="yoo-height-b30 yoo-height-lg-b30" />
                        </div>
                        <div className="col-lg-6">
                            <div className="yoo-card yoo-style1">
                                <div className="yoo-card-heading">
                                    <div className="yoo-card-heading-left">
                                        <h2 className="yoo-card-title">
                                            <span className="yoo-card-title-icon yoo-light-blue-bg">
                                                <Icon icon="ion:chatbox-outline" width="16" height="16" />
                                            </span>
                                            {translate("Latest Comments")}
                                        </h2>
                                    </div>
                                </div>
                                <div className="yoo-card-body">
                                    <div className="yoo-padd-lr-20">
                                        <div className="yoo-height-b20 yoo-height-lg-b20" />
                                        <div className="yoo-margin-bottom-3">
                                            <ul className="yoo-list-group yoo-style1 yoo-type1 yoo-mp0">
                                                {latest_comments.map((item, index) => (
                                                    <li key={`comments-${index}`}>
                                                        <div className="yoo-medias yoo-style1 yoo-type1">
                                                            <div className="yoo-media-img">
                                                                <div className="yoo-box-md yoo-radious10 yoo-img-box yoo-purple-box">
                                                                    <img src={gravatarUrl(item.comment_author_email)} alt="" />
                                                                </div>
                                                            </div>
                                                            <div className="yoo-media-meta">
                                                                <h2 className="yoo-media-title yoo-margin-bottom-0">
                                                                    {item.comment_author_name}
                                                                </h2>
                                                                <div className="yoo-media-subtitle">
                                                                    {item.comment_author_email}
                                                                </div>
                                                                <div className="yoo-media-text">{item.comment_content}</div>
                                                            </div>
                                                            {item.is_approved === "1" ? (
                                                                <span className="badge badge-success">
                                                                    {translate("Approved")}
                                                                </span>
                                                            ) : (
                                                                <span className="badge badge-danger">
                                                                    {translate("Not Approved")}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                                {!latest_comments.length && (
                                                    <div className="text-center">{translate("No comments found")}</div>
                                                )}
                                            </ul>
                                        </div>
                                        <div className="yoo-height-b15 yoo-height-lg-b15" />
                                    </div>
                                </div>
                            </div>
                            <div className="yoo-height-b30 yoo-height-lg-b30" />
                        </div>
                    </div>
                </div>
            </AdminLayouts>
        </>
    )
}
