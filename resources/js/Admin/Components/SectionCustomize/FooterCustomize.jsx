import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { produce } from "immer"
import { updateFooter } from "@/Redux/features/pages/Customize/customize"
import SingleMediaUploader from "../Media/SingleMediaUploader"

export default function FooterCustomize() {
    const footer = useSelector((state) => state.customize.footer)
    const dispatch = useDispatch()
    const [data, setData] = useState({
        ...footer,
        footer_is_show_social_media: footer.footer_is_show_social_media === "1",
        footer_is_show_newslatter: footer.footer_is_show_newslatter === "1",
        footer_is_show_logo: footer.footer_is_show_logo === "1",
        footer_is_show_footer_menu_one: footer.footer_is_show_footer_menu_one === "1",
        footer_is_show_footer_menu_two: footer.footer_is_show_footer_menu_two === "1",
        footer_is_show_footer_menu_three: footer.footer_is_show_footer_menu_three === "1",
        footer_is_show_contact_info: footer.footer_is_show_contact_info === "1"
    })

    useEffect(() => {
        dispatch(updateFooter(data))
    }, [data])

    return (
        <>
            <div className="form-group">
                <label htmlFor="" style={{ display: "flex", gap: "10px" }}>
                    Show Social Media:
                    <div
                        className={`yoo-switch ${data.footer_is_show_social_media ? "active" : ""}`}
                        onClick={() =>
                            setData(
                                produce((draft) => {
                                    draft.footer_is_show_social_media = !draft.footer_is_show_social_media
                                })
                            )
                        }
                    >
                        <div className="yoo-switch-in" />
                    </div>
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="" style={{ display: "flex", gap: "10px" }}>
                    Show Footer Newslatter:
                    <div
                        className={`yoo-switch ${data.footer_is_show_newslatter ? "active" : ""}`}
                        onClick={() =>
                            setData(
                                produce((draft) => {
                                    draft.footer_is_show_newslatter = !draft.footer_is_show_newslatter
                                })
                            )
                        }
                    >
                        <div className="yoo-switch-in" />
                    </div>
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="" style={{ display: "flex", gap: "10px" }}>
                    Show Footer Logo:
                    <div
                        className={`yoo-switch ${data.footer_is_show_logo ? "active" : ""}`}
                        onClick={() =>
                            setData(
                                produce((draft) => {
                                    draft.footer_is_show_logo = !draft.footer_is_show_logo
                                })
                            )
                        }
                    >
                        <div className="yoo-switch-in" />
                    </div>
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="" style={{ display: "flex", gap: "10px" }}>
                    Show First Footer Menu:
                    <div
                        className={`yoo-switch ${data.footer_is_show_footer_menu_one ? "active" : ""}`}
                        onClick={() =>
                            setData(
                                produce((draft) => {
                                    draft.footer_is_show_footer_menu_one = !draft.footer_is_show_footer_menu_one
                                })
                            )
                        }
                    >
                        <div className="yoo-switch-in" />
                    </div>
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="" style={{ display: "flex", gap: "10px" }}>
                    Show Second Footer Menu:
                    <div
                        className={`yoo-switch ${data.footer_is_show_footer_menu_two ? "active" : ""}`}
                        onClick={() =>
                            setData(
                                produce((draft) => {
                                    draft.footer_is_show_footer_menu_two = !draft.footer_is_show_footer_menu_two
                                })
                            )
                        }
                    >
                        <div className="yoo-switch-in" />
                    </div>
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="" style={{ display: "flex", gap: "10px" }}>
                    Show Third Footer Menu:
                    <div
                        className={`yoo-switch ${data.footer_is_show_footer_menu_three ? "active" : ""}`}
                        onClick={() =>
                            setData(
                                produce((draft) => {
                                    draft.footer_is_show_footer_menu_three = !draft.footer_is_show_footer_menu_three
                                })
                            )
                        }
                    >
                        <div className="yoo-switch-in" />
                    </div>
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="" style={{ display: "flex", gap: "10px" }}>
                    Show Contact Info:
                    <div
                        className={`yoo-switch ${data.footer_is_show_contact_info ? "active" : ""}`}
                        onClick={() =>
                            setData(
                                produce((draft) => {
                                    draft.footer_is_show_contact_info = !draft.footer_is_show_contact_info
                                })
                            )
                        }
                    >
                        <div className="yoo-switch-in" />
                    </div>
                </label>
            </div>
            <div className="form-group">
                <label>Copyright Text</label>
                <input
                    type="text"
                    value={data.copyright_text}
                    onChange={(e) => setData({ ...data, copyright_text: e.target.value })}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Default Footer Background (1920x756 px)</label>
                <SingleMediaUploader
                    onSelected={(e) => {
                        setData(
                            produce((draft) => {
                                draft.footer_background_image_url = e
                            })
                        )
                    }}
                    handleRemoved={() =>
                        setData(
                            produce((draft) => {
                                draft.footer_background_image_url = ""
                            })
                        )
                    }
                    defaultValue={data.footer_background_image_url}
                    size_sm
                />
            </div>
            <div className="form-group">
                <label>Default Footer Icon (50x50 px)</label>
                <SingleMediaUploader
                    onSelected={(e) => {
                        setData(
                            produce((draft) => {
                                draft.footer_icon_url = e
                            })
                        )
                    }}
                    handleRemoved={() =>
                        setData(
                            produce((draft) => {
                                draft.footer_icon_url = ""
                            })
                        )
                    }
                    defaultValue={data.footer_icon_url}
                    size_sm
                />
            </div>
        </>
    )
}
