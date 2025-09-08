import NavigationLink from "@/Components/NavigationLink"
import { Icon } from "@iconify/react"
import React from "react"

export default function DoctorDetails1({ data }) {
    const {
        member_background_image_url,
        member_image_url,
        member_name,
        member_category,
        member_designation,
        member_details,
        member_email,
        member_phone_number,
        contact_info_title,
        contact_info_icon,
        social_list,
        schedules_title,
        schedules_icon,
        schedules_list,
        degrees_title,
        degrees_icon,
        degrees_list,
        experiences_title,
        experiences_icon,
        experiences_list,
        awards_title,
        awards_icon,
        awards_list
    } = data
    return (
        <div className="cs_doctor_details">
            <div
                className="cs_doctor_details_bg cs_bg_filed"
                style={{
                    backgroundImage: `url(${member_background_image_url})`
                }}
            />
            <div className="cs_height_85" />
            <div className="container">
                <div className="row">
                    <div className="col-lg-5">
                        <div className="cs_single_doctor overflow-hidden cs_radius_20">
                            <img src={member_image_url} alt={member_name} className="w-100" />
                            {member_category && (
                                <h3 className="cs_white_color cs_accent_bg mb-0 text-center cs_semibold cs_fs_24">
                                    {member_category}
                                </h3>
                            )}
                        </div>
                        <div className="cs_height_94 cs_height_lg_60" />
                        <div className="cs_list cs_style_2">
                            <h2 className="cs_list_title cs_medium cs_fs_24">
                                {contact_info_icon && (
                                    <Icon icon={contact_info_icon} width="26" height="26" className="cs_accent_color" />
                                )}
                                {contact_info_title}
                            </h2>
                            <ul className="cs_mp0 cs_heading_color">
                                {member_phone_number && (
                                    <li>
                                        <svg
                                            width={12}
                                            height={11}
                                            viewBox="0 0 12 11"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M2.38144 7.31206C3.47051 8.60899 4.78151 9.63013 6.27784 10.3527C6.84754 10.6216 7.60943 10.9407 8.45827 10.9954C8.51089 10.9977 8.56123 11 8.61385 11C9.18355 11 9.64114 10.804 10.0141 10.4005C10.0164 10.3983 10.0209 10.3937 10.0232 10.3891C10.1559 10.2296 10.3069 10.086 10.4648 9.93328C10.5723 9.83071 10.6822 9.72358 10.7874 9.61417C11.2747 9.10816 11.2747 8.4654 10.7828 7.97534L9.40777 6.60547C9.1744 6.36386 8.89527 6.23622 8.60241 6.23622C8.30955 6.23622 8.02813 6.36386 7.78789 6.60319L6.9688 7.41919C6.8933 7.37588 6.81551 7.33713 6.7423 7.30066C6.65078 7.25508 6.56612 7.21177 6.49062 7.1639C5.74475 6.69208 5.06751 6.07667 4.42002 5.28574C4.09284 4.87319 3.87319 4.52673 3.7199 4.17344C3.93497 3.97969 4.13631 3.77683 4.33079 3.57853C4.39943 3.50787 4.47035 3.43722 4.54128 3.36656C4.78838 3.12039 4.92108 2.83547 4.92108 2.546C4.92108 2.25653 4.79067 1.97161 4.54128 1.72545L3.85947 1.04621C3.77939 0.966432 3.70389 0.888935 3.62609 0.809159C3.47509 0.654165 3.31722 0.494613 3.16164 0.351015C2.92598 0.120804 2.64914 0 2.35628 0C2.06571 0 1.78657 0.120804 1.54176 0.353295L0.686065 1.20576C0.374903 1.51575 0.19873 1.89184 0.162122 2.32719C0.118651 2.87194 0.219321 3.45089 0.480149 4.15064C0.880542 5.23332 1.48456 6.2385 2.38144 7.31206ZM0.720385 2.37505C0.74784 2.0719 0.864526 1.8189 1.08417 1.60008L1.93529 0.752176C2.06799 0.624534 2.21442 0.558433 2.35628 0.558433C2.49584 0.558433 2.6377 0.624534 2.76811 0.756734C2.9214 0.898052 3.06554 1.04621 3.22113 1.20348C3.29892 1.28326 3.37899 1.36303 3.45907 1.44509L4.14089 2.12433C4.28274 2.26564 4.35595 2.40924 4.35595 2.55056C4.35595 2.69188 4.28274 2.83547 4.14089 2.97679C4.06996 3.04745 3.99903 3.12039 3.92811 3.19105C3.71533 3.4053 3.51627 3.60816 3.29663 3.80191C3.29205 3.80647 3.28976 3.80874 3.28519 3.8133C3.09529 4.00249 3.12503 4.18255 3.17079 4.31931C3.17308 4.32615 3.17537 4.33071 3.17765 4.33755C3.35383 4.75922 3.59864 5.16038 3.98073 5.63904C4.66712 6.48239 5.39011 7.13655 6.18632 7.64028C6.2847 7.7041 6.38995 7.75425 6.48833 7.80439C6.57985 7.84998 6.66451 7.89329 6.74001 7.94115C6.74916 7.94571 6.75602 7.95027 6.76518 7.95483C6.84068 7.99358 6.91389 8.01181 6.98711 8.01181C7.17015 8.01181 7.28912 7.89557 7.32801 7.85682L8.18371 7.00435C8.31641 6.87215 8.46056 6.80149 8.60241 6.80149C8.77629 6.80149 8.91815 6.90862 9.00738 7.00435L10.387 8.3765C10.6616 8.65002 10.6593 8.94633 10.3802 9.23581C10.2841 9.33838 10.1834 9.43639 10.0759 9.53896C9.9157 9.69395 9.74868 9.8535 9.59767 10.0336C9.33456 10.3162 9.0211 10.4484 8.61614 10.4484C8.57724 10.4484 8.53606 10.4461 8.49716 10.4438C7.74671 10.396 7.04888 10.1042 6.52494 9.85578C5.10183 9.16971 3.8526 8.19644 2.81616 6.96104C1.96275 5.93763 1.38847 4.98487 1.00867 3.96374C0.773008 3.33692 0.683777 2.8332 0.720385 2.37505Z"
                                                fill="#307BC4"
                                            />
                                        </svg>
                                        {member_phone_number}
                                    </li>
                                )}
                                {member_email && (
                                    <li>
                                        <svg
                                            width={13}
                                            height={10}
                                            viewBox="0 0 13 10"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M11.2784 0.522339H1.02531C0.459825 0.522339 0 0.982164 0 1.54765V8.7248C0 9.29026 0.459825 9.75009 1.02531 9.75009H11.2784C11.8438 9.75009 12.3037 9.29026 12.3037 8.72477V1.54765C12.3037 0.982164 11.8438 0.522339 11.2784 0.522339ZM1.02531 1.03498H11.2784C11.3162 1.03498 11.3494 1.04875 11.3849 1.05654C10.4972 1.86894 7.55385 4.56162 6.52383 5.48966C6.44323 5.56225 6.31332 5.64886 6.15186 5.64886C5.9904 5.64886 5.86049 5.56225 5.77962 5.48942C4.7497 4.56152 1.80616 1.8687 0.918642 1.05659C0.954159 1.0488 0.987513 1.03498 1.02531 1.03498ZM0.512645 8.72477V1.54765C0.512645 1.49743 0.527784 1.45187 0.541337 1.40597C1.22073 2.02778 3.27448 3.90659 4.60616 5.11757C3.27881 6.25775 1.22453 8.20538 0.539727 8.85838C0.52764 8.81479 0.512645 8.77216 0.512645 8.72477ZM11.2784 9.23744H1.02531C0.984365 9.23744 0.947959 9.22317 0.909726 9.21404C1.61736 8.53945 3.68471 6.58062 4.98873 5.46505C5.15872 5.61925 5.31401 5.75986 5.43642 5.87016C5.64769 6.06091 5.89499 6.16153 6.15183 6.16153C6.40867 6.16153 6.65597 6.06089 6.86698 5.8704C6.98944 5.76005 7.14485 5.61932 7.31494 5.46505C8.61903 6.5805 10.6861 8.53919 11.3939 9.21404C11.3557 9.22317 11.3193 9.23744 11.2784 9.23744ZM11.791 8.72477C11.791 8.77214 11.776 8.81479 11.764 8.85838C11.0789 8.20504 9.02486 6.25763 7.69753 5.11759C9.02926 3.90662 11.0827 2.02798 11.7623 1.40592C11.7759 1.45182 11.791 1.4974 11.791 1.54763V8.72477Z"
                                                fill="#307BC4"
                                            />
                                        </svg>
                                        {member_email}
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="cs_height_66 cs_height_lg_60" />
                        <div className="cs_list cs_style_3">
                            {(schedules_icon || schedules_title) && (
                                <h2 className="cs_list_title cs_medium cs_fs_24">
                                    {schedules_icon && (
                                        <Icon icon={schedules_icon} width="26" height="26" className="cs_accent_color" />
                                    )}
                                    {schedules_title}
                                </h2>
                            )}

                            {(schedules_list?.[0].day || schedules_list?.[0].time) && (
                                <ul className="cs_mp0 cs_heading_color cs_radius_20 cs_white_bg cs_medium">
                                    {schedules_list?.map((item, index) => (
                                        <li key={index}>
                                            <span>{item.day}</span>
                                            <span>
                                                <i className="d-flex">
                                                    <Icon icon="fa6-regular:clock" width="16" height="16" />
                                                </i>{" "}
                                                {item.time}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="col-lg-6 offset-lg-1 position-relative">
                        <div className="cs_height_55" />
                        {member_name && (
                            <>
                                <h2
                                    className="cs_fs_48 mb-0 cs_semibold"
                                    dangerouslySetInnerHTML={{
                                        __html: member_name
                                    }}
                                />
                                <div className="cs_height_12" />
                            </>
                        )}
                        {member_designation && (
                            <>
                                <h3
                                    className="cs_semibold cs_fs_24 mb-0"
                                    dangerouslySetInnerHTML={{
                                        __html: member_designation
                                    }}
                                />
                                <div className="cs_height_32" />
                            </>
                        )}
                        {member_details && (
                            <p
                                className="mb-0 cs_heading_color"
                                dangerouslySetInnerHTML={{
                                    __html: member_details
                                }}
                            />
                        )}
                        <div className="cs_social_links cs_accent_bg cs_radius_15">
                            {social_list?.map((item, index) => (
                                <a href={item.social_action_url} target="_blank" key={index}>
                                    <i className="d-block">
                                        <Icon icon={item.social_icon_class} width="16" height="16" />
                                    </i>
                                </a>
                            ))}
                        </div>
                        <div className="cs_height_150 cs_height_lg_80" />
                        <div className="cs_height_35 cs_height_lg_0" />
                        <div className="cs_list cs_style_1">
                            {(degrees_icon || degrees_title) && (
                                <h2 className="cs_list_title cs_medium cs_fs_24">
                                    {degrees_icon && (
                                        <Icon icon={degrees_icon} width="26" height="26" className="cs_accent_color" />
                                    )}
                                    {degrees_title}
                                </h2>
                            )}
                            {(degrees_list?.[0].title || degrees_list?.[0].description) && (
                                <ul>
                                    {degrees_list?.map((item, index) => (
                                        <li key={index}>
                                            {item.title && (
                                                <p
                                                    className="cs_medium cs_heading_color mb-0"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.title
                                                    }}
                                                />
                                            )}
                                            {item.description && (
                                                <p
                                                    className="mb-0"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.description
                                                    }}
                                                />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="cs_height_70 cs_height_lg_50" />
                        <div className="cs_list cs_style_1">
                            {(experiences_icon || experiences_title) && (
                                <h2 className="cs_list_title cs_medium cs_fs_24">
                                    {experiences_icon && (
                                        <Icon icon={experiences_icon} width="26" height="26" className="cs_accent_color" />
                                    )}
                                    {experiences_title}
                                </h2>
                            )}
                            {(experiences_list?.[0].title || experiences_list?.[0].description) && (
                                <ul>
                                    {experiences_list?.map((item, index) => (
                                        <li key={index}>
                                            {item.title && (
                                                <p
                                                    className="cs_medium cs_heading_color mb-0"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.title
                                                    }}
                                                />
                                            )}
                                            {item.description && (
                                                <p
                                                    className="mb-0"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.description
                                                    }}
                                                />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="cs_height_70 cs_height_lg_50" />
                        <div className="cs_list cs_style_1">
                            {(awards_icon || awards_title) && (
                                <h2 className="cs_list_title cs_medium cs_fs_24">
                                    {awards_icon && (
                                        <Icon icon={awards_icon} width="26" height="26" className="cs_accent_color" />
                                    )}
                                    {awards_title}
                                </h2>
                            )}
                            {(awards_list?.[0].title || awards_list?.[0].description) && (
                                <ul>
                                    {awards_list?.map((item, index) => (
                                        <li key={index}>
                                            {item.title && (
                                                <p
                                                    className="cs_medium cs_heading_color mb-0"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.title
                                                    }}
                                                />
                                            )}
                                            {item.description && (
                                                <p
                                                    className="mb-0"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.description
                                                    }}
                                                />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
