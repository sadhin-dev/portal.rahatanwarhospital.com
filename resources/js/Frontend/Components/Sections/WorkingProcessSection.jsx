import WorkingProcess1 from "../WorkingProgress/WorkingProcess1"

export default function WorkingProcessSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    let layoutSection = ""
    if (sectionLayout === "1") {
        layoutSection = <WorkingProcess1 data={sections_data} />
    }
    return <>{layoutSection}</>
}
