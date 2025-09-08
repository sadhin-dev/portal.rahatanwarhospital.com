import FrontendLayout from "@/Frontend/Layouts/FrontendLayout"
import PageHeading from "@/Frontend/Components/PageHeading"
import React from "react"
import { Link, useForm } from "@inertiajs/react"
import { produce } from "immer"
import translate from "@/utils/translate"
import { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import ProhealthMeta from "@/utils/ProhealthMeta"
import { Icon } from "@iconify/react"

export default function Show({ pricing_plan, flash, payment_gateway, meta_tags, tagline, site_name, terms_condition_url }) {
    const captchaSiteKey = localStorage.getItem("google_captcha_site_key")
        ? JSON.parse(localStorage.getItem("google_captcha_site_key"))
        : []
    const is_active_google_captcha = localStorage.getItem("is_active_google_captcha")
        ? JSON.parse(localStorage.getItem("is_active_google_captcha"))
        : []
    const { breadcrumb_image, is_show_breadcrumb } = JSON.parse(localStorage.getItem("page_settings")) || {}

    const [captchaVerified, setCaptchaVerified] = useState(false)
    const [captchaError, setCaptchaError] = useState(null)
    const { data, setData, errors, post, processing } = useForm({
        name: "",
        email: "",
        mobile: "",
        whatsapp_skype: "",
        payment_method: "",
        note: ""
    })

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

    // handle pay
    const handlePay = () => {
        if (!captchaVerified && is_active_google_captcha === "1") {
            setCaptchaError(translate("Please complete the captcha verification"))
            return
        }

        post(route("pricing.pay", pricing_plan))
    }

    ProhealthMeta(tagline ?? pricing_plan?.content?.name, "", meta_tags, "", "", site_name)

    return (
        <FrontendLayout headerLayout="1" footerLayout="1">
            {is_show_breadcrumb === "1" && (
                <PageHeading
                    data={{
                        title: pricing_plan?.content?.name,
                        breadcrumb: [
                            { label: "Home", url: "/" },
                            {
                                label: "Pricing Plans",
                                url: route("pricing.plan.index")
                            }
                        ]
                    }}
                    bgSrc={breadcrumb_image ? breadcrumb_image : "/static/page_heading.svg"}
                />
            )}
            <div className="cs_height_150 cs_height_lg_80"></div>
            <div className="container">
                <div className="row cs_gap_y_40">
                    <div className="col-xl-4 col-lg-5">
                        <div className="cs_pricing_card cs_style_1 cs_radius_20 overflow-hidden">
                            <div className="cs_pricing_card_head cs_accent_bg cs_white_color">
                                <h3 className="cs_white_color cs_fs_24 cs_semibold">
                                    <span className="cs_accent_bg">{pricing_plan?.content?.name}</span>
                                </h3>
                                <h2 className="cs_white_color mb-0 cs_fs_72 cs_semibold">
                                    {pricing_plan?.currency?.symbol}
                                    {pricing_plan?.price}
                                    <span className="cs_fs_24">{translate(pricing_plan?.content.plan_duration)}</span>
                                </h2>
                            </div>
                            <div className="cs_pricing_card_body">
                                <ul className="cs_pricing_card_feature cs_fs_20 cs_heading_color">
                                    {JSON.parse(pricing_plan?.content?.plan_features).map((feature, index) => (
                                        <li key={index}>
                                            <i className="d-flex">
                                                <Icon icon="fa6-solid:circle-check" width="20" height="20" />
                                            </i>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 offset-xl-1">
                        {!flash.payment_status ? (
                            <div className="row">
                                <div className="col-lg-6">
                                    <label className="cs_input_label cs_heading_color">{translate("Your Name")}*</label>
                                    <input
                                        type="text"
                                        className="cs_form_field"
                                        onChange={(e) =>
                                            setData(
                                                produce((draft) => {
                                                    draft.name = e.target.value
                                                })
                                            )
                                        }
                                    />
                                    {errors.name && <span className="text-danger">{errors.name}</span>}
                                    <div className="cs_height_30 cs_height_lg_20"></div>
                                </div>
                                <div className="col-lg-6">
                                    <label className="cs_input_label cs_heading_color">{translate("Email")}*</label>
                                    <input
                                        type="email"
                                        className="cs_form_field"
                                        onChange={(e) =>
                                            setData(
                                                produce((draft) => {
                                                    draft.email = e.target.value
                                                })
                                            )
                                        }
                                    />
                                    {errors.email && <span className="text-danger">{errors.email}</span>}
                                    <div className="cs_height_30 cs_height_lg_20"></div>
                                </div>
                                <div className="col-lg-6">
                                    <label className="cs_input_label cs_heading_color">{translate("Mobile")}*</label>
                                    <input
                                        type="text"
                                        className="cs_form_field"
                                        onChange={(e) =>
                                            setData(
                                                produce((draft) => {
                                                    draft.mobile = e.target.value
                                                })
                                            )
                                        }
                                    />
                                    {errors.mobile && <span className="text-danger">{errors.mobile}</span>}
                                    <div className="cs_height_30 cs_height_lg_20"></div>
                                </div>
                                <div className="col-lg-6">
                                    <label className="cs_input_label cs_heading_color">
                                        {translate("Whatsapp")}/{translate("Skype")}
                                    </label>
                                    <input
                                        type="text"
                                        className="cs_form_field"
                                        onChange={(e) =>
                                            setData(
                                                produce((draft) => {
                                                    draft.whatsapp_skype = e.target.value
                                                })
                                            )
                                        }
                                    />
                                    {errors.whatsapp_skype && <span className="text-danger">{errors.whatsapp_skype}</span>}
                                    <div className="cs_height_30 cs_height_lg_20"></div>
                                </div>
                                <div className="col-lg-12">
                                    <label className="cs_input_label cs_heading_color">{translate("Note")}</label>
                                    <textarea
                                        cols="20"
                                        className="cs_form_field"
                                        rows="5"
                                        onChange={(e) =>
                                            setData(
                                                produce((draft) => {
                                                    draft.note = e.target.value
                                                })
                                            )
                                        }
                                    ></textarea>
                                    {errors.note && <span className="text-danger">{errors.note}</span>}
                                    <div className="cs_height_30 cs_height_lg_20"></div>
                                </div>
                                <div className="col-lg-12">
                                    <label className="cs_input_label cs_heading_color">
                                        {translate("Select Payment Method")}*
                                    </label>
                                    <div className="cs_radio_group">
                                        {payment_gateway.is_paypal_active && (
                                            <div className="cs_radio_wrap">
                                                <input
                                                    className="cs_radio_input"
                                                    type="radio"
                                                    name="payment_method"
                                                    id="paypal"
                                                    value="paypal"
                                                    onChange={(e) =>
                                                        setData(
                                                            produce((draft) => {
                                                                draft.payment_method = e.target.value
                                                            })
                                                        )
                                                    }
                                                />
                                                <label className="cs_radio_label" htmlFor="paypal">
                                                    {translate("Paypal")}
                                                </label>
                                            </div>
                                        )}
                                        {payment_gateway.is_stripe_active && (
                                            <div className="cs_radio_wrap">
                                                <input
                                                    className="cs_radio_input"
                                                    type="radio"
                                                    name="payment_method"
                                                    id="Stripe"
                                                    value="stripe"
                                                    onChange={(e) =>
                                                        setData(
                                                            produce((draft) => {
                                                                draft.payment_method = e.target.value
                                                            })
                                                        )
                                                    }
                                                />
                                                <label className="cs_radio_label" htmlFor="Stripe">
                                                    {translate("Stripe")}
                                                </label>
                                            </div>
                                        )}
                                        {payment_gateway.is_sslcz_active && (
                                            <div className="cs_radio_wrap">
                                                <input
                                                    className="cs_radio_input"
                                                    type="radio"
                                                    name="payment_method"
                                                    id="sslcmz"
                                                    value="sslcmz"
                                                    onChange={(e) =>
                                                        setData(
                                                            produce((draft) => {
                                                                draft.payment_method = e.target.value
                                                            })
                                                        )
                                                    }
                                                />
                                                <label className="cs_radio_label" htmlFor="sslcmz">
                                                    {translate("Sslcommerz")}
                                                </label>
                                            </div>
                                        )}
                                        {payment_gateway.is_flutterwave_active && (
                                            <div className="cs_radio_wrap">
                                                <input
                                                    className="cs_radio_input"
                                                    type="radio"
                                                    name="payment_method"
                                                    id="flutterwave"
                                                    value="flutterwave"
                                                    onChange={(e) =>
                                                        setData(
                                                            produce((draft) => {
                                                                draft.payment_method = e.target.value
                                                            })
                                                        )
                                                    }
                                                />
                                                <label className="cs_radio_label" htmlFor="flutterwave">
                                                    {translate("Flutterwave")}
                                                </label>
                                            </div>
                                        )}
                                        {payment_gateway.is_razorpay_active && (
                                            <div className="cs_radio_wrap">
                                                <input
                                                    className="cs_radio_input"
                                                    type="radio"
                                                    name="payment_method"
                                                    id="razorpay"
                                                    value="razorpay"
                                                    onChange={(e) =>
                                                        setData(
                                                            produce((draft) => {
                                                                draft.payment_method = e.target.value
                                                            })
                                                        )
                                                    }
                                                />
                                                <label className="cs_radio_label" htmlFor="razorpay">
                                                    {translate("Razorpay")}
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                    {errors.payment_method && <span className="text-danger">{errors.payment_method}</span>}
                                    <div className="cs_height_30 cs_height_lg_20"></div>
                                </div>
                                <div className="col-lg-12">
                                    {is_active_google_captcha === "1" && (
                                        <div className="cs_mb_15">
                                            <ReCAPTCHA sitekey={captchaSiteKey} onChange={handleCaptchaChange} />
                                            {captchaError && <div className="text-danger mb-3">{captchaError}</div>}
                                        </div>
                                    )}
                                    <div className="form-check" style={{ marginBottom: "10px" }}>
                                        <input
                                            className="form-check-input custom-cursor-default-hover"
                                            type="checkbox"
                                            id="agreed"
                                            checked={data.agreed}
                                            onChange={(e) => setData("agreed", e.target.checked)}
                                        />
                                        <label
                                            className="form-check-label cs_semi_bold custom-cursor-default-hover"
                                            htmlFor="agreed"
                                            style={{ marginBottom: "10px" }}
                                        >
                                            <Link href={terms_condition_url}>{translate("Accept Terms And Conditions")}</Link>
                                        </label>
                                    </div>
                                    {errors.agreed && <span style={{ color: "red" }}>{errors.agreed}</span>}
                                </div>
                                <div className="col-sm-12">
                                    <div className="cs_height_10 cs_height_lg_10"></div>
                                    <button
                                        onClick={handlePay}
                                        disabled={!captchaError && processing}
                                        className="cs_btn cs_style_1"
                                    >
                                        <span>{translate("Pay Now")}</span>
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
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    gap: "25px"
                                }}
                            >
                                {flash.payment_status === "success" && (
                                    <>
                                        <div
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                background: "green",
                                                borderRadius: "50%",
                                                color: "#ffffff"
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="icon icon-tabler icon-tabler-check"
                                                width={40}
                                                height={40}
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M5 12l5 5l10 -10" />
                                            </svg>
                                        </div>
                                        <h3>{translate("Payment has been success")}</h3>
                                    </>
                                )}

                                {flash.payment_status === "failed" && (
                                    <>
                                        <div
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                background: "red",
                                                borderRadius: "50%",
                                                color: "#ffffff"
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="icon icon-tabler icon-tabler-x"
                                                width={40}
                                                height={40}
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M18 6l-12 12" />
                                                <path d="M6 6l12 12" />
                                            </svg>
                                        </div>
                                        <h3>{translate("Payment has been failed")}!</h3>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="cs_height_150 cs_height_lg_80"></div>
            </div>
        </FrontendLayout>
    )
}
