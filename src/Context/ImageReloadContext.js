
import React, { createContext, useContext, useState } from 'react' 

let ImageReloadContextApi = createContext()

function ImageReloadContext({ children }) {

    
    const [reloadFlag, setReloadFlag] = useState(false);

    return (
        <ImageReloadContextApi.Provider value={{ reloadFlag, setReloadFlag }}>
            {
                children
            }
        </ImageReloadContextApi.Provider>
    )
}


export function useImageReloadContext() {
    return useContext(ImageReloadContextApi)
}

export default ImageReloadContext
