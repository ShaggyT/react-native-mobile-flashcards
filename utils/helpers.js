import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'MobileFlashcards::notifications'


export function cardsCount (cardsCount) {
  return cardsCount === 1 ? '1 Card' : `${cardsCount} Cards`
}

export function quizResult (score, questionNumber) {
  return `${((score*100)/questionNumber).toFixed(0)} %`
}

export function progressFunc (questionNumber, cardCount) {
  return ((questionNumber) + 1)/ cardCount
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

// Notifications

function createNotification () {
  return {
    title: 'Practice the flash cards!',
    body: "💥 don't forget to practice the flash cards today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      //  we haven't set up notifications
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            //  if we already have set notifications go and cancel that
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
