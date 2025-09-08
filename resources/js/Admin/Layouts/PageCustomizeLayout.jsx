import React, { useEffect, useState } from "react"
import Frame from "react-frame-component"
import "./page-customize.scss"
import { usePage } from "@inertiajs/react"
import { useDispatch, useSelector } from "react-redux"
import Page from "@/Frontend/Pages/Page/Page"
import toast, { Toaster } from "react-hot-toast"
import { updateCurrentLang, updatePageData, updatePageInfo, updateSetIsEditorMode } from "@/Redux/features/pages/Page/page"

const PageCustomizeLayout = ({ children }) => {
    const { page_data, lang, page_info, flash } = usePage().props
    const customize = useSelector((state) => state.customize)
    const dispatch = useDispatch()

    useEffect(() => {
        if (page_data) {
            dispatch(updateCurrentLang(lang.default_lang))
            dispatch(updatePageData(page_data))
            dispatch(updatePageInfo(page_info))
        }
    }, [page_data])

    // show toast notification
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {
                duration: 3000
            })
        } else if (flash.error) {
            toast.error(flash.error, {
                duration: 3000
            })
        }
    }, [flash])

    useEffect(() => {
        dispatch(updateSetIsEditorMode(true))
    }, [])

    // Callback function to be executed after content is mounted
    const handleContentDidMount = () => {
        const iframeDocument = document.querySelector("iframe").contentDocument
        if (iframeDocument) {
            if (customize.general.enable_rtl === "1") {
                iframeDocument.body.classList.add("rtl")
            }
        }
    }

    return (
        <div className="page-customizer-wrap">
            <div className="page-customizer-left">{children}</div>
            <div className="page-customizer-right">
                <Frame
                    head={
                        <>
                            <link
                                href={`https://fonts.googleapis.com/css2?family=${customize.general.primary_font}:wght@400;500;600;700;800;900&display=swap`}
                                rel="stylesheet"
                            />
                            <link
                                href={`https://fonts.googleapis.com/css2?family=${customize.general.secondary_font}:wght@400;500;600;700;800;900&display=swap`}
                                rel="stylesheet"
                            />
                            <style>
                                {customize.custom_css}
                                {`:root {
                                    --accent: ${customize.general.accent_color};
                                    --primary: ${customize.general.primary_color};
                                    --secondary: ${customize.general.secondary_color};
                                    --primary-font: ${customize.general.primary_font}, sans-serif;
                                    --secondary-font: ${customize.general.secondary_font}, sans-serif;
                                }
                            `}
                            </style>
                        </>
                    }
                    contentDidMount={handleContentDidMount}
                    initialContent='
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <link rel="stylesheet" href="/css/frontend/globals.css">
                    </head>
                    <body>
                        <div></div>
                    </body>
                    </html>
                    '
                >
                    <Page />
                </Frame>
            </div>
            <Toaster />
        </div>
    )
}

export default PageCustomizeLayout
