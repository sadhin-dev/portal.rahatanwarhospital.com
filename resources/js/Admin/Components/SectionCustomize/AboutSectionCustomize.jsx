import React, { useEffect, useState } from "react"
import { produce } from "immer"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import SingleMediaUploader from "../Media/SingleMediaUploader"
import { Icon } from "@iconify/react"

export default function AboutSectionCustomize({ index }) {
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

    // List Item Accordion
    const [openIndex, setOpenIndex] = useState(0)
    const handleToggle = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index))
    }

    // Remove Feature
    const removeFeature = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.feature_list = draft.feature_list.filter((_, index) => index !== removeIndex)
            })
        )
    }
    // Clone Feature
    const cloneFeature = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.feature_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.feature_list = newList
                setOpenIndex(cloneIndex + 1)
            })
        )
    }

    // Add New Feature
    const addNewFeature = () => {
        setData(
            produce((draft) => {
                draft.feature_list.push({
                    feature_title: "",
                    feature_subtitle: ""
                })
                setOpenIndex(draft.feature_list.length - 1)
            })
        )
    }

    // conditional render
    let customizer = ""
    if (data.layout === "1") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Image (865x740 px)</label>
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
                    <label>Rotate Image (190x190 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.rotate_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.rotate_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.rotate_image_url}
                        size_sm
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
                        className="form-control"
                        value={data.section_subtitle}
                        onChange={(e) =>
                            setData({
                                ...data,
                                section_subtitle: e.target.value
                            })
                        }
                    />
                </div>
                <div className="cs_loop_list">
                    <label>Feature List</label>
                    <div className="cs_loop_list_in">
                        {data.feature_list?.slice(0, 3).map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.feature_title ? item.feature_title : "List Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneFeature(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.feature_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeFeature(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Feature Title</label>
                                            <input
                                                type="text"
                                                value={item.feature_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.feature_list[index].feature_title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Feature Subtitle</label>
                                            <textarea
                                                cols="30"
                                                rows="10"
                                                className="form-control"
                                                value={item.feature_subtitle}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.feature_list[index].feature_subtitle = e.target.value
                                                        })
                                                    )
                                                }}
                                            ></textarea>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {data.feature_list.length < 3 ? (
                            <div className="cs_loop_list_btn">
                                <button className="btn btn-sm btn-primary" onClick={addNewFeature}>
                                    Add new
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </>
        )
    } else if (data.layout === "2" || data.layout === "5") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Image (720x410 px)</label>
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
                        className="form-control"
                        value={data.section_subtitle}
                        onChange={(e) =>
                            setData({
                                ...data,
                                section_subtitle: e.target.value
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Section Description</label>
                    <textarea
                        cols="30"
                        rows="10"
                        className="form-control"
                        value={data.section_description}
                        onChange={(e) =>
                            setData({
                                ...data,
                                section_description: e.target.value
                            })
                        }
                    ></textarea>
                </div>
            </>
        )
    } else if (data.layout === "3") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Image (720x410 px)</label>
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
                    <label>Rotate Image (190x190 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.rotate_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.rotate_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.rotate_image_url}
                        size_sm
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
                        className="form-control"
                        value={data.section_subtitle}
                        onChange={(e) =>
                            setData({
                                ...data,
                                section_subtitle: e.target.value
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Section Description</label>
                    <textarea
                        cols="30"
                        rows="10"
                        className="form-control"
                        value={data.section_description}
                        onChange={(e) =>
                            setData({
                                ...data,
                                section_description: e.target.value
                            })
                        }
                    ></textarea>
                </div>
            </>
        )
    } else if (data.layout === "4") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Image (640x740 px)</label>
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
                        className="form-control"
                        value={data.section_subtitle}
                        onChange={(e) =>
                            setData({
                                ...data,
                                section_subtitle: e.target.value
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Section Description</label>
                    <textarea
                        cols="30"
                        rows="10"
                        className="form-control"
                        value={data.section_description}
                        onChange={(e) =>
                            setData({
                                ...data,
                                section_description: e.target.value
                            })
                        }
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Upload Icon</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.support_icon_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.support_icon_url = ""
                                })
                            )
                        }
                        defaultValue={data.support_icon_url}
                        size_sm
                    />
                </div>
                <div className="form-group">
                    <label>Support Title</label>
                    <input
                        className="form-control"
                        value={data.support_title}
                        onChange={(e) =>
                            setData({
                                ...data,
                                support_title: e.target.value
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Support Subtitle</label>
                    <input
                        className="form-control"
                        value={data.support_subtitle}
                        onChange={(e) =>
                            setData({
                                ...data,
                                support_subtitle: e.target.value
                            })
                        }
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
                section_description: sectionData?.data?.section_description ?? "",
                image_url: sectionData?.data?.image_url ?? "",
                rotate_image_url: sectionData?.data?.rotate_image_url ?? "",
                support_icon_url: sectionData?.data?.support_icon_url ?? "",
                support_title: sectionData?.data?.support_title ?? "",
                support_subtitle: sectionData?.data?.support_subtitle ?? "",
                feature_list: sectionData?.data?.feature_list ?? [
                    {
                        feature_title: "",
                        feature_subtitle: ""
                    }
                ]
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
                                About Style {data.layout}
                                <Icon icon="lucide:chevron-down" width="17" height="17" />
                            </div>
                        </div>
                        {layout && (
                            <div className="cs_section_images">
                                {["1", "2", "3", "4", "5"].map((value) => (
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
                                            <img src={`/static/sections/about/about_style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>About Style {value}</label>
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
