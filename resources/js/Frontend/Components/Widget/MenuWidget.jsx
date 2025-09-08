import React from "react"
import MenuItem from "@/Frontend/Components/Widget/MenuItem"

export default function MenuWidget({ menus }) {
    return (
        <>
            <ul className="cs_menu_widget cs_mp0">
                {menus?.map((menu, index) => (
                    <MenuItem key={index} menu={menu} />
                ))}
            </ul>
        </>
    )
}
