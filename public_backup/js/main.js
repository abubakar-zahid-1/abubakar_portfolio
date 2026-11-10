/**
 * Abubakar Z. Portfolio - Interactive Engine
 * Selfer Clone UX: Smooth Scroll, Animated Rotator, Counters, Filters & Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Scroll Effect & Active Link Spy
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section, header, #ts-hero');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  // 2. Animated Rotating Text for Hero Section
  const rotatingEl = document.getElementById('hero-rotating-text');
  if (rotatingEl) {
    const roles = [
      "Digital Marketing Executive",
      "Lead SEO & Organic Growth Strategist",
      "Performance Marketing Team Lead",
      "B2B Lead Generation Specialist",
      "AI Workflow & Automation Architect"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeEffect() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        rotatingEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        rotatingEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1800; // Pause at full text
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Brief pause before typing next
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // 3. Counter Animation (Odometer Effect)
  const counterElements = document.querySelectorAll('.counter-val');
  let countersStarted = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        counterElements.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const speed = target / 40; // smooth 40-step increment

          const updateCount = () => {
            count += speed;
            if (count < target) {
              counter.innerText = Math.ceil(count);
              setTimeout(updateCount, 35);
            } else {
              counter.innerText = target;
            }
          };
          updateCount();
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-strip');
  if (statsSection) {
    counterObserver.observe(statsSection);
  }

  // 4. Skills Progress Bar Animation
  const progressBars = document.querySelectorAll('.progress-fill');
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          bar.style.width = width + '%';
        });
      }
    });
  }, { threshold: 0.2 });

  const skillsSection = document.getElementById('my-skills');
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }

  // 5. Portfolio Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Testimonial Carousel Dots
  const testimonials = [
    {
      quote: "Abubakar's data-driven approach to SEO and lead generation significantly scaled our organic traffic and improved our client acquisition pipeline. His ability to execute technical audits and manage complex campaigns is exceptional.",
      author: "Management Team",
      role: "Keenly Digital"
    },
    {
      quote: "His lead generation strategies using Apollo and LinkedIn Sales Navigator brought in consistent, high-quality B2B prospects. The A/B email tests drastically brought down bounce rates and doubled our responses.",
      author: "Business Development Lead",
      role: "Employ Scout"
    },
    {
      quote: "Abubakar combines technical digital marketing with innovative problem solving—from building custom automation tools to optimizing WordPress workflows. He is a tremendous asset to any growth team.",
      author: "Growth Director",
      role: "East Hire"
    }
  ];

  let currentTestimonial = 0;
  const quoteEl = document.getElementById('testimonial-quote');
  const authorEl = document.getElementById('testimonial-author');
  const roleEl = document.getElementById('testimonial-role');
  const dots = document.querySelectorAll('.carousel-dot');

  function showTestimonial(index) {
    if (!quoteEl) return;
    currentTestimonial = index;
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });
    quoteEl.style.opacity = '0';
    setTimeout(() => {
      quoteEl.textContent = `"${testimonials[index].quote}"`;
      authorEl.textContent = testimonials[index].author;
      roleEl.textContent = testimonials[index].role;
      quoteEl.style.opacity = '1';
    }, 200);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = +dot.getAttribute('data-index');
      showTestimonial(idx);
    });
  });

  // Auto rotate testimonials every 6 seconds
  setInterval(() => {
    let next = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(next);
  }, 6000);

  // 7. Interactive Modal (Service & Project details)
  const modal = document.getElementById('detail-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');

  function openModal(title, html) {
    if (!modal) return;
    modalTitle.innerHTML = title;
    modalContent.innerHTML = html;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Service Card "Read More" click handlers
  window.servicesData = {
    'seo-growth': {
      title: 'SEO & Organic Growth',
      description: 'I manage comprehensive SEO campaigns designed to capture high-intent search visibility and drive revenue. By conducting meticulous competitor analysis, keyword intent clustering, and technical audit implementations, I have consistently driven 25-40% organic traffic surges across competitive niches.',
      deliverables: [
        'Complete Technical SEO Audits & Core Web Vitals Optimization',
        'Competitor Keyword Gap & Intent Mapping (Ahrefs, SEMrush)',
        'On-Page Optimization, Semantic Silos & Schema Architecture',
        'AEO (Answer Engine Optimization) & Entity Topical Authority',
        'Google Analytics 4 (GA4) & Search Console Performance Dashboards'
      ]
    },
    'b2b-lead-gen': {
      title: 'B2B Lead Generation & Outreach',
      description: 'End-to-end prospecting and outbound strategy. Using LinkedIn Sales Navigator, Apollo.io, SalesQL, and modern CRM pipelines, I build hyper-targeted prospect databases. With rigorous A/B tested copy, I have reduced bounce rates by 60-70% and improved response rates by 30-40%.',
      deliverables: [
        'High-Intent ICP & Prospect List Building (Apollo & SalesQL)',
        'LinkedIn Sales Navigator Outreach & Multi-Touch Cadences',
        'Cold Email Sequences with A/B Subject & Value-Proposition Testing',
        'Deliverability Optimization & Spam Protection (60-70% Bounce Drop)',
        'CRM Pipeline Setup, Lead Scoring & Opportunity Tracking'
      ]
    },
    'wordpress-ops': {
      title: 'WordPress Content Operations',
      description: 'Structuring, publishing, and scaling WordPress digital assets. From managing e-commerce product pages and taxonomies to structuring FAQs, interlinking hubs, and editorial workflows, I ensure seamless user experience and maximum crawl efficiency.',
      deliverables: [
        'Product Catalogues, Categories, Tags & Custom Fields Management',
        'Structured Schema Markup for Products & FAQ Rich Snippets',
        'Content Calendar Execution, Outlines & Editorial Quality SOPs',
        'Strategic Internal Link Siloing & Click-Depth Optimization',
        'Fast Page Speed & Mobile Responsiveness Tuning'
      ]
    },
    'ai-workflows': {
      title: 'AI-Powered Marketing Workflows',
      description: 'Custom AI prompt architectures and automated workflow pipelines. Leveraging Claude 3.7/3.5, ChatGPT, and Gemini to automate content brief generation, competitor intelligence analysis, data cleaning, and personalized outreach drafts at scale.',
      deliverables: [
        'Custom Prompt Engineering for High-Converting Copy',
        'Automated Content Brief Generation & SERP Analysis',
        'AI-Powered Prospect Enrichment & Data Formatting',
        'Accelerated Research & Market Intelligence Reports',
        'Prompt Libraries & Team Automation SOPs'
      ]
    },
    'community-marketing': {
      title: 'Brand Authority & Quora Marketing',
      description: 'Targeted presence on high-intent knowledge platforms like Quora and Reddit. Crafting expert-level, problem-solving answers that rank in Google search results, driving sustained 70-90% visibility increases and converting warm referral visitors into leads.',
      deliverables: [
        'High-Traffic Question Mining with Search Volume Intent',
        'Thought Leadership & Brand Storytelling Answers',
        'Strategic Anchor Links & Referral Funnel Construction',
        'Reputation Monitoring & Brand Sentiment Elevation',
        'Up to 80-90% Visibility & Reach Growth'
      ]
    },
    'automation-bots': {
      title: 'Marketing Automation & Custom Bots',
      description: 'Engineered customized automation solutions, including a multi-profile Quora interaction bot that mimics genuine human behavior (upvoting/downvoting) while bypassing Cloudflare bot protections—achieving zero API expenses and zero overhead for business campaigns.',
      deliverables: [
        'Cloudflare-Bypassing Automation Systems',
        'Multi-Profile Session & Cookie Management',
        'Zero-API-Cost Architectural Design',
        'Automated Data Scraping & Prospect Extraction',
        'Resilient, Headless Browser Scripting'
      ]
    }
  };

  document.querySelectorAll('.open-service-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceId = btn.getAttribute('data-service');
      const item = window.servicesData[serviceId];
      if (item) {
        let deliverablesHtml = item.deliverables.map(d => `<li>${d}</li>`).join('');
        const html = `
          <p style="font-size: 1.1rem; color: #cbd5e1; line-height: 1.7; margin-bottom: 1.5rem;">${item.description}</p>
          <h4 class="modal-section-title">Core Deliverables & Capabilities</h4>
          <ul class="modal-list">
            ${deliverablesHtml}
          </ul>
          <div style="margin-top: 2rem; text-align: right;">
            <a href="#contact" class="btn btn-primary" onclick="document.getElementById('modal-close').click();">Work With Abubakar On This</a>
          </div>
        `;
        openModal(item.title, html);
      }
    });
  });

  // Project Card Modal Details
  window.projectsData = {
    'cert-empire-seo': {
      title: 'Cert Empire & Cert Mage SEO Growth',
      category: 'SEO & Digital Marketing',
      image: 'assets/img/project-seo.svg',
      summary: 'Led end-to-end SEO strategy for Cert Empire and Cert Mage. Conducted comprehensive technical audits, resolved indexation bottlenecks, and crafted keyword targeting maps that boosted organic traffic by 40%.',
      impact: [
        '+40% Increase in qualified organic search traffic',
        'Achieved Top 3 positions for high-intent certification keywords',
        'Enhanced Core Web Vitals and eliminated technical crawl errors',
        'Implemented comprehensive schema markup for high-CTR snippets'
      ],
      tools: ['Ahrefs', 'SEMrush', 'GA4', 'Google Search Console', 'WordPress']
    },
    'it-staffing-leadgen': {
      title: 'IT & Staffing Client Outreach Pipeline',
      category: 'B2B Lead Generation',
      image: 'assets/img/project-leadgen.svg',
      summary: 'Spearheaded B2B outbound campaign pipelines for IT and staffing agency clients. Built hyper-targeted prospect lists with Apollo and SalesQL, running multi-touch A/B tested email sequences.',
      impact: [
        'Reduced email bounce rates by 60-70%',
        'Achieved 30-40% improvement in campaign conversion and open rates',
        'Built qualified database of 10,000+ targeted corporate decision makers',
        'Streamlined CRM pipeline workflows and lead response follow-ups'
      ],
      tools: ['Apollo.io', 'SalesQL', 'LinkedIn Sales Navigator', 'CRM Systems']
    },
    'quora-marketing-growth': {
      title: 'Quora Brand Authority & Referral Engine',
      category: 'Brand Authority & Community Marketing',
      image: 'assets/img/project-quora.svg',
      summary: 'Directed community knowledge marketing campaigns on Quora. Identified high-volume questions with strong search presence and authored in-depth, authoritative answers that established brand credibility.',
      impact: [
        'Boosted overall brand visibility and engagement by 70-90%',
        'Drove high-converting, targeted referral traffic directly to landing pages',
        'Ranked multiple answers on page 1 of Google search results',
        'Created sustained organic referral pipelines with zero ad spend'
      ],
      tools: ['Quora', 'Organic Content Strategy', 'Competitor Intelligence', 'GA4']
    },
    'quora-automation-bot': {
      title: 'Cloudflare-Bypass Quora Automation Bot',
      category: 'Automation & Bots',
      image: 'assets/img/project-bot.svg',
      summary: 'Engineered a specialized automation bot to manage multiple Quora profiles autonomously. It replicates organic human browsing patterns, manages cookies and sessions, and bypasses Cloudflare security without incurring third-party API costs.',
      impact: [
        'Completely automated upvoting and downvoting actions at human-like intervals',
        'Bypasses Cloudflare anti-bot verification silently and reliably',
        'Zero API costs and zero ongoing infrastructure expense for the company',
        'Multi-threaded profile rotation with proxy session isolation'
      ],
      tools: ['Python', 'Headless Automation', 'Anti-Detect Techniques', 'Session Management']
    },
    'wordpress-catalogue-ops': {
      title: 'WordPress Catalogue Operations & Architecture',
      category: 'Content Operations & CMS',
      image: 'assets/img/project-wordpress.svg',
      summary: 'Managed product catalogues, taxonomies, categories, tags, and FAQ rich snippets on high-traffic WordPress installations. Standardized content formatting SOPs for seamless indexing.',
      impact: [
        'Optimized structure across hundreds of product listings and categories',
        'Enabled rich search snippets resulting in measurable CTR improvements',
        'Formulated editorial checklists and content calendar workflows',
        'Reduced crawl depth for key commercial product pages'
      ],
      tools: ['WordPress', 'Schema Markup', 'RankMath/Yoast', 'HTML/CSS']
    },
    'ai-marketing-workflows': {
      title: 'Autonomous AI Marketing Workflows',
      category: 'AI & Workflows',
      image: 'assets/img/project-ai.svg',
      summary: 'Constructed automated marketing workflows by integrating state-of-the-art LLMs (Claude 3.7/3.5, ChatGPT, Gemini). Accelerated content brief generation, competitor intelligence, and prospect enrichment.',
      impact: [
        'Accelerated content outline production by 400%',
        'Built proprietary prompt templates for high-conversion copywriting',
        'Automated deep SERP keyword intent extraction and clustering',
        'Maximized team output and campaign velocity'
      ],
      tools: ['Claude 3.7/3.5', 'ChatGPT', 'Gemini', 'Advanced Prompt Engineering']
    }
  };

  document.querySelectorAll('.open-project-modal').forEach(card => {
    card.addEventListener('click', () => {
      const projId = card.getAttribute('data-project');
      const item = window.projectsData[projId];
      if (item) {
        const impacts = item.impact.map(i => `<li>${i}</li>`).join('');
        const tools = item.tools.map(t => `<span class="tool-tag">${t}</span>`).join('');
        const html = `
          <div class="modal-image">
            <img src="${item.image}" alt="${item.title}">
          </div>
          <p style="font-size: 1.1rem; color: #cbd5e1; line-height: 1.7; margin-bottom: 1.5rem;">${item.summary}</p>
          <h4 class="modal-section-title">Key Results & Achievements</h4>
          <ul class="modal-list">
            ${impacts}
          </ul>
          <h4 class="modal-section-title">Technologies & Tools Used</h4>
          <div class="project-tools-row" style="margin-top: 0.8rem;">
            ${tools}
          </div>
          <div style="margin-top: 2.2rem; text-align: right;">
            <a href="#contact" class="btn btn-primary" onclick="document.getElementById('modal-close').click();">Discuss Similar Campaign</a>
          </div>
        `;
        openModal(item.title, html);
      }
    });
  });

  // 8. Contact Form AJAX Submission
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showAlert('Please fill in all required fields (Name, Email, Message).', 'error');
        return;
      }

      // UI loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa fa-spinner fa-spin"></i> Sending Message...`;

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          showAlert(data.message || 'Message sent successfully! Abubakar will reply soon.', 'success');
          contactForm.reset();
        } else {
          showAlert(data.error || 'Failed to send message. Please try again.', 'error');
        }
      } catch (err) {
        console.error('Submission error:', err);
        showAlert('Network error. You can also reach Abubakar directly via WhatsApp or Email.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }

  function showAlert(msg, type) {
    if (!formAlert) return;
    formAlert.textContent = msg;
    formAlert.className = `form-alert ${type}`;
    formAlert.style.display = 'block';
    setTimeout(() => {
      formAlert.style.display = 'none';
    }, 8000);
  }

  // 9. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 10. Admin Inquiries Modal (View Inquiries)
  const adminBtn = document.getElementById('admin-inquiries-btn');
  async function showAdminInquiries() {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      
      if (!data.messages || data.messages.length === 0) {
        openModal("Contact Inquiries (Admin)", "<p>No messages received yet. Submit the contact form above to test!</p>");
        return;
      }

      let rows = data.messages.map(m => `
        <tr>
          <td><strong>${m.name}</strong><br><small style="color: #94a3b8;">${m.email}</small></td>
          <td>${m.subject}</td>
          <td>${m.message}</td>
          <td><small style="color: #94a3b8;">${new Date(m.receivedAt).toLocaleString()}</small></td>
        </tr>
      `).join('');

      const html = `
        <p style="color: #94a3b8; margin-bottom: 1rem;">Total Inquiries: <strong>${data.total}</strong></p>
        <div style="overflow-x: auto;">
          <table class="inquiries-table">
            <thead>
              <tr>
                <th>Sender</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      `;
      openModal("Received Contact Messages", html);
    } catch (err) {
      console.error(err);
      openModal("Error", "<p>Could not fetch inquiries.</p>");
    }
  }

  if (adminBtn) {
    adminBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showAdminInquiries();
    });
  }

  // Secret shortcut: Ctrl + Shift + M
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'M' || e.key === 'm')) {
      e.preventDefault();
      showAdminInquiries();
    }
  });
});
