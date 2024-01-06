import React from 'react'

function ProfileDataDetails({ title, dataMap }) {

    return (
        <div className="section_userdataHead">
            <h4>{title}</h4>

            <div className="row">
                {
                    dataMap?.map((keyValuePair) => {
                        return (
                            <div className="col-md-6 col-xs-12">
                                <div className="table_group_row">
                                    <div className="row">
                                        <div className="col-5 fw-500 labelTableGropRow">
                                            {keyValuePair.key}:
                                        </div>
                                        <div className="col-7 labelAnswerTableGroup" id={keyValuePair?.id ? keyValuePair.id : null}>
                                            <b>{keyValuePair.value}</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProfileDataDetails
