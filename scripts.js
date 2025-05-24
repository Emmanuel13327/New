// Main JavaScript for Converta Website

// Typewriter Animation: Hide cursor after completion
document.addEventListener("DOMContentLoaded", function () {
  const typewriters = document.querySelectorAll(".typewriter");
  typewriters.forEach(tw => {
    // Wait for animation to finish (3s + 0.75s * 4 steps)
    setTimeout(() => {
      tw.style.borderRight = "none";
    }, 6000); // 6 seconds buffer
  });

  // Count-Up Animation
  const counters = document.querySelectorAll('.count');
  counters.forEach(counter => {
    counter.innerHTML = '0';
    const target = parseInt(counter.getAttribute('data-target')) || 0;
    
    const updateCount = () => {
      const current = +counter.innerText;
      const increment = Math.ceil(target / 20);
      
      if (current < target) {
        counter.innerText = current + increment;
        setTimeout(updateCount, 50);
      } else {
        counter.innerText = target;
      }
    };

    // Trigger animation when section enters viewport
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        observer.unobserve(counter);
        updateCount();
      }
    }, { threshold: 0.1 });
    
    observer.observe(counter);
  });

  // Toggle billing duration (if needed in this page)
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  if (toggleButtons.length > 0) {
    toggleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelector('.toggle-btn.active')?.classList.remove('active');
        btn.classList.add('active');
        
        const isYearly = btn.dataset.duration === 'yearly';
        const prices = [
          { monthly: 14.99, yearly: 11.24 },
          { monthly: 24.99, yearly: 18.74 },
          { monthly: 49.99, yearly: 37.49 }
        ];
        
        document.querySelectorAll('.plan-price').forEach((priceEl, index) => {
          priceEl.textContent = `$${isYearly ? prices[index].yearly : prices[index].monthly}`;
        });
      });
    });
  }

  // Add 'done' class to typewriter elements after animation
  setTimeout(() => {
      document.querySelector('.type1')?.classList.add('done');
  }, 3000); // First sentence completes
  
  setTimeout(() => {
      document.querySelector('.type2')?.classList.add('done');
  }, 6500); // Second sentence completes (3.5s delay + 3s animation)

  // Final Hero Section animations
  function isInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
      rect.top < window.innerHeight - 60 &&
      rect.bottom > 0
    );
  }
  
  function animateFinalHero() {
    // Only add active class to the mockup card for initial animation
    // Don't manipulate the tab active states here
    const mockup = document.querySelector('.mockup-card');
    if (mockup && isInViewport(mockup)) {
      setTimeout(() => mockup.classList.add('active'), 400);
    }
  }
  
  window.addEventListener('scroll', animateFinalHero);
  animateFinalHero();

  // Tabbed slider logic with persistent tabs and horizontal transitions
  const tabs = document.querySelectorAll('#feature-tabs .feature-card-vertical');
  const slider = document.getElementById('mockup-slider');
  const container = document.querySelector('.dashboard-img');
  const tabs2 = document.querySelectorAll('#feature-tabs-2 .feature-card-vertical');
  const dashboardImage = document.getElementById('dashboard-image');
  const dashboardImage2 = document.getElementById('dashboard-image-2');
  let activeTab = 0;
  let activeTab2 = 0;
  let animating = false;

  // Function to activate a specific tab for slider
  function slideTo(idx) {
    if (animating || idx === activeTab) return;
    
    // Remove active class from all tabs
    tabs.forEach(t => t.classList.remove('active'));
    // Add active class to the selected tab - this will persist even after hover
    tabs[idx].classList.add('active');
    
    // Calculate the percentage to slide based on the index (0, 1, or 2)
    const slidePercent = idx * 33.333;
    
    // Add horizontal sliding transition using percentage-based calculation
    if (slider) {
      slider.style.transition = 'transform 0.7s cubic-bezier(.77,0,.18,1)';
      slider.style.transform = `translateX(-${slidePercent}%)`;
    }
    
    // Set flag to prevent rapid clicking during animation
    animating = true;
    setTimeout(() => { animating = false; }, 700);
    
    // Update active tab index
    activeTab = idx;
  }
  
  // Function to activate a specific tab for dashboard image
  function slideTo2(idx) {
    if (animating || idx === activeTab2) return;
    
    // Remove active class from all tabs
    tabs2.forEach(t => t.classList.remove('active'));
    // Add active class to the selected tab - this will persist even after hover
    tabs2[idx].classList.add('active');
    
    // Apply a subtle highlight animation to the dashboard image
    if (dashboardImage2) {
      dashboardImage2.classList.add('dashboard-pulse');
      setTimeout(() => {
        dashboardImage2.classList.remove('dashboard-pulse');
      }, 700);
    }
    
    // Set flag to prevent rapid clicking during animation
    animating = true;
    setTimeout(() => { animating = false; }, 700);
    
    // Update active tab index
    activeTab2 = idx;
  }
  
  // Add event listeners to first set of tabs
  tabs.forEach((tab, idx) => {
    // Make tabs respond to both hover and click events
    tab.addEventListener('mouseenter', function() {
      slideTo(idx);
    });
    
    // Add click event for better mobile support and persistence
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      slideTo(idx);
    });
  });
  
  // Add event listeners to second set of tabs
  if (tabs2.length > 0) {
    tabs2.forEach((tab, idx) => {
      // Make tabs respond to both hover and click events
      tab.addEventListener('mouseenter', function() {
        slideTo2(idx);
      });
      
      // Add click event for better mobile support and persistence
      tab.addEventListener('click', function(e) {
        e.preventDefault();
        slideTo2(idx);
      });
    });
  }
  
  // Responsive: reset transform on resize without losing active tab
  window.addEventListener('resize', function() {
    // Calculate the percentage to slide based on the active tab index
    const slidePercent = activeTab * 33.333;
    if (slider) {
      slider.style.transition = 'none';
      slider.style.transform = `translateX(-${slidePercent}%)`;
    }
  });
  
  // Initialize tabs
  slideTo(0);
  if (tabs2.length > 0) {
    slideTo2(0);
  }
  
  // Initial sizing
  window.dispatchEvent(new Event('resize'));

  // Back to top button functionality
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    // Show/hide the button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
