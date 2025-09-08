import AppointmentWithFormBuilder1 from "../AppointmentWithFormBuilder/AppointmentWithFormBuilder1"
import AppointmentWithFormBuilder2 from "../AppointmentWithFormBuilder/AppointmentWithFormBuilder2"
import AppointmentWithFormBuilder3 from "../AppointmentWithFormBuilder/AppointmentWithFormBuilder3"
import AppointmentWithFormBuilder4 from "../AppointmentWithFormBuilder/AppointmentWithFormBuilder4"

export default function AppointmentWithFormBuilderSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"

    let section = ""
    if (sectionLayout === "1") {
        section = <AppointmentWithFormBuilder1 sections_data={sections_data} />
    } else if (sectionLayout === "2") {
        section = <AppointmentWithFormBuilder2 sections_data={sections_data} />
    } else if (sectionLayout === "3") {
        section = <AppointmentWithFormBuilder3 sections_data={sections_data} />
    } else if (sectionLayout === "4") {
        section = <AppointmentWithFormBuilder4 sections_data={sections_data} />
    }
    return <>{section}</>
}
