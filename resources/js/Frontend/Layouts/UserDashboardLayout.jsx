import Header from "@/Frontend/Components/Header/index.jsx"
import Footer from "@/Frontend/Components/Footer"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {
    updateContact,
    updateFooter,
    updateGeneral,
    updateSidebar,
    updateSocialLink,
    updateSubscribe
} from "@/Redux/features/pages/Customize/customize"
import Header2 from "../Components/Header/Header2"
import Header3 from "../Components/Header/Header3"
import Header4 from "../Components/Header/Header4"
import Footer2 from "../Components/Footer/Footer2"
import PageHeading from "../Components/PageHeading"
import Sidebar from "../Pages/User/Sidebar/Sidebar"

export default function UserDashboardLayout({ children, headerLayout, footerLayout, cart, pageHeaderData }) {
    const dispatch = useDispatch()
    const { breadcrumb_image, is_show_breadcrumb } = JSON.parse(localStorage.getItem("page_settings")) || {}

    useEffect(() => {
        const customizeSettings = localStorage.getItem("customize_settings")
            ? JSON.parse(localStorage.getItem("customize_settings"))
            : []

        if (customizeSettings) {
            dispatch(updateGeneral(customizeSettings.general))
            dispatch(updateSidebar(customizeSettings.sidebar))
            dispatch(updateFooter(customizeSettings.footer))
            dispatch(updateContact(customizeSettings.contact))
            dispatch(updateSubscribe(customizeSettings.subscriber))
            dispatch(updateSocialLink(customizeSettings.social_links))
        }
    }, [dispatch])

    return (
        <>
            {headerLayout == "1" && <Header variant={true} />}
            {headerLayout == "2" && <Header2 />}
            {headerLayout == "3" && <Header3 />}
            {headerLayout == "4" && <Header4 />}
            {headerLayout === undefined && <Header variant={true} cart={cart} />}
            {is_show_breadcrumb === "1" && (
                <PageHeading
                    bgSrc={breadcrumb_image ? breadcrumb_image : "/static/page_heading.svg"}
                    data={pageHeaderData}
                    variant="cs_type_2"
                />
            )}
            <section>
                <div className="cs_height_100 cs_height_lg_80" />
                <div className="container">
                    <div className="cs_dashboard_wrap">
                        <Sidebar />
                        {children}
                    </div>
                </div>
                <div className="cs_height_100 cs_height_lg_80" />
            </section>
            {footerLayout == "1" && <Footer />}
            {footerLayout == "2" && <Footer2 />}
            {footerLayout === undefined && <Footer />}
        </>
    )
}
