// 设置恋爱开始时间为2024年10月1日00:00:00
const startDate = new Date('2024-10-01T00:00:00').getTime();

function updateTimer() {
    const now = new Date().getTime();
    const difference = now - startDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = (days + 1).toString().padStart(3, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// 每秒更新一次计时器
setInterval(updateTimer, 1000);
updateTimer(); // 立即执行一次，避免延迟显示

// 添加心跳动画效果
const heartContainer = document.querySelector('.heart-container');
if (heartContainer) {
    setInterval(() => {
        heartContainer.classList.add('pulse');
        setTimeout(() => {
            heartContainer.classList.remove('pulse');
        }, 500);
    }, 2000);
} 