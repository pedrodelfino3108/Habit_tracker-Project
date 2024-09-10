document.addEventListener('DOMContentLoaded', function () {
    const habits = document.querySelectorAll('.habit');

    habits.forEach(habit => {
        const habitName = habit.getAttribute('data-habit');
        const tracker = habit.querySelector('.tracker');
        const completeBtn = habit.querySelector('.complete');
        const resetBtn = habit.querySelector('.reset');

        // Load progress from localStorage
        let progress = JSON.parse(localStorage.getItem(habitName)) || [];

        // Create 21 day tracker
        function updateTracker() {
            tracker.innerHTML = '';
            for (let i = 0; i < 21; i++) {
                const day = document.createElement('div');
                if (progress[i]) {
                    day.classList.add('completed');
                }
                tracker.appendChild(day);
            }
        }

        updateTracker();

        // Handle complete button click
        completeBtn.addEventListener('click', function () {
            const currentDay = progress.length;
            if (currentDay < 21) {
                progress.push(true);
                localStorage.setItem(habitName, JSON.stringify(progress));
                updateTracker();

                // Check if we need to celebrate
                if ([5, 10, 15, 21].includes(currentDay + 1)) {
                    celebrate();
                }
            }
        });

        // Handle reset button click
        resetBtn.addEventListener('click', function () {
            progress = [];
            localStorage.removeItem(habitName);
            updateTracker();
        });
    });

    function celebrate() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
});
