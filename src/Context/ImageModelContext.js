import React, { Fragment, createContext, useContext, useState } from 'react'

let ImageModelContextProvider = createContext()

function ImageModelContext({ children }) {

    const [flatImageModel, setflatImageModel] = useState({ isShow: false, src: null });

    return (
        <ImageModelContextProvider.Provider value={{ flatImageModel, setflatImageModel }}>
            {
                children
            }
        </ImageModelContextProvider.Provider>
    )
}


export function useImageModelContext() {
    return useContext(ImageModelContextProvider)
}

export default ImageModelContext
