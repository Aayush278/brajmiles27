import os
import glob

html_files = glob.glob("*.html")
target = """          <div class="social-links">
            <a href="#"><i class="fa-brands fa-instagram"></i></a>
            <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i class="fa-brands fa-youtube"></i></a>
            <a href="#" class="primary-social"><i class="fa-solid fa-bird"></i></a>
          </div>"""

replacement = """          <div class="social-links">
            <a href="#"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://wa.me/919027674560" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp"></i></a>
          </div>"""

for f in html_files:
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
    if target in content:
        content = content.replace(target, replacement)
        with open(f, "w", encoding="utf-8") as file:
            file.write(content)
        print(f"Replaced in {f}")
