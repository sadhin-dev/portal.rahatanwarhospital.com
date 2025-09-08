import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Head, Link } from "@inertiajs/react"
import { copyOutline, peopleOutline, search } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import { createOutline, eyeOutline } from "ionicons/icons"
import moment from "moment"
import { useState } from "react"
import { router } from "@inertiajs/react"
import ThSortable from "@/Admin/Components/Table/ThSortable"
import DropDownButton from "@/Admin/Components/Button/DropDownButton"
import { showAlert } from "@/Admin/Utils/SweetAlert.js"
import DeleteButton from "@/Admin/Components/Button/DeleteButton"
import hasPermission from "@/Admin/Utils/hasPermission"
import { useEffect } from "react"
import translate from "@/utils/translate"
import EditSlug from "./EditSlug"

export default function Index({ doctors, sort, filtered_lang, languages }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedLang, setSelectedLang] = useState(filtered_lang)
    const [selectedOption, setSelectedOption] = useState(translate("Bulk Action"))
    const [isMarkAll, setIsMarkAll] = useState(false)
    const [markItems, setMarkItems] = useState([])
    const [isEditModal, setEditModal] = useState(false)
    const [editedData, setEditedData] = useState({})

    // handle search sort
    const getResults = (search, lang) => {
        router.get(
            route("admin.doctors.index", {
                search: search ?? setSearchQuery,
                sort: sort,
                filter: {
                    lang: lang ?? selectedLang
                }
            }),
            {},
            { preserveState: true }
        )
    }

    // mark all
    const markAll = () => {
        if (isMarkAll) {
            setMarkItems([])
            setIsMarkAll(false)
        } else {
            const items = doctors.data.map((doctor) => doctor.id)
            setMarkItems(items)
            setIsMarkAll(true)
        }
    }

    // handle mark unmark
    const handleMark = (doctorId) => {
        const existsMark = markItems.some((item) => item === doctorId)
        if (existsMark) {
            const removeItem = markItems.filter((item) => item !== doctorId)
            setMarkItems(removeItem)
        } else {
            const addedItem = [...markItems, doctorId]
            setMarkItems(addedItem)
        }
    }

    useEffect(() => {
        setSelectedLang(filtered_lang)
    }, [filtered_lang])

    // handle bulk action
    const handleBulkAction = () => {
        setIsMarkAll([])
        showAlert(
            `${translate("Are you sure")}?`,
            `${translate("You want to delete selected doctors")}?`,
            `${translate("Delete")}!`,
            () => {
                router.delete(
                    route("admin.doctors.bulk.delete", {
                        ids: markItems.join(",")
                    })
                )
            }
        )
    }

    return (
        <>
            <Head title="All Doctors" />
            <AdminLayouts>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container-fluid">
                    <div className="yoo-uikits-heading">
                        <h2 className="yoo-uikits-title">{translate("All Doctors")}</h2>
                    </div>
                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    <div className="yoo-card yoo-style1">
                        <div className="yoo-card-heading">
                            <div className="yoo-card-heading-left">
                                <h2 className="yoo-card-title">
                                    <span className="yoo-card-title-icon yoo-blue-bg">
                                        <IonIcon
                                            icon={peopleOutline}
                                            style={{
                                                width: "16px",
                                                height: "16px"
                                            }}
                                        />
                                    </span>
                                    {translate("Doctors")}
                                </h2>
                            </div>
                        </div>
                        <div className="yoo-card-body">
                            <div className="">
                                <div className="yoo-height-b15 yoo-height-lg-b15" />
                                <div className="yooDataTableWrap">
                                    <div className="dataTables_heading">
                                        <div className="dataTables_heading_left">
                                            <div className="yoo-group-btn">
                                                <div className="position-relative">
                                                    <DropDownButton selectedOption={selectedOption} disabled={!markItems.length}>
                                                        <a
                                                            onClick={() => setSelectedOption("Delete")}
                                                            className={`dropdown-item ${
                                                                selectedOption === "Delete" ? "active" : ""
                                                            }`}
                                                            href="#"
                                                        >
                                                            {translate("Delete")}
                                                        </a>
                                                    </DropDownButton>
                                                </div>
                                                <button
                                                    disabled={!markItems.length}
                                                    onClick={() => handleBulkAction()}
                                                    className="btn btn-success btn-sm"
                                                >
                                                    {translate("Apply")}
                                                </button>
                                            </div>
                                            <div className="yoo-group-btn">
                                                <div className="position-relative">
                                                    <DropDownButton
                                                        selectedOption={languages[selectedLang]?.name || selectedLang}
                                                    >
                                                        {Object.entries(languages).map(([code, language], index) => (
                                                            <a
                                                                onClick={() => setSelectedLang(code)}
                                                                className={`dropdown-item ${
                                                                    selectedLang === code ? "active" : ""
                                                                }`}
                                                                href="#"
                                                                key={index}
                                                            >
                                                                {language.name}
                                                            </a>
                                                        ))}
                                                    </DropDownButton>
                                                </div>
                                                <button
                                                    onClick={() => getResults(searchQuery)}
                                                    className="btn btn-success btn-sm"
                                                >
                                                    {translate("Change language")}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="dataTables_heading_right">
                                            <div id="yooDataTable_filter" className="dataTables_filter">
                                                <label>
                                                    <input
                                                        type="search"
                                                        className=""
                                                        placeholder={`${translate("Search")}...`}
                                                        value={searchQuery}
                                                        onChange={(e) => {
                                                            setSearchQuery(e.target.value)
                                                            getResults(e.target.value)
                                                        }}
                                                    />
                                                </label>
                                                <button className="dataTables_filter_btn">
                                                    <IonIcon icon={search} />
                                                </button>
                                            </div>
                                            {hasPermission("doctors.create") && (
                                                <Link
                                                    href={route("admin.doctors.create")}
                                                    className="btn btn-success btn-sm yoo-table-btn1"
                                                >
                                                    <span className="yoo-add">+</span> {translate("Create New")}
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                    <div id="yooDataTable_wrapper" className="dataTables_wrapper no-footer">
                                        <table
                                            id="yooDataTable"
                                            className="display dataTable no-footer"
                                            style={{ width: "100%" }}
                                        >
                                            <thead>
                                                <tr role="row">
                                                    <th onClick={() => markAll()} style={{ width: "1%" }}>
                                                        <div className={`yoo-check-mark-all ${isMarkAll && "active"}`}>
                                                            <span className="yoo-first" />
                                                            <span className="yoo-last" />
                                                        </div>
                                                    </th>
                                                    <ThSortable
                                                        width="20%"
                                                        sort={sort}
                                                        onSorted={() => getResults(searchQuery)}
                                                        column="title"
                                                    >
                                                        {translate("Title")}
                                                    </ThSortable>
                                                    <ThSortable
                                                        width="15%"
                                                        sort={sort}
                                                        onSorted={() => getResults(searchQuery)}
                                                        column="created_at"
                                                    >
                                                        {translate("Date")}
                                                    </ThSortable>
                                                    <th style={{ width: "1%" }} className="sorting">
                                                        {translate("Action")}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {doctors.data.map((doctor, index) => (
                                                    <tr className="odd" key={index}>
                                                        <td className="sorting_1" onClick={() => handleMark(doctor.id)}>
                                                            <div
                                                                className={`yoo-check-mark ${
                                                                    markItems.some((item) => item === doctor.id) && "active"
                                                                }`}
                                                            />
                                                        </td>
                                                        <td>
                                                            {doctor?.content?.title}

                                                            <a
                                                                href="#"
                                                                style={{
                                                                    color: "#007aff",
                                                                    marginLeft: "5px"
                                                                }}
                                                                onClick={(e) => {
                                                                    e.preventDefault()
                                                                    setEditModal(true)
                                                                    setEditedData(doctor)
                                                                }}
                                                            >
                                                                (Slug)
                                                            </a>
                                                        </td>
                                                        <td>{moment(doctor.created_at).format("ll")}</td>
                                                        <td>
                                                            <div
                                                                className="d-flex"
                                                                style={{
                                                                    gap: "5px"
                                                                }}
                                                            >
                                                                {hasPermission("doctors.edit") && (
                                                                    <Link
                                                                        href={route("admin.doctors.edit", doctor)}
                                                                        className="badge badge-primary yoo-tooltip-wrap"
                                                                    >
                                                                        <IonIcon
                                                                            icon={createOutline}
                                                                            style={{
                                                                                height: "16px",
                                                                                width: "16px"
                                                                            }}
                                                                        />
                                                                        <span className="yoo-tooltip-body">
                                                                            Edit With Page Builder
                                                                        </span>
                                                                    </Link>
                                                                )}
                                                                <a
                                                                    href={route("doctor.show", doctor.slug)}
                                                                    target="_blank"
                                                                    className="badge badge-secondary yoo-tooltip-wrap"
                                                                >
                                                                    <IonIcon
                                                                        icon={eyeOutline}
                                                                        style={{
                                                                            height: "16px",
                                                                            width: "16px"
                                                                        }}
                                                                    />
                                                                    <span className="yoo-tooltip-body">View</span>
                                                                </a>
                                                                {hasPermission("doctors.create") && (
                                                                    <a
                                                                        href="#"
                                                                        className="badge badge-warning yoo-tooltip-wrap"
                                                                        onClick={() => {
                                                                            router.post(route("admin.doctors.clone", doctor))
                                                                        }}
                                                                    >
                                                                        <IonIcon
                                                                            icon={copyOutline}
                                                                            style={{
                                                                                height: "16px",
                                                                                width: "16px"
                                                                            }}
                                                                        />
                                                                        <span className="yoo-tooltip-body">Clone</span>
                                                                    </a>
                                                                )}
                                                                {hasPermission("doctors.delete") && (
                                                                    <DeleteButton href={route("admin.doctors.destroy", doctor)} />
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {!doctors.data.length && (
                                            <div
                                                className="no-data-found"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "50px"
                                                }}
                                            >
                                                <p>{translate("No History Found")}!</p>
                                            </div>
                                        )}
                                        <div className="clear" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* .yoo-card */}
                    {doctors.total > 1 && (
                        <div className="pagination-wrapper" style={{ marginTop: "10px" }}>
                            <ul className="pagination">
                                {doctors.links.map((link, index) => (
                                    <li className={`page-item ${link.active ? "active" : ""}`} key={`pagination_${index}`}>
                                        <Link
                                            href={link.url}
                                            className="page-link"
                                            dangerouslySetInnerHTML={{
                                                __html: link.label
                                            }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="yoo-height-b30 yoo-height-lg-b30" />
                </div>
                <EditSlug editedData={editedData} isModal={isEditModal} closeModal={(e) => setEditModal(e)} />
            </AdminLayouts>
        </>
    )
}
