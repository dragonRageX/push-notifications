console.log("Service Worker Loaded!");

self.addEventListener("push", (e) => {
    const data = e.data.json();   //gets the 'payload' object from the index.js file
    console.log("Push received! Payload:", data);
    self.registration.showNotification(data.title, {
        body: "Notified by Param Shah",
        icon: "https://thumbs.dreamstime.com/b/new-notification-vector-icon-bell-symbol-social-network-illustration-eps-215964085.jpg"
    });
});