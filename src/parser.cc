#include "parser.h"
#include "rapidxml.hpp"
#include "legacy.h"

#include <algorithm>
#include <cstdlib>
#include <memory>
#include <string>
#include <errno.h>

struct Options {
  v8::Local<v8::Value> emptyTagValue;

  bool groupAttributes;
  bool parseInteger;
  bool parseBoolean;
  bool parseDouble;
  bool preserveCase;
  bool explicitArray;
  bool ignoreAttributes;

  std::string attributePrefix;
  std::string valueKey;

  void SaveToPersistent(Nan::AsyncWorker *worker) {
    worker->SaveToPersistent("emptyTagValue", emptyTagValue);
  }

  void LoadFromPersistent(Nan::AsyncWorker *worker) {
    emptyTagValue = worker->GetFromPersistent("emptyTagValue");
  }
};

static std::string trim(const std::string &s)
{
  size_t first = s.find_first_not_of(" \t\n\r");
  if (first == std::string::npos)
    return std::string("");
  size_t last = s.find_last_not_of(" \t\n\r");
  return s.substr(first, (last - first + 1));
}

static void toLower(std::string &s)
{
  std::transform(s.begin(), s.end(), s.begin(), ::tolower);
}

static v8::Local<v8::Value> parseText(const Options &options, const std::string &text)
{
  if (text.find_first_not_of(" \t\n\r") == std::string::npos) // empty string
    return Nan::New<v8::String>(text).ToLocalChecked();

  std::string tmp = text;
  if (!options.preserveCase)
    toLower(tmp);
  if (options.parseBoolean)
  {
    if (tmp == "true")
      return Nan::New<v8::Boolean>(true);
    else if (tmp == "false")
      return Nan::New<v8::Boolean>(false);
  }

  char *c = const_cast<char *>(text.c_str());
  if (options.parseDouble)
  {
    double d = ::strtod(text.c_str(), &c);
    if (*c == '\0')
      return Nan::New<v8::Number>(d);
  }
  else if (options.parseInteger)
  {
    long l = ::strtol(text.c_str(), &c, 10);
    if (!(text.c_str() == c || *c != '\0' || ((l == LONG_MIN || l == LONG_MAX) && errno == ERANGE)))
      return Nan::New<v8::Number>(l);
  }

  return Nan::New<v8::String>(text).ToLocalChecked();
}

