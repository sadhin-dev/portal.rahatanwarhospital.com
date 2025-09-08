import React from "react"
import { useForm, usePage } from "@inertiajs/react"
import { useSelector } from "react-redux"
import translate from "@/utils/translate"

export default function Newsletter({ placeholder, inputFormClass, btnText }) {
    const { flash } = usePage().props
    const subscriber = useSelector((state) => state.customize.subscriber)
    const { errors, data, setData, post, processing, wasSuccessful, reset } = useForm({
        email: ""
    })

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault()
        post(route("subscribe"), {
            preserveScroll: true,
            onSuccess: () => {
                reset("email")
            }
        })
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="cs_newsletter_form">
                <input
                    type="email"
                    onChange={(e) => setData("email", e.target.value)}
                    value={data.email}
                    className={inputFormClass}
                    placeholder={placeholder}
                />
                <button disabled={processing} className="cs_btn cs_style_1">
                    <span>{btnText}</span>
                    <i>
                        <svg width="35" height="24" viewBox="0 0 35 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M34.5342 13.0789L23.3977 23.5789C23.0977 23.8522 22.6958 24.0034 22.2787 23.9999C21.8615 23.9965 21.4625 23.8388 21.1675 23.5607C20.8726 23.2825 20.7053 22.9063 20.7016 22.513C20.698 22.1197 20.8584 21.7408 21.1482 21.4579L29.5689 13.5184H1.59092C1.16899 13.5184 0.764327 13.3604 0.465971 13.0791C0.167615 12.7978 0 12.4163 0 12.0184C0 11.6206 0.167615 11.2391 0.465971 10.9578C0.764327 10.6765 1.16899 10.5184 1.59092 10.5184H29.5689L21.1482 2.57893C20.9962 2.44056 20.875 2.27505 20.7916 2.09204C20.7083 1.90903 20.6644 1.7122 20.6625 1.51303C20.6607 1.31386 20.7009 1.11635 20.7809 0.932004C20.8609 0.747659 20.9791 0.58018 21.1284 0.439342C21.2778 0.298503 21.4554 0.187121 21.651 0.111699C21.8465 0.0362791 22.056 -0.00167338 22.2672 5.65865e-05C22.4785 0.00178846 22.6872 0.0431684 22.8813 0.121781C23.0754 0.200395 23.251 0.314666 23.3977 0.457933L34.5342 10.9579C34.8325 11.2392 35 11.6207 35 12.0184C35 12.4162 34.8325 12.7976 34.5342 13.0789Z"
                                fill="currentColor"
                            />
                        </svg>
                        <svg width="35" height="24" viewBox="0 0 35 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M34.5342 13.0789L23.3977 23.5789C23.0977 23.8522 22.6958 24.0034 22.2787 23.9999C21.8615 23.9965 21.4625 23.8388 21.1675 23.5607C20.8726 23.2825 20.7053 22.9063 20.7016 22.513C20.698 22.1197 20.8584 21.7408 21.1482 21.4579L29.5689 13.5184H1.59092C1.16899 13.5184 0.764327 13.3604 0.465971 13.0791C0.167615 12.7978 0 12.4163 0 12.0184C0 11.6206 0.167615 11.2391 0.465971 10.9578C0.764327 10.6765 1.16899 10.5184 1.59092 10.5184H29.5689L21.1482 2.57893C20.9962 2.44056 20.875 2.27505 20.7916 2.09204C20.7083 1.90903 20.6644 1.7122 20.6625 1.51303C20.6607 1.31386 20.7009 1.11635 20.7809 0.932004C20.8609 0.747659 20.9791 0.58018 21.1284 0.439342C21.2778 0.298503 21.4554 0.187121 21.651 0.111699C21.8465 0.0362791 22.056 -0.00167338 22.2672 5.65865e-05C22.4785 0.00178846 22.6872 0.0431684 22.8813 0.121781C23.0754 0.200395 23.251 0.314666 23.3977 0.457933L34.5342 10.9579C34.8325 11.2392 35 11.6207 35 12.0184C35 12.4162 34.8325 12.7976 34.5342 13.0789Z"
                                fill="currentColor"
                            />
                        </svg>
                    </i>
                </button>
            </form>
            {errors.email && <span className="text-danger">{errors.email}</span>}
            {wasSuccessful && <span className="text-success">{flash.success}</span>}
        </>
    )
}
