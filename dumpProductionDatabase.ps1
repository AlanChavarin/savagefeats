get-content .env | foreach {
    $name, $value = $_.split('=')
    set-content env:\$name $value
}

mongodump --uri=$env:PRODUCTION_DATABASE_URI --out=./mongodump/