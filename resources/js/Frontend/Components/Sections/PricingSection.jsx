import Pricing1 from "../Pricing/Pricing1"

export default function PricingSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    let section = ""
    if (sectionLayout === "1") {
        section = <Pricing1 data={sections_data} />
    }
    return <>{section}</>
}
