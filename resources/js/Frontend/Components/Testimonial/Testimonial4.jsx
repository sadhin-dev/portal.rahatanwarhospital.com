import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import Rating from "../Rating"

export default function Testimonial4({ data }) {
    const { section_title, section_subtitle, users_title, user_gallery_list, testimonial_list } = data
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-5">
                    <div className="cs_section_wrap_1">
                        {(section_subtitle || section_title) && (
                            <>
                                <div className="cs_section_heading cs_style_1">
                                    {section_subtitle && (
                                        <>
                                            <h3
                                                className="cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32"
                                                dangerouslySetInnerHTML={{
                                                    __html: section_subtitle
                                                }}
                                            />
                                            <div className="cs_height_5" />
                                        </>
                                    )}
                                    {section_title && (
                                        <>
                                            <h2
                                                className="cs_section_title cs_fs_72 m-0"
                                                dangerouslySetInnerHTML={{
                                                    __html: section_title
                                                }}
                                            />
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                        <div className="cs_avatar_card">
                            <h2
                                className="cs_avatar_card_title cs_fs_24 cs_semibold"
                                dangerouslySetInnerHTML={{
                                    __html: users_title
                                }}
                            />
                            <div className="cs_avatar_group">
                                {user_gallery_list?.map((item, index) => (
                                    <div className="cs_avatar_item" key={index}>
                                        <img src={item.user_gallery_image_url} alt="Avatar" />
                                    </div>
                                ))}
                                {user_gallery_list?.length > 4 && (
                                    <div className="cs_avatar_item">
                                        <div className="cs_center cs_accent_bg rounded-circle h-100 w-100">
                                            <svg
                                                width={36}
                                                height={36}
                                                viewBox="0 0 36 36"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M33.5541 20.4455H2.44592C1.09479 20.4455 0 19.3508 0 17.9996C0 16.6485 1.09479 15.5537 2.44592 15.5537H33.5541C34.9052 15.5537 36 16.6485 36 17.9996C36 19.3508 34.9052 20.4455 33.5541 20.4455Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M18.0006 36C16.6495 36 15.5547 34.9052 15.5547 33.5541V2.44592C15.5547 1.09479 16.6495 0 18.0006 0C19.3517 0 20.4465 1.09479 20.4465 2.44592V33.5541C20.4465 34.9052 19.3517 36 18.0006 36Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7">
                    <div className="cs_testimonial_carousel_2 cs_gap_20">
                        <div className="cs_slider_navigation cs_style_1">
                            <div className="cs_slider_prev cs_center cs_shadow_2 cs_accent_color">
                                <svg width={35} height={24} viewBox="0 0 35 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.465801 13.0789L11.6023 23.5789C11.9023 23.8522 12.3042 24.0034 12.7213 23.9999C13.1385 23.9965 13.5375 23.8388 13.8325 23.5607C14.1274 23.2825 14.2947 22.9063 14.2984 22.513C14.302 22.1197 14.1416 21.7408 13.8518 21.4579L5.43108 13.5184H33.4091C33.831 13.5184 34.2357 13.3604 34.534 13.0791C34.8324 12.7978 35 12.4163 35 12.0184C35 11.6206 34.8324 11.2391 34.534 10.9578C34.2357 10.6765 33.831 10.5184 33.4091 10.5184H5.43108L13.8518 2.57893C14.0038 2.44056 14.125 2.27505 14.2084 2.09204C14.2917 1.90903 14.3356 1.7122 14.3375 1.51303C14.3393 1.31386 14.2991 1.11635 14.2191 0.932003C14.1391 0.747658 14.0209 0.580179 13.8716 0.439341C13.7222 0.298502 13.5446 0.18712 13.349 0.111698C13.1535 0.0362778 12.944 -0.00167465 12.7328 5.53131e-05C12.5215 0.00178719 12.3128 0.0431671 12.1187 0.12178C11.9246 0.200394 11.749 0.314665 11.6023 0.457932L0.465801 10.9579C0.167549 11.2392 0 11.6207 0 12.0184C0 12.4162 0.167549 12.7976 0.465801 13.0789Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                            <div className="cs_slider_next cs_center cs_shadow_2 cs_accent_color">
                                <svg width={35} height={24} viewBox="0 0 35 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M34.5342 13.0789L23.3977 23.5789C23.0977 23.8522 22.6958 24.0034 22.2787 23.9999C21.8615 23.9965 21.4625 23.8388 21.1675 23.5607C20.8726 23.2825 20.7053 22.9063 20.7016 22.513C20.698 22.1197 20.8584 21.7408 21.1482 21.4579L29.5689 13.5184H1.59092C1.16899 13.5184 0.764327 13.3604 0.465971 13.0791C0.167615 12.7978 0 12.4163 0 12.0184C0 11.6206 0.167615 11.2391 0.465971 10.9578C0.764327 10.6765 1.16899 10.5184 1.59092 10.5184H29.5689L21.1482 2.57893C20.9962 2.44056 20.875 2.27505 20.7916 2.09204C20.7083 1.90903 20.6644 1.7122 20.6625 1.51303C20.6607 1.31386 20.7009 1.11635 20.7809 0.932003C20.8609 0.747658 20.9791 0.580179 21.1284 0.439341C21.2778 0.298502 21.4554 0.18712 21.651 0.111698C21.8465 0.0362778 22.056 -0.00167465 22.2672 5.53131e-05C22.4785 0.00178719 22.6872 0.0431671 22.8813 0.12178C23.0754 0.200394 23.251 0.314665 23.3977 0.457932L34.5342 10.9579C34.8325 11.2392 35 11.6207 35 12.0184C35 12.4162 34.8325 12.7976 34.5342 13.0789Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="cs_height_140 cs_height_lg_60"></div>
                        <div className="cs_slider_activate">
                            <Swiper
                                slidesPerView="auto"
                                spaceBetween={24}
                                pagination={false}
                                navigation={{
                                    nextEl: ".cs_slider_next",
                                    prevEl: ".cs_slider_prev",
                                    disabledClass: "swiper-button-disabled"
                                }}
                                modules={[Navigation]}
                                speed={800}
                                loop={true}
                                className="mySwiper"
                            >
                                {testimonial_list?.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="cs_testimonial cs_style_4 cs_radius_20">
                                            <div className="cs_testimonial_meta">
                                                {item.avatar_image_url && (
                                                    <div className="cs_testimonial_avatar">
                                                        <img src={item.avatar_image_url} alt="Avatar" />
                                                    </div>
                                                )}
                                                <div className="cs_testimonial_meta_right">
                                                    {item.avatar_name && (
                                                        <h3
                                                            className="cs_fs_24 cs_semibold m-0"
                                                            dangerouslySetInnerHTML={{
                                                                __html: item.avatar_name
                                                            }}
                                                        />
                                                    )}
                                                    {item.avatar_designation && (
                                                        <p
                                                            className="cs_heading_color m-0"
                                                            dangerouslySetInnerHTML={{
                                                                __html: item.avatar_designation
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="cs_testimonial_text cs_heading_color cs_fs_20">
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.testimonial_text
                                                    }}
                                                />
                                            </div>
                                            {item.review_number && (
                                                <Rating className="cs_rating cs_accent_color" ratingNumber={item.review_number} />
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
