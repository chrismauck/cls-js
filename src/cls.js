/*
 * cls - helper functions for class manipulation
 * https://github.com/chrismauck/cls-js
 * 
 * cls.hasClass( elem, 'class-name' )       => boolean check
 * cls.addClass( elem, 'class-name' )       => add class(es)
 * cls.removeClass( elem, 'class-name' )    => remove class(es)
 * cls.toggleClass( elem, 'class-name' )    => toggle class(es)
 *
 * Modern 'classList' API here:
 * https://developer.mozilla.org/en-US/docs/Web/API/Element.classList
 * 
 */

( function( window ) {

    'use strict';

    var modern = ( 'classList' in document.documentElement ) ? true : false,

        cls = {

            hasClass: function ( e, c ) {
                if(modern){
                    return e.classList.contains( c );
                } else {
                    return e.className.match(new RegExp('(\\s|^)' + c + '(\\s|$)'));
                }
            },

            addClass: function ( e, c ) {
                if(modern){
                    e.classList.add( c );
                } else {
                    if (!this.hasClass( e, c )) e.className += " " + c;
                }
            },

            removeClass: function ( e, c ) {
                if(modern){
                    ( c ) ? e.classList.remove( c ) : e.className = '';
                } else {
                    if (this.hasClass( e, c )) {
                        e.className = e.className.replace(new RegExp('(\\s|^)' + c + '(\\s|$)'), ' ');
                        e.className = e.className.replace(/\s+/g,' ').replace(/^\s|\s$/,'');
                    }
                }
            },

            toggleClass: function ( e, c ) {
                if(modern){
                    var _this = e, names = c.split(/[ ,]+/).forEach(function(n){
                        _this.classList.toggle(n);
                    });
                } else {
                    this.hasClass( e, c ) ? this.removeClass( e, c ) : this.addClass( e, c );
                }
            }

        };

    ( typeof define === 'function' && define.amd ) ? define( cls ) : window.cls = cls;

})( window );
