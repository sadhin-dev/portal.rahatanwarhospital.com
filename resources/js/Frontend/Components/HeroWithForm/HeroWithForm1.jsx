import React, { useEffect, useRef } from "react"
import { useForm, usePage } from "@inertiajs/react"
import { useState } from "react"
import DatePicker from "react-datepicker"
import ReCAPTCHA from "react-google-recaptcha"

export default function HeroWithForm1({ sections_data }) {
    const captchaSiteKey = localStorage.getItem("google_captcha_site_key")
        ? JSON.parse(localStorage.getItem("google_captcha_site_key"))
        : []
    const is_active_google_captcha = localStorage.getItem("is_active_google_captcha")
        ? JSON.parse(localStorage.getItem("is_active_google_captcha"))
        : []
    const { flash } = usePage().props
    const formRef = useRef(null)
    const { data, setData, errors, post, wasSuccessful, reset, processing } = useForm({})
    const [captchaVerified, setCaptchaVerified] = useState(false)
    const [captchaError, setCaptchaError] = useState(null)
    const [dateValues, setDateValues] = useState({}) // Track dates for each field

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

    const handleSetData = (e, label, placeholder) => {
        let fieldName

        if (label) {
            fieldName = label.toLowerCase().replace(/\s+/g, "_")
        } else if (placeholder) {
            fieldName = placeholder.toLowerCase().replace(/\s+/g, "_")
        } else {
            fieldName = `field_${Object.keys(data).length + 1}`
        }

        setData(fieldName, e.target.value)
    }

    const handleDateChange = (date, label, placeholder) => {
        let fieldName

        if (label) {
            fieldName = label.toLowerCase().replace(/\s+/g, "_")
        } else if (placeholder) {
            fieldName = placeholder.toLowerCase().replace(/\s+/g, "_")
        } else {
            fieldName = `field_${Object.keys(data).length + 1}`
        }

        setDateValues((prev) => ({
            ...prev,
            [fieldName]: date
        }))

        const formattedDate = date ? date.toISOString().split("T")[0] : ""

        setData(fieldName, formattedDate)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!captchaVerified && is_active_google_captcha === "1") {
            setCaptchaError("Please complete the captcha verification")
            return
        }

        post(route("form.submit"), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                formRef.current.reset()
                setDateValues({})
            }
        })
    }

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            response_from: sections_data?.response_form,
            form_name: sections_data?.form_name
        }))
    }, [sections_data])

    return (
        <div className="cs_hero cs_style_4 cs_bg_filed" style={{ backgroundImage: `url(${sections_data.background_image_url})` }}>
            <div className="container">
                <div className="cs_hero_text">
                    <h1
                        className="cs_hero_title cs_white_color cs_fs_84"
                        dangerouslySetInnerHTML={{
                            __html: sections_data.section_title
                        }}
                    />
                    <p
                        className="cs_hero_subtitle cs_white_color cs_fs_20"
                        dangerouslySetInnerHTML={{
                            __html: sections_data.section_subtitle
                        }}
                    />
                </div>
                <form
                    ref={formRef}
                    className="cs_appointment_form cs_style_1 cs_type_1 cs_fs_20 position-relative"
                    onSubmit={handleSubmit}
                >
                    {sections_data?.forms?.map((form, index) => (
                        <div key={`form-field-${index}`}>
                            {form.fieldType === "multilineText" ? (
                                <div className={`col-lg-${form.column ?? "6"}`}>
                                    <div className="cs_appointment_form_field">
                                        {form.icon_url && (
                                            <div className="cs_appointment_form_icon cs_center rounded-circle cs_white_bg">
                                                <img src={form.icon_url} alt="Icon" />
                                            </div>
                                        )}
                                        <div className="cs_appointment_form_field_right">
                                            {form.label && (
                                                <label>
                                                    {form.label} {form.isRequired && "*"}
                                                </label>
                                            )}
                                            <textarea
                                                cols="30"
                                                rows="7"
                                                defaultValue={form.default_value}
                                                required={form.isRequired}
                                                onChange={(e) => handleSetData(e, form.label, form.placeholder)}
                                                placeholder={`${form.placeholder ? form.placeholder : ""}${form.label ? "" : form.isRequired ? " *" : ""
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : form.fieldType === "select" ? (
                                <div className={`col-lg-${form.column ?? "6"}`}>
                                    <div className="cs_appointment_form_field">
                                        {form.icon_url && (
                                            <div className="cs_appointment_form_icon cs_center rounded-circle cs_white_bg">
                                                <img src={form.icon_url} alt="Icon" />
                                            </div>
                                        )}
                                        <div className="cs_appointment_form_field_right">
                                            {form.label && (
                                                <label htmlFor="">
                                                    {form.label} {form.isRequired && "*"}
                                                </label>
                                            )}
                                            <select
                                                required={form.isRequired}
                                                onChange={(e) => handleSetData(e, form.label, form.placeholder)}
                                            >
                                                <option value="">Select an option</option>
                                                {form?.select_options?.map((option, index) => (
                                                    <option value={option} key={`options-${index}`}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ) : form.fieldType === "date" ? (
                                <div className={`col-lg-${form.column ?? "6"}`}>
                                    <div className="cs_appointment_form_field">
                                        {form.icon_url && (
                                            <div className="cs_appointment_form_icon cs_center rounded-circle cs_white_bg">
                                                <img src={form.icon_url} alt="Icon" />
                                            </div>
                                        )}
                                        <div className="cs_appointment_form_field_right">
                                            {form.fieldType !== "hidden" && (
                                                <>
                                                    {form.label && (
                                                        <label>
                                                            {form.label} {form.isRequired && "*"}
                                                        </label>
                                                    )}
                                                </>
                                            )}
                                            <DatePicker
                                                selected={dateValues[form.label?.toLowerCase().replace(/\s+/g, "_")] || null}
                                                onChange={(date) => handleDateChange(date, form.label, form.placeholder)}
                                                minDate={new Date()}
                                                required={form.isRequired}
                                                dateFormat="MMMM d, yyyy"
                                                placeholderText={`${form.placeholder ? form.placeholder : ""}${form.label ? "" : form.isRequired ? " *" : ""
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={`col-lg-${form.column ?? "6"}`}>
                                    <div className="cs_appointment_form_field">
                                        {form.icon_url && (
                                            <div className="cs_appointment_form_icon cs_center rounded-circle cs_white_bg">
                                                <img src={form.icon_url} alt="Icon" />
                                            </div>
                                        )}
                                        <div className="cs_appointment_form_field_right">
                                            {form.fieldType !== "hidden" && (
                                                <>
                                                    {form.label && (
                                                        <label>
                                                            {form.label} {form.isRequired && "*"}
                                                        </label>
                                                    )}
                                                </>
                                            )}
                                            <input
                                                type={form.fieldType}
                                                defaultValue={form.default_value}
                                                required={form.isRequired}
                                                onChange={(e) => handleSetData(e, form.label, form.placeholder)}
                                                placeholder={`${form.placeholder ? form.placeholder : ""}${form.label ? "" : form.isRequired ? " *" : ""
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {is_active_google_captcha === "1" && (
                        <div className="cs_mb_15">
                            <ReCAPTCHA sitekey={captchaSiteKey} onChange={handleCaptchaChange} />
                            {captchaError && <div className="text-danger mb-3">{captchaError}</div>}
                        </div>
                    )}
                    <div className="cs_height_5 cs_height_lg_5"></div>
                    {sections_data?.submit_btn_text && (
                        <div className="col-lg-12">
                            <div className="cs_height_5 cs_height_lg_5"></div>
                            <button disabled={!captchaVerified && processing} className="cs_btn cs_style_1 w-100">
                                <span>{sections_data?.submit_btn_text}</span>
                                <i>
                                    <svg
                                        width="35"
                                        height="24"
                                        viewBox="0 0 35 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M34.5342 13.0789L23.3977 23.5789C23.0977 23.8522 22.6958 24.0034 22.2787 23.9999C21.8615 23.9965 21.4625 23.8388 21.1675 23.5607C20.8726 23.2825 20.7053 22.9063 20.7016 22.513C20.698 22.1197 20.8584 21.7408 21.1482 21.4579L29.5689 13.5184H1.59092C1.16899 13.5184 0.764327 13.3604 0.465971 13.0791C0.167615 12.7978 0 12.4163 0 12.0184C0 11.6206 0.167615 11.2391 0.465971 10.9578C0.764327 10.6765 1.16899 10.5184 1.59092 10.5184H29.5689L21.1482 2.57893C20.9962 2.44056 20.875 2.27505 20.7916 2.09204C20.7083 1.90903 20.6644 1.7122 20.6625 1.51303C20.6607 1.31386 20.7009 1.11635 20.7809 0.932003C20.8609 0.747658 20.9791 0.580179 21.1284 0.439341C21.2778 0.298502 21.4554 0.18712 21.651 0.111698C21.8465 0.0362778 22.056 -0.00167465 22.2672 5.53131e-05C22.4785 0.00178719 22.6872 0.0431671 22.8813 0.12178C23.0754 0.200394 23.251 0.314665 23.3977 0.457932L34.5342 10.9579C34.8325 11.2392 35 11.6207 35 12.0184C35 12.4162 34.8325 12.7976 34.5342 13.0789Z"
                                            fill="white"
                                        />
                                    </svg>
                                    <svg
                                        width="35"
                                        height="24"
                                        viewBox="0 0 35 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M34.5342 13.0789L23.3977 23.5789C23.0977 23.8522 22.6958 24.0034 22.2787 23.9999C21.8615 23.9965 21.4625 23.8388 21.1675 23.5607C20.8726 23.2825 20.7053 22.9063 20.7016 22.513C20.698 22.1197 20.8584 21.7408 21.1482 21.4579L29.5689 13.5184H1.59092C1.16899 13.5184 0.764327 13.3604 0.465971 13.0791C0.167615 12.7978 0 12.4163 0 12.0184C0 11.6206 0.167615 11.2391 0.465971 10.9578C0.764327 10.6765 1.16899 10.5184 1.59092 10.5184H29.5689L21.1482 2.57893C20.9962 2.44056 20.875 2.27505 20.7916 2.09204C20.7083 1.90903 20.6644 1.7122 20.6625 1.51303C20.6607 1.31386 20.7009 1.11635 20.7809 0.932003C20.8609 0.747658 20.9791 0.580179 21.1284 0.439341C21.2778 0.298502 21.4554 0.18712 21.651 0.111698C21.8465 0.0362778 22.056 -0.00167465 22.2672 5.53131e-05C22.4785 0.00178719 22.6872 0.0431671 22.8813 0.12178C23.0754 0.200394 23.251 0.314665 23.3977 0.457932L34.5342 10.9579C34.8325 11.2392 35 11.6207 35 12.0184C35 12.4162 34.8325 12.7976 34.5342 13.0789Z"
                                            fill="white"
                                        />
                                    </svg>
                                </i>
                            </button>
                        </div>
                    )}
                    {wasSuccessful && <span className="text-success mt-2">{flash.success}</span>}
                    <a href="#departments" className="cs_down_btn cs_center rounded-circle">
                        <svg width={23} height={15} viewBox="0 0 23 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M22.9996 1.76428C23.0071 1.42036 22.9085 1.08263 22.7175 0.798044C22.5265 0.513457 22.2525 0.296151 21.9337 0.17634C21.615 0.0565293 21.2674 0.0401662 20.939 0.129525C20.6107 0.218884 20.3181 0.409525 20.1018 0.674944L11.5264 10.8022L2.95408 0.674943C2.8207 0.49134 2.65137 0.337576 2.45653 0.223282C2.26169 0.108988 2.04557 0.0366257 1.82181 0.010726C1.59805 -0.0151737 1.37146 0.00594769 1.15614 0.0727673C0.940819 0.139587 0.741392 0.250665 0.570471 0.399046C0.399549 0.547427 0.260902 0.729914 0.162918 0.935079C0.0649356 1.14024 0.00990291 1.36367 0.00121874 1.59136C-0.00746352 1.81905 0.0302848 2.0461 0.112352 2.25829C0.19442 2.47049 0.318905 2.66325 0.478018 2.82452L10.2836 14.4193C10.4372 14.6014 10.6278 14.7476 10.8427 14.8478C11.0575 14.9481 11.2914 15 11.528 15C11.7646 15 11.9984 14.9481 12.2132 14.8478C12.4281 14.7476 12.6189 14.6014 12.7725 14.4193L22.5875 2.82452C22.8447 2.53162 22.9905 2.15593 22.9996 1.76428Z"
                                fill="currentColor"
                            />
                        </svg>
                    </a>
                </form>
            </div>
            {sections_data.image_url_1 && <img src={sections_data.image_url_1} alt="Hero" className="cs_hero_img_1" />}
            {sections_data.image_url_2 && <img src={sections_data.image_url_2} alt="Hero" className="cs_hero_img_2" />}
            {sections_data.image_url_3 && <img src={sections_data.image_url_3} alt="Hero" className="cs_hero_img_3" />}
        </div>
    )
}
