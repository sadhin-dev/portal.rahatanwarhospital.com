import Hero from "@/Frontend/Components/Hero"
import Hero2 from "@/Frontend/Components/Hero/Hero2"
import Hero3 from "@/Frontend/Components/Hero/Hero3"
import Hero4 from "@/Frontend/Components/Hero/Hero4"
import Hero5 from "../Hero/Hero5"

export default function HeroSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"

    let layoutSection = ""
    // conditional layout rendering
    if (sectionLayout === "1") {
        layoutSection = <Hero data={sections_data} />
    } else if (sectionLayout === "2") {
        layoutSection = <Hero2 data={sections_data} />
    } else if (sectionLayout === "3") {
        layoutSection = <Hero3 data={sections_data} />
    } else if (sectionLayout === "4") {
        layoutSection = <Hero4 data={sections_data} />
    } else if (sectionLayout === "5") {
        layoutSection = <Hero5 data={sections_data} />
    }
    return <>{layoutSection}</>
}
