const fs = require('fs');
const path = require('path');

const directory = '.';
const files = fs.readdirSync(directory).filter(file => file.endsWith('.html'));

const whatsappLink = 'https://wa.me/919027674560?text=Hari%20Bol!%20I%20would%20like%20to%20plan%20a%20Braj%20Yatra%20with%20Braj%20Miles.';

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace href="contact.html" with whatsapp link IF it has class="btn-*" or is a CTA
    // Regex matches <a href="contact.html" ... class="btn-..."
    // We can just look for specific patterns:
    
    // Pattern 1: Book Tour (destination pages)
    content = content.replace(/href="contact\.html"(\s+class="btn-primary"[^>]*>Book)/g, `href="${whatsappLink}" target="_blank"$1`);
    
    // Pattern 2: Plan your yatra (destination pages)
    content = content.replace(/href="contact\.html"(\s+class="btn-secondary-outline"[^>]*>Plan)/g, `href="${whatsappLink}" target="_blank"$1`);
    
    // Pattern 3: Inquire Now (packages page)
    content = content.replace(/href="contact\.html"(\s+class="btn-book"[^>]*>Inquire Now)/g, `href="${whatsappLink}" target="_blank"$1`);
    
    // Pattern 4: Start planning (index page)
    content = content.replace(/href="contact\.html"(\s+class="btn-primary-outline"[^>]*>Start planning)/g, `href="${whatsappLink}" target="_blank"$1`);

    // Add a floating WhatsApp button globally (just before closing body tag)
    const floatingWhatsApp = `
    <!-- Floating WhatsApp CTA -->
    <a href="${whatsappLink}" target="_blank" style="position: fixed; bottom: 30px; right: 30px; background: #25D366; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 35px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); z-index: 9999; transition: transform 0.3s ease; text-decoration: none;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
      <i class="fa-brands fa-whatsapp"></i>
    </a>
    </body>`;
    
    // Avoid adding multiple floating buttons if script runs twice
    if (!content.includes('<!-- Floating WhatsApp CTA -->')) {
        content = content.replace(/<\/body>/i, floatingWhatsApp);
    }
    
    fs.writeFileSync(file, content);
    console.log(`Updated CTAs in ${file}`);
});
