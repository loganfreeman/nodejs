function include(klass, mixins) {
    for(var i = 0, ii = mixins.length; i < ii; i++) {
      for(var methodName in mixins[i]) {
        klass.prototype[methodName] = mixins[i][methodName];
      }
    }
  };
