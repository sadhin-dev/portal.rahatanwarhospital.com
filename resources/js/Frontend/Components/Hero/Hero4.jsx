import NavigationLink from "@/Components/NavigationLink"
import TextSlider from "../TextSlider"
import WaterWave from "react-water-wave"
import YoutubeBackground from "react-youtube-background"

export default function Hero4({ data }) {
    const { title, text_slider, sub_title, action_text, action_url, image_url, funfact_list, is_water_wave, youtube_id } = data

    const HeroContent = () => (
        <>
            <div className="container">
                <div className="cs_hero_text">
                    <h1 className="cs_hero_title cs_white_color cs_fs_84">
                        {title} <TextSlider words={text_slider} animationType="slide" />
                    </h1>
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
            </div>
            {image_url && (
                <div className="cs_hero_img">
                    <img src={image_url} alt="Hero" />
                </div>
            )}
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
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
                <WaterWave className="cs_hero cs_style_2 cs_type_1">{() => HeroContent()}</WaterWave>
            ) : (
                <div className="cs_hero cs_style_2 cs_type_1">
                    {HeroContent()}
                    {!is_water_wave && youtube_id && (
                        <YoutubeBackground videoId={youtube_id} className="cs_video_bg"></YoutubeBackground>
                    )}
                </div>
            )}
        </>
    )
}
