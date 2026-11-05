export default function getBrowserId() {
    let browserId = localStorage.getItem('browserId');

    if (!browserId) {
        browserId = crypto.randomUUID();
        localStorage.setItem('browserId', browserId);
    }

    return browserId;
}