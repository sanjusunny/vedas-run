/*
 * Kontra.js v3.0.0 (Custom Build on 2017-08-16) | MIT
 * Build: https://straker.github.io/kontra/download?files=gameLoop+keyboard+sprite+assets+pool+spriteSheet+store
 */
export var kontra = {

    /**
     * Initialize the canvas.
     * @memberof kontra
     *
     * @param {string|HTMLCanvasElement} canvas - Main canvas ID or Element for the game.
     */
    init: function init(canvas) {

        // check if canvas is a string first, an element next, or default to getting
        // first canvas on page
        var canvasEl = this.canvas = document.getElementById(canvas) ||
            canvas ||
            document.querySelector('canvas');

        if (!this._isCanvas(canvasEl)) {
            throw Error('You must provide a canvas element for the game');
        }

        this.context = canvasEl.getContext('2d');
    },

    /**
     * Noop function.
     * @see https://stackoverflow.com/questions/21634886/what-is-the-javascript-convention-for-no-operation#comment61796464_33458430
     * @memberof kontra
     * @private
     *
     * The new operator is required when using sinon.stub to replace with the noop.
     */
    _noop: new Function,

    /*
     * Determine if a value is a String.
     * @see https://github.com/jed/140bytes/wiki/Byte-saving-techniques#coercion-to-test-for-types
     * @memberof kontra
     * @private
     *
     * @param {*} value - Value to test.
     *
     * @returns {boolean}
     */
    _isString: function isString(value) {
        return ''+value === value;
    },

    /**
     * Determine if a value is a Number.
     * @see https://github.com/jed/140bytes/wiki/Byte-saving-techniques#coercion-to-test-for-types
     * @memberof kontra
     * @private
     *
     * @param {*} value - Value to test.
     *
     * @returns {boolean}
     */
    _isNumber: function isNumber(value) {
        return +value === value;
    },

    /**
     * Determine if a value is a Function.
     * @memberof kontra
     * @private
     *
     * @param {*} value - Value to test.
     *
     * @returns {boolean}
     */
    _isFunc: function isFunction(value) {
        return typeof value === 'function';
    },

    /**
     * Determine if a value is an Image. An image can also be a canvas element for
     * the purposes of drawing using drawImage().
     * @memberof kontra
     * @private
     *
     * @param {*} value - Value to test.
     *
     * @returns {boolean}
     */
    _isImage: function isImage(value) {
        return !!value && value.nodeName === 'IMG' || this._isCanvas(value);
    },

    /**
     * Determine if a value is a Canvas.
     * @memberof kontra
     * @private
     *
     * @param {*} value - Value to test.
     *
     * @returns {boolean}
     */
    _isCanvas: function isCanvas(value) {
        return !!value && value.nodeName === 'CANVAS';
    }
};

(function(kontra, requestAnimationFrame, performance) {

    /**
     * Game loop that updates and renders the game every frame.
     * @memberof kontra
     *
     * @param {object}   properties - Properties of the game loop.
     * @param {number}   [properties.fps=60] - Desired frame rate.
     * @param {boolean}  [properties.clearCanvas=true] - Clear the canvas every frame.
     * @param {function} properties.update - Function called to update the game.
     * @param {function} properties.render - Function called to render the game.
     */
    kontra.gameLoop = function(properties) {
        properties = properties || {};

        // check for required functions
        if ( !(kontra._isFunc(properties.update) && kontra._isFunc(properties.render)) ) {
            throw Error('You must provide update() and render() functions');
        }

        // animation variables
        var fps = properties.fps || 60;
        var accumulator = 0;
        var delta = 1E3 / fps;  // delta between performance.now timings (in ms)
        var step = 1 / fps;

        var clear = (properties.clearCanvas === false ?
            kontra._noop :
            function clear() {
                kontra.context.clearRect(0,0,kontra.canvas.width,kontra.canvas.height);
            });
        var last, rAF, now, dt;

        /**
         * Called every frame of the game loop.
         */
        function frame() {
            rAF = requestAnimationFrame(frame);

            now = performance.now();
            dt = now - last;
            last = now;

            // prevent updating the game with a very large dt if the game were to lose focus
            // and then regain focus later
            if (dt > 1E3) {
                return;
            }

            accumulator += dt;

            while (accumulator >= delta) {
                gameLoop.update(step);

                accumulator -= delta;
            }

            clear();
            gameLoop.render();
        }

        // game loop object
        var gameLoop = {
            update: properties.update,
            render: properties.render,
            isStopped: true,

            /**
             * Start the game loop.
             * @memberof kontra.gameLoop
             */
            start: function start() {
                last = performance.now();
                this.isStopped = false;
                requestAnimationFrame(frame);
            },

            /**
             * Stop the game loop.
             */
            stop: function stop() {
                this.isStopped = true;
                cancelAnimationFrame(rAF);
            },

            // expose properties for testing
            _frame: frame,
            set _last(value) {
                last = value;
            }
        };

        return gameLoop;
    };
})(kontra, requestAnimationFrame, performance);

