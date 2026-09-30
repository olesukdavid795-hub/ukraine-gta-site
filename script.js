// ================================
// SUPABASE
// ================================

const SUPABASE_URL = "https://mzkjpvqsobpodgtehrxu.supabase.co";

const SUPABASE_KEY = "ВСТАВ_СЮДИ_СВІЙ_PUBLISHABLE_KEY";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ================================
// НАВІГАЦІЯ
// ================================

function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const page = document.getElementById(pageId);

    if (page) {
        page.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ================================
// РЕЄСТРАЦІЯ
// ================================

async function register() {

    const nickname =
        document.getElementById("registerNickname").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const password =
        document.getElementById("registerPassword").value;

    const message =
        document.getElementById("registerMessage");


    if (!nickname || !email || !password) {
        message.textContent = "Заповніть усі поля.";
        return;
    }


    if (password.length < 6) {
        message.textContent = "Пароль повинен містити мінімум 6 символів.";
        return;
    }


    message.textContent = "Реєстрація...";


    // Перевіряємо, чи зайнятий нік
    const { data: existingUser, error: checkError } =
        await supabaseClient
            .from("users")
            .select("id")
            .eq("nickname", nickname)
            .maybeSingle();


    if (checkError) {
        console.error(checkError);
        message.textContent = "Помилка перевірки нікнейму.";
        return;
    }


    if (existingUser) {
        message.textContent = "Такий нікнейм вже зайнятий.";
        return;
    }


    // Створюємо акаунт
    const { data, error } =
        await supabaseClient.auth.signUp({
            email: email,
            password: password
        });


    if (error) {
        console.error(error);
        message.textContent = error.message;
        return;
    }


    if (!data.user) {
        message.textContent = "Не вдалося створити акаунт.";
        return;
    }


    // Створюємо профіль
    const { error: profileError } =
        await supabaseClient
            .from("users")
            .insert({
                nickname: nickname
            });


    if (profileError) {
        console.error(profileError);
        message.textContent =
            "Акаунт створено, але профіль не створився.";
        return;
    }


    message.textContent =
        "Реєстрація успішна!";


    document.getElementById("registerNickname").value = "";
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPassword").value = "";
}


// ================================
// ПОЧАТКОВИЙ ЗАПУСК
// ================================

document.addEventListener("DOMContentLoaded", () => {

    showPage("home");

});
