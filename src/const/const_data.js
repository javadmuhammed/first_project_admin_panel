
export const const_data = {
    CURRENCY_ICON: "₹",
    CURRENCY_TYPE: "INR",
    API_URL: "api.veguess.shop",
    FRONT_END_DOMAIN: "api.veguess.shop",
    ADMIN_PANEL_URL: "api.veguess.shop",
    user_profile_path: "api.veguess.shop/images/userProfile",
    public_image_url: "api.veguess.shop/images/web_images",
    API_ENDPOINT: {
        admin_jwt_regenarate: "/admin/regenarate_jwt",
        admin_jwt_validate: "/admin/validate_jwt",
        admin_login_post: "/admin/login",
        admin_forget_password: "/admin/forget_password",
        admin_password_reset: "/admin/reset_password",
        upload_file: "/admin/upload_image",
        get_all_images: "/admin/get_all_images",
        delete_image: "/admin/delete_image",
        add_product: "/admin/add_product",
        get_all_product: "/admin/get_all_product",
        delete_product: "/admin/delete_product",
        update_product: "/admin/update_product",
        update_many_product: "/admin/update_many_product",
        get_single_product: "/admin/get_single_product",
        get_all_order: "/admin/get_all_order",
        get_orders_product_id: "/admin/get_orders_product_id",
        get_single_order: "/admin/get_single_order",
        update_order: "/admin/update_order",
        get_user_order: "/admin/get_user_order",
        soon_outofstock: "/admin/soon_outofstock",
        add_category: "/admin/add_category",
        get_all_category: "/admin/get_all_category",
        update_category: "/admin/update_category",
        delete_category: "/admin/delete_category",
        get_category_product: "/admin/get_category_product",
        get_single_category: "/admin/get_single_category",
        add_banner: "/admin/add_banner",
        edit_banner: "/admin/edit_banner",
        delete_banner: "/admin/delete_banner",
        get_banners: "/admin/get_banners",
        get_single_banner: "/admin/get_single_banner",
        delete_banner: "/admin/delete_banner",
        generate_sales_report: "/admin/generate_sales_report",
        generate_sales_report_pdf: "/admin/generate_sales_report_pdf",
        download_invoice: "/admin/download_invoice",
        site_statics: "/admin/site_statics",
        update_site_settings: "/admin/update_site_settings",
        get_site_settings: "/admin/get_site_settings",
        get_single_vendor: "/admin/get_single_vendor",
        get_all_users: "/admin/get_all_users",
        add_user: "/admin/add_user",
        update_user: '/admin/update_user',
        get_single_user: "/admin/get_single_user",
        delete_user: "/admin/delete_user",
        add_coupen_code: "/admin/add_coupen_code",
        get_all_coupen_code: "/admin/get_all_coupen_code",
        delete_coupen_code: "/admin/delete_coupen_code",
        edit_coupen_code: "/admin/edit_coupen_code",
        get_single_coupen: "/admin/get_single_coupen"
    },
    CHART_TYPE: {
        "YEARLY": "YEARLY",
        "MONTHLY": "MONTHLY",
        "DAILY": "DAILY"
    },  
    PRODUCT_OPTION: {
        FRESH_VEGETABLES: 'FRESH VEGETABLES',
        FRESH_FRUITS: 'FRESH FRUITS',
        MEAL_KITS: 'MEAL KITS',
        ORGANIC_PRODUCTS: 'ORGANIC PRODUCTS',
        SALADS: 'SALADS',
        SMOOTHIES: 'SMOOTHIES',
        HEALTHY_SNACKS: 'HEALTHY SNACKS',
        READY_TO_COOK: 'READY-TO-COOK MEALS',
        JUICES: 'JUICES',
        FARM_TO_TABLE: 'FARM-TO-TABLE PRODUCE',
        EXOTIC_FRUITS: 'EXOTIC FRUITS',
        GOURMET_MEALS: 'GOURMET MEALS',
        GLUTEN_FREE: 'GLUTEN-FREE OPTIONS',
        VEGAN_CHOICES: 'VEGAN SELECTIONS',
    },

    ORDER_STATUS: {
        // PENDING: "PENDING",
        // PROCESSING: "PROCESSING",
        // SHIPPED: "SHIPPED", 
        // CANCEL_REQUEST: "CANCEL_REQUEST",
        // CANCELED: "CANCELLED",
        // RETURNED: "RETURNED",
        // RETURNED_REQUEST: "RETURNED_REQUEST",
        // REFUND: "REFUND",
        // ONHOLD: "ONHOLD",
        // DELIVERED: "DELIVERED",
        ORDER_RECEIVED: "ORDER RECEIVED",
        PREPARING_ORDER: "PREPARING YOUR ORDER",
        READY_FOR_PICKUP: "ORDER READY FOR PICKUP",
        PICKED: "PICKED",
        DELIVERED: "DELIVERED",
        CANCELED: "CANCELLED",
        RETURNED: "RETURNED",
        RETURNED_REQUEST: "RETURNED REQUEST",
        REFUND: "REFUND"
    },

    ALERT_TYPE: {
        ERROR: "ERROR",
        SUCCESS: "SUCCESS",
        WARNING: "WARNING"
    },
    PAYMENT_METHOD: {
        RAZORPAY: "Razorpay",
        COD: "CASH ON DELIVERY",
        WALLET: "Wallet",
        SUPER_COIN: "SUPER COIN"
    },
    DEFAULT_ALERT_DATA: {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    },

}

export function getAvtarImage() {
    return const_data.API_URL + "/images/other/avatar.jpg"
}