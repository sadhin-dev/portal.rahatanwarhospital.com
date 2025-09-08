import WhyChooseUs1 from "../WhyChooseUs/WhyChooseUs1"

export default function WhyChooseUsSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    // conditionally rendering
    let section = null
    if (sectionLayout === "1") {
        section = <WhyChooseUs1 data={sections_data} />
    }
    return <>{section}</>
}
