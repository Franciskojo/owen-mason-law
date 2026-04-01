import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0b1a2e;
    --navy-light: #12263f;
    --gold: #b8955a;
    --gold-light: #d4b07a;
    --cream: #f5f0e8;
    --cream-dark: #ede5d5;
    --white: #ffffff;
    --gray: #8a8a8a;
    --text: #1a1a1a;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Jost', sans-serif;
    background: var(--cream);
    color: var(--text);
    overflow-x: hidden;
  }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5%;
    height: 80px;
    transition: background 0.4s, box-shadow 0.4s;
  }
  .nav.scrolled {
    background: var(--navy);
    box-shadow: 0 2px 30px rgba(0,0,0,0.25);
  }
  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--white);
    letter-spacing: 0.05em;
    line-height: 1.2;
    cursor: pointer;
  }
  .nav-logo span { color: var(--gold); display: block; font-size: 0.75rem; font-weight: 300; letter-spacing: 0.3em; text-transform: uppercase; }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .nav-links a {
    color: rgba(255,255,255,0.85);
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    transition: color 0.3s;
    position: relative;
  }
  .nav-links a::after {
    content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
    height: 1px; background: var(--gold); transform: scaleX(0); transition: transform 0.3s;
  }
  .nav-links a:hover { color: var(--gold); }
  .nav-links a:hover::after { transform: scaleX(1); }
  .nav-cta {
    background: var(--gold); color: var(--navy);
    padding: 0.6rem 1.5rem; border: none; cursor: pointer;
    font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    transition: background 0.3s;
  }
  .nav-cta:hover { background: var(--gold-light); }
  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
  .hamburger span { display: block; width: 24px; height: 1.5px; background: white; transition: 0.3s; }

  /* HERO */
  .hero {
    min-height: 100vh;
    background: var(--navy);
    position: relative;
    display: flex; align-items: center;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, #0b1a2e 0%, #1a3050 50%, #0b1a2e 100%);
  }
  .hero-lines {
    position: absolute; inset: 0; opacity: 0.06;
    background-image: repeating-linear-gradient(
      0deg, transparent, transparent 60px, rgba(184,149,90,0.5) 60px, rgba(184,149,90,0.5) 61px
    ),
    repeating-linear-gradient(
      90deg, transparent, transparent 60px, rgba(184,149,90,0.5) 60px, rgba(184,149,90,0.5) 61px
    );
  }
  .hero-accent {
    position: absolute; right: 0; top: 0; bottom: 0;
    width: 45%;
    background: linear-gradient(135deg, transparent 0%, rgba(184,149,90,0.07) 100%);
    clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
  }
  .hero-content {
    position: relative; z-index: 2;
    padding: 0 5% 160px;
    max-width: 720px;
    animation: fadeUp 1s ease both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes revealUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .reveal {
    opacity: 0; transform: translateY(40px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .hero-eyebrow {
    display: flex; align-items: center; gap: 1rem;
    margin-bottom: 2rem;
    animation: fadeUp 1s 0.2s ease both;
  }
  .hero-eyebrow::before { content: ''; display: block; width: 50px; height: 1px; background: var(--gold); }
  .hero-eyebrow span {
    color: var(--gold); font-size: 0.75rem; font-weight: 500;
    letter-spacing: 0.3em; text-transform: uppercase;
  }
  .hero h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.8rem, 6vw, 5.5rem);
    font-weight: 300; line-height: 1.1;
    color: var(--white);
    margin-bottom: 1.5rem;
    animation: fadeUp 1s 0.3s ease both;
  }
  .hero h1 em { color: var(--gold); font-style: italic; }
  .hero p {
    color: rgba(255,255,255,0.65);
    font-size: 1rem; line-height: 1.8;
    max-width: 520px;
    margin-bottom: 3rem;
    animation: fadeUp 1s 0.4s ease both;
  }
  .hero-btns {
    display: flex; gap: 1rem; flex-wrap: wrap;
    animation: fadeUp 1s 0.5s ease both;
  }
  .btn-primary {
    background: var(--gold); color: var(--navy);
    padding: 1rem 2.5rem; border: none; cursor: pointer;
    font-family: 'Jost', sans-serif; font-size: 0.8rem; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    transition: background 0.3s, transform 0.2s;
  }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); }
  .btn-outline {
    background: transparent; color: var(--white);
    padding: 1rem 2.5rem; border: 1px solid rgba(255,255,255,0.3); cursor: pointer;
    font-family: 'Jost', sans-serif; font-size: 0.8rem; font-weight: 500;
    letter-spacing: 0.15em; text-transform: uppercase;
    transition: border-color 0.3s, color 0.3s;
  }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); }
  .hero-stats {
    position: absolute; bottom: 0; left: 0; right: 0;
    display: flex; background: rgba(255,255,255,0.04);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(184,149,90,0.2);
    z-index: 2;
  }
  .stat {
    flex: 1; padding: 2rem;
    text-align: center;
    border-right: 1px solid rgba(184,149,90,0.2);
  }
  .stat:last-child { border-right: none; }
  .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem; font-weight: 300;
    color: var(--gold); display: block; line-height: 1;
    margin-bottom: 0.4rem;
  }
  .stat-label {
    font-size: 0.7rem; font-weight: 500;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  }

  /* SECTION COMMON */
  section { padding: 7rem 5%; }
  .section-eyebrow {
    display: flex; align-items: center; gap: 1rem;
    margin-bottom: 1.2rem;
  }
  .section-eyebrow::before { content: ''; display: block; width: 40px; height: 1px; background: var(--gold); }
  .section-eyebrow span {
    color: var(--gold); font-size: 0.7rem; font-weight: 500;
    letter-spacing: 0.3em; text-transform: uppercase;
  }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 300; line-height: 1.2;
    color: var(--navy);
  }
  .section-title.light { color: var(--white); }

  /* ABOUT */
  .about { background: var(--white); }
  .about-inner {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center;
  }
  .about-visual {
    position: relative;
  }
  .about-img-frame {
    width: 100%; aspect-ratio: 4/5;
    background: var(--navy);
    position: relative;
    overflow: hidden;
  }
  .about-img-inner {
    position: absolute; inset: 0;
    background: url('/images/about.png') center/cover no-repeat;
    display: flex; align-items: center; justify-content: center;
  }
  .about-initials {
    display: none;
  }
  .about-badge {
    position: absolute; bottom: -1.5rem; right: -1.5rem;
    width: 140px; height: 140px;
    background: var(--gold);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center;
  }
  .about-badge strong {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem; font-weight: 300;
    color: var(--navy); line-height: 1;
  }
  .about-badge span {
    font-size: 0.6rem; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--navy); opacity: 0.7;
    margin-top: 0.3rem;
  }
  .about-text p {
    color: #555; font-size: 1rem; line-height: 1.9;
    margin-bottom: 1.5rem;
  }
  .about-values {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 1rem; margin-top: 2rem;
  }
  .value-item {
    display: flex; align-items: flex-start; gap: 0.8rem;
  }
  .value-icon {
    width: 38px; height: 38px; flex-shrink: 0;
    background: var(--cream-dark); border: 1px solid var(--gold);
    display: flex; align-items: center; justify-content: center;
    color: var(--gold); font-size: 0.9rem;
  }
  .value-item h4 {
    font-size: 0.85rem; font-weight: 600;
    letter-spacing: 0.05em; text-transform: uppercase;
    color: var(--navy); margin-bottom: 0.2rem;
  }
  .value-item p { font-size: 0.8rem; color: var(--gray); margin: 0; }

  /* PRACTICE AREAS */
  .practice { background: var(--navy); position: relative; overflow: hidden; }
  .practice::before {
    content: 'LAW'; position: absolute;
    font-family: 'Cormorant Garamond', serif;
    font-size: 25vw; font-weight: 300;
    color: rgba(255,255,255,0.02);
    right: -2%; bottom: -5%;
    line-height: 1; pointer-events: none;
  }
  .practice-header {
    max-width: 1200px; margin: 0 auto 4rem;
    display: flex; justify-content: space-between; align-items: flex-end;
  }
  .practice-grid {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px;
    background: rgba(184,149,90,0.15);
  }
  .practice-card {
    background: var(--navy-light);
    padding: 2.5rem 2rem;
    position: relative; overflow: hidden;
    cursor: pointer;
    transition: background 0.3s;
  }
  .practice-card::before {
    content: ''; position: absolute;
    bottom: 0; left: 0; right: 0; height: 2px;
    background: var(--gold); transform: scaleX(0);
    transform-origin: left; transition: transform 0.4s;
  }
  .practice-card:hover { background: rgba(255,255,255,0.05); }
  .practice-card:hover::before { transform: scaleX(1); }
  .practice-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem; font-weight: 300;
    color: rgba(184,149,90,0.2); line-height: 1;
    margin-bottom: 1rem;
  }
  .practice-icon {
    font-size: 2.2rem; margin-bottom: 1.5rem; display: block;
    color: var(--gold); opacity: 0.85;
  }
  .practice-card h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem; font-weight: 400;
    color: var(--white); margin-bottom: 0.8rem;
  }
  .practice-card p {
    font-size: 0.82rem; line-height: 1.7;
    color: rgba(255,255,255,0.5);
  }
  .practice-arrow {
    position: absolute; bottom: 1.5rem; right: 1.5rem;
    color: var(--gold); font-size: 1.2rem;
    opacity: 0; transform: translateX(-10px);
    transition: opacity 0.3s, transform 0.3s;
  }
  .practice-card:hover .practice-arrow { opacity: 1; transform: translateX(0); }

  /* ATTORNEYS */
  .attorneys { background: var(--cream); }
  .attorneys-inner { max-width: 1200px; margin: 0 auto; }
  .attorneys-header { margin-bottom: 4rem; }
  .attorneys-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;
  }
  .attorney-card {
    background: var(--white);
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .attorney-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
  .attorney-photo {
    aspect-ratio: 1; background: var(--navy);
    position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .attorney-initials-bg {
    display: none;
  }
  .attorney-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(11,26,46,0.8), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .attorney-card:hover .attorney-overlay { opacity: 1; }
  .attorney-info { padding: 1.5rem; }
  .attorney-info h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem; font-weight: 400;
    color: var(--navy); margin-bottom: 0.3rem;
  }
  .attorney-title {
    font-size: 0.7rem; font-weight: 600;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 0.8rem; display: block;
  }
  .attorney-info p {
    font-size: 0.82rem; color: var(--gray);
    line-height: 1.6; margin-bottom: 1rem;
  }
  .attorney-specialties {
    display: flex; gap: 0.4rem; flex-wrap: wrap;
  }
  .tag {
    font-size: 0.65rem; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 0.3rem 0.7rem;
    background: var(--cream); color: var(--navy);
  }

  /* TESTIMONIALS */
  .testimonials {
    background: var(--navy-light);
    position: relative; overflow: hidden;
  }
  .testimonials-inner { max-width: 1200px; margin: 0 auto; }
  .testimonials-header { margin-bottom: 4rem; }
  .testimonials-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
  }
  .testimonial-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(184,149,90,0.15);
    padding: 2.5rem;
    position: relative;
  }
  .quote-mark {
    font-family: 'Cormorant Garamond', serif;
    font-size: 5rem; font-weight: 300;
    color: rgba(184,149,90,0.25);
    line-height: 0.5; margin-bottom: 1.5rem; display: block;
  }
  .testimonial-card p {
    font-size: 0.92rem; line-height: 1.8;
    color: rgba(255,255,255,0.7);
    font-style: italic;
    margin-bottom: 1.5rem;
  }
  .testimonial-author { display: flex; align-items: center; gap: 0.8rem; }
  .author-avatar {
    width: 44px; height: 44px;
    background: var(--gold);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem; color: var(--navy); font-weight: 400; flex-shrink: 0;
  }
  .author-name {
    font-size: 0.85rem; font-weight: 600; color: var(--white);
    display: block; margin-bottom: 0.15rem;
  }
  .author-case { font-size: 0.72rem; color: var(--gold); letter-spacing: 0.1em; }
  .stars { color: #f5c942; font-size: 0.9rem; margin-bottom: 0.5rem; letter-spacing: 0.1em; }

  /* CONTACT */
  .contact { background: var(--cream-dark); }
  .contact-inner {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1.2fr; gap: 6rem; align-items: start;
  }
  .contact-info h2 { margin-bottom: 1.5rem; }
  .contact-info p { color: #555; font-size: 0.95rem; line-height: 1.8; margin-bottom: 2.5rem; }
  .contact-details { display: flex; flex-direction: column; gap: 1.2rem; }
  .contact-item { display: flex; align-items: flex-start; gap: 1rem; }
  .contact-ico {
    width: 40px; height: 40px; flex-shrink: 0;
    background: var(--navy); display: flex; align-items: center; justify-content: center;
    color: var(--gold); font-size: 1rem;
  }
  .contact-item h4 { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--navy); margin-bottom: 0.2rem; }
  .contact-item p { font-size: 0.85rem; color: #555; margin: 0; }
  .contact-form { background: var(--white); padding: 3rem; }
  .contact-form h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem; font-weight: 300; color: var(--navy);
    margin-bottom: 2rem;
  }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
  .form-group { margin-bottom: 1rem; }
  .form-group label {
    display: block; font-size: 0.7rem; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--navy); margin-bottom: 0.5rem;
  }
  .form-group input, .form-group select, .form-group textarea {
    width: 100%; padding: 0.85rem 1rem;
    border: 1.5px solid #c8c0b0; background: var(--cream);
    font-family: 'Jost', sans-serif; font-size: 0.9rem; color: var(--text);
    outline: none; transition: border-color 0.3s, background 0.3s;
    resize: none;
  }
  .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    border-color: var(--gold);
    background: white;
    box-shadow: 0 0 0 3px rgba(184,149,90,0.08);
  }
  .form-submit {
    width: 100%; padding: 1.1rem;
    background: var(--navy); color: var(--white);
    border: none; cursor: pointer;
    font-family: 'Jost', sans-serif; font-size: 0.8rem; font-weight: 600;
    letter-spacing: 0.2em; text-transform: uppercase;
    transition: background 0.3s, transform 0.2s;
  }
  .form-submit:hover { background: var(--gold); color: var(--navy); transform: translateY(-1px); }

  /* BACK TO TOP */
  .back-to-top {
    position: fixed; bottom: 2rem; right: 2rem; z-index: 90;
    width: 46px; height: 46px;
    background: var(--gold); color: var(--navy);
    border: none; cursor: pointer; font-size: 1.2rem;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.3s, transform 0.3s, background 0.3s;
    pointer-events: none;
    box-shadow: 0 4px 20px rgba(0,0,0,0.25);
  }
  .back-to-top.visible { opacity: 1; transform: translateY(0); pointer-events: all; }
  .back-to-top:hover { background: var(--gold-light); }

  /* FLOATING CTA */
  .floating-cta {
    position: fixed; bottom: 2rem; left: 2rem; z-index: 90;
    display: flex; align-items: center; gap: 0.6rem;
    background: var(--navy); color: var(--white);
    padding: 0.75rem 1.25rem;
    border: 1px solid rgba(184,149,90,0.3);
    cursor: pointer; font-family: 'Jost', sans-serif;
    font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
    transition: background 0.3s, border-color 0.3s;
  }
  .floating-cta:hover { background: var(--gold); color: var(--navy); border-color: var(--gold); }
  .floating-cta-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #4caf50; flex-shrink: 0;
    box-shadow: 0 0 0 3px rgba(76,175,80,0.2);
    animation: pulse-dot 2s infinite;
  }
  @keyframes pulse-dot {
    0%, 100% { box-shadow: 0 0 0 3px rgba(76,175,80,0.2); }
    50% { box-shadow: 0 0 0 6px rgba(76,175,80,0.1); }
  }

  /* FOOTER */
  footer {
    background: #060f1d;
    color: rgba(255,255,255,0.5);
    padding: 4rem 5% 2rem;
  }
  .footer-inner {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 4rem;
    margin-bottom: 3rem;
  }
  .footer-brand p { font-size: 0.82rem; line-height: 1.8; margin-top: 1rem; max-width: 280px; }
  .footer-social {
    display: flex; gap: 0.75rem; margin-top: 1.5rem;
  }
  .social-btn {
    width: 36px; height: 36px;
    border: 1px solid rgba(255,255,255,0.12);
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.5); font-size: 0.85rem;
    cursor: pointer; text-decoration: none;
    transition: border-color 0.3s, color 0.3s, background 0.3s;
  }
  .social-btn:hover { border-color: var(--gold); color: var(--gold); background: rgba(184,149,90,0.08); }
  .footer-col h4 {
    font-size: 0.7rem; font-weight: 600;
    letter-spacing: 0.25em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.2rem;
  }
  .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
  .footer-col ul li a {
    color: rgba(255,255,255,0.5); text-decoration: none;
    font-size: 0.82rem; transition: color 0.3s;
  }
  .footer-col ul li a:hover { color: var(--gold); }
  .footer-bottom {
    max-width: 1200px; margin: 0 auto;
    padding-top: 2rem;
    border-top: 1px solid rgba(255,255,255,0.06);
    display: flex; justify-content: space-between; align-items: center;
  }
  .footer-bottom p { font-size: 0.75rem; }
  .footer-disclaimer { font-size: 0.72rem; color: rgba(255,255,255,0.3); max-width: 500px; text-align: right; }

  /* TOAST */
  .toast {
    position: fixed; bottom: 2rem; right: 2rem; z-index: 999;
    background: var(--navy); color: var(--white);
    padding: 1rem 2rem; display: flex; align-items: center; gap: 0.8rem;
    transform: translateY(100px); opacity: 0;
    transition: all 0.4s;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  }
  .toast.show { transform: translateY(0); opacity: 1; }
  .toast-icon { color: var(--gold); font-size: 1.2rem; }

  /* MOBILE */
  @media (max-width: 900px) {
    .about-inner { grid-template-columns: 1fr; gap: 3rem; }
    .practice-grid { grid-template-columns: 1fr 1fr; }
    .attorneys-grid { grid-template-columns: 1fr 1fr; }
    .testimonials-grid { grid-template-columns: 1fr; }
    .contact-inner { grid-template-columns: 1fr; gap: 3rem; }
    .footer-inner { grid-template-columns: 1fr 1fr; gap: 2rem; }
    .hero-stats { flex-wrap: wrap; }
    .stat { flex: 1 1 50%; }
    .hero-content { padding-bottom: 220px; }
    .practice-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
    .nav-links, .nav-cta { display: none; }
    .hamburger { display: flex; }
    .floating-cta { display: none; }
  }
  @media (max-width: 600px) {
    .practice-grid { grid-template-columns: 1fr; }
    .attorneys-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .footer-inner { grid-template-columns: 1fr; }
    .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
    .footer-disclaimer { text-align: center; }
    .hero-content { padding-bottom: 260px; }
    .back-to-top { bottom: 1rem; right: 1rem; }
  }
