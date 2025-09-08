import Blog1 from "../Blog/Blog1"
import Blog2 from "../Blog/Blog2"
import Blog3 from "../Blog/Blog3"
import Blog4 from "../Blog/Blog4"

export default function BlogSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    // conditional rendering
    let section = ""
    if (sectionLayout === "1") {
        section = <Blog1 data={sections_data} />
    } else if (sectionLayout === "2") {
        section = <Blog2 data={sections_data} />
    } else if (sectionLayout === "3") {
        section = <Blog3 data={sections_data} />
    } else if (sectionLayout === "4") {
        section = <Blog4 data={sections_data} />
    }
    return <>{section}</>
}
