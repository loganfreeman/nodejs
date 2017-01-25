function registerCompiler(moduleDescriptor) {
			if(moduleDescriptor) {
				if(typeof moduleDescriptor === "string") {
					require(moduleDescriptor);
				} else if(!Array.isArray(moduleDescriptor)) {
					moduleDescriptor.register(require(moduleDescriptor.module));
				} else {
					for(var i = 0; i < moduleDescriptor.length; i++) {
						try {
							registerCompiler(moduleDescriptor[i]);
							break;
						} catch(e) {
							// do nothing
						}
					}
				}
			}
		}

		registerCompiler(interpret.extensions[ext]);
