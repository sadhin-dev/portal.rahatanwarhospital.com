import AuthLayout from "@/Frontend/Layouts/AuthLayout"
import { Icon } from "@iconify/react"
import { Head, Link, useForm } from "@inertiajs/react"
import translate from "@/utils/translate"
import { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import ProhealthMeta from "@/utils/ProhealthMeta"

export default function Register({
    terms_condition_url,
    is_facebook_login_active,
    is_google_login_active,
    meta_tags,
    tagline,
    site_name,
    flash
}) {
    const captchaSiteKey = localStorage.getItem("google_captcha_site_key")
        ? JSON.parse(localStorage.getItem("google_captcha_site_key"))
        : []
    const is_active_google_captcha = localStorage.getItem("is_active_google_captcha")
        ? JSON.parse(localStorage.getItem("is_active_google_captcha"))
        : []
    const [captchaVerified, setCaptchaVerified] = useState(false)
    const [captchaError, setCaptchaError] = useState(null)

    const { data, setData, errors, post, processing } = useForm({
        name: "",
        email: "",
        about: "",
        password: "",
        password_confirmation: "",
        agreed: false
    })

    ProhealthMeta(tagline, "", meta_tags, "", "", site_name)

    const handleCaptchaChange = (value) => {
        if (is_active_google_captcha === "1") {
            if (value) {
                setData("captchaToken", value)
                setCaptchaVerified(true)
                setCaptchaError(null)
            } else {
                setCaptchaVerified(false)
            }
        }
    }

    // handle login
    const handleSignUp = (e) => {
        e.preventDefault()

        if (!captchaVerified && is_active_google_captcha === "1") {
            setCaptchaError(translate("Please complete the captcha verification"))
            return
        }

        post(route("register"))
    }

    return (
        <AuthLayout>
            <div className="cs_card_card_in">
                <Head title="Register" />
                <h1 className="cs_card_title cs_mb_30">{translate("Create your account")}</h1>
                {flash?.error && (
                    <div class="alert alert-danger" role="alert">
                        {flash?.error}
                    </div>
                )}
                <form onSubmit={handleSignUp} className="">
                    <div className="cs_mb_15">
                        <label htmlFor="name">{translate("Name")}*</label>
                        <input
                            id="name"
                            type="text"
                            className="cs_form_field"
                            onChange={(e) => setData("name", e.target.value)}
                            value={data?.name}
                        />
                        <span style={{ color: "red" }}>{errors.name}</span>
                    </div>
                    <div className="cs_mb_15">
                        <label htmlFor="email">{translate("Email")}*</label>
                        <input
                            id="email"
                            type="text"
                            className="cs_form_field"
                            onChange={(e) => setData("email", e.target.value)}
                            value={data?.email}
                        />
                        <span style={{ color: "red" }}>{errors.email}</span>
                    </div>
                    <div className="cs_mb_15">
                        <label htmlFor="about">{translate("About")}*</label>
                        <input
                            id="about"
                            type="text"
                            className="cs_form_field"
                            onChange={(e) => setData("about", e.target.value)}
                            value={data?.about}
                        />
                        <span style={{ color: "red" }}>{errors.about}</span>
                    </div>
                    <div className="cs_mb_15">
                        <label htmlFor="password">{translate("Password")}*</label>
                        <input
                            id="password"
                            type="password"
                            className="cs_form_field"
                            onChange={(e) => setData("password", e.target.value)}
                        />
                        <span style={{ color: "red" }}>{errors.password}</span>
                    </div>
                    <div className="cs_mb_15">
                        <label htmlFor="password_confirmation">{translate("Confirm Password")}*</label>
                        <input
                            id="password_confirmation"
                            type="password"
                            className="cs_form_field"
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                        />
                        <span style={{ color: "red" }}>{errors.password_confirmation}</span>
                    </div>
                    {is_active_google_captcha === "1" && (
                        <div className="cs_mb_15">
                            <ReCAPTCHA sitekey={captchaSiteKey} onChange={handleCaptchaChange} />
                            {captchaError && <div className="text-danger mb-3">{captchaError}</div>}
                        </div>
                    )}
                    <div className="cs_mb_15">
                        <div className="cs_custom_checkbox">
                            <input
                                className="cs_custom_checkbox_input"
                                type="checkbox"
                                id="gridCheck"
                                checked={data.agreed}
                                onChange={(e) => setData("agreed", e.target.checked)}
                            />
                            <label htmlFor="gridCheck" className="cs_custom_checkbox_label">
                                <Link href={terms_condition_url}>{translate("Accept Terms And Conditions")}</Link>
                            </label>
                        </div>
                        <br />
                        {errors.agreed && <span style={{ color: "red" }}>{errors.agreed}</span>}
                    </div>
                    <div className="cs_mb_20">
                        <button type="submit" disabled={!captchaVerified && processing} className="cs_btn cs_style_1 w-100">
                            <span>{translate("Register")}</span>
                            <i>
                                <svg width="35" height="24" viewBox="0 0 35 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M34.5342 13.0789L23.3977 23.5789C23.0977 23.8522 22.6958 24.0034 22.2787 23.9999C21.8615 23.9965 21.4625 23.8388 21.1675 23.5607C20.8726 23.2825 20.7053 22.9063 20.7016 22.513C20.698 22.1197 20.8584 21.7408 21.1482 21.4579L29.5689 13.5184H1.59092C1.16899 13.5184 0.764327 13.3604 0.465971 13.0791C0.167615 12.7978 0 12.4163 0 12.0184C0 11.6206 0.167615 11.2391 0.465971 10.9578C0.764327 10.6765 1.16899 10.5184 1.59092 10.5184H29.5689L21.1482 2.57893C20.9962 2.44056 20.875 2.27505 20.7916 2.09204C20.7083 1.90903 20.6644 1.7122 20.6625 1.51303C20.6607 1.31386 20.7009 1.11635 20.7809 0.932003C20.8609 0.747658 20.9791 0.580179 21.1284 0.439341C21.2778 0.298502 21.4554 0.18712 21.651 0.111698C21.8465 0.0362778 22.056 -0.00167465 22.2672 5.53131e-05C22.4785 0.00178719 22.6872 0.0431671 22.8813 0.12178C23.0754 0.200394 23.251 0.314665 23.3977 0.457932L34.5342 10.9579C34.8325 11.2392 35 11.6207 35 12.0184C35 12.4162 34.8325 12.7976 34.5342 13.0789Z"
                                        fill="white"
                                    />
                                </svg>
                                <svg width="35" height="24" viewBox="0 0 35 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M34.5342 13.0789L23.3977 23.5789C23.0977 23.8522 22.6958 24.0034 22.2787 23.9999C21.8615 23.9965 21.4625 23.8388 21.1675 23.5607C20.8726 23.2825 20.7053 22.9063 20.7016 22.513C20.698 22.1197 20.8584 21.7408 21.1482 21.4579L29.5689 13.5184H1.59092C1.16899 13.5184 0.764327 13.3604 0.465971 13.0791C0.167615 12.7978 0 12.4163 0 12.0184C0 11.6206 0.167615 11.2391 0.465971 10.9578C0.764327 10.6765 1.16899 10.5184 1.59092 10.5184H29.5689L21.1482 2.57893C20.9962 2.44056 20.875 2.27505 20.7916 2.09204C20.7083 1.90903 20.6644 1.7122 20.6625 1.51303C20.6607 1.31386 20.7009 1.11635 20.7809 0.932003C20.8609 0.747658 20.9791 0.580179 21.1284 0.439341C21.2778 0.298502 21.4554 0.18712 21.651 0.111698C21.8465 0.0362778 22.056 -0.00167465 22.2672 5.53131e-05C22.4785 0.00178719 22.6872 0.0431671 22.8813 0.12178C23.0754 0.200394 23.251 0.314665 23.3977 0.457932L34.5342 10.9579C34.8325 11.2392 35 11.6207 35 12.0184C35 12.4162 34.8325 12.7976 34.5342 13.0789Z"
                                        fill="white"
                                    />
                                </svg>
                            </i>
                        </button>
                    </div>
                    <p className="cs_mb_20 cs_or_login">
                        {(is_facebook_login_active || is_google_login_active) && <span>{translate("Or login with")}</span>}
                    </p>
                    <div className="cs_social_btns cs_mb_20">
                        {is_facebook_login_active && (
                            <a href={route("social.redirect", "facebook")} className="cs_social_btn cs_social_btn_facebook">
                                <Icon style={{ fontSize: "22px" }} icon="logos:facebook" />
                                {translate("Login With Facebook")}
                            </a>
                        )}
                        {is_google_login_active && (
                            <a href={route("social.redirect", "google")} className="cs_social_btn cs_social_btn_google">
                                <Icon style={{ fontSize: "22px" }} icon="logos:google-icon" />
                                {translate("Login With Google")}
                            </a>
                        )}
                    </div>
                    <p className="mb-0 cs_heading_color">
                        {translate("Already have an account")}?{" "}
                        <Link href={route("login.create")} className="cs_card_text_btn">
                            {translate("Sign In Now")}
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}
