import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper/modules"

export default function Partner2({ data }) {
    const { section_title, partner_list } = data
    return (
        <>
            {section_title && (
                <>
                    <h2
                        className="cs_fs_40 text-center mb-0 cs_semibold"
                        dangerouslySetInnerHTML={{
                            __html: section_title
                        }}
                    />
                    <div className="cs_height_60" />
                </>
            )}
            <Swiper
                slidesPerView={1}
                spaceBetween={24}
                pagination={{
                    clickable: true
                }}
                speed={800}
                loop={true}
                modules={[Pagination, Navigation]}
                navigation={{
                    nextEl: ".cs_right_arrow",
                    prevEl: ".cs_left_arrow",
                    disabledClass: "swiper-button-disabled"
                }}
                className="mySwiper"
                breakpoints={{
                    767: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    991: {
                        slidesPerView: 5
                    }
                }}
            >
                {partner_list?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="cs_brands cs_style_2">
                            {item.partner_image_url && <img src={item.partner_image_url} alt="Brand" />}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}
