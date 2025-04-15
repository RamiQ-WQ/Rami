// متغيرات عامة
const hijriMonths = [
    "محرم", "صفر", "ربيع الأول", "ربيع الثاني", 
    "جمادى الأولى", "جمادى الآخرة", "رجب", 
    "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
];

const zodiacSigns = [
    { name: "الجدي", dateRange: "22 ديسمبر - 19 يناير", traits: "طموح، صبور، عملي" },
    { name: "الدلو", dateRange: "20 يناير - 18 فبراير", traits: "مبتكر، مستقلاً، إنساني" },
    { name: "الحوت", dateRange: "19 فبراير - 20 مارس", traits: "حدسي، عاطفي، فني" },
    { name: "الحمل", dateRange: "21 مارس - 19 أبريل", traits: "شجاع، متحمس، قيادي" },
    { name: "الثور", dateRange: "20 أبريل - 20 مايو", traits: "موثوق، صبور، عملي" },
    { name: "الجوزاء", dateRange: "21 مايو - 20 يونيو", traits: "اجتماعي، فضولي، متعدد المواهب" },
    { name: "السرطان", dateRange: "21 يونيو - 22 يوليو", traits: "عاطفي، حدسي، عائلي" },
    { name: "الأسد", dateRange: "23 يوليو - 22 أغسطس", traits: "كريم، واثق، مبدع" },
    { name: "العذراء", dateRange: "23 أغسطس - 22 سبتمبر", traits: "دقيق، عملي، ذكي" },
    { name: "الميزان", dateRange: "23 سبتمبر - 22 أكتوبر", traits: "دبلوماسي، عادل، اجتماعي" },
    { name: "العقرب", dateRange: "23 أكتوبر - 21 نوفمبر", traits: "شغوف، عاطفي، قوي" },
    { name: "القوس", dateRange: "22 نوفمبر - 21 ديسمبر", traits: "متفائل، مغامر، فلسفي" }
];

// وظائف عامة
function showResult(elementId, content) {
    const resultElement = document.getElementById(elementId);
    resultElement.innerHTML = content;
    resultElement.classList.add('show');
}

function convertToHijriDate(gregorianDate) {
    // هذه دالة مبسطة للتحويل، في التطبيق الحقيقي يجب استخدام مكتبة متخصصة
    const date = new Date(gregorianDate);
    const hijriYear = Math.floor((date.getFullYear() - 622) * (33 / 32));
    const hijriMonth = (date.getMonth() + 1) % 12;
    const hijriDay = date.getDate() % 30;
    
    return {
        year: hijriYear,
        month: hijriMonth,
        day: hijriDay,
        monthName: hijriMonths[hijriMonth - 1]
    };
}

function convertToGregorianDate(hijriDay, hijriMonth, hijriYear) {
    // هذه دالة مبسطة للتحويل، في التطبيق الحقيقي يجب استخدام مكتبة متخصصة
    const gregorianYear = Math.floor(hijriYear + 622 - (hijriYear / 33));
    const gregorianMonth = (hijriMonth % 12) + 1;
    const gregorianDay = hijriDay % 28;
    
    return new Date(gregorianYear, gregorianMonth - 1, gregorianDay);
}

