import Department from "@/Frontend/Components/Department/Department"
import Department2 from "@/Frontend/Components/Department/Department2"
import Department3 from "@/Frontend/Components/Department/Department3"
import Department4 from "@/Frontend/Components/Department/Department4"
import Department5 from "../Department/Department5"
import Department6 from "../Department/Department6"

export default function DepartmentSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    let section = ""
    // conditional rendering
    if (sectionLayout === "1") {
        section = <Department data={sections_data} />
    } else if (sectionLayout === "2") {
        section = <Department2 data={sections_data} />
    } else if (sectionLayout === "3") {
        section = <Department3 data={sections_data} />
    } else if (sectionLayout === "4") {
        section = <Department4 data={sections_data} />
    } else if (sectionLayout === "5") {
        section = <Department5 data={sections_data} />
    } else if (sectionLayout === "6") {
        section = <Department6 data={sections_data} />
    }
    return <>{section}</>
}