(function() {
    var callbacks = {};
    var pressedKeys = {};

    var keyMap = {
        // named keys
        8: 'backspace',
        9: 'tab',
        13: 'enter',
        16: 'shift',
        17: 'ctrl',
        18: 'alt',
        20: 'capslock',
        27: 'esc',
        32: 'space',
        33: 'pageup',
        34: 'pagedown',
        35: 'end',
        36: 'home',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        45: 'insert',
        46: 'delete',
        91: 'leftwindow',
        92: 'rightwindow',
        93: 'select',
        144: 'numlock',
        145: 'scrolllock',

        // special characters
        106: '*',
        107: '+',
        109: '-',
        110: '.',
        111: '/',
        186: ';',
        187: '=',
        188: ',',
        189: '-',
        190: '.',
        191: '/',
        192: '`',
        219: '[',
        220: '\\',
        221: ']',
        222: '\''
    };

    // alpha keys
    // @see https://stackoverflow.com/a/43095772/2124254
    for (var i = 0; i < 26; i++) {
        keyMap[65+i] = (10 + i).toString(36);
    }
    // numeric keys and keypad
    for (i = 0; i < 10; i++) {
        keyMap[48+i] = ''+i;
        keyMap[96+i] = 'numpad'+i;
    }
    // f keys
    for (i = 1; i < 20; i++) {
        keyMap[111+i] = 'f'+i;
    }

    var addEventListener = window.addEventListener;
    addEventListener('keydown', keydownEventHandler);
    addEventListener('keyup', keyupEventHandler);
    addEventListener('blur', blurEventHandler);

    /**
     * Execute a function that corresponds to a keyboard key.
     * @private
     *
     * @param {Event} e
     */
    function keydownEventHandler(e) {
        var key = keyMap[e.which];
        pressedKeys[key] = true;

        if (callbacks[key]) {
            callbacks[key](e);
        }
    }

    /**
     * Set the released key to not being pressed.
     * @private
     *
     * @param {Event} e
     */
    function keyupEventHandler(e) {
        var key = keyMap[e.which];
        pressedKeys[key] = false;
    }

    /**
     * Reset pressed keys.
     * @private
     *
     * @param {Event} e
     */
    function blurEventHandler(e) {
        pressedKeys = {};
    }

    /**
     * Object for using the keyboard.
     */
    kontra.keys = {
        /**
         * Register a function to be called on a key press.
         * @memberof kontra.keys
         *
         * @param {string|string[]} keys - key or keys to bind.
         */
        bind: function bindKey(keys, callback) {
            keys = (Array.isArray(keys) ? keys : [keys]);

            for (var i = 0, key; key = keys[i]; i++) {
                callbacks[key] = callback;
            }
        },

        /**
         * Remove the callback function for a key.
         * @memberof kontra.keys
         *
         * @param {string|string[]} keys - key or keys to unbind.
         */
        unbind: function unbindKey(keys) {
            keys = (Array.isArray(keys) ? keys : [keys]);

            for (var i = 0, key; key = keys[i]; i++) {
                callbacks[key] = null;
            }
        },

        /**
         * Returns whether a key is pressed.
         * @memberof kontra.keys
         *
         * @param {string} key - Key to check for press.
         *
         * @returns {boolean}
         */
        pressed: function keyPressed(key) {
            return !!pressedKeys[key];
        }
    };
})();

