import React, { useState } from "react"
import { Icon } from "@iconify/react"
import WaterWave from "react-water-wave"
import YoutubeBackground from "react-youtube-background"

export default function Hero3({ data }) {
    const {
        background_image_url,
        title,
        sub_title,
        image_url,
        image_url_2,
        image_url_3,
        image_url_4,
        avatar_image_url,
        avatar_name,
        avatar_designation,
        contact_list,
        is_water_wave,
        youtube_id
    } = data

    const HeroContent = () => (
        <div className="container">
            <div className="cs_hero_card cs_radius_20 cs_white_color">
                <div className="cs_hero_card_media">
                    {avatar_image_url && <img src={avatar_image_url} alt="Avatar" />}
                    <div>
                        {avatar_name && (
                            <h4
                                className="cs_fs_24 cs_semibold cs_white_color m-0"
                                dangerouslySetInnerHTML={{
                                    __html: avatar_name
                                }}
                            />
                        )}
                        {avatar_designation && (
                            <p
                                className="m-0"
                                dangerouslySetInnerHTML={{
                                    __html: avatar_designation
                                }}
                            />
                        )}
                    </div>
                </div>
                <ul className="cs_hero_shedule_list">
                    {contact_list?.map((item, index) => (
                        <li key={index}>
                            {item.contact_icon_url && (
                                <i className="cs_center cs_accent_color">
                                    <Icon icon={item.contact_icon_url} width="18" height="18" />
                                </i>
                            )}
                            <span>{item.contact_title}</span>
                            <strong>{item.contact_info}</strong>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

    return (
        <div className={`cs_hero cs_style_3${!is_water_wave && youtube_id ? " cs_activate_white_text" : ""}`}>
            {is_water_wave ? (
                <WaterWave className="cs_hero_bg cs_bg_filed" style={{ backgroundImage: `url(${background_image_url})` }}>
                    {() => HeroContent()}
                </WaterWave>
            ) : (
                <div className="cs_hero_bg cs_bg_filed" style={{ backgroundImage: `url(${background_image_url})` }}>
                    {HeroContent()}
                    {!is_water_wave && youtube_id && (
                        <YoutubeBackground videoId={youtube_id} className="cs_video_bg"></YoutubeBackground>
                    )}
                </div>
            )}
            <div className="container">
                <div className="cs_hero_text">
                    {title && (
                        <h1
                            className="cs_hero_title cs_fs_94"
                            dangerouslySetInnerHTML={{
                                __html: title
                            }}
                        />
                    )}
                    {sub_title && (
                        <p
                            className="cs_hero_subtitle cs_white_color cs_fs_20 m-0"
                            dangerouslySetInnerHTML={{
                                __html: sub_title
                            }}
                        />
                    )}
                </div>
            </div>
            {image_url && <img src={image_url} alt="Hero" className="cs_hero_img_1" />}
            {image_url_3 && <img src={image_url_3} alt="Hero" className="cs_hero_img_2" />}
            {image_url_2 && <img src={image_url_2} alt="Hero" className="cs_hero_img_3" />}
            {image_url_4 && <img src={image_url_4} alt="Hero" className="cs_hero_img_4" />}
        </div>
    )
}