function getZodiacSign(birthDate) {
    const date = new Date(birthDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return zodiacSigns[1]; // الدلو
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return zodiacSigns[2]; // الحوت
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return zodiacSigns[3]; // الحمل
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return zodiacSigns[4]; // الثور
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return zodiacSigns[5]; // الجوزاء
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return zodiacSigns[6]; // السرطان
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return zodiacSigns[7]; // الأسد
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return zodiacSigns[8]; // العذراء
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return zodiacSigns[9]; // الميزان
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return zodiacSigns[10]; // العقرب
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return zodiacSigns[11]; // القوس
    return zodiacSigns[0]; // الجدي
}

// حاسبات العمر
function calculateAge() {
    const birthDate = new Date(document.getElementById('birth-date-age').value);
    if (isNaN(birthDate.getTime())) {
        alert('الرجاء إدخال تاريخ ميلاد صحيح');
        return;
    }
    
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    
    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    const hijriBirthDate = convertToHijriDate(birthDate);
    const hijriToday = convertToHijriDate(today);
    let hijriYears = hijriToday.year - hijriBirthDate.year;
    let hijriMonthsDiff = hijriToday.month - hijriBirthDate.month;
    let hijriDaysDiff = hijriToday.day - hijriBirthDate.day;
    
    if (hijriDaysDiff < 0) {
        hijriMonthsDiff--;
        hijriDaysDiff += 30; // تقريباً الأشهر الهجرية 29 أو 30 يوماً
    }
    
    if (hijriMonthsDiff < 0) {
        hijriYears--;
        hijriMonthsDiff += 12;
    }
    
    const resultHTML = `
        <p><strong>العمر بالتقويم الميلادي:</strong> ${years} سنة، ${months} شهر، ${days} يوم</p>
        <p><strong>العمر بالتقويم الهجري:</strong> ${hijriYears} سنة، ${hijriMonthsDiff} شهر، ${hijriDaysDiff} يوم</p>
        <p><strong>تاريخ الميلاد الهجري:</strong> ${hijriBirthDate.day} ${hijriBirthDate.monthName} ${hijriBirthDate.year} هـ</p>
    `;
    
    showResult('age-result', resultHTML);
}

function calculateAgeDifference() {
    const birthDate1 = new Date(document.getElementById('birth-date-person1').value);
    const birthDate2 = new Date(document.getElementById('birth-date-person2').value);
    
    if (isNaN(birthDate1.getTime()) || isNaN(birthDate2.getTime())) {
        alert('الرجاء إدخال تاريخي ميلاد صحيحين');
        return;
    }
    
    let diff = Math.abs(birthDate2 - birthDate1);
    const diffDate = new Date(diff);
    const years = Math.abs(diffDate.getUTCFullYear() - 1970);
    const months = diffDate.getUTCMonth();
    const days = diffDate.getUTCDate() - 1;
    
    const hijriDate1 = convertToHijriDate(birthDate1);
    const hijriDate2 = convertToHijriDate(birthDate2);
    let hijriYearsDiff = Math.abs(hijriDate2.year - hijriDate1.year);
    let hijriMonthsDiff = Math.abs(hijriDate2.month - hijriDate1.month);
    let hijriDaysDiff = Math.abs(hijriDate2.day - hijriDate1.day);
    
    if (hijriDaysDiff < 0) {
        hijriMonthsDiff--;
        hijriDaysDiff += 30;
    }
    
    if (hijriMonthsDiff < 0) {
        hijriYearsDiff--;
        hijriMonthsDiff += 12;
    }
    
    const resultHTML = `
        <p><strong>فرق العمر بالتقويم الميلادي:</strong> ${years} سنة، ${months} شهر، ${days} يوم</p>
        <p><strong>فرق العمر بالتقويم الهجري:</strong> ${hijriYearsDiff} سنة، ${hijriMonthsDiff} شهر، ${hijriDaysDiff} يوم</p>
    `;
    
    showResult('age-difference-result', resultHTML);
}

function determineZodiac() {
    const birthDate = document.getElementById('birth-date-zodiac').value;
    if (!birthDate) {
        alert('الرجاء إدخال تاريخ ميلاد');
        return;
    }
    
    const zodiac = getZodiacSign(birthDate);
    const resultHTML = `
        <p><strong>برجك هو:</strong> ${zodiac.name}</p>
        <p><strong>فترة البرج:</strong> ${zodiac.dateRange}</p>
        <p><strong>صفات البرج:</strong> ${zodiac.traits}</p>
    `;
    
    showResult('zodiac-result', resultHTML);
}

// حاسبات التاريخ
function showTodayDate() {
    const today = new Date();
    const hijriDate = convertToHijriDate(today);
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const gregorianDateStr = today.toLocaleDateString('ar-EG', options);
    
    const resultHTML = `
        <p><strong>التاريخ الميلادي:</strong> ${gregorianDateStr}</p>
        <p><strong>التاريخ الهجري:</strong> ${hijriDate.day} ${hijriDate.monthName} ${hijriDate.year} هـ</p>
    `;
    
    showResult('today-date-result', resultHTML);
}

function showGregorianDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = today.toLocaleDateString('ar-EG', options);
    
    showResult('gregorian-date-result', `<p>${dateStr}</p>`);
}

