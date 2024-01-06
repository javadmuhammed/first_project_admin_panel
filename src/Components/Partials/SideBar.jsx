import React from 'react'
import SingleNavItem from '../NavItem/SingleNavItem'
import DropdownNavItem from '../NavItem/DropdownNavItem'

function SideBar() {
    return (

        <aside id="asidenav">

            <div className="list_nav_box">
                <ul className="listnav">

                    <SingleNavItem isNested={false} title={"My Dashboard"} icon={"fa-gauge"} to={"/"} > </SingleNavItem>

                    <SingleNavItem isNested={false} title={"Site Settings"} icon={"fa-gear"} to={"/site_settings"} > </SingleNavItem>


                    <DropdownNavItem title={"Manage Product"} dataShow={"manageProduct"} icon={"fa-cart-shopping"}  >
                        <SingleNavItem isNested={true} title={"Add Product"} icon={"fa-square"} to={"/add_product"} > </SingleNavItem>
                        <SingleNavItem isNested={true} title={"View All Product"} icon={"fa-square"} to={"/manage_product"} > </SingleNavItem>
                        <SingleNavItem isNested={true} title={"Manage Stock"} icon={"fa-square"} to={"/manage_stock"} > </SingleNavItem>
                    </DropdownNavItem>

                    <DropdownNavItem title={"Manage Orders"} dataShow={"manageOrder"} icon={"fa-bag-shopping"}  >
                        <SingleNavItem isNested={true} title={"Manage Orders"} icon={"fa-square"} to={"/manage_orders"} > </SingleNavItem>
                    </DropdownNavItem>

                    <DropdownNavItem title={"User Management"} dataShow={"manageUsers"} icon={"fa-users"}  >
                        <SingleNavItem isNested={true} title={"Manage Users"} icon={"fa-square"} to={"/manage_user"} > </SingleNavItem>
                        <SingleNavItem isNested={true} title={"Add Users"} icon={"fa-square"} to={"/add_user"} > </SingleNavItem>
                    </DropdownNavItem>

                    <DropdownNavItem title={"Manage Category"} dataShow={"categoryManagement"} icon={"fa-box"}  >
                        <SingleNavItem isNested={true} title={"Add Category"} icon={"fa-square"} to={"/add_category"} > </SingleNavItem>
                        <SingleNavItem isNested={true} title={"Manage Category"} icon={"fa-square"} to={"/manage_category"} > </SingleNavItem>
                    </DropdownNavItem>

                    <DropdownNavItem title={"Manage Banner"} dataShow={"bannerManagement"} icon={"fa-image"}  >
                        <SingleNavItem isNested={true} title={"Add Banner"} icon={"fa-square"} to={"/add_banner"} > </SingleNavItem>
                        <SingleNavItem isNested={true} title={"Manage Banner"} icon={"fa-square"} to={"/manage_banner"} > </SingleNavItem>
                    </DropdownNavItem>

                    {/* <DropdownNavItem title={"Sales Report"} dataShow={"salesReport"} icon={"fa-file-export"}  >
                        <SingleNavItem isNested={true} title={"Generate Sales Report"} icon={"fa-square"} to={"/generate_sales_report"} > </SingleNavItem>
                        <SingleNavItem isNested={true} title={"Manage Sales Report"} icon={"fa-square"} to={"/manage_sales_report"} > </SingleNavItem>
                    </DropdownNavItem> */}

                    <SingleNavItem isNested={false} title={"Sales Report"} icon={"fa-file-export"} to={"/generate_sales_report"} > </SingleNavItem>


                    <DropdownNavItem title={"Manage Coupen"} dataShow={"manageCoupen"} icon={"fa-money-bill"}  >
                        <SingleNavItem isNested={true} title={"Add Coupen Code"} icon={"fa-square"} to={"/add_coupen_code"} > </SingleNavItem>
                        <SingleNavItem isNested={true} title={"Manage Coupen Code"} icon={"fa-square"} to={"/manage_coupen_code"} > </SingleNavItem>
                    </DropdownNavItem>



                </ul>
            </div>
        </aside>
    )
}

export default SideBar
