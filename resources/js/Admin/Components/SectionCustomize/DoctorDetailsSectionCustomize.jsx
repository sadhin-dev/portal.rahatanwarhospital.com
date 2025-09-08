import React, { useEffect, useState } from "react"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import { produce } from "immer"
import { Icon } from "@iconify/react"
import SingleMediaUploader from "../Media/SingleMediaUploader"

export default function DoctorDetailsSectionCustomize({ index }) {
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
    const [openIndex, setOpenIndex] = useState({
        social: 0,
        degrees: 0,
        experiences: 0,
        awards: 0,
        schedules: 0
    })

    const handleToggle = (type, index) => {
        setOpenIndex((prev) => ({
            ...prev,
            [type]: prev[type] === index ? -1 : index
        }))
    }

    // Generic list operations
    const removeItem = (listName, removeIndex) => {
        setData(
            produce((draft) => {
                draft[listName] = draft[listName].filter((_, index) => index !== removeIndex)
            })
        )
    }

    const cloneItem = (listName, cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft[listName]]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft[listName] = newList
                setOpenIndex((prev) => ({
                    ...prev,
                    [listName]: cloneIndex + 1
                }))
            })
        )
    }

    const addNewItem = (listName, defaultItem) => {
        setData(
            produce((draft) => {
                draft[listName].push(defaultItem)
                setOpenIndex((prev) => ({
                    ...prev,
                    [listName]: draft[listName].length - 1
                }))
            })
        )
    }

    // conditional render
    let customizer = ""
    if (data.layout === "1") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Member Background (1920x490 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.member_background_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.member_background_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.member_background_image_url}
                    />
                </div>
                <div className="form-group">
                    <label>Member Image (805x920 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.member_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.member_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.member_image_url}
                    />
                </div>
                <div className="form-group">
                    <label>Member Name</label>
                    <input
                        type="text"
                        value={data.member_name}
                        onChange={(e) => setData({ ...data, member_name: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Member Category</label>
                    <input
                        className="form-control"
                        value={data.member_category}
                        onChange={(e) =>
                            setData({
                                ...data,
                                member_category: e.target.value
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Member Designation</label>
                    <input
                        className="form-control"
                        value={data.member_designation}
                        onChange={(e) =>
                            setData({
                                ...data,
                                member_designation: e.target.value
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Member Details</label>
                    <textarea
                        cols="30"
                        rows="10"
                        className="form-control"
                        value={data.member_details}
                        onChange={(e) =>
                            setData({
                                ...data,
                                member_details: e.target.value
                            })
                        }
                    />
                </div>
                <label className="yoo-font-semi-bold d-block">Contact Info:</label>
                <div className="seo-details-wrap" style={{ marginBottom: "15px" }}>
                    <div className="row row_space_10">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Contact Info Title</label>
                                <input
                                    className="form-control"
                                    value={data.contact_info_title}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            contact_info_title: e.target.value
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Contact Info Icon</label>
                                <input
                                    className="form-control"
                                    value={data.contact_info_icon}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            contact_info_icon: e.target.value
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            className="form-control"
                            value={data.member_email}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    member_email: e.target.value
                                })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            className="form-control"
                            value={data.member_phone_number}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    member_phone_number: e.target.value
                                })
                            }
                        />
                    </div>
                </div>

                {/* Social List */}
                <div className="cs_loop_list" style={{ marginBottom: "15px" }}>
                    <label className="yoo-font-semi-bold d-block">Social List:</label>
                    <div className="cs_loop_list_in">
                        {data.social_list?.map((item, index) => (
                            <div className="cs_loop_item" key={`social-${index}`}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle("social", index)}>
                                        <span>{item.social_icon_class ? item.social_icon_class : "Social Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneItem("social_list", index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.social_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button
                                                className="cs_remove_loop_item"
                                                onClick={() => removeItem("social_list", index)}
                                            >
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex.social === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Social Icon</label>
                                            <input
                                                type="text"
                                                value={item.social_icon_class}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.social_list[index].social_icon_class = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Action URL</label>
                                            <input
                                                type="text"
                                                value={item.social_action_url}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.social_list[index].social_action_url = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="cs_loop_list_btn">
                            <button
                                className="btn btn-sm btn-primary"
                                onClick={() =>
                                    addNewItem("social_list", {
                                        social_icon_class: "",
                                        social_action_url: ""
                                    })
                                }
                            >
                                Add new social
                            </button>
                        </div>
                    </div>
                </div>

                {/* Degrees List */}
                <label className="yoo-font-semi-bold d-block">Degrees:</label>
                <div className="seo-details-wrap" style={{ marginBottom: "15px" }}>
                    <div className="row row_space_10">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Degrees Title</label>
                                <input
                                    className="form-control"
                                    value={data.degrees_title}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            degrees_title: e.target.value
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Degrees Icon</label>
                                <input
                                    className="form-control"
                                    value={data.degrees_icon}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            degrees_icon: e.target.value
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="cs_loop_list">
                        <label>Degrees List</label>
                        <div className="cs_loop_list_in">
                            {data.degrees_list?.map((item, index) => (
                                <div className="cs_loop_item" key={`degrees-${index}`}>
                                    <div className="cs_loop_item_head">
                                        <span onClick={() => handleToggle("degrees", index)}>
                                            <span>{item.title ? item.title : "Degree Item"}</span>
                                        </span>
                                        <div className="cs_loop_item_control_btns">
                                            <button
                                                className="cs_clone_loop_item"
                                                onClick={() => cloneItem("degrees_list", index)}
                                            >
                                                <Icon icon="lucide:copy" width="18" height="18" />
                                            </button>
                                            {data.degrees_list.length === 1 ? (
                                                ""
                                            ) : (
                                                <button
                                                    className="cs_remove_loop_item"
                                                    onClick={() => removeItem("degrees_list", index)}
                                                >
                                                    <Icon icon="lucide:x" width="18" height="18" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {openIndex.degrees === index && (
                                        <div className="cs_loop_item_body">
                                            <div className="form-group">
                                                <label>Title</label>
                                                <input
                                                    type="text"
                                                    value={item.title}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.degrees_list[index].title = e.target.value
                                                            })
                                                        )
                                                    }}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Description</label>
                                                <input
                                                    type="text"
                                                    value={item.description}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.degrees_list[index].description = e.target.value
                                                            })
                                                        )
                                                    }}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="cs_loop_list_btn">
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() =>
                                        addNewItem("degrees_list", {
                                            title: "",
                                            description: ""
                                        })
                                    }
                                >
                                    Add new degree
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Experiences List */}
                <label className="yoo-font-semi-bold d-block">Experiences:</label>
                <div className="seo-details-wrap" style={{ marginBottom: "15px" }}>
                    <div className="row row_space_10">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Experiences Title</label>
                                <input
                                    className="form-control"
                                    value={data.experiences_title}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            experiences_title: e.target.value
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Experiences Icon</label>
                                <input
                                    className="form-control"
                                    value={data.experiences_icon}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            experiences_icon: e.target.value
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="cs_loop_list">
                        <label>Experiences List</label>
                        <div className="cs_loop_list_in">
                            {data.experiences_list?.map((item, index) => (
                                <div className="cs_loop_item" key={`experiences-${index}`}>
                                    <div className="cs_loop_item_head">
                                        <span onClick={() => handleToggle("experiences", index)}>
                                            <span>{item.title ? item.title : "Experience Item"}</span>
                                        </span>
                                        <div className="cs_loop_item_control_btns">
                                            <button
                                                className="cs_clone_loop_item"
                                                onClick={() => cloneItem("experiences_list", index)}
                                            >
                                                <Icon icon="lucide:copy" width="18" height="18" />
                                            </button>
                                            {data.experiences_list.length === 1 ? (
                                                ""
                                            ) : (
                                                <button
                                                    className="cs_remove_loop_item"
                                                    onClick={() => removeItem("experiences_list", index)}
                                                >
                                                    <Icon icon="lucide:x" width="18" height="18" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {openIndex.experiences === index && (
                                        <div className="cs_loop_item_body">
                                            <div className="form-group">
                                                <label>Title</label>
                                                <input
                                                    type="text"
                                                    value={item.title}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.experiences_list[index].title = e.target.value
                                                            })
                                                        )
                                                    }}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Description</label>
                                                <input
                                                    type="text"
                                                    value={item.description}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.experiences_list[index].description = e.target.value
                                                            })
                                                        )
                                                    }}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="cs_loop_list_btn">
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() =>
                                        addNewItem("experiences_list", {
                                            title: "",
                                            description: ""
                                        })
                                    }
                                >
                                    Add new experience
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Awards List */}
                <label className="yoo-font-semi-bold d-block">Awards:</label>
                <div className="seo-details-wrap" style={{ marginBottom: "15px" }}>
                    <div className="row row_space_10">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Awards Title</label>
                                <input
                                    className="form-control"
                                    value={data.awards_title}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            awards_title: e.target.value
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Awards Icon</label>
                                <input
                                    className="form-control"
                                    value={data.awards_icon}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            awards_icon: e.target.value
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="cs_loop_list">
                        <label>Awards List</label>
                        <div className="cs_loop_list_in">
                            {data.awards_list?.map((item, index) => (
                                <div className="cs_loop_item" key={`awards-${index}`}>
                                    <div className="cs_loop_item_head">
                                        <span onClick={() => handleToggle("awards", index)}>
                                            <span>{item.title ? item.title : "Award Item"}</span>
                                        </span>
                                        <div className="cs_loop_item_control_btns">
                                            <button
                                                className="cs_clone_loop_item"
                                                onClick={() => cloneItem("awards_list", index)}
                                            >
                                                <Icon icon="lucide:copy" width="18" height="18" />
                                            </button>
                                            {data.awards_list.length === 1 ? (
                                                ""
                                            ) : (
                                                <button
                                                    className="cs_remove_loop_item"
                                                    onClick={() => removeItem("awards_list", index)}
                                                >
                                                    <Icon icon="lucide:x" width="18" height="18" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {openIndex.awards === index && (
                                        <div className="cs_loop_item_body">
                                            <div className="form-group">
                                                <label>Title</label>
                                                <input
                                                    type="text"
                                                    value={item.title}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.awards_list[index].title = e.target.value
                                                            })
                                                        )
                                                    }}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Description</label>
                                                <input
                                                    type="text"
                                                    value={item.description}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.awards_list[index].description = e.target.value
                                                            })
                                                        )
                                                    }}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="cs_loop_list_btn">
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() =>
                                        addNewItem("awards_list", {
                                            title: "",
                                            description: ""
                                        })
                                    }
                                >
                                    Add new award
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Schedules List */}
                <label className="yoo-font-semi-bold d-block">Schedules:</label>
                <div className="seo-details-wrap">
                    <div className="row row_space_10">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Schedules Title</label>
                                <input
                                    className="form-control"
                                    value={data.schedules_title}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            schedules_title: e.target.value
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Schedules Icon</label>
                                <input
                                    className="form-control"
                                    value={data.schedules_icon}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            schedules_icon: e.target.value
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="cs_loop_list">
                        <label>Schedules List</label>
                        <div className="cs_loop_list_in">
                            {data.schedules_list?.map((item, index) => (
                                <div className="cs_loop_item" key={`schedules-${index}`}>
                                    <div className="cs_loop_item_head">
                                        <span onClick={() => handleToggle("schedules", index)}>
                                            <span>{item.day ? item.day : "Schedule Item"}</span>
                                        </span>
                                        <div className="cs_loop_item_control_btns">
                                            <button
                                                className="cs_clone_loop_item"
                                                onClick={() => cloneItem("schedules_list", index)}
                                            >
                                                <Icon icon="lucide:copy" width="18" height="18" />
                                            </button>
                                            {data.schedules_list.length === 1 ? (
                                                ""
                                            ) : (
                                                <button
                                                    className="cs_remove_loop_item"
                                                    onClick={() => removeItem("schedules_list", index)}
                                                >
                                                    <Icon icon="lucide:x" width="18" height="18" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {openIndex.schedules === index && (
                                        <div className="cs_loop_item_body">
                                            <div className="form-group">
                                                <label>Day</label>
                                                <input
                                                    type="text"
                                                    value={item.day}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.schedules_list[index].day = e.target.value
                                                            })
                                                        )
                                                    }}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Time</label>
                                                <input
                                                    type="text"
                                                    value={item.time}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.schedules_list[index].time = e.target.value
                                                            })
                                                        )
                                                    }}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="cs_loop_list_btn">
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() =>
                                        addNewItem("schedules_list", {
                                            day: "",
                                            time: ""
                                        })
                                    }
                                >
                                    Add new schedule
                                </button>
                            </div>
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
                member_background_image_url: sectionData?.data?.member_background_image_url ?? "",
                member_image_url: sectionData?.data?.member_image_url ?? "",
                member_name: sectionData?.data?.member_name ?? "",
                member_category: sectionData?.data?.member_category ?? "",
                member_designation: sectionData?.data?.member_designation ?? "",
                member_details: sectionData?.data?.member_details ?? "",
                member_email: sectionData?.data?.member_email ?? "",
                member_phone_number: sectionData?.data?.member_phone_number ?? "",
                contact_info_title: sectionData?.data?.contact_info_title ?? "",
                contact_info_icon: sectionData?.data?.contact_info_icon ?? "",
                social_list: sectionData?.data?.social_list ?? [
                    {
                        social_icon_class: "",
                        social_action_url: ""
                    }
                ],
                degrees_title: sectionData?.data?.degrees_title ?? "",
                degrees_icon: sectionData?.data?.degrees_icon ?? "",
                degrees_list: sectionData?.data?.degrees_list ?? [
                    {
                        title: "",
                        description: ""
                    }
                ],
                experiences_title: sectionData?.data?.experiences_title ?? "",
                experiences_icon: sectionData?.data?.experiences_icon ?? "",
                experiences_list: sectionData?.data?.experiences_list ?? [
                    {
                        title: "",
                        description: ""
                    }
                ],
                awards_title: sectionData?.data?.awards_title ?? "",
                awards_icon: sectionData?.data?.awards_icon ?? "",
                awards_list: sectionData?.data?.awards_list ?? [
                    {
                        title: "",
                        description: ""
                    }
                ],
                schedules_title: sectionData?.data?.schedules_title ?? "",
                schedules_icon: sectionData?.data?.schedules_icon ?? "",
                schedules_list: sectionData?.data?.schedules_list ?? [
                    {
                        day: "",
                        time: ""
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
                                Team Details Style {data.layout}
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
                                            <img src={`/static/sections/team_details/style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Team Details Style {value}</label>
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
