export const hostUrl = "http://172.28.239.165:8080";


export const api ={
    login: () => `${hostUrl}/login/user`,
    logout: () => `${hostUrl}/logout`,
    profile: () => `${hostUrl}/profile/user`,
    orderHistory: () => `${hostUrl}/v1/orders`,
    offers: (isMember) => `${hostUrl}/profile/offers?isMember=${isMember}`,
    allProducts: () => `${hostUrl}/product/allListings`
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