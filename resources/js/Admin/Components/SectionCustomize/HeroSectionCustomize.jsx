import React, { useEffect, useState } from "react"
import { produce } from "immer"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import SingleMediaUploader from "../Media/SingleMediaUploader"
import { Icon } from "@iconify/react"
import { TagsInput } from "react-tag-input-component"

export default function HeroSectionCustomize({ index }) {
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

    // Remove Funfact
    const removeFunfact = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.funfact_list = draft.funfact_list.filter((_, index) => index !== removeIndex)
            })
        )
    }

    // Clone Funfact
    const cloneFunfact = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.funfact_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.funfact_list = newList
                setOpenIndex(cloneIndex + 1)
            })
        )
    }

    // Add New Funfact
    const addNewFunfact = () => {
        setData(
            produce((draft) => {
                draft.funfact_list.push({
                    funfact_title: "",
                    funfact_value: ""
                })
                setOpenIndex(draft.funfact_list.length - 1)
            })
        )
    }

    // Remove Contact
    const removeContact = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.contact_list = draft.contact_list.filter((_, index) => index !== removeIndex)
            })
        )
    }
    // Clone Contact
    const cloneContact = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.contact_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.contact_list = newList
                setOpenIndex(cloneIndex + 1)
            })
        )
    }

    // Add New Contact
    const addNewContact = () => {
        setData(
            produce((draft) => {
                draft.contact_list.push({
                    contact_icon_url: "",
                    contact_title: "",
                    contact_info: ""
                })
                setOpenIndex(draft.contact_list.length - 1)
            })
        )
    }

    // conditional rendering
    let customizer = ""
    if (data.layout === "1" || data.layout === "2" || data.layout === "4") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Image (1070x935 px)</label>
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
                {!(data.layout === "4") && (
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
                )}
                <div className="form-group">
                    <label htmlFor="" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        Is Water Wave Effect:
                        <div
                            className={`yoo-switch ${data.is_water_wave ? "active" : ""}`}
                            onClick={() => setData({ ...data, is_water_wave: !data.is_water_wave })}
                        >
                            <div className="yoo-switch-in" />
                        </div>
                    </label>
                </div>
                {!data.is_water_wave && (
                    <div className="form-group">
                        <label>Background Video (YouTube Video ID)</label>
                        <input
                            cols="30"
                            rows="10"
                            className="form-control"
                            value={data.youtube_id}
                            onChange={(e) => setData({ ...data, youtube_id: e.target.value })}
                        />
                    </div>
                )}

                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                        className="form-control"
                    />
                </div>
                {data.layout === "4" && (
                    <>
                        <div className="form-group">
                            <label>Text Slider</label>
                            <TagsInput
                                value={data.text_slider || []}
                                onChange={(tags) =>
                                    setData(
                                        produce((draft) => {
                                            draft.text_slider = tags
                                        })
                                    )
                                }
                                name="text_slider"
                                placeHolder="Type and press enter to add"
                            />
                        </div>
                    </>
                )}
                <div className="form-group">
                    <label>Sub Title</label>
                    <textarea
                        cols="30"
                        rows="10"
                        className="form-control"
                        value={data.sub_title}
                        onChange={(e) => setData({ ...data, sub_title: e.target.value })}
                    ></textarea>
                </div>
                {!(data.layout === "4") && (
                    <>
                        <div className="form-group">
                            <label>YouTube Video URL</label>
                            <input
                                type="text"
                                value={data.video_src}
                                onChange={(e) => setData({ ...data, video_src: e.target.value })}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Video Button Text</label>
                            <input
                                type="text"
                                value={data.video_btn_text}
                                onChange={(e) => setData({ ...data, video_btn_text: e.target.value })}
                                className="form-control"
                            />
                        </div>
                    </>
                )}
                <div className="row row_space_10">
                    <div className="col-sm-6">
                        <div className="form-group" style={{ marginBottom: "10px" }}>
                            <label>Action button text</label>
                            <input
                                type="text"
                                value={data.action_text}
                                onChange={(e) => {
                                    setData({ ...data, action_text: e.target.value })
                                }}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Action button url</label>
                            <input
                                type="text"
                                value={data.action_url}
                                onChange={(e) => setData({ ...data, action_url: e.target.value })}
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>
                {data.layout === "1" && (
                    <div className="cs_loop_list">
                        <label>Contact List</label>
                        <div className="cs_loop_list_in">
                            {data.contact_list?.map((item, index) => (
                                <div className="cs_loop_item" key={index}>
                                    <div className="cs_loop_item_head">
                                        <span onClick={() => handleToggle(index)}>
                                            <span>{item.contact_title ? item.contact_title : "Contact Item"}</span>
                                        </span>
                                        <div className="cs_loop_item_control_btns">
                                            <button className="cs_clone_loop_item" onClick={() => cloneContact(index)}>
                                                <Icon icon="lucide:copy" width="18" height="18" />
                                            </button>
                                            {data.contact_list.length === 1 ? (
                                                ""
                                            ) : (
                                                <button className="cs_remove_loop_item" onClick={() => removeContact(index)}>
                                                    <Icon icon="lucide:x" width="18" height="18" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {openIndex === index && (
                                        <div className="cs_loop_item_body">
                                            <div className="form-group">
                                                <label>Upload Icon</label>
                                                <SingleMediaUploader
                                                    onSelected={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.contact_list[index].contact_icon_url = e
                                                            })
                                                        )
                                                    }}
                                                    handleRemoved={() =>
                                                        setData(
                                                            produce((draft) => {
                                                                draft.contact_list[index].contact_icon_url = ""
                                                            })
                                                        )
                                                    }
                                                    defaultValue={item.contact_icon_url}
                                                    size_sm
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Contact Title</label>
                                                <input
                                                    type="text"
                                                    value={item.contact_title}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.contact_list[index].contact_title = e.target.value
                                                            })
                                                        )
                                                    }}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Contact Info</label>
                                                <input
                                                    type="text"
                                                    value={item.contact_info}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.contact_list[index].contact_info = e.target.value
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
                                <button className="btn btn-sm btn-primary" onClick={addNewContact}>
                                    Add new
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {(data.layout === "2" || data.layout === "4") && (
                    <div className="cs_loop_list">
                        <label>Funfact List</label>
                        <div className="cs_loop_list_in">
                            {data.funfact_list?.map((item, index) => (
                                <div className="cs_loop_item" key={index}>
                                    <div className="cs_loop_item_head">
                                        <span onClick={() => handleToggle(index)}>
                                            <span>{item.funfact_title ? item.funfact_title : "List Item"}</span>
                                        </span>
                                        <div className="cs_loop_item_control_btns">
                                            <button className="cs_clone_loop_item" onClick={() => cloneFunfact(index)}>
                                                <Icon icon="lucide:copy" width="18" height="18" />
                                            </button>
                                            {data.funfact_list.length === 1 ? (
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
                                                <label>Funfact Title</label>
                                                <input
                                                    type="text"
                                                    value={item.funfact_title}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.funfact_list[index].funfact_title = e.target.value
                                                            })
                                                        )
                                                    }}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Funfact Value</label>
                                                <input
                                                    type="text"
                                                    value={item.funfact_value}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.funfact_list[index].funfact_value = e.target.value
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
                                <button className="btn btn-sm btn-primary" onClick={addNewFunfact}>
                                    Add new
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    } else if (data.layout === "3") {
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
                    <label>Large Image (1080x1245 px)</label>
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
                        size_sm
                    />
                </div>
                <div className="form-group">
                    <label>Small Image 1 (328x266 px)</label>
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
                    <label>Small Image 2 (360x100 px)</label>
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
                    <label>Small Image 3 (90x90 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.image_url_4 = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.image_url_4 = ""
                                })
                            )
                        }
                        defaultValue={data.image_url_4}
                        size_sm
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        Is Water Wave Effect:
                        <div
                            className={`yoo-switch ${data.is_water_wave ? "active" : ""}`}
                            onClick={() => setData({ ...data, is_water_wave: !data.is_water_wave })}
                        >
                            <div className="yoo-switch-in" />
                        </div>
                    </label>
                </div>
                {!data.is_water_wave && (
                    <div className="form-group">
                        <label>Background Video (YouTube Video ID)</label>
                        <input
                            cols="30"
                            rows="10"
                            className="form-control"
                            value={data.youtube_id}
                            onChange={(e) => setData({ ...data, youtube_id: e.target.value })}
                        />
                    </div>
                )}
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Sub Title</label>
                    <textarea
                        cols="30"
                        rows="10"
                        className="form-control"
                        value={data.sub_title}
                        onChange={(e) => setData({ ...data, sub_title: e.target.value })}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Avatar Image (200x200 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.avatar_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.avatar_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.avatar_image_url}
                    />
                </div>
                <div className="form-group">
                    <label>Avatar Name</label>
                    <input
                        type="text"
                        value={data.avatar_name}
                        onChange={(e) => {
                            setData({
                                ...data,
                                avatar_name: e.target.value
                            })
                        }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Avatar Designation</label>
                    <input
                        type="text"
                        value={data.avatar_designation}
                        onChange={(e) => {
                            setData({
                                ...data,
                                avatar_designation: e.target.value
                            })
                        }}
                        className="form-control"
                    />
                </div>
                <div className="cs_loop_list">
                    <label>Schedule List</label>
                    <div className="cs_loop_list_in">
                        {data.contact_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.contact_title ? item.contact_title : "Contact Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneContact(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.contact_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeContact(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Schedule Icon</label>
                                            <input
                                                type="text"
                                                value={item.contact_icon_url}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.contact_list[index].contact_icon_url = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Schedule Title</label>
                                            <input
                                                type="text"
                                                value={item.contact_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.contact_list[index].contact_title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Schedule Info</label>
                                            <input
                                                type="text"
                                                value={item.contact_info}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.contact_list[index].contact_info = e.target.value
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
                            <button className="btn btn-sm btn-primary" onClick={addNewContact}>
                                Add new
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (data.layout === "5") {
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
                    <label htmlFor="" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        Is Water Wave Effect:
                        <div
                            className={`yoo-switch ${data.is_water_wave ? "active" : ""}`}
                            onClick={() => setData({ ...data, is_water_wave: !data.is_water_wave })}
                        >
                            <div className="yoo-switch-in" />
                        </div>
                    </label>
                </div>
                {!data.is_water_wave && (
                    <div className="form-group">
                        <label>Background Video (YouTube Video ID)</label>
                        <input
                            cols="30"
                            rows="10"
                            className="form-control"
                            value={data.youtube_id}
                            onChange={(e) => setData({ ...data, youtube_id: e.target.value })}
                        />
                    </div>
                )}
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Sub Title</label>
                    <textarea
                        cols="30"
                        rows="10"
                        className="form-control"
                        value={data.sub_title}
                        onChange={(e) => setData({ ...data, sub_title: e.target.value })}
                    ></textarea>
                </div>
            </>
        )
    }

    useEffect(() => {
        if (index) {
            setData({
                layout: sectionData?.data?.layout ?? "1",
                title: sectionData?.data?.title,
                sub_title: sectionData?.data?.sub_title,
                action_text: sectionData?.data?.action_text,
                action_url: sectionData?.data?.action_url,
                background_image_url: sectionData?.data?.background_image_url,
                image_url: sectionData?.data?.image_url,
                image_url_2: sectionData?.data?.image_url_2,
                image_url_3: sectionData?.data?.image_url_3,
                image_url_4: sectionData?.data?.image_url_4,
                avatar_image_url: sectionData?.data?.avatar_image_url,
                video_src: sectionData?.data?.video_src,
                video_btn_text: sectionData?.data?.video_btn_text ?? "",
                text_slider: Array.isArray(sectionData?.data?.text_slider) ? sectionData?.data?.text_slider : [],
                funfact_list: sectionData?.data?.funfact_list ?? [
                    {
                        funfact_title: "",
                        funfact_value: ""
                    }
                ],
                contact_list: sectionData?.data?.contact_list ?? [
                    {
                        contact_icon_url: "",
                        contact_title: "",
                        contact_info: ""
                    }
                ],
                feature_list: sectionData?.data?.feature_list ?? [
                    {
                        feature_title: "",
                        feature_subtitle: ""
                    }
                ],
                avatar_name: sectionData?.data?.avatar_name,
                avatar_designation: sectionData?.data?.avatar_designation,
                youtube_id: sectionData?.data?.youtube_id,
                is_water_wave: sectionData?.data?.is_water_wave ?? false
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
                                Hero Style {data.layout}
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
                                            <img src={`/static/sections/hero/style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Hero Style {value}</label>
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
