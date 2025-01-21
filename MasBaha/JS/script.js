document.addEventListener('DOMContentLoaded', () => {
    const counter = document.getElementById('counter');
    const resetButton = document.getElementById('reset-button');
    const saveButton = document.getElementById('save-button');
    const nightModeToggle = document.getElementById('night-mode-toggle');
    const zikrElement = document.getElementById('zikr');
    const motivationalQuoteElement = document.getElementById('motivational-quote');
    const clockElement = document.getElementById('clock');
    const percentageElement = document.getElementById('percentage');
    let count = localStorage.getItem('count') ? parseInt(localStorage.getItem('count')) : 0;
    let zikrCount = localStorage.getItem('zikrCount') ? parseInt(localStorage.getItem('zikrCount')) : 0;
    const totalAzkar = 1000; // إجمالي عدد الأذكار كاملة

    const azkar = [
        "سبحان الله",
        "الحمد لله",
        "لا إله إلا الله",
        "الله أكبر",
        "لا حول ولا قوة إلا بالله",
        "سبحان الله وبحمده",
        "سبحان الله العظيم",
        "أستغفر الله",
        "اللهم صل على محمد",
        "لا إله إلا أنت سبحانك إني كنت من الظالمين"
    ];

    const motivationalQuotes = [
        "إن مع العسر يسرا",
        "واستعينوا بالصبر والصلاة",
        "ألا بذكر الله تطمئن القلوب",
        "ومن يتق الله يجعل له مخرجا",
        "لا تقنطوا من رحمة الله",
        "إن الله مع الصابرين",
        "ومن يتوكل على الله فهو حسبه",
        "وإذا سألك عبادي عني فإني قريب",
        "إنما يوفى الصابرون أجرهم بغير حساب",
        "إن رحمة الله قريب من المحسنين"
    ];

    function showMotivationalQuote(index) {
        motivationalQuoteElement.textContent = motivationalQuotes[index % motivationalQuotes.length];
        setTimeout(() => {
            motivationalQuoteElement.textContent = "";
        }, 1500); // إخفاء العبارة بعد ثانية واحدة
    }

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;

        // تفعيل الوضع الليلي تلقائيًا بناءً على الوقت
        if (hours >= 18 || hours < 6) {
            document.body.classList.add('night-mode');
            nightModeToggle.checked = true;
        } else {
            document.body.classList.remove('night-mode');
            nightModeToggle.checked = false;
        }
    }

    function updatePercentage() {
        const percentage = (count / totalAzkar) * 100;
percentageElement.textContent = `نسبة الأذكار: ${percentage.toFixed(2)}%`;
    }

    setInterval(updateClock, 1000); // تحديث الساعة كل ثانية

    // تحديث العدادات عند التحميل
    counter.textContent = count;
    zikrElement.textContent = azkar[zikrCount % azkar.length];
    updatePercentage();

    counter.addEventListener('click', () => {
        count++;
        counter.textContent = count;
        updatePercentage();
        if (count % 10 === 0) {
            zikrCount++;
            zikrElement.textContent = azkar[zikrCount % azkar.length];
            showMotivationalQuote(zikrCount);
        }
    });

    resetButton.addEventListener('click', () => {
        count = 0;
        zikrCount = 0;
        counter.textContent = count;
        zikrElement.textContent = azkar[0];
        motivationalQuoteElement.textContent = ""; // إعادة تعيين العبارة التحفيزية
        updatePercentage(); // إعادة تعيين النسبة
    });

    saveButton.addEventListener('click', () => {
        localStorage.setItem('count', count);
        localStorage.setItem('zikrCount', zikrCount);
        alert('تم حفظ التقدم!');
    });

    nightModeToggle.addEventListener('change', () => {
        if (nightModeToggle.checked) {
            document.body.classList.add('night-mode');
        } else {
            document.body.classList.remove('night-mode');
        }
    });

    // تحقق من الوضع الليلي عند التحميل
    const now = new Date();
    const hours = now.getHours();
    if (hours >= 18 || hours < 6) {
        document.body.classList.add('night-mode');
        nightModeToggle.checked = true;
    } else {
        document.body.classList.remove('night-mode');
        nightModeToggle.checked = false;
    }
});