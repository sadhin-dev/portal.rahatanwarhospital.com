import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { useForm, Head } from "@inertiajs/react"
import FromValidationError from "@/Admin/Components/Validation/FromValidationError"
import translate from "@/utils/translate"
import { produce } from "immer"

export default function CommonSettings({ get_common_settings }) {
    const { data, setData, errors, put, processing } = useForm(get_common_settings)

    // update payment gateway configure
    const handlePublish = (e) => {
        e.preventDefault()
        put(route("admin.settings.common.settings.update"))
    }

    return (
        <AdminLayouts>
            <Head title="Common Setting" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Common Setting")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Common Settings Details")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="form-group form-group-md">
                                        <label htmlFor="form_response_to">{translate("Form Response To")} *</label>
                                        <div className="yoo-select">
                                            <select
                                                className="form-control"
                                                id="form_response_to"
                                                onChange={(e) => setData("form_response_to", e.target.value)}
                                                value={data.form_response_to}
                                            >
                                                <option value="">{translate("Select Form Response To")}</option>
                                                <option value="email_only">{translate("Email Only")}</option>
                                                <option value="database_only">{translate("Database Only")}</option>
                                                <option value="both">{translate("Both")}</option>
                                            </select>
                                            <FromValidationError message={errors.form_response_to} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label
                                            htmlFor=""
                                            style={{
                                                display: "flex",
                                                gap: "10px"
                                            }}
                                        >
                                            {translate("Allow Guest Checkout")}:{" "}
                                            <div
                                                className={`yoo-switch ${data.is_allow_guest_checkout === "1" ? "active" : ""}`}
                                                onClick={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.is_allow_guest_checkout =
                                                                draft.is_allow_guest_checkout === "0" ? "1" : "0"
                                                        })
                                                    )
                                                }
                                            >
                                                <div className="yoo-switch-in" />
                                            </div>
                                        </label>
                                    </div>

                                    <div className="form-group">
                                        <label
                                            htmlFor=""
                                            style={{
                                                display: "flex",
                                                gap: "10px"
                                            }}
                                        >
                                            {translate("Enable eCommerce")}:{" "}
                                            <div
                                                className={`yoo-switch ${data.is_enabled_ecommerce === "1" ? "active" : ""}`}
                                                onClick={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.is_enabled_ecommerce = draft.is_enabled_ecommerce === "0" ? "1" : "0"
                                                        })
                                                    )
                                                }
                                            >
                                                <div className="yoo-switch-in" />
                                            </div>
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label
                                            htmlFor=""
                                            style={{
                                                display: "flex",
                                                gap: "10px"
                                            }}
                                        >
                                            {translate("Enable Doctors")}:{" "}
                                            <div
                                                className={`yoo-switch ${data.is_enabled_doctors === "1" ? "active" : ""}`}
                                                onClick={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.is_enabled_doctors = draft.is_enabled_doctors === "0" ? "1" : "0"
                                                        })
                                                    )
                                                }
                                            >
                                                <div className="yoo-switch-in" />
                                            </div>
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label
                                            htmlFor=""
                                            style={{
                                                display: "flex",
                                                gap: "10px"
                                            }}
                                        >
                                            {translate("Enable Departments")}:{" "}
                                            <div
                                                className={`yoo-switch ${data.is_enabled_departments === "1" ? "active" : ""}`}
                                                onClick={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.is_enabled_departments = draft.is_enabled_departments === "0" ? "1" : "0"
                                                        })
                                                    )
                                                }
                                            >
                                                <div className="yoo-switch-in" />
                                            </div>
                                        </label>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div>
                                        <button type="submit" className="btn btn-success" disabled={processing}>
                                            {translate("Update")}
                                        </button>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                        <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    </div>
                </form>
            </div>
        </AdminLayouts>
    )
}
