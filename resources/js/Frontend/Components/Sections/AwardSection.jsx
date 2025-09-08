import Award1 from "../Award/Award1"
import Award2 from "../Award/Award2"

export default function AwardSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"

    let section = ""
    if (sectionLayout === "1") {
        section = <Award1 data={sections_data} />
    } else if (sectionLayout === "2") {
        section = <Award2 data={sections_data} />
    }
    return <>{section}</>
}
