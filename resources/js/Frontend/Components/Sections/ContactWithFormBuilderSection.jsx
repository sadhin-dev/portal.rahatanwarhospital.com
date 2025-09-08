import ContactWithFormBuilder1 from "../ContactWithFormBuilder/ContactWithFormBuilder1"

export default function ContactWithFormBuilderSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    // conditional render
    let layoutSection = ""
    if (sectionLayout === "1") {
        layoutSection = <ContactWithFormBuilder1 sections_data={sections_data} />
    }
    return <>{layoutSection}</>
}
