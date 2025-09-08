import React from "react"
import NavigationLink from "@/Components/NavigationLink"
import { Icon } from "@iconify/react"

export default function Team1({ data }) {
    const { section_title, section_subtitle, team_list } = data
    return (
        <div className="container">
            {(section_subtitle || section_title) && (
                <div className="cs_section_heading cs_style_1 text-center">
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
                    <div className="cs_height_72 cs_height_lg_45" />
                </div>
            )}
            <div className="row cs_gap_y_30">
                {team_list?.map((item, index) => (
                    <div className="col-lg-4" key={index}>
                        <div className="cs_team cs_style_1 text-center cs_radius_20 overflow-hidden">
                            {item.team_image_url && (
                                <NavigationLink href={item.team_member_action_url} className="cs_member_img d-block">
                                    <img src={item.team_image_url} alt={item.team_member_name} />
                                </NavigationLink>
                            )}
                            <div className="cs_team_meta cs_white_bg">
                                <div>
                                    {item.team_member_name && (
                                        <h3 className="cs_member_name cs_fs_40">
                                            <NavigationLink href={item.team_member_action_url}>
                                                {item.team_member_name}
                                            </NavigationLink>
                                        </h3>
                                    )}
                                    {item.team_member_designation && (
                                        <p className="cs_member_designation cs_fs_20 cs_heading_color">
                                            {item.team_member_designation}
                                        </p>
                                    )}
                                    {item.team_member_description && (
                                        <p
                                            className="cs_member_description"
                                            dangerouslySetInnerHTML={{
                                                __html: item.team_member_description
                                            }}
                                        />
                                    )}
                                </div>
                                <div>
                                    <div className="cs_social_links">
                                        {item?.social_btns?.map((socialItem, socialIndex) => (
                                            <React.Fragment key={socialIndex}>
                                                {(socialItem.social_icon_class || socialItem.social_action_url) && (
                                                    <NavigationLink href={socialItem.social_action_url}>
                                                        <i className="d-flex">
                                                            <Icon icon={socialItem.social_icon_class} width="16" height="16" />
                                                        </i>
                                                    </NavigationLink>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
