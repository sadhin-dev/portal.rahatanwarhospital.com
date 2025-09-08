import React, { useEffect, useRef } from "react"
import { useState } from "react"
import FrontendLayout from "@/Frontend/Layouts/FrontendLayout"
import HeroSection from "@/Frontend/Components/Sections/HeroSection"
import FunFactSection from "@/Frontend/Components/Sections/FunFactSection"
import DepartmentSection from "@/Frontend/Components/Sections/DepartmentsSection"
import AppointmentWithFormBuilderSection from "@/Frontend/Components/Sections/AppointmentWithFormBuilderSection"
import NewsletterSection from "@/Frontend/Components/Sections/NewsletterSection"
import TestimonialSection from "@/Frontend/Components/Sections/TestimonialSection"
import BlogSection from "@/Frontend/Components/Sections/BlogSection"
import TimetableSection from "@/Frontend/Components/Sections/TimetableSection"
import PartnerSection from "@/Frontend/Components/Sections/PartnerSection"
import CTASection from "@/Frontend/Components/Sections/CTASection"
import PricingSection from "@/Frontend/Components/Sections/PricingSection"
import GoogleMapSection from "@/Frontend/Components/Sections/GoogleMapSection"
import AboutSection from "@/Frontend/Components/Sections/AboutSection"
import WhyChooseUsSection from "@/Frontend/Components/Sections/WhyChooseUsSection"
import FaqSection from "@/Frontend/Components/Sections/FaqSection"
import PageHeading from "@/Frontend/Components/PageHeading"
import { useDispatch, useSelector } from "react-redux"
import { usePage } from "@inertiajs/react"
import { updateClickedSection, updateCurrentLang, updatePageData, updatePageInfo } from "@/Redux/features/pages/Page/page"
import PhotoGallerySection from "@/Frontend/Components/Sections/PhotoGallerySection"
import WorkingProcessSection from "@/Frontend/Components/Sections/WorkingProcessSection"
import BannerSection from "@/Frontend/Components/Sections/BannerSection"
import CoreValueSection from "@/Frontend/Components/Sections/CoreValueSection"
import ContactWithFormBuilderSection from "@/Frontend/Components/Sections/ContactWithFormBuilderSection"
import CustomHTMLSection from "@/Frontend/Components/Sections/CustomHTMLSection"
import AwardSection from "@/Frontend/Components/Sections/AwardSection"
import TextEditorSection from "@/Frontend/Components/Sections/TextEditorSection"
import HeroWithFormBuilderSection from "@/Frontend/Components/Sections/HeroWithFormBuilderSection"
import DoctorDetailsSection from "@/Frontend/Components/Sections/DoctorDetailsSection"
import DoctorsSection from "@/Frontend/Components/Sections/DoctorsSection"
import ProhealthMeta from "@/utils/ProhealthMeta"

