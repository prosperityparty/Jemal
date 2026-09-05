/* =========================================
   JEMAL v2.0
   QARSA DUULA - SUPABASE DASHBOARD
========================================= */

const cfg = window.JEMAL_CONFIG || {};

const $ = (id) => document.getElementById(id);


/* =========================================
   HELPER: TEXT
========================================= */

function setText(id, value) {
  const element = $(id);

  if (element) {
    element.textContent = value ?? "—";
  }
}


/* =========================================
   FORMAT NUMBER
========================================= */

function formatNumber(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "0";
  }

  return number.toLocaleString("en-US");
}


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = $("menuBtn");
const navLinks = $("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}


/* =========================================
   WHATSAPP CONTACT FORM
========================================= */

const contactForm = $("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const name = $("name")?.value.trim() || "";
    const phone = $("phone")?.value.trim() || "";
    const message = $("message")?.value.trim() || "";

    if (!name || !phone || !message) {
      alert("Fadlan buuxi dhammaan meelaha loo baahan yahay.");
      return;
    }

    if (!cfg.whatsappNumber) {
      alert("WhatsApp number weli lama dejin.");
      return;
    }

    const text =
      `Jemal v2.0\n\n` +
      `Magac: ${name}\n` +
      `Telefoon: ${phone}\n` +
      `Fariin: ${message}`;

    const whatsappURL =
      `https://wa.me/${cfg.whatsappNumber}?text=` +
      encodeURIComponent(text);

    window.open(whatsappURL, "_blank");
  });
}


/* =========================================
   SUPABASE CONFIGURATION CHECK
========================================= */

function checkSupabaseConfig() {

  if (!cfg.supabaseUrl) {
    return false;
  }

  if (!cfg.supabaseUrl.startsWith("http")) {
    return false;
  }

  if (!cfg.supabaseKey) {
    return false;
  }

  if (cfg.supabaseKey.includes("PASTE_")) {
    return false;
  }

  return true;
}


/* =========================================
   LOAD QARSA DUULA SUMMARY
========================================= */

async function loadDashboard() {

  const status = $("status");

  /* Check configuration */

  if (!checkSupabaseConfig()) {

    setText(
      "status",
      "Supabase config weli lama gelin."
    );

    console.warn(
      "JEMAL_CONFIG: supabaseUrl ama supabaseKey lama dejin."
    );

    return;
  }


  /* Check Supabase library */

  if (!window.supabase) {

    setText(
      "status",
      "Supabase library lama helin."
    );

    console.error(
      "Supabase JavaScript library lama helin."
    );

    return;
  }


  try {

    /* Create Supabase client */

    const client = window.supabase.createClient(
      cfg.supabaseUrl,
      cfg.supabaseKey
    );


    /* =====================================
       READ qarsa_duula_summary
    ===================================== */

    const { data, error } = await client
      .from("qarsa_duula_summary")
      .select("*")
      .limit(1)
      .maybeSingle();


    if (error) {
      throw error;
    }


    if (!data) {

      setText(
        "status",
        "Qarsa Duula summary xog kama helin."
      );

      console.warn(
        "qarsa_duula_summary wuxuu soo celiyay xog la'aan."
      );

      return;
    }


    console.log(
      "Qarsa Duula Summary:",
      data
    );


    /* =====================================
       DATABASE COLUMNS
       
       xubnihii_hore
       xubnaha_cusub
       xubinsugaya
    ===================================== */

    const oldMembers =
      Number(data.xubnihii_hore) || 0;

    const newMembers =
      Number(data.xubnaha_cusub) || 0;

    const pendingMembers =
      Number(data.xubinsugaya) || 0;


    /* =====================================
       TOTAL CURRENT MEMBERS
       
       16,597 + 844 = 17,441
    ===================================== */

    const totalMembers =
      oldMembers + newMembers;


    /* =====================================
       UPDATE DASHBOARD
    ===================================== */

    setText(
      "members",
      formatNumber(totalMembers)
    );

    setText(
      "newMembers",
      formatNumber(newMembers)
    );

    setText(
      "pendingMembers",
      formatNumber(pendingMembers)
    );


    /* =====================================
       HERO SECTION
    ===================================== */

    setText(
      "heroMembers",
      formatNumber(totalMembers)
    );

    setText(
      "heroNew",
      formatNumber(newMembers)
    );


    /* =====================================
       OLD MEMBERS
    ===================================== */

    setText(
      "oldMembers",
      formatNumber(oldMembers)
    );


    /* =====================================
       STATUS
    ===================================== */

    setText(
      "heroUpdated",
      "Live"
    );

    setText(
      "status",
      "Xogta Supabase waa la helay."
    );


    /* =====================================
       OPTIONAL EXTRA FIELDS
       Haddii HTML-ku leeyahay
       elements-kan way shaqaynayaan.
    ===================================== */

    setText(
      "xubnihiiHore",
      formatNumber(oldMembers)
    );

    setText(
      "xubnahaCusub",
      formatNumber(newMembers)
    );

    setText(
      "xubinsugaya",
      formatNumber(pendingMembers)
    );

    setText(
      "totalMembers",
      formatNumber(totalMembers)
    );


    /* =====================================
       CONSOLE INFORMATION
    ===================================== */

    console.log(
      "Jemal v2.0 Dashboard Loaded Successfully"
    );

    console.log(
      "Xubnihii hore:",
      oldMembers
    );

    console.log(
      "Xubnaha cusub:",
      newMembers
    );

    console.log(
      "Xubinsugaya:",
      pendingMembers
    );

    console.log(
      "Xubnaha guud:",
      totalMembers
    );

  } catch (error) {

    console.error(
      "Supabase Error:",
      error
    );

    setText(
      "status",
      "Dashboard-ku wuu shaqaynayaa, laakiin xogta Supabase lama helin."
    );
  }
}


/* =========================================
   START DASHBOARD
========================================= */

if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    loadDashboard
  );

} else {

  loadDashboard();

}