static v8::Local<v8::Value> walk(const Options &options, const rapidxml::xml_node<> *node)
{
  v8::Local<v8::Value> ret = options.emptyTagValue;
  int len = 0;
  std::string collected = "";

  // handle attributes here

  if (!options.ignoreAttributes && node->first_attribute())
  {
    v8::Local<v8::Value> attr = ret = Nan::New<v8::Object>();

    if (options.groupAttributes) {
      attr = Nan::New<v8::Object>();
      Nan::Set(v8::Local<v8::Object>::Cast(ret), Nan::New<v8::String>(options.attributePrefix).ToLocalChecked(), attr);
    }

    for (const rapidxml::xml_attribute<> *a = node->first_attribute(); a; a = a->next_attribute())
    {
      std::string tmp;
      ++len;

      if (options.groupAttributes) {
        tmp = std::string(a->name());
      } else {
        tmp = options.attributePrefix + std::string(a->name());
      }

      if (!options.preserveCase)
        toLower(tmp);
      Nan::Set(v8::Local<v8::Object>::Cast(attr), Nan::New<v8::String>(tmp).ToLocalChecked(), parseText(options, trim(std::string(a->value()))));
    }
  }

  for (const rapidxml::xml_node<> *n = node->first_node(); n; n = n->next_sibling())
  {
    const rapidxml::node_type t = n->type();
    if (t == rapidxml::node_data)
      collected += trim(std::string(node->value()));
    else if (t == rapidxml::node_cdata)
      collected += std::string(node->first_node()->value());
    else if (t == rapidxml::node_comment)
    {
      if (len == 0)
        ret = Nan::New<v8::Object>();
      std::string prop = n->name();
      if (!options.preserveCase)
        toLower(prop);
      v8::Local<v8::Value> obj = parseText(options, trim(std::string(n->value())));
      v8::Local<v8::Object> myret = v8::Local<v8::Object>::Cast(ret);

      v8::Local<v8::String> key = Nan::New<v8::String>(prop).ToLocalChecked();
      if (Nan::HasOwnProperty(myret, key).FromJust())
      {
        v8::Local<v8::Value> arr = Nan::Get(myret, Nan::New<v8::String>(prop).ToLocalChecked()).ToLocalChecked();
        v8::Local<v8::Array> a = v8::Local<v8::Array>::Cast(arr);
        Nan::Set(a, a->Length(), obj);
      }
      else
      {
        v8::Local<v8::Array> a = Nan::New<v8::Array>();
        Nan::Set(a, 0, obj);
        Nan::Set(myret, key, a);
        ++len;
      }
    }
    else if (t == rapidxml::node_element)
    {
      if (len == 0)
        ret = Nan::New<v8::Object>();
      std::string prop = n->name();
      if (!options.preserveCase)
        toLower(prop);
      v8::Local<v8::Value> obj = walk(options, n);
      v8::Local<v8::Object> myret = v8::Local<v8::Object>::Cast(ret);

      v8::Local<v8::String> key = Nan::New<v8::String>(prop).ToLocalChecked();
      if (Nan::HasOwnProperty(myret, key).FromJust())
      {
        Nan::MaybeLocal<v8::Value> marr = Nan::Get(myret, Nan::New<v8::String>(prop).ToLocalChecked());
        v8::Local<v8::Value> arr = marr.ToLocalChecked();
        if (!arr->IsArray())
        {
          v8::Local<v8::Array> a = Nan::New<v8::Array>();
          Nan::Set(a, 0, Nan::Get(myret, key).ToLocalChecked());
          Nan::Set(myret, key, a);
          arr = a;
        }
        v8::Local<v8::Array> a = v8::Local<v8::Array>::Cast(arr);
        Nan::Set(a, a->Length(), obj);
      }
      else
      {
        if (options.explicitArray)
        {
          v8::Local<v8::Array> a = Nan::New<v8::Array>();
          Nan::Set(a, 0, obj);
          Nan::Set(myret, key, a);
        }
        else
        {
          Nan::Set(myret, key, obj);
        }
        ++len;
      }
    }
  }
  if (collected.length() > 0)
  {
    if (len > 0)
      Nan::Set(v8::Local<v8::Object>::Cast(ret), Nan::New<v8::String>(options.valueKey).ToLocalChecked(), parseText(options, collected));
    else
      ret = parseText(options, collected);
  }

  return ret;
}

