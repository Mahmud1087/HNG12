const countdownElement = document.getElementById('currentTimeUTC');

function updateCountdown() {
  const currentTime = new Date();

  const formattedTime = currentTime.toLocaleString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  countdownElement.innerHTML = formattedTime;
}
const timerInterval = setInterval(updateCountdown, 1000);
