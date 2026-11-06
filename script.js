window.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('cyberLoggedInUser');
    const savedTheme = localStorage.getItem('cyberThemeMode');
    const savedBackup = localStorage.getItem('cyberBackupEnabled');

    const backupSwitch = document.getElementById('backupToggleSwitch');
    if (savedBackup === 'false') {
        if (backupSwitch) backupSwitch.checked = false;
    } else {
        if (backupSwitch) backupSwitch.checked = true;
    }

    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        const themeSwitch = document.getElementById('themeToggleSwitch');
        if (themeSwitch) themeSwitch.checked = true;
    }

    if (savedUser && savedBackup !== 'false') {
        document.getElementById('authGate').style.display = 'none';
        const mainDashboard = document.getElementById('mainDashboard');
        mainDashboard.style.display = 'block';
        mainDashboard.classList.add('fade-in');
        
        const cleanName = savedUser.split('@')[0];
        document.getElementById('sidebarUserText').innerText = `المستخدم: ${cleanName}`;
        const usernameCell = document.getElementById('tableUsernameCell');
        if (usernameCell) usernameCell.innerText = cleanName;
    }
});

function handleLogin(event) {
    event.preventDefault();

    const emailInput = document.getElementById('emailInput').value.trim();
    const passwordInput = document.getElementById('passwordInput').value.trim();
    const errorDiv = document.getElementById('loginError');

    if (emailInput.toLowerCase().endsWith('@gmail.com') && passwordInput.length > 0) {
        errorDiv.style.display = 'none';

        const cleanName = emailInput.split('@')[0];
        localStorage.setItem('cyberLoggedInUser', cleanName);

        const authGate = document.getElementById('authGate');
        const mainDashboard = document.getElementById('mainDashboard');

        authGate.classList.add('fade-out');

        setTimeout(() => {
            authGate.style.display = 'none';
            mainDashboard.style.display = 'block';
            mainDashboard.classList.add('fade-in');
        }, 400);

        document.getElementById('sidebarUserText').innerText = `المستخدم: ${cleanName}`;
        const usernameCell = document.getElementById('tableUsernameCell');
        if (usernameCell) usernameCell.innerText = cleanName;
    } else {
        errorDiv.style.display = 'block';
    }
}

function handleLogout() {
    localStorage.removeItem('cyberLoggedInUser');

    const authGate = document.getElementById('authGate');
    const mainDashboard = document.getElementById('mainDashboard');

    mainDashboard.classList.remove('fade-in');
    mainDashboard.style.display = 'none';

    authGate.classList.remove('fade-out');
    authGate.style.display = 'flex';

    document.getElementById('emailInput').value = '';
    document.getElementById('passwordInput').value = '';
    document.getElementById('loginError').style.display = 'none';
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('passwordInput');
    passwordInput.type = (passwordInput.type === 'password') ? 'text' : 'password';
}

