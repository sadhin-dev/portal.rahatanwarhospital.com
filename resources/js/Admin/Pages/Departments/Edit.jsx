import { IonIcon } from "@ionic/react"
import { chevronForward, closeOutline, helpCircle, trashOutline, globeOutline } from "ionicons/icons"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import PageCustomizeLayout from "@/Admin/Layouts/PageCustomizeLayout"
import HeroSectionCustomize from "@/Admin/Components/SectionCustomize/HeroSectionCustomize"
import FunFactSectionCustomize from "@/Admin/Components/SectionCustomize/FunFactSectionCustomize"
import DepartmentSectionCustomize from "@/Admin/Components/SectionCustomize/DepartmentSectionCustomize"
import AppointmentWithFormBuilderSectionCustomize from "@/Admin/Components/SectionCustomize/AppointmentWithFormBuilderSectionCustomize"
import TeamSectionCustomize from "@/Admin/Components/SectionCustomize/DoctorSectionCustomize"
import BlogSectionCustomize from "@/Admin/Components/SectionCustomize/BlogSectionCustomize"
import TimetableSectionCustomize from "@/Admin/Components/SectionCustomize/TimetableSectionCustomize"
import PartnerSectionCustomize from "@/Admin/Components/SectionCustomize/PartnerSectionCustomize"
import CTASectionCustomize from "@/Admin/Components/SectionCustomize/CTASectionCustomize"
import PricingSectionCustomize from "@/Admin/Components/SectionCustomize/PricingSectionCustomize"
import GoogleMapSectionCustomize from "@/Admin/Components/SectionCustomize/GoogleMapSectionCustomize"
import AboutSectionCustomize from "@/Admin/Components/SectionCustomize/AboutSectionCustomize"
import AddSection from "@/Admin/Components/SectionCustomize/AddSection"
import { produce } from "immer"
import { Head, Link, router, usePage } from "@inertiajs/react"
import WhyCooseUsSectionCustomize from "@/Admin/Components/SectionCustomize/WhyCooseUsSectionCustomize"
import FaqSectionCustomize from "@/Admin/Components/SectionCustomize/FaqSectionCustomize"
import TestimonialSectionCustomize from "@/Admin/Components/SectionCustomize/TestimonialSectionCustomize"
import PhotoGallerySectionCustomize from "@/Admin/Components/SectionCustomize/PhotoGallerySectionCustomize"
import WorkingProcessSectionCustomize from "@/Admin/Components/SectionCustomize/WorkingProcessSectionCustomize"
import BannerSectionCustomize from "@/Admin/Components/SectionCustomize/BannerSectionCustomize"
import CoreValueSectionCustomize from "@/Admin/Components/SectionCustomize/CoreValueSectionCustomize"
import ContactWithFormBuilderSectionCustomize from "@/Admin/Components/SectionCustomize/ContactWithFormBuilderSectionCustomize"
import Swal from "sweetalert2"
import { clearState, updateCurrentLang, updatePageData, updatePageInfo } from "@/Redux/features/pages/Page/page"
import { useMemo } from "react"
import { cloneDeep } from "lodash"
import { Icon } from "@iconify/react"
import HeroWithFormBuilderSectionCustomize from "@/Admin/Components/SectionCustomize/HeroWithFormBuilderSectionCustomize"
import TextEditorSectionCustomize from "@/Admin/Components/SectionCustomize/TextEditorSectionCustomize"
import AwardSectionCustomize from "@/Admin/Components/SectionCustomize/AwardSectionCustomize"
import CustomHTMLSectionCustomize from "@/Admin/Components/SectionCustomize/CustomHTMLSectionCustomize"
import NewsletterSectionCustomize from "@/Admin/Components/SectionCustomize/NewsletterSectionCustomize"
import DoctorDetailsSectionCustomize from "@/Admin/Components/SectionCustomize/DoctorDetailsSectionCustomize"
import DepartmentDetails from "@/Admin/Components/SectionCustomize/DepartmentDetails"
import DoctorSectionCustomize from "@/Admin/Components/SectionCustomize/DoctorSectionCustomize"

