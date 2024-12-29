#include "parser.h"

NAN_MODULE_INIT(InitAll)
{
  NAN_EXPORT(target, parse);
}

NODE_MODULE(fxml, InitAll)
