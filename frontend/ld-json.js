// inject structured data json-ld into the document in a csp-friendly way
(function () {
  'use strict';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Tamta Khutsishvili",
    "jobTitle": "Programmer & Cyber Security Specialist",
    "url": "https://tamta.ge",
    "sameAs": [
      "https://www.linkedin.com/in/tamta-khutsishvili-85395b343",
      "https://github.com/CyberCoder25"
    ]
  };

  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify(structuredData);
  document.head.appendChild(s);
})();
