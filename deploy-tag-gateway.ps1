# Deploy Cloudflare Worker - Tag Gateway dla serwer-side.pl
# Routes: serwer-side.pl/metrics/* -> www.googletagmanager.com + www.google-analytics.com
# Uzycie: .\deploy-tag-gateway.ps1

$ErrorActionPreference = "Stop"

$envFile = Join-Path $PSScriptRoot ".env"
if (-not (Test-Path $envFile)) {
    Write-Host "Brak pliku .env w $PSScriptRoot" -ForegroundColor Red
    exit 1
}

# Zaladuj env vars z .env (uwzglednij zakomentowane linie z CLOUDFLARE_API_TOKEN)
Get-Content $envFile | ForEach-Object {
    if ($_ -match "^\s*$") { return }
    # Specjalnie obsluz CLOUDFLARE_API_TOKEN nawet jesli zakomentowany
    if ($_ -match "^\s*#\s*(CLOUDFLARE_API_TOKEN)\s*=\s*(.+)\s*$") {
        $name = $Matches[1].Trim()
        $value = $Matches[2].Trim()
        Set-Item -Path "env:$name" -Value $value
        Write-Host "Loaded $name (z komentarza)" -ForegroundColor DarkGray
        return
    }
    if ($_ -match "^\s*#") { return }
    if ($_ -match "^\s*([^=]+)\s*=\s*(.*)\s*$") {
        $name = $Matches[1].Trim()
        $value = $Matches[2].Trim()
        Set-Item -Path "env:$name" -Value $value
    }
}

if (-not $env:CLOUDFLARE_API_TOKEN) {
    Write-Host "Brak CLOUDFLARE_API_TOKEN w .env (sprawdz linie 3, czy jest zakomentowana - skrypt sam ja odkomentuje przy ladowaniu)" -ForegroundColor Red
    exit 1
}

Write-Host "Deploy Tag Gateway Worker..." -ForegroundColor Cyan
Push-Location (Join-Path $PSScriptRoot "workers\tag-gateway")
try {
    npx wrangler deploy
    if (-not $?) { Write-Host "Deploy failed" -ForegroundColor Red; exit 1 }
} finally {
    Pop-Location
}

Write-Host ""
Write-Host "Gotowe! Tag Gateway aktywny na:" -ForegroundColor Green
Write-Host "  https://serwer-side.pl/metrics/gtm.js" -ForegroundColor White
Write-Host "  https://serwer-side.pl/metrics/g/collect" -ForegroundColor White
Write-Host "  https://serwer-side.pl/metrics/ns.html" -ForegroundColor White
Write-Host ""
Write-Host "Test:" -ForegroundColor Cyan
Write-Host '  curl -I "https://serwer-side.pl/metrics/gtm.js?id=GTM-MNFRJGHT"' -ForegroundColor White
