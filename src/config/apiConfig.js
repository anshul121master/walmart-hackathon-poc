const url = "";

export const api ={
    login: () => `${url}/v1/login`,
    logout: () => `${url}/v1/logout`,
    profile: () => `${url}/v1/users`,
    orderHistory: () => `${url}/v1/orders`,
    membershipOffers: () => `${url}/v1/membershipOffers`,
}

export const mockApi = {
    login: () => './data/login.json',
    logout: () => '/data/logout.json',
    profile: () => './data/profile.json',
    orderHistory: () => './data/orderHistory.json',
    membershipOffers: () => `${url}/v1/membershipOffers.json`,
}