(function(kontra, Math, Infinity) {

    /**
     * A vector for 2D space.
     *
     * Because each sprite has 3 vectors and there could possibly be hundreds of
     * sprites at once, we can't return a new object with new functions every time
     * (which saves on having to use `this` everywhere). Instead, we'll use a
     * prototype so vectors only take up an x and y value and share functions.
     * @memberof kontra
     *
     * @param {number} [x=0] - X coordinate.
     * @param {number} [y=0] - Y coordinate.
     */
    kontra.vector = function(x, y) {
        var vector = Object.create(kontra.vector.prototype);
        vector._init(x, y);

        return vector;
    };

    kontra.vector.prototype = {
        /**
         * Initialize the vectors x and y position.
         * @memberof kontra.vector
         * @private
         *
         * @param {number} [x=0] - X coordinate.
         * @param {number} [y=0] - Y coordinate.
         *
         * @returns {vector}
         */
        _init: function init(x, y) {
            this._x = x || 0;
            this._y = y || 0;
        },

        /**
         * Add a vector to this vector.
         * @memberof kontra.vector
         *
         * @param {vector} vector - Vector to add.
         * @param {number} dt=1 - Time since last update.
         */
        add: function add(vector, dt) {
            this._x += (vector.x || 0) * (dt || 1);
            this._y += (vector.y || 0) * (dt || 1);
        },

        /**
         * Clamp the vector between two points that form a rectangle.
         * @memberof kontra.vector
         *
         * @param {number} [xMin=-Infinity] - Min x value.
         * @param {number} [yMin=Infinity] - Min y value.
         * @param {number} [xMax=-Infinity] - Max x value.
         * @param {number} [yMax=Infinity] - Max y value.
         */
        clamp: function clamp(xMin, yMin, xMax, yMax) {
            this._clamp = true;
            this._xMin = (xMin !== undefined ? xMin : -Infinity);
            this._yMin = (yMin !== undefined ? yMin : -Infinity);
            this._xMax = (xMax !== undefined ? xMax : Infinity);
            this._yMax = (yMax !== undefined ? yMax : Infinity);
        },

        /**
         * Vector x
         * @memberof kontra.vector
         *
         * @property {number} x
         */
        get x() {
            return this._x;
        },

        /**
         * Vector y
         * @memberof kontra.vector
         *
         * @property {number} y
         */
        get y() {
            return this._y;
        },

        set x(value) {
            this._x = (this._clamp ? Math.min( Math.max(this._xMin, value), this._xMax ) : value);
        },

        set y(value) {
            this._y = (this._clamp ? Math.min( Math.max(this._yMin, value), this._yMax ) : value);
        }
    };





    /**
     * A sprite with a position, velocity, and acceleration.
     * @memberof kontra
     * @requires kontra.vector
     *
     * @param {object} properties - Properties of the sprite.
     * @param {number} properties.x - X coordinate of the sprite.
     * @param {number} properties.y - Y coordinate of the sprite.
     * @param {number} [properties.dx] - Change in X position.
     * @param {number} [properties.dy] - Change in Y position.
     * @param {number} [properties.ddx] - Change in X velocity.
     * @param {number} [properties.ddy] - Change in Y velocity.
     *
     * @param {number} [properties.ttl=0] - How may frames the sprite should be alive.
     * @param {Context} [properties.context=kontra.context] - Provide a context for the sprite to draw on.
     *
     * @param {Image|Canvas} [properties.image] - Image for the sprite.
     *
     * @param {object} [properties.animations] - Animations for the sprite instead of an image.
     *
     * @param {string} [properties.color] - If no image or animation is provided, use color to draw a rectangle for the sprite.
     * @param {number} [properties.width] - Width of the sprite for drawing a rectangle.
     * @param {number} [properties.height] - Height of the sprite for drawing a rectangle.
     *
     * @param {function} [properties.update] - Function to use to update the sprite.
     * @param {function} [properties.render] - Function to use to render the sprite.
     */
    kontra.sprite = function(properties) {
        var sprite = Object.create(kontra.sprite.prototype);
        sprite.init(properties);

        return sprite;
    };

    kontra.sprite.prototype = {
        /**
         * Initialize properties on the sprite.
         * @memberof kontra.sprite
         *
         * @param {object} properties - Properties of the sprite.
         * @param {number} properties.x - X coordinate of the sprite.
         * @param {number} properties.y - Y coordinate of the sprite.
         * @param {number} [properties.dx] - Change in X position.
         * @param {number} [properties.dy] - Change in Y position.
         * @param {number} [properties.ddx] - Change in X velocity.
         * @param {number} [properties.ddy] - Change in Y velocity.
         *
         * @param {number} [properties.ttl=0] - How may frames the sprite should be alive.
         * @param {Context} [properties.context=kontra.context] - Provide a context for the sprite to draw on.
         *
         * @param {Image|Canvas} [properties.image] - Image for the sprite.
         *
         * @param {object} [properties.animations] - Animations for the sprite instead of an image.
         *
         * @param {string} [properties.color] - If no image or animation is provided, use color to draw a rectangle for the sprite.
         * @param {number} [properties.width] - Width of the sprite for drawing a rectangle.
         * @param {number} [properties.height] - Height of the sprite for drawing a rectangle.
         *
         * @param {function} [properties.update] - Function to use to update the sprite.
         * @param {function} [properties.render] - Function to use to render the sprite.
         *
         * If you need the sprite to live forever, or just need it to stay on screen until you
         * decide when to kill it, you can set <code>ttl</code> to <code>Infinity</code>.
         * Just be sure to set <code>ttl</code> to 0 when you want the sprite to die.
         */
        init: function init(properties) {
            var temp, animation, firstAnimation, self = this;
            properties = properties || {};

            // create the vectors if they don't exist or use the existing ones if they do
            self.position = (self.position || kontra.vector());
            self.velocity = (self.velocity || kontra.vector());
            self.acceleration = (self.acceleration || kontra.vector());

            self.position._init(properties.x, properties.y);
            self.velocity._init(properties.dx, properties.dy);
            self.acceleration._init(properties.ddx, properties.ddy);

            // default width and height to 0 if not passed in
            self.width = self.height = 0;

            // loop through properties before overrides
            for (var prop in properties) {
                self[prop] = properties[prop];
            }

            self.ttl = properties.ttl || 0;
            self.context = properties.context || kontra.context;

            // default to rect sprite
            self.advance = self._advance;
            self.draw = self._draw;

            // image sprite
            if (kontra._isImage(temp = properties.image)) {
                self.image = temp;
                self.width = temp.width;
                self.height = temp.height;

                self.draw = self._drawImg;
            }
            // animation sprite
            else if (temp = properties.animations) {
                self.animations = {};

                // clone each animation so no sprite shares an animation
                for (var name in temp) {
                    animation = temp[name];
                    self.animations[name] = (animation.clone ? animation.clone() : animation);

                    // default the current animation to the first one in the list
                    if (!firstAnimation) {
                        firstAnimation = self.animations[name];
                    }
                }

                self.currentAnimation = firstAnimation;
                self.width = firstAnimation.width;
                self.height = firstAnimation.height;

                self.advance = self._advanceAnim;
                self.draw = self._drawAnim;
            }
        },

        // define getter and setter shortcut functions to make it easier to work with the
        // position, velocity, and acceleration vectors.

        /**
         * Sprite position.x
         * @memberof kontra.sprite
         *
         * @property {number} x
         */
        get x() {
            return this.position.x;
        },

        /**
         * Sprite position.y
         * @memberof kontra.sprite
         *
         * @property {number} y
         */
        get y() {
            return this.position.y;
        },

        /**
         * Sprite velocity.x
         * @memberof kontra.sprite
         *
         * @property {number} dx
         */
        get dx() {
            return this.velocity.x;
        },

        /**
         * Sprite velocity.y
         * @memberof kontra.sprite
         *
         * @property {number} dy
         */
        get dy() {
            return this.velocity.y;
        },

        /**
         * Sprite acceleration.x
         * @memberof kontra.sprite
         *
         * @property {number} ddx
         */
        get ddx() {
            return this.acceleration.x;
        },

        /**
         * Sprite acceleration.y
         * @memberof kontra.sprite
         *
         * @property {number} ddy
         */
        get ddy() {
            return this.acceleration.y;
        },

        set x(value) {
            this.position.x = value;
        },
        set y(value) {
            this.position.y = value;
        },
        set dx(value) {
            this.velocity.x = value;
        },
        set dy(value) {
            this.velocity.y = value;
        },
        set ddx(value) {
            this.acceleration.x = value;
        },
        set ddy(value) {
            this.acceleration.y = value;
        },

        /**
         * Determine if the sprite is alive.
         * @memberof kontra.sprite
         *
         * @returns {boolean}
         */
        isAlive: function isAlive() {
            return this.ttl > 0;
        },

        /**
         * Simple bounding box collision test.
         * @memberof kontra.sprite
         *
         * @param {object} object - Object to check collision against.
         *
         * @returns {boolean} True if the objects collide, false otherwise.
         */
        collidesWith: function collidesWith(object) {
            return this.x < object.x + object.width &&
                this.x + this.width > object.x &&
                this.y < object.y + object.height &&
                this.y + this.height > object.y;
        },

        /**
         * Update the sprites velocity and position.
         * @memberof kontra.sprite
         * @abstract
         *
         * @param {number} dt - Time since last update.
         *
         * This function can be overridden on a per sprite basis if more functionality
         * is needed in the update step. Just call <code>this.advance()</code> when you need
         * the sprite to update its position.
         *
         * @example
         * sprite = kontra.sprite({
     *   update: function update(dt) {
     *     // do some logic
     *
     *     this.advance(dt);
     *   }
     * });
         */
        update: function update(dt) {
            this.advance(dt);
        },

        /**
         * Render the sprite.
         * @memberof kontra.sprite.
         * @abstract
         *
         * This function can be overridden on a per sprite basis if more functionality
         * is needed in the render step. Just call <code>this.draw()</code> when you need the
         * sprite to draw its image.
         *
         * @example
         * sprite = kontra.sprite({
     *   render: function render() {
     *     // do some logic
     *
     *     this.draw();
     *   }
     * });
         */
        render: function render() {
            this.draw();
        },

        /**
         * Play an animation.
         * @memberof kontra.sprite
         *
         * @param {string} name - Name of the animation to play.
         */
        playAnimation: function playAnimation(name) {
            this.currentAnimation = this.animations[name];
        },

        /**
         * Move the sprite by its velocity.
         * @memberof kontra.sprite
         * @private
         *
         * @param {number} dt - Time since last update.
         */
        _advance: function advanceSprite(dt) {
            this.velocity.add(this.acceleration, dt);
            this.position.add(this.velocity, dt);

            this.ttl--;
        },

        /**
         * Update the currently playing animation. Used when animations are passed to the sprite.
         * @memberof kontra.sprite
         * @private
         *
         * @param {number} dt - Time since last update.
         */
        _advanceAnim: function advanceAnimation(dt) {
            this._advance(dt);

            this.currentAnimation.update(dt);
        },

        /**
         * Draw a simple rectangle. Useful for prototyping.
         * @memberof kontra.sprite
         * @private
         */
        _draw: function drawRect() {
            this.context.fillStyle = this.color;
            this.context.fillRect(this.x, this.y, this.width, this.height);
        },

        /**
         * Draw the sprite.
         * @memberof kontra.sprite
         * @private
         */
        _drawImg: function drawImage() {
            this.context.drawImage(this.image, this.x, this.y);
        },

        /**
         * Draw the currently playing animation. Used when animations are passed to the sprite.
         * @memberof kontra.sprite
         * @private
         */
        _drawAnim: function drawAnimation() {
            this.currentAnimation.render({
                context: this.context,
                x: this.x,
                y: this.y
            });
        }
    };
})(kontra, Math, Infinity);

