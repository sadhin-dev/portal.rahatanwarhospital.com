import PhotoGallery1 from "../PhotoGallery/PhotoGallery1"
import PhotoGallery2 from "../PhotoGallery/PhotoGallery2"

export default function PartnerSection({ sections_data }) {
    const sectionLayout = sections_data?.layout ?? "1"

    // conditional rendering
    let layout = ""
    if (sectionLayout === "1") {
        layout = <PhotoGallery1 data={sections_data} />
    } else if (sectionLayout === "2") {
        layout = <PhotoGallery2 data={sections_data} />
    }
    return <>{layout}</>
}