export default function Page({ meta_title, meta_tags, meta_description, tagline, meta_image, default_home_page }) {
    const { page_data, lang, page_info, site_name } = usePage().props
    const { pageInfo, pageData, currentLang, currentEditedSection, isEditorMode } = useSelector((state) => state.pages)
    const sectionData = pageData[currentLang] ?? []
    const currentLangPageInfo = pageInfo[currentLang]
    const dispatch = useDispatch()
    const sectionRef = useRef()
    const [screenSize, setScreenSize] = useState("desktop")
    const sectionComponents = {
        Hero: HeroSection,
        FunFact: FunFactSection,
        Department: DepartmentSection,
        AppointmentWithFormBuilder: AppointmentWithFormBuilderSection,
        Newsletter: NewsletterSection,
        Doctors: DoctorsSection,
        Testimonial: TestimonialSection,
        Blog: BlogSection,
        Timetable: TimetableSection,
        Partner: PartnerSection,
        CTA: CTASection,
        Pricing: PricingSection,
        GoogleMap: GoogleMapSection,
        About: AboutSection,
        WhyChooseUs: WhyChooseUsSection,
        Faq: FaqSection,
        PhotoGallery: PhotoGallerySection,
        WorkingProcess: WorkingProcessSection,
        Banner: BannerSection,
        CoreValue: CoreValueSection,
        ContactWithFormBuilder: ContactWithFormBuilderSection,
        CustomHTML: CustomHTMLSection,
        Award: AwardSection,
        DoctorDetails: DoctorDetailsSection,
        TextEditor: TextEditorSection,
        HeroWithFormBuilder: HeroWithFormBuilderSection
    }

    ProhealthMeta(
        default_home_page ? tagline : currentLangPageInfo?.meta_title ?? currentLangPageInfo?.title,
        default_home_page ? meta_title : currentLangPageInfo?.meta_title ?? currentLangPageInfo?.title,
        default_home_page ? meta_tags : currentLangPageInfo?.meta_tags,
        default_home_page ? meta_description : currentLangPageInfo?.meta_description,
        default_home_page ? meta_image : currentLangPageInfo?.meta_image,
        site_name
    )

    // page header data
    let pageHeaderData = {
        title: currentLangPageInfo?.breadcrumb_title ? currentLangPageInfo?.breadcrumb_title : currentLangPageInfo?.title,
        breadcrumb: [
            { label: "Home", url: "/" },
            {
                label: currentLangPageInfo?.breadcrumb_title ? currentLangPageInfo?.breadcrumb_title : currentLangPageInfo?.title,
                url: null
            }
        ]
    }

    useEffect(() => {
        if (page_data) {
            dispatch(updateCurrentLang(lang.default_lang))
            dispatch(updatePageData(page_data))
            dispatch(updatePageInfo(page_info))
        }
    }, [page_data])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 992) {
                setScreenSize("mobile")
            } else {
                setScreenSize("desktop")
            }
        }

        handleResize()

        // Add event listener for window resize
        window.addEventListener("resize", handleResize)

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (sectionRef.current) {
            const children = sectionRef.current.children
            const targetChild = Array.from(children).find((child) => child.id === currentEditedSection)
            if (targetChild) {
                targetChild.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                })
            }
        }
    }, [currentEditedSection])

    return (
        <FrontendLayout headerLayout={currentLangPageInfo?.header_layout} footerLayout={currentLangPageInfo?.footer_layout}>
            {currentLangPageInfo?.is_show_breadcrumb && (
                <PageHeading
                    data={pageHeaderData}
                    is_show_breadcrumb={currentLangPageInfo?.is_show_breadcrumb}
                    bgSrc={
                        currentLangPageInfo?.breadcrumb_image ? currentLangPageInfo?.breadcrumb_image : "/static/page_heading.svg"
                    }
                />
            )}

            <div ref={sectionRef}>
                {sectionData?.map((section) => {
                    const advanced = section?.advanced
                    const SectionComponent = sectionComponents[section?.type]
                    return (
                        <section
                            id={section.sectionId}
                            key={section.sectionId}
                            onClick={() => dispatch(updateClickedSection(section.sectionId))}
                            style={{
                                paddingTop:
                                    screenSize === "desktop"
                                        ? `${advanced?.padding?.top.lg}px`
                                        : `${advanced?.padding?.top.md}px`,
                                paddingBottom:
                                    screenSize === "desktop"
                                        ? `${advanced?.padding?.bottom.lg}px`
                                        : `${advanced?.padding?.bottom.md}px`,
                                backgroundImage: `url(${advanced?.backgroundImage ?? ""})`,
                                backgroundColor: advanced?.backgroundColor ?? "transparent"
                            }}
                            className={`cs_bg_filed${advanced?.is_section_dark ? " cs_dark_section" : ""} ${advanced?.classes} ${
                                isEditorMode ? "editor-hover-active" : ""
                            }`}
                        >
                            <SectionComponent sections_data={section?.data} />
                        </section>
                    )
                })}
            </div>
        </FrontendLayout>
    )
}