(function(Promise) {
    var imageRegex = /(jpeg|jpg|gif|png)$/;
    var audioRegex = /(wav|mp3|ogg|aac)$/;
    var noRegex = /^no$/;

    // audio playability
    // @see https://github.com/Modernizr/Modernizr/blob/master/feature-detects/audio.js
    var audio = new Audio();
    var canUse = {
        wav: '',
        mp3: audio.canPlayType('audio/mpeg;').replace(noRegex,''),
        ogg: audio.canPlayType('audio/ogg; codecs="vorbis"').replace(noRegex,''),
        aac: audio.canPlayType('audio/aac;').replace(noRegex,''),
    };

    /**
     * Join a path with proper separators.
     * @see https://stackoverflow.com/a/43888647/2124254
     */
    function joinPath() {
        var path = [], i = 0;

        for (; i < arguments.length; i++) {
            if (arguments[i]) {

                // replace slashes at the beginning or end of a path
                // replace 2 or more slashes at the beginning of the first path to
                // preserve root routes (/root)
                path.push( arguments[i].trim().replace(new RegExp('(^[\/]{' + (path[0] ? 1 : 2) + ',}|[\/]*$)', 'g'), '') );
            }
        }

        return path.join('/');
    }

    /**
     * Get the extension of an asset.
     *
     * @param {string} url - The URL to the asset.
     *
     * @returns {string}
     */
    function getExtension(url) {
        return url.split('.').pop();
    }

    /**
     * Get the name of an asset.
     *
     * @param {string} url - The URL to the asset.
     *
     * @returns {string}
     */
    function getName(url) {
        var name = url.replace('.' + getExtension(url), '');

        // remove slash if there is no folder in the path
        return (name.indexOf('/') == 0 && name.lastIndexOf('/') == 0 ? name.substr(1) : name);
    }

    /**
     * Load an Image file. Uses imagePath to resolve URL.
     * @memberOf kontra.assets
     * @private
     *
     * @param {string} url - The URL to the Image file.
     *
     * @returns {Promise} A deferred promise. Promise resolves with the Image.
     *
     * @example
     * kontra.loadImage('car.png');
     * kontra.loadImage('autobots/truck.png');
     */
    function loadImage(url) {
        var name = getName(url);
        var image = new Image();

        var self = kontra.assets;
        var imageAssets = self.images;

        url = joinPath(self.imagePath, url);

        return new Promise(function(resolve, reject) {
            image.onload = function loadImageOnLoad() {
                imageAssets[name] = imageAssets[url] = this;
                resolve(this);
            };

            image.onerror = function loadImageOnError() {
                reject('Unable to load image ' + url);
            };

            image.src = url;
        });
    }

    /**
     * Load an Audio file. Supports loading multiple audio formats which will be resolved by
     * the browser in the order listed. Uses audioPath to resolve URL.
     * @memberOf kontra.assets
     * @private
     *
     * @param {string|string[]} url - The URL to the Audio file.
     *
     * @returns {Promise} A deferred promise. Promise resolves with the Audio.
     *
     * @example
     * kontra.loadAudio('sound_effects/laser.mp3');
     * kontra.loadAudio(['explosion.mp3', 'explosion.m4a', 'explosion.ogg']);
     */
    function loadAudio(url) {
        var self = kontra.assets;
        var audioAssets = self.audio;
        var audioPath = self.audioPath;
        var source, name, playableSource, audio, i;

        if (!Array.isArray(url)) {
            url = [url];
        }

        return new Promise(function(resolve, reject) {
            // determine which audio format the browser can play
            for (i = 0; (source = url[i]); i++) {
                if ( canUse[getExtension(source)] ) {
                    playableSource = source;
                    break;
                }
            }

            if (!playableSource) {
                reject('cannot play any of the audio formats provided');
            }
            else {
                name = getName(playableSource);
                audio = new Audio();
                source = joinPath(audioPath, playableSource);

                audio.addEventListener('canplay', function loadAudioOnLoad() {
                    audioAssets[name] = audioAssets[source] = this;
                    resolve(this);
                });

                audio.onerror = function loadAudioOnError() {
                    reject('Unable to load audio ' + source);
                };

                audio.src = source;
                audio.load();
            }
        });
    }

    /**
     * Load a data file (be it text or JSON). Uses dataPath to resolve URL.
     * @memberOf kontra.assets
     * @private
     *
     * @param {string} url - The URL to the data file.
     *
     * @returns {Promise} A deferred promise. Resolves with the data or parsed JSON.
     *
     * @example
     * kontra.loadData('bio.json');
     * kontra.loadData('dialog.txt');
     */
    function loadData(url) {
        var name = getName(url);
        var req = new XMLHttpRequest();

        var self = kontra.assets;
        var dataAssets = self.data;

        url = joinPath(self.dataPath, url);

        return new Promise(function(resolve, reject) {
            req.addEventListener('load', function loadDataOnLoad() {
                var data = req.responseText;

                if (req.status !== 200) {
                    return reject(data);
                }

                try {
                    data = JSON.parse(data);
                }
                catch(e) {}

                dataAssets[name] = dataAssets[url] = data;
                resolve(data);
            });

            req.open('GET', url, true);
            req.send();
        });
    }

    /**
     * Object for loading assets.
     */
    kontra.assets = {
        // all assets are stored by name as well as by URL
        images: {},
        audio: {},
        data: {},

        // base asset path for determining asset URLs
        imagePath: '',
        audioPath: '',
        dataPath: '',

        /**
         * Load an Image, Audio, or data file.
         * @memberOf kontra.assets
         *
         * @param {string|string[]} - Comma separated list of assets to load.
         *
         * @returns {Promise}
         *
         * @example
         * kontra.loadAsset('car.png');
         * kontra.loadAsset(['explosion.mp3', 'explosion.ogg']);
         * kontra.loadAsset('bio.json');
         * kontra.loadAsset('car.png', ['explosion.mp3', 'explosion.ogg'], 'bio.json');
         */
        load: function loadAsset() {
            var promises = [];
            var url, extension, asset, i, promise;

            for (i = 0; (asset = arguments[i]); i++) {
                url = (Array.isArray(asset) ? asset[0] : asset);

                extension = getExtension(url);
                if (extension.match(imageRegex)) {
                    promise = loadImage(asset);
                }
                else if (extension.match(audioRegex)) {
                    promise = loadAudio(asset);
                }
                else {
                    promise = loadData(asset);
                }

                promises.push(promise);
            }

            return Promise.all(promises);
        },

        // expose properties for testing
        _canUse: canUse,
    };
})(Promise);