`;

const practiceAreas = [
  { icon: "🏛️", title: "Corporate Law", desc: "Comprehensive legal counsel for businesses at every stage — from incorporation and governance to M&A and regulatory compliance." },
  { icon: "⚖️", title: "Litigation & Dispute Resolution", desc: "Aggressive representation in complex commercial disputes, arbitration, and appellate proceedings across all jurisdictions." },
  { icon: "📜", title: "Real Estate Law", desc: "Full-service real estate legal support including transactions, development, financing, zoning, and title matters." },
  { icon: "🖋️", title: "Estate Planning & Probate", desc: "Protecting your legacy through wills, trusts, powers of attorney, and expert administration of estates." },
  { icon: "🏢", title: "Employment Law", desc: "Advising employers and employees on contracts, discrimination, wrongful termination, and workplace compliance." },
  { icon: "🛡️", title: "Intellectual Property", desc: "Safeguarding your innovations with patents, trademarks, copyrights, and trade secret protection strategies." },
];

const attorneys = [
  { name: "Owen Mason", title: "Founding Partner", image: "/images/owen.png", initials: "OM", desc: "With over 25 years of distinguished practice, Owen Mason brings unparalleled expertise in corporate and commercial law.", specialties: ["Corporate", "M&A", "Litigation"] },
  { name: "Victoria Clarke", title: "Senior Partner", image: "/images/victoria.png", initials: "VC", desc: "Victoria is a seasoned litigator recognized for her strategic acumen and commanding presence in the courtroom.", specialties: ["Litigation", "Employment"] },
  { name: "James Adewale", title: "Partner", image: "/images/james.png", initials: "JA", desc: "James brings specialized expertise in real estate and infrastructure transactions across West Africa and beyond.", specialties: ["Real Estate", "Finance"] },
];

const testimonials = [
  { text: "Owen Mason Law Firm handled our company's acquisition with exceptional professionalism. Their attention to detail and strategic guidance was invaluable throughout the entire process.", name: "Richard Owusu", caseType: "Corporate Acquisition", initials: "RO" },
  { text: "I was impressed by the firm's dedication and thoroughness. They navigated a highly complex estate matter with sensitivity and expertise I have rarely encountered.", name: "Abena Mensah", caseType: "Estate Planning", initials: "AM" },
  { text: "The litigation team delivered beyond our expectations, securing a decisive outcome in what was considered a challenging dispute. Truly outstanding representation.", name: "Kwame Asante", caseType: "Commercial Dispute", initials: "KA" },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [backToTop, setBackToTop] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", area: "", message: "" });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-reveal via IntersectionObserver
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast(true);
    setForm({ name: "", email: "", phone: "", area: "", message: "" });
    setTimeout(() => setToast(false), 3500);
  };

  return (
    <>
      <style>{style}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => scrollTo("hero")}>
          Owen Mason
          <span>Law Firm</span>
        </div>
        <ul className="nav-links">
          {["about", "practice", "attorneys", "testimonials", "contact"].map(s => (
            <li key={s}><a href={`#${s}`} onClick={e => { e.preventDefault(); scrollTo(s); }}>{s.charAt(0).toUpperCase() + s.slice(1)}</a></li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => scrollTo("contact")}>Free Consultation</button>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, background: "var(--navy)", zIndex: 99, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2.5rem" }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: "1.8rem", cursor: "pointer", lineHeight: 1 }}>✕</button>
          {["about", "practice", "attorneys", "testimonials", "contact"].map(s => (
            <a key={s} href={`#${s}`} onClick={e => { e.preventDefault(); scrollTo(s); }} style={{ color: "white", textDecoration: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300 }}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </a>
          ))}
          <button className="btn-primary" onClick={() => scrollTo("contact")}>Free Consultation</button>
        </div>
      )}

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg" />
        <div className="hero-lines" />
        <div className="hero-accent" />
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span>Excellence in Law Since 1999</span>
          </div>
          <h1>Justice is not a<br /><em>privilege.</em><br />It's your right.</h1>
          <p>Owen Mason Law Firm provides sophisticated legal counsel to individuals, families, and businesses — combining deep expertise with an unwavering commitment to client outcomes.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo("contact")}>Schedule Consultation</button>
            <button className="btn-outline" onClick={() => scrollTo("practice")}>Our Practice Areas</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="stat-num">25+</span><span className="stat-label">Years of Practice</span></div>
          <div className="stat"><span className="stat-num">1,200+</span><span className="stat-label">Cases Won</span></div>
          <div className="stat"><span className="stat-num">98%</span><span className="stat-label">Client Satisfaction</span></div>
          <div className="stat"><span className="stat-num">6</span><span className="stat-label">Practice Areas</span></div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-inner">
          <div className="about-visual reveal">
            <div className="about-img-frame">
              <div className="about-img-inner">
                <span className="about-initials">OM</span>
              </div>
            </div>
            <div className="about-badge">
              <strong>25+</strong>
              <span>Years of Experience</span>
            </div>
          </div>
          <div className="about-text">
            <div className="section-eyebrow reveal"><span>About the Firm</span></div>
            <h2 className="section-title reveal" style={{ marginBottom: "1.5rem" }}>A Legacy of Legal Excellence</h2>
            <p className="reveal reveal-delay-1">Founded in 1999, Owen Mason Law Firm has grown into one of the region's most respected legal practices. We combine the responsiveness of a boutique firm with the resources and depth of a large institution.</p>
            <p className="reveal reveal-delay-2">Our attorneys are not just legal technicians — they are trusted advisors who understand the full context of your challenges. We take pride in delivering clear, practical advice and achieving results that matter.</p>
            <div className="about-values">
              {[
                { icon: "🔒", title: "Integrity", desc: "Uncompromising ethical standards" },
                { icon: "🎯", title: "Precision", desc: "Meticulous attention to every detail" },
                { icon: "🤝", title: "Dedication", desc: "Committed to your success" },
                { icon: "🌐", title: "Reach", desc: "Local expertise, global perspective" },
              ].map((v, i) => (
                <div className={`value-item reveal reveal-delay-${i + 1}`} key={v.title}>
                  <div className="value-icon">{v.icon}</div>
                  <div><h4>{v.title}</h4><p>{v.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="practice" id="practice">
        <div className="practice-header reveal">
          <div>
            <div className="section-eyebrow"><span>What We Do</span></div>
            <h2 className="section-title light">Our Practice Areas</h2>
          </div>
          <button className="btn-outline" onClick={() => scrollTo("contact")}>Discuss Your Case →</button>
        </div>
        <div className="practice-grid">
          {practiceAreas.map((p, i) => (
            <div className="practice-card reveal reveal-delay-1" key={p.title}>
              <div className="practice-num">0{i + 1}</div>
              <span className="practice-icon">{p.icon}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <span className="practice-arrow">→</span>
            </div>
          ))}
        </div>
      </section>

      {/* ATTORNEYS */}
      <section className="attorneys" id="attorneys">
        <div className="attorneys-inner">
          <div className="attorneys-header reveal">
            <div className="section-eyebrow"><span>Our Team</span></div>
            <h2 className="section-title">Meet Our Attorneys</h2>
          </div>
          <div className="attorneys-grid">
            {attorneys.map((a, i) => (
              <div className={`attorney-card reveal reveal-delay-${i + 1}`} key={a.name}>
                <div className="attorney-photo" style={{ background: `url(${a.image}) center/cover no-repeat` }}>
                  <div className="attorney-overlay" />
                </div>
                <div className="attorney-info">
                  <h3>{a.name}</h3>
                  <span className="attorney-title">{a.title}</span>
                  <p>{a.desc}</p>
                  <div className="attorney-specialties">
                    {a.specialties.map(s => <span className="tag" key={s}>{s}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" id="testimonials">
        <div className="testimonials-inner">
          <div className="testimonials-header reveal">
            <div className="section-eyebrow"><span>Client Voices</span></div>
            <h2 className="section-title light">What Our Clients Say</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className={`testimonial-card reveal reveal-delay-${i + 1}`} key={t.name}>
                <span className="stars">★★★★★</span>
                <span className="quote-mark">"</span>
                <p>{t.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.initials}</div>
                  <div>
                    <span className="author-name">{t.name}</span>
                    <span className="author-case">{t.caseType}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="contact-inner">
          <div className="contact-info reveal">
            <div className="section-eyebrow"><span>Get in Touch</span></div>
            <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>Schedule Your Free Consultation</h2>
            <p>Your first consultation is complimentary. Tell us about your legal matter and one of our experienced attorneys will respond within 24 hours.</p>
            <div className="contact-details">
              {[
                { icon: "📍", label: "Office Address", val: "14 Independence Avenue, Ridge, Accra, Ghana" },
                { icon: "📞", label: "Phone", val: "+233 30 276 0000" },
                { icon: "📧", label: "Email", val: "info@owenmasonlaw.com" },
                { icon: "🕐", label: "Office Hours", val: "Monday – Friday: 8am – 6pm" },
              ].map((c, i) => (
                <div className={`contact-item reveal reveal-delay-${i + 1}`} key={c.label}>
                  <div className="contact-ico">{c.icon}</div>
                  <div><h4>{c.label}</h4><p>{c.val}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="contact-form reveal">
            <h3>Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group reveal reveal-delay-1">
                  <label>Full Name</label>
                  <input type="text" placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="form-group reveal reveal-delay-1">
                  <label>Email Address</label>
                  <input type="email" placeholder="john@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group reveal reveal-delay-2">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+233 XX XXX XXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="form-group reveal reveal-delay-2">
                  <label>Practice Area</label>
                  <select value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} required>
                    <option value="">Select area...</option>
                    {practiceAreas.map(p => <option key={p.title}>{p.title}</option>)}
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group reveal reveal-delay-3">
                <label>Brief Description of Your Matter</label>
                <textarea rows={5} placeholder="Please describe your legal matter briefly..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
              </div>
              <button type="submit" className="form-submit reveal reveal-delay-3">Request Free Consultation →</button>
            </form>
          </div>
        </div>
      </section>

      {/* FLOATING CTA */}
      <button className="floating-cta" onClick={() => scrollTo("contact")}>
        <span className="floating-cta-dot" />
        Book Free Consultation
      </button>

      {/* BACK TO TOP */}
      <button className={`back-to-top ${backToTop ? "visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">↑</button>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="nav-logo" style={{ cursor: "default" }}>Owen Mason<span>Law Firm</span></div>
            <p>Delivering exceptional legal services with integrity, precision, and a relentless commitment to our clients' best interests since 1999.</p>
            <div className="footer-social">
              {["in", "f", "𝕏"].map(s => <a key={s} href="#" className="social-btn" onClick={e => e.preventDefault()}>{s}</a>)}
            </div>
          </div>
          <div className="footer-col">
            <h4>Practice Areas</h4>
            <ul>{practiceAreas.map(p => <li key={p.title}><a href="#practice" onClick={e => { e.preventDefault(); scrollTo("practice"); }}>{p.title}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>The Firm</h4>
            <ul>
              {["About Us", "Our Attorneys", "Testimonials", "News & Insights", "Careers"].map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Client Resources</h4>
            <ul>
              {["Free Consultation", "Client Portal", "Legal Resources", "Privacy Policy", "Terms of Service"].map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Owen Mason Law Firm. All rights reserved.</p>
          <p className="footer-disclaimer">The information on this website is for general informational purposes only and does not constitute legal advice. No attorney-client relationship is formed by use of this site.</p>
        </div>
      </footer>

      {/* TOAST */}
      <div className={`toast ${toast ? "show" : ""}`}>
        <span className="toast-icon">✓</span>
        Your message has been received. We'll be in touch within 24 hours.
      </div>
    </>
  );
}
