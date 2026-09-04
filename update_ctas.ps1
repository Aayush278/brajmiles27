$ErrorActionPreference = "Stop"

$directory = "."
$files = Get-ChildItem -Path $directory -Filter "*.html"
$whatsappLink = "https://wa.me/919027674560?text=Hari%20Bol!%20I%20would%20like%20to%20plan%20a%20Braj%20Yatra%20with%20Braj%20Miles."

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw

    # Pattern 1: Book Tour (destination pages)
    $content = $content -replace 'href="contact\.html"(\s+class="btn-primary"[^>]*>Book)', "href=`"$whatsappLink`" target=`"_blank`"`$1"
    
    # Pattern 2: Plan your yatra (destination pages)
    $content = $content -replace 'href="contact\.html"(\s+class="btn-secondary-outline"[^>]*>Plan)', "href=`"$whatsappLink`" target=`"_blank`"`$1"
    
    # Pattern 3: Inquire Now (packages page)
    $content = $content -replace 'href="contact\.html"(\s+class="btn-book"[^>]*>Inquire Now)', "href=`"$whatsappLink`" target=`"_blank`"`$1"
    
    # Pattern 4: Start planning (index page)
    $content = $content -replace 'href="contact\.html"(\s+class="btn-primary-outline"[^>]*>Start planning)', "href=`"$whatsappLink`" target=`"_blank`"`$1"

    $floatingWhatsApp = @"
    <!-- Floating WhatsApp CTA -->
    <a href="$whatsappLink" target="_blank" style="position: fixed; bottom: 30px; right: 30px; background: #25D366; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 35px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); z-index: 9999; transition: transform 0.3s ease; text-decoration: none;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
      <i class="fa-brands fa-whatsapp"></i>
    </a>
    </body>
"@

    if (-not $content.Contains("<!-- Floating WhatsApp CTA -->")) {
        $content = $content -replace '(?i)</body>', $floatingWhatsApp
    }

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "Updated CTAs in $($file.Name)"
}
