const API = 'https://winkaro.codexindia.com/api/'

export const API_URL = {
    register: API + 'register',
    login: API + 'login',
    verify_otp: API + 'verify_otp',
    get_user: API + 'get_user',
    get_pin_coins: API + 'spin_and_earn/get_spin_coin',
    get_reward_video_daily_limit: API + 'watch_and_earn/get_reward_video',
    add_reward: API + 'watch_and_earn/add_reward',
    spin_add_reward: API + 'spin_and_earn/add_reward',
    get_wallet_account: API + 'wallet/get_account',
    bind_wallet_account: API + 'wallet/bind_account',
    withdraw_wallet_account: API + 'wallet/withdraw',
    get_notification: API + 'notifications/get_notification',
    withdraw_history : API + 'wallet/get_transactions/withdraw',
}


export const playStoreLink = '[Play Store Link]'


export function coins_to_inr(coins: number, balance: number) {
    // Two decimal places
    if (coins > balance)
        return "Insufficient Balance (" + balance + " coins)"
    return (coins / 1000).toFixed(2)
}