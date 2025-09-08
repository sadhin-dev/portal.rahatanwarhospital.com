import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper/modules"
import { Icon } from "@iconify/react"
import NavigationLink from "@/Components/NavigationLink"

export default function Team4({ data }) {
    const { section_title, team_list } = data
    return (
        <div className="container">
            <div className="cs_related_doctor position-relative">
                {section_title && (
                    <>
                        <h2
                            className="cs_fs_72 cs_related_doctor_title"
                            dangerouslySetInnerHTML={{
                                __html: section_title
                            }}
                        />
                    </>
                )}
                <Swiper
                    slidesPerView={1}
                    pagination={{
                        el: ".cs_slider_pagination",
                        clickable: true
                    }}
                    speed={800}
                    loop={true}
                    modules={[Pagination, Navigation]}
                    navigation={{
                        nextEl: ".cs_slider_next",
                        prevEl: ".cs_slider_prev",
                        disabledClass: "swiper-button-disabled"
                    }}
                    className="mySwiper"
                >
                    {team_list?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="cs_doctor_profile cs_style_1">
                                <div className="cs_doctor_img">
                                    {item.team_image_url && (
                                        <img src={item.team_image_url} alt={item.team_member_name} className="cs_radius_25" />
                                    )}
                                </div>
                                <div className="cs_doctor_profile_right">
                                    <div className="cs_doctor_info cs_radius_25 cs_white_bg overflow-hidden">
                                        <div className="cs_doctor_info_in">
                                            {item.team_member_name && (
                                                <h3 className="cs_fs_40 cs_semibold">
                                                    <NavigationLink
                                                        href={item.team_member_action_url}
                                                        dangerouslySetInnerHTML={{
                                                            __html: item.team_member_name
                                                        }}
                                                    />
                                                </h3>
                                            )}
                                            {item.team_member_designation && (
                                                <>
                                                    <p
                                                        className="cs_fs_20 cs_heading_color mb-0"
                                                        dangerouslySetInnerHTML={{
                                                            __html: item.team_member_designation
                                                        }}
                                                    />
                                                    <div className="cs_height_9" />
                                                </>
                                            )}
                                            {item.team_member_description && (
                                                <p
                                                    className="mb-0"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.team_member_description
                                                    }}
                                                />
                                            )}
                                            <div className="cs_height_28" />
                                            <div className="cs_social_links">
                                                {item.social_btns?.map((item, index) => (
                                                    <a href={item.social_action_url} target="_blank" key={index}>
                                                        <i className="d-flex">
                                                            <Icon icon={item.social_icon_class} width="16" height="16" />
                                                        </i>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="cs_doctor_meta cs_accent_bg">
                                            <div className="cs_doctor_meta_left cs_white_color">
                                                {item.action_btns?.map((item, index) => (
                                                    <NavigationLink href={item.action_url} key={index}>
                                                        <Icon icon={item.icon_class} width="20" height="20" />
                                                        {item.action_text}
                                                    </NavigationLink>
                                                ))}
                                            </div>
                                            <div className="cs_doctor_meta_right cs_white_color cs_semibold">
                                                {item.team_member_action_text && (
                                                    <NavigationLink
                                                        href={item.team_member_action_url}
                                                        className="cs_post_thumb cs_view_mouse"
                                                    >
                                                        <span>{item.team_member_action_text}</span>
                                                        <svg
                                                            width={14}
                                                            height={10}
                                                            viewBox="0 0 14 10"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M13.8137 5.44955L9.35909 9.82455C9.23907 9.9384 9.07832 10.0014 8.91147 9.99998C8.74461 9.99855 8.585 9.93282 8.46702 9.81694C8.34903 9.70106 8.2821 9.5443 8.28065 9.38043C8.2792 9.21656 8.34334 9.05868 8.45926 8.94081L11.8276 5.63268H0.63637C0.467594 5.63268 0.305731 5.56683 0.186388 5.44962C0.0670459 5.33241 0 5.17344 0 5.00768C0 4.84192 0.0670459 4.68295 0.186388 4.56574C0.305731 4.44853 0.467594 4.38268 0.63637 4.38268H11.8276L8.45926 1.07456C8.39848 1.0169 8.35 0.947935 8.31665 0.871683C8.2833 0.79543 8.26575 0.713418 8.26501 0.63043C8.26428 0.547443 8.28038 0.465144 8.31238 0.388334C8.34437 0.311524 8.39163 0.241741 8.45138 0.183059C8.51113 0.124375 8.58218 0.0779667 8.66039 0.0465412C8.73859 0.0151157 8.82239 -0.00069809 8.90689 2.28882e-05C8.99138 0.00074482 9.07489 0.0179863 9.15253 0.0507421C9.23017 0.083498 9.30039 0.131111 9.35909 0.190804L13.8137 4.56581C13.933 4.68301 14 4.84195 14 5.00768C14 5.17341 13.933 5.33235 13.8137 5.44955Z"
                                                                fill="white"
                                                            />
                                                        </svg>
                                                    </NavigationLink>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="cs_related_doctor_controll">
                    <div className="cs_slider_pagination"></div>
                    <div className="cs_slider_navigation cs_style_2">
                        <div className="cs_slider_prev cs_center slick-arrow cs_accent_color">
                            <svg width={35} height={24} viewBox="0 0 35 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.465801 13.0789L11.6023 23.5789C11.9023 23.8522 12.3042 24.0034 12.7213 23.9999C13.1385 23.9965 13.5375 23.8388 13.8325 23.5607C14.1274 23.2825 14.2947 22.9063 14.2984 22.513C14.302 22.1197 14.1416 21.7408 13.8518 21.4579L5.43108 13.5184H33.4091C33.831 13.5184 34.2357 13.3604 34.534 13.0791C34.8324 12.7978 35 12.4163 35 12.0184C35 11.6206 34.8324 11.2391 34.534 10.9578C34.2357 10.6765 33.831 10.5184 33.4091 10.5184H5.43108L13.8518 2.57893C14.0038 2.44056 14.125 2.27505 14.2084 2.09204C14.2917 1.90903 14.3356 1.7122 14.3375 1.51303C14.3393 1.31386 14.2991 1.11635 14.2191 0.932003C14.1391 0.747658 14.0209 0.580179 13.8716 0.439341C13.7222 0.298502 13.5446 0.18712 13.349 0.111698C13.1535 0.0362778 12.944 -0.00167465 12.7328 5.53131e-05C12.5215 0.00178719 12.3128 0.0431671 12.1187 0.12178C11.9246 0.200394 11.749 0.314665 11.6023 0.457932L0.465801 10.9579C0.167549 11.2392 0 11.6207 0 12.0184C0 12.4162 0.167549 12.7976 0.465801 13.0789Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <div className="cs_slider_next cs_center slick-arrow cs_accent_color">
                            <svg width={35} height={24} viewBox="0 0 35 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M34.5342 13.0789L23.3977 23.5789C23.0977 23.8522 22.6958 24.0034 22.2787 23.9999C21.8615 23.9965 21.4625 23.8388 21.1675 23.5607C20.8726 23.2825 20.7053 22.9063 20.7016 22.513C20.698 22.1197 20.8584 21.7408 21.1482 21.4579L29.5689 13.5184H1.59092C1.16899 13.5184 0.764327 13.3604 0.465971 13.0791C0.167615 12.7978 0 12.4163 0 12.0184C0 11.6206 0.167615 11.2391 0.465971 10.9578C0.764327 10.6765 1.16899 10.5184 1.59092 10.5184H29.5689L21.1482 2.57893C20.9962 2.44056 20.875 2.27505 20.7916 2.09204C20.7083 1.90903 20.6644 1.7122 20.6625 1.51303C20.6607 1.31386 20.7009 1.11635 20.7809 0.932003C20.8609 0.747658 20.9791 0.580179 21.1284 0.439341C21.2778 0.298502 21.4554 0.18712 21.651 0.111698C21.8465 0.0362778 22.056 -0.00167465 22.2672 5.53131e-05C22.4785 0.00178719 22.6872 0.0431671 22.8813 0.12178C23.0754 0.200394 23.251 0.314665 23.3977 0.457932L34.5342 10.9579C34.8325 11.2392 35 11.6207 35 12.0184C35 12.4162 34.8325 12.7976 34.5342 13.0789Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
