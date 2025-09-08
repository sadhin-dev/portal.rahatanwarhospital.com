import { useForm } from "@inertiajs/react"
import gravatarUrl from "gravatar-url"
import moment from "moment"
import { useState } from "react"
import translate from "@/utils/translate"

export default function BlogComment({ blog, commnets }) {
    const [isReplay, setIsReplay] = useState(false)
    const [replayAuthName, setReplayAuthName] = useState("")
    const { data, setData, post, errors, processing, reset } = useForm({
        full_name: "",
        email: "",
        website: "",
        comment: "",
        post_id: blog.id,
        comment_parent: null
    })
    // handle comment
    const handleSubmit = (e) => {
        e.preventDefault()

        post(route("blog.comment"), {
            onSuccess: () => {
                reset("full_name", "email", "website", "comment", "comment_parent")
                setIsReplay(false)
            }
        })
    }
    return (
        <>
            {commnets.length ? (
                <div className="comment-wrap">
                    {blog.comment_count_string && (
                        <div className="comment-wrap-title">
                            <h5 className="title cs_fs_48 cs_m0">{blog.comment_count_string} </h5>
                        </div>
                    )}
                    <div className="latest-comments">
                        <ul className="list-wrap">
                            {commnets.map((comment, index) => (
                                <li id={`comment-${comment.id}`} key={index}>
                                    <div className="comments-box">
                                        <div className="comments-avatar">
                                            <img
                                                alt=""
                                                src={gravatarUrl(comment.comment_author_email)}
                                                className="avatar avatar-110 photo"
                                                height={110}
                                                width={110}
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </div>
                                        <div className="comment-text">
                                            <div className="avatar-name mb-10">
                                                <h6 className="name">
                                                    <a
                                                        href={comment.comment_author_website}
                                                        rel="external nofollow ugc"
                                                        className="url"
                                                    >
                                                        {comment.comment_author_name}
                                                    </a>
                                                    <span
                                                        onClick={() => {
                                                            setIsReplay(true)
                                                            setReplayAuthName(comment.comment_author_name)
                                                            setData("comment_parent", comment.id)
                                                        }}
                                                        style={{
                                                            cursor: "pointer"
                                                        }}
                                                        className="comment-reply-link"
                                                    >
                                                        <svg
                                                            width={18}
                                                            height={14}
                                                            viewBox="0 0 18 14"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M6.54375 0.234322C6.25938 -0.0656777 5.78438 -0.0781777 5.48438 0.206197L1.05625 4.41245C0.434375 5.00307 0.434375 5.99682 1.05625 6.58745L5.48438 10.7937C5.78438 11.0781 6.25938 11.0656 6.54375 10.7656C6.82813 10.4656 6.81563 9.99057 6.51563 9.7062L2.0875 5.49995L6.51563 1.2937C6.81563 1.00932 6.82813 0.534322 6.54375 0.234322ZM11 0.999947C11 0.606197 10.7688 0.246822 10.4063 0.0874474C10.0438 -0.0719277 9.625 -0.0063026 9.33125 0.256197L4.33125 4.7562C4.12188 4.94682 4 5.21557 4 5.49995C4 5.78432 4.12188 6.05307 4.33125 6.2437L9.33125 10.7437C9.625 11.0093 10.0469 11.0749 10.4063 10.9124C10.7656 10.7499 11 10.3937 11 9.99995V7.99995H12C13.6563 7.99995 15 9.3437 15 10.9999C15 11.9499 14.6 12.4968 14.3063 12.7718C14.1344 12.9312 14 13.1468 14 13.3812C14 13.7218 14.275 13.9968 14.6156 13.9968C14.7031 13.9968 14.7906 13.9781 14.8688 13.9374C15.4531 13.6218 18 12.0406 18 8.49995C18 5.46245 15.5375 2.99995 12.5 2.99995H11V0.999947Z"
                                                                fill="currentColor"
                                                            />
                                                        </svg>
                                                        {translate("Reply")}
                                                    </span>
                                                </h6>
                                                <span className="date">{moment(comment.created_at).format("ll")}</span>
                                            </div>
                                            <p>{comment.comment_content}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {/* #comment-## */}
                        </ul>
                    </div>
                </div>
            ) : (
                <></>
            )}

            <h2 className="cs_fs_48 cs_m0" id="response">
                {isReplay ? `${translate("Replay to")}: ${replayAuthName}` : translate("Leave A Reply")}
            </h2>
            {isReplay ? (
                <small
                    onClick={() => {
                        setIsReplay(false)
                        setData("comment_parent", null)
                    }}
                >
                    <span style={{ cursor: "pointer" }}>{translate("Cancel reply")}</span>
                </small>
            ) : (
                <></>
            )}
            <div className="cs_height_5 cs-height_lg_5"></div>
            <p className="cs_m0">{translate("Your email address will not be published. Required fields are marked")} *</p>
            <div className="cs_height_40 cs-height_lg_30"></div>
            <form className="row" onSubmit={handleSubmit}>
                <div className="col-lg-6">
                    <label>{translate("Full Name")}*</label>
                    <input
                        type="text"
                        className="cs_form_field_2"
                        value={data.full_name}
                        onChange={(e) => setData("full_name", e.target.value)}
                        required
                    />
                    {errors.full_name && <span className="text-danger">{errors.full_name}</span>}
                    <div className="cs_height_20 cs_height_lg_20" />
                    <div
                        data-lastpass-icon-root="true"
                        style={{
                            position: "relative !important",
                            height: "0px !important",
                            width: "0px !important",
                            float: "left !important"
                        }}
                    />
                </div>
                <div className="col-lg-6">
                    <label>{translate("Email")}*</label>
                    <input
                        type="email"
                        className="cs_form_field_2"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                    <div className="cs_height_20 cs_height_lg_20" />
                </div>
                <div className="col-lg-12">
                    <label>{translate("Website")}</label>
                    <input
                        type="text"
                        className="cs_form_field_2"
                        value={data.website}
                        onChange={(e) => setData("website", e.target.value)}
                    />
                    {errors.website && <span className="text-danger">{errors.website}</span>}
                    <div className="cs_height_20 cs_height_lg_20" />
                </div>
                <div className="col-lg-12">
                    <label>{translate("Write Your Comment")}*</label>
                    <textarea
                        cols={30}
                        rows={7}
                        className="cs_form_field_2"
                        value={data.comment}
                        onChange={(e) => setData("comment", e.target.value)}
                        required
                    />
                    {errors.comment && <span className="text-danger">{errors.comment}</span>}
                    <div className="cs_height_25 cs_height_lg_25" />
                </div>
                <div className="col-lg-12">
                    <button className="cs_btn cs_style_1" disabled={processing}>
                        <span>{translate("Post Comment")}</span>
                        <i>
                            <svg width="35" height="24" viewBox="0 0 35 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M34.5342 13.0789L23.3977 23.5789C23.0977 23.8522 22.6958 24.0034 22.2787 23.9999C21.8615 23.9965 21.4625 23.8388 21.1675 23.5607C20.8726 23.2825 20.7053 22.9063 20.7016 22.513C20.698 22.1197 20.8584 21.7408 21.1482 21.4579L29.5689 13.5184H1.59092C1.16899 13.5184 0.764327 13.3604 0.465971 13.0791C0.167615 12.7978 0 12.4163 0 12.0184C0 11.6206 0.167615 11.2391 0.465971 10.9578C0.764327 10.6765 1.16899 10.5184 1.59092 10.5184H29.5689L21.1482 2.57893C20.9962 2.44056 20.875 2.27505 20.7916 2.09204C20.7083 1.90903 20.6644 1.7122 20.6625 1.51303C20.6607 1.31386 20.7009 1.11635 20.7809 0.932003C20.8609 0.747658 20.9791 0.580179 21.1284 0.439341C21.2778 0.298502 21.4554 0.18712 21.651 0.111698C21.8465 0.0362778 22.056 -0.00167465 22.2672 5.53131e-05C22.4785 0.00178719 22.6872 0.0431671 22.8813 0.12178C23.0754 0.200394 23.251 0.314665 23.3977 0.457932L34.5342 10.9579C34.8325 11.2392 35 11.6207 35 12.0184C35 12.4162 34.8325 12.7976 34.5342 13.0789Z"
                                    fill="white"
                                />
                            </svg>
                            <svg width="35" height="24" viewBox="0 0 35 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M34.5342 13.0789L23.3977 23.5789C23.0977 23.8522 22.6958 24.0034 22.2787 23.9999C21.8615 23.9965 21.4625 23.8388 21.1675 23.5607C20.8726 23.2825 20.7053 22.9063 20.7016 22.513C20.698 22.1197 20.8584 21.7408 21.1482 21.4579L29.5689 13.5184H1.59092C1.16899 13.5184 0.764327 13.3604 0.465971 13.0791C0.167615 12.7978 0 12.4163 0 12.0184C0 11.6206 0.167615 11.2391 0.465971 10.9578C0.764327 10.6765 1.16899 10.5184 1.59092 10.5184H29.5689L21.1482 2.57893C20.9962 2.44056 20.875 2.27505 20.7916 2.09204C20.7083 1.90903 20.6644 1.7122 20.6625 1.51303C20.6607 1.31386 20.7009 1.11635 20.7809 0.932003C20.8609 0.747658 20.9791 0.580179 21.1284 0.439341C21.2778 0.298502 21.4554 0.18712 21.651 0.111698C21.8465 0.0362778 22.056 -0.00167465 22.2672 5.53131e-05C22.4785 0.00178719 22.6872 0.0431671 22.8813 0.12178C23.0754 0.200394 23.251 0.314665 23.3977 0.457932L34.5342 10.9579C34.8325 11.2392 35 11.6207 35 12.0184C35 12.4162 34.8325 12.7976 34.5342 13.0789Z"
                                    fill="white"
                                />
                            </svg>
                        </i>
                    </button>
                </div>
            </form>
        </>
    )
}
