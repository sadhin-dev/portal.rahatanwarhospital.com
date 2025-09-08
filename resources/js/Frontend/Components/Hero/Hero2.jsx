import { useState } from "react"
import NavigationLink from "@/Components/NavigationLink"
import WaterWave from "react-water-wave"
import YoutubeBackground from "react-youtube-background"

export default function Hero2({ data }) {
    const {
        title,
        video_src,
        video_btn_text,
        sub_title,
        background_image_url,
        image_url,
        action_text,
        action_url,
        funfact_list,
        is_water_wave,
        youtube_id
    } = data
    /* Start Video Modal */
    const [iframeSrc, setIframeSrc] = useState("about:blank")
    const [toggle, setToggle] = useState(false)

    const getYouTubeId = (url) => {
        // Handle various YouTube URL formats
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)
        return match && match[2].length === 11 ? match[2] : null
    }

    const handelClick = () => {
        try {
            const isYouTubeLink = video_src.includes("youtube.com") || video_src.includes("youtu.be")
            if (isYouTubeLink) {
                const videoId = getYouTubeId(video_src)
                if (videoId) {
                    setIframeSrc(`https://www.youtube.com/embed/${videoId}?autoplay=1`)
                } else {
                    console.error("Invalid YouTube URL")
                    setIframeSrc(video_src)
                }
            } else {
                setIframeSrc(video_src)
            }
            setToggle(true)
        } catch (error) {
            console.error("Error handling video source:", error)
            setToggle(false)
        }
    }

    const handelClose = () => {
        setIframeSrc("about:blank")
        setToggle(false)
    }
    /* End Video Modal */
    const HeroContent = () => (
        <>
            <div className="container">
                <div className="cs_hero_text">
                    {title && (
                        <h1
                            className="cs_hero_title cs_white_color cs_fs_84"
                            dangerouslySetInnerHTML={{
                                __html: title
                            }}
                        />
                    )}
                    <div className="cs_hero_text_in">
                        {(action_text || action_url) && (
                            <div className="cs_hero_btn cs_white_color">
                                <NavigationLink href={action_url} className="cs_text_btn">
                                    {action_text}
                                </NavigationLink>
                            </div>
                        )}
                        {sub_title && (
                            <p
                                className="cs_hero_subtitle cs_white_color"
                                dangerouslySetInnerHTML={{
                                    __html: sub_title
                                }}
                            />
                        )}
                    </div>
                </div>
                {image_url && <img src={image_url} alt="Hero" className="cs_hero_patents" />}
            </div>
            <div className="container">
                <div className="cs_hero_bottom">
                    <div className="cs_hero_bottom_left">
                        <div className="cs_hero_btn_wrap">
                            <button
                                className="cs_white_color cs_text_btn_2 cs_fs_20"
                                onClick={handelClick}
                                type="button"
                                aria-label="Open video modal"
                            >
                                {(video_src || video_btn_text) && (
                                    <span className="cs_text_btn_icon">
                                        <svg
                                            width={50}
                                            height={50}
                                            viewBox="0 0 50 50"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M42.739 7.26089C32.8938 -2.48797 17.0097 -2.40994 7.26088 7.43526C-2.42029 17.2121 -2.42029 32.9623 7.26088 42.7392C17.1061 52.488 32.9902 52.41 42.739 42.5648C52.4202 32.788 52.4202 17.0377 42.739 7.26089ZM25 48.0713C12.2783 48.0713 1.92868 37.7217 1.92868 25C1.92868 12.2782 12.2782 1.9288 25 1.9288C37.7217 1.9288 48.0712 12.2784 48.0712 25.0001C48.0712 37.7218 37.7216 48.0713 25 48.0713Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M38.5996 24.1265V24.1277L18.2308 12.368C17.7487 12.0897 17.1322 12.2548 16.8539 12.737C16.7655 12.8901 16.7189 13.0637 16.7189 13.2405V36.7598C16.7191 37.3164 17.1707 37.7676 17.7273 37.7672C17.9041 37.7671 18.0778 37.7206 18.2309 37.6322L38.5997 25.8725C39.0819 25.5943 39.2471 24.9778 38.9689 24.4956C38.8803 24.3423 38.753 24.215 38.5996 24.1265Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                )}

                                {video_btn_text && <span className="cs_text_btn_text">{video_btn_text}</span>}
                            </button>
                        </div>
                    </div>
                    <div className="cs_hero_bottom_right">
                        <div className="cs_hero_funfact text-center">
                            {funfact_list?.map((item, index) => (
                                <div className="cs_hero_funfact_col" key={index}>
                                    <h3
                                        className="cs_white_color cs_fs_72"
                                        dangerouslySetInnerHTML={{
                                            __html: item.funfact_value
                                        }}
                                    />
                                    <p
                                        className="cs_white_color mb-0"
                                        dangerouslySetInnerHTML={{
                                            __html: item.funfact_title
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
    return (
        <>
            {is_water_wave ? (
                <WaterWave className="cs_hero cs_style_2 cs_bg_filed" style={{ backgroundImage: `url(${background_image_url})` }}>
                    {() => HeroContent()}
                </WaterWave>
            ) : (
                <div className="cs_hero cs_style_2 cs_bg_filed" style={{ backgroundImage: `url(${background_image_url})` }}>
                    {HeroContent()}
                    {!is_water_wave && youtube_id && (
                        <YoutubeBackground videoId={youtube_id} className="cs_video_bg"></YoutubeBackground>
                    )}
                </div>
            )}
            <div className={toggle ? "cs_video_popup active" : "cs_video_popup"}>
                <div className="cs_video_popup_overlay" onClick={handelClose} />
                <div className="cs_video_popup_content">
                    <div className="cs_video_popup_layer" />
                    <div className="cs_video_popup_container">
                        <div className="cs_video_popup_align">
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe
                                    className="embed-responsive-item"
                                    src={iframeSrc}
                                    title="video modal"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                        <button className="cs_video_popup_close" onClick={handelClose} aria-label="Close video modal" />
                    </div>
                </div>
            </div>
        </>
    )
}
