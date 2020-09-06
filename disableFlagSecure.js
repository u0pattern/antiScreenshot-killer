Java.perform(function() {
    var surfaceView = Java.use('android.view.SurfaceView');
    var set_secure = surfaceView.setSecure.overload('boolean');

    set_secure.implementation = function(flag){
        console.log("SurfaceView.setSecure() Method called with args: " + flag); 
        set_secure.call(false);
    };

    var window = Java.use('android.view.Window');
    var set_flags = window.setFlags.overload('int', 'int');

    var windowManager = Java.use('android.view.WindowManager');
    var layoutParams = Java.use('android.view.WindowManager$LayoutParams');

    set_flags.implementation = function(flags, mask){
        console.log("Disabling FLAG_SECURE...");
        flags =(flags.value & ~layoutParams.FLAG_SECURE.value);
		// Java: getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);
		// Kotlin: window.setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);
        set_flags.call(this, flags, mask);
    };
});
