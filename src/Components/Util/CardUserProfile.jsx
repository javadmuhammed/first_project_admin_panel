import React from 'react'

function CardUserProfile({ name, username, email, phone, profile, id }) {
    return (
        <div className="box_list_drop_wrapper">
            <img height={"78px"} width="78px" src={profile} alt="" />
            <a href="">{name}</a>
            <span>{id}</span>
            <span>{username}</span>
            <span>{email}</span>
            <span>{phone}</span>

        </div>
    )
}

export default CardUserProfile
