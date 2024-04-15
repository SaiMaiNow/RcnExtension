fx_version 'adamant'
game 'gta5'
description 'สนับสนุนสินค้า Rcn ได้ที่ https://discord.gg/C3usCxrwTP'

ui_page 'ui/index.html'

client_scripts {
  'config.lua',
  'client/cl_main.lua',
}

server_scripts {
  'config.lua',
  'server/sv_main.lua',
}

files {
  'ui/index.html',
  'ui/css/*.css',
  'ui/js/*.js',
}

lua54 'yes'