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
/**
 * حساب الفرق بين تاريخين بطريقة دقيقة
 */
function calculateDateDifference() {
    // الحصول على قيم التواريخ من حقول الإدخال
    const firstDateInput = document.getElementById('first-date').value;
    const secondDateInput = document.getElementById('second-date').value;
    
    // التحقق من وجود قيم مدخلة
    if (!firstDateInput || !secondDateInput) {
        document.getElementById('date-difference-result').innerHTML = 
            '<div class="alert alert-warning">الرجاء إدخال التاريخين</div>';
        return;
    }
    
    // تحويل القيم إلى كائنات تاريخ
    const firstDate = new Date(firstDateInput);
    const secondDate = new Date(secondDateInput);
    
    // التأكد من صحة التواريخ
    if (isNaN(firstDate.getTime()) || isNaN(secondDate.getTime())) {
        document.getElementById('date-difference-result').innerHTML = 
            '<div class="alert alert-warning">الرجاء إدخال تاريخين صحيحين</div>';
        return;
    }
    
    // تحديد التاريخ الأقدم والأحدث
    let startDate, endDate, isFlipped = false;
    
    if (firstDate > secondDate) {
        startDate = new Date(secondDate);
        endDate = new Date(firstDate);
        isFlipped = true;
    } else {
        startDate = new Date(firstDate);
        endDate = new Date(secondDate);
    }
    
    // حساب الفرق بالأيام للعرض
    const diffTime = Math.abs(endDate - startDate);
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // حساب السنوات والأشهر والأيام
    let years = 0;
    let months = 0;
    let days = 0;
    
    // حساب دقيق للسنوات والأشهر والأيام
    const tempDate = new Date(startDate);
    
    // حساب السنوات
    while (tempDate.getTime() <= endDate.getTime()) {
        tempDate.setFullYear(tempDate.getFullYear() + 1);
        if (tempDate.getTime() <= endDate.getTime()) {
            years++;
        } else {
            tempDate.setFullYear(tempDate.getFullYear() - 1);
            break;
        }
    }
    
    // حساب الأشهر
    while (tempDate.getTime() <= endDate.getTime()) {
        tempDate.setMonth(tempDate.getMonth() + 1);
        if (tempDate.getTime() <= endDate.getTime()) {
            months++;
        } else {
            tempDate.setMonth(tempDate.getMonth() - 1);
            break;
        }
    }
    
    // حساب الأيام
    while (tempDate.getTime() <= endDate.getTime()) {
        tempDate.setDate(tempDate.getDate() + 1);
        if (tempDate.getTime() <= endDate.getTime()) {
            days++;
        } else {
            break;
        }
    }
    
    // تحويل الأشهر إلى سنوات إذا كان عدد الأشهر 12 أو أكثر
    if (months >= 12) {
        const additionalYears = Math.floor(months / 12);
        years += additionalYears;
        months %= 12;
    }
    
    // عرض النتيجة
    let result = '<div class="result-box">';
    
    if (isFlipped) {
        result += '<div class="alert alert-info">ملاحظة: تم عكس التواريخ لأن التاريخ الأول أحدث من التاريخ الثاني</div>';
    }
    
    result += '<p>الفرق بين التاريخين هو:</p>';
    result += `<div class="big-result">${years} سنة، ${months} شهر، ${days} يوم</div>`;
    result += `<p>إجمالي عدد الأيام: ${totalDays} يوم</p>`;
    result += '</div>';
    
    document.getElementById('date-difference-result').innerHTML = result;
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

// ==================== حاسبات جديدة ====================

// حاسبة مؤشر كتلة الجسم (BMI)
function calculateBMI() {
    const heightInput = parseFloat(document.getElementById('height-bmi').value);
    const weight = parseFloat(document.getElementById('weight-bmi').value);
    
    // More comprehensive validation
    if (isNaN(heightInput) || isNaN(weight) || heightInput <= 0 || weight <= 0) {
        alert('الرجاء إدخال طول ووزن صحيحين (أرقام أكبر من الصفر)');
        return;
    }
    
    const height = heightInput / 100; // Convert cm to meters
    const bmiValue = weight / (height * height);
    const bmi = bmiValue.toFixed(1);
    
    let category = '';
    
    if (bmiValue < 18.5) {
        category = 'نقص في الوزن';
    } else if (bmiValue < 25) {
        category = 'وزن طبيعي';
    } else if (bmiValue < 30) {
        category = 'زيادة في الوزن';
    } else {
        category = 'سمنة';
    }
    
    const resultHTML = `
        <p><strong>مؤشر كتلة الجسم:</strong> ${bmi}</p>
        <p><strong>التصنيف:</strong> ${category}</p>
        <div class="bmi-scale">
            <div class="bmi-range ${bmiValue < 18.5 ? 'active' : ''}">نقص وزن (<18.5)</div>
            <div class="bmi-range ${bmiValue >= 18.5 && bmiValue < 25 ? 'active' : ''}">طبيعي (18.5-24.9)</div>
            <div class="bmi-range ${bmiValue >= 25 && bmiValue < 30 ? 'active' : ''}">زيادة وزن (25-29.9)</div>
            <div class="bmi-range ${bmiValue >= 30 ? 'active' : ''}">سمنة (≥30)</div>
        </div>
    `;
    
    // Make sure this function exists and works as expected
    showResult('bmi-result', resultHTML);
}

// محول الوزن (كجم ←→ رطل)
function convertWeight() {
    const weight = parseFloat(document.getElementById('weight-value').value);
    const unit = document.getElementById('weight-unit').value;
    
    if (isNaN(weight) || weight <= 0) {
        alert('الرجاء إدخال وزن صحيح');
        return;
    }
    
    let result;
    if (unit === 'kg') {
        const pounds = (weight * 2.20462).toFixed(2);
        result = `${pounds} رطل`;
    } else {
        const kilograms = (weight / 2.20462).toFixed(2);
        result = `${kilograms} كيلوجرام`;
    }
    
    showResult('weight-result', `<p>الوزن المحول: ${result}</p>`);
}

// محول الطول (قدم ←→ سم)
function convertHeight() {
    const height = parseFloat(document.getElementById('height-value').value);
    const unit = document.getElementById('height-unit').value;
    
    if (isNaN(height) || height <= 0) {
        alert('الرجاء إدخال طول صحيح');
        return;
    }
    
    let result;
    if (unit === 'cm') {
        const totalInches = height / 2.54;
        const feet = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        result = `${feet} قدم و ${inches} بوصة`;
    } else {
        const centimeters = (height * 30.48).toFixed(2);
        result = `${centimeters} سم`;
    }
    
    showResult('height-result', `<p>الطول المحول: ${result}</p>`);
}

// حاسبة المعدل التراكمي
function addGradeField() {
    const container = document.getElementById('grade-inputs');
    const newRow = document.createElement('div');
    newRow.className = 'grade-row';
    newRow.innerHTML = `
        <input type="text" class="course-name" placeholder="اسم المادة">
        <input type="number" class="course-grade" placeholder="الدرجة (0-100)" min="0" max="100">
        <input type="number" class="course-hours" placeholder="عدد الساعات" min="1">
        <button class="remove-btn" onclick="removeGradeField(this)"><i class="fas fa-times"></i></button>
    `;
    container.appendChild(newRow);
}

function removeGradeField(button) {
    const row = button.parentElement;
    row.remove();
}

function calculateGPA() {
    const rows = document.querySelectorAll('.grade-row');
    let totalPoints = 0;
    let totalHours = 0;
    let allValid = true;
    
    rows.forEach(row => {
        const grade = parseFloat(row.querySelector('.course-grade').value);
        const hours = parseFloat(row.querySelector('.course-hours').value);
        const name = row.querySelector('.course-name').value.trim();
        
        if (isNaN(grade) || isNaN(hours) || name === '' || grade < 0 || grade > 100 || hours < 1) {
            allValid = false;
            row.style.border = '1px solid red';
        } else {
            row.style.border = '';
            const points = calculateGradePoints(grade) * hours;
            totalPoints += points;
            totalHours += hours;
        }
    });
    
    if (!allValid || rows.length === 0) {
        alert('الرجاء إدخال بيانات صحيحة لكل المواد');
        return;
    }
    
    const gpa = (totalPoints / totalHours).toFixed(2);
    const percentage = ((gpa / 4) * 100).toFixed(2);
    
    const resultHTML = `
        <p><strong>المعدل التراكمي:</strong> ${gpa} من 4.00</p>
        <p><strong>النسبة المئوية:</strong> ${percentage}%</p>
        <p><strong>عدد المواد:</strong> ${rows.length}</p>
        <p><strong>إجمالي الساعات:</strong> ${totalHours}</p>
    `;
    
    showResult('gpa-result', resultHTML);
}

function calculateGradePoints(grade) {
    if (grade >= 90) return 4.0;
    if (grade >= 85) return 3.7;
    if (grade >= 80) return 3.3;
    if (grade >= 75) return 3.0;
    if (grade >= 70) return 2.7;
    if (grade >= 65) return 2.3;
    if (grade >= 60) return 2.0;
    if (grade >= 55) return 1.7;
    if (grade >= 50) return 1.0;
    return 0;
}

// حاسبة معدل التحصيل النهائي
function calculateFinalGrade() {
    const currentAverage = parseFloat(document.getElementById('current-average').value);
    const currentHours = parseFloat(document.getElementById('current-hours').value);
    const expectedGrades = document.getElementById('expected-grades').value;
    const newHours = parseFloat(document.getElementById('new-hours').value);
    
    if (isNaN(currentAverage) || isNaN(currentHours) || isNaN(newHours) || 
        currentAverage < 0 || currentAverage > 100 || currentHours < 1 || newHours < 1) {
        alert('الرجاء إدخال بيانات صحيحة');
        return;
    }
    
    const gradesArray = expectedGrades.split(',').map(grade => parseFloat(grade.trim())).filter(grade => !isNaN(grade));
    if (gradesArray.length === 0) {
        alert('الرجاء إدخال درجات متوقعة صحيحة');
        return;
    }
    
    const expectedAverage = gradesArray.reduce((sum, grade) => sum + grade, 0) / gradesArray.length;
    const totalHours = currentHours + newHours;
    const finalAverage = ((currentAverage * currentHours) + (expectedAverage * newHours)) / totalHours;
    
    const resultHTML = `
        <p><strong>المعدل الحالي:</strong> ${currentAverage.toFixed(2)}%</p>
        <p><strong>المعدل المتوقع:</strong> ${expectedAverage.toFixed(2)}%</p>
        <p><strong>المعدل النهائي المتوقع:</strong> <span class="highlight">${finalAverage.toFixed(2)}%</span></p>
        <p><strong>عدد الساعات المنجزة:</strong> ${currentHours}</p>
        <p><strong>عدد الساعات الجديدة:</strong> ${newHours}</p>
        <p><strong>إجمالي الساعات:</strong> ${totalHours}</p>
    `;
    
    showResult('final-grade-result', resultHTML);
}

// ==================== الوظائف الحالية ====================

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
    
    // إضافة أول صف للمواد في حاسبة المعدل التراكمي
    addGradeField();
});