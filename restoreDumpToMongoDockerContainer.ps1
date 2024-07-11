get-content .env | foreach {
    $name, $value = $_.split('=')
    set-content env:\$name $value
}

mongorestore --uri=$env:LOCAL_DATABASE_URI --drop ./mongodump/