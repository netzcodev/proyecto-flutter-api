const { google } = require('googleapis');
const axios = require('axios');

const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SCOPES = [MESSAGING_SCOPE];

function getFirebaseAccessToken() {
  return new Promise(function (resolve, reject) {
    const key = require('../firebase-admin.json');
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null
    );
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}

async function sendPushNotification(accessToken, deviceToken = '', type = "mileage", plate = '') {
  let title = 'Kilometraje';
  let body = 'Por favor mantenga actualizado el kilomentraje de sus vehiculos.';

  if (type == 'scheduleMileage') {
    title = 'Agendar';
    body = `Su vehiculo ${plate} ha superado los 10.000Km desde el anterior servicio.`;
  }

  if (type == 'scheduleDate') {
    title = 'Agendar';
    body = 'Ya es hora de agendar una nueva cita.';
  }

  try {
    const imageUrl = 'https://img.freepik.com/fotos-premium/foto-perro-sobre-fondo-completamente-blanco_601415-383.jpg?w=2000';
    const response = await axios.post(
      'https://fcm.googleapis.com/v1/projects/cars-app-273ae/messages:send',
      {
        "message": {
          "token": deviceToken,
          "data": {
            "type": type
          },
          "notification": {
            "title": title,
            "body": body,
          },
          "android": {
            "notification": {
              "image": imageUrl
            }
          },
          "apns": {
            "payload": {
              "aps": {
                "mutable-content": 1
              }
            },
            "fcm_options": {
              "image": imageUrl
            }
          }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // La notificación se envió exitosamente
    return response.data;
  } catch (error) {
    throw `${error}`;
  }



}

module.exports = {
  getFirebaseAccessToken,
  sendPushNotification
}
