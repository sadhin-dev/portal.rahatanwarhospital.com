import { useEffect, useState } from "react"

export default function Timetable1({ data }) {
    const { time_list, day_list } = data
    const [timeLength, setTimeLength] = useState(time_list?.length || 0)
    useEffect(() => {
        setTimeLength(time_list?.length || 0)
    }, [day_list, time_list])
    return (
        <div className="container">
            <div className="table-responsive-xl">
                <div className="cs_timetable" style={{ height: `${timeLength * 148 - 124}px` }}>
                    <div className="cs_timetable_vertical">
                        {time_list?.map((item, index) => (
                            <div key={index}>{item.time_title}</div>
                        ))}
                    </div>
                    <div className="cs_timetable_in">
                        {day_list?.map((item, index) => (
                            <div key={index}>
                                <div className="cs_timetable_date cs_heading_color">{item.day_title}</div>
                                {item.day_column_list?.map((list_item, columnIndex) => (
                                    <div
                                        className={`cs_hour_${list_item.number_of_hour ? list_item.number_of_hour : "0"}`}
                                        key={columnIndex}
                                    >
                                        <div className="cs_table_doctor">
                                            <div>
                                                {(list_item.department || list_item.time_range) && (
                                                    <p>
                                                        {list_item.department && (
                                                            <span
                                                                className="d-block"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: list_item.department
                                                                }}
                                                            />
                                                        )}
                                                        {list_item.time_range && (
                                                            <span
                                                                className="d-block"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: list_item.time_range
                                                                }}
                                                            />
                                                        )}
                                                    </p>
                                                )}
                                                {list_item.doctors && (
                                                    <p
                                                        className="cs_medium cs_heading_color"
                                                        dangerouslySetInnerHTML={{
                                                            __html: list_item.doctors
                                                        }}
                                                    />
                                                )}
                                            </div>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: list_item.room_number
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
