import React, { useEffect, useState } from "react"
import { produce } from "immer"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { useDispatch, useSelector } from "react-redux"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import { Icon } from "@iconify/react"
import SingleMediaUploader from "../Media/SingleMediaUploader"
import { usePage } from "@inertiajs/react"
import { useRef } from "react"

export default function DoctorSectionCustomize({ index }) {
    const { currentLang, pageData } = useSelector((state) => state.pages)
    const [tab, setTab] = useState("general")
    const dispatch = useDispatch()
    const [sectionData, setSectionData] = useState({})
    const [advancedData, setAdvancedData] = useState({})
    const [data, setData] = useState({})
    const [layout, setLayout] = useState(false)
    const [savedLinkToggle, setSavedLinkToggle] = useState(false)
    const [searchDoctor, setSearchDoctor] = useState("")
    const { doctors } = usePage().props
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

    // Remove Team
    const removeTeam = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.team_list = draft.team_list.filter((_, index) => index !== removeIndex)
            })
        )
    }

    // Clone Team
    const cloneTeam = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.team_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.team_list = newList
                setOpenIndex(cloneIndex + 1)
            })
        )
    }

    // Add New Team
    const addNewTeam = () => {
        setData(
            produce((draft) => {
                draft.team_list.push({
                    team_member_name: "",
                    team_member_designation: "",
                    team_member_description: "",
                    team_image_url: "",
                    team_member_action_url: "",
                    team_member_action_text: "",
                    team_member_category: "",
                    social_btns: [],
                    action_btns: []
                })
                setOpenIndex(draft.team_list.length - 1)
            })
        )
    }

    // Add New Social Button
    const addNewSocialButton = (teamIndex) => {
        setData(
            produce((draft) => {
                draft.team_list[teamIndex].social_btns.push({
                    social_icon_class: "",
                    social_action_url: ""
                })
            })
        )
    }

    // Remove Social Button
    const removeSocialButton = (teamIndex, socialIndex) => {
        setData(
            produce((draft) => {
                draft.team_list[teamIndex].social_btns.splice(socialIndex, 1)
            })
        )
    }
    // Add New Action Button
    const addNewActionButton = (teamIndex) => {
        setData(
            produce((draft) => {
                draft.team_list[teamIndex].action_btns.push({
                    icon_class: "",
                    action_url: "",
                    action_text: ""
                })
            })
        )
    }

    // Remove Action Button
    const removeActionButton = (teamIndex, socialIndex) => {
        setData(
            produce((draft) => {
                draft.team_list[teamIndex].action_btns.splice(socialIndex, 1)
            })
        )
    }
    useEffect(() => {
        if (index) {
            setData({
                layout: sectionData?.data?.layout ?? "1",
                section_title: sectionData?.data?.section_title ?? "",
                section_subtitle: sectionData?.data?.section_subtitle ?? "",
                team_list: sectionData?.data?.team_list ?? [
                    {
                        team_member_name: "",
                        team_member_designation: "",
                        team_member_description: "",
                        team_image_url: "",
                        team_member_action_url: "",
                        team_member_action_text: "",
                        team_member_category: "",
                        social_btns: [{ social_icon_class: "", social_action_url: "" }],
                        action_btns: [{ icon_class: "", action_text: "", action_url: "" }]
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

    const filteredDoctors = doctors?.data?.filter((study) => study.text.toLowerCase().includes(searchDoctor.toLowerCase()))

    const handleDoctorSelect = (url, teamIndex) => {
        setData(
            produce((draft) => {
                draft.team_list[teamIndex].team_member_action_url = url
            })
        )
        setSavedLinkToggle(false)
    }

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
                                Team Style {data.layout}
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
                                            <img src={`/static/sections/team/team_style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Team Style {value}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="form-group">
                            <label>Section Title</label>
                            <input
                                type="text"
                                value={data.section_title}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        section_title: e.target.value
                                    })
                                }
                                className="form-control"
                            />
                        </div>
                        {!(data.layout === "4") && (
                            <div className="form-group">
                                <label>Section Subtitle</label>
                                <input
                                    type="text"
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
                        )}
                        <div className="cs_loop_list">
                            <label>Team List</label>
                            <div className="cs_loop_list_in">
                                {data.team_list?.map((item, index) => (
                                    <div className="cs_loop_item" key={index}>
                                        <div className="cs_loop_item_head">
                                            <span onClick={() => handleToggle(index)}>
                                                <span>{item.team_member_name ? item.team_member_name : "List Item"}</span>
                                            </span>
                                            <div className="cs_loop_item_control_btns">
                                                <button className="cs_clone_loop_item" onClick={() => cloneTeam(index)}>
                                                    <Icon icon="lucide:copy" width="18" height="18" />
                                                </button>
                                                {data.team_list.length === 1 ? (
                                                    ""
                                                ) : (
                                                    <button className="cs_remove_loop_item" onClick={() => removeTeam(index)}>
                                                        <Icon icon="lucide:x" width="18" height="18" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        {openIndex === index && (
                                            <div className="cs_loop_item_body">
                                                <div className="form-group">
                                                    <label>Member Image</label>
                                                    <SingleMediaUploader
                                                        onSelected={(e) => {
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.team_list[index].team_image_url = e
                                                                })
                                                            )
                                                        }}
                                                        handleRemoved={() =>
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.team_list[index].team_image_url = ""
                                                                })
                                                            )
                                                        }
                                                        defaultValue={item.team_image_url}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Team Member Name</label>
                                                    <input
                                                        type="text"
                                                        value={item.team_member_name}
                                                        onChange={(e) => {
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.team_list[index].team_member_name = e.target.value
                                                                })
                                                            )
                                                        }}
                                                        className="form-control"
                                                    />
                                                </div>
                                                {data.layout === "3" && (
                                                    <div className="form-group">
                                                        <label>Category</label>
                                                        <input
                                                            type="text"
                                                            value={item.team_member_category}
                                                            onChange={(e) => {
                                                                setData(
                                                                    produce((draft) => {
                                                                        draft.team_list[index].team_member_category =
                                                                            e.target.value
                                                                    })
                                                                )
                                                            }}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                )}

                                                <div className="form-group">
                                                    <label>Team Member Designation</label>
                                                    <input
                                                        type="text"
                                                        value={item.team_member_designation}
                                                        onChange={(e) => {
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.team_list[index].team_member_designation =
                                                                        e.target.value
                                                                })
                                                            )
                                                        }}
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Team Member Description</label>
                                                    <input
                                                        type="text"
                                                        value={item.team_member_description}
                                                        onChange={(e) => {
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.team_list[index].team_member_description =
                                                                        e.target.value
                                                                })
                                                            )
                                                        }}
                                                        className="form-control"
                                                    />
                                                </div>
                                                {data.layout === "4" && (
                                                    <>
                                                        <div className="form-group">
                                                            <label>Action Text</label>
                                                            <input
                                                                type="text"
                                                                value={item.team_member_action_text}
                                                                onChange={(e) => {
                                                                    setData(
                                                                        produce((draft) => {
                                                                            draft.team_list[index].team_member_action_text =
                                                                                e.target.value
                                                                        })
                                                                    )
                                                                }}
                                                                className="form-control"
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                                <div className="form-group">
                                                    <label>Action Button URL</label>
                                                    <div className="cs_link_options_wrap">
                                                        <input
                                                            type="text"
                                                            value={item.team_member_action_url}
                                                            onChange={(e) => {
                                                                setData(
                                                                    produce((draft) => {
                                                                        draft.team_list[index].team_member_action_url =
                                                                            e.target.value
                                                                    })
                                                                )
                                                            }}
                                                            className="form-control"
                                                        />
                                                        <div className="cs_link_options">
                                                            <span
                                                                className={`cs_link_option_btn${
                                                                    savedLinkToggle ? " active" : ""
                                                                }`}
                                                                onClick={() => setSavedLinkToggle(!savedLinkToggle)}
                                                            >
                                                                <Icon icon="lucide:link" width="16" height="16" />
                                                                <span>All Doctors</span>
                                                            </span>
                                                        </div>
                                                        {savedLinkToggle && (
                                                            <div className="cs_saved_links_dropdown" ref={dropdownRef}>
                                                                <input
                                                                    type="text"
                                                                    className="cs_saved_links_search"
                                                                    placeholder="Search..."
                                                                    value={searchDoctor}
                                                                    onChange={(e) => setSearchDoctor(e.target.value)}
                                                                />
                                                                <div className="cs_saved_links">
                                                                    {filteredDoctors.length === 0 ? (
                                                                        <span>No doctor found</span>
                                                                    ) : (
                                                                        filteredDoctors.map((study, idx) => (
                                                                            <span
                                                                                key={idx}
                                                                                className={
                                                                                    item.team_member_action_url === study.url
                                                                                        ? "active"
                                                                                        : ""
                                                                                }
                                                                                onClick={() =>
                                                                                    handleDoctorSelect(study.url, index)
                                                                                }
                                                                            >
                                                                                {study.text}
                                                                            </span>
                                                                        ))
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="mt-1">
                                                        Social Links (
                                                        <a
                                                            href="https://icon-sets.iconify.design/"
                                                            target="_blank"
                                                            className="text-primary"
                                                        >
                                                            How to use icon?
                                                        </a>
                                                        )
                                                    </label>
                                                    <div className="cs_social_links_box" style={{ marginBottom: "15px" }}>
                                                        {item.social_btns?.map((socialBtn, socialIndex) => (
                                                            <div className="cs_group_with_delete" key={socialIndex}>
                                                                <div className="row row_space_10">
                                                                    <div className="col-sm-7">
                                                                        <div className="form-group">
                                                                            <label>Icon Class</label>
                                                                            <input
                                                                                type="text"
                                                                                value={socialBtn.social_icon_class}
                                                                                onChange={(e) => {
                                                                                    setData(
                                                                                        produce((draft) => {
                                                                                            draft.team_list[index].social_btns[
                                                                                                socialIndex
                                                                                            ].social_icon_class = e.target.value
                                                                                        })
                                                                                    )
                                                                                }}
                                                                                className="form-control"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-5">
                                                                        <div className="form-group">
                                                                            <label>URL</label>
                                                                            <input
                                                                                type="text"
                                                                                value={socialBtn.social_action_url}
                                                                                onChange={(e) => {
                                                                                    setData(
                                                                                        produce((draft) => {
                                                                                            draft.team_list[index].social_btns[
                                                                                                socialIndex
                                                                                            ].social_action_url = e.target.value
                                                                                        })
                                                                                    )
                                                                                }}
                                                                                className="form-control"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <span
                                                                    className="cs_group_delete"
                                                                    onClick={() => removeSocialButton(index, socialIndex)}
                                                                >
                                                                    <Icon icon="lucide:trash" width="16" height="16" />
                                                                </span>
                                                            </div>
                                                        ))}
                                                        <div className="text-center">
                                                            <button
                                                                className="cs_add_btn_border"
                                                                onClick={() => addNewSocialButton(index)}
                                                            >
                                                                Add New
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {data.layout === "4" && (
                                                    <>
                                                        <label className="mt-1">Action Link With Icon</label>
                                                        <div className="cs_social_links_box">
                                                            {item.action_btns?.map((actionBtn, actionIndex) => (
                                                                <div
                                                                    className="cs_group_with_delete"
                                                                    key={actionIndex}
                                                                    style={{ paddingRight: "0" }}
                                                                >
                                                                    <div className="row row_space_10">
                                                                        <div className="col-sm-12">
                                                                            <label
                                                                                style={{
                                                                                    borderBottom: "1px solid #dcdcde",
                                                                                    display: "block",
                                                                                    padding: "0px 10px 4px 10px",
                                                                                    marginLeft: "-10px",
                                                                                    width: "calc(100% + 20px)",
                                                                                    fontWeight: "500"
                                                                                }}
                                                                            >
                                                                                Action Item:
                                                                            </label>
                                                                        </div>
                                                                        <div className="col-sm-7">
                                                                            <div className="form-group">
                                                                                <label>Icon Class</label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={actionBtn.icon_class}
                                                                                    onChange={(e) => {
                                                                                        setData(
                                                                                            produce((draft) => {
                                                                                                draft.team_list[
                                                                                                    index
                                                                                                ].action_btns[
                                                                                                    actionIndex
                                                                                                ].icon_class = e.target.value
                                                                                            })
                                                                                        )
                                                                                    }}
                                                                                    className="form-control"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-5">
                                                                            <div className="form-group">
                                                                                <label>URL</label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={actionBtn.action_url}
                                                                                    onChange={(e) => {
                                                                                        setData(
                                                                                            produce((draft) => {
                                                                                                draft.team_list[
                                                                                                    index
                                                                                                ].action_btns[
                                                                                                    actionIndex
                                                                                                ].action_url = e.target.value
                                                                                            })
                                                                                        )
                                                                                    }}
                                                                                    className="form-control"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-12">
                                                                            <div
                                                                                className="form-group"
                                                                                style={{ marginBottom: "8px" }}
                                                                            >
                                                                                <label>Action Text</label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={actionBtn.action_text}
                                                                                    onChange={(e) => {
                                                                                        setData(
                                                                                            produce((draft) => {
                                                                                                draft.team_list[
                                                                                                    index
                                                                                                ].action_btns[
                                                                                                    actionIndex
                                                                                                ].action_text = e.target.value
                                                                                            })
                                                                                        )
                                                                                    }}
                                                                                    className="form-control"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <span
                                                                        className="cs_group_delete"
                                                                        onClick={() => removeActionButton(index, actionIndex)}
                                                                        style={{ bottom: "initial", top: "3px" }}
                                                                    >
                                                                        <Icon icon="lucide:trash" width="16" height="16" />
                                                                    </span>
                                                                </div>
                                                            ))}
                                                            <div className="text-center">
                                                                <button
                                                                    className="cs_add_btn_border"
                                                                    onClick={() => addNewActionButton(index)}
                                                                >
                                                                    Add New
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="cs_loop_list_btn">
                                    <button className="btn btn-sm btn-primary" onClick={addNewTeam}>
                                        Add new
                                    </button>
                                </div>
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
