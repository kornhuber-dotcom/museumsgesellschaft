// Service Worker für Museumsgesellschaft e. V. Braunlage PWA

// Installationsphase
self.addEventListener('install', (event) => {
    console.log('Service Worker installiert.');
    self.skipWaiting();
});

// Aktivierungsphase
self.addEventListener('activate', (event) => {
    console.log('Service Worker aktiviert.');
    event.waitUntil(clients.claim());
});

// Empfang von Push-Nachrichten im Hintergrund
self.addEventListener('push', (event) => {
    let data = { title: 'Museumsgesellschaft Braunlage', body: 'Es gibt eine neue Schnellinformation.' };
    
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body,
        icon: 'icon.png', // Platzhalter für ein App-Icon, falls vorhanden
        badge: 'badge.png',
        vibrate: [200, 100, 200]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Klick auf die Benachrichtigung öffnet die App
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('./')
    );
});