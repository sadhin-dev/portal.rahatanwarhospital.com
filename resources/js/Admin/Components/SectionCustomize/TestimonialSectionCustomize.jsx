import React, { useEffect, useState } from "react"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { useDispatch, useSelector } from "react-redux"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import { Icon } from "@iconify/react"
import SingleMediaUploader from "../Media/SingleMediaUploader"
import { produce } from "immer"

export default function TestimonialSectionCustomize({ index }) {
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

    // Remove Testimonial
    const removeTestimonial = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.testimonial_list = draft.testimonial_list.filter((_, index) => index !== removeIndex)
            })
        )
    }
    // Clone Testimonial
    const cloneTestimonial = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.testimonial_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.testimonial_list = newList
                setOpenIndex(cloneIndex + 1)
            })
        )
    }

    // Add New Testimonial
    const addNewTestimonial = () => {
        setData(
            produce((draft) => {
                draft.testimonial_list.push({
                    avatar_name: "",
                    avatar_designation: "",
                    avatar_image_url: "",
                    testimonial_text: "",
                    review_number: ""
                })
                setOpenIndex(draft.testimonial_list.length - 1)
            })
        )
    }

    // Start User Gallery
    // List Item Accordion
    const [openIndex2, setOpenIndex2] = useState(0)
    const handleToggle2 = (index) => {
        setOpenIndex2((prevIndex) => (prevIndex === index ? -1 : index))
    }

    // Remove User Gallery
    const removeUserGallery2 = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.user_gallery_list = draft.user_gallery_list.filter((_, index) => index !== removeIndex)
            })
        )
    }

    // Clone User Gallery
    const cloneUserGallery2 = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.user_gallery_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.user_gallery_list = newList
                setOpenIndex2(cloneIndex + 1)
            })
        )
    }

    // Add New Gallery
    const addNewUserGallery2 = () => {
        setData(
            produce((draft) => {
                draft.user_gallery_list.push({
                    user_gallery_image_url: ""
                })
                setOpenIndex2(draft.user_gallery_list.length - 1)
            })
        )
    }
    // End User Gallery

    // conditional rendering
    let customizer = ""
    if (data.layout === "1" || data.layout === "2" || data.layout === "3" || data.layout === "4") {
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
                        onChange={(e) =>
                            setData({
                                ...data,
                                section_subtitle: e.target.value
                            })
                        }
                        className="form-control"
                    />
                </div>
                {data.layout === "4" && (
                    <>
                        <div className="form-group">
                            <label>Users Title</label>
                            <input
                                type="text"
                                value={data.users_title}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        users_title: e.target.value
                                    })
                                }
                                className="form-control"
                            />
                        </div>
                        <div className="cs_loop_list" style={{ marginBottom: "15px" }}>
                            <label>Users List</label>
                            <div className="cs_loop_list_in">
                                {data.user_gallery_list?.map((item, index) => (
                                    <div className="cs_loop_item" key={index}>
                                        <div className="cs_loop_item_head">
                                            <span onClick={() => handleToggle2(index)}>
                                                <span>User</span>
                                            </span>
                                            <div className="cs_loop_item_control_btns">
                                                <button className="cs_clone_loop_item" onClick={() => cloneUserGallery2(index)}>
                                                    <Icon icon="lucide:copy" width="18" height="18" />
                                                </button>
                                                {data.user_gallery_list.length === 1 ? (
                                                    ""
                                                ) : (
                                                    <button
                                                        className="cs_remove_loop_item"
                                                        onClick={() => removeUserGallery2(index)}
                                                    >
                                                        <Icon icon="lucide:x" width="18" height="18" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        {openIndex2 === index && (
                                            <div className="cs_loop_item_body">
                                                <div className="form-group">
                                                    <label>Upload User Image</label>
                                                    <SingleMediaUploader
                                                        onSelected={(e) => {
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.user_gallery_list[index].user_gallery_image_url = e
                                                                })
                                                            )
                                                        }}
                                                        handleRemoved={() =>
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.user_gallery_list[index].user_gallery_image_url = ""
                                                                })
                                                            )
                                                        }
                                                        defaultValue={item.user_gallery_image_url}
                                                        size_sm
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="cs_loop_list_btn">
                                    <button className="btn btn-sm btn-primary" onClick={addNewUserGallery2}>
                                        Add new
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <div className="cs_loop_list">
                    <label>Testimonial List</label>
                    <div className="cs_loop_list_in">
                        {data.testimonial_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.avatar_name ? item.avatar_name : "Testimonial Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneTestimonial(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.testimonial_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeTestimonial(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Avatar Image (120x120 px)</label>
                                            <SingleMediaUploader
                                                onSelected={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.testimonial_list[index].avatar_image_url = e
                                                        })
                                                    )
                                                }}
                                                handleRemoved={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.testimonial_list[index].avatar_image_url = ""
                                                        })
                                                    )
                                                }
                                                defaultValue={item.avatar_image_url}
                                                size_sm
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Avatar Name</label>
                                            <input
                                                type="text"
                                                value={item.avatar_name}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.testimonial_list[index].avatar_name = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        {!(data.layout === "3") && (
                                            <div className="form-group">
                                                <label>Avatar Designation</label>
                                                <input
                                                    type="text"
                                                    value={item.avatar_designation}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.testimonial_list[index].avatar_designation = e.target.value
                                                            })
                                                        )
                                                    }}
                                                    className="form-control"
                                                />
                                            </div>
                                        )}
                                        <div className="form-group">
                                            <label>Review Number (1 to 5)</label>
                                            <input
                                                type="text"
                                                value={item.review_number}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.testimonial_list[index].review_number = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Testimonial Text</label>
                                            <textarea
                                                cols="30"
                                                rows="10"
                                                className="form-control"
                                                value={item.testimonial_text}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.testimonial_list[index].testimonial_text = e.target.value
                                                        })
                                                    )
                                                }}
                                            ></textarea>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="cs_loop_list_btn">
                            <button className="btn btn-sm btn-primary" onClick={addNewTestimonial}>
                                Add new
                            </button>
                        </div>
                    </div>
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
                users_title: sectionData?.data?.users_title ?? "",
                user_gallery_list: sectionData?.data?.user_gallery_list ?? [
                    {
                        user_gallery_image_url: ""
                    }
                ],
                testimonial_list: sectionData?.data?.testimonial_list ?? [
                    {
                        avatar_name: "",
                        avatar_designation: "",
                        avatar_image_url: "",
                        testimonial_text: "",
                        review_number: ""
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
                                Testimonial Style {data.layout}
                                <Icon icon="lucide:chevron-down" width="17" height="17" />
                            </div>
                        </div>
                        {layout && (
                            <div className="cs_section_images">
                                {["1", "2", "3", "4"].map((value) => (
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
                                            <img src={`/static/sections/testimonial/style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Testimonial Style {value}</label>
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
