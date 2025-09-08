import { router } from "@inertiajs/react"
import React, { useState } from "react"
import translate from "@/utils/translate"

export default function GlobalSearch() {
    const [toggle, setToggle] = useState("")
    const [searchQuery, setSearchQuery] = useState("")

    // Handle search submission
    const getResults = (query) => {
        router.get(route("search.name"), { search: query }, { preserveState: true })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        getResults(searchQuery)
    }

    return (
        <>
            <button className="cs_toolbox_btn cs_search_toggle_btn" type="button" onClick={() => setToggle(!toggle)}>
                <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13.1684 0C5.91146 0 0 5.90944 0 13.164C0 20.4184 5.91146 26.3394 13.1684 26.3394C16.2681 26.3394 19.1188 25.2535 21.3719 23.4505L26.8571 28.931C27.1339 29.1962 27.5036 29.3426 27.887 29.3386C28.2704 29.3347 28.6371 29.1809 28.9084 28.91C29.1797 28.6392 29.3342 28.2729 29.3386 27.8896C29.3431 27.5064 29.1972 27.1365 28.9322 26.8595L23.4471 21.3762C25.2521 19.1204 26.3397 16.2662 26.3397 13.164C26.3397 5.90944 20.4254 0 13.1684 0ZM13.1684 2.926C18.8435 2.926 23.4099 7.49078 23.4099 13.164C23.4099 18.8371 18.8435 23.4134 13.1684 23.4134C7.4933 23.4134 2.92695 18.8371 2.92695 13.164C2.92695 7.49078 7.4933 2.926 13.1684 2.926Z"
                        fill="currentColor"
                    />
                </svg>
            </button>
            <div className={`cs_header_search ${toggle ? "active" : ""}`}>
                <div className="cs_header_search_in">
                    <div className="container">
                        <div className="cs_header_search_box">
                            <form onSubmit={handleSubmit} className="cs_search_form">
                                <input
                                    type="text"
                                    placeholder={translate("Search Doctors or Departments...")}
                                    className="cs_header_search_field"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="cs_search_btn">
                                    <svg
                                        width={18}
                                        height={18}
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8.07914 0C3.62682 0 0 3.62558 0 8.07641C0 12.5272 3.62682 16.1599 8.07914 16.1599C9.98086 16.1599 11.7299 15.4936 13.1122 14.3875L16.4775 17.7498C16.6473 17.9126 16.8741 18.0024 17.1094 18C17.3446 17.9975 17.5695 17.9032 17.736 17.737C17.9025 17.5708 17.9972 17.3461 17.9999 17.111C18.0027 16.8758 17.9132 16.6489 17.7506 16.4789L14.3853 13.1148C15.4928 11.7308 16.16 9.97968 16.16 8.07641C16.16 3.62558 12.5315 0 8.07914 0ZM8.07914 1.79517C11.561 1.79517 14.3625 4.59577 14.3625 8.07641C14.3625 11.557 11.561 14.3647 8.07914 14.3647C4.59732 14.3647 1.79575 11.557 1.79575 8.07641C1.79575 4.59577 4.59732 1.79517 8.07914 1.79517Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </button>
                            </form>
                            <button className="cs_close" type="button" onClick={() => setToggle(false)}>
                                <svg width={28} height={28} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.743 1.74333C2.70601 0.780314 3.95464 0.468314 4.53233 1.046L26.8469 23.3606C27.4246 23.9383 27.1126 25.1869 26.1496 26.1499C25.1868 27.1127 23.9379 27.4249 23.3603 26.8472L1.04567 4.53265C0.467986 3.95497 0.780218 2.70611 1.743 1.74333Z"
                                        fill="#274760"
                                    />
                                    <path
                                        d="M1.74333 26.1499C0.780314 25.1869 0.468314 23.9383 1.046 23.3606L23.3606 1.04599C23.9383 0.468325 25.1869 0.780311 26.1499 1.74333C27.1127 2.70611 27.4249 3.95498 26.8472 4.53265L4.53265 26.8472C3.95497 27.4249 2.70611 27.1127 1.74333 26.1499Z"
                                        fill="#274760"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="cs_sidenav_overlay" onClick={() => setToggle(false)}></div>
            </div>
        </>
    )
}
