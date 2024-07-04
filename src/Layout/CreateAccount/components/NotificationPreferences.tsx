import { useEffect, useState } from 'react';
import { PartialFormDataType } from '../types';

export function NotificationPreferences({ emailNotification, pushNotification, noNotification, updateFields, isValidationFailed }: PartialFormDataType) {
    const [emailNotifications, setEmailNotifications] = useState(emailNotification || false)
    const [appPushNotifications, setAppPushNotifications] = useState(pushNotification || false)
    const [noNotifications, setNoNotifications] = useState(noNotification || false)


    const handleEmailChange = (event: any) => {
        setEmailNotifications(event.target.checked)
        if (noNotifications && event.target.checked) {
            setNoNotifications(false)
        }
    }

    const handleAppPushChange = (event: any) => {
        setAppPushNotifications(event.target.checked)
        if (noNotifications && event.target.checked) {
            setNoNotifications(false)
        }
    }

    const handleNoNotificationsChange = (event: any) => {
        setNoNotifications(event.target.checked)
        if (event.target.checked && (emailNotifications || appPushNotifications)) {
            setEmailNotifications(false)
            setAppPushNotifications(false)
        }
    }

    useEffect(() => {
        updateFields({
            emailNotification: emailNotifications,
            pushNotification: appPushNotifications,
            noNotification: noNotifications,
        })
    }, [emailNotifications, appPushNotifications, noNotifications])

    return (
        <>
            <div className={`validation-message ${isValidationFailed ? 'visible' : ''}`}>
                <p>Please select at least one notification preference</p>
            </div>
            <h1 className="create-acc-title-large">Stay in the loop</h1>
            <h2 className="create-acc-title-extra-small">Set your preferences for updates and announcements.</h2>
            <div className="create-acc-notifications-wrap">
                <label htmlFor="email-notifications" className="notification-label">
                    <input type="checkbox" name="emailNotification" id="email-notifications" checked={emailNotifications} onChange={handleEmailChange} />
                    Sign up for Email Notifications
                </label>
                <label htmlFor="app-push-notifications" className="notification-label">
                    <input type="checkbox" name="pushNotification" id="app-push-notifications" checked={appPushNotifications} onChange={handleAppPushChange} />
                    App Push Notifications
                </label>
                <label htmlFor="no-notifications" className="notification-label">
                    <input type="checkbox" name="noNotification" id="no-notifications" checked={noNotifications} onChange={handleNoNotificationsChange} />
                    No Notifications
                </label>
            </div>
        </>
    )
}