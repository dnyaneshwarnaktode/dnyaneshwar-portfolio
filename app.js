// Portfolio JavaScript - GitHub Theme (Fixed Version)
class Portfolio {
  constructor() {
    this.init();
  }

  init() {
    this.initNavigation();
    this.initTypingAnimation();
    this.initScrollAnimations();
    this.initProjectFilters();
    this.initContactForm();
    this.initResumeActions();
    this.initSkillAnimations();
    this.initSmoothScroll();
    this.initActiveNavigation();
    this.initHeroButtons();
  }

  // Navigation functionality (Fixed)
  initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('show');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-bars');
          icon.classList.toggle('fa-times');
        }
      });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        if (navMenu) {
          navMenu.classList.remove('show');
        }
        const icon = navToggle?.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu && navToggle && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('show');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      }
    });
  }

  // Initialize hero buttons (Fixed)
  initHeroButtons() {
    const viewProjectsBtn = document.querySelector('a[href="#projects"]');
    const downloadResumeBtn = document.querySelector('a[href="#resume"]');
    const contactBtn = document.querySelector('a[href="#contact"]');

    // Ensure all hero buttons work with smooth scrolling
    [viewProjectsBtn, downloadResumeBtn, contactBtn].forEach(btn => {
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = btn.getAttribute('href').substring(1);
          this.scrollToSection(targetId);
        });
      }
    });
  }

  // Smooth scrolling (Fixed)
  initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          const targetId = href.substring(1);
          this.scrollToSection(targetId);
        }
      });
    });
  }

  // Scroll to section helper (Fixed)
  scrollToSection(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
      const offsetTop = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }

  // Typing animation for hero section
  initTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    if (!typingElement) return;

    const text = 'Full Stack Developer & Open Source Contributor';
    let index = 0;
    
    // Clear the text first
    typingElement.textContent = '';
    typingElement.classList.remove('typing-animation');

    const typeWriter = () => {
      if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
      } else {
        // Add blinking cursor after typing is complete
        setTimeout(() => {
          typingElement.style.borderRight = '2px solid var(--color-primary)';
          typingElement.style.animation = 'blink-caret 0.75s step-end infinite';
        }, 500);
      }
    };

    // Start typing animation after a short delay
    setTimeout(typeWriter, 1000);
  }

  // Scroll animations using Intersection Observer
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // Special animations for different elements
          if (entry.target.classList.contains('skill__item')) {
            entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
            entry.target.classList.add('animate-in');
          }
          
          if (entry.target.classList.contains('project__card')) {
            const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
            entry.target.style.animationDelay = `${index * 0.1}s`;
            entry.target.classList.add('animate-in');
          }
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
      '.about__detail-item, .skill__item, .project__card, .contact__info, .contact__form'
    );

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s ease';
      observer.observe(el);
    });
  }

  // Project filtering functionality
  initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter__btn');
    const projectCards = document.querySelectorAll('.project__card');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects with animation
        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category').split(' ');
          
          if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });

    // Add click handlers for project cards (modal functionality)
    projectCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't trigger if clicking on links
        if (e.target.closest('.project__link')) return;
        
        this.openProjectModal(card);
      });
    });
  }

  // Open project modal
  openProjectModal(card) {
    const modal = document.getElementById('project-modal');
    const title = card.querySelector('.project__title').textContent;
    const description = card.querySelector('.project__description').textContent;
    const techStack = Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent);
    const links = card.querySelectorAll('.project__link');

    // Populate modal content
    modal.querySelector('.modal__title').textContent = title;
    modal.querySelector('.modal__description').textContent = description;
    
    const techStackContainer = modal.querySelector('.modal__tech-stack');
    techStackContainer.innerHTML = techStack.map(tech => 
      `<span class="tech-tag">${tech}</span>`
    ).join('');

    const linksContainer = modal.querySelector('.modal__links');
    linksContainer.innerHTML = '';
    links.forEach(link => {
      const clonedLink = link.cloneNode(true);
      linksContainer.appendChild(clonedLink);
    });

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Close modal functionality
    const closeModal = () => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    };

    modal.querySelector('.modal__close').onclick = closeModal;
    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };

    document.addEventListener('keydown', function escapeHandler(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escapeHandler);
      }
    });
  }

  // Contact form handling (Fixed)
  initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Show loading state
      btnText.classList.add('hidden');
      btnLoader.classList.remove('hidden');
      submitBtn.disabled = true;

      // Get form data
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      // Validate form
      if (!this.validateForm(data)) {
        this.resetSubmitButton(btnText, btnLoader, submitBtn);
        return;
      }

      try {
        // Simulate form submission
        await this.simulateFormSubmission(data);
        
        // Show success message
        this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
      } catch (error) {
        // Show error message
        this.showNotification('Failed to send message. Please try again or contact me directly.', 'error');
        console.error('Form submission error:', error);
      } finally {
        this.resetSubmitButton(btnText, btnLoader, submitBtn);
      }
    });
  }

  // Form validation
  validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.name.trim()) {
      this.showNotification('Please enter your name.', 'error');
      return false;
    }
    
    if (!emailRegex.test(data.email)) {
      this.showNotification('Please enter a valid email address.', 'error');
      return false;
    }
    
    if (!data.message.trim() || data.message.length < 10) {
      this.showNotification('Please enter a message (at least 10 characters).', 'error');
      return false;
    }
    
    return true;
  }

  // Simulate form submission (Fixed)
  simulateFormSubmission(data) {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        // Log form data (in real app, this would be sent to a server)
        console.log('Form submitted:', data);
        resolve(); // Always resolve for demo purposes
      }, 2000);
    });
  }

  // Reset submit button state
  resetSubmitButton(btnText, btnLoader, submitBtn) {
    btnText.classList.remove('hidden');
    btnLoader.classList.add('hidden');
    submitBtn.disabled = false;
  }

  // Show notification (Enhanced)
  showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 90px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 400px;
      word-wrap: break-word;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;

    // Set background color based on type
    const colors = {
      success: '#1f883d',
      error: '#f85149',
      info: '#0969da',
      warning: '#fb8500'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 5000);

    // Click to dismiss
    notification.addEventListener('click', () => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    });
  }

  // Resume actions (Fixed)
  initResumeActions() {
    const downloadBtn = document.getElementById('download-resume');
    const viewBtn = document.getElementById('view-resume');

    downloadBtn?.addEventListener('click', (e) => {
      this.showNotification('Resume download started!', 'success');
      
      console.log('Downloading resume...');
    });

    viewBtn?.addEventListener('click', () => {
      this.showNotification('Opening resume preview...', 'info');      
      
      console.log('Opening resume preview...');
      this.showResumePreview();

    });
   }
