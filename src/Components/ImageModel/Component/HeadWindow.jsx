import React from 'react'

function HeadWindow() {
  return (
    <div className="top_tab_head">
      <h4>Upload/Select Image</h4>
      <i className="close_image_modal" id="close_modal_popup_image" type="button">X</i>
      <ul className="tab_upload_files">
        <li>
          <button className="active_media_tab upload_media_tab_btn tab_file_upload" data-widget="upload_image_tab">Upload
            Files</button>
          <button className="tab_file_upload mediatabbtn" data-widget="showimagedata">Media Button</button>
        </li>
      </ul>
    </div>
  )
}

export default HeadWindow