function showHijriDate() {
    const today = new Date();
    const hijriDate = convertToHijriDate(today);
    
    const resultHTML = `
        <p>${hijriDate.day} ${hijriDate.monthName} ${hijriDate.year} هـ</p>
        <p>${hijriDate.day}/${hijriDate.month}/${hijriDate.year}</p>
    `;
    
    showResult('hijri-date-result', resultHTML);
}

function showYesterdayDate() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const hijriYesterday = convertToHijriDate(yesterday);
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const gregorianDateStr = yesterday.toLocaleDateString('ar-EG', options);
    
    const resultHTML = `
        <p><strong>التاريخ الميلادي:</strong> ${gregorianDateStr}</p>
        <p><strong>التاريخ الهجري:</strong> ${hijriYesterday.day} ${hijriYesterday.monthName} ${hijriYesterday.year} هـ</p>
    `;
    
    showResult('yesterday-date-result', resultHTML);
}

function showCurrentMonth() {
    const today = new Date();
    const hijriDate = convertToHijriDate(today);
    
    const gregorianMonth = today.toLocaleDateString('ar-EG', { month: 'long' });
    const hijriMonth = hijriDate.monthName;
    
    const gregorianDaysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const hijriDaysInMonth = 30; // تقريباً الأشهر الهجرية 29 أو 30 يوماً
    
    const resultHTML = `
        <p><strong>الشهر الميلادي:</strong> ${gregorianMonth} (${today.getMonth() + 1}) - ${gregorianDaysInMonth} يوم</p>
        <p><strong>الشهر الهجري:</strong> ${hijriMonth} (${hijriDate.month}) - حوالي ${hijriDaysInMonth} يوم</p>
    `;
    
    showResult('current-month-result', resultHTML);
}

function showGregorianMonth() {
    const today = new Date();
    const monthName = today.toLocaleDateString('ar-EG', { month: 'long' });
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    
    const resultHTML = `
        <p>${monthName} (الشهر ${today.getMonth() + 1})</p>
        <p>عدد الأيام: ${daysInMonth}</p>
    `;
    
    showResult('gregorian-month-result', resultHTML);
}

function showHijriMonth() {
    const today = new Date();
    const hijriDate = convertToHijriDate(today);
    
    const resultHTML = `
        <p>${hijriDate.monthName} (الشهر ${hijriDate.month})</p>
        <p>عدد الأيام: حوالي 30 يوم</p>
    `;
    
    showResult('hijri-month-result', resultHTML);
}

// محولات التاريخ
function convertToHijri() {
    const gregorianDate = document.getElementById('gregorian-date').value;
    if (!gregorianDate) {
        alert('الرجاء إدخال تاريخ ميلادي');
        return;
    }
    
    const hijriDate = convertToHijriDate(gregorianDate);
    const resultHTML = `
        <p>${hijriDate.day} ${hijriDate.monthName} ${hijriDate.year} هـ</p>
        <p>${hijriDate.day}/${hijriDate.month}/${hijriDate.year}</p>
    `;
    
    showResult('to-hijri-result', resultHTML);
}

