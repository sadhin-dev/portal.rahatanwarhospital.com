import React, { useState } from "react"
import { Icon } from "@iconify/react"
import WaterWave from "react-water-wave"
import YoutubeBackground from "react-youtube-background"

export default function Hero5({ data }) {
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

    return (
        <div className={`cs_hero cs_style_3 cs_type_1${!is_water_wave && youtube_id ? " cs_activate_white_text" : ""}`}>
            {is_water_wave ? (
                <WaterWave className="cs_hero_bg cs_bg_filed" style={{ backgroundImage: `url(${background_image_url})` }}>
                    {() => <></>}
                </WaterWave>
            ) : (
                <div className="cs_hero_bg cs_bg_filed" style={{ backgroundImage: `url(${background_image_url})` }}>
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
        </div>
    )
}
