import Faq1 from "@/Frontend/Components/Faq/Faq1"
import Faq2 from "@/Frontend/Components/Faq/Faq2"
import Faq3 from "../Faq/Faq3"
import Faq4 from "../Faq/Faq4"

export default function FaqSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"

    // conditional render
    let section = ""
    if (sectionLayout === "1") {
        section = <Faq1 data={sections_data} />
    } else if (sectionLayout === "2") {
        section = <Faq2 data={sections_data} />
    } else if (sectionLayout === "3") {
        section = <Faq3 data={sections_data} />
    } else if (sectionLayout === "4") {
        section = <Faq4 data={sections_data} />
    }
    return <>{section}</>
}
