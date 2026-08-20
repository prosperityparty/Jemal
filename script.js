const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const active = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", active);
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}


// SUPABASE

const SUPABASE_URL =
  "https://enewahdrrcdepvpfwens.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_7GSTI5XHXGTfMMy6nTupKg_AA4CZChH";

const DASHBOARD_URL =
  `${SUPABASE_URL}/rest/v1/qarsa_duula_dashboard?select=*`;


async function loadDashboard() {

  try {

    const response = await fetch(
      DASHBOARD_URL,
      {
        headers: {
          "apikey": SUPABASE_PUBLISHABLE_KEY,
          "Authorization":
            `Bearer ${SUPABASE_PUBLISHABLE_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(
        `Supabase Error: ${response.status}`
      );
    }

    const data = await response.json();

    console.log("Dashboard:", data);

    if (!data.length) {
      console.warn("Dashboard data lama helin.");
      return;
    }

    const d = data[0];

    const qabaleHore =
      Number(d.qabale_hore || 0);

    const qabaleCusub =
      Number(d.qabale_cusub || 0);

    const qabaleWadarta =
      Number(d.qabale_wadarta || 0);

    const xubnihiiHore =
      Number(d.xubnihii_hore || 0);

    const xubnahaCusub =
      Number(d.xubnaha_cusub || 0);

    const xubinsugayaal =
      Number(d.xubinsugayaal || 0);

    const xubnahaWadarta =
      xubnihiiHore + xubnahaCusub;


    setValue("qabaleHore", qabaleHore);
    setValue("qabaleCusub", qabaleCusub);
    setValue("qabaleWadarta", qabaleWadarta);

    setValue("xubnihiiHore", xubnihiiHore);
    setValue("xubnahaCusub", xubnahaCusub);
    setValue("xubinsugayaal", xubinsugayaal);

    setValue("xubnahaWadarta", xubnahaWadarta);

  }

  catch (error) {

    console.error(
      "Dashboard error:",
      error
    );

  }
}


function setValue(id, value) {

  const element =
    document.getElementById(id);

  if (element) {
    element.textContent =
      Number(value).toLocaleString("en-US");
  }

}


// WHATSAPP CONTACT FORM

const contactForm =
  document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener(
    "submit",
    function(e) {

      e.preventDefault();

      const name =
        document.getElementById("name")
          .value.trim();

      const email =
        document.getElementById("email")
          .value.trim();

      const message =
        document.getElementById("message")
          .value.trim();

      const text =
        `Salaan Prosperity Party Kersadula District,\n\n` +
        `Magac: ${name}\n` +
        `Email: ${email}\n\n` +
        `Fariin:\n${message}`;

      const whatsappURL =
        `https://wa.me/251912957760?text=` +
        encodeURIComponent(text);

      window.open(
        whatsappURL,
        "_blank"
      );

    }
  );

}


// START

document.addEventListener(
  "DOMContentLoaded",
  () => {
    loadDashboard();
  }
);
