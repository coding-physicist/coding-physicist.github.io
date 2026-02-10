# Quick Content Update Guide

## 🎯 Fast Track: What to Update Right Now

### 1. Profile Photo (5 minutes)
**Location:** `index.html` line ~47

**Find:**
```html
<div class="image-placeholder">
    <svg viewBox="0 0 200 200" fill="none">
```

**Replace with:**
```html
<img src="your-photo.jpg" alt="Vinayak - Materials Researcher" style="width: 100%; height: 100%; object-fit: cover;">
```

**Tips:**
- Use a square photo (280x280px minimum)
- Professional headshot works best
- Save as `your-photo.jpg` in same folder as `index.html`
- Or use absolute path

---

### 2. Email Address (2 minutes)
**Search for:** `placeholder@iitkgp.ac.in`

**Replace with:** Your actual IIT Kharagpur email

**Locations** (4 places):
- Line ~88: Hero social icons
- Line ~600: Contact section card
- Line ~820: Footer link

---

### 3. LinkedIn Profile (1 minute)
**Search for:** `https://linkedin.com/in/placeholder`

**Replace with:** Your LinkedIn URL

**Locations** (3 places):
- Line ~74: Hero social
- Line ~605: Contact card
- Line ~830: Footer

---

### 4. Education (15 minutes)

**Find:** `[YEAR] - [YEAR]` (appears 3 times)

Replace each with actual dates like: `2020 - 2022`

**For each degree:**
1. Institution name: Replace `[PLACEHOLDER: Institution Name]`
2. Department: Add your department/school
3. Thesis: Add thesis title
4. CGPA: Replace `[X.XX]/10.0` with actual grade

---

### 5. Research Areas (10 minutes)

**Section:** Research Interests

Update 4 research area cards:

**Materials Characterization** (line ~350)
- Replace placeholder techniques with your actual methods
- Examples: Raman Spectroscopy, XRD, SEM, etc.

**Laser Optics & Photonics** (line ~370)
- Add your laser-related work
- TLS, optical measurements, etc.

**Computational Physics** (line ~390)
- DFT, molecular dynamics, etc.
- Or remove if not applicable

**Experimental Techniques** (line ~410)
- Sample preparation, cryogenic methods, etc.

---

### 6. Research Philosophy (5 minutes)

**Find:** Line ~440
```html
<p>[PLACEHOLDER: Add a comprehensive research statement...]</p>
```

**Replace with:** 2-3 paragraphs about:
- Your research goals
- Your approach (experimental + computational)
- Broader impact you aim to achieve
- Your unique perspective

---

### 7. Projects (20 minutes)

**TLS Controller** is already filled in! ✅

**Project 2 & 3:** Find lines ~680 and ~710

For each project, update:
- `[PLACEHOLDER: Project Title]` → Your project name
- `[Technology]` tags → Actual tech stack
- Description paragraph → What you built/researched
- GitHub link → Your project URL

**Add project images:**
Replace `<div class="image-placeholder">` with:
```html
<img src="project-screenshot.jpg" alt="Project Name" style="width: 100%; height: 100%; object-fit: cover;">
```

---

### 8. Publications (15 minutes)

**Find:** Line ~750

For each publication:
1. **Year:** `[2026]` → Actual year
2. **Title:** Full paper title
3. **Authors:** List all, **bold your name**: `<strong>Vinayak</strong>`
4. **Venue:** Journal/conference name, volume(issue), pages
5. **Abstract:** 1-2 sentence summary
6. **Links:** Add actual PDF/DOI URLs

**Example:**
```html
<h3>Optical Properties of Novel 2D Materials Under Laser Excitation</h3>
<p class="publication-authors">
    A. Smith, <strong>Vinayak</strong>, B. Patel, C. Gupta
</p>
<p class="publication-venue">
    <em>Advanced Materials, 34(12), 2105678 (2024)</em>
</p>
<div class="publication-links">
    <a href="paper.pdf" class="pub-badge pdf">PDF</a>
    <a href="https://doi.org/10.1002/..." class="pub-badge doi">DOI</a>
</div>
```

---

### 9. Skills (10 minutes)

**Programming Skills** (line ~860)
- Update proficiency percentages: `--skill-level: 90%`
- Add more languages (Python already at 90%, MATLAB at 75%)

**Techniques** (line ~880+)
- Replace placeholder tags with your actual skills
- Examples: `XRD`, `Raman Spectroscopy`, `UV-Vis`, etc.

---

### 10. Stats Counters (2 minutes)

**Find:** `data-target="0"` (4 places, line ~240-260)

Update numbers:
- Publications: `data-target="5"` (your count)
- Projects: `data-target="8"` (your count)
- Years Experience: `data-target="3"` (your years)

---

## 🔍 Quick Search Terms

Open `index.html` and search for these to find all placeholders:

1. `[PLACEHOLDER` - Main content placeholders
2. `placeholder@` - Email placeholders
3. `[YEAR]` - Date placeholders
4. `[TECH]` - Technology tags
5. `data-target="0"` - Stats to update
6. `.image-placeholder` - Images to replace

---

## 📁 Adding Images

### Profile Photo
```html
<!-- Hero section -->
<img src="profile.jpg" alt="Vinayak">
```

### Project Screenshots
```html
<!-- Project cards -->
<img src="project-tls.png" alt="TLS Controller Interface">
<img src="project-analysis.png" alt="Data Analysis Dashboard">
```

### Save images to:
`c:\Users\Vinayak\Desktop\Laser connection\portfolio-website\`

Or create `images/` folder:
`c:\Users\Vinayak\Desktop\Laser connection\portfolio-website\images\`

Then use: `<img src="images/profile.jpg">`

---

## 🚀 Deploy Your Changes

After updating content:

```powershell
cd "c:\Users\Vinayak\Desktop\Laser connection\portfolio-website"
git add .
git commit -m "Update portfolio content with personal information"
git push origin master
```

Wait 1-2 minutes, then check: https://coding-physicist.github.io/

---

## ⏱️ Time Estimate

- **Bare minimum** (30 min): Email, LinkedIn, education years, research areas
- **Good enough** (1 hour): + Research statement, 2-3 projects, some publications
- **Complete** (2 hours): Everything including images, all publications, all skills

---

## 💡 Pro Tips

1. **Start with the easy stuff**: Email, LinkedIn, years
2. **Add images later**: Portfolio works fine with placeholders initially
3. **One section at a time**: Don't try to fill everything at once
4. **Test locally**: Open `index.html` in browser before pushing
5. **Commit often**: Save progress after each major section

---

## ✅ Checklist

Copy this to track your progress:

```
[ ] Profile photo added
[ ] Email updated (4 places)
[ ] LinkedIn updated (3 places)
[ ] Education years filled
[ ] Education details complete
[ ] Research areas described
[ ] Research philosophy written
[ ] Project descriptions added
[ ] Project images added
[ ] Publications listed
[ ] Skills updated
[ ] Stats numbers set
[ ] Google Scholar link
[ ] ORCID/ResearchGate links
[ ] Deploy and test
```

---

**Good luck! Your portfolio looks amazing with the new light theme! 🎉**
