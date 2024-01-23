import React from 'react'
import { Link } from 'react-router-dom'

function CardUserProfile({ name, username, email, phone, profile, id }) {
    return (
        <div className="box_list_drop_wrapper">
            <img height={"78px"} width="78px" src={profile} alt="" />
            <Link to={"view_single_user/"+id}>{name}</Link> 
            <span>{username}</span>
            <span>{email}</span>
            <span>{phone}</span>

        </div>
    )
}

export default CardUserProfile
