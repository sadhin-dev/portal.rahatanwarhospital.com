import React from "react"
import DoctorDetails1 from "../DoctorDetails/DoctorDetails1"

export default function DoctorDetailsSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"

    let layoutSection = ""
    if (sectionLayout === "1") {
        layoutSection = <DoctorDetails1 data={sections_data} />
    }

    return <>{layoutSection}</>
}
