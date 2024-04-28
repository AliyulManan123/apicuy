document.addEventListener("DOMContentLoaded", function () {
    // Sticky navigation bar
    var header = document.getElementById("mainHeader");
  
    if (header) {
      var sticky = header.offsetTop;
  
      window.onscroll = function() {
        if (window.pageYOffset > sticky) {
          header.classList.add("sticky-nav");
        } else {
          header.classList.remove("sticky-nav");
        }
      };
    }
  
    // Mobile menu toggle
    var mobileMenuIcon = document.getElementById("mobileMenuIcon");
    var mobileMenu = document.getElementById("mobileMenu");
  
    if (mobileMenuIcon && mobileMenu) {
      mobileMenuIcon.addEventListener("click", function () {
        mobileMenu.classList.toggle('-top-36');
        mobileMenu.classList.toggle('!top-24');      
      });
    } 
  
    var buttonMenu = document.getElementById("buttonSub");
    var idMenu = document.getElementById('submenu');
  
    if (buttonMenu && idMenu) {
      idMenu.addEventListener('click', function() {
        buttonMenu.classList.toggle('opacity-0')
        buttonMenu.classList.toggle('opacity-100')
      })
    }
  
    var menuSidebar = document.getElementById('menuSidebar');
  var sidebar = document.getElementById('sideBar');
  
  if (menuSidebar && sidebar) {
    menuSidebar.addEventListener('click', function (event) {
      // Stop the event from propagating to the document
      event.stopPropagation();
  
      sidebar.classList.toggle('!visible');
      sidebar.classList.toggle('!opacity-100');
      sidebar.classList.toggle('!w-72');
  
      // Add event listener to close sidebar when clicking outside
      document.addEventListener('click', closeSidebarOnClickOutside);
    });
  }
  
  function closeSidebarOnClickOutside(event) {
    var sidebar = document.getElementById('sideBar');
    var menuSidebar = document.getElementById('menuSidebar');
  
    // Check if the clicked element is outside the sidebar
    if (sidebar && !sidebar.contains(event.target) && menuSidebar !== event.target) {
      sidebar.classList.remove('!visible');
      sidebar.classList.remove('!opacity-100');
      sidebar.classList.remove('!w-72');
  
      document.removeEventListener('click', closeSidebarOnClickOutside);
    }
  }
  
  });
  