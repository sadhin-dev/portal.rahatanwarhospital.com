import React, { useEffect, useState } from "react"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { produce } from "immer"
import { useDispatch, useSelector } from "react-redux"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import { Icon } from "@iconify/react"
import SingleMediaUploader from "../Media/SingleMediaUploader"
import { useRef } from "react"
import { usePage } from "@inertiajs/react"

export default function DepartmentSectionCustomize({ index }) {
    const { currentLang, pageData } = useSelector((state) => state.pages)
    const [tab, setTab] = useState("general")
    const dispatch = useDispatch()
    const [sectionData, setSectionData] = useState({})
    const [advancedData, setAdvancedData] = useState({})
    const [savedLinkToggle, setSavedLinkToggle] = useState(false)
    const [data, setData] = useState({})
    const [layout, setLayout] = useState(false)
    const [searchDepartment, setSearchDepartment] = useState("")
    const [department, setDepartment] = useState([])
    const { departments } = usePage().props
    const dropdownRef = useRef(null)

    const advancedCallback = (data) => {
        if (index) {
            setAdvancedData(data)
            dispatch(updatePageAdvancedSettings({ data, index }))
        }
    }

    // Department Item Accordion
    const [openIndex, setOpenIndex] = useState(0)
    const handleToggle = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index))
    }

    // Remove Department
    const removeDepartment = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.department_list = draft.department_list.filter((_, index) => index !== removeIndex)
            })
        )
    }
    // Clone Department
    const cloneDepartment = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.department_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.department_list = newList
                setOpenIndex(cloneIndex + 1)
            })
        )
    }

    // Add New Department
    const addNewDepartment = () => {
        setData(
            produce((draft) => {
                draft.department_list.push({
                    department_icon_url: "",
                    department_title: "",
                    department_subtitle: "",
                    department_btn_url: ""
                })
                setOpenIndex(draft.department_list.length - 1)
            })
        )
    }

    useEffect(() => {
        setDepartment(departments?.data)
    }, [])

    const filteredDepartments = departments?.data?.filter((department) =>
        department.text.toLowerCase().includes(searchDepartment.toLowerCase())
    )

    const handleDepartmentSelect = (url, departmentIndex) => {
        setData(
            produce((draft) => {
                draft.department_list[departmentIndex].department_btn_url = url
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

    let customizer = ""
    if (
        data.layout === "1" ||
        data.layout === "2" ||
        data.layout === "3" ||
        data.layout === "4" ||
        data.layout === "5" ||
        data.layout === "6"
    ) {
        customizer = (
            <>
                {data.layout === "1" && (
                    <div className="form-group">
                        <label>Image (1675x450 px)</label>
                        <SingleMediaUploader
                            onSelected={(e) => {
                                setData(
                                    produce((draft) => {
                                        draft.section_background_url = e
                                    })
                                )
                            }}
                            handleRemoved={() =>
                                setData(
                                    produce((draft) => {
                                        draft.section_background_url = ""
                                    })
                                )
                            }
                            defaultValue={data.section_background_url}
                        />
                    </div>
                )}

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
                    <label>Department List</label>
                    <div className="cs_loop_list_in">
                        {data.department_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.department_title ? item.department_title : "Department Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneDepartment(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.department_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeDepartment(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Department Icon</label>
                                            <SingleMediaUploader
                                                onSelected={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.department_list[index].department_icon_url = e
                                                        })
                                                    )
                                                }}
                                                handleRemoved={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.department_list[index].department_icon_url = ""
                                                        })
                                                    )
                                                }
                                                defaultValue={item.department_icon_url}
                                                size_sm
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Department Title</label>
                                            <input
                                                type="text"
                                                value={item.department_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.department_list[index].department_title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        {!(data.layout === "1" || data.layout === "2" || data.layout === "3") && (
                                            <div className="form-group">
                                                <label>Department Subtitle</label>
                                                <textarea
                                                    cols="30"
                                                    rows="10"
                                                    className="form-control"
                                                    value={item.department_subtitle}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.department_list[index].department_subtitle = e.target.value
                                                            })
                                                        )
                                                    }}
                                                ></textarea>
                                            </div>
                                        )}
                                        <div className="form-group m-0">
                                            <label>Button URL</label>
                                            <div className="cs_link_options_wrap">
                                                <input
                                                    type="text"
                                                    value={item.department_btn_url}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.department_list[index].department_btn_url = e.target.value
                                                            })
                                                        )
                                                    }}
                                                    className="form-control"
                                                />
                                                <div className="cs_link_options">
                                                    <span
                                                        className={`cs_link_option_btn${savedLinkToggle ? " active" : ""}`}
                                                        onClick={() => setSavedLinkToggle(!savedLinkToggle)}
                                                    >
                                                        <Icon icon="lucide:link" width="16" height="16" />
                                                        <span>All Departments</span>
                                                    </span>
                                                </div>
                                                {savedLinkToggle && (
                                                    <div className="cs_saved_links_dropdown" ref={dropdownRef}>
                                                        <input
                                                            type="text"
                                                            className="cs_saved_links_search"
                                                            placeholder="Search..."
                                                            value={searchDepartment}
                                                            onChange={(e) => setSearchDepartment(e.target.value)}
                                                        />
                                                        <div className="cs_saved_links">
                                                            {filteredDepartments.length === 0 ? (
                                                                <span>No department found</span>
                                                            ) : (
                                                                filteredDepartments.map((department, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className={
                                                                            item.department_btn_url === department.url
                                                                                ? "active"
                                                                                : ""
                                                                        }
                                                                        onClick={() =>
                                                                            handleDepartmentSelect(department.url, index)
                                                                        }
                                                                    >
                                                                        {department.text}
                                                                    </span>
                                                                ))
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="cs_loop_list_btn">
                            <button className="btn btn-sm btn-primary" onClick={addNewDepartment}>
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
                section_background_url: sectionData?.data?.section_background_url ?? "",
                department_list: sectionData?.data?.department_list ?? [
                    {
                        department_icon_url: "",
                        department_title: "",
                        department_subtitle: "",
                        department_btn_url: ""
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
                                Department Style {data.layout}
                                <Icon icon="lucide:chevron-down" width="17" height="17" />
                            </div>
                        </div>
                        {layout && (
                            <div className="cs_section_images">
                                {["1", "2", "3", "4", "5", "6"].map((value) => (
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
                                            <img src={`/static/sections/department/style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Department Style {value}</label>
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
