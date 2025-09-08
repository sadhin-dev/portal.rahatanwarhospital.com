import Cta from "../Cta/Cta"

export default function CTASection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    // conditional render
    let layoutSection = ""
    if (sectionLayout === "1") {
        layoutSection = <Cta data={sections_data} />
    }
    return <>{layoutSection}</>
}
