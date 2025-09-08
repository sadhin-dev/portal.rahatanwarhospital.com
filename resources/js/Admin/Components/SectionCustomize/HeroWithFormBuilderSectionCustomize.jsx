import React, { useEffect, useState } from "react"
import { produce } from "immer"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { TagsInput } from "react-tag-input-component"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import { Icon } from "@iconify/react"
import SingleMediaUploader from "../Media/SingleMediaUploader"

export default function HeroWithFormBuilderSectionCustomize({ index }) {
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

    /** Start Form Functions **/
    // List Item Accordion
    const [fieldOpenIndex, setFieldOpenIndex] = useState(0)
    const handleFieldToggle = (index) => {
        setFieldOpenIndex((prevIndex) => (prevIndex === index ? -1 : index))
    }

    // Clone Field
    const cloneField = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.forms]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.forms = newList
                setFieldOpenIndex(cloneIndex + 1)
            })
        )
    }

    // handle add new field
    const AddNewField = () => {
        setData(
            produce((draft) => {
                draft.forms.push({
                    label: "",
                    fieldType: "",
                    select_options: [],
                    isRequired: false,
                    default_value: "",
                    placeholder: "",
                    icon_url: ""
                })
                setFieldOpenIndex(draft.forms.length - 1)
            })
        )
    }

    // handle remove field
    const removeField = (index) => {
        setData(
            produce((draft) => {
                draft.forms.splice(index, 1)
            })
        )
    }
    /** End Form Functions **/

    // conditional render
    let customizer = ""
    if (data.layout === "1") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Background image (1920x1100 px)</label>
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
                    <label>Small Image 1 (328x266 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.image_url_1 = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.image_url_1 = ""
                                })
                            )
                        }
                        defaultValue={data.image_url_1}
                        size_sm
                    />
                </div>
                <div className="form-group">
                    <label>Small Image 2 (360x100 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.image_url_2 = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.image_url_2 = ""
                                })
                            )
                        }
                        defaultValue={data.image_url_2}
                        size_sm
                    />
                </div>
                <div className="form-group">
                    <label>Small Image 3 (90x90 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.image_url_3 = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.image_url_3 = ""
                                })
                            )
                        }
                        defaultValue={data.image_url_3}
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
            </>
        )
    }

    useEffect(() => {
        if (index) {
            setData({
                layout: sectionData?.data?.layout ?? "1",
                background_image_url: sectionData?.data?.background_image_url,
                image_url_1: sectionData?.data?.image_url_1,
                image_url_2: sectionData?.data?.image_url_2,
                image_url_3: sectionData?.data?.image_url_3,
                section_title: sectionData?.data?.section_title,
                section_subtitle: sectionData?.data?.section_subtitle,
                section_description: sectionData?.data?.section_description,
                google_map_iframe: sectionData?.data?.google_map_iframe,
                social_title: sectionData?.data?.social_title,
                image_url: sectionData?.data?.image_url,
                submit_btn_text: sectionData?.data?.submit_btn_text,
                response_form: sectionData?.data?.response_form,
                column: sectionData?.data?.column ?? "6",
                forms: sectionData?.data?.forms ?? [
                    {
                        label: "",
                        fieldType: "",
                        select_options: [],
                        isRequired: false,
                        default_value: "",
                        placeholder: "",
                        icon_url: ""
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
                                Contact Style {data.layout}
                                <Icon icon="lucide:chevron-down" width="17" height="17" />
                            </div>
                        </div>
                        {layout && (
                            <div className="cs_section_images">
                                {["1"].map((value) => (
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
                                            <img src={`/static/sections/hero_with_form_builder/style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Contact Style {value}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {customizer}

                    <hr
                        style={{
                            marginTop: "30px",
                            marginBottom: "20px",
                            borderTopWidth: "2px"
                        }}
                    />
                    <div className="form-group">
                        <label>Response From</label>
                        <input
                            className="form-control"
                            value={data.response_form}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    response_form: e.target.value
                                })
                            }
                        />
                        <i className="yoo-red-color yoo-font-size-12 yoo-line-1-2 d-block" style={{ marginTop: "5px" }}>
                            <b>Note:</b> Please Enter Response From, This Field Is Required.
                        </i>
                    </div>
                    <div className="form-group">
                        <label>Submit Button Text</label>
                        <input
                            className="form-control"
                            value={data.submit_btn_text}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    submit_btn_text: e.target.value
                                })
                            }
                        />
                    </div>
                    <div className="cs_loop_list">
                        <label>Create Form</label>
                        <div className="cs_loop_list_in">
                            {data.forms?.map((item, index) => (
                                <div className="cs_loop_item" key={`plan-${index}`}>
                                    <div className="cs_loop_item_head">
                                        <span onClick={() => handleFieldToggle(index)}>
                                            <span>{item.label ? item.label : "Form Field"}</span>
                                        </span>
                                        <div className="cs_loop_item_control_btns">
                                            <button className="cs_clone_loop_item" onClick={() => cloneField(index)}>
                                                <Icon icon="lucide:copy" width="18" height="18" />
                                            </button>
                                            {data.forms.length === 1 ? (
                                                ""
                                            ) : (
                                                <button className="cs_remove_loop_item" onClick={() => removeField(index)}>
                                                    <Icon icon="lucide:x" width="18" height="18" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {fieldOpenIndex === index && (
                                        <div className="cs_loop_item_body">
                                            <div className="form-group">
                                                <label>Upload Icon</label>
                                                <SingleMediaUploader
                                                    onSelected={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.forms[index].icon_url = e
                                                            })
                                                        )
                                                    }}
                                                    handleRemoved={() =>
                                                        setData(
                                                            produce((draft) => {
                                                                draft.forms[index].icon_url = ""
                                                            })
                                                        )
                                                    }
                                                    defaultValue={item.icon_url}
                                                    size_sm
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Field label</label>
                                                <input
                                                    type="text"
                                                    value={item.label}
                                                    onChange={(e) =>
                                                        setData(
                                                            produce((draft) => {
                                                                draft.forms[index].label = e.target.value
                                                            })
                                                        )
                                                    }
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Placeholder</label>
                                                <input
                                                    type="text"
                                                    value={item.placeholder}
                                                    onChange={(e) =>
                                                        setData(
                                                            produce((draft) => {
                                                                draft.forms[index].placeholder = e.target.value
                                                            })
                                                        )
                                                    }
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Default value</label>
                                                <input
                                                    type="text"
                                                    value={item.default_value}
                                                    onChange={(e) =>
                                                        setData(
                                                            produce((draft) => {
                                                                draft.forms[index].default_value = e.target.value
                                                            })
                                                        )
                                                    }
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="field_type">Field type</label>
                                                <select
                                                    id="field_type"
                                                    className="form-control"
                                                    value={item.fieldType}
                                                    onChange={(e) =>
                                                        setData(
                                                            produce((draft) => {
                                                                draft.forms[index].fieldType = e.target.value
                                                            })
                                                        )
                                                    }
                                                >
                                                    <option value="text">Text</option>
                                                    <option value="email">Email</option>
                                                    <option value="number">Number</option>
                                                    <option value="date">Date</option>
                                                    <option value="select">Select</option>
                                                    <option value="multilineText">MultilineText</option>
                                                    <option value="hidden">Hidden</option>
                                                </select>
                                            </div>
                                            {item.fieldType === "select" && (
                                                <div className="form-group">
                                                    <label htmlFor="options">Select options</label>
                                                    <TagsInput
                                                        id="options"
                                                        value={item?.select_options ?? []}
                                                        onChange={(e) =>
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.forms[index].select_options = e
                                                                })
                                                            )
                                                        }
                                                    />
                                                </div>
                                            )}
                                            <div className="form-group">
                                                <label htmlFor="field_type">Column</label>
                                                <select
                                                    id="field_type"
                                                    className="form-control"
                                                    value={item.column}
                                                    onChange={(e) =>
                                                        setData(
                                                            produce((draft) => {
                                                                draft.forms[index].column = e.target.value
                                                            })
                                                        )
                                                    }
                                                >
                                                    <option value="6">6</option>
                                                    <option value="12">12</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={item.isRequired}
                                                        onChange={() =>
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.forms[index].isRequired = !item.isRequired
                                                                })
                                                            )
                                                        }
                                                    />
                                                    <span className="form-check-label">Is Required</span>
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="cs_loop_list_btn">
                                <button className="btn btn-sm btn-primary" onClick={AddNewField}>
                                    Add New field
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <AdvanceCustomize advancedCallback={advancedCallback} currentSection={advancedData} />
            )}
        </>
    )
}
