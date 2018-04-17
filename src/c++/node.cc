#include "trie.hpp"
#include <iostream>
#include <map>
#include <node/node.h>
#include <sstream>

static trie::Trie_t<std::string> canonicalTrie;
static bool unlocked = false;

void emplace(const v8::FunctionCallbackInfo<v8::Value>& args)
{
    v8::Isolate* isolate = args.GetIsolate();

    if (args.Length() != 2) {
        isolate->ThrowException(v8::Exception::TypeError(
            v8::String::NewFromUtf8(isolate, "This function requires two parameters")));
        return;
    }

    v8::String::Utf8Value keyFromArgs(args[0]->ToString());
    std::string&& key = std::string(*keyFromArgs);

    v8::String::Utf8Value valueFromArgs(args[1]->ToString());
    std::string&& value = std::string(*valueFromArgs);

    try {
        if (unlocked) {
            canonicalTrie.putIndividualWord(key, value);
        } else {
            throw "[StackTrace] node.cc:emplace - lockdown set, you have to specify the charmap directory.";
        }
    } catch (const char* e) {
        isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, e)));
    }
}

void buildCharmap(const v8::FunctionCallbackInfo<v8::Value>& args)
{
    v8::Isolate* isolate = args.GetIsolate();

    if (args.Length() != 1) {
        isolate->ThrowException(v8::Exception::TypeError(
            v8::String::NewFromUtf8(isolate, "This function requires only one parameter")));
        return;
    }

    v8::String::Utf8Value charmapDirectoryFromArgs(args[0]->ToString());
    std::string&& charmapDirectory = std::string(*charmapDirectoryFromArgs);

    try {
        canonicalTrie.encodeCharacters(charmapDirectory);
        canonicalTrie.buildActiveNodeSet(false);
        canonicalTrie.setFuzzyLimitThreshold(1);
        unlocked = true;
    } catch (const char* e) {
        isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, e)));
    }
}

void search(const v8::FunctionCallbackInfo<v8::Value>& args)
{
    v8::Isolate* isolate = args.GetIsolate();

    if (args.Length() != 1) {
        isolate->ThrowException(
            v8::String::NewFromUtf8(isolate, "This function requires only one parameter"));
        return;
    }

    v8::String::Utf8Value keyFromArgs(args[0]->ToString());
    std::string&& key = std::string(*keyFromArgs);

    try {
        v8::Local<v8::Object> node_obj = v8::Object::New(isolate);
        auto&& trieResponse = canonicalTrie.searchSimilarKeyword(key);

        if (!trieResponse.empty()) {
            node_obj->Set(
                v8::String::NewFromUtf8(isolate, "object"),
                v8::String::NewFromUtf8(isolate, trieResponse.top().content->c_str()));
        }

        args.GetReturnValue().Set(node_obj);

    } catch (const char* err) {
        isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, err)));
    }
}

void autocomplete(const v8::FunctionCallbackInfo<v8::Value>& args)
{
    v8::Isolate* isolate = args.GetIsolate();

    if (args.Length() != 1) {
        isolate->ThrowException(
            v8::String::NewFromUtf8(isolate, "This function requires only one parameter"));
        return;
    }

    v8::String::Utf8Value keyFromArgs(args[0]->ToString());
    std::string key = std::string(*keyFromArgs);

    try {

        v8::Local<v8::Array> nodes = v8::Array::New(isolate);

        auto&& trieResponse = canonicalTrie.autocomplete(key);
        int count = 0;

        while (!trieResponse.empty() && count < 5) {
            nodes->Set(count, v8::String::NewFromUtf8(isolate, trieResponse.top().content->c_str()));
            trieResponse.pop();
            ++count;
        }

        args.GetReturnValue().Set(nodes);

    } catch (const char* err) {
        isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, err)));
    }
}

void __DEBUG__print(const v8::FunctionCallbackInfo<v8::Value>& args)
{
    v8::Isolate* isolate = args.GetIsolate();

    if (args.Length() != 0) {
        isolate->ThrowException(v8::Exception::TypeError(
            v8::String::NewFromUtf8(isolate, "This function requires no parameters")));
        return;
    }

    try {
        canonicalTrie.printTrie();
    } catch (const char* e) {
        isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, e)));
    }
}

void Init(v8::Local<v8::Object> exports)
{
    NODE_SET_METHOD(exports, "buildCharmap", buildCharmap);
    NODE_SET_METHOD(exports, "emplace", emplace);
    NODE_SET_METHOD(exports, "__DEBUG__print", __DEBUG__print);
    NODE_SET_METHOD(exports, "search", search);
    NODE_SET_METHOD(exports, "autocomplete", autocomplete);
}

NODE_MODULE(module_name, Init);