export default function Edit() {
    const { pageData, pageInfo, clickedSection, currentLang } = useSelector((state) => state.pages)
    const { lang, default_lang, sections, department } = usePage().props
    const dispatch = useDispatch()
    const dragItem = useRef(null)
    const dragOverItem = useRef(null)
    const [isExpandInfo, setIsExpandInfo] = useState(false)
    const [isOpen, setIsOpen] = useState(true)
    const [expandCustomize, setExpandCustomize] = useState("DepartmentPageDetails")
    const [customizeSections, setCustomizeSections] = useState([])
    const [isAddSection, setIsAddSection] = useState(false)
    const [sectionIndex, setSectionIndex] = useState("")
    const [isShowSwitchLanguage, setIsShowSwitchLanguage] = useState(false)
    const langSwitchRef = useRef(null)
    const [selectedLang, setSelectedLang] = useState({})

    const langArray = useMemo(() => Object.keys(lang.languages), [lang.languages])

    // handle expand
    const handleExpand = (name, index) => {
        setExpandCustomize(name)
        setSectionIndex(index)
        setIsOpen(true)
    }

    const handleSwitchLangPopup = () => {
        setIsShowSwitchLanguage(!isShowSwitchLanguage)
    }
    // handle remove section
    const handleRemoveSection = () => {
        if (window.confirm("Are you sure you want to remove this section?")) {
            const removedSection = customizeSections[sectionIndex]
            setCustomizeSections(
                produce((draft) => {
                    draft.splice(sectionIndex, 1)
                })
            )
            // Update pageData by removing the section with the same sectionId
            const newPageData = produce(pageData, (draft) => {
                langArray.forEach((lang) => {
                    draft[lang] = draft[lang].filter((section) => section.sectionId !== removedSection.sectionId)
                })
            })

            dispatch(updatePageData(newPageData))
            setIsOpen(false)
        }
    }

    const changePageEditorBodyClass = () => {
        const iframeDocument = document.querySelector("iframe").contentDocument
        const defaultLangObj = lang.languages[currentLang]
        if (defaultLangObj?.is_ltr === "no") {
            iframeDocument?.body?.classList?.add("rtl")
        } else {
            iframeDocument?.body?.classList?.remove("rtl")
        }
    }

    // on drag end
    const handleSort = () => {
        // Create a copy of the sections to reorder
        const copiedCustomizeSections = [...customizeSections]

        // Move the dragged item to the new position
        const draggedItemContent = copiedCustomizeSections.splice(dragItem.current, 1)[0]
        copiedCustomizeSections.splice(dragOverItem.current, 0, draggedItemContent)

        // Update the state with the new order
        setCustomizeSections(copiedCustomizeSections)

        // Create a new pageData based on the new order
        const newPageData = produce(pageData, (draft) => {
            langArray.forEach((lang) => {
                // Maintain the current sections and update their order
                const currentSections = draft[lang] || []
                const updatedSections = copiedCustomizeSections.map((section) => {
                    const existingSection = currentSections.find((existing) => existing.sectionId === section.sectionId)
                    return existingSection ? { ...existingSection } : { ...section }
                })

                // Ensure that we do not lose sections that were previously there
                draft[lang] = updatedSections
            })
        })

        // Dispatch the updated pageData
        dispatch(updatePageData(newPageData))
    }

    const handleChangeLang = (lang) => {
        if (default_lang !== lang.code) {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to copy page data from primary language?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!"
            }).then((result) => {
                if (result.isConfirmed) {
                    setSelectedLang(lang)
                    let defaultLangPageData = pageData[default_lang]
                    let copiedPageData = cloneDeep(pageData)
                    copiedPageData[lang.code] = defaultLangPageData
                    dispatch(updatePageData(copiedPageData))
                    // set page info
                    let defaultLangPageInfo = pageInfo[default_lang]
                    let copiedPageInfo = cloneDeep(pageInfo)
                    copiedPageInfo[lang.code] = defaultLangPageInfo
                    dispatch(updatePageInfo(copiedPageInfo))
                } else if (result.isDismissed) {
                    setSelectedLang(lang)
                }
            })
        } else {
            setSelectedLang(lang)
        }
    }

    const handleUpdate = () => {
        const errors = validateLanguageTitles(pageInfo)
        if (!errors) {
            router.put(route("admin.departments.update", department), {
                pageData,
                pageInfo,
                customizeSections
            })
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errors
            })
        }

        function validateLanguageTitles(data) {
            for (const langCode in data) {
                const langData = data[langCode]
                const languageName = lang.languages[langCode].name || langCode
                if (langData.title === "") {
                    return `The ${languageName} title is required.`
                } else if (langData.title?.length > 255) {
                    return `The ${languageName} title must not exceed 255 characters.`
                } else if (langData.category === "" || langData.category === null) {
                    return `The ${languageName} category is required.`
                } else if (langData.icon_box_title === "") {
                    return `The ${languageName} icon box title is required.`
                } else if (langData.icon_box_title?.length > 255) {
                    return `The ${languageName} icon box title must not exceed 255 characters.`
                } else if (langData.icon_box_sub_title === "") {
                    return `The ${languageName} icon box subtitle is required.`
                } else if (langData.icon_box_sub_title?.length > 255) {
                    return `The ${languageName} icon box subtitle must not exceed 255 characters.`
                } else if (langData.meta_title?.length > 255) {
                    return `The ${languageName} meta title must not exceed 255 characters.`
                } else if (langData.meta_description?.length > 255) {
                    return `The ${languageName} meta description must not exceed 255 characters.`
                } else if (langData.meta_tags?.length > 255) {
                    return `The ${languageName} meta tags must not exceed 255 characters.`
                }
            }
            return false
        }
    }

    // conditional customize section render
    let customizeSection = ""
    switch (expandCustomize) {
        case "DepartmentPageDetails":
            customizeSection = <DepartmentDetails />
            break
        case "Hero":
            customizeSection = <HeroSectionCustomize index={sectionIndex.toString()} />
            break
        case "FunFact":
            customizeSection = <FunFactSectionCustomize index={sectionIndex.toString()} />
            break
        case "Department":
            customizeSection = <DepartmentSectionCustomize index={sectionIndex.toString()} />
            break
        case "AppointmentWithFormBuilder":
            customizeSection = <AppointmentWithFormBuilderSectionCustomize index={sectionIndex.toString()} />
            break
        case "Newsletter":
            customizeSection = <NewsletterSectionCustomize index={sectionIndex.toString()} />
            break
        case "Doctors":
            customizeSection = <DoctorSectionCustomize index={sectionIndex.toString()} />
            break
        case "Blog":
            customizeSection = <BlogSectionCustomize index={sectionIndex.toString()} />
            break
        case "Timetable":
            customizeSection = <TimetableSectionCustomize index={sectionIndex.toString()} />
            break
        case "Partner":
            customizeSection = <PartnerSectionCustomize index={sectionIndex.toString()} />
            break
        case "CTA":
            customizeSection = <CTASectionCustomize index={sectionIndex.toString()} />
            break
        case "Pricing":
            customizeSection = <PricingSectionCustomize index={sectionIndex.toString()} />
            break
        case "GoogleMap":
            customizeSection = <GoogleMapSectionCustomize index={sectionIndex.toString()} />
            break
        case "About":
            customizeSection = <AboutSectionCustomize index={sectionIndex.toString()} />
            break
        case "WhyChooseUs":
            customizeSection = <WhyCooseUsSectionCustomize index={sectionIndex.toString()} />
            break
        case "Faq":
            customizeSection = <FaqSectionCustomize index={sectionIndex.toString()} />
            break
        case "Testimonial":
            customizeSection = <TestimonialSectionCustomize index={sectionIndex.toString()} />
            break
        case "PhotoGallery":
            customizeSection = <PhotoGallerySectionCustomize index={sectionIndex.toString()} />
            break
        case "WorkingProcess":
            customizeSection = <WorkingProcessSectionCustomize index={sectionIndex.toString()} />
            break
        case "Banner":
            customizeSection = <BannerSectionCustomize index={sectionIndex.toString()} />
            break
        case "CoreValue":
            customizeSection = <CoreValueSectionCustomize index={sectionIndex.toString()} />
            break
        case "ContactWithFormBuilder":
            customizeSection = <ContactWithFormBuilderSectionCustomize index={sectionIndex.toString()} />
            break
        case "CustomHTML":
            customizeSection = <CustomHTMLSectionCustomize index={sectionIndex.toString()} />
            break
        case "Award":
            customizeSection = <AwardSectionCustomize index={sectionIndex.toString()} />
            break
        case "DoctorDetails":
            customizeSection = <DoctorDetailsSectionCustomize index={sectionIndex.toString()} />
            break
        case "TextEditor":
            customizeSection = <TextEditorSectionCustomize index={sectionIndex.toString()} />
            break
        case "HeroWithFormBuilder":
            customizeSection = <HeroWithFormBuilderSectionCustomize index={sectionIndex.toString()} />
    }

    useEffect(() => {
        const result = produce(pageData, (draft) => {
            langArray.forEach((lang) => {
                if (!draft.hasOwnProperty(lang)) {
                    draft[lang] = customizeSections.map((obj) => ({ ...obj }))
                } else {
                    customizeSections.forEach((obj, cIndex) => {
                        if (!draft[lang].some((_, pIndex) => pIndex === cIndex)) {
                            draft[lang].push({ ...obj })
                        }
                    })
                }
            })
        })

        if (JSON.stringify(result) !== JSON.stringify(pageData)) {
            dispatch(updatePageData(result))
        }
    }, [customizeSections, langArray, pageData, dispatch])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langSwitchRef.current && !langSwitchRef.current.contains(event.target)) {
                setIsShowSwitchLanguage(false)
            }
        }

        if (isShowSwitchLanguage) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isShowSwitchLanguage])

    useEffect(() => {
        const [code, findedLang] = Object.entries(lang.languages).find(([code, lang]) => code === default_lang)
        setSelectedLang(findedLang)
    }, [default_lang])

    useEffect(() => {
        dispatch(updateCurrentLang(selectedLang.code))
    }, [selectedLang])

    useEffect(() => {
        setCustomizeSections(sections)
    }, [sections])

    useEffect(() => {
        return () => {
            dispatch(clearState())
        }
    }, [])

    useEffect(() => {
        if (clickedSection) {
            const inDex = customizeSections.findIndex((item) => item.sectionId === clickedSection)
            const cs = customizeSections.find((item) => item.sectionId === clickedSection)
            handleExpand(cs?.type, inDex)
        }
    }, [clickedSection])

    useEffect(() => {
        changePageEditorBodyClass()
    }, [pageInfo, currentLang])

    return (
        <PageCustomizeLayout>
            <Head title="Edit Department" />
            <div className="customize-header-actions">
                <Link href={route("admin.departments.index")} className="dismiss">
                    <IonIcon icon={closeOutline} />
                </Link>
                <div className="language-switch" ref={langSwitchRef}>
                    <div className="language-switch-wrap" onClick={handleSwitchLangPopup}>
                        <IonIcon style={{ fontSize: "20px" }} icon={globeOutline} />
                        <span>{selectedLang.name}</span>
                    </div>
                    {isShowSwitchLanguage && (
                        <div className="select-lang">
                            <ul>
                                {Object.entries(lang.languages).map(([code, lang], index) => (
                                    <li
                                        key={index}
                                        value={code}
                                        onClick={() => {
                                            handleChangeLang(lang)
                                            handleSwitchLangPopup()
                                        }}
                                    >
                                        {lang.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="publish">
                    <button onClick={handleUpdate} className="btn btn-sm btn-success">
                        Update
                    </button>
                </div>
            </div>
            <div className="customize-section-wrap">
                <div className={`add-sections ${isAddSection ? "active" : ""}`}>
                    <AddSection
                        setIsAddSection={setIsAddSection}
                        addSection={(section) =>
                            setCustomizeSections(
                                produce((draft) => {
                                    draft.push({
                                        ...section,
                                        sectionId: `${section?.type.toLowerCase()}-${Date.now()}`
                                    })
                                })
                            )
                        }
                    />
                </div>
                <div className="customize-section-area">
                    <div className="page-customize-notice">
                        <div className="page-customize-notice-title">
                            <span>
                                You are customizing <br /> <strong>Home Page</strong>
                            </span>
                            <IonIcon onClick={() => setIsExpandInfo(!isExpandInfo)} icon={helpCircle} />
                        </div>
                        <div className={`page-customize-notice-content ${isExpandInfo ? "show" : ""}`}>
                            <p>
                                The Customizer allows you to preview changes to your site before publishing them. You can't
                                navigate to different pages on your site within the preview. Edit shortcuts are shown for some
                                editable elements, and you can also sort sections by drag and drop.
                            </p>
                        </div>
                    </div>
                    <div className="customize-sections">
                        <div className="customize-sections-item" onClick={() => handleExpand("DepartmentPageDetails")}>
                            <div className="customize-sections-item-title">
                                <h3>Department Details Page</h3>
                            </div>
                            <div className="customize-sections-item-icon">
                                <IonIcon icon={chevronForward} />
                            </div>
                        </div>
                        {customizeSections.map((item, index) => (
                            <div
                                key={index}
                                className="customize-sections-item"
                                onClick={() => handleExpand(item?.type, index)}
                                draggable
                                onDragStart={() => (dragItem.current = index)}
                                onDragEnter={() => (dragOverItem.current = index)}
                                onDragEnd={handleSort}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                <div className="customize-sections-item-title">
                                    <h3>{item.title}</h3>
                                </div>
                                <div className="customize-sections-item-icon">
                                    <IonIcon icon={chevronForward} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="customizer-footer">
                        <button onClick={() => setIsAddSection(true)} className="btn btn-sm btn-success">
                            Add Section
                        </button>
                    </div>
                </div>
                <div className={`customize-options ${isOpen ? "active" : ""}`}>
                    <div className="customize-section-description-container">
                        <div className="customize-section-title">
                            <button onClick={() => setIsOpen(false)}>
                                <Icon icon="lucide:chevron-left" width="24" height="24" />
                            </button>
                            <span>
                                Customizing <br /> <strong>{expandCustomize} Section</strong>
                            </span>
                            <span className="remove-section" onClick={handleRemoveSection}>
                                <IonIcon icon={trashOutline} />
                            </span>
                        </div>
                        <div className="customize-field">{isOpen && <>{customizeSection}</>}</div>
                    </div>
                </div>
            </div>
        </PageCustomizeLayout>
    )
}
