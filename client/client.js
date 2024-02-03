const publicVapidKey = "BBIp2I1cCAmt1S2lCCCHh__TG06XVayXDrQjLyb5UYSDcuMoieoQyiul3CRWmvAVYMG1GyfcqqU90VT-fvmdFIQ";

//check for Service Worker
if("serviceWorker" in navigator)
{
    send().catch((err) => console.error(err));
}

//register Service Worker, register Push, send Push Notification
async function send()
{
    //register Service Worker
    console.log("Registering Service Worker...");
    const register = await navigator.serviceWorker.register("/worker.js", { scope: "/" });
    console.log("Service Worker registered!");

    //register Push
    console.log("Registering Push...");
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicVapidKey
    });
    console.log("Push registered!");

    //send Push Notification
    console.log("Sending Push Notification...");
    const response = await axios.post("/subscribe", {
        subscription: JSON.stringify(subscription)
    });
    console.log("Push Notification sent!");
}