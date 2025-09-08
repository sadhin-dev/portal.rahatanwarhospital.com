import Banner1 from "@/Frontend/Components/Banner/Banner1"
import Banner2 from "@/Frontend/Components/Banner/Banner2"
import Banner3 from "@/Frontend/Components/Banner/Banner3"
import Banner4 from "@/Frontend/Components/Banner/Banner4"
import Banner5 from "@/Frontend/Components/Banner/Banner5"
import Banner6 from "@/Frontend/Components/Banner/Banner6"
import Banner9 from "../Banner/Banner9"
import Banner8 from "../Banner/Banner8"
import Banner7 from "../Banner/Banner7"
import Banner10 from "../Banner/Banner10"

export default function BannerSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    let section = ""
    if (sectionLayout === "1") {
        section = <Banner1 data={sections_data} />
    } else if (sectionLayout === "2") {
        section = <Banner2 data={sections_data} />
    } else if (sectionLayout === "3") {
        section = <Banner3 data={sections_data} />
    } else if (sectionLayout === "4") {
        section = <Banner4 data={sections_data} />
    } else if (sectionLayout === "5") {
        section = <Banner5 data={sections_data} />
    } else if (sectionLayout === "6") {
        section = <Banner6 data={sections_data} />
    } else if (sectionLayout === "7") {
        section = <Banner7 data={sections_data} />
    } else if (sectionLayout === "8") {
        section = <Banner8 data={sections_data} />
    } else if (sectionLayout === "9") {
        section = <Banner9 data={sections_data} />
    } else if (sectionLayout === "10") {
        section = <Banner10 data={sections_data} />
    }
    return <>{section}</>
}
