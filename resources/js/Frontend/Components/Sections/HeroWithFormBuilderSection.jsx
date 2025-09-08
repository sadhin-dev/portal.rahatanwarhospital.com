import HeroWithForm1 from "../HeroWithForm/HeroWithForm1"

export default function HeroWithFormBuilderSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"

    let section = ""
    if (sectionLayout === "1") {
        section = <HeroWithForm1 sections_data={sections_data} />
    }
    return <>{section}</>
}
