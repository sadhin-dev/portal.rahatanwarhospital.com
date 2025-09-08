import React, { useEffect, useState } from "react"
import { produce } from "immer"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import SingleMediaUploader from "../Media/SingleMediaUploader"
import { Icon } from "@iconify/react"

export default function BannerSectionCustomize({ index }) {
    const { currentLang, pageData } = useSelector((state) => state.pages)
    const [tab, setTab] = useState("general")
    const dispatch = useDispatch()
    const [sectionData, setSectionData] = useState({})
    const [advancedData, setAdvancedData] = useState({})
    const [data, setData] = useState({})
    const [layout, setLayout] = useState(false)

    const advancedCallback = (data) => {
        if (index) {
            setAdvancedData(data)
            dispatch(updatePageAdvancedSettings({ data, index }))
        }
    }

    // conditional render
    let customizer = ""
    if (data.layout === "1" || data.layout === "3" || data.layout === "4" || data.layout === "5" || data.layout === "8") {
        customizer = (
            <>
                <div className="form-group">
                    <label>
                        Background Image ({data.layout === "1" && "1675x640"}
                        {data.layout === "3" && "1675x600"}
                        {data.layout === "4" && "1920x700"}
                        {data.layout === "5" && "1660x730"}
                        {data.layout === "8" && "1920x700"} px)
                    </label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.background_image_url}
                    />
                </div>
                <div className="form-group">
                    <label>
                        Image ({data.layout === "3" && "1020x715"}
                        {data.layout === "4" && "660x560"}
                        {data.layout === "5" && "900x560"}
                        {data.layout === "8" && "650x580"} px)
                    </label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.image_url = ""
                                })
                            )
                        }
                        defaultValue={data.image_url}
                    />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={data.title}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Subtitle</label>
                    <textarea
                        cols="30"
                        rows="12"
                        className="form-control"
                        value={data.subtitle}
                        onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                    />
                </div>
                {(data.layout === "4" || data.layout === "5") && (
                    <>
                        <div className="form-group">
                            <label>Action Text</label>
                            <input
                                type="text"
                                className="form-control"
                                value={data.action_text}
                                onChange={(e) => setData({ ...data, action_text: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Action URL</label>
                            <input
                                type="text"
                                className="form-control"
                                value={data.action_url}
                                onChange={(e) => setData({ ...data, action_url: e.target.value })}
                            />
                        </div>
                    </>
                )}
            </>
        )
    } else if (data.layout === "2" || data.layout === "6" || data.layout === "7") {
        customizer = (
            <>
                <div className="form-group">
                    <label>
                        Background Image ({data.layout === "1" && "1675x450"}
                        {data.layout === "6" && "1620x850"}
                        {data.layout === "7" && "1620x850"} px)
                    </label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.background_image_url}
                    />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={data.title}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Subtitle</label>
                    <textarea
                        cols="30"
                        rows="12"
                        className="form-control"
                        value={data.subtitle}
                        onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                    />
                </div>
            </>
        )
    } else if (data.layout === "9" || data.layout === "10") {
        customizer = (
            <>
                <div className="form-group">
                    <label>
                        Image ({data.layout === "9" && "720x710"}
                        {data.layout === "10" && "600x975"} px)
                    </label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.image_url = ""
                                })
                            )
                        }
                        defaultValue={data.image_url}
                    />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={data.title}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Subtitle</label>
                    <textarea
                        cols="30"
                        rows="12"
                        className="form-control"
                        value={data.subtitle}
                        onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                    />
                </div>
            </>
        )
    }

    useEffect(() => {
        if (index) {
            setData({
                layout: sectionData?.data?.layout ?? "1",
                title: sectionData?.data?.title ?? "",
                subtitle: sectionData?.data?.subtitle ?? "",
                background_image_url: sectionData?.data?.background_image_url ?? "",
                image_url: sectionData?.data?.image_url ?? "",
                action_text: sectionData?.data?.action_text ?? "",
                action_url: sectionData?.data?.action_url ?? ""
            })
        }
    }, [currentLang, sectionData, index])

    useEffect(() => {
        if (index) {
            setSectionData(pageData[currentLang][index])
        }
    }, [index, currentLang])

    useEffect(() => {
        if (Object.keys(data).length !== 0 && index) {
            dispatch(updatePageSection({ data, index }))
        }
    }, [data, index])

    useEffect(() => {
        if (index) {
            setAdvancedData(pageData[currentLang][index].advanced)
        }
    }, [index, currentLang, pageData])

    return (
        <>
            <div className="cs_tab_wrap">
                <span className={`cs_tab_item${tab === "general" ? " active" : ""}`} onClick={() => setTab("general")}>
                    <Icon icon="lucide:pencil" width="18" height="18" /> General
                </span>
                <span className={`cs_tab_item${tab === "advance" ? " active" : ""}`} onClick={() => setTab("advance")}>
                    <Icon icon="lucide:settings" width="18" height="18" />
                    Advance
                </span>
            </div>
            {tab === "general" ? (
                <>
                    <div className="cs_design_layout_box">
                        <div className={`cs_design_layout_select ${layout ? "active" : ""}`}>
                            <label>Design Layout</label>
                            <div className="cs_design_layout_toggle_btn" onClick={() => setLayout(!layout)}>
                                Banner Style {data.layout}
                                <Icon icon="lucide:chevron-down" width="17" height="17" />
                            </div>
                        </div>
                        {layout && (
                            <div className="cs_section_images">
                                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((value) => (
                                    <div key={value} className="cs_section_image" onClick={() => setLayout(!layout)}>
                                        <input
                                            type="radio"
                                            id={`layout-${value}`}
                                            name="layout"
                                            value={value}
                                            checked={data.layout === value}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    layout: e.target.value
                                                })
                                            }
                                            className="form-check-input"
                                        />
                                        <div className="cs_section_image_in">
                                            <img src={`/static/sections/banner/banner_style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Banner Style {value}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {customizer}
                </>
            ) : (
                <AdvanceCustomize advancedCallback={advancedCallback} currentSection={advancedData} />
            )}
        </>
    )
}
