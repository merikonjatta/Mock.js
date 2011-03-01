= What's this? =

This is a very tiny library for mocking JS objects.
It's sole functionality is to substitute a function with another function.

Benefits:
* Simple
* No dependencies. One file.
* No pollusion. Defines an object called Mock (edit the source if you want to change this).
* No DSL to learn. There's only three functions.


= Examples =

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