function toggleSidebar() {
    const sidebar = document.getElementById('cyberSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function toggleDropdown(btn) {
    btn.classList.toggle('active');
    const container = btn.nextElementSibling;
    if (container.style.maxHeight) {
        container.style.maxHeight = null;
    } else {
        container.style.maxHeight = container.scrollHeight + "px";
    }
}

function openGeneralSettings() {
    document.getElementById('generalSettingsModal').style.display = 'flex';
}
function closeGeneralSettings() {
    document.getElementById('generalSettingsModal').style.display = 'none';
}

function openUsersManagement() {
    document.getElementById('usersModal').style.display = 'flex';
}
function closeUsersManagement() {
    document.getElementById('usersModal').style.display = 'none';
}

function applyAndSaveSettings() {
    const themeSwitch = document.getElementById('themeToggleSwitch');
    const backupSwitch = document.getElementById('backupToggleSwitch');

    if (themeSwitch.checked) {
        document.body.classList.add('light-mode');
        localStorage.setItem('cyberThemeMode', 'light');
    } else {
        document.body.classList.remove('light-mode');
        localStorage.setItem('cyberThemeMode', 'dark');
    }

    if (backupSwitch.checked) {
        localStorage.setItem('cyberBackupEnabled', 'true');
    } else {
        localStorage.setItem('cyberBackupEnabled', 'false');
    }

    closeGeneralSettings();
}

function editCurrentActiveUser() {
    const currentCell = document.getElementById('tableUsernameCell');
    const currentName = currentCell.innerText;
    const newName = prompt("أدخل اسم المستخدم الجديد:", currentName);
    if (newName && newName.trim() !== "") {
        currentCell.innerText = newName.trim();
        localStorage.setItem('cyberLoggedInUser', newName.trim());
        document.getElementById('sidebarUserText').innerText = `المستخدم: ${newName.trim()}`;
        alert("تم تعديل وتحديث اسم المستخدم بنجاح!");
    }
}

let currentLang = 'ar';
const translations = {
    ar: {
        pageTitle: "نظام التوعية والتدريب في الأمن السيبراني",
        loginTitle: "تسجيل الدخول إلى النظام",
        loginSub: "الرجاء تسجيل الدخول للمتابعة إلى منصة الأمن السيبراني",
        emailLabel: "البريد الإلكتروني",
        passwordLabel: "كلمة المرور",
        errorMsg: "⚠️ عذراً، يجب أن ينتهي البريد الإلكتروني بـ @gmail.com",
        loginBtn: "دخول للمنصة 🚀",
        uni1: "وزارة التعليم العالي والبحث العلمي",
        uni2: "جامعة الفرات الأوسط التقنية",
        uni3: "كلية البوليتكنك - كربلاء",
        uni4: "قسم هندسة تكنولوجيا المعلومات",
        mainTitle: "نظام التوعية والتدريب في الأمن السيبراني",
        subTitle: "منصة رقمية تفاعلية لبناء الوعي الأمني والدفاع السيبراني",
        introHeading: "المقدمة",
        introText: "يأتي هذا المشروع كخطوة استراتيجية متقدمة في مجال أمن المعلومات وحماية البيانات الرقمية في ظل التطور المتسارع للهجمات السيبرانية واستهداف البنى التحتية والمؤسسات والأفراد. يهدف هذا النظام الأساسي إلى نشر ثقافة الوعي السيبراني الشامل، وتعزيز القدرات الدفاعية ضد التهديدات الإلكترونية المتنوعة مثل هجمات التصيد الاحتيالي، الهندسة الاجتماعية، البرمجيات الخبيثة، وأساليب الاختراق المتقدمة. كما يوفر النظام بيئة تعليمية وتدريبية تفاعلية ومحاكاة حية تُمكّن المستخدمين من اكتشاف الثغرات وتطبيق أفضل الممارسات العالمية في إدارة كلمات المرور وتأمين الحسابات الرقمية بكفاءة عالية، ليكون بمثابة حصن رقمي يسهم في بناء مجتمع واعٍ وقادر على مواجهة التحديات التكنولوجية المعاصرة بأمان تام.",
        modulesHeading: "📚 محاور النظام والوحدات التدريبية",
        sidebarTitle: "قائمة التنقل",
        menuHome: "🏠 الرئيسية ولوحة التحكم",
        menuSettings: "🔐 الإعدادات",
        menuGenSettings: "⚙️ الإعدادات العامة",
        menuUsers: "👥 إدارة المستخدمين",
        menuLogout: "🚪 تسجيل الخروج",
        settingsModalTitle: "⚙️ الإعدادات العامة للنظام",
        themeTitle: "الوضع الفاتح",
        themeDesc: "تفعيل المظهر الفاتح للمنصة",
        backupTitle: "النسخ الاحتياطي التلقائي",
        backupDesc: "حفظ جلسة الدخول وتخطي شاشة الدخول تلقائياً",
        saveBtn: "حفظ وإغلاق",
        closeBtn: "إغلاق",
        usersModalTitle: "👥 إدارة المستخدمين والصلاحيات",
        tableUser: "اسم المستخدم",
        tableStatus: "الحالة",
        tableAction: "الإجراء",
        activeStatus: "نشط",
        editBtn: "تعديل",
        supervisionLabel: "👨‍🏫 إشراف:",
        supervisorName: "م.م. حسن صلاح",
        studentsLabel: "👥 إعداد وتنفيذ الطلاب:",
        studentsNames: "علي محمد جبار | علي رحمن حسن | علي مرتضى عمار | غدير علاء حمزه | مؤمل سعدي عزيز",
        mod1Title: "أساسيات الأمن السيبراني",
        mod1Desc: "تعرف على المفاهيم الأساسية، التهديدات والمخاطر الإلكترونية وكيفية تجنبها للحد من الهجمات.",
        mod2Title: "كشف التصيد الاحتيالي",
        mod2Desc: "تمارين عملية لاكتشاف الرسائل المزيفة والروابط المشبوهة قبل الوقوع ضحية للهندسة الاجتماعية.",
        mod3Title: "كلمات المرور والمصادقة",
        mod3Desc: "تعلم كيفية إنشاء كلمات مرور معقدة وتفعيل المصادقة الثنائية (2FA) لحماية حساباتك الحساسة.",
        mod4Title: "البرمجيات الخبيثة وفيروسات الفدية",
        mod4Desc: "فهم آليات عمل الفيروسات المدمرة، ملفات التروجان، وكيفية حماية الأنظمة واستعادة البيانات.",
        mod5Title: "أمن الشبكات وحمايتها",
        mod5Desc: "دراسة جدران الحماية (Firewalls)، تأمين الاتصالات اللاسلكية، وكشف التسلل الرقمي المبكر.",
        mod6Title: "حماية البيانات",
        mod6Desc: "تصنيف المعلومات وحفظها ومشاركتها بصورة آمنة ومنع تسريبها.",
        mod7Title: "النسخ الاحتياطي",
        mod7Desc: "إعداد النسخ الاحتياطية واختبار استعادة البيانات لمواجهة الحالات الطارئة.",
        mod8Title: "أمن الأجهزة",
        mod8Desc: "التحديثات الأمنية ومكافحة البرمجيات الخبيثة وتأمين الأجهزة الشخصية.",
        mod9Title: "الذكاء الاصطناعي والأمن السيبراني",
        mod9Desc: "حماية البيانات عند استخدام أدوات الذكاء الاصطناعي والتعامل مع تقنياته.",
        mod10Title: "الاستجابة للحوادث",
        mod10Desc: "الإبلاغ عن الحوادث الأمنية والتعامل معها بالطرق الصحيحة.",
        mod11Title: "الأمن السيبراني في بيئة العمل",
        mod11Desc: "الالتزام بالسياسات والتعليمات الأمنية المؤسسية بحرفية عالية.",
        footerText: "جميع حقوق الطبع والنشر محفوظة © 2027 | نظام التوعية والتدريب في الأمن السيبراني"
    },
    en: {
        pageTitle: "Cybersecurity Awareness and Training System",
        loginTitle: "System Login",
        loginSub: "Please log in to continue to the Cybersecurity Platform",
        emailLabel: "Email Address",
        passwordLabel: "Password",
        errorMsg: "⚠️ Sorry, the email must end with @gmail.com",
        loginBtn: "Login to Platform 🚀",
        uni1: "Ministry of Higher Education and Scientific Research",
        uni2: "Al-Furat Al-Awsat Technical University",
        uni3: "Polytechnic College - Karbala",
        uni4: "Information Technology Engineering Department",
        mainTitle: "Cybersecurity Awareness and Training System",
        subTitle: "An interactive digital platform for building security awareness and cyber defense",
        introHeading: "Introduction",
        introText: "This project serves as an advanced strategic step in information security and digital data protection amid the rapid evolution of cyberattacks targeting infrastructure, institutions, and individuals.",
        modulesHeading: "📚 System Modules and Training Units",
        sidebarTitle: "Navigation Menu",
        menuHome: "🏠 Home & Dashboard",
        menuSettings: "🔐 Settings",
        menuGenSettings: "⚙️ General Settings",
        menuUsers: "👥 Users Management",
        menuLogout: "🚪 Logout",
        settingsModalTitle: "⚙️ System General Settings",
        themeTitle: "Light Mode",
        themeDesc: "Enable light appearance for the platform",
        backupTitle: "Automatic Backup",
        backupDesc: "Save login session and skip login screen automatically",
        saveBtn: "Save & Close",
        closeBtn: "Close",
        usersModalTitle: "👥 Users Management & Permissions",
        tableUser: "Username",
        tableStatus: "Status",
        tableAction: "Action",
        activeStatus: "Active",
        editBtn: "Edit",
        supervisionLabel: "👨‍🏫 Supervision:",
        supervisorName: "M.M. Hassan Salah",
        studentsLabel: "👥 Prepared by Students:",
        studentsNames: "Ali Mohammed Gabbar | Ali Rahman Hassan | Ali Murtadha Ammar | Ghadeer Alaa Hamzah | Muallem Saadi Aziz",
        mod1Title: "Cybersecurity Basics",
        mod1Desc: "Learn core concepts, cyber threats, and risks and how to avoid them to minimize attacks.",
        mod2Title: "Phishing Detection",
        mod2Desc: "Practical exercises to detect fake messages and suspicious links before falling victim.",
        mod3Title: "Passwords and Authentication",
        mod3Desc: "Learn how to create strong passwords and enable 2FA to protect sensitive accounts.",
        mod4Title: "Malware and Ransomware",
        mod4Desc: "Understand destructive virus mechanisms, trojans, and how to protect systems.",
        mod5Title: "Network Security",
        mod5Desc: "Study firewalls, secure wireless communications, and detect early digital intrusion.",
        mod6Title: "Data Protection",
        mod6Desc: "Classify, store, and securely share information to prevent leaks.",
        mod7Title: "Backup",
        mod7Desc: "Set up backups and test data recovery for emergencies.",
        mod8Title: "Device Security",
        mod8Desc: "Security updates, anti-malware, and securing personal devices.",
        mod9Title: "AI & Cybersecurity",
        mod9Desc: "Protecting data while utilizing AI tools and technologies.",
        mod10Title: "Incident Response",
        mod10Desc: "Reporting security incidents and handling them correctly.",
        mod11Title: "Cybersecurity in the Workplace",
        mod11Desc: "Adhering strictly to institutional security policies and instructions.",
        footerText: "All Copyrights Reserved © 2027 | Cybersecurity Awareness & Training System"
    }
};

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    const htmlRoot = document.getElementById('htmlRoot');
    htmlRoot.setAttribute('lang', currentLang);
    htmlRoot.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerText = translations[currentLang][key];
        }
    });
}