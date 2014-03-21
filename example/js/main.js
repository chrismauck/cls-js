/*
 * basic javascript for cls-js example script
 * 
 * Hide nav on scroll down, display on scroll up and display on mouse move near top
 * mouse move near top of screen.
 *
 * Uses cls.js available here:
 * https://github.com/chrismauck/cls-js
 * 
 */

( function() {
    var mypos = document.body.scrollTop || document.documentElement.scrollTop,
        target = document.getElementById('main-nav'),
        up = false, animating = false,
        mymaus, mytime, newscroll;

    document.onmousemove = function(e) {
        e = e || window.event;
        mymaus = e.clientY;

        if(!animating && cls.hasClass( target, 'detached' )){
            if(mymaus <= 70){
                if(!cls.hasClass( target, 'visible' )){
                    cls.removeClass( target, 'hidden' );
                    cls.addClass( target, 'visible' );
                }
            } else {
                cls.removeClass( target, 'visible' );
                cls.addClass( target, 'hidden' );
            }
        }
    };

    window.onscroll = function() {
        newscroll = document.body.scrollTop || document.documentElement.scrollTop;
        window.clearTimeout(mytime);
        animating = true;
        if (newscroll > mypos){
            if(mypos > 40){
                if(cls.hasClass( target, 'visible' )){
                    cls.removeClass( target, 'visible' );
                    cls.addClass( target, 'hidden' );
                }
            }
            if(mypos > 80){
                if(!cls.hasClass( target, 'detached' )){
                    cls.addClass( target, 'detached' );
                }
            }
            up = !up;

        } else if(newscroll < mypos){
            cls.removeClass( target, 'hidden' );
            cls.addClass( target, 'visible' );
            if (mypos < 40){
                if(cls.hasClass( target, 'detached' )){
                    cls.removeClass( target, 'detached' );
                }
            }
            up = !up;
        }
        mypos = newscroll;
        mytime = setTimeout(function(){
            animating = false;
        }, 500);
    };
})();