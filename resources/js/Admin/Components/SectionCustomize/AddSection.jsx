import { useState } from "react"
import { Icon } from "@iconify/react"

export default function AddSection({ setIsAddSection, addSection }) {
    const [sections, setSections] = useState([
        {
            type: "About",
            title: "About",
            icon: "lucide:server",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Award",
            title: "Award",
            icon: "lucide:list",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "AppointmentWithFormBuilder",
            title: "Appointment With Form Builder",
            icon: "lucide:layout-list",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Banner",
            title: "Banner",
            icon: "lucide:rectangle-horizontal",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Blog",
            title: "Blog",
            icon: "lucide:grid-2x2",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "CoreValue",
            title: "Core Value",
            icon: "lucide:cpu",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "ContactWithFormBuilder",
            title: "Contact With Form Builder",
            icon: "lucide:container",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "CTA",
            title: "CTA",
            icon: "lucide:rectangle-ellipsis",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "CustomHTML",
            title: "Custom HTML",
            icon: "lucide:code-xml",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Faq",
            title: "FAQ",
            icon: "lucide:message-circle-question",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "FunFact",
            title: "Funfact",
            icon: "lucide:chart-pie",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "GoogleMap",
            title: "Google Map With Contact Info",
            icon: "lucide:map",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Hero",
            title: "Hero",
            icon: "lucide:monitor",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "HeroWithFormBuilder",
            title: "Hero With Form Builder",
            icon: "lucide:app-window",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Timetable",
            title: "Timetable",
            icon: "lucide:container",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Partner",
            title: "Partner",
            icon: "lucide:workflow",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Pricing",
            title: "Pricing",
            icon: "lucide:zap",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "PhotoGallery",
            title: "Photo Gallery",
            icon: "lucide:images",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Department",
            title: "Departments",
            icon: "lucide:clipboard-list",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Doctors",
            title: "Doctors",
            icon: "lucide:copy-plus",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "DoctorDetails",
            title: "Doctor Details",
            icon: "lucide:copy",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Testimonial",
            title: "Testimonial",
            icon: "lucide:crown",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "TextEditor",
            title: "Text Editor",
            icon: "lucide:letter-text",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "Newsletter",
            title: "Newsletter",
            icon: "lucide:mail-check",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "WhyChooseUs",
            title: "Why Choose Us",
            icon: "lucide:inbox",
            data: {},
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        },
        {
            type: "WorkingProcess",
            title: "Working Process",
            icon: "lucide:videotape",
            advanced: {
                backgroundImage: "",
                backgroundColor: "",
                is_section_dark: false,
                classes: [],
                padding: { top: { lg: 0, md: 0 }, bottom: { lg: 0, md: 0 } }
            },
            sectionId: ""
        }
    ])

    const [searchTerm, setSearchTerm] = useState("")

    // Filter sections based on search input
    const filteredSections = sections.filter((section) => section.title.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className="customize-section-description-container">
            <div className="add-section-title">
                <button onClick={() => setIsAddSection(false)}>
                    <Icon icon="lucide:chevron-left" width="24" height="24" />
                </button>
                <span>
                    Action <br />
                    <strong>Add Section</strong>
                </span>
            </div>
            <div className="customize-field">
                <h4 className="section-list-title">Add Section</h4>
                <div className="section-search-input-wrap">
                    <span className="section-search-icon">
                        <Icon icon="lucide:search" width="18" height="18" />
                    </span>
                    <input
                        type="text"
                        className="section-search-input"
                        placeholder="Search section..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <span className="section-search-clear" onClick={() => setSearchTerm("")}>
                            <Icon icon="lucide:x" width="16" height="16" />
                        </span>
                    )}
                </div>
                <div className="section-list">
                    {filteredSections.length > 0 ? (
                        filteredSections.map((section, index) => (
                            <div
                                key={index}
                                className="section-item"
                                onClick={() => {
                                    addSection(section)
                                    setIsAddSection(false)
                                    setSearchTerm("")
                                }}
                            >
                                <i>
                                    <Icon icon={`${section.icon ? section.icon : "lucide:box"}`} width="24" height="24" />
                                </i>
                                <span>{section.title}</span>
                            </div>
                        ))
                    ) : (
                        <div className="section-list-not-found">Not found</div>
                    )}
                </div>
            </div>
        </div>
    )
}
