var Mock = {
  store: {},
 
  make: function(funcname, newfunc){
    if (this.store[funcname]==undefined){
      this.store[funcname] = (function(){
        return eval(funcname);
      }).apply(arguments.caller);
    }
    (function(){
      eval(funcname+"=newfunc;");
    }).apply(arguments.caller);
  },
 
  revert: function(funcname){
    if(this.store[funcname]!=undefined){
      var self = this;
      (function(){
        eval(funcname+"=self.store[funcname];");
      }).apply(arguments.caller);
      this.store[funcname] = undefined;
    }
  },
 
  revert_all: function(){
    for(var funcname in this.store){
      this.revert(funcname);
    }
  },
};