showResumePreview() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.display = 'block';
  modal.innerHTML = `
    <div class="modal__content" style="max-width: 800px; padding: 1rem;">
      <span class="modal__close">&times;</span>
      <div class="modal__body">
        <h2 style="text-align: center; margin-bottom: 1rem;">Resume Preview</h2>
        <iframe src="assets/files/Dnyaneshwar_Resume.pdf" style="width:100%; height:500px;" frameborder="0"></iframe>
        <div style="text-align:center; margin-top: 1rem;">
          <a href="assets/files/Dnyaneshwar_Resume.pdf" download class="btn btn--primary">
            <i class="fas fa-download"></i> Download Resume
          </a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  const closeModal = () => {
    modal.remove();
    document.body.style.overflow = 'auto';
  };

  modal.querySelector('.modal__close').onclick = closeModal;
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };
  document.addEventListener('keydown', function escapeHandler(e) {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escapeHandler);
    }
  });
}

  // Show resume preview (New)
  // showResumePreview() {
  //   const modal = document.createElement('div');
  //   modal.className = 'modal';
  //   modal.style.display = 'block';
  //   modal.innerHTML = `
  //     <div class="modal__content" style="max-width: 800px; padding:1rem">
  //       <span class="modal__close">&times;</span>
  //       <div class="modal__body">
  //         <h2 style="text-align: center; margin-bottom: 1rem; color: var(--color-text);">Resume Preview</h2>
  //         <div style="background: var(--color-background); padding: 2rem; border-radius: 8px; border: 1px solid var(--color-border);">
  //           <div style="text-align: center; margin-bottom: 2rem;">
  //             <h1 style="color: var(--color-primary); margin-bottom: 0.5rem;">Your Name</h1>
  //             <p style="color: var(--color-text-secondary); margin: 0;">Full Stack Developer & Open Source Contributor</p>
  //             <p style="color: var(--color-text-secondary); margin: 0.5rem 0 0 0;">your.email@example.com | San Francisco, CA</p>
  //           </div>
            
  //           <div style="margin-bottom: 1.5rem;">
  //             <h3 style="color: var(--color-text); border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">Education</h3>
  //             <p style="color: var(--color-text-secondary); margin: 0.5rem 0;">
  //               <strong>Bachelor of Science in Computer Science</strong><br>
  //               University of Technology - 2021
  //             </p>
  //           </div>
            
  //           <div style="margin-bottom: 1.5rem;">
  //             <h3 style="color: var(--color-text); border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">Skills</h3>
  //             <p style="color: var(--color-text-secondary); margin: 0.5rem 0;">
  //               JavaScript, Python, React, Node.js, Express, MongoDB, PostgreSQL, AWS, Docker, Git
  //             </p>
  //           </div>
            
  //           <div>
  //             <h3 style="color: var(--color-text); border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">Experience</h3>
  //             <p style="color: var(--color-text-secondary); margin: 0.5rem 0;">
  //               3+ years of experience in full-stack development, building scalable web applications and contributing to open source projects.
  //             </p>
  //           </div>
  //         </div>
  //         <div style="text-align: center; margin-top: 2rem;">
  //           <button class="btn btn--primary" onclick="document.getElementById('download-resume').click()">
  //             <i class="fas fa-download"></i> Download Full Resume
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   `;

  //   document.body.appendChild(modal);
  //   document.body.style.overflow = 'hidden';

  //   // Close modal functionality
  //   const closeModal = () => {
  //     modal.remove();
  //     document.body.style.overflow = 'auto';
  //   };

  //   modal.querySelector('.modal__close').onclick = closeModal;
  //   modal.onclick = (e) => {
  //     if (e.target === modal) closeModal();
  //   };

  //   document.addEventListener('keydown', function escapeHandler(e) {
  //     if (e.key === 'Escape') {
  //       closeModal();
  //       document.removeEventListener('keydown', escapeHandler);
  //     }
  //   });
  // }

  // Skill animations
  initSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill__item');

    skillItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        // Add ripple effect
        this.createRipple(item);
      });
    });
  }

  // Create ripple effect
  createRipple(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(9, 105, 218, 0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';

    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  // Active navigation highlighting (Fixed)
  initActiveNavigation() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav__link');

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-80px 0px -50% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          
          // Remove active class from all nav links
          navLinks.forEach(link => link.classList.remove('active'));
          
          // Add active class to current section's nav link
          const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Handle scroll-based header styling
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const header = document.getElementById('header');
      if (!header) return;

      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.style.background = 'rgba(13, 17, 23, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
      } else {
        header.style.background = 'rgba(13, 17, 23, 0.95)';
        header.style.boxShadow = 'none';
      }

      lastScroll = currentScroll;
    });
  }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: translate(-50%, -50%) scale(2);
      opacity: 0;
    }
  }

  .animate-in {
    animation: slideInUp 0.6s ease forwards;
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .project__card {
    opacity: 1;
    transform: scale(1);
    transition: all 0.3s ease;
  }

  .skill__item::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    background: linear-gradient(45deg, transparent, rgba(9, 105, 218, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .skill__item:hover::after {
    opacity: 1;
  }

  .notification {
    cursor: pointer;
  }

  .notification:hover {
    transform: translateX(-5px) !important;
  }
`;
document.head.appendChild(style);

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Portfolio();
  console.log('Portfolio initialized successfully');
});

// Handle page load animations
window.addEventListener('load', () => {
  // Add loading complete class for any final animations
  document.body.classList.add('loaded');
  
  // Scroll to top on page load
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

// Handle resize events (Enhanced)
window.addEventListener('resize', () => {
  // Close mobile menu on resize to desktop
  if (window.innerWidth > 768) {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navMenu) navMenu.classList.remove('show');
    
    if (navToggle) {
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    }
  }
});

// Lazy load images (if any were added later)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}