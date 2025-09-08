import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
export default function CoreValue2({ data }) {
    const { section_title, feature_list } = data

    return (
        <div className="container">
            <div className="cs_iconbox_carousel_1 cs_gap_20 position-relative">
                <div className="row">
                    <div className="col-lg-4">
                        {section_title && (
                            <>
                                <div className="cs_section_heading cs_style_1">
                                    <h2
                                        className="cs_section_title cs_fs_72 m-0"
                                        dangerouslySetInnerHTML={{
                                            __html: section_title
                                        }}
                                    />
                                </div>
                                <div className="cs_height_150 cs_height_lg_10" />
                                <div className="cs_height_30 cs_height_lg_0" />
                            </>
                        )}
                        <div className="cs_slider_navigation cs_style_2">
                            <div className="cs_slider_prev cs_center">
                                <svg width={35} height={24} viewBox="0 0 35 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.465801 13.0789L11.6023 23.5789C11.9023 23.8522 12.3042 24.0034 12.7213 23.9999C13.1385 23.9965 13.5375 23.8388 13.8325 23.5607C14.1274 23.2825 14.2947 22.9063 14.2984 22.513C14.302 22.1197 14.1416 21.7408 13.8518 21.4579L5.43108 13.5184H33.4091C33.831 13.5184 34.2357 13.3604 34.534 13.0791C34.8324 12.7978 35 12.4163 35 12.0184C35 11.6206 34.8324 11.2391 34.534 10.9578C34.2357 10.6765 33.831 10.5184 33.4091 10.5184H5.43108L13.8518 2.57893C14.0038 2.44056 14.125 2.27505 14.2084 2.09204C14.2917 1.90903 14.3356 1.7122 14.3375 1.51303C14.3393 1.31386 14.2991 1.11635 14.2191 0.932003C14.1391 0.747658 14.0209 0.580179 13.8716 0.439341C13.7222 0.298502 13.5446 0.18712 13.349 0.111698C13.1535 0.0362778 12.944 -0.00167465 12.7328 5.53131e-05C12.5215 0.00178719 12.3128 0.0431671 12.1187 0.12178C11.9246 0.200394 11.749 0.314665 11.6023 0.457932L0.465801 10.9579C0.167549 11.2392 0 11.6207 0 12.0184C0 12.4162 0.167549 12.7976 0.465801 13.0789Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                            <div className="cs_slider_next cs_center">
                                <svg width={35} height={24} viewBox="0 0 35 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M34.5342 13.0789L23.3977 23.5789C23.0977 23.8522 22.6958 24.0034 22.2787 23.9999C21.8615 23.9965 21.4625 23.8388 21.1675 23.5607C20.8726 23.2825 20.7053 22.9063 20.7016 22.513C20.698 22.1197 20.8584 21.7408 21.1482 21.4579L29.5689 13.5184H1.59092C1.16899 13.5184 0.764327 13.3604 0.465971 13.0791C0.167615 12.7978 0 12.4163 0 12.0184C0 11.6206 0.167615 11.2391 0.465971 10.9578C0.764327 10.6765 1.16899 10.5184 1.59092 10.5184H29.5689L21.1482 2.57893C20.9962 2.44056 20.875 2.27505 20.7916 2.09204C20.7083 1.90903 20.6644 1.7122 20.6625 1.51303C20.6607 1.31386 20.7009 1.11635 20.7809 0.932003C20.8609 0.747658 20.9791 0.580179 21.1284 0.439341C21.2778 0.298502 21.4554 0.18712 21.651 0.111698C21.8465 0.0362778 22.056 -0.00167465 22.2672 5.53131e-05C22.4785 0.00178719 22.6872 0.0431671 22.8813 0.12178C23.0754 0.200394 23.251 0.314665 23.3977 0.457932L34.5342 10.9579C34.8325 11.2392 35 11.6207 35 12.0184C35 12.4162 34.8325 12.7976 34.5342 13.0789Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="cs_height_0 cs_height_lg_30" />
                    </div>
                    <div className="col-lg-8">
                        <div className="cs_slider_activate position-relative">
                            <Swiper
                                slidesPerView={"auto"}
                                spaceBetween={20}
                                pagination={false}
                                speed={800}
                                modules={[Navigation]}
                                loop={true}
                                navigation={{
                                    nextEl: ".cs_slider_next",
                                    prevEl: ".cs_slider_prev",
                                    disabledClass: "swiper-button-disabled"
                                }}
                                className="mySwiper"
                            >
                                {feature_list?.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="cs_iconbox cs_style_10 cs_radius_20 cs_white_bg text-center">
                                            {item.feature_icon_url && (
                                                <div className="cs_iconbox_icon cs_center rounded-circle">
                                                    <img src={item.feature_icon_url} alt="Icon" />
                                                </div>
                                            )}
                                            {item.feature_title && (
                                                <h2
                                                    className="cs_iconbox_title"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.feature_title
                                                    }}
                                                />
                                            )}
                                            {item.feature_subtitle && (
                                                <p
                                                    className="cs_iconbox_subtitle mb-0"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.feature_subtitle
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
