
// alert('hello world !')

document.addEventListener('DOMContentLoaded', ()=>{
    const div_notificationBox = document.querySelector('.notificationBox-wrapper');
    const div_notificationBox_closeButton = document.querySelector('.close-notification');
    const p_userNameAndGreeting = document.querySelector('#username-and-greeting');

    // After 8 seconds NotificationBox disappears
    setTimeout(()=>{
        div_notificationBox.style.opacity = 0;
        div_notificationBox.style.transition = 'opacity 0.8s ease-in-out';
    }, 3000);

    // manually close NotificationBox
    notificationBox_closeButton.addEventListener('click', (e)=>{
        e.preventDefault();
        notificationBox.style.display = "none";
        notificationBox.style.transition = 'display 0.4s ease-in-out';
    });
});
