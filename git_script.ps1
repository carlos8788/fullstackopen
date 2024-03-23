# Espera a que el usuario presione Enter para continuar
# Read-Host "Presiona [Enter] para continuar..."

# Asegúrate de que se pasó exactamente un parámetro al script
if ($args.Count -ne 1) {
    Write-Host "Uso: $($MyInvocation.MyCommand.Name) <rama_de_desarrollo>"
    exit 1
}

# Asigna los parámetros a variables para mejorar la legibilidad
$ramaDesarrollo = $args[0]
$ramaPrincipal = 'app'
$fechaActual = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Cambia a la rama principal
git checkout $ramaPrincipal

# Fusiona la rama de desarrollo en la principal
git merge $ramaDesarrollo --no-ff -m "Merge $ramaDesarrollo into $ramaPrincipal time: $fechaActual"

git add .

git commit -m "Merge $ramaDesarrollo time: $fechaActual"
# Hace push de la rama principal al repositorio remoto
git push origin $ramaPrincipal

git checkout $ramaDesarrollo

git branch --list
