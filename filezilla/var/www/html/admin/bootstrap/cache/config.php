<?php return array(
  'app' =>
  array(
    'name' => 'Chargezone App',
    'env' => 'local',
    'debug' => true,
    'url' => 'https://bss.chargezone.co/admin/',
    'asset_url' => NULL,
    'timezone' => 'Asia/Kolkata',
    'locale' => 'en',
    'fallback_locale' => 'en',
    'faker_locale' => 'en_US',
    'key' => 'base64:W+BHesEQPFtVGvbmKBLaGc+UrNF0YGVuuEcMx+z5dtQ=',
    'cipher' => 'AES-256-CBC',
    'providers' =>
    array(
      0 => 'Illuminate\\Auth\\AuthServiceProvider',
      1 => 'Illuminate\\Broadcasting\\BroadcastServiceProvider',
      2 => 'Illuminate\\Bus\\BusServiceProvider',
      3 => 'Illuminate\\Cache\\CacheServiceProvider',
      4 => 'Illuminate\\Foundation\\Providers\\ConsoleSupportServiceProvider',
      5 => 'Illuminate\\Cookie\\CookieServiceProvider',
      6 => 'Illuminate\\Database\\DatabaseServiceProvider',
      7 => 'Illuminate\\Encryption\\EncryptionServiceProvider',
      8 => 'Illuminate\\Filesystem\\FilesystemServiceProvider',
      9 => 'Illuminate\\Foundation\\Providers\\FoundationServiceProvider',
      10 => 'Illuminate\\Hashing\\HashServiceProvider',
      11 => 'Illuminate\\Mail\\MailServiceProvider',
      12 => 'Illuminate\\Notifications\\NotificationServiceProvider',
      13 => 'Illuminate\\Pagination\\PaginationServiceProvider',
      14 => 'Illuminate\\Pipeline\\PipelineServiceProvider',
      15 => 'Illuminate\\Queue\\QueueServiceProvider',
      16 => 'Illuminate\\Redis\\RedisServiceProvider',
      17 => 'Illuminate\\Auth\\Passwords\\PasswordResetServiceProvider',
      18 => 'Illuminate\\Session\\SessionServiceProvider',
      19 => 'Illuminate\\Translation\\TranslationServiceProvider',
      20 => 'Illuminate\\Validation\\ValidationServiceProvider',
      21 => 'Illuminate\\View\\ViewServiceProvider',
      22 => 'App\\Providers\\AppServiceProvider',
      23 => 'App\\Providers\\AuthServiceProvider',
      24 => 'App\\Providers\\EventServiceProvider',
      25 => 'App\\Providers\\RouteServiceProvider',
      26 => 'Spatie\\Permission\\PermissionServiceProvider',
      27 => 'Jenssegers\\Mongodb\\MongodbServiceProvider',
      28 => 'Maatwebsite\\Excel\\ExcelServiceProvider',
    ),
    'aliases' =>
    array(
      'App' => 'Illuminate\\Support\\Facades\\App',
      'Arr' => 'Illuminate\\Support\\Arr',
      'Artisan' => 'Illuminate\\Support\\Facades\\Artisan',
      'Auth' => 'Illuminate\\Support\\Facades\\Auth',
      'Blade' => 'Illuminate\\Support\\Facades\\Blade',
      'Broadcast' => 'Illuminate\\Support\\Facades\\Broadcast',
      'Bus' => 'Illuminate\\Support\\Facades\\Bus',
      'Cache' => 'Illuminate\\Support\\Facades\\Cache',
      'Config' => 'Illuminate\\Support\\Facades\\Config',
      'Cookie' => 'Illuminate\\Support\\Facades\\Cookie',
      'Crypt' => 'Illuminate\\Support\\Facades\\Crypt',
      'DB' => 'Illuminate\\Support\\Facades\\DB',
      'Eloquent' => 'Illuminate\\Database\\Eloquent\\Model',
      'Event' => 'Illuminate\\Support\\Facades\\Event',
      'File' => 'Illuminate\\Support\\Facades\\File',
      'Gate' => 'Illuminate\\Support\\Facades\\Gate',
      'Hash' => 'Illuminate\\Support\\Facades\\Hash',
      'Http' => 'Illuminate\\Support\\Facades\\Http',
      'Lang' => 'Illuminate\\Support\\Facades\\Lang',
      'Log' => 'Illuminate\\Support\\Facades\\Log',
      'Mail' => 'Illuminate\\Support\\Facades\\Mail',
      'Notification' => 'Illuminate\\Support\\Facades\\Notification',
      'Password' => 'Illuminate\\Support\\Facades\\Password',
      'Queue' => 'Illuminate\\Support\\Facades\\Queue',
      'Redirect' => 'Illuminate\\Support\\Facades\\Redirect',
      'Request' => 'Illuminate\\Support\\Facades\\Request',
      'Response' => 'Illuminate\\Support\\Facades\\Response',
      'Route' => 'Illuminate\\Support\\Facades\\Route',
      'Schema' => 'Illuminate\\Support\\Facades\\Schema',
      'Session' => 'Illuminate\\Support\\Facades\\Session',
      'Storage' => 'Illuminate\\Support\\Facades\\Storage',
      'Str' => 'Illuminate\\Support\\Str',
      'URL' => 'Illuminate\\Support\\Facades\\URL',
      'Validator' => 'Illuminate\\Support\\Facades\\Validator',
      'View' => 'Illuminate\\Support\\Facades\\View',
      'Excel' => 'Maatwebsite\\Excel\\Facades\\Excel',
    ),
  ),
  'auth' =>
  array(
    'defaults' =>
    array(
      'guard' => 'web',
      'passwords' => 'users',
    ),
    'guards' =>
    array(
      'web' =>
      array(
        'driver' => 'session',
        'provider' => 'users',
      ),
      'api' =>
      array(
        'driver' => 'passport',
        'provider' => 'users',
        'hash' => false,
      ),
    ),
    'providers' =>
    array(
      'users' =>
      array(
        'driver' => 'eloquent',
        'model' => 'App\\Models\\User',
      ),
    ),
    'passwords' =>
    array(
      'users' =>
      array(
        'provider' => 'users',
        'table' => 'password_resets',
        'expire' => 60,
        'throttle' => 60,
      ),
    ),
    'password_timeout' => 10800,
  ),
  'broadcasting' =>
  array(
    'default' => 'log',
    'connections' =>
    array(
      'pusher' =>
      array(
        'driver' => 'pusher',
        'key' => '',
        'secret' => '',
        'app_id' => '',
        'options' =>
        array(
          'cluster' => NULL,
          'useTLS' => true,
        ),
      ),
      'ably' =>
      array(
        'driver' => 'ably',
        'key' => NULL,
      ),
      'redis' =>
      array(
        'driver' => 'redis',
        'connection' => 'default',
      ),
      'log' =>
      array(
        'driver' => 'log',
      ),
      'null' =>
      array(
        'driver' => 'null',
      ),
    ),
  ),
  'cache' =>
  array(
    'default' => 'file',
    'stores' =>
    array(
      'apc' =>
      array(
        'driver' => 'apc',
      ),
      'array' =>
      array(
        'driver' => 'array',
        'serialize' => false,
      ),
      'database' =>
      array(
        'driver' => 'database',
        'table' => 'cache',
        'connection' => NULL,
      ),
      'file' =>
      array(
        'driver' => 'file',
        'path' => '/var/www/html/admin/storage/framework/cache/data',
      ),
      'memcached' =>
      array(
        'driver' => 'memcached',
        'persistent_id' => NULL,
        'sasl' =>
        array(
          0 => NULL,
          1 => NULL,
        ),
        'options' =>
        array(),
        'servers' =>
        array(
          0 =>
          array(
            'host' => '127.0.0.1',
            'port' => 11211,
            'weight' => 100,
          ),
        ),
      ),
      'redis' =>
      array(
        'driver' => 'redis',
        'connection' => 'cache',
      ),
      'dynamodb' =>
      array(
        'driver' => 'dynamodb',
        'key' => NULL,
        'secret' => NULL,
        'region' => 'us-east-1',
        'table' => 'cache',
        'endpoint' => NULL,
      ),
    ),
    'prefix' => 'chargezone_app_cache',
  ),
  'cors' =>
  array(
    'paths' =>
    array(
      0 => 'api/*',
      1 => 'sanctum/csrf-cookie',
    ),
    'allowed_methods' =>
    array(
      0 => '*',
    ),
    'allowed_origins' =>
    array(
      0 => '*',
    ),
    'allowed_origins_patterns' =>
    array(),
    'allowed_headers' =>
    array(
      0 => '*',
    ),
    'exposed_headers' =>
    array(),
    'max_age' => 0,
    'supports_credentials' => false,
  ),
  'database' =>
  array(
    'default' => 'mysql',
    'connections' =>
    array(
      'sqlite' =>
      array(
        'driver' => 'sqlite',
        'url' => NULL,
        'database' => 'czdb',
        'prefix' => '',
        'foreign_key_constraints' => true,
      ),
      'mysql' =>
      array(
        'driver' => 'mysql',
        'url' => NULL,
        'host' => 'db-mysql-sep-7-backup-do-user-8787659-0.b.db.ondigitalocean.com',
        'port' => '25060',
        'database' => 'czdb',
        'username' => 'doadmin',
        'password' => 'kgk6an15x12mcg75',
        'unix_socket' => '',
        'charset' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
        'prefix' => '',
        'prefix_indexes' => true,
        'strict' => false,
        'engine' => NULL,
        'options' =>
        array(),
      ),
      'pgsql' =>
      array(
        'driver' => 'pgsql',
        'url' => NULL,
        'host' => 'db-mysql-do-user-8787659-0.b.db.ondigitalocean.com',
        'port' => '25060',
        'database' => 'czdb',
        'username' => 'doadmin',
        'password' => 'kgk6an15x12mcg75',
        'charset' => 'utf8',
        'prefix' => '',
        'prefix_indexes' => true,
        'schema' => 'public',
        'sslmode' => 'prefer',
      ),
      'sqlsrv' =>
      array(
        'driver' => 'sqlsrv',
        'url' => NULL,
        'host' => 'db-mysql-do-user-8787659-0.b.db.ondigitalocean.com',
        'port' => '25060',
        'database' => 'czdb',
        'username' => 'doadmin',
        'password' => 'kgk6an15x12mcg75',
        'charset' => 'utf8',
        'prefix' => '',
        'prefix_indexes' => true,
      ),
      'mongodb' =>
      array(
        'driver' => 'mongodb',
        'dsn' => 'mongodb+srv://bss:Ucx8EH2YPCoEgZOd@bss-mongodb.u6zeg.mongodb.net/chargezone?retryWrites=true&w=majority',
        'database' => 'chargezone',
      ),
    ),
    'migrations' => 'migrations',
    'redis' =>
    array(
      'client' => 'phpredis',
      'options' =>
      array(
        'cluster' => 'redis',
        'prefix' => 'chargezone_app_database_',
      ),
      'default' =>
      array(
        'url' => NULL,
        'host' => '127.0.0.1',
        'password' => NULL,
        'port' => '6379',
        'database' => '0',
      ),
      'cache' =>
      array(
        'url' => NULL,
        'host' => '127.0.0.1',
        'password' => NULL,
        'port' => '6379',
        'database' => '1',
      ),
    ),
  ),
  'excel' =>
  array(
    'exports' =>
    array(
      'chunk_size' => 1000,
      'pre_calculate_formulas' => false,
      'strict_null_comparison' => false,
      'csv' =>
      array(
        'delimiter' => ',',
        'enclosure' => '"',
        'line_ending' => '
',
        'use_bom' => false,
        'include_separator_line' => false,
        'excel_compatibility' => false,
      ),
      'properties' =>
      array(
        'creator' => '',
        'lastModifiedBy' => '',
        'title' => '',
        'description' => '',
        'subject' => '',
        'keywords' => '',
        'category' => '',
        'manager' => '',
        'company' => '',
      ),
    ),
    'imports' =>
    array(
      'read_only' => true,
      'ignore_empty' => false,
      'heading_row' =>
      array(
        'formatter' => 'slug',
      ),
      'csv' =>
      array(
        'delimiter' => ',',
        'enclosure' => '"',
        'escape_character' => '\\',
        'contiguous' => false,
        'input_encoding' => 'UTF-8',
      ),
      'properties' =>
      array(
        'creator' => '',
        'lastModifiedBy' => '',
        'title' => '',
        'description' => '',
        'subject' => '',
        'keywords' => '',
        'category' => '',
        'manager' => '',
        'company' => '',
      ),
    ),
    'extension_detector' =>
    array(
      'xlsx' => 'Xlsx',
      'xlsm' => 'Xlsx',
      'xltx' => 'Xlsx',
      'xltm' => 'Xlsx',
      'xls' => 'Xls',
      'xlt' => 'Xls',
      'ods' => 'Ods',
      'ots' => 'Ods',
      'slk' => 'Slk',
      'xml' => 'Xml',
      'gnumeric' => 'Gnumeric',
      'htm' => 'Html',
      'html' => 'Html',
      'csv' => 'Csv',
      'tsv' => 'Csv',
      'pdf' => 'Dompdf',
    ),
    'value_binder' =>
    array(
      'default' => 'Maatwebsite\\Excel\\DefaultValueBinder',
    ),
    'cache' =>
    array(
      'driver' => 'memory',
      'batch' =>
      array(
        'memory_limit' => 60000,
      ),
      'illuminate' =>
      array(
        'store' => NULL,
      ),
    ),
    'transactions' =>
    array(
      'handler' => 'db',
    ),
    'temporary_files' =>
    array(
      'local_path' => '/var/www/html/admin/storage/framework/laravel-excel',
      'remote_disk' => NULL,
      'remote_prefix' => NULL,
      'force_resync_remote' => NULL,
    ),
  ),
  'filesystems' =>
  array(
    'default' => 'local',
    'disks' =>
    array(
      'local' =>
      array(
        'driver' => 'local',
        'root' => '/var/www/html/admin/storage/app',
      ),
      'public' =>
      array(
        'driver' => 'local',
        'root' => '/var/www/html/admin/storage/app/public',
        'url' => 'https://bss.chargezone.co/admin//storage',
        'visibility' => 'public',
      ),
      'battery_history_excel' =>
      array(
        'driver' => 'local',
        'root' => '/var/www/html/admin/public/battery_history',
        'url' => 'https://bss.chargezone.co/admin//public',
        'visibility' => 'public',
      ),
      's3' =>
      array(
        'driver' => 's3',
        'key' => NULL,
        'secret' => NULL,
        'region' => NULL,
        'bucket' => NULL,
        'url' => NULL,
        'endpoint' => NULL,
      ),
    ),
    'links' =>
    array(
      '/var/www/html/admin/public/storage' => '/var/www/html/admin/storage/app/public',
    ),
  ),
  'hashing' =>
  array(
    'driver' => 'bcrypt',
    'bcrypt' =>
    array(
      'rounds' => 10,
    ),
    'argon' =>
    array(
      'memory' => 1024,
      'threads' => 2,
      'time' => 2,
    ),
  ),
  'logging' =>
  array(
    'default' => 'stack',
    'channels' =>
    array(
      'stack' =>
      array(
        'driver' => 'stack',
        'channels' =>
        array(
          0 => 'single',
        ),
        'ignore_exceptions' => false,
      ),
      'single' =>
      array(
        'driver' => 'single',
        'path' => '/var/www/html/admin/storage/logs/laravel.log',
        'level' => 'debug',
      ),
      'daily' =>
      array(
        'driver' => 'daily',
        'path' => '/var/www/html/admin/storage/logs/laravel.log',
        'level' => 'debug',
        'days' => 14,
      ),
      'slack' =>
      array(
        'driver' => 'slack',
        'url' => NULL,
        'username' => 'Laravel Log',
        'emoji' => ':boom:',
        'level' => 'critical',
      ),
      'papertrail' =>
      array(
        'driver' => 'monolog',
        'level' => 'debug',
        'handler' => 'Monolog\\Handler\\SyslogUdpHandler',
        'handler_with' =>
        array(
          'host' => NULL,
          'port' => NULL,
        ),
      ),
      'stderr' =>
      array(
        'driver' => 'monolog',
        'handler' => 'Monolog\\Handler\\StreamHandler',
        'formatter' => NULL,
        'with' =>
        array(
          'stream' => 'php://stderr',
        ),
      ),
      'syslog' =>
      array(
        'driver' => 'syslog',
        'level' => 'debug',
      ),
      'errorlog' =>
      array(
        'driver' => 'errorlog',
        'level' => 'debug',
      ),
      'null' =>
      array(
        'driver' => 'monolog',
        'handler' => 'Monolog\\Handler\\NullHandler',
      ),
      'emergency' =>
      array(
        'path' => '/var/www/html/admin/storage/logs/laravel.log',
      ),
    ),
  ),
  'mail' =>
  array(
    'default' => 'smtp',
    'mailers' =>
    array(
      'smtp' =>
      array(
        'transport' => 'smtp',
        'host' => 'smtp.mailtrap.io',
        'port' => '2525',
        'encryption' => NULL,
        'username' => NULL,
        'password' => NULL,
        'timeout' => NULL,
        'auth_mode' => NULL,
      ),
      'ses' =>
      array(
        'transport' => 'ses',
      ),
      'mailgun' =>
      array(
        'transport' => 'mailgun',
      ),
      'postmark' =>
      array(
        'transport' => 'postmark',
      ),
      'sendmail' =>
      array(
        'transport' => 'sendmail',
        'path' => '/usr/sbin/sendmail -bs',
      ),
      'log' =>
      array(
        'transport' => 'log',
        'channel' => NULL,
      ),
      'array' =>
      array(
        'transport' => 'array',
      ),
    ),
    'from' =>
    array(
      'address' => NULL,
      'name' => 'Chargezone App',
    ),
    'markdown' =>
    array(
      'theme' => 'default',
      'paths' =>
      array(
        0 => '/var/www/html/admin/resources/views/vendor/mail',
      ),
    ),
  ),
  'passport' =>
  array(
    'private_key' => NULL,
    'public_key' => NULL,
    'client_uuids' => false,
    'personal_access_client' =>
    array(
      'id' => NULL,
      'secret' => NULL,
    ),
    'storage' =>
    array(
      'database' =>
      array(
        'connection' => 'mysql',
      ),
    ),
  ),
  'permission' =>
  array(
    'models' =>
    array(
      'permission' => 'Spatie\\Permission\\Models\\Permission',
      'role' => 'Spatie\\Permission\\Models\\Role',
    ),
    'table_names' =>
    array(
      'roles' => 'roles',
      'permissions' => 'permissions',
      'model_has_permissions' => 'model_has_permissions',
      'model_has_roles' => 'model_has_roles',
      'role_has_permissions' => 'role_has_permissions',
    ),
    'column_names' =>
    array(
      'model_morph_key' => 'model_id',
    ),
    'display_permission_in_exception' => false,
    'display_role_in_exception' => false,
    'enable_wildcard_permission' => false,
    'cache' =>
    array(
      'expiration_time' =>
      DateInterval::__set_state(array(
        'y' => 0,
        'm' => 0,
        'd' => 0,
        'h' => 24,
        'i' => 0,
        's' => 0,
        'f' => 0.0,
        'weekday' => 0,
        'weekday_behavior' => 0,
        'first_last_day_of' => 0,
        'invert' => 0,
        'days' => false,
        'special_type' => 0,
        'special_amount' => 0,
        'have_weekday_relative' => 0,
        'have_special_relative' => 0,
      )),
      'key' => 'spatie.permission.cache',
      'model_key' => 'name',
      'store' => 'default',
    ),
  ),
  'queue' =>
  array(
    'default' => 'sync',
    'connections' =>
    array(
      'sync' =>
      array(
        'driver' => 'sync',
      ),
      'database' =>
      array(
        'driver' => 'database',
        'table' => 'jobs',
        'queue' => 'default',
        'retry_after' => 90,
      ),
      'beanstalkd' =>
      array(
        'driver' => 'beanstalkd',
        'host' => 'localhost',
        'queue' => 'default',
        'retry_after' => 90,
        'block_for' => 0,
      ),
      'sqs' =>
      array(
        'driver' => 'sqs',
        'key' => NULL,
        'secret' => NULL,
        'prefix' => 'https://sqs.us-east-1.amazonaws.com/your-account-id',
        'queue' => 'your-queue-name',
        'suffix' => NULL,
        'region' => 'us-east-1',
      ),
      'redis' =>
      array(
        'driver' => 'redis',
        'connection' => 'default',
        'queue' => 'default',
        'retry_after' => 90,
        'block_for' => NULL,
      ),
    ),
    'failed' =>
    array(
      'driver' => 'database-uuids',
      'database' => 'mysql',
      'table' => 'failed_jobs',
    ),
  ),
  'services' =>
  array(
    'mailgun' =>
    array(
      'domain' => NULL,
      'secret' => NULL,
      'endpoint' => 'api.mailgun.net',
    ),
    'postmark' =>
    array(
      'token' => NULL,
    ),
    'ses' =>
    array(
      'key' => NULL,
      'secret' => NULL,
      'region' => 'us-east-1',
    ),
  ),
  'session' =>
  array(
    'driver' => 'file',
    'lifetime' => 120,
    'expire_on_close' => false,
    'encrypt' => false,
    'files' => '/var/www/html/admin/storage/framework/sessions',
    'connection' => NULL,
    'table' => 'sessions',
    'store' => NULL,
    'lottery' =>
    array(
      0 => 2,
      1 => 100,
    ),
    'cookie' => 'chargezone_app_session',
    'path' => '/',
    'domain' => NULL,
    'secure' => NULL,
    'http_only' => true,
    'same_site' => 'lax',
  ),
  'view' =>
  array(
    'paths' =>
    array(
      0 => '/var/www/html/admin/resources/views',
    ),
    'compiled' => '/var/www/html/admin/storage/framework/views',
  ),
  'flare' =>
  array(
    'key' => NULL,
    'reporting' =>
    array(
      'anonymize_ips' => true,
      'collect_git_information' => false,
      'report_queries' => true,
      'maximum_number_of_collected_queries' => 200,
      'report_query_bindings' => true,
      'report_view_data' => true,
      'grouping_type' => NULL,
    ),
    'send_logs_as_events' => true,
  ),
  'ignition' =>
  array(
    'editor' => 'phpstorm',
    'theme' => 'light',
    'enable_share_button' => true,
    'register_commands' => false,
    'ignored_solution_providers' =>
    array(
      0 => 'Facade\\Ignition\\SolutionProviders\\MissingPackageSolutionProvider',
    ),
    'enable_runnable_solutions' => NULL,
    'remote_sites_path' => '',
    'local_sites_path' => '',
    'housekeeping_endpoint_prefix' => '_ignition',
  ),
  'trustedproxy' =>
  array(
    'proxies' => NULL,
    'headers' => 94,
  ),
  'tinker' =>
  array(
    'commands' =>
    array(),
    'alias' =>
    array(),
    'dont_alias' =>
    array(
      0 => 'App\\Nova',
    ),
  ),
);
