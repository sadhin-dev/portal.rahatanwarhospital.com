import React, { useEffect, useState } from "react"
import { produce } from "immer"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import { Icon } from "@iconify/react"
import { useRef } from "react"

export default function TimetableSectionCustomize({ index }) {
    const { currentLang, pageData } = useSelector((state) => state.pages)
    const [tab, setTab] = useState("general")
    const dispatch = useDispatch()
    const [sectionData, setSectionData] = useState({})
    const [advancedData, setAdvancedData] = useState({})
    const [data, setData] = useState({})
    const [layout, setLayout] = useState(false)
    const [savedLinkToggle, setSavedLinkToggle] = useState(false)
    const dropdownRef = useRef(null)

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

    // Remove Funfact
    const removeFunfact = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.day_list = draft.day_list.filter((_, index) => index !== removeIndex)
            })
        )
    }
    // Clone Funfact
    const cloneFunfact = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.day_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.day_list = newList
                setOpenIndex(cloneIndex + 1)
            })
        )
    }

    // Add New Funfact
    const addNewFunfact = () => {
        setData(
            produce((draft) => {
                draft.day_list.push({
                    day_title: "",
                    day_column_list: [
                        {
                            number_of_hour: "",
                            department: "",
                            time_range: "",
                            doctors: "",
                            room_number: ""
                        }
                    ]
                })
                setOpenIndex(draft.day_list?.length - 1)
            })
        )
    }

    //////////////////////////////////////////////////
    // List Item Accordion
    const [openIndex2, setOpenIndex2] = useState(0)
    const handleToggle2 = (index) => {
        setOpenIndex2((prevIndex) => (prevIndex === index ? -1 : index))
    }
    // Fixed addNewInnerFeatureButton function
    const addNewInnerFeatureButton = (dayIndex) => {
        setData(
            produce((draft) => {
                if (!draft.day_list[dayIndex].day_column_list) {
                    draft.day_list[dayIndex].day_column_list = []
                }
                draft.day_list[dayIndex].day_column_list.push({
                    number_of_hour: "",
                    department: "",
                    time_range: "",
                    doctors: "",
                    room_number: ""
                })
            })
        )
        const newFeatureIndex = data.day_list[dayIndex].day_column_list.length
        setOpenIndex2(newFeatureIndex)
    }

    // Remove InnerFeature Button
    const removeInnerFeatureButton = (dayIndex, packageIndex) => {
        setData(
            produce((draft) => {
                // Remove the day_column_list item at the specified index
                draft.day_list[dayIndex].day_column_list.splice(packageIndex, 1)
            })
        )
    }
    //////////////////////////////////////////////////
    ////// *** //////
    // List Item Accordion
    const [openIndex3, setOpenIndex3] = useState(0)
    const handleToggle3 = (index) => {
        setOpenIndex3((prevIndex) => (prevIndex === index ? -1 : index))
    }

    // Remove Time
    const removeTime = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.time_list = draft.time_list.filter((_, index) => index !== removeIndex)
            })
        )
    }

    // Clone Time
    const cloneTime = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.time_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.time_list = newList
                setOpenIndex3(cloneIndex + 1)
            })
        )
    }

    // Add New Time
    const addNewTime = () => {
        setData(
            produce((draft) => {
                draft.time_list.push({
                    time_title: ""
                })
                setOpenIndex3(draft.time_list.length - 1)
            })
        )
    }

    ////// *** //////

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSavedLinkToggle(false)
            }
        }

        if (savedLinkToggle) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [savedLinkToggle])

    // Fixed initial useEffect data structure
    useEffect(() => {
        if (index) {
            setData({
                layout: sectionData?.data?.layout ?? "1",
                day_list: sectionData?.data?.day_list ?? [
                    {
                        day_title: "",
                        day_column_list: [
                            {
                                number_of_hour: "",
                                department: "",
                                time_range: "",
                                doctors: "",
                                room_number: ""
                            }
                        ]
                    }
                ],
                time_list: sectionData?.data?.time_list ?? [
                    {
                        time_title: ""
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
                                Timetable Style {data.layout}
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
                                            <img src={`/static/sections/timetable/style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Timetable Style {value}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="cs_loop_list" style={{ marginBottom: "15px" }}>
                        <label>
                            <b>Time List:</b>
                        </label>
                        <div className="cs_loop_list_in">
                            {data.time_list?.map((item, index) => (
                                <div className="cs_loop_item" key={index}>
                                    <div className="cs_loop_item_head">
                                        <span onClick={() => handleToggle3(index)}>
                                            <span>{item.time_title ? item.time_title : "List Item"}</span>
                                        </span>
                                        <div className="cs_loop_item_control_btns">
                                            <button className="cs_clone_loop_item" onClick={() => cloneTime(index)}>
                                                <Icon icon="lucide:copy" width="18" height="18" />
                                            </button>
                                            {data.time_list.length === 1 ? (
                                                ""
                                            ) : (
                                                <button className="cs_remove_loop_item" onClick={() => removeTime(index)}>
                                                    <Icon icon="lucide:x" width="18" height="18" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {openIndex3 === index && (
                                        <div className="cs_loop_item_body">
                                            <div className="form-group">
                                                <label>Time Title</label>
                                                <input
                                                    type="text"
                                                    value={item.time_title}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.time_list[index].time_title = e.target.value
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
                                <button className="btn btn-sm btn-primary" onClick={addNewTime}>
                                    Add new Time
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="cs_loop_list cs_style_1">
                        <label>
                            <b>Day List:</b>
                        </label>
                        <div className="cs_loop_list_in">
                            {data.day_list?.map((item, index) => (
                                <div className="cs_loop_item" key={index}>
                                    <div className="cs_loop_item_head">
                                        <span onClick={() => handleToggle(index)}>
                                            <span>{item.day_title ? item.day_title : "Day Name"}</span>
                                        </span>
                                        <div className="cs_loop_item_control_btns">
                                            <button className="cs_clone_loop_item" onClick={() => cloneFunfact(index)}>
                                                <Icon icon="lucide:copy" width="18" height="18" />
                                            </button>
                                            {data.day_list.length === 1 ? (
                                                ""
                                            ) : (
                                                <button className="cs_remove_loop_item" onClick={() => removeFunfact(index)}>
                                                    <Icon icon="lucide:x" width="18" height="18" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {openIndex === index && (
                                        <div className="cs_loop_item_body">
                                            <div className="form-group">
                                                <label>Day Name</label>
                                                <input
                                                    type="text"
                                                    value={item.day_title}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.day_list[index].day_title = e.target.value
                                                            })
                                                        )
                                                    }}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Day Schedule List:</label>
                                                <div className="cs_inner_feature_list">
                                                    {item.day_column_list?.map((packageFeatureItem, packageFeatureIndex) => (
                                                        <div
                                                            className="cs_inner_feature_item cs_type_1"
                                                            key={packageFeatureIndex}
                                                        >
                                                            <div className="cs_inner_feature_head">
                                                                <span
                                                                    className="cs_inner_feature_head_title"
                                                                    onClick={() => handleToggle2(packageFeatureIndex)}
                                                                >
                                                                    <span>
                                                                        {packageFeatureItem.department
                                                                            ? packageFeatureItem.department
                                                                            : "Schedule"}
                                                                    </span>
                                                                </span>
                                                                <span
                                                                    className="cs_inner_feature_item_delete"
                                                                    onClick={() =>
                                                                        removeInnerFeatureButton(index, packageFeatureIndex)
                                                                    }
                                                                >
                                                                    <Icon icon="lucide:trash" width="16" height="16" />
                                                                </span>
                                                            </div>
                                                            {openIndex2 === packageFeatureIndex && (
                                                                <div className="cs_inner_feature_body">
                                                                    {/* Existing fields for package details */}
                                                                    <div className="form-group">
                                                                        <label>Number of hour</label>
                                                                        <input
                                                                            type="number"
                                                                            value={packageFeatureItem.number_of_hour}
                                                                            onChange={(e) => {
                                                                                setData(
                                                                                    produce((draft) => {
                                                                                        draft.day_list[index].day_column_list[
                                                                                            packageFeatureIndex
                                                                                        ].number_of_hour = e.target.value
                                                                                    })
                                                                                )
                                                                            }}
                                                                            className="form-control"
                                                                        />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Department</label>
                                                                        <input
                                                                            type="text"
                                                                            value={packageFeatureItem.department}
                                                                            onChange={(e) => {
                                                                                setData(
                                                                                    produce((draft) => {
                                                                                        draft.day_list[index].day_column_list[
                                                                                            packageFeatureIndex
                                                                                        ].department = e.target.value
                                                                                    })
                                                                                )
                                                                            }}
                                                                            className="form-control"
                                                                        />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Time Range</label>
                                                                        <input
                                                                            type="text"
                                                                            value={packageFeatureItem.time_range}
                                                                            onChange={(e) => {
                                                                                setData(
                                                                                    produce((draft) => {
                                                                                        draft.day_list[index].day_column_list[
                                                                                            packageFeatureIndex
                                                                                        ].time_range = e.target.value
                                                                                    })
                                                                                )
                                                                            }}
                                                                            className="form-control"
                                                                        />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Doctors</label>
                                                                        <textarea
                                                                            style={{ height: "80px" }}
                                                                            value={packageFeatureItem.doctors}
                                                                            onChange={(e) => {
                                                                                setData(
                                                                                    produce((draft) => {
                                                                                        draft.day_list[index].day_column_list[
                                                                                            packageFeatureIndex
                                                                                        ].doctors = e.target.value
                                                                                    })
                                                                                )
                                                                            }}
                                                                            className="form-control"
                                                                        />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Room Info</label>
                                                                        <input
                                                                            type="text"
                                                                            value={packageFeatureItem.room_number}
                                                                            onChange={(e) => {
                                                                                setData(
                                                                                    produce((draft) => {
                                                                                        draft.day_list[index].day_column_list[
                                                                                            packageFeatureIndex
                                                                                        ].room_number = e.target.value
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
                                                    <div className="cs_inner_feature_add_btn text-center">
                                                        <button
                                                            className="cs_add_btn_border"
                                                            onClick={() => addNewInnerFeatureButton(index)}
                                                        >
                                                            Add New Schedule
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="cs_loop_list_btn">
                                <button className="btn btn-sm btn-primary" onClick={addNewFunfact}>
                                    Add new Day
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* End Section Layout Desition */}
                </>
            ) : (
                <AdvanceCustomize advancedCallback={advancedCallback} currentSection={advancedData} />
            )}
        </>
    )
}
