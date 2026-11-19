// ==============================================================================
// BRIGHT LINKS - CORPORATE CORE SCRIPT
// ==============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. STICKY NAVBAR ON SCROLL
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. MOBILE DRAWER TOGGLE
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const closeDrawer = document.querySelector('.close-drawer-btn');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeDrawer && mobileDrawer) {
    closeDrawer.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // 3. FAQ ACCORDION (EXPAND / COLLAPSE)
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-item-question');
    if (!question) return;

    question.addEventListener('click', (e) => {
      e.preventDefault();
      const isCurrentlyOpen = item.classList.contains('active') || item.classList.contains('open');

      // Close all items
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove('active');
        otherItem.classList.remove('open');
      });

      // If clicked item was not already open, open it
      if (!isCurrentlyOpen) {
        item.classList.add('active');
        item.classList.add('open');
      }
    });
  });

  // 4. SEARCH MODAL & DIRECTORY
  const searchModal = document.querySelector('.search-modal-backdrop');
  const searchTriggers = document.querySelectorAll('.search-trigger-btn');
  const closeSearch = document.querySelector('.close-search-modal');
  const searchInput = document.querySelector('.search-input-field');
  const searchHits = document.querySelector('.search-results-box');

  const siteDirectory = [
    { title: "Dubai Global Headquarters (Bright Links Electronics Trading)", url: "dubai.html", tag: "Trading, Import & Export" },
    { title: "United States (Bright Links USA)", url: "usa.html", tag: "E-Commerce Operations" },
    { title: "United Kingdom Branch (blinks Trading Limited)", url: "united-kingdom.html", tag: "Software, IT & Marketing" },
    { title: "Portugal Branch (Blinks Trading Unipessoal LDA)", url: "portugal.html", tag: "Software, IT & Marketing" },
    { title: "Pakistan Branch (Bright Links SMC-Private Ltd)", url: "pakistan.html", tag: "Documentation & Consultancy" },
    { title: "South Korea Operations (Bright Links Korea)", url: "korea.html", tag: "Electronics Import & Export" },
    { title: "Contact Us & Regional Offices", url: "contact.html", tag: "Inquiries & Support" },
    { title: "Schedule Consultation", url: "appointment.html", tag: "Corporate Appointments" },
    { title: "About Bright Links Overview", url: "index.html#about", tag: "Enterprise Profile" },
    { title: "Frequently Asked Questions (FAQs)", url: "index.html#faqs", tag: "Help & Answers" }
  ];

  if (searchTriggers.length && searchModal) {
    searchTriggers.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        searchModal.classList.add('open');
        setTimeout(() => searchInput?.focus(), 100);
      });
    });
  }

  if (closeSearch && searchModal) {
    closeSearch.addEventListener('click', () => {
      searchModal.classList.remove('open');
    });
  }

  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.classList.remove('open');
      }
    });
  }

  if (searchInput && searchHits) {
    const renderHits = (items) => {
      searchHits.innerHTML = '';
      if (items.length === 0) {
        searchHits.innerHTML = '<li style="padding: 16px; color: #64748b; text-align: center;">No matches found. Try "Dubai", "USA", "Korea", "Trading", "Software"...</li>';
        return;
      }
      items.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'search-hit-item';
        li.innerHTML = `
          <strong>${item.title}</strong>
          <span class="dropdown-branch-tag">${item.tag}</span>
        `;
        li.addEventListener('click', () => {
          window.location.href = item.url;
        });
        searchHits.appendChild(li);
      });
    };

    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        renderHits(siteDirectory);
      } else {
        const filtered = siteDirectory.filter(
          (i) => i.title.toLowerCase().includes(q) || i.tag.toLowerCase().includes(q)
        );
        renderHits(filtered);
      }
    });

    renderHits(siteDirectory);
  }

  // 5. COUNTRY CODE DROPDOWN PLACEHOLDER SYNC
  const countrySelects = document.querySelectorAll('select.country-code-select');
  countrySelects.forEach((sel) => {
    sel.addEventListener('change', () => {
      const form = sel.closest('form');
      const phoneInput = form?.querySelector('input[name="phone"]');
      if (!phoneInput) return;
      if (sel.value === 'other') {
        phoneInput.placeholder = 'Enter full number with country code (e.g. +...)';
        phoneInput.focus();
      } else {
        phoneInput.placeholder = '50 123 4567';
      }
    });
  });

  // 6. CONTACT FORMS HANDLER -> DIRECT ROUTE TO DUBAI HQ WHATSAPP (+971 52 299 4897)
  const contactForms = document.querySelectorAll('form.js-appointment-form');
  contactForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]')?.value.trim() || 'Valued Client';
      const email = form.querySelector('[name="email"]')?.value.trim() || 'Not provided';
      const countryCode = form.querySelector('[name="country_code"]')?.value.trim() || '+971';
      const phoneInput = form.querySelector('[name="phone"]')?.value.trim() || '';
      const branch = form.querySelector('[name="branch"]')?.value.trim() || 'Dubai Headquarters';
      const service = form.querySelector('[name="service"]')?.value.trim() || 'General Corporate Inquiry';
      const message = form.querySelector('[name="message"]')?.value.trim() || '';

      // Determine full phone number cleanly
      let fullPhone = phoneInput;
      if (phoneInput) {
        if (!phoneInput.startsWith('+') && countryCode && countryCode !== 'other') {
          fullPhone = `${countryCode} ${phoneInput}`;
        }
      } else {
        fullPhone = 'Not provided';
      }

      // Format Clean Plain Text Message (NO stars, NO emojis, NO lines, NO portal footer)
      const waMessage = 
`Full Name: ${name}
Email: ${email}
Phone: ${fullPhone}
Target Office: ${branch}
Service Focus: ${service}
Message: ${message ? message : 'N/A'}`;

      // Dubai HQ WhatsApp Number (+971 52 299 4897 -> 971522994897)
      const dubaiWhatsApp = '971522994897';
      const waUrl = `https://api.whatsapp.com/send?phone=${dubaiWhatsApp}&text=${encodeURIComponent(waMessage)}`;

      showToast(`Opening Dubai HQ WhatsApp (+971 52 299 4897)...`);

      // Open WhatsApp chat
      const win = window.open(waUrl, '_blank');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        setTimeout(() => {
          window.location.href = waUrl;
        }, 500);
      }

      form.reset();
    });
  });

  // 7. TOAST NOTIFICATION UTILITY
  window.showToast = function(msg) {
    const existing = document.querySelector('.toast-notice');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notice';
    toast.innerHTML = `
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <span>${msg}</span>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  };
});
