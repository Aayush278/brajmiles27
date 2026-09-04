const fs = require('fs');

const target = `          <div class="social-links">
            <a href="#"><i class="fa-brands fa-instagram"></i></a>
            <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i class="fa-brands fa-youtube"></i></a>
            <a href="#" class="primary-social"><i class="fa-solid fa-bird"></i></a>
          </div>`;

const replacement = `          <div class="social-links">
            <a href="#"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://wa.me/919027674560" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp"></i></a>
          </div>`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(f, content);
    console.log(`Replaced in ${f}`);
  }
});