function convertToGregorian() {
    const day = parseInt(document.getElementById('hijri-day').value);
    const month = parseInt(document.getElementById('hijri-month').value);
    const year = parseInt(document.getElementById('hijri-year').value);
    
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        alert('الرجاء إدخال تاريخ هجري صحيح');
        return;
    }
    
    const gregorianDate = convertToGregorianDate(day, month, year);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = gregorianDate.toLocaleDateString('ar-EG', options);
    
    showResult('to-gregorian-result', `<p>${dateStr}</p>`);
}

// حاسبات الوقت
function calculateGregorianDateDifference() {
    const startDate = new Date(document.getElementById('start-date-gregorian').value);
    const endDate = new Date(document.getElementById('end-date-gregorian').value);
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        alert('الرجاء إدخال تاريخين صحيحين');
        return;
    }
    
    let diff = Math.abs(endDate - startDate);
    const diffDate = new Date(diff);
    const years = Math.abs(diffDate.getUTCFullYear() - 1970);
    const months = diffDate.getUTCMonth();
    const days = diffDate.getUTCDate() - 1;
    
    const resultHTML = `
        <p>الفرق بين التاريخين: ${years} سنة، ${months} شهر، ${days} يوم</p>
        <p>إجمالي الأيام: ${Math.floor(diff / (1000 * 60 * 60 * 24))} يوم</p>
    `;
    
    showResult('gregorian-date-difference-result', resultHTML);
}

function calculateHijriDateDifference() {
    const startDay = parseInt(document.getElementById('start-date-hijri-day').value);
    const startMonth = parseInt(document.getElementById('start-date-hijri-month').value);
    const startYear = parseInt(document.getElementById('start-date-hijri-year').value);
    
    const endDay = parseInt(document.getElementById('end-date-hijri-day').value);
    const endMonth = parseInt(document.getElementById('end-date-hijri-month').value);
    const endYear = parseInt(document.getElementById('end-date-hijri-year').value);
    
    if (isNaN(startDay) || isNaN(startMonth) || isNaN(startYear) || 
        isNaN(endDay) || isNaN(endMonth) || isNaN(endYear)) {
        alert('الرجاء إدخال تاريخين هجريين صحيحين');
        return;
    }
    
    // حساب مبسط للفرق (في التطبيق الحقيقي يجب استخدام مكتبة متخصصة)
    let yearsDiff = Math.abs(endYear - startYear);
    let monthsDiff = Math.abs(endMonth - startMonth);
    let daysDiff = Math.abs(endDay - startDay);
    
    if (daysDiff < 0) {
        monthsDiff--;
        daysDiff += 30;
    }
    
    if (monthsDiff < 0) {
        yearsDiff--;
        monthsDiff += 12;
    }
    
    const totalDays = yearsDiff * 354 + monthsDiff * 29.5 + daysDiff;
    
    const resultHTML = `
        <p>الفرق بين التاريخين: ${yearsDiff} سنة، ${monthsDiff} شهر، ${daysDiff} يوم</p>
        <p>إجمالي الأيام: حوالي ${Math.floor(totalDays)} يوم</p>
    `;
    
    showResult('hijri-date-difference-result', resultHTML);
}

