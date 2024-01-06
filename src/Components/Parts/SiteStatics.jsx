import React, { useState } from 'react'
import InfoBox from '../Util/InfoBox'

function SiteStatics({ statics }) {


    console.log(statics)


    return (
        <div className="dashboard_statistic">

            
            <div className="row">
                <div className="col-md-3">
                    <InfoBox>
                        {statics?.number_users}
                        <p>Total Users</p>
                    </InfoBox>
                </div>
                <div className="col-md-3">
                    <InfoBox>
                        {statics?.number_of_product}
                        <p>Total Products</p>
                    </InfoBox>
                </div>
                <div className="col-md-3">
                    <InfoBox>
                        {statics?.number_of_orders}
                        <p>Total Orders</p>
                    </InfoBox>
                </div>
                <div className="col-md-3">
                    <InfoBox>
                        {statics?.number_of_images}
                        <p>Total Images</p>
                    </InfoBox>
                </div>

                <div className="col-md-3">
                    <InfoBox>
                        {statics?.number_of_category}
                        <p>Total Category</p>
                    </InfoBox>
                </div>

            </div>

        </div>
    )
}

export default SiteStatics
