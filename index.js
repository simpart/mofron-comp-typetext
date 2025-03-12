/**
 * @file mofron-comp-typetext/index.js
 * @brief typewriter-style text component for mofron.
 * @license MIT
 */
const Text     = require('mofron-comp-text');
const Fade     = require('mofron-effect-fade');
const ConfArg  = mofron.class.ConfArg;
const comutl   = mofron.util.common;

module.exports = class extends Text {
    /**
     * initialize component
     * 
     * @param (mixed) 
     *                key-value: component config
     * @short 
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname('TypeText');

            this.confmng().add('fade', { type:"number", init:0 });
            this.confmng().add('size', { type:"size", init:"0.16rem" });
	    this.confmng().add('speed', { type:"number", init:100 });
            
	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts () {
        try {
	    super.initDomConts();
            this.style({ 'display':'flex' });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    afterRender () {
        try {
            super.beforeRender();
            let txt_lst  = this.child();
	    let txt_idx  = 0;

	    for (let tidx in txt_lst) {
                // set size
                txt_lst[tidx].size(this.size());
                if (0 < this.fade()) {
                    // set fade
                    txt_lst[tidx].effect(new Fade(true,this.fade()));
                }
	    }

            let interval = setInterval(
                () => {
                    if (txt_idx < txt_lst.length) {
                        // display target charactor with fade effect
                        txt_lst[txt_idx].visible(true);
                        txt_idx++;
                    } else {
                        // text display is finished
                        clearInterval(interval);
                    }
                },
                this.speed()
            );
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    text (prm) {
        try {
            for (let i = 0; i < prm.length; i++) {
		this.child(
                    new Text({
                        text:    prm[i],
                        //effect:  new Fade(true, 200),
                        visible: false
                    })
                );
            }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    fade (prm) {
        try {
            return this.confmng("fade", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    size (prm) {
        try {
            return this.confmng("size", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    speed (prm) {
        try {
            return this.confmng('speed', prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
