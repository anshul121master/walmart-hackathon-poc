const url = "http://172.28.242.53:8080";


export const api ={
    login: () => `${url}/login/user`,
    logout: () => `${url}/logout`,
    profile: () => `${url}/profile/user`,
    orderHistory: () => `${url}/v1/orders`,
    offers: (isMember) => `${url}/profile/offers?isMember=${isMember}`,
    allProducts: () => `${url}/product/allListings`
}

export const mockApi = {
    login: () => '../data-dump/login.json',
    logout: () => '/data/logout.json',
    profile: () => '../data-dump/profile.json',
    orderHistory: () => '../data-dump/orderHistory.json',
    offers: () => `../data-dump/offers.json`,
    membershipOffers: () => `../data-dump/membershipOffers.json`,
    allProducts: () => `../data-dump/productList.json`
}