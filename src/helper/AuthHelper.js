


let authHelper = {

    setJwtLocalStorage: (jwtToken, refresh_reference) => {
        let dataAuth = {
            jwt: jwtToken,
            refresh_reference
        }
        localStorage.setItem('adminAuth', JSON.stringify(dataAuth));
    },

    
    setDataLocalStorage: (adminProfile) => {
        let adminData = {
            vendorAdmin: {
                isLogged: true,
                profileAdmin: { ...adminProfile }
            }
        }
        localStorage.setItem('adminData', JSON.stringify({...adminData}));
    }
}


export default authHelper