(function(kontra) {

    /**
     * Object pool. The pool will grow in size to accommodate as many objects as are needed.
     * Unused items are at the front of the pool and in use items are at the of the pool.
     * @memberof kontra
     *
     * @param {object} properties - Properties of the pool.
     * @param {function} properties.create - Function that returns the object to use in the pool.
     * @param {number} properties.maxSize - The maximum size that the pool will grow to.
     */
    kontra.pool = function(properties) {
        properties = properties || {};

        var lastIndex = 0;
        var inUse = 0;
        var obj;

        // check for the correct structure of the objects added to pools so we know that the
        // rest of the pool code will work without errors
        if (!kontra._isFunc(properties.create) ||
            ( !( obj = properties.create() ) ||
                !( kontra._isFunc(obj.update) && kontra._isFunc(obj.init) &&
                    kontra._isFunc(obj.isAlive) )
            )) {
            throw Error('Must provide create() function which returns an object with init(), update(), and isAlive() functions');
        }

        return {
            create: properties.create,

            // start the pool with an object
            objects: [obj],
            size: 1,
            maxSize: properties.maxSize || Infinity,

            /**
             * Get an object from the pool.
             * @memberof kontra.pool
             *
             * @param {object} properties - Properties to pass to object.init().
             */
            get: function get(properties) {
                properties = properties || {};

                // the pool is out of objects if the first object is in use and it can't grow
                if (this.objects[0].isAlive()) {
                    if (this.size === this.maxSize) {
                        return;
                    }
                    // double the size of the array by filling it with twice as many objects
                    else {
                        for (var x = 0; x < this.size && this.objects.length < this.maxSize; x++) {
                            this.objects.unshift(this.create());
                        }

                        this.size = this.objects.length;
                        lastIndex = this.size - 1;
                    }
                }

                // save off first object in pool to reassign to last object after unshift
                var obj = this.objects[0];
                obj.init(properties);

                // unshift the array
                for (var i = 1; i < this.size; i++) {
                    this.objects[i-1] = this.objects[i];
                }

                this.objects[lastIndex] = obj;
                inUse++;
            },

            /**
             * Return all objects that are alive from the pool.
             * @memberof kontra.pool
             *
             * @returns {object[]}
             */
            getAliveObjects: function getAliveObjects() {
                return this.objects.slice(this.objects.length - inUse);
            },

            /**
             * Clear the object pool.
             * @memberof kontra.pool
             */
            clear: function clear() {
                inUse = lastIndex = this.objects.length = 0;
                this.size = 1;
                this.objects.push(this.create());
            },

            /**
             * Update all alive pool objects.
             * @memberof kontra.pool
             *
             * @param {number} dt - Time since last update.
             */
            update: function update(dt) {
                var i = lastIndex;
                var obj;

                // If the user kills an object outside of the update cycle, the pool won't know of
                // the change until the next update and inUse won't be decremented. If the user then
                // gets an object when inUse is the same size as objects.length, inUse will increment
                // and this statement will evaluate to -1.
                //
                // I don't like having to go through the pool to kill an object as it forces you to
                // know which object came from which pool. Instead, we'll just prevent the index from
                // going below 0 and accept the fact that inUse may be out of sync for a frame.
                var index = Math.max(this.objects.length - inUse, 0);

                // only iterate over the objects that are alive
                while (i >= index) {
                    obj = this.objects[i];

                    obj.update(dt);

                    // if the object is dead, move it to the front of the pool
                    if (!obj.isAlive()) {

                        // push an object from the middle of the pool to the front of the pool
                        // without returning a new array through Array#splice to avoid garbage
                        // collection of the old array
                        // @see http://jsperf.com/object-pools-array-vs-loop
                        for (var j = i; j > 0; j--) {
                            this.objects[j] = this.objects[j-1];
                        }

                        this.objects[0] = obj;
                        inUse--;
                        index++;
                    }
                    else {
                        i--;
                    }
                }
            },

            /**
             * render all alive pool objects.
             * @memberof kontra.pool
             */
            render: function render() {
                var index = Math.max(this.objects.length - inUse, 0);

                for (var i = lastIndex; i >= index; i--) {
                    this.objects[i].render && this.objects[i].render();
                }
            }
        };
    };
})(kontra);

