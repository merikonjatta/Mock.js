What's this?
============

This is a very tiny library for mocking JS objects.
It's sole functionality is to substitute a function with another function.

Benefits:
* Simple
* No dependencies. One file.
* No pollusion. Defines an object called Mock (edit the source if you want to change this).
* No DSL to learn. There's only three functions.


Examples
========

Basic:
      // Use Mock.make() to replace functions.
      // The first argument is a string, the next is a Function object.
      Mock.make("some_func", new_func);
       
      // A call to some_func() invokes new_func()
      some_func();
       
      // Use Mock.revert() to revert.
      Mock.revert("some_func");
       
      // Use Mock.revert_all() to revert all mocks made with Mock.make()
      Mock.revert_all();


Example with jQuery.ajax:
      test("#save saves the text", function(){
          var ajax_called = false;
       
          // We'll mock $.ajax()
          Mock.make("$.ajax", function(opts){
              ajax_called = true;
              // Assert that the options are right when $.ajax is called
              equals(opts.url,        "/jsapi/pages/set_title");
              equals(opts.type,       "post");
              equals(opts.data.id,    page_id);
              equals(opts.data.title, new_title);
              // Invoke the success callback
              opts.success({success:true}, null, null);
          });
       
          // MyLibrary.save should call $.ajax()
          MyLibrary.save(25, "This is the new text.");
          ok(ajax_called, "Ajax was called.");
      });

 
License
=======

The MIT License

Copyright (c) 2011 Shinya Maeyama.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
