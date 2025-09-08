import React, { useEffect, useRef } from "react"
import { useForm, usePage } from "@inertiajs/react"
import { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import DatePicker from "react-datepicker"

export default function AppointmentWithFormBuilder4({ sections_data }) {
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
    const [startDate, setStartDate] = useState(new Date())
    const [radioSelections, setRadioSelections] = useState({})
    const [checkboxSelections, setCheckboxSelections] = useState({})

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

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!captchaVerified && is_active_google_captcha === "1") {
            setCaptchaError(translate("Please complete the captcha verification"))
            return
        }

        post(route("form.submit"), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                formRef.current.reset()
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
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-7">
                        {sections_data.section_title && (
                            <>
                                <h2
                                    className="cs_fs_40 cs_medium mb-0"
                                    dangerouslySetInnerHTML={{
                                        __html: sections_data.section_title
                                    }}
                                />
                                <div className="cs_height_42 cs_height_lg_25"></div>
                            </>
                        )}
                        <form ref={formRef} className="row" onSubmit={handleSubmit}>
                            {sections_data?.forms?.map((form, index) => (
                                <>
                                    {form.fieldType === "multilineText" ? (
                                        <>
                                            <div className={`col-lg-${form.column ?? "6"}`}>
                                                {form.label && (
                                                    <label className="cs_input_label cs_heading_color">
                                                        {form.label} {form.isRequired && <span>*</span>}
                                                    </label>
                                                )}
                                                <textarea
                                                    cols="30"
                                                    rows="7"
                                                    defaultValue={form.default_value}
                                                    required={form.isRequired}
                                                    onChange={(e) => handleSetData(e, form.label, form.placeholder)}
                                                    placeholder={`${form.placeholder ? form.placeholder : ""}${
                                                        form.label ? "" : form.isRequired ? " *" : ""
                                                    }`}
                                                    className="cs_form_field"
                                                />
                                                <div className="cs_height_42 cs_height_lg_25"></div>
                                            </div>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                    {form.fieldType === "select" ? (
                                        <div className={`col-lg-${form.column ?? "6"}`}>
                                            {form.label && (
                                                <label className="cs_input_label cs_heading_color">
                                                    {form.label} {form.isRequired && <span>*</span>}
                                                </label>
                                            )}
                                            <select
                                                required={form.isRequired}
                                                onChange={(e) => handleSetData(e, form.label, form.placeholder)}
                                                className="cs_form_field"
                                            >
                                                <option value="">Select an option</option>
                                                {form?.select_options?.map((option, index) => (
                                                    <option value={option} key={`options-${index}`}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="cs_height_42 cs_height_lg_25"></div>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    {form.fieldType === "date" ? (
                                        <div className={`col-lg-${form.column ?? "6"}`}>
                                            {form.fieldType !== "hidden" && (
                                                <>
                                                    {form.label && (
                                                        <label className="cs_input_label cs_heading_color d-block">
                                                            {form.label} {form.isRequired && <span>*</span>}
                                                        </label>
                                                    )}
                                                </>
                                            )}
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) => {
                                                    setStartDate(date)
                                                    const dateString = date ? date.toISOString() : ""
                                                    handleSetData({ target: { value: dateString } }, form.label, form.placeholder)
                                                }}
                                                minDate={new Date()}
                                                required={form.isRequired}
                                                dateFormat="MMMM d, yyyy"
                                                placeholderText={`${form.placeholder ? form.placeholder : ""}${
                                                    form.label ? "" : form.isRequired ? " *" : ""
                                                }`}
                                            />
                                            <div className="cs_height_42 cs_height_lg_25"></div>
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                    {form.fieldType === "radio" ? (
                                        <div className={`col-lg-${form.column ?? "6"}`}>
                                            {form.label && (
                                                <label className="cs_input_label cs_heading_color">
                                                    {form.label} {form.isRequired && <span>*</span>}
                                                </label>
                                            )}
                                            <div className="cs_radio_group">
                                                {form?.radio_options?.map((option, i) => {
                                                    const fieldName = form.label
                                                        ? form.label.toLowerCase().replace(/\s+/g, "_")
                                                        : `radio_${index}`

                                                    return (
                                                        <div key={i} className="cs_radio_wrap">
                                                            <input
                                                                className="cs_radio_input"
                                                                type="radio"
                                                                name={`radio_${index}`}
                                                                id={`radio_${index}_${i}`}
                                                                value={option}
                                                                required={form.isRequired}
                                                                checked={
                                                                    radioSelections[fieldName] === option ||
                                                                    (!radioSelections[fieldName] &&
                                                                        option === form.radio_default_checked)
                                                                }
                                                                onChange={(e) => {
                                                                    setRadioSelections((prev) => ({
                                                                        ...prev,
                                                                        [fieldName]: e.target.value
                                                                    }))
                                                                    setData(fieldName, e.target.value)
                                                                }}
                                                            />
                                                            <label className="cs_radio_label" htmlFor={`radio_${index}_${i}`}>
                                                                {option}
                                                            </label>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className="cs_height_42 cs_height_lg_25"></div>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    {form.fieldType === "checkbox" ? (
                                        <div className={`col-lg-${form.column ?? "6"}`}>
                                            {form.label && (
                                                <label className="cs_input_label cs_heading_color">
                                                    {form.label} {form.isRequired && <span>*</span>}
                                                </label>
                                            )}
                                            <div className="cs_checkbox_group">
                                                {form?.checkbox_options?.map((option, i) => {
                                                    const fieldName = form.label
                                                        ? form.label.toLowerCase().replace(/\s+/g, "_")
                                                        : `checkbox_${index}`

                                                    return (
                                                        <div key={i} className="cs_checkbox_wrap">
                                                            <input
                                                                className="cs_checkbox_input"
                                                                type="checkbox"
                                                                name={`${fieldName}[]`}
                                                                id={`checkbox_${index}_${i}`}
                                                                value={option}
                                                                checked={checkboxSelections[fieldName]?.includes(option) || false}
                                                                onChange={(e) => {
                                                                    const isChecked = e.target.checked
                                                                    setCheckboxSelections((prev) => {
                                                                        const currentValues = prev[fieldName] || []
                                                                        const newValues = isChecked
                                                                            ? [...currentValues, option]
                                                                            : currentValues.filter((val) => val !== option)

                                                                        return {
                                                                            ...prev,
                                                                            [fieldName]: newValues
                                                                        }
                                                                    })
                                                                    setData(fieldName, checkboxSelections[fieldName] || [])
                                                                }}
                                                            />
                                                            <label
                                                                className="cs_checkbox_label"
                                                                htmlFor={`checkbox_${index}_${i}`}
                                                            >
                                                                {option}
                                                            </label>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className="cs_height_42 cs_height_lg_25"></div>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    {!(
                                        form.fieldType === "multilineText" ||
                                        form.fieldType === "select" ||
                                        form.fieldType === "date" ||
                                        form.fieldType === "checkbox" ||
                                        form.fieldType === "radio"
                                    ) ? (
                                        <div className={`col-lg-${form.column ?? "6"}`}>
                                            {form.fieldType !== "hidden" && (
                                                <>
                                                    {form.label && (
                                                        <label className="cs_input_label cs_heading_color">
                                                            {form.label} {form.isRequired && <span>*</span>}
                                                        </label>
                                                    )}
                                                </>
                                            )}
                                            <input
                                                type={form.fieldType}
                                                defaultValue={form.default_value}
                                                required={form.isRequired}
                                                onChange={(e) => handleSetData(e, form.label, form.placeholder)}
                                                placeholder={`${form.placeholder ? form.placeholder : ""}${
                                                    form.label ? "" : form.isRequired ? " *" : ""
                                                }`}
                                                className="cs_form_field"
                                            />
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </>
                            ))}
                            {is_active_google_captcha === "1" && (
                                <div className="cs_mb_15">
                                    <ReCAPTCHA sitekey={captchaSiteKey} onChange={handleCaptchaChange} />
                                    {captchaError && <div className="text-danger mb-3">{captchaError}</div>}
                                </div>
                            )}
                            {sections_data?.submit_btn_text && (
                                <div className="col-lg-12">
                                    <button disabled={!captchaVerified && processing} className="cs_btn cs_style_1">
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
                        </form>
                    </div>
                    <div className="col-lg-4 offset-lg-1">
                        <div className="cs_height_lg_80" />
                        {sections_data.contact_info_title && (
                            <>
                                <h2
                                    className="cs_fs_40 cs_medium mb-0"
                                    dangerouslySetInnerHTML={{
                                        __html: sections_data.contact_info_title
                                    }}
                                />
                                <div className="cs_height_60 cs_height_lg_40"></div>
                            </>
                        )}
                        {sections_data.image_url && (
                            <>
                                <img src={sections_data.image_url} alt="Appointment" className="cs_radius_25 w-100" />
                                <div className="cs_height_100 cs_height_lg_60" />
                            </>
                        )}
                        <ul className="cs_contact_info cs_style_1 cs_mp0">
                            {sections_data.contact_list?.map((item, index) => (
                                <li key={index}>
                                    {item.contact_title && (
                                        <h3
                                            className="cs_fs_24 cs_semibold mb-0"
                                            dangerouslySetInnerHTML={{
                                                __html: item.contact_title
                                            }}
                                        />
                                    )}
                                    {item.contact_info && (
                                        <p
                                            className="mb-0 cs_heading_color"
                                            dangerouslySetInnerHTML={{
                                                __html: item.contact_info
                                            }}
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
