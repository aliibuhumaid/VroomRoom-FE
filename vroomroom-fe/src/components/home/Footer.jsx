import React, { useState, useEffect } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      let currentScroll = window.scrollY;
      if (currentScroll > 400 && currentScroll > lastScrollTop) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <footer className="footer-container text-center">
        <p>
          &copy; {currentYear} VroomRoom, Inc.
        </p>
      </footer>

      <button 
        className={`back-to-top-btn ${showTopBtn ? 'show' : 'show-transition'}`}
        onClick={goToTop}
      />
    </>
  );
}
