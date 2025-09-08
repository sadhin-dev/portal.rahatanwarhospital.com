import React, { useEffect, useState } from "react"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import { useDispatch, useSelector } from "react-redux"
import SingleMediaUploader from "../Media/SingleMediaUploader"
import { produce } from "immer"
import { Icon } from "@iconify/react"

export default function NewsletterSectionCustomize({ index }) {
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

    // handle upload file
    const handleUploadFile = (file) => {
        const body = new FormData()
        body.append("file", file)
        axios.post(route("admin.pages.upload.file"), body).then((res) => {
            setData({ ...data, thumbnail_image_url: res.data })
        })
    }

    // conditional rendering
    let customizer = ""
    if (data.layout === "1") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Section Title</label>
                    <input
                        type="text"
                        value={data.section_title}
                        onChange={(e) => setData({ ...data, section_title: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Section Subtitle</label>
                    <input
                        type="text"
                        value={data.section_subtitle}
                        onChange={(e) => setData({ ...data, section_subtitle: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Form Label</label>
                    <input
                        type="text"
                        value={data.form_label}
                        onChange={(e) => setData({ ...data, form_label: e.target.value })}
                        className="form-control"
                    />
                </div>
            </>
        )
    } else if (data.layout === "2") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Upload Image (550x775 px)</label>
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
                    <label>Section Title</label>
                    <input
                        type="text"
                        value={data.section_title}
                        onChange={(e) => setData({ ...data, section_title: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Section Subtitle</label>
                    <input
                        type="text"
                        value={data.section_subtitle}
                        onChange={(e) => setData({ ...data, section_subtitle: e.target.value })}
                        className="form-control"
                    />
                </div>
            </>
        )
    }

    useEffect(() => {
        if (index) {
            setData({
                layout: sectionData?.data?.layout ?? "1",
                section_title: sectionData?.data?.section_title ?? "",
                section_subtitle: sectionData?.data?.section_subtitle ?? "",
                image_url: sectionData?.data?.image_url ?? ""
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
                                Newsletter Style {data.layout}
                                <Icon icon="lucide:chevron-down" width="17" height="17" />
                            </div>
                        </div>
                        {layout && (
                            <div className="cs_section_images">
                                {["1", "2"].map((value) => (
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
                                            <img src={`/static/sections/newsletter/style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Newsletter Style {value}</label>
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
