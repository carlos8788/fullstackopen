
if ($args.Count -ne 1) {
    Write-Host "Uso: $($MyInvocation.MyCommand.Name) <rama_de_desarrollo>"
    exit 1
}

$ramaDesarrollo = $args[0]
$ramaPrincipal = 'app'
$fechaActual = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

git checkout $ramaPrincipal

git merge $ramaDesarrollo --no-ff -m "Merge $ramaDesarrollo into $ramaPrincipal time: $fechaActual"

git add .

git commit -m "Merge $ramaDesarrollo time: $fechaActual"
git push origin $ramaPrincipal

git checkout $ramaDesarrollo

git branch --list
