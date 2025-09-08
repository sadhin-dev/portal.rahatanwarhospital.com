import Newsletter1 from "../Newsletter/Newsletter1"
import Newsletter2 from "@/Frontend/Components/Newsletter/Newsletter2"
import Newsletter3 from "@/Frontend/Components/Newsletter/Newsletter3"

export default function VideoSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    // conditional rendering
    let layoutSection = ""
    if (sectionLayout === "1") {
        layoutSection = <Newsletter1 data={sections_data} />
    } else if (sectionLayout === "2") {
        layoutSection = <Newsletter2 data={sections_data} />
    } else if (sectionLayout === "3") {
        layoutSection = <Newsletter3 data={sections_data} />
    }
    return <>{layoutSection}</>
}