function calculateTimeDifference() {
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    
    if (!startTime || !endTime) {
        alert('الرجاء إدخال وقتين صحيحين');
        return;
    }
    
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    
    let diff = end - start;
    if (diff < 0) {
        diff += 24 * 60 * 60 * 1000; // إضافة 24 ساعة إذا كان الوقت الثاني في اليوم التالي
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const resultHTML = `
        <p>الفرق بين الوقتين: ${hours} ساعة، ${minutes} دقيقة، ${seconds} ثانية</p>
        <p>إجمالي الدقائق: ${Math.floor(diff / (1000 * 60))} دقيقة</p>
        <p>إجمالي الثواني: ${Math.floor(diff / 1000)} ثانية</p>
    `;
    
    showResult('time-difference-result', resultHTML);
}

function addDuration() {
    const startDatetime = document.getElementById('start-datetime-add').value;
    if (!startDatetime) {
        alert('الرجاء إدخال تاريخ ووقت أساسي');
        return;
    }
    
    const years = parseInt(document.getElementById('years-to-add').value) || 0;
    const months = parseInt(document.getElementById('months-to-add').value) || 0;
    const days = parseInt(document.getElementById('days-to-add').value) || 0;
    const hours = parseInt(document.getElementById('hours-to-add').value) || 0;
    const minutes = parseInt(document.getElementById('minutes-to-add').value) || 0;
    
    const date = new Date(startDatetime);
    date.setFullYear(date.getFullYear() + years);
    date.setMonth(date.getMonth() + months);
    date.setDate(date.getDate() + days);
    date.setHours(date.getHours() + hours);
    date.setMinutes(date.getMinutes() + minutes);
    
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    const dateStr = date.toLocaleDateString('ar-EG', options);
    showResult('add-duration-result', `<p>${dateStr}</p>`);
}

function subtractDuration() {
    const startDatetime = document.getElementById('start-datetime-subtract').value;
    if (!startDatetime) {
        alert('الرجاء إدخال تاريخ ووقت أساسي');
        return;
    }
    
    const years = parseInt(document.getElementById('years-to-subtract').value) || 0;
    const months = parseInt(document.getElementById('months-to-subtract').value) || 0;
    const days = parseInt(document.getElementById('days-to-subtract').value) || 0;
    const hours = parseInt(document.getElementById('hours-to-subtract').value) || 0;
    const minutes = parseInt(document.getElementById('minutes-to-subtract').value) || 0;
    
    const date = new Date(startDatetime);
    date.setFullYear(date.getFullYear() - years);
    date.setMonth(date.getMonth() - months);
    date.setDate(date.getDate() - days);
    date.setHours(date.getHours() - hours);
    date.setMinutes(date.getMinutes() - minutes);
    
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    const dateStr = date.toLocaleDateString('ar-EG', options);
    showResult('subtract-duration-result', `<p>${dateStr}</p>`);
}

function calculateDaysRemaining() {
    const targetDate = new Date(document.getElementById('target-date').value);
    if (isNaN(targetDate.getTime())) {
        alert('الرجاء إدخال تاريخ مستهدف صحيح');
        return;
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (targetDate < today) {
        alert('التاريخ المستهدف قد مضى بالفعل');
        return;
    }
    
    const diff = targetDate - today;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const targetDateStr = targetDate.toLocaleDateString('ar-EG', options);
    
    const resultHTML = `
        <p>عدد الأيام المتبقية حتى ${targetDateStr}:</p>
        <p class="highlight">${days} يوم</p>
    `;
    
    showResult('days-remaining-result', resultHTML);
}

// تبويبات المحول
function openTab(tabId) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.style.display = 'none';
    });
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    document.getElementById(tabId).style.display = 'block';
    event.currentTarget.classList.add('active');
}

// زر العودة للأعلى
window.addEventListener('scroll', function() {
    const backToTopButton = document.getElementById('back-to-top');
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

document.getElementById('back-to-top').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// التنقل السريع
document.querySelector('.quick-nav-btn').addEventListener('click', function() {
    const content = document.querySelector('.quick-nav-content');
    if (content.style.display === 'block') {
        content.style.display = 'none';
    } else {
        content.style.display = 'block';
    }
});

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تعيين التاريخ الحالي كقيمة افتراضية لحقول التاريخ
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('birth-date-age').max = today;
    document.getElementById('birth-date-person1').max = today;
    document.getElementById('birth-date-person2').max = today;
    document.getElementById('target-date').min = today;
    
    // فتح أول تبويب في المحول
    document.querySelector('.tab-content').style.display = 'block';
    document.querySelector('.tab-btn').classList.add('active');
});