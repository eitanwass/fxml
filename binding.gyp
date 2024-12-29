{
  'targets': [
    {
      'target_name': 'fxml',
      'sources': [
        'src/fxml.cc',
        'src/parser.cc'
      ],
      'cflags!': [ '-fno-exceptions' ],
      'cflags_cc!': [ '-fno-exceptions' ],
      'include_dirs': ["<!(node -e \"require('nan')\")"],
      'conditions': [
        ['OS=="mac"', {
          'xcode_settings': {
            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
          }
        }]
      ],
    }
  ]
}