static bool parseArgs(const Nan::FunctionCallbackInfo<v8::Value> &args, Options &options)
{
  if (args.Length() < 1)
  {
    Nan::ThrowError("Wrong number of arguments");
    return false;
  }
  if (args.Length() >= 2)
  {
    if (!args[0]->IsString() && !args[0]->IsObject())
    {
      Nan::ThrowError("Wrong argument; expected String or Buffer");
      return false;
    }
    if (!args[1]->IsObject())
    {
      Nan::ThrowError("Wrong argument; expected Object");
      return false;
    }
    else
    {
      v8::Isolate* isolate = args.GetIsolate();
      v8::Local<v8::Object> tmp = v8::Local<v8::Object>::Cast(args[1]);
      if (Nan::HasOwnProperty(tmp, Nan::New<v8::String>("attr_prefix").ToLocalChecked()).FromMaybe(false)) {
        v8::Local<v8::Value> foo = Nan::Get(tmp, Nan::New("attr_prefix").ToLocalChecked()).ToLocalChecked();
        Utf8ValueWrapper gAttributePrefixObj(isolate, foo);
        options.attributePrefix = *gAttributePrefixObj;
      }
      else
        options.attributePrefix = "@";
      if (!Nan::HasOwnProperty(tmp, Nan::New<v8::String>("empty_tag_value").ToLocalChecked()).FromMaybe(false))
        options.emptyTagValue = Nan::New<v8::Boolean>(true);
      else
        options.emptyTagValue = (Nan::Get(tmp, Nan::New<v8::String>("empty_tag_value").ToLocalChecked())).ToLocalChecked();
      if (Nan::HasOwnProperty(tmp, Nan::New<v8::String>("value_key").ToLocalChecked()).FromMaybe(false)) {
        v8::Local<v8::Value> foo = Nan::Get(tmp, Nan::New("value_key").ToLocalChecked()).ToLocalChecked();
        Utf8ValueWrapper gValueKeyObj(isolate, foo);
        options.valueKey = *gValueKeyObj;
      }
      else
        options.valueKey = "keyValue";
      if (Nan::HasOwnProperty(tmp, Nan::New<v8::String>("group_attrs").ToLocalChecked()).FromMaybe(false))
        options.groupAttributes = Nan::To<bool>(Nan::Get(tmp, Nan::New<v8::String>("group_attrs").ToLocalChecked()).ToLocalChecked()).FromJust();
      else
        options.groupAttributes = false;
      if (Nan::HasOwnProperty(tmp, Nan::New<v8::String>("parse_boolean_values").ToLocalChecked()).FromMaybe(false))
        options.parseBoolean = Nan::To<bool>(Nan::Get(tmp, Nan::New<v8::String>("parse_boolean_values").ToLocalChecked()).ToLocalChecked()).FromJust();
      else
        options.parseBoolean = true;
      if (Nan::HasOwnProperty(tmp, Nan::New<v8::String>("parse_float_values").ToLocalChecked()).FromMaybe(false))
        options.parseDouble = Nan::To<bool>(Nan::Get(tmp, Nan::New<v8::String>("parse_float_values").ToLocalChecked()).ToLocalChecked()).FromJust();
      else
        options.parseDouble = true;
      if (Nan::HasOwnProperty(tmp, Nan::New<v8::String>("parse_int_values").ToLocalChecked()).FromMaybe(false))
        options.parseInteger = Nan::To<bool>(Nan::Get(tmp, Nan::New<v8::String>("parse_int_values").ToLocalChecked()).ToLocalChecked()).FromJust();
      else
        options.parseInteger = true;
      if (Nan::HasOwnProperty(tmp, Nan::New<v8::String>("preserve_case").ToLocalChecked()).FromMaybe(false))
        options.preserveCase = Nan::To<bool>(Nan::Get(tmp, Nan::New<v8::String>("preserve_case").ToLocalChecked()).ToLocalChecked()).FromJust();
      else
        options.preserveCase = false;
      if (Nan::HasOwnProperty(tmp, Nan::New<v8::String>("explicit_array").ToLocalChecked()).FromMaybe(false))
        options.explicitArray = Nan::To<bool>(Nan::Get(tmp, Nan::New<v8::String>("explicit_array").ToLocalChecked()).ToLocalChecked()).FromJust();
      else
        options.explicitArray = false;
      if (Nan::HasOwnProperty(tmp, Nan::New<v8::String>("ignore_attr").ToLocalChecked()).FromMaybe(false))
        options.ignoreAttributes = Nan::To<bool>(Nan::Get(tmp, Nan::New<v8::String>("ignore_attr").ToLocalChecked()).ToLocalChecked()).FromJust();
      else
        options.ignoreAttributes = false;
    }
  }
  else
  {
    options.emptyTagValue = Nan::Null();
    options.groupAttributes = true;
    options.parseBoolean = true;
    options.parseDouble = true;
    options.parseInteger = true;
    options.preserveCase = true;
    options.explicitArray = false;
    options.ignoreAttributes = false;
    options.attributePrefix = "@";
    options.valueKey = "keyValue";
  }
  return true;
}

NAN_METHOD(parse)
{
  Options options;

  if (!parseArgs(info, options))
  {
    info.GetReturnValue().SetUndefined();
    return;
  }

  Nan::Utf8String xml(info[0]);
  rapidxml::xml_document<char> doc;
  try
  {
    doc.parse<0x40>(*xml);
  }
  catch (rapidxml::parse_error &)
  {
    info.GetReturnValue().SetUndefined();
    return;
  }

  if (doc.first_node())
  {
    if (!doc.first_node()->first_attribute() && !doc.first_node()->first_node())
      return info.GetReturnValue().Set(Nan::New<v8::Object>());
    v8::Local<v8::Value> obj = walk(options, doc.first_node());
    info.GetReturnValue().Set(obj);
    return;
  }

  info.GetReturnValue().SetUndefined();
}