(function(kontra) {
    /**
     * Single animation from a sprite sheet.
     * @memberof kontra
     *
     * @param {object} properties - Properties of the animation.
     * @param {object} properties.spriteSheet - Sprite sheet for the animation.
     * @param {number[]} properties.frames - List of frames of the animation.
     * @param {number}  properties.frameRate - Number of frames to display in one second.
     */
    kontra.animation = function(properties) {
        var animation = Object.create(kontra.animation.prototype);
        animation._init(properties);

        return animation;
    };

    kontra.animation.prototype = {
        /**
         * Initialize properties on the animation.
         * @memberof kontra.animation
         * @private
         *
         * @param {object} properties - Properties of the animation.
         * @param {object} properties.spriteSheet - Sprite sheet for the animation.
         * @param {number[]} properties.frames - List of frames of the animation.
         * @param {number}  properties.frameRate - Number of frames to display in one second.
         */
        _init: function init(properties) {
            properties = properties || {};

            this.spriteSheet = properties.spriteSheet;
            this.frames = properties.frames;
            this.frameRate = properties.frameRate;

            var frame = properties.spriteSheet.frame;
            this.width = frame.width;
            this.height = frame.height;
            this.margin = frame.margin || 0;

            this._frame = 0;
            this._accum = 0;
        },

        /**
         * Clone an animation to be used more than once.
         * @memberof kontra.animation
         *
         * @returns {object}
         */
        clone: function clone() {
            return kontra.animation(this);
        },

        /**
         * Update the animation. Used when the animation is not paused or stopped.
         * @memberof kontra.animation
         * @private
         *
         * @param {number} [dt=1/60] - Time since last update.
         */
        update: function advance(dt) {
            dt = dt || 1 / 60;

            this._accum += dt;

            // update to the next frame if it's time
            while (this._accum * this.frameRate >= 1) {
                this._frame = ++this._frame % this.frames.length;

                this._accum -= 1 / this.frameRate;
            }
        },

        /**
         * Draw the current frame. Used when the animation is not stopped.
         * @memberof kontra.animation
         * @private
         *
         * @param {object} properties - How to draw the animation.
         * @param {number} properties.x - X position to draw.
         * @param {number} properties.y - Y position to draw.
         * @param {Context} [properties.context=kontra.context] - Provide a context for the sprite to draw on.
         */
        render: function draw(properties) {
            properties = properties || {};

            var context = properties.context || kontra.context;

            // get the row and col of the frame
            var row = this.frames[this._frame] / this.spriteSheet.framesPerRow | 0;
            var col = this.frames[this._frame] % this.spriteSheet.framesPerRow | 0;

            context.drawImage(
                this.spriteSheet.image,
                col * this.width + (col * 2 + 1) * this.margin,
                row * this.height + (row * 2 + 1) * this.margin,
                this.width, this.height,
                properties.x, properties.y,
                this.width, this.height
            );
        }
    };






    /**
     * Create a sprite sheet from an image.
     * @memberof kontra
     *
     * @param {object} properties - Properties of the sprite sheet.
     * @param {Image|Canvas} properties.image - Image for the sprite sheet.
     * @param {number} properties.frameWidth - Width (in px) of each frame.
     * @param {number} properties.frameHeight - Height (in px) of each frame.
     * @param {number} properties.frameMargin - Margin (in px) between each frame.
     * @param {object} properties.animations - Animations to create from the sprite sheet.
     */
    kontra.spriteSheet = function(properties) {
        var spriteSheet = Object.create(kontra.spriteSheet.prototype);
        spriteSheet._init(properties);

        return spriteSheet;
    };

    kontra.spriteSheet.prototype = {
        /**
         * Initialize properties on the spriteSheet.
         * @memberof kontra
         * @private
         *
         * @param {object} properties - Properties of the sprite sheet.
         * @param {Image|Canvas} properties.image - Image for the sprite sheet.
         * @param {number} properties.frameWidth - Width (in px) of each frame.
         * @param {number} properties.frameHeight - Height (in px) of each frame.
         * @param {number} properties.frameMargin - Margin (in px) between each frame.
         * @param {object} properties.animations - Animations to create from the sprite sheet.
         */
        _init: function init(properties) {
            properties = properties || {};

            if (!kontra._isImage(properties.image)) {
                throw Erorr('You must provide an Image for the SpriteSheet');
            }

            this.animations = {};
            this.image = properties.image;
            this.frame = {
                width: properties.frameWidth,
                height: properties.frameHeight,
                margin: properties.frameMargin
            };

            this.framesPerRow = properties.image.width / properties.frameWidth | 0;

            this.createAnimations(properties.animations);
        },

        /**
         * Create animations from the sprite sheet.
         * @memberof kontra.spriteSheet
         *
         * @param {object} animations - List of named animations to create from the Image.
         * @param {number|string|number[]|string[]} animations.animationName.frames - A single frame or list of frames for this animation.
         * @param {number} animations.animationName.frameRate - Number of frames to display in one second.
         *
         * @example
         * var sheet = kontra.spriteSheet({image: img, frameWidth: 16, frameHeight: 16});
         * sheet.createAnimations({
     *   idle: {
     *     frames: 1  // single frame animation
     *   },
     *   walk: {
     *     frames: '2..6',  // ascending consecutive frame animation (frames 2-6, inclusive)
     *     frameRate: 4
     *   },
     *   moonWalk: {
     *     frames: '6..2',  // descending consecutive frame animation
     *     frameRate: 4
     *   },
     *   jump: {
     *     frames: [7, 12, 2],  // non-consecutive frame animation
     *     frameRate: 3
     *   },
     *   attack: {
     *     frames: ['8..10', 13, '10..8'],  // you can also mix and match, in this case frames [8,9,10,13,10,9,8]
     *     frameRate: 2
     *   }
     * });
         */
        createAnimations: function createAnimations(animations) {
            var animation, frames, frameRate, sequence;

            for (var name in animations) {
                animation = animations[name];
                frames = animation.frames;
                frameRate = animation.frameRate;

                // array that holds the order of the animation
                sequence = [];

                if (frames === undefined) {
                    throw Error('Animation ' + name + ' must provide a frames property');
                }

                if (!Array.isArray(frames)) {
                    frames = [frames];
                }

                for (var i = 0, frame; frame = frames[i]; i++) {
                    // add new frames to the end of the array
                    sequence.push.apply(sequence, this._parse(frame));
                }

                this.animations[name] = kontra.animation({
                    spriteSheet: this,
                    frames: sequence,
                    frameRate: frameRate
                });
            }
        },

        /**
         * Parse a string of consecutive frames.
         * @memberof kontra.spriteSheet
         * @private
         *
         * @param {string} frames - Start and end frame.
         *
         * @returns {number[]} List of frames.
         */
        _parse: function parse(consecutiveFrames) {
            if (kontra._isNumber(consecutiveFrames)) {
                return [consecutiveFrames];
            }

            var sequence = [];
            var frames = consecutiveFrames.split('..');

            // coerce string to number
            // @see https://github.com/jed/140bytes/wiki/Byte-saving-techniques#coercion-to-test-for-types
            var start = i = +frames[0];
            var end = +frames[1];

            // ascending frame order
            if (start < end) {
                for (; i <= end; i++) {
                    sequence.push(i);
                }
            }
            // descending order
            else {
                for (; i >= end; i--) {
                    sequence.push(i);
                }
            }

            return sequence;
        }
    };
})(kontra);

/**
 * Object for using localStorage.
 */
kontra.store = {

    /**
     * Save an item to localStorage.
     * @memberof kontra.store
     *
     * @param {string} key - Name to store the item as.
     * @param {*} value - Item to store.
     */
    set: function setStoreItem(key, value) {
        if (value === undefined) {
            localStorage.removeItem(key);
        }
        else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    },

    /**
     * Retrieve an item from localStorage and convert it back to it's original type.
     * @memberof kontra.store
     *
     * @param {string} key - Name of the item.
     *
     * @returns {*}
     */
    get: function getStoreItem(key) {
        var value = localStorage.getItem(key);

        try {
            value = JSON.parse(value);
        }
        catch(e) {}

        return value;
    }
};