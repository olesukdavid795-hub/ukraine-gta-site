// ================================
// SUPABASE
// ================================

const SUPABASE_URL = "https://mzkjpvqsobpodgtehrxu.supabase.co";

const SUPABASE_KEY = "ВСТАВ_СЮДИ_СВІЙ_PUBLISHABLE_КЛЮЧ";

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
// ПОЧАТКОВИЙ ЗАПУСК
// ================================

document.addEventListener("DOMContentLoaded", () => {

    showPage("home");

});
