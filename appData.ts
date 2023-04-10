export const email = 'winkaro7253@gmail.com'

export const API = 'https://winkaro.yourexpand.in/api/'

export const API_URL = {
    register: API + 'register',
    login: API + 'login',
    verify_otp: API + 'verify_otp',
    get_user: API + 'profile/get_user',
    get_pin_coins: API + 'spin_and_earn/get_spin_coin',
    get_reward_video_daily_limit: API + 'watch_and_earn/get_reward_video',
    add_reward: API + 'watch_and_earn/add_reward',
    spin_add_reward: API + 'spin_and_earn/add_reward',
    get_wallet_account: API + 'wallet/get_account',
    bind_wallet_account: API + 'wallet/bind_account',
    withdraw_wallet_account: API + 'wallet/withdraw',
    get_notification: API + 'notifications/get_notification',
    withdraw_history: API + 'wallet/get_transactions/withdraw',
    notifications_mark_read: API + 'notifications/mark_read',
    get_yt_task: API + 'tasks/get/youtube',
    get_insta_task: API + 'tasks/get/instagram',
    get_yt_shorts_task: API + 'tasks/get/yt_shorts',
    upload_task: API + 'tasks/submit/task',
    update_profile: API + 'profile/update_profile',
    banners: API + 'banners/get',
    refer_history: API + 'refer/get_history'
}


export const playStoreLink = 'https://play.google.com/store/apps/details?id=com.winkaro'
export const t_and_c_link = 'https://winkaro.yourexpand.in/terms_and_conditions'
export const privacy_policy_link = 'https://winkaro.yourexpand.in/privacy_policy'
export const about_us_link = 'https://winkaro.yourexpand.in/about_us'

export function coins_to_inr(coins: number, balance: number) {
    // Two decimal places
    if (coins > balance)
        return "Insufficient Balance (" + balance + " coins)"
    return (coins / 100).toFixed(2)
}