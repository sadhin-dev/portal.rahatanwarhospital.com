import Timetable1 from "../Timetable/Timetable1"
export default function TimetableSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"
    let layoutSection = ""
    // conditional layout rendering
    if (sectionLayout === "1") {
        layoutSection = <Timetable1 data={sections_data} />
    }

    return <>{layoutSection}</>
}
